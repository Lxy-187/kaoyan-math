/* ==========================================================================
   概率论 / 附 分布图鉴 / 总纲：分布的家谱
   —— 本章的目录页与地图。每个分布单独一篇，这里只负责串线。
   ========================================================================== */

KM.page({
  path: 'probability/models/overview',
  title: '总纲：分布的家谱',
  subtitle: '十几个分布不是十几件要背的东西，而是**同一串追问**在不同岔路上的答案。这一页给出全图，后面每篇讲一个',
  tags: ['概念辨析', '高频'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      [常见分布及其背景](#/probability/random-var/distributions?at=table)那张八行速查表是**终点**。
      本章反过来走：==把每个分布重新"生"一遍==，讲清它当初是被什么问题逼出来的、
      密度为什么长成那个样子、那些常数从哪来。

      理由很实际：==考场上认不出分布，通常不是忘了公式，而是没听出题目在讲哪个故事。==
      而故事一旦记住，公式就成了它的记号，忘了也能现推。

      **本章的读法**：

      - 每篇讲一个模型，结构固定：==故事 → 推导 → 性质 → 关系 → 例题 → 易错==；
      - ==考纲内的十二个==（两点、二项、几何、超几何、泊松、均匀、指数、
        正态、多维正态、卡方、$t$、$F$）是重点；
        ==另有七八篇标了"超纲"==，收进来是因为它们补上了家谱里的空缺，
        而且常以"给你一个陌生的密度"的形式出现在题里；
      - 想按考点复习，回[第 2 章](#/probability/random-var/distributions?at=table)
        和[第 6 章](#/probability/statistics/distributions?at=table)的速查表；
      - 想弄懂"为什么"，就留在本章。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'birth', c: '一、一串追问，长出一整棵树' },

    { t: 'key', id: 'atom-and-branches', title: '起点只有一个动作：做一次，成还是不成', c: String.raw`
      [两点分布](#/probability/models/bernoulli?at=story)简单到几乎不像个分布：
      一次试验，成功概率 $p$，失败概率 $q=1-p$。
      但==整个离散型世界都是从它长出来的==，长的方式是**换一个问法**。

      | 你固定住什么 | 你去数什么 | 长出来的分布 |
      |---|---|---|
      | 固定==次数== $n$ | 成功了几次 | [二项 $B(n,p)$](#/probability/models/binomial?at=story) |
      | 固定==成功 $1$ 次== | 试了几次才成 | [几何 $G(p)$](#/probability/models/geometric?at=story) |
      | 固定成功 $r$ 次 | 试了几次才够 | [负二项](#/probability/models/geometric?at=negative-binomial)（超纲） |
      | ==去掉独立性==（不放回） | 摸到几个次品 | [超几何 $H(n,M,N)$](#/probability/models/hypergeometric?at=story) |
      | $n\to\infty,\ p\to0,\ np=\lambda$ | 单位时间内发生几次 | [泊松 $P(\lambda)$](#/probability/models/poisson?at=story) |

      最后一行是唯一一次取极限，==也正是从"数次数"跨到"连续时间"的那道门==。
      跨过去之后，同一条泊松流可以换两种问法：

      | 问什么 | 分布 |
      |---|---|
      | 一段时间内发生几次 | [泊松](#/probability/models/poisson?at=story) |
      | 等到下一次要多久 | [指数](#/probability/models/exponential?at=story) |
      | 等到第 $k$ 次要多久 | [伽马](#/probability/models/gamma?at=story)（超纲） |

      另外两支不从伯努利来，各有各的源头：
      [均匀分布](#/probability/models/uniform?at=story)来自"没有任何偏好"，
      [正态分布](#/probability/models/normal?at=story)来自"大量微小因素叠加"——
      ==而正态又单独生出了统计学要用的三个==：
      [$\chi^{2}$](#/probability/models/chi2?at=story)、
      [$t$](#/probability/models/t?at=story)、
      [$F$](#/probability/models/f?at=story)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'map', c: '二、家谱' },

    { t: 'compare',
      id: 'family-table',
      title: '每个模型是被什么问题逼出来的',
      cols: ['分布', '原始问题', '从哪长出来', '关键机制'],
      rows: [
        ['[两点](#/probability/models/bernoulli?at=story)', '做一次，成不成', '（原子）', '——'],
        ['[二项](#/probability/models/binomial?at=story)', '做 $n$ 次，成几次', '两点', '==独立叠加==加组合计数'],
        ['[几何](#/probability/models/geometric?at=story)', '第一次成功要试几次', '两点', '==固定目标而非次数=='],
        ['[超几何](#/probability/models/hypergeometric?at=story)', '不放回地摸，几个次品', '二项', '==去掉独立性==，退回计数'],
        ['[泊松](#/probability/models/poisson?at=story)', '一段时间内发生几次', '二项', '==$n\\to\\infty,\\ np=\\lambda$ 固定=='],
        ['[均匀](#/probability/models/uniform?at=story)', '毫无偏好该怎么描述', '（几何概型）', '概率等于长度'],
        ['[指数](#/probability/models/exponential?at=story)', '等到下一次要多久', '泊松', '==计数换成计时=='],
        ['[伽马](#/probability/models/gamma?at=story)', '等到第 $k$ 次要多久', '指数', '$k$ 个指数相加'],
        ['[正态](#/probability/models/normal?at=story)', '误差与叠加的形状', '二项 / 各向同性 / 一切', '==三条路殊途同归=='],
        ['[卡方](#/probability/models/chi2?at=story)', '偏差平方和算大吗', '正态', '$n$ 维空间里的==半径平方=='],
        ['[$t$](#/probability/models/t?at=story)', '$\\sigma$ 未知时怎么办', '正态与卡方', '==除以自己估的尺度=='],
        ['[$F$](#/probability/models/f?at=story)', '两个波动谁更大', '两个卡方', '==取比值消掉尺度=='],
      ] },

    { t: 'compare',
      id: 'beyond-table',
      title: '越过考纲的那几篇：它们补上了家谱的空缺',
      cols: ['分布', '补的是哪个空缺', '亲戚'],
      rows: [
        ['[负二项](#/probability/models/negative-binomial?at=story)', '等第 $r$ 次成功', '几何的推广'],
        ['[多项](#/probability/models/multinomial?at=story)', '结果多于两种', '二项的推广，==卡方检验的总体模型=='],
        ['[伽马](#/probability/models/gamma?at=story)', '等第 $k$ 次', '==指数与卡方之间那座桥=='],
        ['[贝塔](#/probability/models/beta?at=story)', '比例落在 $[0,1]$ 上', '两个伽马之比；均匀的顺序统计量'],
        ['[韦布尔](#/probability/models/weibull?at=story)', '会老化的寿命', '指数的推广（失效率不再恒定）'],
        ['[多维正态](#/probability/models/multinormal?at=story)', '把方差换成矩阵', '二维正态的一般化'],
        ['[对数正态](#/probability/models/lognormal?at=story)', '大量因素==相乘==', '取对数就回到正态'],
        ['[柯西](#/probability/models/cauchy?at=story)', '期望不存在的反例', '==它就是 $t(1)$=='],
        ['[零星补遗](#/probability/models/others?at=map-table)', '拉普拉斯 / 瑞利 / 帕累托 / 极值', '各挂各的枝'],
      ] },

    { t: 'key', id: 'bridges', title: '桥梁：谁在什么条件下会变成谁', c: String.raw`
      ==命题人最爱在这些桥上做文章==，比记住单个公式更值钱。

      | 从 | 到 | 桥梁条件 |
      |---|---|---|
      | $B(1,p)$ | $B(n,p)$ | 独立叠加 $n$ 次 |
      | $B(n,p)$ | $P(\lambda)$ | ==$n$ 大 $p$ 小==，$\lambda=np$（[泊松定理](#/probability/models/poisson?at=route-limit)） |
      | $B(n,p)$ | $N(np,npq)$ | ==$n$ 大 $p$ 不小==（[棣莫弗–拉普拉斯](#/probability/lln-clt/clt?at=demoivre)） |
      | $H(n,M,N)$ | $B(n,\frac MN)$ | ==总体很大==，放不放回无所谓 |
      | $G(p)$ | $E(\lambda)$ | 离散等待到连续等待，共享==无记忆性== |
      | $P(\lambda)$ | $E(\lambda)$ | 同一条流：==数次数 vs 量间隔== |
      | $E(\lambda)$ | $\Gamma(k,\lambda)$ | $k$ 个独立指数相加 |
      | $\Gamma\!\left(\frac n2,\frac12\right)$ | $\chi^{2}(n)$ | ==它们本来就是同一个分布== |
      | $N(0,1)$ | $\chi^{2}(1)$ | 平方一下 |
      | $\chi^{2}$ 与 $N(0,1)$ | $t(n)$ | 正态除以根号卡方比自由度 |
      | 两个 $\chi^{2}$ | $F(m,n)$ | 各除自由度后取比 |
      | $t(n)$ | $F(1,n)$ | ==平方一下== |
      | $t(n)$ | $N(0,1)$ | $n\to\infty$ |
      | $U(0,1)$ | 任意分布 | $F^{-1}(U)$，见[概率积分变换](#/probability/models/uniform?at=integral-transform) |

      **两条最容易混的极限**放在一起看：
      $$B(n,p)\ \xrightarrow{\ np=\lambda\ \text{固定}\ }\ P(\lambda),
      \qquad
      B(n,p)\ \xrightarrow{\ p\ \text{固定}\ }\ N(np,npq)$$
      ==同样是 $n\to\infty$，"固定谁"决定了流向哪里==——
      这就是两条近似路线分工的根源，它们不是可以随便挑的两个技巧。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'use', c: '三、怎么用这一章' },

    { t: 'method', id: 'how-to-recognize', title: '读题时先听故事，再找公式', c: String.raw`
      | 题面里的信号 | 故事 | 分布 |
      |---|---|---|
      | "独立重复 $n$ 次"、"有放回"、"恰好 $k$ 次" | 数成功次数 | $B(n,p)$ |
      | "直到……为止"、"第一次" | 数等待的次数 | $G(p)$ |
      | "从 $N$ 件中任取 $n$ 件"、"不放回" | 纯计数 | $H(n,M,N)$ |
      | "平均每小时 / 每页 / 每米……" | 单位时间计数 | ==$P(\lambda)$，$\lambda$ 随长度缩放== |
      | "$n$ 很大、$p$ 很小" | 稀有事件 | 用 $P(np)$ 近似 |
      | "寿命"、"等待时间"、"已经用了 $t$ 小时" | 连续等待 | ==$E(\lambda)$，多半在考无记忆性== |
      | "在区间上随机取一点" | 无偏好 | $U(a,b)$ |
      | "误差"、"大量因素"、"$n$ 大而 $p$ 不小" | 叠加 | $N(\mu,\sigma^{2})$ |
      | "样本"、"总体"、"$\bar X$ 与 $S^{2}$" | 统计推断 | ==$\chi^{2}$ / $t$ / $F$== |
      | =="$\E X=\Var X$"== | 泊松的指纹 | $P(\lambda)$ |
      | ==分布函数里出现 $e^{-\lambda x}$== | 指数的指纹 | $E(\lambda)$ |

      ==最后两行是最容易被忽略的暗示==：
      题目不明说分布，而是给出数字特征或分布函数的形状，让你自己认。

      **认出故事之后，公式可以现推**：
      二项等于计数乘路径概率；几何靠等比数列；
      泊松的归一性来自 $e^{x}$ 的[幂级数](#/threads/lines/taylor?at=basic-eight)；
      指数只是一个 $e^{-\lambda t}$；正态标准化后查表。
    ` },

    { t: 'warn', id: 'story-vs-proof', title: '一个提醒：故事帮你识别，条件才是给分点', c: String.raw`
      本章讲的是"从哪来"，但阅卷看的是"条件对不对"。两件事不能互相代替。

      1. **认出故事之后仍要逐条核对条件**：
         "有放回吗？各次概率相同吗？相互独立吗？"==三条缺一条，二项就不成立==；
      2. **近似只用于算概率**，==不要拿近似分布去算期望方差==；
      3. **本章的历史与几何不要写进解答**：
         它们帮你想起该用哪个分布、自由度该是几，
         ==但证明题要引用的仍是教材里那些定理本身==；
      4. **标了"超纲"的内容**（伽马、负二项、贝塔等）==答题时不要直接引用==，
         除非题目已经把密度给你了。
    ` },

  ],
});
