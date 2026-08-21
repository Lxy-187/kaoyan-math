/* ==========================================================================
   高等数学 / 2 一元函数微分学 / 微分与近似计算
   —— 微分的定义、几何意义、形式不变性、线性近似与误差。
      导数定义见 derivative/definition。
   ========================================================================== */

KM.page({
  path: 'calculus/derivative/differential',
  title: '微分与近似计算',
  subtitle: '微分是**用直线代替曲线**。整个微积分的应用层——微元法、线性化、泰勒——都建立在这一个念头上',
  tags: ['小题', '概念辨析'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'definition', title: '定义：可微就是「增量能拆成线性主部 + 高阶项」', c: String.raw`
      称 $f$ 在 $x_0$ 处**可微**，若增量可以写成
      $$\boxed{\ \Delta y=f(x_0+\Delta x)-f(x_0)=A\Delta x+o(\Delta x)\ }$$
      其中 $A$ 是与 $\Delta x$ 无关的常数。此时称 $A\Delta x$ 为**微分**，记
      $$\d y=A\dx.$$

      **一元函数中**：
      $$\boxed{\ \text{可微}\iff\text{可导，且 }A=f'(x_0)\ }$$
      $$\d y=f'(x_0)\dx$$

      ==$\dx$ 就是 $\Delta x$==（自变量的微分等于它的增量），
      但 ==$\dy\ne\Delta y$==（差一个 $o(\Delta x)$）。

      **两句话的区别要抠清楚**：

      | 记号 | 含义 |
      |---|---|
      | $\Delta y$ | ==函数的真实增量==（曲线上的高度差） |
      | $\dy$ | ==切线上的高度差==（线性近似） |
      | $\Delta y-\dy$ | $o(\Delta x)$，比 $\Delta x$ 高阶 |

      **由此得到导数的分式记号**：
      $$f'(x)=\frac{\dy}{\dx},$$
      ==这个记号现在名副其实==——它真的是两个微分之比。
      ==在[参数方程](#/calculus/derivative/techniques?at=parametric)、
      [换元积分](#/calculus/indefinite/substitution?at=core)里，
      正是这个"可以当分式用"的性质在起作用。==
    ` },

    { t: 'key', id: 'geometry', title: '几何意义：以直代曲', c: String.raw`
      在 $(x_0,f(x_0))$ 处作切线，则

      $$\underbrace{\Delta y}_{\text{曲线的高度变化}}\ \approx\ \underbrace{\dy}_{\text{切线的高度变化}}$$

      ==误差是 $\Delta x$ 的高阶无穷小==，所以 $\Delta x$ 越小，近似越好。

      **这个念头贯穿全书**：

      | 场合 | "以直代曲"的体现 |
      |---|---|
      | [微元法](#/calculus/definite-app/micro-element?at=core) | 把小块当成规则形状 |
      | [弧长公式](#/calculus/definite-app/area-volume?at=arc-length) | $\ds=\sqrt{(\dx)^{2}+(\dy)^{2}}$（勾股定理） |
      | [泰勒展开](#/threads/lines/taylor?at=core) | 一阶就是切线，高阶是更好的近似 |
      | 牛顿迭代法 | 用切线的零点近似函数的零点 |
      | [多元的切平面](#/calculus/multi-derivative/geometry-app?at=tangent-param) | 以平面代曲面 |

      ==微分是"局部线性化"这个思想最原始的形式==。
    ` },

    { t: 'key', id: 'invariance', title: '★ 一阶微分形式不变性', c: String.raw`
      $$\boxed{\ \dy=f'(u)\du\qquad\text{无论 }u\text{ 是自变量还是中间变量}\ }$$

      **含义**：设 $y=f(u)$、$u=g(x)$，则
      $$\dy=f'(u)g'(x)\dx=f'(u)\du,$$
      ==形式和"$u$ 是自变量"时完全一样==。

      **它的用处**：==求复合函数的微分时可以逐层套==，
      不必展开成 $x$ 的表达式。
      $$\d\left(\sin\left(x^{2}\right)\right)=\cos\left(x^{2}\right)\d\left(x^{2}\right)
      =\cos\left(x^{2}\right)\cdot2x\dx.$$

      ==这正是[凑微分法](#/calculus/indefinite/substitution?at=spot)的理论依据==：
      $$\int f(g(x))g'(x)\dx=\int f(u)\du,$$
      ==之所以能"把 $g'(x)\dx$ 收进 $\d g(x)$"，靠的就是形式不变性==。

      **二阶微分没有这个性质**：
      $$\d^{2}y=f''(u)\left(\du\right)^{2}+f'(u)\d^{2}u,$$
      ==$u$ 是自变量时 $\d^{2}u=0$，第二项才消失==。
      **所以"形式不变性"只对一阶成立**，这是概念题的考点。
    ` },

    { t: 'method', id: 'approximation', title: '近似计算：三步', c: String.raw`
      $$f(x)\approx f(x_0)+f'(x_0)(x-x_0)$$

      1. **选 $f$**：把待求的数写成某个函数在某点的值；
      2. **选 $x_0$**：==附近、且 $f(x_0)$ 与 $f'(x_0)$ 好算==的点；
      3. **代公式**。

      **第 2 步是关键**。求 $\sqrt{4.02}$ 时取 $x_0=4$（==$\sqrt4=2$ 好算==），
      求 $\sin31°$ 时取 $x_0=\frac\pi6$（==注意先化成弧度==）。

      **$x=0$ 附近的常用近似**（==必须背==）：
      $$(1+x)^{\alpha}\approx1+\alpha x,\qquad e^{x}\approx1+x,\qquad \ln(1+x)\approx x$$
      $$\sin x\approx x,\qquad \tan x\approx x,\qquad \cos x\approx1-\frac{x^{2}}{2}$$

      ==这些就是[一阶泰勒](#/calculus/limit/equivalent?at=table)==，
      与等价无穷小是同一张表的两种用法：
      ==等价无穷小用来求极限，线性近似用来估数值==。

      **误差估计**：由拉格朗日余项
      $$\abs{f(x)-\left[f(x_0)+f'(x_0)(x-x_0)\right]}
      =\frac{\abs{f''(\xi)}}{2}(x-x_0)^{2}\le\frac{M}{2}(x-x_0)^{2},$$
      ==误差是 $(\Delta x)^{2}$ 量级==，
      所以 $\Delta x$ 减半，误差变成四分之一。
    ` },

    { t: 'key', id: 'error-analysis', title: '相对误差：微分的实用价值', c: String.raw`
      测量 $x$ 有误差 $\Delta x$ 时，计算 $y=f(x)$ 的误差约为
      $$\abs{\Delta y}\approx\abs{f'(x)}\abs{\Delta x}\qquad(\text{绝对误差}),$$
      $$\left|\frac{\Delta y}{y}\right|\approx\left|\frac{f'(x)}{f(x)}\right|\abs{\Delta x}
      =\abs{\left(\ln\abs f\right)'}\abs{\Delta x}\qquad(\text{相对误差}).$$

      ==相对误差的公式里出现了 $(\ln f)'$==，
      这正是[对数求导法](#/calculus/derivative/techniques?at=log-derivative)的形状——
      **所以估计相对误差时，取对数再求导最快。**

      **几个常用结论**：

      | $y$ | 相对误差的传递 |
      |---|---|
      | $y=x^{n}$ | ==放大 $n$ 倍== |
      | $y=\sqrt x$ | 缩小一半 |
      | $y=uv$ | ==两者的相对误差相加== |
      | $y=u/v$ | 同上（也是相加） |

      **推导**：$\ln y=n\ln x\Rightarrow\frac{\Delta y}{y}=n\frac{\Delta x}{x}$。
      ==量测正方体边长有 $1\%$ 的误差，算出的体积就有 $3\%$ 的误差==，
      这是这条公式最直观的用法。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-approx',
      title: '近似计算与误差估计',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        1. 用微分求 $\sqrt[3]{1.02}$ 的近似值，并估计误差。
        2. 测得球的半径为 $R=10\ \mathrm{cm}$，相对误差为 $0.5\%$，
           求由此算出的球体积的相对误差。
      `,
      idea: String.raw`
        **第 1 问**：待求的是 $\sqrt[3]{1.02}$，
        ==写成 $(1+x)^{1/3}$ 在 $x=0.02$ 处的值==，
        用近似式 $(1+x)^{\alpha}\approx1+\alpha x$（$\alpha=\frac13$）。

        误差用[拉格朗日余项](#/calculus/derivative/differential?at=approximation)：
        $$f(x)=(1+x)^{1/3},\quad f''(x)=\frac13\cdot\left(-\frac23\right)(1+x)^{-5/3}
        =-\frac{2}{9}(1+x)^{-5/3}.$$
        在 $[0,0.02]$ 上 $\abs{f''}\le\frac29$，故误差 $\le\frac{2/9}{2}(0.02)^{2}$。

        **第 2 问**：$V=\frac43\pi R^{3}$，==是幂函数，相对误差放大 $3$ 倍==。
        由[误差传递表](#/calculus/derivative/differential?at=error-analysis)直接得 $1.5\%$。

        **也可以现推**：$\ln V=\ln\frac{4\pi}{3}+3\ln R$，
        求微分得 $\frac{\d V}{V}=3\frac{\d R}{R}$，
        ==取对数再求微分是最快的路线==。
      `,
      solution: String.raw`
        **(1)** 取 $f(x)=(1+x)^{1/3}$，$x_0=0$，$\Delta x=0.02$。
        $$f(0)=1,\qquad f'(x)=\frac13(1+x)^{-2/3},\qquad f'(0)=\frac13.$$
        故
        $$\sqrt[3]{1.02}\approx f(0)+f'(0)\cdot0.02=1+\frac{0.02}{3}\approx1.006667.$$

        **误差估计**：由拉格朗日余项，存在 $\xi\in(0,0.02)$ 使误差为
        $$\left|\frac{f''(\xi)}{2}(0.02)^{2}\right|,\qquad
        f''(x)=-\frac29(1+x)^{-5/3}.$$
        在 $[0,0.02]$ 上 $\abs{f''(x)}\le\dfrac29$，故
        $$\text{误差}\le\frac{2/9}{2}\times(0.02)^{2}=\frac{1}{9}\times4\times10^{-4}
        \approx4.4\times10^{-5}.$$

        （精确值 $\sqrt[3]{1.02}=1.0066227$，==实际误差 $4.4\times10^{-5}$，与估计吻合==。）

        **(2)** 球体积 $V=\dfrac43\pi R^{3}$。两边取对数：
        $$\ln V=\ln\frac{4\pi}{3}+3\ln R.$$
        求微分：
        $$\frac{\d V}{V}=3\cdot\frac{\d R}{R}.$$
        故
        $$\left|\frac{\Delta V}{V}\right|\approx3\left|\frac{\Delta R}{R}\right|
        =3\times0.5\%=1.5\%.$$
      `,
      comment: String.raw`
        **(1) 的误差估计与实际误差吻合得很好**：
        估计上界 $4.4\times10^{-5}$，实际 $1.0066227-1.0066667=-4.40\times10^{-5}$。
        ==因为 $f''$ 在这么小的区间上几乎是常数，所以上界几乎是精确值==。

        **注意误差的符号**：$f''<0$ 说明 $f$ 是[凹函数](#/calculus/derivative-app/convexity?at=definition)，
        ==切线在曲线上方，所以线性近似**偏大**==。
        算出的 $1.006667>1.0066227$ $\checkmark$
        ==用凹凸性判断近似值偏大还是偏小，是一个免费的检查。==

        **(2) 的一般结论值得记**：
        $$y=x^{n}\ \Longrightarrow\ \frac{\Delta y}{y}\approx n\frac{\Delta x}{x}.$$
        ==三维的量（体积）对一维测量误差的放大倍数是 $3$==。
        实际工程里这条很重要：==要把体积算准到 $1\%$，半径必须量准到 $0.33\%$==。

        **取对数求微分的通用性**：
        对 $y=\frac{u^{a}v^{b}}{w^{c}}$，
        $$\frac{\d y}{y}=a\frac{\du}{u}+b\frac{\dv}{v}-c\frac{\d w}{w},$$
        ==相对误差按指数加权相加（取绝对值时全部相加，估最坏情形）==。
        这比直接求导快得多。

        **常见错误**：把 (2) 答案写成 $0.5\%$（忘了放大）
        或 $\frac{0.5\%}{3}$（放大方向反了）。
        ==记忆：维数越高，误差放大越厉害。==
      `,
    },

    { t: 'example',
      id: 'ex-concept',
      title: '概念辨析：$\\Delta y$、$\\d y$ 与它们的差',
      source: '标准例题（概念型）',
      level: 3,
      problem: String.raw`
        设 $y=x^{3}$，$x_0=1$。

        1. 求 $\Delta x=0.1$ 时的 $\Delta y$ 与 $\dy$，并求 $\Delta y-\dy$；
        2. 说明当 $\Delta x\to0$ 时 $\Delta y-\dy$ 是 $\Delta x$ 的几阶无穷小。
      `,
      idea: String.raw`
        **直接按定义算**：
        $$\Delta y=(1+\Delta x)^{3}-1^{3},\qquad \dy=f'(1)\Delta x=3\Delta x.$$

        **展开 $\Delta y$**：
        $$(1+\Delta x)^{3}=1+3\Delta x+3(\Delta x)^{2}+(\Delta x)^{3},$$
        $$\Delta y=3\Delta x+3(\Delta x)^{2}+(\Delta x)^{3}.$$

        ==一眼就能看出 $\dy$ 是它的"线性主部"==，
        而
        $$\Delta y-\dy=3(\Delta x)^{2}+(\Delta x)^{3},$$
        ==首项是 $(\Delta x)^{2}$，所以是 $2$ 阶无穷小==。

        **这个结论是一般性的**：只要 $f$ 二阶可导，
        $$\Delta y-\dy=\frac{f''(\xi)}{2}(\Delta x)^{2},$$
        ==恒为 $2$ 阶无穷小（当 $f''(x_0)\ne0$ 时）==。

        ==本题的价值是把抽象的"$o(\Delta x)$"变成一个具体可算的量。==
      `,
      solution: String.raw`
        $f(x)=x^{3}$，$f'(x)=3x^{2}$，$f'(1)=3$。

        **(1)** 取 $\Delta x=0.1$：
        $$\Delta y=f(1.1)-f(1)=1.331-1=0.331,$$
        $$\dy=f'(1)\Delta x=3\times0.1=0.3,$$
        $$\Delta y-\dy=0.331-0.3=0.031.$$

        **(2)** 一般地，
        $$\Delta y=(1+\Delta x)^{3}-1=3\Delta x+3(\Delta x)^{2}+(\Delta x)^{3},$$
        $$\dy=3\Delta x,$$
        故
        $$\Delta y-\dy=3(\Delta x)^{2}+(\Delta x)^{3}.$$

        于是
        $$\lim_{\Delta x\to0}\frac{\Delta y-\dy}{(\Delta x)^{2}}
        =\lim_{\Delta x\to0}\left[3+\Delta x\right]=3\ne0,$$
        故 $\Delta y-\dy$ 是 $\Delta x$ 的==二阶无穷小==。

        （验证 (1)：$3\times0.01+0.001=0.031$ $\checkmark$）
      `,
      comment: String.raw`
        **三个量的相对大小**（$\Delta x=0.1$）：
        $$\Delta y=0.331,\qquad \dy=0.300,\qquad \Delta y-\dy=0.031,$$
        ==误差约占 $\Delta y$ 的 $9.4\%$==。
        取 $\Delta x=0.01$ 时：$\Delta y=0.030301$、$\dy=0.03$、
        差 $=0.000301$，==只占 $1\%$==。
        ==$\Delta x$ 缩小 $10$ 倍，相对误差缩小约 $10$ 倍==（因为误差是 $2$ 阶的）。

        **"$\dy$ 是 $\Delta y$ 的线性主部"这句话的含义**：

        - ==线性==：$\dy$ 关于 $\Delta x$ 是一次的；
        - ==主部==：$\Delta x\to0$ 时 $\frac{\dy}{\Delta y}\to1$，
          ==$\dy$ 占了 $\Delta y$ 的绝大部分==。

        **概念题的常见问法**：

        | 问 | 答 |
        |---|---|
        | $\dy$ 与 $\Delta y$ 相等吗 | ==一般不等==，除非 $f$ 是一次函数 |
        | $\dx$ 与 $\Delta x$ 相等吗 | ==相等==（自变量的微分就是增量） |
        | $\Delta y-\dy$ 是几阶无穷小 | ==$2$ 阶==（$f''(x_0)\ne0$ 时） |
        | 可微与可导的关系 | 一元中==等价== |

        ==第二行常被忽略==：$\dx=\Delta x$ 是约定，
        ==正因为如此，$f'=\frac{\dy}{\dx}$ 这个记号才成立==。

        **什么时候 $\dy=\Delta y$**：当 $f$ 是一次函数 $ax+b$ 时，
        $\Delta y=a\Delta x=\dy$，==误差恒为零==。
        ==这也说明"以直代曲"对直线是精确的，对曲线才有误差==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **把 $\dy$ 当成 $\Delta y$**：==两者差一个高阶无穷小==。
      2. **认为二阶微分也有形式不变性**：==只有一阶有==。
      3. **近似计算选错 $x_0$**：要选 ==$f(x_0)$ 与 $f'(x_0)$ 都好算==的点。
      4. **角度不化弧度**：$\sin31°$ 要先写成 $\sin\left(\frac\pi6+\frac{\pi}{180}\right)$。
      5. **相对误差的放大倍数搞错**：$y=x^{n}$ 时==放大 $n$ 倍==。
      6. **误差估计漏平方**：余项是 ==$\frac{f''}{2}(\Delta x)^{2}$==。
      7. **忘了 $\dx=\Delta x$**：这是约定，也是 $f'=\frac{\dy}{\dx}$ 成立的基础。
      8. **多元中套"可微 $\iff$ 可导"**：==一元才等价==。
      9. **不判断近似值偏大偏小**：==用 $f''$ 的符号（凹凸性）一秒判断==。
    ` },

  ],
});
