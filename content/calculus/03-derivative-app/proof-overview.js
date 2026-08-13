/* ==========================================================================
   高等数学 / 3 微分中值定理与导数应用 / 证明题总纲
   —— 这一页是索引，大量链接指向别页的具体块，链接务必带 ?at= 精确到块。
   ========================================================================== */

KM.page({
  path: 'calculus/derivative-app/proof-overview',
  title: '证明题总纲：工具箱与构造技巧',
  subtitle: '导数与积分综合证明题的全局地图 —— 有哪些定理、有哪些手法、什么时候用哪个',
  tags: ['大题', '证明题', '高频', '总纲'],
  updated: '2026-08-13',

  blocks: [

    { t: 'md', c: String.raw`
      这一页是**索引和决策地图**，不展开具体推导 ——
      每条链接都直接落到对应专题的那一块，不是页面开头。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'toolbox', c: '一、工具箱：三组定理' },

    { t: 'md', c: String.raw`
      证明题的所有推导，最终都要落在这三组定理之一上。
      ==先判断结论里出现的是 $f(\xi)$、$f'(\xi)$ 还是积分==，就知道该从哪一组里挑工具。
    ` },

    { t: 'key', id: 'continuous-group',
      title: '第 1 组｜连续函数（结论里只有 $f(\\xi)$，不含导数）', c: String.raw`
      | 定理 | 干什么用 |
      |---|---|
      | **零点定理** | 证明 $f(\xi)=0$ 有解 |
      | **介值定理** | 证明 $f(\xi)=C$ 有解（$C$ 介于两个函数值之间） |
      | **最值定理** | 断言最大最小值存在 —— 是放缩法和费马引理的前提 |
      | **有界性定理** | 积分估值、级数放缩的地基 |
      | **[局部保号性](#/calculus/limit/sign-preserving?at=definition)** | 不是定理而是入口：把极限条件兑换成一个符号已知的点，喂给上面几条 |

      四条的完整表述见
      [闭区间连续函数四大定理](#/calculus/limit/closed-interval?at=four-theorems)。
    ` },

    { t: 'key', id: 'mvt-group',
      title: '第 2 组｜微分中值定理（结论里含 $f\'(\\xi)$ 或更高阶）', c: String.raw`
      | 定理 | 用在什么场合 |
      |---|---|
      | **费马引理** | 可导 + 内部取极值 $\Rightarrow f'(x_0)=0$。==从「最值在内部」跳到「导数为零」的唯一通道== |
      | **罗尔** | 一切辅助函数构造的终点 |
      | **拉格朗日** | 把 $f(b)-f(a)$ 和 $f'(\xi)$ 挂上钩 |
      | **柯西** | 处理两个增量的比值 $\dfrac{f(b)-f(a)}{g(b)-g(a)}=\dfrac{f'(\xi)}{g'(\xi)}$ |
      | **泰勒** | 结论里出现 $f''(\xi)$ 及以上，或已知多点的函数值 |

      条件的精确形式见
      [中值定理证明题 · 四大中值定理](#/calculus/derivative-app/mvt-proof?at=four-theorems)。

      泰勒余项怎么选：==局部问题（极值、拐点）用皮亚诺余项；
      全局问题（最值、不等式、存在点）用拉格朗日余项== ——
      判据见 [泰勒公式类证明 · 两种余项](#/calculus/derivative-app/taylor-proof?at=remainder)。
    ` },

    { t: 'key', id: 'integral-group',
      title: '第 3 组｜积分中值定理（条件或结论里含积分）', c: String.raw`
      **第一积分中值定理**：$f$ 连续、$g$ ==不变号==，则存在 $\xi\in[a,b]$ 使
      $$\int_a^b f(x)g(x)\dx=f(\xi)\int_a^b g(x)\dx .$$

      最常见的用法不是"算"，而是==从积分条件里逼出一个零点==：
      $$\int_a^b f(x)\dx=0 \;\Longrightarrow\; \exists\,c\in(a,b),\ f(c)=0 .$$
      这一步经常是整道大题的突破口 —— 题目给你一个积分等式，实际是在偷偷送你一个零点。

      它本身是靠介值定理证出来的，套路见
      [介值定理的考法](#/calculus/limit/closed-interval?at=use-ivt)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'construct', c: '二、辅助函数的四类构造手法' },

    { t: 'md', c: String.raw`
      证明题的难点几乎全在**如何无中生有地造出 $F(x)$**。手法只有下面四类。
    ` },

    { t: 'method', id: 'reverse-ode', title: '手法 1｜微分方程逆向构造（最常用）', c: String.raw`
      把结论里的 $\xi$ 换成 $x$，看它是不是某个函数的导数。按结构分两族：

      **加法族**（乘一个指数或幂因子）

      | 待证结论 | 辅助函数 $F(x)$ |
      |---|---|
      | $f'(\xi)+g'(\xi)=0$ | $f(x)+g(x)$ |
      | $f'(\xi)+kf(\xi)=0$ | $e^{kx}f(x)$ |
      | $f'(\xi)+g(\xi)f(\xi)=0$ | $e^{\int g(x)\dx}f(x)$（积分因子） |
      | $\xi f'(\xi)+nf(\xi)=0$ | $x^{n}f(x)$ |

      **减法 / 商族**（除以一个因子）

      | 待证结论 | 辅助函数 $F(x)$ |
      |---|---|
      | $f'(\xi)g(\xi)-f(\xi)g'(\xi)=0$ | $\dfrac{f(x)}{g(x)}$ |
      | $\xi f'(\xi)-nf(\xi)=0$ | $\dfrac{f(x)}{x^{n}}$ |

      记不住表也没关系 ——
      [积分因子法](#/calculus/derivative-app/mvt-proof?at=integrating-factor)
      能在考场上现推出每一行，
      [三步操作](#/calculus/derivative-app/mvt-proof?at=if-steps)是机械的。
    ` },

    { t: 'method', id: 'antiderivative', title: '手法 2｜原函数积分法（条件含积分、结论含导数时）', c: String.raw`
      当已知条件里出现 $\displaystyle\int_a^b f(x)\dx$，或结论里出现变限积分时，直接令
      $$F(x)=\int_a^{x} f(t)\dt .$$
      目的是==把 $f$ 降一阶变成 $F'$==，于是积分条件变成 $F$ 的端点条件（常常是 $F(a)=F(b)=0$），
      接下来就是标准的罗尔定理。

      口诀：**条件里有积分 → 先设原函数，把积分条件翻译成端点条件。**
    ` },

    { t: 'method', id: 'param-k', title: '手法 3｜参数 $k$ 法（结论形式不标准时）', c: String.raw`
      结论形如 $H\!\left(f'(\xi),g'(\xi),f(\xi),g(\xi)\right)=0$ 却套不进任何现成定理时：

      1. 把结论中由端点决定的那一坨记为常数 $k$，解出 $k$ 的表达式；
      2. 改写成 $F(x)=f(x)-k\,g(x)$；
      3. 验证 $F(a)=F(b)$，用罗尔定理。

      柯西中值定理本身就是用这个办法证出来的，所以它能覆盖柯西的各种变体。
      最朴素的样子是
      [介值定理退化成零点定理](#/calculus/limit/closed-interval?at=proof-ivt)。
    ` },

    { t: 'method', id: 'operator', title: '手法 4｜微分算子法（结论含二阶及以上导数时）', c: String.raw`
      结论形如 $f''(\xi)+pf'(\xi)+qf(\xi)=0$ 时，写出特征方程 $\lambda^2+p\lambda+q=0$，
      求出根 $\lambda_1,\lambda_2$，辅助函数就被==彻底定死==，不需要任何灵感。

      核心法则见
      [遇到因子 $(D-k)$ 就乘 $e^{-kx}$](#/calculus/derivative-app/mvt-proof?at=operator-rule)，
      通法见 [动作流与通法](#/calculus/derivative-app/mvt-proof?at=operator-recipe)，
      完整例题见 [算子法压轴题](#/calculus/derivative-app/mvt-proof?at=ex-operator)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'routes', c: '三、题型分类与首选策略' },

    { t: 'compare',
      id: 'route-table',
      title: '按结论的形状选路线',
      cols: ['结论长什么样', '首选路线', '关键动作'],
      rows: [
        ['只含 $f(\\xi)$', '零点定理 / 介值定理', '找一正一负两个点'],
        ['问根的个数', '[驻点分段 + 逐段零点定理](#/calculus/derivative-app/roots?at=monotone-split)', '单调段数 = 根数上界'],
        ['含 $f\'(\\xi)$，单个中值', '罗尔 + 逆向构造 $F$', '把结论当微分方程解'],
        ['含 $f(b)-f(a)$', '拉格朗日', '直接套'],
        ['含 $g(b)-g(a)$ 或两个差商之比', '柯西', '反推出 $g$'],
        ['含 $f\'\'(\\xi)$ 及以上', '泰勒 / 反复罗尔 / 算子法', '找够 $n+1$ 个零点，或在特定点展开'],
        ['两个中值 $\\xi\\neq\\eta$（不联动）', '找分点 $c$，两段各用一次', '分点常由介值定理产生'],
        ['两个中值（同一等式内联动）', '柯西，或分离变量后各自处理', '先把式子拆成两边形式相同'],
        ['不等式', '单调性 / 泰勒放缩 / 柯西-施瓦茨', '移项构造 $F$，看 $F$ 的单调性'],
        ['出现 $\\abs{f\'(x)}\\le M$ 这类导数的界',
         '[锥形包络 + 取等刚性](#/calculus/derivative-app/derivative-bound?at=envelope)',
         '不等式一半靠包络，另一半靠取等条件把形状锁死'],
      ] },

    { t: 'key', id: 'high-order', title: '高阶导数题的两条路', c: String.raw`
      结论里出现 $f^{(n)}(\xi)$ 时只有两种打法：

      1. **反复罗尔**：凑出 $n+1$ 个零点，逐次求导降阶。零点可以来自
         已知函数值、积分条件逼出的隐藏零点（见上一节第 3 组）、或前一问的结论。
         [算子法](#/calculus/derivative-app/mvt-proof?at=operator-factor)
         正是这条路的机械化版本 —— 特征方程有几个根，就罗尔几次。
      2. **泰勒展开**：已知多处函数值 / 导数值时，在合适的点展开后==相加或相减消项==。
         端点展开相减 → 消去一阶项；中点展开 → 对称性最好。
         选点规则见
         [泰勒 · 决策 3](#/calculus/derivative-app/taylor-proof?at=which-points)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'advanced', c: '四、略超考研的三件武器' },

    { t: 'key', id: 'darboux', title: '达布定理（导函数介值定理）', c: String.raw`
      $f$ 在 $[a,b]$ 上可导，则 ==即使 $f'$ 不连续==，$f'$ 也能取到
      $f'_+(a)$ 与 $f'_-(b)$ 之间的任何值。

      **用法**：要证存在 $\xi$ 使 $f'(\xi)=C$，若构造辅助函数困难，
      改为证明 $f'(x_1)<C<f'(x_2)$，直接由达布定理得证。
      完整证明见
      [中值定理证明题 · 达布定理例题](#/calculus/derivative-app/mvt-proof?at=ex-darboux)。
    ` },

    { t: 'key', id: 'second-imvt', title: '第二积分中值定理', c: String.raw`
      $f$ 可积、$g$ ==单调==，则存在 $\xi\in[a,b]$ 使
      $$\int_a^b f(x)g(x)\dx=g(a)\int_a^{\xi}f(x)\dx+g(b)\int_{\xi}^{b}f(x)\dx .$$
      用于分离单调权重函数的振荡积分放缩。考研正题几乎不用，属于压轴题的保险。
    ` },

    { t: 'key', id: 'cauchy-schwarz', title: '柯西–施瓦茨积分不等式', c: String.raw`
      $$\left(\int_a^b f(x)g(x)\dx\right)^{2}\le\int_a^b f^{2}(x)\dx\cdot\int_a^b g^{2}(x)\dx .$$
      取 $g\equiv 1$ 得到最常用的形式
      $\left(\int_a^b f\dx\right)^2\le (b-a)\int_a^b f^2\dx$。
      面积类、能量类积分不等式用它是降维打击。

      它的**离散形式**同样好用 —— 一次约束下求平方和最值可以一步出答案，见
      [条件极值 · 柯西秒杀](#/calculus/multi-derivative/extremum?at=cauchy-quadratic)。

      为什么离散、积分、概率三个版本长得一模一样、取等条件也一样，
      见[柯西–施瓦茨的统一结构](#/threads/patterns/cauchy-schwarz?at=one-proof)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'checklist', c: '五、考场决策链路' },

    { t: 'steps', id: 'three-questions', title: '拿到题先问这三句', items: [
      { title: '结论在第几阶？',
        c: String.raw`只有 $f(\xi)$ → 连续函数定理；有 $f'(\xi)$ → 中值定理；
                      有 $f''(\xi)$ 以上 → 泰勒或算子法。
                      ==条件和结论阶数不一致时，就是在提示你设原函数或求导==。` },
      { title: '有几个中值？',
        c: String.raw`一个 $\xi$ → 逆推辅助函数 + 罗尔。
                      两个 $\xi,\eta$ → 先找分点把区间劈开，或用柯西。
                      范例见 [双中值例题](#/calculus/derivative-app/mvt-proof?at=ex-double)。` },
      { title: '隐藏条件在哪？',
        c: String.raw`- 给了积分等式 → 十有八九是在送你一个零点
                      - 给了 $f''(x)>0$ → 不只是凹凸性，更说明 $f'$ ==单调==，零点至多一个
                      - 给了极限条件 → 用[局部保号性](#/calculus/limit/sign-preserving?at=use-extract)
                        挖出一个区间内的定号点，
                        [标准动作在这里](#/calculus/derivative-app/mvt-proof?at=ex-operator)` },
    ] },

    { t: 'warn', id: 'attitude', title: '这类题最容易踩的空', c: String.raw`
      证明题的套路化程度很高，容易产生「扫一眼觉得思路熟悉就跳过」的错觉。
      但真正的杀机在==辅助函数的代数变形==和==端点放缩的精度==上 ——
      知道"该用罗尔定理"离拿分还差很远，考场上卡死的地方往往是端点值算不出异号。
      ==必须落笔写完整的闭环==，只在脑子里过一遍等于没做。
    ` },

  ],
});
