/* ==========================================================================
   概率论 / 3 多维随机变量及其分布 / 二维正态分布
   —— 唯一一个"不相关就等于独立"的分布族，也是考研概率大题的常客。
      相关系数本身见 moments/covariance。
   ========================================================================== */

KM.page({
  path: 'probability/multi-random-var/normal-2d',
  title: '二维正态分布',
  subtitle: '五个参数，五条性质。最关键的一条：**在二维正态里，不相关就等于独立**——别的分布没这个待遇',
  tags: ['大题', '概念辨析', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'density', title: '密度与记号', c: String.raw`
      称 $(X,Y)\sim N(\mu_1,\mu_2;\sigma_1^{2},\sigma_2^{2};\rho)$，若其联合密度为
      $$f(x,y)=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^{2}}}
      \exp\left\{-\frac{1}{2(1-\rho^{2})}
      \left[\frac{(x-\mu_1)^{2}}{\sigma_1^{2}}
      -\frac{2\rho(x-\mu_1)(y-\mu_2)}{\sigma_1\sigma_2}
      +\frac{(y-\mu_2)^{2}}{\sigma_2^{2}}\right]\right\}$$
      其中 $\sigma_1,\sigma_2>0$，$\abs\rho<1$。

      ==这个公式不需要默写==（考研不会让你写出来），
      但要能==认出它的骨架==：指数上是一个关于 $(x-\mu_1),(y-\mu_2)$ 的
      **负定二次型**，中间那个交叉项的系数带着 $\rho$。

      **交叉项就是一切**：
      $$\rho=0\ \Longrightarrow\ \text{交叉项消失}\ \Longrightarrow\
      f(x,y)=\underbrace{\frac{1}{\sqrt{2\pi}\sigma_1}e^{-\frac{(x-\mu_1)^{2}}{2\sigma_1^{2}}}}_{f_X(x)}
      \cdot\underbrace{\frac{1}{\sqrt{2\pi}\sigma_2}e^{-\frac{(y-\mu_2)^{2}}{2\sigma_2^{2}}}}_{f_Y(y)}$$
      ==指数相加对应因子相乘，密度当场分离==——这就是下面那条"不相关即独立"的全部证明。

      **几何图像**：等高线 $f=$ 常数 是==一族同心的椭圆==，
      $\rho$ 决定椭圆长轴的倾斜方向（$\rho>0$ 时向右上倾斜），
      $\abs\rho\to1$ 时椭圆被压扁成一条直线，==退化为完全线性相关==。
      把交叉项消掉的动作，就是线代里的[正交变换化二次型](#/linear-algebra/eigen/symmetric?at=to-quadratic)。
    ` },

    { t: 'key', id: 'five-params', title: '五个参数各管什么', c: String.raw`
      | 参数 | 含义 | 一句话 |
      |---|---|---|
      | $\mu_1,\mu_2$ | $\E X,\ \E Y$ | ==椭圆中心的位置== |
      | $\sigma_1^{2},\sigma_2^{2}$ | $\Var X,\ \Var Y$ | ==两个方向上的胖瘦== |
      | $\rho$ | $X,Y$ 的[相关系数](#/probability/moments/covariance?at=rho-def) | ==椭圆的倾斜程度== |

      ==前四个参数完全由边缘分布决定，第五个参数是边缘看不见的==。
      这正是[边缘丢失信息](#/probability/multi-random-var/joint?at=marginal-loses)那一条的具体体现：
      给定两个正态边缘，$\rho$ 可以是 $(-1,1)$ 里的任何数，
      ==对应无穷多个不同的联合分布==。

      **由此得到考研最常考的一句话**：
      "已知 $X\sim N(\mu_1,\sigma_1^{2})$，$Y\sim N(\mu_2,\sigma_2^{2})$"
      ==并不能推出 $(X,Y)$ 服从二维正态==，
      更不能推出 $X+Y$ 是正态。见[下面的反例](#/probability/multi-random-var/normal-2d?at=marginal-not-enough)。
    ` },

    { t: 'warn', id: 'marginal-not-enough', title: '★ 边缘正态推不出联合正态', c: String.raw`
      $$\text{二维正态}\ \Longrightarrow\ \text{两个边缘都正态}$$
      $$\text{两个边缘都正态}\ \not\Longrightarrow\ \text{二维正态}$$

      ==这是概率论选择题命中率最高的一条==，
      因为它同时否定了三个看起来天经地义的推断：

      1. "$X,Y$ 都是正态 $\Rightarrow$ $X+Y$ 是正态"——**假**；
      2. "$X,Y$ 都是正态且 $\Cov(X,Y)=0$ $\Rightarrow$ 独立"——**假**；
      3. "$X,Y$ 都是正态 $\Rightarrow$ $(X,Y)$ 有二维正态密度"——**假**。

      ==三条的统一反例只有一个==，就是下面的
      [$Y=ZX$ 构造](#/probability/multi-random-var/normal-2d?at=ex-counterexample)，
      务必记住它。

      **正确的充要条件**：$(X,Y)$ 服从二维正态
      $\iff$ ==对一切实数 $a,b$，$aX+bY$ 都服从一维正态==
      （允许退化为常数）。
      注意是"一切"，个别几个线性组合是正态说明不了问题。

      **题干里该找什么**：只有出现"$(X,Y)$ 服从二维正态"
      或"$X,Y$ 相互独立且都服从正态"这两种表述，
      才能放心使用本页的五条性质。==只说两个边缘是正态，什么都不能用。==
    ` },

    { t: 'key', id: 'marginal-normal', title: '性质一：边缘是正态，而且与 $\\rho$ 无关', c: String.raw`
      $$X\sim N(\mu_1,\sigma_1^{2}),\qquad Y\sim N(\mu_2,\sigma_2^{2})$$

      ==注意边缘分布里根本没有 $\rho$==。
      不管两个变量相关得多厉害，各自单独看永远是同一个正态分布。

      **条件分布也是正态**（数一常考）：
      $$\boxed{\ Y\mid X=x\ \sim\ N\!\left(\mu_2+\rho\frac{\sigma_2}{\sigma_1}(x-\mu_1),\ \ \sigma_2^{2}(1-\rho^{2})\right)\ }$$

      这两个参数都值得读一读：

      - **条件期望是 $x$ 的线性函数**，斜率 $\rho\frac{\sigma_2}{\sigma_1}$——
        ==这条直线就是统计学里的"回归直线"==，$\rho=0$ 时它变成水平线（$X$ 没有预测力）；
      - **条件方差 $\sigma_2^{2}(1-\rho^{2})$ 与 $x$ 无关，且比 $\sigma_2^{2}$ 小**——
        ==知道了 $X$ 就减少了 $Y$ 的不确定性，减少的比例正是 $\rho^{2}$==。
        $\abs\rho\to1$ 时条件方差趋于 $0$，$Y$ 被 $X$ 完全决定。
    ` },

    { t: 'key', id: 'rho-zero-indep', title: '★ 性质二：$\\rho=0\\iff X,Y$ 独立', c: String.raw`
      $$\boxed{\ (X,Y)\ \text{服从二维正态时：}\quad X,Y\ \text{独立}\iff \rho=0\iff \Cov(X,Y)=0\ }$$

      **这是整门课唯一一处"不相关可以推出独立"的地方。**
      一般情形下只有单向的
      $$\text{独立}\ \Longrightarrow\ \text{不相关},$$
      反向需要额外条件，见[不相关不等于独立](#/probability/moments/covariance?at=indep-vs-uncorrelated)。

      **证明只有一行**：$\rho=0$ 时[密度里的交叉项消失](#/probability/multi-random-var/normal-2d?at=density)，
      $f=f_Xf_Y$，由[连续型判据](#/probability/multi-random-var/independence?at=criterion-continuous)即得独立。

      **使用时必须先确认"是二维正态"**：
      ==只知道两个边缘是正态是不够的==。
      考研的选择题几乎年年拿这一点做文章：
      给"$X\sim N(0,1)$，$Y\sim N(0,1)$，$\Cov(X,Y)=0$"问是否独立，
      ==答案是"不一定"==，除非题目说 $(X,Y)$ 服从二维正态。
    ` },

    { t: 'key', id: 'linear-combination', title: '★ 性质三：线性组合还是正态', c: String.raw`
      设 $(X,Y)$ 服从二维正态，$a,b$ 不全为零，则
      $$\boxed{\ aX+bY+c\ \sim\ N\!\left(a\mu_1+b\mu_2+c,\ \ a^{2}\sigma_1^{2}+b^{2}\sigma_2^{2}+2ab\rho\sigma_1\sigma_2\right)\ }$$

      **方差那一项要靠[方差公式](#/probability/moments/expectation?at=var-props)现推**：
      $$\Var(aX+bY)=a^{2}\Var X+b^{2}\Var Y+2ab\Cov(X,Y),\qquad \Cov(X,Y)=\rho\sigma_1\sigma_2.$$
      ==别背，推三十秒的事，背错了一个符号整道题就废了。==

      **两个高频用法**：

      1. **求 $P(aX+bY<t)$**：先算出正态参数，再标准化查表。
         ==这是二维正态大题最标准的第一问==。
      2. **判断两个线性组合是否独立**：
         $(X,Y)$ 二维正态时，$U=a_1X+b_1Y$ 与 $V=a_2X+b_2Y$ 仍服从二维正态，
         于是==只要算 $\Cov(U,V)=0$ 就能断定独立==。
         这一步在数理统计里用来证"样本均值与样本方差独立"。

      **反向不成立**：$X+Y$ 是正态、$X-Y$ 是正态，
      ==推不出 $(X,Y)$ 是二维正态==。
      严格的充要条件是"**一切**线性组合 $aX+bY$ 都是正态"。
    ` },

    { t: 'compare',
      id: 'checklist',
      title: '二维正态五条速查（考前扫一眼）',
      cols: ['编号', '结论', '常见错法'],
      rows: [
        ['①', '边缘 $X\\sim N(\\mu_1,\\sigma_1^{2})$，$Y\\sim N(\\mu_2,\\sigma_2^{2})$，==与 $\\rho$ 无关==', '以为边缘含 $\\rho$'],
        ['②', '$X,Y$ 独立 $\\iff\\rho=0$', '把它用在非正态场合'],
        ['③', '任意 $aX+bY+c$ 仍是==一维正态==', '忘了方差里的 $2ab\\rho\\sigma_1\\sigma_2$'],
        ['④', '条件分布 $Y\\mid X=x$ 仍是正态，条件方差 $\\sigma_2^{2}(1-\\rho^{2})$', '以为条件方差含 $x$'],
        ['⑤', '==边缘正态推不出联合正态==', '由两个正态边缘断言 $X+Y$ 正态'],
      ] },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-linear',
      title: '线性组合的标准计算',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $(X,Y)\sim N(1,2;\,4,9;\,0.5)$，即
        $\E X=1,\ \E Y=2,\ \Var X=4,\ \Var Y=9,\ \rho=0.5$。

        1. 求 $Z=2X-Y+3$ 的分布，并求 $P(Z>3)$；
        2. 判断 $X$ 与 $Z$ 是否独立；
        3. 求常数 $k$，使 $X$ 与 $Y-kX$ 相互独立。
      `,
      idea: String.raw`
        **第 1 问**：由性质三，$Z$ 必是正态，==只需算出两个参数==。
        期望用线性性（无条件成立），方差用
        $\Var(aX+bY)=a^{2}\Var X+b^{2}\Var Y+2ab\Cov(X,Y)$。
        ==注意 $b=-1$，交叉项前面会带一个负号==，这是最容易错的地方。
        算出 $\E Z$ 后再看 $P(Z>3)$：如果 $3$ 恰好是 $\E Z$，==答案就是 $\frac12$，不用查表==。

        **第 2 问**：$X$ 与 $Z$ 都是 $(X,Y)$ 的线性组合，
        所以 $(X,Z)$ 仍服从二维正态，==于是判独立就退化成判协方差是否为零==。
        这正是[性质三的第 2 个用法](#/probability/multi-random-var/normal-2d?at=linear-combination)。

        **第 3 问是第 2 问的反问**：让协方差为零，解出 $k$。
        ==这个 $k$ 有个名字叫回归系数==，
        它把 $Y$ 中"能被 $X$ 解释的部分"剥离出去，剩下的残差与 $X$ 无关。
      `,
      solution: String.raw`
        先算协方差：$\Cov(X,Y)=\rho\sigma_1\sigma_2=0.5\times2\times3=3$。

        **(1)**
        $$\E Z=2\E X-\E Y+3=2-2+3=3,$$
        $$\Var Z=2^{2}\Var X+(-1)^{2}\Var Y+2\cdot2\cdot(-1)\Cov(X,Y)
        =16+9-12=13.$$
        故 $Z\sim N(3,13)$。由于 $3=\E Z$，由正态的对称性
        $$P(Z>3)=\boxed{\tfrac12}.$$

        **(2)** $(X,Z)$ 是 $(X,Y)$ 的线性变换，仍服从二维正态。
        $$\Cov(X,Z)=\Cov(X,\,2X-Y+3)=2\Var X-\Cov(X,Y)=8-3=5\ne0,$$
        故 ==$X$ 与 $Z$ 不独立==（且正相关）。

        **(3)**
        $$\Cov(X,\ Y-kX)=\Cov(X,Y)-k\Var X=3-4k.$$
        令其为零得 $k=\dfrac34$。
        由于 $(X,\ Y-kX)$ 服从二维正态，协方差为零即独立，故
        $$\boxed{k=\tfrac34}.$$
      `,
      comment: String.raw`
        **第 3 问的 $k$ 是有含义的**：
        $$k=\frac{\Cov(X,Y)}{\Var X}=\rho\frac{\sigma_2}{\sigma_1}$$
        正是[条件期望直线的斜率](#/probability/multi-random-var/normal-2d?at=marginal-normal)。
        把 $Y$ 拆成
        $$Y=\underbrace{kX}_{\text{被}\ X\ \text{解释的部分}}+\underbrace{(Y-kX)}_{\text{与}\ X\ \text{无关的残差}},$$
        ==这就是最小二乘回归在做的事==，
        也是[柯西–施瓦茨与相关系数](#/threads/patterns/cauchy-schwarz?at=rho)那条主线里
        "把向量投影到另一个向量上"的同一个动作。

        **计算上的三条纪律**：

        1. 先算 $\Cov=\rho\sigma_1\sigma_2$，==后面全都要用==；
        2. 方差里的交叉项系数是 $2ab$，==$b<0$ 时整项变号==；
        3. 算出 $\Var Z$ 后检查它是否为正——负数说明符号错了。

        **一个值得记的特例**：若 $\rho=0$（独立），则
        $\Var(X\pm Y)=\Var X+\Var Y$，==加减号都一样==。
        有相关性时，$\Var(X+Y)$ 与 $\Var(X-Y)$ 差 $4\Cov$。
      `,
    },

    { t: 'example',
      id: 'ex-counterexample',
      title: '★ 一个构造，同时打掉两个错觉',
      source: '经典反例（选择题必备）',
      level: 4,
      problem: String.raw`
        设 $X\sim N(0,1)$，$Z$ 与 $X$ 相互独立且 $P(Z=1)=P(Z=-1)=\frac12$。令 $Y=ZX$。

        证明：

        1. $Y\sim N(0,1)$；
        2. $X$ 与 $Y$ 不相关；
        3. $X$ 与 $Y$ ==不独立==，且 $(X,Y)$ ==不服从二维正态==。
      `,
      idea: String.raw`
        **这个构造在做什么**：$Z$ 是一枚公平硬币，
        ==它以一半的概率把 $X$ 原样抄给 $Y$，另一半的概率抄一个相反数==。

        - 因为标准正态==关于原点对称==，"取相反数"不改变分布，所以 $Y$ 仍是 $N(0,1)$；
        - 因为"抄"和"抄反"各占一半，两种情形的相关性==正好抵消==，协方差为零；
        - 但无论哪种情形都有 $\abs Y=\abs X$，==两者绑得死死的==，当然不独立。

        ==对称性给了"不相关"，绝对值的锁定给了"不独立"==，
        这就是整个反例的设计思路。

        **第 3 问的后半段（不是二维正态）怎么证**：
        用[性质三的逆否](#/probability/multi-random-var/normal-2d?at=linear-combination)——
        若 $(X,Y)$ 是二维正态，则 $X+Y$ 必是正态；
        而这里 $X+Y=(1+Z)X$ ==有一半的概率等于 $0$==，
        即 $P(X+Y=0)=\frac12$，==连续型正态不可能在一点取到正概率==，矛盾。
        ==找一个"坏掉的线性组合"是否定二维正态的标准手法。==
      `,
      solution: String.raw`
        **(1)** 由全概率公式（对 $Z$ 分类）与 $X$ 的对称性 $-X\sim N(0,1)$：
        $$P(Y\le y)=\frac12P(X\le y)+\frac12P(-X\le y)
        =\frac12\Phi(y)+\frac12\Phi(y)=\Phi(y),$$
        故 $Y\sim N(0,1)$。

        **(2)** $\E Y=0$，且由 $Z$ 与 $X$ 独立、$\E Z=0$、$\E X^{2}=1$：
        $$\E(XY)=\E(ZX^{2})=\E Z\cdot\E X^{2}=0\times1=0,$$
        $$\Cov(X,Y)=\E(XY)-\E X\,\E Y=0,$$
        故 $X$ 与 $Y$ ==不相关==。

        **(3) 不独立**：注意恒有 $\abs Y=\abs X$。取事件 $A=\set{\abs X>1}$，
        $$P(\abs X>1,\ \abs Y>1)=P(\abs X>1)\approx0.3173,$$
        而
        $$P(\abs X>1)P(\abs Y>1)\approx0.3173^{2}\approx0.1007\ne0.3173,$$
        故 $X,Y$ ==不独立==。

        **不是二维正态**：$X+Y=(1+Z)X$，当 $Z=-1$ 时恒为 $0$，故
        $$P(X+Y=0)\ge P(Z=-1)=\frac12>0.$$
        而任何一维正态分布在单点的概率为 $0$，==所以 $X+Y$ 不是正态==；
        由性质三的逆否，$(X,Y)$ 不服从二维正态。$\blacksquare$
      `,
      comment: String.raw`
        **这一个例子同时是三道选择题的答案**：

        | 命题 | 真假 | 本例的作用 |
        |---|---|---|
        | 不相关 $\Rightarrow$ 独立 | ==假== | $\Cov=0$ 但不独立 |
        | 边缘正态 $\Rightarrow$ 联合正态 | ==假== | 两个边缘都是 $N(0,1)$ |
        | 两个正态之和是正态 | ==假== | $X+Y$ 有原子 |

        ==把这个构造记牢，比记三条"反例存在"有用得多==。

        **为什么"独立 $\Rightarrow$ 不相关"却反不过来**：
        协方差只度量==线性==关系，
        而 $Y$ 与 $X$ 之间是 $\abs Y=\abs X$ 这种==纯非线性==的依赖，
        它对协方差完全隐形。
        详见[相关系数只看线性](#/probability/moments/covariance?at=rho-meaning)。

        **那么什么时候能反过来**：只有加上"$(X,Y)$ 联合正态"这个前提，
        才有 [$\rho=0\iff$ 独立](#/probability/multi-random-var/normal-2d?at=rho-zero-indep)。
        ==本例正好说明这个前提不能省==：
        它的两个边缘都正态、协方差为零，唯独联合不是正态，结论就崩了。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **由两个正态边缘断言联合正态**：==本页头号错误==，
         见[反例](#/probability/multi-random-var/normal-2d?at=ex-counterexample)。
      2. **在非正态场合用"不相关即独立"**：这条==只对二维正态成立==。
      3. **$\Var(aX+bY)$ 漏掉交叉项**：完整式是
         $a^{2}\Var X+b^{2}\Var Y+2ab\Cov(X,Y)$，==$b<0$ 时交叉项变号==。
      4. **以为边缘分布含 $\rho$**：边缘==与 $\rho$ 无关==。
      5. **条件方差写成含 $x$**：是常数 $\sigma_2^{2}(1-\rho^{2})$。
      6. **$\rho$ 与 $\Cov$ 混用**：$\Cov=\rho\sigma_1\sigma_2$，
         ==只有标准化之后两者才相等==。
      7. **由"$X+Y$ 正态"反推二维正态**：需要==一切==线性组合都是正态才行。
      8. **忘了 $\abs\rho<1$**：$\rho=\pm1$ 时密度不存在（退化到一条直线上）。
    ` },

  ],
});
