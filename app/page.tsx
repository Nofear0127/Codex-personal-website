"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight, Braces, Cpu, Mail, Radio, Sparkles, Terminal, UserRound, X } from "lucide-react";

type ZoneId = "about" | "projects" | "lab" | "contact";
type Phase = "idle" | "seating" | "turning";

const zones = [
  { id: "about" as const, no: "01", label: "ABOUT.EXE", short: "孙晨曦", eyebrow: "RIGHT WALL / PROFILE", title: "AI 产品与数据运营，从复杂规则走向可落地的业务结果。", copy: "我是孙晨曦，拥有约两年 AI 相关项目经验，经历覆盖业务运营 PM、数据质量与规模化交付。影视行业背景让我对图片、视频与多模态产品保持长期敏感。", tags: ["AI 产品 / 数据运营", "西安工业大学 · 本科", "ENTJ"], icon: UserRound },
  { id: "projects" as const, no: "02", label: "PROJECTS.LOG", short: "项目经历", eyebrow: "FRONT WALL / EXPERIENCE", title: "把 AI 数据项目做成可管理、可评估、可规模化的交付系统。", copy: "从需求拆解、规则 SOP、数据流转到质量验收与供应商协同，我关注的不只是完成项目，更是建立可以持续复用的机制。", tags: ["淘天集团 · DEEPWIKI", "智谱清言 · 图片美学", "知识库 / 训练集 / 评测集"], icon: Braces },
  { id: "lab" as const, no: "03", label: "LAB.SYS", short: "AI 思考", eyebrow: "LEFT WALL / WRITING & TOOLS", title: "持续追踪 Agent、模型能力与 AI 产品落地方法。", copy: "我通过写作拆解 AI 产品经理转型、Agent、MCP、多模态与 FDE 等议题，也使用 Coze、Cursor、Photoshop 搭建工作流、知识库和效率工具。", tags: ["AGENT / MCP", "COZE / CURSOR", "多模态 / FDE"], icon: Cpu },
  { id: "contact" as const, no: "04", label: "CONNECT.SYS", short: "联系我", eyebrow: "BACK WALL / CONNECT", title: "寻找 AI 产品、智能应用与数据业务方向的新机会。", copy: "我擅长在算法、业务、数据团队和供应商之间建立共识，把模糊需求转化为规则、流程和可验证的交付结果。目前已离职，可随时到岗。", tags: ["随时到岗", "AI 产品 / 智能应用", "1294172722@QQ.COM"], icon: Sparkles },
];

const faceRotation: Record<ZoneId, number> = { about: 90, projects: 0, lab: -90, contact: -180 };

export default function Home() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [seated, setSeated] = useState(false);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const timers = useRef<number[]>([]);
  const autoStarted = useRef(false);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => { const timer = window.setTimeout(() => setDoorOpen(true), 2350); return () => { window.clearTimeout(timer); clearTimers(); }; }, []);
  useEffect(() => {
    if (!doorOpen || autoStarted.current) return;
    autoStarted.current = true;
    timers.current.push(window.setTimeout(() => { setActive("about"); setRotation(90); setPhase("seating"); }, 1700));
    timers.current.push(window.setTimeout(() => setSeated(true), 2750));
    timers.current.push(window.setTimeout(() => setPhase("idle"), 3650));
  }, [doorOpen]);

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
    timers.current.push(window.setTimeout(() => setPhase("idle"), 2850));
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
    timers.current.push(window.setTimeout(() => setPhase("idle"), 2850));
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
          <div className="room-face face-contact"><div className="face-image" /></div>
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
        <button className="brand" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><b />孙晨曦<small>AI PRODUCT · DATA OPERATIONS</small></button>
        <div className="online"><Radio size={12} /> SYSTEM ONLINE</div>
        <a href="mailto:1294172722@qq.com">建立连接 <Mail size={15} /></a>
      </header>

      {!seated && <>
        <section className="welcome-copy">
          <p><Sparkles size={13} /> WELCOME TO MY DIGITAL ROOM</p>
          <h1>门已打开，<br /><em>正在为你转向。</em></h1>
          <span>镜头将自动落座，并从右侧第一面墙开始探索。</span>
        </section>
      </>}

      {seated && <nav className="wall-map" aria-label="切换房间墙面">
        {zones.map((zone) => <button key={zone.id} className={zone.id === active ? "active" : ""} onClick={() => enterZone(zone.id)}><span>{zone.no}</span>{zone.short}</button>)}
      </nav>}

      {seated && current && <section key={active} className="content-panel">
        <p className="panel-eyebrow">{current.eyebrow}</p><h2>{current.title}</h2><p className="panel-copy">{current.copy}</p>
        <div className="panel-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {current.id === "projects" ? <div className="projects">
          <article><b>01</b><span>淘天商品库 · DeepWiki<small>50+ 项目 · 300 万+ 数据 · 98% 平均合格率</small></span><ArrowRight size={17} /></article>
          <article><b>02</b><span>规模化质量与交付体系<small>人效提升 30% · 培训周期缩短 70%</small></span><ArrowRight size={17} /></article>
          <article><b>03</b><span>智谱清言 · 图片美学<small>1 万+ 图片质检 · 标注准确率 97.5%</small></span><ArrowRight size={17} /></article>
        </div> : current.id === "lab" ? <div className="projects article-list">
          <article><b>01</b><span>从 AI 热到 AI 效益<small>产品价值与落地方法</small></span><ArrowRight size={17} /></article>
          <article><b>02</b><span>单 Agent 到 Multi-Agent<small>Agent 系统与协作边界</small></span><ArrowRight size={17} /></article>
          <article><b>03</b><span>AI 产品经理不要只盯模型<small>业务、评测与产品闭环</small></span><ArrowRight size={17} /></article>
        </div> : <div className="panel-actions"><a href="mailto:1294172722@qq.com">{current.id === "about" ? "获取完整简历" : "发送邮件"}<ArrowRight size={15} /></a><a href="mailto:1294172722@qq.com" aria-label="Email"><Mail size={18} /></a></div>}
      </section>}

      <div className="chair-loader" aria-live="polite">
        <div className="chair-orbit"><i /><Armchair size={36} /></div>
        <p>{phase === "seating" ? "TAKING A SEAT" : "ROTATING TO NEXT SPACE"}</p><span>{phase === "seating" ? "正在落座" : "电竞椅旋转中"}</span>
      </div>

      {seated && <div className="bottom-controls">
        <button onClick={() => navigate(-1)} aria-label="上一面墙"><ArrowLeft size={18} /></button>
        <span>坐姿视角 <b>{current?.no} / 04</b></span>
        <button onClick={() => navigate(1)} aria-label="下一面墙"><ArrowRight size={18} /></button>
      </div>}
      {seated && <button className="stand-up" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><X size={14} /> 离开座位</button>}
      <div className="grain" />
    </main>
  );
}
