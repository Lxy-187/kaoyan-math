/* ==========================================================================
   线性代数 / 3 向量组 / 向量空间、基与坐标变换
   ========================================================================== */

KM.page({
  path: 'linear-algebra/vectors/space',
  title: '向量空间、基与坐标变换',
  subtitle: '一条式子统摄全章：**基矩阵 × 坐标 = 向量本身**',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-10',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'space', c: '一、向量空间与维数' },

    { t: 'key', id: 'space-def', title: '定义与维数', c: String.raw`
      **向量空间**：对==加法和数乘封闭==的非空向量集合。
      （判定一个集合是不是子空间，就查这两条封闭性，外加"含零向量"。）

      **维数**：空间中==最大线性无关组所含向量的个数==，记作 $\dim V$。
      $\mathbb R^{n}$ 的维数是 $n$。

      **基**：$V$ 中一组向量 $\boldsymbol\varepsilon_1,\dots,\boldsymbol\varepsilon_n$ 满足

      1. ==线性无关==；
      2. $V$ 中任意向量都能由它们==线性表出==。

      基不唯一，但==同一个空间的所有基含有相同个数的向量==，这个数就是维数。
    ` },

    { t: 'key', id: 'basis-test', title: '$\\mathbb R^{n}$ 里判定基的唯一动作', c: String.raw`
      在 $\mathbb R^{n}$ 中，$n$ 个向量构成基
      $$\iff\ \text{它们线性无关}\ \iff\ \text{按列排成的方阵行列式}\neq0 .$$

      ==个数对了就只剩"线性无关"一条要查==，而查线性无关在方阵情形下就是算一个行列式。
      不必再去验证"能表出任意向量" —— $n$ 个无关向量在 $n$ 维空间里自动张满。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'coord', c: '二、坐标：这一章所有公式的源头' },

    { t: 'key', id: 'coord-def', title: '坐标的定义与唯一性', c: String.raw`
      取定基 $\boldsymbol\varepsilon_1,\dots,\boldsymbol\varepsilon_n$ 后，任意 $\boldsymbol x\in V$ 可以
      ==唯一==地写成
      $$\boldsymbol x=x_1\boldsymbol\varepsilon_1+x_2\boldsymbol\varepsilon_2+\cdots+x_n\boldsymbol\varepsilon_n,$$
      有序数组 $X=(x_1,\dots,x_n)^{\T}$ 就是 $\boldsymbol x$ 在该基下的**坐标**。

      **唯一性从哪来**：若有两组表示，相减得到基向量的一个线性组合为零，
      由线性无关推出系数全为零。==唯一性是后面所有"比较系数"步骤的依据==。

      两个边界：

      - ==坐标依赖于基==，脱离基谈坐标没有意义；
      - ==基向量的顺序也是基的一部分==，换序坐标就跟着换。
    ` },

    { t: 'insight', id: 'my-question-standard-basis', title: '我的疑问：默认的基是单位矩阵吗？', c: String.raw`
      > ==空间中任意向量默认的基是单位矩阵吗？==

      **严格说不是** —— 基是一组==向量==，不是矩阵。
      但把 $\mathbb R^{n}$ 的标准基
      $\boldsymbol e_1=(1,0,\dots,0)^{\T},\ \dots,\ \boldsymbol e_n=(0,\dots,0,1)^{\T}$
      ==按列排成矩阵，得到的正好是单位矩阵 $E$==。

      所以平时写 $\boldsymbol v=(2,3,4)^{\T}$ 时，这串数字==本身就是坐标==，
      只是省略了"在标准基下"这句话：
      $$\boldsymbol v=2\boldsymbol e_1+3\boldsymbol e_2+4\boldsymbol e_3
      =E\begin{pmatrix}2\\3\\4\end{pmatrix}.$$

      ==「向量」和「它的坐标」平时被混为一谈，就是因为标准基下两者数值相同。==
      一旦换了基，这两个概念必须分开。
    ` },

    { t: 'insight', id: 'my-master-formula', title: '我的总结：基矩阵 × 坐标 = 原始基下的坐标', c: String.raw`
      > ==基向量按列排成的矩阵，乘以该基下的坐标，等于它在原始基下的坐标。==

      **这个总结是对的，而且它是整章的主干。** 因为矩阵乘列向量本质就是==对列做线性组合==：

      $$\left(\boldsymbol p_1,\boldsymbol p_2,\dots,\boldsymbol p_n\right)
      \begin{pmatrix}y_1\\y_2\\\vdots\\y_n\end{pmatrix}
      =y_1\boldsymbol p_1+y_2\boldsymbol p_2+\cdots+y_n\boldsymbol p_n$$

      而"坐标"的定义恰恰就是这个线性组合的系数。所以

      $$\boxed{\ \underbrace{A}_{\text{基按列排}}\cdot\underbrace{X}_{\text{该基下的坐标}}
      =\underbrace{\boldsymbol x}_{\text{向量本身}}\ }$$

      **唯一要补的限定**：矩阵 $A$ 的每一列，必须是==新基向量在"原始基"下的坐标==。
      满足这一条时，两种场景自动统一：

      | 原始基是 | $A$ 是什么 | $A\cdot Y$ 得到 |
      |---|---|---|
      | 标准基 $E$ | 新基向量本身排成的矩阵 | 在标准基下的坐标（平时说的"绝对坐标"） |
      | 任意旧基 | ==过渡矩阵 $P$== | 在旧基下的坐标 |

      ==下面所有公式都是这一条的推论==，不需要另外记。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'transition', c: '三、过渡矩阵与坐标变换' },

    { t: 'key', id: 'transition-def', title: '过渡矩阵的定义', c: String.raw`
      设旧基 $A=(\boldsymbol\alpha_1,\dots,\boldsymbol\alpha_n)$、新基 $B=(\boldsymbol\beta_1,\dots,\boldsymbol\beta_n)$，
      若
      $$\boxed{\ B=A\,P\ }\qquad\text{即}\quad(\text{新基})=(\text{旧基})\,P$$
      则称 $P$ 为==从旧基 $A$ 到新基 $B$ 的过渡矩阵==。

      **$P$ 的结构（比公式更该记的）**：
      ==$P$ 的第 $j$ 列，就是新基第 $j$ 个向量 $\boldsymbol\beta_j$ 在旧基 $A$ 下的坐标。==

      **$P$ 必可逆**：两组基都线性无关，故 $A,B$ 都是可逆方阵，$P=A^{-1}B$ 可逆。
      反向的过渡矩阵就是 $P^{-1}$。

      （国内教材统一用 $B=AP$。少数外文文献反过来定义，两者互为逆矩阵 ——
      ==答题时按你教材那一套，全程别混==。）
    ` },

    { t: 'key', id: 'coord-change', title: '坐标变换公式（两行推完，不用背）', c: String.raw`
      同一个向量 $\boldsymbol x$，在旧基下坐标 $X$、在新基下坐标 $Y$。
      用[上面那条主干式](#/linear-algebra/vectors/space?at=my-master-formula)写两遍：

      $$\boldsymbol x=A\,X,\qquad \boldsymbol x=B\,Y=(AP)Y=A(PY).$$

      由坐标的唯一性（$A$ 可逆，可直接左乘 $A^{-1}$）：

      $$\boxed{\ X=P\,Y\qquad\Longleftrightarrow\qquad Y=P^{-1}X\ }$$

      口语版：==旧坐标 = 过渡矩阵 × 新坐标==；反过来求新坐标就左乘 $P^{-1}$。
    ` },

    { t: 'warn', id: 'direction-trap', title: '两个公式的方向是反的 —— 这里最容易记混', c: String.raw`
      $$\underbrace{B=A\,P}_{\text{基：新 = 旧}\times P}
      \qquad\text{而}\qquad
      \underbrace{X=P\,Y}_{\text{坐标：旧 = }P\times\text{新}}$$

      ==$P$ 把"新基"送回"旧基"那一侧，同时把"新坐标"送回"旧坐标"。==

      **不用死记的办法**：忘了就现推 —— 写 $\boldsymbol x=AX=BY$，
      再把 $B=AP$ 代进去，两行就出来了。
      ==记推导路径比记公式方向可靠得多。==

      **一个反直觉但正确的现象**：基"变新"用 $P$，坐标却"变旧"用 $P$ ——
      因为基向量变大时，同一个向量所需的系数就变小，两者天然相反。
    ` },

    { t: 'method', id: 'compute-P', title: '实际怎么算 $P$：两条路', c: String.raw`
      **通法（推荐）**：由 $B=AP$ 得 $P=A^{-1}B$，用==初等行变换==一次做完：
      $$\left(\,A\ \middle|\ B\,\right)\ \xrightarrow{\ \text{初等行变换}\ }\ \left(\,E\ \middle|\ P\,\right)$$
      即：==旧基放左边、新基放右边==，把左边化成单位阵，右边自动变成 $P$。
      ==千万别真去求 $A^{-1}$ 再做乘法==，那是白算一遍。

      **捷径**：若题目已经给出某个向量用旧基表示的关系式，
      直接移项解出各个新基向量即可，比走矩阵快得多。
      [下面的例题](#/linear-algebra/vectors/space?at=ex-basis-transition)用的就是捷径。

      **写 $P$ 时的口诀**：==把每个新基向量用旧基表示，系数**竖着**放进 $P$ 的对应列。==
      横放竖放搞反是本节第一失分点。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-basis-transition',
      title: '由坐标反求参数，再求过渡矩阵',
      source: '典型大题',
      level: 3,
      problem: String.raw`
        设向量组
        $$\boldsymbol\alpha_1=(1,2,1)^{\T},\qquad
        \boldsymbol\alpha_2=(1,3,2)^{\T},\qquad
        \boldsymbol\alpha_3=(1,a,3)^{\T}$$
        为 $\mathbb R^{3}$ 的一个基，$\boldsymbol\beta=(1,1,1)^{\T}$ 在这个基下的坐标为 $(b,c,1)^{\T}$。

        **(I)** 求 $a,b,c$ 的值；
        **(II)** 证明 $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$ 为 $\mathbb R^{3}$ 的一个基，
        并求 $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$ 到
        $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 的过渡矩阵。
      `,
      idea: String.raw`
        **(I) "坐标"两个字就是方程。** 已知坐标是 $(b,c,1)^{\T}$，
        直接按定义写出线性组合
        $$\boldsymbol\beta=b\boldsymbol\alpha_1+c\boldsymbol\alpha_2+1\cdot\boldsymbol\alpha_3,$$
        按分量拆成三个方程，三个未知数 $a,b,c$ 正好够解。
        ==看到"在某基下的坐标为⋯⋯"，第一动作永远是把它翻译成这条线性组合式。==

        **(II) 关键是别去硬解方程组。** 要求的过渡矩阵满足
        $(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)
        =(\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta)P$，
        也就是要把 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$
        分别用 $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$ 表示。

        其中 $\boldsymbol\alpha_2,\boldsymbol\alpha_3$ ==本来就在新的基里==，系数一眼可得；
        只剩 $\boldsymbol\alpha_1$ 要处理，而第 (I) 问已经白送了一条关系式
        $\boldsymbol\beta=2\boldsymbol\alpha_1-2\boldsymbol\alpha_2+\boldsymbol\alpha_3$ ——
        ==直接移项解出 $\boldsymbol\alpha_1$ 即可，不必再动一次初等变换==。
      `,
      solution: String.raw`
        **(I)** 由坐标的定义
        $$\begin{pmatrix}1\\1\\1\end{pmatrix}
        =b\begin{pmatrix}1\\2\\1\end{pmatrix}
        +c\begin{pmatrix}1\\3\\2\end{pmatrix}
        +\begin{pmatrix}1\\a\\3\end{pmatrix},$$
        按分量得
        $$\begin{cases}
        b+c+1=1\\
        2b+3c+a=1\\
        b+2c+3=1
        \end{cases}
        \Longrightarrow
        \begin{cases}
        b+c=0\\
        2b+3c+a=1\\
        b+2c=-2
        \end{cases}$$

        由第一式 $c=-b$，代入第三式：$b-2b=-2\Rightarrow b=2$，故 $c=-2$。
        代入第二式：$4-6+a=1\Rightarrow a=3$。

        $$\boxed{\,a=3,\quad b=2,\quad c=-2\,}$$

        **验证**（题目说它们是基，应当成立）：$a=3$ 时
        $$\begin{vmatrix}1&1&1\\2&3&3\\1&2&3\end{vmatrix}
        =1(9-6)-1(6-3)+1(4-3)=1\neq0 .\ \checkmark$$

        ---

        **(II) 第一步：证明是基。** 由 (I) 知 $\boldsymbol\alpha_3=(1,3,3)^{\T}$，
        把 $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$ 按列排成矩阵：
        $$\begin{vmatrix}1&1&1\\3&3&1\\2&3&1\end{vmatrix}
        =1(3-3)-1(3-2)+1(9-6)=0-1+3=2\neq0 .$$
        故三个向量线性无关；$\mathbb R^{3}$ 中 $3$ 个线性无关的向量构成一个基。

        **第二步：把新基各向量用旧基表示。**
        （这里"旧基"是 $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$，
        "新基"是 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$。）

        由 (I) 有 $\boldsymbol\beta=2\boldsymbol\alpha_1-2\boldsymbol\alpha_2+\boldsymbol\alpha_3$，移项：
        $$2\boldsymbol\alpha_1=2\boldsymbol\alpha_2-\boldsymbol\alpha_3+\boldsymbol\beta
        \ \Longrightarrow\
        \boldsymbol\alpha_1=\boldsymbol\alpha_2-\tfrac12\boldsymbol\alpha_3+\tfrac12\boldsymbol\beta .$$
        另外两个直接读出：
        $$\boldsymbol\alpha_2=1\cdot\boldsymbol\alpha_2+0\cdot\boldsymbol\alpha_3+0\cdot\boldsymbol\beta,\qquad
        \boldsymbol\alpha_3=0\cdot\boldsymbol\alpha_2+1\cdot\boldsymbol\alpha_3+0\cdot\boldsymbol\beta .$$

        **第三步：系数竖着排成列。**
        $$\boxed{\ P=\begin{pmatrix}
        1 & 1 & 0\\[2pt]
        -\tfrac12 & 0 & 1\\[2pt]
        \tfrac12 & 0 & 0
        \end{pmatrix}\ }$$
        即满足 $(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)
        =(\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta)P$。
      `,
      comment: String.raw`
        **一定要回代验算第一列**（这是最容易写反的地方）：
        $$1\cdot\boldsymbol\alpha_2-\tfrac12\boldsymbol\alpha_3+\tfrac12\boldsymbol\beta
        =(1,3,2)-\tfrac12(1,3,3)+\tfrac12(1,1,1)=(1,2,1)=\boldsymbol\alpha_1 .\ \checkmark$$

        **若不用捷径**，通法是初等行变换
        $$\left(\ \boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta
        \ \middle|\ \boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3\ \right)
        \ \longrightarrow\ \left(\,E\mid P\,\right),$$
        结果相同但要多算一次消元。==凡是题目已经给出线性表示关系的，先看能不能移项==。

        **变式提醒**：题目若改问"$\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 到
        $\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\beta$ 的过渡矩阵"，
        答案是本题的 ==$P^{-1}$==，不是把 $P$ 转置。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'bridge', c: '五、这个 $P$ 和相似矩阵里的 $P$ 是同一个' },

    { t: 'key', id: 'same-P', title: '相似 = 同一个线性变换，换了一组基', c: String.raw`
      这一节值得单独拎出来，因为==两处的 $P$ 用同一个字母不是巧合==。

      设线性变换 $T$ 在旧基下的矩阵是 $A$（意思是：坐标 $X$ 被送到坐标 $AX$），
      在新基下的矩阵是 $B$，而两组基之间的过渡矩阵是 $P$。则

      $$\boxed{\ B=P^{-1}AP\ }$$

      **推导就是把坐标变换用两遍**：新坐标 $Y\ \xrightarrow{\ X=PY\ }$ 旧坐标
      $\ \xrightarrow{\ A\ }$ 变换后的旧坐标 $\ \xrightarrow{\ P^{-1}\ }$ 变换后的新坐标，
      三步合起来就是 $P^{-1}AP$。

      所以：

      | 说法 | 同一件事的另一种表述 |
      |---|---|
      | $A$ 与 $B$ 相似 | 它们是==同一个线性变换==在两组基下的矩阵 |
      | 相似变换矩阵 $P$ | 就是两组基之间的==过渡矩阵== |
      | 相似不变量（迹、行列式、特征值） | 变换本身的性质，==与选哪组基无关== |

      ==「换基」是这两章共同的主线==：
      对角化不过是在问"能不能换一组基，让这个变换的矩阵变成对角阵"。
      具体做法见 [相似对角化](#/linear-algebra/eigen/similarity?at=same-transform)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '六、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **系数横着放进 $P$**：必须==竖着放成列==。写完抽一列回代验算最保险。
      2. **搞反"谁是旧基"**：$B=AP$ 里 ==$A$ 是旧基、$B$ 是新基==。
         题目说"从 $\mathrm{I}$ 到 $\mathrm{II}$ 的过渡矩阵"，$\mathrm{I}$ 就是旧基。
      3. **把两个公式方向记混**：基是 $B=AP$，坐标是 $X=PY$，
         [方向相反](#/linear-algebra/vectors/space?at=direction-trap)，忘了就现推。
      4. **求反了写转置**：反向过渡矩阵是 ==$P^{-1}$==，不是 $P^{\T}$。
         （只有正交矩阵才有 $P^{-1}=P^{\T}$。）
      5. **忘记验证是基**：题目让"证明⋯⋯为一个基"时，
         必须算行列式或秩，不能因为"看着无关"就跳过。
      6. **真的去求 $A^{-1}$**：用 $\left(A\mid B\right)\to\left(E\mid P\right)$ 一步到位。
      7. **忽略基的顺序**：$(\boldsymbol\alpha_1,\boldsymbol\alpha_2)$ 与
         $(\boldsymbol\alpha_2,\boldsymbol\alpha_1)$ 是==不同的基==，过渡矩阵也不同。
    ` },

  ],
});
