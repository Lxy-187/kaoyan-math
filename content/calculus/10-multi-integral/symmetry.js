/* ==========================================================================
   高等数学 / 10 重积分 / 对称性与轮换对称性
   —— 动笔之前先查对称性，常常能把整道题压成一行。
      二重见 multi-integral/double；三重见 multi-integral/triple。
   ========================================================================== */

KM.page({
  path: 'calculus/multi-integral/symmetry',
  title: '对称性与轮换对称性',
  subtitle: '重积分里**优先级最高的一步**：能对称掉的绝不硬算。查一次只要十秒，收益却常常是整道题',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'core', title: '★ 普通对称性：偶倍奇零', c: String.raw`
      **二重积分**：设区域 $D$ 关于 $y$ 轴对称（即 $(x,y)\in D\Rightarrow(-x,y)\in D$），则
      $$\iint_Df(x,y)\dxy=\begin{cases}
      0,&f(-x,y)=-f(x,y)\ \text{（关于 }x\text{ 是奇函数）}\\[4pt]
      2\displaystyle\iint_{D_{x\ge0}}f\dxy,&f(-x,y)=f(x,y)\ \text{（偶）}
      \end{cases}$$

      $$\boxed{\ \text{**偶倍奇零**：区域对称 + 被积函数奇 }\Rightarrow\ 0\ }$$

      **两个条件缺一不可**：
      ==区域要关于某平面（轴）对称，被积函数要关于对应变量有奇偶性==。

      **用法的关键在"对哪个变量"**：
      $D$ 关于 $y$ 轴对称时，==看 $f$ 关于 $x$ 的奇偶性==（不是关于 $y$）。
      **这个对应关系最容易搞反。**

      | 区域关于 | 看 $f$ 关于哪个变量 |
      |---|---|
      | $y$ 轴对称（$x\to-x$） | ==$x$== |
      | $x$ 轴对称（$y\to-y$） | ==$y$== |
      | 原点对称（$x,y$ 同时变号） | 两者同时 |
      | 平面 $z=0$（三重） | $z$ |

      **三重积分完全同理**：
      $\Omega$ 关于 $xOy$ 面对称、$f$ 关于 $z$ 是奇函数 $\Rightarrow$ 积分为零。

      **实战价值**：
      $$\iiint_\Omega\left(x+y+z+1\right)\d V$$
      若 $\Omega$ 是以原点为中心的球，==前三项全部对称掉==，
      只剩 $\iiint_\Omega1\d V=V(\Omega)$，==一行完事==。
    ` },

    { t: 'key', id: 'rotation', title: '★ 轮换对称性：换字母不换积分', c: String.raw`
      **若区域 $D$（或 $\Omega$）在交换 $x\leftrightarrow y$ 之后**==保持不变==，则
      $$\boxed{\ \iint_Df(x,y)\dxy=\iint_Df(y,x)\dxy\ }$$

      ==即"把被积函数里的 $x,y$ 对调，积分值不变"==。

      **判断区域是否轮换对称**：把方程里的 $x$ 与 $y$ 互换，==方程不变==就是。

      | 区域 | 轮换对称吗 |
      |---|---|
      | $x^{2}+y^{2}\le1$ | ==是==（$x\leftrightarrow y$ 不变） |
      | $x+y\le1,\ x,y\ge0$ | ==是== |
      | $\abs x+\abs y\le1$ | 是 |
      | $x^{2}+4y^{2}\le1$ | ==否==（系数不同） |
      | $0\le x\le1,\ 0\le y\le2$ | 否 |

      **最常用的推论（"平均分配"）**：
      $$\iint_Dx^{2}\dxy=\iint_Dy^{2}\dxy=\frac12\iint_D\left(x^{2}+y^{2}\right)\dxy$$

      ==左边两个相等（轮换），所以各占和的一半==。
      **右端往往可以用极坐标一步算出**，而左边单独算会麻烦得多。

      **三重积分的版本**（$\Omega$ 关于三个变量轮换对称，如球）：
      $$\iiint_\Omega x^{2}\d V=\iiint_\Omega y^{2}\d V=\iiint_\Omega z^{2}\d V
      =\frac13\iiint_\Omega\left(x^{2}+y^{2}+z^{2}\right)\d V$$
      ==而右端在球坐标下是 $\iiint\rho^{2}\cdot\rho^{2}\sin\varphi\,\d\rho\d\varphi\dtheta$==，
      ==只有一个变量，极易计算==，
      见[三重积分的例题](#/calculus/multi-integral/triple?at=ex-x2-ball)。

      **注意轮换对称性与奇偶对称性是两回事**：
      前者说"换字母积分不变"，后者说"某个积分为零"。
      ==两者常常配合使用。==
    ` },

    { t: 'method', id: 'workflow', title: '动笔前的十秒检查', c: String.raw`
      拿到重积分，==按顺序问这三句==：

      1. **区域有没有对称性？**（关于坐标轴、坐标面、原点）
         有 $\to$ 查被积函数的奇偶性 $\to$ ==能不能整块扔掉==；
      2. **区域轮换对称吗？**
         是 $\to$ 能不能==把 $x^{2}$ 换成 $\frac{x^{2}+y^{2}}{2}$== 之类；
      3. **被积函数能不能拆？**
         $f=f_1+f_2$ 时==分别处理==，常常一半对称掉、一半好算。

      $$\boxed{\ \text{拆开被积函数，逐项查对称性}\ }$$
      ==这是第 3 条的核心==：
      $\iint(x^{3}+y^{2}+1)$ 中 $x^{3}$ 可能奇零、$y^{2}$ 可能轮换、$1$ 给面积，
      ==三项各有各的处理==。

      **一个常见的失误**：只查了整体没查逐项。
      $x^{3}+y^{2}$ 整体既不奇也不偶，==但拆开后 $x^{3}$ 那项可以扔==。

      **验证对称性的操作**：
      - 区域：把边界方程里的 $x$ 换成 $-x$，==方程不变==则关于 $y$ 轴对称；
      - 函数：把 $f$ 里的 $x$ 换成 $-x$，==看是 $f$ 还是 $-f$==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-odd-even',
      title: '拆开被积函数，逐项查对称',
      source: '标准例题（高频）',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\iint_D\left(x^{3}y+\sqrt{x^{2}+y^{2}}+2\right)\dxy$，
        其中 $D:\ x^{2}+y^{2}\le1$。
      `,
      idea: String.raw`
        **区域是单位圆盘**，关于 $x$ 轴、$y$ 轴、原点==全都对称==，
        而且==轮换对称==。

        **拆成三项逐个看**：

        - **$x^{3}y$**：把 $x\to-x$ 得 $-x^{3}y$，==关于 $x$ 是奇函数==，
          而 $D$ 关于 $y$ 轴对称 $\Rightarrow$ ==这一项积分为零==；
        - **$\sqrt{x^{2}+y^{2}}$**：==含 $x^{2}+y^{2}$，用极坐标==，
          $=r$，加雅可比后是 $r^{2}$；
        - **$2$**：$2\times$ 面积 $=2\pi$。

        ==第一项一秒扔掉，这就是查对称性的收益==。
        若不查，$\iint x^{3}y$ 要老实算一遍（虽然结果也是零，但要花时间）。

        **第二项**：
        $$\int_0^{2\pi}\dtheta\int_0^{1}r\cdot r\,\d r=2\pi\cdot\frac13=\frac{2\pi}{3}.$$
      `,
      solution: String.raw`
        区域 $D$ 为单位圆盘，关于 $x$ 轴、$y$ 轴均对称。将被积函数拆开：
        $$I=\underbrace{\iint_Dx^{3}y\dxy}_{I_1}
        +\underbrace{\iint_D\sqrt{x^{2}+y^{2}}\dxy}_{I_2}
        +\underbrace{\iint_D2\dxy}_{I_3}.$$

        **$I_1$**：$f(x,y)=x^{3}y$ 满足 $f(-x,y)=-f(x,y)$，
        即关于 $x$ 为奇函数；而 $D$ 关于 $y$ 轴对称，故
        $$I_1=0.$$

        **$I_2$**：化极坐标，$\sqrt{x^{2}+y^{2}}=r$，$\dxy=r\,\d r\dtheta$：
        $$I_2=\int_0^{2\pi}\dtheta\int_0^{1}r\cdot r\,\d r
        =2\pi\left[\frac{r^{3}}{3}\right]_0^{1}=\frac{2\pi}{3}.$$

        **$I_3$**：
        $$I_3=2\times\text{面积}(D)=2\pi.$$

        故
        $$I=0+\frac{2\pi}{3}+2\pi=\frac{8\pi}{3}.$$
      `,
      comment: String.raw`
        **数值验证**：$\frac{8\pi}{3}\approx8.378$。
        粗估：$\sqrt{x^2+y^2}$ 在圆盘上平均约 $\frac23$，贡献约 $\frac23\pi\approx2.09$；
        常数项贡献 $2\pi\approx6.28$；==合计约 $8.37$== $\checkmark$

        **$I_1=0$ 也可以用轮换对称性以外的理由**：
        $x^{3}y$ 关于 $y$ 也是奇函数（$y\to-y$ 变号），
        ==所以用 $x$ 轴对称同样能得零==。
        **一个函数可能有多重对称性，用哪个都行。**

        **注意"关于 $x$ 奇"配"关于 $y$ 轴对称"**：
        $x\to-x$ 是关于 $y$ 轴的反射，
        ==所以查 $x$ 的奇偶性时，要求区域关于 $y$ 轴对称==。
        ==这个配对关系是本节最容易记反的==。

        **常见的变体**：把区域改成上半圆盘 $x^{2}+y^{2}\le1,\ y\ge0$。
        - ==仍关于 $y$ 轴对称==（$x\to-x$ 不改变 $y\ge0$）$\Rightarrow$ $I_1$ 仍为零；
        - ==但不再关于 $x$ 轴对称==；
        - $I_2$ 变成 $\int_0^{\pi}\dtheta\int_0^1r^{2}\d r=\frac\pi3$；
        - $I_3=2\times\frac\pi2=\pi$。

        ==改区域时必须重新查对称性==，不能沿用。

        **一个反例提醒**：若把被积函数改成 $x^{3}y+x$，
        ==$x$ 关于 $x$ 也是奇函数==，在圆盘上同样积分为零。
        但若区域改成 $0\le x\le1$ 的半圆盘，
        ==$x$ 这一项就不能扔了==（区域不再关于 $y$ 轴对称）。
      `,
    },

    { t: 'example',
      id: 'ex-rotation',
      title: '★ 轮换对称性：把难算的换成好算的',
      source: '经典例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\iint_D x^{2}\dxy$，其中 $D:\ x^{2}+y^{2}\le a^{2}$。
      `,
      idea: String.raw`
        **直接算也行**（极坐标下 $x^{2}=r^{2}\cos^{2}\theta$），
        ==但用[轮换对称性](#/calculus/multi-integral/symmetry?at=rotation)更快、更不易错==。

        **$D$ 是圆盘，交换 $x\leftrightarrow y$ 后方程不变** $\Rightarrow$ 轮换对称。故
        $$\iint_Dx^{2}\dxy=\iint_Dy^{2}\dxy.$$

        ==两者相等，所以各等于它们和的一半==：
        $$\iint_Dx^{2}\dxy=\frac12\iint_D\left(x^{2}+y^{2}\right)\dxy.$$

        **右端极好算**：$x^{2}+y^{2}=r^{2}$，
        $$\frac12\int_0^{2\pi}\dtheta\int_0^{a}r^{2}\cdot r\,\d r
        =\frac12\cdot2\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4}.$$

        ==全程没有出现 $\cos^{2}\theta$==，省掉了一次三角积分。

        **对照直接算**：
        $$\int_0^{2\pi}\cos^{2}\theta\dtheta\int_0^ar^{3}\d r
        =\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4},$$
        ==结果相同，但要用到 $\int_0^{2\pi}\cos^{2}=\pi$==。
        ==两条路工作量相近，但轮换法在三重积分里优势会大得多。==
      `,
      solution: String.raw`
        区域 $D:\ x^{2}+y^{2}\le a^{2}$ 在交换 $x\leftrightarrow y$ 下不变，
        故具有==轮换对称性==，于是
        $$\iint_Dx^{2}\dxy=\iint_Dy^{2}\dxy.$$

        两式相加：
        $$2\iint_Dx^{2}\dxy=\iint_D\left(x^{2}+y^{2}\right)\dxy,$$
        即
        $$\iint_Dx^{2}\dxy=\frac12\iint_D\left(x^{2}+y^{2}\right)\dxy.$$

        右端化极坐标（$x^{2}+y^{2}=r^{2}$，$\dxy=r\,\d r\dtheta$）：
        $$\iint_D\left(x^{2}+y^{2}\right)\dxy
        =\int_0^{2\pi}\dtheta\int_0^{a}r^{2}\cdot r\,\d r
        =2\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{2}.$$

        故
        $$\iint_Dx^{2}\dxy=\frac12\cdot\frac{\pi a^{4}}{2}=\frac{\pi a^{4}}{4}.$$
      `,
      comment: String.raw`
        **这个技巧在三重积分里收益更大**。
        求 $\iiint_\Omega x^{2}\d V$（$\Omega$ 为球 $x^{2}+y^{2}+z^{2}\le a^{2}$）：
        $$\iiint_\Omega x^{2}\d V=\frac13\iiint_\Omega\left(x^{2}+y^{2}+z^{2}\right)\d V
        =\frac13\iiint_\Omega\rho^{2}\d V,$$
        ==球坐标下 $\d V=\rho^{2}\sin\varphi\,\d\rho\d\varphi\dtheta$==，
        $$=\frac13\int_0^{2\pi}\dtheta\int_0^{\pi}\sin\varphi\,\d\varphi\int_0^{a}\rho^{4}\d\rho
        =\frac13\cdot2\pi\cdot2\cdot\frac{a^{5}}{5}=\frac{4\pi a^{5}}{15}.$$

        ==直接算 $x^{2}=\rho^{2}\sin^{2}\varphi\cos^{2}\theta$ 要处理两个三角积分==，
        ==用轮换法则完全避开了==。
        详见[三重积分的那道例题](#/calculus/multi-integral/triple?at=ex-x2-ball)。

        **轮换对称性的适用范围要看清**：

        | 区域 | 可以轮换的变量 |
        |---|---|
        | 球 $x^{2}+y^{2}+z^{2}\le a^{2}$ | ==$x,y,z$ 三者== |
        | 圆柱 $x^{2}+y^{2}\le a^{2},0\le z\le h$ | ==只有 $x,y$==（$z$ 不能换） |
        | 正方体 $[0,1]^{3}$ | 三者 |
        | 椭球 $\frac{x^{2}}{4}+y^{2}+z^{2}\le1$ | ==只有 $y,z$== |

        ==第二、四行要特别小心==：
        对圆柱不能写 $\iiint x^{2}=\frac13\iiint(x^{2}+y^{2}+z^{2})$，
        ==只能写 $\iiint x^{2}=\frac12\iiint(x^{2}+y^{2})$==。

        **判据永远是"交换后方程变不变"**，
        ==动手前把两个变量互换代进去看一眼，十秒钟==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **对称的变量配错**：区域关于 $y$ 轴对称，==查 $f$ 关于 $x$ 的奇偶性==。
      2. **只查整体不逐项**：==拆开被积函数==，常常有一项可以扔。
      3. **区域改了不重查对称性**：半圆盘与整圆盘的对称性不同。
      4. **轮换对称用在非对称区域上**：==圆柱只能轮换 $x,y$==，不能带 $z$。
      5. **椭圆区域当成轮换对称**：==系数不同就不对称==。
      6. **偶函数忘了乘 $2$**：偶倍奇零，==偶是两倍不是一倍==。
      7. **对称掉之后忘了还有别的项**：$0$ 只是那一项。
      8. **不查对称性直接硬算**：==十秒的检查，常常省掉整道题==。
    ` },

  ],
});
