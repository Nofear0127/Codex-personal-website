"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight, Braces, Check, Copy, Cpu, Download, Mail, Radio, Sparkles, Terminal, UserRound, X } from "lucide-react";
import MouseCompanion from "./MouseCompanion";
import Mascot from "./Mascot";
import { projects, type ProjectId } from "../data/projects";
import { contactDetails, siteAssets, WECHAT_ID } from "./siteConfig";

type ZoneId = "about" | "projects" | "lab" | "contact";
type Phase = "idle" | "seating" | "turning";

const zones = [
  { id: "about" as const, no: "01", label: "PROFILE", short: "详细介绍", eyebrow: "01 / PROFILE", title: "从理解模型，到推动产品落地", copy: "3 年阿里巴巴、字节跳动与智谱 AI 产品经历，覆盖 C 端 AI 应用与底层大模型两端。", tags: ["阿里巴巴", "字节跳动", "智谱"], icon: UserRound },
  { id: "lab" as const, no: "02", label: "WRITING", short: "文章", eyebrow: "02 / WRITING", title: "在快速变化中，建立长期判断", copy: "从 2025 年 1 月开始，我持续记录对 AI 行业、技术演进和产品落地的观察。", tags: ["行业观察", "技术解读", "产品方法"], icon: Cpu },
  { id: "projects" as const, no: "03", label: "PROJECT", short: "项目", eyebrow: "03 / PROJECT", title: "Demo 证明模型可以做到，落地证明产品值得被做。", copy: "从“值不值得”出发，用可控成本验证真实业务价值。", tags: ["3C 对比推荐", "Seedream", "AgentTuning"], icon: Braces },
  { id: "contact" as const, no: "04", label: "METHOD", short: "方法论与联系", eyebrow: "04 / METHOD & CONTACT", title: "最小充分 AI", copy: "只为可验证的价值，增加技术复杂度。", tags: ["效果", "成本", "延迟", "稳定性"], icon: Sparkles },
];

