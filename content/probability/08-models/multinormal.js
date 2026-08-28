/* ==========================================================================
   概率论 / 附 分布图鉴 / 多维正态分布
   —— 二维正态是数一考点；本页把它放回 n 维的框架里看，二次型视角。
   ========================================================================== */

KM.page({
  path: 'probability/models/multinormal',
  title: '多维正态：把方差换成矩阵',
  subtitle: '一维正态的指数上是 $\\frac{(x-\\mu)^{2}}{\\sigma^{2}}$，多维只是把它换成==二次型== $(\\vec x-\\vec\\mu)\\T\\Sigma\\inv(\\vec x-\\vec\\mu)$。所有性质都从这一步来',
  tags: ['小题', '大题', '数一'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      **二维正态是考研数一的考点**，[第 3 章有专门一页](#/probability/multi-random-var/normal-2d?at=density)讲它的五个参数与性质。
      这一页做的是另一件事：==把它放回 $n$ 维的框架里==，
      用矩阵语言重写一遍——**这样那些看起来要背的性质会变成显然的**。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'birth', c: '一、密度：把方差换成协方差矩阵' },

    { t: 'key', id: 'story', title: '从一维到 $n$ 维，只换了一个零件', c: String.raw`
      一维：
      $$f(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\left(-\frac12\cdot\frac{(x-\mu)^{2}}{\sigma^{2}}\right)$$

      $n$ 维（记 $\vec\mu=\E\vec X$，$\Sigma=\Cov(\vec X)$ 为协方差矩阵）：
      $$\boxed{\ f(\vec x)=\frac{1}{(2\pi)^{n/2}\abs{\Sigma}^{1/2}}
      \exp\left(-\frac12(\vec x-\vec\mu)\T\Sigma\inv(\vec x-\vec\mu)\right)\ }$$

      ==逐项对应，一个不多一个不少==：

      | 一维 | $n$ 维 |
      |---|---|
      | $\sigma^{2}$ | 协方差矩阵 $\Sigma$ |
      | $\frac{1}{\sigma^{2}}$ | ==$\Sigma\inv$== |
      | $\sigma=\sqrt{\sigma^{2}}$ | $\abs{\Sigma}^{1/2}$（行列式开根） |
      | $(x-\mu)^{2}/\sigma^{2}$ | ==二次型 $(\vec x-\vec\mu)\T\Sigma\inv(\vec x-\vec\mu)$== |

      **$\Sigma$ 必须正定**（至少半正定），否则 $\Sigma\inv$ 不存在、密度写不出来。
      ==这就是[二次型正定性](#/linear-algebra/quadratic/definite?at=equiv)在概率论里的落点==：
      $\Sigma$ 的正定性保证了指数上那个二次型恒为正，密度才会往两边衰减。

      **$n=2$ 时展开就是[教材上那个五参数的密度](#/probability/multi-random-var/normal-2d?at=density)**：
      $$\Sigma=\begin{pmatrix}\sigma_1^{2}&\rho\sigma_1\sigma_2\\
      \rho\sigma_1\sigma_2&\sigma_2^{2}\end{pmatrix},\qquad
      \abs\Sigma=\sigma_1^{2}\sigma_2^{2}(1-\rho^{2}),$$
      ==那个恼人的 $\sqrt{1-\rho^{2}}$ 不过是 $\abs\Sigma^{1/2}$ 的一部分==，
      $\frac{1}{1-\rho^{2}}$ 则来自 $\Sigma\inv$。
      **知道这一点，就不必再死记那个密度了。**
    ` },

    { t: 'key', id: 'geometry', title: '等高线是椭圆，主轴是特征向量', c: String.raw`
      密度的等高线由 $(\vec x-\vec\mu)\T\Sigma\inv(\vec x-\vec\mu)=c$ 给出，
      ==这是一个以 $\vec\mu$ 为中心的椭球==。

      对 $\Sigma$ 做[正交对角化](#/linear-algebra/eigen/symmetric?at=procedure) $\Sigma=Q\Lambda Q\T$：

      - ==椭球的主轴方向就是 $\Sigma$ 的特征向量==；
      - ==半轴长正比于 $\sqrt{\lambda_i}$==（特征值开根，即各主轴方向上的标准差）。

      这给了一个非常有用的图像：
      $$\rho=0\ \iff\ \Sigma\ \text{是对角阵}\ \iff\ \text{椭圆的轴与坐标轴平行}$$
      而 $\rho\ne0$ 时椭圆是==斜的==，==两个分量因此"看起来"相关==。

      **消掉相关性 $=$ 把椭圆转正**，这正是
      [正交变换消交叉项](#/threads/lines/quadratic?at=core)那条主线在概率论里的化身：
      令 $\vec Y=Q\T(\vec X-\vec\mu)$，则各分量==相互独立==，方差分别是 $\lambda_i$。
      ==主成分分析（PCA）就是这一步。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'props', c: '二、性质：一维那三条，原样搬过来' },

    { t: 'key', id: 'linear', title: '★ 线性变换仍是正态', c: String.raw`
      $$\vec X\sim N(\vec\mu,\Sigma),\quad A\ \text{为常数矩阵}\ \Longrightarrow\
      A\vec X+\vec b\sim N\bigl(A\vec\mu+\vec b,\ A\Sigma A\T\bigr)$$

      ==$A\Sigma A\T$ 就是一维 $a^{2}\sigma^{2}$ 的矩阵版==（"平方"变成了"两边各乘一次"）。
      这一条把一维的所有线性性质一次性推广了：

      - 取 $A$ 为一行 $(a_1,\dots,a_n)$：==任意线性组合 $\sum a_iX_i$ 仍是一维正态==；
      - 取 $A$ 为选取某几个分量的矩阵：==任意边缘分布仍是（低维）正态==；
      - 取 $A=Q\T$ 正交阵：==旋转之后仍是正态==，这是[卡方分布推导](#/probability/models/chi2?at=helmert)的关键一步。

      **反过来也成立（很强的判据）**：
      若==一切==线性组合 $\sum a_iX_i$ 都是一维正态，则 $\vec X$ 服从多维正态。
      ==注意"一切"两个字==：只验证有限几个组合是不够的。
    ` },

    { t: 'key', id: 'indep', title: '★ 不相关 $\\iff$ 独立（这是正态的特权）', c: String.raw`
      一般情况下==独立必然不相关，不相关不一定独立==，
      见[那条单向箭头](#/probability/moments/covariance?at=indep-vs-uncorrelated)。
      但对多维正态：
      $$\boxed{\ \Sigma\ \text{为对角阵}\ \iff\ \text{各分量相互独立}\ }$$

      **理由一眼可见**：$\Sigma$ 对角时 $\Sigma\inv$ 也对角，
      指数上的二次型化成 $\sum\frac{(x_i-\mu_i)^{2}}{\sigma_i^{2}}$，
      ==于是 $e^{\text{和}}=\prod e^{\text{各项}}$，联合密度自动拆成乘积==——
      这正是[独立性判据](#/probability/multi-random-var/independence?at=criterion-continuous)要的形式。

      ==机制还是"指数把加法变成乘法"==，
      和[移位与调制](#/threads/patterns/shift?at=exp-law)那条主线是同一句话。

      **必须小心的前提**：这条只对==联合正态==成立。
      两个边缘都是正态、但联合不是正态时，$\rho=0$ 推不出独立，
      见[那个经典反例](#/probability/multi-random-var/normal-2d?at=ex-counterexample)。
      =="边缘正态"和"联合正态"是两回事，这是本章最爱考的概念陷阱。==
    ` },

    { t: 'key', id: 'conditional', title: '条件分布也是正态（数一了解即可）', c: String.raw`
      二维情形：给定 $X=x$ 时，
      $$Y\mid X=x\ \sim\ N\!\left(\mu_2+\rho\frac{\sigma_2}{\sigma_1}(x-\mu_1),\ \
      \sigma_2^{2}(1-\rho^{2})\right)$$

      两件事值得注意：

      - ==条件期望是 $x$ 的线性函数==，那条直线就是**回归直线**，
        斜率 $\rho\frac{\sigma_2}{\sigma_1}$——==这是"线性回归"这个名字的出处==；
      - ==条件方差 $\sigma_2^{2}(1-\rho^{2})$ 与 $x$ 无关==，而且比无条件方差小。
        减少的比例恰好是 $\rho^{2}$，
        **这就是统计里"决定系数 $R^{2}$"的含义：知道了 $X$，$Y$ 的不确定性降低了 $\rho^{2}$**。

      $\rho=\pm1$ 时条件方差为零，$Y$ 被 $X$ 完全决定——
      与[相关系数只看得见线性关系](#/probability/moments/covariance?at=rho-meaning)那一节对上了。
    ` },

    { t: 'key', id: 'to-chi2', title: '它和卡方分布的接口', c: String.raw`
      $$\vec X\sim N(\vec\mu,\Sigma)\ \Longrightarrow\
      (\vec X-\vec\mu)\T\Sigma\inv(\vec X-\vec\mu)\sim\chi^{2}(n)$$

      ==也就是说：密度指数上那个二次型本身服从卡方分布。==

      **理由是[线性变换封闭性](#/probability/models/multinormal?at=linear)**：
      取 $A=\Lambda^{-1/2}Q\T$ 把 $\vec X$ 标准化成 $n$ 个独立的 $N(0,1)$，
      二次型就变成了平方和，正是[卡方的定义](#/probability/models/chi2?at=story)。

      ==这条等式是多元统计的入口==：
      置信椭球、马氏距离、[卡方检验](#/probability/models/chi2?at=pearson)全部由它而来。
      考研不直接考，但它让"为什么卡方到处都是"这个问题有了答案：
      **凡是正态 + 二次型，出口一定是卡方。**
    ` },

    { t: 'warn', id: 'pitfalls', title: '易错清单', c: String.raw`
      1. **边缘正态 $\ne$ 联合正态**：==这是最高频的概念陷阱==，
         反例见[第 3 章](#/probability/multi-random-var/normal-2d?at=ex-counterexample)；
      2. **$\rho=0$ 就断言独立**：==必须先确认是联合正态==；
      3. **$A\Sigma A\T$ 写成 $A\Sigma$ 或 $A^{2}\Sigma$**：
         两边各乘一次，==而且转置在右边==；
      4. **协方差矩阵不正定还去写密度**：
         $\abs\Sigma=0$ 时分布退化到低维平面上，==没有密度==
         （[多项分布](#/probability/models/multinomial?at=relations)的正态近似就是这种情形）；
      5. **二维密度硬背**：记 $\Sigma$ 的形式，==用矩阵公式现推更稳==。
    ` },

  ],
});
