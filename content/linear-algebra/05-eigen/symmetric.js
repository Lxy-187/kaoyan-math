/* ==========================================================================
   线性代数 / 5 特征值与特征向量 / 实对称矩阵与正交相似
   ========================================================================== */

KM.page({
  path: 'linear-algebra/eigen/symmetric',
  title: '实对称矩阵与正交相似',
  subtitle: '多出来的那条「不同特征值的特征向量必正交」，撑起了大半个线代大题',
  tags: ['大题', '计算题', '高频', '必考'],
  updated: '2026-08-10',

  blocks: [

    { t: 'md', c: String.raw`
      实对称矩阵（$A^{\T}=A$ 且元素全为实数）是线代里==性质最好的一类矩阵==。
      好在哪：一般矩阵可能不可对角化、特征向量之间只保证线性无关；
      而实对称矩阵==一定可对角化，而且不同特征值的特征向量自动正交==。

      这一条"自动正交"看起来只是锦上添花，实际上它是
      [反求特征向量](#/linear-algebra/eigen/symmetric?at=orthogonal-trick)
      与[二次型正交化](#/linear-algebra/eigen/symmetric?at=to-quadratic)两类大题的全部支点。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'properties', c: '一、四条特性（全部要背）' },

    { t: 'key', id: 'four-properties', title: '设 $A$ 为 $n$ 阶实对称矩阵', c: String.raw`
      | # | 性质 | 与一般矩阵的差别 |
      |---|---|---|
      | 1 | 特征值==全是实数==，特征向量可取实向量 | 一般实矩阵可能有复特征值 |
      | 2 | ==不同特征值==对应的特征向量==必正交== | 一般矩阵只保证线性无关 |
      | 3 | $k$ 重特征值必有 $k$ 个线性无关的特征向量 | 一般矩阵可能几何重数 $<$ 代数重数 |
      | 4 | ==必存在正交矩阵 $Q$== 使 $Q^{-1}AQ=Q^{\T}AQ=\Lambda$ | 一般矩阵未必可对角化 |

      **第 3 条的等价说法**：对每个特征值恒有 $n-r(\lambda_iE-A)=n_i$，
      ==所以实对称矩阵不需要再去查秩来判断能否对角化==，直接就可以。

      **第 4 条里的 $Q^{-1}=Q^{\T}$ 是全部便利的来源**：
      [反求 $A$](#/linear-algebra/eigen/symmetric?at=ex-recover-A) 时
      $A=Q\Lambda Q^{\T}$，==省掉了求逆矩阵这一整步==。
    ` },

    { t: 'key', id: 'proof-sketch', title: '两个证明（理解即可，偶尔考）', c: String.raw`
      **① 特征值为实数。** 设 $A\boldsymbol x=\lambda\boldsymbol x$，$\boldsymbol x\neq\boldsymbol 0$（暂允许复）。
      取共轭转置得 $\overline{\boldsymbol x}^{\T}A=\overline\lambda\,\overline{\boldsymbol x}^{\T}$
      （用到 $\overline A=A$、$A^{\T}=A$）。于是
      $$\lambda\,\overline{\boldsymbol x}^{\T}\boldsymbol x
      =\overline{\boldsymbol x}^{\T}(A\boldsymbol x)
      =(\overline{\boldsymbol x}^{\T}A)\boldsymbol x
      =\overline\lambda\,\overline{\boldsymbol x}^{\T}\boldsymbol x .$$
      而 $\overline{\boldsymbol x}^{\T}\boldsymbol x=\sum\left|x_i\right|^{2}>0$，故 $\lambda=\overline\lambda$，
      即 ==$\lambda$ 为实数==。

      **② 不同特征值的特征向量正交。** 设
      $A\boldsymbol\xi_1=\lambda_1\boldsymbol\xi_1$，$A\boldsymbol\xi_2=\lambda_2\boldsymbol\xi_2$，$\lambda_1\neq\lambda_2$。
      $$\lambda_1\boldsymbol\xi_1^{\T}\boldsymbol\xi_2
      =(A\boldsymbol\xi_1)^{\T}\boldsymbol\xi_2
      =\boldsymbol\xi_1^{\T}A^{\T}\boldsymbol\xi_2
      \xlongequal{A^{\T}=A}\boldsymbol\xi_1^{\T}A\boldsymbol\xi_2
      =\lambda_2\boldsymbol\xi_1^{\T}\boldsymbol\xi_2 .$$
      故 $(\lambda_1-\lambda_2)\boldsymbol\xi_1^{\T}\boldsymbol\xi_2=0$，
      而 $\lambda_1\neq\lambda_2$，得 ==$\boldsymbol\xi_1^{\T}\boldsymbol\xi_2=0$==。

      ==注意这个证明的关键一步是把 $A$ 从左边"挪"到右边==，用的正是 $A^{\T}=A$。
      对称性在这里被用得干干净净。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'orthogonal-matrix', c: '二、正交矩阵' },

    { t: 'key', id: 'orth-def', title: '定义与三个等价说法', c: String.raw`
      $$Q\ \text{正交}\iff Q^{\T}Q=E\iff Q^{-1}=Q^{\T}
      \iff Q\ \text{的列向量组是一组}\ \textbf{标准正交基}$$

      "标准正交"两个字缺一不可：==两两正交==（内积为零）**且**==每个都是单位向量==。
      只正交不单位化，$Q^{\T}Q$ 是对角阵但不是 $E$。

      **常用性质**：

      - $\left|Q\right|=\pm1$；
      - 正交变换==保内积、保长度、保夹角==（$\left|Q\boldsymbol x\right|=\left|\boldsymbol x\right|$），
        几何上就是旋转或反射；
      - $Q_1,Q_2$ 正交 $\Rightarrow$ $Q_1Q_2$、$Q^{-1}$、$Q^{\T}$ 都正交。

      **雅可比行列式为 $1$** 这条让正交变换在[重积分换元](#/threads/lines/quadratic?at=jacobian-one)里
      特别值钱：换元不付代价。
    ` },

    { t: 'key', id: 'similar-and-congruent', title: '正交变换同时是相似变换和合同变换', c: String.raw`
      这条常被忽略，但它解释了==为什么二次型偏爱正交变换==。

      | 关系 | 定义 | 保住什么 |
      |---|---|---|
      | **相似** | $B=P^{-1}AP$ | 特征值、迹、行列式、秩 |
      | **合同** | $B=C^{\T}AC$（$C$ 可逆） | 正负惯性指数（二次型的等价性） |

      一般来说这是两回事。但当 $Q$ 正交时 $Q^{-1}=Q^{\T}$，于是
      $$Q^{\T}AQ=Q^{-1}AQ$$
      ==同一个式子既是合同又是相似== ——
      所以用正交变换化二次型标准形时，标准形的系数==正好就是特征值==，
      既保住了二次型的等价性，又保住了几何形状。

      而[配方法](#/threads/lines/quadratic?at=core)只是合同变换，
      化出来的系数==不是特征值==，只有正负号个数（惯性指数）可信。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'procedure', c: '三、正交对角化的五步' },

    { t: 'steps', id: 'steps', title: '标准流程', items: [
      { title: '求特征值',
        c: String.raw`解 $\left|\lambda E-A\right|=0$。实对称矩阵的特征值必为实数，
                      算出复数就是算错了 —— ==这是一个很好用的自查==。` },
      { title: '对每个特征值求特征向量',
        c: String.raw`解 $(\lambda_iE-A)\boldsymbol x=\boldsymbol 0$ 的基础解系。
                      $k$ 重特征值一定能解出 $k$ 个线性无关的解，==解不出 $k$ 个就是算错了==。` },
      { title: '同一特征值内部做施密特正交化',
        c: String.raw`==只对重特征值的那一组做==；不同特征值之间[自动正交](#/linear-algebra/eigen/symmetric?at=four-properties)，
                      不需要也不应该混在一起正交化。单根那一列直接跳过这步。` },
      { title: '全部单位化',
        c: String.raw`每个向量除以自己的模长。==这一步最容易漏==，
                      漏了 $Q$ 就不是正交矩阵，$Q^{\T}AQ=\Lambda$ 不成立。` },
      { title: '拼出 $Q$ 与 $\Lambda$',
        c: String.raw`单位正交向量按列拼成 $Q$，对应特征值按==同样顺序==放进 $\Lambda$ 对角线，
                      则 $Q^{\T}AQ=\Lambda$。` },
    ] },

    { t: 'method', id: 'schmidt', title: '施密特正交化公式', c: String.raw`
      对同一特征值下的线性无关组 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$：

      $$\boldsymbol\beta_1=\boldsymbol\alpha_1$$
      $$\boldsymbol\beta_2=\boldsymbol\alpha_2
      -\frac{\left[\boldsymbol\alpha_2,\boldsymbol\beta_1\right]}
      {\left[\boldsymbol\beta_1,\boldsymbol\beta_1\right]}\boldsymbol\beta_1$$
      $$\boldsymbol\beta_3=\boldsymbol\alpha_3
      -\frac{\left[\boldsymbol\alpha_3,\boldsymbol\beta_1\right]}
      {\left[\boldsymbol\beta_1,\boldsymbol\beta_1\right]}\boldsymbol\beta_1
      -\frac{\left[\boldsymbol\alpha_3,\boldsymbol\beta_2\right]}
      {\left[\boldsymbol\beta_2,\boldsymbol\beta_2\right]}\boldsymbol\beta_2$$

      最后单位化 $\boldsymbol\eta_i=\dfrac{\boldsymbol\beta_i}{\left|\boldsymbol\beta_i\right|}$。

      **含义**：每一步都是==减去在前面那些方向上的投影==，把已用过的分量剔干净。

      **两个省力技巧**：

      - 算出 $\boldsymbol\beta_i$ 后可以==先乘一个正数化掉分母==再往下算（方向不变），
        比如 $\left(\tfrac12,\tfrac12,-1\right)^{\T}$ 直接换成 $(1,1,-2)^{\T}$；
      - 二重特征值时，可以先挑一个"好看"的 $\boldsymbol\alpha_1$，
        再直接用==正交条件==凑第二个，往往比套公式快。
    ` },

    { t: 'warn', id: 'schmidt-scope', title: '施密特只在同一个特征值内部做', c: String.raw`
      这是本节最常见的无效劳动：把所有特征向量放在一起做施密特。

      **后果不只是浪费时间，而是会算错**：不同特征值的特征向量做了正交化之后，
      得到的新向量==不再是特征向量==（两个不同特征子空间的向量线性组合，
      一般不属于任何一个特征子空间），$Q^{\T}AQ$ 就不是对角阵了。

      ==正确做法==：

      | 特征值情况 | 要不要施密特 |
      |---|---|
      | 单根 | ==不要==，直接单位化 |
      | $k$ 重根（$k\ge2$） | ==要==，且只对这 $k$ 个做 |
      | 不同特征值之间 | ==绝对不要==，它们本来就正交 |
    ` },

    /* ================================================================== */
    { t: 'h', id: 'signature', c: '四、招牌技巧：用正交性反求特征向量' },

    { t: 'key', id: 'orthogonal-trick', title: '题目给一半，另一半靠正交解出来', c: String.raw`
      **典型情境**：$3$ 阶实对称矩阵，$\lambda_1$ 是单根、$\lambda_2=\lambda_3$ 是二重根，
      题目只给出 $\lambda_1$ 对应的特征向量 $\boldsymbol\xi_1$，要求二重根的特征向量。

      **一般矩阵做不到**（只知道线性无关，信息不够）。
      但实对称矩阵有第 2 条性质：二重根的特征向量必须与 $\boldsymbol\xi_1$ ==正交==，于是

      $$\boxed{\ \boldsymbol\xi_1^{\T}\boldsymbol x=0\ }$$

      这是一个==齐次方程==，解它的基础解系就得到二重根的两个特征向量。
      $3$ 阶时一个方程解出 $3-1=2$ 个自由度，==个数恰好对上==。

      **反过来也成立**：给了二重根的特征向量，单根的特征向量就是
      与它们==都正交==的那个方向（解两个方程组成的方程组）。

      ==看到"实对称 + 只给了部分特征向量"，第一反应就是列正交方程。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '五、例题' },

    { t: 'example',
      id: 'ex-recover-A',
      title: '由特征值与部分特征向量反求 $A$',
      source: '典型大题',
      level: 3,
      problem: String.raw`
        设 $3$ 阶实对称矩阵 $A$ 的特征值为 $\lambda_1=1$，$\lambda_2=\lambda_3=-2$，
        且 $\lambda_1=1$ 对应的特征向量为 $\boldsymbol\xi_1=(1,1,1)^{\T}$。

        **(I)** 求 $\lambda_2=\lambda_3=-2$ 对应的特征向量；
        **(II)** 求矩阵 $A$。
      `,
      idea: String.raw`
        **(I) 这是[招牌技巧](#/linear-algebra/eigen/symmetric?at=orthogonal-trick)的原型。**
        题目只给了单根的特征向量，二重根的怎么办？
        实对称 $\Rightarrow$ 不同特征值的特征向量正交 $\Rightarrow$ 直接列方程
        $\boldsymbol\xi_1^{\T}\boldsymbol x=0$，
        即 $x_1+x_2+x_3=0$，解出的基础解系就是要求的两个向量。
        ==一个方程、三个未知数，正好给出 2 维解空间，和二重根的重数对上。==

        **(II) 用 $A=Q\Lambda Q^{\T}$，而不是 $P\Lambda P^{-1}$。**
        实对称的便利就在这里：只要把特征向量正交化、单位化成 $Q$，
        ==逆矩阵直接写转置，省掉整整一步求逆==。

        更快的路子见点评：注意到 $\lambda=-2$ 占满了 $\boldsymbol\xi_1$ 的正交补（二维），
        可以用谱分解一行写出 $A$。
      `,
      solution: String.raw`
        **(I)** 设 $\lambda=-2$ 对应的特征向量为 $\boldsymbol x=(x_1,x_2,x_3)^{\T}$。
        因 $A$ 实对称，不同特征值的特征向量正交，故 $\boldsymbol\xi_1^{\T}\boldsymbol x=0$，即
        $$x_1+x_2+x_3=0 .$$
        解得基础解系
        $$\boldsymbol\xi_2=\begin{pmatrix}1\\-1\\0\end{pmatrix},\qquad
        \boldsymbol\xi_3=\begin{pmatrix}1\\0\\-1\end{pmatrix},$$
        即 $\lambda_2=\lambda_3=-2$ 对应的全部特征向量为
        $k_2\boldsymbol\xi_2+k_3\boldsymbol\xi_3$（$k_2,k_3$ 不全为零）。

        ---

        **(II) 第一步：把 $\boldsymbol\xi_2,\boldsymbol\xi_3$ 施密特正交化**
        （它们属于==同一个==特征值，需要正交化；与 $\boldsymbol\xi_1$ 之间不必）。

        $$\boldsymbol\beta_2=\boldsymbol\xi_2=(1,-1,0)^{\T},$$
        $$\boldsymbol\beta_3=\boldsymbol\xi_3
        -\frac{\left[\boldsymbol\xi_3,\boldsymbol\beta_2\right]}
        {\left[\boldsymbol\beta_2,\boldsymbol\beta_2\right]}\boldsymbol\beta_2
        =(1,0,-1)^{\T}-\frac{1}{2}(1,-1,0)^{\T}
        =\left(\tfrac12,\tfrac12,-1\right)^{\T}\ \sim\ (1,1,-2)^{\T}.$$

        **第二步：单位化。**
        $$\boldsymbol\eta_1=\frac{1}{\sqrt3}\begin{pmatrix}1\\1\\1\end{pmatrix},\quad
        \boldsymbol\eta_2=\frac{1}{\sqrt2}\begin{pmatrix}1\\-1\\0\end{pmatrix},\quad
        \boldsymbol\eta_3=\frac{1}{\sqrt6}\begin{pmatrix}1\\1\\-2\end{pmatrix}.$$

        **第三步：拼 $Q$ 与 $\Lambda$。**
        $$Q=(\boldsymbol\eta_1,\boldsymbol\eta_2,\boldsymbol\eta_3),\qquad
        \Lambda=\begin{pmatrix}1&&\\&-2&\\&&-2\end{pmatrix},\qquad Q^{\T}AQ=\Lambda .$$

        **第四步：反解 $A=Q\Lambda Q^{\T}$。**
        由谱分解
        $$A=1\cdot\boldsymbol\eta_1\boldsymbol\eta_1^{\T}
        +(-2)\left(\boldsymbol\eta_2\boldsymbol\eta_2^{\T}+\boldsymbol\eta_3\boldsymbol\eta_3^{\T}\right),$$
        而 $\boldsymbol\eta_1\boldsymbol\eta_1^{\T}+\boldsymbol\eta_2\boldsymbol\eta_2^{\T}
        +\boldsymbol\eta_3\boldsymbol\eta_3^{\T}=E$（标准正交基的完备性），故
        $$A=1\cdot\boldsymbol\eta_1\boldsymbol\eta_1^{\T}-2\left(E-\boldsymbol\eta_1\boldsymbol\eta_1^{\T}\right)
        =3\,\boldsymbol\eta_1\boldsymbol\eta_1^{\T}-2E .$$
        代入 $\boldsymbol\eta_1\boldsymbol\eta_1^{\T}=\dfrac13\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix}$：
        $$A=\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix}-2E
        =\boxed{\begin{pmatrix}-1&1&1\\1&-1&1\\1&1&-1\end{pmatrix}}$$
      `,
      comment: String.raw`
        **回代验算（必做）**：
        $$A\boldsymbol\xi_1=(-1+1+1,\ 1-1+1,\ 1+1-1)^{\T}=(1,1,1)^{\T}=1\cdot\boldsymbol\xi_1\ \checkmark$$
        $$A\boldsymbol\xi_2=(-1-1,\ 1+1,\ 1-1)^{\T}=(-2,2,0)^{\T}=-2\,\boldsymbol\xi_2\ \checkmark$$
        再顺手检查 $A^{\T}=A$ ✓ —— ==算出来不对称就一定错了==。

        **本题的最快解法**（考场上可以直接这么写）：
        $\lambda=-2$ 占满了 $\boldsymbol\xi_1$ 的正交补，说明
        $A$ 在 $\boldsymbol\xi_1$ 方向拉伸 $1$ 倍、在与之垂直的整个平面上拉伸 $-2$ 倍，于是
        $$A=-2E+\left(1-(-2)\right)\frac{\boldsymbol\xi_1\boldsymbol\xi_1^{\T}}{\left|\boldsymbol\xi_1\right|^{2}}
        =-2E+\boldsymbol\xi_1\boldsymbol\xi_1^{\T},$$
        ==一行出答案，连施密特都不用做==。
        这个技巧适用于"$n$ 阶实对称、只有两个不同特征值、其中一个是 $n-1$ 重"的所有题。

        **若不是实对称**：只知道 $\boldsymbol\xi_1$ 根本求不出 $A$ ——
        因为二重根的特征向量可以是与 $\boldsymbol\xi_1$ 无关的任意二维子空间。
        =="实对称"这三个字提供的正交信息，正是题目可解的原因。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'link', c: '六、通向二次型' },

    { t: 'key', id: 'to-quadratic', title: '本节是二次型那一章的地基', c: String.raw`
      二次型 $f(\boldsymbol x)=\boldsymbol x^{\T}A\boldsymbol x$ 里的 $A$ ==总是取成实对称矩阵==
      （交叉项系数对半分），所以本节的一切直接搬过去用：

      | 这一节的结论 | 在二次型里变成 |
      |---|---|
      | 必存在正交 $Q$ 使 $Q^{\T}AQ=\Lambda$ | 必可用正交变换 $\boldsymbol x=Q\boldsymbol y$ 化为标准形 |
      | $\Lambda$ 的对角元是特征值 | 标准形系数==就是特征值== |
      | 正交变换既相似又合同 | 标准形同时保住==几何形状==与==惯性指数== |
      | 特征值全为实数 | 惯性指数有意义（正负个数） |

      于是：==正定 $\iff$ 特征值全正==，
      而[Hessian 判别法](#/calculus/multi-derivative/extremum?at=hessian)
      正是这条在多元极值里的化身。
      整条线索见 [二次型与正交变换主线](#/threads/lines/quadratic?at=core)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '七、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **忘记单位化**：只正交不单位化，$Q$ 不是正交矩阵，$Q^{\T}AQ=\Lambda$ 不成立。
         ==写完 $Q$ 抽一列量一下模长是不是 $1$==。
      2. **把所有特征向量一起施密特**：只能[在同一特征值内部做](#/linear-algebra/eigen/symmetric?at=schmidt-scope)，
         跨特征值做会把特征向量做没。
      3. **$Q$ 的列与 $\Lambda$ 的对角元顺序错位**：第 $j$ 列必须配第 $j$ 个特征值。
      4. **反求 $A$ 时去求逆**：实对称用 ==$A=Q\Lambda Q^{\T}$==，转置即可。
         （若用的是没单位化的 $P$，那就只能老老实实 $A=P\Lambda P^{-1}$。）
      5. **算出复特征值或非对称的 $A$**：这两个都是==算错了的确凿信号==，回头查。
      6. **重根时解出的无关向量个数不够**：实对称的 $k$ 重根一定有 $k$ 个，
         少了说明方程组解错。
      7. **把"正交"和"线性无关"混为一谈**：正交必线性无关，反之不然。
      8. **一般矩阵套用正交性**：==只有实对称矩阵==才有"不同特征值特征向量正交"。
    ` },

  ],
});
