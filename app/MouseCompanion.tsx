"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function MouseCompanion() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let robot: Point = { x: window.innerWidth * .18, y: window.innerHeight * .72 };
    let mouse: Point = { x: window.innerWidth * .5, y: window.innerHeight * .5 };
    let roamTarget: Point = { ...robot };
    let lastMouseMove = 0;
    let nextDecision = 0;
    let holeTrip = false;
    let hidden = false;
    const timeouts: number[] = [];

    const holes = (): Point[] => [
      { x: 12, y: window.innerHeight * .34 },
      { x: window.innerWidth - 12, y: window.innerHeight * .62 },
      { x: window.innerWidth * .28, y: window.innerHeight - 12 },
      { x: window.innerWidth * .72, y: 12 },
    ];
    const randomPlayPoint = (): Point => ({ x: 55 + Math.random() * (window.innerWidth - 110), y: window.innerHeight * (.28 + Math.random() * .54) });
    const chooseRoamTarget = (now: number) => {
      if (Math.random() < .28) {
        const options = holes();
        roamTarget = options[Math.floor(Math.random() * options.length)];
        holeTrip = true;
        robotRef.current?.classList.add("is-hole-bound");
      } else {
        roamTarget = randomPlayPoint();
        holeTrip = false;
        robotRef.current?.classList.remove("is-hole-bound");
      }
      nextDecision = now + 2400 + Math.random() * 2400;
    };

    const emergeElsewhere = () => {
      if (hidden) return;
      hidden = true;
      robotRef.current?.classList.add("is-diving");
      timeouts.push(window.setTimeout(() => {
        const exits = holes();
        const exit = exits[Math.floor(Math.random() * exits.length)];
        robot = { ...exit };
        robotRef.current?.classList.remove("is-diving", "is-hole-bound");
        robotRef.current?.classList.add("is-emerging");
        timeouts.push(window.setTimeout(() => robotRef.current?.classList.remove("is-emerging"), 520));
        hidden = false;
        holeTrip = false;
        roamTarget = randomPlayPoint();
        nextDecision = performance.now() + 2600;
      }, 420));
    };

    const animate = (now: number) => {
      const chasing = now - lastMouseMove < 760;
      if (!chasing && now > nextDecision && !hidden) chooseRoamTarget(now);
      const target = chasing ? { x: mouse.x + 23, y: mouse.y + 25 } : roamTarget;
      const dx = target.x - robot.x;
      const dy = target.y - robot.y;
      const distance = Math.hypot(dx, dy);
      const speed = chasing ? Math.min(6.2, 1.8 + distance * .018) : 2.15;
      if (distance > 1 && !hidden) {
        robot.x += dx / distance * Math.min(speed, distance);
        robot.y += dy / distance * Math.min(speed, distance);
      }
      const lean = Math.max(-12, Math.min(12, dx * .05));
      robotRef.current?.style.setProperty("transform", `translate3d(${robot.x}px, ${robot.y}px, 0) rotate(${lean}deg)`);
      robotRef.current?.classList.toggle("is-chasing", chasing && distance > 26);
      robotRef.current?.classList.toggle("is-playing", !chasing && !holeTrip);
      if (!chasing && holeTrip && distance < 9) emergeElsewhere();
      frame = window.requestAnimationFrame(animate);
    };

    const onMove = (event: PointerEvent) => {
      mouse = { x: event.clientX, y: event.clientY };
      lastMouseMove = performance.now();
      cursorRef.current?.style.setProperty("transform", `translate3d(${mouse.x}px, ${mouse.y}px, 0)`);
      lightRef.current?.style.setProperty("transform", `translate3d(${mouse.x}px, ${mouse.y}px, 0)`);
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
    nextDecision = performance.now() + 1200;
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.cancelAnimationFrame(frame);
      timeouts.forEach(window.clearTimeout);
      document.querySelectorAll(".mouse-click-ripple").forEach((node) => node.remove());
    };
  }, []);

  return <>
    <div className="robot-hole hole-left" aria-hidden="true"><i /></div>
    <div className="robot-hole hole-right" aria-hidden="true"><i /></div>
    <div className="robot-hole hole-bottom" aria-hidden="true"><i /></div>
    <div className="robot-hole hole-top" aria-hidden="true"><i /></div>
    <div ref={lightRef} className="mouse-spotlight" aria-hidden="true"><i /><b /></div>
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><i /><b /><span /></div>
    <div ref={robotRef} className="mouse-robot" aria-hidden="true">
      <div className="robot-antenna"><i /></div>
      <div className="robot-ear ear-left" /><div className="robot-ear ear-right" />
      <div className="robot-head"><span /><span /><b /></div>
      <div className="robot-arm arm-left"><i /></div><div className="robot-arm arm-right"><i /></div>
      <div className="robot-body"><i /><b /></div>
      <div className="robot-leg leg-left" /><div className="robot-leg leg-right" />
      <div className="robot-thruster" />
    </div>
  </>;
}
