/* ==========================================================================
   线性代数 / 5 特征值与特征向量 / 特征值特征向量的求法与性质
   —— 本章第一页：定义、求法、两组性质、f(A) 的特征值。
      对角化见 eigen/similarity；实对称见 eigen/symmetric；反求见 eigen/applications。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/eigen/basics',
  title: '特征值特征向量的求法与性质',
  subtitle: '$A\\xi=\\lambda\\xi$ 找的是**被 $A$ 拉伸但不转向的方向**。整章的计算都从解 $\\abs{\\lambda E-A}=0$ 开始',
  tags: ['小题', '大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'def', title: '定义：不改变方向的那些向量', c: String.raw`
      设 $A$ 为 $n$ 阶方阵。若存在数 $\lambda$ 与==非零==向量 $\xi$ 使
      $$\boxed{\ A\xi=\lambda\xi,\qquad \xi\ne0\ }$$
      则称 $\lambda$ 为 $A$ 的**特征值**，$\xi$ 为对应的**特征向量**。

      ==$\xi\ne0$ 是定义的一部分==：零向量满足任何 $\lambda$ 的等式，
      允许它就没有意义了。
      **但 $\lambda=0$ 是允许的**——$\lambda=0$ 意味着 $A\xi=0$ 有非零解，
      即 ==$A$ 不可逆==。

      **几何含义**：$A$ 作为线性变换，一般会把向量既拉伸又转向；
      ==特征向量是那些"只被拉伸、方向不变"的特殊方向==，
      特征值就是拉伸的倍数（负数表示反向）。

      **等价的方程形式**（这是求法的出发点）：
      $$A\xi=\lambda\xi\iff(\lambda E-A)\xi=0,$$
      要它有非零解，由[齐次方程组的判据](#/linear-algebra/linear-systems/solvability?at=three-cases)
      $$\boxed{\ \abs{\lambda E-A}=0\ }$$
      这就是**特征方程**，左边的 $n$ 次多项式叫**特征多项式**。

      ==注意 $\lambda E-A$ 和 $A-\lambda E$ 只差一个 $(-1)^{n}$，
      行列式为零的根完全相同==，用哪个都行，但要前后一致。
    ` },

    { t: 'method', id: 'steps', title: '求特征值与特征向量：三步', c: String.raw`
      1. **写特征多项式**并解 $\abs{\lambda E-A}=0$，得到全部特征值（==含重数==）；
      2. **对每个 $\lambda_i$**，解齐次方程组 $(\lambda_iE-A)x=0$，求基础解系；
      3. **写通解**：该特征值的全部特征向量是
         $$k_1\xi_1+\cdots+k_s\xi_s\qquad(k_i\ \text{不全为零}),$$
         ==必须注明"不全为零"==，否则把零向量也算进去了。

      **第 1 步的两个提速技巧**：

      - ==三角矩阵、分块三角矩阵的特征值直接读对角线==，不必展开行列式；
      - 展开时==先用[行列式性质](#/linear-algebra/determinant/computation?at=properties)化简==，
        尤其是"各行和相等"型（把各列加到第一列，提出公因子 $\lambda-s$），
        ==能直接因式分解，避免解三次方程==。

      **第 2 步的自检**：$\lambda_i$ 是 $n_i$ 重根时，
      基础解系的个数（几何重数）满足
      $$1\le n-\rank(\lambda_iE-A)\le n_i.$$
      ==算出来超过 $n_i$ 或等于 $0$，一定是算错了==。

      **一条很有用的验算**（成本极低，务必做）：
      $$\sum_i\lambda_i=\tr(A),\qquad \prod_i\lambda_i=\abs A.$$
    ` },

    { t: 'key', id: 'value-props', title: '特征值的性质', c: String.raw`
      $$\boxed{\ \lambda_1+\lambda_2+\cdots+\lambda_n=\tr(A),\qquad
      \lambda_1\lambda_2\cdots\lambda_n=\abs A\ }$$
      （$n$ 个特征值==按重数计算==，复数域上一定有 $n$ 个。）

      **由行列式那条立得的一串**：
      $$\abs A=0\iff0\ \text{是特征值}\iff A\ \text{不可逆},$$
      这正是[可逆等价条件](#/linear-algebra/matrix/operations?at=invertible-equiv)的第 $8$ 条。

      **两个常考的小结论**：

      - $A$ 与 $A\T$ 有==完全相同的特征值==（$\abs{\lambda E-A\T}=\abs{(\lambda E-A)\T}=\abs{\lambda E-A}$），
        ==但特征向量一般不同==；
      - $A$ 与 $B$ 相似 $\Rightarrow$ 特征值相同，
        ==反之不成立==（见[相似不变量](#/linear-algebra/eigen/similarity?at=necessary-only)）。

      **实对称矩阵的特征值必为实数**，见[四条性质](#/linear-algebra/eigen/symmetric?at=four-properties)；
      一般实矩阵的特征值==可以是复数==（如旋转矩阵 $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ 的特征值是 $\pm i$）。
      ==考研的计算题一律给实特征值，但概念题会拿这一点设问。==
    ` },

    { t: 'key', id: 'vector-props', title: '特征向量的性质：三条，第三条最易错', c: String.raw`
      **① 同一特征值的特征向量，非零线性组合仍是特征向量。**
      若 $A\xi_1=\lambda\xi_1$、$A\xi_2=\lambda\xi_2$，则
      $$A(k_1\xi_1+k_2\xi_2)=\lambda(k_1\xi_1+k_2\xi_2),$$
      ==只要组合结果非零==，它就还是 $\lambda$ 的特征向量。
      所以每个特征值对应一整个**特征子空间**（去掉零向量）。

      **② 不同特征值的特征向量线性无关。**
      更强的版本：==不同特征值各取一组线性无关的特征向量，合起来仍线性无关==。
      这是[可对角化条件](#/linear-algebra/eigen/similarity?at=condition)的基础。

      **③ 不同特征值的特征向量之和，==不再是特征向量==。**
      设 $A\xi_1=\lambda_1\xi_1$、$A\xi_2=\lambda_2\xi_2$ 且 $\lambda_1\ne\lambda_2$，则
      $$A(\xi_1+\xi_2)=\lambda_1\xi_1+\lambda_2\xi_2,$$
      ==这不是 $\xi_1+\xi_2$ 的常数倍==（否则由 ② 的无关性可推出 $\lambda_1=\lambda_2$）。

      ==第 ③ 条是本章头号陷阱==：
      "$\xi_1,\xi_2$ 分别是 $\lambda_1,\lambda_2$ 的特征向量，问 $\xi_1+\xi_2$ 是否为特征向量"，
      答案是==否==。
      **口诀：同一特征值内可以随便组合，跨特征值一律不行。**

      **④ 一个特征向量只属于一个特征值**（若 $A\xi=\lambda\xi=\mu\xi$ 则 $(\lambda-\mu)\xi=0$，
      由 $\xi\ne0$ 得 $\lambda=\mu$）。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'fA-sec', c: '一、$f(A)$ 的特征值：整章最好用的一条' },

    { t: 'key', id: 'fA', title: '★ 特征值跟着运算走，特征向量不变', c: String.raw`
      设 $A\xi=\lambda\xi$（$\xi\ne0$），则

      | 矩阵 | 特征值 | 特征向量 |
      |---|---|---|
      | $kA$ | $k\lambda$ | ==$\xi$ 不变== |
      | $A^{m}$ | $\lambda^{m}$ | $\xi$ 不变 |
      | $A+kE$ | $\lambda+k$ | $\xi$ 不变 |
      | $f(A)$（多项式） | $f(\lambda)$ | $\xi$ 不变 |
      | $A\inv$（$A$ 可逆） | $\dfrac1\lambda$ | $\xi$ 不变 |
      | $A^{*}$（$A$ 可逆） | $\dfrac{\abs A}{\lambda}$ | $\xi$ 不变 |
      | $P\inv AP$ | $\lambda$ 不变 | ==$P\inv\xi$== |

      ==前六行特征向量都不变，只有相似变换会改变特征向量==。

      **推导都只有一行**，以 $A^{*}$ 为例：
      由 $A^{*}=\abs A\,A\inv$ 与 $A\inv\xi=\frac1\lambda\xi$ 得
      $A^{*}\xi=\frac{\abs A}{\lambda}\xi$。
      ==记不住就现推，比背表可靠。==

      **最重要的用法：由 $f(A)=O$ 限定特征值。**
      若 $f(A)=O$，则对任意特征值 $\lambda$ 有
      $$f(A)\xi=f(\lambda)\xi=0\ \xRightarrow{\ \xi\ne0\ }\ f(\lambda)=0,$$
      即 ==$A$ 的特征值必是 $f$ 的根==。

      **例**：$A^{2}=A\Rightarrow\lambda^{2}=\lambda\Rightarrow\lambda\in\set{0,1}$；
      $A^{2}=E\Rightarrow\lambda=\pm1$；
      $A^{k}=O\Rightarrow\lambda=0$（==幂零矩阵的特征值全为零==）。

      ==注意这只是"必要"==：$f$ 的根未必都是特征值。
      $A=E$ 满足 $A^{2}=A$，但它只有特征值 $1$，没有 $0$。
      ==选择题常在这里设"充分/必要"的陷阱。==
    ` },

    { t: 'key', id: 'abstract', title: '抽象矩阵求特征值：三条路', c: String.raw`
      题目不给具体矩阵，只给一串条件时：

      **① 由零化多项式限定候选值**（上一节），再结合其他条件筛选。

      **② 由秩定重数**：$\rank(A)=r$ 时，
      $Ax=0$ 的解空间是 $n-r$ 维，==所以 $\lambda=0$ 至少是 $n-r$ 重==
      （几何重数为 $n-r$）。
      ==秩 $1$ 矩阵最典型==：$\rank(A)=1$ 时 $\lambda=0$ 至少 $n-1$ 重，
      再由 $\sum\lambda_i=\tr(A)$ 得最后一个特征值是 $\tr(A)$，
      与[秩 $1$ 矩阵的性质](#/linear-algebra/matrix/rank?at=rank1)一致。

      **③ 由定义凑**：把已知条件整理成 $A\xi=(\ \cdot\ )\xi$ 的形状。
      例如已知 $A\alpha=3\alpha$，问 $(A^{2}-2A+E)\alpha$ 等于什么：
      $$(A^{2}-2A+E)\alpha=(9-6+1)\alpha=4\alpha,$$
      ==直接把 $\lambda=3$ 代进多项式==。

      **一个高频结论**：$\alpha,\beta$ 为 $n$ 维列向量时，
      $A=\alpha\beta\T$ 的特征值是 $\beta\T\alpha$ 与 $n-1$ 个 $0$；
      而 $A=E+\alpha\beta\T$ 的特征值是 $1+\beta\T\alpha$ 与 $n-1$ 个 $1$
      （==用"$A+kE$ 的特征值平移 $k$"那一行==）。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-compute',
      title: '具体矩阵：求全部特征值与特征向量',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        求
        $$A=\begin{pmatrix}
        1&2&2\\ 2&1&2\\ 2&2&1
        \end{pmatrix}$$
        的全部特征值与特征向量。
      `,
      idea: String.raw`
        **先认结构**：主对角线是 $1$、其余是 $2$，
        正是[各行和相等](#/linear-algebra/determinant/computation?at=row-sum-equal)那一类，
        每行之和都是 $5$。

        ==这立刻给出一个特征值==：$A(1,1,1)\T=(5,5,5)\T=5(1,1,1)\T$，
        所以 $\lambda=5$，特征向量 $(1,1,1)\T$。
        **看到"各行和相等"就先把 $\lambda=$ 行和 白拿下来。**

        **算特征多项式时也用这个结构**：把后两列加到第一列，
        第一列全变成 $\lambda-5$，==提出公因子，三次方程直接因式分解==，
        不必硬解。

        **预判另一个特征值**：$\tr(A)=3$，一个特征值是 $5$，
        剩下两个之和是 $-2$；由 $A$ 是[实对称矩阵](#/linear-algebra/eigen/symmetric?at=four-properties)
        且形如 $-E+2J$，==大概率是二重的 $-1$==。算一下确认。
      `,
      solution: String.raw`
        **特征多项式**（$c_1+c_2+c_3\to c_1$，各行和为 $\lambda-5$）：
        $$\abs{\lambda E-A}=\begin{vmatrix}
        \lambda-1&-2&-2\\ -2&\lambda-1&-2\\ -2&-2&\lambda-1
        \end{vmatrix}
        =(\lambda-5)\begin{vmatrix}
        1&-2&-2\\ 1&\lambda-1&-2\\ 1&-2&\lambda-1
        \end{vmatrix}$$
        $$\xrightarrow{r_2-r_1,\ r_3-r_1}
        (\lambda-5)\begin{vmatrix}
        1&-2&-2\\ 0&\lambda+1&0\\ 0&0&\lambda+1
        \end{vmatrix}
        =(\lambda-5)(\lambda+1)^{2}.$$

        故特征值为 $\lambda_1=5$（单根），$\lambda_2=\lambda_3=-1$（二重根）。

        **$\lambda_1=5$**：解 $(5E-A)x=0$，
        $$5E-A=\begin{pmatrix}4&-2&-2\\ -2&4&-2\\ -2&-2&4\end{pmatrix}
        \longrightarrow\begin{pmatrix}1&0&-1\\ 0&1&-1\\ 0&0&0\end{pmatrix},$$
        基础解系 $\xi_1=(1,1,1)\T$。
        全部特征向量：$k\xi_1$（$k\ne0$）。

        **$\lambda_2=-1$**：解 $(-E-A)x=0$，
        $$-E-A=\begin{pmatrix}-2&-2&-2\\ -2&-2&-2\\ -2&-2&-2\end{pmatrix}
        \longrightarrow\begin{pmatrix}1&1&1\\ 0&0&0\\ 0&0&0\end{pmatrix},$$
        即 $x_1+x_2+x_3=0$，基础解系
        $$\xi_2=(-1,1,0)\T,\qquad \xi_3=(-1,0,1)\T.$$
        全部特征向量：$k_2\xi_2+k_3\xi_3$（$k_2,k_3$ ==不全为零==）。

        **验算**：$\sum\lambda_i=5-1-1=3=\tr(A)\ \checkmark$；
        $\prod\lambda_i=5\times1=5$，而 $\abs A=(\lambda\text{ 之积})=5\ \checkmark$
      `,
      comment: String.raw`
        **二重根的几何重数恰好是 $2$**（基础解系两个），
        所以 $A$ ==可对角化==——这本来也是必然的，因为 $A$ 是实对称矩阵。
        ==算出来若只有一个基础解系向量，一定是算错了==，
        这是实对称矩阵题最有效的自检。

        **注意 $\lambda=-1$ 的特征方程退化成一个方程** $x_1+x_2+x_3=0$，
        它恰好说明二重根的特征子空间是==与 $(1,1,1)\T$ 正交的那个平面==——
        这正是[用正交性反求特征向量](#/linear-algebra/eigen/symmetric?at=orthogonal-trick)那一招的图像。

        **这个矩阵的一般形式值得记**：$A=aE+b(J-E)$（对角 $a$、其余 $b$）时
        $$\lambda=\begin{cases}a+(n-1)b,&\text{单根，特征向量 }(1,1,\dots,1)\T\\
        a-b,&n-1\ \text{重根，特征子空间是}\ \sum x_i=0\end{cases}$$
        本题 $a=1,b=2,n=3$：$1+4=5$ 与 $1-2=-1$（二重）。
        ==行列式 $[a+(n-1)b](a-b)^{n-1}$ 正是这些特征值之积==，
        与[第 1 章那条公式](#/linear-algebra/determinant/computation?at=row-sum-equal)对上了。

        **写答案的两个得分点**：

        1. ==特征向量必须写成"$k\xi$，$k\ne0$"的形式==，
           只写一个 $\xi$ 是不完整的；
        2. ==二重根要写"$k_2,k_3$ 不全为零"==，写成"不为零"就漏掉了一半。
      `,
    },

    { t: 'example',
      id: 'ex-abstract',
      title: '★ 抽象矩阵：由零化多项式定特征值',
      source: '经典题型',
      level: 3,
      problem: String.raw`
        设 $A$ 为 $3$ 阶矩阵，满足 $A^{2}-3A+2E=O$，且 $\rank(A-E)=1$。

        1. 求 $A$ 的全部特征值；
        2. 判断 $A$ 是否可对角化，并求 $\abs{A+E}$。
      `,
      idea: String.raw`
        **第 1 问：先用[零化多项式](#/linear-algebra/eigen/basics?at=fA)圈定候选。**
        $f(\lambda)=\lambda^{2}-3\lambda+2=(\lambda-1)(\lambda-2)$，
        故特征值只能取 $1$ 或 $2$。
        ==但具体各有几重，零化多项式说了不算，要靠第二个条件。==

        **秩的条件怎么用**：$\rank(A-E)=1$ 意味着
        $(A-E)x=0$ 的解空间是 $3-1=2$ 维，
        ==即 $\lambda=1$ 的几何重数是 $2$==。
        （因为 $\lambda=1$ 的特征向量就是 $(E-A)x=0$ 的非零解，
        而 $\rank(E-A)=\rank(A-E)=1$。）

        于是 $\lambda=1$ 至少二重，$3$ 阶矩阵只剩一个位置，
        ==由候选集只能是 $2$==。

        **第 2 问**：$\lambda=1$ 的几何重数 $2=$ 代数重数 $2$，
        $\lambda=2$ 是单根自动满足，==故可对角化==。
        求 $\abs{A+E}$ 时用 $A+E$ 的特征值 $=\lambda+1$，==连乘即可==。
      `,
      solution: String.raw`
        **(1)** 设 $\lambda$ 为 $A$ 的特征值，$\xi\ne0$ 为对应特征向量。由 $A^{2}-3A+2E=O$，
        $$(A^{2}-3A+2E)\xi=(\lambda^{2}-3\lambda+2)\xi=0,$$
        由 $\xi\ne0$ 得 $\lambda^{2}-3\lambda+2=0$，即 $\lambda=1$ 或 $\lambda=2$。

        又 $\rank(A-E)=1$，故齐次方程组 $(E-A)x=0$ 的解空间维数为
        $$3-\rank(E-A)=3-1=2,$$
        即 $\lambda=1$ 有 $2$ 个线性无关的特征向量，==故 $\lambda=1$ 至少是二重特征值==。

        $A$ 为 $3$ 阶矩阵，共 $3$ 个特征值，故余下一个只能取 $2$。
        （若三个都是 $1$，则 $\lambda=1$ 的几何重数应为 $3$，即 $\rank(A-E)=0$，与条件矛盾。）

        故特征值为 $\boxed{1,\ 1,\ 2}$。

        **(2)** $\lambda=1$ 的几何重数 $2$ 等于代数重数 $2$，
        $\lambda=2$ 为单根，几何重数自动为 $1$。
        线性无关的特征向量共 $2+1=3$ 个，==故 $A$ 可对角化==，且
        $$A\sim\Lambda=\diag(1,1,2).$$

        $A+E$ 的特征值为 $1+1,\ 1+1,\ 2+1$，即 $2,2,3$，故
        $$\abs{A+E}=2\times2\times3=\boxed{12}.$$
      `,
      comment: String.raw`
        **这道题把本章三件工具串在了一起**：

        1. ==零化多项式圈定候选值==（$f(\lambda)=0$）；
        2. ==秩定几何重数==（$n-\rank(\lambda_iE-A)$）；
        3. ==$f(A)$ 的特征值是 $f(\lambda)$==（用来算 $\abs{A+E}$）。

        **第 1 问里"排除三个都是 $1$"那句话不能省**。
        只说"至少二重、所以是 $1,1,2$"是不严谨的——
        ==必须说明 $\lambda=1$ 不可能是三重==，理由就是秩不为零。

        **一个更快的替代写法**：由可对角化（$f$ 无重根 $\Rightarrow$ 必可对角化）知
        $A\sim\Lambda$，而
        $$\rank(A-E)=\rank(\Lambda-E)=\ \lambda=2\ \text{的个数}=1,$$
        ==直接读出 $\lambda=2$ 是单根==。
        这里用到了"零化多项式无重根 $\Rightarrow$ 可对角化"这条结论，
        ==它超出考纲但很好用，作为草稿判断很方便，正式答题仍按上面的写法==。

        **常见变体**：把条件改成 $\rank(A-E)=2$，
        则 $\lambda=1$ 的几何重数是 $1$，特征值变成 $1,2,2$，
        $\abs{A+E}=2\times3\times3=18$。
        ==秩变一个数，答案全变==，所以第二个条件是这类题的题眼。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **跨特征值把特征向量相加**：==$\xi_1+\xi_2$ 不是特征向量==
         （$\lambda_1\ne\lambda_2$ 时），见[性质 ③](#/linear-algebra/eigen/basics?at=vector-props)。
      2. **特征向量忘了"非零"**：定义要求 $\xi\ne0$；
         写通解时要注明 $k\ne0$ 或 $k_i$ 不全为零。
      3. **把 $\lambda=0$ 当作"没有特征值"**：==$0$ 可以是特征值==，
         它对应 $A$ 不可逆。
      4. **零化多项式的根全当成特征值**：==只是候选==，
         $f(\lambda)=0$ 是必要条件不是充分条件。
      5. **$A^{*}$ 的特征值写成 $\abs A\lambda$**：正确的是 ==$\frac{\abs A}{\lambda}$==。
      6. **$A$ 与 $A\T$ 的特征向量当成相同**：==特征值相同，特征向量一般不同==。
      7. **几何重数与代数重数混为一谈**：几何重数 $=n-\rank(\lambda E-A)$，
         ==它不超过代数重数==，相等才可对角化。
      8. **算完不验算**：$\sum\lambda_i=\tr(A)$ 和 $\prod\lambda_i=\abs A$，
         ==两条都对上才放心==。
      9. **实矩阵默认特征值是实数**：==只有实对称矩阵才保证==。
    ` },

  ],
});
