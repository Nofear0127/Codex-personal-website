# 暴论一句：MCP + A2A + Reasoning Model = Future

> 2025 年被称为 “AI Agent 元年”，Manus、Fellou 等产品纷纷上线，掀起新一轮智能体热潮。但当这些 Agent 被投入真实任务中，却频频“翻车”：无法理解复杂上下文、协作混乱、逻辑跳跃…
> AI Agent 想从“概念”走向“能力”，还缺什么？本文提出，真正可用的 Agent 系统必须具备三大底层能力：稳定一致的上下文理解机制（MCP）、标准化的 Agent 协作机制（A2A），以及强大的推理模型能力（Reasoning Model）。
> 三者分别对应：记忆机制、协作机制、决策机制，构成未来多 Agent 协同工作的技术基础。当前产品仍处早期探索阶段，但趋势已经显现：AI 产品的构建方式正在重塑。

2025 年被称为 “AI Agent 元年”，Manus、Fellou 等产品纷纷上线，掀起新一轮智能体热潮。但当这些 Agent 被投入真实任务中，却频频“翻车”：无法理解复杂上下文、协作混乱、逻辑跳跃…

AI Agent 想从“概念”走向“能力”，还缺什么？本文提出，真正可用的 Agent 系统必须具备三大底层能力：稳定一致的上下文理解机制（MCP）、标准化的 Agent 协作机制（A2A），以及强大的推理模型能力（Reasoning Model）。

三者分别对应：记忆机制、协作机制、决策机制，构成未来多 Agent 协同工作的技术基础。当前产品仍处早期探索阶段，但趋势已经显现：AI 产品的构建方式正在重塑。

2025 年，被誉为 AI Agent 元年，几乎已成为行业共识。

仅在上半年，就有多个公司陆续发布了形态各异的 AI Agent 产品。Web 产品从 Manus 到 Coze Space，AI 浏览器产品从 Dia 到 Fellou 等等，各种号称可以执行负责任务的 Agent 产品，每一款在理念上都很接近“未来应有的样子”—— 理解指令、感知环境、自主决策、规划执行，最终达成目标。

过去几个月里，我也尝试使用这些 Agent 来完成实际任务，比如生成一篇高质量的提示词工程学习报告。这类任务看似简单，却涉及大量内容收集、归纳总结，对 Agent 的稳定性、上下文理解能力以及推理能力提出了更高要求。

然而，现实结果并不理想。比如，

- Coze Space（Beta）、Qwen 3（分析研究），虽有子任务划分与整合机制，但要么执行链条断裂，要么陷入“任务假完成”的幻觉，内容质量参差不齐；
- Fellou（v1.3.3 (400)）经常任务中断、执行到一半卡住，在多轮对话后丢失上下文，至今未完成一项任务。
> 虽然未实际上手 Manus 和 AI 浏览器 Dia，但通过参考飞哥、Super 黄的评测内容，对产品的优势与不足已有初步认知（详见文末链接）。

所以，为什么 AI Agent 产品都会被“卡住”导致任务失败，或者产出内容的质量参差不齐？

从表面上看，这些问题只是工具调用失败或者模型规划总结能力差，但深入分析，反映的是底层设计机制的缺陷，且并非单一维度的问题，而是多重因素共同作用的结果。

从技术实现角度倒推产品，让我意识到一个事实：现阶段的 Agent 产品，即便背后有良好的工程能力和优秀模型，也很难有效的完成复杂任务。

目前来看，构建高效、可用的 Agent，需要满足 3 个前提：

1. 稳定一致的上下文理解机制（MCP, Model Context Protocol）
2. 标准化的 Agent 协作机制（A2A, Agent-to-Agent Protocol）
3. 更强大、更贴近人类推理逻辑的模型能力（Reasoning Model，如 Claude 3.7 Sonnet、GPT-o3）
如果把今天的 Agent 生态比作身中玄冥神掌的张无忌，那么 MCP 就是九阳神功（内功心法）， A2A 是乾坤大挪移（招式套路），而 Reasoning Model 则是顽强的意志和健壮的肉体。

本篇内容，我想结合自己这段时间的观察和体验，来尝试聊一下，

4. 为什么 MCP、A2A 和 Reasoning Model 是 Agent 产品演进不可或缺的三角？
5. 为什么只有这三者融合，Agent 才能从“偶尔把玩的产品”进化为“能解决更多复杂任务的生产力工具”？
### 1. 为什么 MCP、A2A、Reasoning Model 是前提

