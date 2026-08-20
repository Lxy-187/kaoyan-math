/* ==========================================================================
   概率论 / 4 随机变量的数字特征 / 协方差与相关系数
   —— 协方差度量"共同波动"，相关系数是它的无量纲版本，只看线性关系。
      二维正态下的特权见 multi-random-var/normal-2d。
   ========================================================================== */

KM.page({
  path: 'probability/moments/covariance',
  title: '协方差与相关系数',
  subtitle: '$\\Cov$ 度量**共同波动**，$\\rho$ 是它的无量纲版本。要记牢的一句：$\\rho$ 只看得见**线性**关系',
  tags: ['小题', '大题', '概念辨析', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'cov-def', title: '定义与计算公式', c: String.raw`
      $$\Cov(X,Y)=\E\bigl[(X-\E X)(Y-\E Y)\bigr]$$

      **展开即得计算公式**（==实际计算几乎只用这一条==）：
      $$\boxed{\ \Cov(X,Y)=\E(XY)-\E X\cdot\E Y\ }$$

      **读法**：把两个变量各自减去均值，得到"偏离量"；
      协方差是==两个偏离量乘积的平均==。

      - 两者常常==同时偏高、同时偏低== $\Rightarrow$ 乘积多为正 $\Rightarrow$ $\Cov>0$；
      - 一个偏高时另一个常偏低 $\Rightarrow$ $\Cov<0$；
      - 正负抵消 $\Rightarrow$ $\Cov=0$，称 $X,Y$ **不相关**。

      **量纲问题**：$\Cov$ 的量纲是 $X$ 与 $Y$ 量纲的乘积，
      ==所以它的绝对大小没有可比性==（把身高从米换成厘米，协方差就变了 $100$ 倍）。
      这正是要引入无量纲的[相关系数](#/probability/moments/covariance?at=rho-def)的原因。

      **与方差的关系**：$\Cov(X,X)=\Var X$。
      ==方差是协方差的特例==，这个观察让下面的双线性性质一次性覆盖两者。
    ` },

    { t: 'key', id: 'cov-props', title: '性质：像内积一样双线性', c: String.raw`
      $$\Cov(X,Y)=\Cov(Y,X)\qquad(\text{对称性})$$
      $$\Cov(X,X)=\Var X\qquad \Cov(X,c)=0\quad(c\ \text{为常数})$$
      $$\Cov(aX+b,\ cY+d)=ac\,\Cov(X,Y)\qquad(\text{==常数项完全消失==})$$
      $$\Cov\!\left(\sum_i a_iX_i,\ \sum_j b_jY_j\right)=\sum_i\sum_j a_ib_j\,\Cov(X_i,Y_j)$$

      ==最后一条是"像多项式乘法一样逐项展开"==，是本节最实用的性质。
      比如
      $$\Cov(X+Y,\ X-Y)=\Cov(X,X)-\Cov(X,Y)+\Cov(Y,X)-\Cov(Y,Y)=\Var X-\Var Y.$$
      ==注意中间两项相消==（对称性），结果只剩两个方差之差。
      这个结论有个漂亮的推论：==$\Var X=\Var Y$ 时 $X+Y$ 与 $X-Y$ 一定不相关==。

      **方差公式由此统一**：
      $$\Var(X\pm Y)=\Cov(X\pm Y,\ X\pm Y)=\Var X+\Var Y\pm2\Cov(X,Y).$$
      ==不必单独记方差的加法公式，展开协方差就出来了==，
      见[方差的性质](#/probability/moments/expectation?at=var-props)。

      **这套性质与内积完全同构**：对称、双线性、$\Cov(X,X)\ge0$。
      所以下面那条 $\abs\rho\le1$ 就是==内积被范数控制==的老熟人，
      见[柯西–施瓦茨的四副面孔](#/threads/patterns/cauchy-schwarz?at=four-faces)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'rho-sec', c: '一、相关系数' },

    { t: 'key', id: 'rho-def', title: '定义：标准化之后的协方差', c: String.raw`
      设 $\Var X>0$，$\Var Y>0$，
      $$\boxed{\ \rho_{XY}=\frac{\Cov(X,Y)}{\sqrt{\Var X}\,\sqrt{\Var Y}}\ }$$

      **等价的看法**：先把两个变量[标准化](#/probability/moments/expectation?at=var-props)
      $X^{*}=\frac{X-\E X}{\sqrt{\Var X}}$、$Y^{*}=\frac{Y-\E Y}{\sqrt{\Var Y}}$，则
      $$\rho_{XY}=\Cov(X^{*},Y^{*})=\E(X^{*}Y^{*}).$$
      ==相关系数就是"标准化之后的协方差"==，因此无量纲、不受单位影响。

      **对线性变换的不变性**：
      $$\rho_{aX+b,\ cY+d}=\operatorname{sgn}(ac)\cdot\rho_{XY}\qquad(a,c\ne0)$$
      ==绝对值完全不变，只有当 $a,c$ 异号时翻个符号==。
      这条性质是选择题的常客："已知 $\rho_{XY}=0.5$，求 $\rho_{2X+1,\,-3Y}$"，
      答案是 $-0.5$。
    ` },

    { t: 'key', id: 'rho-bounds', title: '$\\abs\\rho\\le1$ 的两行证明', c: String.raw`
      $$\boxed{\ -1\le\rho_{XY}\le1\ }$$

      **证明（比背结论有用）**：对标准化后的 $X^{*},Y^{*}$（各自方差为 $1$），
      $$0\le\Var(X^{*}\pm Y^{*})=\Var X^{*}+\Var Y^{*}\pm2\Cov(X^{*},Y^{*})=2\pm2\rho.$$
      取加号得 $\rho\ge-1$，取减号得 $\rho\le1$。$\blacksquare$

      ==全部依据只有"方差非负"这一条==。

      **取等的含义**：$\abs\rho=1\iff\Var(X^{*}\mp Y^{*})=0
      \iff X^{*}\mp Y^{*}$ 几乎处处是常数，即
      $$\abs{\rho_{XY}}=1\iff P(Y=aX+b)=1\ \text{对某组}\ a\ne0,b\ \text{成立}.$$
      $\rho=1$ 对应 $a>0$（完全正线性），$\rho=-1$ 对应 $a<0$。

      ==所以 $\rho$ 度量的是"离一条直线有多近"==，
      而不是"依赖有多强"。这个区别是下一条的全部内容。

      **它就是柯西–施瓦茨**：把 $\Cov$ 看成内积，
      $\abs{\Cov(X,Y)}\le\sqrt{\Var X}\sqrt{\Var Y}$
      就是 $\abs{\langle u,v\rangle}\le\norm u\norm v$，
      见[相关系数那一节](#/threads/patterns/cauchy-schwarz?at=rho)。
    ` },

    { t: 'key', id: 'rho-meaning', title: '★ $\\rho$ 只看得见线性关系', c: String.raw`
      $$\rho=0\ \text{只说明"没有线性关系"，绝不说明"没有关系"。}$$

      **最短的反例**：$X\sim U(-1,1)$，$Y=X^{2}$。
      $$\E X=0,\quad \E X^{3}=0\ (\text{奇函数})\ \Longrightarrow\
      \Cov(X,Y)=\E X^{3}-\E X\,\E X^{2}=0,$$
      ==但 $Y$ 完全由 $X$ 决定==，依赖关系强到不能再强。

      **原因**：$\Cov$ 是把 $(X-\E X)(Y-\E Y)$ 平均。
      $Y=X^{2}$ 时，$X$ 取 $+t$ 和 $-t$ 给出==相同的 $Y$ 偏离量、相反的 $X$ 偏离量==，
      乘积正负对称，一平均就抵消干净了。
      ==对称的非线性关系，在协方差眼里是完全隐形的。==

      **一句总结**：
      | $\rho$ 的值 | 含义 |
      |---|---|
      | $\rho=\pm1$ | ==严格的线性关系== |
      | $\rho\ne0$ | 存在线性成分 |
      | $\rho=0$ | ==没有线性成分，非线性关系不排除== |

      读 $\rho$ 时还有一个更精细的指标：$\rho^{2}$ 是
      "$Y$ 的波动中能被 $X$ 线性解释的比例"——
      这正是[二维正态条件方差](#/probability/multi-random-var/normal-2d?at=marginal-normal)
      $\sigma_2^{2}(1-\rho^{2})$ 里那个 $1-\rho^{2}$ 的含义。
    ` },

    { t: 'warn', id: 'indep-vs-uncorrelated', title: '★ 独立与不相关：单向箭头', c: String.raw`
      $$\boxed{\ \text{独立}\ \Longrightarrow\ \text{不相关},\qquad
      \text{不相关}\ \not\Longrightarrow\ \text{独立}\ }$$

      **正向为什么成立**：独立时 $\E(XY)=\E X\E Y$
      （见[独立对函数封闭](#/probability/multi-random-var/independence?at=indep-of-functions)），
      故 $\Cov=0$。

      **反向为什么不成立**：不相关只管住了"线性"这一个方向，
      ==而独立要求所有方向都无关==。
      $Y=X^{2}$ 就是现成的反例。

      **不相关的四个等价说法**（会互相翻译，选择题就稳了）：
      $$\Cov(X,Y)=0\iff\rho_{XY}=0\iff\E(XY)=\E X\,\E Y
      \iff\Var(X\pm Y)=\Var X+\Var Y$$
      ==最后一条最常被忽略==：题目给"$\Var(X+Y)=\Var X+\Var Y$"，
      就等于告诉了你"不相关"。

      **唯一的例外：二维正态**。
      当 $(X,Y)$ 服从二维正态时，
      [$\rho=0\iff$ 独立](#/probability/multi-random-var/normal-2d?at=rho-zero-indep)。
      ==但前提必须是"联合正态"，只知道两个边缘正态是不够的==，
      见那个[同时打掉两个错觉的构造](#/probability/multi-random-var/normal-2d?at=ex-counterexample)。

      **一句话记住强弱**：==独立是"全方位无关"，不相关只是"线性方向上无关"==。
      前者严格强于后者，所以箭头只能从左往右走：
      $$\text{独立}\ \xrightarrow{\ \text{总成立}\ }\ \text{不相关}
      \ \xrightarrow{\ \text{仅二维正态}\ }\ \text{独立}$$
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '二、例题' },

    { t: 'example',
      id: 'ex-cov',
      title: '连续型求 $\\Cov$ 与 $\\rho$：一套完整流程',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $(X,Y)$ 的联合密度为
        $$f(x,y)=\begin{cases}8xy,&0<y<x<1\\0,&\text{其他}\end{cases}$$
        求 $\Cov(X,Y)$ 与 $\rho_{XY}$。
      `,
      idea: String.raw`
        **需要五个数**：$\E X,\ \E Y,\ \E(XY),\ \E X^{2},\ \E Y^{2}$。
        算完这五个，协方差和相关系数都是套公式。

        **两条路线，选省事的那条**：

        - 用[已经算好的边缘密度](#/probability/multi-random-var/joint?at=ex-marginal)
          $f_X=4x^{3}$、$f_Y=4y(1-y^{2})$ 算四个一维积分；
        - 或者全部用二重积分算。

        ==前者更快==，因为一维积分不用定二重积分限。
        $\E(XY)$ 必须用二重积分（它同时牵涉两个变量），
        由[无意识统计学家法则](#/probability/moments/expectation?at=lotus)
        ==不需要先求 $XY$ 的分布==。

        **预判符号**：支撑区域 $0<y<x<1$ 里，$x$ 大的时候 $y$ 的可取范围也大，
        ==两者倾向于同增==，所以 $\Cov$ 应当为正。
        算出负数就一定错了。
      `,
      solution: String.raw`
        边缘密度（[上一章已求](#/probability/multi-random-var/joint?at=ex-marginal)）：
        $$f_X(x)=4x^{3}\ (0<x<1),\qquad f_Y(y)=4y(1-y^{2})\ (0<y<1).$$

        **一阶矩**：
        $$\E X=\int_0^1 x\cdot4x^{3}\dx=\frac45,\qquad
        \E Y=\int_0^1 y\cdot4y(1-y^{2})\dy=\frac43-\frac45=\frac{8}{15}.$$

        **二阶矩**：
        $$\E X^{2}=\int_0^1 4x^{5}\dx=\frac23,\qquad
        \E Y^{2}=\int_0^1\bigl(4y^{3}-4y^{5}\bigr)\dy=1-\frac23=\frac13.$$

        **交叉矩**（二重积分，先对 $y$ 后对 $x$）：
        $$\E(XY)=\int_0^1\!\!\int_0^{x}xy\cdot8xy\dy\dx
        =\int_0^1 8x^{2}\cdot\frac{x^{3}}{3}\dx=\frac83\cdot\frac16=\frac49.$$

        **协方差**：
        $$\Cov(X,Y)=\frac49-\frac45\cdot\frac{8}{15}=\frac{100}{225}-\frac{96}{225}
        =\boxed{\frac{4}{225}}>0.\ \checkmark$$

        **方差**：
        $$\Var X=\frac23-\frac{16}{25}=\frac{2}{75}=\frac{6}{225},\qquad
        \Var Y=\frac13-\frac{64}{225}=\frac{11}{225}.$$

        **相关系数**：
        $$\rho_{XY}=\frac{4/225}{\sqrt{\dfrac{6}{225}\cdot\dfrac{11}{225}}}
        =\frac{4/225}{\sqrt{66}/225}=\boxed{\dfrac{4}{\sqrt{66}}}\approx0.492.$$
      `,
      comment: String.raw`
        **通分的小技巧**：把所有方差、协方差都写成分母 $225$ 的形式，
        ==$225$ 在最后一步整体约掉==，避免了小数运算。
        一般地，$\rho$ 的计算里==分母的公因子必然消掉==，
        所以先别急着化简，留着公分母反而快。

        **结果的合理性**：$\rho\approx0.49$，正相关但远不到 $1$——
        与"$x$ 越大 $y$ 的活动范围越大，但并非线性绑定"的图像吻合。

        **两个常见追问**：

        - **$X,Y$ 是否独立**？==不独立==（支撑是三角形），
          见[矩形支撑判据](#/probability/multi-random-var/independence?at=rect-support)。
          这里 $\rho\ne0$ 也直接给出了"不独立"。
        - **求 $\Var(X+Y)$**？
          $$\Var(X+Y)=\frac{6}{225}+\frac{11}{225}+2\cdot\frac{4}{225}=\frac{25}{225}=\frac19.$$
          ==别忘了 $2\Cov$ 这一项。==

        **流程模板（照抄即可）**：
        求边缘 $\to$ 四个一维积分 $\to$ 一个二重积分 $\to$ 代公式 $\to$ 检查符号。
      `,
    },

    { t: 'example',
      id: 'ex-uncorrelated-not-indep',
      title: '不相关但不独立：最短的反例',
      source: '经典反例（选择题必备）',
      level: 2,
      problem: String.raw`
        设 $X\sim U(-1,1)$，令 $Y=X^{2}$。

        1. 求 $\Cov(X,Y)$，判断 $X$ 与 $Y$ 是否相关；
        2. 判断 $X$ 与 $Y$ 是否独立。
      `,
      idea: String.raw`
        **第 1 问的关键是对称性**：$X$ 的密度在 $(-1,1)$ 上是==偶函数==，
        所以任何奇次矩都是 $0$：$\E X=0$，$\E X^{3}=0$。
        而 $\Cov(X,X^{2})=\E X^{3}-\E X\cdot\E X^{2}$ ==两项都含奇次矩，全为零==。
        ==一眼就能看出答案，不用真算积分。==

        **第 2 问几乎不需要计算**：$Y$ 是 $X$ 的函数，
        知道 $X$ 就完全知道 $Y$，==这已经是最强的依赖==。
        要严格证明"不独立"，只需找一对具体的事件让乘法公式失败——
        选取值范围能明显互相限制的事件即可，比如
        $\set{\abs X<\frac12}$ 与 $\set{Y<\frac14}$，==它们其实是同一个事件==。
      `,
      solution: String.raw`
        $X$ 的密度 $f(x)=\frac12$（$-1<x<1$），是偶函数。

        **(1)** 由奇函数在对称区间上积分为零：
        $$\E X=\int_{-1}^{1}\frac x2\dx=0,\qquad
        \E(XY)=\E X^{3}=\int_{-1}^{1}\frac{x^{3}}{2}\dx=0.$$
        故
        $$\Cov(X,Y)=\E(XY)-\E X\,\E Y=0-0=0,$$
        即 ==$X$ 与 $Y$ 不相关==（$\rho_{XY}=0$）。

        **(2)** 取 $A=\set{\abs X<\frac12}$，$B=\set{Y<\frac14}$。
        注意 $Y<\frac14\iff X^{2}<\frac14\iff\abs X<\frac12$，==故 $A=B$==。于是
        $$P(AB)=P(A)=\frac12,\qquad P(A)P(B)=\frac12\cdot\frac12=\frac14\ne\frac12.$$
        故 $X$ 与 $Y$ ==不独立==。
      `,
      comment: String.raw`
        **这道题是"不相关 $\ne$ 独立"最省事的记忆载体**：
        $$X\sim U(-1,1),\qquad Y=X^{2}.$$
        ==两行就能说清，考场上现场构造都来得及。==

        **为什么协方差会"看不见"这么强的依赖**：
        $X=+t$ 与 $X=-t$ 给出==相同的 $Y$，相反的 $X$ 偏离==，
        乘积一正一负，平均后完全抵消。
        ==协方差只对"同增同减"敏感，对"对称的弯曲"失明。==
        这就是[$\rho$ 只看线性](#/probability/moments/covariance?at=rho-meaning)的直观图像。

        **同类反例（换个皮）**：

        - $(X,Y)$ 在单位圆盘上均匀分布：由对称性 $\Cov=0$，
          但支撑是圆盘，==不独立==；
        - $\Theta\sim U(0,2\pi)$，$X=\cos\Theta$，$Y=\sin\Theta$：
          $\Cov=\E(\cos\Theta\sin\Theta)=0$，但 $X^{2}+Y^{2}=1$，==绑得死死的==；
        - [$Y=ZX$ 的正态构造](#/probability/multi-random-var/normal-2d?at=ex-counterexample)：
          连边缘都是正态，仍然不相关而不独立。

        ==四个反例共用一个机制：对称性让线性项抵消。==
        看到"对称"两个字，就该想到协方差可能为零。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '三、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **由 $\rho=0$ 断言独立**：==只有二维正态才行==，
         见[单向箭头](#/probability/moments/covariance?at=indep-vs-uncorrelated)。
      2. **$\Cov$ 与 $\rho$ 混用**：$\Cov=\rho\sqrt{\Var X}\sqrt{\Var Y}$，
         ==只有标准化之后两者才相等==。
      3. **$\Cov(aX+b,cY+d)$ 保留常数项**：常数项==完全消失==，结果是 $ac\Cov(X,Y)$。
      4. **$\Var(X-Y)$ 里交叉项符号搞错**：是 $-2\Cov(X,Y)$。
      5. **展开 $\Cov$ 时漏项**：双线性要==逐项展开==，
         $\Cov(X+Y,X-Y)$ 有四项（中间两项相消）。
      6. **忘了 $\Cov(X,X)=\Var X$**：这条能把方差公式和协方差公式统一起来。
      7. **$\rho$ 的符号在线性变换下弄错**：$\rho_{aX+b,cY+d}=\operatorname{sgn}(ac)\rho_{XY}$。
      8. **忽视"$\Var(X+Y)=\Var X+\Var Y$"这个条件的含义**：
         它等价于==不相关==，是题目在暗中给条件。
      9. **算出 $\abs\rho>1$**：一定算错了，$\abs\rho\le1$ 是硬约束。
    ` },

  ],
});
