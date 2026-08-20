/* ==========================================================================
   概率论 / 4 随机变量的数字特征 / 数字特征的常用技巧
   —— 本章的方法论汇总：不硬算分布，靠拆分、条件化和对称性。
      基本公式见 moments/expectation，协方差见 moments/covariance。
   ========================================================================== */

KM.page({
  path: 'probability/moments/tricks',
  title: '数字特征的常用技巧',
  subtitle: '这一页只讲一件事：**怎样不求分布就把期望和方差算出来**——拆成和、条件化、用对称性',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'md', c: String.raw`
      前两页给的是==定义和公式==，这一页给的是==动作==。

      考研的数字特征大题很少让你老老实实算积分，
      它们几乎总是设计成"直接算会很痛苦，换个角度就三行"的样子。
      ==换的那个角度，无非下面三种。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'decompose-sec', c: '一、拆成和：期望的线性性是无条件的' },

    { t: 'method', id: 'decompose', title: '★ 分解法：把一个复杂的量写成一堆简单量之和', c: String.raw`
      $$\E\!\left(\sum_{i=1}^{n}X_i\right)=\sum_{i=1}^{n}\E X_i$$
      ==无论 $X_i$ 之间有多复杂的相关性，这条都成立。==

      **这是本章最强的一招**，因为它把"求一个复杂随机变量的分布"
      彻底绕过去了——==只要能拆，就不需要知道整体的分布==。

      **适用信号**：所求的量是"**数有多少个**……"

      - 数有多少封信装对；
      - 数有多少个空盒；
      - 数 $n$ 次试验中有多少次成功；
      - 数一副牌里有多少张与前一张同花色。

      ==凡是"计数型"的随机变量，一律拆。==

      **动作**：
      $$X=\sum_{i=1}^{n}I_i,\qquad
      I_i=\begin{cases}1,&\text{第 }i\text{ 件事发生}\\0,&\text{否则}\end{cases}$$
      然后逐个算 $\E I_i$，加起来。

      **方差要注意**：
      $$\Var X=\sum_i\Var I_i+2\sum_{i<j}\Cov(I_i,I_j),$$
      ==交叉项不能扔==，除非各 $I_i$ 两两不相关。
      期望可以无条件拆，方差不行——这个不对称是本节唯一的技术风险。
    ` },

    { t: 'key', id: 'indicator', title: '示性函数：把"事件"变成"数"', c: String.raw`
      对事件 $A$ 定义 $I_A=\begin{cases}1,&A\ \text{发生}\\0,&\text{否则}\end{cases}$，则

      $$\boxed{\ \E I_A=P(A)\ }$$
      $$\Var I_A=P(A)\bigl[1-P(A)\bigr],\qquad I_A^{2}=I_A,\qquad I_AI_B=I_{AB}$$

      ==$\E I_A=P(A)$ 这一行是整套技巧的枢纽==：
      它把"求概率"和"求期望"焊在了一起，
      于是[分解法](#/probability/moments/tricks?at=decompose)里的每一项
      都退化成==一个概率==，而概率往往一眼可得。

      **协方差也好算**：
      $$\Cov(I_A,I_B)=\E(I_AI_B)-\E I_A\E I_B=P(AB)-P(A)P(B).$$
      ==$A,B$ 独立时为零==，这也再次说明"独立 $\Rightarrow$ 不相关"。

      **$I_A^{2}=I_A$ 的用处**：算方差时不必再算 $\E I_A^{2}$，
      ==它就等于 $\E I_A=P(A)$==。这是两点分布的老性质
      （见[总表第一行](#/probability/moments/expectation?at=table)）。
    ` },

    { t: 'example',
      id: 'ex-indicator-matching',
      title: '装错信封的期望：为什么答案与 $n$ 无关',
      source: '经典模型',
      level: 3,
      problem: String.raw`
        $n$ 封信随机装入 $n$ 个写好地址的信封，每封一个。
        设 $X$ 为装对的信封数，求 $\E X$ 与 $\Var X$。
      `,
      idea: String.raw`
        ==千万不要去求 $X$ 的分布律==——
        [第 1 章那道题](#/probability/events/operations?at=ex-matching)已经演示过，
        $P(X\ge1)$ 就要用容斥，$P(X=k)$ 更复杂。

        **拆**：$X=\sum_{i=1}^{n}I_i$，$I_i$ 表示第 $i$ 封装对。
        每一个 $\E I_i=P(\text{第 }i\text{ 封装对})=\frac1n$——
        ==由对称性，第 $i$ 封信等可能地落进任何一个信封==。
        于是 $\E X=n\cdot\frac1n=1$，==一行搞定，而且与 $n$ 无关==。

        **方差要小心**：$I_i$ 之间==不独立==
        （第 $i$ 封装对了，第 $j$ 封装对的可能性就变了），
        所以交叉项必须算。
        $$\E(I_iI_j)=P(\text{第 }i\text{、}j\text{ 封都装对})=\frac{(n-2)!}{n!}=\frac{1}{n(n-1)}.$$
        ==这个式子正是第 1 章容斥里那个 $k$ 元交，只是这里 $k=2$。==
      `,
      solution: String.raw`
        记 $I_i$ 为"第 $i$ 封信装对"的示性函数，$X=\sum_{i=1}^{n}I_i$。

        **期望**：$\E I_i=P(\text{第 }i\text{ 封装对})=\dfrac{(n-1)!}{n!}=\dfrac1n$，故
        $$\E X=\sum_{i=1}^{n}\frac1n=\boxed{1}.$$

        **方差**：$\Var I_i=\dfrac1n\left(1-\dfrac1n\right)$，共 $n$ 项，合计
        $$\sum_i\Var I_i=1-\frac1n.$$

        对 $i\ne j$，
        $$\Cov(I_i,I_j)=\frac{1}{n(n-1)}-\frac{1}{n^{2}}
        =\frac{n-(n-1)}{n^{2}(n-1)}=\frac{1}{n^{2}(n-1)}.$$
        这样的有序对共 $n(n-1)$ 个（即 $2\sum_{i<j}$），合计
        $$n(n-1)\cdot\frac{1}{n^{2}(n-1)}=\frac1n.$$

        故
        $$\Var X=\left(1-\frac1n\right)+\frac1n=\boxed{1}.$$
      `,
      comment: String.raw`
        **两个答案都是 $1$，而且都与 $n$ 无关**，这不是巧合：
        $X$ 渐近服从==参数为 $1$ 的泊松分布==
        （见[泊松的稀有事件背景](#/probability/random-var/distributions?at=poisson-limit)），
        而泊松分布的期望和方差恰好相等，都等于 $\lambda=1$。
        ==第 1 章算出的 $P(X\ge1)\to1-e^{-1}$ 和这里的 $\E X=\Var X=1$，
        是同一件事的两个侧面。==

        **$\E X=1$ 的直观解释**：每封信装对的概率是 $\frac1n$，
        一共 $n$ 封，==概率虽小但机会多，乘起来恰好抵消==。
        无论 $1000$ 封还是 $10$ 封，平均都只有一封装对。

        **这道题最该带走的是"不求分布"这个决定**。
        对照一下工作量：

        | 路线 | 工作量 |
        |---|---|
        | 求 $P(X=k)$ 再求和 | 容斥 + 错排数，==半页纸== |
        | 拆成示性函数 | ==三行== |

        **同型题（换皮）**：

        - $n$ 个球随机放入 $n$ 个盒，求空盒数的期望：
          $\E X=n\left(1-\frac1n\right)^{n}\to\frac ne$；
        - 一副牌洗乱，求"相邻两张同花色"的对数的期望；
        - $n$ 个人随机站队，求"站在自己原位置"的人数期望。

        ==全部是同一个动作：定义示性函数，算一个概率，乘个数。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'condition-sec', c: '二、条件化：先固定一个量，再平均' },

    { t: 'method', id: 'conditional-e', title: '★ 全期望公式', c: String.raw`
      $$\boxed{\ \E X=\sum_i P(A_i)\,\E(X\mid A_i)\ }$$
      连续版本：$\E X=\displaystyle\int \E(X\mid Y=y)\,f_Y(y)\dy$，
      统一写成 $\E X=\E\bigl[\E(X\mid Y)\bigr]$。

      ==这就是[全概率公式](#/probability/events/conditional?at=total-prob)把"概率"换成"期望"==，
      结构完全一样：**分支的权重 $\times$ 分支内的值，再求和**。

      **适用信号**：==试验分两个阶段，第一阶段的结果决定了第二阶段的参数==。

      - "先掷骰子得到 $N$，再抛 $N$ 次硬币"；
      - "一天来的顾客数是随机的，每位顾客的消费额也是随机的"；
      - "先随机选一台机器，再看它生产的产品"。

      **动作三步**：

      1. 找出那个"第一阶段的随机量" $Y$（==它就是要条件化的对象==）；
      2. 写出 $\E(X\mid Y=y)$——==此时 $y$ 是已知的数，问题退化成一维==；
      3. 把得到的关于 $y$ 的表达式对 $Y$ 求期望。

      ==第 2 步之所以简单，是因为"固定了 $Y$"之后随机性只剩一层。==
    ` },

    { t: 'key', id: 'total-var', title: '全方差公式', c: String.raw`
      $$\boxed{\ \Var X=\underbrace{\E\bigl[\Var(X\mid Y)\bigr]}_{\text{组内波动的平均}}
      +\underbrace{\Var\bigl[\E(X\mid Y)\bigr]}_{\text{组间均值的波动}}\ }$$

      **两项的含义值得单独体会**：

      - 第一项：==固定 $Y$ 之后 $X$ 还剩多少波动==，把这些波动平均起来；
      - 第二项：==不同的 $Y$ 把 $X$ 的中心推到了不同的位置==，这些位置本身的波动。

      总波动 = 组内 + 组间。这与统计学里的方差分解、
      与[二维正态的条件方差](#/probability/multi-random-var/normal-2d?at=marginal-normal)
      $\sigma_2^{2}(1-\rho^{2})$ 是同一个思想：
      ==知道了 $Y$，就消掉了第二项那部分不确定性==。

      **注意两项里 $\E$ 和 $\Var$ 的位置正好交叉**，
      写反是本节最常见的错误。
      ==记法：先算完的那个运算写在里面，外面套另一个。==

      （全方差公式是数一的加分项，不是必考，但用它算随机个数之和的方差非常快。）
    ` },

    { t: 'example',
      id: 'ex-total-expectation',
      title: '两阶段试验：骰子决定抛几次硬币',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        先掷一枚均匀骰子，得到点数 $N$；再独立地抛 $N$ 次均匀硬币，
        设 $X$ 为出现正面的次数。求 $\E X$ 与 $\Var X$。
      `,
      idea: String.raw`
        **直接求 $X$ 的分布律要做六次二项分布再加权**，能做但很啰嗦。

        **条件化**：一旦固定 $N=n$，第二阶段就是标准的
        [$n$ 重伯努利试验](#/probability/events/independence?at=bernoulli)，
        $$X\mid N=n\ \sim\ B\!\left(n,\tfrac12\right),$$
        于是 $\E(X\mid N=n)=\frac n2$、$\Var(X\mid N=n)=\frac n4$ ==直接查表可得==。

        剩下的只是把这两个关于 $n$ 的表达式对 $N$ 求期望（和方差）。
        ==难点从"求分布"变成了"算 $\E N$ 和 $\Var N$"==，而 $N$ 是均匀的离散分布，很好算。

        **方差别忘了第二项**：$\E(X\mid N)=\frac N2$ ==本身是个随机变量==，
        它的波动也要计入总方差。
        只算 $\E[\Var(X\mid N)]$ 会==系统性地低估==方差。
      `,
      solution: String.raw`
        $N$ 在 $\set{1,2,\dots,6}$ 上等可能，
        $$\E N=\frac{1+2+\cdots+6}{6}=\frac{7}{2},\qquad
        \E N^{2}=\frac{1^{2}+\cdots+6^{2}}{6}=\frac{91}{6},$$
        $$\Var N=\frac{91}{6}-\frac{49}{4}=\frac{182-147}{12}=\frac{35}{12}.$$

        给定 $N=n$ 时 $X\sim B(n,\frac12)$，故
        $$\E(X\mid N)=\frac N2,\qquad \Var(X\mid N)=\frac N4.$$

        **全期望公式**：
        $$\E X=\E\!\left[\frac N2\right]=\frac12\cdot\frac72=\boxed{\frac74}=1.75.$$

        **全方差公式**：
        $$\Var X=\E\!\left[\frac N4\right]+\Var\!\left[\frac N2\right]
        =\frac14\cdot\frac72+\frac14\cdot\frac{35}{12}
        =\frac78+\frac{35}{48}=\frac{42+35}{48}=\boxed{\frac{77}{48}}\approx1.604.$$
      `,
      comment: String.raw`
        **对照一下"如果不用条件化"**：
        要写出 $P(X=k)=\sum_{n=k}^{6}\frac16\binom nk\left(\frac12\right)^{n}$，
        再算 $\sum k P(X=k)$ 和 $\sum k^{2}P(X=k)$——==计算量差了一个数量级==。

        **一个值得记住的一般结论**（随机个数之和，即"瓦尔德等式"）：
        设 $X=\sum_{i=1}^{N}Y_i$，其中 $Y_i$ 独立同分布、与 $N$ 独立，
        $\E Y_i=\mu$，$\Var Y_i=\sigma^{2}$，则
        $$\E X=\E N\cdot\mu,\qquad
        \Var X=\E N\cdot\sigma^{2}+\Var N\cdot\mu^{2}.$$
        本题就是 $Y_i$ 服从两点分布 $B(1,\frac12)$ 的特例：
        $\mu=\frac12$、$\sigma^{2}=\frac14$，代入即得上面两个答案。
        ==期望的公式很直观（平均个数 × 平均单值），方差的公式则明确告诉你
        "个数的随机性"也贡献方差==。

        **现实版本**：一天的顾客数 $N\sim P(\lambda)$、每位消费额均值 $\mu$，
        则日营业额期望为 $\lambda\mu$。
        ==保险公司算总赔付、商店算日流水，用的都是这条。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'symmetry-sec', c: '三、对称性：不算就得到答案' },

    { t: 'method', id: 'symmetry', title: '★ 对称性的三种用法', c: String.raw`
      **① 奇函数在对称区间上的积分为零。**
      密度是偶函数时，==所有奇次矩为零==：
      $$X\sim U(-a,a)\ \text{或}\ N(0,\sigma^{2})\ \Longrightarrow\ \E X=\E X^{3}=\E X^{5}=\cdots=0.$$
      这一条直接给出了[不相关但不独立](#/probability/moments/covariance?at=ex-uncorrelated-not-indep)
      那个反例里的 $\Cov=0$。

      **② 同分布的量必有相同的期望。**
      若 $X$ 与 $Y$ ==可交换==（交换它们不改变联合分布），则
      $$\E X=\E Y,\qquad \E g(X)=\E g(Y).$$
      于是遇到 $\E(X-Y)$ 之类可以==直接判零==，
      遇到 $\E X+\E Y$ 可以==用一个已知量除以二==。
      这是[抽签公平性](#/probability/events/operations?at=ex-lottery)那道题的升级版。

      **③ 拆成"对称部分 + 反对称部分"。**
      最典型的是
      $$\max(X,Y)+\min(X,Y)=X+Y,\qquad
      \max(X,Y)-\min(X,Y)=\abs{X-Y}.$$
      ==两式相加减，就能由两个容易算的量得到两个难算的量==，
      完全不必求 $\max$、$\min$ 的分布。

      **共同的思路**：==先找出题目里的一个"不变性"，再让它替你做计算。==
      检验方法：如果你算出来的答案"与某个下标无关"或"两项恰好相消"，
      背后通常就藏着一个对称性，==找出来能把过程缩短一大截==。
    ` },

    { t: 'example',
      id: 'ex-symmetry',
      title: '$\\max$ 与 $\\min$ 的期望：加减法比求分布快十倍',
      source: '经典技巧',
      level: 3,
      problem: String.raw`
        设 $X,Y$ 相互独立且都服从 $U(0,1)$，
        令 $M=\max(X,Y)$，$N=\min(X,Y)$。求 $\E M$ 与 $\E N$。
      `,
      idea: String.raw`
        **常规路线**：求 $F_M(z)=z^{2}$、$f_M(z)=2z$，
        再积分 $\int_0^1 2z^{2}\dz=\frac23$。这条路不长，==但换个分布就不好走了==。

        **对称路线**（更通用）：注意两条恒等式
        $$M+N=X+Y,\qquad M-N=\abs{X-Y}.$$
        取期望得
        $$\E M+\E N=\E X+\E Y=1,\qquad \E M-\E N=\E\abs{X-Y}.$$
        ==两个未知数，两个方程==，解出来即可。
        而 $\E\abs{X-Y}$ 是一个二重积分，用[对称性](#/probability/moments/tricks?at=symmetry)
        把绝对值去掉：只算 $x>y$ 的一半再乘 $2$。

        **这条路线的价值**：$M+N=X+Y$ 这个恒等式==对任何 $X,Y$ 都成立==，
        与分布无关。所以只要 $\E(X+Y)$ 和 $\E\abs{X-Y}$ 好算，
        $\max$ 和 $\min$ 的期望就一并拿到。
      `,
      solution: String.raw`
        **恒等式**：对任意实数 $x,y$，
        $$\max+\min=x+y,\qquad \max-\min=\abs{x-y}.$$

        **第一个方程**：$\E M+\E N=\E X+\E Y=\frac12+\frac12=1$。

        **第二个方程**：由 $X,Y$ 独立均匀，联合密度在单位正方形上恒为 $1$，
        利用关于直线 $y=x$ 的对称性只算下半区再乘 $2$：
        $$\E\abs{X-Y}=2\int_0^1\!\!\int_0^{x}(x-y)\dy\dx
        =2\int_0^1\frac{x^{2}}{2}\dx=\frac13.$$
        故 $\E M-\E N=\frac13$。

        **解得**
        $$\E M=\frac12\left(1+\frac13\right)=\boxed{\frac23},\qquad
        \E N=\frac12\left(1-\frac13\right)=\boxed{\frac13}.$$

        **验证**（走常规路线）：$F_M(z)=z^{2}$，$f_M(z)=2z$，
        $\E M=\int_0^1 2z^{2}\dz=\frac23\ \checkmark$
      `,
      comment: String.raw`
        **结果的直观意义**：两个均匀点把 $[0,1]$ 分成三段，
        ==由对称性三段的平均长度都是 $\frac13$==，
        所以较小的点平均在 $\frac13$、较大的点平均在 $\frac23$。
        推广到 $n$ 个独立的 $U(0,1)$：第 $k$ 小的那个点期望为 $\dfrac{k}{n+1}$，
        ==$n+1$ 段等分==。这条结论记住能秒杀不少填空题。

        **恒等式路线的更大价值在于它不挑分布**。
        例如 $X,Y$ 独立同服从 $E(\lambda)$：
        由[指数族对取最小值封闭](#/probability/multi-random-var/function-2d?at=max-min)，
        $N\sim E(2\lambda)$，$\E N=\frac{1}{2\lambda}$；
        再由 $\E M+\E N=\frac2\lambda$ 得 $\E M=\frac{3}{2\lambda}$，
        ==根本不用去求 $M$ 的分布==。

        **这一招的适用面**：只要看到 $\max$ 与 $\min$ ==成对出现==，
        就先写 $M+N=X+Y$。
        考研里"求 $\E[\max(X,Y)]$"这类题，命题人给的往往正是
        $\min$ 好算而 $\max$ 难算的组合。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'summary', c: '四、总清单' },

    { t: 'compare',
      id: 'checklist',
      title: '看到什么，用哪一招',
      cols: ['题目的样子', '动作', '依据'],
      rows: [
        ['"数有多少个……"', '拆成示性函数之和', '[分解法](#/probability/moments/tricks?at=decompose)'],
        ['两阶段试验、参数本身随机', '按第一阶段条件化', '[全期望公式](#/probability/moments/tricks?at=conditional-e)'],
        ['密度是偶函数、区间关于原点对称', '奇次矩直接判零', '[对称性①](#/probability/moments/tricks?at=symmetry)'],
        ['$\\max$ 与 $\\min$ 成对出现', '用 $M+N=X+Y$', '[对称性③](#/probability/moments/tricks?at=symmetry)'],
        ['求 $\\E[g(X)]$', '直接积分，不求 $g(X)$ 的分布', '[无意识统计学家法则](#/probability/moments/expectation?at=lotus)'],
        ['$X$ 是常见分布', '查表', '[数字特征总表](#/probability/moments/expectation?at=table)'],
        ['要 $\\Var$ 且各项相关', '别忘 $2\\sum_{i<j}\\Cov$', '[方差的性质](#/probability/moments/expectation?at=var-props)'],
      ] },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **拆完之后对方差也直接相加**：==期望可以无条件拆，方差不行==，
         交叉的 $\Cov$ 项必须算（[装错信封](#/probability/moments/tricks?at=ex-indicator-matching)
         里它恰好把 $-\frac1n$ 补了回来）。
      2. **全方差公式两项写反**：是 $\E[\Var(X\mid Y)]+\Var[\E(X\mid Y)]$，
         ==$\E$ 和 $\Var$ 的位置交叉==。
      3. **只算 $\E[\Var(X\mid Y)]$ 就当作总方差**：会系统性地偏小，
         ==漏掉了"条件均值本身在波动"这部分==。
      4. **条件化时选错了条件对象**：应当选==第一阶段==的随机量，
         选了第二阶段就化简不掉。
      5. **误用对称性**：只有"交换后联合分布不变"才能说 $\E X=\E Y$，
         ==同分布但不可交换的场合要小心==。
      6. **示性函数的方差写成 $P(A)$**：是 $P(A)[1-P(A)]$；
         ==$\E I_A^{2}=P(A)$ 才是对的==。
      7. **拆出来的 $I_i$ 默认独立**：装错信封、不放回抽取里 ==$I_i$ 都不独立==。
    ` },

  ],
});
