/* ==========================================================================
   线性代数 / 3 向量组 / 极大无关组、秩与等价
   —— 从"相不相关"进到"有多少个独立方向、是哪几个"。
      相关性判定见 vectors/independence；基与坐标见 vectors/space。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/vectors/basis',
  title: '极大无关组、秩与等价',
  subtitle: '一句话贯穿全页：**初等行变换不改变列向量之间的线性关系**——所以化完阶梯形直接读答案',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'max-independent', title: '极大无关组：挑出「骨架」', c: String.raw`
      称部分组 $\alpha_{i_1},\dots,\alpha_{i_r}$ 是向量组 $S$ 的**极大线性无关组**，若

      1. 它==线性无关==；
      2. ==再从 $S$ 里添任何一个向量进去就变成相关==。

      **第 2 条等价于**：$S$ 中每个向量都能由它线性表示
      （由[表示定理](#/linear-algebra/vectors/independence?at=representation)立得）。
      ==所以极大无关组是"能代表整组信息的最小子集"==——
      其余向量都是多余的，可以由它们拼出来。

      **两个必须知道的事实**：

      - ==极大无关组**不唯一**==（可以挑不同的几个），
        但==所含向量的个数唯一==，这个数就叫向量组的**秩**；
      - 极大无关组与原向量组==等价==（可以互相表示）。

      **秩的三重身份要打通**：
      $$\underbrace{\text{向量组的秩}}_{\text{极大无关组的个数}}
      =\underbrace{\rank(A)}_{\text{矩阵的秩}}
      =\underbrace{\text{阶梯形非零行数}}_{\text{算出来的}}$$
      其中 $A$ 是以这些向量为==列==拼成的矩阵，
      见[秩的三种定义](#/linear-algebra/matrix/rank?at=def-rank)。
    ` },

    { t: 'key', id: 'why-column-preserved', title: '★ 全页的核心：行变换保持列之间的线性关系', c: String.raw`
      $$\boxed{\ A\xrightarrow{\ \text{初等**行**变换}\ }B
      \ \Longrightarrow\ A\ \text{与}\ B\ \text{的列向量组有**完全相同**的线性关系}\ }$$

      **精确的含义**：对任意系数 $x$，
      $$Ax=0\iff Bx=0.$$
      也就是说"==$A$ 的第 $1$ 列 $=$ 第 $2$ 列的 $2$ 倍减第 $3$ 列=="这种关系，
      在 $B$ 里==原样成立==。

      **为什么**：行变换等价于左乘可逆矩阵 $P$，$B=PA$。
      于是
      $$Bx=0\iff PAx=0\iff Ax=0\qquad(P\ \text{可逆，可以约掉}).$$
      ==全部秘密就是这一行==。

      **这条为什么这么有用**：$B$ 化成阶梯形之后，
      列与列之间的关系==一眼可见==（主元列显然无关，非主元列的表示系数直接读出来），
      而这些关系==对原矩阵 $A$ 照样成立==。
      于是"找极大无关组 + 把其余向量用它表示"这件事，
      ==变成了纯粹的读数==。

      **一个必须记牢的限制**：
      $$\text{列变换会破坏列之间的关系，}\ ==\text{找极大无关组时绝不能用列变换}==.$$
      （[求秩](#/linear-algebra/matrix/rank?at=compute-rank)时可以行列混用，
      因为秩只是一个数；但一旦要问"是哪几个向量""怎么表示"，==就只能行变换==。）
      **这是本章最容易犯的原则性错误。**
    ` },

    { t: 'method', id: 'find-max', title: '求极大无关组并表示其余向量：四步', c: String.raw`
      1. **以向量为列**拼成矩阵 $A=(\alpha_1,\alpha_2,\dots,\alpha_m)$。
         ==必须按列放，不能按行==（否则读出来的关系是行之间的）。
      2. **只用初等行变换**化成==行最简形==
         （阶梯形还不够，要把主元化成 $1$ 且主元所在列的其余元素化成 $0$）。
      3. **主元所在的列**对应的原向量，==就是一个极大无关组==。
      4. **非主元列**的元素，==直接就是该向量用极大无关组表示的系数==。

      **第 2 步为什么要化到"最简"**：只化到阶梯形，秩能读出来、
      极大无关组也能读出来，==但表示系数还要回代解方程==；
      化到最简形则==系数直接躺在那里==，一步都不用算。
      ==只要题目问"用极大无关组表示其余向量"，就一定要化到最简形。==

      **第 4 步的读法**：设行最简形的第 $j$ 列是 $(c_1,c_2,\dots,c_r,0,\dots,0)\T$，
      主元列依次是第 $i_1,\dots,i_r$ 列，则
      $$\alpha_j=c_1\alpha_{i_1}+c_2\alpha_{i_2}+\cdots+c_r\alpha_{i_r}.$$
      ==竖着读那一列就是答案==。

      **自检**：把读出来的表示式代回原向量验算一下，==十秒钟，能挡住绝大多数错误==。
    ` },

    { t: 'key', id: 'equivalence', title: '向量组的等价', c: String.raw`
      称两个向量组 $S_1,S_2$ **等价**，若==它们能互相线性表示==。

      **性质**：等价关系具有==自反、对称、传递==性；
      $$S_1\ \text{与}\ S_2\ \text{等价}\ \Longrightarrow\ \rank(S_1)=\rank(S_2).$$

      ==反过来不成立==：秩相等的两个向量组==未必等价==。
      反例：$S_1=\set{(1,0)}$，$S_2=\set{(0,1)}$，秩都是 $1$，==但互相表示不了==。
      **这是选择题的常见错项。**

      **正确的充要条件**（同维数时）：
      $$S_1\ \text{与}\ S_2\ \text{等价}\iff
      \rank(S_1)=\rank(S_2)=\rank(S_1\cup S_2)$$
      ==即"合起来秩不涨"==。
      实操上就是把两组向量拼成一个大矩阵，比较三个秩。

      **别和"矩阵等价"混了**：

      | | 定义 | 判据 |
      |---|---|---|
      | ==矩阵等价== | $B=PAQ$（$P,Q$ 可逆） | 同型且==秩相等== |
      | ==向量组等价== | 互相线性表示 | ==秩相等还不够==，见上式 |

      ==同样叫"等价"，判据却不同==，这是命题人很爱做文章的地方。
    ` },

    { t: 'key', id: 'rank-and-representation', title: '秩与可表示性：两条常用不等式', c: String.raw`
      **① 若 $S_1$ 可由 $S_2$ 线性表示，则**
      $$\rank(S_1)\le\rank(S_2).$$
      =="被表示的一方秩不会更大"==——你只能用别人的方向拼出东西，拼不出新方向。

      **② 推论（常考）**：若 $S_1$ 可由 $S_2$ 表示，且 ==$S_1$ 的向量个数 $>$ $S_2$ 的向量个数==，
      则 $S_1$ ==必线性相关==。
      $$m_1>m_2\ \Longrightarrow\ \rank(S_1)\le\rank(S_2)\le m_2<m_1
      \ \Longrightarrow\ S_1\ \text{相关}.$$

      ==这条是"多的被少的表示，多的必相关"==，
      它把[个数 $>$ 维数必相关](#/linear-algebra/vectors/independence?at=judge)推广了一层：
      那里的"维数"其实就是标准基的个数。

      **③ 矩阵版本**（更好用）：$C=AB$ 时
      $$\rank(C)\le\min\set{\rank(A),\rank(B)},$$
      因为 ==$C$ 的列是 $A$ 的列的线性组合==（系数由 $B$ 给出），
      ==$C$ 的行是 $B$ 的行的线性组合==。
      这就是[秩的不等式 ②](#/linear-algebra/matrix/rank?at=rank-inequalities)，
      =="可表示 $\Rightarrow$ 秩不增"是它的本质==。

      ==把"矩阵乘法"读成"用列做线性组合"，很多秩的不等式都变得显然。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-find-max',
      title: '★ 求极大无关组并表示其余向量',
      source: '标准例题（每年必考题型）',
      level: 3,
      problem: String.raw`
        设
        $$\alpha_1=\begin{pmatrix}1\\2\\3\end{pmatrix},\
        \alpha_2=\begin{pmatrix}2\\4\\6\end{pmatrix},\
        \alpha_3=\begin{pmatrix}1\\3\\5\end{pmatrix},\
        \alpha_4=\begin{pmatrix}0\\1\\2\end{pmatrix},\
        \alpha_5=\begin{pmatrix}3\\7\\11\end{pmatrix}.$$
        求该向量组的秩与一个极大无关组，并把其余向量用它表示。
      `,
      idea: String.raw`
        **一眼能看出的**：$\alpha_2=2\alpha_1$，==这两个必然只能留一个==。
        另外 $\alpha_3-\alpha_1=(0,1,2)\T=\alpha_4$，==所以 $\alpha_4$ 也是多余的==。
        这些观察可以用来==事后检验答案==，但正式解答仍要走标准流程。

        **标准流程**：把五个向量==按列==拼成 $3\times5$ 矩阵，
        只用[初等行变换](#/linear-algebra/vectors/basis?at=why-column-preserved)化到==行最简形==。

        **秩的上界**：向量是 $3$ 维的，所以 ==$\rank\le3$==；
        又有 $5$ 个向量，==必然相关==（[个数 $>$ 维数](#/linear-algebra/vectors/independence?at=judge)）。

        **化简后怎么读**：主元列 $\Rightarrow$ 极大无关组；
        非主元列竖着读 $\Rightarrow$ 表示系数。
        ==全程不用解任何方程。==
      `,
      solution: String.raw`
        以向量为列作矩阵并作初等行变换：
        $$A=(\alpha_1,\dots,\alpha_5)=\begin{pmatrix}
        1&2&1&0&3\\
        2&4&3&1&7\\
        3&6&5&2&11
        \end{pmatrix}
        \xrightarrow{r_2-2r_1,\ r_3-3r_1}
        \begin{pmatrix}
        1&2&1&0&3\\
        0&0&1&1&1\\
        0&0&2&2&2
        \end{pmatrix}$$
        $$\xrightarrow{r_3-2r_2}
        \begin{pmatrix}
        1&2&1&0&3\\
        0&0&1&1&1\\
        0&0&0&0&0
        \end{pmatrix}
        \xrightarrow{r_1-r_2}
        \begin{pmatrix}
        1&2&0&-1&2\\
        0&0&1&1&1\\
        0&0&0&0&0
        \end{pmatrix}.$$

        **读秩**：非零行有 $2$ 行，故 $\rank=2$。

        **读极大无关组**：主元在第 $1$ 列与第 $3$ 列，故
        $$\boxed{\alpha_1,\alpha_3\ \text{是一个极大无关组}}.$$

        **读表示式**（竖着读非主元列）：

        - 第 $2$ 列是 $(2,0)\T$：$\alpha_2=2\alpha_1+0\cdot\alpha_3=2\alpha_1$；
        - 第 $4$ 列是 $(-1,1)\T$：$\alpha_4=-\alpha_1+\alpha_3$；
        - 第 $5$ 列是 $(2,1)\T$：$\alpha_5=2\alpha_1+\alpha_3$。

        **验算**：
        $-\alpha_1+\alpha_3=(-1+1,\,-2+3,\,-3+5)\T=(0,1,2)\T=\alpha_4\ \checkmark$
        $2\alpha_1+\alpha_3=(2+1,\,4+3,\,6+5)\T=(3,7,11)\T=\alpha_5\ \checkmark$
      `,
      comment: String.raw`
        **这道题的全部技术含量在"读"**，不在"算"。
        化到行最简形之后，==秩、极大无关组、三个表示式一共四个答案，全是读出来的==。

        **两个必须守住的纪律**：

        1. ==必须按列放向量==。按行放的话，行变换会把向量本身搅乱；
        2. ==全程只能用行变换==。中途用一次列变换，
           主元列与原向量的对应关系就断了，
           见[核心那一节](#/linear-algebra/vectors/basis?at=why-column-preserved)。

        **极大无关组不唯一**：本题取 $\alpha_1,\alpha_3$，
        但 $\alpha_2,\alpha_3$ 也是（$\alpha_2=2\alpha_1$ 与 $\alpha_1$ 等价），
        $\alpha_1,\alpha_4$ 同样可以。
        ==个数一定是 $2$，具体是哪两个不唯一==。
        考试写出任意一个正确的即可，==但表示式必须与你选的那一组配套==。

        **一个能省时间的观察**：秩为 $2$ 而向量是 $3$ 维的，
        说明这五个向量==全落在同一个平面上==。
        算完若发现秩是 $3$，回头看看是不是行变换算错了——
        ==因为 $\alpha_2=2\alpha_1$ 肉眼可见，秩不可能是 $3$== 也不可能超过 $4$ 个独立方向。
      `,
    },

    { t: 'example',
      id: 'ex-equivalent',
      title: '判断两个向量组是否等价',
      source: '标准例题（概念型）',
      level: 3,
      problem: String.raw`
        设
        $$\alpha_1=\begin{pmatrix}1\\0\\1\end{pmatrix},\
        \alpha_2=\begin{pmatrix}0\\1\\1\end{pmatrix};\qquad
        \beta_1=\begin{pmatrix}1\\1\\2\end{pmatrix},\
        \beta_2=\begin{pmatrix}1\\-1\\0\end{pmatrix}.$$
        判断向量组 $\set{\alpha_1,\alpha_2}$ 与 $\set{\beta_1,\beta_2}$ 是否等价。
      `,
      idea: String.raw`
        **不能只比秩**。两组的秩显然都是 $2$，
        但[秩相等推不出等价](#/linear-algebra/vectors/basis?at=equivalence)。

        **正确的判据是三个秩相等**：
        $$\rank(\alpha)=\rank(\beta)=\rank(\alpha_1,\alpha_2,\beta_1,\beta_2).$$
        直观理解：==把两组拼在一起，若秩没涨，说明谁也没带来新方向，
        于是能互相表示==。

        **实操**：把四个向量拼成一个 $3\times4$ 矩阵，一次行变换化到底，
        ==同时读出三个秩==（前两列的秩、后两列的秩、全部四列的秩）。

        **预判**：$\beta_1=\alpha_1+\alpha_2=(1,1,2)\T\ \checkmark$，
        $\beta_2=\alpha_1-\alpha_2=(1,-1,0)\T\ \checkmark$。
        ==两个 $\beta$ 都能被 $\alpha$ 表示==，
        而且这个 $2\times2$ 的系数矩阵 $\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ 可逆，
        ==所以反过来也能表示==，答案应当是等价。
      `,
      solution: String.raw`
        把四个向量按列拼成矩阵并作行变换：
        $$(\alpha_1,\alpha_2,\beta_1,\beta_2)
        =\begin{pmatrix}
        1&0&1&1\\
        0&1&1&-1\\
        1&1&2&0
        \end{pmatrix}
        \xrightarrow{r_3-r_1}
        \begin{pmatrix}
        1&0&1&1\\
        0&1&1&-1\\
        0&1&1&-1
        \end{pmatrix}
        \xrightarrow{r_3-r_2}
        \begin{pmatrix}
        1&0&1&1\\
        0&1&1&-1\\
        0&0&0&0
        \end{pmatrix}.$$

        由此读出：

        - $\rank(\alpha_1,\alpha_2)=2$（前两列的主元数）；
        - $\rank(\alpha_1,\alpha_2,\beta_1,\beta_2)=2$（总非零行数）；
        - $\rank(\beta_1,\beta_2)$：单独看后两列 $\begin{pmatrix}1&1\\1&-1\\0&0\end{pmatrix}$，
          二阶子式 $\begin{vmatrix}1&1\\1&-1\end{vmatrix}=-2\ne0$，故秩为 $2$。

        三个秩都等于 $2$，故==两向量组等价==。

        **具体的表示式**（由最简形第 $3,4$ 列竖着读）：
        $$\beta_1=\alpha_1+\alpha_2,\qquad \beta_2=\alpha_1-\alpha_2.$$
        反解得
        $$\alpha_1=\tfrac12(\beta_1+\beta_2),\qquad \alpha_2=\tfrac12(\beta_1-\beta_2).$$
      `,
      comment: String.raw`
        **"反解"这一步说明了等价的实质**：
        两组之间的过渡矩阵
        $$C=\begin{pmatrix}1&1\\ 1&-1\end{pmatrix}$$
        ==可逆==，所以关系可以倒过来用。
        一般地：

        $$\boxed{\ (\beta_1,\dots,\beta_s)=(\alpha_1,\dots,\alpha_s)C\ \text{且}\ C\ \text{可逆}
        \ \Longrightarrow\ \text{两组等价}\ }$$

        ==这与[基变换与过渡矩阵](#/linear-algebra/vectors/space?at=transition-def)是同一件事==：
        两组基之间的过渡矩阵必然可逆，==所以任意两组基都是等价的==。

        **判据的三个秩，缺一不可**：

        - 只有 $\rank(\alpha)=\rank(\alpha,\beta)$ $\Rightarrow$ ==只说明 $\beta$ 能被 $\alpha$ 表示==（单向）；
        - 只有 $\rank(\beta)=\rank(\alpha,\beta)$ $\Rightarrow$ 只说明 $\alpha$ 能被 $\beta$ 表示；
        - ==两个都有==，才是双向可表示，即等价。

        **一个反例提醒**：$\set{(1,0)}$ 与 $\set{(0,1)}$ 秩都是 $1$，
        但拼起来秩是 $2$，==三个秩不全相等，故不等价==。
        ==这正是"秩相等不足以判等价"的最短反例。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **求极大无关组时用了列变换**：==只能用行变换==，
         否则列与原向量的对应关系就断了。
      2. **向量按行放**：==必须按列拼成矩阵==。
      3. **只化到阶梯形就读表示系数**：要读系数==必须化到行最简形==。
      4. **由秩相等断言向量组等价**：==还要看合并后的秩==。
      5. **把"矩阵等价"的判据用到向量组上**：两者判据不同。
      6. **表示式与所选的极大无关组不配套**：换了组就要重新读。
      7. **忘了极大无关组不唯一**：个数唯一、成员不唯一。
      8. **认为"被表示的一方秩更大"**：==恰好相反，被表示的一方秩不会更大==。
      9. **算完不验算**：把表示式代回去核对，==十秒钟的事==。
    ` },

  ],
});
