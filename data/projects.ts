export type ProjectId = "taotian" | "seedream" | "agent-tuning";

export type ProjectContent = {
  id: ProjectId;
  tab: string;
  eyebrow: string;
  role: string;
  title: string;
  position: string;
  status: string;
  sections: Array<{ title: string; items: string[] }>;
  resultsTitle: string;
  metrics?: Array<{ value: string; label: string }>;
  results: string[];
  quote: string;
};

export const projects: ProjectContent[] = [
  {
    id: "taotian",
    tab: "01 淘天 3C 对比",
    eyebrow: "TAOTIAN · 2025.07–2026.06",
    role: "3C 品类产品负责人",
    title: "购物车商品 AI 对比推荐",
    position: "初级产品经理 · 向高级 PM 汇报",
    status: "安卓已上线 · iOS 灰度中",
    sections: [
      { title: "需求与方案", items: ["拆解 3C 多商品决策链路，定位信息分散、缺少结论的核心痛点", "设计对比入口、多来源选品、AI 自动对比到购买决策的端到端流程", "定义失效、下架、跨店、规格不一致等边界规则"] },
      { title: "AI 工作流", items: ["规则层 → 结构化入参构造 → Prompt 约束 → 模型生成 → 结构化输出解析 → guardrail 兜底", "七段式输出：总述 → 相同点 → 核心区别 → 选购建议 → 小提示 → 参数对比表 → 追问入口"] },
      { title: "数据与评测", items: ["制定 3C 商品对比任务的数据标注规范", "建立信息抽取、结论判断、风险措辞三类 badcase 归因体系", "设计覆盖跨子品类、多规格、复杂适配场景的离线评测集"] },
    ],
    resultsTitle: "关键成果 · 3C 板块 · 对照实验",
    metrics: [
      { value: "+4.5%", label: "3C 板块入口点击率" },
      { value: "80%", label: "3C 板块 AI 对比生成成功率" },
      { value: "+11.5%", label: "3C 板块对比后下单转化率" },
      { value: "−25%", label: "3C 板块用户决策时长" },
    ],
    results: ["搭建线上 badcase 收集 → 归因 → 评测 → 反馈闭环", "对比模块覆盖全品类、按品类分工；完整负责 3C 线产品工作"],
    quote: "以可控的技术复杂度，把模型能力变成真实决策价值。",
  },
  {
    id: "seedream",
    tab: "02 Seedream",
    eyebrow: "BYTEDANCE · 2024.05–2025.04",
    role: "AI 产品实习生",
    title: "Seedream 数据构建与效果迭代",
    position: "Seedream 系列文生图",
    status: "数据构建 · 效果评测 · Benchmark",
    sections: [
      { title: "语料与标准", items: ["参与摄影、设计、艺术、动画 4 大品类美学标注体系设计", "定义数据清洗规则与“结构化描述 + 整体描述”分层 caption 框架", "基于 badcase 归因持续迭代标注 SOP"] },
      { title: "效果评测", items: ["搭建美感、指令遵循度、中文字符渲染、风格保真度等多维评测标准", "对生成缺陷归因并结构化反馈算法团队"] },
      { title: "协作与 Benchmark", items: ["对国内外主流文生图模型开展横向 benchmark", "衔接产品、算法、标注团队推进协作落地"] },
    ],
    resultsTitle: "关键成果",
    results: ["参与构建 4 大品类美学标注体系", "累计迭代标注规范 8 版，处理图文对数据 10 万+", "标注一致性提升至 90%+", "输出效果评测及 benchmark 报告 10+ 份", "相关工作支撑 Seedream 3.0 在图文对齐、中文渲染与美学表现上的提升"],
    quote: "通过评测—反馈—迭代—验证，让数据标准持续转化为模型体验。",
  },
  {
    id: "agent-tuning",
    tab: "03 AgentTuning",
    eyebrow: "ZHIPU · 2023.06–2024.05",
    role: "AI 数据实习生",
    title: "AgentTuning 数据与评测流水线",
    position: "AgentInstruct · Held-out Evaluation",
    status: "数据采样 · 环境适配 · 错误归因",
    sections: [
      { title: "数据构建", items: ["批量调用 GPT-4 采样 ReAct 格式交互轨迹", "实现轨迹奖励过滤流水线，筛出 1,866 条高质量交互", "执行训练轨迹与 held-out 评测集的数据泄露检查"] },
      { title: "评测环境", items: ["独立完成 SciWorld、ReWOO 两个开源框架接入", "参与其余 4 个环境适配，使 6 个异构框架通过统一协议跑通", "基于 TGI 搭建支持多实例并行的评测推理服务"] },
      { title: "实验与归因", items: ["参与 Llama2-chat 7B/13B/70B 混合微调实验与消融跑测", "对 ALFWorld、WebShop 的 invalid action、repeated generation 等错误进行规则化归因"] },
    ],
    resultsTitle: "关键成果",
    results: ["交付 AgentInstruct 数据采样与过滤流水线及 1,866 条训练数据", "确保训练集与 held-out 评测集无分布重叠", "交付 SciWorld、ReWOO 适配层与 TGI 评测推理服务", "将 6 个评测环境从人工逐个调试压缩为一次性批量跑完", "量化定位开源基座模型在 Agent 任务中的关键失败类型"],
    quote: "用高质量数据与统一评测环境，为 Agent 能力迭代建立可验证基础。",
  },
];
