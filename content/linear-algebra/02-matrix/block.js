/* ==========================================================================
   线性代数 / 2 矩阵 / 分块矩阵与初等变换
   —— 两件工具：把大矩阵切成小块，把变换写成左乘右乘。
      分块行列式见 determinant/special。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/matrix/block',
  title: '分块矩阵与初等变换',
  subtitle: '分块是**把大矩阵当小矩阵算**；初等变换是**把"动作"变成"乘一个矩阵"**——两者合起来撑起整章计算',
  tags: ['小题', '计算题', '概念辨析'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'why-block', title: '分块的意义：把结构显式化', c: String.raw`
      把矩阵按行、列切成若干块，==每一块当成一个"元素"==，
      于是加法、乘法、转置的规则==形式上与普通矩阵完全一样==。

      **它解决的问题是"看见结构"**：
      $$\begin{pmatrix}
      1&2&0&0\\ 3&4&0&0\\ 0&0&5&6\\ 0&0&7&8
      \end{pmatrix}
      =\begin{pmatrix}A&O\\ O&B\end{pmatrix}$$
      左边是个 $4$ 阶矩阵，右边==一眼看出是两个独立的 $2$ 阶问题==。
      求逆、求幂、求行列式、求秩，全都可以==分块各做各的==。

      **分块的两条硬性要求**：

      1. **加法**：两个矩阵的分块方式必须==完全相同==；
      2. **乘法**：$A$ 的==列的分法==必须与 $B$ 的==行的分法==一致，
         否则对应的小块无法相乘。

      ==第 2 条是分块乘法唯一会出错的地方==：动手前先检查"接口"对不对齐。

      **一个必须小心的地方**：分块乘法==仍然不能交换==，
      $\begin{pmatrix}A&B\end{pmatrix}\begin{pmatrix}C\\D\end{pmatrix}=AC+BD$，
      ==顺序不能颠倒==。
    ` },

    { t: 'key', id: 'block-ops', title: '常用的分块公式', c: String.raw`
      **转置**（==块要转置，块内也要转置==）：
      $$\begin{pmatrix}A&B\\ C&D\end{pmatrix}\T
      =\begin{pmatrix}A\T&C\T\\ B\T&D\T\end{pmatrix}$$
      ==注意 $B$ 和 $C$ 换了位置==，这是最容易漏的一步。

      **分块对角阵**（记 $\diag(A,B)$）：
      $$\begin{pmatrix}A&O\\ O&B\end{pmatrix}^{k}=\begin{pmatrix}A^{k}&O\\ O&B^{k}\end{pmatrix},
      \qquad
      \abs{\begin{matrix}A&O\\ O&B\end{matrix}}=\abs A\abs B,$$
      $$\rank\begin{pmatrix}A&O\\ O&B\end{pmatrix}=\rank(A)+\rank(B).$$

      ==分块对角阵的一切运算都是"各块独立进行"==，
      这就是分块最大的价值。

      **行列式的分块公式**见[上一章](#/linear-algebra/determinant/special?at=block-det)，
      注意副对角线情形要带 $(-1)^{mn}$。
    ` },

    { t: 'key', id: 'block-inverse', title: '分块求逆', c: String.raw`
      **分块对角**（$A,B$ 均可逆）：
      $$\begin{pmatrix}A&O\\ O&B\end{pmatrix}\inv
      =\begin{pmatrix}A\inv&O\\ O&B\inv\end{pmatrix}$$

      **副对角块**（==逆之后位置会换==）：
      $$\begin{pmatrix}O&A\\ B&O\end{pmatrix}\inv
      =\begin{pmatrix}O&B\inv\\ A\inv&O\end{pmatrix}$$
      ==$A$ 在右上，$A\inv$ 就跑到左下==。
      这一条必须验一遍才记得住：两边相乘确实得 $E$。

      **分块上三角**：
      $$\begin{pmatrix}A&C\\ O&B\end{pmatrix}\inv
      =\begin{pmatrix}A\inv&-A\inv CB\inv\\ O&B\inv\end{pmatrix}$$
      ==右上角那一块的符号和顺序是唯一的难点==：
      记法是"==左边的逆、原来的块、右边的逆，前面加负号=="。

      **不必死记的办法**：设逆为 $\begin{pmatrix}X&Y\\ Z&W\end{pmatrix}$，
      直接乘出来令其等于 $E$，==解四个块方程==，三十秒就能推出来。
      ==考场上推一遍比记错公式安全。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'elem-sec', c: '一、初等变换与初等矩阵' },

    { t: 'key', id: 'elementary', title: '三种初等矩阵及其逆', c: String.raw`
      **初等矩阵** $=$ 对单位阵 $E$ ==做一次==初等变换所得的矩阵。

      | 记号 | 由 $E$ 作什么变换 | 逆矩阵 | 行列式 |
      |---|---|---|---|
      | $E(i,j)$ | 交换第 $i,j$ 行 | ==自己==（$E(i,j)\inv=E(i,j)$） | $-1$ |
      | $E(i(k))$ | 第 $i$ 行乘 $k\ne0$ | $E(i(\tfrac1k))$ | $k$ |
      | $E(i,j(k))$ | 第 $j$ 行的 $k$ 倍加到第 $i$ 行 | ==$E(i,j(-k))$== | $1$ |

      ==三种初等矩阵都可逆，且逆仍是同类型的初等矩阵==。
      这一条直接给出[可逆的第 7 个等价条件](#/linear-algebra/matrix/operations?at=invertible-equiv)：
      **可逆 $\iff$ 能写成若干初等矩阵之积**。

      **第三行的逆最容易记错**：==把 $k$ 换成 $-k$ 即可==，
      不是取倒数（那是第二行）。
    ` },

    { t: 'key', id: 'left-right', title: '★ 左行右列', c: String.raw`
      $$\boxed{\ \text{左乘初等矩阵}=\text{对行做变换};\qquad
      \text{右乘初等矩阵}=\text{对列做变换}\ }$$

      ==这八个字是本节的全部内容==，选择题年年考。

      **例**：$E(1,2)A$ 是把 $A$ 的第 $1,2$ ==行==交换；
      $AE(1,2)$ 是把 $A$ 的第 $1,2$ ==列==交换。

      **考试中的典型问法**：
      "已知 $B$ 由 $A$ 经过某某变换得到，问 $B=?A?$"，
      ==要点是判断该乘在左边还是右边、乘的是哪个初等矩阵==。

      **一个容易绕晕的细节**：$E(i,j(k))$ 表示"第 $j$ 行的 $k$ 倍加到第 $i$ 行"。
      左乘它是行变换（如定义）；
      ==右乘它却是"第 $i$ 列的 $k$ 倍加到第 $j$ 列"==——
      **行列的角色和下标顺序都反过来了**。
      ==拿不准时就用 $2$ 阶的具体矩阵试一下==，比背规则可靠。

      **与秩、行列式的联系**：
      左乘右乘可逆矩阵==都不改变秩==（[上一页](#/linear-algebra/matrix/rank?at=rank-invariance)），
      而行列式则按上表的第四列成比例变化。
    ` },

    { t: 'method', id: 'elementary-as-inverse', title: '初等变换求逆与解矩阵方程', c: String.raw`
      **求逆**：
      $$\bigl(A\ \big|\ E\bigr)\ \xrightarrow{\ \text{初等**行**变换}\ }\ \bigl(E\ \big|\ A\inv\bigr)$$

      **道理**：一串行变换等价于左乘一个可逆矩阵 $P$，
      $P(A\mid E)=(PA\mid P)$。当 $PA=E$ 时 $P=A\inv$，
      ==右半边自动变成了 $A\inv$==。

      **解矩阵方程 $AX=B$**：
      $$\bigl(A\ \big|\ B\bigr)\ \xrightarrow{\ \text{行变换}\ }\ \bigl(E\ \big|\ A\inv B\bigr)$$
      ==同一个道理，而且比先求 $A\inv$ 再乘 $B$ 快得多==。

      **解 $XA=B$**：这时要用==列变换==，或者==转置成 $A\T X\T=B\T$ 再用行变换==。
      ==后者更不容易出错==，推荐。

      $$\begin{pmatrix}A\\ \hline B\end{pmatrix}
      \ \xrightarrow{\ \text{初等**列**变换}\ }\
      \begin{pmatrix}E\\ \hline BA\inv\end{pmatrix}$$

      **三条纪律**：

      1. ==求逆和解 $AX=B$ 只能用行变换==，中途混进列变换就全错；
      2. 化到左边是 $E$ 为止，==不能提前停==；
      3. 若左边化不出 $E$（出现零行），说明 ==$A$ 不可逆==，方程可能无解或有无穷多解。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-block-inverse',
      title: '分块求逆：不背公式，直接解块方程',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $A$ 为 $m$ 阶可逆矩阵，$B$ 为 $n$ 阶可逆矩阵，$C$ 为 $m\times n$ 矩阵。
        求 $M=\begin{pmatrix}A&C\\ O&B\end{pmatrix}$ 的逆矩阵。
      `,
      idea: String.raw`
        **可以背公式，但推一遍更稳**。
        设逆为 $\begin{pmatrix}X&Y\\ Z&W\end{pmatrix}$（分块方式与 $M$ 一致），
        令 $M\cdot(\text{它})=E$，==把四个块方程写出来==。

        ==注意分块的形状==：$X$ 是 $m$ 阶、$W$ 是 $n$ 阶、$Y$ 是 $m\times n$、$Z$ 是 $n\times m$，
        单位阵也要相应地分成 $\begin{pmatrix}E_m&O\\ O&E_n\end{pmatrix}$。

        **解的顺序有讲究**：先看==含 $Z,W$ 的那两个方程==，
        因为 $M$ 的第二行是 $(O\ \ B)$，方程最简单：
        $$BZ=O,\qquad BW=E_n.$$
        $B$ 可逆，==立刻得 $Z=O$、$W=B\inv$==。
        再回代到第一行的两个方程解 $X,Y$。

        =="先解结构最简单的那一块"是分块题的通用策略。==
      `,
      solution: String.raw`
        设 $M\inv=\begin{pmatrix}X&Y\\ Z&W\end{pmatrix}$，则
        $$\begin{pmatrix}A&C\\ O&B\end{pmatrix}\begin{pmatrix}X&Y\\ Z&W\end{pmatrix}
        =\begin{pmatrix}AX+CZ&AY+CW\\ BZ&BW\end{pmatrix}
        =\begin{pmatrix}E_m&O\\ O&E_n\end{pmatrix}.$$

        比较四个块：
        $$BZ=O,\qquad BW=E_n,\qquad AX+CZ=E_m,\qquad AY+CW=O.$$

        由 $B$ 可逆：$Z=O$，$W=B\inv$。

        代入第三式：$AX=E_m\Rightarrow X=A\inv$。

        代入第四式：$AY=-CW=-CB\inv\Rightarrow Y=-A\inv CB\inv$。

        故
        $$M\inv=\begin{pmatrix}A\inv&-A\inv CB\inv\\ O&B\inv\end{pmatrix}.$$
      `,
      comment: String.raw`
        **右上角那一块的形式值得看清**：$-A\inv CB\inv$，
        ==左边是 $A\inv$、右边是 $B\inv$，中间夹着原来的 $C$，整体带负号==。
        顺序不能换（矩阵乘法不交换），
        =="左块的逆在左、右块的逆在右"是记忆的抓手==。

        **结构上的对称**：若把 $C$ 放在左下角，同样的推法给出
        $$\begin{pmatrix}A&O\\ C&B\end{pmatrix}\inv
        =\begin{pmatrix}A\inv&O\\ -B\inv CA\inv&B\inv\end{pmatrix},$$
        ==规律不变：所在行那个对角块的逆写在左边、所在列那个对角块的逆写在右边==。

        **一个常考的推论**：由 $\abs M=\abs A\abs B$
        （[分块行列式](#/linear-algebra/determinant/special?at=block-det)）可知
        $$M\ \text{可逆}\iff A\ \text{和}\ B\ \text{都可逆},$$
        ==与 $C$ 完全无关==。这一点在选择题里常被用来设干扰项。

        **别忘了验证的方向**：$M M\inv=E$ 与 $M\inv M=E$ 对方阵而言
        [只需验一个](#/linear-algebra/matrix/operations?at=transpose-inverse)，
        所以上面的推导已经完整。
      `,
    },

    { t: 'example',
      id: 'ex-elementary',
      title: '左行右列：由变换写出矩阵等式',
      source: '标准例题（高频选择题）',
      level: 2,
      problem: String.raw`
        设 $A$ 是 $3$ 阶可逆矩阵，把 $A$ 的第 $2$ 行与第 $3$ 行交换得到 $B$，
        再把 $B$ 的第 $1$ 列的 $-2$ 倍加到第 $3$ 列得到 $C$。
        用 $A$ 表示 $C$，并求 $C\inv$ 与 $A\inv$ 的关系。
      `,
      idea: String.raw`
        **逐步翻译，一步一个矩阵**：

        - "第 $2,3$ ==行==交换" $\Rightarrow$ ==行变换 $\Rightarrow$ 左乘== $P_1=E(2,3)$，得 $B=P_1A$；
        - "第 $1$ ==列==的 $-2$ 倍加到第 $3$ 列" $\Rightarrow$ ==列变换 $\Rightarrow$ 右乘==
          某个初等矩阵 $P_2$，得 $C=BP_2$。

        ==第二步要确定 $P_2$ 具体是什么==。
        列变换"第 $1$ 列的 $-2$ 倍加到第 $3$ 列"，
        对应的初等矩阵是对 $E$ 做同样的列变换所得，
        即 $E$ 的 $(1,3)$ 位置放 $-2$：
        $$P_2=\begin{pmatrix}1&0&-2\\ 0&1&0\\ 0&0&1\end{pmatrix}.$$
        ==记法：列变换的初等矩阵，加数写在"源列，目标列"的位置。==

        **求逆时用[穿脱原则](#/linear-algebra/matrix/operations?at=transpose-inverse)**，
        并注意初等矩阵的逆仍是同类型的。
      `,
      solution: String.raw`
        记
        $$P_1=E(2,3)=\begin{pmatrix}1&0&0\\ 0&0&1\\ 0&1&0\end{pmatrix},\qquad
        P_2=\begin{pmatrix}1&0&-2\\ 0&1&0\\ 0&0&1\end{pmatrix}.$$

        由左行右列，
        $$B=P_1A,\qquad C=BP_2=P_1AP_2.$$

        求逆（穿脱原则）：
        $$C\inv=(P_1AP_2)\inv=P_2\inv A\inv P_1\inv.$$

        又 $P_1\inv=P_1$（交换型的逆是自己），
        $P_2\inv=\begin{pmatrix}1&0&2\\ 0&1&0\\ 0&0&1\end{pmatrix}$（==把 $-2$ 换成 $2$==），故
        $$C\inv=\begin{pmatrix}1&0&2\\ 0&1&0\\ 0&0&1\end{pmatrix}
        A\inv
        \begin{pmatrix}1&0&0\\ 0&0&1\\ 0&1&0\end{pmatrix}.$$

        用变换的语言说：==$C\inv$ 由 $A\inv$ 先交换第 $2,3$ 列、
        再把第 $3$ 行的 $2$ 倍加到第 $1$ 行得到==。
      `,
      comment: String.raw`
        **最后那句"翻译回变换语言"是这类题的常见问法**：
        $C\inv=P_2\inv A\inv P_1$ 中，
        ==$P_1$ 跑到了右边 $\Rightarrow$ 变成列变换==；
        ==$P_2\inv$ 在左边 $\Rightarrow$ 变成行变换==。
        **求逆之后，行变换与列变换会互换角色**——这是本题最值得记的一点。

        **两个高频陷阱**：

        1. ==列变换的初等矩阵别写成转置==。
           "第 $1$ 列的 $k$ 倍加到第 $3$ 列"对应 $E$ 的 $(1,3)$ 位置放 $k$，
           而"第 $1$ ==行==的 $k$ 倍加到第 $3$ 行"对应 $(3,1)$ 位置放 $k$。
           ==拿不准就用 $E$ 亲手做一遍那个变换。==
        2. ==顺序不能颠倒==：$C=P_1AP_2$ 中 $P_1$ 必须在左、$P_2$ 必须在右，
           因为行变换先做、列变换后做——==但左乘右乘的位置由"行/列"决定，
           与先后顺序无关==。

        **验算的小技巧**：取一个具体的 $3$ 阶矩阵（比如
        $\begin{smallmatrix}1&2&3\\4&5&6\\7&8&9\end{smallmatrix}$）
        代进去乘一遍，==三十秒就能确认位置有没有搞反==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **分块乘法接口不对齐**：$A$ 的==列的分法==必须等于 $B$ 的==行的分法==。
      2. **分块转置只转块不转块内**：==两层都要转==，且 $B,C$ 位置互换。
      3. **左行右列记反**：==左乘是行变换，右乘是列变换==。
      4. **列变换的初等矩阵写成转置**：不确定就==亲手对 $E$ 做一遍==。
      5. **倍加型初等矩阵的逆取倒数**：应当==把 $k$ 换成 $-k$==；
         取倒数的是倍乘型。
      6. **求逆时混用行列变换**：$(A\mid E)$ 求逆==只能用行变换==。
      7. **副对角分块求逆忘了换位**：$A$ 在右上，$A\inv$ 在==左下==。
      8. **认为分块矩阵可逆需要 $C$ 也可逆**：
         分块三角阵可逆 $\iff$ ==对角块都可逆==，与角上那块无关。
      9. **忘了分块乘法不交换**：$\begin{pmatrix}A&B\end{pmatrix}\begin{pmatrix}C\\D\end{pmatrix}=AC+BD$，
         顺序固定。
    ` },

  ],
});
