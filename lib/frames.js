/**
 * OranGo scroll-hero frames — max-throughput preload + Cache API.
 *
 * Sets (sessions keyed by folder — home1 / home3 / home4 never conflict):
 *   home1 → /frames/home1_desktop|home1_mobile (288)
 *   home3 → /frames/home3_desktop|home3_mobile (223)
 *   home4 → /frames/home4_desktop|home4_mobile (231)
 *
 * Landing warms the home1 set (default entry).
 */

export const FRAME_SETS = {
  home1: {
    id: "home1",
    desktop: "home1_desktop",
    mobile: "home1_mobile",
    total: 288,
    readyMin: 200,
    requireAll: false,
  },
  home3: {
    id: "home3",
    desktop: "home3_desktop",
    mobile: "home3_mobile",
    total: 223,
    readyMin: 223,
    requireAll: true,
  },
  home4: {
    id: "home4",
    desktop: "home4_desktop",
    mobile: "home4_mobile",
    total: 231,
    readyMin: 231,
    requireAll: true,
  },
};

export const DEFAULT_FRAME_SET = "home1";

/** @deprecated prefer getFrameSet(id).total */
export const TOTAL_FRAMES = FRAME_SETS.home1.total;
export const SCRUB = 0.4;
export const READY_MIN_FRAMES = FRAME_SETS.home1.readyMin;
export const READY_RATIO = 0.85;
export const PRIORITY_COUNT = FRAME_SETS.home1.total;
export const MAX_CONCURRENT = 48;
export const HOME_BATCH_SIZE = 32;
export const LANDING_BATCH_SIZE = 48;
export const CACHE_NAME = "orango-frames-multi-v1";
export const FRAMES_BASE = "/frames";
export const FRAME_EXT = "png";
export const MOBILE_BREAKPOINT = 768;

export const FOLDER_DESKTOP = FRAME_SETS.home1.desktop;
export const FOLDER_MOBILE = FRAME_SETS.home1.mobile;

const sessions = {};
const namingIndexByFolder = {};

export function getFrameSet(setId = DEFAULT_FRAME_SET) {
  return FRAME_SETS[setId] || FRAME_SETS[DEFAULT_FRAME_SET];
}

export function folderFromWidth(width, setId = DEFAULT_FRAME_SET) {
  const set = getFrameSet(setId);
  return width < MOBILE_BREAKPOINT ? set.mobile : set.desktop;
}

export function framesBasePath(folder) {
  const key = normalizeFolder(folder);
  return `${FRAMES_BASE}/${key}`;
}

/** Pass folder names through; only remap legacy aliases → home1. */
export function normalizeFolder(folder) {
  if (!folder) return FOLDER_DESKTOP;
  if (folder === "mobile" || folder === "mobile_frames") return FOLDER_MOBILE;
  if (folder === "desktop" || folder === "desktop_frames") return FOLDER_DESKTOP;
  return folder;
}

export function setIdFromFolder(folder) {
  const key = String(normalizeFolder(folder));
  if (key.startsWith("home4")) return "home4";
  if (key.startsWith("home3")) return "home3";
  return "home1";
}

export function totalForFolder(folder) {
  return getFrameSet(setIdFromFolder(folder)).total;
}

export function readyMinForFolder(folder) {
  return getFrameSet(setIdFromFolder(folder)).readyMin;
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
  const key = normalizeFolder(folder);
  const idx = namingIndexByFolder[key] ?? 0;
  return frameSrcCandidates(key, n)[idx];
}

function notify(session) {
  const payload = {
    loaded: session.loaded,
    total: session.total,
    ready: session.ready,
    ratio: session.total ? session.loaded / session.total : 0,
    folder: session.folder,
    maxContiguous: session.maxContiguous,
  };
  session.listeners.forEach((fn) => fn(payload));
}

