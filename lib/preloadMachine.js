const MODEL_SRC = "/orange_machine.glb";
const PARK_ID = "orango-model-park";
const CACHE_NAME = "orango-model-v1";

let warmPromise = null;
let viewerEl = null;
let adoptCount = 0;
let parkTimer = null;

function ensurePark() {
  let park = document.getElementById(PARK_ID);
  if (!park) {
    park = document.createElement("div");
    park.id = PARK_ID;
    park.setAttribute("aria-hidden", "true");
    document.body.appendChild(park);
  }
  // Keep in-viewport so the browser actually compiles WebGL (offscreen often skips it).
  // Cap size to the viewport so it never creates horizontal scroll on phones.
  park.style.cssText =
    "position:fixed;top:0;left:0;width:min(420px,100vw);height:min(640px,100dvh);opacity:0;pointer-events:none;z-index:0;overflow:hidden;max-width:100vw;";
  return park;
}

function applyViewerDefaults(el) {
  el.setAttribute("src", MODEL_SRC);
  el.setAttribute("alt", "Orango fresh orange juice vending machine");
  el.setAttribute("camera-controls", "true");
  el.setAttribute("disable-zoom", "true");
  el.setAttribute("disable-pan", "true");
  el.setAttribute("auto-rotate", "");
  el.setAttribute("auto-rotate-delay", "1200");
  el.setAttribute("rotation-per-second", "6deg");
  el.setAttribute("interaction-prompt", "none");
  el.setAttribute("interaction-prompt-style", "wiggle");
  el.setAttribute("interaction-prompt-threshold", "1200");
  el.setAttribute("shadow-intensity", "0.55");
  el.setAttribute("shadow-softness", "1");
  el.setAttribute("exposure", "1.18");
  el.setAttribute("environment-image", "neutral");
  el.setAttribute("camera-target", "auto");
  el.setAttribute("interpolation-decay", "90");
  el.setAttribute("loading", "eager");
  el.setAttribute("reveal", "auto");
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.display = "block";
  el.style.minHeight = "0";
  el.style.background = "transparent";
  el.style.outline = "none";
}

export function applyOrbit(el, compact) {
  if (!el) return;
  const radius = compact ? "105%" : "92%";
  const fov = compact ? "28deg" : "20deg";
  const polar = compact ? "80deg" : "78deg";
  const azimuth = compact ? "18deg" : "22deg";
  const orbit = `${azimuth} ${polar} ${radius}`;
  const lockedOrbit = `auto ${polar} ${radius}`;
  el.setAttribute("camera-orbit", orbit);
  el.setAttribute("min-camera-orbit", lockedOrbit);
  el.setAttribute("max-camera-orbit", lockedOrbit);
  el.setAttribute("field-of-view", fov);
  el.setAttribute("min-field-of-view", fov);
  el.setAttribute("max-field-of-view", fov);
  el.setAttribute("touch-action", compact ? "pan-y" : "none");
  el.style.touchAction = compact ? "pan-y" : "none";
}

async function cacheModelFile() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(MODEL_SRC);
    if (hit) return;
    const res = await fetch(MODEL_SRC, { credentials: "same-origin" });
    if (res.ok) await cache.put(MODEL_SRC, res.clone());
  } catch {
    try {
      const res = await fetch(MODEL_SRC, {
        cache: "force-cache",
        credentials: "same-origin",
      });
      if (res.ok) await res.arrayBuffer();
    } catch {
      /* ignore */
    }
  }
}

function waitForViewerLoad(el) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    if (el.loaded) {
      finish();
      return;
    }

    el.addEventListener("load", finish, { once: true });
    el.addEventListener("model-visibility", finish, { once: true });

    // Poll loaded flag — some builds set it without a reliable event order.
    const poll = window.setInterval(() => {
      if (el.loaded) {
        window.clearInterval(poll);
        finish();
      }
    }, 100);

    window.setTimeout(() => {
      window.clearInterval(poll);
      finish();
    }, 20000);
  });
}

/**
 * Fully warm model-viewer + GLB while the landing video plays.
 * Builds a real in-DOM viewer so parse/GPU work finishes before /home.
 */
export function preloadMachineAssets() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (warmPromise) return warmPromise;

  warmPromise = (async () => {
    await import("@google/model-viewer");
    // Fetch GLB in parallel with custom-element upgrade where possible
    const cacheTask = cacheModelFile();

    const park = ensurePark();

    if (!viewerEl) {
      viewerEl = document.createElement("model-viewer");
      applyViewerDefaults(viewerEl);
      applyOrbit(
        viewerEl,
        window.matchMedia("(max-width: 1023px)").matches,
      );
      park.appendChild(viewerEl);
    }

    await Promise.all([cacheTask, waitForViewerLoad(viewerEl)]);
    return viewerEl;
  })();

  return warmPromise;
}

export function whenMachineAssetsReady() {
  return warmPromise ?? preloadMachineAssets();
}

/** Move the preloaded viewer into a visible home container (no reload). */
export async function adoptMachineViewer(
  container,
  { className = "", compact = false } = {},
) {
  const el = await whenMachineAssetsReady();
  if (!el || !container) return null;

  if (parkTimer) {
    window.clearTimeout(parkTimer);
    parkTimer = null;
  }

  adoptCount += 1;
  applyOrbit(el, compact);
  el.className = className;
  if (el.parentElement !== container) {
    container.appendChild(el);
  }

  // Show the classic left–right solid hand only once the viewer is on /home.
  // (Kept off during landing warmup so the prompt is not burned off-screen.)
  el.setAttribute("interaction-prompt-style", "wiggle");
  el.setAttribute("interaction-prompt-threshold", "1200");
  el.setAttribute("interaction-prompt", "auto");
  try {
    el.interactionPromptStyle = "wiggle";
    el.interactionPromptThreshold = 1200;
    el.interactionPrompt = "auto";
    el.resetInteractionPrompt?.();
  } catch {
    /* optional API */
  }

  requestAnimationFrame(() => {
    try {
      el.updateFraming?.();
      el.resetInteractionPrompt?.();
    } catch {
      /* optional */
    }
  });

  return el;
}

/** Park off the home slot, but keep the instance alive.
 * Ref-count + short delay survives React Strict Mode remounts.
 */
export function parkMachineViewer() {
  if (!viewerEl || typeof document === "undefined") return;

  adoptCount = Math.max(0, adoptCount - 1);
  if (adoptCount > 0) return;

  // Hide prompt while parked so it can reappear next adopt.
  try {
    viewerEl.setAttribute("interaction-prompt", "none");
    viewerEl.interactionPrompt = "none";
  } catch {
    /* ignore */
  }

  if (parkTimer) window.clearTimeout(parkTimer);
  parkTimer = window.setTimeout(() => {
    parkTimer = null;
    if (adoptCount === 0 && viewerEl) {
      ensurePark().appendChild(viewerEl);
    }
  }, 80);
}

export function isMachineWarm() {
  return Boolean(viewerEl?.loaded);
}

export { MODEL_SRC };
