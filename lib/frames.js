export const TOTAL_FRAMES = 250;
export const FRAME_STEP = 1;
export const FRAME_LERP = 0.13;
export const PRELOAD_READY_RATIO = 0.7;
export const BATCH_SIZE = 20;
export const WIDTH_BREAKPOINT = 1081;
export const SCRUB = 0.42;

const sessions = {};

export function folderFromWidth(width) {
  return width <= WIDTH_BREAKPOINT ? "mobile" : "desktop";
}

export function frameSrc(folder, n) {
  const id = String(n).padStart(3, "0");
  return `/${folder}/ezgif-frame-${id}.png`;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export function preloadFrames(folder) {
  if (sessions[folder]) return sessions[folder];

  const total = TOTAL_FRAMES;
  const frames = new Array(total).fill(null);

  const session = {
    folder,
    frames,
    total,
    loaded: 0,
    ready: false,
    listeners: new Set(),
    promise: null,
  };

  const emit = () => {
    const payload = {
      loaded: session.loaded,
      total,
      ready: session.ready,
      ratio: session.loaded / total,
    };
    session.listeners.forEach((fn) => fn(payload));
  };

  session.subscribe = (fn) => {
    session.listeners.add(fn);
    fn({
      loaded: session.loaded,
      total,
      ready: session.ready,
      ratio: session.loaded / total,
    });
    return () => session.listeners.delete(fn);
  };

  session.promise = (async () => {
    frames[0] = await loadImage(frameSrc(folder, 1));
    if (frames[0]) session.loaded = 1;
    emit();

    const remaining = [];
    for (let n = 2; n <= total; n += FRAME_STEP) remaining.push(n);

    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
      const batch = remaining.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map((n) => loadImage(frameSrc(folder, n))),
      );
      results.forEach((img, idx) => {
        frames[batch[idx] - 1] = img;
        if (img) session.loaded += 1;
      });
      if (!session.ready && session.loaded / total >= PRELOAD_READY_RATIO) {
        session.ready = true;
      }
      emit();
    }

    if (!session.ready) {
      session.ready = true;
      emit();
    }
  })();

  sessions[folder] = session;
  return session;
}

export function nearestLoaded(frames, index) {
  if (!frames?.length) return null;
  const max = frames.length - 1;
  const i = Math.round(Math.min(max, Math.max(0, index)));
  if (frames[i]) return frames[i];
  for (let d = 1; d <= max; d += 1) {
    if (i + d <= max && frames[i + d]) return frames[i + d];
    if (i - d >= 0 && frames[i - d]) return frames[i - d];
  }
  return null;
}

export function drawFrame(ctx, img, width, height, mode) {
  if (!ctx) return;
  if (mode === "contain") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }
  if (!img) return;

  const scale =
    mode === "cover"
      ? Math.max(width / img.width, height / img.height)
      : Math.min(width / img.width, height / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = (width - dw) / 2;
  const dy = (height - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}