function recomputeContiguous(session) {
  const frames = session.frames;
  let i = 0;
  while (i < frames.length && frames[i]) i += 1;
  session.maxContiguous = Math.max(0, i - 1);
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
      return await createImageBitmap(blob, {
        premultiplyAlpha: "none",
        colorSpaceConversion: "none",
      });
    } catch {
      try {
        return await createImageBitmap(blob);
      } catch {
        /* fall through */
      }
    }
  }
  const url = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = async () => {
      try {
        if (img.decode) await img.decode();
      } catch {
        /* ignore */
      }
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
  const key = normalizeFolder(folder);
  if (namingIndexByFolder[key] != null) return namingIndexByFolder[key];

  const candidates = frameSrcCandidates(key, 1);
  for (let i = 0; i < candidates.length; i += 1) {
    const blob = await fetchFrameBlob(candidates[i], cache);
    if (blob) {
      namingIndexByFolder[key] = i;
      try {
        sessionStorage.setItem(`orango-frame-name-${key}`, String(i));
      } catch {
        /* private mode */
      }
      return i;
    }
  }
  namingIndexByFolder[key] = 0;
  return 0;
}

function restoreNaming(folder) {
  const key = normalizeFolder(folder);
  if (namingIndexByFolder[key] != null) return;
  try {
    const raw = sessionStorage.getItem(`orango-frame-name-${key}`);
    if (raw != null) namingIndexByFolder[key] = Number(raw) || 0;
  } catch {
    /* ignore */
  }
}

async function loadFrame(folder, n, cache) {
  const key = normalizeFolder(folder);
  restoreNaming(key);
  if (namingIndexByFolder[key] == null) {
    await resolveNaming(key, cache);
  }
  const src = frameSrc(key, n);
  const blob = await fetchFrameBlob(src, cache);
  return blobToDrawable(blob);
}

function markReady(session) {
  if (session.ready) return;
  const ratio = session.total ? session.loaded / session.total : 0;
  const readyMin = session.readyMin ?? READY_MIN_FRAMES;
  const requireAll = Boolean(session.requireAll);

  // home3 / home4: never mark ready until every frame is decoded
  if (requireAll) {
    if (session.loaded >= session.total) {
      session.ready = true;
      notify(session);
    }
    return;
  }

  if (
    session.loaded >= readyMin ||
    ratio >= READY_RATIO ||
    session.loaded >= session.total
  ) {
    session.ready = true;
    notify(session);
  }
}

/**
 * Inject <link rel="preload"> for as many frames as the browser will accept.
 * Chunked so we don't block the main thread inserting many nodes at once.
 */
export function injectFramePreloadLinks(folder, count) {
  if (typeof document === "undefined") return () => {};
  const key = normalizeFolder(folder);
  restoreNaming(key);
  const idx = namingIndexByFolder[key] ?? 0;
  const total = totalForFolder(key);
  const links = [];
  const limit = Math.min(count ?? total, total);
  let n = 1;

  const pump = () => {
    const end = Math.min(n + 40, limit + 1);
    for (; n < end; n += 1) {
      const href = frameSrcCandidates(key, n)[idx];
      const el = document.createElement("link");
      el.rel = "preload";
      el.as = "image";
      el.href = href;
      el.setAttribute("data-orango-frame-preload", "1");
      document.head.appendChild(el);
      links.push(el);
    }
    if (n <= limit) {
      requestAnimationFrame(pump);
    }
  };
  pump();

  return () => links.forEach((el) => el.remove());
}

/**
 * Landing: max-aggressive preload for a frame set (default home1).
 * Never blocks navigation — keep filling until all frames are in memory/cache.
 */
export function warmupFramesFromLanding(setId = DEFAULT_FRAME_SET) {
  if (typeof window === "undefined") return null;
  const folder = folderFromWidth(window.innerWidth, setId);
  const set = getFrameSet(setId);
  injectFramePreloadLinks(folder, set.total);
  return preloadFrames(folder, { aggressive: true });
}

/**
 * Keep `concurrency` workers pulling from a shared index queue — saturates
 * browser HTTP/2 multiplex without waiting for full batches to finish.
 */
async function runPool(indices, concurrency, worker) {
  let cursor = 0;
  const run = async () => {
    while (cursor < indices.length) {
      const i = cursor;
      cursor += 1;
      await worker(indices[i]);
    }
  };
  const n = Math.min(concurrency, Math.max(1, indices.length));
  await Promise.all(Array.from({ length: n }, () => run()));
}

/**
 * @param {string} folder
 * @param {{ aggressive?: boolean, priorityOnly?: boolean }} [opts]
 */
