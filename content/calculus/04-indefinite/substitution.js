/* ==========================================================================
   高等数学 / 4 不定积分 / 换元法（凑微分 / 三角代换）
   —— 积分的第一主力。分部积分见 indefinite/by-parts；
      有理式见 indefinite/rational；总决策见 indefinite/toolbox。
   ========================================================================== */

KM.page({
  path: 'calculus/indefinite/substitution',
  title: '换元法（凑微分 / 三角代换）',
  subtitle: '积分不像求导有固定算法，只能**凑**。换元法的全部工作是：把被积式里的一块认成 $\\d(\\text{某个东西})$',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'why-hard', title: '为什么积分比求导难：方向反了', c: String.raw`
      求导有算法：任何初等函数按四则运算与链式法则==机械地==就能求出来。
      积分没有——它是==求导的反向搜索==，只能靠"认出来"。

      $$\text{求导}:\ f\ \longrightarrow\ f'\quad(\text{确定的流程})$$
      $$\text{积分}:\ f\ \longrightarrow\ ?\quad(\text{找一个 }F\text{ 使 }F'=f)$$

      ==所以整章的技巧本质上都是"把被积式变形成某个已知导数的样子"==。
      三大方法各对应一条求导法则的逆用：

      | 方法 | 逆用哪条求导法则 |
      |---|---|
      | ==换元法==（本页） | 链式法则 $\bigl[F(\varphi(x))\bigr]'=F'(\varphi)\varphi'(x)$ |
      | [分部积分](#/calculus/indefinite/by-parts?at=core) | 乘积法则 $(uv)'=u'v+uv'$ |
      | [有理函数拆分](#/calculus/indefinite/rational?at=partial-fraction) | 分式的加法 |

      **还有一件事要接受**：==不是所有初等函数都有初等原函数==。
      $\int e^{-x^{2}}\dx$、$\int\frac{\sin x}{x}\dx$、$\int\frac{\dx}{\ln x}$ ==都积不出来==。
      考试不会让你积这些，==但会让你在定积分里绕开它们==
      （见[变限积分](#/calculus/definite/variable-limit?at=cannot-integrate)）。
    ` },

    { t: 'key', id: 'core', title: '两类换元：方向相反', c: String.raw`
      **第一类换元（凑微分）**：把 $\varphi(x)$ 看成新变量 $u$。
      $$\int f\bigl(\varphi(x)\bigr)\varphi'(x)\dx
      \ \xlongequal{u=\varphi(x)}\ \int f(u)\du$$
      ==从左往右：把 $\varphi'(x)\dx$ 收进 $\d\varphi(x)$==。
      **这是主力，用得最多。**

      **第二类换元（代换）**：把 $x$ 表示成新变量的函数。
      $$\int f(x)\dx\ \xlongequal{x=\psi(t)}\ \int f\bigl(\psi(t)\bigr)\psi'(t)\dt$$
      ==从右往左：主动把 $x$ 换掉==，用来消根号。
      **要求 $\psi$ 单调可导，最后必须换回 $x$。**

      $$\boxed{\ \text{凑微分}:\ \text{式子里已经有 }\varphi'(x);\qquad
      \text{代换}:\ \text{式子里有讨厌的根号}\ }$$

      **判断用哪个的一句话**：
      ==看到"某个函数和它的导数同时出现"就凑微分；
      看到根号里是二次式就三角代换。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'first-kind', c: '一、凑微分：认出 $\\d(\\ \\cdot\\ )$' },

    { t: 'formulas', id: 'common-du', title: '最常用的凑法（要背到条件反射）', items: [
      { label: '幂', tex: String.raw`x^{n}\,\mathrm{d}x=\frac{1}{n+1}\,\mathrm{d}\!\left(x^{n+1}\right)` },
      { label: '倒数', tex: String.raw`\frac{\mathrm{d}x}{x}=\mathrm{d}(\ln x)` },
      { label: '根号', tex: String.raw`\frac{\mathrm{d}x}{\sqrt{x}}=2\,\mathrm{d}\!\left(\sqrt{x}\right)` },
      { label: '指数', tex: String.raw`e^{x}\,\mathrm{d}x=\mathrm{d}\!\left(e^{x}\right)` },
      { label: '正弦', tex: String.raw`\sin x\,\mathrm{d}x=-\,\mathrm{d}(\cos x)` },
      { label: '余弦', tex: String.raw`\cos x\,\mathrm{d}x=\mathrm{d}(\sin x)` },
      { label: '正切', tex: String.raw`\sec^{2}x\,\mathrm{d}x=\mathrm{d}(\tan x)` },
      { label: '反正切', tex: String.raw`\frac{\mathrm{d}x}{1+x^{2}}=\mathrm{d}(\arctan x)` },
      { label: '反正弦', tex: String.raw`\frac{\mathrm{d}x}{\sqrt{1-x^{2}}}=\mathrm{d}(\arcsin x)` },
      { label: '平移伸缩（万能）', tex: String.raw`\mathrm{d}x=\frac{1}{a}\,\mathrm{d}(ax+b)` },
    ] },

    { t: 'method', id: 'spot', title: '怎么看出该凑什么', c: String.raw`
      **扫描被积式，找"一对"**：一个复合函数的==内层==，和它的==导数==。

      | 看到 | 凑成 | 例 |
      |---|---|---|
      | $f(\ln x)\cdot\frac1x$ | $\d(\ln x)$ | $\int\frac{\ln x}{x}\dx=\frac12\ln^{2}x+C$ |
      | $f(e^{x})\cdot e^{x}$ | $\d(e^{x})$ | $\int\frac{e^{x}}{1+e^{2x}}\dx=\arctan e^{x}+C$ |
      | $f(\sin x)\cdot\cos x$ | $\d(\sin x)$ | $\int\sin^{3}x\cos x\dx=\frac14\sin^{4}x+C$ |
      | $f(x^{2})\cdot x$ | $\frac12\d(x^{2})$ | $\int xe^{x^{2}}\dx=\frac12e^{x^{2}}+C$ |
      | $f(\arctan x)\cdot\frac{1}{1+x^{2}}$ | $\d(\arctan x)$ | |
      | $f(\sqrt x)\cdot\frac{1}{\sqrt x}$ | $2\d(\sqrt x)$ | |

      ==口诀：内层的导数在外面，就能凑。==

      **奇次幂的三角积分有专门凑法**：
      $$\int\sin^{2k+1}x\,\cos^{n}x\dx:\ \text{留一个}\ \sin x\ \text{凑}\ \d(\cos x),
      \ \text{其余用}\ \sin^{2}=1-\cos^{2}$$
      ==哪个是奇次幂就"借"它一个出来凑微分==，
      两个都是偶次幂时改用[倍角公式降幂](#/calculus/indefinite/rational?at=trig-rational)。

      **一个高频的凑法**：分母是二次式时先==配方==
      $$\int\frac{\dx}{x^{2}+2x+5}=\int\frac{\d(x+1)}{(x+1)^{2}+4}
      =\frac12\arctan\frac{x+1}{2}+C.$$
      ==配方 + 平移，把一切二次分母化成 $u^{2}\pm a^{2}$。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'second-kind', c: '二、第二类换元：消根号' },

    { t: 'compare',
      id: 'trig-sub',
      title: '三角代换：三种根号，三个三角形',
      cols: ['根号', '代换', '依据的恒等式', '$\\d x$'],
      rows: [
        ['$\\sqrt{a^{2}-x^{2}}$', '$x=a\\sin t$', '$1-\\sin^{2}=\\cos^{2}$', '$a\\cos t\\,\\mathrm{d}t$'],
        ['$\\sqrt{a^{2}+x^{2}}$', '$x=a\\tan t$', '$1+\\tan^{2}=\\sec^{2}$', '$a\\sec^{2}t\\,\\mathrm{d}t$'],
        ['$\\sqrt{x^{2}-a^{2}}$', '$x=a\\sec t$', '$\\sec^{2}-1=\\tan^{2}$', '$a\\sec t\\tan t\\,\\mathrm{d}t$'],
      ] },

    { t: 'method', id: 'trig-steps', title: '三角代换四步，第四步最容易丢分', c: String.raw`
      1. **认根号，选代换**（照上表）；
      2. **换元**：$x$、$\dx$、根号全部换成 $t$ 的式子，==根号必须化干净==；
      3. **算出关于 $t$ 的积分**；
      4. ==**换回 $x$**==——画一个直角三角形，把 $\sin t,\cos t,\tan t$ 全部用 $x$ 表示。

      **第 4 步的辅助三角形**（以 $x=a\sin t$ 为例）：
      $$\sin t=\frac xa\ \Longrightarrow\
      \text{对边}=x,\ \text{斜边}=a,\ \text{邻边}=\sqrt{a^{2}-x^{2}},$$
      于是 $\cos t=\frac{\sqrt{a^{2}-x^{2}}}{a}$，$\tan t=\frac{x}{\sqrt{a^{2}-x^{2}}}$。

      ==不定积分的答案里绝不能残留 $t$==，这是最常见的扣分点。
      （定积分则可以==换限不换回==，见[定积分的换元](#/calculus/definite/properties?at=substitution-limits)，
      ==那样能省掉整个第 4 步==。）

      **两条能省掉三角代换的捷径**：

      - ==根号里是一次式==（如 $\sqrt{2x+1}$）：直接令 $t=\sqrt{2x+1}$，
        ==比三角代换简单得多==；
      - ==根式外还有 $x$ 的奇次幂==：先凑微分，
        比如 $\int x\sqrt{1-x^{2}}\dx=-\frac12\int\sqrt{1-x^{2}}\,\d(1-x^{2})$，
        ==根本不用换元==。

      ==动手前先看这两条，能避开大量三角运算。==
    ` },

    { t: 'key', id: 'other-subs', title: '另外两种代换', c: String.raw`
      **① 根式代换**：根号里是==一次式==或整体好解时，直接令根号为 $t$。
      $$\int\frac{\dx}{1+\sqrt{x}}\ \xlongequal{t=\sqrt x,\ x=t^{2},\ \dx=2t\dt}\
      \int\frac{2t\dt}{1+t}=2\int\left(1-\frac{1}{1+t}\right)\dt.$$
      ==这类换元把无理式变成有理式==，接着用[有理函数的方法](#/calculus/indefinite/rational?at=partial-fraction)。

      **两个根号不同次时取最小公倍数**：
      $\int\frac{\dx}{\sqrt x+\sqrt[3]x}$ 令 $x=t^{6}$（$6=\operatorname{lcm}(2,3)$）。

      **② 倒代换** $x=\dfrac1t$：==分母次数比分子高很多==时好用。
      $$\int\frac{\dx}{x\sqrt{x^{2}-1}}\ \xlongequal{x=1/t}\
      -\int\frac{\dt}{\sqrt{1-t^{2}}}=-\arcsin\frac1x+C.$$
      ==识别信号：分母是 $x^{n}\sqrt{\cdots}$ 且 $n$ 较大。==

      **注意倒代换要分区间讨论**（$x>0$ 与 $x<0$ 时 $\sqrt{x^{2}}=\abs x$ 的符号不同），
      ==考研中通常默认在某一侧==，但写解答时最好交代一句。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-spot',
      title: '凑微分：四个小题练"认对子"',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        计算下列不定积分：
        $$\text{(1)}\ \int\frac{\dx}{x\ln x}\qquad
        \text{(2)}\ \int\frac{\dx}{x^{2}+4x+13}$$
        $$\text{(3)}\ \int\tan^{3}x\sec x\dx\qquad
        \text{(4)}\ \int\frac{\arctan x}{1+x^{2}}\dx$$
      `,
      idea: String.raw`
        **逐个找"内层 + 它的导数"这对搭档**：

        **(1)** $\frac1x$ 是 $\ln x$ 的导数 $\Rightarrow$ 凑 $\d(\ln x)$，
        剩下 $\frac{1}{\ln x}$，==整个变成 $\int\frac{\du}{u}$==。

        **(2)** 分母是二次式且判别式为负（$16-52<0$，无实根）$\Rightarrow$
        ==配方== $x^{2}+4x+13=(x+2)^{2}+9$，凑成 $\arctan$ 型。

        **(3)** 有 $\sec$ 有 $\tan$，回忆 $(\sec x)'=\sec x\tan x$。
        ==把 $\tan^{3}x\sec x$ 拆成 $\tan^{2}x\cdot(\sec x\tan x)$==，
        后一块正好是 $\d(\sec x)$，前一块用 $\tan^{2}=\sec^{2}-1$ 换成 $\sec$ 的函数。

        **(4)** $\frac{1}{1+x^{2}}$ 是 $\arctan x$ 的导数 $\Rightarrow$ 凑 $\d(\arctan x)$，
        ==整个变成 $\int u\du$==。
      `,
      solution: String.raw`
        **(1)**
        $$\int\frac{\dx}{x\ln x}=\int\frac{\d(\ln x)}{\ln x}=\ln\abs{\ln x}+C.$$

        **(2)** 配方 $x^{2}+4x+13=(x+2)^{2}+3^{2}$，
        $$\int\frac{\d(x+2)}{(x+2)^{2}+3^{2}}=\frac13\arctan\frac{x+2}{3}+C.$$

        **(3)**
        $$\int\tan^{3}x\sec x\dx=\int\tan^{2}x\cdot\sec x\tan x\dx
        =\int\left(\sec^{2}x-1\right)\d(\sec x)$$
        $$=\frac{\sec^{3}x}{3}-\sec x+C.$$

        **(4)**
        $$\int\frac{\arctan x}{1+x^{2}}\dx=\int\arctan x\,\d(\arctan x)
        =\frac{1}{2}\arctan^{2}x+C.$$
      `,
      comment: String.raw`
        **四道题共用一个动作**：把被积式看成 $f(u)\du$ 的形状。
        ==难点从来不是积分，而是"看出 $u$ 是谁"==。

        **训练方法**：拿到一个积分先问=="式子里哪个函数的导数也在场？"==
        (1) 是 $\ln x$、(3) 是 $\sec x$、(4) 是 $\arctan x$。
        (2) 没有现成的对子，==所以要先配方造一个==。

        **(1) 的绝对值不能丢**：$\int\frac{\du}{u}=\ln\abs u+C$，
        ==写成 $\ln u$ 在 $u<0$ 时就错了==。
        本题 $\ln x$ 可正可负（$x$ 在 $1$ 两侧），==绝对值是必要的==。

        **(3) 的一般规律**：$\int\tan^{m}x\sec^{n}x\dx$

        | 情形 | 凑法 |
        |---|---|
        | $n$ 为==偶数== | 留 $\sec^{2}x$ 凑 $\d(\tan x)$，其余用 $\sec^{2}=1+\tan^{2}$ |
        | $m$ 为==奇数== | 留 $\sec x\tan x$ 凑 $\d(\sec x)$，其余用 $\tan^{2}=\sec^{2}-1$ |
        | $m$ 偶 $n$ 奇 | ==最难==，要用[分部积分递推](#/calculus/indefinite/by-parts?at=recurrence) |

        本题 $m=3$ 是奇数，走第二行。

        **(4) 的推广**：$\int f(u)\du$ 中 $f(u)=u$ 给出 $\frac{u^{2}}{2}$。
        把 $\arctan x$ 换成 $\arcsin x$、$\ln x$ 同理，
        ==只要外面那一坨恰好是它的导数==。
      `,
    },

    { t: 'example',
      id: 'ex-trig-sub',
      title: '三角代换：完整走一遍四步',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int\frac{\dx}{x^{2}\sqrt{x^{2}+1}}$。
      `,
      idea: String.raw`
        **根号里是 $x^{2}+a^{2}$ 型（$a=1$）$\Rightarrow$ 令 $x=\tan t$**，
        依据 $1+\tan^{2}t=\sec^{2}t$，==根号能开干净==。

        **但先检查有没有捷径**：分母是 $x^{2}\sqrt{\cdots}$，
        $x$ 的次数较高，==[倒代换](#/calculus/indefinite/substitution?at=other-subs)也可行==。
        两条路都走得通，下面用三角代换（更通用），
        点评里给倒代换的对照。

        **换元后会出现什么**：
        $$\dx=\sec^{2}t\dt,\quad \sqrt{x^{2}+1}=\sec t,\quad x^{2}=\tan^{2}t,$$
        $$\Rightarrow\ \int\frac{\sec^{2}t\dt}{\tan^{2}t\cdot\sec t}
        =\int\frac{\sec t}{\tan^{2}t}\dt.$$
        ==化成 $\sin,\cos$ 会更清楚==：
        $\frac{\sec t}{\tan^{2}t}=\frac{1/\cos t}{\sin^{2}t/\cos^{2}t}=\frac{\cos t}{\sin^{2}t}$，
        ==这一步之后就是凑微分 $\d(\sin t)$ 了==。

        **别忘了第四步**：答案里不能有 $t$，用辅助三角形换回去。
      `,
      solution: String.raw`
        令 $x=\tan t$，$t\in\left(-\frac\pi2,\frac\pi2\right)$，则
        $$\dx=\sec^{2}t\dt,\qquad \sqrt{x^{2}+1}=\sqrt{\sec^{2}t}=\sec t\ (>0).$$

        代入：
        $$\int\frac{\dx}{x^{2}\sqrt{x^{2}+1}}
        =\int\frac{\sec^{2}t}{\tan^{2}t\cdot\sec t}\dt
        =\int\frac{\sec t}{\tan^{2}t}\dt
        =\int\frac{\cos t}{\sin^{2}t}\dt.$$

        凑微分：
        $$=\int\frac{\d(\sin t)}{\sin^{2}t}=-\frac{1}{\sin t}+C.$$

        **换回 $x$**：由 $\tan t=x$ 作直角三角形，
        对边 $x$、邻边 $1$、斜边 $\sqrt{x^{2}+1}$，故
        $$\sin t=\frac{x}{\sqrt{x^{2}+1}}\ \Longrightarrow\
        \frac{1}{\sin t}=\frac{\sqrt{x^{2}+1}}{x}.$$

        故
        $$\int\frac{\dx}{x^{2}\sqrt{x^{2}+1}}=-\frac{\sqrt{x^{2}+1}}{x}+C.$$

        **验算（求导）**：
        $$\left(-\frac{\sqrt{x^{2}+1}}{x}\right)'
        =-\frac{\frac{x}{\sqrt{x^{2}+1}}\cdot x-\sqrt{x^{2}+1}}{x^{2}}
        =-\frac{\frac{x^{2}-(x^{2}+1)}{\sqrt{x^{2}+1}}}{x^{2}}
        =\frac{1}{x^{2}\sqrt{x^{2}+1}}.\ \checkmark$$
      `,
      comment: String.raw`
        ==不定积分永远可以求导验算==，成本很低。
        本题验算只用了一次商法则就对上了，==建议每道换元题都验==。

        **倒代换的对照解法**（更快）：令 $x=\frac1t$，$\dx=-\frac{\dt}{t^{2}}$，
        $$\int\frac{-\dt/t^{2}}{\frac{1}{t^{2}}\sqrt{\frac{1}{t^{2}}+1}}
        =-\int\frac{\dt}{\sqrt{\frac{1+t^{2}}{t^{2}}}}
        =-\int\frac{\abs t\dt}{\sqrt{1+t^{2}}}.$$
        在 $x>0$（即 $t>0$）时 $=-\sqrt{1+t^{2}}+C=-\frac{\sqrt{x^{2}+1}}{x}+C$，==结果相同==。
        ==倒代换少了"换回三角函数"这一步，但要讨论符号==，各有代价。

        **$\sec t>0$ 那一步不能省**：
        $\sqrt{\sec^{2}t}=\abs{\sec t}$，只有说明了 $t\in(-\frac\pi2,\frac\pi2)$
        才能去掉绝对值。==这是三角代换里最常被略过、但阅卷会看的一步==。
        对 $x=a\sec t$ 型尤其要小心（$\tan t$ 的符号依赖 $t$ 的区间）。

        **同型题速查**：
        $$\int\frac{\dx}{x^{2}\sqrt{x^{2}-1}}=\frac{\sqrt{x^{2}-1}}{x}+C,\qquad
        \int\frac{\dx}{x^{2}\sqrt{1-x^{2}}}=-\frac{\sqrt{1-x^{2}}}{x}+C.$$
        ==三个答案形状一样，只是根号内容和符号不同==，可以一起记。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **忘了 $+C$**：==不定积分是一族函数==，漏了直接扣分。
      2. **$\int\frac{\du}{u}$ 写成 $\ln u$**：必须是 ==$\ln\abs u$==。
      3. **三角代换后不换回 $x$**：==不定积分的答案不能含 $t$==。
      4. **开根号不讨论符号**：$\sqrt{\sec^{2}t}=\abs{\sec t}$，
         ==要先声明 $t$ 的范围==才能去绝对值。
      5. **凑微分时系数不配平**：$x\dx=\frac12\d(x^{2})$，==那个 $\frac12$ 常被漏掉==。
      6. **该走捷径却硬做三角代换**：根号里是一次式用[根式代换](#/calculus/indefinite/substitution?at=other-subs)，
         根号外有奇次幂直接凑微分。
      7. **第二类换元不验单调**：$x=\psi(t)$ ==必须单调==才能换回去。
      8. **算完不验算**：==求导一次就能确认==，这是不定积分独有的便利。
    ` },

  ],
});