> MCP 负责统一并结构化上下文信息，同时共享工具和资源，A2A 构建多 Agent 协作的通信协议与行为规范，而 Reasoning Model 提供任务规划与决策推理能力。三者相辅相成、缺一不可。

#### 1.1 MCP: Model Context Protocol（模型上下文协议）

> 维基百科：MCP（Model Context Protocol）即模型上下文协议，是由 Anthropic 在 2024 年 11 月 25 日发布的一篇文章中最早向公众提出的一种新的连接标准（通信协议）。该协议旨在统一前端 AI 助手和后端数据系统之间的连接方式，帮助前端模型完成更高质量的工作，为大型语言模型（LLM）提供标准化的外部数据交互接口，克服模型仅依赖训练数据的局限性。

今天我们看到的大多数 Agent 产品，仍处在“单点智能”的阶段：每一个 Agent 都像是一个“封闭黑盒”，它们各自理解“上下文”，各自进行“推理”，彼此之间缺少一个统一的视角，也没有理解和协作。

就像移动互联网建立了一个又一个数据孤岛一样，将用户的数据分散在不同的平台。用户数据有用户自己作为信息的掌控者，拥有全局视角，但这些 Agent 没有。

多个 Agent 同时在线 ≠ 多 Agent 协作，它们或许共享了用户输入，但彼此并不了解对方的状态、目标和上下文。缺乏统一语义、也缺乏行为协调机制，最终只是在各自做各自的事。

这是今天 Agent 生态中的问题之一：上下文信息割裂。

MCP（Model Context Protocol）是一种标准化、结构化的上下文共享机制。它让所有模型、所有代理，在执行任务或调用工具时，能够基于同一个世界状态（World State）去理解目标、制定行动、评估反馈。

具体来说，MCP 主要解决了三层问题：

6. 输入对齐：所有模型接收的信息是一致的、可溯源的，不再各自瞎猜。
7. 状态同步：任务执行过程中，状态变化有标准格式记录和广播，避免信息漂移。
8. 推理一致性：不同模型的中间推理结果，可以互相读取、复用，形成连贯的推理链。
这里举例下豆总的公众号截图内容（见下图），可能会相对直观一些。

> 1.输入“我想从广州开车去武汉看樱花，请帮我规划一下路线，把行程计划保存到我的笔记。”
> 2.Claude 客户端接收指令，
> 1）调用 MCP Server：Amap – Maps（高德地图）
> -调用 Amap – Maps（高德地图）的 maps_direction_driving 功能规划驾车路线
> -调用 Amap – Maps 的 maps_weather 功能查询武汉天气情况
> -调用 Amap – Maps 的 maps_text_search 功能查询武汉樱花观赏地点
> -调用 Amap – Maps 的 maps_search_detail 功能获取武大樱花园详细信息
> 2）调用 MCP Server：mcp-server-flomo （flomo 浮墨笔记）
> -调用 flomo 的 write_note 功能把行程计划保存到笔记
> 3. Claude 3.7 Sonnet 整合信息，向用户反馈包含驾车路线详情、武汉天气、樱花观赏地点推荐等内容的行程计划 ，并告知用户可在 flomo 笔记查看完整行程。

1.输入“我想从广州开车去武汉看樱花，请帮我规划一下路线，把行程计划保存到我的笔记。”

2.Claude 客户端接收指令，

1）调用 MCP Server：Amap – Maps（高德地图）

-调用 Amap – Maps（高德地图）的 maps_direction_driving 功能规划驾车路线

-调用 Amap – Maps 的 maps_weather 功能查询武汉天气情况

-调用 Amap – Maps 的 maps_text_search 功能查询武汉樱花观赏地点

-调用 Amap – Maps 的 maps_search_detail 功能获取武大樱花园详细信息

2）调用 MCP Server：mcp-server-flomo （flomo 浮墨笔记）

-调用 flomo 的 write_note 功能把行程计划保存到笔记

3. Claude 3.7 Sonnet 整合信息，向用户反馈包含驾车路线详情、武汉天气、樱花观赏地点推荐等内容的行程计划 ，并告知用户可在 flomo 笔记查看完整行程。

