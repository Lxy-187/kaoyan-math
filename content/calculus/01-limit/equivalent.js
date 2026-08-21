/* ==========================================================================
   高等数学 / 1 函数、极限、连续 / 等价无穷小与泰勒展开
   —— 求极限的第一主力，以及它失效时的替代品。
      跨章节的泰勒主线见 threads/lines/taylor。
   ========================================================================== */

KM.page({
  path: 'calculus/limit/equivalent',
  title: '等价无穷小与泰勒展开',
  subtitle: '等价无穷小是**只保留首项**的泰勒展开。快，但一旦首项相消就失效——那时必须退回泰勒',
  tags: ['小题', '计算题', '高频', '易错'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'definition', title: '无穷小的阶与等价', c: String.raw`
      设 $\alpha,\beta$ 在同一极限过程下都是无穷小（趋于 $0$），且 $\beta\ne0$：

      | $\lim\dfrac\alpha\beta$ | 记号 | 说法 |
      |---|---|---|
      | $0$ | $\alpha=o(\beta)$ | $\alpha$ 是==高阶==无穷小（趋于零更快） |
      | $\infty$ | | $\alpha$ 是低阶无穷小 |
      | $c\ne0$ | $\alpha=O(\beta)$ | 同阶 |
      | ==$1$== | ==$\alpha\sim\beta$== | ==等价== |

      **"高阶"的直观**：$x^{2}$ 比 $x$ ==更快地==趋于零，
      所以 $x^{2}=o(x)$——==阶数越高，越可以忽略==。

      **$k$ 阶无穷小**：$\lim\frac{\alpha}{x^{k}}=c\ne0$ 时称 $\alpha$ 是
      $x$ 的 $k$ 阶无穷小。
      ==求"是几阶无穷小"就是求泰勒展开的首项次数==。

      **等价的实质**：
      $$\alpha\sim\beta\iff \alpha=\beta+o(\beta),$$
      ==即"$\alpha$ 与 $\beta$ 只差一个更高阶的量"==。
      这一行解释了后面所有的能用与不能用。
    ` },

    { t: 'formulas', id: 'table', title: '★ 常用等价无穷小（$x\\to0$，必须背熟）', items: [
      { label: '三角', tex: String.raw`\sin x\sim x,\quad\tan x\sim x,\quad\arcsin x\sim x,\quad\arctan x\sim x` },
      { label: '余弦', tex: String.raw`1-\cos x\sim\frac{x^{2}}{2}` },
      { label: '一般幂', tex: String.raw`1-\cos^{\alpha}x\sim\frac{\alpha}{2}x^{2}` },
      { label: '指数对数', tex: String.raw`e^{x}-1\sim x,\quad\ln(1+x)\sim x,\quad a^{x}-1\sim x\ln a` },
      { label: '幂函数', tex: String.raw`(1+x)^{\alpha}-1\sim\alpha x` },
      { label: '三阶（很有用）', tex: String.raw`x-\sin x\sim\frac{x^{3}}{6},\quad\tan x-x\sim\frac{x^{3}}{3}` },
      { label: '三阶（续）', tex: String.raw`\arcsin x-x\sim\frac{x^{3}}{6},\quad x-\arctan x\sim\frac{x^{3}}{3}` },
      { label: '对数的二阶', tex: String.raw`x-\ln(1+x)\sim\frac{x^{2}}{2}` },
    ] },

    { t: 'md', c: String.raw`
      **前五行是一阶的，后三行是"差"的高阶结果**。
      ==后三行专门用来救急==：当一阶等价失效（首项相消）时，
      它们直接给出结果，==比重新展开泰勒快得多==。

      **记忆线索**：$\sin$ 展开是 $x-\frac{x^{3}}{6}$，所以 $x-\sin x\sim\frac{x^{3}}{6}$；
      $\tan$ 展开是 $x+\frac{x^{3}}{3}$，所以 $\tan x-x\sim\frac{x^{3}}{3}$。
      ==符号和系数都从[基本展开式](#/threads/lines/taylor?at=basic-eight)读出来==，不必单独背。

      **通用形式**：表中的 $x$ 可以换成任何趋于 $0$ 的 $\square$：
      $$\sin\left(x^{2}\right)\sim x^{2},\qquad \ln\left(1+\sqrt x\right)\sim\sqrt x,
      \qquad e^{\sin x}-1\sim\sin x\sim x.$$
    ` },

    { t: 'warn', id: 'when-fails', title: '★ 什么时候能用、什么时候不能', c: String.raw`
      $$\boxed{\ \text{等价无穷小只能用于**乘除**，不能用于**加减**}\ }$$

      **能用**（乘除因子整体替换）：
      $$\lim\frac{\sin x\cdot\ln(1+2x)}{x\tan3x}
      =\lim\frac{x\cdot2x}{x\cdot3x}=\frac23.$$

      **不能用**（分子是差）：
      $$\lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}
      \ \ne\ \lim\frac{x-x}{x^{3}}=0\qquad\text{✗}$$
      ==正确答案是 $\frac12$==，见[那道例题](#/calculus/limit/limit-methods?at=ex-mixed)。

      **为什么加减不行**：由 $\alpha=\beta+o(\beta)$，
      $$\tan x-\sin x=\left[x+o(x)\right]-\left[x+o(x)\right]=o(x),$$
      ==首项 $x$ 相消之后，剩下的全在被丢掉的 $o(x)$ 里==，
      所以替换后的信息不够。

      **三条实操判据**：

      1. ==替换的对象必须是"整个因子"==，
         $\lim\frac{\sin x-x^{3}}{x}$ 中的 $\sin x$ ==不能单独换==（它是被减数的一部分）；
      2. 加减法中，==只有当各项的阶不同（首项不会相消）时才能分别替换==，
         但这需要判断，==保险起见一律用泰勒==；
      3. ==分子分母分别替换是允许的==（那是乘除关系）。

      **一个折中的办法**：遇到"差"的形式，
      先看能不能[提取公因子化成乘积](#/calculus/limit/equivalent?at=factor-out)，
      提出来之后就能用等价无穷小了。
    ` },

    { t: 'method', id: 'factor-out', title: '救场三招：提公因子 / 查三阶表 / 上泰勒', c: String.raw`
      遇到首项相消，按这个顺序试：

      **① 提取公因子**（最省力）
      $$\tan x-\sin x=\sin x\left(\frac{1}{\cos x}-1\right)
      =\sin x\cdot\frac{1-\cos x}{\cos x},$$
      ==变成乘积之后就能逐个替换==：$\sim x\cdot\frac{x^{2}/2}{1}=\frac{x^{3}}{2}$。

      同类的：
      $$e^{x}-e^{\sin x}=e^{\sin x}\left(e^{x-\sin x}-1\right)\sim1\cdot(x-\sin x)\sim\frac{x^{3}}{6}.$$
      =="把公共部分提出来，括号里变成 $e^{\square}-1$ 型"是很通用的动作==。

      **② 查[三阶等价表](#/calculus/limit/equivalent?at=table)**
      $x-\sin x$、$\tan x-x$ 这几个直接有结果。

      **③ 上[泰勒展开](#/threads/lines/taylor?at=limit)**（万能）
      ==展开到分母的阶数为止==。
      $$\lim_{x\to0}\frac{\tan x-\sin x}{x^{3}}:\quad
      \tan x=x+\frac{x^{3}}{3}+o(x^{3}),\ \sin x=x-\frac{x^{3}}{6}+o(x^{3}),$$
      $$\text{分子}=\frac{x^{3}}{3}+\frac{x^{3}}{6}+o(x^{3})=\frac{x^{3}}{2}+o(x^{3})
      \ \Longrightarrow\ \frac12.$$

      **展开到几阶？** ==看分母==：分母是 $x^{3}$ 就展开到 $x^{3}$。
      展少了会得到 $\frac00$（信息不够），
      ==展多了不出错但浪费时间==。
      详见[泰勒定阶](#/threads/lines/taylor?at=limit-order)。
    ` },

    { t: 'key', id: 'compare-order', title: '无穷小比较：本质是数阶数', c: String.raw`
      问"$\alpha$ 是 $x$ 的几阶无穷小"，==就是问它泰勒展开的首项次数==。

      | 表达式 | 首项 | 阶 |
      |---|---|---|
      | $\sin x-x$ | $-\frac{x^{3}}{6}$ | ==$3$== |
      | $1-\cos x$ | $\frac{x^{2}}{2}$ | $2$ |
      | $\sqrt{1+x}-1$ | $\frac x2$ | $1$ |
      | $e^{x^{2}}-1$ | $x^{2}$ | $2$ |
      | $\ln(1+x)-x+\frac{x^{2}}{2}$ | $\frac{x^{3}}{3}$ | ==$3$== |

      **运算规则**（很好用）：

      - 乘积：==阶数相加==（$k$ 阶 $\times$ $m$ 阶 $=$ $k+m$ 阶）；
      - [积分](#/calculus/definite/variable-limit?at=cannot-integrate)：==阶数 $+1$==；
      - 求导：==阶数 $-1$==；
      - 和：==取阶数较低的那个==（除非首项相消）。

      =="数阶数"这个动作在很多地方复用==：
      判断[反常积分敛散](#/calculus/definite/improper?at=judge)、
      判断[级数敛散](#/calculus/series/convergence?at=limit-compare)、
      估计误差，==用的都是同一套==。

      **一个常考的题型**：已知 $f(x)\sim ax^{k}$，求 $a$ 和 $k$。
      ==做法是把 $f$ 泰勒展开，读首项==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-taylor-order',
      title: '★ 展开到几阶：一个必须想清楚的问题',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        求 $\displaystyle\lim_{x\to0}\frac{e^{x}-e^{\sin x}}{x^{2}\ln(1+x)}$。
      `,
      idea: String.raw`
        **先定分母的阶**：
        $$x^{2}\ln(1+x)\sim x^{2}\cdot x=x^{3},$$
        ==分母是 $3$ 阶==，所以分子也要展开到 $x^{3}$。

        **分子怎么处理**：$e^{x}-e^{\sin x}$ 是"差"，
        ==直接用 $e^{x}-1\sim x$ 会得到 $x-\sin x$，虽然这次碰巧对，但推理是错的==。

        **正确做法（提公因子，最快）**：
        $$e^{x}-e^{\sin x}=e^{\sin x}\left(e^{x-\sin x}-1\right).$$
        ==把公共的 $e^{\sin x}$ 提出来==，括号里变成标准的 $e^{\square}-1$ 型，
        而 $\square=x-\sin x\to0$，故
        $$e^{x-\sin x}-1\sim x-\sin x\sim\frac{x^{3}}{6}.$$
        再由 $e^{\sin x}\to1$，==分子 $\sim\frac{x^{3}}{6}$==。

        **对照：硬展开泰勒**也行，但要小心
        $e^{\sin x}$ 的展开是==复合==的，要先展 $\sin x$ 再代进 $e^{u}$，
        ==容易出错且慢==。
        **提公因子这一招在这里明显优于硬展开。**
      `,
      solution: String.raw`
        **分母定阶**：由 $\ln(1+x)\sim x$，
        $$x^{2}\ln(1+x)\sim x^{3}.$$

        **分子**：提取公因子 $e^{\sin x}$，
        $$e^{x}-e^{\sin x}=e^{\sin x}\left(e^{\,x-\sin x}-1\right).$$

        由 $x-\sin x\to0$ 及 $e^{u}-1\sim u$（$u\to0$）：
        $$e^{\,x-\sin x}-1\ \sim\ x-\sin x.$$
        由[三阶等价](#/calculus/limit/equivalent?at=table)，$x-\sin x\sim\dfrac{x^{3}}{6}$。
        又 $e^{\sin x}\to e^{0}=1$，故
        $$e^{x}-e^{\sin x}\ \sim\ \frac{x^{3}}{6}.$$

        **合并**：
        $$\lim_{x\to0}\frac{e^{x}-e^{\sin x}}{x^{2}\ln(1+x)}
        =\lim_{x\to0}\frac{x^{3}/6}{x^{3}}=\frac16.$$
      `,
      comment: String.raw`
        **"提公因子"的通用形状**（值得固定下来）：
        $$\boxed{\ A^{f}-A^{g}=A^{g}\left(A^{\,f-g}-1\right),\qquad
        \ln f-\ln g=\ln\frac fg\ }$$
        ==指数相减 $\to$ 提出一个、括号里变成 $e^{\square}-1$；
        对数相减 $\to$ 合并成一个 $\ln$==。

        **同型题**：
        $$\lim_{x\to0}\frac{\sin(\tan x)-\sin x}{x^{3}}:\quad
        \sin(\tan x)-\sin x=2\cos\frac{\tan x+x}{2}\sin\frac{\tan x-x}{2}$$
        ==用和差化积把"差"变成"积"==，
        再用 $\tan x-x\sim\frac{x^{3}}{3}$ 得答案 $\frac16$。

        **如果不提公因子，硬展开会怎样**：
        $$\sin x=x-\frac{x^{3}}{6}+o(x^{3}),$$
        $$e^{\sin x}=1+\sin x+\frac{\sin^{2}x}{2}+\frac{\sin^{3}x}{6}+o(x^{3})$$
        $$=1+\left(x-\frac{x^{3}}{6}\right)+\frac{x^{2}}{2}+\frac{x^{3}}{6}+o(x^{3})
        =1+x+\frac{x^{2}}{2}+o(x^{3}),$$
        而 $e^{x}=1+x+\frac{x^{2}}{2}+\frac{x^{3}}{6}+o(x^{3})$，
        ==相减得 $\frac{x^{3}}{6}$==，结果相同但过程长得多。
        ==注意 $e^{\sin x}$ 的 $x^{3}$ 项恰好抵消==，这一步很容易算错。

        **教训**：==看到"两个同类函数相减"，先试提公因子==，
        实在提不出来再硬展开。
      `,
    },

    { t: 'example',
      id: 'ex-find-order',
      title: '定阶：已知等价关系反求参数',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $x\to0$ 时，$f(x)=\sqrt{1+ax^{2}}-\cos x$ 是 $x$ 的 $4$ 阶无穷小，
        求常数 $a$，并求 $\displaystyle\lim_{x\to0}\frac{f(x)}{x^{4}}$。
      `,
      idea: String.raw`
        **"是 $4$ 阶无穷小"翻译成**：泰勒展开后
        ==$x^{2}$ 项的系数为零，而 $x^{4}$ 项的系数不为零==。

        **所以要展开到 $x^{4}$**（不能只到 $x^{2}$）。

        **两个展开式**：
        $$\sqrt{1+u}=(1+u)^{1/2}=1+\frac u2-\frac{u^{2}}{8}+o(u^{2}),$$
        令 $u=ax^{2}$（==注意 $u^{2}=a^{2}x^{4}$，正好到 $4$ 阶==）：
        $$\sqrt{1+ax^{2}}=1+\frac{a}{2}x^{2}-\frac{a^{2}}{8}x^{4}+o(x^{4}).$$
        $$\cos x=1-\frac{x^{2}}{2}+\frac{x^{4}}{24}+o(x^{4}).$$

        **相减**：
        $$f(x)=\left(\frac a2+\frac12\right)x^{2}
        -\left(\frac{a^{2}}{8}+\frac{1}{24}\right)x^{4}+o(x^{4}).$$

        ==令 $x^{2}$ 的系数为零==得 $a=-1$，再读 $x^{4}$ 的系数。

        **别忘了验证 $x^{4}$ 系数非零**——
        ==若它也为零，$f$ 就是更高阶的无穷小，题目条件矛盾==。
      `,
      solution: String.raw`
        由 $(1+u)^{1/2}=1+\dfrac u2-\dfrac{u^{2}}{8}+o(u^{2})$，取 $u=ax^{2}$：
        $$\sqrt{1+ax^{2}}=1+\frac a2x^{2}-\frac{a^{2}}{8}x^{4}+o(x^{4}).$$

        由 $\cos x=1-\dfrac{x^{2}}{2}+\dfrac{x^{4}}{24}+o(x^{4})$，两式相减：
        $$f(x)=\left(\frac a2+\frac12\right)x^{2}
        -\left(\frac{a^{2}}{8}+\frac{1}{24}\right)x^{4}+o(x^{4}).$$

        **$f$ 是 $4$ 阶无穷小**，故 $x^{2}$ 的系数为零：
        $$\frac a2+\frac12=0\ \Longrightarrow\ a=-1.$$

        代入 $x^{4}$ 的系数：
        $$-\left(\frac{(-1)^{2}}{8}+\frac{1}{24}\right)
        =-\left(\frac18+\frac1{24}\right)=-\frac{3+1}{24}=-\frac16\ \ne0\ \checkmark$$

        故
        $$f(x)=-\frac16x^{4}+o(x^{4}),\qquad
        \lim_{x\to0}\frac{f(x)}{x^{4}}=-\frac16.$$
      `,
      comment: String.raw`
        **数值验证**（建议自己动手一次）：取 $a=-1$、$x=0.1$，
        $$\sqrt{1-0.01}=0.99498744,\qquad \cos0.1=0.99500417,$$
        $$f=-1.6729\times10^{-5},\qquad -\frac16x^{4}=-1.6667\times10^{-5}.$$
        ==两者吻合到三位有效数字==，$a=-1$ 与系数 $-\frac16$ 都对。

        **这类题的固定结构**：

        1. ==由"是 $k$ 阶无穷小"知：低于 $k$ 阶的系数全为零==；
        2. 展开到 $x^{k}$，令低阶系数为零，解出参数；
        3. ==验证 $x^{k}$ 的系数确实非零==。

        **第 3 步不能省**。若算出 $x^{4}$ 系数也为零，
        说明 $a$ 取错了或者题目要求的阶数不对。

        **展开的深度要一次到位**。
        本题若只展到 $x^{2}$，会得到 $a=-1$ 但求不出极限；
        ==若展到 $x^{6}$，多算一堆没用的项==。
        ==判据：展到"题目要求的那一阶"为止==。

        **$(1+u)^{1/2}$ 的展开容易记错**：
        $$(1+u)^{\alpha}=1+\alpha u+\frac{\alpha(\alpha-1)}{2}u^{2}+\cdots$$
        $\alpha=\frac12$ 时第二项系数是 $\frac{\frac12\cdot(-\frac12)}{2}=-\frac18$，
        ==注意是负的==。见[基本展开式](#/threads/lines/taylor?at=basic-eight)。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **等价无穷小用在加减上**：==只能用于乘除==，
         这是本节头号错误。
      2. **替换的不是"整个因子"**：$\sin x-x^{3}$ 中的 $\sin x$ 不能单独换。
      3. **首项相消后不换方法**：==提公因子、查三阶表、或上泰勒==。
      4. **泰勒展开的阶数不够**：==看分母定阶==，展少了会得 $\frac00$。
      5. **复合函数展开时只代外层**：$e^{\sin x}$ 要==先展 $\sin x$ 再代==，
         且要保留到需要的阶。
      6. **$(1+u)^{1/2}$ 的二阶系数写成正的**：==是 $-\frac18$==。
      7. **$1-\cos x\sim x^{2}$**：==漏了 $\frac12$==。
      8. **通用形式用错**：$\square$ 必须趋于 $0$，
         $\ln(1+x)\sim x$ 在 $x\to\infty$ 时==完全不成立==。
      9. **定阶题不验证首项非零**：见上面例题的第 3 步。
    ` },

  ],
});
