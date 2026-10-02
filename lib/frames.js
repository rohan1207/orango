/**
 * OranGo scroll-hero frames — max-throughput preload + Cache API.
 *
 * Sets (sessions keyed by folder — home1 / home3 / home4 never conflict):
 *   home1 → /frames/home1_desktop|home1_mobile (288)
 *   home3 → /frames/home3_desktop|home3_mobile (223)
 *   home4 → live homepage:
 *     desktop: /frames/final_frames_desktop (112)
 *     mobile:  /frames/home4_mobile (231)
 *
 * Landing warms the home4 set (live homepage).
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
    desktop: "final_frames_desktop",
    mobile: "home4_mobile",
    total: 112,
    desktopTotal: 112,
    mobileTotal: 231,
    /** Unlock only when every frame is ready — landing waits for 100% */
    readyRatio: 1,
    readyMin: 112,
    requireAll: true,
  },
};

export const DEFAULT_FRAME_SET = "home4";

/** @deprecated prefer getFrameSet(id).total */
export const TOTAL_FRAMES = FRAME_SETS.home4.total;
export const SCRUB = 0.4;
export const READY_MIN_FRAMES = FRAME_SETS.home4.readyMin;
export const READY_RATIO = 0.85;
export const PRIORITY_COUNT = FRAME_SETS.home4.total;
export const MAX_CONCURRENT = 64;
export const HOME_BATCH_SIZE = 32;
export const LANDING_BATCH_SIZE = 64;
/** Landing waits until all frames are loaded before entering the hero */
export const LANDING_MIN_FRAME_RATIO = 1;
/** Cache API bucket — bump to invalidate stale frame sets */
export const CACHE_NAME = "orango-frames-final-v5";
export const FRAMES_BASE = "/frames";
export const FRAME_EXT = "png";
export const MOBILE_BREAKPOINT = 768;

export const FOLDER_DESKTOP = FRAME_SETS.home4.desktop;
export const FOLDER_MOBILE = FRAME_SETS.home4.mobile;

const sessions = {};
const namingIndexByFolder = {};
let pruneStarted = false;

function coverageKey(folder) {
  return `orango-fc-${normalizeFolder(folder)}`;
}

function persistCoverage(folder, loaded, total) {
  try {
    localStorage.setItem(
      coverageKey(folder),
      JSON.stringify({ loaded, total, t: Date.now() }),
    );
  } catch {
    /* private mode / quota */
  }
}

/** Sync hint from a previous visit (may be stale — verify with Cache API when possible). */
export function readPersistedCoverage(folder) {
  try {
    const raw = localStorage.getItem(coverageKey(folder));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.total) return null;
    return {
      loaded: Number(data.loaded) || 0,
      total: Number(data.total) || 0,
      ratio: (Number(data.loaded) || 0) / Number(data.total),
      t: data.t || 0,
    };
  } catch {
    return null;
  }
}

async function pruneOldFrameCaches() {
  if (pruneStarted || typeof caches === "undefined") return;
  pruneStarted = true;
  try {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k.startsWith("orango-frames") && k !== CACHE_NAME)
        .map((k) => caches.delete(k)),
    );
  } catch {
    /* ignore */
  }
}

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
  if (
    key.startsWith("home4") ||
    key.startsWith("final_frames") ||
    key === "final_desktop" ||
    key === "final_mobile"
  ) {
    return "home4";
  }
  if (key.startsWith("home3")) return "home3";
  return "home1";
}

export function totalForFolder(folder) {
  const key = String(normalizeFolder(folder));
  const set = getFrameSet(setIdFromFolder(key));
  if (key === set.desktop && set.desktopTotal != null) return set.desktopTotal;
  if (key === set.mobile && set.mobileTotal != null) return set.mobileTotal;
  return set.total;
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
  // Once every slot is filled (incl. gap-holds), scrub may use the full range
  if (session.loaded >= session.total && session.total > 0) {
    session.maxContiguous = session.total - 1;
  }
}