也可以把 MCP 类比为“多轮对话的扩展版”，从单模型内的对话上下文管理，变成了多模型协同场景下的上下文共享与信息同步。

原来： 单个模型记住“用户最近几轮对话说了什么”–> 多轮对话；

现在： 多个模型不仅知道“用户最近几轮对话说了什么”，还知道“这个任务现在在哪一步，其他模型做了什么”–> MCP；

相当于，之前只要模型它自己记住你和它对话的内容就行，但现在它得和其他模型一起同步“这事做到哪一步了”，以及有“哪些工具和资源”支持调用。

#### 1.2 A2A: Agent-to-Agent Protocol（多 Agent 通信协议）

> 维基百科：A2A 协议由 Google 发起，是一个开放标准。该协议建立在广泛接受的技术标准（如 HTTP、SSE、JSON-RPC）之上，便于与企业现有 IT 堆栈集成。2025 年 4 月 Google 在 Cloud Next 2025 大会上正式发布该协议，发布时即获得超过 50 家行业领先企业的支持。

当我第一次用 Coze 流程编排的时候，其实是有些激动的。在我的想象中，AI 终于要从个人助理要转变为团队了，理论上，大家各司其职、并行推进，只要提一个任务，其他都能自动搞定。

但现实不是这样。我发现，多个 Agent 协作时，很像没有联网的单机，你告诉 A 的事情，还需要同步 Copy 给 B，B 也不知道 A 在干嘛，当任务执行到 C 的时候，它更不清楚你与 A 和 B 都说了什么东西…

更何况，多 Agent 协作，也并不是简单几个 AI 能够相互说话、彼此调用。真正的问题不在于“能不能说”，而是在于说得是否规范、是否有结构、说完之后能不能行动和协同。这正是 A2A（ Agent-to-Agent Protocol）想要解决的问题。

那，A2A 是什么？

如果说 MCP 是保证一个模型或一个 Agent 能持续理解上下文的协议，那么 A2A 就是让多个 Agent 能有“共同语言”的机制。它不仅解决“传话、传什么话”的问题，更关键是：

- 谁（Agent）该什么时候工作？
- 上一个 Agent 做了什么，输出是否符合标准？
- 遇到问题，能否请求其他 Agent 帮助或回滚？
A2A 把这些都标准化下来了，也就是 Agent Card、Server、Client、Task 等。

> 1.A2A Agent Card
> -JSON 格式，说明有哪些 Agent，能做什么，以及如何交互。
> -通过 Agent Card 发现更适合工作的 Agent。
> 2.A2A Server
> -运行在网上的 Bot，负责监听传入的请求，完成工作。
> -同步说明结果并提出后续问题。
> 3.A2A Client
> -任何程序，或者另一个 Agent。
> -将你的需求，打包成任务、发送出去，并接受答案。
> -用户、系统、Agent，三者之间的桥梁，不需要为每个 Agent 单独编写代码。
> 4. A2A Task
> -Task 是单个待办事项
> -了解任务所有状态，提交、进行中、完成。

1.A2A Agent Card

-JSON 格式，说明有哪些 Agent，能做什么，以及如何交互。

-通过 Agent Card 发现更适合工作的 Agent。

2.A2A Server

-运行在网上的 Bot，负责监听传入的请求，完成工作。

-同步说明结果并提出后续问题。

3.A2A Client

-任何程序，或者另一个 Agent。

-将你的需求，打包成任务、发送出去，并接受答案。

-用户、系统、Agent，三者之间的桥梁，不需要为每个 Agent 单独编写代码。

4. A2A Task

-Task 是单个待办事项

-了解任务所有状态，提交、进行中、完成。

如果用“篮球球队打比赛”的场景，可以非常直观地解释 MCP 和 A2A 的不同角色和作用。

MCP 是战术本、战术板 + 球员记忆系统：MCP 就像是球队每个球员脑中随时更新的“战术本”和“比赛上下文”。

- 球员知道当前比分是多少（任务状态）
- 刚才是谁传了球，谁投了篮（对话历史）
- 教练布置过的战术还记得（系统指令 + 中期目标）
- 知道现在是快攻、防守反击还是半场阵地战（模式切换）
也就是说，MCP 保证的是“每个球员都知道现在发生了什么、要做什么（比如投篮或传球）”，不会像失忆一样，刚打完一个回合就不知道前面干了什么。

