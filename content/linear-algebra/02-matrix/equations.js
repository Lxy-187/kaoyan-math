/* ==========================================================================
   线性代数 / 2 矩阵 / 矩阵方程与抽象矩阵
   —— 本章的综合题型：给一串矩阵等式，求某个矩阵或证某件事。
      运算律见 matrix/operations；初等变换见 matrix/block。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/matrix/equations',
  title: '矩阵方程与抽象矩阵',
  subtitle: '抽象矩阵题只有一个动作：**把等式整理成 $(\\ \\cdot\\ )X=(\\ \\cdot\\ )$**，然后判断左边那块可不可逆',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'method', id: 'solve-matrix-eq', title: '三种标准型与解法', c: String.raw`
      | 方程 | 解 | 具体矩阵时的算法 |
      |---|---|---|
      | $AX=B$ | $X=A\inv B$ | ==$(A\mid B)\xrightarrow{\text{行变换}}(E\mid X)$== |
      | $XA=B$ | $X=BA\inv$ | 转置成 $A\T X\T=B\T$ 再用行变换 |
      | $AXB=C$ | $X=A\inv CB\inv$ | 先解 $AY=C$ 得 $Y$，再解 $XB=Y$ |

      ==注意左乘右乘不能互换==：$AX=B$ 只能==两边左乘== $A\inv$，
      写成 $X=BA\inv$ 是错的。
      **判断方法：$A$ 原来在 $X$ 的哪一侧，$A\inv$ 就乘在哪一侧。**

      **具体矩阵优先用初等变换**，
      比"先求 $A\inv$ 再做乘法"==快一倍且不易错==，
      见[初等变换求逆](#/linear-algebra/matrix/block?at=elementary-as-inverse)。

      **$A$ 不可逆时**：$AX=B$ ==未必有解，也未必唯一==。
      此时要把 $X$ 按列拆开，
      转化成若干个[线性方程组](#/linear-algebra/linear-systems/solvability?at=three-cases)
      $Ax_i=b_i$ 分别讨论。
      ==有解的充要条件是 $\rank(A)=\rank(A\mid B)$。==
    ` },

    { t: 'method', id: 'arrange', title: '★ 整理等式：把 $X$ 提出来', c: String.raw`
      抽象题给的往往不是标准型，而是一堆混在一起的式子，比如
      $$AX+B=X+C,\qquad AXA=2E+X,\qquad A^{*}X=A\inv+2X.$$

      **整理的三步永远一样**：

      1. **把含 $X$ 的项全挪到左边，不含的挪到右边**；
      2. **左边提出公因子 $X$**——
         ==注意 $X$ 在左还是在右，决定了公因子从哪边提==；
      3. **判断那个公因子矩阵可不可逆**，可逆就左（右）乘它的逆。

      **第 2 步是唯一的技术点**。
      $AX-X$ 要提成 ==$(A-E)X$==，
      ==不能写成 $(A-1)X$==——矩阵减不了数，必须补上 $E$。
      **"减数字要补 $E$"是这一节最高频的低级错误。**

      **例**：$AX+B=X+C$
      $$\Rightarrow AX-X=C-B\Rightarrow (A-E)X=C-B\Rightarrow X=(A-E)\inv(C-B).$$

      **$X$ 在两边都出现且位置不同时**（如 $AXB=X+C$），
      ==不能直接提==，通常题目会给额外条件让你先化简，
      或者需要用[分块 / 换元](#/linear-algebra/matrix/equations?at=abstract-tricks)。

      **别忘了最后一步**：==写出 $X$ 之前必须说明那个因子可逆==，
      否则不能求逆。可逆性的证明见下一块。
    ` },

    { t: 'key', id: 'abstract-tricks', title: '抽象矩阵的常用变形', c: String.raw`
      **① 由 $f(A)=O$ 证可逆**：把常数项挪到右边、提公因子，凑成
      $$(\cdots)(\cdots)=cE,\qquad c\ne0,$$
      详见[求逆的三条路](#/linear-algebra/matrix/operations?at=find-inverse)。

      **② 伴随矩阵出现时，先用 $AA^{*}=\abs A E$ 换掉它**。
      看到 $A^{*}$ 就想办法两边乘一个 $A$：
      $$A^{*}X=B\ \xrightarrow{\ \text{左乘}\ A\ }\ \abs A\,X=AB
      \ \Longrightarrow\ X=\frac{1}{\abs A}AB\quad(\abs A\ne0).$$
      ==这一招把伴随矩阵彻底消掉，比直接求 $A^{*}$ 的逆快得多。==
      注意要先由题目条件把 $\abs A$ 算出来（常用 $\abs{A^{*}}=\abs A^{n-1}$）。

      **③ 遇到 $A\inv$ 就两边乘 $A$**，把逆消成 $E$。

      **④ 配方 / 因式分解**：
      $$A^{2}-B^{2}=(A+B)(A-B)\quad\text{==仅当 $AB=BA$ 时成立==}$$
      ==这条一定要先确认可交换==，否则展开会多出 $AB-BA$。
      而 $A$ 与 $E$、$A$ 与 $A\inv$、$A$ 与 $A^{k}$ ==总是可交换的==，
      所以只含 $A$ 一个字母的多项式可以放心因式分解。

      **⑤ 两边取行列式**：等式两边同时取 $\abs\cdot$，
      ==把矩阵方程降成数的方程==，常用来求 $\abs A$ 或判断可逆性。
      配套公式：$\abs{AB}=\abs A\abs B$、$\abs{kA}=k^{n}\abs A$、$\abs{A\inv}=\abs A\inv$。

      **⑥ 两边取秩**：用来证"某某不可逆"或求秩，
      配套的是[秩的不等式群](#/linear-algebra/matrix/rank?at=rank-inequalities)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-matrix-eq',
      title: '具体矩阵方程：用初等变换一步到位',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设
        $$A=\begin{pmatrix}1&2&3\\ 0&1&2\\ 0&0&1\end{pmatrix},\qquad
        B=\begin{pmatrix}1&0\\ 0&1\\ 1&1\end{pmatrix},$$
        解矩阵方程 $AX=B$。
      `,
      idea: String.raw`
        $A$ 是上三角且对角线全为 $1$，==$\abs A=1\ne0$，可逆==，
        所以 $X=A\inv B$ 存在且唯一。

        **两条路的对比**：

        - 先求 $A\inv$（$3\times3$），再算 $A\inv B$（$3\times3$ 乘 $3\times2$）——==两步计算==；
        - 直接对 $(A\mid B)$ 做行变换化到 $(E\mid X)$——==一步==。

        ==后者永远更快==，而且中途不需要写出 $A\inv$，少一次出错机会。

        **化简的顺序**：$A$ 已经是上三角，==从最后一行往上回代最省事==
        （即先用第 $3$ 行消掉第 $1,2$ 行的第 $3$ 列，再用第 $2$ 行消第 $1$ 行）。
        这就是"回代"的矩阵版本。
      `,
      solution: String.raw`
        对增广矩阵作初等行变换：
        $$(A\mid B)=\left(\begin{array}{ccc|cc}
        1&2&3&1&0\\ 0&1&2&0&1\\ 0&0&1&1&1
        \end{array}\right)$$

        $r_1-3r_3,\ r_2-2r_3$：
        $$\longrightarrow\left(\begin{array}{ccc|cc}
        1&2&0&-2&-3\\ 0&1&0&-2&-1\\ 0&0&1&1&1
        \end{array}\right)$$

        $r_1-2r_2$：
        $$\longrightarrow\left(\begin{array}{ccc|cc}
        1&0&0&2&-1\\ 0&1&0&-2&-1\\ 0&0&1&1&1
        \end{array}\right)$$

        故
        $$X=\begin{pmatrix}2&-1\\ -2&-1\\ 1&1\end{pmatrix}.$$

        **验算**（务必做，成本很低）：
        $$AX=\begin{pmatrix}1&2&3\\ 0&1&2\\ 0&0&1\end{pmatrix}
        \begin{pmatrix}2&-1\\ -2&-1\\ 1&1\end{pmatrix}
        =\begin{pmatrix}2-4+3&-1-2+3\\ -2+2&-1+2\\ 1&1\end{pmatrix}
        =\begin{pmatrix}1&0\\ 0&1\\ 1&1\end{pmatrix}=B.\ \checkmark$$
      `,
      comment: String.raw`
        **注意 $X$ 的形状**：$A$ 是 $3\times3$、$B$ 是 $3\times2$，
        所以 ==$X$ 必须是 $3\times2$==。
        动手前先把形状定下来，==能挡掉一大类低级错误==。

        **若换成 $XA=B$ 怎么办**：此时 $X$ 应是 $2\times3$。
        ==不能用 $(A\mid B)$ 这个排法==，
        推荐转置：由 $XA=B$ 得 $A\T X\T=B\T$，
        对 $(A\T\mid B\T)$ 做行变换求出 $X\T$，==最后再转置回来==。
        （直接对 $\binom{A}{B}$ 做列变换也行，但列变换更容易手滑。）

        **$A$ 不可逆时这道题就变味了**：
        $(A\mid B)$ 化成阶梯形后若出现"左边零行、右边非零"的行，==说明无解==；
        若左边零行对应右边也是零，==则有无穷多解==，
        要按[非齐次方程组的解结构](#/linear-algebra/linear-systems/solvability?at=nonhomogeneous)
        逐列写出通解。
        ==所以第一步"判断 $A$ 是否可逆"不是走过场。==
      `,
    },

    { t: 'example',
      id: 'ex-abstract',
      title: '★ 抽象矩阵：伴随矩阵混在方程里',
      source: '经典题型（高频大题）',
      level: 4,
      problem: String.raw`
        设 $A$ 为 $3$ 阶矩阵，$\abs A=2$，$A^{*}$ 为 $A$ 的伴随矩阵。
        若矩阵 $X$ 满足
        $$A^{*}X=A\inv+2X,$$
        求 $X$。（用 $A$ 表示）
      `,
      idea: String.raw`
        **看到 $A^{*}$ 的第一反应：用 $AA^{*}=\abs A E$ 把它换掉。**
        这里 $\abs A=2$，故
        $$A^{*}=\abs A\,A\inv=2A\inv.$$
        ==一步就把伴随矩阵变成了 $A\inv$==，方程里只剩一个字母。

        代入后方程变成
        $$2A\inv X=A\inv+2X.$$

        **接下来按[整理三步](#/linear-algebra/matrix/equations?at=arrange)走**：
        含 $X$ 的项挪到一边、提公因子。
        但直接提会得到 $(2A\inv-2E)X=A\inv$，
        ==左边那个 $2A\inv-2E$ 是否可逆不好判断==。

        **更干净的做法是先两边左乘 $A$**，把逆全消掉：
        $$2X=E+2AX\ \Longrightarrow\ 2X-2AX=E\ \Longrightarrow\ (2E-2A)X=E.$$
        ==现在左边只含 $A$ 的多项式，形式最简==，
        而且可逆性可以直接讨论。

        ==这个"先乘 $A$ 消掉所有的逆，再整理"的顺序，比先整理再消逆稳得多。==
      `,
      solution: String.raw`
        **第一步：消去 $A^{*}$。** 由 $AA^{*}=\abs A E$ 与 $\abs A=2\ne0$ 知 $A$ 可逆，且
        $$A^{*}=\abs A\,A\inv=2A\inv.$$
        代入原方程：
        $$2A\inv X=A\inv+2X.$$

        **第二步：两边左乘 $A$，消去 $A\inv$。**
        $$2X=E+2AX.$$

        **第三步：整理并提公因子。**
        $$2X-2AX=E\ \Longrightarrow\ 2(E-A)X=E\ \Longrightarrow\ (E-A)X=\frac12E.$$

        **第四步：说明 $E-A$ 可逆。** 若 $E-A$ 不可逆，则存在非零向量 $\xi$ 使
        $(E-A)\xi=0$，于是由上式 $0=\frac12\xi\ne0$，矛盾。
        故 $E-A$ 可逆。

        **结论**：
        $$X=\frac12(E-A)\inv.$$
      `,
      comment: String.raw`
        **第四步是这道题真正的得分点**，也是最多人漏掉的一步。
        ==凡是要写 $(\cdot)\inv$，都必须先证那个矩阵可逆==。

        本题的证法很典型：**从等式本身反推**——
        既然 $(E-A)X=\frac12E$，两边取行列式得
        $$\abs{E-A}\cdot\abs X=\left(\tfrac12\right)^{3}=\tfrac18\ne0,$$
        ==所以 $\abs{E-A}\ne0$==。
        这个"取行列式"的写法比上面的反证更短，
        是[抽象变形第 ⑤ 条](#/linear-algebra/matrix/equations?at=abstract-tricks)的标准用法。

        **消去伴随矩阵的三种情形**：

        | 已知 | 换法 |
        |---|---|
        | $\abs A$ 已知且非零 | ==$A^{*}=\abs A\,A\inv$==（本题） |
        | 只知道 $A^{*}$ 满足某等式 | 两边左乘或右乘 $A$，用 $AA^{*}=\abs AE$ |
        | 要求 $\abs A$ | 用 ==$\abs{A^{*}}=\abs A^{n-1}$== 反解 |

        ==第三行常作为第一小问==："已知 $\abs{A^{*}}=4$，$A$ 为 $3$ 阶，求 $\abs A$"，
        答案是 $\abs A^{2}=4$，$\abs A=\pm2$——==注意可能有两个值==。

        **顺序的教训**：如果第二步不先乘 $A$，
        而是直接从 $2A\inv X=A\inv+2X$ 提公因子，
        会得到 $(2A\inv-2E)X=A\inv$，
        ==要证 $2A\inv-2E$ 可逆比证 $E-A$ 可逆麻烦得多==。
        **抽象题里"先把逆和伴随全消干净"几乎总是对的。**
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **左乘右乘搞混**：$AX=B\Rightarrow X=A\inv B$，
         ==$A\inv$ 乘在 $A$ 原来所在的那一侧==。
      2. **$AX-X$ 提成 $(A-1)X$**：==必须补 $E$==，写成 $(A-E)X$。
      3. **不证可逆就写逆**：==写 $(\cdot)\inv$ 之前必须说明可逆==，
         最快的办法是两边取行列式。
      4. **$A^{2}-B^{2}=(A+B)(A-B)$ 无条件使用**：==需要 $AB=BA$==。
      5. **伴随矩阵不化简**：看到 $A^{*}$ 先用 $AA^{*}=\abs AE$ 换掉。
      6. **由 $\abs{A^{*}}$ 反解 $\abs A$ 时漏根**：
         $\abs A^{n-1}=c$ 在 $n-1$ 为偶数时==有两个解==。
      7. **$X$ 的形状写错**：$AX=B$ 中 $X$ 的行数 $=A$ 的列数、列数 $=B$ 的列数。
      8. **$A$ 不可逆时仍套 $X=A\inv B$**：==此时要按方程组逐列讨论==。
      9. **解具体方程时先求 $A\inv$**：==直接对 $(A\mid B)$ 做行变换更快==。
    ` },

  ],
});
