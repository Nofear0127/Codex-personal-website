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
  { id:"17", category:"AI行业观察", no:"17", title:"Claude Code 你就作吧，我换 Codex 了", file:"17-Claude-Code与Codex对比.md", summary:"从真实体验比较两款 AI 编程产品。" },
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

  useEffect(() => {
    if (!article) { setArticleContent(""); return; }
    fetch(`/articles/${encodeURIComponent(article.file)}`).then((response) => response.text()).then(setArticleContent).catch(() => setArticleContent("文章读取失败，请稍后重试。"));
  }, [article]);

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
        <button className="brand" onClick={() => { if (phase === "idle") { setSeated(false); setActive(null); setRotation(0); } }}><b />雾崎<small>AI PRODUCT · DATA OPERATIONS</small></button>
        <div className="online"><Radio size={12} /> SYSTEM ONLINE</div>
        <a href="mailto:1294172722@qq.com">建立连接 <Mail size={15} /></a>
      </header>

      <section className={`identity-story ${!seated ? "identity-intro" : active === "about" ? "identity-left profile-identity" : "identity-dock"}`}>
        <p><Sparkles size={13} /> TECHNICAL AI PRODUCT MANAGER</p>
        {seated && active === "about" && <div className="profile-robot" aria-label="黑色机械机器人"><i className="robot-eye" /><i className="robot-body" /><i className="robot-foot left" /><i className="robot-foot right" /></div>}
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
        <div className="writing-main">{article ? <><p className="panel-eyebrow">{article.category} / ARTICLE</p><h2>{article.title}</h2>{articleContent ? <MarkdownPreview content={articleContent} /> : <p className="article-loading">正在打开文章…</p>}</> : <><h3>{selectedCategory}</h3>{filteredArticles.length ? filteredArticles.map((item) => <button className="article-row" key={item.id} onClick={() => setSelectedArticle(item.id)}><b>{item.no}</b><span>{item.title}<small>{item.summary}</small></span><ArrowRight /></button>) : <div className="empty-category">该分类文章正在整理中，欢迎稍后回来。</div>}</>}</div>
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
