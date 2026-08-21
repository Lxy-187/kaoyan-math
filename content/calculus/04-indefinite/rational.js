/* ==========================================================================
   高等数学 / 4 不定积分 / 有理函数与三角有理式
   —— 唯一有"算法"的一类积分：拆成部分分式，逐项积。
      跨章节的拆分手法见 threads/lines/rational。
   ========================================================================== */

KM.page({
  path: 'calculus/indefinite/rational',
  title: '有理函数与三角有理式',
  subtitle: '有理函数是**唯一保证能积出来**的一类。代价是拆分很烦——但它有确定的算法，不用碰运气',
  tags: ['小题', '计算题'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'guarantee', title: '为什么这一节特殊：它有算法', c: String.raw`
      [换元](#/calculus/indefinite/substitution?at=core)和[分部积分](#/calculus/indefinite/by-parts?at=core)
      都要"看出来"，==有理函数不用==：

      $$\boxed{\ \text{任何有理函数 }\frac{P(x)}{Q(x)}\ \text{都能积出初等原函数}\ }$$

      而且过程是==完全机械==的：

      1. 若是假分式，==带余除法==化成"多项式 $+$ 真分式"；
      2. 分母因式分解；
      3. 真分式拆成==部分分式==；
      4. 逐项积——==只会遇到四种基本型==。

      **代价是拆分的计算量**。所以考场上要==先看有没有捷径==
      （凑微分、对称性），实在没有再走这套流程。

      **它的下游很广**：三角有理式经万能代换变成有理函数、
      根式代换后也变成有理函数、
      [幂级数的部分分式展开](#/threads/lines/rational?at=to-power-series)、
      [裂项相消](#/threads/lines/rational?at=telescoping)——
      ==都是这一节的算法在别处的化身==。
    ` },

    { t: 'key', id: 'long-division', title: '第一步：真分式化', c: String.raw`
      ==部分分式分解只对真分式（分子次数 $<$ 分母次数）有效==。
      假分式必须先做带余除法：
      $$\frac{x^{2}}{1+x^{2}}=1-\frac{1}{1+x^{2}},\qquad
      \frac{x^{3}}{x^{2}-1}=x+\frac{x}{x^{2}-1}.$$

      **快速做法（凑分子）**：不必真的做长除法，
      ==在分子上加减一项凑出分母==：
      $$\frac{x^{2}}{1+x^{2}}=\frac{(x^{2}+1)-1}{1+x^{2}}=1-\frac{1}{1+x^{2}}.$$
      ==这个"加一项减一项"的动作在整门课里到处都是==，练熟很划算。

      **忘了这一步的后果**：直接对假分式设待定系数，
      ==方程组会无解或解出矛盾==，白算一遍。
      **动手前先比一下分子分母的次数。**
    ` },

    { t: 'compare',
      id: 'partial-fraction',
      title: '★ 部分分式：分母的每种因式配什么',
      cols: ['分母中的因式', '配几项', '形状'],
      rows: [
        ['单重一次 $(x-a)$', '$1$ 项', '$\\dfrac{A}{x-a}$'],
        ['$k$ 重一次 $(x-a)^{k}$', '==$k$ 项==', '$\\dfrac{A_1}{x-a}+\\dfrac{A_2}{(x-a)^{2}}+\\cdots+\\dfrac{A_k}{(x-a)^{k}}$'],
        ['单重二次 $x^{2}+px+q$（无实根）', '$1$ 项', '$\\dfrac{Bx+C}{x^{2}+px+q}$（==分子是一次式==）'],
        ['$k$ 重二次', '$k$ 项', '$\\displaystyle\\sum_{j=1}^{k}\\dfrac{B_jx+C_j}{(x^{2}+px+q)^{j}}$'],
      ] },

    { t: 'method', id: 'find-coef', title: '定系数：两个技巧比通分快得多', c: String.raw`
      **① 赋值法（遮盖法）**——专治单重一次因式。
      要求 $\dfrac{P(x)}{(x-a)\cdots}$ 中 $\dfrac{A}{x-a}$ 的 $A$：
      $$\boxed{\ A=\left.\frac{P(x)}{Q(x)/(x-a)}\right|_{x=a}\ }$$
      ==口语说法：把分母里的 $(x-a)$ 遮住，其余部分代入 $x=a$==。

      **例**：$\dfrac{1}{(x-1)(x-2)}=\dfrac{A}{x-1}+\dfrac{B}{x-2}$，
      $$A=\left.\frac{1}{x-2}\right|_{x=1}=-1,\qquad
      B=\left.\frac{1}{x-1}\right|_{x=2}=1.$$
      ==两秒钟，完全不用通分解方程组==。

      **② 特殊值代入**——对二次因式或重根，
      通分后令 $x$ 取几个方便的值（$0,1,-1$）列方程，
      ==比展开对比系数快==。

      **③ 对比系数**——最后的手段，把等式两边同次幂系数对齐。
      ==只在前两招不够用时才动用==。

      **实战顺序**：先用遮盖法把所有单重一次的系数秒掉，
      ==剩下的未知数往往只有一两个==，再代两个特殊值即可。

      **验算**：取一个未用过的 $x$（比如 $x=3$）代入原式与拆开后的式子，
      ==两边相等才算拆对==。这一步很值。
    ` },

    { t: 'formulas', id: 'four-types', title: '拆完之后只会遇到这四种', items: [
      { label: '一次单重', tex: String.raw`\int\frac{\mathrm{d}x}{x-a}=\ln\left|x-a\right|+C` },
      { label: '一次重根', tex: String.raw`\int\frac{\mathrm{d}x}{(x-a)^{n}}=\frac{(x-a)^{1-n}}{1-n}+C\quad(n\ge2)` },
      { label: '二次（凑对数）', tex: String.raw`\int\frac{2x+p}{x^{2}+px+q}\,\mathrm{d}x=\ln\left|x^{2}+px+q\right|+C` },
      { label: '二次（凑反正切）', tex: String.raw`\int\frac{\mathrm{d}x}{x^{2}+a^{2}}=\frac{1}{a}\arctan\frac{x}{a}+C` },
    ] },

    { t: 'md', c: String.raw`
      **二次分母的通用处理是"拆成两块"**：
      $$\frac{Bx+C}{x^{2}+px+q}=\frac{B}{2}\cdot\frac{2x+p}{x^{2}+px+q}
      +\frac{C-\frac{Bp}{2}}{x^{2}+px+q}$$
      ==前一块凑对数（分子恰是分母的导数），后一块配方后凑反正切==。
      **这个"先凑出分母的导数、余下的配方"的动作是固定套路。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'trig', c: '一、三角有理式' },

    { t: 'key', id: 'trig-rational', title: '先试三招，万能代换放最后', c: String.raw`
      $\int R(\sin x,\cos x)\dx$ 有一个==万能代换== $t=\tan\frac x2$：
      $$\sin x=\frac{2t}{1+t^{2}},\quad \cos x=\frac{1-t^{2}}{1+t^{2}},\quad
      \dx=\frac{2\dt}{1+t^{2}}$$
      ==代进去必然变成有理函数==，所以一定能积出来。

      **但它通常算得很惨**（分母会变成高次多项式），
      ==所以放在最后==。先按下表试三招：

      | 被积式的对称性 | 换元 | 判据 |
      |---|---|---|
      | 关于 $\sin x$ 是==奇函数== | $u=\cos x$ | $R(-\sin,\cos)=-R$ |
      | 关于 $\cos x$ 是==奇函数== | $u=\sin x$ | $R(\sin,-\cos)=-R$ |
      | 关于两者==同时变号不变== | $u=\tan x$ | $R(-\sin,-\cos)=R$ |
      | 都不满足 | ==万能代换== $t=\tan\frac x2$ | 兜底 |

      ==前三招本质就是[凑微分](#/calculus/indefinite/substitution?at=spot)==：
      奇次幂那一项"借"一个出来配成 $\d(\cos x)$ 或 $\d(\sin x)$。

      **偶次幂用降幂公式**：
      $$\sin^{2}x=\frac{1-\cos2x}{2},\qquad \cos^{2}x=\frac{1+\cos2x}{2}$$
      ==$\int\sin^{2}x\dx$、$\int\cos^{4}x\dx$ 这类一律先降幂==，
      不要用万能代换。

      **必背的两条**：
      $$\int\tan x\dx=-\ln\abs{\cos x}+C,\qquad
      \int\sec x\dx=\ln\abs{\sec x+\tan x}+C.$$
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-partial',
      title: '部分分式：遮盖法的威力',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int\frac{x+3}{x^{3}-x^{2}-2x}\dx$。
      `,
      idea: String.raw`
        **先看次数**：分子 $1$ 次、分母 $3$ 次，==是真分式，不用带余除法==。

        **因式分解分母**：
        $$x^{3}-x^{2}-2x=x(x^{2}-x-2)=x(x-2)(x+1),$$
        ==三个不同的单重一次因式==——这是最好的情形，
        [遮盖法](#/calculus/indefinite/rational?at=find-coef)可以把三个系数全部秒掉。

        **设**
        $$\frac{x+3}{x(x-2)(x+1)}=\frac Ax+\frac{B}{x-2}+\frac{C}{x+1}.$$

        遮盖法：
        $A=\left.\frac{x+3}{(x-2)(x+1)}\right|_{x=0}$，
        $B=\left.\frac{x+3}{x(x+1)}\right|_{x=2}$，
        $C=\left.\frac{x+3}{x(x-2)}\right|_{x=-1}$。

        ==三个代入，完全不用通分==。
      `,
      solution: String.raw`
        分母分解：$x^{3}-x^{2}-2x=x(x-2)(x+1)$。设
        $$\frac{x+3}{x(x-2)(x+1)}=\frac Ax+\frac{B}{x-2}+\frac{C}{x+1}.$$

        **遮盖法定系数**：
        $$A=\left.\frac{x+3}{(x-2)(x+1)}\right|_{x=0}=\frac{3}{(-2)(1)}=-\frac32,$$
        $$B=\left.\frac{x+3}{x(x+1)}\right|_{x=2}=\frac{5}{2\cdot3}=\frac56,$$
        $$C=\left.\frac{x+3}{x(x-2)}\right|_{x=-1}=\frac{2}{(-1)(-3)}=\frac23.$$

        **验算**（取 $x=1$）：
        原式 $=\frac{4}{1\cdot(-1)\cdot2}=-2$；
        拆开 $=-\frac32+\frac56\cdot\frac{1}{-1}+\frac23\cdot\frac12
        =-\frac32-\frac56+\frac13=-\frac{9+5-2}{6}=-2\ \checkmark$

        **逐项积分**：
        $$\int\frac{x+3}{x^{3}-x^{2}-2x}\dx
        =-\frac32\ln\abs x+\frac56\ln\abs{x-2}+\frac23\ln\abs{x+1}+C.$$
      `,
      comment: String.raw`
        **遮盖法为什么成立**：把等式两边同乘 $(x-a)$，
        $$\frac{P(x)}{Q(x)/(x-a)}=A+(x-a)\left(\text{其余项}\right),$$
        ==令 $x\to a$ 时右边只剩 $A$==。
        所以它只对==单重==因式有效——重根时 $(x-a)$ 消不干净。

        **重根怎么办**：$\frac{1}{(x-1)^{2}(x+1)}=\frac{A}{x-1}+\frac{B}{(x-1)^{2}}+\frac{C}{x+1}$，
        遮盖法能直接给出 $B$（乘 $(x-1)^{2}$ 后令 $x=1$）和 $C$，
        ==但 $A$ 拿不到==，要靠代一个特殊值或对比最高次系数。
        ==经验：$A$ 常用"令 $x\to\infty$ 比较 $\frac1x$ 的系数"最快==。

        **验算那一步强烈建议保留**。部分分式的系数是纯计算，
        ==代一个数三十秒就能确认==，比事后发现积错了划算得多。

        **答案形式的检查**：三个系数之和应当为 $0$
        （因为原式 $\sim\frac{1}{x^{2}}$ 衰减，而 $\sum\frac{A_i}{x-a_i}\sim\frac{\sum A_i}{x}$）。
        本题 $-\frac32+\frac56+\frac23=\frac{-9+5+4}{6}=0\ \checkmark$
        ==这是一个几乎免费的自检，凡是"分子次数比分母低 $2$ 次以上"都能用。==
      `,
    },

    { t: 'example',
      id: 'ex-trig',
      title: '三角有理式：先找对称性，别急着万能代换',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int\frac{\dx}{\sin x\,(1+\cos x)}$。
      `,
      idea: String.raw`
        **先查[对称性](#/calculus/indefinite/rational?at=trig-rational)**：
        记 $R(\sin x,\cos x)=\frac{1}{\sin x(1+\cos x)}$。
        $$R(-\sin x,\cos x)=-R(\sin x,\cos x),$$
        ==关于 $\sin x$ 是奇函数 $\Rightarrow$ 令 $u=\cos x$==。

        **怎么凑**：分子分母同乘 $\sin x$，
        $$\frac{\dx}{\sin x(1+\cos x)}=\frac{\sin x\dx}{\sin^{2}x(1+\cos x)}
        =\frac{-\d(\cos x)}{(1-\cos^{2}x)(1+\cos x)}.$$
        ==$\sin^{2}x$ 换成 $1-\cos^{2}x$ 之后全是 $\cos x$ 的有理式==，
        变成 $u$ 的有理函数，接[部分分式](#/calculus/indefinite/rational?at=partial-fraction)。

        **分母的因式分解**：$(1-u^{2})(1+u)=(1-u)(1+u)^{2}$，
        ==有一个二重因式==，遮盖法只能给出部分系数。

        **对照：万能代换会怎样**？令 $t=\tan\frac x2$ 时
        $$\sin x(1+\cos x)=\frac{2t}{1+t^{2}}\cdot\frac{2}{1+t^{2}}=\frac{4t}{(1+t^{2})^{2}},$$
        $$\int\frac{(1+t^{2})^{2}}{4t}\cdot\frac{2\dt}{1+t^{2}}=\frac12\int\frac{1+t^{2}}{t}\dt,$$
        ==竟然非常简单==！这道题万能代换反而更快。
        ==所以"万能代换最后用"是经验而非铁律，遇到 $1+\cos x$ 这种半角友好的结构要留个心眼。==
      `,
      solution: String.raw`
        **解法（万能代换，本题更快）**：令 $t=\tan\dfrac x2$，则
        $$\sin x=\frac{2t}{1+t^{2}},\quad 1+\cos x=1+\frac{1-t^{2}}{1+t^{2}}=\frac{2}{1+t^{2}},
        \quad \dx=\frac{2\dt}{1+t^{2}}.$$

        代入：
        $$\int\frac{\dx}{\sin x(1+\cos x)}
        =\int\frac{\dfrac{2\dt}{1+t^{2}}}{\dfrac{2t}{1+t^{2}}\cdot\dfrac{2}{1+t^{2}}}
        =\int\frac{2}{1+t^{2}}\cdot\frac{(1+t^{2})^{2}}{4t}\dt$$
        $$=\frac12\int\frac{1+t^{2}}{t}\dt
        =\frac12\int\left(\frac1t+t\right)\dt
        =\frac12\ln\abs t+\frac{t^{2}}{4}+C.$$

        换回：
        $$\int\frac{\dx}{\sin x(1+\cos x)}
        =\frac12\ln\abs{\tan\frac x2}+\frac14\tan^{2}\frac x2+C.$$

        **验算（求导）**：记 $t=\tan\frac x2$，$\dfrac{\dt}{\dx}=\frac12\sec^{2}\frac x2=\frac{1+t^{2}}{2}$。
        $$\deriv{}{x}\left(\frac12\ln t+\frac{t^{2}}{4}\right)
        =\left(\frac{1}{2t}+\frac t2\right)\cdot\frac{1+t^{2}}{2}
        =\frac{1+t^{2}}{2t}\cdot\frac{1+t^{2}}{2}=\frac{(1+t^{2})^{2}}{4t},$$
        而 $\dfrac{1}{\sin x(1+\cos x)}=\dfrac{(1+t^{2})^{2}}{4t}\ \checkmark$
      `,
      comment: String.raw`
        **这道题推翻了一条"经验"**：万能代换未必慢。
        ==判据其实是"分母能不能被 $(1+t^{2})$ 大量约掉"==——
        本题 $1+\cos x=\frac{2}{1+t^{2}}$ 把一个 $(1+t^{2})$ 送到了分子上，
        约完之后只剩 $\frac{1+t^{2}}{t}$，极其干净。

        $$\boxed{\ \text{看到 }1\pm\cos x\ \text{或}\ 1\pm\sin x\ \text{，万能代换往往很顺}\ }$$
        因为它们的半角形式特别简单：
        $1+\cos x=2\cos^{2}\frac x2$，$1-\cos x=2\sin^{2}\frac x2$。

        **实际上本题用半角公式最快**：
        $$\sin x(1+\cos x)=2\sin\frac x2\cos\frac x2\cdot2\cos^{2}\frac x2
        =4\sin\frac x2\cos^{3}\frac x2,$$
        $$\int\frac{\dx}{4\sin\frac x2\cos^{3}\frac x2}
        \ \xlongequal{u=x/2}\ \frac12\int\frac{\du}{\sin u\cos^{3}u},$$
        再用 $\frac{1}{\sin u\cos^{3}u}=\frac{\sin^2u+\cos^2u}{\sin u\cos^{3}u}
        =\frac{\sin u}{\cos^{3}u}+\frac{1}{\sin u\cos u}$ 逐项积。
        ==$1=\sin^{2}+\cos^{2}$ 这个"乘以 1"的技巧在三角积分里非常好用。==

        **本节的总策略**（按顺序试）：

        1. ==能凑微分吗==（奇次幂借一个出来）；
        2. ==能用半角/降幂化简吗==；
        3. ==有对称性吗==（照那张表选 $u$）；
        4. 都不行再上万能代换。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **假分式直接拆**：==必须先带余除法==化成真分式。
      2. **重因式少配了项**：$(x-a)^{k}$ 要配==$k$ 项==，
         从 $1$ 次幂到 $k$ 次幂。
      3. **二次因式的分子写成常数**：应当是 ==$Bx+C$==。
      4. **二次因式没验判别式**：能分解成实一次因式的==必须先分解==，
         不能当不可约二次处理。
      5. **遮盖法用在重根上**：==只对单重一次因式有效==。
      6. **$\ln$ 忘了绝对值**：$\int\frac{\dx}{x-a}=\ln\abs{x-a}+C$。
      7. **万能代换后不换回 $x$**：不定积分==答案不能含 $t$==。
      8. **一上来就万能代换**：==先试凑微分和降幂==，
         但看到 $1\pm\cos x$ 时万能代换往往反而快。
      9. **不验算**：部分分式代一个数、最终结果求一次导，==两步都很便宜==。
    ` },

  ],
});
