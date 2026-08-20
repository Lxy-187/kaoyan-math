/* ==========================================================================
   概率论 / 4 随机变量的数字特征 / 期望与方差的计算
   —— 数字特征把一整个分布压缩成几个数。
      协方差与相关系数见 moments/covariance；技巧见 moments/tricks。
   ========================================================================== */

KM.page({
  path: 'probability/moments/expectation',
  title: '期望与方差的计算',
  subtitle: '期望是**加权平均**，方差是**平方偏差的平均**。两条最省事的公式：$\\E[g(X)]$ 不用先求分布，$\\Var X=\\E X^{2}-(\\E X)^{2}$',
  tags: ['小题', '大题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'def-e', title: '期望：三种类型，一个含义', c: String.raw`
      **离散型**：
      $$\E X=\sum_i x_i\,p_i\qquad(\text{要求}\ \textstyle\sum_i\abs{x_i}p_i<\infty)$$

      **连续型**：
      $$\E X=\int_{-\infty}^{+\infty}x\,f(x)\dx\qquad(\text{要求}\ \textstyle\int\abs x f\dx<\infty)$$

      **混合型**：==两块分别算再相加==——离散部分求和，连续部分积分。
      例如[截断产生的混合型](#/probability/random-var/cdf-pdf?at=ex-mixed)：
      $\E Y=\int_0^1 y\cdot\frac12\dy+1\cdot\frac12$。

      ==三种写法说的是同一件事：以概率为权重的加权平均==，
      也就是"把 $X$ 的所有可能取值按各自的概率摊平"。

      **绝对收敛不是摆设**：柯西分布 $f(x)=\frac{1}{\pi(1+x^{2})}$
      的 $\int\abs x f\dx$ 发散，==它没有期望==。
      考研不会直接考柯西分布，但会考"$\E X$ 是否存在"这类概念判断，
      ==判据就是绝对收敛==。

      **期望是一个数，不是随机变量**——
      $\E X$ 里已经没有任何随机性了，这一点在写 $\E(\E X)=\E X$ 时要清楚。
    ` },

    { t: 'key', id: 'lotus', title: '★ 无意识统计学家法则：求 $\\E[g(X)]$ 不必先求 $g(X)$ 的分布', c: String.raw`
      $$\boxed{\ \E[g(X)]=\sum_i g(x_i)p_i
      \qquad\text{或}\qquad
      \E[g(X)]=\int_{-\infty}^{+\infty}g(x)f(x)\dx\ }$$

      **二维版本**（本章大题的主力）：
      $$\E[g(X,Y)]=\sum_i\sum_j g(x_i,y_j)p_{ij}
      \qquad\text{或}\qquad
      \E[g(X,Y)]=\iint_{\R^{2}}g(x,y)f(x,y)\dxy$$

      ==这条法则省掉的正是第 2、3 章最费事的那一步==：
      求 $Y=g(X)$ 的分布要解不等式、分段讨论、求导；
      而求 $\E[g(X)]$ ==只要把 $g$ 塞进积分号里==。

      **它为什么成立（直觉）**：期望是"按概率加权求和"，
      而 $g(X)$ 取值 $g(x_i)$ 的概率==就是 $X$ 取 $x_i$ 的概率==——
      权重没变，只是被加权的量变了。

      **最常用的三个特例**：
      $$\E X^{2}=\int x^{2}f\dx,\qquad
      \E\frac1X=\int\frac1xf\dx,\qquad
      \E(XY)=\iint xy\,f(x,y)\dxy$$

      **反过来的错误**：==$\E[g(X)]\ne g(\E X)$==。
      比如 $\E X^{2}\ne(\E X)^{2}$（差一个方差），$\E\frac1X\ne\frac{1}{\E X}$。
      只有 $g$ 是==线性函数==时才相等，见下一条。
    ` },

    { t: 'key', id: 'linearity', title: '线性性：无条件成立的那一条', c: String.raw`
      $$\boxed{\ \E(aX+bY+c)=a\E X+b\E Y+c\ }$$

      ==这里不需要独立、不需要不相关、什么都不需要==。
      只要各个期望存在，线性性就成立。

      **这是整章最强的工具**，因为它允许==把复杂的随机变量拆成简单的和==：
      $$X=X_1+X_2+\cdots+X_n\ \Longrightarrow\ \E X=\sum\E X_i$$
      即使 $X_i$ 之间有复杂的相关性也照样成立。
      ==这就是[分解成和](#/probability/moments/tricks?at=decompose)那一招的全部依据==，
      也是求二项分布、超几何分布期望最快的办法。

      **对比着记**：
      | | 需要独立/不相关吗 |
      |---|---|
      | $\E(X+Y)=\E X+\E Y$ | ==不需要== |
      | $\E(XY)=\E X\,\E Y$ | ==需要（不相关即可）== |
      | $\Var(X+Y)=\Var X+\Var Y$ | ==需要（不相关即可）== |

      ==第一行无条件，后两行有条件==——这张对照表是本章最容易失分的地方。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'variance', c: '一、方差' },

    { t: 'key', id: 'var-def', title: '定义与计算公式', c: String.raw`
      $$\Var X=\E\bigl[(X-\E X)^{2}\bigr]$$

      **展开即得计算公式**（==实际计算几乎只用这一条==）：
      $$\boxed{\ \Var X=\E X^{2}-(\E X)^{2}\ }$$
      推导：$\E(X^{2}-2X\E X+(\E X)^{2})=\E X^{2}-2(\E X)^{2}+(\E X)^{2}$。

      **两个立刻能用的推论**：

      - $\Var X\ge0$，故 ==$\E X^{2}\ge(\E X)^{2}$==
        （这就是[柯西–施瓦茨不等式](#/threads/patterns/cauchy-schwarz?at=three-forms)的概率版）；
      - $\Var X=0\iff X$ ==几乎处处等于常数==。

      **标准差** $\sigma=\sqrt{\Var X}$ 与 $X$ ==同量纲==，
      所以描述"波动幅度"时用标准差，做代数运算时用方差。

      **计算路线的选择**：

      | 已知 | 怎么求 $\Var X$ |
      |---|---|
      | 分布律 / 密度 | 算 $\E X$ 和 $\E X^{2}$，代入公式 |
      | $X$ 服从常见分布 | ==直接查[总表](#/probability/random-var/distributions?at=table)== |
      | $X=\sum X_i$ 且不相关 | $\Var X=\sum\Var X_i$ |
      | 只知道 $\E X,\E X^{2}$ | 直接代入 |

      ==按定义式 $\int(x-\E X)^{2}f\dx$ 硬算几乎总是最慢的路==，
      除非 $\E X=0$。
    ` },

    { t: 'key', id: 'var-props', title: '方差的性质：常数会被平方，加法要条件', c: String.raw`
      $$\Var(aX+b)=a^{2}\Var X$$
      $$\Var(X\pm Y)=\Var X+\Var Y\pm2\Cov(X,Y)$$
      $$\Var\!\left(\sum_{i=1}^{n}X_i\right)=\sum_{i=1}^{n}\Var X_i+2\sum_{i<j}\Cov(X_i,X_j)$$

      **三条要点**：

      1. ==常数 $b$ 完全消失==：平移不改变波动。
         这是方差与期望最大的区别（$\E(X+b)=\E X+b$）。
      2. ==系数取平方，而且不带绝对值问题==：$\Var(-X)=\Var X$。
      3. ==交叉项需要 $\Cov=0$ 才能扔掉==。
         此时（也只有此时）
         $$\Var(X+Y)=\Var(X-Y)=\Var X+\Var Y.$$
         ==注意减法也是"加"==：$\Var(X-Y)$ 绝不会是 $\Var X-\Var Y$。

      **一个高频结论**：$X_1,\dots,X_n$ 独立同分布、方差为 $\sigma^{2}$ 时，
      样本均值 $\bar X=\frac1n\sum X_i$ 满足
      $$\E\bar X=\mu,\qquad \Var\bar X=\frac{\sigma^{2}}{n}.$$
      ==方差随 $n$ 变小而期望不变==——
      这一行就是大数定律和整个数理统计的动机。

      **标准化**：$X^{*}=\dfrac{X-\E X}{\sqrt{\Var X}}$ 满足 $\E X^{*}=0$，$\Var X^{*}=1$。
      正态的[标准化](#/probability/random-var/distributions?at=normal-standardize)只是它的特例，
      ==这个操作对任何有方差的随机变量都能做==。
    ` },

    { t: 'compare',
      id: 'table',
      title: '数字特征总表（背这一张就够）',
      cols: ['分布', '$\\E X$', '$\\Var X$', '记忆线索'],
      rows: [
        ['两点 $B(1,p)$', '$p$', '$p(1-p)$', '$\\E X^{2}=\\E X=p$，因为 $X^{2}=X$'],
        ['二项 $B(n,p)$', '$np$', '$np(1-p)$', '$n$ 个两点分布之和'],
        ['泊松 $P(\\lambda)$', '$\\lambda$', '$\\lambda$', '==两者相等，泊松的指纹=='],
        ['几何 $G(p)$', '$\\frac1p$', '$\\frac{1-p}{p^{2}}$', '成功率 $\\frac1{10}$ 平均试 $10$ 次'],
        ['均匀 $U(a,b)$', '$\\frac{a+b}{2}$', '$\\frac{(b-a)^{2}}{12}$', '中点；分母 $12$'],
        ['指数 $E(\\lambda)$', '$\\frac1\\lambda$', '$\\frac{1}{\\lambda^{2}}$', '==方差是期望的平方=='],
        ['正态 $N(\\mu,\\sigma^{2})$', '$\\mu$', '$\\sigma^{2}$', '参数即答案'],
        ['卡方 $\\chi^{2}(n)$', '$n$', '$2n$', '$n$ 个 $N(0,1)$ 的平方和'],
      ] },

    { t: 'method', id: 'how-to-compute', title: '拿到一道求期望方差的题，按这个顺序问', c: String.raw`
      1. **$X$ 是不是常见分布？** 是就==直接查表==，一秒钟的事。
         注意先把参数对上（"平均寿命 $1000$"意味着 $\lambda=\frac{1}{1000}$）。
      2. **$X$ 能不能拆成简单变量之和？**
         能就用线性性拆开，见[分解成和](#/probability/moments/tricks?at=decompose)。
         ==这条对"计数型"随机变量（数有多少个……）几乎百试百灵==。
      3. **要求的是 $\E[g(X)]$ 吗？**
         是就用[无意识统计学家法则](#/probability/moments/expectation?at=lotus)，
         ==不要先去求 $g(X)$ 的分布==。
      4. **都不是，才老实积分求和。**
         此时也优先算 $\E X$ 与 $\E X^{2}$，用 $\Var X=\E X^{2}-(\E X)^{2}$。

      **算完的两个检验**：

      - ==$\Var X\ge0$==，算出负数必错；
      - $\E X$ 应当落在 $X$ 的取值范围内。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-lotus',
      title: '$\\E[g(X)]$：绕开求分布这一步',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $X\sim U(0,\pi)$，求 $\E(\sin X)$、$\E X^{2}$ 与 $\Var(\sin X)$。
      `,
      idea: String.raw`
        **第一反应可能是"先求 $Y=\sin X$ 的密度"**——
        那要处理 $\sin$ 在 $(0,\pi)$ 上==不单调==（两支）、反函数带 $\arcsin$、
        求导后出现 $\frac{1}{\sqrt{1-y^{2}}}$……==工作量是这道题的十倍==。

        [无意识统计学家法则](#/probability/moments/expectation?at=lotus)说：
        ==根本不需要 $Y$ 的密度==，把 $\sin x$ 直接塞进 $\int\cdot f(x)\dx$ 就行。

        **求 $\Var(\sin X)$ 时同理**：
        $$\Var(\sin X)=\E(\sin^{2}X)-\bigl[\E(\sin X)\bigr]^{2},$$
        其中 $\E(\sin^{2}X)$ 又是一次法则的应用（$g(x)=\sin^{2}x$）。
        ==一道题里连用两次，这就是这条法则的典型用法。==

        $\int_0^\pi\sin^{2}x\dx$ 用降幂公式 $\sin^{2}x=\frac{1-\cos2x}{2}$，
        或者直接用"$\sin^{2}$ 在半周期上的平均值是 $\frac12$"这个事实。
      `,
      solution: String.raw`
        $X$ 的密度为 $f(x)=\dfrac1\pi$（$0<x<\pi$）。

        **$\E(\sin X)$**：
        $$\E(\sin X)=\int_0^{\pi}\sin x\cdot\frac1\pi\dx
        =\frac1\pi\bigl[-\cos x\bigr]_0^{\pi}=\frac{2}{\pi}.$$

        **$\E X^{2}$**：
        $$\E X^{2}=\int_0^{\pi}x^{2}\cdot\frac1\pi\dx=\frac{1}{\pi}\cdot\frac{\pi^{3}}{3}=\frac{\pi^{2}}{3}.$$
        （顺带 $\E X=\frac\pi2$，故 $\Var X=\frac{\pi^{2}}{3}-\frac{\pi^{2}}{4}=\frac{\pi^{2}}{12}$，
        与[均匀分布的公式](#/probability/moments/expectation?at=table) $\frac{(b-a)^{2}}{12}$ 一致 $\checkmark$）

        **$\Var(\sin X)$**：
        $$\E(\sin^{2}X)=\int_0^{\pi}\frac{1-\cos2x}{2}\cdot\frac1\pi\dx
        =\frac{1}{2\pi}\left[x-\frac{\sin2x}{2}\right]_0^{\pi}=\frac{1}{2\pi}\cdot\pi=\frac12,$$
        $$\Var(\sin X)=\frac12-\left(\frac2\pi\right)^{2}=\boxed{\frac12-\frac{4}{\pi^{2}}}\approx0.0947.$$
      `,
      comment: String.raw`
        **注意 $\E(\sin X)=\frac2\pi\approx0.637$ 而 $\sin(\E X)=\sin\frac\pi2=1$**——
        ==两者相差很大==，这是 $\E[g(X)]\ne g(\E X)$ 最直观的演示。

        差距的方向也不是偶然的：$\sin$ 在 $(0,\pi)$ 上是==凹函数==，
        由詹森不等式必有 $\E[g(X)]\le g(\E X)$。
        ==凹函数期望在下，凸函数期望在上==，
        这条可以用来检验答案方向（$\E X^{2}\ge(\E X)^{2}$ 就是凸函数的情形）。

        **本题的推广**：$\E(\cos X)=\frac1\pi\int_0^\pi\cos x\dx=0$，
        因为 $\cos$ 在 $(0,\pi)$ 上关于 $x=\frac\pi2$ 反对称。
        ==看到对称区间上的奇函数，直接判 $0$，别积分==——
        这是[对称性](#/probability/moments/tricks?at=symmetry)那一招。

        **常见变体**：$X\sim U(-1,1)$ 求 $\E\abs X$、$\E X^{3}$。
        $\E X^{3}=0$（奇函数），$\E\abs X=\frac12$（对称折半）。
      `,
    },

    { t: 'example',
      id: 'ex-var',
      title: '由数字特征反求参数',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        1. 设 $X\sim B(n,p)$，已知 $\E X=6$，$\Var X=3.6$，求 $n$ 和 $p$；
        2. 设 $X$ 服从泊松分布，且 $\E\bigl[(X-1)(X-2)\bigr]=1$，求 $P(X=0)$。
      `,
      idea: String.raw`
        **第 1 问**是标准的联立方程：$np=6$，$np(1-p)=3.6$，
        ==两式相除立刻消掉 $n$==，这是最省事的一步。

        **第 2 问的关键是不要展开成 $\E X^{2}$ 再回代**——
        虽然那样也能做，但 $(X-1)(X-2)$ 这个形式是==命题人故意给的==：
        对泊松分布，
        $$\E\bigl[X(X-1)\bigr]=\lambda^{2},\qquad
        \E\bigl[X(X-1)(X-2)\bigr]=\lambda^{3}$$
        这类"**阶乘矩**"极其好算，因为 $\frac{k(k-1)}{k!}=\frac{1}{(k-2)!}$
        ==正好把阶乘往下降两档，求和后仍是 $e^{\lambda}$ 的级数==。

        本题给的是 $(X-1)(X-2)$ 而不是 $X(X-1)$，
        所以还是老实展开成 $\E X^{2}-3\E X+2$ 更稳，
        ==但要记住泊松的 $\E X^{2}=\lambda+\lambda^{2}$==（由 $\Var=\E X^{2}-(\E X)^{2}$ 反解）。
      `,
      solution: String.raw`
        **(1)** 由 $\E X=np=6$ 与 $\Var X=np(1-p)=3.6$，相除得
        $$1-p=\frac{3.6}{6}=0.6\ \Longrightarrow\ p=0.4,$$
        代回 $np=6$ 得 $n=\dfrac{6}{0.4}=15$。
        故 $\boxed{n=15,\ p=0.4}$。

        **(2)** 设 $X\sim P(\lambda)$。由 $\E X=\lambda$、$\Var X=\lambda$ 得
        $$\E X^{2}=\Var X+(\E X)^{2}=\lambda+\lambda^{2}.$$
        于是
        $$\E\bigl[(X-1)(X-2)\bigr]=\E\bigl[X^{2}-3X+2\bigr]
        =(\lambda+\lambda^{2})-3\lambda+2=\lambda^{2}-2\lambda+2.$$
        令其等于 $1$：
        $$\lambda^{2}-2\lambda+1=0\ \Longrightarrow\ (\lambda-1)^{2}=0\ \Longrightarrow\ \lambda=1.$$
        故
        $$P(X=0)=\frac{\lambda^{0}}{0!}e^{-\lambda}=\boxed{e^{-1}}.$$
      `,
      comment: String.raw`
        **第 1 问的通法**：二项分布只有两个参数，
        ==$\E X$ 和 $\Var X$ 恰好给两个方程，一定能唯一解出==。
        相除消 $n$ 是固定动作，因为 $\frac{\Var X}{\E X}=1-p$ ==直接给出 $p$==。

        **同一个技巧对别的分布**：

        | 分布 | $\frac{\Var X}{\E X}$ | 说明 |
        |---|---|---|
        | 二项 $B(n,p)$ | $1-p<1$ | ==方差小于期望== |
        | 泊松 $P(\lambda)$ | $1$ | ==相等== |
        | 几何 $G(p)$ | $\frac{1-p}{p}$ | 可大可小 |

        =="方差与期望谁大"能一眼排除掉一些选项==，
        选择题里很好用。

        **第 2 问的教训**：看到泊松分布求 $\E$ 的多项式，
        ==先把 $\E X^{2}=\lambda+\lambda^{2}$ 写在草稿纸上==，
        剩下的全是代数。
        更高阶时用阶乘矩 $\E[X(X-1)\cdots(X-k+1)]=\lambda^{k}$ 更快。

        **一个副产品**：本题解出 $(\lambda-1)^{2}=0$ 是重根，
        ==说明 $\lambda=1$ 是唯一解，不必讨论==。
        若解出两个正根，则要检查题目有没有别的约束。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **$\E[g(X)]$ 写成 $g(\E X)$**：==只有线性函数才行==。
         $\E X^{2}\ne(\E X)^{2}$，$\E\frac1X\ne\frac1{\E X}$。
      2. **$\Var(aX+b)$ 写成 $a\Var X+b$**：正确的是 ==$a^{2}\Var X$==，
         常数 $b$ 完全消失。
      3. **$\Var(X-Y)$ 写成 $\Var X-\Var Y$**：
         正确的是 $\Var X+\Var Y-2\Cov(X,Y)$，==不相关时也是"加"==。
      4. **无条件用 $\E(XY)=\E X\E Y$**：==需要不相关==。
         而 $\E(X+Y)=\E X+\E Y$ 才是无条件的。
      5. **为求 $\E[g(X)]$ 先求 $g(X)$ 的分布**：多做十倍的工作。
      6. **参数没对上就查表**：指数分布的 $\lambda$ 与"平均寿命"互为倒数。
      7. **忘了检验 $\Var X\ge0$**：算出负数说明中途符号错了。
      8. **混合型只算一块**：离散部分和连续部分都要算，
         见[混合型的期望](#/probability/random-var/cdf-pdf?at=ex-mixed)。
      9. **忽略期望的存在性**：级数或积分==必须绝对收敛==，
         否则期望不存在（这是概念题的考点）。
    ` },

  ],
});
