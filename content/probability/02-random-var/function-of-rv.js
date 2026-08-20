/* ==========================================================================
   概率论 / 2 一维随机变量及其分布 / 随机变量函数的分布
   —— 已知 X 的分布，求 Y=g(X) 的分布。
      二维版本（Z=X+Y、max/min）见 multi-random-var/function-2d。
   ========================================================================== */

KM.page({
  path: 'probability/random-var/function-of-rv',
  title: '随机变量函数的分布',
  subtitle: '万能方法只有一个：**先写 $F_Y(y)=P(g(X)\\le y)$，把它翻译成关于 $X$ 的事件**，再求导',
  tags: ['小题', '大题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'three-cases', title: '先分类：$Y=g(X)$ 会是什么类型', c: String.raw`
      | $X$ 的类型 | $g$ 的样子 | $Y$ 的类型 | 用什么方法 |
      |---|---|---|---|
      | 离散 | 任意 | ==必为离散== | 列表 + [合并同值](#/probability/random-var/function-of-rv?at=discrete-case) |
      | 连续 | 严格单调且可导 | 连续 | [公式法](#/probability/random-var/function-of-rv?at=formula-method)最快 |
      | 连续 | 分段单调（如 $x^{2}$、$\abs x$、$\sin x$） | 连续 | [分布函数法](#/probability/random-var/function-of-rv?at=cdf-method)，或分支相加 |
      | 连续 | ==有平台段==（$\min,\max$、取整、截断） | ==混合型甚至离散== | 只能用分布函数法 |

      ==最后一行是最容易翻车的一类==：
      $g$ 一旦在某段上取常值，那一整段的概率就被压到一个点上，
      $Y$ 就有了原子，[不再有密度](#/probability/random-var/cdf-pdf?at=mixed)。
      **看到 $\min$、$\max$、取整、"超出就按上限算"，先警惕。**

      **拿到题的第一个动作**：==写出 $Y$ 的取值范围==。
      这一步定下了后面 $F_Y$ 分段的边界，
      也是检查答案是否合理的第一道关。
    ` },

    { t: 'key', id: 'discrete-case', title: '离散型：唯一的技术动作是「合并同值」', c: String.raw`
      $X$ 取 $x_1,x_2,\dots$，概率 $p_1,p_2,\dots$，
      则 $Y=g(X)$ 取 $g(x_1),g(x_2),\dots$，概率照搬。

      **唯一要小心的是 $g$ 不是单射的时候**：
      若 $g(x_i)=g(x_j)$，两行必须==合并，概率相加==。

      **例**：$X$ 取 $-1,0,1,2$，概率各 $\frac14$，$Y=X^{2}$。
      $$X^{2}:\ 1,\ 0,\ 1,\ 4\ \Longrightarrow\
      P(Y=0)=\frac14,\quad P(Y=1)=\frac14+\frac14=\frac12,\quad P(Y=4)=\frac14.$$
      ==$-1$ 和 $1$ 都映到 $1$，两个 $\frac14$ 合并成 $\frac12$。==

      **自检**：算完把所有概率加起来必须是 $1$。
      ==忘记合并的典型症状就是总和超过 $1$ 或者取值列表里出现重复。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'continuous', c: '一、连续型：两套方法' },

    { t: 'method', id: 'cdf-method', title: '分布函数法：万能，三步', c: String.raw`
      **这是本章唯一必须掌握的方法**，任何 $g$ 都能用，也是所有公式的来源。

      1. **写定义**：$F_Y(y)=P(Y\le y)=P\bigl(g(X)\le y\bigr)$。
      2. **解不等式**：把 $g(X)\le y$ ==解成关于 $X$ 的区间==，
         再用 $F_X$ 或 $\int f_X$ 表示出来。
         ==这一步是全部难点所在==，也是分类讨论 $y$ 的地方。
      3. **求导**：$f_Y(y)=F_Y'(y)$，并写清 $y$ 的范围。

      **第 2 步的三个要点**：

      - 解不等式时==注意 $g$ 的单调方向==：$g$ 递减时 $g(X)\le y\iff X\ge g^{-1}(y)$，
        ==不等号要翻==；
      - $g$ 非单调时，$\set{g(X)\le y}$ 可能是==好几个区间的并==，概率要相加；
      - ==$y$ 必须分段讨论==：$y$ 小于 $Y$ 的最小可能值时 $F_Y=0$，
        大于最大值时 $F_Y=1$，中间才有内容。

      **最后一定要检查**：$\int f_Y\dy=1$。
      ==这是唯一能发现"漏了一支"的自检==。
    ` },

    { t: 'key', id: 'formula-method', title: '公式法：只在严格单调时能用', c: String.raw`
      设 $y=g(x)$ 在 $X$ 的取值区间上==严格单调且可导==，反函数 $x=h(y)$，则
      $$\boxed{\ f_Y(y)=f_X\bigl(h(y)\bigr)\,\abs{h'(y)},\qquad y\in g(\text{值域})\ }$$
      在值域之外 $f_Y(y)=0$。

      **三个要点**：

      1. ==必须加绝对值==。$g$ 递减时 $h'<0$，不加绝对值会得到负密度。
      2. ==必须写清 $y$ 的范围==。范围写错是本方法最主要的失分点，
         而且它不会体现在式子里，==只能靠"$x$ 的范围经 $g$ 映过去"手工得到==。
      3. **$\abs{h'(y)}$ 是"拉伸因子"**：$g$ 把 $x$ 轴局部拉长了 $\abs{g'}$ 倍，
         概率总量不变，==所以密度要相应地压扁==。
         这与重积分换元里的雅可比行列式是同一件事。

      **最常用的特例（线性变换）**：$Y=aX+b$（$a\ne0$）时 $h(y)=\frac{y-b}{a}$，
      $$f_Y(y)=\frac{1}{\abs a}f_X\!\left(\frac{y-b}{a}\right).$$
      拿它去验证[正态的线性变换](#/probability/random-var/distributions?at=normal-standardize)，
      两行就能看出 $aX+b\sim N(a\mu+b,a^{2}\sigma^{2})$。
    ` },

    { t: 'key', id: 'non-monotone', title: '分段单调：各支相加', c: String.raw`
      若 $g$ 在 $X$ 的取值范围上分段严格单调，各段的反函数为 $h_1,h_2,\dots$，则
      $$f_Y(y)=\sum_{i}f_X\bigl(h_i(y)\bigr)\,\abs{h_i'(y)},$$
      ==求和只对那些"确实能取到 $y$"的支进行==。

      **最常考的 $Y=X^{2}$**：两支 $h_{1,2}(y)=\pm\sqrt y$，$\abs{h'}=\frac{1}{2\sqrt y}$，
      $$\boxed{\ f_Y(y)=\frac{1}{2\sqrt y}\left[f_X(\sqrt y)+f_X(-\sqrt y)\right],\qquad y>0\ }$$

      **$Y=\abs X$**：
      $$f_Y(y)=f_X(y)+f_X(-y),\qquad y>0.$$

      ==这两条可以直接背，但更该记住它们是怎么来的==：
      $\set{X^{2}\le y}=\set{-\sqrt y\le X\le\sqrt y}$，
      对 $F_X(\sqrt y)-F_X(-\sqrt y)$ 求导时，
      ==链式法则对两项各产生一个 $\frac{1}{2\sqrt y}$，第二项还带一个负号被减号吃掉==，
      于是两项同号相加。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-square',
      title: '$Y=X^{2}$：非单调的标准处理',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $X\sim U(-1,2)$，求 $Y=X^{2}$ 的概率密度 $f_Y(y)$。
      `,
      idea: String.raw`
        **先定值域**：$x\in(-1,2)$，$x^{2}$ 的取值范围是 $[0,4)$。

        **关键的观察**：$x^{2}$ 在 $(-1,2)$ 上==不是单调的==，
        而且更麻烦的是——==两支的"覆盖范围不一样长"==：

        - 负半支 $x\in(-1,0)$ 只能给出 $y\in(0,1)$；
        - 正半支 $x\in(0,2)$ 能给出 $y\in(0,4)$。

        所以 ==$y\in(0,1)$ 时有两支贡献，$y\in(1,4)$ 时只有一支==。
        **这个分界点 $y=1$ 就是全题的关键**，
        它来自 $\abs{-1}<\abs{2}$，即区间关于原点==不对称==。

        用分布函数法能自然地看出这件事：
        解 $x^{2}\le y$ 得 $-\sqrt y\le x\le\sqrt y$，
        再与 $X$ 的取值区间 $(-1,2)$ ==求交==，
        当 $\sqrt y>1$ 时左端被 $-1$ 截住，==这就是分界的来源==。
      `,
      solution: String.raw`
        $X$ 的密度 $f_X(x)=\frac13$（$-1<x<2$）。

        **用分布函数法。** 对 $0<y<4$：
        $$F_Y(y)=P(X^{2}\le y)=P(-\sqrt y\le X\le\sqrt y)
        =\int_{\max(-\sqrt y,\,-1)}^{\min(\sqrt y,\,2)}\frac13\dx.$$

        - **$0<y<1$**（此时 $\sqrt y<1$，两端都在区间内）：
          $$F_Y(y)=\frac{2\sqrt y}{3}\ \Longrightarrow\ f_Y(y)=\frac{1}{3\sqrt y}.$$
        - **$1\le y<4$**（左端被 $-1$ 截住）：
          $$F_Y(y)=\frac{\sqrt y-(-1)}{3}=\frac{\sqrt y+1}{3}
          \ \Longrightarrow\ f_Y(y)=\frac{1}{6\sqrt y}.$$
        - 其余情形 $F_Y$ 为 $0$ 或 $1$，密度为 $0$。

        故
        $$f_Y(y)=\begin{cases}\dfrac{1}{3\sqrt y},&0<y<1\\[8pt]
        \dfrac{1}{6\sqrt y},&1\le y<4\\[8pt] 0,&\text{其他}\end{cases}$$

        **归一性检验**：
        $$\int_0^1\frac{\dy}{3\sqrt y}+\int_1^4\frac{\dy}{6\sqrt y}
        =\frac23\Bigl[\sqrt y\Bigr]_0^1+\frac13\Bigl[\sqrt y\Bigr]_1^4
        =\frac23+\frac13(2-1)=1.\ \checkmark$$
      `,
      comment: String.raw`
        **这道题真正考的是"求交"这一步**，不是求导。
        用公式法直接套 $f_Y=\frac{1}{2\sqrt y}[f_X(\sqrt y)+f_X(-\sqrt y)]$ 也能做，
        但==必须记得 $f_X(-\sqrt y)$ 在 $\sqrt y>1$ 时等于 $0$==，
        这才自动产生了两段。两条路是一回事，
        ==分布函数法把"哪一支还活着"摆在明处，不容易漏==。

        **失分统计**：这类题的错误几乎全在

        1. 忘了分界点，整个 $(0,4)$ 上都用 $\frac{1}{3\sqrt y}$（积分得 $\frac43\ne1$）；
        2. 漏掉负半支，整个区间都用 $\frac{1}{6\sqrt y}$（积分得 $\frac23\ne1$）。

        ==两种错误都会被归一性检验当场抓住==，所以这一步别省。

        **对称情形要简单得多**：若 $X\sim U(-a,a)$，
        则两支自始至终都在，$f_Y(y)=\frac{1}{2a\sqrt y}$（$0<y<a^{2}$），==没有分界点==。
        ==区间是否关于原点对称，决定了要不要分段。==
      `,
    },

    { t: 'example',
      id: 'ex-normal-square',
      title: '标准正态的平方：卡方分布的诞生',
      source: '标准例题（数一必备）',
      level: 3,
      problem: String.raw`
        设 $X\sim N(0,1)$，求 $Y=X^{2}$ 的概率密度。
      `,
      idea: String.raw`
        这是[上一题](#/probability/random-var/function-of-rv?at=ex-square)的对称版：
        $X$ 的取值范围是整个 $\R$，关于原点对称，==所以没有分界点，两支自始至终都在==。

        更好的是 $f_X$ 是==偶函数==，$f_X(\sqrt y)=f_X(-\sqrt y)$，
        于是两支的贡献完全相同，直接乘 $2$。

        **值得预判的一点**：$Y\ge0$，且在 $y\to0^{+}$ 时
        $\frac{1}{\sqrt y}\to+\infty$——==密度在原点处发散==。
        这不矛盾：密度可以无界，只要积分有限。
        这也再次说明[密度不是概率](#/probability/random-var/cdf-pdf?at=pdf-not-prob)。
      `,
      solution: String.raw`
        $f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-x^{2}/2}$。对 $y>0$：
        $$F_Y(y)=P(X^{2}\le y)=P(-\sqrt y\le X\le\sqrt y)=2\Phi(\sqrt y)-1,$$
        用到了标准正态的[对称性](#/probability/random-var/distributions?at=normal-standardize)。

        求导（链式法则，$\frac{\d}{\dy}\sqrt y=\frac{1}{2\sqrt y}$）：
        $$f_Y(y)=2\varphi(\sqrt y)\cdot\frac{1}{2\sqrt y}
        =\frac{1}{\sqrt{2\pi}}e^{-y/2}\cdot\frac{1}{\sqrt y},$$

        即
        $$\boxed{\ f_Y(y)=\begin{cases}\dfrac{1}{\sqrt{2\pi y}}\,e^{-y/2},&y>0\\[6pt]
        0,&y\le0\end{cases}\ }$$

        这就是自由度为 $1$ 的**卡方分布** $\chi^{2}(1)$。
      `,
      comment: String.raw`
        **为什么值得单独记住这道题**：

        1. 它是数理统计里[三大抽样分布](#/probability/random-var/distributions?at=relations)的起点——
           $\chi^{2}(n)$ 就是 $n$ 个独立的 $N(0,1)$ 的平方和；
        2. 它给出 $\E Y=\E X^{2}=\Var X+(\E X)^{2}=1$ 的一个几何解释：
           ==卡方分布的期望等于自由度==；
        3. 归一性 $\int_0^{\infty}\frac{e^{-y/2}}{\sqrt{2\pi y}}\dy=1$
           等价于[高斯积分](#/calculus/multi-integral/separable?at=gauss-family)
           $\int_0^{\infty}e^{-t^{2}/2}\dt=\sqrt{\frac\pi2}$（令 $y=t^{2}$），
           ==也等价于 $\Gamma(\frac12)=\sqrt\pi$==。

        **一个常见的追问**：求 $\E Y$ 和 $\Var Y$。
        ==不要去积那个密度==，直接用
        $\E X^{2}=1$、$\E X^{4}=3$（标准正态的四阶矩），
        得 $\E Y=1$，$\Var Y=\E X^{4}-(\E X^{2})^{2}=3-1=2$。
        这是[无意识统计学家法则](#/probability/moments/expectation?at=lotus)的典型用法：
        ==求 $g(X)$ 的期望不需要先求 $g(X)$ 的分布。==
      `,
    },

    { t: 'example',
      id: 'ex-uniform-to-exp',
      title: '概率积分变换：任何分布都能由 $U(0,1)$ 造出来',
      source: '经典结论',
      level: 4,
      problem: String.raw`
        1. 设 $X$ 为连续型随机变量，分布函数 $F$ 严格单调增，证明 $Y=F(X)\sim U(0,1)$；
        2. 设 $U\sim U(0,1)$，$\lambda>0$，求 $Z=-\dfrac{\ln(1-U)}{\lambda}$ 的分布。
      `,
      idea: String.raw`
        **第 1 问的思路**：要证 $Y\sim U(0,1)$，就去算 $F_Y(y)=P(F(X)\le y)$。
        由于 $F$ 严格增，它有反函数，==不等式可以直接"两边作用 $F^{-1}$"==：
        $$F(X)\le y\iff X\le F^{-1}(y).$$
        代回去就得到 $P(X\le F^{-1}(y))=F(F^{-1}(y))=y$。
        ==$F$ 和 $F^{-1}$ 自己抵消掉，这就是全部的魔术。==

        **为什么这个结论重要**：它说明==任何连续型分布，"用自己的分布函数一作用"就被拉平成均匀分布==。
        分布函数把概率质量按"累积到多少"重新编号，
        而"累积量"这个刻度天然是均匀的。

        **第 2 问是第 1 问的逆用**：给的式子解出来正好是 $U=1-e^{-\lambda Z}$，
        ==这是指数分布的分布函数==。所以答案应当是 $E(\lambda)$。
        直接按分布函数法验证即可。
      `,
      solution: String.raw`
        **(1)** $Y=F(X)$ 的取值范围是 $(0,1)$。对 $0<y<1$，由 $F$ 严格增，
        $$F_Y(y)=P\bigl(F(X)\le y\bigr)=P\bigl(X\le F^{-1}(y)\bigr)
        =F\bigl(F^{-1}(y)\bigr)=y.$$
        又 $y\le0$ 时 $F_Y=0$，$y\ge1$ 时 $F_Y=1$。
        这正是 $U(0,1)$ 的分布函数，故 $Y\sim U(0,1)$。

        **(2)** $U\in(0,1)\Rightarrow 1-U\in(0,1)\Rightarrow\ln(1-U)<0\Rightarrow Z>0$。
        对 $z>0$：
        $$F_Z(z)=P\!\left(-\frac{\ln(1-U)}{\lambda}\le z\right)
        =P\bigl(\ln(1-U)\ge-\lambda z\bigr)$$
        $$=P\bigl(1-U\ge e^{-\lambda z}\bigr)
        =P\bigl(U\le1-e^{-\lambda z}\bigr)=1-e^{-\lambda z},$$
        最后一步用了 $U\sim U(0,1)$ 的分布函数 $F_U(u)=u$（$0<u<1$）。

        对 $z\le0$ 有 $F_Z(z)=0$。故 ==$Z\sim E(\lambda)$==。

        （注意第二行两处==不等号翻向==：一次来自乘 $-\lambda<0$，一次来自 $\ln$ 递增后取反。）
      `,
      comment: String.raw`
        **这一对结论合起来叫「概率积分变换」**：
        $$X\ \xrightarrow{\ F\ }\ U(0,1)\ \xrightarrow{\ F^{-1}\ }\ X$$
        ==它是计算机生成随机数的理论基础==：
        计算机只会生成 $U(0,1)$，
        想要服从任何分布 $F$ 的样本，就取 $F^{-1}(U)$。
        第 2 问就是"如何生成指数分布随机数"的标准算法。

        **考研里它以两种面孔出现**：

        1. 直接考第 1 问（证明题）；
        2. 给一个复杂的 $Z=g(U)$，问 $Z$ 服从什么分布——
           ==解题时把 $g$ 反解成 $U=(\cdots)$，认出这个式子是哪个分布的 $F$==。

        **第 2 问的技术要点**是不等式变形时的翻向。
        建议养成习惯：==每翻一次就在草稿上标一下==，
        这道题连翻两次，漏掉一次答案就完全错了。

        **顺带**：$-\ln(1-U)$ 与 $-\ln U$ 同分布（因为 $1-U$ 也服从 $U(0,1)$），
        所以实际编程时常写成更简单的 $-\frac{\ln U}{\lambda}$。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **把 $f_X$ 里的 $x$ 直接换成 $h(y)$ 就完事**：==漏了 $\abs{h'(y)}$==。
         密度不是"代进去"，是"代进去再乘拉伸因子"。
      2. **忘记绝对值**：$g$ 递减时会算出负密度。
      3. **不写 $y$ 的范围**：==这是本节最主要的失分点==，
         而且式子本身看不出来，必须由 $x$ 的范围手工映过去。
      4. **非单调时只算一支**：$X^{2}$、$\abs X$ 要==两支相加==，
         而且要判断每支在哪些 $y$ 上有效（见[上面那道 $U(-1,2)$](#/probability/random-var/function-of-rv?at=ex-square)）。
      5. **不等式变形不翻号**：乘负数、取倒数、$g$ 递减，都要翻。
      6. **离散型忘记合并同值**：$g$ 非单射时两行要合并，概率相加。
      7. **对有平台的 $g$ 硬求密度**：$\min,\max$、取整会产生[混合型](#/probability/random-var/cdf-pdf?at=mixed)，
         ==它没有密度==。
      8. **算完不验归一性**：$\int f_Y\dy=1$ 是发现漏支、漏段的最快方法。
      9. **求 $\E g(X)$ 时先求 $g(X)$ 的分布**：多此一举，
         用[无意识统计学家法则](#/probability/moments/expectation?at=lotus)一步到位。
    ` },

  ],
});
