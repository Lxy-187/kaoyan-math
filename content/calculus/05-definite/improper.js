/* ==========================================================================
   高等数学 / 5 定积分与反常积分 / 反常积分及其敛散性
   —— 两类反常 + p 积分两把尺子 + 比较判别法。
      与级数判敛的对照见 series/convergence。
   ========================================================================== */

KM.page({
  path: 'calculus/definite/improper',
  title: '反常积分及其敛散性',
  subtitle: '定积分要求"有限区间 + 有界函数"。破坏哪一条，就得改用极限来定义——**先判敛散，再谈计算**',
  tags: ['小题', '概念辨析', '高频', '易错'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'two-types', title: '两类反常：区间无穷 vs 函数无界', c: String.raw`
      | 类型 | 破坏了什么 | 例 |
      |---|---|---|
      | **第一类**（无穷区间） | 区间无限长 | $\displaystyle\int_1^{+\infty}\frac{\dx}{x^{2}}$ |
      | **第二类**（无界函数/瑕积分） | 被积函数无界 | $\displaystyle\int_0^{1}\frac{\dx}{\sqrt x}$ |

      ==第二类的危险在于它"看起来很正常"==：
      $\int_0^1\frac{\dx}{\sqrt x}$ 的区间是有限的，
      ==只有注意到 $x\to0^{+}$ 时被积函数趋于无穷，才知道它是反常积分==。

      $$\boxed{\ \text{拿到积分先扫两件事：区间有没有 }\infty\text{？被积函数在区间内有没有爆点？}\ }$$

      **瑕点可能在区间内部**，这最容易漏：
      $$\int_{-1}^{1}\frac{\dx}{x^{2}}\qquad\text{瑕点在 }x=0\ \text{（区间中间！）}$$
      ==直接套牛顿–莱布尼茨会得到 $-2$，而被积函数恒正，明显荒谬==。
      正确做法是从瑕点处==拆成两个==分别判敛：两段都发散，故原积分发散。

      **这是[定积分那一页](#/calculus/definite/properties?at=pitfall-list)第 4 条陷阱的正解。**
    ` },

    { t: 'key', id: 'definition', title: '定义：一律用极限', c: String.raw`
      **第一类**：
      $$\int_a^{+\infty}f\dx:=\lim_{b\to+\infty}\int_a^{b}f\dx$$
      极限存在（有限）则称==收敛==，否则==发散==。

      **第二类**（设 $b$ 为瑕点）：
      $$\int_a^{b}f\dx:=\lim_{\varepsilon\to0^{+}}\int_a^{b-\varepsilon}f\dx$$

      **两端都反常时必须拆开，且两段独立收敛才算收敛**：
      $$\int_{-\infty}^{+\infty}f\dx=\int_{-\infty}^{c}f\dx+\int_c^{+\infty}f\dx$$
      ==不能写成 $\lim_{A\to+\infty}\int_{-A}^{A}f$==！

      **反例**：$\int_{-\infty}^{+\infty}x\dx$。
      对称取极限得 $\lim_{A\to\infty}\int_{-A}^{A}x\dx=0$，
      ==但按定义它是发散的==（$\int_0^{+\infty}x\dx=+\infty$）。
      ==那个对称的极限叫"主值"，不等于收敛==。

      **计算时的写法**：收敛的反常积分可以用牛顿–莱布尼茨，
      但要写成极限形式：
      $$\int_1^{+\infty}\frac{\dx}{x^{2}}=\left.-\frac1x\right|_1^{+\infty}
      =\lim_{b\to+\infty}\left(-\frac1b\right)-(-1)=1.$$
    ` },

    { t: 'key', id: 'p-integral', title: '★ 两把标尺：$p$ 积分', c: String.raw`
      **无穷区间的 $p$ 积分**：
      $$\int_1^{+\infty}\frac{\dx}{x^{p}}\quad
      \begin{cases}\text{收敛},&p>1\\ \text{发散},&p\le1\end{cases}$$

      **瑕积分的 $p$ 积分**：
      $$\int_0^{1}\frac{\dx}{x^{p}}\quad
      \begin{cases}\text{收敛},&p<1\\ \text{发散},&p\ge1\end{cases}$$

      $$\boxed{\ \text{无穷远处要"衰减得快"（}p>1\text{）；瑕点处要"发散得慢"（}p<1\text{）}\ }$$

      ==两个条件的方向相反，这是本节最容易记混的地方==。
      **记忆办法**：$p=1$ 两边都发散（$\int\frac{\dx}{x}=\ln x$ 两头都爆），
      ==以 $p=1$ 为界，"离 $1$ 远的那一侧收敛"==——
      无穷区间要 $p$ 大，瑕点要 $p$ 小。

      **一般形式**（瑕点在 $a$）：
      $$\int_a^{b}\frac{\dx}{(x-a)^{p}}\quad\text{收敛}\iff p<1.$$

      **和[级数的 $p$ 判据](#/calculus/series/convergence?at=rulers)对照**：
      $\sum\frac{1}{n^{p}}$ 收敛 $\iff p>1$，
      ==与无穷区间的 $p$ 积分完全一致==——
      这正是[积分判别法](#/calculus/series/convergence?at=cauchy-integral)的内容。
      ==但要注意级数没有"瑕点"那一侧的对应物==。
    ` },

    { t: 'method', id: 'judge', title: '判敛三步', c: String.raw`
      1. **找出所有反常点**（$\pm\infty$ 与瑕点），==瑕点要检查区间内部==；
      2. **在每个反常点附近拆开**，一个积分只留一个反常点；
      3. **对每一段用比较判别法**，与 $p$ 积分比。

      ==只要有一段发散，整个积分发散==；所有段都收敛才收敛。

      **比较判别法（极限形式，最常用）**：
      在反常点附近，若
      $$f(x)\ \sim\ \frac{C}{x^{p}}\quad(x\to+\infty)
      \qquad\text{或}\qquad
      f(x)\ \sim\ \frac{C}{(x-a)^{p}}\quad(x\to a)$$
      则该段积分与对应的 $p$ 积分==同敛散==。

      **实操就是"数阶数"**：

      | 反常点 | 看什么 | 判据 |
      |---|---|---|
      | $x\to+\infty$ | $f$ 衰减的阶 $p$ | ==$p>1$ 收敛== |
      | $x\to a$（瑕点） | $f$ 爆的阶 $p$ | ==$p<1$ 收敛== |

      **例**：$\displaystyle\int_0^{+\infty}\frac{\dx}{\sqrt x(1+x)}$。
      两个反常点：$x=0$（瑕点）与 $+\infty$。

      - $x\to0^{+}$：$f\sim\frac{1}{\sqrt x}=x^{-1/2}$，$p=\frac12<1$，==收敛==；
      - $x\to+\infty$：$f\sim\frac{1}{\sqrt x\cdot x}=x^{-3/2}$，$p=\frac32>1$，==收敛==。

      两段都收敛，故原积分==收敛==。
      ==注意同一个函数在两端的阶不同，必须分开数。==
    ` },

    { t: 'key', id: 'abs-convergence', title: '绝对收敛与条件收敛', c: String.raw`
      $$\int\abs f\ \text{收敛}\ \Longrightarrow\ \int f\ \text{收敛}$$
      称前者为==绝对收敛==；收敛但不绝对收敛的称==条件收敛==。

      **比较判别法只对非负函数有效**，所以变号的被积函数
      ==要先取绝对值判绝对收敛==；
      若绝对值发散，再单独讨论条件收敛（通常要用分部积分或狄利克雷判别法）。

      **经典例子**：$\displaystyle\int_1^{+\infty}\frac{\sin x}{x}\dx$ ==条件收敛==。

      - 收敛：分部积分 $\int_1^{b}\frac{\sin x}{x}\dx
        =\left[\frac{-\cos x}{x}\right]_1^{b}-\int_1^{b}\frac{\cos x}{x^{2}}\dx$，
        ==右端两项当 $b\to\infty$ 时都有极限==（后者绝对收敛，$p=2>1$）；
      - 不绝对收敛：$\int_1^{+\infty}\frac{\abs{\sin x}}{x}\dx$ 发散
        （在每个周期上 $\int\abs{\sin x}$ 有正的下界，
        与 $\sum\frac1n$ 同阶）。

      ==这与[交错级数](#/calculus/series/general-series?at=three-way)的三分法完全平行==：
      绝对收敛 / 条件收敛 / 发散。

      **一个重要的不对称**（[级数那一页](#/calculus/series/convergence?at=discrete-continuous)讲过）：
      $$\sum a_n\ \text{收敛}\Rightarrow a_n\to0,\qquad
      \int_1^{+\infty}f\ \text{收敛}\ \not\Rightarrow\ f(x)\to0.$$
      ==反常积分收敛推不出被积函数趋于零==，
      反例是"越来越窄的尖峰"。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-judge',
      title: '判敛散：数阶数',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        讨论下列反常积分的敛散性：
        $$\text{(1)}\ \int_0^{1}\frac{\dx}{\sqrt[3]{x}\,\ln(1+x)}\qquad
        \text{(2)}\ \int_1^{+\infty}\frac{\arctan x}{x^{2}}\dx$$
        $$\text{(3)}\ \int_0^{+\infty}\frac{x^{\alpha}}{1+x^{2}}\dx\quad(\alpha>0)$$
      `,
      idea: String.raw`
        ==三题都用"[数阶数](#/calculus/definite/improper?at=judge)"==，
        关键是先找准反常点，再用等价无穷小算阶。

        **(1)** 反常点在 $x=0$（$\ln(1+x)\to0$ 使分母趋零）。
        $x\to0^{+}$ 时 $\ln(1+x)\sim x$，故
        $$f\sim\frac{1}{x^{1/3}\cdot x}=x^{-4/3},$$
        ==$p=\frac43>1$，瑕积分发散==。

        **(2)** 反常点在 $+\infty$。$\arctan x\to\frac\pi2$（有界），故
        $$f\sim\frac{\pi/2}{x^{2}},$$
        ==$p=2>1$，收敛==。
        注意 $x=1$ 处一切正常，==不是反常点==。

        **(3) 有两个反常点**，必须分开数：

        - $x\to0^{+}$：$f\sim x^{\alpha}$，==这是 $x^{-(-\alpha)}$，即 $p=-\alpha<0<1$==，
          恒收敛（$\alpha>0$ 时被积函数在 $0$ 附近有界，==其实根本不反常==）；
        - $x\to+\infty$：$f\sim x^{\alpha-2}=x^{-(2-\alpha)}$，$p=2-\alpha$，
          ==要 $2-\alpha>1$ 即 $\alpha<1$==。

        ==所以答案取决于 $\alpha$ 与 $1$ 的关系。==
      `,
      solution: String.raw`
        **(1)** 反常点为 $x=0$（$x\to0^{+}$ 时被积函数无界）。
        由 $\ln(1+x)\sim x$（$x\to0$），
        $$\frac{1}{\sqrt[3]x\,\ln(1+x)}\ \sim\ \frac{1}{x^{1/3}\cdot x}=\frac{1}{x^{4/3}}.$$
        取 $p=\dfrac43\ge1$，由瑕积分的 $p$ 判据，==积分发散==。

        **(2)** 反常点为 $+\infty$。由 $0<\arctan x<\dfrac\pi2$，
        $$0<\frac{\arctan x}{x^{2}}<\frac{\pi}{2x^{2}},$$
        而 $\displaystyle\int_1^{+\infty}\frac{\dx}{x^{2}}$ 收敛（$p=2>1$），
        由比较判别法，==积分收敛==。

        **(3)** 被积函数在 $[0,+\infty)$ 上连续非负（$\alpha>0$ 时 $x=0$ 处取值 $0$，不是瑕点），
        故只有 $+\infty$ 一个反常点。

        当 $x\to+\infty$ 时
        $$\frac{x^{\alpha}}{1+x^{2}}\ \sim\ \frac{1}{x^{2-\alpha}},$$
        由无穷区间的 $p$ 判据，收敛当且仅当 $2-\alpha>1$，即
        $$\boxed{0<\alpha<1\ \text{时收敛},\qquad \alpha\ge1\ \text{时发散}.}$$
      `,
      comment: String.raw`
        **(1) 的教训**：==瑕点常常藏在"分母趋于零"里==，
        而 $\ln(1+x)$ 在 $x=0$ 处正好为零。
        ==拿到题先把分母的零点找出来==，它们都是瑕点候选。

        **(3) 的完整讨论要考虑 $\alpha\le0$**（本题限定 $\alpha>0$ 所以不必）：
        若 $\alpha\le0$，$x=0$ 处会变成瑕点，
        阶是 $-\alpha$，要求 $-\alpha<1$ 即 $\alpha>-1$。
        ==完整结论是 $-1<\alpha<1$ 时收敛==。
        **两个反常点各给一个条件，取交集——这是含参数判敛题的标准结构。**

        **这道题和[级数](#/calculus/series/convergence?at=limit-compare)的做法一模一样**：
        都是"抓主部、读 $p$、查判据"。
        ==唯一的区别是判据方向：级数只有 $p>1$ 一种，
        反常积分在瑕点处是 $p<1$。==

        **一个常见的错误**：把 (3) 在 $x\to+\infty$ 的阶数算成 $\alpha$ 而不是 $2-\alpha$。
        ==$\frac{x^{\alpha}}{x^{2}}=x^{\alpha-2}$，而 $p$ 是"分母的次数"，故 $p=2-\alpha$==。
        写成 $\frac{1}{x^{2-\alpha}}$ 的形式再读 $p$ 就不会错。
      `,
    },

    { t: 'example',
      id: 'ex-inner-flaw',
      title: '★ 瑕点在区间内部：最经典的陷阱',
      source: '经典例题（概念辨析）',
      level: 3,
      problem: String.raw`
        判断下列计算是否正确，并给出正确结论：
        $$\int_{-1}^{1}\frac{\dx}{x^{2}}
        =\left[-\frac1x\right]_{-1}^{1}=(-1)-(1)=-2.$$
      `,
      idea: String.raw`
        **一眼就该看出荒谬**：被积函数 $\frac{1}{x^{2}}>0$，
        ==积分怎么可能是负数==？
        **算出与保号性矛盾的结果，一定是哪一步不合法。**

        **问题出在哪**：牛顿–莱布尼茨公式要求
        ==$f$ 在闭区间 $[a,b]$ 上连续（至少要有原函数）==。
        而 $\frac{1}{x^{2}}$ 在 $x=0$ 处==无定义且无界==，
        $-\frac1x$ 在 $[-1,1]$ 上==根本不是它的原函数==（在 $0$ 处断开了）。

        **正确做法**：这是[第二类反常积分](#/calculus/definite/improper?at=two-types)，
        瑕点 $x=0$ 在区间==内部==，
        必须从瑕点拆成两段，==两段都收敛才算收敛==。
      `,
      solution: String.raw`
        **该计算错误。** 被积函数 $\dfrac{1}{x^{2}}$ 在 $x=0$ 处无界，
        故 $x=0$ 是瑕点，$\displaystyle\int_{-1}^{1}\frac{\dx}{x^{2}}$ 是反常积分，
        ==不能直接使用牛顿–莱布尼茨公式==。

        按定义从瑕点拆开：
        $$\int_{-1}^{1}\frac{\dx}{x^{2}}=\int_{-1}^{0}\frac{\dx}{x^{2}}+\int_{0}^{1}\frac{\dx}{x^{2}}.$$

        考察右边第二段：
        $$\int_0^{1}\frac{\dx}{x^{2}}=\lim_{\varepsilon\to0^{+}}\int_{\varepsilon}^{1}\frac{\dx}{x^{2}}
        =\lim_{\varepsilon\to0^{+}}\left(\frac{1}{\varepsilon}-1\right)=+\infty,$$
        ==发散==。（这也与 $p$ 判据一致：$p=2\ge1$，瑕积分发散。）

        由于有一段发散，故
        $$\int_{-1}^{1}\frac{\dx}{x^{2}}\ \text{发散}.$$
      `,
      comment: String.raw`
        **这道题的价值在于那个自检**：
        $$\boxed{\ \text{非负函数的积分算出负数}\ \Rightarrow\ \text{必有一步不合法}\ }$$
        ==同样地，算出的概率大于 $1$、算出的面积为负，都属于这一类==。
        **养成"结果的符号/量级是否合理"的检查习惯，能挡住很多错误。**

        **同型陷阱清单**（都是瑕点在内部）：

        | 积分 | 瑕点 | 结论 |
        |---|---|---|
        | $\int_{-1}^{1}\frac{\dx}{x}$ | $x=0$ | ==发散==（虽然"看起来"对称抵消） |
        | $\int_0^{2}\frac{\dx}{x-1}$ | $x=1$ | 发散 |
        | $\int_{-1}^{1}\frac{\dx}{\sqrt[3]{x^{2}}}$ | $x=0$ | ==收敛==（$p=\frac23<1$） |
        | $\int_0^{\pi}\tan x\dx$ | $x=\frac\pi2$ | 发散 |

        ==第三行说明"瑕点在内部"不等于"一定发散"==，
        阶数够小照样收敛，==所以必须真的判一次==。

        **第一行值得特别注意**：$\int_{-1}^{1}\frac{\dx}{x}$ 的
        "主值"是 $0$（对称抵消），==但按定义它发散==。
        这与[级数的重排](#/calculus/series/beyond?at=riemann-two-conditions)是同一类现象：
        ==条件收敛/发散的对象，"怎么取极限"会影响结果，所以定义必须规定死==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **没认出是反常积分**：==瑕点可能在区间内部==，
         拿到题先找分母零点、$\ln$ 的零点、$\tan$ 的爆点。
      2. **对反常积分直接用牛顿–莱布尼茨**：==必须先拆开判敛==。
      3. **两把 $p$ 尺子记反**：==无穷区间 $p>1$ 收敛，瑕点 $p<1$ 收敛==。
      4. **$\int_{-\infty}^{+\infty}$ 用对称极限**：==必须拆成两段各自收敛==，
         对称极限只是"主值"。
      5. **只判了一个反常点**：两端都反常时==两段都要判==。
      6. **对变号函数直接用比较判别法**：==比较法要求非负==，
         先取绝对值判绝对收敛。
      7. **认为收敛就有 $f(x)\to0$**：==反常积分没有这条==
         （级数才有）。
      8. **数阶数时把 $p$ 读错**：写成 $\frac{1}{x^{p}}$ 的形式再读，
         ==$p$ 是分母的次数==。
      9. **忘了 $p=1$ 两边都发散**：$\int_1^{+\infty}\frac{\dx}{x}$ 与
         $\int_0^1\frac{\dx}{x}$ ==都发散==。
    ` },

  ],
});
