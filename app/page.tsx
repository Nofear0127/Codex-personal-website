"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight, Braces, Cpu, Mail, Radio, Sparkles, Terminal, UserRound, X } from "lucide-react";
import MouseCompanion from "./MouseCompanion";

type ZoneId = "about" | "projects" | "lab" | "contact";
type Phase = "idle" | "seating" | "turning";

const zones = [
  { id: "about" as const, no: "01", label: "PROFILE", short: "详细介绍", eyebrow: "01 / PROFILE", title: "从理解模型，到推动产品落地", copy: "我曾先后在智谱 AI、阿里巴巴参与 AI 产品实践，并在淘天担任 AI 产品经理，主导“购物车对比推荐”功能上线。", tags: ["智谱 AI", "阿里巴巴", "淘天"], icon: UserRound },
  { id: "lab" as const, no: "02", label: "WRITING", short: "文章", eyebrow: "02 / WRITING", title: "在快速变化中，建立长期判断", copy: "从 2025 年 1 月开始，我持续记录对 AI 行业、技术演进和产品落地的观察。", tags: ["行业观察", "技术解读", "产品方法"], icon: Cpu },
  { id: "projects" as const, no: "03", label: "PROJECT", short: "项目", eyebrow: "03 / PROJECT", title: "Demo 证明模型可以做到，落地证明产品值得被做。", copy: "AI 项目的价值不在于使用了多少技术，而在于能否以可控的成本，稳定地解决真实问题。", tags: ["AI", "电商", "消费决策"], icon: Braces },
  { id: "contact" as const, no: "04", label: "METHOD", short: "方法论与联系", eyebrow: "04 / METHOD & CONTACT", title: "最小充分 AI", copy: "只为可验证的价值，增加技术复杂度。", tags: ["效果", "成本", "延迟", "稳定性"], icon: Sparkles },
];

