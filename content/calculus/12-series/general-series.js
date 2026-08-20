/* ==========================================================================
   高等数学 / 12 无穷级数 / 交错级数与任意项级数
   —— 第四节（正部负部）是理解「条件收敛」的钥匙，也是抽象级数题的底层依据；
      第五节的阿贝尔 / 狄利克雷判别法超纲。
   ========================================================================== */

KM.page({
  path: 'calculus/series/general-series',
  title: '交错级数与任意项级数',
  subtitle: '带正负号之后，"收敛"分裂成两种：绝对收敛靠大小，条件收敛靠抵消',
  tags: ['小题', '概念辨析', '高频'],
  updated: '2026-08-19',

  blocks: [

    { t: 'key', id: 'three-way', title: '三分法：任何级数只有这三种身份', c: String.raw`
      拿到一个变号级数 $\sum a_n$，==第一个动作永远是去看 $\sum\left|a_n\right|$==：

      | $\sum\left|a_n\right|$ | $\sum a_n$ | 身份 |
      |---|---|---|
      | 收敛 | 必收敛 | **绝对收敛** |
      | 发散 | 收敛 | **条件收敛** |
      | 发散 | 发散 | **发散** |

      ==注意没有第四行==：$\sum\left|a_n\right|$ 收敛而 $\sum a_n$ 发散是不可能的，
      这就是"绝对收敛 $\Rightarrow$ 收敛"。

      **标准流程**：

      1. 取绝对值，用[正项级数那一套](#/calculus/series/convergence?at=decision)判 $\sum\left|a_n\right|$；
      2. 收敛 $\Rightarrow$ 写"绝对收敛"，==收工==；
      3. 发散 $\Rightarrow$ 回头单独判 $\sum a_n$（交错的用莱布尼茨），
         收敛就是条件收敛，不收敛就是发散。

      ==第 2 步就收工是很多人漏掉的==：绝对收敛已经蕴含收敛，不必再验一次。
    ` },

    { t: 'key', id: 'abs-implies', title: '为什么"绝对收敛 $\\Rightarrow$ 收敛"：一个能背下来的三行证明', c: String.raw`
      关键是==构造一个正项级数==（这样才能用比较判别法）：
      $$0\ \leq\ a_n+\left|a_n\right|\ \leq\ 2\left|a_n\right| .$$
      由 $\sum\left|a_n\right|$ 收敛及比较判别法，$\sum\left(a_n+\left|a_n\right|\right)$ 收敛。于是
      $$\sum a_n=\sum\left(a_n+\left|a_n\right|\right)-\sum\left|a_n\right|$$
      是两个收敛级数之差，收敛。$\blacksquare$

      ==这个"加上 $\left|a_n\right|$ 凑成非负"的手法，就是[正部负部分解](#/calculus/series/general-series?at=pos-neg)的雏形==，
      也是抽象级数证明题里最常用的一步。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'leibniz', c: '一、莱布尼茨判别法' },

    { t: 'key', id: 'leibniz-core', title: '三个条件，一个都不能少', c: String.raw`
      对交错级数 $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}u_n$，若

      1. ==$u_n\geq0$==；
      2. ==$u_n$ 单调递减==（从某项起即可）；
      3. ==$u_n\to0$==，

      则级数收敛，且余项满足 $\left|r_n\right|\leq u_{n+1}$（==截断误差不超过第一个丢掉的项==）。

      **单调性怎么证**（考场上真正花时间的地方，三选一）：

      | 手段 | 适用 |
      |---|---|
      | 作差 $u_n-u_{n+1}\geq0$ | 多项式、根式 |
      | 作商 $\dfrac{u_{n+1}}{u_n}\leq1$ | 含阶乘、指数 |
      | 构造 $f(x)$ 求导，证 $f'(x)\leq0$ | 含 $\ln x$、$\frac{\ln x}{x}$ 这类 |

      第三种最常用也最容易忘：要证 $u_n=\frac{\ln n}{n}$ 递减，
      就令 $f(x)=\frac{\ln x}{x}$，$f'(x)=\frac{1-\ln x}{x^{2}}<0\;(x>e)$，
      ==故从 $n=3$ 起递减==（前面几项不影响敛散）。
    ` },

    { t: 'warn', id: 'leibniz-traps', title: '单调性丢了会翻车：一个必看的反例', c: String.raw`
      莱布尼茨的三个条件是==充分不必要==的。条件不满足时
      ==既不能判收敛，也不能判发散==，必须另想办法 —— 而结果真的可能是发散。

      **反例**：$\displaystyle\sum_{n=2}^{\infty}\frac{(-1)^{n}}{\sqrt n+(-1)^{n}}$。
      通项趋于 $0$、形式上完美交错，==但 $u_n=\frac{1}{\sqrt n+(-1)^{n}}$ 不单调==（忽大忽小）。

      分母有理化拆开看：
      $$\frac{(-1)^{n}}{\sqrt n+(-1)^{n}}
      =\frac{(-1)^{n}\left(\sqrt n-(-1)^{n}\right)}{n-1}
      =\underbrace{\frac{(-1)^{n}\sqrt n}{n-1}}_{\text{收敛}}-\underbrace{\frac{1}{n-1}}_{\text{发散}}$$
      第一项由莱布尼茨收敛，第二项是调和级数，==收敛 $+$ 发散 $=$ 发散==。

      ==所以这个级数发散==。教训：看到交错级数，
      **必须真的去验单调性**，不能因为"长得像"就套莱布尼茨。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pos-neg', c: '二、正部与负部：条件收敛到底在发生什么' },

    { t: 'key', id: 'decomposition', title: '把一个级数劈成两个正项级数', c: String.raw`
      定义
      $$a_n^{+}=\frac{\left|a_n\right|+a_n}{2}=\max\left\{a_n,0\right\},\qquad
      a_n^{-}=\frac{\left|a_n\right|-a_n}{2}=\max\left\{-a_n,0\right\},$$
      则 $a_n^{\pm}\geq0$，且
      $$a_n=a_n^{+}-a_n^{-},\qquad \left|a_n\right|=a_n^{+}+a_n^{-}.$$
      通俗地说：==$a_n^{+}$ 收集所有正项，$a_n^{-}$ 收集所有负项（取相反数）==。

      于是三分法有了一个更本质的说法：

      | | $\sum a_n^{+}$ | $\sum a_n^{-}$ |
      |---|---|---|
      | **绝对收敛** | 收敛 | 收敛 |
      | **条件收敛** | ==$+\infty$== | ==$+\infty$== |
      | 发散（一般情形） | 至少一个 $+\infty$ | |

      $$\boxed{\ \text{条件收敛}=\text{两股}+\infty\text{ 精确抵消的结果}\ }$$

      **为什么条件收敛时两边必须同时发散**：
      若 $\sum a_n^{+}$ 收敛，则由 $\left|a_n\right|=2a_n^{+}-a_n$ 知 $\sum\left|a_n\right|$ 收敛，
      与"条件收敛"矛盾；反之同理。==只发散一个是不可能的。==
    ` },

    { t: 'key', id: 'why-it-matters', title: '这一条解释了条件收敛的全部"怪现象"', c: String.raw`
      一旦接受"条件收敛 $=$ 两个 $+\infty$ 在打架"，下面这些结论就都不需要单独记：

      - **拆开就散**：把==正项、负项==分开各自求和，就是把两个 $+\infty$ 单独拎出来
        $\Rightarrow$ 必然发散。交错调和级数的奇数项、偶数项各自发散也是这个原因，
        ==但要注意那是因为它严格交错，奇项恰好就是正部==；
        符号模式不规则时，==奇偶划分和正负划分不是一回事==（见下一条）。
      - **顺序不能换**：抵消依赖于正负项交替出现的==节奏==。
        打乱顺序（先多取几个正项，再取一个负项……）就能把和拨到任意值 ——
        这就是[黎曼重排定理](#/calculus/series/abstract?at=rearrange)。
      - **平方可能发散**：平方把符号抹掉了，抵消机制失效。
        $a_n=\frac{(-1)^{n}}{\sqrt n}$ 条件收敛，$a_n^{2}=\frac1n$ 发散。
      - **绝对收敛就没这些毛病**：两边各自有限，怎么拆、怎么换序都不影响结果。

      =="绝对收敛靠每一项都足够小，条件收敛靠正负相消"== ——
      这句话是[抽象级数题](#/calculus/series/abstract?at=toolbox)的总纲。
    ` },

    { t: 'key', id: 'sign-pattern', title: '条件收敛的四种长相：$(-1)^{n}$ 只是最常见的一种', c: String.raw`
      ==必然成立的只有一条==：由上面的分解，条件收敛时 $\sum a_n^{+}=\sum a_n^{-}=+\infty$，
      所以正项、负项都有无穷多个，==符号必须变号无穷多次==。
      至于"以什么节奏变号"，==没有任何限制==。

      | 长相 | 例子 | 判定依据 |
      |---|---|---|
      | ① **严格交错** | $\sum\frac{(-1)^{n}}{n^{p}}\ (0<p\leq1)$ | 莱布尼茨（==大纲内唯一能直接判的==） |
      | ② **三角振荡** | $\sum\frac{\sin n}{n}$、$\sum\frac{\cos nx}{\sqrt n}\ (x\neq2k\pi)$ | 狄利克雷：$\sum_{k\leq n}\sin k$ 有界 |
      | ③ **广义周期符号** | $c_n$ 按 $1,1,-1,-1$ 或 $1,1,-2$ 循环，取 $\sum\frac{c_n}{n}$ | 狄利克雷：==一个周期内和为 $0$ $\Rightarrow$ 部分和有界== |
      | ④ **任意有界部分和** | 只要 $\left\{\sum_{k\leq n}c_k\right\}$ 有界、$b_n\downarrow0$，$\sum c_nb_n$ 就行 | [狄利克雷判别法](#/calculus/series/general-series?at=two-tests)的一般形式，==②③ 都是它的特例== |

      ==四种的绝对值级数都发散==，所以都是货真价实的条件收敛。
      （② 的发散可用 $\left|\sin n\right|\geq\sin^{2}n=\frac{1-\cos2n}{2}$ 放缩：
      $\sum\frac{1}{2n}$ 发散而 $\sum\frac{\cos2n}{2n}$ 收敛。）

      ③ 那种"$+,+,-,-$"的符号也写得出闭式，例如 $c_n=\sqrt2\sin\left(\frac{n\pi}{2}-\frac{\pi}{4}\right)$
      依次取 $1,1,-1,-1,\cdots$ —— ==所以 ② 和 ③ 本来就是一回事==。

      **考场分寸**：能被大纲工具==判出来==的条件收敛基本只有 ①，
      所以计算题里你遇到的确实都是交错的。
      ==但理论选择题不能把"交错"当已知条件用== —— 命题人正是靠这个差价出题。

      **两个直接后果**：

      1. [奇偶项双双发散](#/calculus/series/abstract?at=odd-even)那条结论
         ==必须挂上"严格交错"的前提==，否则有反例；
      2. 幂级数在端点 $\left|x\right|=R$ 处得到的数项级数，
         ==符号完全由 $a_n$ 决定，不保证交错==，
         见[$R$ 与子级数](#/calculus/series/power-series?at=only-arrow)。

      还有第五种情况：==交错藏在函数里，表面上看不出来==，见下一条。
    ` },

    { t: 'key', id: 'taylor-hidden', title: '隐性交错：$(-1)^{n}$ 塞在函数里，展开才看得出生死', c: String.raw`
      考研真正的难点题型：题面里没有现成的 $(-1)^{n}$ 摆在外面，
      而是把它==塞进一个外层函数==，写成 $u_n=f\!\left(\frac{(-1)^{n}}{n^{\alpha}}\right)$。
      ==先看 $f$ 是不是奇函数，这一步就分生死==。

      **情形一：$f$ 是奇函数（$\sin,\ \arctan,\ \tan,\ \sinh$）**
      $$f\!\left(\frac{(-1)^{n}}{n^{\alpha}}\right)=(-1)^{n}f\!\left(\frac{1}{n^{\alpha}}\right)$$
      ==符号能整个提到外面==，它就是真正的交错级数，$b_n=f\left(n^{-\alpha}\right)\downarrow0$，
      **莱布尼茨直接判收敛，根本不用泰勒**。是否绝对收敛再看 $b_n\sim n^{-\alpha}$ 即可。

      **情形二：$f$ 不是奇函数（$\ln(1+x),\ e^{x}-1,\ \sqrt{1+x}-1,\ 1-\cos x$）**
      符号提不出来，只能泰勒展开。关键就一句话：
      $$\left(\frac{(-1)^{n}}{n^{\alpha}}\right)^{k}=
      \begin{cases}\dfrac{(-1)^{n}}{n^{k\alpha}}, & k\ \text{奇：仍变号}\\[2ex]
      \dfrac{1}{n^{k\alpha}}, & k\ \text{偶：==符号被平方掉，变成正项==}\end{cases}$$

      ==展开式里的偶次项会漏出一个不变号的正项级数==，它不再享受任何抵消，
      只能老实按 $p$ 级数判。最危险的是==二次项 $\frac{c}{n^{2\alpha}}$==：

      | $\alpha$ | 二次项 | 整体结论 |
      |---|---|---|
      | $\alpha>\frac12$ | $\frac{c}{n^{2\alpha}}$ 收敛 | 收敛（$\frac12<\alpha\leq1$ 时==条件收敛==） |
      | $\alpha=\frac12$ | $\frac{c}{n}$ ==发散== | ==整体发散==（收敛 $+$ 发散） |
      | $\alpha<\frac12$ | 更发散 | 发散 |

      ==$\alpha=\frac12$ 正是命题人最爱的临界点==，$\frac{(-1)^{n}}{\sqrt n}$ 之所以是全章最著名的反例，
      根子就在这里。

      **口诀**：==外层是奇函数就活，含偶次项就看 $2\alpha$ 跟 $1$ 谁大==。
      别只展到一阶就下结论 —— ==一阶项只告诉你"长得像交错级数"，胜负在二阶项==。
    ` },

    { t: 'example',
      id: 'ex-taylor-alternating',
      title: '一阶看不出差别：$\\sqrt{1+\\frac{(-1)^{n}}{\\sqrt n}}-1$ 与 $\\sin\\frac{(-1)^{n}}{\\sqrt n}$',
      level: 4,
      problem: String.raw`判断下列级数的敛散性，收敛的说明是绝对收敛还是条件收敛：

        $$\text{(1)}\ \sum_{n=1}^{\infty}\left(\sqrt{1+\frac{(-1)^{n}}{\sqrt n}}-1\right);
        \qquad
        \text{(2)}\ \sum_{n=1}^{\infty}\sin\frac{(-1)^{n}}{\sqrt n}.$$`,

      idea: String.raw`两题的通项都 $\sim\frac{(-1)^{n}}{\sqrt n}$，
        ==只展到一阶会得到同一个结论：都条件收敛。而正确答案一发散一收敛==。

        分水岭是外层函数的奇偶性：$\sin$ 是奇函数，$(-1)^{n}$ 能整个提出来；
        $\sqrt{1+x}-1$ 不是，提不出来，展开后==二次项 $-\frac{x^{2}}{8}$ 会漏出一个正项==，
        而这里 $x^{2}=\frac1n$ 恰好是调和级数。

        所以拿到这类题的固定动作：==先问 $f$ 奇不奇==。
        奇 $\Rightarrow$ 提符号 $+$ 莱布尼茨，一步到位；
        不奇 $\Rightarrow$ 必须展到二阶（余项到三阶），==一阶结论一律不作数==。`,

      solution: String.raw`**(2) 先做，因为它一步就完。** $\sin$ 是奇函数：
        $$\sin\frac{(-1)^{n}}{\sqrt n}=(-1)^{n}\sin\frac{1}{\sqrt n}.$$
        取 $b_n=\sin\frac{1}{\sqrt n}$：当 $n\geq1$ 时 $\frac{1}{\sqrt n}\in(0,1]\subset(0,\frac\pi2)$，
        故 $b_n>0$、==单调递减==、$b_n\to0$，由莱布尼茨==收敛==。
        又 $b_n\sim\frac{1}{\sqrt n}$，$\sum\frac{1}{\sqrt n}$ 发散（$p=\frac12<1$），
        所以==不绝对收敛==。结论：==条件收敛==。

        **(1) 必须展到二阶。** 由 $\sqrt{1+x}-1=\frac x2-\frac{x^{2}}8+O(x^{3})\ (x\to0)$，
        代入 $x=\frac{(-1)^{n}}{\sqrt n}$（注意 $x^{2}=\frac1n$，==符号没了==）：
        $$u_n=\frac{(-1)^{n}}{2\sqrt n}-\frac{1}{8n}+O\!\left(\frac{1}{n^{3/2}}\right).$$
        逐项看：

        | 部分 | 敛散 | 理由 |
        |---|---|---|
        | $\sum\frac{(-1)^{n}}{2\sqrt n}$ | 收敛 | 莱布尼茨 |
        | $\sum\left(-\frac{1}{8n}\right)$ | ==发散== | 调和级数 |
        | $\sum O\!\left(n^{-3/2}\right)$ | 绝对收敛 | $p=\frac32>1$ |

        收敛 $+$ ==发散== $+$ 收敛 $=$ ==发散==。结论：==级数 (1) 发散==。`,

      comment: String.raw`**这组题的题眼**：$\frac{(-1)^{n}}{\sqrt n}$ 里的 $\alpha=\frac12$
        ==踩在临界点上==——二次项 $\frac{1}{n^{2\alpha}}=\frac1n$ 不多不少正好发散。
        把题目改成 $\frac{(-1)^{n}}{n^{2/3}}$，(1) 的二次项变成 $\frac{1}{n^{4/3}}$ 收敛，
        整题就==转为条件收敛==。分档见[上一条](#/calculus/series/general-series?at=taylor-hidden)。

        **换外层函数的效果**（都取 $x_n=\frac{(-1)^{n}}{\sqrt n}$）：

        | 外层 | 二阶展开 | 结论 |
        |---|---|---|
        | $\sin x,\ \arctan x$ | ==无偶次项== | 条件收敛 |
        | $\ln(1+x)$ | $x-\frac{x^{2}}{2}$ | 发散 |
        | $e^{x}-1$ | $x+\frac{x^{2}}{2}$ | 发散 |
        | $\sqrt{1+x}-1$ | $\frac x2-\frac{x^{2}}{8}$ | 发散 |
        | $1-\cos x$ | $\frac{x^{2}}{2}$（==一阶就没了==） | 通项恒正 $\sim\frac{1}{2n}$，发散 |

        **答题格式提醒**：(1) 这种题==不能写"由等价无穷小 $u_n\sim\frac{(-1)^{n}}{2\sqrt n}$"==——
        等价无穷小只对==保号==的通项能替换敛散性，
        变号级数必须老实展开成"主项 $+$ 余项"再逐项判。`,
    },

    /* ================================================================== */
    { t: 'h', id: 'abel-dirichlet', c: '三、阿贝尔与狄利克雷判别法（超纲拓展）' },

    { t: 'md', c: String.raw`
      莱布尼茨只能对付 $(-1)^{n}$ 这一种符号模式。
      遇到 $\sum\frac{\sin n}{n}$ 这类"符号乱跳但不失控"的级数，考研不要求，
      但下面两条判别法能一句话解决，==而且它们是理解莱布尼茨的正确视角==。
    ` },

    { t: 'key', id: 'two-tests', title: '两条判别法：把通项拆成"振荡 $\\times$ 衰减"', c: String.raw`
      都是判断 $\displaystyle\sum a_nb_n$ 的收敛性：

      | | 对 $\sum a_n$ 的要求 | 对 $\left\{b_n\right\}$ 的要求 |
      |---|---|---|
      | **狄利克雷** | 部分和 ==有界==（不必收敛） | 单调且 ==$\to0$== |
      | **阿贝尔** | ==收敛== | 单调且 ==有界==（不必趋零） |

      ==两条是一个东西的两副面孔==：一边强、另一边就可以弱。

      **莱布尼茨是狄利克雷的特例**：取 $a_n=(-1)^{n-1}$（部分和在 $0,1$ 之间跳，有界），
      $b_n=u_n$（单调趋零），立刻得到莱布尼茨判别法。
      ==这解释了"单调 $+$ 趋零"这两个条件是从哪来的==。

      **典型应用**：$\displaystyle\sum\frac{\sin n}{n}$ 收敛。
      取 $a_n=\sin n$，用和差化积可证其部分和有界
      （$\left|\sum_{k=1}^{n}\sin k\right|\leq\frac{1}{\left|\sin\frac12\right|}$）；
      取 $b_n=\frac1n$ 单调趋零，由狄利克雷即得。
      ==而它不绝对收敛==（$\sum\frac{\left|\sin n\right|}{n}$ 发散），所以是条件收敛。

      **阿贝尔的常见用法**：已知 $\sum a_n$ 收敛，则
      $\sum a_n\cdot\frac{n}{n+1}$、$\sum a_n\arctan n$、$\sum\frac{a_n}{\sqrt[n]{n}}$
      ==都收敛==，因为乘的那个因子单调有界。这在[抽象级数题](#/calculus/series/abstract?at=table)里很好用。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **判完绝对收敛还去验一遍原级数**：多余。绝对收敛已经蕴含收敛。
      2. **莱布尼茨不验单调性**：见[那个反例](#/calculus/series/general-series?at=leibniz-traps)，
         不单调时真的可能发散。
      3. **条件不满足就判发散**：莱布尼茨是==充分条件==，不满足只说明这个工具用不了。
      4. **对变号级数直接用比值 / 根值法**：要先取绝对值。
         ==注意：取绝对值后用比值法得 $\rho>1$，可以反推原级数发散==
         （因为此时 $\left|a_n\right|\not\to0$），这是唯一能"反推"的情形。
      5. **把"条件收敛"当成"收敛得慢一点"**：它是==结构性的不同==，
         拆项、换序、平方都会出事，见[正部负部](#/calculus/series/general-series?at=why-it-matters)。
      6. **误以为 $\sum a_n$ 与 $\sum\left|a_n\right|$ 的和有关系**：没有。
         $\sum\frac{(-1)^{n-1}}{n}=\ln2$，而 $\sum\frac1n=+\infty$。

      全章判别法与性质的**完整前提**汇总成了三张表，
      见[前提速查](#/calculus/series/abstract?at=tests-prereq)，
      其中[伪定理清单](#/calculus/series/abstract?at=fake-theorems)可以直接当选择题自测用。
    ` },

  ],
});
