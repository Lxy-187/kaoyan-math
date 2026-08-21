/* ==========================================================================
   线性代数 / 1 行列式 / 特殊行列式与递推
   —— 有名字的那几个形状：范德蒙德、分块、三对角。
      通用技巧见 determinant/computation。
   ========================================================================== */

KM.page({
  path: 'linear-algebra/determinant/special',
  title: '特殊行列式与递推',
  subtitle: '这一页全是**认形状**：认出来就有公式或递推式，认不出来就得硬算 $n$ 阶',
  tags: ['小题', '计算题'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'vandermonde', title: '范德蒙德行列式', c: String.raw`
      $$V_n=\begin{vmatrix}
      1&1&\cdots&1\\
      x_1&x_2&\cdots&x_n\\
      x_1^{2}&x_2^{2}&\cdots&x_n^{2}\\
      \vdots&&&\vdots\\
      x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
      \end{vmatrix}
      =\prod_{1\le i<j\le n}\bigl(x_j-x_i\bigr)$$

      **识别信号**：==每一列（或每一行）是同一个数的 $0,1,2,\dots,n-1$ 次幂==，
      而且次数从 $0$ 开始、逐行递增。

      **记忆法**：结果是==所有"右边的减左边的"之积==，
      共 $\binom n2=\frac{n(n-1)}{2}$ 个因子。
      $n=3$ 时就是 $(x_2-x_1)(x_3-x_1)(x_3-x_2)$。

      **最重要的推论**（用得比公式本身还多）：
      $$\boxed{\ V_n\ne0\iff x_1,x_2,\dots,x_n\ \text{两两不同}\ }$$
      ==这条是"$n$ 个互异特征值对应的特征向量线性无关"、
      "多项式插值唯一"这类结论的证明工具==。

      **考试中的两个变形**：

      - **转置**：行列排布反过来，值不变（[性质 1](#/linear-algebra/determinant/computation?at=properties)）；
      - **次数不从 $0$ 开始**：比如每列是 $x_i,x_i^{2},\dots,x_i^{n}$，
        ==先从每列提出一个 $x_i$==，剩下的才是范德蒙德。
      - **缺一行 / 多一行**：不是范德蒙德，==别硬套==，
        通常要用[加边法](#/linear-algebra/determinant/special?at=bordering)补成标准形。
    ` },

    { t: 'key', id: 'block-det', title: '分块行列式：有大片零块就分块', c: String.raw`
      设 $A$ 是 $m$ 阶方阵、$B$ 是 $n$ 阶方阵，则

      $$\begin{vmatrix}A&O\\ C&B\end{vmatrix}
      =\begin{vmatrix}A&D\\ O&B\end{vmatrix}=\abs A\cdot\abs B$$

      ==只要有一个"零块"在角上，就能拆成两个小行列式相乘==，
      而且==另一个角上的块 $C$ 或 $D$ 完全不影响结果==。

      **副对角线的情形要带符号**：
      $$\begin{vmatrix}O&A\\ B&O\end{vmatrix}=(-1)^{mn}\abs A\cdot\abs B$$
      ==这个 $(-1)^{mn}$ 来自把 $A$ 的 $m$ 列整体搬过 $B$ 的 $n$ 列==，
      一共换了 $mn$ 次列。

      **特例（最常考）**：整个行列式沿副对角线排列时
      $$\begin{vmatrix}&&a_1\\&{\cdot^{\cdot^{\cdot}}}&\\ a_n&&\end{vmatrix}
      =(-1)^{\frac{n(n-1)}{2}}a_1a_2\cdots a_n.$$
      ==指数 $\frac{n(n-1)}{2}$ 就是把主对角线翻成副对角线所需的换列次数==。

      $n=3$ 时验一下：
      $$\begin{vmatrix}0&0&a_1\\ 0&a_2&0\\ a_3&0&0\end{vmatrix}
      =(-1)^{3}a_1a_2a_3=-a_1a_2a_3,$$
      ==只需交换第 $1,3$ 列一次==，故符号为 $-1$，与公式一致。

      **实战提示**：$A,B$ ==必须是方阵==（可以不同阶），
      否则整个式子无意义。==拿到分块题先数一数每块是不是方的。==
    ` },

    { t: 'key', id: 'bordering', title: '加边法：把不规则的补成规则的', c: String.raw`
      在原行列式外面==加一行一列==，使新行列式的值与原来相等，同时形状变好看。

      **标准的加法**（新加的第一行第一列）：
      $$D_n=\begin{vmatrix}1&*&*&\cdots&*\\ 0&&&&\\ 0&&D_n&&\\ \vdots\\ 0\end{vmatrix}$$
      ==左上角取 $1$、第一列其余全取 $0$==，按第一列展开就回到 $D_n$，所以值不变；
      而第一行的 $*$ ==可以任意选==，正好用来把原行列式凑成好算的形状（通常是[爪型](#/linear-algebra/determinant/computation?at=ex-claw)）。

      **典型用途**：计算
      $$\begin{vmatrix}
      a_1+b&a_2&\cdots&a_n\\
      a_1&a_2+b&\cdots&a_n\\
      \vdots&&\ddots&\vdots\\
      a_1&a_2&\cdots&a_n+b
      \end{vmatrix}$$
      这种"==秩 $1$ 矩阵加上 $bE$=="的形状。
      加一行一列变成爪型后一步化三角，结果是
      $$b^{n-1}\left(b+\sum_{i=1}^{n}a_i\right).$$

      ==这个结论本身也值得记==：它就是 $\abs{bE+\alpha\beta\T}$，
      而 $\alpha\beta\T$ 是[秩 $1$ 矩阵](#/linear-algebra/matrix/operations?at=powers)，
      特征值为 $\beta\T\alpha=\sum a_i$ 与 $n-1$ 个 $0$。
      ==第 5 章可以一行秒杀，这里先记结论。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'recursion-sec', c: '一、递推法' },

    { t: 'method', id: 'recursion', title: '递推三步', c: String.raw`
      **适用信号**：行列式是 $n$ 阶的（==带字母 $n$，不是具体数字==），
      而且==按某行展开之后会出现同样形状的低阶行列式==。

      1. **按第一行（或第一列）展开**，得到关于 $D_n,D_{n-1},D_{n-2}$ 的关系式；
      2. **解这个[差分方程](#/calculus/ode/solution-structure?at=affine-rule)**；
      3. **用 $D_1,D_2$ 定出常数**。

      ==第 1 步展开时通常要展开两次==：
      第一次展开得到一个 $D_{n-1}$ 和一个"缺角"的行列式，
      对后者再展开一次才会出现 $D_{n-2}$。

      **第 2 步的两种常见形态**：

      | 递推式 | 解法 |
      |---|---|
      | $D_n=aD_{n-1}+b$ | 找[不动点](#/probability/events/conditional?at=ex-recursive)后平移 |
      | $D_n=aD_{n-1}+bD_{n-2}$ | 特征方程 $\lambda^{2}=a\lambda+b$ |

      ==第二行和[常系数线性微分方程](#/calculus/ode/linear-const?at=char-roots)的解法完全同构==：
      特征根不同时通解是 $c_1\lambda_1^{n}+c_2\lambda_2^{n}$，
      重根时是 $(c_1+c_2n)\lambda^{n}$。

      **另一条常用路子（不解方程）**：若递推式能写成
      $$D_n-\alpha D_{n-1}=\beta\bigl(D_{n-1}-\alpha D_{n-2}\bigr),$$
      则 $\set{D_n-\alpha D_{n-1}}$ 是等比数列，==直接迭代到底==，
      往往比套通解公式快。
    ` },

    { t: 'key', id: 'three-diagonal', title: '三对角行列式', c: String.raw`
      $$D_n=\begin{vmatrix}
      a&b&&&\\ c&a&b&&\\ &c&a&\ddots&\\ &&\ddots&\ddots&b\\ &&&c&a
      \end{vmatrix}$$

      按第一行展开两次得
      $$\boxed{\ D_n=a\,D_{n-1}-bc\,D_{n-2}\ }$$

      **这条递推式的由来值得看清**：
      按第一行展开，$a$ 那一项直接给 $aD_{n-1}$；
      $b$ 那一项的余子式==第一列只有一个 $c$==，
      再展开一次就得到 $cD_{n-2}$，
      连同两个符号 $(-1)^{1+2}$ 与 $(-1)^{1+1}$，==净得 $-bcD_{n-2}$==。

      **特征方程** $\lambda^{2}-a\lambda+bc=0$，设根为 $\lambda_1,\lambda_2$，则
      $$D_n=\begin{cases}
      \dfrac{\lambda_1^{n+1}-\lambda_2^{n+1}}{\lambda_1-\lambda_2},&\lambda_1\ne\lambda_2\\[8pt]
      (n+1)\lambda^{n},&\lambda_1=\lambda_2=\lambda
      \end{cases}$$

      ==注意结果只依赖 $bc$ 的乘积，与 $b,c$ 各自是多少无关==——
      这一点从递推式一眼可见，可以用来快速排除选项。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-recursion',
      title: '三对角：从递推式到通项',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $n$ 阶行列式
        $$D_n=\begin{vmatrix}
        2&1&&&\\ 1&2&1&&\\ &1&2&\ddots&\\ &&\ddots&\ddots&1\\ &&&1&2
        \end{vmatrix}.$$
      `,
      idea: String.raw`
        **认形状**：三对角，$a=2$，$b=c=1$，
        直接套[递推式](#/linear-algebra/determinant/special?at=three-diagonal)
        $D_n=2D_{n-1}-D_{n-2}$。

        **看特征方程**：$\lambda^{2}-2\lambda+1=0$ 有==重根 $\lambda=1$==，
        所以通解形如 $D_n=(c_1+c_2n)\cdot1^{n}=c_1+c_2n$，
        ==是个等差数列==。这个预判很有用：算出来若不是线性的就错了。

        **更快的一条路**：把递推式写成
        $$D_n-D_{n-1}=D_{n-1}-D_{n-2},$$
        ==左右两边是同一个"相邻差"==，说明差值恒定，直接就是等差数列。
        算出 $D_1=2$、$D_2=3$，公差是 $1$，答案立刻是 $n+1$。

        ==这条路完全不用解特征方程==，是重根情形的通用捷径。
      `,
      solution: String.raw`
        **第一步（建立递推）**：按第一行展开，
        $$D_n=2D_{n-1}-1\cdot\begin{vmatrix}
        1&1&&\\ 0&2&1&\\ &1&2&\ddots\\ &&\ddots&\ddots
        \end{vmatrix}
        =2D_{n-1}-1\cdot1\cdot D_{n-2},$$
        即
        $$D_n=2D_{n-1}-D_{n-2}\qquad(n\ge3).$$

        **第二步（初值）**：
        $$D_1=\abs{2}=2,\qquad D_2=\begin{vmatrix}2&1\\1&2\end{vmatrix}=3.$$

        **第三步（解递推）**：把递推式改写为
        $$D_n-D_{n-1}=D_{n-1}-D_{n-2}.$$
        故 $\set{D_n-D_{n-1}}$ 是常数列，其值为 $D_2-D_1=1$。于是
        $$D_n=D_1+(n-1)\times1=2+n-1=\boxed{n+1}.$$

        （验证：$D_3=2\times3-2=4=3+1\ \checkmark$）
      `,
      comment: String.raw`
        **结果 $D_n=n+1$ 有一个漂亮的解读**：
        这个矩阵是 $A=2E-N$ 型（$N$ 为相邻位置的 $1$），
        它的特征值是 $2-2\cos\frac{k\pi}{n+1}$（$k=1,\dots,n$），
        全部为正——==所以它是正定矩阵==，
        这在[二次型](#/threads/lines/quadratic?at=core)那条主线里会再出现。

        **递推题的两个固定得分点**：

        1. ==展开两次==才能得到 $D_{n-2}$，只展开一次是最常见的错误；
        2. ==初值要算到 $D_1,D_2$ 两个==，二阶递推需要两个初值。

        **换个数字就要换方法**：若把 $2$ 改成 $3$、$1$ 改成 $1$，
        则 $\lambda^{2}-3\lambda+1=0$ 是==不同的两个根==，
        通解变成 $c_1\lambda_1^{n}+c_2\lambda_2^{n}$，
        ==这时就得老老实实解特征方程==，捷径用不上。
        ==判据是判别式 $a^{2}-4bc$ 是否为零。==
      `,
    },

    { t: 'example',
      id: 'ex-vandermonde',
      title: '范德蒙德：先提公因子再套公式',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算
        $$D=\begin{vmatrix}
        x_1&x_1^{2}&x_1^{3}\\
        x_2&x_2^{2}&x_2^{3}\\
        x_3&x_3^{2}&x_3^{3}
        \end{vmatrix}.$$
      `,
      idea: String.raw`
        **先别急着套公式**：标准范德蒙德的第一列（或第一行）是==全 $1$==，
        也就是从 $0$ 次幂开始。这里是从==$1$ 次幂==开始的，
        ==所以它不是标准形，直接套会错==。

        **修法**：每一行都能提出一个公因子——
        第 $i$ 行是 $x_i,x_i^{2},x_i^{3}$，==提出 $x_i$ 后变成 $1,x_i,x_i^{2}$==，
        正好是标准范德蒙德的一行。

        ==注意这里提的是"行"的公因子==（每行提一个），
        [性质 3](#/linear-algebra/determinant/computation?at=properties) 说每提一行就往外乘一个因子，
        三行就是 $x_1x_2x_3$。

        **提完之后是按行排的范德蒙德**，
        与[标准形](#/linear-algebra/determinant/special?at=vandermonde)差一个转置，
        ==而转置不改变值==，所以公式照用。
      `,
      solution: String.raw`
        每行提出公因子：
        $$D=x_1x_2x_3\begin{vmatrix}
        1&x_1&x_1^{2}\\
        1&x_2&x_2^{2}\\
        1&x_3&x_3^{2}
        \end{vmatrix}.$$

        右边的行列式是（转置形式的）$3$ 阶范德蒙德，故
        $$\begin{vmatrix}
        1&x_1&x_1^{2}\\ 1&x_2&x_2^{2}\\ 1&x_3&x_3^{2}
        \end{vmatrix}
        =(x_2-x_1)(x_3-x_1)(x_3-x_2).$$

        于是
        $$D=\boxed{x_1x_2x_3\,(x_2-x_1)(x_3-x_1)(x_3-x_2)}.$$
      `,
      comment: String.raw`
        **"先提公因子"是范德蒙德题的标配第一步**。
        常见的三种伪装：

        | 看到的形状 | 处理 |
        |---|---|
        | 每行从 $x_i$ 开始（本题） | 每行提 $x_i$ |
        | 每行从 $x_i^{2}$ 开始 | 每行提 $x_i^{2}$ |
        | 每行是 $1,x_i,x_i^{2},x_i^{4}$（==跳了 $3$ 次幂==） | ==不是范德蒙德==，另想办法 |

        ==第三行要特别小心==：范德蒙德要求次数是==连续的== $0,1,\dots,n-1$，
        跳了一档就不能套公式，
        通常要用[加边法](#/linear-algebra/determinant/special?at=bordering)补齐再处理。

        **公式的方向别记反**：$\prod_{i<j}(x_j-x_i)$ 是==下标大的减下标小的==。
        写反了整体会差一个 $(-1)^{\binom n2}$。
        ==验算办法：取 $n=2$，$\begin{vmatrix}1&1\\x_1&x_2\end{vmatrix}=x_2-x_1$，
        对上号就不会错。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **次数不从 $0$ 开始就套范德蒙德**：==先每行（列）提公因子==。
      2. **范德蒙德的方向记反**：是 $\prod_{i<j}(x_j-x_i)$，
         ==大下标减小下标==，用 $n=2$ 验一下。
      3. **分块时块不是方阵**：$\abs{A}\abs{B}$ 要求 $A,B$ ==都是方阵==。
      4. **副对角线分块忘了 $(-1)^{mn}$**：主对角线的分块才没有符号。
      5. **递推只展开一次**：三对角要==展开两次==才出现 $D_{n-2}$。
      6. **二阶递推只给一个初值**：==必须算出 $D_1$ 和 $D_2$==。
      7. **特征根是重根却套两根公式**：判别式为零时通解是 $(c_1+c_2n)\lambda^{n}$。
      8. **加边时第一列没取成 $(1,0,\dots,0)\T$**：
         ==只有这样加边才不改变值==。
    ` },

  ],
});