const faceRotation: Record<ZoneId, number> = { about: 90, lab: 0, projects: -90, contact: -180 };
const articleItems = [
  { id:"01", category:"AI产品方法", no:"01", title:"如何转型 AI 产品经理？DeepSeek 给你答案", file:"01-DeepSeek与AI产品经理转型.md", summary:"从产品经理视角，讨论 AI 时代的能力转型与实践路径。" },
  { id:"02", category:"AI技术解读", no:"02", title:"深度拆解：DeepSeek-R1 是怎么训练的", file:"02-DeepSeek-R1训练原理.md", summary:"从强化学习、冷启动与蒸馏理解 R1 的训练逻辑。" },
  { id:"03", category:"AI技术解读", no:"03", title:"深度理解 Manus AI Agent", file:"03-深度理解Manus-Agent.md", summary:"从应用、技术实现与趋势系统理解 Manus。" },
  { id:"04", category:"AI技术解读", no:"04", title:"一文讲清楚 Agent、MCP、Function Call", file:"04-Agent-MCP-FunctionCall.md", summary:"拆解三个核心概念的定义、区别与连接方式。" },
  { id:"05", category:"AI技术解读", no:"05", title:"GPT-4o 多模态生图：6 种好玩又提效的用法", file:"05-GPT4o多模态生图.md", summary:"从真实体验理解多模态生成的产品可能性。" },
  { id:"06", category:"AI技术解读", no:"06", title:"MCP + A2A + Reasoning Model = Future", file:"06-MCP-A2A-ReasoningModel.md", summary:"记忆、协作与决策如何构成多 Agent 的技术基础。" },
  { id:"07", category:"AI行业观察", no:"07", title:"2025 AI 元年？当前到底什么 Agent 能用？", file:"07-2025什么Agent能用.md", summary:"观察通用与垂直 Agent 的真实成熟度。" },
  { id:"08", category:"AI产品方法", no:"08", title:"AI 产品经理不要只盯着模型", file:"08-AI产品经理不要只盯模型.md", summary:"从模型迷思回到任务设计与业务适配。" },
  { id:"09", category:"AI产品方法", no:"09", title:"做 Agent 应用：从平台到工具、再到为结果负责", file:"09-Agent从平台到结果负责.md", summary:"关于 Agent 产品形态与结果责任的阶段性反思。" },
  { id:"10", category:"AI产品方法", no:"10", title:"从单 Agent 到 Multi-Agent 的演进之路", file:"10-单Agent到MultiAgent.md", summary:"分析多智能体协作的业务价值与迭代逻辑。" },
  { id:"11", category:"AI产品方法", no:"11", title:"从 AI 热到 AI 效益", file:"11-从AI热到AI效益.md", summary:"产品经理必备的 AI 场景评估实战指南。" },
  { id:"12", category:"AI行业观察", no:"12", title:"OpenClaw 终结 Agent 战争？", file:"12-OpenClaw正向观点.md", summary:"从正向视角观察 OpenClaw 的产品价值。" },
  { id:"13", category:"AI行业观察", no:"13", title:"别被全网爆火的 OpenClaw 骗了", file:"13-别被OpenClaw骗了.md", summary:"面向普通用户的实测、风险与适用性判断。" },
  { id:"14", category:"AI行业观察", no:"14", title:"我还没找到 OpenClaw 的应用场景", file:"14-OpenClaw没有应用场景.md", summary:"技术狂欢与真实工作流之间为什么仍有断层。" },
  { id:"15", category:"项目与实践", no:"15", title:"OpenClaw 自主进化日记 01", file:"15-OpenClaw-Skill失控复盘.md", summary:"Skill 失控与 Self-Evolving 实战复盘。" },
  { id:"16", category:"AI行业观察", no:"16", title:"我卸载了 OpenClaw，但智谱和 Kimi 却赢麻了", file:"16-我卸载了OpenClaw.md", summary:"从产品成败重新观察国产模型的机会。" },
  { id:"18", category:"项目与实践", no:"18", title:"从听不懂到完全信任：我的 Codex 深度体验", file:"18-Codex深度产品体验.md", summary:"一次关于完整性、稳定性与安全感的产品复盘。" },
  { id:"19", category:"AI产品方法", no:"19", title:"AI 时代的产品经理：工作流被重写了", file:"19-AI产品经理工作流被重写.md", summary:"从 PRD 到原型，产品验证方式正在发生变化。" },
  { id:"20", category:"AI行业观察", no:"20", title:"长任务是检验 Agent 水平的唯一标准", file:"20-长任务检验Agent水平.md", summary:"长任务能力如何区分 Agent 是玩具还是工具。" },
];

function MarkdownPreview({ content }: { content: string }) {
  return <div className="markdown-preview">{content.split("\n").map((line, index) => {
    const key = `${index}-${line.slice(0, 12)}`;
    if (!line.trim()) return <span className="md-space" key={key} />;
    if (line.startsWith("#### ")) return <h4 key={key}>{line.slice(5)}</h4>;
    if (line.startsWith("### ")) return <h3 key={key}>{line.slice(4)}</h3>;
    if (line.startsWith("## ")) return <h2 key={key}>{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return null;
    if (line.startsWith("> ")) return <blockquote key={key}>{line.slice(2)}</blockquote>;
    if (/^[-*] /.test(line)) return <div className="md-list" key={key}><i />{line.slice(2)}</div>;
    if (/^\d+[.、] /.test(line)) return <div className="md-list" key={key}><b>{line.match(/^\d+/)?.[0]}</b>{line.replace(/^\d+[.、] /, "")}</div>;
    return <p key={key}>{line}</p>;
  })}</div>;
}

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
  }, []);

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return <>
    <dt>{label}</dt>
    <dd className="copyable-value">
      <span>{value}</span>
      <button type="button" onClick={copyValue} aria-label={`复制${label}`} className={copied ? "is-copied" : ""}>
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <em>{copied ? "已复制" : "复制"}</em>
      </button>
    </dd>
  </>;
}

