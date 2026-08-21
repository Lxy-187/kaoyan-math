/* ==========================================================================
   高等数学 / 5 定积分与反常积分 / 定积分的性质与计算
   —— 定积分 = 一个数。奇偶周期、换元换限、点火公式。
      变限积分见 definite/variable-limit；反常积分见 definite/improper。
   ========================================================================== */

KM.page({
  path: 'calculus/definite/properties',
  title: '定积分的性质与计算',
  subtitle: '定积分是**一个数**，不定积分是**一族函数**。多出来的那个区间，带来了对称性、周期性这些不定积分没有的武器',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'definition', title: '定义与两条约定', c: String.raw`
      $$\int_a^b f(x)\dx=\lim_{\lambda\to0}\sum_{i=1}^{n}f(\xi_i)\Delta x_i$$
      ==是一个数，与积分变量的字母无关==：
      $$\int_a^b f(x)\dx=\int_a^b f(t)\dt.$$
      **这条在[变限积分](#/calculus/definite/variable-limit?at=core)里至关重要**——
      上限的 $x$ 和被积变量的 $x$ ==必须用不同字母==。

      **两条约定**：
      $$\int_a^a f\dx=0,\qquad \int_b^a f\dx=-\int_a^b f\dx.$$
      有了它们，==可加性 $\int_a^b=\int_a^c+\int_c^b$ 对 $c$ 在区间外也成立==。

      **牛顿–莱布尼茨公式**（把定积分和不定积分连起来）：
      $$\boxed{\ \int_a^b f(x)\dx=F(b)-F(a),\qquad F'=f\ }$$
      **前提是 $f$ 在 $[a,b]$ 上==连续==（或至少可积且有原函数）。**
      ==$f$ 在区间内有无穷间断点时不能直接用==，
      那是[反常积分](#/calculus/definite/improper?at=two-types)的事——
      **这是本章最隐蔽的陷阱**。

      **可积的两个充分条件**（了解）：
      连续 $\Rightarrow$ 可积；有界且只有有限个间断点 $\Rightarrow$ 可积。
    ` },

    { t: 'key', id: 'props', title: '基本性质', c: String.raw`
      **线性**：$\displaystyle\int_a^b(\alpha f+\beta g)=\alpha\int_a^b f+\beta\int_a^b g$。

      **可加性**：$\displaystyle\int_a^b=\int_a^c+\int_c^b$（==$c$ 可以在区间外==）。

      **保号性**：$f\ge0$ 在 $[a,b]$ 上 $\Rightarrow\displaystyle\int_a^b f\ge0$（$a<b$）。

      **保序性**：$f\le g\Rightarrow\displaystyle\int_a^b f\le\int_a^b g$。

      **绝对值不等式**：
      $$\abs{\int_a^b f\dx}\le\int_a^b\abs f\dx\qquad(a<b)$$
      ==这条和[次可加性](#/threads/patterns/subadditive?at=catalogue-table)是同一族==：
      "先合并再取绝对值" $\le$ "先取绝对值再合并"。

      **估值定理**：$m\le f\le M$ 时
      $$m(b-a)\le\int_a^b f\dx\le M(b-a).$$

      **积分中值定理**：$f$ 在 $[a,b]$ 连续 $\Rightarrow\exists\xi\in[a,b]$ 使
      $$\int_a^b f(x)\dx=f(\xi)(b-a).$$
      ==$f(\xi)=\frac{1}{b-a}\int_a^b f$ 就是 $f$ 在区间上的"平均值"==。
      注意结论里的 $\xi$ ==一般只能保证在闭区间上==；
      要开区间 $(a,b)$ 需用[更强的形式](#/calculus/derivative-app/proof-overview?at=second-imvt)。

      **保号性的严格版（常考）**：$f$ 连续、$f\ge0$ 且 $f\not\equiv0$
      $\Rightarrow\int_a^b f>0$（==严格大于==）。
      ==反过来：$f$ 连续非负且 $\int_a^b f=0\Rightarrow f\equiv0$==，
      这是积分证明题的常用工具。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'symmetry-sec', c: '一、对称性：定积分独有的武器' },

    { t: 'key', id: 'symmetry', title: '★ 奇偶性与周期性', c: String.raw`
      **对称区间上的奇偶性**：
      $$\int_{-a}^{a}f(x)\dx=\begin{cases}
      0,&f\ \text{为**奇**函数}\\[2pt]
      2\displaystyle\int_0^{a}f(x)\dx,&f\ \text{为**偶**函数}
      \end{cases}$$
      ==看到 $\int_{-a}^{a}$ 先查奇偶==，这一步常常直接把题做完。

      **拆奇偶**：一般的 $f$ 可以拆成
      $$f(x)=\underbrace{\frac{f(x)+f(-x)}{2}}_{\text{偶}}
      +\underbrace{\frac{f(x)-f(-x)}{2}}_{\text{奇}},$$
      ==奇的部分积掉，只剩偶的部分==。
      典型应用：$\int_{-1}^{1}\frac{x^{2}\sin x+x^{2}}{1+x^{2}}\dx$
      中 $\frac{x^{2}\sin x}{1+x^{2}}$ 是奇函数，直接扔掉。

      **周期性**：$f$ 以 $T$ 为周期时
      $$\int_a^{a+T}f\dx=\int_0^{T}f\dx\qquad(\text{==与 }a\text{ 无关==}),$$
      $$\int_0^{nT}f\dx=n\int_0^{T}f\dx.$$
      ==积分区间可以任意平移一个周期==，用来把奇怪的区间挪到好算的位置。

      更多对称性的用法见[奇偶性与对称性](#/calculus/limit/parity?at=symmetric-integral)。
    ` },

    { t: 'key', id: 'substitution-limits', title: '换元必换限：定积分比不定积分省事的地方', c: String.raw`
      $$\int_a^b f(x)\dx\ \xlongequal{x=\varphi(t)}\ \int_{\alpha}^{\beta}f\bigl(\varphi(t)\bigr)\varphi'(t)\dt,
      \qquad \varphi(\alpha)=a,\ \varphi(\beta)=b$$

      $$\boxed{\ \text{换元必换限，换限不换回}\ }$$

      ==这是定积分比[不定积分](#/calculus/indefinite/substitution?at=trig-steps)省事的地方==：
      不定积分做完三角代换还要画三角形换回 $x$，
      ==定积分只要把上下限一并换掉，算完就是答案==。

      **两个必须注意的点**：

      1. ==$\varphi$ 要单调==（保证一一对应），且值域覆盖 $[a,b]$；
      2. ==上下限要对应换==：$x=a$ 对应 $t=\alpha$，别写反。
         若 $\varphi$ 递减，会出现 $\alpha>\beta$，==这是正常的==，不要擅自调换。

      **几个高频的"对称换元"**（用来造出关于自身的方程）：

      | 换元 | 效果 |
      |---|---|
      | $x\to a+b-x$（区间 $[a,b]$） | ==区间不变，$f$ 变形== |
      | $x\to-x$（区间 $[-a,a]$） | 判奇偶 |
      | $x\to\frac\pi2-x$（区间 $[0,\frac\pi2]$） | ==$\sin\leftrightarrow\cos$ 互换== |

      **第三条的经典结论**：
      $$\int_0^{\pi/2}\frac{\sin^{n}x}{\sin^{n}x+\cos^{n}x}\dx=\frac\pi4$$
      令 $I$ 为原式，作 $x\to\frac\pi2-x$ 得 $I=\int_0^{\pi/2}\frac{\cos^{n}x}{\cos^{n}x+\sin^{n}x}\dx$，
      ==两式相加得 $2I=\int_0^{\pi/2}\dx=\frac\pi2$==。
      **"换元后与原式相加"是这类题的固定套路。**
    ` },

    { t: 'key', id: 'wallis', title: '点火公式（华里士公式）', c: String.raw`
      $$\int_0^{\pi/2}\sin^{n}x\dx=\int_0^{\pi/2}\cos^{n}x\dx=
      \begin{cases}
      \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac12\cdot\dfrac\pi2,&n\ \text{为**偶**数}\\[8pt]
      \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac23\cdot1,&n\ \text{为**奇**数}
      \end{cases}$$

      **记法**：==从 $\frac{n-1}{n}$ 开始，分子分母各减 $2$ 往下乘==；
      $n$ 是偶数就"点火"（乘 $\frac\pi2$），奇数就不点（乘 $1$）。
      =="偶数才点火"是这个名字的来历。==

      **例**：
      $$\int_0^{\pi/2}\sin^{4}x\dx=\frac34\cdot\frac12\cdot\frac\pi2=\frac{3\pi}{16},$$
      $$\int_0^{\pi/2}\sin^{5}x\dx=\frac45\cdot\frac23=\frac{8}{15}.$$

      **适用范围要看清**：公式是对 ==$[0,\frac\pi2]$== 说的。
      其他区间要先用对称性化过去：
      $$\int_0^{\pi}\sin^{n}x\dx=2\int_0^{\pi/2}\sin^{n}x\dx,$$
      $$\int_0^{2\pi}\sin^{n}x\dx=\begin{cases}
      4\int_0^{\pi/2}\sin^{n}x\dx,&n\ \text{偶}\\
      0,&n\ \text{奇}\end{cases}$$
      ==$n$ 为奇数时 $\sin^n$ 在 $[0,2\pi]$ 上正负抵消==，要小心。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-symmetry',
      title: '对称性优先：先扔掉奇函数部分',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\int_{-1}^{1}\frac{x^{2}+x\cos x+\sqrt{1-x^{2}}}{1+x^{2}}\dx$。
      `,
      idea: String.raw`
        ==区间是 $[-1,1]$，对称==，第一件事是把被积函数按奇偶拆开。

        分母 $1+x^{2}$ 是偶函数，==所以每一项的奇偶性由分子决定==：

        - $\frac{x^{2}}{1+x^{2}}$：偶 $\Rightarrow$ 保留，化成 $2\int_0^1$；
        - $\frac{x\cos x}{1+x^{2}}$：$x$ 奇、$\cos x$ 偶 $\Rightarrow$ ==奇，直接扔==；
        - $\frac{\sqrt{1-x^{2}}}{1+x^{2}}$：偶 $\Rightarrow$ 保留。

        ==第二项一秒消失，这就是对称性的价值。==

        **剩下两项**：
        第一项 $\frac{x^{2}}{1+x^{2}}=1-\frac{1}{1+x^{2}}$（[凑分子](#/calculus/indefinite/toolbox?at=algebra-first)）；
        第三项含 $\sqrt{1-x^{2}}$，==要三角代换 $x=\sin t$==。

        **第三项的预判**：$\int_0^1\frac{\sqrt{1-x^{2}}}{1+x^{2}}\dx$ 会出现 $\pi$，
        代换后变成 $\int_0^{\pi/2}\frac{\cos^{2}t}{1+\sin^{2}t}\dt$，
        ==用 $\cos^{2}=1-\sin^{2}$ 拆一下再配==。
      `,
      solution: String.raw`
        **拆奇偶**：$\dfrac{x\cos x}{1+x^{2}}$ 为奇函数，其在 $[-1,1]$ 上积分为 $0$。故
        $$I=2\int_0^{1}\frac{x^{2}}{1+x^{2}}\dx+2\int_0^{1}\frac{\sqrt{1-x^{2}}}{1+x^{2}}\dx
        =2I_1+2I_2.$$

        **$I_1$**：
        $$I_1=\int_0^1\left(1-\frac{1}{1+x^{2}}\right)\dx
        =1-\arctan1=1-\frac\pi4.$$

        **$I_2$**：令 $x=\sin t$，$t\in\left[0,\frac\pi2\right]$，$\dx=\cos t\dt$，
        $\sqrt{1-x^{2}}=\cos t$：
        $$I_2=\int_0^{\pi/2}\frac{\cos^{2}t}{1+\sin^{2}t}\dt
        =\int_0^{\pi/2}\frac{2-(1+\sin^{2}t)}{1+\sin^{2}t}\dt
        =2\int_0^{\pi/2}\frac{\dt}{1+\sin^{2}t}-\frac\pi2.$$

        对 $J=\displaystyle\int_0^{\pi/2}\frac{\dt}{1+\sin^{2}t}$，分子分母同除 $\cos^{2}t$：
        $$J=\int_0^{\pi/2}\frac{\sec^{2}t\dt}{\sec^{2}t+\tan^{2}t}
        =\int_0^{\pi/2}\frac{\d(\tan t)}{1+2\tan^{2}t}
        =\left.\frac{1}{\sqrt2}\arctan\left(\sqrt2\tan t\right)\right|_0^{\pi/2}
        =\frac{1}{\sqrt2}\cdot\frac\pi2.$$

        故 $I_2=\dfrac{2}{\sqrt2}\cdot\dfrac\pi2-\dfrac\pi2=\dfrac{\pi}{\sqrt2}-\dfrac\pi2$。

        **合并**：
        $$I=2\left(1-\frac\pi4\right)+2\left(\frac{\pi}{\sqrt2}-\frac\pi2\right)
        =2-\frac\pi2+\sqrt2\,\pi-\pi=2+\left(\sqrt2-\frac32\right)\pi.$$
      `,
      comment: String.raw`
        **第一步的收益最大**：不查奇偶就要硬算 $\int_{-1}^{1}\frac{x\cos x}{1+x^{2}}\dx$，
        ==而它根本积不出初等原函数==（含 $\cos x$ 与有理式之积）。
        **对称性不只是省时间，有时是唯一的出路。**

        **$J$ 那一步的技巧值得记**：分母是 $a+b\sin^{2}t$ 或 $a+b\cos^{2}t$ 型时，
        ==分子分母同除 $\cos^{2}t$，凑成 $\d(\tan t)$==：
        $$\int\frac{\dt}{a+b\sin^{2}t}=\frac{1}{\sqrt{a(a+b)}}\arctan\left(\sqrt{\frac{a+b}{a}}\tan t\right)+C.$$
        ==这比[万能代换](#/calculus/indefinite/rational?at=trig-rational)快得多==。

        **上限 $t\to\frac\pi2$ 时 $\tan t\to+\infty$**，
        所以 $\arctan(\sqrt2\tan t)\to\frac\pi2$。
        ==这一步实际上是一个反常积分的极限==，
        写解答时最好写成极限形式，见[反常积分](#/calculus/definite/improper?at=definition)。

        **自检**：$\sqrt2-\frac32\approx-0.086$，故 $I\approx2-0.27=1.73$。
        粗估一下：被积函数在 $[-1,1]$ 上大致在 $0.5\sim1.5$ 之间，
        区间长 $2$，==积分应当在 $1\sim3$ 之间，量级对上了==。
      `,
    },

    { t: 'example',
      id: 'ex-substitution',
      title: '★ 对称换元：造一个关于自身的方程',
      source: '经典例题（高频）',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int_0^{\pi}\frac{x\sin x}{1+\cos^{2}x}\dx$。
      `,
      idea: String.raw`
        **直接积不出来**：分子有个 $x$ 挡着，
        $\int\frac{x\sin x}{1+\cos^{2}x}\dx$ 没有初等原函数。

        ==但如果没有那个 $x$，就好办了==：
        $\int\frac{\sin x}{1+\cos^{2}x}\dx=-\arctan(\cos x)$，一步到位。

        **所以目标是把 $x$ 消掉**。用[对称换元](#/calculus/definite/properties?at=substitution-limits)
        $x\to a+b-x=\pi-x$（区间 $[0,\pi]$）：
        $$\sin(\pi-x)=\sin x,\qquad \cos(\pi-x)=-\cos x\Rightarrow\cos^{2}\ \text{不变}.$$
        ==三角部分纹丝不动，只有那个 $x$ 变成了 $\pi-x$==——
        这正是我们要的。

        于是
        $$I=\int_0^{\pi}\frac{(\pi-x)\sin x}{1+\cos^{2}x}\dx
        =\pi\int_0^{\pi}\frac{\sin x}{1+\cos^{2}x}\dx-I,$$
        ==移项就解出来了==。

        **识别信号**：==被积函数里有一个孤零零的 $x$（或 $\ln$ 之类），
        而其余部分关于区间中点对称==——就用 $x\to a+b-x$。
      `,
      solution: String.raw`
        记 $I=\displaystyle\int_0^{\pi}\frac{x\sin x}{1+\cos^{2}x}\dx$。

        作换元 $x=\pi-t$，则 $\dx=-\dt$，$x:0\to\pi$ 对应 $t:\pi\to0$：
        $$I=\int_{\pi}^{0}\frac{(\pi-t)\sin(\pi-t)}{1+\cos^{2}(\pi-t)}(-\dt)
        =\int_0^{\pi}\frac{(\pi-t)\sin t}{1+\cos^{2}t}\dt.$$

        故
        $$2I=\int_0^{\pi}\frac{x\sin x}{1+\cos^{2}x}\dx+\int_0^{\pi}\frac{(\pi-x)\sin x}{1+\cos^{2}x}\dx
        =\pi\int_0^{\pi}\frac{\sin x}{1+\cos^{2}x}\dx.$$

        右端令 $u=\cos x$，$\du=-\sin x\dx$，$x:0\to\pi$ 对应 $u:1\to-1$：
        $$\int_0^{\pi}\frac{\sin x\dx}{1+\cos^{2}x}=\int_{-1}^{1}\frac{\du}{1+u^{2}}
        =\left.\arctan u\right|_{-1}^{1}=\frac\pi4-\left(-\frac\pi4\right)=\frac\pi2.$$

        故
        $$2I=\pi\cdot\frac\pi2\ \Longrightarrow\ I=\frac{\pi^{2}}{4}.$$
      `,
      comment: String.raw`
        **这个套路的通用形式**：
        $$\boxed{\ \int_0^{\pi}xf(\sin x)\dx=\frac\pi2\int_0^{\pi}f(\sin x)\dx
        =\pi\int_0^{\pi/2}f(\sin x)\dx\ }$$
        ==本题是 $f(u)=\frac{u}{1+(1-u^{2})}$ 的特例==。
        记住这条公式，同类题可以直接套。

        **为什么 $x\to\pi-x$ 有效**：$\sin$ 关于 $x=\frac\pi2$ 对称，
        ==而 $[0,\pi]$ 的中点正是 $\frac\pi2$==。
        一般地，区间 $[a,b]$ 上用 $x\to a+b-x$，
        ==中点是 $\frac{a+b}{2}$==，被积函数中关于中点对称的部分不变。

        **同一手法的其他战场**：

        | 题 | 换元 | 结果 |
        |---|---|---|
        | $\int_0^{\pi/2}\frac{\sin^n}{\sin^n+\cos^n}\dx$ | $x\to\frac\pi2-x$ | $\frac\pi4$ |
        | $\int_0^{1}\frac{\ln(1+x)}{1+x^{2}}\dx$ | $x=\tan t$ 后再对称 | $\frac{\pi\ln2}{8}$ |
        | $\int_{-a}^{a}\frac{f(x)}{1+e^{x}}\dx$（$f$ 偶） | $x\to-x$ | $\int_0^{a}f$ |

        ==最后一行也是高频题==：$\frac{1}{1+e^{x}}+\frac{1}{1+e^{-x}}=1$，
        两式相加立刻得到答案。
        **"换元后与原式相加"是定积分独有的、不定积分完全没有的手法。**
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **换元不换限**：==定积分换元必须同时换上下限==。
      2. **上下限换反**：$\varphi$ 递减时会出现 $\alpha>\beta$，==这是对的==，
         不要擅自调换（调换要变号）。
      3. **定积分的答案里带 $x$ 或 $+C$**：==定积分是一个数==。
      4. **被积函数有无穷间断点还用牛顿–莱布尼茨**：
         那是[反常积分](#/calculus/definite/improper?at=two-types)，==要先判敛散==。
         经典错误：$\int_{-1}^{1}\frac{\dx}{x^{2}}=\left[-\frac1x\right]_{-1}^{1}=-2$，
         ==算出负数就说明错了==（被积函数恒正）。
      5. **不查奇偶性**：看到 $\int_{-a}^{a}$ ==先拆奇偶==。
      6. **点火公式用错区间**：公式是对 ==$[0,\frac\pi2]$== 的，
         其他区间要先化过去，且 $n$ 为奇数时 $[0,2\pi]$ 上积分为 $0$。
      7. **点火公式的"点火"记反**：==偶数才乘 $\frac\pi2$==。
      8. **忘了积分与变量字母无关**：$\int_a^b f(x)\dx=\int_a^b f(t)\dt$，
         这条在变限积分里是关键。
      9. **保号性用在 $a>b$ 上**：==所有不等式性质都默认 $a<b$==。
    ` },

  ],
});
