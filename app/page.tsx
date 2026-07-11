"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight, Braces, Cpu, Github, Mail, Radio, Sparkles, Terminal, UserRound, X } from "lucide-react";

type ZoneId = "about" | "projects" | "lab";
type Phase = "idle" | "seating" | "turning";

const zones = [
  { id: "about" as const, no: "01", label: "ABOUT.EXE", short: "IDENTITY", eyebrow: "LEFT WALL / IDENTITY", title: "在代码与想象力的交界处，构建有生命力的数字体验。", copy: "你好，我是一名创意开发者。我把产品思维、视觉叙事与前端工程组合起来，让每一次点击都像进入一个新世界。", tags: ["06+ YEARS", "SHANGHAI / REMOTE", "AVAILABLE 2026"], icon: UserRound },
  { id: "projects" as const, no: "02", label: "PROJECTS.LOG", short: "SELECTED WORK", eyebrow: "FRONT WALL / SELECTED WORK", title: "不是作品列表，而是三次值得进入的任务现场。", copy: "从品牌官网到 AI 产品原型，每个项目都由一个明确的问题开始，最终落到可感知、可使用、可增长的体验。", tags: ["AI PRODUCT", "IMMERSIVE WEB", "DESIGN SYSTEM"], icon: Braces },
  { id: "lab" as const, no: "03", label: "LAB.SYS", short: "SKILLS & CONTACT", eyebrow: "RIGHT WALL / SKILLS & CONTACT", title: "保持实验，保持在线。一起制造一点没见过的东西。", copy: "React、TypeScript、WebGL、动效与生成式 AI 是我的常用工具。如果你有一个大胆的想法，右侧频道随时开放。", tags: ["REACT / NEXT", "WEBGL / MOTION", "HELLO@STUDIO.DEV"], icon: Cpu },
];

const faceRotation: Record<ZoneId, number> = { about: -90, projects: 0, lab: 90 };

