/* ==========================================================================
   线性代数 / 2 矩阵 / 矩阵运算与可逆性
   —— 矩阵乘法的"三个不"、伴随矩阵、求逆与求幂。
      秩见 matrix/rank；分块与初等变换见 matrix/block。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/matrix/operations',
  title: '矩阵运算与可逆性',
  subtitle: '矩阵乘法和数的乘法只差三条：**不交换、无消去律、有零因子**。这一章的错，八成出在这三条上',
  tags: ['小题', '大题', '概念辨析', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'warn', id: 'not-commutative', title: '★ 三个「不」：矩阵不是数', c: String.raw`
      | 数的世界 | 矩阵的世界 |
      |---|---|
      | $ab=ba$ | ==$AB\ne BA$==（一般） |
      | $ab=0\Rightarrow a=0$ 或 $b=0$ | ==$AB=O$ 推不出 $A=O$ 或 $B=O$== |
      | $ab=ac,\ a\ne0\Rightarrow b=c$ | ==$AB=AC,\ A\ne O$ 推不出 $B=C$== |

      **零因子的例子**（记住它，很多反例都从这儿造）：
      $$A=\begin{pmatrix}1&0\\0&0\end{pmatrix},\quad
      B=\begin{pmatrix}0&0\\0&1\end{pmatrix},\qquad
      AB=O\ \text{但}\ A\ne O,\ B\ne O.$$

      **由此崩塌的一串"常识"**：
      $$(A+B)^{2}\ne A^{2}+2AB+B^{2}\qquad(\text{正确的是}\ A^{2}+AB+BA+B^{2})$$
      $$(AB)^{2}\ne A^{2}B^{2},\qquad (A+B)(A-B)\ne A^{2}-B^{2}$$

      ==所有这些等式都在 $AB=BA$ 时恢复成立==，
      所以做题时==先确认题目有没有给交换条件==，
      给了就大胆用，没给就老实展开。

      **消去律什么时候能用**：$A$ ==可逆==时，
      $AB=AC\Rightarrow B=C$（两边左乘 $A^{-1}$）。
      ==可逆性是矩阵世界里"非零"的正确对应物==——
      这是理解整章的关键类比。

      **两个仍然成立的**：$\abs{AB}=\abs A\abs B$、$\rank(AB)\le\min\set{\rank A,\rank B}$，
      ==这两条不要求交换==。
    ` },

    { t: 'key', id: 'transpose-inverse', title: '转置与逆：穿脱原则', c: String.raw`
      $$(AB)\T=B\T A\T,\qquad (AB)\inv=B\inv A\inv,\qquad (AB)^{*}=B^{*}A^{*}$$

      ==三个运算都要"反序"==，口诀是**穿脱原则**：
      穿衣先内后外，脱衣先外后内。

      **其余运算律（不反序）**：
      $$(A\T)\T=A,\quad (A+B)\T=A\T+B\T,\quad (kA)\T=kA\T$$
      $$(A\inv)\inv=A,\quad (kA)\inv=\tfrac1k A\inv\ (k\ne0),\quad
      (A\T)\inv=(A\inv)\T$$

      ==注意 $(A+B)\inv\ne A\inv+B\inv$==，
      而且 $A+B$ 可逆与否和 $A,B$ 可逆与否==毫无关系==
      （$A=E$、$B=-E$ 都可逆，$A+B=O$ 不可逆）。

      **逆的定义要记准**：$AB=E$ 与 $BA=E$ ==对方阵而言只需验一个==
      （$AB=E\Rightarrow BA=E$）。
      这条在证明题里省一半功夫：
      ==要证 $A$ 可逆且逆为 $B$，只需凑出 $AB=E$。==
    ` },

    { t: 'key', id: 'invertible-equiv', title: '★ 可逆的等价条件（全章最重要的一串）', c: String.raw`
      设 $A$ 是 $n$ 阶方阵，下列命题==两两等价==：

      1. $A$ 可逆（存在 $B$ 使 $AB=E$）；
      2. $\abs A\ne0$；
      3. $\rank(A)=n$（满秩）；
      4. $Ax=0$ ==只有零解==；
      5. $Ax=b$ 对任意 $b$ ==有唯一解==；
      6. $A$ 的列（行）向量组==线性无关==；
      7. $A$ 可以表示为==若干初等矩阵之积==；
      8. $A$ 的特征值==全不为零==；
      9. $A$ 与 $E$ ==等价==（$A$ 的等价标准形是 $E$）。

      ==这九条是整个线性代数的中枢==：
      第 1 章的行列式、第 2 章的秩、第 3 章的向量组、第 4 章的方程组、第 5 章的特征值，
      ==全都在这里汇合==。

      **做题时的用法是"翻译"**：
      题目给你其中一条，==你把它换成最好用的另一条==。
      比如"证明 $Ax=0$ 只有零解"$\Rightarrow$ 转成"证 $\abs A\ne0$"；
      "证明向量组线性无关"$\Rightarrow$ 转成"证秩为 $n$"。

      **不可逆（奇异）的等价条件就是全部取反**：
      $\abs A=0\iff\rank(A)<n\iff Ax=0$ 有非零解 $\iff$ ==$0$ 是特征值==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'adj-sec', c: '一、伴随矩阵' },

    { t: 'key', id: 'adjugate', title: '定义与核心等式', c: String.raw`
      $$A^{*}=\begin{pmatrix}
      A_{11}&A_{21}&\cdots&A_{n1}\\
      A_{12}&A_{22}&\cdots&A_{n2}\\
      \vdots&&&\vdots\\
      A_{1n}&A_{2n}&\cdots&A_{nn}
      \end{pmatrix}$$

      ==注意下标是"转置"排列的==：$A^{*}$ 的第 $i$ 行第 $j$ 列元素是 ==$A_{ji}$==
      （$a_{ji}$ 的代数余子式），==不是 $A_{ij}$==。
      **这是本节最高频的低级错误。**

      **核心等式**：
      $$\boxed{\ AA^{*}=A^{*}A=\abs A\,E\ }$$

      它就是[展开定理与异乘变零](#/linear-algebra/determinant/computation?at=expansion)的矩阵写法：
      ==对角线上是"同乘"给出 $\abs A$，非对角线上是"异乘"给出 $0$==。

      **由此得到求逆公式**：$\abs A\ne0$ 时
      $$A\inv=\frac{1}{\abs A}A^{*}.$$
      ==这个公式在 $2$ 阶时最好用==：
      $$\begin{pmatrix}a&b\\c&d\end{pmatrix}\inv
      =\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$$
      口诀：==主对角对调，副对角变号，除以行列式==。
      ==三阶以上就该用[初等变换](#/linear-algebra/matrix/block?at=elementary-as-inverse)了。==
    ` },

    { t: 'key', id: 'adj-formulas', title: '伴随矩阵的公式群（背下来）', c: String.raw`
      $$\abs{A^{*}}=\abs A^{\,n-1}$$
      $$(A^{*})^{*}=\abs A^{\,n-2}A\qquad(n\ge2)$$
      $$(kA)^{*}=k^{\,n-1}A^{*},\qquad (AB)^{*}=B^{*}A^{*},\qquad (A\T)^{*}=(A^{*})\T$$
      $$(A\inv)^{*}=(A^{*})\inv=\frac{A}{\abs A}$$

      **$\abs{A^{*}}=\abs A^{n-1}$ 的两行推导**（比死背可靠）：
      两边取行列式于 $AA^{*}=\abs AE$：
      $$\abs A\cdot\abs{A^{*}}=\abs{\,\abs A E\,}=\abs A^{\,n}
      \ \Longrightarrow\ \abs{A^{*}}=\abs A^{\,n-1}.$$
      ==注意 $\abs{\abs A E}=\abs A^{n}$ 用的是 $\abs{kA}=k^{n}\abs A$==，
      这里 $k=\abs A$。

      **秩的公式（选择题常客）**：
      $$\boxed{\ \rank(A^{*})=\begin{cases}
      n,&\rank(A)=n\\
      1,&\rank(A)=n-1\\
      0,&\rank(A)\le n-2
      \end{cases}}$$

      **三种情形各有道理**：

      - $\rank A=n$：$A$ 可逆，$A^{*}=\abs A A\inv$ ==也可逆==；
      - $\rank A=n-1$：$\abs A=0$ 但==存在非零的 $n-1$ 阶子式==，
        所以 $A^{*}\ne O$；又 $AA^{*}=O$ 给出
        $\rank A+\rank A^{*}\le n$，故 $\rank A^{*}\le1$，==夹出恰好是 $1$==；
      - $\rank A\le n-2$：==所有 $n-1$ 阶子式全为零==，故 $A^{*}=O$。

      ==中间那一档的"夹逼"论证是标准答案要求的写法==，
      用到了 [$AB=O$ 的秩不等式](#/linear-algebra/matrix/rank?at=rank-product)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'compute-sec', c: '二、求逆与求幂' },

    { t: 'method', id: 'find-inverse', title: '求逆的三条路', c: String.raw`
      | 情形 | 方法 |
      |---|---|
      | $2$ 阶具体矩阵 | ==[伴随公式](#/linear-algebra/matrix/operations?at=adjugate)==，口诀一步到位 |
      | $3$ 阶及以上具体矩阵 | ==[初等行变换](#/linear-algebra/matrix/block?at=elementary-as-inverse)== $(A\mid E)\to(E\mid A\inv)$ |
      | 抽象矩阵（给一个等式） | ==凑出 $A\cdot(\ \cdot\ )=E$== |
      | 分块矩阵 | [分块求逆公式](#/linear-algebra/matrix/block?at=block-inverse) |

      **抽象情形的标准动作**：题目给一个等式 $f(A)=O$，要证某个矩阵可逆。
      ==做法永远是把常数项挪到右边，左边提出想要的那个因子==，凑成
      $$(\text{待证可逆的矩阵})\cdot(\cdots)=cE,\qquad c\ne0
      \ \Longrightarrow\ \text{逆}=\frac1c(\cdots).$$
      ==只要凑出右边是非零常数乘 $E$，可逆性和逆就同时到手==，
      因为这正是逆的定义。

      **例**：已知 $A^{2}-3A+E=O$，求 $A\inv$。
      移项得 $A^{2}-3A=-E$，左边提 $A$：
      $$A(A-3E)=-E\ \Longrightarrow\ A\cdot(3E-A)=E
      \ \Longrightarrow\ A\inv=3E-A.$$

      **要提的因子不是 $A$ 时，先换元**：
      要证 $A+kE$ 可逆，就令 $B=A+kE$、把 $A=B-kE$ 代回原式重新展开，
      ==整理成关于 $B$ 的多项式再提公因子==，
      见[下面那道例题](#/linear-algebra/matrix/operations?at=ex-invertible-proof)。

      **动手前先判断能不能证**：$f(A)=O$ 说明 $A$ 的特征值都是 $f$ 的根，
      于是 ==$A+kE$ 可逆 $\iff-k$ 不是 $f$ 的根==。
      根是 $f$ 的零点时那个矩阵==本来就不一定可逆==，凑不出来是正常的。
    ` },

    { t: 'key', id: 'powers', title: '求 $A^{n}$ 的四条路', c: String.raw`
      | $A$ 的样子 | 方法 |
      |---|---|
      | 可对角化 | $A=P\Lambda P\inv\Rightarrow A^{n}=P\Lambda^{n}P\inv$ |
      | ==秩为 $1$==（$A=\alpha\beta\T$） | $A^{n}=(\beta\T\alpha)^{n-1}A$ |
      | $A=kE+N$，$N$ ==幂零== | 二项式展开，只有前几项 |
      | 都不是 | 算 $A^{2},A^{3}$ ==找规律==再归纳 |

      **秩 $1$ 矩阵是重点**。设 $A=\alpha\beta\T$（$\alpha,\beta$ 为 $n$ 维列向量），则
      $$A^{2}=\alpha(\beta\T\alpha)\beta\T=(\beta\T\alpha)\,\alpha\beta\T=k\,A,
      \qquad k=\beta\T\alpha=\tr(A).$$
      ==中间那个 $\beta\T\alpha$ 是一个数，可以提到前面==——这是全部技巧所在。
      于是
      $$\boxed{\ A^{n}=k^{\,n-1}A,\qquad k=\tr(A)\ }$$

      **秩 $1$ 矩阵的其余性质**（一并记住）：

      - 特征值是 $\tr(A)$（一重）与 $0$（$n-1$ 重）；
      - 可对角化 $\iff\tr(A)\ne0$；
      - $\abs{A+cE}=c^{n-1}(c+\tr A)$，
        与[加边法那道题](#/linear-algebra/determinant/special?at=bordering)的结论一致。

      **幂零情形**：$N^{m}=O$ 时
      $$(kE+N)^{n}=\sum_{i=0}^{m-1}\binom ni k^{\,n-i}N^{i},$$
      ==求和只到 $m-1$ 项==，因为后面全是零。
      $E$ 与任何矩阵交换，所以==二项式定理在这里是合法的==。
      这条与[几何级数那条主线](#/threads/lines/geometric?at=nilpotent)是同一件事。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-rank1-power',
      title: '秩 $1$ 矩阵求高次幂',
      source: '标准例题（高频）',
      level: 2,
      problem: String.raw`
        设 $\alpha=(1,2,3)\T$，$\beta=(1,\tfrac12,\tfrac13)\T$，$A=\alpha\beta\T$。求 $A^{n}$。
      `,
      idea: String.raw`
        **一眼认出秩 $1$**：$A$ 写成了"列向量乘行向量"，
        这就是[秩 $1$ 矩阵的标准形式](#/linear-algebra/matrix/operations?at=powers)。

        ==千万不要先把 $A$ 乘出来再找规律==——那是 $3\times3$ 的矩阵，
        乘方几次就乱了。

        **关键一步**：$A^{2}=\alpha(\beta\T\alpha)\beta\T$，
        中间的 $\beta\T\alpha$ ==是一个 $1\times1$ 的矩阵，也就是一个数==，
        可以自由地移到最前面。

        算这个数：$\beta\T\alpha=1\times1+\frac12\times2+\frac13\times3=3$。
        ==它也等于 $\tr(A)$==，可以用来交叉验算。

        于是 $A^{2}=3A$，$A^{3}=3A^{2}=9A$，==规律立刻显现==。
      `,
      solution: String.raw`
        先算 $k=\beta\T\alpha$：
        $$k=1\times1+\frac12\times2+\frac13\times3=1+1+1=3.$$

        于是
        $$A^{2}=\alpha\beta\T\alpha\beta\T=\alpha(\beta\T\alpha)\beta\T=k\,\alpha\beta\T=3A.$$

        由归纳法，$A^{n}=3^{\,n-1}A$。而
        $$A=\alpha\beta\T=\begin{pmatrix}1\\2\\3\end{pmatrix}
        \begin{pmatrix}1&\tfrac12&\tfrac13\end{pmatrix}
        =\begin{pmatrix}
        1&\tfrac12&\tfrac13\\
        2&1&\tfrac23\\
        3&\tfrac32&1
        \end{pmatrix},$$

        故
        $$A^{n}=3^{\,n-1}\begin{pmatrix}
        1&\tfrac12&\tfrac13\\
        2&1&\tfrac23\\
        3&\tfrac32&1
        \end{pmatrix}.$$

        （验算：$\tr(A)=1+1+1=3=k\ \checkmark$）
      `,
      comment: String.raw`
        **$\beta\T\alpha$ 与 $\alpha\beta\T$ 是两个完全不同的东西**，
        这是本题唯一的概念风险：

        | 式子 | 形状 | 是什么 |
        |---|---|---|
        | $\beta\T\alpha$ | $1\times1$ | ==一个数==（内积） |
        | $\alpha\beta\T$ | $n\times n$ | ==一个秩 $1$ 矩阵== |

        ==写的时候看清楚谁转置在前面==。

        **顺带能答的几个追问**（都不用重算）：

        - $A$ 的特征值：$3,0,0$；
        - $A$ 能否对角化：$\tr A=3\ne0$，==能==；
        - $\abs{A+E}$：由 $c^{n-1}(c+\tr A)$ 得 $1^{2}\times(1+3)=4$；
        - $\rank(A^{n})$：$A^{n}=3^{n-1}A$，==秩仍是 $1$==。

        **变体**：若 $\beta\T\alpha=0$（比如 $\alpha,\beta$ 正交），
        则 $A^{2}=O$，==$A$ 是幂零矩阵==，$A^{n}=O$（$n\ge2$），
        而且此时 $A$ ==不能对角化==（特征值全为 $0$ 但 $A\ne O$）。
        ==这是命题人最爱设的对照。==
      `,
    },

    { t: 'example',
      id: 'ex-invertible-proof',
      title: '抽象矩阵：由一个等式证可逆并求逆',
      source: '标准例题（高频证明题）',
      level: 3,
      problem: String.raw`
        设 $n$ 阶方阵 $A$ 满足 $A^{2}+2A-3E=O$。

        1. 证明 $A$ 可逆，并求 $A\inv$；
        2. 证明 $A+4E$ 可逆，并求 $(A+4E)\inv$。
      `,
      idea: String.raw`
        **通用套路只有一句**：==把常数项挪到等号右边，左边提出想要证可逆的那个因子==，
        使式子变成
        $$(\text{待证可逆的矩阵})\cdot(\cdots)=cE,\qquad c\ne0.$$
        一旦凑成，可逆性和逆==同时到手==，因为这就是逆的定义。

        **第 1 问**：$A^{2}+2A=3E$，左边提 $A$：
        $$A(A+2E)=3E\ \Longrightarrow\ A\cdot\frac{A+2E}{3}=E.$$

        **第 2 问麻烦一点**：要提出 $A+4E$，
        就得==把原多项式按 $A+4E$ 做带余除法==。
        令 $t=A+4E$（即 $A=t-4E$），代入：
        $$A^{2}+2A-3E=(t-4E)^{2}+2(t-4E)-3E=t^{2}-8t+16E+2t-8E-3E=t^{2}-6t+5E.$$
        于是 $t^{2}-6t+5E=O$，即 $t(t-6E)=-5E$，==提出 $t$ 就完成了==。

        ==这个"换元 + 展开"的动作，本质上是把多项式在 $A+4E$ 处重新展开==，
        和[泰勒展开换中心](#/threads/lines/taylor?at=core)是同一个念头。
      `,
      solution: String.raw`
        **(1)** 由 $A^{2}+2A-3E=O$ 得 $A^{2}+2A=3E$，即
        $$A(A+2E)=3E\ \Longrightarrow\ A\cdot\frac13(A+2E)=E.$$
        故 $A$ 可逆，且
        $$A\inv=\frac13(A+2E).$$

        **(2)** 将 $A=(A+4E)-4E$ 代入原式。记 $B=A+4E$：
        $$A^{2}+2A-3E=(B-4E)^{2}+2(B-4E)-3E
        =B^{2}-8B+16E+2B-8E-3E=B^{2}-6B+5E.$$
        故 $B^{2}-6B+5E=O$，即
        $$B(B-6E)=-5E\ \Longrightarrow\ B\cdot\left(-\frac15\right)(B-6E)=E.$$
        故 $A+4E$ 可逆，且
        $$(A+4E)\inv=-\frac15\bigl(A+4E-6E\bigr)=-\frac15(A-2E)=\frac15(2E-A).$$
      `,
      comment: String.raw`
        **一个快速的判据**：设 $f(x)=x^{2}+2x-3=(x-1)(x+3)$，
        则 $f(A)=O$ 说明 ==$A$ 的特征值只能在 $\set{1,-3}$ 里取==
        （特征值必须是零化多项式的根）。于是

        - $A$ 的特征值不含 $0$ $\Rightarrow$ ==$A$ 可逆==；
        - $A+4E$ 的特征值是 $1+4=5$ 或 $-3+4=1$，==都不为零== $\Rightarrow$ 可逆；
        - 而 $A-E$ ==就不一定可逆==（特征值可能取到 $1$，此时 $A-E$ 有零特征值）。

        ==考场上先用这个判据判断"该证哪个可逆"，再动手凑式子==，
        能避免在不可逆的矩阵上白费力气。

        **写法上的两个得分点**：

        1. ==必须明确写出 $A\cdot(\cdots)=E$ 这一步==，
            光说"由等式可得"不给分；
        2. 结论要==同时回答"可逆"和"逆是什么"==，题目问了两件事。

        **同型变体**：$A^{2}=A$（幂等）、$A^{2}=E$（对合）、$A^{k}=O$（幂零）
        都是这个套路的特例。
        比如 $A^{k}=O$ 时，$(E-A)(E+A+\cdots+A^{k-1})=E-A^{k}=E$，
        ==所以 $E-A$ 必可逆==——这正是[几何级数在矩阵上的现身](#/threads/lines/geometric?at=matrix)。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **默认 $AB=BA$**：==展开 $(A+B)^{2}$ 时必须写四项==，
         除非题目给了交换条件。
      2. **由 $AB=O$ 推 $A=O$ 或 $B=O$**：==矩阵有零因子==。
         正确的推论是 $\rank A+\rank B\le n$。
      3. **消去律无条件使用**：$AB=AC$ 只有 $A$ ==可逆==时才能约掉。
      4. **转置 / 求逆忘了反序**：$(AB)\inv=B\inv A\inv$，==穿脱原则==。
      5. **$(A+B)\inv=A\inv+B\inv$**：==完全不成立==。
      6. **伴随矩阵下标不转置**：$A^{*}$ 的 $(i,j)$ 元是 ==$A_{ji}$==。
      7. **$\abs{A^{*}}$ 写成 $\abs A^{n}$**：正确的是 ==$\abs A^{n-1}$==。
      8. **$\rank(A^{*})$ 只记两种情形**：==有三档==，
         $n-1$ 那一档给 $1$，见[公式群](#/linear-algebra/matrix/operations?at=adj-formulas)。
      9. **秩 $1$ 求幂时把 $\beta\T\alpha$ 当矩阵**：==它是一个数==。
      10. **抽象题不凑出 $(\cdot)(\cdot)=cE$**：只有凑成这个形式，
          ==可逆性才算证完==。
    ` },

  ],
});
