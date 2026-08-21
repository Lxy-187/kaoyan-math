/* ==========================================================================
   概率论 / 5 大数定律与中心极限定理 / 中心极限定理的应用
   —— 本章唯一能拿来算概率的工具：把任意分布之和近似成正态。
      大数定律见 lln-clt/lln。
   ========================================================================== */

KM.page({
  path: 'probability/lln-clt/clt',
  title: '中心极限定理的应用',
  subtitle: '不管 $X_i$ 服从什么分布，**和**都趋于正态。考法固定成一句：算出 $\\E$ 与 $\\Var$，标准化，查表',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'clt-statement', title: '列维–林德伯格定理（独立同分布的情形）', c: String.raw`
      设 $X_1,X_2,\dots$ 独立同分布，$\E X_i=\mu$，$\Var X_i=\sigma^{2}\in(0,+\infty)$，则
      $$\boxed{\ \lim_{n\to\infty}P\!\left(\frac{\sum_{i=1}^{n}X_i-n\mu}{\sigma\sqrt n}\le x\right)=\Phi(x)\ }$$

      **实用说法**：$n$ 充分大时
      $$\sum_{i=1}^{n}X_i\ \dot\sim\ N\bigl(n\mu,\ n\sigma^{2}\bigr).$$

      ==这条定理最惊人的地方是它对 $X_i$ 的分布毫无要求==：
      均匀、指数、两点、泊松，甚至你没听说过的分布，
      只要独立同分布且方差有限，==求和之后一律趋于正态==。

      **为什么参数是 $n\mu$ 和 $n\sigma^{2}$**：
      根本不需要记——由[期望的线性性](#/probability/moments/expectation?at=linearity)
      和[独立时方差可加](#/probability/moments/expectation?at=var-props)直接算：
      $$\E\!\left(\sum X_i\right)=n\mu,\qquad \Var\!\left(\sum X_i\right)=n\sigma^{2}.$$
      ==中心极限定理只贡献了"是正态"这三个字，参数是你自己算出来的。==

      **和大数定律的分工**：大数定律说 $\bar X\to\mu$（误差趋于零），
      中心极限定理进一步说==误差的量级是 $\frac{\sigma}{\sqrt n}$，而且形状是正态==。
    ` },

    { t: 'key', id: 'sum-vs-mean', title: '两种标准化写法：和的版本与均值的版本', c: String.raw`
      同一条定理有两副面孔，==看题目问的是"总量"还是"平均"==：

      | 问的对象 | 近似分布 | 标准化 |
      |---|---|---|
      | 和 $\sum_{i=1}^{n}X_i$ | $N(n\mu,\ n\sigma^{2})$ | $\dfrac{\sum X_i-n\mu}{\sigma\sqrt n}$ |
      | 均值 $\bar X=\frac1n\sum X_i$ | $N\!\left(\mu,\ \dfrac{\sigma^{2}}{n}\right)$ | $\dfrac{\bar X-\mu}{\sigma/\sqrt n}$ |

      ==两个分母都是 $\sigma\sqrt n$ 或 $\sigma/\sqrt n$，差在 $\sqrt n$ 是乘还是除==，
      这是本页最高频的计算错误。

      **一个不会记错的办法**：不背公式，==每次现算==。

      1. 写出你关心的那个量 $T$；
      2. 算 $\E T$ 和 $\Var T$；
      3. 写 $\dfrac{T-\E T}{\sqrt{\Var T}}\ \dot\sim\ N(0,1)$。

      ==第 3 步对任何 $T$ 都成立，不必区分是和还是均值。==

      **注意 $\sqrt n$ 的两个方向**：
      和的标准差 $\sigma\sqrt n$ ==随 $n$ 变大==（总量波动越来越大），
      均值的标准差 $\frac{\sigma}{\sqrt n}$ ==随 $n$ 变小==（平均越来越稳）。
      这两句话正好对应大数定律和"总量不可预测"的日常经验。
    ` },

    { t: 'key', id: 'demoivre', title: '棣莫弗–拉普拉斯定理：二项分布的特例', c: String.raw`
      设 $Y_n\sim B(n,p)$，$0<p<1$，则
      $$\frac{Y_n-np}{\sqrt{np(1-p)}}\ \xrightarrow{\ d\ }\ N(0,1),
      \qquad\text{即}\qquad Y_n\ \dot\sim\ N\bigl(np,\ np(1-p)\bigr).$$

      **它就是上面那条定理**：$Y_n=\sum_{i=1}^{n}X_i$，
      其中 $X_i$ 是[两点分布](#/probability/random-var/distributions?at=binom)，
      $\mu=p$、$\sigma^{2}=p(1-p)$，代进去即得。
      ==所以不必把它当成一条独立的定理来背。==

      **识别信号**：题目在数"$n$ 次独立试验中成功了多少次"，
      而 $n$ 大到无法逐项算二项分布。
    ` },

    { t: 'compare',
      id: 'binom-approx',
      title: '二项分布的两条近似路线：别用错',
      cols: ['条件', '近似为', '参数', '典型场景'],
      rows: [
        ['$n$ 大、$p$ ==很小==、$np$ 适中', '[泊松](#/probability/random-var/distributions?at=poisson-limit) $P(\\lambda)$', '$\\lambda=np$', '$n=1000,\\ p=0.002$（稀有事件）'],
        ['$n$ 大、$p$ ==不小==（$np$ 与 $nq$ 都较大）', '正态 $N(np,npq)$', '$\\mu=np,\\ \\sigma^{2}=npq$', '$n=100,\\ p=0.8$（常规比例）'],
      ] },

    { t: 'method', id: 'three-steps', title: '拿到一道中心极限定理的题，三步走', c: String.raw`
      ==这一章的计算题格式极其固定，三步之外没有别的内容。==

      1. **认出那个"和"**。
         题目里"$100$ 个零件的总重量""$400$ 次射击的总命中数""$n$ 台机器的总耗电"，
         ==括号里那个数就是 $n$，被加的东西就是 $X_i$==。
      2. **算 $\E$ 与 $\Var$**。
         $X_i$ 服从什么分布决定了 $\mu,\sigma^{2}$（[查数字特征总表](#/probability/moments/expectation?at=table)），
         然后 $\E T=n\mu$、$\Var T=n\sigma^{2}$。
         ==这一步是全题的重心，也是唯一会算错的地方。==
      3. **标准化查表**。
         $$P(T\le t)\approx\Phi\!\left(\frac{t-\E T}{\sqrt{\Var T}}\right),$$
         负数用 $\Phi(-x)=1-\Phi(x)$ 翻过去。

      **写解答时的两句套话**（不写要扣分）：
      "由于 $X_1,\dots,X_n$ 独立同分布，由中心极限定理，
      $T$ 近似服从 $N(\cdot,\cdot)$"——
      ==必须点明"独立同分布"和"中心极限定理"这两个词。==

      **算完的检验**：概率必须落在 $(0,1)$ 内；
      若 $t$ 恰好等于 $\E T$，答案必须是 $\frac12$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-clt-sum',
      title: '总量型：$100$ 个零件的总重',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某种零件的重量（单位：kg）是随机变量，期望为 $0.5$，标准差为 $0.1$，
        各零件的重量相互独立。现随机取 $100$ 个，
        求这 $100$ 个零件的总重量超过 $51$ kg 的概率。

        （$\Phi(1)=0.8413$）
      `,
      idea: String.raw`
        ==注意题目根本没说零件重量服从什么分布==——
        这正是中心极限定理的用武之地：它对分布无要求。
        如果这题给了分布，反而说明该用别的方法。

        **认和**：$T=\sum_{i=1}^{100}X_i$，$n=100$。

        **算参数**：$\E T=100\times0.5=50$，
        $\Var T=100\times0.1^{2}=1$，==标准差恰好是 $1$==，
        这让后面的标准化格外干净（命题人故意设计的）。

        **预判**：$51$ 比均值 $50$ 大一个标准差，
        所以答案应当接近 $1-0.8413\approx0.16$。
        ==先有这个量级判断，代错数时能立刻发现。==
      `,
      solution: String.raw`
        设 $X_i$ 为第 $i$ 个零件的重量，则 $X_1,\dots,X_{100}$ 独立同分布，
        $$\mu=\E X_i=0.5,\qquad \sigma^{2}=\Var X_i=0.1^{2}=0.01.$$

        记 $T=\sum_{i=1}^{100}X_i$，则
        $$\E T=100\times0.5=50,\qquad \Var T=100\times0.01=1.$$

        由中心极限定理，$T$ 近似服从 $N(50,1)$，故
        $$P(T>51)=1-P(T\le51)\approx1-\Phi\!\left(\frac{51-50}{1}\right)
        =1-\Phi(1)=1-0.8413=\boxed{0.1587}.$$
      `,
      comment: String.raw`
        **这道题的全部技术含量在第二步**。常见的两种算错：

        - 把 $\Var T$ 写成 $100\times0.1=10$（==把标准差当方差乘==）；
        - 把 $\sqrt{\Var T}$ 写成 $100\times0.1=10$（==把 $\sqrt n\sigma$ 写成 $n\sigma$==）。

        ==记住：方差乘 $n$，标准差乘 $\sqrt n$。==

        **变体一（问均值）**：求 $P(\bar X>0.51)$。
        $\bar X\ \dot\sim\ N(0.5,\ 0.01/100)=N(0.5,0.0001)$，标准差 $0.01$，
        $$P(\bar X>0.51)\approx1-\Phi\!\left(\frac{0.01}{0.01}\right)=0.1587,$$
        ==答案完全相同==——因为"总重超 $51$"和"平均重超 $0.51$"本来就是同一个事件。
        这是检验[两种写法](#/probability/lln-clt/clt?at=sum-vs-mean)是否一致的好方法。

        **变体二（反问）**：求 $t$ 使 $P(T>t)=0.05$。
        由 $\Phi(1.645)=0.95$ 得 $t=50+1.645\times1=51.645$。
      `,
    },

    { t: 'example',
      id: 'ex-clt-binom',
      title: '计数型：二项分布的正态近似',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某车间有 $100$ 台同型号机床，每台机床工作时耗电 $1$ kW。
        由于工艺原因，每台机床实际工作的时间占比为 $80\%$，
        各机床是否工作相互独立。
        求这个车间总耗电量超过 $85$ kW 的概率。

        （$\Phi(1.25)=0.8944$）
      `,
      idea: String.raw`
        **先认出这是二项分布**：设 $Y$ 为同时工作的机床台数，
        每台"工作与否"是一次[伯努利试验](#/probability/events/independence?at=bernoulli)，
        $Y\sim B(100,0.8)$，而总耗电量在数值上就等于 $Y$。

        **为什么不能用泊松近似**：$p=0.8$ ==一点也不小==，
        泊松近似的前提不满足，见[两条路线对照](#/probability/lln-clt/clt?at=binom-approx)。
        这里 $np=80$、$nq=20$ 都很大，==正是正态近似的适用区==。

        **算参数**：$\E Y=np=80$，$\Var Y=npq=100\times0.8\times0.2=16$，
        ==标准差是 $4$==。$85$ 比 $80$ 大 $5$，即 $1.25$ 个标准差。
      `,
      solution: String.raw`
        设 $Y$ 为同时工作的机床台数，则 $Y\sim B(100,0.8)$，总耗电量为 $Y$ kW。
        $$\E Y=np=100\times0.8=80,\qquad
        \Var Y=np(1-p)=100\times0.8\times0.2=16.$$

        由棣莫弗–拉普拉斯定理，$Y$ 近似服从 $N(80,16)$，故
        $$P(Y>85)\approx1-\Phi\!\left(\frac{85-80}{4}\right)
        =1-\Phi(1.25)=1-0.8944=\boxed{0.1056}.$$
      `,
      comment: String.raw`
        **为什么不能硬算二项分布**：精确值是
        $\sum_{k=86}^{100}\binom{100}{k}(0.8)^{k}(0.2)^{100-k}$，
        ==手算完全不可行==。正态近似给出的 $0.1056$ 与精确值 $0.1285$ 同量级，
        考研只要求前者。

        **连续性修正（了解即可）**：$Y$ 是离散的，
        用连续分布近似时可以把 $P(Y>85)$ 写成 $P(Y\ge85.5)$，
        $$1-\Phi\!\left(\frac{85.5-80}{4}\right)=1-\Phi(1.375)\approx0.0846.$$
        ==考研不要求做这个修正==，除非题目明确提示；
        知道它的存在有助于理解为什么近似值和精确值有差距。

        **这类题的另一个常见问法**：
        "若要以 $95\%$ 的把握保证供电充足，至少要供多少 kW？"
        令 $\Phi\!\left(\frac{t-80}{4}\right)=0.95$，
        由 $u_{0.05}=1.645$ 得 $t=80+1.645\times4\approx86.6$，==取 $87$ kW==。
        ==注意这里取的是上侧分位点，且要往大了取整。==
      `,
    },

    { t: 'example',
      id: 'ex-clt-sample-size',
      title: '反求样本量：要多少个观测才够准',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设总体的标准差 $\sigma=1$，从中抽取容量为 $n$ 的简单随机样本，
        以样本均值 $\bar X$ 估计总体均值 $\mu$。
        问 $n$ 至少取多大，才能使
        $$P\bigl(\abs{\bar X-\mu}<0.1\bigr)\ge0.95\ ?$$

        （$u_{0.025}=1.96$，即 $\Phi(1.96)=0.975$）
      `,
      idea: String.raw`
        **这是中心极限定理的"反用"**：前面几题是已知 $n$ 求概率，
        这题是==已知概率求 $n$==，但用的是同一条标准化式子。

        **动作**：把 $\abs{\bar X-\mu}<0.1$ 除以 $\bar X$ 的标准差 $\frac{\sigma}{\sqrt n}$，
        变成 $\abs{Z}<\frac{0.1\sqrt n}{\sigma}$ 的形式，
        再用[对称区间公式](#/probability/random-var/distributions?at=normal-standardize)
        $P(\abs Z<a)=2\Phi(a)-1$。

        ==$n$ 就藏在 $a=\frac{0.1\sqrt n}{\sigma}$ 里==，解出 $a$ 就解出了 $n$。

        **两处容易错**：

        - $\bar X$ 的标准差是 $\frac{\sigma}{\sqrt n}$ 而不是 $\sigma\sqrt n$；
        - 最后 ==$n$ 要向上取整==（$n$ 越大精度越高，取小了不够）。

        **对照一下切比雪夫**：若不用中心极限定理，
        用[切比雪夫不等式](#/probability/lln-clt/lln?at=chebyshev)也能做，
        但会要求 $n\ge2000$——==界松了五倍多==。
        这正好演示了"知道分布形状"能带来多大的效率提升。
      `,
      solution: String.raw`
        由中心极限定理，$\bar X$ 近似服从 $N\!\left(\mu,\dfrac{\sigma^{2}}{n}\right)$，
        标准化后 $Z=\dfrac{\bar X-\mu}{\sigma/\sqrt n}\ \dot\sim\ N(0,1)$。

        $$P\bigl(\abs{\bar X-\mu}<0.1\bigr)
        =P\!\left(\abs Z<\frac{0.1}{\sigma/\sqrt n}\right)
        =P\bigl(\abs Z<0.1\sqrt n\bigr)=2\Phi\bigl(0.1\sqrt n\bigr)-1.$$

        令 $2\Phi(0.1\sqrt n)-1\ge0.95$，即 $\Phi(0.1\sqrt n)\ge0.975$，故
        $$0.1\sqrt n\ge1.96\ \Longrightarrow\ \sqrt n\ge19.6
        \ \Longrightarrow\ n\ge384.16.$$

        取整得 $\boxed{n\ge385}$。
      `,
      comment: String.raw`
        **通用公式（值得记住）**：要使 $P(\abs{\bar X-\mu}<\varepsilon)\ge1-\alpha$，
        $$n\ \ge\ \left(\frac{u_{\alpha/2}\,\sigma}{\varepsilon}\right)^{2}.$$

        ==注意 $n$ 与 $\varepsilon$ 是平方反比关系==：
        精度要求提高一倍（$\varepsilon$ 减半），样本量要==翻四倍==。
        这条"$\sqrt n$ 律"是统计学最基本的经济学事实——
        它解释了为什么民意调查做到一两千人之后就不再增加样本：
        ==再想把误差减半，成本要乘以四==。

        **这道题就是[区间估计](#/probability/estimation/interval?at=steps)的雏形**：
        $\bar X\pm u_{\alpha/2}\frac{\sigma}{\sqrt n}$ 正是 $\mu$ 的置信区间，
        而 $2\times u_{\alpha/2}\frac{\sigma}{\sqrt n}$ 就是区间长度。
        ==第 5 章的这道题和第 7 章的区间估计是同一个式子的两种问法。==

        **别把 $u_{\alpha/2}$ 记混**：$\alpha=0.05$ 时用的是 $u_{0.025}=1.96$（双侧），
        不是 $u_{0.05}=1.645$（单侧）。==双侧要把 $\alpha$ 对半分。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **方差与标准差混用**：==方差乘 $n$，标准差乘 $\sqrt n$==。
         题目给"标准差 $0.1$"时，$\sigma^{2}=0.01$。
      2. **和与均值的标准化写反**：和除以 $\sigma\sqrt n$，均值除以 $\frac{\sigma}{\sqrt n}$。
         ==不确定就现算 $\E T$、$\Var T$==，见[三步法](#/probability/lln-clt/clt?at=three-steps)。
      3. **$p$ 不小却用泊松近似**：$p=0.8$ 该用正态，
         见[两条路线](#/probability/lln-clt/clt?at=binom-approx)。
      4. **$\Phi(-x)$ 写成 $-\Phi(x)$**：正确的是 $1-\Phi(x)$。
      5. **双侧分位点忘了对半分**：$1-\alpha=0.95$ 对应 $u_{0.025}=1.96$。
      6. **反求 $n$ 时取整方向错**：$n$ 要==向上取整==。
      7. **不写"独立同分布"和"由中心极限定理"**：解答题会扣步骤分。
      8. **对不独立的序列用中心极限定理**：==独立性是硬前提==。
      9. **用大数定律去算概率**：它只给极限值，
         [算概率必须用中心极限定理](#/probability/lln-clt/lln?at=lln-meaning)。
    ` },

  ],
});