export default function Home() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [seated, setSeated] = useState(false);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => { const timer = window.setTimeout(() => setDoorOpen(true), 2350); return () => { window.clearTimeout(timer); clearTimers(); }; }, []);

  const enterZone = useCallback((id: ZoneId) => {
    if (phase !== "idle") return;
    if (!seated) {
      setActive(id);
      setRotation(faceRotation[id]);
      setPhase("seating");
      timers.current.push(window.setTimeout(() => setSeated(true), 1050));
      timers.current.push(window.setTimeout(() => setPhase("idle"), 1950));
      return;
    }
    if (id === active) return;
    const target = faceRotation[id];
    setPhase("turning");
    setRotation((current) => {
      let candidate = target;
      while (candidate - current > 180) candidate -= 360;
      while (candidate - current < -180) candidate += 360;
      return candidate;
    });
    setActive(id);
    timers.current.push(window.setTimeout(() => setPhase("idle"), 3150));
  }, [active, phase, seated]);

  const navigate = useCallback((direction: number) => {
    if (!seated || !active || phase !== "idle") return;
    const index = zones.findIndex((zone) => zone.id === active);
    const next = (index + direction + zones.length) % zones.length;
    const nextId = zones[next].id;
    setPhase("turning");
    setRotation((current) => {
      let candidate = faceRotation[nextId];
      while (candidate - current > 180) candidate -= 360;
      while (candidate - current < -180) candidate += 360;
      return candidate;
    });
    setActive(nextId);
    timers.current.push(window.setTimeout(() => setPhase("idle"), 3150));
  }, [active, phase, seated]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "Escape" && seated && phase === "idle") { setSeated(false); setActive(null); setRotation(0); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, phase, seated]);

  const current = zones.find((zone) => zone.id === active);

  return (
    <main className={`experience ${doorOpen ? "door-open" : "door-closed"} ${seated ? "is-seated" : "is-standing"} ${active ? `active-${active}` : ""} phase-${phase}`}>
      <div className="standing-room" aria-hidden="true"><div className="standing-photo" /><div className="standing-shade" /></div>

      <div className="room-viewport" aria-hidden="true">
        <div className="room-ring" style={{ "--room-turn": `${rotation}deg` } as React.CSSProperties}>
          <div className="room-face face-projects"><div className="face-image" /></div>
          <div className="room-face face-lab"><div className="face-image" /></div>
          <div className="room-face face-about"><div className="face-image" /></div>
          <div className="room-plane room-ceiling" />
          <div className="room-plane room-floor" />
        </div>
        <div className="seated-vignette" /><div className="speed-lines" />
      </div>

      <div className="door door-left"><span /></div><div className="door door-right"><span /></div>
      <div className="intro-copy">
        <div><Terminal size={17} /> NF_ROOM</div><p>OPENING SECURE WORKSPACE</p><i />
        <button onClick={() => setDoorOpen(true)}>点击开门 / ENTER</button>
      </div>

      <header className="top-hud">
        <button className="brand" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><b />NO FEAR<small>CREATIVE DEVELOPER</small></button>
        <div className="online"><Radio size={12} /> SYSTEM ONLINE</div>
        <a href="mailto:hello@studio.dev">建立连接 <Mail size={15} /></a>
      </header>

      {!seated && <>
        <section className="welcome-copy">
          <p><Sparkles size={13} /> WELCOME TO MY DIGITAL ROOM</p>
          <h1>挑一面墙，<br /><em>坐下来看看。</em></h1>
          <span>点击空间热点，镜头会落座到电竞椅的第一人称视角。</span>
        </section>
        <nav className="standing-zones" aria-label="选择房间板块">
          {zones.map((zone) => { const Icon = zone.icon; return (
            <button key={zone.id} className={`standing-zone standing-${zone.id}`} onClick={() => enterZone(zone.id)}>
              <i><Icon size={16} /></i><span><b>{zone.no}</b>{zone.label}<small>坐下并进入</small></span>
            </button>
          ); })}
        </nav>
      </>}

      {seated && <nav className="wall-map" aria-label="切换房间墙面">
        {zones.map((zone) => <button key={zone.id} className={zone.id === active ? "active" : ""} onClick={() => enterZone(zone.id)}><span>{zone.no}</span>{zone.short}</button>)}
      </nav>}

      {seated && current && <section key={active} className="content-panel">
        <p className="panel-eyebrow">{current.eyebrow}</p><h2>{current.title}</h2><p className="panel-copy">{current.copy}</p>
        <div className="panel-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {current.id === "projects" ? <div className="projects">
          <article><b>01</b><span>NEURAL INTERFACE<small>AI PRODUCT / 2026</small></span><ArrowRight size={17} /></article>
          <article><b>02</b><span>VOID ARCHIVE<small>IMMERSIVE WEB / 2025</small></span><ArrowRight size={17} /></article>
          <article><b>03</b><span>ORBIT OS<small>DESIGN SYSTEM / 2025</small></span><ArrowRight size={17} /></article>
        </div> : <div className="panel-actions"><a href="mailto:hello@studio.dev">{current.id === "about" ? "查看完整履历" : "一起做点酷的"}<ArrowRight size={15} /></a><a href="https://github.com" aria-label="GitHub"><Github size={18} /></a></div>}
      </section>}

      <div className="chair-loader" aria-live="polite">
        <div className="chair-orbit"><i /><Armchair size={36} /></div>
        <p>{phase === "seating" ? "TAKING A SEAT" : "ROTATING TO NEXT SPACE"}</p><span>{phase === "seating" ? "正在落座" : "电竞椅旋转中"}</span>
      </div>

      {seated && <div className="bottom-controls">
        <button onClick={() => navigate(-1)} aria-label="上一面墙"><ArrowLeft size={18} /></button>
        <span>坐姿视角 <b>{current?.no} / 03</b></span>
        <button onClick={() => navigate(1)} aria-label="下一面墙"><ArrowRight size={18} /></button>
      </div>}
      {seated && <button className="stand-up" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><X size={14} /> 离开座位</button>}
      <div className="grain" />
    </main>
  );
}
