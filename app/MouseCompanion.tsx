"use client";

import { useEffect, useRef } from "react";

export default function MouseCompanion() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let robotX = targetX + 24;
    let robotY = targetY + 24;

    const animate = () => {
      robotX += (targetX + 25 - robotX) * 0.11;
      robotY += (targetY + 27 - robotY) * 0.11;
      const lean = Math.max(-9, Math.min(9, (targetX + 25 - robotX) * 0.18));
      robotRef.current?.style.setProperty("transform", `translate3d(${robotX}px, ${robotY}px, 0) rotate(${lean}deg)`);
      frame = window.requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorRef.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`);
      lightRef.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`);
      const interactive = (event.target as Element | null)?.closest("a, button, article, [role='button']");
      cursorRef.current?.classList.toggle("is-hovering", Boolean(interactive));
      robotRef.current?.classList.toggle("is-curious", Boolean(interactive));
    };

    const onDown = (event: PointerEvent) => {
      cursorRef.current?.classList.add("is-clicking");
      window.setTimeout(() => cursorRef.current?.classList.remove("is-clicking"), 180);
      const ripple = document.createElement("span");
      ripple.className = "mouse-click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.cancelAnimationFrame(frame);
      document.querySelectorAll(".mouse-click-ripple").forEach((node) => node.remove());
    };
  }, []);

  return <>
    <div ref={lightRef} className="mouse-spotlight" aria-hidden="true" />
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><i /></div>
    <div ref={robotRef} className="mouse-robot" aria-hidden="true">
      <div className="robot-antenna"><i /></div>
      <div className="robot-head"><span /><span /><b /></div>
      <div className="robot-body"><i /></div>
      <div className="robot-thruster" />
    </div>
  </>;
}
