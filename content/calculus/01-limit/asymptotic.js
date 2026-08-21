/* ==========================================================================
   高等数学 / 1 函数、极限、连续 / 无穷小比较与渐近分析
   —— "谁跑得快"这个问题的系统回答，以及它在全书的复用。
      等价无穷小见 limit/equivalent。
   ========================================================================== */

KM.page({
  path: 'calculus/limit/asymptotic',
  title: '无穷小比较与渐近分析',
  subtitle: '整门课反复在问同一件事：**两个趋于零（或无穷）的量，谁跑得快**。答案统一表述为"阶"',
  tags: ['小题', '概念辨析'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'why-order', title: '为什么"阶"是个统一的概念', c: String.raw`
      看似无关的一堆问题，==问的都是同一件事==：

      | 问题 | 实质 |
      |---|---|
      | $\lim\frac{f}{g}$ 等于几 | $f$ 与 $g$ 谁的阶高 |
      | $\sum a_n$ 收不收敛 | $a_n$ ==衰减得够不够快== |
      | $\int_1^{\infty}f$ 收不收敛 | 同上 |
      | 泰勒展开要展到几阶 | ==需要保留到哪一阶才不丢信息== |
      | 极值判别用几阶导数 | 首个非零导数的阶 |
      | 曲线有没有渐近线 | $f(x)-(ax+b)$ 的阶 |

      $$\boxed{\ \text{"阶"} = \text{"跑得多快"的定量刻画}\ }$$

      ==掌握了"数阶数"这一个动作，上面六件事就都会做了==。
      本页把这个动作说清楚，并给出各处的对照。
    ` },

    { t: 'key', id: 'standard-scale', title: '标尺：用什么来量', c: String.raw`
      **无穷小的标尺**（$x\to0$）：$x,x^{2},x^{3},\dots$
      $$\alpha\ \text{是 }k\ \text{阶无穷小}\iff \lim_{x\to0}\frac{\alpha}{x^{k}}=c\ne0$$

      **无穷大的标尺**（$x\to+\infty$）：
      $$\ln^{a}x\ \ll\ x^{b}\ \ll\ c^{x}\ \ll\ x^{x}\qquad(a,b>0,\ c>1)$$
      ==对数 $\ll$ 幂 $\ll$ 指数 $\ll$ 幂塔==，
      数列还要加上 $n!$（在 $c^{n}$ 与 $n^{n}$ 之间）。

      **"$\ll$"的含义**：$\lim\frac{\text{左}}{\text{右}}=0$。
      ==这条链子能秒杀大量极限==：
      $$\lim_{x\to+\infty}\frac{\ln^{100}x}{x^{0.01}}=0,\qquad
      \lim_{n\to\infty}\frac{n^{1000}}{1.001^{n}}=0.$$
      ==指数再小的底（只要 $>1$）也能压倒幂函数再大的次数==，
      这一点很反直觉但必须记住。

      **对数的"无限慢"**：$\ln x$ 比任何 $x^{\eps}$ 都慢，
      ==所以它不改变 $p$ 的档位==：
      $\sum\frac{\ln n}{n^{2}}$ 收敛、$\sum\frac{1}{n\ln n}$ 发散，
      见[级数那一页](#/calculus/series/convergence?at=compare-traps)。
    ` },

    { t: 'key', id: 'rules', title: '阶的运算规则', c: String.raw`
      设 $\alpha$ 是 $k$ 阶无穷小、$\beta$ 是 $m$ 阶无穷小（$x\to0$）：

      | 运算 | 结果的阶 |
      |---|---|
      | $\alpha\cdot\beta$ | ==$k+m$== |
      | $\alpha/\beta$ | $k-m$ |
      | $\alpha\pm\beta$ | ==$\min(k,m)$==（除非首项相消） |
      | $\displaystyle\int_0^{x}\alpha\dt$ | ==$k+1$==（积分升一阶） |
      | $\alpha'$ | $k-1$（求导降一阶） |
      | $\alpha^{p}$ | $kp$ |

      **"除非首项相消"是第三行的全部风险**：
      $\tan x$ 与 $\sin x$ 都是 $1$ 阶，但 $\tan x-\sin x$ 是 ==$3$ 阶==
      （首项和二阶项都消了）。
      ==所以加减法的阶必须实际算，不能套规则==，
      见[等价无穷小的失效](#/calculus/limit/equivalent?at=when-fails)。

      **积分升阶那一条很好用**：
      $$\int_0^{x}\sin t^{2}\dt:\quad \sin t^{2}\ \text{是 }2\ \text{阶}\ \Rightarrow\ \text{积分是 }3\ \text{阶},$$
      $$\int_0^{x}\sin t^{2}\dt\ \sim\ \frac{x^{3}}{3}.$$
      ==系数是 $\frac{c}{k+1}$==（$\alpha\sim ct^{k}$ 时）。
      这条在[变限积分求极限](#/calculus/definite/variable-limit?at=ex-limit)里天天用。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'asymptote-sec', c: '一、渐近线：无穷远处的"阶"' },

    { t: 'key', id: 'asymptote', title: '三种渐近线的求法', c: String.raw`
      **铅直渐近线** $x=x_0$：
      $$\lim_{x\to x_0^{\pm}}f(x)=\infty$$
      ==候选点是"定义域的边界"==：分母零点、$\ln$ 的零点、
      定义区间的端点。==只要有一侧趋于 $\infty$ 就算==。

      **水平渐近线** $y=b$：
      $$\lim_{x\to+\infty}f(x)=b\quad\text{或}\quad\lim_{x\to-\infty}f(x)=b$$
      ==两个方向要分别求==，可能只有一侧有、也可能两侧不同。

      **斜渐近线** $y=ax+b$：
      $$\boxed{\ a=\lim_{x\to\infty}\frac{f(x)}{x},\qquad b=\lim_{x\to\infty}\bigl[f(x)-ax\bigr]\ }$$
      ==必须两个极限都存在且 $a\ne0$==。
      **顺序不能反**：先求 $a$，再用 $a$ 求 $b$。

      **两条纪律**：

      1. ==水平与斜渐近线在同一侧不能并存==
         （$a=0$ 时就是水平的）；
      2. ==$x\to+\infty$ 与 $x\to-\infty$ 要分别讨论==，
         含 $\sqrt{x^{2}}$、$e^{x}$、$\arctan x$ 时两侧结果常常不同。

      **总条数**：铅直可以有很多条，
      ==水平 + 斜最多 $2$ 条==（每个方向一条）。

      **和[有理函数的带余除法](#/threads/lines/rational?at=asymptote)对照**：
      $$\frac{P(x)}{Q(x)}=\underbrace{ax+b}_{\text{商}}+\underbrace{\frac{R(x)}{Q(x)}}_{\to0},$$
      ==商就是斜渐近线==，一步除法比两个极限快。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-order',
      title: '比较无穷小的阶',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        当 $x\to0^{+}$ 时，将下列无穷小按阶从低到高排序：
        $$\alpha=\sqrt{1+x}-\sqrt{1-x},\qquad
        \beta=\int_0^{x}\sin t^{2}\dt,\qquad
        \gamma=1-\cos\sqrt x,\qquad
        \delta=x-\ln(1+x).$$
      `,
      idea: String.raw`
        ==逐个求出首项，读出阶数==。

        **$\alpha$**：用 $(1+u)^{1/2}\approx1+\frac u2$，
        $$\sqrt{1+x}-\sqrt{1-x}\approx\left(1+\frac x2\right)-\left(1-\frac x2\right)=x,$$
        ==$1$ 阶==。

        **$\beta$**：$\sin t^{2}\sim t^{2}$ 是 $2$ 阶，
        [积分升一阶](#/calculus/limit/asymptotic?at=rules) $\Rightarrow$ ==$3$ 阶==，
        且 $\beta\sim\frac{x^{3}}{3}$。

        **$\gamma$**：$1-\cos u\sim\frac{u^{2}}{2}$，取 $u=\sqrt x$：
        $$1-\cos\sqrt x\sim\frac{(\sqrt x)^{2}}{2}=\frac x2,$$
        ==$1$ 阶==。
        ==注意 $\sqrt x$ 本身是 $\frac12$ 阶，平方之后回到 $1$ 阶==。

        **$\delta$**：$\ln(1+x)=x-\frac{x^{2}}{2}+o(x^{2})$，故
        $$x-\ln(1+x)\sim\frac{x^{2}}{2},$$
        ==$2$ 阶==。

        **排序**：$1$ 阶（$\alpha,\gamma$）$<$ $2$ 阶（$\delta$）$<$ $3$ 阶（$\beta$）。
        ==阶越低，趋于零越慢==，所以"从低到高"就是"从慢到快"。
      `,
      solution: String.raw`
        **$\alpha$**：由 $(1\pm x)^{1/2}=1\pm\dfrac x2+o(x)$，
        $$\alpha=\left(1+\frac x2\right)-\left(1-\frac x2\right)+o(x)=x+o(x),$$
        故 $\alpha\sim x$，是 ==$1$ 阶==无穷小。

        **$\beta$**：由 $\sin t^{2}\sim t^{2}$（$t\to0$），
        $$\beta=\int_0^{x}\sin t^{2}\dt\ \sim\ \int_0^{x}t^{2}\dt=\frac{x^{3}}{3},$$
        是 ==$3$ 阶==无穷小。

        **$\gamma$**：由 $1-\cos u\sim\dfrac{u^{2}}{2}$，取 $u=\sqrt x\to0^{+}$，
        $$\gamma\sim\frac{(\sqrt x)^{2}}{2}=\frac x2,$$
        是 ==$1$ 阶==无穷小。

        **$\delta$**：由 $\ln(1+x)=x-\dfrac{x^{2}}{2}+o(x^{2})$，
        $$\delta=x-\ln(1+x)=\frac{x^{2}}{2}+o(x^{2}),$$
        是 ==$2$ 阶==无穷小。

        **排序（阶从低到高）**：
        $$\underbrace{\alpha,\ \gamma}_{1\ \text{阶}}\ \prec\ \underbrace{\delta}_{2\ \text{阶}}
        \ \prec\ \underbrace{\beta}_{3\ \text{阶}}.$$
        其中 $\alpha$ 与 $\gamma$ 同阶但不等价（$\alpha\sim x$，$\gamma\sim\frac x2$，
        比值为 $2\ne1$）。
      `,
      comment: String.raw`
        **数值验证**（$x=0.01$）：

        | | 值 | 预测的首项 |
        |---|---|---|
        | $\alpha$ | $1.0000\times10^{-2}$ | $x=10^{-2}$ |
        | $\gamma$ | $4.9998\times10^{-3}$ | $\frac x2=5\times10^{-3}$ |
        | $\delta$ | $4.9834\times10^{-5}$ | $\frac{x^{2}}{2}=5\times10^{-5}$ |
        | $\beta$ | $3.3333\times10^{-7}$ | $\frac{x^{3}}{3}=3.33\times10^{-7}$ |

        ==四个都吻合==，而且数值大小的排序确实是
        $\alpha>\gamma>\delta>\beta$（阶越高越小）。$\checkmark$

        **$\gamma$ 是本题的陷阱**：$\sqrt x$ 是 $\frac12$ 阶，
        ==容易误以为 $1-\cos\sqrt x$ 也是分数阶==。
        实际上 $1-\cos u\sim\frac{u^{2}}{2}$ ==把 $u$ 的阶乘以 $2$==，
        $\frac12\times2=1$，==回到整数阶==。
        **复合时阶数相乘，这条要记牢。**

        **"同阶但不等价"的区别**：
        $\alpha$ 与 $\gamma$ 都是 $1$ 阶，但 $\lim\frac\alpha\gamma=2\ne1$，
        ==所以只能写 $\alpha=O(\gamma)$，不能写 $\alpha\sim\gamma$==。
        ==等价要求比值为 $1$，同阶只要求比值为非零常数==，
        这是[定义那一节](#/calculus/limit/equivalent?at=definition)的区分。
      `,
    },

    { t: 'example',
      id: 'ex-asymptote',
      title: '求全部渐近线',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        求曲线 $y=\dfrac{x^{2}}{x-1}\,e^{1/x}$ 的所有渐近线。
      `,
      idea: String.raw`
        **先找铅直渐近线的候选**：定义域是 $x\ne0$ 且 $x\ne1$，
        ==所以候选是 $x=0$ 和 $x=1$==。

        **$x=1$**：$\frac{x^{2}}{x-1}\to\infty$，$e^{1/x}\to e$，
        ==乘积趋于 $\infty$==，是铅直渐近线。

        **$x=0$ 要分左右**（因为 $e^{1/x}$ 两侧行为不同）：
        - $x\to0^{+}$：$e^{1/x}\to+\infty$，$\frac{x^{2}}{x-1}\to0$，
          ==是 $0\cdot\infty$，要单独算==；
        - $x\to0^{-}$：$e^{1/x}\to0$，整体 $\to0$，==不是渐近线==。

        $x\to0^{+}$ 时 $\frac{x^{2}e^{1/x}}{x-1}$：
        令 $t=\frac1x\to+\infty$，$\frac{e^{t}}{t^{2}}\cdot\frac{1}{1/t-1}$，
        ==由 $e^{t}\gg t^{2}$（[增长排序](#/calculus/limit/asymptotic?at=standard-scale)）得 $\to\infty$==。
        ==所以 $x=0$ 也是铅直渐近线==（只从右侧）。

        **斜渐近线**：$a=\lim\frac yx=\lim\frac{x}{x-1}e^{1/x}=1$，
        再算 $b=\lim(y-x)$。
        ==两个方向 $\pm\infty$ 都要算==，本题结果相同。

        **算 $b$ 时的技巧**：用 $e^{1/x}=1+\frac1x+\frac{1}{2x^{2}}+o\left(\frac{1}{x^{2}}\right)$
        ==把 $y$ 展开成 $x$ 的多项式加余项==，比硬算极限清楚。
      `,
      solution: String.raw`
        定义域：$x\ne0$ 且 $x\ne1$。

        **铅直渐近线**：

        - $x\to1$：$\dfrac{x^{2}}{x-1}\to\infty$，$e^{1/x}\to e\ne0$，
          故 $y\to\infty$，==$x=1$ 是铅直渐近线==。
        - $x\to0^{+}$：令 $t=\dfrac1x\to+\infty$，则 $x^{2}=\dfrac{1}{t^{2}}$、
          $x-1=\dfrac{1-t}{t}$，故
          $$y=\frac{x^{2}e^{1/x}}{x-1}
          =\frac{\dfrac{e^{t}}{t^{2}}}{\dfrac{1-t}{t}}
          =\frac{e^{t}}{t(1-t)}\ \longrightarrow\ -\infty,$$
          （分母 $\sim-t^{2}$，而 $e^{t}$ [增长快于任何幂函数](#/calculus/limit/asymptotic?at=standard-scale)）。
          故 ==$x=0$ 是铅直渐近线==。
        - $x\to0^{-}$：$e^{1/x}\to0$ 且 $\dfrac{x^{2}}{x-1}\to0$，故 $y\to0$，==此侧无渐近线==。

        **斜渐近线**：
        $$a=\lim_{x\to\infty}\frac yx=\lim_{x\to\infty}\frac{x}{x-1}e^{1/x}=1\cdot e^{0}=1.$$

        再求 $b$。由 $e^{1/x}=1+\dfrac1x+\dfrac{1}{2x^{2}}+o\!\left(\dfrac{1}{x^{2}}\right)$ 及
        $\dfrac{x^{2}}{x-1}=x+1+\dfrac{1}{x-1}$：
        $$y=\left(x+1+\frac{1}{x-1}\right)\left(1+\frac1x+\frac{1}{2x^{2}}+o\!\left(\frac{1}{x^{2}}\right)\right)$$
        $$=x+1+1+o(1)=x+2+o(1)$$
        （展开中 $x\cdot\frac1x=1$，其余项均为 $o(1)$）。

        故
        $$b=\lim_{x\to\infty}\left(y-x\right)=2.$$

        **斜渐近线为 $y=x+2$**（$x\to+\infty$ 与 $x\to-\infty$ 相同）。

        **结论**：铅直渐近线 $x=0$、$x=1$；斜渐近线 $y=x+2$。共 $3$ 条。
      `,
      comment: String.raw`
        **数值验证**（$x=100$）：
        $$y=\frac{10000}{99}e^{0.01}=101.0101\times1.010050=102.026,$$
        而 $x+2=102$。==差 $0.026$，且随 $x$ 增大而减小== $\checkmark$
        （$x=1000$ 时 $y\approx1002.0025$，差 $0.0025$。）

        **求 $b$ 用展开而不是硬算极限**，这是本题的关键技巧：
        $$y-x=\left(x+1+\frac{1}{x-1}\right)e^{1/x}-x$$
        直接求这个极限要通分、要用洛必达；
        ==而"把两个因子各自展开再相乘"只需收集 $O(1)$ 的项==。

        **展开时的定阶**：因为要算的是常数项 $b$，
        ==只需保留到 $O(1)$==。
        $x\cdot\frac{1}{2x^{2}}=\frac{1}{2x}\to0$，可以扔；
        ==但 $x\cdot\frac1x=1$ 必须留==，这一项常被漏掉。

        **$x=0$ 处的左右不对称值得注意**：
        右侧趋于 $-\infty$（是渐近线），左侧趋于 $0$（不是）。
        ==铅直渐近线只要有一侧趋于无穷就成立==，
        所以 $x=0$ 算一条。
        ==这类"含 $e^{1/x}$ 的题必须分左右"，与[间断点分类](#/calculus/limit/continuity?at=e-one-over-x)是同一个考点。==

        **数一数总条数**：铅直 $2$ 条 $+$ 斜 $1$ 条 $=3$ 条。
        ==水平与斜在同一方向不能并存==，本题两个方向都是斜的，
        所以没有水平渐近线。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **加减的阶直接取最小**：==首项可能相消==，必须实际算。
      2. **复合的阶算错**：$1-\cos\sqrt x$ 是 ==$1$ 阶==不是 $\frac12$ 阶
         （内层的阶要乘以外层的阶）。
      3. **同阶与等价混为一谈**：==等价要求比值为 $1$==。
      4. **斜渐近线的 $a,b$ 顺序反了**：==先 $a$ 后 $b$==。
      5. **只算一个方向**：$x\to+\infty$ 与 $x\to-\infty$ ==要分别求==。
      6. **水平和斜渐近线同侧并存**：==$a=0$ 时就是水平的==，不会同时有两条。
      7. **铅直渐近线要求两侧都趋于 $\infty$**：==一侧就够==。
      8. **忘了积分升阶**：$\int_0^x\alpha$ 的阶是 $\alpha$ 的阶 $+1$。
      9. **求 $b$ 时展开的阶不够**：==$x\cdot\frac1x=1$ 这类项容易漏==。
    ` },

  ],
});
