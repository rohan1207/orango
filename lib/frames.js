/**
 * OranGo scroll-hero frames — cache-first, landing-aggressive preload.
 *
 * Desktop: /frames/desktop/ezgif-frame-001.png …
 * Phone:   /frames/mobile/ezgif-frame-001.png …
 *
 * Sessions are module singletons: landing warm continues after redirect to /home.
 */

export const TOTAL_FRAMES = 230;
export const FRAME_LERP = 0.28;
/** Soft scrub lag (seconds) — elegant, never 1:1 snap that hangs on wheel fling */
export const SCRUB = 0.75;
/** Max frames advanced per animation frame — play-through on fast scroll, no jump */
export const MAX_FRAME_STEP = 4;
export const READY_MIN_FRAMES = 16;
export const PRIORITY_COUNT = 48;
export const HOME_BATCH_SIZE = 6;
export const LANDING_BATCH_SIZE = 18;
export const CACHE_NAME = "orango-frames-v4";
export const FRAMES_BASE = "/frames";
export const FRAME_EXT = "png";
export const MOBILE_BREAKPOINT = 768;

const sessions = {};
const namingIndexByFolder = {};

export function folderFromWidth(width) {
  return width < MOBILE_BREAKPOINT ? "mobile" : "desktop";
}

export function framesBasePath(folder) {
  return folder === "mobile"
    ? `${FRAMES_BASE}/mobile`
    : `${FRAMES_BASE}/desktop`;
}

export function frameSrcCandidates(folder, n) {
  const id = String(n).padStart(3, "0");
  const base = framesBasePath(folder);
  return [
    `${base}/ezgif-frame-${id}.png`,
    `${base}/frame-${id}.${FRAME_EXT}`,
    `${base}/${id}.png`,
    `${base}/frame_${id}.jpg`,
    `${base}/frame-${id}.webp`,
  ];
}

export function frameSrc(folder, n) {
  const idx = namingIndexByFolder[folder] ?? 0;
  return frameSrcCandidates(folder, n)[idx];
}

function notify(session) {
  const payload = {
    loaded: session.loaded,
    total: session.total,
    ready: session.ready,
    ratio: session.total ? session.loaded / session.total : 0,
    folder: session.folder,
  };
  session.listeners.forEach((fn) => fn(payload));
}

async function openCache() {
  if (typeof caches === "undefined") return null;
  try {
    return await caches.open(CACHE_NAME);
  } catch {
    return null;
  }
}

async function blobToDrawable(blob) {
  if (!blob) return null;
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch {
      /* fall through to Image */
    }
  }
  const url = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Cache-first: Cache API → network (force-cache) → store → decode.
 */
