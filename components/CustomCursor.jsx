"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -80, y: -80 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const target = e.target;
      const interactive = target.closest("a, button, summary, input, textarea, select");
      setHover(Boolean(interactive));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height,opacity] duration-300 ${
          hover ? "h-12 w-12 opacity-90" : "h-3 w-3 opacity-100"
        }`}
      />
    </div>
  );
}