const faceRotation: Record<ZoneId, number> = { about: 90, lab: 0, projects: -90, contact: -180 };
const articleItems = [
  { id: "benefit", category: "AI行业观察", no: "01", title: "从 AI 热到 AI 效益", meta: "AI 行业观察", summary: "模型能力最终需要回到可验证的用户价值与业务收益。", detail: "文章从能力展示、产品采用、成本与组织协同四个层面，讨论企业如何跨过 AI Demo 与真实效益之间的鸿沟。", sections: ["为什么 Demo 不等于产品", "从采用率到结果指标", "成本、风险与组织协同"] },
  { id: "multi-agent", category: "AI技术解读", no: "02", title: "单 Agent 到 Multi-Agent", meta: "AI 技术解读", summary: "从任务边界、协作结构和结果责任理解多智能体系统。", detail: "文章分析单 Agent 的能力边界、Multi-Agent 的分工价值，以及何时复杂编排反而会增加成本和不确定性。", sections: ["单 Agent 的能力边界", "多智能体如何分工", "编排成本与结果负责"] },
  { id: "pm-model", category: "AI产品方法", no: "03", title: "AI 产品经理不要只盯模型", meta: "AI 产品方法", summary: "先定义真实问题与成功标准，再讨论模型和工程方案。", detail: "文章强调产品经理需要同时关注数据、评测、用户反馈、延迟、成本和合规，把模型能力放进完整产品闭环。", sections: ["先定义用户问题", "轻量评测驱动迭代", "把风险写进产品方案"] },
];

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
  const timers = useRef<number[]>([]);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const enterZone = useCallback((id: ZoneId) => {
    if (phase !== "idle") return;
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
  const article = articleItems.find((item) => item.id === selectedArticle);
  const filteredArticles = articleItems.filter((item) => item.category === selectedCategory);
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
        <p><Sparkles size={13} /> TECHNICAL AI PRODUCT MANAGER</p>
        <h1>{!seated ? "技术型 AI 产品经理" : "你好，我是雾崎"}</h1>
        <h3>{!seated ? "把模型能力，转化为真实的产品价值。" : "智谱 AI × 阿里巴巴 × 淘天"}</h3>
        <span>{!seated ? "拥有 3 年一线大厂 AI 产品实践经历。我关注 AI 技术与业务之间的连接，擅长以更低的技术复杂度和成本，推动 AI 产品高效落地。" : active === "about" ? "技术型 AI 产品经理，拥有 2 年 AI 产品实习和 1 年全职工作经历。用刚好足够的技术方案，实现最大的业务价值。" : "技术型 AI 产品经理 · 把模型能力转化为真实产品价值"}</span>
        <div><b>智谱 AI</b><b>阿里巴巴</b><b>淘天</b></div>
        {!seated && doorOpen && <button className="identity-enter" onClick={() => enterZone("about")}>进入我的工作室 <ArrowRight size={16} /></button>}
      </section>

      {seated && <nav className="wall-map" aria-label="切换房间墙面">
        {zones.map((zone) => <button key={zone.id} className={zone.id === active ? "active" : ""} onClick={() => enterZone(zone.id)}><span>{zone.no}</span>{zone.short}</button>)}
      </nav>}

      {seated && active === "about" && <section className="profile-detail-panel glass-panel">
        <p className="panel-eyebrow">01 / PROFILE</p><h2>从理解模型，<br />到推动产品落地</h2>
        <h3 className="panel-subhead">用可验证的方式，把能力落成产品。</h3>
        <p>我曾先后在智谱 AI、阿里巴巴参与 AI 产品实践，并在淘天担任 AI 产品经理，主导“购物车对比推荐”功能上线。</p>
        <p>我关注的不只是产品功能，也包括模型选型、Prompt、Context Engineering、RAG、Agent、效果评测与推理成本。</p>
        <blockquote>AI 产品的价值不在于使用了多少复杂技术，而在于能否以合理的成本，稳定地解决真实问题。</blockquote>
        <a className="primary-action" href="mailto:1294172722@qq.com">下载我的简历 <ArrowRight size={16} /></a>
      </section>}

      {seated && active === "lab" && <section className={`writing-layout glass-panel ${article ? "article-open" : ""}`}>
        <div className="writing-intro"><p className="panel-eyebrow">02 / WRITING</p><h2>在快速变化中，<br />建立长期判断</h2><h3 className="panel-subhead">不追逐热词，持续建立对技术与产品的长期判断。</h3><p>从 2025 年 1 月开始，我持续记录对 AI 行业、技术演进和产品落地的观察。我不希望只复述新闻，而是尝试回答：新技术解决了什么、改变了哪些产品可能性、距离真实落地还有多远？</p></div>
        <div className="writing-index"><h3>{article ? selectedCategory : "文章分类"}</h3>{article ? filteredArticles.map((item) => <button key={item.id} className={item.id === selectedArticle ? "active" : ""} onClick={() => setSelectedArticle(item.id)}>{item.no} {item.title}</button>) : ["AI行业观察", "AI技术解读", "AI产品方法", "项目与实践"].map((category) => <button key={category} className={category === selectedCategory ? "active" : ""} onClick={() => { setSelectedCategory(category); setSelectedArticle(null); }}>{category}<ArrowRight size={14} /></button>)}</div>
        <div className="writing-main">{article ? <><p className="panel-eyebrow">{article.category} / ARTICLE</p><h2>{article.title}</h2><p className="article-lead">{article.detail}</p><ol>{article.sections.map((section) => <li key={section}>{section}</li>)}</ol><a className="primary-action" href="mailto:1294172722@qq.com">阅读全文 <ArrowRight size={16} /></a></> : <><h3>{selectedCategory}</h3>{filteredArticles.length ? filteredArticles.map((item) => <button className="article-row" key={item.id} onClick={() => setSelectedArticle(item.id)}><b>{item.no}</b><span>{item.title}<small>{item.summary}</small></span><ArrowRight /></button>) : <div className="empty-category">该分类文章正在整理中，欢迎稍后回来。</div>}</>}</div>
      </section>}

      {seated && active === "projects" && <section className="project-layout glass-panel">
        <div className="project-belief"><p className="panel-eyebrow">03 / PROJECT</p><h2>Demo 证明模型可以做到，<br />落地证明产品值得被做。</h2><h3 className="panel-subhead">让 AI 在真实消费决策中创造可验证的价值。</h3><p>AI 项目的价值不在于使用了多少技术，而在于能否以可控的成本，稳定地解决真实问题。</p></div>
        <div className="project-name"><span>FEATURED PROJECT</span><h2>淘天购物车<br />对比推荐</h2><p>AI × 电商 × 消费决策</p><div><b>我的角色</b>AI 产品经理／项目主导者<br /><b>项目状态</b>已上线</div></div>
        <div className="project-summary"><h3 className="section-label">项目简介</h3><p>用户面对多个相似商品时，需要反复查看和比较信息，决策成本较高。</p><p>购物车对比推荐利用 AI 提取商品差异、组织比较维度并生成推荐解释，帮助用户更高效地完成购买决策。</p></div>
        <div className="project-details"><h3 className="section-label">项目明细</h3><ol><li>分析用户比较与决策需求</li><li>设计 AI 对比推荐产品方案</li><li>定义模型输入、输出与效果标准</li><li>协同算法、研发和设计团队</li><li>处理异常、降级与兜底场景</li><li>推动产品完成上线验证</li></ol><blockquote>AI 不替用户做决定，而是帮助用户更低成本地完成判断。</blockquote></div>
      </section>}

      {seated && active === "contact" && <section className="method-contact-layout glass-panel">
        <div><p className="panel-eyebrow">04 / METHODOLOGY</p><h2>最小充分 AI</h2><h3 className="panel-subhead">只为可验证的价值，增加技术复杂度。</h3><ul><li>从真实业务问题出发，而不是从模型出发</li><li>能用简单方案解决，就不引入复杂架构</li><li>根据任务选择 Prompt、RAG、Workflow、Agent 或 SFT</li><li>同时评估效果、成本、延迟与稳定性</li><li>通过评测、校验、降级和人工介入管理不确定性</li></ul><blockquote>我追求的不是最低成本，而是单位成本下最大的业务价值。</blockquote></div>
        <div className="contact-side"><p className="secondary-eyebrow"><Sparkles size={12} /> TECHNICAL AI PRODUCT MANAGER</p><h2>与我联系</h2><h3 className="panel-subhead">期待一起做真正落地的 AI 产品。</h3><p>我正在关注 AI 产品经理、AI 解决方案及大模型应用相关机会，也欢迎交流 AI 产品、技术落地与行业趋势。</p><dl><dt>邮箱</dt><dd>1294172722@qq.com</dd><dt>求职状态</dt><dd>开放 AI 产品相关机会</dd></dl><div className="panel-actions"><a href="mailto:1294172722@qq.com">发送邮件</a><a href="#">下载简历</a><a href="mailto:1294172722@qq.com">添加微信</a></div><small>在实践中验证，在写作中形成判断。 © 2026 雾崎</small></div>
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
