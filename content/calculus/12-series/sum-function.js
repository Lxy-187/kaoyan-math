/* ==========================================================================
   高等数学 / 12 无穷级数 / 求和函数：四条路线与递推型难题
   —— 收敛半径与端点的基础在 power-series 那页，这里只补三件事：
      ① 从递推关系直接读半径（不求通项）；
      ② 四条求和路线的选择；
      ③ 路线四「构造微分方程」的完整词典 —— 这是最难也最容易空白的一类。
   ========================================================================== */

KM.page({
  path: 'calculus/series/sum-function',
  title: '求和函数：四条路线与递推型难题',
  subtitle: '只给一条递推关系就要你求和函数 —— 这类题不走字典，走**微分方程**',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-13',

  blocks: [

    { t: 'key', id: 'thesis', title: '总纲：先定域，再选路线', c: String.raw`
      求和函数的题永远是两段，缺一段就扣分：

      $$\underbrace{\text{收敛域}}_{\text{半径}+\text{端点}}
      \qquad\longrightarrow\qquad
      \underbrace{S(x)\text{ 的表达式}}_{\text{四条路线选一条}}$$

      **四条路线，按「题目给了什么」选**：

      | 题目给的是 | 走哪条 |
      |---|---|
      | 现成的一般项，形状眼熟 | ① [查字典](#/calculus/series/power-series?at=dict) |
      | 系数里带 $n$ 或 $\dfrac1n$ | ② 逐项求导 / 积分 |
      | 系数是有理式（如 $\dfrac{1}{n(n+1)}$） | ③ 裂项拆开，退回 ①② |
      | ==只给递推关系==，通项难求或求出来也认不出 | ④ **构造微分方程** |

      ==这一页重点是 ④==。前三条在[幂级数收敛域与和函数](#/calculus/series/power-series?at=decision)那页，
      基础的半径与端点判法也在那边，这里只补它没讲透的部分。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'radius', c: '一、收敛半径：递推关系直接就是答案' },

    { t: 'key', id: 'ratio-core', title: '公式与它的两个变体', c: String.raw`
      对 $\displaystyle\sum_{n=1}^{\infty}a_nx^{n}$：

      $$\rho=\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|
      \quad\text{或}\quad
      \rho=\lim_{n\to\infty}\sqrt[n]{\left|a_n\right|},
      \qquad\boxed{\ R=\frac1\rho\ }$$

      $\rho=0\Rightarrow R=+\infty$；$\rho=+\infty\Rightarrow R=0$。

      **什么时候用根值法**：系数里有 $n$ 次幂（如 $a_n=\left(\frac{n}{n+1}\right)^{n^{2}}$、$a_n=3^{n}$）
      或者带 $n!$ 之外的整体幂次时，开 $n$ 次方比作商干净。==两者结果一定一致==，挑好算的。

      **系数含零项时比值法失效**：$a_n$ 有无穷多个 $0$（缺项级数），
      $\frac{a_{n+1}}{a_n}$ 根本没定义。这时==只能对整项 $u_n(x)=a_nx^{n}$ 作商==，
      或换元把缺的项补齐，详见[缺项陷阱](#/calculus/series/power-series?at=radius)。
    ` },

    { t: 'insight', id: 'no-need-closed-form', title: '关键：给递推关系，就是在直接送你 $\\rho$', c: String.raw`
      这类题最容易走的弯路，是==上来先解递推、求通项 $a_n$，再回头算比值==。

      其实反了。比值法要的本来就是 $\dfrac{a_{n+1}}{a_n}$，
      而==递推关系 $f(n)\,a_{n+1}=g(n)\,a_n$ 一移项给出的正是这个比值==：
      $$\frac{a_{n+1}}{a_n}=\frac{g(n)}{f(n)}.$$

      所以**求收敛半径这一步根本不需要通项**，两行就完事。
      通项难不难求是另一回事（本页那道题的通项是双阶乘，不好认），
      ==这两件事必须分开，否则会被卡在第一步==。

      反过来也说明一个命题习惯：==题目把递推关系摆在题干里，
      就是在暗示"半径用比值法、和函数用微分方程"这条路线==。
    ` },

    { t: 'warn', id: 'radius-traps', title: '半径这一步的三个坑', c: String.raw`
      1. **$\rho$ 与 $R$ 搞反**：$\rho$ 是==比值的极限==，$R$ 是它的==倒数==。
         算出 $\rho=|x|$ 形式的（把 $x$ 也带进去了）就直接解 $\rho<1$，别再取倒数。
      2. **平移型 $\sum a_n(x-x_0)^{n}$**：半径照算，但==收敛区间是 $(x_0-R,\;x_0+R)$==，
         端点也要在 $x_0\pm R$ 处查。
      3. **换元型 $\sum a_nx^{2n}$ / $\sum a_n\frac{x^{n}}{2^{n}}$**：
         令 $u=x^{2}$ 或 $u=\frac x2$ 算出 $u$ 的半径 $R_u$，
         ==再翻译回 $x$==（前者 $R_x=\sqrt{R_u}$，后者 $R_x=2R_u$）。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'endpoints', c: '二、端点：半径给不了收敛域' },

    { t: 'md', c: String.raw`
      $|x|<R$ 只是**开区间**。题目问"收敛域"或要在端点取值时，
      ==两个端点必须分别代回原级数，用数项级数的判别法单独判==
      （正端点用比较 / 比值，交错端点用莱布尼茨）。
      常见端点的结论速查见[那张对照表](#/calculus/series/power-series?at=radius)；
      这里补一个考场上真正难住人的情形：**通项没有显式表达式，怎么判端点**。
    ` },

    { t: 'method', id: 'endpoint-without-formula', title: '通项只有递推式时，端点怎么判', c: String.raw`
      需要的信息只有两条，都能从递推关系本身榨出来：

      **① $a_n$ 是否单调趋于 $0$**（判交错端点，莱布尼茨判别法）
      单调性直接看比值：$\frac{a_{n+1}}{a_n}<1$ 就是递减。
      趋于零可以取对数放缩：由 $\ln(1-t)\leq-t$，
      $$\ln a_n=\sum\ln\left(1-t_k\right)\leq-\sum t_k ,$$
      ==只要 $\sum t_k$ 发散，$\ln a_n\to-\infty$，就有 $a_n\to0$==。

      **② $a_n$ 的量级**（判正端点，比较判别法）
      不必求出通项，==只要卡出一个可比较的下界或上界==。
      对连乘积形式的 $a_n$，把每个因子放缩成能**裂项相消**的形状，
      整个乘积就塌成一个简单的式子 —— 见[下面那道题的第二步](#/calculus/series/sum-function?at=ex-recurrence)。
    ` },

    { t: 'key', id: 'abel', title: '阿贝尔定理：端点收敛，就能白嫖端点的和', c: String.raw`
      设 $\displaystyle S(x)=\sum a_nx^{n}$ 的收敛半径为 $R$。
      **若级数在 $x=R$（或 $x=-R$）处收敛**，则 $S$ 在该端点==单侧连续==：
      $$\sum_{n=1}^{\infty}a_nR^{n}=\lim_{x\to R^{-}}S(x).$$

      **用途**：端点处的数项级数往往不好直接求和，
      但只要它收敛，==就可以把开区间上算出来的 $S(x)$ 取极限==。

      经典例：$-\ln(1-x)=\sum\frac{x^{n}}{n}$ 在 $x=-1$ 收敛，故
      $$\sum_{n=1}^{\infty}\frac{(-1)^{n}}{n}=\lim_{x\to-1^{+}}\left[-\ln(1-x)\right]=-\ln2 .$$

      ==注意方向是单向的==：端点收敛 $\Rightarrow$ 和等于极限；
      但"$\lim_{x\to R^-}S(x)$ 存在"==推不出==端点收敛
      （反例 $\sum(-1)^{n}x^{n}=\frac{1}{1+x}$ 在 $x=1$ 处极限是 $\frac12$，级数却发散）。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'route4', c: '三、路线四：把递推关系翻译成微分方程' },

    { t: 'key', id: 'why-ode', title: '为什么递推关系会变成微分方程', c: String.raw`
      幂级数把整个数列 $\{a_n\}$ 打包成一个函数 $S(x)=\sum a_nx^{n}$ ——
      这个函数叫数列的**母函数**（生成函数）。数列上的操作，在母函数上都有对应：

      | 数列上做什么 | 母函数上变成什么 |
      |---|---|
      | 下标平移 $a_n\to a_{n+1}$ | ==除以 $x$==（再补首项） |
      | 系数乘 $n$ | ==求导再乘 $x$==：$xS'$ |
      | 系数除以 $n$ | ==积分==：$\int_0^x\frac{S}{t}\dt$ |

      于是：
      - 递推系数是**常数**（如 $a_{n+2}=a_{n+1}+a_n$）$\Rightarrow$ 只用到平移
        $\Rightarrow$ 母函数是==有理函数==（[斐波那契那个例子](#/calculus/derivative/high-order?at=fibonacci)）；
      - 递推系数**含 $n$**（本页这道题）$\Rightarrow$ 会用到"乘 $n$"
        $\Rightarrow$ 出现 $S'$ $\Rightarrow$ 母函数满足一个==微分方程==。

      ==看到递推系数里带 $n$，就该预判"最后要解一个一阶线性 ODE"。==
    ` },

    { t: 'key', id: 'mirror', title: '这条路和「构造微分方程求高阶导」是同一条路的两头', c: String.raw`
      [求 $y^{(n)}(0)$ 的递推法](#/calculus/derivative/high-order?at=recurrence)是：
      $$\text{已知函数}\ \xrightarrow{\ \text{求导消根号}\ }\ \text{微分方程}
      \ \xrightarrow{\ \text{莱布尼茨}+x=0\ }\ \text{系数递推}$$

      这一页是==同一条路反着走==：
      $$\text{已知系数递推}\ \xrightarrow{\ \text{乘 }x^{n}\text{ 求和}\ }\ \text{微分方程}
      \ \xrightarrow{\ \text{解 ODE}+\text{初值}\ }\ \text{函数}$$

      两边共用同一座桥：==「函数满足的微分方程」与「泰勒系数满足的递推」是等价信息==。
      哪头好走就从哪头进 —— 这也解释了为什么 $(\arcsin x)^{2}$、$e^{a\arcsin x}$
      这些函数在两类题里反复出现：==它们恰好是这座桥两端都干净的那一族==。
    ` },

    { t: 'steps', id: 'route4-steps', title: '标准流程：四步', items: [
      { title: '两边同乘 $x^{n}$，对 $n$ 从递推成立的最小下标求和',
        c: String.raw`递推式 $f(n)a_{n+1}=g(n)a_n$ 两边乘 $x^{n}$ 再 $\sum_{n\geq1}$。
        ==求和下标必须与递推的成立范围一致==，这是最容易错的一步：
        题目说"对 $n\geq1$ 成立"，就只能从 $n=1$ 加起。` },
      { title: '把每个和式翻译成 $S$、$S^{\\prime}$、$\\int S$',
        c: String.raw`查下面那张[翻译词典](#/calculus/series/sum-function?at=dictionary)，
        逐项换掉。==平移项换完会多出或少掉首项，务必补上==。` },
      { title: '整理成一阶线性方程并解',
        c: String.raw`几乎总是化成 $S'+P(x)S=Q(x)$，
        用[积分因子公式](#/calculus/ode/solution-structure?at=first-order-formula)一步出通解。
        系数里带 $\frac{1}{1-x}$ 是常态，积分因子往往是 $(1-x)^{\alpha}$。` },
      { title: '用 $S(0)$ 定常数',
        c: String.raw`==从 $n=1$ 起求和的级数满足 $S(0)=0$==；
        从 $n=0$ 起的满足 $S(0)=a_0$。
        这一步只要代 $x=0$，一秒钟，==但漏了整题作废==。
        最后别忘了写收敛域。` },
    ] },

    { t: 'compare',
      id: 'dictionary',
      title: '翻译词典（设 $S(x)=\\sum_{n\\geq1}a_nx^{n}$）',
      cols: ['求和式', '等于', '怎么来的'],
      rows: [
        ['$\\sum_{n\\geq1}a_nx^{n}$', '$S$', '定义'],
        ['$\\sum_{n\\geq1}na_nx^{n-1}$', '$S\'$', '逐项求导'],
        ['$\\sum_{n\\geq1}na_nx^{n}$', '$xS\'$', '求导后补乘 $x$'],
        ['$\\sum_{n\\geq1}(n+1)a_{n+1}x^{n}$', '$S\'-a_1$', '令 $k=n+1$，正是 $S\'$ 掐掉首项'],
        ['$\\sum_{n\\geq1}a_{n+1}x^{n+1}$', '$S-a_1x$', '就是 $S$ 掐掉首项'],
        ['$\\sum_{n\\geq1}a_{n+1}x^{n}$', '$\\dfrac{S-a_1x}{x}$', '上一行再除以 $x$'],
        ['$\\sum_{n\\geq2}a_{n-1}x^{n}$', '$xS$', '整体升一次幂'],
        ['$\\sum_{n\\geq1}\\dfrac{a_n}{n}x^{n}$', '$\\displaystyle\\int_0^x\\frac{S(t)}{t}\\dt$', '逐项积分'],
        ['$\\sum_{n\\geq1}a_nx^{n-1}$', '$\\dfrac{S}{x}$', '整体降一次幂（$x\\neq0$）'],
      ] },

    { t: 'md', c: String.raw`
      ==只有第四行需要动脑，其余都是机械替换==。第四行值得单独记住：

      $$\sum_{n\geq1}(n+1)a_{n+1}x^{n}
      \xlongequal{\,k=n+1\,}\sum_{k\geq2}ka_kx^{k-1}
      =\underbrace{\sum_{k\geq1}ka_kx^{k-1}}_{S'}-\underbrace{1\cdot a_1x^{0}}_{a_1}
      =S'-a_1 .$$

      ==「$(n+1)a_{n+1}$ 配 $x^{n}$」这个组合天生就是 $S'$==，
      因为求导恰好把 $x^{n+1}$ 的系数 $a_{n+1}$ 变成 $(n+1)a_{n+1}x^{n}$。
      递推式左边写成 $(n+1)a_{n+1}$ 而不是别的形状，就是命题人在铺这条路。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'example-sec', c: '四、完整示范' },

    { t: 'example',
      id: 'ex-recurrence',
      title: '由递推关系求和函数：$(n+1)a_{n+1}=\\left(n+\\frac12\\right)a_n$',
      source: '竞赛 / 考研压轴常见形式',
      level: 4,
      problem: String.raw`
        设数列 $\left\{a_n\right\}$ 满足
        $$a_1=1,\qquad (n+1)a_{n+1}=\left(n+\frac12\right)a_n\quad(n\geq1).$$
        证明当 $\left|x\right|<1$ 时幂级数 $\displaystyle\sum_{n=1}^{\infty}a_nx^{n}$ 收敛，并求其和函数。
      `,
      idea: String.raw`
        **第一眼要分清两件事**：证收敛和求和函数，==难度完全不在一个量级，但都不需要通项==。

        **收敛**：比值法要的就是 $\frac{a_{n+1}}{a_n}$，递推式移个项就给了，两行完事。
        ==别去解递推==，那是给求和函数用的（而且这题的通项是双阶乘，解出来也不一定认得）。

        **和函数**：递推系数里带 $n$（左边 $n+1$、右边 $n+\frac12$），
        按[前面的判断](#/calculus/series/sum-function?at=why-ode)，母函数必然满足一个微分方程。

        真正的下手点在这里：==左边的 $(n+1)a_{n+1}$ 配上 $x^{n}$ 恰好是 $S'$==
        （见[词典第四行](#/calculus/series/sum-function?at=dictionary)），
        右边的 $na_n$ 配 $x^{n}$ 是 $xS'$、$\frac12a_n$ 配 $x^{n}$ 是 $\frac12S$。
        三项全都能翻译 —— ==所以两边同乘 $x^{n}$ 求和，是唯一自然的动作==。

        最后落到一个一阶线性 ODE，用积分因子解，$S(0)=0$ 定常数。
      `,
      solution: String.raw`
        ### 第一步：收敛半径

        由递推式，$\dfrac{a_{n+1}}{a_n}=\dfrac{n+\frac12}{n+1}=\dfrac{2n+1}{2n+2}>0$，故所有 $a_n>0$。

        $$\rho=\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|
        =\lim_{n\to\infty}\frac{2n+1}{2n+2}=1
        \quad\Longrightarrow\quad R=\frac1\rho=1 .$$

        所以当 $\left|x\right|<1$ 时级数（绝对）收敛。$\blacksquare$

        ### 第二步：建立微分方程

        记 $S(x)=\displaystyle\sum_{n=1}^{\infty}a_nx^{n}$，$x\in(-1,1)$，显然 $S(0)=0$。

        递推式两边同乘 $x^{n}$，对 $n\geq1$ 求和：
        $$\sum_{n=1}^{\infty}(n+1)a_{n+1}x^{n}
        =\sum_{n=1}^{\infty}na_nx^{n}+\frac12\sum_{n=1}^{\infty}a_nx^{n}.$$

        逐项翻译：

        - 左边：令 $k=n+1$，得 $\displaystyle\sum_{k=2}^{\infty}ka_kx^{k-1}=S'(x)-a_1=S'(x)-1$；
        - 右边第一项：$\displaystyle x\sum_{n=1}^{\infty}na_nx^{n-1}=xS'(x)$；
        - 右边第二项：$\dfrac12S(x)$。

        故
        $$S'(x)-1=xS'(x)+\frac12S(x)
        \quad\Longrightarrow\quad
        (1-x)S'(x)-\frac12S(x)=1 .$$

        ### 第三步：解一阶线性方程

        在 $(-1,1)$ 上 $1-x>0$，两边除以 $1-x$ 化成标准形式：
        $$S'-\frac{1}{2(1-x)}S=\frac{1}{1-x}.$$

        积分因子
        $$\mu=e^{\int-\frac{1}{2(1-x)}\dx}=e^{\frac12\ln(1-x)}=\sqrt{1-x}$$
        （用了 $\int\frac{\dx}{1-x}=-\ln(1-x)$，注意这个负号）。两边同乘 $\mu$：
        $$\left[\sqrt{1-x}\,S\right]'=\frac{1}{\sqrt{1-x}}
        \quad\Longrightarrow\quad
        \sqrt{1-x}\,S=-2\sqrt{1-x}+C .$$

        ### 第四步：定常数

        $$S(x)=-2+\frac{C}{\sqrt{1-x}},\qquad
        S(0)=0\Rightarrow -2+C=0\Rightarrow C=2 .$$

        $$\boxed{\ S(x)=\frac{2}{\sqrt{1-x}}-2,\qquad x\in(-1,1)\ }$$
      `,
      comment: String.raw`
        ### 验算（==这一步值一分钟，别省==）

        把答案展开回去对首项：$(1-x)^{-1/2}=1+\frac12x+\frac38x^{2}+\cdots$，故
        $$S(x)=2\left(\frac12x+\frac38x^{2}+\cdots\right)=x+\frac34x^{2}+\cdots$$
        而递推给出 $a_1=1$、$a_2=\frac{3/2}{2}=\frac34$ —— ==对上了==。

        ### 收敛域其实比题目问的更大：$[-1,1)$

        题目只要 $\left|x\right|<1$，但完整的收敛域==两个端点都要查==，
        而这里通项没有显式公式，正是[前面那条方法](#/calculus/series/sum-function?at=endpoint-without-formula)的用武之地。

        **$x=1$（发散）**：需要 $a_n$ 的下界。展开连乘
        $$a_n=\prod_{k=1}^{n-1}\frac{2k+1}{2k+2},$$
        对每个因子平方后放缩（用 $\frac{2k+1}{2k+2}>\frac{2k}{2k+1}$）：
        $$\left(\frac{2k+1}{2k+2}\right)^{2}>\frac{2k+1}{2k+2}\cdot\frac{2k}{2k+1}=\frac{k}{k+1},$$
        连乘==裂项相消==：
        $$a_n^{2}>\prod_{k=1}^{n-1}\frac{k}{k+1}=\frac1n
        \quad\Longrightarrow\quad a_n>\frac{1}{\sqrt n}.$$
        故 $\sum a_n>\sum\frac{1}{\sqrt n}$ 发散。
        （也可以从答案直接看出来：$S(x)\to+\infty$ 当 $x\to1^{-}$。）

        **$x=-1$（收敛）**：$a_n$ 显然递减（比值 $<1$）；又
        $\ln a_n=\sum_{k=1}^{n-1}\ln\left(1-\frac{1}{2k+2}\right)\leq-\sum_{k=1}^{n-1}\frac{1}{2k+2}\to-\infty$，
        故 $a_n\to0$。由莱布尼茨判别法，$\sum(-1)^{n}a_n$ 收敛。

        再用[阿贝尔定理](#/calculus/series/sum-function?at=abel)白嫖端点的和：
        $$\sum_{n=1}^{\infty}(-1)^{n}a_n=\lim_{x\to-1^{+}}S(x)=\frac{2}{\sqrt2}-2=\sqrt2-2 .$$

        所以==收敛域是 $[-1,1)$==，且上式在整个 $[-1,1)$ 上成立。

        ### 另一条路：先求通项，再查字典

        这题的通项其实解得出来。连乘化简：
        $$a_n=\frac{3\cdot5\cdots(2n-1)}{4\cdot6\cdots(2n)}
        =2\cdot\frac{(2n-1)!!}{(2n)!!}=2\cdot\frac{1}{4^{n}}\binom{2n}{n}.$$
        而[二项式家族](#/calculus/series/power-series?at=family-binomial)里恰好有
        $$\frac{1}{\sqrt{1-x}}=\sum_{n=0}^{\infty}\frac{1}{4^{n}}\binom{2n}{n}x^{n},$$
        去掉 $n=0$ 的那一项 $1$ 再乘 $2$，正是 $S(x)=\frac{2}{\sqrt{1-x}}-2$，两条路结果一致。

        ==但这条路要求你认得 $\frac{1}{4^{n}}\binom{2n}{n}$ 这个形状==，
        考场上不一定反应得过来；微分方程那条路==不依赖任何记忆，只依赖流程==，
        所以它才是这类题的主路线。

        ### 换个数字，方法不变

        把 $\frac12$ 换成一般的 $\alpha$：$(n+1)a_{n+1}=(n+\alpha)a_n$，
        同样的四步会给出 $(1-x)S'-\alpha S=1$，解得
        $$S(x)=\frac{1}{(1-x)^{\alpha}}-1 .$$
        ==这一族题的答案永远是 $(1-x)^{-\alpha}$ 的形状==，
        因为 $(1-x)^{-\alpha}$ 正是满足 $(1-x)y'=\alpha y$ 的那个函数。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **为了求半径先去解递推**：==比值法要的就是递推给的那个比值==，直接用。
      2. **求和下标没对齐递推的成立范围**：递推对 $n\geq1$ 成立就从 $n=1$ 加起，
         从 $n=0$ 加会多出一项不成立的等式。
      3. **平移后忘记补首项**：$\sum_{n\geq1}(n+1)a_{n+1}x^{n}=S'-a_1$，
         ==那个 $-a_1$ 丢了，方程右端就少一个常数，答案全错==。
      4. **积分因子里的负号**：$\int\frac{\dx}{1-x}=-\ln(1-x)$，
         少这个负号会把 $\sqrt{1-x}$ 算成 $\frac{1}{\sqrt{1-x}}$。
      5. **忘记用 $S(0)$ 定常数**：通解里的 $C$ 不定出来，题就没做完。
         ==从 $n=1$ 起的级数一律 $S(0)=0$。==
      6. **不写收敛域**：求和函数必须附定义区间，这是踩分点。
      7. **端点靠猜**：本题两个端点一个收敛一个发散，
         ==没有显式通项也能判==，见[上面的做法](#/calculus/series/sum-function?at=ex-recurrence)。
      8. **在端点直接代和函数表达式**：必须先确认端点收敛，
         再引用[阿贝尔定理](#/calculus/series/sum-function?at=abel)取极限，不能默认连续。
    ` },

  ],
});
