"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight, Braces, Cpu, Mail, Radio, Sparkles, Terminal, UserRound, X } from "lucide-react";
import MouseCompanion from "./MouseCompanion";

type ZoneId = "about" | "projects" | "lab" | "contact";
type Phase = "idle" | "seating" | "turning";

const zones = [
  { id: "about" as const, no: "01", label: "ABOUT.EXE", short: "孙晨曦", eyebrow: "RIGHT WALL / PROFILE", title: "AI 产品与数据运营，从复杂规则走向可落地的业务结果。", copy: "我是孙晨曦，拥有约两年 AI 相关项目经验，经历覆盖业务运营 PM、数据质量与规模化交付。影视行业背景让我对图片、视频与多模态产品保持长期敏感。", tags: ["AI 产品 / 数据运营", "西安工业大学 · 本科", "ENTJ"], icon: UserRound },
  { id: "projects" as const, no: "02", label: "PROJECTS.LOG", short: "项目经历", eyebrow: "FRONT WALL / EXPERIENCE", title: "把 AI 数据项目做成可管理、可评估、可规模化的交付系统。", copy: "从需求拆解、规则 SOP、数据流转到质量验收与供应商协同，我关注的不只是完成项目，更是建立可以持续复用的机制。", tags: ["淘天集团 · DEEPWIKI", "智谱清言 · 图片美学", "知识库 / 训练集 / 评测集"], icon: Braces },
  { id: "lab" as const, no: "03", label: "LAB.SYS", short: "AI 思考", eyebrow: "LEFT WALL / WRITING & TOOLS", title: "持续追踪 Agent、模型能力与 AI 产品落地方法。", copy: "我通过写作拆解 AI 产品经理转型、Agent、MCP、多模态与 FDE 等议题，也使用 Coze、Cursor、Photoshop 搭建工作流、知识库和效率工具。", tags: ["AGENT / MCP", "COZE / CURSOR", "多模态 / FDE"], icon: Cpu },
  { id: "contact" as const, no: "04", label: "CONNECT.SYS", short: "联系我", eyebrow: "BACK WALL / CONNECT", title: "寻找 AI 产品、智能应用与数据业务方向的新机会。", copy: "我擅长在算法、业务、数据团队和供应商之间建立共识，把模糊需求转化为规则、流程和可验证的交付结果。目前已离职，可随时到岗。", tags: ["随时到岗", "AI 产品 / 智能应用", "1294172722@QQ.COM"], icon: Sparkles },
];

const faceRotation: Record<ZoneId, number> = { about: 90, projects: 0, lab: -90, contact: -180 };
const projectItems = [
  { id: "deepwiki", no: "01", title: "淘天商品库 · DeepWiki", meta: "业务运营 PM · 2025.07—2026.03", summary: "承接算法与方案需求，负责规则拆解、数据流转、质量管理与规模化交付。", metrics: ["50+ 项目", "300 万+ 数据", "98% 合格率"], detail: "围绕信息质量判断、信息理解、同款聚合、标签增强与知识生成五步流程，将原始商品数据转化为结构化知识数据；独立承接 30+ 需求并主导 20+ 项目规则 SOP。" },
  { id: "quality", no: "02", title: "规模化质量与交付体系", meta: "流程优化 · 质量管理", summary: "建立培训、FAQ、错误归因与验收机制，让团队规模扩大时仍保持质量稳定。", metrics: ["人效 +30%", "培训 -70%", "节省 50 万+"], detail: "统筹 POC、HRO 与 5 家以上供应商网络，通过分层质量控制、规则培训和数据流转提速，提升整体交付效率并将机制横向复用。" },
  { id: "zhipu", no: "03", title: "智谱清言 · 图片美学", meta: "数据质检组长 · 2024.12—2025.07", summary: "围绕动画、设计与艺术图像完成标注、质检、规则迭代和分层抽检。", metrics: ["1 万+ 质检", "97.5% 准确率", "团队 Top 1"], detail: "从专业标注进入质量评估与团队协作，持续沉淀 Badcase、Goodcase 和高频错误清单，并优化抽检策略与每周质量分析。" },
];
const articleItems = [
  { id: "benefit", no: "01", title: "从 AI 热到 AI 效益", meta: "AI 产品 · 商业落地", summary: "模型能力最终需要回到可验证的用户价值与业务收益。", detail: "文章从能力展示、产品采用、成本与组织协同四个层面，讨论企业如何跨过 AI Demo 与真实效益之间的鸿沟。", sections: ["为什么 Demo 不等于产品", "从采用率到结果指标", "成本、风险与组织协同"] },
  { id: "multi-agent", no: "02", title: "单 Agent 到 Multi-Agent", meta: "Agent · 系统协作", summary: "从任务边界、协作结构和结果责任理解多智能体系统。", detail: "文章分析单 Agent 的能力边界、Multi-Agent 的分工价值，以及何时复杂编排反而会增加成本和不确定性。", sections: ["单 Agent 的能力边界", "多智能体如何分工", "编排成本与结果负责"] },
  { id: "pm-model", no: "03", title: "AI 产品经理不要只盯模型", meta: "产品方法 · 评测", summary: "先定义真实问题与成功标准，再讨论模型和工程方案。", detail: "文章强调产品经理需要同时关注数据、评测、用户反馈、延迟、成本和合规，把模型能力放进完整产品闭环。", sections: ["先定义用户问题", "轻量评测驱动迭代", "把风险写进产品方案"] },
];

