/* ==========================================================================
   高等数学 / 4 不定积分 / 常见积分类型速查
   —— 本章总纲：基本积分表 + 决策流程 + 必背结论。
      具体方法见 substitution / by-parts / rational。
   ========================================================================== */

KM.page({
  path: 'calculus/indefinite/toolbox',
  title: '常见积分类型速查',
  subtitle: '本章的总纲：**看一眼被积函数，决定用哪一招**。以及那些必须背下来、现推来不及的结论',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'formulas', id: 'basic-table', title: '基本积分表（这些必须是本能）', items: [
      { label: '幂（$\\mu\\ne-1$）', tex: String.raw`\int x^{\mu}\,\mathrm{d}x=\frac{x^{\mu+1}}{\mu+1}+C` },
      { label: '倒数', tex: String.raw`\int\frac{\mathrm{d}x}{x}=\ln\left|x\right|+C` },
      { label: '指数', tex: String.raw`\int a^{x}\,\mathrm{d}x=\frac{a^{x}}{\ln a}+C` },
      { label: '正弦余弦', tex: String.raw`\int\sin x\,\mathrm{d}x=-\cos x+C,\quad\int\cos x\,\mathrm{d}x=\sin x+C` },
      { label: '正切余切', tex: String.raw`\int\tan x\,\mathrm{d}x=-\ln\left|\cos x\right|+C,\quad\int\cot x\,\mathrm{d}x=\ln\left|\sin x\right|+C` },
      { label: '正割余割', tex: String.raw`\int\sec x\,\mathrm{d}x=\ln\left|\sec x+\tan x\right|+C,\quad\int\csc x\,\mathrm{d}x=\ln\left|\csc x-\cot x\right|+C` },
      { label: '平方型', tex: String.raw`\int\sec^{2}x\,\mathrm{d}x=\tan x+C,\quad\int\csc^{2}x\,\mathrm{d}x=-\cot x+C` },
      { label: '反正切', tex: String.raw`\int\frac{\mathrm{d}x}{a^{2}+x^{2}}=\frac{1}{a}\arctan\frac{x}{a}+C` },
      { label: '反正弦', tex: String.raw`\int\frac{\mathrm{d}x}{\sqrt{a^{2}-x^{2}}}=\arcsin\frac{x}{a}+C` },
      { label: '差的倒数', tex: String.raw`\int\frac{\mathrm{d}x}{x^{2}-a^{2}}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C` },
      { label: '根号倒数（对数型）', tex: String.raw`\int\frac{\mathrm{d}x}{\sqrt{x^{2}\pm a^{2}}}=\ln\left|x+\sqrt{x^{2}\pm a^{2}}\right|+C` },
      { label: '根号本身', tex: String.raw`\int\sqrt{a^{2}-x^{2}}\,\mathrm{d}x=\frac{x}{2}\sqrt{a^{2}-x^{2}}+\frac{a^{2}}{2}\arcsin\frac{x}{a}+C` },
    ] },

    { t: 'key', id: 'confuse-three', title: '最容易混的三组', c: String.raw`
      **① 分母有没有根号，答案差一个函数类型**：
      $$\int\frac{\dx}{a^{2}+x^{2}}=\frac1a\arctan\frac xa,\qquad
      \int\frac{\dx}{\sqrt{a^{2}-x^{2}}}=\arcsin\frac xa$$
      $$\int\frac{\dx}{x^{2}-a^{2}}=\frac{1}{2a}\ln\abs{\frac{x-a}{x+a}},\qquad
      \int\frac{\dx}{\sqrt{x^{2}-a^{2}}}=\ln\abs{x+\sqrt{x^{2}-a^{2}}}$$
      ==有根号 $\to$ 反三角或对数；没根号 $\to$ 反正切或对数==。
      **判据：分母能不能因式分解**——能分解就走对数（部分分式），
      不能分解（判别式 $<0$）就走反正切。

      **② $\frac1a$ 那个系数在哪些式子里出现**：
      $\arctan$ 型有 $\frac1a$，==$\arcsin$ 型没有==。
      理由：$\arcsin\frac xa$ 求导已经自带 $\frac1a$ 抵消了。
      ==记不住就求导验一下，五秒钟。==

      **③ 正负号**：$\int\sin=-\cos$、$\int\cos=+\sin$。
      口诀：==从 $\sin$ 出发要变号==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'decision-sec', title: '一、决策流程' },

    { t: 'steps', id: 'decision', title: '拿到一个积分，按顺序问这五句', items: [
      { title: '① 能不能直接查表？',
        c: String.raw`先做==代数化简==：拆项、通分、有理化、三角恒等变形。
                      $\int\frac{x^{2}}{1+x^{2}}\dx$ 拆成 $\int\left(1-\frac{1}{1+x^{2}}\right)\dx$ 就查表了。
                      ==很多题的全部工作就是这一步。==` },
      { title: '② 有没有"内层 + 它的导数"？',
        c: String.raw`有就[凑微分](#/calculus/indefinite/substitution?at=spot)。
                      这是命中率最高的一招，==先扫这一遍==。` },
      { title: '③ 有没有讨厌的根号？',
        c: String.raw`根号里是==一次式==$\to$ 直接令根号为 $t$；
                      是==二次式==$\to$ [三角代换](#/calculus/indefinite/substitution?at=trig-sub)（先配方）。
                      ==但根号外若有奇次幂，回到 ② 凑微分更快。==` },
      { title: '④ 是不是两类函数的乘积？',
        c: String.raw`是就[分部积分](#/calculus/indefinite/by-parts?at=lipet)，
                      按==反对幂指三==选 $u$。
                      指数 $\times$ 三角要走[循环型](#/calculus/indefinite/by-parts?at=recurrence)。` },
      { title: '⑤ 是有理函数或三角有理式吗？',
        c: String.raw`有理函数走[部分分式](#/calculus/indefinite/rational?at=partial-fraction)（==必然成功==）；
                      三角有理式先查[对称性](#/calculus/indefinite/rational?at=trig-rational)，
                      不行再万能代换。` },
    ] },

    { t: 'warn', id: 'algebra-first', title: '被低估的第一步：代数化简', c: String.raw`
      ==相当一部分"难积分"其实只是没化简==。动手用技巧之前先试这几下：

      | 动作 | 例 |
      |---|---|
      | **拆项** | $\frac{x^{2}+1}{x}=x+\frac1x$ |
      | **凑分子** | $\frac{x}{x+1}=1-\frac{1}{x+1}$ |
      | **有理化** | $\frac{1}{\sqrt{x+1}+\sqrt x}=\sqrt{x+1}-\sqrt x$ |
      | **乘以 $1$** | $\frac{1}{\sin x\cos x}$ 分子写成 $\sin^{2}+\cos^{2}$ |
      | **三角降幂** | $\sin^{2}x=\frac{1-\cos2x}{2}$ |
      | **配方** | $x^{2}+2x+5=(x+1)^{2}+4$ |

      =="乘以 $1$"那一行威力最大==：把 $1$ 写成 $\sin^{2}x+\cos^{2}x$、
      $\frac{x+1-x}{1}$、$\frac{e^{x}}{e^{x}}$ 之类，
      ==常常一步就把积分拆成两个能查表的==。

      **例**：$\displaystyle\int\frac{\dx}{\sin x\cos x}
      =\int\frac{\sin^{2}x+\cos^{2}x}{\sin x\cos x}\dx
      =\int\left(\tan x+\cot x\right)\dx=\ln\abs{\tan x}+C.$
    ` },

    /* ================================================================== */
    { t: 'h', id: 'must-know', c: '二、必背结论' },

    { t: 'key', id: 'classics', title: '现推来不及的几个', c: String.raw`
      $$\int\sec^{3}x\dx=\frac12\left(\sec x\tan x+\ln\abs{\sec x+\tan x}\right)+C$$
      $$\int\sqrt{x^{2}+a^{2}}\dx=\frac x2\sqrt{x^{2}+a^{2}}+\frac{a^{2}}{2}\ln\abs{x+\sqrt{x^{2}+a^{2}}}+C$$
      $$\int\sqrt{a^{2}-x^{2}}\dx=\frac x2\sqrt{a^{2}-x^{2}}+\frac{a^{2}}{2}\arcsin\frac xa+C$$
      $$\int e^{ax}\cos bx\dx=\frac{e^{ax}(a\cos bx+b\sin bx)}{a^{2}+b^{2}}+C$$
      $$\int e^{ax}\sin bx\dx=\frac{e^{ax}(a\sin bx-b\cos bx)}{a^{2}+b^{2}}+C$$

      **前三条的结构是一样的**：==半个"代数项" $+$ 半个"超越项"==，
      系数都是 $\frac12$ 和 $\frac{a^{2}}{2}$。
      ==$\sqrt{a^{2}-x^{2}}$ 配 $\arcsin$、$\sqrt{x^{2}+a^{2}}$ 配 $\ln$==，
      与[基本表](#/calculus/indefinite/toolbox?at=basic-table)的对应关系一致。

      **第三条有个几何解释**：$\int_0^a\sqrt{a^{2}-x^{2}}\dx=\frac{\pi a^{2}}{4}$
      是四分之一圆的面积。==代 $x=a$ 进去验证：
      $0+\frac{a^{2}}{2}\cdot\frac\pi2=\frac{\pi a^{2}}{4}$ $\checkmark$==
      **这个验算办法比记公式可靠。**

      **后两条见[循环型例题](#/calculus/indefinite/by-parts?at=ex-cycle)**，
      在[傅里叶系数](#/calculus/series/fourier?at=coefficients)和
      [微分方程特解](#/calculus/ode/linear-const?at=undetermined)里反复出现。
    ` },

    { t: 'key', id: 'cannot', title: '积不出来的那些（考试会绕开）', c: String.raw`
      下列积分==没有初等原函数==（不是你不会做）：
      $$\int e^{-x^{2}}\dx,\quad \int\frac{\sin x}{x}\dx,\quad \int\frac{\dx}{\ln x},
      \quad \int\sqrt{1+x^{4}}\dx,\quad \int\frac{e^{x}}{x}\dx$$

      ==遇到它们说明题目不是让你求原函数==，而是在考别的：

      | 出现场合 | 实际考点 |
      |---|---|
      | $\int_0^{x}e^{-t^{2}}\dt$ | [变限积分求导](#/calculus/definite/variable-limit?at=core)，不必积出来 |
      | $\int_{-\infty}^{+\infty}e^{-x^{2}}\dx$ | [化二重积分算出 $\sqrt\pi$](#/calculus/multi-integral/separable?at=gauss-steps) |
      | $\int_0^1\frac{\sin x}{x}\dx$ | 展成幂级数逐项积分 |
      | 交换积分次序后能积 | [二重积分换序](#/calculus/multi-integral/separable?at=lift) |

      ==看到这些形状，第一反应应该是"换个角度"而不是"再想想技巧"。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-simplify',
      title: '化简优先：三道看着难、其实一步的题',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        计算：
        $$\text{(1)}\ \int\frac{\dx}{1+\cos x}\qquad
        \text{(2)}\ \int\frac{x^{4}}{1+x^{2}}\dx\qquad
        \text{(3)}\ \int\frac{\dx}{\sqrt{x+1}+\sqrt{x}}$$
      `,
      idea: String.raw`
        ==三道题都不需要任何"技巧"，只需要代数化简。==

        **(1)** 分母 $1+\cos x=2\cos^{2}\frac x2$（半角公式），
        整个变成 $\frac12\sec^{2}\frac x2$，==直接查表==。
        （也可以分子分母同乘 $1-\cos x$ 有理化。）

        **(2)** 假分式，==带余除法==。
        $\frac{x^{4}}{1+x^{2}}$：注意 $x^{4}-1=(x^{2}-1)(x^{2}+1)$，
        所以 $x^{4}=(x^{4}-1)+1$，
        $$\frac{x^{4}}{1+x^{2}}=x^{2}-1+\frac{1}{1+x^{2}}.$$
        =="加一项减一项"的老动作。==

        **(3)** ==分母有理化==：同乘 $\sqrt{x+1}-\sqrt x$，
        分母变成 $(x+1)-x=1$，==整个式子化成两个幂函数之差==。

        **共同点**：都是[决策流程第 ① 步](#/calculus/indefinite/toolbox?at=decision)就解决了，
        ==根本轮不到换元和分部==。
      `,
      solution: String.raw`
        **(1)** 由 $1+\cos x=2\cos^{2}\dfrac x2$，
        $$\int\frac{\dx}{1+\cos x}=\frac12\int\sec^{2}\frac x2\dx
        =\frac12\cdot2\tan\frac x2+C=\tan\frac x2+C.$$

        **(2)** 由 $x^{4}=(x^{4}-1)+1=(x^{2}-1)(x^{2}+1)+1$，
        $$\frac{x^{4}}{1+x^{2}}=x^{2}-1+\frac{1}{1+x^{2}},$$
        $$\int\frac{x^{4}}{1+x^{2}}\dx=\frac{x^{3}}{3}-x+\arctan x+C.$$

        **(3)** 分母有理化：
        $$\frac{1}{\sqrt{x+1}+\sqrt x}
        =\frac{\sqrt{x+1}-\sqrt x}{(x+1)-x}=\sqrt{x+1}-\sqrt x,$$
        $$\int\left(\sqrt{x+1}-\sqrt x\right)\dx
        =\frac23(x+1)^{3/2}-\frac23x^{3/2}+C.$$
      `,
      comment: String.raw`
        **(1) 的另一条路（有理化）**：
        $$\frac{1}{1+\cos x}\cdot\frac{1-\cos x}{1-\cos x}
        =\frac{1-\cos x}{\sin^{2}x}=\csc^{2}x-\csc x\cot x,$$
        积得 $-\cot x+\csc x+C$。
        ==两个答案形式不同但只差常数==：
        $\csc x-\cot x=\frac{1-\cos x}{\sin x}=\tan\frac x2$，==完全相同==。
        **不定积分的答案形式不唯一，这很正常，求导验算即可。**

        **(2) 的一般手法**：$\frac{x^{2n}}{1+x^{2}}$ 型一律用
        $x^{2n}=(x^{2n}-1)+1$ 然后对 $x^{2n}-1$ 提取 $(x^{2}+1)$ 因子，
        ==或者直接做长除法==。
        次数高时长除法更稳妥。

        **(3) 的推广**：==凡是"两个根号相加（减）在分母"，一律有理化==。
        $\int\frac{\dx}{\sqrt{x+a}-\sqrt{x+b}}$ 同法，分母变成 $a-b$（常数）。

        **本题的教训值得强调**：
        $$\boxed{\ \text{动用技巧之前，先花十秒钟看能不能化简}\ }$$
        考场上很多人对着 (2) 直接做换元，==绕一大圈还容易错==。
        [化简清单](#/calculus/indefinite/toolbox?at=algebra-first)里那六个动作，
        ==建议做题时按顺序过一遍==。
      `,
    },

    { t: 'example',
      id: 'ex-mixed',
      title: '组合拳：换元开路，分部收尾',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int\frac{\ln\left(1+\sqrt x\right)}{\sqrt x}\dx$。
      `,
      idea: String.raw`
        **先扫[凑微分](#/calculus/indefinite/substitution?at=spot)**：
        $\frac{1}{\sqrt x}\dx=2\d(\sqrt x)$，==这个对子现成==！
        所以第一步一定是令 $t=\sqrt x$。

        换元后：
        $$\int\frac{\ln(1+\sqrt x)}{\sqrt x}\dx=2\int\ln(1+t)\dt,$$
        ==剩下的是"只有一个对数函数"的分部积分==，
        属于[基本型](#/calculus/indefinite/by-parts?at=lipet)。

        **$\int\ln(1+t)\dt$ 的处理**：取 $u=\ln(1+t)$、$\dv=\dt$，
        ==$v$ 取 $1+t$ 而不是 $t$==（[加常数的技巧](#/calculus/indefinite/by-parts?at=tricks)），
        这样 $\int v\du=\int\frac{1+t}{1+t}\dt=\int\dt$，==直接约掉==。

        ==这道题把本章三个技巧串了一遍：凑微分 $\to$ 分部积分 $\to$ 调整 $v$ 的常数。==
      `,
      solution: String.raw`
        令 $t=\sqrt x$，则 $\dfrac{\dx}{\sqrt x}=2\dt$：
        $$\int\frac{\ln(1+\sqrt x)}{\sqrt x}\dx=2\int\ln(1+t)\dt.$$

        分部积分，取 $u=\ln(1+t)$，$\dv=\dt$，$v=1+t$：
        $$\int\ln(1+t)\dt=(1+t)\ln(1+t)-\int(1+t)\cdot\frac{\dt}{1+t}$$
        $$=(1+t)\ln(1+t)-t+C.$$

        故
        $$\int\frac{\ln(1+\sqrt x)}{\sqrt x}\dx
        =2\left[\left(1+\sqrt x\right)\ln\left(1+\sqrt x\right)-\sqrt x\right]+C.$$

        **验算（求导）**：记 $s=\sqrt x$，$\deriv sx=\frac{1}{2\sqrt x}$。
        $$\deriv{}{x}\Bigl\{2\left[(1+s)\ln(1+s)-s\right]\Bigr\}
        =2\left[\ln(1+s)+1-1\right]\cdot\frac{1}{2\sqrt x}
        =\frac{\ln(1+\sqrt x)}{\sqrt x}.\ \checkmark$$
      `,
      comment: String.raw`
        **注意验算里 $(1+s)\ln(1+s)-s$ 对 $s$ 求导的结果恰好是 $\ln(1+s)$**：
        $$\ln(1+s)+(1+s)\cdot\frac{1}{1+s}-1=\ln(1+s)+1-1=\ln(1+s).$$
        ==那个 $+1-1$ 相消，正是"$v$ 取 $1+t$"带来的干净==。
        若取 $v=t$，会得到 $t\ln(1+t)-\int\frac{t}{1+t}\dt$，
        ==还要再做一次带余除法==。

        **这类"套着"的结构的通用策略**：
        $$\boxed{\ \text{被积式含 }f(\sqrt x),\ f(\ln x),\ f(e^{x})\ \Rightarrow\ \text{先令内层为 }t\ }$$
        同型题：
        $\int\frac{e^{\sqrt x}}{\sqrt x}\dx$（凑微分直接出）、
        $\int\frac{\arctan\sqrt x}{\sqrt x(1+x)}\dx$、
        $\int\cos(\ln x)\dx$（换元后是循环型）。

        **本章方法的组合是常态**。真题里单用一招就完的题不多，
        ==大多是"化简 + 换元 + 分部"两三招接力==。
        判断的依据始终是[那五个问题](#/calculus/indefinite/toolbox?at=decision)，
        ==每化简一步就重新问一遍==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '本章通用失分点', c: String.raw`
      1. **忘了 $+C$**：==每道不定积分都要写==。
      2. **$\ln$ 忘绝对值**：$\int\frac{\dx}{x}=\ln\abs x+C$。
      3. **$\arctan$ 型漏 $\frac1a$**：$\int\frac{\dx}{a^{2}+x^{2}}=\frac1a\arctan\frac xa$，
         而 $\arcsin$ 型==没有这个系数==。
      4. **不化简就上技巧**：[六个化简动作](#/calculus/indefinite/toolbox?at=algebra-first)先过一遍。
      5. **假分式直接部分分式**：先带余除法。
      6. **换元后不换回**：不定积分==答案必须是 $x$ 的函数==。
      7. **凑微分系数不配平**：$x\dx=\frac12\d(x^{2})$。
      8. **循环型不移项**：见[分部积分](#/calculus/indefinite/by-parts?at=recurrence)。
      9. **对积不出来的函数死磕**：[认出那几个](#/calculus/indefinite/toolbox?at=cannot)，换思路。
      10. **不验算**：==求导一次就能确认==，不定积分独有的便利，别浪费。
    ` },

  ],
});