A2A 是球员之间的传球、协防、战术配合机制：A2A 是球员之间如何合作、如何传球、如何执行战术动作的一整套“协作协议”。

- 当 A 球员启动挡拆，B 球员知道该空切（任务触发）
- 出现失误，大家知道怎么应对（错误恢复）
- 战术转换时，有明确的口令和暗号（任务切换机制）
- 每个角色职责明确：控卫组织，得分后卫跑位，内线挡拆（角色分工）
也就是说，A2A 保证的是“球员之间配合顺畅、信息共享、有组织协作”，不是各打各的。

如果只有 MCP 没有 A2A 会怎样？就像每个球员都知道当前比分、战术，但彼此之间不传球、不沟通，遇到变故也没人补位 —— 最终还是散沙。

如果只有 A2A 没有 MCP 会怎样？球员之间倒是愿意传球，但没人知道现在第几节、比分多少、是否落后，需要投三分还是控制节奏 —— 失去上下文，配合也会南辕北辙。

所以，最理想的状态是：球员们既清楚全场上下文（MCP），又配合默契、高效（A2A），才能打出流畅、连贯、战略明确的比赛。这正是未来 Agent 生态的理想状态：不是一堆聪明的大脑拼在一起，而是一个真正“团队协作”的系统。

1.3 Reasoning Model：以 Claude 3.7 Sonnet、GPT-o3 为例

> 维基百科：Reasoning language models are artificial intelligence systems that combine natural language processing with structured reasoning capabilities. These models are usually constructed by prompting, supervised finetuning (SFT), and reinforcement learning (RL) initialized with pretrained language models.
> 推理语言模型是一种将自然语言处理与结构化推理能力相结合的人工智能系统。这些模型通常通过提示、监督微调（SFT）以及由预训练语言模型初始化的强化学习（RL）构建而成。

维基百科：Reasoning language models are artificial intelligence systems that combine natural language processing with structured reasoning capabilities. These models are usually constructed by prompting, supervised finetuning (SFT), and reinforcement learning (RL) initialized with pretrained language models.

推理语言模型是一种将自然语言处理与结构化推理能力相结合的人工智能系统。这些模型通常通过提示、监督微调（SFT）以及由预训练语言模型初始化的强化学习（RL）构建而成。

提到推理模型（Reasoning Model），最早还要追溯到 OpenAI 去年（2024 年）底 12 月份的 “12 天圣诞发布”，第一天的 GPT-o1 到最后一天的 GPT-o3-Preview，以及年后的 o3-mini 和 o3、o4-mini，还有后来“人尽皆知”的 DeepSeek-R1。

推理模型的本质是让模型自主构建 CoT，并选择是否将推理步骤或者推理过程显示出来，即推理过程的形式可以是隐式的内部计算，也可以是显式的步骤生成，比如 GPT-o3 与 DeepSeek-R1。

过去，AI 领域曾不断踩坑、试错：想要人为的给模型加 CoT，试图让 AI 学会“像人类一样思考”。OpenAI 研究科学家、o1 核心贡献者 Hyung Won Chung 在 MIT 的分享中提到，“Don’t teach, incentivize”（不要教，要激励）。也就是说，不要去“教”模型，而是要“激励”它自主探索。

后来发现在训练过程中，过程激励也不需要做，直接对结果进行奖励，让模型自由发挥，然后就获得了推理模型。

看 Anthropic 的内容（

> Computer use
> By integrating Claude via API, developers can direct Claude to use computers the way people do—by looking at a screen, moving a cursor, clicking buttons, and typing text. Claude 3.5 Sonnet was the first frontier AI model to be able to use computers in this way. Claude 3.7 is our most accurate model to reliably use computers in this way—albeit experimentally in public beta—and we expect the capability to improve over time.
> 通过 API 集成 Claude，开发人员可以指示 Claude 像人们一样使用计算机 – 通过查看屏幕、移动光标、单击按钮和键入文本。Claude 3.5 Sonnet 是第一个能够以这种方式使用计算机的前沿 AI 模型。Claude 3.7 是我们以这种方式可靠地使用计算机的最准确模型（尽管在公开测试阶段处于实验阶段），我们预计该功能会随着时间的推移而改进。

Computer use