export default function Home() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [seated, setSeated] = useState(false);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const [previous, setPrevious] = useState<ZoneId | null>(null);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const enterZone = useCallback((id: ZoneId) => {
    if (phase !== "idle") return;
    if (id === "projects" && active !== "projects") setSelectedProject(null);
    if (id === "lab" && active !== "lab") setSelectedArticle(null);
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
    const fromIndex = zones.findIndex((zone) => zone.id === active);
    const toIndex = zones.findIndex((zone) => zone.id === id);
    let delta = toIndex - fromIndex;
    if (delta > 2) delta -= zones.length;
    if (delta < -2) delta += zones.length;
    setPrevious(active);
    setTurnDirection(delta >= 0 ? 1 : -1);
    setPhase("turning");
    setRotation((current) => {
      let candidate = target;
      while (candidate - current > 180) candidate -= 360;
      while (candidate - current < -180) candidate += 360;
      return candidate;
    });
    setActive(id);
    timers.current.push(window.setTimeout(() => { setPhase("idle"); setPrevious(null); }, 2200));
  }, [active, phase, seated]);

  const navigate = useCallback((direction: number) => {
    if (!seated || !active || phase !== "idle") return;
    const index = zones.findIndex((zone) => zone.id === active);
    const next = (index + direction + zones.length) % zones.length;
    const nextId = zones[next].id;
    if (nextId === "projects") setSelectedProject(null);
    if (nextId === "lab") setSelectedArticle(null);
    setPrevious(active);
    setTurnDirection(direction >= 0 ? 1 : -1);
    setPhase("turning");
    setRotation((current) => {
      let candidate = faceRotation[nextId];
      while (candidate - current > 180) candidate -= 360;
      while (candidate - current < -180) candidate += 360;
      return candidate;
    });
    setActive(nextId);
    timers.current.push(window.setTimeout(() => { setPhase("idle"); setPrevious(null); }, 2200));
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
  const project = projectItems.find((item) => item.id === selectedProject);
  const article = articleItems.find((item) => item.id === selectedArticle);
  const faceClass = (id: ZoneId) => `room-face face-${id} ${active === id ? "is-current" : ""} ${previous === id ? "is-previous" : ""}`;

  return (
    <main className={`experience ${doorOpen ? "door-open" : "door-closed"} ${seated ? "is-seated" : "is-standing"} ${active ? `active-${active}` : ""} ${turnDirection > 0 ? "turn-forward" : "turn-reverse"} phase-${phase}`}>
      <div className="standing-room" aria-hidden="true"><div className="standing-photo" /><div className="standing-shade" /></div>

      <div className="room-viewport" aria-hidden="true">
        <div className="room-ring" style={{ "--room-turn": `${rotation}deg` } as React.CSSProperties}>
          <div className={faceClass("projects")}><div className="face-image" /></div>
          <div className={faceClass("lab")}><div className="face-image" /></div>
          <div className={faceClass("about")}><div className="face-image" /></div>
          <div className={faceClass("contact")}><div className="face-image" /></div>
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

      <section className={`identity-story ${!seated ? "identity-intro" : active === "about" ? "identity-left" : "identity-dock"}`}>
        <p><Sparkles size={13} /> WELCOME · AI PRODUCT & DATA OPERATIONS</p>
        <h1>孙晨曦</h1>
        <h3>AI 产品与数据运营</h3>
        <span>把复杂规则、数据生产与模型能力，转化为可落地、可评估的业务结果。</span>
        <div><b>约 2 年 AI 项目经验</b><b>影视与多模态背景</b><b>ENTJ</b></div>
        {!seated && doorOpen && <button className="identity-enter" onClick={() => enterZone("about")}>进入我的工作室 <ArrowRight size={16} /></button>}
      </section>

      {seated && <nav className="wall-map" aria-label="切换房间墙面">
        {zones.map((zone) => <button key={zone.id} className={zone.id === active ? "active" : ""} onClick={() => enterZone(zone.id)}><span>{zone.no}</span>{zone.short}</button>)}
      </nav>}

      {seated && current && <section key={active} className={`content-panel ${project || article ? "is-detail" : "is-list"}`}>
        <p className="panel-eyebrow">{current.eyebrow}</p><h2>{project?.title || article?.title || current.title}</h2><p className="panel-copy">{project?.summary || article?.summary || current.copy}</p>
        <div className="panel-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {current.id === "projects" ? project ? <div className="detail-preview">
          <button className="detail-back" onClick={() => setSelectedProject(null)}><ArrowLeft size={15} /> 返回项目列表</button><p className="detail-meta">{project.meta}</p><p>{project.detail}</p><div className="detail-metrics">{project.metrics.map((metric) => <b key={metric}>{metric}</b>)}</div>
        </div> : <div className="projects">{projectItems.map((item) => <button key={item.id} onClick={() => setSelectedProject(item.id)}><b>{item.no}</b><span>{item.title}<small>{item.summary}</small></span><ArrowRight size={17} /></button>)}</div>
        : current.id === "lab" ? article ? <div className="detail-preview article-preview">
          <button className="detail-back" onClick={() => setSelectedArticle(null)}><ArrowLeft size={15} /> 返回文章列表</button><p className="detail-meta">{article.meta}</p><p>{article.detail}</p><ol>{article.sections.map((section) => <li key={section}>{section}</li>)}</ol><a className="read-more" href="mailto:1294172722@qq.com">阅读全文 <ArrowRight size={15} /></a>
        </div> : <div className="projects article-list">{articleItems.map((item) => <button key={item.id} onClick={() => setSelectedArticle(item.id)}><b>{item.no}</b><span>{item.title}<small>{item.meta} · {item.summary}</small></span><ArrowRight size={17} /></button>)}</div>
        : current.id === "contact" ? <div className="contact-content"><div className="contact-capabilities"><span>我能带来的价值</span><b>复杂需求拆解</b><b>数据与质量体系</b><b>跨团队规模化交付</b></div><div className="contact-facts"><p><small>目标方向</small>AI 产品 / 智能应用 / 数据业务</p><p><small>当前状态</small>已离职 · 随时到岗</p><p><small>教育背景</small>西安工业大学 · 本科</p></div><div className="panel-actions"><a href="mailto:1294172722@qq.com">发送邮件 <ArrowRight size={15} /></a><a href="mailto:1294172722@qq.com" aria-label="Email"><Mail size={18} /></a></div></div>
        : <div className="about-detail"><p><b>AI 项目经验</b>覆盖业务运营 PM、数据质量与规模化交付。</p><p><b>多模态背景</b>影视从业经历带来对图片、视频与视听语言的长期理解。</p><p><b>工作方式</b>先定义问题与成功标准，再建立可复用的规则和反馈闭环。</p><div className="panel-actions"><a href="mailto:1294172722@qq.com">获取完整简历 <ArrowRight size={15} /></a></div></div>}
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
      <MouseCompanion />
      <div className="grain" />
    </main>
  );
}
