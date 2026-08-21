/* ==========================================================================
   高等数学 / 1 函数、极限、连续 / 极限计算方法总览
   —— 本章总纲：七种未定式，五条路线，一张决策表。
      等价无穷小见 limit/equivalent；存在性证明见 limit/limit-existence。
   ========================================================================== */

KM.page({
  path: 'calculus/limit/limit-methods',
  title: '极限计算方法总览',
  subtitle: '求极限的第一步永远是**定型**：是不是未定式、是哪一种。定错了型，后面全错',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'classify', title: '第一步：定型', c: String.raw`
      $$\boxed{\ \text{不是未定式}\ \Rightarrow\ \text{直接代入}\ }$$
      ==这一步常被跳过，导致对着 $\lim\limits_{x\to0}\frac{\sin x}{x+1}$ 用洛必达==（答案是 $0$，直接代入即可）。

      **七种未定式**：
      $$\frac00,\quad \frac\infty\infty,\quad 0\cdot\infty,\quad \infty-\infty,
      \quad 1^{\infty},\quad 0^{0},\quad \infty^{0}$$

      **前两种是"基本型"**，其余五种都要==先化成前两种==：

      | 类型 | 化法 |
      |---|---|
      | $0\cdot\infty$ | 把其中一个==倒到分母上== |
      | $\infty-\infty$ | ==通分==、==有理化==、或提取公因子 |
      | $1^{\infty}$ | ==取对数==，或直接用[重要极限](#/calculus/limit/limit-methods?at=one-infinity) |
      | $0^{0},\infty^{0}$ | ==取对数==（化成 $0\cdot\infty$） |

      **不是未定式却容易误判的**：
      $$\frac{0}{\infty}=0,\qquad \frac{\infty}{0}=\infty,\qquad
      0^{\infty}=0,\qquad \infty^{\infty}=\infty,\qquad 1^{\infty}\ \text{是未定式！}$$
      ==$1^{\infty}$ 长得像"确定"，实际是未定式==——这是最常见的定型错误。
      理由：底数只是==趋于== $1$，不是等于 $1$，
      而 $\left(1+\frac1n\right)^{n}\to e$、$1^{n}\to1$、$\left(1-\frac1n\right)^{n}\to e^{-1}$，
      ==结果完全不同==。
    ` },

    { t: 'compare',
      id: 'route-table',
      title: '★ 五条路线：按被求式的长相选',
      cols: ['看到什么', '首选', '备注'],
      rows: [
        ['$x\\to0$，含 $\\sin,\\ln(1+\\cdot),e^{x}-1$ 等', '==[等价无穷小](#/calculus/limit/equivalent?at=table)==', '最快，但只能用在乘除'],
        ['等价无穷小失效（差的形式）', '==[泰勒展开](#/threads/lines/taylor?at=limit)==', '万能，展到分母的阶'],
        ['$\\frac00$ 或 $\\frac\\infty\\infty$ 且求导后变简单', '[洛必达](#/calculus/limit/limit-methods?at=lhopital)', '==验条件==，别连用超过两次'],
        ['$x\\to\\infty$ 的有理式', '==抓最高次==', '上下同除最高次幂'],
        ['$1^{\\infty}$', '[凑重要极限或取对数](#/calculus/limit/limit-methods?at=one-infinity)', ''],
        ['数列、含 $n!$ 或 $n^{n}$', '[夹逼](#/calculus/limit/limit-existence?at=squeeze)、[单调有界](#/calculus/limit/limit-existence?at=monotone)', ''],
        ['含变限积分', '[洛必达消积分号](#/calculus/definite/variable-limit?at=ex-limit)', ''],
      ] },

    { t: 'key', id: 'two-important', title: '两个重要极限', c: String.raw`
      $$\boxed{\ \lim_{x\to0}\frac{\sin x}{x}=1\ }\qquad
      \boxed{\ \lim_{x\to\infty}\left(1+\frac1x\right)^{x}=e\ }$$

      **它们的"通用形式"更好用**（$\square$ 代表任何趋于 $0$ 的量）：
      $$\lim\frac{\sin\square}{\square}=1,\qquad
      \lim\left(1+\square\right)^{1/\square}=e.$$

      ==第二个的三个要素必须齐==：
      **底数是 $1+\square$、指数是 $\frac{1}{\square}$、且 $\square\to0$**。
      $$\lim_{x\to0}(1+2x)^{3/x}
      =\lim_{x\to0}\left[(1+2x)^{\frac{1}{2x}}\right]^{6}=e^{6}.$$
      ==把指数硬凑成 $\frac{1}{2x}\times6$==，这是标准动作。

      **别把第一个用在 $x\to\infty$ 上**：
      $\lim\limits_{x\to\infty}\frac{\sin x}{x}=0$（==有界量除以无穷大==），
      ==不是 $1$==。
      **重要极限的前提是 $\square\to0$，不看这一条就会错。**
    ` },

    { t: 'key', id: 'one-infinity', title: '$1^{\\infty}$ 的三步走', c: String.raw`
      $$\lim f(x)^{g(x)}\quad\text{其中}\ f\to1,\ g\to\infty$$

      **公式法（推荐，快）**：
      $$\boxed{\ \lim f^{g}=e^{\lim g\cdot(f-1)}\ }$$
      ==把"底数减 1"乘上指数，放到 $e$ 的头上==。

      **为什么**：$f^{g}=e^{g\ln f}$，而 $f\to1$ 时
      $\ln f=\ln\bigl[1+(f-1)\bigr]\sim f-1$，
      ==用了[等价无穷小](#/calculus/limit/equivalent?at=table)==。

      **例**：
      $$\lim_{x\to0}\left(\frac{1+x}{1-x}\right)^{1/x}
      =e^{\lim\frac1x\left(\frac{1+x}{1-x}-1\right)}
      =e^{\lim\frac1x\cdot\frac{2x}{1-x}}=e^{2}.$$

      **取对数法（稳，适合复杂情形）**：
      令 $y=f^{g}$，则 $\ln y=g\ln f$，求出 $\lim\ln y=A$ 后 ==$\lim y=e^{A}$==。
      ==别忘了最后要还原成 $e^{A}$==，这是最常见的漏步。

      **$0^{0}$ 与 $\infty^{0}$ 只能取对数**（公式法不适用，因为底数不趋于 $1$）。
      取完对数变成 $0\cdot\infty$，再倒到分母上。
    ` },

    { t: 'warn', id: 'lhopital', title: '洛必达：三个前提 + 三条纪律', c: String.raw`
      $$\lim\frac{f}{g}=\lim\frac{f'}{g'}\qquad\text{（在下列条件下）}$$

      **三个前提，缺一不可**：

      1. ==是 $\frac00$ 或 $\frac\infty\infty$==（其他未定式要先化过来）；
      2. $f,g$ 在该点附近可导且 $g'\ne0$；
      3. ==$\lim\frac{f'}{g'}$ 存在或为 $\infty$==。

      **第 3 条最容易被忽略**：若 $\lim\frac{f'}{g'}$ ==震荡不存在==，
      ==不能断言原极限不存在==。
      经典反例：
      $$\lim_{x\to\infty}\frac{x+\sin x}{x}=1,$$
      但 $\lim\frac{1+\cos x}{1}$ ==不存在==。
      ==洛必达失效时要换方法（这里直接拆成 $1+\frac{\sin x}{x}$），不是"极限不存在"。==

      **三条纪律**：

      1. ==每次用之前重新验一遍是不是未定式==（用一次后可能就不是了）；
      2. ==边用边化简==：能提取的非零因子先提出去，能用等价无穷小先换掉，
         否则求导会越来越复杂；
      3. ==连用超过两三次说明方法选错了==，改用[泰勒展开](#/threads/lines/taylor?at=limit)。

      **洛必达 vs 泰勒的分工**：

      | | 洛必达 | 泰勒 |
      |---|---|---|
      | 优势 | 不用记展开式 | ==一步到位，不会越算越乱== |
      | 劣势 | 求导可能爆炸 | 要记[八个基本展开](#/threads/lines/taylor?at=basic-eight) |
      | 适合 | 求导后明显变简单 | ==分子分母都是"差"的形式== |
    ` },

    { t: 'key', id: 'infinity-ratio', title: '$x\\to\\infty$：抓最高次', c: String.raw`
      **有理式**：上下同除以分母的最高次幂。
      $$\lim_{x\to\infty}\frac{a_mx^{m}+\cdots}{b_nx^{n}+\cdots}
      =\begin{cases}
      \dfrac{a_m}{b_n},&m=n\\[6pt]
      0,&m<n\\[2pt]
      \infty,&m>n
      \end{cases}$$

      **含根号时要小心 $x\to-\infty$**：
      $$\sqrt{x^{2}}=\abs x=\begin{cases}x,&x\ge0\\ -x,&x<0\end{cases}$$
      ==把 $x$ 提出根号时必须带绝对值==，这是本节最隐蔽的错误。

      **例**：$\lim\limits_{x\to-\infty}\dfrac{\sqrt{x^{2}+1}}{x}
      =\lim\dfrac{\abs x\sqrt{1+1/x^{2}}}{x}=\lim\dfrac{-x}{x}=-1$，
      ==不是 $1$==。

      **$\infty-\infty$ 型的根式**：==有理化==。
      $$\sqrt{x^{2}+x}-x=\frac{x}{\sqrt{x^{2}+x}+x}\ \xrightarrow{x\to+\infty}\ \frac12.$$

      **增长速度的排序**（$x\to+\infty$，用来快速判断）：
      $$\ln^{\alpha}x\ \ll\ x^{\beta}\ \ll\ a^{x}\ \ll\ x^{x}\ \ll\ x!\ \text{（数列）}$$
      =="对数 $<$ 幂 $<$ 指数 $<$ 阶乘"==，
      任意两个相比，==低阶的那个占的比重趋于零==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-mixed',
      title: '定型 + 选路线：四个小题',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        求下列极限：
        $$\text{(1)}\ \lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}\qquad
        \text{(2)}\ \lim_{x\to+\infty}\left(\sqrt{x^{2}+x}-x\right)$$
        $$\text{(3)}\ \lim_{x\to0}\left(\cos x\right)^{1/x^{2}}\qquad
        \text{(4)}\ \lim_{x\to0^{+}}x^{x}$$
      `,
      idea: String.raw`
        **(1) $\frac00$ 型，但分子是"差"**——
        ==直接把 $\tan x\sim x$、$\sin x\sim x$ 代入会得到 $\frac{0}{x^{3}}=0$，这是错的==
        （等价无穷小[不能用在加减上](#/calculus/limit/equivalent?at=when-fails)）。

        **正确做法**：先提取公因子 $\tan x-\sin x=\tan x(1-\cos x)$，
        变成==乘积==之后再用等价无穷小。
        （或者用[泰勒展开](#/threads/lines/taylor?at=limit)。）

        **(2) $\infty-\infty$**，含根号 $\Rightarrow$ ==有理化==。

        **(3) $1^{\infty}$**（$\cos x\to1$，指数 $\to\infty$）$\Rightarrow$
        用[公式法](#/calculus/limit/limit-methods?at=one-infinity)：
        $e^{\lim\frac{\cos x-1}{x^{2}}}$，而 $\cos x-1\sim-\frac{x^{2}}{2}$。

        **(4) $0^{0}$**（$x\to0^{+}$，底数和指数都趋于 $0$）$\Rightarrow$
        ==只能取对数==：$\ln y=x\ln x\to0$（$0\cdot\infty$，倒下去用洛必达）。
      `,
      solution: String.raw`
        **(1)** 提取公因子：
        $$\tan x-\sin x=\frac{\sin x}{\cos x}-\sin x=\sin x\cdot\frac{1-\cos x}{\cos x}.$$
        由 $\sin x\sim x$、$1-\cos x\sim\dfrac{x^{2}}{2}$、$\cos x\to1$：
        $$\lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}
        =\lim_{x\to0}\frac{x\cdot\frac{x^{2}}{2}}{x^{3}\cdot1}=\frac12.$$

        **(2)** 有理化：
        $$\sqrt{x^{2}+x}-x=\frac{(x^{2}+x)-x^{2}}{\sqrt{x^{2}+x}+x}
        =\frac{x}{\sqrt{x^{2}+x}+x}.$$
        上下同除 $x$（$x\to+\infty$ 时 $x>0$，$\sqrt{x^{2}+x}=x\sqrt{1+\frac1x}$）：
        $$=\frac{1}{\sqrt{1+\frac1x}+1}\ \longrightarrow\ \frac{1}{1+1}=\frac12.$$

        **(3)** $1^{\infty}$ 型，由公式法：
        $$\lim_{x\to0}(\cos x)^{1/x^{2}}
        =e^{\lim\limits_{x\to0}\frac{\cos x-1}{x^{2}}}
        =e^{\lim\limits_{x\to0}\frac{-x^{2}/2}{x^{2}}}=e^{-1/2}.$$

        **(4)** $0^{0}$ 型，取对数。令 $y=x^{x}$，则 $\ln y=x\ln x$。
        $$\lim_{x\to0^{+}}x\ln x=\lim_{x\to0^{+}}\frac{\ln x}{1/x}
        \ \xlongequal{\text{洛必达}}\ \lim_{x\to0^{+}}\frac{1/x}{-1/x^{2}}
        =\lim_{x\to0^{+}}(-x)=0.$$
        故 $\lim y=e^{0}=1$。
      `,
      comment: String.raw`
        **(1) 是最经典的"等价无穷小陷阱"**。
        ==直接代入得 $0$、用泰勒得 $\frac12$==，差别就在于
        $\tan x$ 与 $\sin x$ 的三阶项不同：
        $$\tan x=x+\frac{x^{3}}{3}+o(x^{3}),\qquad \sin x=x-\frac{x^{3}}{6}+o(x^{3}),$$
        $$\tan x-\sin x=\frac{x^{3}}{2}+o(x^{3}).$$
        ==一阶项相消了，答案藏在三阶项里==，
        而等价无穷小只保留一阶，所以失效。
        **判据：分子分母出现"差"且首项会抵消时，一律改用泰勒或提公因子。**

        **(2) 的推广值得记**：
        $$\lim_{x\to+\infty}\left(\sqrt{x^{2}+ax+b}-x\right)=\frac a2.$$
        ==只看一次项系数的一半==。用它可以秒杀这类题，也可以验算。

        **(3) 的一般结论**：
        $$\lim_{x\to0}(\cos x)^{1/x^{2}}=e^{-1/2},\qquad
        \lim_{x\to0}\left(\frac{\sin x}{x}\right)^{1/x^{2}}=e^{-1/6}.$$
        ==指数上的数正好是那个函数展开式里 $x^{2}$ 项的系数==，
        由公式法一眼可得。

        **(4) 的结果 $x^{x}\to1$ 值得记住**，
        它说明"$0^{0}$"在这个意义下趋于 $1$。
        ==但 $0^{0}$ 仍是未定式==：
        $\lim\limits_{x\to0^+}x^{1/\ln x}=e$，==同样是 $0^{0}$ 型却给出 $e$==。
        **这正是"未定式"三个字的含义：形式相同，结果可以任意。**
      `,
    },

    { t: 'example',
      id: 'ex-lhopital-trap',
      title: '★ 洛必达的边界：什么时候不能用',
      source: '经典例题（概念辨析）',
      level: 3,
      problem: String.raw`
        1. 判断下列推理是否正确：
           $$\lim_{x\to\infty}\frac{x+\sin x}{x}
           \xlongequal{\text{洛必达}}\lim_{x\to\infty}\frac{1+\cos x}{1}\ \text{不存在},$$
           故原极限不存在。
        2. 求 $\displaystyle\lim_{x\to0}\frac{x^{2}\sin\frac1x}{\sin x}$。
      `,
      idea: String.raw`
        **第 1 问**：结论错。
        洛必达的[第 3 个前提](#/calculus/limit/limit-methods?at=lhopital)是
        =="$\lim\frac{f'}{g'}$ 存在或为 $\infty$"==，
        它是==使用洛必达的条件==，不是结论。

        $\lim\frac{f'}{g'}$ 不存在时，==洛必达法则只是"用不了"==，
        ==不能反推原极限不存在==。

        **正确做法**：直接拆
        $$\frac{x+\sin x}{x}=1+\frac{\sin x}{x}\ \longrightarrow\ 1+0=1.$$
        （用了"==有界量 × 无穷小 $=$ 无穷小=="。）

        **第 2 问也是同一个陷阱**：
        分子含 $\sin\frac1x$，==求导后会出现 $\cos\frac1x\cdot\frac{1}{x^{2}}$，更糟==。
        应当用==有界量与无穷小==的组合：
        $$\frac{x^{2}\sin\frac1x}{\sin x}=\underbrace{\frac{x}{\sin x}}_{\to1}
        \cdot\underbrace{x}_{\to0}\cdot\underbrace{\sin\frac1x}_{\text{有界}}.$$
        ==拆成三块，各自判断==。
      `,
      solution: String.raw`
        **(1) 推理错误。**

        洛必达法则要求"$\lim\dfrac{f'}{g'}$ 存在或为无穷"，
        这是==使用该法则的前提==。当此极限不存在（如本题的 $1+\cos x$ 震荡）时，
        法则==不适用==，==不能由此断言原极限不存在==。

        事实上直接计算：
        $$\lim_{x\to\infty}\frac{x+\sin x}{x}=\lim_{x\to\infty}\left(1+\frac{\sin x}{x}\right)=1+0=1,$$
        其中 $\left|\dfrac{\sin x}{x}\right|\le\dfrac{1}{\abs x}\to0$。故原极限==存在且等于 $1$==。

        **(2)** 拆成三个因子：
        $$\frac{x^{2}\sin\frac1x}{\sin x}=\frac{x}{\sin x}\cdot x\cdot\sin\frac1x.$$

        - $\dfrac{x}{\sin x}\to1$（重要极限）；
        - $x\to0$；
        - $\left|\sin\dfrac1x\right|\le1$（==有界，但极限不存在==）。

        由"有界量 $\times$ 无穷小 $=$ 无穷小"，
        $$x\sin\frac1x\to0,$$
        故
        $$\lim_{x\to0}\frac{x^{2}\sin\frac1x}{\sin x}=1\times0=0.$$
      `,
      comment: String.raw`
        **"有界量 × 无穷小 = 无穷小"是本章的重要工具**，
        专门对付含 $\sin\frac1x$、$\cos\frac1x$、$(-1)^{n}$ 这类
        ==震荡但有界==的因子。

        $$\boxed{\ \text{看到 }\sin\frac1x\ \text{就想"有界"，不要试图求它的极限}\ }$$
        ==$\lim\limits_{x\to0}\sin\frac1x$ 不存在==，
        但这不妨碍 $x\sin\frac1x\to0$。

        **常考的三个变体**：

        | 极限 | 结果 | 理由 |
        |---|---|---|
        | $\lim\limits_{x\to0}x\sin\frac1x$ | $0$ | 有界 $\times$ 无穷小 |
        | $\lim\limits_{x\to0}\frac1x\sin\frac1x$ | ==不存在== | 无穷大 $\times$ 有界，不确定 |
        | $\lim\limits_{x\to0}\sin x\cdot\sin\frac1x$ | $0$ | 有界 $\times$ 无穷小 |

        ==第二行说明"有界"救不了无穷大==，只对无穷小有效。

        **洛必达失效的三种典型情形**（都要换方法）：

        1. ==求导后震荡==（含 $\sin\frac1x$、$\cos x$ 之类）；
        2. ==求导后循环==（如 $\frac{\sqrt{x^{2}+1}}{x}$，求导后回到原形状）；
        3. ==求导越来越复杂==（连用两三次还没简化）。

        **第 2 种的例子**：$\lim\limits_{x\to+\infty}\frac{\sqrt{x^{2}+1}}{x}$，
        洛必达给出 $\frac{x/\sqrt{x^{2}+1}}{1}$，==再用一次又转回去==。
        正确做法是[抓最高次](#/calculus/limit/limit-methods?at=infinity-ratio)：
        提出 $x$ 得 $\sqrt{1+\frac{1}{x^{2}}}\to1$。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **不定型就用洛必达**：==先验是不是 $\frac00$ 或 $\frac\infty\infty$==。
      2. **由 $\lim\frac{f'}{g'}$ 不存在断言原极限不存在**：==只能说法则不适用==。
      3. **$1^{\infty}$ 当成 $1$**：==它是未定式==。
      4. **取对数后忘了还原**：求出 $\lim\ln y=A$ 后要写 ==$\lim y=e^{A}$==。
      5. **等价无穷小用在加减上**：见[失效条件](#/calculus/limit/equivalent?at=when-fails)。
      6. **$\sqrt{x^{2}}$ 提出来不带绝对值**：$x\to-\infty$ 时是 ==$-x$==。
      7. **重要极限用在 $\square\not\to0$ 时**：
         $\lim\limits_{x\to\infty}\frac{\sin x}{x}=0$ 而非 $1$。
      8. **对 $\sin\frac1x$ 求极限**：==它不存在==，
         但可以当"有界量"用。
      9. **洛必达连用四五次**：==改用泰勒==。
      10. **忘了先化简**：能约的因子先约、能提的常数先提，==再动用工具==。
    ` },

  ],
});