By integrating Claude via API, developers can direct Claude to use computers the way people do—by looking at a screen, moving a cursor, clicking buttons, and typing text. Claude 3.5 Sonnet was the first frontier AI model to be able to use computers in this way. Claude 3.7 is our most accurate model to reliably use computers in this way—albeit experimentally in public beta—and we expect the capability to improve over time.

通过 API 集成 Claude，开发人员可以指示 Claude 像人们一样使用计算机 – 通过查看屏幕、移动光标、单击按钮和键入文本。Claude 3.5 Sonnet 是第一个能够以这种方式使用计算机的前沿 AI 模型。Claude 3.7 是我们以这种方式可靠地使用计算机的最准确模型（尽管在公开测试阶段处于实验阶段），我们预计该功能会随着时间的推移而改进。

> Robotic process automation 机器人流程自动化
> Automate repetitive tasks or processes with Claude 3.7 Sonnet. It offers industry-leading instruction following and is capable of handling complex processes and operations.
> 使用 Claude 3.7 Sonnet 自动执行重复性任务或流程。它提供行业领先的指导跟踪，并能够处理复杂的流程和操作。

Robotic process automation 机器人流程自动化

Automate repetitive tasks or processes with Claude 3.7 Sonnet. It offers industry-leading instruction following and is capable of handling complex processes and operations.

使用 Claude 3.7 Sonnet 自动执行重复性任务或流程。它提供行业领先的指导跟踪，并能够处理复杂的流程和操作。

无论是什么 Agent 产品，都离不开模型推理能力、工具调用、多模态。

前两天看视频，有 Agent 与 Reasoning Agent 的对比。其中，能够对工具使用进行推理，也很重要。

其实最早给我的启发是 Cursor，当然，本质是 Claude 模型本身。我发现，它在替我解决问题的时候，会不断的“反思”，解决一个问题时，如果方案 A 行不通，然后就换下一个方案 B，然后方案 C、方案 D，不断的在推理新方案，直至问题解决。

最初，我以为所有的推理模型都有这种能力，后来我意识到：不是的，大多数的推理模型只能对文本内容进行推理，而 Claude 不仅能够对文本内容进行推理，甚至能够对工具使用进行推理。

这就很像人在使用工具的过程：如果一个问题，用一个小号扳手解决不了的问题，换个大号扳手，甚至换用其他工具。

为什么说 Reasoning Model 是基础设施？

当需要 AI 执行一个任务：“帮我从对话内容中总结出结论，格式化成结构化 JSON”。这其实是一个多步骤、带条件判断、包含抽象转化的过程。它不仅仅是信息提取，更像是一次“类人类的思考”：

- 哪些信息是重要的？
- 内容是否有前后矛盾？
- 信息是否应该分组整理？怎么分组整理？
- 用户没说，但搜索结果有的内容，是否需要合理补全？
- 输出内容时，要考虑能否进一步处理？
过去，我们依赖 Prompt Engineering 层层堆砌，或者通过嵌套函数 / 插件来解决，但这些方式只解决了“接口调用”，没有解决“推理链条”本身的质量，还会让 Prompt 变得超级复杂。很像用了一堆机械臂，但没有大脑去指挥。

这时候，你就需要一个真正具备推理能力的模型来统筹复杂逻辑、处理模糊输入并产出可执行的结构化结果。

Reasoning Model 是什么角色？

如果 MCP 是让每个球员记住战术，A2A 是他们之间有配合机制，那 Reasoning Model 就像教练，它既知道局势（上下文信息），又能调度球员（Agent），还会临场应变，甚至特殊时刻替球员上场（直接执行）。

很多产品之所以看起来 “有多个 Agent 交互”，其实只是多个助手在排队处理任务。缺了 Reasoning Model，这些助手之间永远不会形成战术联动，更别说策略跳跃或意图引导。

推理模型的出现，让“指挥型 AI”成为可能。Claude 3.7 和 GPT-o3 给我带来的最大改变是：我开始相信未来的 AI 不再是“做具体事情的手”，而是能“组织完成复杂任务的脑”。

不再需要你告诉它怎么做，而是你告诉它你要什么，它来决定应该怎么做更合适。

从 MCP 到 A2A，再到 Reasoning Model，三者的关系就像是：

- MCP：我是谁，我现在在哪，我刚做了什么。
- A2A：我们之间怎么沟通、怎么协作。
- Reasoning Model：我们现在该往哪走，该怎么做。
这才是真正让多 Agent 协作从“能跑通流程”，迈向“完成高阶任务”的关键飞跃。