export default function Home() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [seated, setSeated] = useState(false);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rotation, setRotation] = useState(0);
  const [previous, setPrevious] = useState<ZoneId | null>(null);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);
  const [selectedCategory, setSelectedCategory] = useState("AI行业观察");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [articleContent, setArticleContent] = useState("");
  const [projectView, setProjectView] = useState<ProjectId>("taotian");
  const [qrMissing, setQrMissing] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const writingMainRef = useRef<HTMLDivElement>(null);
  const writingScroll = useRef(0);
  const connectButtonRef = useRef<HTMLButtonElement>(null);
  const connectDialogRef = useRef<HTMLDivElement>(null);
  const connectCloseRef = useRef<HTMLButtonElement>(null);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const enterZone = useCallback((id: ZoneId) => {
    if (phase !== "idle") return;
    if (id !== "lab" && window.location.hash.startsWith("#/writing")) window.history.replaceState(null, "", window.location.pathname + window.location.search);
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
    if (nextId !== "lab" && window.location.hash.startsWith("#/writing")) window.history.replaceState(null, "", window.location.pathname + window.location.search);
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

  const current = zones.find((zone) => zone.id === active);
  const article = articleItems.find((item) => item.id === selectedArticle);
  const filteredArticles = articleItems.filter((item) => item.category === selectedCategory);
  const project = projects.find((item) => item.id === projectView) ?? projects[0];
  const faceClass = (id: ZoneId) => `room-face face-${id} ${active === id ? "is-current" : ""} ${previous === id ? "is-previous" : ""}`;

  useEffect(() => {
    if (!article) return;
    fetch(`/articles/${encodeURIComponent(article.file)}`).then((response) => response.text()).then(setArticleContent).catch(() => setArticleContent("文章读取失败，请稍后重试。"));
  }, [article]);

  const openArticle = useCallback((id: string) => {
    const next = articleItems.find((item) => item.id === id);
    if (!next) return;
    writingScroll.current = writingMainRef.current?.scrollTop ?? 0;
    setArticleContent("");
    setSelectedCategory(next.category);
    setSelectedArticle(id);
    window.history.pushState({ writing: id }, "", `#/writing/${id}`);
  }, []);

  const closeArticle = useCallback((push = true) => {
    setSelectedArticle(null);
    setArticleContent("");
    if (push) window.history.pushState({ writing: null }, "", "#/writing");
    window.setTimeout(() => writingMainRef.current?.scrollTo({ top: writingScroll.current }), 0);
  }, []);

  const closeConnect = useCallback(() => setConnectOpen(false), []);

  useEffect(() => {
    if (!connectOpen) return;
    const previousOverflow = document.body.style.overflow;
    const triggerButton = connectButtonRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => connectCloseRef.current?.focus());
    const onModalKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeConnect();
        return;
      }
      if (event.key !== "Tab" || !connectDialogRef.current) return;
      const focusable = Array.from(connectDialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'))
        .filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onModalKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onModalKey);
      document.body.style.overflow = previousOverflow;
      triggerButton?.focus();
    };
  }, [closeConnect, connectOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (connectOpen) return;
      if (event.key === "Escape" && active === "lab" && selectedArticle) { closeArticle(); return; }
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "Escape" && seated && phase === "idle") { setSeated(false); setActive(null); setRotation(0); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeArticle, connectOpen, navigate, phase, seated, selectedArticle]);

  useEffect(() => {
    const applyWritingRoute = () => {
      const match = window.location.hash.match(/^#\/writing\/([^/]+)$/);
      if (match && articleItems.some((item) => item.id === match[1])) {
        const next = articleItems.find((item) => item.id === match[1])!;
        setDoorOpen(true); setSeated(true); setActive("lab"); setRotation(faceRotation.lab);
        setSelectedCategory(next.category); setSelectedArticle(next.id);
      } else if (window.location.hash === "#/writing") {
        setDoorOpen(true); setSeated(true); setActive("lab"); setRotation(faceRotation.lab); setSelectedArticle(null);
      }
    };
    applyWritingRoute();
    window.addEventListener("popstate", applyWritingRoute);
    return () => window.removeEventListener("popstate", applyWritingRoute);
  }, []);

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
        <div><Terminal size={17} /> WUQI_ROOM</div><p>OPENING WUQI WORKSPACE</p><i />
        <button onClick={() => setDoorOpen(true)}>点击开门 / ENTER</button>
      </div>

      <header className="top-hud">
        <button className="brand" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><b />雾崎<small>LEVERAGE AI PRODUCT MANAGER</small></button>
        <div className="online"><Radio size={12} /> SYSTEM ONLINE</div>
        <button ref={connectButtonRef} className="connect-trigger" type="button" onClick={() => setConnectOpen(true)} aria-label="建立连接">建立连接 <Mail size={15} /></button>
      </header>

      <section className={`identity-story ${!seated ? "identity-intro" : active === "about" ? "identity-left profile-identity" : "identity-dock"}`}>
        {!seated ? <>
          <p><Sparkles size={13} /> LEVERAGE AI PRODUCT MANAGER</p>
          <h1>杠杆型 AI 产品经理</h1>
          <h3>把模型能力，转化为真实的产品价值。</h3>
          <span>3 年头部大厂（阿里巴巴 + 字节跳动 + 智谱）AI 产品经历，覆盖 C 端 AI 应用与底层大模型两端。擅长用刚好够用的技术方案，以更低的复杂度和成本推动 AI 产品高效落地。</span>
          <div><b>阿里巴巴</b><b>字节跳动</b><b>智谱</b></div>
        </> : active === "about" ? <>
          <Mascot className="profile-mascot" />
          <p className="profile-main-title">AI PRODUCT<br />MANAGER</p>
          <h3 className="profile-leverage">杠杆型产品经理</h3>
          <i className="profile-divider" />
          <h1>你好，我是孙晨曦</h1>
          <h3>阿里巴巴 × 字节跳动 × 智谱</h3>
          <span className="profile-bio">3 年 AI 产品经历，覆盖淘天 3C 对比推荐、Seedream 与 AgentTuning。习惯从“值不值得”出发，以可验证的业务结果决定技术复杂度。</span>
        </> : <>
          <div className="dock-line"><strong>杠杆型 / 孙晨曦</strong><span>阿里 VS 智谱 VS 字节</span></div>
          <div className="dock-value">我追求的不是最低成本，而是<strong>单位成本下的最大业务价值</strong></div>
        </>}
        {!seated && doorOpen && <button className="identity-enter" onClick={() => enterZone("about")}>进入我的工作室 <ArrowRight size={16} /></button>}
      </section>

      {seated && <nav className="wall-map" aria-label="切换房间墙面">
        {zones.map((zone) => <button key={zone.id} className={zone.id === active ? "active" : ""} onClick={() => enterZone(zone.id)}><span>{zone.no}</span>{zone.short}</button>)}
      </nav>}

      {seated && active === "about" && <section className="profile-detail-panel glass-panel">
        <p className="panel-eyebrow">01 / PROFILE</p><h2>从理解模型，<br />到推动产品落地</h2>
        <h3 className="panel-subhead">用刚好够用的技术方案，以更低的复杂度和成本创造可验证的业务价值。</h3>
        <p>我先后在智谱、字节跳动与阿里巴巴参与 AI 产品实践，工作覆盖底层模型数据、生成式 AI 产品与 C 端 AI 应用落地。</p>
        <div className="experience-block"><b>阿里巴巴 · 淘天集团</b><small>2025.07–2026.06 · AI 产品经理</small><p>负责淘天 AI 购物助手“购物车商品 AI 对比推荐”的 3C 品类，完整推进需求、方案、AI 能力落地到上线；对比后下单转化率提升 5.7%。</p></div>
        <div className="experience-block"><b>北京字节跳动科技有限公司</b><small>2024.06–2025.05 · AI 产品实习生</small><p>参与 Seedream 系列文生图模型的数据构建与效果迭代，聚焦图文对齐、生成美感、效果评测与竞品 benchmark。</p></div>
        <div className="experience-block"><b>北京智谱华章科技股份有限公司</b><small>2023.05–2024.04 · AI 产品实习生</small><p>参与 AgentTuning 数据工程与模型效果验证，围绕 ReAct、CoT、held-out 评测与 TGI 推理链路建立可复用闭环。</p></div>
        <blockquote>AI 产品的价值不在于使用了多少复杂技术，而在于能否以合理的成本，稳定地解决真实问题。</blockquote>
        <a className="primary-action" href={siteAssets.resumePdf} download>下载我的简历 <ArrowRight size={16} /></a>
      </section>}

      {seated && active === "lab" && <section className={`writing-layout glass-panel ${article ? "article-open" : ""}`}>
        <div className="writing-intro"><p className="panel-eyebrow">02 / WRITING</p><h2>在快速变化中，<br />建立长期判断</h2><h3 className="panel-subhead">不追逐热词，持续建立对技术与产品的长期判断。</h3><p>从 2025 年 1 月开始，我持续记录对 AI 行业、技术演进和产品落地的观察。我不希望只复述新闻，而是尝试回答：新技术解决了什么、改变了哪些产品可能性、距离真实落地还有多远？</p></div>
        <div className="writing-index"><h3>{article ? <button className="writing-category-back" onClick={() => closeArticle()}>{selectedCategory}<ArrowRight size={14} /></button> : "文章分类"}</h3>{article ? filteredArticles.map((item) => <button key={item.id} className={item.id === selectedArticle ? "active" : ""} onClick={() => openArticle(item.id)}>{item.no} {item.title}</button>) : ["AI行业观察", "AI技术解读", "AI产品方法", "项目与实践"].map((category) => <button key={category} className={category === selectedCategory ? "active" : ""} onClick={() => { setSelectedCategory(category); setSelectedArticle(null); window.history.replaceState({ writing: null }, "", "#/writing"); }}>{category}<ArrowRight size={14} /></button>)}</div>
        <div className="writing-main" ref={writingMainRef}>{article ? <><button className="article-back" onClick={() => closeArticle()}><ArrowLeft size={15} /> 返回 {selectedCategory}</button><p className="panel-eyebrow">{article.category} / ARTICLE</p><h2>{article.title}</h2>{articleContent ? <MarkdownPreview content={articleContent} /> : <p className="article-loading">正在打开文章…</p>}</> : <><h3>{selectedCategory}</h3>{filteredArticles.length ? filteredArticles.map((item) => <button className="article-row" key={item.id} onClick={() => openArticle(item.id)}><b>{item.no}</b><span>{item.title}<small>{item.summary}</small></span><ArrowRight /></button>) : <div className="empty-category">该分类文章正在整理中，欢迎稍后回来。</div>}</>}</div>
      </section>}

      {seated && active === "projects" && <section className="project-layout glass-panel">
        <div className="project-belief"><p className="panel-eyebrow">03 / PROJECT</p><h2>Demo 证明能力，<br />落地验证价值。</h2><h3 className="panel-subhead">从“值不值得”出发，用可控成本解决真实问题。</h3><div className="project-tabs">{projects.map((item) => <button key={item.id} className={projectView === item.id ? "active" : ""} onClick={() => setProjectView(item.id)}>{item.tab}</button>)}</div></div>
        <div className="project-name"><div className="project-meta"><span>{project.eyebrow}</span><b>{project.role}</b></div><h2>{project.title}</h2><dl><dt>我的角色</dt><dd>{project.position}</dd><dt>项目状态</dt><dd>{project.status}</dd></dl></div>
        <div className="project-summary"><h3 className="section-label">项目范围 / 我的工作</h3>{project.sections.map((section) => <section className="project-work" key={section.title}><h4>{section.title}</h4><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
        <div className="project-details"><h3 className="section-label">{project.resultsTitle}</h3>{project.metrics && <div className="metric-grid">{project.metrics.map((metric) => <b key={metric.label}><strong>{metric.value}</strong>{metric.label}</b>)}</div>}<ul className="project-results">{project.results.map((item) => <li key={item}>{item}</li>)}</ul><blockquote>{project.quote}</blockquote></div>
      </section>}

      {seated && active === "contact" && <section className="method-contact-layout glass-panel">
        <div><p className="panel-eyebrow">04 / METHODOLOGY</p><h2>最小充分 AI</h2><h3 className="panel-subhead">从“值不值得”出发，只为可验证的价值增加技术复杂度。</h3><ol className="method-steps"><li>从真实业务问题和用户决策链路出发</li><li>能用规则层解决的问题，不交给模型猜测</li><li>通过结构化入参与 Prompt 约束提高稳定性</li><li>使用结构化解析与 guardrail 管理异常</li><li>通过离线评测集验证效果</li><li>通过 badcase 收集、归因和反馈形成迭代闭环</li><li>同时评估业务价值、实现复杂度、成本与稳定性</li></ol></div>
        <div className="contact-side"><p className="secondary-eyebrow"><Sparkles size={12} /> LEVERAGE AI PRODUCT MANAGER</p><h2>与我联系</h2><h3 className="panel-subhead">期待一起做真正落地的 AI 产品。</h3><p>我正在关注 AI 产品经理、AI 解决方案及大模型应用相关机会，也欢迎交流 AI 产品、技术落地与行业趋势。</p><dl><CopyableField label="姓名" value={contactDetails.name} /><CopyableField label="邮箱" value={contactDetails.email} /><CopyableField label="电话" value={contactDetails.phone} /><CopyableField label="当前状态" value={contactDetails.status} /></dl><div className="contact-qr-row"><div className="wechat-qr">{!qrMissing && <img src={siteAssets.wechatQr} alt="孙晨曦的微信二维码" onError={() => setQrMissing(true)} />}{qrMissing && <span>微信二维码<br />暂时无法显示</span>}</div><p><b>微信</b><br />{WECHAT_ID}<br /><small>扫码添加好友</small></p><a className="resume-download" href={siteAssets.resumePdf} download="孙晨曦-AI产品经理-简历.pdf"><Download size={16} />下载简历</a></div><small>在实践中验证，在写作中形成判断。 © 2026 孙晨曦（雾崎）</small></div>
      </section>}

      <div className={`connect-modal ${connectOpen ? "is-open" : ""}`} aria-hidden={!connectOpen} onMouseDown={(event) => { if (event.target === event.currentTarget) closeConnect(); }}>
        <div className="connect-card" role="dialog" aria-modal="true" aria-labelledby="connect-title" ref={connectDialogRef}>
          <button className="connect-close" type="button" onClick={closeConnect} aria-label="关闭建立连接弹窗" ref={connectCloseRef}><X size={18} /></button>
          <p className="panel-eyebrow">CONNECT / 建立连接</p>
          <h2 id="connect-title">期待与你聊聊</h2>
          <p className="connect-lead">AI 产品、大模型应用与业务落地，都欢迎联系。</p>
          <div className="connect-content">
            <div className="connect-fields"><dl><CopyableField label="邮箱" value={contactDetails.email} /><CopyableField label="电话" value={contactDetails.phone} /><CopyableField label="微信号" value={WECHAT_ID} /></dl><a className="resume-download" href={siteAssets.resumePdf} download="孙晨曦-AI产品经理-简历.pdf"><Download size={16} />下载最新简历</a></div>
            <div className="connect-qr"><div className="wechat-qr">{!qrMissing && <img src={siteAssets.wechatQr} alt="孙晨曦的微信二维码" onError={() => setQrMissing(true)} />}{qrMissing && <span>微信二维码<br />暂时无法显示</span>}</div><b>{WECHAT_ID}</b><span>微信扫码或复制微信号</span></div>
          </div>
        </div>
      </div>

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
