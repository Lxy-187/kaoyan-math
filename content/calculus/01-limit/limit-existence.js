/* ==========================================================================
   高等数学 / 1 函数、极限、连续 / 极限存在性的证明
   —— 不求值、只证"存在"。夹逼、单调有界、柯西准则。
      计算方法见 limit/limit-methods。
   ========================================================================== */

KM.page({
  path: 'calculus/limit/limit-existence',
  title: '极限存在性的证明',
  subtitle: '"求极限"和"证极限存在"是两件事。后者的主力是**夹逼**与**单调有界**——尤其是递推数列，几乎只有这一条路',
  tags: ['大题', '证明题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'md', c: String.raw`
      本页处理的是=="$\lim$ 存不存在"==而不是"$\lim$ 等于几"。

      两者的关系是：==先证存在，才能设 $A=\lim x_n$ 并解方程求出它==。
      ==顺序反了是递推数列题最常见的逻辑错误==——
      不证存在就令 $A=\lim$，等于默认了结论。
    ` },

    { t: 'key', id: 'squeeze', title: '夹逼准则', c: String.raw`
      若 $y_n\le x_n\le z_n$（从某项起），且
      $$\lim y_n=\lim z_n=A,$$
      则 $\lim x_n=A$。

      **它的价值是"不用知道 $x_n$ 是什么"**，只要能上下卡住。

      **典型的使用场合**：

      | 形状 | 放缩办法 |
      |---|---|
      | $n$ 项之和，每项形状相似 | ==全部换成最大项 / 最小项== |
      | 含 $\sqrt[n]{\cdot}$ | 夹在两个好算的 $n$ 次根之间 |
      | 含 $[x]$（取整） | $x-1<[x]\le x$ |
      | 含 $\sin,\cos$ | 用 $\abs{\sin}\le1$ |

      **第一行是最常考的**：
      $$\lim_{n\to\infty}\left(\frac{1}{n^{2}+1}+\frac{1}{n^{2}+2}+\cdots+\frac{1}{n^{2}+n}\right).$$
      共 $n$ 项，每项都在 $\frac{1}{n^{2}+n}$ 与 $\frac{1}{n^{2}+1}$ 之间，故
      $$\frac{n}{n^{2}+n}\le S_n\le\frac{n}{n^{2}+1},$$
      ==两端都趋于 $0$==，故 $S_n\to0$。

      **放缩的分寸**：==放得太松会让上下界不相等==。
      上例若放成 $0\le S_n\le\frac{n}{n^{2}}=\frac1n$ 也行（都趋于 $0$）；
      但若求的是 $\lim\sum_{k=1}^{n}\frac{n}{n^{2}+k}$（==结果是 $1$==），
      就必须用精确的两端 $\frac{n^{2}}{n^{2}+n}$ 与 $\frac{n^{2}}{n^{2}+1}$。

      ==判断"能不能夹出来"的办法：先把两端算出来看看是否相等。==

      **另一条路：转成定积分**。
      $\sum$ 的形式若能写成 $\frac1n\sum f\left(\frac kn\right)$，
      ==就是[定积分的定义](#/calculus/definite/properties?at=definition)==，
      直接积出来。==项数是 $n$、每项含 $\frac kn$ 时优先想这条。==
    ` },

    { t: 'key', id: 'monotone', title: '★ 单调有界准则：递推数列的唯一出路', c: String.raw`
      $$\boxed{\ \text{单调递增且有上界}\ \Rightarrow\ \text{极限存在}\ }$$
      （递减且有下界同理。）

      ==这是实数完备性的体现==，它==只保证存在，不给出极限值==——
      所以证完之后还要再解一个方程。

      **递推数列 $x_{n+1}=f(x_n)$ 的标准三步**：

      1. **证有界**：猜一个界（==通常就是极限值或初值==），用[数学归纳法](#/calculus/limit/limit-existence?at=induction)；
      2. **证单调**：算 $x_{n+1}-x_n$ 的符号，或比较 $\frac{x_{n+1}}{x_n}$ 与 $1$；
      3. **求极限**：设 $\lim x_n=A$，在递推式两边取极限得 $A=f(A)$，解出 $A$。
         ==若有多个根，用有界性/单调性排除==。

      **第 3 步的合法性**：==必须先有第 1、2 步==。
      $x_{n+1}=2x_n$、$x_1=1$ 时若直接令 $A=2A$ 会得 $A=0$，
      ==而实际上 $x_n=2^{n-1}\to\infty$==。
      **不证存在就取极限，是本节的头号逻辑错误。**

      **怎么猜那个界**：==先假装极限存在，解出 $A=f(A)$==，
      得到的 $A$ 就是界的候选值。
      ==这是"用结论指导证明"的合法用法==——
      猜的过程不写进答案，只写验证。
    ` },

    { t: 'method', id: 'induction', title: '证有界与单调的实操', c: String.raw`
      **证有界（归纳法）**：

      1. 验 $n=1$：$x_1\le M$；
      2. 设 $x_n\le M$，证 $x_{n+1}=f(x_n)\le M$。
         ==这一步通常要用 $f$ 的单调性==：
         $f$ 递增时 $x_n\le M\Rightarrow f(x_n)\le f(M)$，
         ==再验 $f(M)\le M$ 即可==。

      **证单调的三种写法**：

      | 方法 | 做法 |
      |---|---|
      | **作差** | 算 $x_{n+1}-x_n$ 的符号 |
      | **作商** | 正项数列比较 $\frac{x_{n+1}}{x_n}$ 与 $1$ |
      | ==**归纳**== | 由 $x_2>x_1$ 及 $f$ 递增，归纳得 $x_{n+1}>x_n$ |

      ==第三种最省事==，前提是 $f$ 单调递增：
      $$x_{n+1}>x_n\ \xRightarrow{\ f\ \text{递增}\ }\ f(x_{n+1})>f(x_n)\ \text{即}\ x_{n+2}>x_{n+1}.$$
      ==只需验证第一步 $x_2$ 与 $x_1$ 的大小==，后面自动传递。

      **$f$ 递减时要当心**：此时 $\set{x_n}$ ==一般不单调==，
      而是奇偶两个子列各自单调（一个增一个减）。
      ==处理办法是考察 $x_{n+2}=f(f(x_n))$==，$f\circ f$ 是递增的。
      **这是难题的常见设置，看到 $f$ 递减就要警惕。**
    ` },

    { t: 'key', id: 'cauchy-and-subseq', title: '另外两个工具', c: String.raw`
      **① 柯西收敛准则**（了解，很少直接考）：
      $$\set{x_n}\ \text{收敛}\iff\forall\eps>0,\exists N,\ \forall m,n>N:\ \abs{x_m-x_n}<\eps.$$
      ==好处是不需要知道极限值==。
      实际使用时常配合 $\abs{x_{n+1}-x_n}\le q\abs{x_n-x_{n-1}}$（$0<q<1$）：
      ==压缩映射，直接推出收敛==。

      **② 子列判别法**（用来证==不存在==）：
      $$\boxed{\ \text{存在两个子列极限不同}\ \Rightarrow\ \text{原极限不存在}\ }$$

      这是==证明极限不存在的标准手法==：

      | 要证不存在 | 取哪两个子列 |
      |---|---|
      | $\lim\limits_{n\to\infty}(-1)^{n}$ | $n$ 取奇数 / 偶数 |
      | $\lim\limits_{x\to0}\sin\frac1x$ | $x=\frac{1}{2k\pi}$ / $x=\frac{1}{2k\pi+\pi/2}$ |
      | $\lim\limits_{x\to0}\frac{\abs x}{x}$ | $x\to0^{+}$ / $x\to0^{-}$ |

      **反过来**：$\lim x_n=A$ 时==任何子列都趋于 $A$==，
      所以可以==用子列来"猜"极限值==（但要另证存在）。

      **函数极限的左右极限**：
      $$\lim_{x\to x_0}f(x)=A\iff \lim_{x\to x_0^{-}}f=\lim_{x\to x_0^{+}}f=A.$$
      ==含 $\abs x$、$[x]$、分段函数、$e^{1/x}$ 的题一律先分左右==。
      $e^{1/x}$ 在 $x\to0^{+}$ 时趋于 $+\infty$、$x\to0^{-}$ 时趋于 $0$，
      ==这是[间断点分类](#/calculus/limit/continuity?at=classify)的常客==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-recursion',
      title: '★ 递推数列：三步走的完整样板',
      source: '经典例题（高频）',
      level: 3,
      problem: String.raw`
        设 $x_1=\sqrt2$，$x_{n+1}=\sqrt{2+x_n}$（$n=1,2,\dots$）。
        证明 $\set{x_n}$ 收敛，并求 $\lim\limits_{n\to\infty}x_n$。
      `,
      idea: String.raw`
        **先猜极限**（不写进答案，只用来定界）：
        设 $A=\lim x_n$，则 $A=\sqrt{2+A}$，即 $A^{2}-A-2=0$，
        $$A=2\ \text{或}\ A=-1.$$
        由 $x_n>0$ 排除 $-1$，==所以极限应当是 $2$==。
        ==于是"有上界 $2$"就是要证的目标==。

        **证有界**：归纳证 $x_n<2$。
        $x_1=\sqrt2<2$；设 $x_n<2$，则
        $$x_{n+1}=\sqrt{2+x_n}<\sqrt{2+2}=2.\ \checkmark$$
        ==用了 $\sqrt{\cdot}$ 递增==。

        **证单调**：$f(x)=\sqrt{2+x}$ ==递增==，
        所以只需验第一步：$x_2=\sqrt{2+\sqrt2}\approx1.848>\sqrt2\approx1.414=x_1$。
        ==由[归纳传递](#/calculus/limit/limit-existence?at=induction)得 $\set{x_n}$ 递增==。

        **也可以直接作差**：
        $$x_{n+1}^{2}-x_n^{2}=(2+x_n)-x_n^{2}=-(x_n-2)(x_n+1)>0\quad(0<x_n<2),$$
        ==由 $x_n>0$ 得 $x_{n+1}>x_n$==。这个写法更干净，下面用它。
      `,
      solution: String.raw`
        **① 有界性**（归纳证 $0<x_n<2$）：

        $n=1$：$0<x_1=\sqrt2<2$ $\checkmark$

        设 $0<x_n<2$，则
        $$0<x_{n+1}=\sqrt{2+x_n}<\sqrt{2+2}=2.$$
        故对一切 $n$ 有 $0<x_n<2$。

        **② 单调性**：由 $x_{n+1}^{2}=2+x_n$ 及 $0<x_n<2$，
        $$x_{n+1}^{2}-x_n^{2}=2+x_n-x_n^{2}=-(x_n-2)(x_n+1)>0,$$
        （因 $x_n-2<0$、$x_n+1>0$）。又 $x_n,x_{n+1}>0$，故
        $$x_{n+1}>x_n,$$
        即 $\set{x_n}$ ==单调递增==。

        **③ 由单调有界准则**，$\lim\limits_{n\to\infty}x_n$ 存在，记为 $A$。
        在 $x_{n+1}=\sqrt{2+x_n}$ 两边取极限：
        $$A=\sqrt{2+A}\ \Longrightarrow\ A^{2}-A-2=0\ \Longrightarrow\ A=2\ \text{或}\ A=-1.$$

        由 $x_n>0$ 知 $A\ge0$，故舍去 $A=-1$，得
        $$\lim_{n\to\infty}x_n=2.$$
      `,
      comment: String.raw`
        **数值验证**：
        $x_1=1.41421$、$x_2=1.84776$、$x_3=1.96157$、$x_4=1.99037$、
        $x_5=1.99759$、$x_{10}\approx1.99999$，==确实单调递增趋于 $2$==。$\checkmark$

        **三步的逻辑顺序不能乱**：

        $$\boxed{\ \text{有界}+\text{单调}\ \Rightarrow\ \text{存在}\ \Rightarrow\ \text{解方程求值}\ }$$

        ==第三步用的"两边取极限"，前提是极限存在==。
        若跳过前两步直接写 $A=\sqrt{2+A}$，==逻辑上是循环论证==，
        阅卷会扣掉大部分分数。

        **界的选取有讲究**：本题证 $x_n<2$ 恰好，
        ==若证 $x_n<3$ 也对（也是上界），但后面排除根时会麻烦==。
        ==用猜出来的极限值当界，是最省事的选择。==

        **变体一：改变初值**。$x_1=5$ 时，
        $x_2=\sqrt7\approx2.646<5$，==数列变成递减==，
        有下界 $2$，==极限仍是 $2$==。
        ==所以这类题的极限与初值无关（只要在收敛域内），但单调方向会变==，
        答题时必须按实际初值判断。

        **变体二：$f$ 递减的情形**。
        若递推是 $x_{n+1}=\frac{1}{1+x_n}$，$f$ 递减，
        ==数列不单调==（奇偶子列一增一减），
        要考察 $x_{n+2}=f(f(x_n))$，见[实操那一节](#/calculus/limit/limit-existence?at=induction)。
      `,
    },

    { t: 'example',
      id: 'ex-squeeze',
      title: '夹逼 vs 定积分：$n$ 项和的两条路',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        求下列极限：
        $$\text{(1)}\ \lim_{n\to\infty}\left(\frac{n}{n^{2}+1}+\frac{n}{n^{2}+2}+\cdots+\frac{n}{n^{2}+n}\right)$$
        $$\text{(2)}\ \lim_{n\to\infty}\frac1n\left(\sin\frac\pi n+\sin\frac{2\pi}{n}+\cdots+\sin\frac{n\pi}{n}\right)$$
      `,
      idea: String.raw`
        **(1) 用夹逼**。共 $n$ 项，每项 $\frac{n}{n^{2}+k}$（$k=1,\dots,n$）：
        $$\frac{n}{n^{2}+n}\le\frac{n}{n^{2}+k}\le\frac{n}{n^{2}+1}.$$
        $n$ 项相加：
        $$\frac{n^{2}}{n^{2}+n}\le S_n\le\frac{n^{2}}{n^{2}+1}.$$
        ==两端都趋于 $1$==，故 $S_n\to1$。

        **能不能用定积分**？形式上 $\frac{n}{n^{2}+k}=\frac1n\cdot\frac{1}{1+k/n^{2}}$，
        ==而 $\frac{k}{n^{2}}$ 不是 $\frac kn$ 的形式==，
        ==凑不出定积分的定义==。所以这题只能夹逼。

        **(2) 用定积分**。形式上恰好是
        $$\frac1n\sum_{k=1}^{n}\sin\frac{k\pi}{n}=\frac1n\sum_{k=1}^{n}f\left(\frac kn\right),
        \qquad f(t)=\sin(\pi t),$$
        ==正是 $\int_0^1f(t)\dt$ 的黎曼和==（把 $[0,1]$ 等分成 $n$ 份，取右端点）。

        **能不能用夹逼**？$\sin\frac{k\pi}{n}$ 在 $k$ 从 $1$ 到 $n$ 时
        ==先增后减，最大是 $1$、最小接近 $0$==，
        夹出来是 $0\le S_n\le1$，==夹不住==。

        $$\boxed{\ \text{每项含 }\frac kn\ \Rightarrow\ \text{定积分};\qquad
        \text{各项大小相近但凑不出 }\frac kn\ \Rightarrow\ \text{夹逼}\ }$$
      `,
      solution: String.raw`
        **(1)** 记 $S_n=\displaystyle\sum_{k=1}^{n}\frac{n}{n^{2}+k}$。
        由 $1\le k\le n$，
        $$\frac{n}{n^{2}+n}\le\frac{n}{n^{2}+k}\le\frac{n}{n^{2}+1}.$$
        对 $k=1,\dots,n$ 求和（共 $n$ 项）：
        $$\frac{n\cdot n}{n^{2}+n}\le S_n\le\frac{n\cdot n}{n^{2}+1},$$
        即
        $$\frac{n^{2}}{n^{2}+n}\le S_n\le\frac{n^{2}}{n^{2}+1}.$$
        而
        $$\lim_{n\to\infty}\frac{n^{2}}{n^{2}+n}=1,\qquad
        \lim_{n\to\infty}\frac{n^{2}}{n^{2}+1}=1.$$
        由夹逼准则，$\lim\limits_{n\to\infty}S_n=1$。

        **(2)** 记 $T_n=\dfrac1n\displaystyle\sum_{k=1}^{n}\sin\frac{k\pi}{n}$。
        取 $f(t)=\sin(\pi t)$，把 $[0,1]$ 等分为 $n$ 份，
        小区间长 $\dfrac1n$，取右端点 $t_k=\dfrac kn$，则 $T_n$ 是 $f$ 在 $[0,1]$ 上的黎曼和。

        由 $f$ 连续（故可积），
        $$\lim_{n\to\infty}T_n=\int_0^{1}\sin(\pi t)\dt
        =\left[-\frac{\cos\pi t}{\pi}\right]_0^{1}
        =-\frac{\cos\pi}{\pi}+\frac{\cos0}{\pi}=\frac{2}{\pi}.$$
      `,
      comment: String.raw`
        **数值检查**：
        (1) $n=1000$ 时 $S_n\approx0.99950$，==趋于 $1$== $\checkmark$
        (2) $n=1000$ 时 $T_n\approx0.63662$，而 $\frac2\pi\approx0.63662$ $\checkmark$

        **识别定积分定义的三个特征**：

        1. 前面有 ==$\frac1n$==（对应 $\dx$）；
        2. 求和项里出现 ==$\frac kn$==（对应 $x$）；
        3. 求和从 $k=1$ 到 $n$（对应 $[0,1]$）。

        ==三条齐了就直接写 $\int_0^1f(x)\dx$==。

        **变形的处理**：

        | 形式 | 对应积分 |
        |---|---|
        | $\frac1n\sum_{k=1}^{n}f\left(\frac kn\right)$ | $\int_0^1f$ |
        | $\frac1n\sum_{k=1}^{2n}f\left(\frac kn\right)$ | ==$\int_0^2f$==（$k$ 到 $2n$） |
        | $\frac1n\sum_{k=n+1}^{2n}f\left(\frac kn\right)$ | $\int_1^2f$ |
        | $\sum_{k=1}^{n}\frac{1}{n+k}$ | $\frac1n\sum\frac{1}{1+k/n}=\int_0^1\frac{\dx}{1+x}=\ln2$ |

        ==最后一行很常考==：$\frac{1}{n+k}$ 要先提出 $\frac1n$ 才看得出结构。

        **(1) 与 (4) 形似而不同**：
        $\sum\frac{n}{n^{2}+k}$ 的分母是 $n^{2}+k$（==$k$ 相对 $n^2$ 可忽略==），
        $\sum\frac{1}{n+k}$ 的分母是 $n+k$（==$k$ 与 $n$ 同量级，不可忽略==）。
        ==前者夹逼、后者定积分，判据就在这里。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **不证存在就令 $A=\lim x_n$**：==本节头号逻辑错误==，
         必须先证单调有界。
      2. **归纳法漏掉起始验证**：$n=1$ 那一步不能省。
      3. **夹逼放得太松**：==上下界要趋于同一个数==，
         算完两端先看看是否相等。
      4. **该用定积分却用夹逼**：==每项含 $\frac kn$ 时优先想定积分==。
      5. **定积分定义的区间搞错**：看求和上下标，
         $k$ 从 $1$ 到 $2n$ 对应 $[0,2]$。
      6. **$f$ 递减时默认数列单调**：==要考察 $f\circ f$==。
      7. **解出多个根不排除**：用有界性、正负性、单调性排除。
      8. **左右极限不分**：含 $\abs x$、$[x]$、$e^{1/x}$、分段函数时==必须分==。
      9. **子列法证存在**：==子列只能证不存在==（找两个极限不同的），
         不能由"某个子列收敛"推出原数列收敛。
    ` },

  ],
});