async function fetchFrameBlob(src, cache) {
  if (cache) {
    try {
      const hit = await cache.match(src);
      if (hit?.ok) return hit.blob();
    } catch {
      /* ignore */
    }
  }

  let res;
  try {
    res = await fetch(src, {
      credentials: "same-origin",
      cache: "force-cache",
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  if (cache) {
    try {
      await cache.put(src, res.clone());
    } catch {
      /* quota */
    }
  }
  return res.blob();
}

async function resolveNaming(folder, cache) {
  if (namingIndexByFolder[folder] != null) return namingIndexByFolder[folder];

  const candidates = frameSrcCandidates(folder, 1);
  for (let i = 0; i < candidates.length; i += 1) {
    const blob = await fetchFrameBlob(candidates[i], cache);
    if (blob) {
      namingIndexByFolder[folder] = i;
      try {
        sessionStorage.setItem(`orango-frame-name-${folder}`, String(i));
      } catch {
        /* private mode */
      }
      return i;
    }
  }
  namingIndexByFolder[folder] = 0;
  return 0;
}

function restoreNaming(folder) {
  if (namingIndexByFolder[folder] != null) return;
  try {
    const raw = sessionStorage.getItem(`orango-frame-name-${folder}`);
    if (raw != null) namingIndexByFolder[folder] = Number(raw) || 0;
  } catch {
    /* ignore */
  }
}

async function loadFrame(folder, n, cache) {
  restoreNaming(folder);
  if (namingIndexByFolder[folder] == null) {
    await resolveNaming(folder, cache);
  }
  const src = frameSrc(folder, n);
  const blob = await fetchFrameBlob(src, cache);
  return blobToDrawable(blob);
}

function markReady(session) {
  if (session.ready) return;
  if (session.loaded >= READY_MIN_FRAMES) {
    session.ready = true;
    notify(session);
  }
}

/**
 * Inject <link rel="preload"> for the first N frames (browser HTTP cache).
 */
export function injectFramePreloadLinks(folder, count = 24) {
  if (typeof document === "undefined") return () => {};
  restoreNaming(folder);
  const idx = namingIndexByFolder[folder] ?? 0;
  const links = [];
  for (let n = 1; n <= count; n += 1) {
    const href = frameSrcCandidates(folder, n)[idx];
    const el = document.createElement("link");
    el.rel = "preload";
    el.as = "image";
    el.href = href;
    el.setAttribute("data-orango-frame-preload", "1");
    document.head.appendChild(el);
    links.push(el);
  }
  return () => links.forEach((el) => el.remove());
}

/**
 * Landing: start aggressive continuous preload for the active device.
 * Never blocks navigation — keep filling until all 230 are in memory/cache.
 */
export function warmupFramesFromLanding() {
  if (typeof window === "undefined") return null;
  const folder = folderFromWidth(window.innerWidth);
  const session = preloadFrames(folder, { aggressive: true });

  // Also warm the other set lightly (idle) so rotate/desktop↔mobile is ready
  const other = folder === "mobile" ? "desktop" : "mobile";
  const idle = window.requestIdleCallback
    ? window.requestIdleCallback.bind(window)
    : (cb) => window.setTimeout(cb, 1200);
  idle(() => {
    preloadFrames(other, { aggressive: false, priorityOnly: true });
  });

  return session;
}

/**
 * @param {"desktop"|"mobile"} folder
 * @param {{ aggressive?: boolean, priorityOnly?: boolean }} [opts]
 */
export function preloadFrames(folder = "desktop", opts = {}) {
  const key = folder === "mobile" ? "mobile" : "desktop";
  const aggressive = Boolean(opts.aggressive);
  const priorityOnly = Boolean(opts.priorityOnly);

  if (sessions[key]) {
    // Upgrade an existing slow session to aggressive if landing asks
    if (aggressive && !sessions[key].aggressive) {
      sessions[key].aggressive = true;
    }
    return sessions[key];
  }

  restoreNaming(key);

  const total = TOTAL_FRAMES;
  const frames = new Array(total).fill(null);

  const session = {
    folder: key,
    frames,
    total,
    loaded: 0,
    ready: false,
    listeners: new Set(),
    promise: null,
    aborted: false,
    aggressive,
  };

  session.subscribe = (fn) => {
    session.listeners.add(fn);
    fn({
      loaded: session.loaded,
      total,
      ready: session.ready,
      ratio: session.loaded / total,
      folder: key,
    });
    return () => session.listeners.delete(fn);
  };

  session.promise = (async () => {
    const cache = await openCache();
    await resolveNaming(key, cache);

    const first = await loadFrame(key, 1, cache);
    if (first) {
      frames[0] = first;
      session.loaded = 1;
      notify(session);
    }

    const queue = [];
    for (let n = 2; n <= total; n += 1) queue.push(n);

    const priorityEnd = Math.min(PRIORITY_COUNT - 1, queue.length);
    const priority = queue.splice(0, priorityEnd);

    const loadBatch = async (batch) => {
      const results = await Promise.all(
        batch.map((n) => loadFrame(key, n, cache)),
      );
      results.forEach((img, idx) => {
        if (!img) return;
        const i = batch[idx] - 1;
        if (!frames[i]) {
          frames[i] = img;
          session.loaded += 1;
        }
      });
      markReady(session);
      notify(session);
    };

    const runQueue = async (list, batchSize, yieldMs) => {
      let i = 0;
      while (i < list.length) {
        if (session.aborted) return;
        const size = session.aggressive ? LANDING_BATCH_SIZE : batchSize;
        await loadBatch(list.slice(i, i + size));
        i += size;
        if (session.aggressive) {
          await new Promise((r) => requestAnimationFrame(r));
        } else if (yieldMs > 0) {
          await new Promise((r) => setTimeout(r, yieldMs));
        } else {
          await new Promise((r) => requestAnimationFrame(r));
        }
      }
    };

    await runQueue(priority, LANDING_BATCH_SIZE, 0);

    if (!session.ready) {
      session.ready = true;
      notify(session);
    }

    if (priorityOnly) return;

    // Rest of sequence — stay aggressive if landing kicked us off
    await runQueue(
      queue,
      session.aggressive ? LANDING_BATCH_SIZE : HOME_BATCH_SIZE,
      session.aggressive ? 0 : 16,
    );
  })();

  sessions[key] = session;
  return session;
}

export function getFrameSession(folder) {
  const key = folder === "mobile" ? "mobile" : "desktop";
  return sessions[key] || null;
}

/** How many frames are already decoded for this folder (0 if cold). */
export function getLoadedCount(folder) {
  const s = getFrameSession(folder);
  return s?.loaded ?? 0;
}

export function nearestLoaded(frames, index) {
  if (!frames?.length) return null;
  const max = frames.length - 1;
  let i = Math.round(Math.min(max, Math.max(0, index)));
  if (frames[i]) return frames[i];
  // Prefer earlier (already loaded) frames — safer when scrubbing ahead of decode
  for (let d = 1; d <= max; d += 1) {
    if (i - d >= 0 && frames[i - d]) return frames[i - d];
  }
  for (let d = 1; d <= max; d += 1) {
    if (i + d <= max && frames[i + d]) return frames[i + d];
  }
  return null;
}

export function drawFrame(ctx, img, width, height, mode = "cover") {
  if (!ctx) return;
  ctx.fillStyle = "#FFFAF6";
  ctx.fillRect(0, 0, width, height);
  if (!img) return;

  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale =
    mode === "cover"
      ? Math.max(width / iw, height / ih)
      : Math.min(width / iw, height / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
}