### 2. 当下的 Agent 产品还在初级阶段

> 今天的 Agent 产品，可以接收命令，但无法真正、高效地完成用户的任务。

根据产品形态，当前主流 Agent 类产品可以大致分为以下几种，

9. Web 产品，如 Manus、Coze Space、问小白研报等。
10. 浏览器产品，如 Dia、Fellou 等。
11. 客户端产品，如 ChatGPT、Claude 等。
12. 浏览器插件产品，如 Monica、豆包等。
13. IDE 插件产品，如 Trae Plugin（原 MarsCode）、GitHub Copilot 等。
14. AI IDE 产品，如 Cursor、Trae、Windsurf 等。
#### 2.1 Web 产品，以 Coze Space 为例

4 月 20 日晚上，我在 Coze 群里蹲到了一个 Coze Space 的邀请码，很幸运。

然后，我选择了“规划模式”（Coze Space 有探索模式和规划模式），想测试下 Coze Space 的能力。Prompt 如下，

> 现在我想学习 prompt engineering（提示词工程）的所有主流关键技术，包括但不限于 zero-shot prompting、few-shot prompting、in-context learning、思维链等。
> 补充更多背景信息。
> 1. 我当前对提示词工程的了解程度：了解基本概念，但缺乏实践。
> 2. 我计划在哪些领域应用提示词工程技术：代码生成与辅助编程、个人助理与生产力提升
> 3. 学习文档的侧重点：使用技巧与最佳实践、详细的示例与模板
> 4. 文档的难度级别：中级-平衡理论与实践
> 请你基于上面的内容请给我生成一篇高质量的学习文档。最好是生成 HTML 文件，支持本地浏览器打开、预览。

现在我想学习 prompt engineering（提示词工程）的所有主流关键技术，包括但不限于 zero-shot prompting、few-shot prompting、in-context learning、思维链等。

补充更多背景信息。

1. 我当前对提示词工程的了解程度：了解基本概念，但缺乏实践。

2. 我计划在哪些领域应用提示词工程技术：代码生成与辅助编程、个人助理与生产力提升

3. 学习文档的侧重点：使用技巧与最佳实践、详细的示例与模板

4. 文档的难度级别：中级-平衡理论与实践

请你基于上面的内容请给我生成一篇高质量的学习文档。最好是生成 HTML 文件，支持本地浏览器打开、预览。

当时，可能是注册人数太多了，导致服务器崩溃，遇到多次失败后，最后我放弃了。

任务回放地址：

当然，在之后任务也成功过。虽然没有按照要求来，但好歹也算完成了任务。

> 1）任务回放地址（中级学习提示词工程技术 / 提示词工程（Prompt Engineering）学习指南）
> -Coze Space: 
> -Manus: 
> 2）其他人的其他任务（为本科生做记忆概念 PPT）：

1）任务回放地址（中级学习提示词工程技术 / 提示词工程（Prompt Engineering）学习指南）

-Coze Space:

-Manus:

2）其他人的其他任务（为本科生做记忆概念 PPT）：

2.2 AI 浏览器，以 Fellou 为例

Fellou 的邀请码是我在一档播客《卫诗婕｜商业漫谈》主理人卫诗婕的群聊里获得的。起因是听了她与 Fellou 创始人谢扬的访谈（地址见文末），而后他们给听众准备了一些邀请码作为福利。这期内容质量很高，推荐。从这期节目中，我也了解到很多关于谢扬本人在设计产品上的思考：

15. 产品需求向内求，需求优先从自己出发。（共鸣 +1，年初我做 SafeMark 项目也是从自己需求开始）
16. 特斯拉 FSD 给了很多灵感。类比浏览器为电脑里的特斯拉，用户的持续使用就相当于在做数据标注。
17. Manus 等采用云端虚拟机方案，只能浏览公开网站。不同平台会有不同限制（比如禁止自动化操作），同时也会涉及用户账号隐私问题。
18. 为什么是 Deep Search，而不是 Deep Research？因为不满足被引用的部分，想了解更多上下文，每篇内容都会看。
19. 为什么一定要做自己的 GUI 模型，等等。
回到产品，我在使用 Fellou 的过程中，它整体给我的感觉：工作效率不是很高。

我给它需求、并确认需求后，在 Run 的过程中会看到，

