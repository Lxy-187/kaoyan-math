/* ==========================================================================
   高等数学 / 5 定积分与反常积分 / 积分不等式与积分证明题
   —— 大题的常客。总纲见 derivative-app/proof-overview 的 integral-group。
   ========================================================================== */

KM.page({
  path: 'calculus/definite/integral-proof',
  title: '积分不等式与积分证明题',
  subtitle: '积分证明题的路只有四条：**放缩被积函数**、**转成变限积分用中值定理**、**柯西–施瓦茨**、**分部积分挪导数**',
  tags: ['大题', '证明题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'md', c: String.raw`
      这一节的题面通常长成"设 $f$ 在 $[a,b]$ 上连续（可导），证明 $\int_a^b\cdots\ge\cdots$"。
      ==难点是"从哪下手"，不是计算==。

      本页给一张决策表，然后逐条展开。
      与[导数证明题总纲](#/calculus/derivative-app/proof-overview?at=route-table)配合看效果最好——
      ==很多积分题的最后一步仍然落在中值定理上==。
    ` },

    { t: 'compare',
      id: 'route-table',
      title: '★ 四条路线：看结论的形状选',
      cols: ['结论的样子', '路线', '关键动作'],
      rows: [
        ['两个积分比大小，被积函数可比', '==放缩被积函数==', '证 $f\\le g$ 后用保序性'],
        ['结论含 $\\xi$，或两端形状差很远', '==转成变限积分==', '令 $F(x)=\\int_a^x(\\cdots)$，证 $F$ 单调'],
        ['出现平方、乘积、$\\left(\\int fg\\right)^{2}$', '==柯西–施瓦茨==', '配一个合适的分解'],
        ['被积函数含 $f\'$ 或 $f\'\'$', '==分部积分==', '把导数挪到另一边'],
      ] },

    { t: 'key', id: 'scaling', title: '路线一：放缩被积函数', c: String.raw`
      **依据是[保序性](#/calculus/definite/properties?at=props)**：
      $$f\le g\ \text{在}\ [a,b]\ \text{上}\ \Longrightarrow\ \int_a^bf\le\int_a^bg.$$

      ==所以问题从"比较两个积分"降成"比较两个函数"==，
      而后者是[导数应用](#/calculus/derivative-app/proof-overview?at=three-questions)的老本行。

      **常用的放缩素材**：

      | 不等式 | 范围 |
      |---|---|
      | $\sin x\le x\le\tan x$ | $x\in[0,\frac\pi2)$ |
      | $\frac{x}{1+x}\le\ln(1+x)\le x$ | $x>-1$ |
      | $e^{x}\ge1+x$ | 一切 $x$ |
      | $\frac{2}{\pi}x\le\sin x\le x$ | $x\in[0,\frac\pi2]$（==若尔当不等式==） |

      **注意方向和区间**：放缩后==必须在整个积分区间上成立==，
      只在部分区间成立就把积分拆开分段处理。

      **一个常见的失效情形**：$\int_0^1 f\le\int_0^1 g$ 成立
      ==不能推出 $f\le g$==（反向不成立）。
      放缩只能从函数推到积分，==不能倒过来==。
    ` },

    { t: 'key', id: 'to-variable-limit', title: '★ 路线二：把常数换成变量', c: String.raw`
      **动作**：把待证不等式中的一个端点 $b$ ==换成变量 $x$==，
      令
      $$F(x)=\bigl(\text{右端}\bigr)-\bigl(\text{左端}\bigr),$$
      然后证 $F(a)=0$ 且 $F'(x)\ge0$，从而 $F(b)\ge0$。

      $$\boxed{\ \text{把"一个不等式"变成"一个单调函数"}\ }$$

      ==这是积分不等式最通用的一招==，因为求导会消掉积分号，
      把问题降到[导数不等式](#/calculus/derivative-app/proof-overview?at=three-questions)。

      **例**：证 $\displaystyle\int_0^{1}f^{2}\ge\left(\int_0^{1}f\right)^{2}$。
      令 $F(x)=x\displaystyle\int_0^{x}f^{2}\dt-\left(\int_0^{x}f\dt\right)^{2}$，则 $F(0)=0$，
      $$F'(x)=\int_0^{x}f^{2}\dt+xf^{2}(x)-2f(x)\int_0^{x}f\dt
      =\int_0^{x}\bigl[f(t)-f(x)\bigr]^{2}\dt\ \ge0.$$
      ==最后那一步的配方是关键==：把三项凑成一个完全平方的积分。

      **注意**：求导时若出现 $\int_0^x f$ 与 $f(x)$ 混合，
      ==往往能凑成 $\int_0^x[\cdots]^2\dt$ 的形状==，
      这是本路线最漂亮也最常考的收尾。
    ` },

    { t: 'key', id: 'cauchy-schwarz', title: '路线三：柯西–施瓦茨不等式', c: String.raw`
      $$\boxed{\ \left(\int_a^b f(x)g(x)\dx\right)^{2}
      \le\int_a^b f^{2}(x)\dx\cdot\int_a^b g^{2}(x)\dx\ }$$

      **取等条件**：$f$ 与 $g$ ==线性相关==（即 $g=\lambda f$ 几乎处处）。

      **它的用法核心是"怎么分解"**：待证式里的被积函数要拆成 $f\cdot g$ 的形状，
      ==而拆法决定成败==。

      | 待证 | 分解 |
      |---|---|
      | $\left(\int_a^b f\right)^{2}\le(b-a)\int_a^bf^{2}$ | $f=f\cdot1$，取 $g=1$ |
      | $\left(\int_0^1\sqrt xf\right)^{2}\le\frac12\int_0^1f^{2}$ | $g=\sqrt x$ |
      | $\int_a^b f\cdot\int_a^b\frac1f\ge(b-a)^{2}$ | $\sqrt f\cdot\frac{1}{\sqrt f}=1$ |

      ==最后一行的技巧很典型==：把常数 $1$ 拆成 $\sqrt f\cdot\frac{1}{\sqrt f}$，
      再对 $1$ 用柯西–施瓦茨。

      **这条不等式的四副面孔**（积分、级数、向量、概率）见
      [柯西–施瓦茨主线](#/threads/patterns/cauchy-schwarz?at=four-faces)，
      ==积分形式的证明可以用[判别式法或二重积分法](#/threads/patterns/cauchy-schwarz?at=double-integral-proof)==。
    ` },

    { t: 'key', id: 'by-parts-move', title: '路线四：分部积分挪导数', c: String.raw`
      **识别信号**：条件里给了 $f'$ 或 $f''$ 的信息（有界、单调、某点为零），
      而结论里只有 $f$，==或者反过来==。

      **动作**：用[分部积分](#/calculus/indefinite/by-parts?at=core)把导数从一边挪到另一边。

      **一个高频结构**：$f(a)=f(b)=0$ 时
      $$\int_a^b f(x)\dx=\int_a^b f(x)\d x
      \ \xrightarrow{\ \text{取 }v=x-c\ }\
      \left[f(x)(x-c)\right]_a^b-\int_a^b f'(x)(x-c)\dx,$$
      ==选 $c=\frac{a+b}{2}$ 能让 $\abs{x-c}\le\frac{b-a}{2}$，得到最好的估计==。

      **这就是[$v$ 可以加常数](#/calculus/indefinite/by-parts?at=tricks)那个技巧的高级用法**：
      $v$ 取 $x-\frac{a+b}{2}$ 而不是 $x$，把边界项打掉或把系数减半。

      **配合[泰勒公式](#/calculus/derivative-app/taylor-proof?at=where)**：
      条件给 $f''$ 时常先在某点展开再积分，
      =="展开点选区间中点"往往能利用对称性消掉一次项==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-scaling',
      title: '放缩 + 变限积分：两条路线的对照',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $f$ 在 $[0,1]$ 上连续且单调递减，$f(x)>0$。证明：对任意 $\alpha\in(0,1)$，
        $$\int_0^{\alpha}f(x)\dx\ \ge\ \alpha\int_0^{1}f(x)\dx.$$
      `,
      idea: String.raw`
        **先理解它在说什么**：不等式可以改写成
        $$\frac{1}{\alpha}\int_0^{\alpha}f\ \ge\ \frac{1}{1}\int_0^{1}f,$$
        ==即"$f$ 在 $[0,\alpha]$ 上的平均值 $\ge$ 在 $[0,1]$ 上的平均值"==。
        对递减函数这显然应该成立——==前一段的值更大==。
        **想清楚这一点，证法就有了方向。**

        **路线二（变限积分）**：把 $\alpha$ 当变量，令
        $$F(\alpha)=\frac{1}{\alpha}\int_0^{\alpha}f\dx,$$
        证 $F$ 递减即可（则 $F(\alpha)\ge F(1)$）。
        ==但 $F$ 在 $\alpha=0$ 处要讨论==，稍麻烦。

        **更干净的写法**：令
        $$G(\alpha)=\int_0^{\alpha}f\dx-\alpha\int_0^{1}f\dx,$$
        ==直接就是"右端移到左端"==，$G(0)=G(1)=0$，
        求导后用单调性判断 $G$ 的走向。

        **求导**：$G'(\alpha)=f(\alpha)-\int_0^1f\dx$。
        由 $f$ 递减，$f(\alpha)$ 递减，==所以 $G'$ 递减==：
        先正后负 $\Rightarrow$ $G$ 先增后减 $\Rightarrow$
        ==两端都是 $0$ 的话，中间必然 $\ge0$==。
      `,
      solution: String.raw`
        令
        $$G(\alpha)=\int_0^{\alpha}f(x)\dx-\alpha\int_0^{1}f(x)\dx,\qquad \alpha\in[0,1].$$

        则 $G(0)=0$，且
        $$G(1)=\int_0^{1}f-1\cdot\int_0^{1}f=0.$$

        由[变限积分求导](#/calculus/definite/variable-limit?at=core)，
        $$G'(\alpha)=f(\alpha)-\int_0^{1}f(x)\dx.$$

        由积分中值定理，存在 $c\in(0,1)$ 使 $\int_0^1f=f(c)$。故
        $$G'(\alpha)=f(\alpha)-f(c).$$

        由 $f$ ==单调递减==：

        - $\alpha<c$ 时 $f(\alpha)>f(c)$，故 $G'(\alpha)>0$，$G$ 递增；
        - $\alpha>c$ 时 $f(\alpha)<f(c)$，故 $G'(\alpha)<0$，$G$ 递减。

        于是 $G$ 在 $[0,1]$ 上==先增后减==，最小值只能在端点取到。而 $G(0)=G(1)=0$，故
        $$G(\alpha)\ge\min\set{G(0),G(1)}=0,\qquad \alpha\in[0,1],$$
        即
        $$\int_0^{\alpha}f(x)\dx\ \ge\ \alpha\int_0^{1}f(x)\dx.\qquad\blacksquare$$
      `,
      comment: String.raw`
        **"先增后减 + 两端为零 $\Rightarrow$ 中间非负"是一个很好用的收尾**。
        ==它比"证 $G'\ge0$"要求低得多==——本题的 $G'$ 确实会变号，
        硬证单调是走不通的。

        **另一条路（放缩，更短但需要一点技巧）**：
        $$\int_0^{\alpha}f\dx\ \ge\ \alpha\int_0^{1}f\dx
        \iff (1-\alpha)\int_0^{\alpha}f\dx\ \ge\ \alpha\int_{\alpha}^{1}f\dx.$$
        由 $f$ 递减，在 $[0,\alpha]$ 上 $f\ge f(\alpha)$、在 $[\alpha,1]$ 上 $f\le f(\alpha)$，故
        $$(1-\alpha)\int_0^{\alpha}f\ge(1-\alpha)\alpha f(\alpha)
        \ge\alpha(1-\alpha)f(\alpha)\ge\alpha\int_{\alpha}^{1}f.$$
        ==把不等式先移项整理成"两段积分比大小"，再用 $f(\alpha)$ 作桥梁==，
        三行就完。
        **移项整理这一步很值得练——它常常把题变简单一个档次。**

        **推广**：把 $[0,1]$ 换成 $[a,b]$、$\alpha$ 换成 $x\in(a,b)$，结论形如
        $$\frac{1}{x-a}\int_a^{x}f\ \ge\ \frac{1}{b-a}\int_a^{b}f,$$
        ==即"递减函数的区间平均值关于右端点递减"==。
        这条本身也是常考的命题。
      `,
    },

    { t: 'example',
      id: 'ex-cs',
      title: '★ 柯西–施瓦茨：关键在怎么拆',
      source: '经典例题',
      level: 4,
      problem: String.raw`
        设 $f$ 在 $[0,1]$ 上连续且 $f(x)>0$。证明：
        $$\int_0^{1}f(x)\dx\cdot\int_0^{1}\frac{\dx}{f(x)}\ \ge\ 1.$$
      `,
      idea: String.raw`
        **左端是两个积分的乘积，右端是常数 $1$**——
        这个形状==正是[柯西–施瓦茨](#/calculus/definite/integral-proof?at=cauchy-schwarz)的右端==：
        $$\int u^{2}\cdot\int v^{2}\ \ge\ \left(\int uv\right)^{2}.$$

        **所以要凑出 $u^{2}=f$、$v^{2}=\frac1f$**，即
        $$u=\sqrt f,\qquad v=\frac{1}{\sqrt f}.$$
        （$f>0$ 保证了根号有意义——==题目给这个条件就是为了这一步==。）

        **于是**
        $$uv=\sqrt f\cdot\frac{1}{\sqrt f}=1,$$
        右端变成 $\left(\int_0^1 1\dx\right)^{2}=1$，==恰好是待证的右端==。

        ==整道题的技巧就是"把常数 $1$ 看成 $\sqrt f\cdot\frac{1}{\sqrt f}$"==。
        这个"乘以 $1$ 的变形"和[不定积分里的化简技巧](#/calculus/indefinite/toolbox?at=algebra-first)
        是同一个念头。
      `,
      solution: String.raw`
        由 $f>0$ 且连续，$\sqrt{f}$ 与 $\dfrac{1}{\sqrt f}$ 在 $[0,1]$ 上连续。

        对 $u=\sqrt{f}$、$v=\dfrac{1}{\sqrt f}$ 应用柯西–施瓦茨不等式：
        $$\left(\int_0^{1}u(x)v(x)\dx\right)^{2}
        \le\int_0^{1}u^{2}(x)\dx\cdot\int_0^{1}v^{2}(x)\dx.$$

        而 $u(x)v(x)=\sqrt{f(x)}\cdot\dfrac{1}{\sqrt{f(x)}}=1$，故左端
        $$\left(\int_0^{1}1\dx\right)^{2}=1,$$
        右端
        $$\int_0^{1}f(x)\dx\cdot\int_0^{1}\frac{\dx}{f(x)}.$$

        因此
        $$\int_0^{1}f(x)\dx\cdot\int_0^{1}\frac{\dx}{f(x)}\ \ge\ 1.\qquad\blacksquare$$

        **取等条件**：$u$ 与 $v$ 线性相关，即 $\dfrac{1}{\sqrt f}=\lambda\sqrt f$，
        亦即 $f\equiv\text{常数}$。
      `,
      comment: String.raw`
        **一般区间上的版本**：$[a,b]$ 上同法得
        $$\int_a^{b}f\dx\cdot\int_a^{b}\frac{\dx}{f}\ \ge\ (b-a)^{2},$$
        ==右端是区间长度的平方==（因为 $\int_a^b1\dx=b-a$）。
        本题 $b-a=1$，所以右端是 $1$。
        ==记一般形式更保险，考试常换区间。==

        **同一手法的其他分解**：

        | 待证 | 取 $u,v$ |
        |---|---|
        | $\left(\int_a^bf\right)^{2}\le(b-a)\int_a^bf^{2}$ | $u=f,\ v=1$ |
        | $\int_0^1 xf^{2}\ge\left(\int_0^1\sqrt xf\right)^{2}\cdot2$ | $u=\sqrt xf,\ v=1$ |
        | $\int_a^bf\cdot\int_a^bg\ge\left(\int_a^b\sqrt{fg}\right)^{2}$ | $u=\sqrt f,\ v=\sqrt g$ |

        ==共同点：把待证式两端对照标准形，反推 $u^{2}$ 和 $v^{2}$ 是谁==。

        **不用柯西–施瓦茨的证法**（供对照）：
        由均值不等式 $\frac{f(x)}{f(y)}+\frac{f(y)}{f(x)}\ge2$，
        $$2\int_0^1\!\!\int_0^1\dx\dy\le\int_0^1\!\!\int_0^1\left(\frac{f(x)}{f(y)}+\frac{f(y)}{f(x)}\right)\dx\dy
        =2\int_0^1f\dx\int_0^1\frac{\dy}{f(y)},$$
        ==这正是[柯西–施瓦茨的二重积分证法](#/threads/patterns/cauchy-schwarz?at=double-integral-proof)==，
        把一维的问题升到二维再用对称性。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **由积分不等式反推函数不等式**：==只能从函数推积分==，不能倒过来。
      2. **放缩不在整个区间成立**：==必须验证放缩在积分区间上处处成立==，
         否则要分段。
      3. **保序性用在 $a>b$ 上**：所有积分不等式默认 ==$a<b$==。
      4. **柯西–施瓦茨拆错**：==对照标准形反推 $u^{2},v^{2}$==，
         别凭感觉配。
      5. **忘了验证根号有意义**：用 $\sqrt f$ 时==必须有 $f\ge0$==（本题给了 $f>0$）。
      6. **构造辅助函数后不验端点值**：$F(a)=0$ 这一步==是结论成立的支点==。
      7. **$G'$ 变号却硬证单调**：改用"先增后减 + 端点值"的论证。
      8. **积分中值定理的 $\xi$ 当成具体的数**：==它只是存在，不能算出来==，
         但可以用来比较大小。
      9. **分部积分的边界项没算**：$\left[uv\right]_a^b$ ==不能默认为零==，
         要用题目给的 $f(a)=f(b)=0$ 之类的条件说明。
    ` },

  ],
});
