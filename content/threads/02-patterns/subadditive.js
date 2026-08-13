/* ==========================================================================
   跨章节手法主线 / 同构结构 / 次可加性
   ========================================================================== */

KM.page({
  path: 'threads/patterns/subadditive',
  title: '次可加性：整体 ≤ 部分之和',
  subtitle: '积分的绝对值不等式、矩阵秩、概率加法、维数公式 —— 同一个代数骨架的四副面孔',
  tags: ['专题', '概念辨析'],
  updated: '2026-08-10',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'discovery', c: '一、你发现的那个结构' },

    { t: 'insight', id: 'my-observation', title: '我的观察：积分和矩阵秩长得一模一样', c: String.raw`
      假如我们对 $f(x)+g(x)$ 先取绝对值再积分，它应该是
      $$\int\left|f+g\right|\le\int\left|f\right|+\int\left|g\right| ,$$
      而线性代数里不也有 $r(A+B)\le r(A)+r(B)$ 吗？
      ==我知道这背后的原理不同，但是这里的代数结构是相似的呀。==

      ---

      **这个判断完全正确，而且它有名字**：这类性质叫**次可加性（subadditivity）**，
      几何原型就是三角不等式。统一写法是：

      $$\boxed{\ \varphi(x+y)\ \le\ \varphi(x)+\varphi(y)\ }$$

      其中 $\varphi$ 是某种衡量"大小 / 维度 / 占用空间"的量。

      **而"原理不同"这一点也可以说得更精确** —— 下面会看到，
      这些不等号背后其实==只有两种机制==：**重叠**和**抵消**。
      认出是哪一种，就知道等号什么时候成立、以及能不能反过来用。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'mechanism', c: '二、为什么会有这个 ≤：两种机制' },

    { t: 'key', id: 'two-mechanisms', title: '重叠型 vs 抵消型', c: String.raw`
      | | **重叠型** | **抵消型** |
      |---|---|---|
      | 谁属于这类 | 集合、维数、概率、矩阵秩 | 绝对值、积分、范数、标准差 |
      | 为什么 $\le$ | ==公共部分被算了两次== | ==正负可以互相抵消== |
      | 背后的等式 | 容斥原理 / 维数公式 | 无（只有不等式） |
      | 等号条件 | ==不重叠==（交为零） | ==不抵消==（同号 / 同向） |

      **重叠型的完整真相是一条等式**，不等式只是把负项扔掉：
      $$\left|A\cup B\right|=\left|A\right|+\left|B\right|-\left|A\cap B\right|\ \le\ \left|A\right|+\left|B\right|$$
      $$P(A\cup B)=P(A)+P(B)-P(AB)\ \le\ P(A)+P(B)$$
      $$\dim(V_1+V_2)=\dim V_1+\dim V_2-\dim(V_1\cap V_2)\ \le\ \dim V_1+\dim V_2$$

      ==三条式子形状完全一样==，这就是"矩阵秩为什么次可加"的真正来源：
      $C(A+B)\subseteq C(A)+C(B)$，而右边的维数被交集扣掉了一块。

      **抵消型没有对应的等式**，因为 $\left|a+b\right|$ 无法用 $\left|a\right|,\left|b\right|$ 精确表示 ——
      $a=1,b=-1$ 时左边是 $0$，右边是 $2$，差距全部来自符号相消。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'catalogue', c: '三、清单：考研范围内的次可加性' },

    { t: 'compare',
      id: 'catalogue-table',
      title: '同一骨架的各副面孔',
      cols: ['出处', '不等式', '机制', '等号条件'],
      rows: [
        ['实数 / 复数', '$\\left|a+b\\right|\\le\\left|a\\right|+\\left|b\\right|$', '抵消', '同号（同向）'],
        ['有限和', '$\\left|\\sum a_i\\right|\\le\\sum\\left|a_i\\right|$', '抵消', '全部同号'],
        ['定积分', '$\\left|\\int f\\right|\\le\\int\\left|f\\right|$', '抵消', '$f$ 不变号'],
        ['定积分', '$\\int\\left|f+g\\right|\\le\\int\\left|f\\right|+\\int\\left|g\\right|$', '抵消', '$f,g$ 处处同号'],
        ['级数', '$\\left|\\sum a_n\\right|\\le\\sum\\left|a_n\\right|$', '抵消', '绝对收敛且同号'],
        ['向量范数', '$\\left\\|\\alpha+\\beta\\right\\|\\le\\left\\|\\alpha\\right\\|+\\left\\|\\beta\\right\\|$', '抵消', '$\\beta=k\\alpha,\\;k>0$'],
        ['==矩阵秩==', '$r(A+B)\\le r(A)+r(B)$', '重叠', '列空间、行空间均只交于零'],
        ['子空间维数', '$\\dim(V_1+V_2)\\le\\dim V_1+\\dim V_2$', '重叠', '$V_1\\cap V_2=\\{0\\}$'],
        ['概率', '$P(A\\cup B)\\le P(A)+P(B)$', '重叠', '$P(AB)=0$'],
        ['概率（$n$ 项）', '$P\\!\\left(\\bigcup A_i\\right)\\le\\sum P(A_i)$', '重叠', '两两 $P(A_iA_j)=0$'],
        ['标准差', '$\\sigma(X+Y)\\le\\sigma(X)+\\sigma(Y)$', '抵消', '$X,Y$ 正线性相关'],
        ['最大特征值', '$\\lambda_{\\max}(A+B)\\le\\lambda_{\\max}(A)+\\lambda_{\\max}(B)$', '抵消', '最大方向重合'],
      ] },

    { t: 'key', id: 'eigen-case', title: '为什么最大特征值也次可加', c: String.raw`
      这一条看着最不像，但用[瑞利商](#/threads/lines/quadratic?at=eigen-extremum)一秒就通：

      $$\lambda_{\max}(A+B)=\max_{\left|\vec x\right|=1}\vec x^{\T}(A+B)\vec x
      =\max_{\left|\vec x\right|=1}\left(\vec x^{\T}A\vec x+\vec x^{\T}B\vec x\right)$$
      $$\le\max_{\left|\vec x\right|=1}\vec x^{\T}A\vec x+\max_{\left|\vec x\right|=1}\vec x^{\T}B\vec x
      =\lambda_{\max}(A)+\lambda_{\max}(B)$$

      关键那一步是==「和的最大值 $\le$ 最大值之和」==（两个 $\max$ 可以各自挑最优点，
      合起来那个 $\max$ 却必须用同一个 $\vec x$）。

      ==这本身就是一条最朴素的次可加性==，很多不等式的根都在这里。
    ` },

    { t: 'key', id: 'sigma-case', title: '一个漂亮的对照：方差不次可加，标准差次可加', c: String.raw`
      $$D(X+Y)=D(X)+D(Y)+2\operatorname{Cov}(X,Y)$$
      $\operatorname{Cov}$ 可正可负，所以 ==$D$ 根本不满足次可加性==（正相关时会超）。

      但开根号之后就满足了。由柯西–施瓦茨
      $\left|\operatorname{Cov}(X,Y)\right|\le\sigma(X)\sigma(Y)$：
      $$D(X+Y)\le\sigma_X^{2}+\sigma_Y^{2}+2\sigma_X\sigma_Y=\left(\sigma_X+\sigma_Y\right)^{2}
      \;\Longrightarrow\;\sigma(X+Y)\le\sigma(X)+\sigma(Y).$$

      **为什么**：==标准差是范数，方差是范数的平方==。
      次可加性属于"长度"，不属于"长度的平方"
      （就像 $\left|a+b\right|\le\left|a\right|+\left|b\right|$ 成立，
      但 $\left|a+b\right|^{2}\le\left|a\right|^{2}+\left|b\right|^{2}$ 不成立）。

      这也顺带解释了为什么统计里报告的是标准差而不是方差 —— ==量纲和加法性质都对得上==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'corollaries', c: '四、每条次可加性都自带三个推论' },

    { t: 'key', id: 'reverse', title: '推论 1：反向不等式（考得比正向还多）', c: String.raw`
      把 $x$ 写成 $(x+y)+(-y)$ 再套一次，就得到一个下界：

      $$\varphi(x)\le\varphi(x+y)+\varphi(-y)\;\Longrightarrow\;
      \varphi(x)-\varphi(y)\le\varphi(x+y)$$

      对称一下即得 ==反向三角不等式==：

      | 场景 | 反向形式 |
      |---|---|
      | 实数 | $\left|\,\left|a\right|-\left|b\right|\,\right|\le\left|a+b\right|$ |
      | 积分 | $\left|\int\left|f\right|-\int\left|g\right|\right|\le\int\left|f+g\right|$ |
      | 矩阵秩 | $\left|r(A)-r(B)\right|\le r(A+B)$ |
      | 范数 | $\left|\,\left\|\alpha\right\|-\left\|\beta\right\|\,\right|\le\left\|\alpha+\beta\right\|$ |

      ==线代大题里 $\left|r(A)-r(B)\right|\le r(A+B)$ 这个下界非常常用==，
      而它就是从次可加性两行推出来的，不必单独记。
    ` },

    { t: 'key', id: 'n-terms', title: '推论 2：自动推广到 $n$ 项', c: String.raw`
      次可加性对二项成立，用数学归纳法立刻推到任意有限项：
      $$\varphi\!\left(\sum_{i=1}^{n}x_i\right)\le\sum_{i=1}^{n}\varphi(x_i)$$

      于是
      $\left|\sum a_i\right|\le\sum\left|a_i\right|$、
      $r(A_1+\cdots+A_n)\le\sum r(A_i)$、
      $P\!\left(\bigcup A_i\right)\le\sum P(A_i)$（布尔不等式）
      全都是免费赠品，==不需要分别记忆==。

      对可数无穷项，概率的次可加性依然成立（概率测度的基本性质），
      这正是"零测集的可数并仍是零测集"的来源。
    ` },

    { t: 'key', id: 'equality', title: '推论 3：等号条件都是同一句话', c: String.raw`
      不管哪一副面孔，等号成立都等价于==「没有浪费」==：

      - **抵消型**：$\varphi(x+y)=\varphi(x)+\varphi(y)\iff$ 二者==同向，没有相消==
        （同号、正倍数、正线性相关）；
      - **重叠型**：$\iff$ 二者==没有公共部分==（交集为零、互斥、空间只交于零向量）。

      ==做题时"取等条件"往往就是题目的突破口==：
      看到 $r(A+B)=r(A)+r(B)$ 这样的已知条件，
      立刻应该翻译成"$A$ 与 $B$ 的列空间、行空间都只交于零"；
      看到 $\int\left|f+g\right|=\int\left|f\right|+\int\left|g\right|$，
      立刻翻译成"$f$ 与 $g$ 处处同号"。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'boundary', c: '五、边界：哪些「大小」不是次可加的' },

    { t: 'warn', id: 'not-subadditive', title: '不要过度推广', c: String.raw`
      看到"某种大小"就往次可加上套是危险的。下面几个==都不满足==：

      | 量 | 反例 |
      |---|---|
      | **行列式** | $A=B=E_2$：$\left|A+B\right|=\left|2E\right|=4$，而 $\left|A\right|+\left|B\right|=2$ |
      | **方差** | $Y=X$ 时 $D(2X)=4D(X)>2D(X)$ |
      | **范数的平方** | $\left\|\alpha+\beta\right\|^{2}\le\left\|\alpha\right\|^{2}+\left\|\beta\right\|^{2}$ 一般不成立 |
      | **矩阵的迹？** | $\operatorname{tr}$ 是==严格可加==的：$\operatorname{tr}(A+B)=\operatorname{tr}A+\operatorname{tr}B$，取等而非不等 |

      **判据**：次可加性属于==一次齐次==的"长度型"量
      （$\varphi(kx)=\left|k\right|\varphi(x)$）。
      一旦这个量对数乘是二次的（方差、行列式、范数平方），次可加性就会失效。
      ==先检查齐次次数，再决定能不能套。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'neighbors', c: '六、邻居结构：同一族的其他骨架' },

    { t: 'md', c: String.raw`
      次可加性只是"整体 $\le$ 部分"这一大类里最常见的一条。同族还有：

      | 骨架 | 形式 | 例子 |
      |---|---|---|
      | **次可乘性** | $\varphi(xy)\le\varphi(x)\varphi(y)$ 或 $\le\min$ | $r(AB)\le\min\{r(A),r(B)\}$ |
      | **下界型（反向）** | $\varphi(x)+\varphi(y)-c\le\varphi(x\cdot y)$ | 西尔维斯特：$r(A)+r(B)-n\le r(AB)$ |
      | **容斥（精确版）** | 等式，带交集修正项 | $P(A\cup B)=P(A)+P(B)-P(AB)$ |
      | **柯西–施瓦茨** | $\left\|\langle x,y\rangle\right\|\le\left\|x\right\|\left\|y\right\|$ | [单独一页详述](#/threads/patterns/cauchy-schwarz) |
      | **闵可夫斯基** | $L^{p}$ 范数的三角不等式 | $\left(\int\left|f+g\right|^{2}\right)^{1/2}\le\left(\int f^{2}\right)^{1/2}+\left(\int g^{2}\right)^{1/2}$ |

      ==柯西–施瓦茨和闵可夫斯基的关系值得留意==：前者是"内积被范数控制"，
      后者是"范数满足三角不等式"，而闵可夫斯基的标准证明正是靠柯西–施瓦茨 ——
      和上面[标准差那一条](#/threads/patterns/subadditive?at=sigma-case)的推导一字不差。

      **所以这两页不是并列关系，而是有因果的**：
      $$\text{内积（柯西–施瓦茨）}\to\text{范数（三角不等式）}\to\text{本页的次可加性}$$
      推导只有三行，见
      [柯西–施瓦茨 ⟹ 三角不等式](#/threads/patterns/cauchy-schwarz?at=implies-triangle)。

      **跨出数学之外**：图论里的最短路 $d(u,v)\le d(u,w)+d(w,v)$ 也是同一个骨架，
      Dijkstra 的"松弛"操作就是反复用这条不等式去逼近真值。
      ==同一个代数结构，换个载体就是另一个学科的核心算法。==
    ` },

  ],
});
