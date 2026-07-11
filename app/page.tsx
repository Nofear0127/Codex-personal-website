"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  ChevronDown,
  Code2,
  Cpu,
  Github,
  Mail,
  MousePointer2,
  Radio,
  RotateCcw,
  Sparkles,
  Terminal,
  UserRound,
  X,
} from "lucide-react";

type ZoneId = "about" | "projects" | "lab";

const zones = [
  {
    id: "about" as const,
    no: "01",
    label: "ABOUT.EXE",
    eyebrow: "LEFT WING / IDENTITY",
    title: "在代码与想象力的交界处，构建有生命力的数字体验。",
    copy: "你好，我是一名创意开发者。我把产品思维、视觉叙事与前端工程组合起来，让每一次点击都像进入一个新世界。",
    stats: ["06+ YEARS", "SHANGHAI / REMOTE", "AVAILABLE 2026"],
    icon: UserRound,
  },
  {
    id: "projects" as const,
    no: "02",
    label: "PROJECTS.LOG",
    eyebrow: "CENTER DECK / SELECTED WORK",
    title: "不是作品列表，而是三次值得进入的任务现场。",
    copy: "从品牌官网到 AI 产品原型，每个项目都由一个明确的问题开始，最终落到可感知、可使用、可增长的体验。",
    stats: ["AI PRODUCT", "IMMERSIVE WEB", "DESIGN SYSTEM"],
    icon: Braces,
  },
  {
    id: "lab" as const,
    no: "03",
    label: "LAB.SYS",
    eyebrow: "RIGHT BAY / SKILLS & CONTACT",
    title: "保持实验，保持在线。一起制造一点没见过的东西。",
    copy: "React、TypeScript、WebGL、动效与生成式 AI 是我的常用工具。如果你有一个大胆的想法，右侧频道随时开放。",
    stats: ["REACT / NEXT", "WEBGL / MOTION", "HELLO@STUDIO.DEV"],
    icon: Cpu,
  },
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const activeIndex = zones.findIndex((zone) => zone.id === active);
  const current = useMemo(() => zones.find((zone) => zone.id === active), [active]);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function selectZone(id: ZoneId) {
    if (id === active || transitioning) return;
    setTransitioning(true);
    setActive(id);
    window.setTimeout(() => setTransitioning(false), 900);
  }

  function navigate(direction: number) {
    if (!entered || transitioning) return;
    const next = active === null ? (direction > 0 ? 0 : zones.length - 1) : (activeIndex + direction + zones.length) % zones.length;
    selectZone(zones[next].id);
  }

  return (
    <main
      className={`experience ${entered ? "is-entered" : "is-intro"} ${active ? `view-${active}` : "view-room"} ${transitioning ? "is-turning" : ""}`}
      onMouseMove={(event) => {
        if (window.innerWidth < 768) return;
        setParallax({ x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 });
      }}
    >
      <div className="room-stage" style={{ "--mx": parallax.x, "--my": parallax.y } as React.CSSProperties} aria-hidden="true">
        <div className="room-image" />
        <div className="room-vignette" />
        <div className="scanlines" />
      </div>

      <div className="door door-left" aria-hidden="true"><span /></div>
      <div className="door door-right" aria-hidden="true"><span /></div>
      <div className="intro-copy" aria-live="polite">
        <div className="intro-mark"><Terminal size={17} /> NF_OS</div>
        <p>INITIALIZING CREATIVE WORKSPACE</p>
        <div className="loader"><i /></div>
        <button onClick={() => setEntered(true)}>点击进入 / ENTER</button>
      </div>

      <header className="hud top-hud">
        <button className="brand" onClick={() => setActive(null)} aria-label="返回房间主视图">
          <span className="brand-dot" />
          <span>NO FEAR<small>CREATIVE DEVELOPER</small></span>
        </button>
        <div className="system-status"><Radio size={13} /> SYSTEM ONLINE <span>•</span> 20:26:07</div>
        <a className="contact-link" href="mailto:hello@studio.dev">建立连接 <Mail size={15} /></a>
      </header>

      <section className={`room-copy ${active ? "is-hidden" : ""}`} aria-label="房间导航">
        <p className="kicker"><Sparkles size={14} /> WELCOME TO MY DIGITAL ROOM</p>
        <h1>选择一个<br /><em>探索方向</em></h1>
        <p className="room-intro">这不是一张静态首页。点击房间里的发光区域，<br className="desktop-only" />让椅子带你转向我的不同世界。</p>
      </section>

      <nav className={`hotspots ${active ? "is-hidden" : ""}`} aria-label="个人网站分区">
        {zones.map((zone) => {
          const Icon = zone.icon;
          return (
            <button key={zone.id} className={`hotspot hotspot-${zone.id}`} onClick={() => selectZone(zone.id)}>
              <span className="hotspot-pulse"><Icon size={16} /></span>
              <span className="hotspot-label"><b>{zone.no}</b>{zone.label}<small>点击查看</small></span>
            </button>
          );
        })}
      </nav>

      <div className="chair-axis" aria-hidden="true"><i /><span>ROTATION AXIS</span></div>

      {current && (
        <section className="zone-panel" aria-live="polite">
          <button className="close-panel" onClick={() => setActive(null)} aria-label="关闭当前板块"><X size={20} /></button>
          <div className="panel-index">{current.no}<span>/ 03</span></div>
          <p className="panel-eyebrow">{current.eyebrow}</p>
          <h2>{current.title}</h2>
          <p className="panel-copy">{current.copy}</p>
          <div className="panel-stats">{current.stats.map((stat) => <span key={stat}>{stat}</span>)}</div>
          {current.id === "projects" ? (
            <div className="project-stack">
              <article><b>01</b><span>NEURAL INTERFACE<small>AI PRODUCT / 2026</small></span><ArrowRight size={18} /></article>
              <article><b>02</b><span>VOID ARCHIVE<small>IMMERSIVE WEB / 2025</small></span><ArrowRight size={18} /></article>
              <article><b>03</b><span>ORBIT OS<small>DESIGN SYSTEM / 2025</small></span><ArrowRight size={18} /></article>
            </div>
          ) : (
            <div className="panel-actions">
              <a href="mailto:hello@studio.dev">{current.id === "about" ? "下载个人简历" : "发送一封邮件"}<ArrowRight size={16} /></a>
              <a href="https://github.com" aria-label="GitHub"><Github size={18} /></a>
            </div>
          )}
        </section>
      )}

      <div className="hud bottom-hud">
        <div className="hint"><MousePointer2 size={14} /> CLICK A HOTSPOT</div>
        <div className="room-nav">
          <button onClick={() => navigate(-1)} aria-label="上一个板块"><ArrowLeft size={17} /></button>
          <span>{active ? `${String(activeIndex + 1).padStart(2, "0")} / 03` : "ROOM / 00"}</span>
          <button onClick={() => navigate(1)} aria-label="下一个板块"><ArrowRight size={17} /></button>
        </div>
        <button className="reset" onClick={() => setActive(null)}><RotateCcw size={14} /> RESET VIEW</button>
      </div>

      <button className="mobile-enter" onClick={() => setEntered(true)}><ChevronDown size={16} /> ENTER ROOM</button>
      <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
    </main>
  );
}