20. 根据任务打开页面；
21. 截取当前页面给模型；
22. 给整个页面元素打标记（如下图），再发给模型，并控制光标去执行
> 这里，我理解应该会两次截图发送给模型处理，前者是方便模型“理解”（OCR 或其他方案）内容，后者是给页面元素打标记后的内容，方便调用 Computer use 根据需求控制光标去执行操作。

尤其是，当看到光标随着任务在页面移动时，这个感觉还是很奇妙的。（即便这个过程很缓慢，尤其是，一次任务重，很多时候都在不断的循环：“截图给模型-二次截图给模型-执行操作”）。或许也正是因为现在的过程太慢，所以，谢扬才想着一定要做自己的 GUI 模型。

那么，为什么各大厂商都这么着急推出这么“不成熟的产品”？（这里暂不考虑商业和其他考虑，仅从产品的角度，试图去寻找下这部分的答案）

23. 产出结果有信息错误先不提，因为这个问题可以通过工程优化或者其他方案解决。
24. 信息结构或者生成回复的结构固定不变，导致最终获得的结果仿佛 Agent 被束住了手脚，变成了任务填充（部分标题下的内容为“无”）。
25. 用户数据很重要，当 AI 不清楚用户的偏好时，它的结果就是按照产品经理给的“任务框架”做信息填充，大概率会导致结果不符合预期。
首先，“不成熟”是我作为用户的主观评价，因为我认为它给我的结果不符合我的预期（包括信息错误、错误理解我的问题等等）。其次，因为角色站位不同，我作为用户当然希望产品越成熟越好，越能高效解决我的问题越好。但为了更好的达成后者，就需要你和它进行“协作磨合”，让它更多的“了解”你的习惯、偏好。

至今，部分解决问题或工作场景，我仍旧喜欢用 ChatGPT，因为它了解我更多信息，不仅有我和它两年多的对话信息，甚至还包括我的 flomo 笔记的内容，于我而言，确实它更“懂我”（因为我的这些数据是其他 AI 所不具备的）。

即便我们知道，AI 是不可能有“懂用户”这个能力的，而真正赋予它“拥有”这个能力的人，是背后的产品设计者。因为 AI 唯一擅长且有的能力，就只是基于当前词预测下一个，或者下一个及多个字词。但这个结果对于用户来说，够了。

用户只要感觉，这个 AI 它“懂我”、能高效解决我当下问题就行。

可是，越是想要实现这个结果或目标，就越需要更早让用户参与使用产品，通过真实交互不断磨合产品，推动数据飞轮运转，进而实现产品体验优化、构建护城河、建立用户心智，并逐步提高产品的替换成本。

### 3. 总结与展望

洋洋洒洒写了这么多。其实，我原本想写的内容是 Manus 和 Coze Space 的横向对比，甚至标题都想好了，就叫《Manus 的饼，是 Coze Space 给的》。

但当我看了很多横向对比的内容之后，最后放弃了。同质化内容是很关键的一方面，另外一方面是我看到了更深一层的东西，也就是本篇内容想要表达的暴论：MCP + A2A + Reasoning Model = Future。

我相信，单点智能，无法组成群体智能。

过去的我总以为 Agent 产品的设计逻辑中，多个 Agent 同时在线，就是协作。实际上，它们只是“同时存在”，但彼此并不了解，缺乏语义层的信息共享和行为协调机制，都在各自做各自的事。

我也曾有一段时间认为，能够接入很牛的推理模型就能够解决很多问题。是的，也能够解决一部分工作，但即便选择了最强的模型接入，只要它没记住上下文、没有工具和它配合，它也只是一个超贵的 Token 消耗器而已。

这就是为什么 MCP 和 A2A 是前提：记住任务上下文、同步资源，建立通信协议，而 Reasoning Model 则是压轴的能力核心：在动态上下文中做出策略决策，弥合碎片任务，并调度合适的 Agent 执行。

我在想，未来 AI 产品的构建方式正在发生变化。

过去做一个 AI 产品，需要考虑 System Prompt（包括 Few-shot、In-Context、CoT）、如何高效调用 RAG、调用哪些工具、如何优化流程等等，或许未来设计 AI 产品的核心会变成：

