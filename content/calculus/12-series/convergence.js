/* ==========================================================================
   高等数学 / 12 无穷级数 / 正项级数敛散性判别
   —— 具体级数的判敛：给定通项，问收不收敛。
      抽象级数（只给条件、问运算后的结果）见 series/abstract。
   ========================================================================== */

KM.page({
  path: 'calculus/series/convergence',
  title: '正项级数敛散性判别',
  subtitle: '正项级数只有两种结局：部分和有界则收敛，无界则发散到 $+\\infty$。所有判别法都在估这个界',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-13',

  blocks: [

    { t: 'key', id: 'why-only-two', title: '起点：正项级数的部分和单调递增', c: String.raw`
      $a_n\geq0\Rightarrow S_n=a_1+\cdots+a_n$ 单调不减。单调数列只有两种命运：
      $$\boxed{\ \sum a_n\ \text{收敛}\iff\left\{S_n\right\}\ \text{有界}\ }$$
      无界就必然 $\to+\infty$，==正项级数不存在"震荡发散"==。

      这条看似平凡的事实是整章的地基：
      **一切判别法都是在想办法估计 $S_n$ 的上界**，
      而估上界的唯一手段是==和一个已知的级数比较==。
      所以真正需要背的不是判别法，而是==两把标尺==。
    ` },

    { t: 'key', id: 'rulers', title: '两把标尺：$p$ 级数与几何级数', c: String.raw`
      $$\sum_{n=1}^{\infty}\frac{1}{n^{p}}\quad
      \begin{cases}p>1 & \text{收敛}\\ p\leq1 & \text{发散}\end{cases}
      \qquad\qquad
      \sum_{n=0}^{\infty}q^{n}\quad
      \begin{cases}\left|q\right|<1 & \text{收敛}\\ \left|q\right|\geq1 & \text{发散}\end{cases}$$

      ==$p=1$（调和级数）发散，是整章最重要的分界线==，务必记牢：
      $\sum\frac1n$ 发散，$\sum\frac{1}{n^{1.001}}$ 收敛。

      **加细一档**（对数修正，判别法失效时的备用标尺）：
      $$\sum_{n=2}^{\infty}\frac{1}{n\left(\ln n\right)^{p}}\quad
      \begin{cases}p>1 & \text{收敛}\\ p\leq1 & \text{发散}\end{cases}$$
      它比任何 $\frac{1}{n^{p}}$ 都"卡在边界上"，==比值法、根值法对它一律失效==，
      只能用[积分判别法](#/calculus/series/convergence?at=integral-test)。
    ` },

    { t: 'warn', id: 'necessary-only', title: '$a_n\\to0$ 是必要条件，**不是**充分条件', c: String.raw`
      $$\sum a_n\ \text{收敛}\ \Longrightarrow\ a_n\to0
      \qquad\text{但反过来不成立}$$

      **唯一的正确用法是逆否命题**：==$a_n\not\to0\Rightarrow$ 级数发散==。
      看到 $\sum\frac{n}{n+1}$、$\sum\left(-1\right)^{n}$、$\sum\sin n$ 这种通项不趋于零的，
      一眼判发散，不必动用任何判别法。

      **反向使用是本章第一大错**：$\frac1n\to0$ 但 $\sum\frac1n$ 发散。
      "项越来越小"和"加起来是有限的"==完全是两回事==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'decision', c: '一、选哪个判别法：看通项的长相' },

    { t: 'compare',
      id: 'decision-table',
      title: '决策表',
      cols: ['通项里有', '首选', '为什么'],
      rows: [
        ['$n!$、$n^{n}$、$a^{n}$（阶乘或指数）', '**比值法**', '作商时阶乘、指数会大片消掉'],
        ['整体是 $n$ 次幂 $\\left[u(n)\\right]^{n}$', '**根值法**', '开 $n$ 次方直接剥掉幂'],
        ['纯粹的有理式、根式（$n$ 的多项式之比）', '**极限比较法**', '比值法必得 $\\rho=1$，白做'],
        ['含 $\\ln n$ 且卡在 $\\frac{1}{n}$ 附近', '**积分判别法**', '比值 / 根值全部失效'],
        ['含 $\\sin,\\arctan,\\ln(1+\\cdot)$ 等', '先**等价无穷小**替换', '换成幂函数再用比较法'],
        ['带 $(-1)^{n}$', '不是正项级数', '转[任意项级数](#/calculus/series/general-series?at=three-way)'],
      ] },

    { t: 'md', c: String.raw`
      ==一个经验：比值法和根值法只对"指数级"的通项有效==。
      对有理式（$\frac{n^{2}+1}{n^{4}+n}$ 这种）它们必然给出 $\rho=1$ 而失效 ——
      因为有理式的增长是==多项式级==的，相邻两项之比天然趋于 $1$。
      看到有理式就==直接上极限比较法==，别浪费时间。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'compare-test', c: '二、比较判别法：主力中的主力' },

    { t: 'method', id: 'limit-compare', title: '极限比较法：抓主部，配标尺', c: String.raw`
      设 $a_n,b_n>0$，$\displaystyle\lim_{n\to\infty}\frac{a_n}{b_n}=l$：

      | $l$ | 结论 |
      |---|---|
      | $0<l<+\infty$ | ==同敛散==（最常用） |
      | $l=0$ | $\sum b_n$ 收敛 $\Rightarrow\sum a_n$ 收敛 |
      | $l=+\infty$ | $\sum b_n$ 发散 $\Rightarrow\sum a_n$ 发散 |

      **实操三步**：

      1. **抓主部**：分子分母各留最高阶项，低阶项全扔。
         $a_n=\dfrac{\sqrt{n}+\ln n}{n^{2}-3n}\ \sim\ \dfrac{\sqrt n}{n^{2}}=\dfrac{1}{n^{3/2}}$。
      2. **读出 $p$**：这里 $p=\frac32>1$，收敛。
      3. **写成标准格式**：取 $b_n=\frac{1}{n^{3/2}}$，算 $\lim\frac{a_n}{b_n}=1\in(0,\infty)$，
         由 $\sum b_n$ 收敛得 $\sum a_n$ 收敛。

      =="抓主部"之前先用等价无穷小把超越函数换掉==（$n\to\infty$ 即 $\frac1n\to0$）：
      $\sin\frac1n\sim\frac1n$，$\ln\left(1+\frac1n\right)\sim\frac1n$，
      $1-\cos\frac1n\sim\frac{1}{2n^{2}}$，$\left(1+\frac1n\right)^{\alpha}-1\sim\frac{\alpha}{n}$。
      详见[等价无穷小与泰勒展开](#/threads/lines/taylor?at=limit-order)。
    ` },

    { t: 'warn', id: 'compare-traps', title: '比较法的两个坑', c: String.raw`
      1. **$\ln n$ 不改变 $p$ 的档位**：$\ln n$ 比任何 $n^{\varepsilon}$ 都慢，所以
         $\sum\frac{\ln n}{n^{2}}$ ==收敛==（拿 $\frac{1}{n^{1.5}}$ 比），
         $\sum\frac{1}{n\ln n}$ ==发散==（$p=1$ 那一档，靠积分判别法定）。
         ==夹在 $\frac1n$ 和 $\frac{1}{n^{1+\varepsilon}}$ 之间的，比较法定不了，必须用积分法。==
      2. **非正项不能用**：比较法、比值法、根值法==全部要求 $a_n\geq0$==
         （或至少从某项起同号）。带 $(-1)^{n}$ 时先取绝对值判绝对收敛，
         见[三分法](#/calculus/series/general-series?at=three-way)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'ratio-root', c: '三、比值法与根值法' },

    { t: 'key', id: 'ratio-root-core', title: '两条公式与同一个失效点', c: String.raw`
      $$\rho=\lim_{n\to\infty}\frac{a_{n+1}}{a_n}
      \qquad\text{或}\qquad
      \rho=\lim_{n\to\infty}\sqrt[n]{a_n}$$
      $$\rho<1\Rightarrow\text{收敛},\qquad
      \rho>1\Rightarrow\text{发散},\qquad
      \rho=1\Rightarrow\text{失效}$$

      **为什么 $\rho<1$ 就收敛**：$\rho<1$ 意味着从某项起 $a_{n+1}<q\,a_n$（取定 $\rho<q<1$），
      于是 $a_n$ 被一个==公比 $q$ 的几何级数控制住==。
      ==所以这两个判别法本质上就是"和几何级数比较"==，
      这也解释了为什么它们对多项式级的通项无能为力。

      **$\rho>1$ 时能直接判发散**，因为此时 $a_n$ 单调递增，$a_n\not\to0$。

      ==$\rho=1$ 不是"不知道"，而是"这个工具用错了"==：改用比较法或积分法。
      三个 $p$ 级数 $\sum\frac1n$（发散）、$\sum\frac{1}{n^{2}}$（收敛）算出的 $\rho$ 都是 $1$，
      说明它==根本分辨不了这一档==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'integral-test', c: '四、积分判别法：级数与积分的真正接口' },

    { t: 'insight', id: 'my-integral-guess', title: '我原来的猜法：是不是「原函数的导数趋于 0」？', c: String.raw`
      我一直觉得级数和积分关系很近，猜过一个判据：
      ==级数收敛，是不是等价于对应积分的原函数的导数在 $x\to\infty$ 时趋于 $0$？==

      这个猜法不成立，但==它错得很有价值==，因为它精确地撞上了那条最著名的陷阱。

      由微积分基本定理，$F'(x)=f(x)$，所以我说的"原函数的导数趋于 $0$"
      翻译过来就是 ==$\lim\limits_{x\to\infty}f(x)=0$，也就是 $a_n\to0$== ——
      这恰恰是那个==必要而不充分==的条件。$f(x)=\frac1x$ 就是反例：
      $F'=\frac1x\to0$ 符合我的猜想，但 $F=\ln x\to\infty$，积分和级数双双发散。

      **正确的对应是把注意力从导数挪到原函数本身**：
      $$\text{反常积分收敛}\iff F(x)\ \text{在}\ x\to\infty\ \text{时有**有限极限**}$$
      我盯错了对象——==该看的是"累加的结果稳不稳得住"，不是"每一次加的量小不小"==。
    ` },

    { t: 'key', id: 'cauchy-integral', title: '柯西积分判别法', c: String.raw`
      设 $f(x)$ 在 $[1,+\infty)$ 上==非负、连续、单调递减==，且 $a_n=f(n)$，则
      $$\sum_{n=1}^{\infty}a_n\ \text{与}\ \int_{1}^{+\infty}f(x)\dx\ \text{同敛散}.$$

      **三个条件缺一不可**，尤其==单调递减==：
      没有单调性，$f(n)$ 取到的可能是些孤立的尖峰，和曲线下面积毫无关系。

      **为什么成立（一张图的事）**：把 $a_n$ 画成宽为 $1$、高为 $f(n)$ 的矩形。
      由 $f$ 递减，在 $[n,n+1]$ 上有 $f(n+1)\leq f(x)\leq f(n)$，逐段积分再求和：
      $$\sum_{n=2}^{N}a_n\ \leq\ \int_{1}^{N}f(x)\dx\ \leq\ \sum_{n=1}^{N-1}a_n$$
      ==左右两边都是同一个级数的部分和==，中间是积分。
      夹逼之下，一个有界另一个必有界。

      **它填补的正是比较法的盲区**：
      $\sum\frac{1}{n\left(\ln n\right)^{p}}$ 用 $u=\ln x$ 换元，
      $$\int_{2}^{\infty}\frac{\dx}{x\left(\ln x\right)^{p}}=\int_{\ln2}^{\infty}\frac{\du}{u^{p}},$$
      ==又变回一个 $p$ 积分==，于是 $p>1$ 收敛、$p\leq1$ 发散。
      这个结论比较法证不出来，比值法根值法一律 $\rho=1$。
    ` },

    { t: 'key', id: 'discrete-continuous', title: '再往上一层：为什么"很像"是有道理的', c: String.raw`
      $\sum$ 与 $\int$ 的记号同源（都来自 Sum / Summa 的首字母），这不是巧合：

      | | 级数 | 反常积分 |
      |---|---|---|
      | 累加对象 | 离散点 $f(1),f(2),\dots$ | 连续的 $f(x)\dx$ |
      | "部分和" | $S_N=\sum_{n\leq N}a_n$ | $F(t)=\int_1^{t}f$ |
      | 收敛的定义 | $\lim S_N$ 存在有限 | $\lim F(t)$ 存在有限 |
      | 必要条件 | $a_n\to0$ | ==$f(x)\to0$ 竟然不必要！== |

      ==最后一行是个反直觉的不对称==：级数收敛必有 $a_n\to0$，
      但反常积分收敛==推不出 $f(x)\to0$==。
      反例是"越来越窄的尖峰"：在每个整数 $n$ 处竖一个高为 $1$、底宽为 $\frac{1}{2^{n}}$ 的三角形，
      总面积 $\sum\frac{1}{2^{n+1}}$ 有限，积分收敛，而 $f(n)=1\not\to0$。

      **差别的根源**：级数的每一项"占地宽度"恒为 $1$，==而积分允许宽度趋于零==。
      这也是积分判别法必须要求==单调递减==的深层原因 ——
      单调性正是用来禁止这种尖峰的。
    ` },

    { t: 'example',
      id: 'ex-log-scale',
      title: '卡在边界上的一族：$\\sum\\dfrac{1}{n\\left(\\ln n\\right)^{p}}$',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        讨论 $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n\left(\ln n\right)^{p}}$ 的敛散性（$p$ 为实数）。
      `,
      idea: String.raw`
        先试一遍常规武器，确认它们为什么都不行 —— ==这一步比直接给答案重要==：

        - **比值法**：$\frac{a_{n+1}}{a_n}\to1$，失效；
        - **根值法**：同样 $\to1$，失效；
        - **比较法**：$\frac{1}{n\left(\ln n\right)^{p}}$ 对任意 $\varepsilon>0$ 满足
          $$\frac{1}{n^{1+\varepsilon}}<\frac{1}{n(\ln n)^{p}}<\frac1n\quad(n\ \text{充分大},\ p>0),$$
          ==左边收敛右边发散，夹在中间什么也说明不了==。

        三条路全堵死，说明这个级数==恰好卡在 $p$ 级数分辨不了的缝隙里==。
        这正是积分判别法存在的理由：它不靠比较，==靠换元把问题原样搬到连续世界==，
        而在那边 $\frac{\dx}{x}=\d(\ln x)$ 能把 $\ln$ 直接变成新的自变量。
      `,
      solution: String.raw`
        取 $f(x)=\dfrac{1}{x\left(\ln x\right)^{p}}$，在 $[2,+\infty)$ 上非负、连续；
        当 $p\geq0$ 时分母递增，故 $f$ 单调递减，三个条件齐备。

        令 $u=\ln x$，$\du=\dfrac{\dx}{x}$：
        $$\int_{2}^{+\infty}\frac{\dx}{x\left(\ln x\right)^{p}}
        =\int_{\ln2}^{+\infty}\frac{\du}{u^{p}}.$$

        右端是标准的 $p$ 积分，于是

        $$\sum_{n=2}^{\infty}\frac{1}{n\left(\ln n\right)^{p}}\quad
        \begin{cases}\text{收敛}, & p>1\\[2pt]\text{发散}, & p\leq1\end{cases}$$

        （$p<0$ 时通项 $\geq\frac1n$，直接比较即得发散，与上式一致。）
      `,
      comment: String.raw`
        **这道题真正的收获是"分辨率"的概念**。

        $p$ 级数这把尺子的最小刻度是 $n^{\varepsilon}$，
        而 $\ln n$ ==比任何 $n^{\varepsilon}$ 都慢==，落在两个刻度之间，尺子量不出来。
        积分判别法相当于换了一把更细的尺子。

        这个过程还能继续套娃：
        $$\sum\frac{1}{n\ln n\left(\ln\ln n\right)^{p}}$$
        同样 $p>1$ 收敛、$p\leq1$ 发散（令 $u=\ln\ln x$）。
        ==每套一层 $\ln$，就得到一族更贴近边界的级数==，
        说明**不存在"最慢的收敛级数"**：任给一个收敛级数，
        总能构造出收敛得更慢的。收敛与发散之间没有一条可以由单个级数标定的分界线。

        **考场用法**：记住 $\sum\frac{1}{n\left(\ln n\right)^{p}}$ 这一族，
        它是继 $p$ 级数之后第二常用的标尺，
        专门对付 $\frac{1}{n\ln n}$、$\frac{1}{n\ln^{2}n}$ 这类通项。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **由 $a_n\to0$ 推收敛**：==只能反着用==（$a_n\not\to0\Rightarrow$ 发散）。
      2. **对非正项级数用比较 / 比值 / 根值**：这三个==都要求 $a_n\geq0$==。
      3. **$\rho=1$ 时下结论**：失效就是失效，必须换工具，不能"倾向于认为收敛"。
      4. **用积分判别法忘了验单调**：三个条件（非负、连续、递减）要写出来。
      5. **比较法方向搞反**：要证收敛得找==更大的收敛级数==，
         要证发散得找==更小的发散级数==。反了等于没证。
      6. **$\ln n$ 当成 $n^{\varepsilon}$ 处理**：它比任何正幂都慢，
         ==$\sum\frac{\ln n}{n}$ 发散，$\sum\frac{\ln n}{n^{2}}$ 收敛==。
      7. **忘记级数的敛散性与前有限项无关**：从 $n=1$ 还是 $n=100$ 起求和不影响敛散，
         ==但影响"和"是多少==。
    ` },

  ],
});
