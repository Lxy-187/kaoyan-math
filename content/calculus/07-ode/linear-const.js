/* ==========================================================================
   高等数学 / 7 常微分方程 / 高阶常系数线性方程
   —— 第三、四节的微分算子法属于超纲拓展，正常考试用待定系数法即可。
   ========================================================================== */

KM.page({
  path: 'calculus/ode/linear-const',
  title: '高阶常系数线性方程',
  subtitle: '特征根定通解，待定系数定特解 —— 附微分算子法与移位定理（超纲拓展）',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-10',

  blocks: [

    { t: 'key', id: 'structure', title: '先立骨架：通解 = 齐次通解 + 一个特解', c: String.raw`
      $$y^{(n)}+a_1y^{(n-1)}+\cdots+a_ny=f(x)
      \qquad\Longrightarrow\qquad y=\underbrace{Y}_{\text{齐次通解}}+\underbrace{y_p}_{\text{任一特解}}$$

      ==这和线性方程组 $Ax=b$ 的"通解 = 特解 + 导出组通解"是同一个定理==，
      只是把 $\mathbb R^{n}$ 换成了函数空间。
      两边的"齐次解全体"都是一个线性空间，维数等于阶数 $n$。

      **叠加原理**：若 $f=f_1+f_2$，分别求出 $y_{p1},y_{p2}$，则 $y_p=y_{p1}+y_{p2}$。
      右端项复杂时==拆开分别求==，这是最省事的一步。

      这条骨架为什么成立、以及"已知几个解反求通解 / 反求方程"那一类题，
      见[解的结构：核 $+$ 平移](#/calculus/ode/solution-structure?at=kernel-coset)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'homogeneous', c: '一、齐次方程：特征根 → 通解' },

    { t: 'key', id: 'char-roots', title: '特征方程与三类根', c: String.raw`
      写出特征方程 $\lambda^{n}+a_1\lambda^{n-1}+\cdots+a_n=0$，按根的类型直接抄：

      | 根的类型 | 对应的通解项 |
      |---|---|
      | 单实根 $\lambda$ | $Ce^{\lambda x}$ |
      | $k$ 重实根 $\lambda$ | $\left(C_1+C_2x+\cdots+C_kx^{k-1}\right)e^{\lambda x}$ |
      | 单重共轭复根 $\alpha\pm i\beta$ | $e^{\alpha x}\left(C_1\cos\beta x+C_2\sin\beta x\right)$ |
      | $k$ 重共轭复根 | $e^{\alpha x}\left[P_{k-1}(x)\cos\beta x+Q_{k-1}(x)\sin\beta x\right]$ |

      ==重根就是"乘一个 $x$ 的多项式"，复根就是"实部进指数、虚部进三角"==，
      两条规则覆盖全部情形。任意常数的总个数必须等于方程的阶数 $n$，
      ==写完数一遍 $C$ 的个数==是最有效的自查。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'particular', c: '二、特解：待定系数法（考研标准解法）' },

    { t: 'key', id: 'undetermined', title: '两类右端项的设法', c: String.raw`
      **类型一**：$f(x)=P_m(x)e^{ax}$（$P_m$ 是 $m$ 次多项式，$a$ 可为 $0$）
      $$y_p=x^{k}\,Q_m(x)\,e^{ax}$$

      **类型二**：$f(x)=e^{ax}\left[P_l(x)\cos\beta x+P_n(x)\sin\beta x\right]$
      $$y_p=x^{k}e^{ax}\left[R_m(x)\cos\beta x+S_m(x)\sin\beta x\right],\qquad m=\max\{l,n\}$$

      其中 ==$k$ 是"特征方程里与右端匹配的那个数"作为根的重数==：

      | 右端项 | 拿去和特征根比对的数 |
      |---|---|
      | $P_m(x)e^{ax}$ | $a$ |
      | $e^{ax}\left[\cdots\cos\beta x+\cdots\sin\beta x\right]$ | $a+i\beta$ |

      不是根 $\Rightarrow k=0$；单根 $\Rightarrow k=1$；二重根 $\Rightarrow k=2$。
    ` },

    { t: 'warn', id: 'k-trap', title: '$k$ 定错是这一节最大的失分点', c: String.raw`
      1. **$f(x)$ 是纯多项式时别忘了 $a=0$**：$y''-y'=x$ 里 $a=0$，
         而 $\lambda=0$ 恰是特征根，所以 ==$k=1$，要设 $y_p=x(Ax+B)$==，
         设成 $Ax+B$ 直接解不出来。
      2. **三角项要用 $a+i\beta$ 去比，不是 $a$**：
         $y''+y=\cos x$ 中 $a+i\beta=i$ 恰是特征根，$k=1$。
      3. **$\cos$ 和 $\sin$ 必须同时设**：右端只有 $\cos\beta x$，
         特解里 ==$\cos$ 与 $\sin$ 也要一起写==（除非 $a+i\beta$ 不是根且方程只含偶数阶导数）。
      4. **多项式次数取 $\max$**：类型二里 $R_m,S_m$ 的次数是 $\max\{l,n\}$，两个都要设成 $m$ 次。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'operator', c: '三、拓展：微分算子法' },

    { t: 'md', c: String.raw`
      **以下内容超出考研大纲。** 它不是必需品，但在草稿纸上能把待定系数法的
      "设未知系数 → 求导 → 代入 → 解方程组"压缩成几行代数，
      对付高重数、多项式次数高的题目尤其省力。
      ==卷面写法见[本节末尾的建议](#/calculus/ode/linear-const?at=exam-advice)。==
    ` },

    { t: 'key', id: 'notation', title: '记号：把求导当成乘法', c: String.raw`
      记 $D=\dfrac{\d}{\dx}$，则 $D^{k}y=y^{(k)}$，方程写成
      $$F(D)\,y=f(x),\qquad F(D)=D^{n}+a_1D^{n-1}+\cdots+a_n .$$
      ==$F$ 就是特征多项式，只是把 $\lambda$ 换成了 $D$。==

      特解记作逆算子作用的结果：
      $$y_p=\frac{1}{F(D)}f(x).$$
      其中 $\dfrac1D$ 表示==积一次分==（只取一个原函数，积分常数并入齐次通解）。

      这套记号和[中值定理证明里的算子分解](#/calculus/derivative-app/mvt-proof?at=operator-rule)
      是同一套东西，==那边用它决定"乘哪个指数"，这边用它直接算特解==。
    ` },

    { t: 'key', id: 'rule-simple', title: '规则一：$a$ 不是特征根时，直接把 $D$ 换成 $a$', c: String.raw`
      因为 $D^{k}e^{ax}=a^{k}e^{ax}$，所以 $F(D)e^{ax}=F(a)e^{ax}$。反过来：

      $$\boxed{\ \frac{1}{F(D)}e^{ax}=\frac{1}{F(a)}e^{ax}\qquad(F(a)\neq0)\ }$$

      **例**：求 $(D^{2}-5D+6)y=e^{4x}$ 的特解。
      $F(4)=16-20+6=2\neq0$，故
      $$y_p=\frac{1}{2}e^{4x}.$$
      ==一行完事，逆算子退化成纯代数四则运算==，不需要设未知系数。
    ` },

    { t: 'method', id: 'shift', title: '规则二：移位定理（把 $e^{ax}$ 提到算子外面）', c: String.raw`
      $$\boxed{\ F(D)\left[e^{ax}V(x)\right]=e^{ax}\,F(D+a)\left[V(x)\right]\ }$$
      逆算子形式
      $$\frac{1}{F(D)}\left[e^{ax}V(x)\right]=e^{ax}\,\frac{1}{F(D+a)}\left[V(x)\right].$$

      **推导只有三步，全靠乘积求导法则：**

      1. **一阶**：
         $$D\left[e^{ax}V\right]=ae^{ax}V+e^{ax}V'=e^{ax}\left(D+a\right)V .$$
         把 $e^{ax}$ 提出来，代价是算子里的 $D$ 变成 $D+a$。
      2. **高阶（归纳）**：对上式再作用一次 $D$，
         $$D^{2}\left[e^{ax}V\right]=D\left[e^{ax}(D+a)V\right]=e^{ax}(D+a)^{2}V ,$$
         归纳得 $D^{k}\left[e^{ax}V\right]=e^{ax}(D+a)^{k}V$。
      3. **线性叠加**：$F(D)$ 是 $D^{k}$ 的常系数线性组合，逐项套用上式即得定理。
         逆算子形式只需在两边左乘 $\frac{1}{F(D)}$。

      **一句话记法**：==乘 $e^{ax}$ $\iff$ 算子自变量平移 $a$。==
    ` },

    { t: 'key', id: 'shift-explains-rolle', title: '顺带解释了中值定理那边的"乘 $e^{-kx}$"', c: String.raw`
      [构造辅助函数证中值定理](#/calculus/derivative-app/mvt-proof?at=operator-rule)时有一条法则：
      "要处理因子 $(D-k)$，就让函数乘上 $e^{-kx}$ 再求导。"

      现在看得很清楚了 —— ==它就是移位定理取 $a=-k$、$F(D)=D$ 的情形==：
      $$D\left[e^{-kx}f\right]=e^{-kx}\left(D-k\right)f .$$
      左边是"求导为零"（罗尔定理能用），右边正好剥离出想要的 $f'-kf$。

      ==同一条定理，一边用来解方程，一边用来造辅助函数。==
    ` },

    { t: 'key', id: 'resonance', title: '规则三：共振情形（$a$ 是 $k$ 重特征根）', c: String.raw`
      当 $F(a)=0$ 时规则一失效。设 $F(D)=(D-a)^{k}G(D)$ 且 $G(a)\neq0$，
      把 $e^{ax}$ 看成 $e^{ax}\cdot1$ 用移位定理：

      $$\frac{1}{F(D)}e^{ax}
      =e^{ax}\frac{1}{(D)^{k}G(D+a)}\left[1\right]
      =e^{ax}\cdot\frac{1}{G(a)}\cdot\frac{1}{D^{k}}\left[1\right]$$

      （中间用到 $\frac{1}{G(D+a)}[1]=\frac{1}{G(a)}$：常数的各阶导数为零，
      $G(D+a)$ 按 $D$ 展开后只剩常数项 $G(a)$。）

      而 $\dfrac{1}{D^{k}}[1]$ 就是对 $1$ 连续积 $k$ 次：
      $$1\ \to\ x\ \to\ \frac{x^{2}}{2}\ \to\ \frac{x^{3}}{6}\ \to\ \cdots\ \to\ \frac{x^{k}}{k!}$$

      $$\boxed{\ \frac{1}{F(D)}e^{ax}=\frac{x^{k}}{k!\,G(a)}\,e^{ax}
      =\frac{x^{k}}{F^{(k)}(a)}\,e^{ax}\ }$$

      （两式相等是因为 $F^{(k)}(a)=k!\,G(a)$。）

      ==分母里的 $k!$ 不是硬记的，它纯粹来自连续 $k$ 次积分。==
      ==而 $x^{k}$ 的出现就是"共振"的代数结果==：
      右端激励的指数恰好落在系统的固有特征根上，
      $e^{ax}$ 已被齐次解空间吸收，解只能靠多项式因子"长出来"。
    ` },

    { t: 'example',
      id: 'ex-resonance',
      title: '三重共振：$(D-3)^{3}y=e^{3x}$',
      source: '算子法示范',
      level: 2,
      problem: String.raw`
        用微分算子法求 $(D-3)^{3}y=e^{3x}$ 的通解，并总结规律。
      `,
      idea: String.raw`
        特征方程 $(\lambda-3)^{3}=0$ 有三重根 $\lambda=3$，
        而右端指数正好也是 $e^{3x}$ —— ==完全共振，且重数 $k=3$==。

        规则一（直接代 $D=3$）会得到 $\frac10$，失效。
        改用移位定理：把 $e^{3x}$ 提到算子外，算子里 $D\to D+3$，
        $(D-3)^{3}$ 就变成了 $D^{3}$ —— ==算子被"打回原形"==，
        剩下的只是对常数 $1$ 积三次分。
      `,
      solution: String.raw`
        **齐次通解**：$(\lambda-3)^{3}=0$ 给出三重根 $\lambda=3$，故
        $$Y=\left(C_1+C_2x+C_3x^{2}\right)e^{3x}.$$

        **特解**：
        $$y_p=\frac{1}{(D-3)^{3}}e^{3x}=\frac{1}{(D-3)^{3}}\left[e^{3x}\cdot1\right]$$
        由移位定理（$a=3$，$V=1$）：
        $$y_p=e^{3x}\frac{1}{\left(D+3-3\right)^{3}}\left[1\right]=e^{3x}\,\frac{1}{D^{3}}\left[1\right].$$
        对 $1$ 连续积三次分：
        $$\frac1D[1]=x,\qquad\frac{1}{D^{2}}[1]=\frac{x^{2}}{2},\qquad
        \frac{1}{D^{3}}[1]=\frac{x^{3}}{6}=\frac{x^{3}}{3!},$$
        故
        $$y_p=\frac{x^{3}}{3!}e^{3x}=\frac{x^{3}}{6}e^{3x}.$$

        **通解**：
        $$y=\left(C_1+C_2x+C_3x^{2}\right)e^{3x}+\frac{x^{3}}{6}e^{3x}.$$
      `,
      comment: String.raw`
        **归纳出的规律**：对于 $(D-a)^{n}y=e^{ax}$（完全共振，$G\equiv1$，$G(a)=1$），
        $$\boxed{\ y_p=\frac{x^{n}}{n!}\,e^{ax}\ }$$
        可以直接写答案，不必待定系数。

        **三个观察**：

        1. ==特解里的 $x^{3}$ 不会被齐次解吸收==：齐次部分最高只到 $x^{2}e^{3x}$，
           正好差一次 —— 这也印证了 $k$ 必须取到重数。
        2. ==$n!$ 的来源是积分，不是组合数==。看到 $\frac{x^{n}}{n!}$ 就该想到"积了 $n$ 次"。
        3. 用待定系数法做这题要设 $y_p=Ax^{3}e^{3x}$、求三次导、代入比较系数，
           工作量与上面不在一个量级。
      `,
    },

    { t: 'key', id: 'other-rules', title: '另外两条常用规则', c: String.raw`
      **右端是三角函数**：因为 $D^{2}\sin bx=-b^{2}\sin bx$，凡是只含 $D^{2}$ 的算子可直接替换：
      $$\frac{1}{F(D^{2})}\sin bx=\frac{1}{F(-b^{2})}\sin bx\qquad\left(F(-b^{2})\neq0\right),$$
      $\cos bx$ 同理。==注意是把 $D^{2}$ 换成 $-b^{2}$，不是把 $D$ 换成 $b$。==
      算子里若有奇次幂的 $D$，先设法凑成 $D^{2}$ 的函数，或改用复数法
      （对 $e^{(a+ib)x}$ 用规则一，最后取实部 / 虚部）。

      **右端是多项式 $P_m(x)$**：把 $\dfrac{1}{F(D)}$ 按 $D$ 的幂级数展开，
      ==只需展到 $D^{m}$ 项==（因为 $D^{m+1}P_m=0$，后面全是零）。

      例：求 $(D^{2}-5D+6)y=x$ 的特解。
      $$\frac{1}{6-5D+D^{2}}=\frac16\cdot\frac{1}{1-\frac{5D-D^{2}}{6}}
      =\frac16\left(1+\frac{5D}{6}+\cdots\right)$$
      作用在 $x$ 上（只需到一阶）：
      $$y_p=\frac16\left(x+\frac56\right)=\frac{x}{6}+\frac{5}{36}.$$

      ==这里用的正是[几何级数 $\frac{1}{1-q}=\sum q^{n}$](#/threads/lines/geometric?at=core)==，
      只不过 $q$ 换成了微分算子。同一个恒等式的又一副面孔。
    ` },

    { t: 'warn', id: 'exam-advice', title: '考场怎么用：草稿纸上算，卷面上验', c: String.raw`
      算子法==不在考研大纲内==，阅卷老师不一定认这套记号。稳妥的做法是：

      1. **草稿纸**上用算子法几行求出 $y_p$；
      2. **卷面**上写"设特解为 $y_p=\dfrac{x^{3}}{6}e^{3x}$"，
         然后==代入原方程验证==（或按待定系数法的标准格式补上系数比较）。

      特解只要满足方程就是对的，==验证一步是完全严密的==，不存在扣分风险。
      算子法的价值在于==让你知道该设什么==，省掉试错。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'shift-family', c: '四、移位定理的其他化身（超纲一览）' },

    { t: 'md', c: String.raw`
      "移位定理"不是微分方程独有的名字。在积分变换、信号与系统里，
      同一个骨架反复出现，说的都是同一件事：

      ==在一个域里**乘指数函数**，等价于在另一个域里**平移自变量**。==
    ` },

    { t: 'compare',
      id: 'shift-table',
      title: '同一个定理的四副面孔',
      cols: ['领域', '形式', '在说什么'],
      rows: [
        ['微分算子', '$F(D)\\left[e^{ax}V\\right]=e^{ax}F(D+a)V$',
         '乘 $e^{ax}$ $\\iff$ 算子自变量平移 $a$'],
        ['拉普拉斯（s 域平移）', '$\\mathcal L\\{e^{at}f(t)\\}=F(s-a)$',
         '时域乘指数 $\\iff$ 复频域平移'],
        ['拉普拉斯（t 域平移）', '$\\mathcal L\\{f(t-a)u(t-a)\\}=e^{-as}F(s)$',
         '时域延迟 $\\iff$ 复频域乘指数（==反过来了==）'],
        ['傅里叶（时移）', '$\\mathcal F\\{f(t-t_0)\\}=e^{-i\\omega t_0}F(\\omega)$',
         '延迟只改相位、不改幅度谱'],
        ['傅里叶（频移）', '$\\mathcal F\\{e^{i\\omega_0t}f(t)\\}=F(\\omega-\\omega_0)$',
         '调制 $\\iff$ 频谱搬移'],
        ['Z 变换', '$\\mathcal Z\\{x[n-k]\\}=z^{-k}X(z)$', '序列延迟 $\\iff$ 乘 $z^{-k}$'],
      ] },

    { t: 'md', c: String.raw`
      ==注意「乘指数」与「平移」这一对是**对偶**的==：
      在时域乘指数 $\to$ 频域平移；在时域平移 $\to$ 频域乘指数。
      两个方向都成立，这正是傅里叶 / 拉普拉斯变换"对称性"的一部分。

      这条线属于[同构结构](#/threads/map/overview?at=action-vs-pattern)那一层 ——
      载体从算子换成复变量 $s$、角频率 $\omega$、离散变量 $z$，
      ==代数骨架一字未动==。考研只需要认得第一行，但知道后面几行的存在，
      能让第一行从"要背的公式"变成"一个自然的推论"。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **任意常数个数不等于阶数**：$n$ 阶方程的齐次通解必须有 $n$ 个独立常数，写完数一遍。
      2. **$k$ 定错**：见[上面那条](#/calculus/ode/linear-const?at=k-trap)，
         纯多项式右端要记得 $a=0$，三角右端要用 $a+i\beta$ 去比。
      3. **忘记叠加原理**：右端是几项之和时分别求特解再相加，硬凑一个统一形式会很痛苦。
      4. **复根的通解写成复指数**：实系数方程要写成 $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ 的实形式。
      5. **算子法里把 $D$ 换成 $b$ 处理三角函数**：==只能把 $D^{2}$ 换成 $-b^{2}$==。
      6. **逆算子积分时带上常数**：$\frac1D$ 只取一个原函数，
         积分常数属于齐次通解，写进特解就重复了。
      7. **直接在卷面上用算子记号**：超纲，建议按[考场建议](#/calculus/ode/linear-const?at=exam-advice)处理。
    ` },

  ],
});
