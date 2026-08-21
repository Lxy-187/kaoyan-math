/* ==========================================================================
   线性代数 / 2 矩阵 / 秩的性质与求法
   —— 秩是贯穿全书的那个数：可逆性、无关性、解的个数，全由它决定。
      向量组的秩见 vectors/basis；解的结构见 linear-systems/solvability。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/matrix/rank',
  title: '秩的性质与求法',
  subtitle: '秩是**这个矩阵真正携带的信息量**。全书的判据几乎都能翻译成一句关于秩的话',
  tags: ['小题', '大题', '概念辨析', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'def-rank', title: '三种等价定义：会互相翻译才算懂', c: String.raw`
      | 定义 | 说法 | 什么时候用 |
      |---|---|---|
      | **子式** | 非零子式的==最高阶数== | 理论证明、判断参数 |
      | **阶梯形** | 行阶梯形中==非零行的行数== | ==具体计算（主力）== |
      | **向量组** | 行（列）向量组的==极大无关组所含个数== | 联系第 3 章 |

      ==三者永远相等==，而且第三条给出一条重要事实：
      $$\boxed{\ \text{行秩}=\text{列秩}=\rank(A)\ }$$
      ==所以"行变换"和"列变换"求出的秩必然一致==。

      **秩的直观**：$\rank(A)$ 是 $A$ 作为线性变换时==像空间的维数==，
      也就是"$A$ 把 $n$ 维空间压成了几维"。

      - $\rank(A)=n$（满秩）$\Rightarrow$ ==没压扁，可逆==；
      - $\rank(A)=r<n$ $\Rightarrow$ ==压成了 $r$ 维，损失了 $n-r$ 个维度==，
        而这 $n-r$ 正是[齐次方程组基础解系的个数](#/linear-algebra/linear-systems/solvability?at=homogeneous)。

      **两条边界**：$0\le\rank(A)\le\min\set{m,n}$；
      $\rank(A)=0\iff A=O$。
    ` },

    { t: 'method', id: 'compute-rank', title: '求秩：初等变换化阶梯形', c: String.raw`
      $$\boxed{\ \text{初等变换不改变矩阵的秩}\ }$$
      （行变换、列变换都不改变，==所以求秩时可以行列混用==。）

      **步骤**：

      1. 用初等行变换把 $A$ 化成==行阶梯形==（每行的首个非零元比上一行靠右）；
      2. 数非零行的行数。

      **两个实用提醒**：

      - ==求秩可以行列混用，但解方程组时只能用行变换==
        （列变换会打乱未知数的对应关系）。==这是最容易混的一点。==
      - ==带参数时不能除以可能为零的量==，
        见[参数讨论](#/linear-algebra/linear-systems/parameters?at=row-op-trap)。

      **判断参数的两条路**：

      | 矩阵形状 | 做法 |
      |---|---|
      | ==方阵== | 先算 $\abs A$，由 $\abs A=0$ 定出参数的候选值，再逐个代回化阶梯 |
      | 非方阵 | ==只能化阶梯==，边化边讨论 |

      ==方阵先算行列式能省很多力气==，因为行列式把"何时降秩"一次性告诉了你。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'ineq-sec', c: '一、秩的不等式群' },

    { t: 'key', id: 'rank-invariance', title: '乘可逆矩阵不改变秩', c: String.raw`
      $$P,Q\ \text{可逆}\ \Longrightarrow\ \rank(PAQ)=\rank(PA)=\rank(AQ)=\rank(A)$$

      ==这是所有秩的证明题里使用频率最高的一条==。

      **为什么**：可逆矩阵是若干[初等矩阵之积](#/linear-algebra/matrix/block?at=elementary)，
      左乘相当于做一串行变换、右乘相当于做一串列变换，==而初等变换不改变秩==。

      **两条常用推论**：

      - $\rank(A\T)=\rank(A)$，且 ==$\rank(A\T A)=\rank(A)$==（实矩阵）；
      - $A$ 可逆时 $\rank(AB)=\rank(B)$，==可逆因子可以直接"划掉"==。

      **等价标准形**：任何 $m\times n$ 矩阵 $A$（$\rank A=r$）都存在可逆的 $P,Q$ 使
      $$PAQ=\begin{pmatrix}E_r&O\\ O&O\end{pmatrix}.$$
      ==秩是矩阵在等价意义下唯一的不变量==——
      换句话说，==两个同型矩阵等价 $\iff$ 秩相等==。
      这句话把"秩"的地位说到了顶：它就是等价类的编号。
    ` },

    { t: 'key', id: 'rank-inequalities', title: '★ 五条不等式（背下来）', c: String.raw`
      $$\textbf{①}\qquad \rank(A+B)\le\rank(A)+\rank(B)$$
      $$\textbf{②}\qquad \rank(AB)\le\min\set{\rank(A),\ \rank(B)}$$
      $$\textbf{③}\qquad \rank(A)+\rank(B)-n\le\rank(AB)\qquad(\text{西尔维斯特}, A\ \text{为}\ m\times n)$$
      $$\textbf{④}\qquad AB=O\ \Longrightarrow\ \rank(A)+\rank(B)\le n$$
      $$\textbf{⑤}\qquad \rank\begin{pmatrix}A&O\\ O&B\end{pmatrix}=\rank(A)+\rank(B)$$

      **① 是次可加性**，和概率的加法公式、积分的绝对值不等式
      是[同一个代数骨架](#/threads/patterns/subadditive?at=catalogue-table)：
      ==合起来的信息量不超过各自信息量之和==。

      **② 的直观**：$AB$ 先用 $B$ 压一次、再用 $A$ 压一次，
      ==压过的维数不会回来==，所以比两者都不大。

      **④ 是 ③ 的特例**（$\rank(AB)=0$ 时），
      ==也是考研最常用的一条==。
      它的含义是：$AB=O$ 说明 ==$B$ 的每一列都是 $Ax=0$ 的解==，
      于是 $\rank(B)\le$ 解空间维数 $=n-\rank(A)$。
      ==记住这个"列是解"的解释，比记不等式本身有用得多。==

      **④ 的高频用法**：
      $AA^{*}=\abs A E=O$（当 $\abs A=0$）给出 $\rank A+\rank A^{*}\le n$，
      这是[$\rank(A^{*})$ 三档公式](#/linear-algebra/matrix/operations?at=adj-formulas)中间那一档的来源。
    ` },

    { t: 'key', id: 'rank-product', title: '西尔维斯特不等式怎么用', c: String.raw`
      $$\rank(A)+\rank(B)-n\ \le\ \rank(AB)\ \le\ \min\set{\rank(A),\rank(B)}$$
      （$A$ 是 $m\times n$，$B$ 是 $n\times s$，==中间那个 $n$ 是"公共维数"==。）

      ==左右两端合起来常常能把 $\rank(AB)$ 夹死==，这是这条不等式的主要用法。

      **例**：$A,B$ 都是 $3$ 阶方阵，$\rank A=3$，$\rank B=2$，求 $\rank(AB)$。
      $$3+2-3=2\ \le\ \rank(AB)\ \le\ \min\set{3,2}=2
      \ \Longrightarrow\ \rank(AB)=2.$$
      ==上下界相等，答案唯一确定==。
      （这也印证了[可逆因子不改变秩](#/linear-algebra/matrix/rank?at=rank-invariance)。）

      **$n$ 取谁要看清楚**：==是 $A$ 的列数 $=B$ 的行数==，
      也就是相乘时"对接"的那个维数，==不是 $A$ 的行数，也不是 $B$ 的列数==。
      这是套用时最常见的错误。

      **一个好用的特例**：$A$ 是 $n$ 阶方阵、$A^{2}=A$（幂等）时，
      由 $A(A-E)=O$ 得 $\rank A+\rank(A-E)\le n$；
      又由 $A+(E-A)=E$ 及 ① 得 $\rank A+\rank(E-A)\ge n$。
      ==两头一夹==：
      $$\rank(A)+\rank(A-E)=n.$$
      =="一个不等式给上界、另一个给下界，夹出等号"是秩的证明题的通用套路。==
    ` },

    { t: 'key', id: 'rank1', title: '秩 $1$ 矩阵：一个专门的考点', c: String.raw`
      $$\rank(A)=1\iff A=\alpha\beta\T\ (\alpha,\beta\ne0)
      \iff\text{所有行成比例}\iff\text{所有列成比例}$$

      **一族现成的结论**（[上一页](#/linear-algebra/matrix/operations?at=powers)推过）：
      $$A^{2}=\tr(A)\cdot A,\qquad A^{n}=\tr(A)^{\,n-1}A$$
      $$\text{特征值}:\ \tr(A)\ \text{（一重）},\ 0\ \text{（$n-1$ 重）}$$
      $$A\ \text{可对角化}\iff\tr(A)\ne0$$

      **识别信号**：题目里出现 $\alpha\beta\T$、"$A$ 的各行成比例"、
      "$\rank(A)=1$"、或者矩阵每行都是同一组数的倍数。

      ==秩 $1$ 是"信息量最少的非零矩阵"==：
      它把整个空间压成一条直线，所以特征值只可能有一个非零。
      这个图像能帮你在考场上快速判断很多选项。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-rank-param',
      title: '含参数矩阵的秩：先算行列式',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设
        $$A=\begin{pmatrix}
        1&1&1\\ 1&a&1\\ 1&1&a
        \end{pmatrix},$$
        讨论 $\rank(A)$ 随 $a$ 的变化。
      `,
      idea: String.raw`
        **$A$ 是方阵，所以先算 $\abs A$**——
        [方阵求秩的第一步](#/linear-algebra/matrix/rank?at=compute-rank)。
        行列式为零的那些 $a$ 就是==秩会掉下来的候选点==，
        其余的 $a$ 一律满秩。

        算行列式时用 $r_2-r_1$、$r_3-r_1$ 最快，
        ==两行相减会造出大量的零==。

        **得到候选点之后逐个代回**：
        行列式只告诉你"秩小于 $3$"，==具体是 $2$ 还是 $1$ 得代回去化阶梯==。
        这一步不能省——==很多人算完行列式就收笔，丢掉一半分==。

        **预判**：$a=1$ 时三行全相同，==秩显然是 $1$==；
        其余的零点大概率给出秩 $2$。
      `,
      solution: String.raw`
        **第一步：算行列式。** $r_2-r_1,\ r_3-r_1$：
        $$\abs A=\begin{vmatrix}1&1&1\\ 0&a-1&0\\ 0&0&a-1\end{vmatrix}=(a-1)^{2}.$$

        故 $\abs A=0\iff a=1$。

        **第二步：分情况。**

        - **$a\ne1$**：$\abs A\ne0$，故 $\rank(A)=3$。
        - **$a=1$**：此时
          $$A=\begin{pmatrix}1&1&1\\ 1&1&1\\ 1&1&1\end{pmatrix}
          \xrightarrow{r_2-r_1,\ r_3-r_1}
          \begin{pmatrix}1&1&1\\ 0&0&0\\ 0&0&0\end{pmatrix},$$
          非零行只有 $1$ 行，故 $\rank(A)=1$。

        **结论**：
        $$\rank(A)=\begin{cases}3,&a\ne1\\ 1,&a=1\end{cases}$$
      `,
      comment: String.raw`
        **注意这道题没有"秩 $=2$"的情形**，这不常见。
        原因是 $a=1$ 是==二重根==，一掉就掉到底：
        三行同时变成一样的，秩直接从 $3$ 跌到 $1$。

        ==行列式的重根不一定意味着秩掉两档，但值得警惕==，
        ==所以代回去化阶梯这一步永远不能省==。

        **同型题的标准写法**：

        1. 算 $\abs A$，因式分解；
        2. $\abs A\ne0$ 的情形：满秩，一句话带过；
        3. ==每个使 $\abs A=0$ 的参数值单独代回，化阶梯，数非零行==。

        **变体**：若把 $A$ 改成 $3\times4$ 的非方阵，
        ==就没有行列式可用了==，只能直接化阶梯形，
        在化的过程中遇到"某个含参数的元素可能为零"时分类讨论，
        见[参数讨论那一页](#/linear-algebra/linear-systems/parameters?at=steps)。
      `,
    },

    { t: 'example',
      id: 'ex-rank-ineq',
      title: '用不等式夹出秩：幂等矩阵',
      source: '标准例题（证明题）',
      level: 4,
      problem: String.raw`
        设 $A$ 是 $n$ 阶方阵，满足 $A^{2}=A$。
        证明：$\rank(A)+\rank(A-E)=n$。
      `,
      idea: String.raw`
        **要证等号，标准做法是证两个不等号**——
        ==从上下两个方向各夹一次==。

        **上界从哪来**：条件 $A^{2}=A$ 可以写成
        $$A(A-E)=O.$$
        看到"两个矩阵之积为零"，立刻想到
        [不等式 ④](#/linear-algebra/matrix/rank?at=rank-inequalities)：
        $$\rank(A)+\rank(A-E)\le n.$$
        ==这一半几乎是白送的，关键是把 $A^{2}=A$ 改写成乘积为零的形式。==

        **下界从哪来**：需要一个"秩之和不小于 $n$"的理由。
        注意到
        $$A+(E-A)=E,$$
        由[次可加性 ①](#/linear-algebra/matrix/rank?at=rank-inequalities)
        $$n=\rank(E)=\rank\bigl(A+(E-A)\bigr)\le\rank(A)+\rank(E-A).$$
        而 $\rank(E-A)=\rank(A-E)$（==差一个负号，秩不变==）。

        ==两个不等号方向相反，合起来就是等号==。
        **这个"造一个和为 $E$ 的分解"是秩的证明题里最常用的构造。**
      `,
      solution: String.raw`
        **上界**：由 $A^{2}=A$ 得 $A(A-E)=A^{2}-A=O$。
        由 $AB=O\Rightarrow\rank(A)+\rank(B)\le n$ 得
        $$\rank(A)+\rank(A-E)\le n.\tag{1}$$

        **下界**：注意 $A+(E-A)=E$，由秩的次可加性
        $$n=\rank(E)\le\rank(A)+\rank(E-A).$$
        又 $E-A=-(A-E)$，而数乘非零常数不改变秩，故 $\rank(E-A)=\rank(A-E)$，于是
        $$\rank(A)+\rank(A-E)\ge n.\tag{2}$$

        由 (1)(2) 得
        $$\rank(A)+\rank(A-E)=n.\qquad\blacksquare$$
      `,
      comment: String.raw`
        **这道题是"秩的夹逼"最标准的模板**，
        同型的还有：

        | 条件 | 结论 | 用到的分解 |
        |---|---|---|
        | $A^{2}=A$ | $\rank A+\rank(A-E)=n$ | $A+(E-A)=E$ |
        | $A^{2}=E$ | $\rank(A+E)+\rank(A-E)=n$ | $(A+E)+(E-A)=2E$ |
        | $A^{2}=O$ | $\rank A\le\frac n2$ | ==只有上界==，$\rank A+\rank A\le n$ |

        ==前两行都是"乘积为零给上界、和为 $E$ 给下界"==，
        第三行因为两个因子相同，只能得到上界。

        **几何解释（帮助记忆）**：$A^{2}=A$ 说明 $A$ 是一个**投影**。
        投影把空间分成"投影后保留的部分"（$A$ 的像，维数 $\rank A$）
        和"被投影压掉的部分"（$A$ 的核，维数 $\rank(A-E)$），
        ==两部分恰好把 $n$ 维空间分完，所以维数相加为 $n$==。

        **写解答的两个得分点**：

        1. ==必须把 $A^{2}=A$ 明确改写成 $A(A-E)=O$==；
        2. ==必须说明 $\rank(E-A)=\rank(A-E)$==，
           不能默认，虽然只是一句话。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **解方程组时用了列变换**：==求秩可以行列混用，解方程组只能行变换==。
      2. **算完行列式就下结论**：$\abs A=0$ 只说明秩 $<n$，
         ==具体是几必须代回化阶梯==。
      3. **西尔维斯特里的 $n$ 取错**：是==相乘时对接的那个维数==
         （$A$ 的列数 $=B$ 的行数）。
      4. **$\rank(A+B)$ 写成 $\rank A+\rank B$**：只有 ==$\le$==。
      5. **由 $AB=O$ 推 $A=O$ 或 $B=O$**：正确的推论是
         ==$\rank A+\rank B\le n$==。
      6. **忘了 $\rank(A\T)=\rank(A)$**：这条能把列的问题转成行的问题。
      7. **证等号只证一个方向**：秩的等式题==必须上下界各证一次==。
      8. **带参数时除以可能为零的量**：化阶梯前先讨论那个量是否为零。
      9. **$\rank(kA)$ 认为会变**：$k\ne0$ 时 ==秩不变==。
    ` },

  ],
});
