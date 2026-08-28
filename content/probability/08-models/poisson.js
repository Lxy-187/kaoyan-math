/* ==========================================================================
   概率论 / 附 分布图鉴 / 泊松分布
   —— 从离散跨到连续时间的那道门。两条来路：二项极限 + 公理化推导。
   ========================================================================== */

KM.page({
  path: 'probability/models/poisson',
  title: '泊松分布：稀有事件的计数',
  subtitle: '现实里有一类问题根本没有"次数"可数——顾客只是零星地出现。==把一小时切成无穷多段==，二项分布就变成了它',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      **场景**：一小时内到达的顾客数、一页书上的错字数、一段电缆的疵点数、
      一天内某路口的事故数、一毫升水里的细菌数。

      共同点是：==事件在一段连续的时间或空间里"零星地、独立地"发生==，
      没有一个自然的"试验次数 $n$"。

      $$\boxed{\ P(X=k)=\frac{\lambda^{k}}{k!}e^{-\lambda},\qquad k=0,1,2,\dots\ }$$

      这一页要讲清三件事：**这个式子从哪来**（两条路）、
      **$\lambda$ 到底是什么**、**它为什么和指数分布是一回事**。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'story', c: '一、两条来路' },

    { t: 'key', id: 'route-limit', title: '来路一：把一小时切成 $n$ 段（历史上的原路）', c: String.raw`
      把一小时切成 $n$ 个极短的小段，短到==每段里最多来一位顾客==。
      若平均一小时来 $\lambda$ 位，则每段来人的概率 $p=\frac\lambda n$，各段独立。
      于是"一小时的人数"服从 $B\!\left(n,\frac\lambda n\right)$。

      让切分无限细化：
      $$\binom nk\left(\frac\lambda n\right)^{k}\left(1-\frac\lambda n\right)^{n-k}
      =\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^{k}}}_{\to\,1}
      \cdot\frac{\lambda^{k}}{k!}
      \cdot\underbrace{\left(1-\frac\lambda n\right)^{n}}_{\to\,e^{-\lambda}}
      \cdot\underbrace{\left(1-\frac\lambda n\right)^{-k}}_{\to\,1}$$
      $$\longrightarrow\ \frac{\lambda^{k}}{k!}e^{-\lambda}.$$
      ==核心是第二重要极限 $\left(1-\frac\lambda n\right)^{n}\to e^{-\lambda}$==，
      其余三个因子都趋于 $1$（$k$ 固定，$n\to\infty$）。

      **这条路一次解释了三件事**：

      - 为什么取值能到 $+\infty$：==试验次数 $n$ 已被推到无穷，上限没了==；
      - 为什么叫"稀有事件分布"：==单次概率 $p=\frac\lambda n\to0$==；
      - 为什么只剩一个参数：$n$ 与 $p$ 各自跑掉，==只有乘积 $np=\lambda$ 活下来==。

      **实用形式（泊松定理）**：$n$ 大 $p$ 小时
      $$B(n,p)\approx P(np),$$
      考研的门槛通常是 $n\ge20$、$p\le0.05$。
    ` },

    { t: 'steps', id: 'axioms', title: '来路二：不切碎，直接把它从三条要求里解出来', items: [
      { title: '把要求写成公理',
        c: String.raw`设 $N(t)$ 为 $[0,t]$ 内发生的次数，$P_k(t)=P\bigl(N(t)=k\bigr)$。
          只提三条最朴素的要求：

          * **平稳性**：发生的快慢不随时间变化，只与时间长度有关；
          * **独立增量**：不重叠的时间段互不影响（==这是"无记忆"的时间版==）；
          * **普通性**：短时间 $h$ 内发生一次的概率是 $\lambda h+o(h)$，
            发生两次及以上的概率是 $o(h)$——==事件不会挤在一起同时发生==。

          $\lambda$ 是"单位时间的平均发生率"。==注意这里根本没提到 $n$ 和 $p$。==` },

      { title: '先解 $k=0$',
        c: String.raw`$[0,t+h]$ 内一次不发生，等于 $[0,t]$ 内不发生**且** $[t,t+h]$ 内不发生：
          $$P_0(t+h)=P_0(t)\bigl(1-\lambda h+o(h)\bigr).$$
          移项除以 $h$ 令 $h\to0$：
          $$P_0'(t)=-\lambda P_0(t),\quad P_0(0)=1
          \ \Longrightarrow\ \boxed{P_0(t)=e^{-\lambda t}}$$
          ==那个 $e^{-\lambda t}$ 是被微分方程逼出来的，不是凑的。==` },

      { title: '再解一般的 $k$',
        c: String.raw`$[0,t+h]$ 内发生 $k$ 次只有两种可能（两次以上是 $o(h)$）：
          $$P_k(t+h)=P_k(t)(1-\lambda h)+P_{k-1}(t)\lambda h+o(h)$$
          $$\Longrightarrow\ P_k'(t)+\lambda P_k(t)=\lambda P_{k-1}(t)$$
          这是一串==[一阶线性微分方程](#/calculus/ode/first-order?at=linear)==，
          积分因子 $e^{\lambda t}$ 一乘化成
          $$\bigl(e^{\lambda t}P_k\bigr)'=\lambda e^{\lambda t}P_{k-1}.$$` },

      { title: '逐级往上推',
        c: String.raw`$k=1$：右端为 $\lambda$，积分得 $P_1=\lambda t\,e^{-\lambda t}$。

          设 $P_{k-1}=\dfrac{(\lambda t)^{k-1}}{(k-1)!}e^{-\lambda t}$，代入：
          $$\bigl(e^{\lambda t}P_k\bigr)'=\frac{\lambda(\lambda t)^{k-1}}{(k-1)!}
          \ \Longrightarrow\ e^{\lambda t}P_k=\frac{(\lambda t)^{k}}{k!}$$
          $$\boxed{\ P_k(t)=\frac{(\lambda t)^{k}}{k!}e^{-\lambda t}\ }$$` },

      { title: '收下两个红利',
        c: String.raw`令 $t=1$ 就是 $P(\lambda)$。但这条路比取极限多给了两样东西：

          * ==参数是 $\lambda t$ 而不是 $\lambda$==——
            **时间拉长几倍，参数就放大几倍**。
            "平均每小时 $3$ 人，两小时服从 $P(6)$"这个高频考点，
            在这里是推出来的，不是背出来的；
          * 顺手得到 $P_0(t)=e^{-\lambda t}$，
            ==这正是[指数分布](#/probability/models/exponential?at=from-poisson)的尾概率==。` },
    ] },

    /* ================================================================== */
    { t: 'h', id: 'props', c: '二、性质' },

    { t: 'key', id: 'moments', title: '$\\E X=\\Var X=\\lambda$：泊松独有的指纹', c: String.raw`
      **归一性**先验一遍：
      $$\sum_{k\ge0}\frac{\lambda^{k}}{k!}e^{-\lambda}=e^{-\lambda}\sum_{k\ge0}\frac{\lambda^{k}}{k!}
      =e^{-\lambda}e^{\lambda}=1,$$
      用的是 $e^{x}$ 的[幂级数展开](#/threads/lines/taylor?at=basic-eight)。
      ==凡是泊松的求和，最后都会归到这条级数==，所以它必须能现场写出来。

      **期望**（注意 $k=0$ 那项为零，且下标平移）：
      $$\E X=\sum_{k\ge1}k\cdot\frac{\lambda^{k}}{k!}e^{-\lambda}
      =\lambda e^{-\lambda}\sum_{k\ge1}\frac{\lambda^{k-1}}{(k-1)!}=\lambda.$$

      **方差**用 $\E[X(X-1)]$ 这个技巧（==比直接算 $\E X^{2}$ 干净==）：
      $$\E[X(X-1)]=\sum_{k\ge2}\frac{\lambda^{k}}{(k-2)!}e^{-\lambda}=\lambda^{2}
      \ \Longrightarrow\ \E X^{2}=\lambda^{2}+\lambda,$$
      $$\Var X=\lambda^{2}+\lambda-\lambda^{2}=\lambda.$$

      $$\boxed{\ \E X=\Var X=\lambda\ }$$
      ==这是泊松独有的指纹==。题目里出现"$\E X=\Var X$"、
      "$\E X=2$ 且 $\E X^{2}=6$"，基本就是在暗示泊松。

      **一个更快的验证**：由[二项极限](#/probability/models/poisson?at=route-limit)，
      $\E X=np=\lambda$，$\Var X=npq=\lambda(1-p)\to\lambda$。
      ==正是因为 $p\to0$，$q\to1$，方差才和期望重合。==
    ` },

    { t: 'key', id: 'scaling', title: '$\\lambda$ 随时间（或长度）成比例', c: String.raw`
      $$N(t)\sim P(\lambda t)$$

      | 题目说 | 一小时内 | 两小时内 | 半小时内 |
      |---|---|---|---|
      | 平均每小时 $3$ 人 | $P(3)$ | ==$P(6)$== | $P(1.5)$ |

      ==这是本页最高频的失分点==：很多人两小时还在用 $P(3)$。
      理由见[公理化推导的最后一步](#/probability/models/poisson?at=axioms)。

      **空间上同理**：平均每页 $2$ 个错字，则==十页服从 $P(20)$==；
      平均每米 $0.1$ 个疵点，则五米服从 $P(0.5)$。
    ` },

    { t: 'key', id: 'additivity', title: '可加性与分流', c: String.raw`
      **可加性**：$X\sim P(\lambda_1)$，$Y\sim P(\lambda_2)$ ==独立==，则
      $$X+Y\sim P(\lambda_1+\lambda_2).$$
      直观解释最好用："两个门各自的顾客流合成一个总流，速率相加"。
      严格证明用[卷积公式](#/probability/multi-random-var/function-2d?at=sum-convolution)，
      中间会碰到 $\sum_k\binom nk\lambda_1^{k}\lambda_2^{n-k}=(\lambda_1+\lambda_2)^{n}$——
      ==又是二项式定理==。它属于[可加分布族](#/probability/multi-random-var/function-2d?at=stable-families)。

      **分流（超纲，但很漂亮）**：一条 $P(\lambda)$ 的顾客流，
      每位顾客独立地以概率 $p$ 归为 A 类、$1-p$ 归为 B 类，则
      $$N_A\sim P(\lambda p),\qquad N_B\sim P\bigl(\lambda(1-p)\bigr),$$
      而且==$N_A$ 与 $N_B$ 相互独立==。

      =="独立"这一点非常反直觉==：总数一定时两者此消彼长，
      但总数本身是随机的，恰好把这种依赖抹平了。
      这条性质是排队论的基石，==也解释了为什么泊松模型在实际中如此好用==。
    ` },

    { t: 'key', id: 'to-exponential', title: '同一条流的另一种切法', c: String.raw`
      **数次数是泊松，量间隔是指数**：
      $$N(t)\sim P(\lambda t)\quad\Longleftrightarrow\quad
      \text{相邻两次之间的间隔}\ T\sim E(\lambda)$$

      一眼看出的理由：
      $$P(T>t)=P\bigl(N(t)=0\bigr)=e^{-\lambda t}.$$

      ==两个分布共用同一个 $\lambda$，含义却互为倒数==：
      每小时平均来 $\lambda$ 个人 $\iff$ 平均每 $\frac1\lambda$ 小时来一个人。
      所以 $\E T=\frac1\lambda$ 而 $\E N=\lambda$，==别把这两个搞混==。

      再往下一步"等到第 $k$ 个人"，就是[伽马分布](#/probability/models/gamma?at=story)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'history', c: '三、一段历史' },

    { t: 'key', id: 'history-block', title: '被埋没六十年的分布，和普鲁士的马', c: String.raw`
      **$1837$ 年**，泊松在《关于判决概率的研究》里写下了这个分布，
      当时是为了分析==法庭判决的可靠性==。
      书出版后几乎无人问津——它看起来只是二项分布的一个近似技巧。

      **$1898$ 年**，博特凯维奇在《小数定律》里让它出了名。
      他统计了普鲁士军队==二十年间被马踢死的骑兵人数==：
      $14$ 个军团、$20$ 年，共 $280$ 组数据，
      每年每军团死亡 $0$ 人的有 $144$ 组、$1$ 人的 $91$ 组、$2$ 人的 $32$ 组……

      拿 $\lambda=\frac{\text{总死亡数}}{280}\approx0.61$ 的泊松分布去套，
      ==预测值与实际频数几乎完全吻合==。

      **这件事的意义**：被马踢死显然和"独立重复试验"毫无关系，
      但只要满足"==大量机会、每次概率极小、彼此独立=="，
      计数就一定长成泊松的样子。
      ==它不关心事件的内容，只关心事件的稀有性与独立性==——
      这正是这个模型至今仍在保险、通信、生物、天文里被反复使用的原因。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-approx',
      title: '什么时候该把二项换成泊松',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某设备装有 $1000$ 个元件，各元件独立工作，
        每个元件一年内损坏的概率为 $0.002$。
        求一年内损坏元件数不超过 $2$ 个的概率。
      `,
      idea: String.raw`
        **精确模型是二项**：$X\sim B(1000,0.002)$。理论上没错，
        但 $\binom{1000}{2}$ 与 $0.998^{998}$ ==手算不现实==。

        **认出近似的信号有三个，要同时看**：
        $n=1000$ 很大、$p=0.002$ 很小、==乘积 $np=2$ 不大不小==。
        这正是[泊松定理](#/probability/models/poisson?at=route-limit)的适用条件。

        近似之后 $e^{-2}$ 是可查的常数，三项一加就完事。
      `,
      solution: String.raw`
        $X\sim B(1000,0.002)$。因 $n$ 大、$p$ 小，取 $\lambda=np=2$，用泊松近似：
        $$P(X\le2)\approx\sum_{k=0}^{2}\frac{2^{k}}{k!}e^{-2}
        =e^{-2}\left(1+2+2\right)=5e^{-2}\approx\boxed{0.677}.$$
        （二项分布的精确值约 $0.6767$，==误差在千分之一以内==。）
      `,
      comment: String.raw`
        **两条近似路线的分工**（这张表要记牢）：

        | 条件 | 用什么 |
        |---|---|
        | $n$ 大、$p$ ==小==、$np$ 适中 | ==泊松== $P(np)$ |
        | $n$ 大、$p$ ==不小== | ==正态== $N(np,npq)$ |

        **本题若改问期望方差**，就要用**精确模型**：
        $\E X=np=2$、$\Var X=npq=1.996$。
        ==泊松近似会给出 $\Var X=2$，接近但不是精确值——近似只用于算概率。==
      `,
    },

    { t: 'example',
      id: 'ex-scaling',
      title: '缩放、可加、条件：泊松的三个常考动作',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        某服务台顾客到达服从泊松流，平均每小时 $4$ 人。

        1. 求某个 $15$ 分钟内恰好来 $2$ 人的概率；
        2. 求一天中两个不重叠的小时里共来 $10$ 人的概率的表达式；
        3. 已知某小时内共来了 $5$ 人，求其中恰有 $2$ 人是在前 $20$ 分钟到达的概率。
      `,
      idea: String.raw`
        三问分别练[缩放](#/probability/models/poisson?at=scaling)、
        [可加](#/probability/models/poisson?at=additivity)和一个反直觉的条件分布。

        - 第 1 问：$15$ 分钟是 $\frac14$ 小时，==$\lambda$ 跟着变成 $1$==；
        - 第 2 问：两段独立，参数相加，是 $P(8)$；
        - 第 3 问是重点。**已知总数之后，泊松就"退化"成了二项**：
          每位顾客落在前 $20$ 分钟的概率是 $\frac{20}{60}=\frac13$，
          且各人独立，==于是给定总数 $5$ 时，前 $20$ 分钟的人数服从 $B(5,\frac13)$==。

          为什么？把两段的人数写成 $N_1\sim P(\lambda_1)$、$N_2\sim P(\lambda_2)$ 独立，
          直接算条件概率
          $$P(N_1=k\mid N_1+N_2=n)=\frac{P(N_1=k)P(N_2=n-k)}{P(N_1+N_2=n)},$$
          代入化简，==指数项全部消光，只剩 $\binom nk\left(\frac{\lambda_1}{\lambda_1+\lambda_2}\right)^{k}\cdots$==，
          正是二项分布。
      `,
      solution: String.raw`
        记每小时的到达率 $\lambda=4$。

        **(1)** $15$ 分钟 $=\frac14$ 小时，人数 $N\sim P\!\left(4\times\tfrac14\right)=P(1)$，
        $$P(N=2)=\frac{1^{2}}{2!}e^{-1}=\frac{e^{-1}}{2}\approx\boxed{0.184}.$$

        **(2)** 两段各服从 $P(4)$ 且独立，由可加性其和服从 $P(8)$，
        $$P=\frac{8^{10}}{10!}e^{-8}\approx\boxed{0.099}.$$

        **(3)** 给定该小时共 $5$ 人，每人独立地以概率 $\frac13$ 落在前 $20$ 分钟，
        故前 $20$ 分钟的人数 $\sim B\!\left(5,\frac13\right)$，
        $$P=\binom52\left(\frac13\right)^{2}\left(\frac23\right)^{3}
        =10\times\frac19\times\frac{8}{27}=\frac{80}{243}\approx\boxed{0.329}.$$
      `,
      comment: String.raw`
        **第 3 问的结论很值得单独记**：
        $$N_1+N_2=n\ \text{已知}\ \Longrightarrow\
        N_1\mid n\ \sim\ B\!\left(n,\ \frac{\lambda_1}{\lambda_1+\lambda_2}\right)$$
        ==泊松在"已知总数"的条件下退化成二项==，
        而且概率就是两段时长（或速率）之比。

        直觉：总共来了 $5$ 个人，每个人什么时候来是==均匀==分布在这一小时里的，
        落在前 $20$ 分钟的机会自然是 $\frac13$。
        ==这条"条件均匀性"是泊松过程最漂亮的性质之一==，
        它反过来也解释了[分流](#/probability/models/poisson?at=additivity)那条结论。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls-sec', c: '五、易错清单' },

    { t: 'warn', id: 'pitfalls', title: '这个模型的固定失分点', c: String.raw`
      1. **$\lambda$ 没跟着时间缩放**：==平均每小时 $3$ 次，三小时是 $P(9)$ 不是 $P(3)$==；
      2. **拿近似算数字特征**：近似只用于算概率；
      3. **可加性忘了独立**：两个泊松相加要==独立==才是泊松；
      4. **和指数的参数搞反**：$\E N=\lambda$，==而 $\E T=\frac1\lambda$==；
      5. **求和时忘了 $k=0$ 项**：$P(X\ge1)=1-e^{-\lambda}$，
         =="至少一次"一律用对立事件==；
      6. **$\E[X(X-1)]$ 与 $\E X^{2}$ 混用**：$\E X^{2}=\lambda^{2}+\lambda$，
         ==不是 $\lambda^{2}$==；
      7. **看到"稀有"就用泊松**：还要有==大量机会==和==独立性==，
         三条齐了才行。
    ` },

  ],
});
