/* ==========================================================================
   线性代数 / 5 特征值与特征向量 / 由特征值反求矩阵 / 求方幂
   —— 本章的收尾：把 A = P Λ P⁻¹ 这条式子正着用、反着用。
      对角化条件见 eigen/similarity；实对称见 eigen/symmetric。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/eigen/applications',
  title: '由特征值反求矩阵 / 求方幂',
  subtitle: '一条式子两个方向：$A=P\\Lambda P\\inv$ 正着用求 $A^{k}$、$f(A)$，反着用由特征值特征向量拼回 $A$',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'master', title: '一条式子统摄全页', c: String.raw`
      $A$ 可对角化时，存在可逆 $P$ 与对角阵 $\Lambda$ 使
      $$\boxed{\ P\inv AP=\Lambda\quad\Longleftrightarrow\quad A=P\Lambda P\inv\ }$$
      其中 $P$ 的第 $j$ 列是 $\lambda_j$ 的特征向量，$\Lambda=\diag(\lambda_1,\dots,\lambda_n)$，
      ==顺序一一对应==。

      **两个方向的用法**：

      | 方向 | 已知 | 求 | 典型问法 |
      |---|---|---|---|
      | ==正着用== | $A$ | $A^{k}$、$f(A)$ | "求 $A^{100}$" |
      | ==反着用== | 特征值与特征向量 | $A$ | "求 $A$" |

      **正着用的关键一步**：
      $$A^{k}=(P\Lambda P\inv)^{k}=P\Lambda^{k}P\inv,$$
      ==中间的 $P\inv P$ 成对相消==，只剩两头。
      而 $\Lambda^{k}=\diag(\lambda_1^{k},\dots,\lambda_n^{k})$，==对角阵求幂是逐个求幂==。

      更一般地，对任何多项式 $f$：
      $$f(A)=Pf(\Lambda)P\inv=P\diag\bigl(f(\lambda_1),\dots,f(\lambda_n)\bigr)P\inv.$$

      ==这就是[把矩阵问题降成数的问题](#/linear-algebra/eigen/basics?at=fA)的完整版==：
      对角化之后，一切矩阵运算都退化成对每个特征值单独做一次。
    ` },

    { t: 'method', id: 'power-routes', title: '求 $A^{k}$：四条路，按顺序试', c: String.raw`
      ==不是所有题都该对角化==，先扫一眼有没有更快的：

      | $A$ 的样子 | 方法 | 工作量 |
      |---|---|---|
      | ==$\rank(A)=1$==（$A=\alpha\beta\T$） | $A^{k}=\tr(A)^{k-1}A$ | ==一行== |
      | $A=kE+N$，$N$ 幂零 | 二项式展开（有限项） | 几行 |
      | 可对角化 | $A^{k}=P\Lambda^{k}P\inv$ | ==要求 $P\inv$== |
      | 都不是 | 算 $A^{2},A^{3}$ 找规律 + 归纳 | 看运气 |

      ==前两条在[矩阵那一章](#/linear-algebra/matrix/operations?at=powers)讲过==，
      本页专攻第三条。

      **对角化路线的四步**：

      1. 求特征值与特征向量；
      2. 拼出 $P$ 与 $\Lambda$（==顺序对应==）；
      3. 求 $P\inv$（==$3$ 阶用[初等变换](#/linear-algebra/matrix/block?at=elementary-as-inverse)，$2$ 阶用伴随公式==）；
      4. 算 $P\Lambda^{k}P\inv$，==按 $P\cdot\Lambda^{k}$ 先乘、再乘 $P\inv$ 的顺序==，
         中间那步是"$P$ 的第 $j$ 列乘 $\lambda_j^{k}$"，很快。

      **第 3 步是全题最耗时的地方**。两个提速办法：

      - ==特征向量可以自由缩放==，选取分量为整数且尽量含 $0,1$ 的那组，$P\inv$ 会好算；
      - $A$ 是[实对称矩阵](#/linear-algebra/eigen/symmetric?at=four-properties)时，
        把特征向量==单位正交化==，则 $P$ 是正交矩阵，==$P\inv=P\T$，白送==。

      **算完的自检**：令 $k=1$ 代回去应当得到 $A$ 本身，==这一步能抓住绝大多数错误==。
    ` },

    { t: 'method', id: 'reverse', title: '★ 反求 $A$：由谱信息拼回矩阵', c: String.raw`
      题目给出 $n$ 个特征值与对应的 $n$ 个线性无关特征向量，求 $A$。

      $$\boxed{\ A=P\Lambda P\inv\ }$$

      **三步**：

      1. 按题目给的顺序把特征向量拼成 $P$，特征值拼成 $\Lambda$；
      2. 求 $P\inv$；
      3. 做两次矩阵乘法。==先算 $P\Lambda$（等于"把 $P$ 的第 $j$ 列乘 $\lambda_j$"，不是真的乘矩阵）==，
         再乘 $P\inv$。

      **信息不全时的两种补法**：

      - **实对称矩阵**：只给了部分特征向量时，
        用[正交性反求](#/linear-algebra/eigen/symmetric?at=orthogonal-trick)补齐——
        不同特征值的特征向量必正交，列方程 $\xi\T x=0$ 解出剩下的；
      - **由 $A\xi_i=\lambda_i\xi_i$ 直接拼**：
        把 $n$ 个等式并成 $A(\xi_1,\dots,\xi_n)=(\lambda_1\xi_1,\dots,\lambda_n\xi_n)$，
        ==即 $AP=P\Lambda$==，右乘 $P\inv$ 即得。
        这与第一种是同一件事，==但写成 $AP=P\Lambda$ 更不容易记错方向==。

      **方向千万别写反**：$A=P\Lambda P\inv$，==不是 $P\inv\Lambda P$==。
      验证办法：两边右乘 $P$ 看是否回到 $AP=P\Lambda$，
      而 $AP$ 的第 $j$ 列应当是 $A\xi_j=\lambda_j\xi_j$。==三十秒就能确认。==
    ` },

    { t: 'key', id: 'symmetric-shortcut', title: '实对称矩阵：$P\\inv=P\\T$ 的便宜', c: String.raw`
      $A$ 为实对称矩阵时，可以取 $P=Q$ 为==正交矩阵==（各列是单位正交的特征向量），此时
      $$Q\inv=Q\T\ \Longrightarrow\ A=Q\Lambda Q\T,\qquad A^{k}=Q\Lambda^{k}Q\T.$$

      ==求逆这一步彻底免了==，这是实对称题几乎总比一般矩阵题好做的原因。

      **代价是要做单位正交化**：

      - 不同特征值的特征向量==自动正交==（[实对称的第 2 条性质](#/linear-algebra/eigen/symmetric?at=four-properties)），
        只需单位化；
      - ==同一个重根内部的特征向量不一定正交==，要先做
        [施密特正交化](#/linear-algebra/eigen/symmetric?at=schmidt)再单位化。

      **权衡**：若题目只要求 $A^{k}$ 而不要求 $Q$ 正交，
      ==直接用不正交的 $P$ 然后老实求 $P\inv$ 往往更快==（省掉开根号）。
      ==只有题目明确要"正交变换"时才必须正交化==，
      比如[化二次型标准形](#/linear-algebra/quadratic/standard?at=orthogonal-method)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-power',
      title: '对角化求高次幂',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        设 $A=\begin{pmatrix}3&-2\\ 1&0\end{pmatrix}$，求 $A^{n}$。
      `,
      idea: String.raw`
        $2$ 阶矩阵，==秩为 $2$ 不是秩 $1$，也不是 $kE+$ 幂零==，
        所以走[对角化路线](#/linear-algebra/eigen/applications?at=power-routes)。

        **$2$ 阶的好处**：$P\inv$ 用[伴随公式](#/linear-algebra/matrix/operations?at=adjugate)
        一步写出（==主对调、副变号、除以行列式==），不必做初等变换。

        **先估一下特征值**：$\tr(A)=3$，$\abs A=0-(-2)=2$，
        所以两个特征值之和为 $3$、之积为 $2$，==一眼看出是 $1$ 和 $2$==。
        ==这个"和与积"的猜法对 $2$ 阶矩阵几乎总能秒杀==，
        比展开特征多项式快。

        **预判结果的形状**：$A^{n}$ 的每个元素应当是 $c_1\cdot1^{n}+c_2\cdot2^{n}$ 的形式，
        即==只含 $2^{n}$ 和常数==。算完对照一下形状就知道有没有错。
      `,
      solution: String.raw`
        **特征值**：$\tr(A)=3$，$\abs A=2$，故特征方程为 $\lambda^{2}-3\lambda+2=0$，
        $$\lambda_1=1,\qquad \lambda_2=2.$$

        **特征向量**：

        $\lambda_1=1$：$(E-A)x=0$，即 $\begin{pmatrix}-2&2\\ -1&1\end{pmatrix}x=0$，
        得 $x_1=x_2$，取 $\xi_1=(1,1)\T$。

        $\lambda_2=2$：$(2E-A)x=0$，即 $\begin{pmatrix}-1&2\\ -1&2\end{pmatrix}x=0$，
        得 $x_1=2x_2$，取 $\xi_2=(2,1)\T$。

        **拼 $P$ 与 $\Lambda$**：
        $$P=\begin{pmatrix}1&2\\ 1&1\end{pmatrix},\qquad
        \Lambda=\begin{pmatrix}1&0\\ 0&2\end{pmatrix},\qquad
        \abs P=1-2=-1,$$
        $$P\inv=\frac{1}{-1}\begin{pmatrix}1&-2\\ -1&1\end{pmatrix}
        =\begin{pmatrix}-1&2\\ 1&-1\end{pmatrix}.$$

        **计算**：先算 $P\Lambda^{n}$（第一列乘 $1^{n}$、第二列乘 $2^{n}$）：
        $$P\Lambda^{n}=\begin{pmatrix}1&2\cdot2^{n}\\ 1&2^{n}\end{pmatrix},$$
        再右乘 $P\inv$：
        $$A^{n}=\begin{pmatrix}1&2^{n+1}\\ 1&2^{n}\end{pmatrix}
        \begin{pmatrix}-1&2\\ 1&-1\end{pmatrix}
        =\begin{pmatrix}
        -1+2^{n+1} & 2-2^{n+1}\\
        -1+2^{n} & 2-2^{n}
        \end{pmatrix}.$$

        **验算（$n=1$）**：
        $$\begin{pmatrix}-1+4&2-4\\ -1+2&2-2\end{pmatrix}
        =\begin{pmatrix}3&-2\\ 1&0\end{pmatrix}=A.\ \checkmark$$
      `,
      comment: String.raw`
        **$n=1$ 的验算是这类题的标配**，成本几乎为零却能抓住
        特征向量拼错顺序、$P\inv$ 算错、乘法顺序颠倒等几乎所有错误。
        ==建议写在答卷上，也算过程分。==

        **$2$ 阶特征值的"和积法"值得固定下来**：
        $$\lambda_1+\lambda_2=\tr(A),\qquad \lambda_1\lambda_2=\abs A,$$
        ==凑出两个整数即可==，比展开 $\abs{\lambda E-A}$ 快得多。
        $3$ 阶时这两条仍成立，可以用来==验算==或者在已知一个根时降次。

        **顺序必须对应**：$P$ 的第一列是 $\lambda_1=1$ 的特征向量，
        所以 $\Lambda$ 的第一个对角元必须是 $1$。
        ==把 $\Lambda$ 写成 $\diag(2,1)$ 而 $P$ 不动，结果就全错==。

        **同一题的另一条路（不用对角化）**：由 $\lambda^{2}-3\lambda+2=0$ 知
        $A^{2}=3A-2E$，==于是可以递推==：设 $A^{n}=a_nA+b_nE$，
        代入得 $a_{n+1}=3a_n+b_n$、$b_{n+1}=-2a_n$。
        这条路==避免了求 $P\inv$==，在 $P$ 难求时更划算，
        本质是[凯莱–哈密顿定理](#/linear-algebra/eigen/basics?at=fA)的用法。
      `,
    },

    { t: 'example',
      id: 'ex-reverse',
      title: '★ 实对称矩阵：由部分谱信息反求 $A$',
      source: '经典大题（高频）',
      level: 4,
      problem: String.raw`
        设 $3$ 阶实对称矩阵 $A$ 的特征值为 $\lambda_1=1,\ \lambda_2=\lambda_3=-1$，
        且 $\lambda_1=1$ 对应的特征向量为 $\xi_1=(1,1,1)\T$。求 $A$。
      `,
      idea: String.raw`
        **题目只给了一个特征向量**，另外两个要自己补。
        ==这正是[实对称专属技巧](#/linear-algebra/eigen/symmetric?at=orthogonal-trick)的适用场景==：
        二重根 $-1$ 的特征向量必须与 $\xi_1$ ==正交==，即满足
        $$\xi_1\T x=0\iff x_1+x_2+x_3=0.$$
        这个齐次方程的解空间是 $3-1=2$ 维，==个数恰好对上二重根==。

        **补出来之后有两条路**：

        - **常规路**：拼 $P$、求 $P\inv$、算 $P\Lambda P\inv$。
          ==要正交化才能用 $P\T$ 代替 $P\inv$，否则要老实求逆==。
        - **巧路**：注意特征值只有 $1$ 和 $-1$ 两个值，
          ==可以把 $A$ 写成投影的组合==，避开求逆。

        **巧路的想法**：设 $u=\frac{\xi_1}{\abs{\xi_1}}$ 是单位向量，则
        $uu\T$ 是"向 $\xi_1$ 方向投影"的矩阵。
        $A$ 在 $\xi_1$ 方向上乘 $1$、在与之正交的平面上乘 $-1$，故
        $$A=1\cdot uu\T+(-1)\cdot(E-uu\T)=2uu\T-E.$$
        ==一步就出来了，完全不用求逆==。
        这条路的前提是"特征值只有两个值 + 实对称"，==本题正好满足==。
      `,
      solution: String.raw`
        **解法（谱分解）**：由 $A$ 实对称，$\lambda=-1$ 的特征子空间是 $\xi_1$ 的正交补，即
        $$\set{x:\ x_1+x_2+x_3=0},$$
        它是 $2$ 维的，与二重根相符。

        记单位向量
        $$u=\frac{\xi_1}{\norm{\xi_1}}=\frac{1}{\sqrt3}(1,1,1)\T,
        \qquad uu\T=\frac13\begin{pmatrix}1&1&1\\ 1&1&1\\ 1&1&1\end{pmatrix}.$$

        $A$ 在 $u$ 方向上作用为 $\times1$，在其正交补上作用为 $\times(-1)$，故
        $$A=1\cdot uu\T+(-1)\cdot\bigl(E-uu\T\bigr)=2uu\T-E.$$

        代入计算：
        $$A=\frac23\begin{pmatrix}1&1&1\\ 1&1&1\\ 1&1&1\end{pmatrix}
        -\begin{pmatrix}1&0&0\\ 0&1&0\\ 0&0&1\end{pmatrix}
        =\begin{pmatrix}
        -\frac13&\frac23&\frac23\\[2pt]
        \frac23&-\frac13&\frac23\\[2pt]
        \frac23&\frac23&-\frac13
        \end{pmatrix}
        =\frac13\begin{pmatrix}
        -1&2&2\\ 2&-1&2\\ 2&2&-1
        \end{pmatrix}.$$

        **验算**：

        - $A\xi_1=\frac13(-1+2+2,\ 2-1+2,\ 2+2-1)\T=\frac13(3,3,3)\T=(1,1,1)\T=1\cdot\xi_1\ \checkmark$
        - 取 $\eta=(-1,1,0)\T$（满足 $x_1+x_2+x_3=0$）：
          $A\eta=\frac13(1+2,\ -2-1,\ -2+2)\T=\frac13(3,-3,0)\T=(1,-1,0)\T=-\eta\ \checkmark$
        - $\tr(A)=-1=1+(-1)+(-1)\ \checkmark$，$A$ 对称 $\checkmark$
      `,
      comment: String.raw`
        **谱分解的一般形式**（实对称、特征值只取两个值时特别好用）：
        $$A=\sum_i\lambda_i\,u_iu_i\T\qquad(u_i\ \text{为单位正交特征向量}),$$
        ==每一项都是"投影到该特征方向再乘特征值"==。
        本题因为 $\lambda=-1$ 的子空间是整个正交补，
        可以把它整块写成 $E-uu\T$，==省掉了求那两个特征向量==。

        **常规路线作为对照**（考试中更稳妥的写法）：
        取 $\lambda=-1$ 的两个特征向量 $\xi_2=(-1,1,0)\T$、$\xi_3=(-1,0,1)\T$，
        拼 $P=(\xi_1,\xi_2,\xi_3)$，$\Lambda=\diag(1,-1,-1)$，
        算 $A=P\Lambda P\inv$——==结果相同，但要做一次 $3$ 阶求逆==。
        ==两条路都要会：巧路适合选择填空，常规路适合大题写过程。==

        **注意 $\xi_2,\xi_3$ 不必正交**（它们内积为 $1\ne0$）。
        只有当题目要求"求正交矩阵 $Q$"时才需要
        [施密特正交化](#/linear-algebra/eigen/symmetric?at=schmidt)；
        ==只求 $A$ 的话用任意一组基础解系即可==，因为 $P\Lambda P\inv$ 的结果与选取无关。

        **验算的三件事**（缺一不可）：
        特征向量方向验一次、正交补方向验一次、==检查 $A$ 是否对称==。
        ==算出来不对称，一定是哪一步错了==——这是实对称题最快的自检。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **$A=P\Lambda P\inv$ 写反成 $P\inv\Lambda P$**：
         ==用 $AP=P\Lambda$ 验证方向==，$AP$ 的第 $j$ 列是 $\lambda_j\xi_j$。
      2. **$P$ 与 $\Lambda$ 顺序不对应**：第 $j$ 列的特征向量配第 $j$ 个特征值。
      3. **不可对角化却硬套**：==先验几何重数是否等于代数重数==，
         见[可对角化条件](#/linear-algebra/eigen/similarity?at=condition)。
      4. **实对称忘了可以用 $P\T$**：正交化之后 $P\inv=P\T$，==省一次求逆==。
      5. **只求 $A$ 却做了正交化**：==没要求正交时不必单位化==，白费时间。
      6. **重根内部默认正交**：==同一重根的基础解系一般不正交==，
         要正交需施密特。
      7. **算完不验算**：$A^{k}$ 令 $k=1$，反求 $A$ 验特征向量与对称性。
      8. **秩 $1$ 或幂零却绕道对角化**：==先扫一眼有没有捷径==。
    ` },

  ],
});
