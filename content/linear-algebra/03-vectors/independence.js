/* ==========================================================================
   线性代数 / 3 向量组 / 线性相关性的判定与证明
   —— 全书最"概念"的一节：具体向量靠秩，抽象向量靠定义。
      极大无关组与秩见 vectors/basis；坐标与基见 vectors/space。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/vectors/independence',
  title: '线性相关性的判定与证明',
  subtitle: '相关 = 存在**不全为零**的系数把它们凑成零。具体向量算秩，抽象向量一律回到定义',
  tags: ['大题', '证明题', '概念辨析', '高频'],
  updated: '2026-08-27',

  blocks: [

    { t: 'key', id: 'def', title: '定义：注意「不全为零」四个字', c: String.raw`
      称 $\alpha_1,\dots,\alpha_m$ **线性相关**，若存在==不全为零==的数 $k_1,\dots,k_m$ 使
      $$k_1\alpha_1+k_2\alpha_2+\cdots+k_m\alpha_m=0.$$
      否则称**线性无关**，即
      $$k_1\alpha_1+\cdots+k_m\alpha_m=0\ \Longrightarrow\ k_1=k_2=\cdots=k_m=0.$$

      =="不全为零"不是"全不为零"==。
      只要有一个系数非零就算相关，其余的可以是零。
      **这四个字每年都在选择题里被做文章。**

      **两个方向的读法要分清**：

      | | 相关 | 无关 |
      |---|---|---|
      | 存在性 | ==存在==一组非零系数使和为零 | ==任何==非零系数都凑不出零 |
      | 方程组 | $Ax=0$ 有==非零解== | $Ax=0$ ==只有零解== |
      | 秩 | $\rank(A)<m$ | ==$\rank(A)=m$== |
      | 直观 | ==有多余的向量==（能被其他的表示） | 每个都携带新方向 |

      （这里 $A=(\alpha_1,\dots,\alpha_m)$ 是以这些向量为列的矩阵。）

      ==第二行那个翻译是全章的枢纽==：
      向量组的问题一律可以转成[齐次方程组](#/linear-algebra/linear-systems/solvability?at=homogeneous)的问题。

      **两个特例**：

      - 单个向量 $\alpha$ 相关 $\iff\alpha=0$；
      - ==含零向量的向量组必相关==（给零向量配系数 $1$，其余配 $0$）。
    ` },

    { t: 'method', id: 'judge', title: '★ 判定方法：先看是具体的还是抽象的', c: String.raw`
      $$\boxed{\ \text{给了具体数字}\ \Rightarrow\ \text{算秩};\qquad
      \text{只给抽象条件}\ \Rightarrow\ \text{回到定义}\ }$$

      **具体向量（给出坐标）**：

      1. 以这些向量为==列==拼成矩阵 $A$；
      2. 初等行变换化阶梯形，数秩；
      3. $\rank(A)=m$（向量个数）$\Rightarrow$ 无关，$<m\Rightarrow$ 相关。

      ==特别地，$m=n$（个数 $=$ 维数）时可以直接算行列式==：
      $\abs A\ne0\iff$ 无关。==方阵情形这条最快。==

      **抽象向量（只给关系式）**：==只能用[定义法](#/linear-algebra/vectors/independence?at=def-method)==，
      这是本页的重点，也是考研证明题的固定题型。

      **一条不用算就能用的判据**：
      $$\boxed{\ \text{向量个数}>\text{向量维数}\ \Longrightarrow\ \text{必相关}\ }$$
      因为此时 $Ax=0$ 是"未知数比方程多"的欠定方程组，==必有非零解==。
      ==$4$ 个 $3$ 维向量、$n+1$ 个 $n$ 维向量，一律相关，秒选。==
    ` },

    { t: 'key', id: 'def-method', title: '★ 定义法的标准三步（证明题模板）', c: String.raw`
      要证 $\beta_1,\dots,\beta_s$ ==线性无关==：

      1. **设**：设 $k_1\beta_1+k_2\beta_2+\cdots+k_s\beta_s=0$；
      2. **代**：把 $\beta_i$ 用题目给的关系换成 $\alpha_j$ 的组合，
         ==整理成 $\alpha_j$ 的线性组合，按 $\alpha_j$ 归并同类项==；
      3. **推**：由 $\alpha_j$ 无关，各系数全为零，==解这个关于 $k_i$ 的齐次方程组==，
         证明只有零解。

      **第 2 步的归并是关键**。例如已知 $\alpha_1,\alpha_2,\alpha_3$ 无关，
      $\beta_1=\alpha_1+\alpha_2$，$\beta_2=\alpha_2+\alpha_3$，$\beta_3=\alpha_3+\alpha_1$，则
      $$k_1\beta_1+k_2\beta_2+k_3\beta_3
      =(k_1+k_3)\alpha_1+(k_1+k_2)\alpha_2+(k_2+k_3)\alpha_3=0.$$
      由 $\alpha$ 无关得
      $$\begin{cases}k_1+k_3=0\\ k_1+k_2=0\\ k_2+k_3=0\end{cases}$$
      系数行列式为 $2\ne0$，故只有零解，==$\beta$ 无关==。

      **矩阵写法（更快，推荐）**：把上面的关系写成
      $$(\beta_1,\beta_2,\beta_3)=(\alpha_1,\alpha_2,\alpha_3)C,\qquad
      C=\begin{pmatrix}1&0&1\\ 1&1&0\\ 0&1&1\end{pmatrix},$$
      则
      $$\boxed{\ \alpha\ \text{无关时}:\quad \beta\ \text{无关}\iff\abs C\ne0\ }$$
      更一般地 $\rank(\beta)=\rank(C)$。
      ==把"解方程组"变成"算一个行列式"，这是这类题的最优解法。==

      **矩阵 $C$ 怎么写别搞反**：==$C$ 的第 $j$ 列是 $\beta_j$ 在 $\alpha$ 下的系数==，
      竖着写。写成转置是最常见的错误。
    ` },

    { t: 'key', id: 'properties', title: '相关性的性质：三对口诀', c: String.raw`
      **① 部分与整体**：
      $$\text{部分相关}\ \Longrightarrow\ \text{整体相关};\qquad
      \text{整体无关}\ \Longrightarrow\ \text{部分无关}$$
      口诀：==部分相关则整体相关，整体无关则部分无关==。
      （反向都不成立：整体相关时部分未必相关。）

      **② 延长与缩短**（对每个向量增删分量）：
      $$\text{无关组}\ \xrightarrow{\ \text{每个向量加分量}\ }\ \text{仍无关}$$
      $$\text{相关组}\ \xrightarrow{\ \text{每个向量删分量}\ }\ \text{仍相关}$$
      口诀：==无关的延长仍无关，相关的缩短仍相关==。
      **理解方式**：加分量相当于给方程组==增加方程==，
      解只会更少，零解仍是唯一解。

      **③ 个数与维数**：
      $$m>n\ (\text{个数}>\text{维数})\ \Longrightarrow\ \text{必相关}$$

      ==这三条合起来能秒杀大量选择题==，几乎不用计算。

      **一条常用的等价刻画**：
      $$\alpha_1,\dots,\alpha_m\ (m\ge2)\ \text{相关}
      \iff \text{其中至少有一个向量能被其余的线性表示}$$
      ==注意是"至少有一个"，不是"每一个"==。
      $\alpha_1=(1,0)$、$\alpha_2=(2,0)$、$\alpha_3=(0,1)$ 相关，
      但 $\alpha_3$ ==不能==被其余两个表示。
      **这个细节是概念题的常客。**
    ` },

    { t: 'key', id: 'representation', title: '线性表示与相关性的联系', c: String.raw`
      **核心结论**：设 $\alpha_1,\dots,\alpha_m$ ==无关==，而 $\alpha_1,\dots,\alpha_m,\beta$ ==相关==，则
      $$\beta\ \text{能由}\ \alpha_1,\dots,\alpha_m\ \text{线性表示，且表示法**唯一**}.$$

      **两行证明**（值得会写）：由相关性存在不全为零的 $k_1,\dots,k_m,k$ 使
      $$k_1\alpha_1+\cdots+k_m\alpha_m+k\beta=0.$$
      若 $k=0$，则式子退化成 $\alpha$ 的组合为零且系数不全为零，
      ==与 $\alpha$ 无关矛盾==，故 $k\ne0$，可以除过去解出 $\beta$。
      唯一性：两个表示式相减，由 $\alpha$ 无关得系数全相等。

      ==这个"先证 $k\ne0$"的动作是标准答案的踩分点。==

      **用方程组的语言重述**（更好用）：
      $$\beta\ \text{可由}\ \alpha_1,\dots,\alpha_m\ \text{表示}
      \iff \rank(\alpha_1,\dots,\alpha_m)=\rank(\alpha_1,\dots,\alpha_m,\beta)$$
      ==即"添了 $\beta$ 秩不涨"==。
      这正是[非齐次方程组有解的判据](#/linear-algebra/linear-systems/solvability?at=three-cases)，
      **两者本来就是同一句话**：$\beta$ 能被表示 $\iff Ax=\beta$ 有解。

      ==这两章的全部对应关系==整理在
      [互译词典](#/linear-algebra/linear-systems/translation?at=dictionary)里，
      连同[方程组那边反过来能读出什么](#/linear-algebra/linear-systems/translation?at=to-vectors)。

      **表示法唯一 $\iff$ 秩 $=m$**（列满秩），
      否则有无穷多种表示法。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-def-proof',
      title: '★ 定义法证无关：两种写法对照',
      source: '经典证明题',
      level: 3,
      problem: String.raw`
        设 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，令
        $$\beta_1=\alpha_1+\alpha_2,\qquad
        \beta_2=\alpha_2+\alpha_3,\qquad
        \beta_3=\alpha_3-\alpha_1.$$
        判断 $\beta_1,\beta_2,\beta_3$ 是否线性无关。
      `,
      idea: String.raw`
        **两条路，都要会**：

        - **定义法**：设 $k_1\beta_1+k_2\beta_2+k_3\beta_3=0$，
          代入后按 $\alpha_1,\alpha_2,\alpha_3$ ==归并同类项==，
          用 $\alpha$ 无关得到关于 $k$ 的齐次方程组，看有没有非零解。
        - **矩阵法**：写出 $(\beta_1,\beta_2,\beta_3)=(\alpha_1,\alpha_2,\alpha_3)C$，
          ==只需算 $\abs C$==。

        **矩阵法快得多**，但要小心 $C$ 的写法：
        ==第 $j$ 列装的是 $\beta_j$ 的系数==。
        $\beta_1=\alpha_1+\alpha_2$ 给出第一列 $(1,1,0)\T$；
        $\beta_3=-\alpha_1+\alpha_3$ 给出第三列 ==$(-1,0,1)\T$==（注意负号）。

        **动手前先猜一下**：这三个 $\beta$ 之间是不是有明显关系？
        $\beta_1+\beta_2=\alpha_1+2\alpha_2+\alpha_3$，
        而 $\beta_3=\alpha_3-\alpha_1$，看不出直接的关系，
        ==所以大概率无关==。算一下确认。
      `,
      solution: String.raw`
        **解法一（定义法）**：设
        $$k_1\beta_1+k_2\beta_2+k_3\beta_3=0,$$
        代入并按 $\alpha_i$ 归并：
        $$k_1(\alpha_1+\alpha_2)+k_2(\alpha_2+\alpha_3)+k_3(\alpha_3-\alpha_1)$$
        $$=(k_1-k_3)\alpha_1+(k_1+k_2)\alpha_2+(k_2+k_3)\alpha_3=0.$$

        由 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，各系数为零：
        $$\begin{cases}k_1-k_3=0\\ k_1+k_2=0\\ k_2+k_3=0\end{cases}$$
        系数行列式
        $$\begin{vmatrix}1&0&-1\\ 1&1&0\\ 0&1&1\end{vmatrix}
        =1\cdot(1-0)-0+(-1)(1-0)=1-1=0.$$

        行列式为零，方程组==有非零解==（如 $k_1=1,k_2=-1,k_3=1$）。
        故 $\beta_1,\beta_2,\beta_3$ ==线性相关==。

        **解法二（矩阵法）**：
        $$(\beta_1,\beta_2,\beta_3)=(\alpha_1,\alpha_2,\alpha_3)C,\qquad
        C=\begin{pmatrix}1&0&-1\\ 1&1&0\\ 0&1&1\end{pmatrix},$$
        $\abs C=0$，故 $\rank(\beta)=\rank(C)=2<3$，==线性相关==。

        **具体的相关关系**：由 $k=(1,-1,1)$ 得
        $$\beta_1-\beta_2+\beta_3=0.$$
        （验证：$(\alpha_1+\alpha_2)-(\alpha_2+\alpha_3)+(\alpha_3-\alpha_1)=0\ \checkmark$）
      `,
      comment: String.raw`
        **注意结论与直觉相反**——思路里猜的是"无关"，实际是相关。
        ==这提醒我们这类题必须真算，不能靠看==。

        **相关的根源**：把三个关系式相加会发现
        $\beta_1-\beta_2+\beta_3$ 中每个 $\alpha_i$ 的系数都恰好抵消。
        ==命题人正是这样设计系数的==：让 $C$ 的三列线性相关。

        **一条判断"会不会相关"的快速经验**：
        写出 $C$ 后看==各行（列）之和是否为零==，或者==有没有两列成比例==。
        本题 $C$ 的第一列减第二列加第三列
        $=(1-0-1,\ 1-1+0,\ 0-1+1)\T=0$，==一眼就能看出行列式为零==。

        **对照：把 $\beta_3$ 改成 $\alpha_3+\alpha_1$**，则
        $$C=\begin{pmatrix}1&0&1\\ 1&1&0\\ 0&1&1\end{pmatrix},\qquad \abs C=2\ne0,$$
        ==此时无关==。
        **一个符号之差，结论完全相反**——
        这是[定义法模板](#/linear-algebra/vectors/independence?at=def-method)里
        那个例子和本题的全部区别。

        **写解答时的两个得分点**：

        1. ==必须写"由 $\alpha_1,\alpha_2,\alpha_3$ 线性无关"这句话==，
           它是从"组合为零"跳到"系数为零"的唯一依据；
        2. 结论是相关时，==最好给出一组具体的非零系数==，
           这是最有力的证据。
      `,
    },

    { t: 'example',
      id: 'ex-representation',
      title: '含参数：讨论能否被表示',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设
        $$\alpha_1=\begin{pmatrix}1\\1\\1\end{pmatrix},\quad
        \alpha_2=\begin{pmatrix}1\\2\\3\end{pmatrix},\quad
        \alpha_3=\begin{pmatrix}1\\3\\t\end{pmatrix},\quad
        \beta=\begin{pmatrix}1\\4\\7\end{pmatrix}.$$
        讨论 $t$ 取何值时 $\beta$ 可由 $\alpha_1,\alpha_2,\alpha_3$ 线性表示，
        并求出表示式。
      `,
      idea: String.raw`
        **翻译**：$\beta$ 可由 $\alpha_i$ 表示 $\iff$ 方程组
        $x_1\alpha_1+x_2\alpha_2+x_3\alpha_3=\beta$ ==有解==
        $\iff\rank(A)=\rank(A\mid\beta)$，
        其中 $A=(\alpha_1,\alpha_2,\alpha_3)$。

        ==所以这就是一道方程组的相容性讨论题==，
        见[有解的判据](#/linear-algebra/linear-systems/solvability?at=three-cases)。

        **$A$ 是方阵，先算 $\abs A$**：
        $\abs A\ne0$ 时 $\rank A=3$，==必有唯一解==，$t$ 随便取都行；
        $\abs A=0$ 时才需要单独讨论。

        **化简的技巧**：直接对增广矩阵 $(A\mid\beta)$ 做行变换，
        ==一次把秩和解都拿到==，不必先算行列式再回头解方程。
        参数 $t$ 只出现在一个位置，==化到最后会孤立在某一行==，
        那一行就是分类讨论的依据。
      `,
      solution: String.raw`
        对增广矩阵作行变换：
        $$(A\mid\beta)=\left(\begin{array}{ccc|c}
        1&1&1&1\\ 1&2&3&4\\ 1&3&t&7
        \end{array}\right)
        \xrightarrow{r_2-r_1,\ r_3-r_1}
        \left(\begin{array}{ccc|c}
        1&1&1&1\\ 0&1&2&3\\ 0&2&t-1&6
        \end{array}\right)$$
        $$\xrightarrow{r_3-2r_2}
        \left(\begin{array}{ccc|c}
        1&1&1&1\\ 0&1&2&3\\ 0&0&t-5&0
        \end{array}\right).$$

        **情形一：$t\ne5$。** 此时 $\rank(A)=\rank(A\mid\beta)=3=n$，==有唯一解==。
        由第三行得 $x_3=0$，回代得 $x_2=3$，$x_1=1-3-0=-2$，故
        $$\beta=-2\alpha_1+3\alpha_2+0\cdot\alpha_3.$$

        **情形二：$t=5$。** 此时最后一行全为零，
        $\rank(A)=\rank(A\mid\beta)=2<3$，==有无穷多解==。
        由
        $$\begin{cases}x_1+x_2+x_3=1\\ x_2+2x_3=3\end{cases}$$
        取 $x_3=k$ 为自由未知量，得 $x_2=3-2k$，$x_1=1-(3-2k)-k=k-2$，故
        $$\beta=(k-2)\alpha_1+(3-2k)\alpha_2+k\alpha_3,\qquad k\ \text{任意}.$$

        **结论**：==对一切 $t$，$\beta$ 都可由 $\alpha_1,\alpha_2,\alpha_3$ 表示==；
        $t\ne5$ 时表示法唯一，$t=5$ 时有无穷多种表示法。
      `,
      comment: String.raw`
        **这道题的结论有点"反套路"**：
        通常这类题会设计成"某个 $t$ 使得无解"，
        而本题==任何 $t$ 都有解==，只是唯一性不同。

        原因看最后那个阶梯形：第三行是 $(0,0,t-5\mid 0)$，
        ==右边那个 $0$ 是关键==。若右边是非零数，$t=5$ 时就会出现
        "$0=$ 非零"的矛盾行，那才是无解。
        ==所以判断有没有解，只看零行对应的常数项是不是零。==

        **三种结论的判据（务必分清）**：

        | 判据 | 结论 |
        |---|---|
        | $\rank(A)<\rank(A\mid\beta)$ | ==无解==（表示不了） |
        | $\rank(A)=\rank(A\mid\beta)=n$ | 唯一表示 |
        | $\rank(A)=\rank(A\mid\beta)<n$ | ==无穷多种表示== |

        **顺带回答另一个常见追问**："$t$ 为何值时 $\alpha_1,\alpha_2,\alpha_3$ 线性相关？"
        看系数矩阵部分：$\rank(A)<3\iff t=5$。
        ==同一次行变换同时回答了两个问题==，
        这就是"对增广矩阵一次化到底"的好处。

        **$t=5$ 时表示法不唯一的原因**：此时 $\alpha_3=2\alpha_2-\alpha_1$
        （代入验证：$2(1,2,3)-(1,1,1)=(1,3,5)\ \checkmark$），
        ==$\alpha_3$ 是多余的==，所以可以把它的系数任意调整再用前两个补偿。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **"不全为零"读成"全不为零"**：==只要有一个系数非零就是相关==。
      2. **相关就认为"每个向量都能被其余表示"**：==只能保证"至少有一个"==。
      3. **抽象题不用定义法**：没有具体坐标时==只能设组合为零再推==。
      4. **定义法漏掉关键句**：从"组合为零"跳到"系数为零"，
         ==必须写明"由 $\alpha$ 线性无关"==。
      5. **系数矩阵 $C$ 写成转置**：==第 $j$ 列装 $\beta_j$ 的系数==。
      6. **延长缩短记反**：==无关的延长仍无关，相关的缩短仍相关==。
      7. **部分整体记反**：==部分相关则整体相关，整体无关则部分无关==。
      8. **忘了"个数 $>$ 维数必相关"**：这条能秒杀不少选择题。
      9. **判断可表示时只看 $\rank(A)$**：==必须比较 $\rank(A)$ 与 $\rank(A\mid\beta)$==。
      10. **含零向量的组当成可能无关**：==必相关==。
    ` },

  ],
});
