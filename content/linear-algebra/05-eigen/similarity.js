/* ==========================================================================
   线性代数 / 5 特征值与特征向量 / 相似对角化
   ========================================================================== */

KM.page({
  path: 'linear-algebra/eigen/similarity',
  title: '相似对角化',
  subtitle: '相似 = 换一组基看同一个变换；$P$ 的每一列由 $AP=PB$ 的对应列决定',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-10',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'def', c: '一、相似的定义与不变量' },

    { t: 'key', id: 'similar-def', title: '定义', c: String.raw`
      若存在==可逆==矩阵 $P$，使
      $$P^{-1}AP=B\qquad\Longleftrightarrow\qquad AP=PB,$$
      则称 $A$ 与 $B$ **相似**，记 $A\sim B$。

      ==两种写法要都会用==：$P^{-1}AP=B$ 便于叙述，
      而 ==$AP=PB$ 才是实际求 $P$ 时用的形式==（不含逆矩阵，可以逐列比较）。

      相似是等价关系：自反、对称（$P\to P^{-1}$）、传递。
    ` },

    { t: 'key', id: 'invariants', title: '相似不变量：判断与求参数的全部依据', c: String.raw`
      $A\sim B$ 时，下列量==全部相同==：

      | 不变量 | 说明 |
      |---|---|
      | **特征多项式** $\left|\lambda E-A\right|$ | 最强的一条，下面几条都是它的推论 |
      | **特征值**（含重数） | 由特征多项式相同得到 |
      | **迹** $\operatorname{tr}$ | $=$ 特征值之和 |
      | **行列式** $\left|A\right|$ | $=$ 特征值之积 |
      | **秩** $r(A)$ | $r(B)=r(P^{-1}AP)=r(A)$ |
      | $A^{k}\sim B^{k}$、$A^{-1}\sim B^{-1}$、$f(A)\sim f(B)$ | $P$ 是同一个 |

      ==求参数题就是靠这张表==：题目给两个含参矩阵说它们相似，
      通常用 ==迹相等 + 行列式相等== 列两个方程，正好解出两个参数。

      **不相同的东西**：==特征向量一般不同==（$A\boldsymbol\xi=\lambda\boldsymbol\xi$
      对应 $B(P^{-1}\boldsymbol\xi)=\lambda(P^{-1}\boldsymbol\xi)$，差一个 $P^{-1}$）。
    ` },

    { t: 'warn', id: 'necessary-only', title: '这些都是必要条件，不是充分条件', c: String.raw`
      ==特征值全部相同，两个矩阵也未必相似。==

      **反例**：
      $$A=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad B=\begin{pmatrix}1&0\\0&1\end{pmatrix}=E .$$
      两者特征值都是 $1,1$，迹、行列式、秩全都相同，但==不相似== ——
      因为 $E$ 与任何矩阵相似都只能得到 $E$ 本身（$P^{-1}EP=E$），而 $A\neq E$。

      **所以**：用不变量只能==否定==相似（有一个不等就一定不相似），
      不能直接==肯定==相似。
      要肯定，得真的造出 $P$，或者证明两者相似于同一个对角阵。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'meaning', c: '二、几何意义：换一组基看同一个变换' },

    { t: 'key', id: 'same-transform', title: '$P$ 就是过渡矩阵', c: String.raw`
      设线性变换 $T$ 在旧基下的矩阵是 $A$、在新基下的矩阵是 $B$，
      两组基之间的过渡矩阵为 $P$，则
      $$B=P^{-1}AP .$$

      **推导是把坐标变换用了两遍**：
      $$Y\ \xrightarrow{\ X=PY\ }\ X\ \xrightarrow{\ A\ }\ AX\ \xrightarrow{\ P^{-1}\ }\ P^{-1}AX=P^{-1}APY .$$

      所以 ==相似矩阵里的 $P$ 和[基变换里的过渡矩阵](#/linear-algebra/vectors/space?at=transition-def)
      是同一个东西==，不是碰巧同名。

      **这条视角能解释很多"为什么"**：

      - 为什么相似不变量是那几个？==因为它们是变换本身的性质，与选哪组基无关==；
      - 对角化在干什么？==在问"能不能换一组基，让这个变换的矩阵变成对角阵"==
        —— 而对角阵意味着变换在每个基方向上只是"拉伸"，这正是特征向量的定义；
      - 为什么 $P$ 的列是特征向量？==因为新基就取成了特征向量组==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'diagonalize', c: '三、相似对角化' },

    { t: 'key', id: 'condition', title: '可对角化的充要条件', c: String.raw`
      $$A\ \text{可对角化}\iff A\ \text{有}\ n\ \text{个线性无关的特征向量}$$
      $$\iff \text{每个特征值的}\ \underbrace{\text{几何重数}}_{n-r(\lambda_iE-A)}
      =\underbrace{\text{代数重数}}_{\text{特征多项式中的重数}}$$

      **实用判据**（考场按这个走）：

      | 情形 | 结论 |
      |---|---|
      | $n$ 个特征值==互不相同== | 一定可对角化（充分不必要） |
      | 有 $n_i$ 重特征值 $\lambda_i$ | 查 $n-r(\lambda_iE-A)=n_i$ 是否成立 |
      | $A$ 为==实对称矩阵== | 一定可对角化，且可[用正交矩阵对角化](#/linear-algebra/eigen/symmetric?at=four-properties) |

      ==重根才需要动手查秩==，单根自动满足。
    ` },

    { t: 'steps', id: 'diag-steps', title: '对角化的标准四步', items: [
      { title: '求特征值',
        c: String.raw`解 $\left|\lambda E-A\right|=0$。
                      ==上三角 / 下三角 / 分块三角矩阵的特征值直接读对角线==，不必展开。` },
      { title: '对每个 $\lambda_i$ 求特征向量',
        c: String.raw`解齐次方程组 $(\lambda_iE-A)\boldsymbol x=\boldsymbol 0$，取基础解系。` },
      { title: '判断能否对角化',
        c: String.raw`数一下线性无关特征向量的总数是否够 $n$ 个。不够就==不可对角化==，题目到此为止。` },
      { title: '拼出 $P$ 与 $\Lambda$',
        c: String.raw`把特征向量按列拼成 $P$，对应特征值按==同样顺序==放到 $\Lambda$ 的对角线上，
                      则 $P^{-1}AP=\Lambda$。
                      ==顺序必须一一对应==：第 $j$ 列是 $\lambda_j$ 的特征向量。` },
    ] },

    /* ================================================================== */
    { t: 'h', id: 'general', c: '四、已知 $A\\sim B$ 求 $P$（$B$ 不一定是对角阵）' },

    { t: 'insight', id: 'my-mistake', title: '我的错误：直接去求 $A$ 对角化的那个 $P$', c: String.raw`
      > ==这里我们不能直接去求 $A$ 相似对角化的那个 $P$ 矩阵对吧？我这里犯了这样的错误。==

      **这个反思是对的。** 原因很直接：

      按常规流程求出 $A$ 的三个纯特征向量拼成 $P_{\text{diag}}$，
      你得到的等式必然是
      $$P_{\text{diag}}^{-1}AP_{\text{diag}}=\Lambda=\operatorname{diag}(2,-1,-2),$$
      而题目要的 $B$ 在第 1 行第 2 列有一个 ==$1$==，$\Lambda\neq B$，
      所以 $P_{\text{diag}}$ 一定不是答案。

      **$B$ 里那个非对角元素 $1$ 是一条硬约束**：它强制 $P$ 的第二列满足
      $$A\boldsymbol p_2=\boldsymbol p_1-\boldsymbol p_2$$
      （一个==非齐次==方程组），而不是特征向量方程 $A\boldsymbol p_2=-\boldsymbol p_2$。

      ==记住这句话就不会再犯：$B$ 长什么样，$P$ 的列就得满足什么关系。==
      对角化只是 $B$ 恰好是对角阵时的特例。
    ` },

    { t: 'method', id: 'column-method', title: '通法：把 $AP=PB$ 逐列展开', c: String.raw`
      **不要用 $P^{-1}AP=B$（带逆矩阵没法算），改写成 $AP=PB$ 再按列比较。**

      设 $P=(\boldsymbol p_1,\dots,\boldsymbol p_n)$，则
      $$AP=(A\boldsymbol p_1,\ A\boldsymbol p_2,\ \dots,\ A\boldsymbol p_n),$$
      而 $PB$ 的第 $j$ 列 $=$ 用 ==$B$ 的第 $j$ 列元素作系数==，对 $P$ 的各列做线性组合：
      $$(PB)_{\cdot j}=b_{1j}\boldsymbol p_1+b_{2j}\boldsymbol p_2+\cdots+b_{nj}\boldsymbol p_n .$$

      逐列相等，就得到 $n$ 个向量方程：

      $$\boxed{\ A\boldsymbol p_j=b_{1j}\boldsymbol p_1+b_{2j}\boldsymbol p_2+\cdots+b_{nj}\boldsymbol p_n\ }$$

      **怎么用**：

      | $B$ 的第 $j$ 列长什么样 | 得到的方程 | 怎么解 |
      |---|---|---|
      | 只有对角元 $\lambda_j$ | $A\boldsymbol p_j=\lambda_j\boldsymbol p_j$ | ==齐次==：$(\lambda_jE-A)\boldsymbol x=\boldsymbol0$ 求基础解系 |
      | 还有其他非零元 | 如 $A\boldsymbol p_2=\boldsymbol p_1-\boldsymbol p_2$ | ==非齐次==：$(A+E)\boldsymbol p_2=\boldsymbol p_1$，先解出 $\boldsymbol p_1$ 再当常数项 |

      ==求解顺序由 $B$ 决定==：先解那些只含自己的列（齐次），
      再拿结果去解耦合的列（非齐次）。

      **注意求的始终是 $A$ 的向量。** $B$ 不提供任何向量，
      它只充当"说明书"，规定 $A\boldsymbol p_j$ 应该等于哪些 $\boldsymbol p$ 的什么组合。
      所有方程的系数矩阵都是 ==$A$ 减去某个数乘单位阵==。
    ` },

    { t: 'key', id: 'not-unique', title: '$P$ 不唯一（这是常问的一点）', c: String.raw`
      ==满足条件的 $P$ 有无穷多个。== 自由度来自每一列的解本身：

      - **齐次列**：基础解系的任意==非零倍数==都合法，
        $\boldsymbol p_1\to k_1\boldsymbol p_1$（$k_1\neq0$）；
      - **非齐次列**：通解 $=$ 特解 $+$ 对应齐次方程的通解，
        $\boldsymbol p_2\to\boldsymbol p_2^{*}+k\,\boldsymbol\eta$（$\boldsymbol\eta$ 是相应的特征向量）；
      - **重特征值**：基础解系本身就可以任意换一组基。

      唯一的硬约束是 ==$P$ 必须可逆==（各列线性无关）。
      标准答案通常取最简整数解，==但那不是唯一解，写别的只要验算通过同样得分==。

      对比：若 $A$ 有 $n$ 个互异特征值且 $B=\Lambda$，
      $P$ 的列还可以==整列换序==（$\Lambda$ 的对角元跟着换），也是不唯一的来源之一。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '五、例题' },

    { t: 'example',
      id: 'ex-similar-P',
      title: '$B$ 非对角：先定参数，再逐列解出 $P$',
      source: '典型大题',
      level: 4,
      problem: String.raw`
        设
        $$A=\begin{pmatrix}-2&-2&1\\2&x&-2\\0&0&-2\end{pmatrix}
        \quad\text{与}\quad
        B=\begin{pmatrix}2&1&0\\0&-1&0\\0&0&y\end{pmatrix}$$
        相似。

        **(I)** 求 $x,y$ 的值；
        **(II)** 求可逆矩阵 $P$，使得 $P^{-1}AP=B$。
      `,
      idea: String.raw`
        **(I) 用相似不变量列方程。** 两个未知数，正好用
        ==迹相等 + 行列式相等== 两条。
        $A$ 的第三行是 $(0,0,-2)$，按第三行展开算行列式最省力；
        $B$ 是上三角，行列式直接乘对角线。

        **(II) 这一问的关键是别去对角化。**
        $B$ 不是对角阵（第 1 行第 2 列有个 $1$），
        所以[不能用 $A$ 的三个纯特征向量拼 $P$](#/linear-algebra/eigen/similarity?at=my-mistake)。

        通法是把 $P^{-1}AP=B$ 改写成 ==$AP=PB$ 再逐列比较==。
        $B$ 的三列分别是 $(2,0,0)^{\T}$、$(1,-1,0)^{\T}$、$(0,0,-2)^{\T}$，于是
        $$A\boldsymbol p_1=2\boldsymbol p_1,\qquad
        A\boldsymbol p_2=\boldsymbol p_1-\boldsymbol p_2,\qquad
        A\boldsymbol p_3=-2\boldsymbol p_3 .$$
        ==第一、三列是齐次的，先解；第二列要用到 $\boldsymbol p_1$，后解==。
        求解顺序被 $B$ 的形状定死了。
      `,
      solution: String.raw`
        **(I) 求 $x,y$。**

        *迹相等*：$\operatorname{tr}(A)=-2+x-2=x-4$，$\operatorname{tr}(B)=2-1+y=y+1$，故
        $$x-y=5 .$$

        *行列式相等*：$A$ 按第三行展开
        $$\left|A\right|=(-2)\begin{vmatrix}-2&-2\\2&x\end{vmatrix}=(-2)(-2x+4)=4x-8,$$
        $B$ 为上三角，$\left|B\right|=2\cdot(-1)\cdot y=-2y$，故
        $$4x-8=-2y\ \Longrightarrow\ 2x+y=4 .$$

        联立解得
        $$\boxed{\,x=3,\qquad y=-2\,}$$

        此时
        $$A=\begin{pmatrix}-2&-2&1\\2&3&-2\\0&0&-2\end{pmatrix},\qquad
        B=\begin{pmatrix}2&1&0\\0&-1&0\\0&0&-2\end{pmatrix},$$
        $B$ 为上三角，特征值可直接读出：$\lambda=2,\,-1,\,-2$。

        ---

        **(II) 求 $P$。** 记 $P=(\boldsymbol p_1,\boldsymbol p_2,\boldsymbol p_3)$，由 $AP=PB$ 逐列比较：
        $$A\boldsymbol p_1=2\boldsymbol p_1,\qquad
        A\boldsymbol p_2=\boldsymbol p_1-\boldsymbol p_2,\qquad
        A\boldsymbol p_3=-2\boldsymbol p_3 .$$

        **第一列**（齐次）：$(A-2E)\boldsymbol p_1=\boldsymbol 0$，
        $$A-2E=\begin{pmatrix}-4&-2&1\\2&1&-2\\0&0&-4\end{pmatrix}
        \longrightarrow\begin{cases}x_3=0\\ 2x_1+x_2=0\end{cases}
        \ \Longrightarrow\ \boldsymbol p_1=\begin{pmatrix}1\\-2\\0\end{pmatrix}.$$

        **第三列**（齐次）：$(A+2E)\boldsymbol p_3=\boldsymbol 0$，
        $$A+2E=\begin{pmatrix}0&-2&1\\2&5&-2\\0&0&0\end{pmatrix}
        \longrightarrow\begin{cases}x_3=2x_2\\ 2x_1+x_2=0\end{cases}
        \ \Longrightarrow\ \boldsymbol p_3=\begin{pmatrix}1\\-2\\-4\end{pmatrix}.$$

        **第二列**（非齐次）：$A\boldsymbol p_2=\boldsymbol p_1-\boldsymbol p_2$ 即
        $(A+E)\boldsymbol p_2=\boldsymbol p_1$，
        $$\begin{pmatrix}-1&-2&1\\2&4&-2\\0&0&-1\end{pmatrix}\boldsymbol p_2
        =\begin{pmatrix}1\\-2\\0\end{pmatrix}
        \longrightarrow\begin{cases}x_3=0\\ x_1+2x_2=-1\end{cases}$$
        取 $x_2=0$ 得特解
        $$\boldsymbol p_2=\begin{pmatrix}-1\\0\\0\end{pmatrix}.$$

        **拼出 $P$ 并验证可逆**：
        $$P=\begin{pmatrix}1&-1&1\\-2&0&-2\\0&0&-4\end{pmatrix},\qquad
        \left|P\right|=(-4)\begin{vmatrix}1&-1\\-2&0\end{vmatrix}=(-4)(0-2)=8\neq0 .$$

        故所求
        $$\boxed{\ P=\begin{pmatrix}1&-1&1\\-2&0&-2\\0&0&-4\end{pmatrix}\ }$$
        使 $P^{-1}AP=B$。
      `,
      comment: String.raw`
        **必须回代验算三列**（非齐次那一列尤其容易错）：

        - $A\boldsymbol p_1=(2,-4,0)^{\T}=2\boldsymbol p_1$ ✓
        - $A\boldsymbol p_2=(2,-2,0)^{\T}$，而
          $\boldsymbol p_1-\boldsymbol p_2=(1,-2,0)^{\T}-(-1,0,0)^{\T}=(2,-2,0)^{\T}$ ✓
        - $A\boldsymbol p_3=(-2,4,8)^{\T}=-2\boldsymbol p_3$ ✓

        **答案不唯一**：$\boldsymbol p_3$ 取 $(-1,2,4)^{\T}$（差一个 $-1$ 倍）同样正确；
        $\boldsymbol p_2$ 可以取 $(-1,0,0)^{\T}+k(-2,1,0)^{\T}$ 中的任意一个
        （$(-2,1,0)^{\T}$ 是 $\lambda=-1$ 的特征向量）。
        只要==验算通过且 $P$ 可逆==就得分，详见[$P$ 的不唯一性](#/linear-algebra/eigen/similarity?at=not-unique)。

        **本题为什么 $A$ 其实是可对角化的、却不能用对角化的 $P$**：
        $A$ 有三个互异特征值 $2,-1,-2$，确实可对角化，
        但对角化给出的是 $P_{\text{diag}}^{-1}AP_{\text{diag}}=\operatorname{diag}(2,-1,-2)$，
        ==而题目指定的 $B$ 不是这个矩阵==。
        「$A$ 可对角化」与「$A$ 相似于题目给的 $B$」是两个不同的问题。

        **变式**：若把 $B$ 的那个 $1$ 去掉，本题就退化成标准对角化，
        第二列改解齐次方程 $(A+E)\boldsymbol p_2=\boldsymbol0$，得 $\boldsymbol p_2=(-2,1,0)^{\T}$。
        ==对照这两种解法，就能看清"$B$ 决定方程形态"这句话的分量。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '六、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **用 $P^{-1}AP=B$ 硬算**：一定先改写成 ==$AP=PB$==，再逐列比较。
      2. **看到"相似"就去对角化**：只有 $B$ 是对角阵时 $P$ 的列才全是特征向量。
         ==$B$ 长什么样，$P$ 的列就得满足什么方程。==
      3. **$PB$ 的列算错**：$PB$ 第 $j$ 列是用 ==$B$ 的第 $j$ 列==作系数组合 $P$ 的各列，
         别错拿成 $B$ 的第 $j$ 行。
      4. **特征向量与对角元顺序不对应**：$P$ 的第 $j$ 列必须配 $\Lambda$ 的第 $j$ 个对角元。
      5. **由不变量相同直接断定相似**：那是[必要不充分](#/linear-algebra/eigen/similarity?at=necessary-only)。
      6. **忘记验证 $P$ 可逆**：解出三列后要算一次 $\left|P\right|\neq0$。
      7. **纠结答案和标准答案不一样**：$P$ 本来就[不唯一](#/linear-algebra/eigen/similarity?at=not-unique)，
         ==回代验算通过即可==。
      8. **重根不查秩就说可对角化**：$n_i$ 重特征值必须验证 $n-r(\lambda_iE-A)=n_i$。
    ` },

  ],
});