async function openCache() {
  if (typeof caches === "undefined") return null;
  try {
    pruneOldFrameCaches();
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

async function fetchFrameBlob(src, cache, { bypassCache = false } = {}) {
  // 1) Cache API — skip when bypassing (retry path)
  if (cache && !bypassCache) {
    try {
      const hit = await cache.match(src);
      if (hit?.ok) {
        try {
          const blob = await hit.blob();
          if (blob && blob.size > 0) return blob;
        } catch {
          try {
            await cache.delete(src);
          } catch {
            /* ignore */
          }
        }
      }
    } catch {
      /* ignore */
    }
  }

  // 2) Network — prefer fresh on bypass, otherwise allow HTTP cache
  const modes = bypassCache
    ? ["reload", "no-store"]
    : ["force-cache", "default", "reload"];

  let res = null;
  for (const mode of modes) {
    try {
      res = await fetch(src, {
        credentials: "same-origin",
        cache: mode,
      });
      if (res?.ok) break;
    } catch {
      res = null;
    }
  }
  if (!res?.ok) return null;

  // 3) Persist into Cache API for next visit
  if (cache) {
    try {
      await cache.put(src, res.clone());
    } catch {
      /* quota / private mode */
    }
  }

  try {
    const blob = await res.blob();
    if (!blob || blob.size <= 0) return null;
    return blob;
  } catch {
    return null;
  }
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
  try {
    const key = normalizeFolder(folder);
    restoreNaming(key);
    if (namingIndexByFolder[key] == null) {
      await resolveNaming(key, cache);
    }
    const src = frameSrc(key, n);
    // First try cache/network, then hard network retry
    let blob = await fetchFrameBlob(src, cache);
    if (!blob) {
      blob = await fetchFrameBlob(src, cache, { bypassCache: true });
    }
    if (!blob) return null;
    let img = await blobToDrawable(blob);
    if (!img) {
      // Corrupt cache entry — refetch fresh
      try {
        await cache?.delete?.(src);
      } catch {
        /* ignore */
      }
      blob = await fetchFrameBlob(src, cache, { bypassCache: true });
      if (!blob) return null;
      img = await blobToDrawable(blob);
    }
    return img;
  } catch {
    return null;
  }
}

function markReady(session) {
  if (session.ready) return;
  const ratio = session.total ? session.loaded / session.total : 0;
  const readyMin = session.readyMin ?? READY_MIN_FRAMES;
  const readyRatio = session.readyRatio ?? READY_RATIO;
  const requireAll = Boolean(session.requireAll);

  if (requireAll) {
    if (session.loaded >= session.total) {
      session.ready = true;
      notify(session);
    }
    return;
  }

  if (
    session.loaded >= readyMin ||
    ratio >= readyRatio ||
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
 * Count how many frames are already in the Cache API (return-visit speed).
 */
export async function probeCacheCoverage(folder) {
  const key = normalizeFolder(folder);
  const total = totalForFolder(key);
  const persisted = readPersistedCoverage(key);

  const cache = await openCache();
  if (!cache) {
    return {
      ratio: persisted?.ratio || 0,
      hits: persisted?.loaded || 0,
      total,
      fromPersisted: true,
    };
  }

  restoreNaming(key);
  await resolveNaming(key, cache);

  let hits = 0;
  const indices = [];
  for (let n = 1; n <= total; n += 1) indices.push(n);

  await runPool(indices, Math.min(48, MAX_CONCURRENT), async (n) => {
    try {
      const hit = await cache.match(frameSrc(key, n));
      if (hit?.ok) hits += 1;
    } catch {
      /* ignore */
    }
  });

  persistCoverage(key, hits, total);
  return { ratio: total ? hits / total : 0, hits, total, fromPersisted: false };
}

/**
 * Landing / keep-warm: load the FULL frame set aggressively (all 132 desktop).
 * Session survives into the homepage hero — no early 50% cut-off.
 */
export function warmupFramesFromLanding(setId = DEFAULT_FRAME_SET) {
  if (typeof window === "undefined") return null;
  const folder = folderFromWidth(window.innerWidth, setId);
  injectFramePreloadLinks(folder, totalForFolder(folder));
  return preloadFrames(folder, { aggressive: true });
}

/** Quiet keep-warm for return visits (intro skipped). */
export function ensureLiveFramesWarm(setId = DEFAULT_FRAME_SET) {
  if (typeof window === "undefined") return null;
  const folder = folderFromWidth(window.innerWidth, setId);
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
 * @param {{ aggressive?: boolean, priorityOnly?: boolean, frontLoadRatio?: number }} [opts]
 */
export function preloadFrames(folder = FOLDER_DESKTOP, opts = {}) {
  const key = normalizeFolder(folder);
  const aggressive = Boolean(opts.aggressive);
  const priorityOnly = Boolean(opts.priorityOnly);
  const frontLoadRatio = Math.min(
    1,
    Math.max(0, Number(opts.frontLoadRatio) || 0),
  );
  const set = getFrameSet(setIdFromFolder(key));
  const expectedTotal = totalForFolder(key);

  // Drop stale sessions (e.g. old 132-count vs new 112-count)
  if (sessions[key] && sessions[key].total !== expectedTotal) {
    try {
      sessions[key].aborted = true;
    } catch {
      /* ignore */
    }
    delete sessions[key];
  }

  if (sessions[key]) {
    if (aggressive && !sessions[key].aggressive) {
      sessions[key].aggressive = true;
    }
    return sessions[key];
  }

  restoreNaming(key);

  const total = totalForFolder(key);
  const frames = new Array(total).fill(null);
  const readyRatio =
    typeof set.readyRatio === 'number' ? set.readyRatio : READY_RATIO;
  const readyMin =
    typeof set.readyRatio === 'number'
      ? Math.ceil(total * set.readyRatio)
      : set.readyMin;

  const session = {
    folder: key,
    frames,
    total,
    readyMin,
    readyRatio,
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
    if (session.loaded % 2 === 0 || session.ready || session.loaded >= total) {
      notify(session);
    }
    if (session.loaded >= total) {
      persistCoverage(key, session.loaded, total);
    } else if (session.loaded % 16 === 0) {
      persistCoverage(key, session.loaded, total);
    }
  };

  const fillGaps = () => {
    let filler = frames[0];
    for (let i = 0; i < total; i += 1) {
      if (frames[i]) filler = frames[i];
      else if (filler) storeFrame(i, filler);
    }
  };

  /** Decode everything already in Cache API before hitting the network */
  const hydrateFromCache = async () => {
    if (!session.cache) return;
    const indices = [];
    for (let n = 1; n <= total; n += 1) {
      if (!frames[n - 1]) indices.push(n);
    }
    if (!indices.length) return;

    await runPool(indices, Math.min(64, MAX_CONCURRENT), async (n) => {
      if (frames[n - 1]) return;
      try {
        const src = frameSrc(key, n);
        const hit = await session.cache.match(src);
        if (!hit?.ok) return;
        const blob = await hit.blob();
        const img = await blobToDrawable(blob);
        if (img) storeFrame(n - 1, img);
      } catch {
        /* ignore single-frame cache miss */
      }
    });
    notify(session);
  };

  const loadRange = async (fromN, toN, concurrency) => {
    const indices = [];
    for (let n = fromN; n <= toN; n += 1) {
      if (!frames[n - 1]) indices.push(n);
    }
    if (!indices.length) return;
    await runPool(indices, concurrency, async (n) => {
      if (frames[n - 1]) return;
      const img = await loadFrame(key, n, session.cache);
      if (img) storeFrame(n - 1, img);
    });
  };

  /** Second pass with cache bypass for any still-missing frames */
  const retryMissing = async () => {
    const missing = [];
    for (let n = 1; n <= total; n += 1) {
      if (!frames[n - 1]) missing.push(n);
    }
    if (!missing.length) return;
    await runPool(missing, Math.min(32, MAX_CONCURRENT), async (n) => {
      if (frames[n - 1]) return;
      try {
        const src = frameSrc(key, n);
        const blob = await fetchFrameBlob(src, session.cache, {
          bypassCache: true,
        });
        if (!blob) return;
        const img = await blobToDrawable(blob);
        if (img) storeFrame(n - 1, img);
      } catch {
        /* ignore */
      }
    });
  };

  const finalize = async () => {
    await retryMissing();
    // Last resort only — should be rare after retries
    fillGaps();
    if (session.loaded >= total) {
      session.maxContiguous = total - 1;
      session.ready = true;
    } else {
      recomputeContiguous(session);
      session.ready = session.loaded >= readyMin;
    }
    persistCoverage(key, session.loaded, total);
    notify(session);
  };

  session.promise = (async () => {
    session.cache = await openCache();
    await resolveNaming(key, session.cache);

    const concurrency = aggressive ? MAX_CONCURRENT : HOME_BATCH_SIZE;

    await hydrateFromCache();

    if (!frames[0]) {
      const first = await loadFrame(key, 1, session.cache);
      storeFrame(0, first);
    }
    notify(session);

    if (priorityOnly) {
      const sliceEnd = Math.min(Math.max(48, readyMin), total);
      await loadRange(2, sliceEnd, concurrency);
      await finalize();
      return;
    }

    if (frontLoadRatio > 0 && frontLoadRatio < 1) {
      const frontEnd = Math.max(2, Math.ceil(total * frontLoadRatio));
      await loadRange(2, frontEnd, concurrency);
      notify(session);
      await loadRange(frontEnd + 1, total, concurrency);
      await finalize();
      return;
    }

    const remaining = [];
    for (let n = 2; n <= total; n += 1) {
      if (!frames[n - 1]) remaining.push(n);
    }

    let cursor = 0;
    const workers = Array.from({ length: concurrency }, async () => {
      while (!session.aborted) {
        let n = null;
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
        const img = await loadFrame(key, n, session.cache);
        if (img) storeFrame(n - 1, img);
      }
    });

    await Promise.all(workers);
    await finalize();
  })();

  sessions[key] = session;
  return session;
}

export function getFrameSession(folder) {
  const key = normalizeFolder(folder);
  return sessions[key] || null;
}

/** Drop in-memory sessions for a set so the next warmup loads fresh. */
export function invalidateFrameSessionsForSet(setId = DEFAULT_FRAME_SET) {
  const set = getFrameSet(setId);
  for (const folder of [set.desktop, set.mobile]) {
    const key = normalizeFolder(folder);
    if (sessions[key]) {
      try {
        sessions[key].aborted = true;
      } catch {
        /* ignore */
      }
      delete sessions[key];
    }
  }
}

export function getLoadedCount(folder) {
  const s = getFrameSession(folder);
  return s?.loaded ?? 0;
}

/**
 * Highest frame index the scrubber may target.
 * Once unlocked/ready, always allow the last frame — never stall mid-sequence.
 */
export function scrubMaxIndex(session) {
  if (!session?.total) return 0;
  const last = session.total - 1;
  if (session.ready || session.loaded >= session.total) return last;
  // Also allow full range if every slot is non-null
  const frames = session.frames;
  if (frames?.length && frames.every(Boolean)) return last;
  const contig = session.maxContiguous ?? -1;
  if (contig < 0) return 0;
  return Math.min(last, Math.max(0, contig));
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