export function preloadFrames(folder = FOLDER_DESKTOP, opts = {}) {
  const key = normalizeFolder(folder);
  const aggressive = Boolean(opts.aggressive);
  const priorityOnly = Boolean(opts.priorityOnly);
  const set = getFrameSet(setIdFromFolder(key));

  if (sessions[key]) {
    if (aggressive && !sessions[key].aggressive) {
      sessions[key].aggressive = true;
    }
    return sessions[key];
  }

  restoreNaming(key);

  const total = set.total;
  const frames = new Array(total).fill(null);

  const session = {
    folder: key,
    frames,
    total,
    readyMin: set.readyMin,
    requireAll: Boolean(set.requireAll),
    loaded: 0,
    ready: false,
    maxContiguous: -1,
    listeners: new Set(),
    promise: null,
    aborted: false,
    aggressive,
    cache: null,
    pendingBoost: new Set(),
  };

  session.subscribe = (fn) => {
    session.listeners.add(fn);
    fn({
      loaded: session.loaded,
      total,
      ready: session.ready,
      ratio: session.loaded / total,
      folder: key,
      maxContiguous: session.maxContiguous,
    });
    return () => session.listeners.delete(fn);
  };

  /** Hot-path: pull upcoming frames around the playhead to the front of the queue */
  session.boostAround = (frameIndex, radius = 24) => {
    if (session.aborted) return;
    const center = Math.round(frameIndex);
    for (let d = 0; d <= radius; d += 1) {
      const a = center + d;
      const b = center - d;
      if (a >= 0 && a < total && !frames[a]) session.pendingBoost.add(a + 1);
      if (d > 0 && b >= 0 && b < total && !frames[b]) {
        session.pendingBoost.add(b + 1);
      }
    }
  };

  const storeFrame = (i, img) => {
    if (!img || frames[i]) return;
    frames[i] = img;
    session.loaded += 1;
    recomputeContiguous(session);
    markReady(session);
    // Throttle notify: every frame or every 4th — every 2nd is a good balance
    if (session.loaded % 2 === 0 || session.ready) notify(session);
  };

  session.promise = (async () => {
    const cache = await openCache();
    session.cache = cache;
    await resolveNaming(key, cache);

    const concurrency = aggressive ? MAX_CONCURRENT : HOME_BATCH_SIZE;

    // Phase 1: first frame immediately (paint something)
    const first = await loadFrame(key, 1, cache);
    storeFrame(0, first);
    notify(session);

    // Phase 2: everything else in high-concurrency pool (order: 2..total)
    // Workers also drain pendingBoost first so scroll playhead stays hot.
    const remaining = [];
    for (let n = 2; n <= total; n += 1) remaining.push(n);

    if (priorityOnly) {
      const slice = remaining.slice(
        0,
        Math.min(Math.max(48, set.readyMin) - 1, remaining.length),
      );
      await runPool(slice, concurrency, async (n) => {
        const img = await loadFrame(key, n, cache);
        storeFrame(n - 1, img);
      });
      if (!session.ready) {
        session.ready = true;
        notify(session);
      }
      return;
    }

    let cursor = 0;
    const workers = Array.from({ length: concurrency }, async () => {
      while (!session.aborted) {
        let n = null;
        // Prefer boosts around current scrub position
        if (session.pendingBoost.size) {
          const it = session.pendingBoost.values().next();
          n = it.value;
          session.pendingBoost.delete(n);
          if (frames[n - 1]) continue;
        } else if (cursor < remaining.length) {
          n = remaining[cursor];
          cursor += 1;
          if (frames[n - 1]) continue;
        } else {
          break;
        }
        const img = await loadFrame(key, n, cache);
        storeFrame(n - 1, img);
      }
    });

    await Promise.all(workers);

    recomputeContiguous(session);
    if (!session.ready) {
      session.ready = true;
      notify(session);
    } else {
      notify(session);
    }
  })();

  sessions[key] = session;
  return session;
}

export function getFrameSession(folder) {
  const key = normalizeFolder(folder);
  return sessions[key] || null;
}

export function getLoadedCount(folder) {
  const s = getFrameSession(folder);
  return s?.loaded ?? 0;
}

/** Highest index where frames[0..index] are all loaded (−1 if none). */
export function maxContiguousLoaded(frames) {
  if (!frames?.length) return -1;
  let i = 0;
  while (i < frames.length && frames[i]) i += 1;
  return i - 1;
}

export function nearestLoaded(frames, index) {
  if (!frames?.length) return null;
  const max = frames.length - 1;
  let i = Math.round(Math.min(max, Math.max(0, index)));
  if (frames[i]) return frames[i];
  // Prefer earlier (contiguous) — never flash a later hole
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