26. 是否构建了清晰的 模型上下文协议（MCP）？
27. Agent 之间是否建立了 具象化的通信机制（A2A）？
28. 是否有一个具备 Reasoning 能力的强大模型来决策、调度 Agent，甚至修正整个流程？
从这个角度看，我们正在从 Prompt Engineering 时代，走向 Protocol + Planning + Reasoning Model 的复合系统工程阶段。

当然，AI 产品的重构，也意味着 AI 产品经理角色的重构。

这背后的一个微妙变化是：产品经理需要的思维，也将经历“界面设计 → 流程设计 → 服务设计 → 多 Agent 协作机制设计”这几个阶段。

无论是 Web 产品 Manus、Coze Space、AI 浏览器 Dia、Fellou，还是 AI Coding 工具 Cursor、Trae，它们的界面和 System Prompt 只是表层皮肤。真正让 Agent 能动起来的，不只是漂亮的 UI，除了复杂的工程能力，还有背后真正的骨架 —— MCP、A2A 以及推理模型。这不是“写一个更聪明的机器”，而是在“构建一个能自己协调自己、协调团队，完成负责任务的智能系统”。

过去十年，移动互联网构建的是“功能型软件系统”，而现在 AI 时代正在构建的是“意图驱动型智能系统”。私以为，MCP + A2A + Reasoning Model 并非一个天马行空的暴论，而是 AI 时代正在逐步浮现的系统底座、新的计算逻辑。

就像 2000 年前后，“HTTP + 搜索引擎 + 个人电脑” 被视为互联网未来，但最终是 “移动互联网 + 云计算 + 大数据” 的组合改写了世界。当前 AI 时代的 “未来” 同样需要底层协议（类 MCP）、交互范式（类 A2A）、终端形态（类推理模型）的创新，也许最终形态可能会因为技术突变（如 AGI 突破）而偏离预期，但不会影响我对它到来的期待！

当然，我们现在还处于 AI 时代的早期阶段。今天的 Agent 还不够聪明、不够稳定、不够可靠。但正因如此，那些努力重构底座、探索工程优化的 Builder，才显得更加重要。

未来还有太多不确定性。但有一点可以确定：终局的 Agent 系统，不再是拼 UI 的胜利者，而是同时拥有类 MCP、A2A 与 Reasoning Model 的构建者。

最后，愿在通往 AGI 的路上，不仅是“使用者”，也是“构建者”。

#### 相关链接

29. 《Model Context Protocol (MCP) 》：
30. 《Agent2Agent （A2A） 协议发布》：
31. 《Claude 3.7 Sonnet》:
32. 《This Missed OpenAI Update Just Changed AI Agents Forever…》:
33. 《Agent2Agent Protocol (A2A), clearly explained (why it matters)》:
34. 《MIT EI seminar, Hyung Won Chung from OpenAI. “Don’t teach. Incentivize.”》：
35. 《屠龙之术｜通用 Agent+MCP=2025 国内 AI 产品的共识》:
36. 《艾逗笔｜详解 MCP 核心架构》:
37. 《孔某人的低维认知｜ChatGPT 这个产品就是 Agent》:
38. 《张无常｜全网最深度｜5 万字解读 Coding Agent & OpenAI o3》:
39. 《M 小姐研习录｜一篇不一样的 DeepSeek R1 万字赏析：一场精彩绝伦的探索，技术背后的创造之美》:
40. DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（DeepSeek-R1：通过强化学习激励大语言模型（LLMs）的推理能力）：
41. 《刘言飞语｜9 个 Manus 实测案例：眼前一亮，也问题很多》:
42. 《刘言飞语｜字节的 AI Agent 效果如何？9 个实测案例》:
43. 《卫诗婕｜商业漫谈｜34. 与 Fellou 创始人谢扬的 3 小时访谈：孤独、95 后、牌桌与生产力的完美创业》:
44. 《超级王登科｜我的朋友谢扬，他的 Fellou，以及这个时代的创业者》:
45. 《实测超火的 AI 浏览器 Dia，我看到了浏览器未来的 iPhone 时刻》：
46. 《极客公园｜最牛的 AI 应用开发者，都在做 AI 浏览器》：
作者：Leon ，公众号：Stay Thinking

本文由 @Leon 原创发布于人人都是产品经理。未经作者许可，禁止转载

题图片由豆包 AI 生成

该文观点仅代表作者本人，人人都是产品经理平台仅提供信息存储空间服务
