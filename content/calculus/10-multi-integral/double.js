/* ==========================================================================
   高等数学 / 10 重积分 / 二重积分：换序与坐标选择
   —— 定限是全部难点。三重积分见 multi-integral/triple；
      对称性见 multi-integral/symmetry。
   ========================================================================== */

KM.page({
  path: 'calculus/multi-integral/double',
  title: '二重积分：换序与坐标选择',
  subtitle: '二重积分的计算难度**几乎全在定限**。积分本身是一元的，定错限则满盘皆输',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'two-orders', title: '两种积分次序', c: String.raw`
      **先 $y$ 后 $x$（X 型区域）**：
      $$D:\ a\le x\le b,\quad \varphi_1(x)\le y\le\varphi_2(x)$$
      $$\iint_Df\dxy=\int_a^{b}\dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\dy$$

      **先 $x$ 后 $y$（Y 型区域）**：
      $$D:\ c\le y\le d,\quad \psi_1(y)\le x\le\psi_2(y)$$
      $$\iint_Df\dxy=\int_c^{d}\dy\int_{\psi_1(y)}^{\psi_2(y)}f(x,y)\dx$$

      $$\boxed{\ \text{外层永远是常数限，内层是函数限}\ }$$
      ==外层出现变量、或内层的变量与积分变量同名，一定是错的==。
      **这是最有效的自检：写完限先看外层是不是两个数。**

      **定限的操作（"穿线法"）**：

      1. 画出区域 $D$；
      2. 先 $y$ 后 $x$ 时，==在 $x$ 轴上确定范围 $[a,b]$==；
      3. 在这个范围内任取一个 $x$，==画一条竖直线穿过 $D$==，
         ==入口是 $y$ 的下限、出口是上限==；
      4. 若竖直线的"入口/出口"在某处换了曲线，==必须分块==。

      ==第 4 步是选次序的依据==：
      **哪个方向穿线不需要分块，就选哪个次序。**
    ` },

    { t: 'method', id: 'swap', title: '★ 交换积分次序：三步', c: String.raw`
      1. **由已给的累次积分==反推出区域 $D$==**（读不等式）；
      2. **画图**；
      3. **按另一个方向重新定限**。

      $$\boxed{\ \text{换序的关键是"画图"，不是代数变形}\ }$$
      ==直接对着式子交换 $\dx\dy$ 而不画图，几乎必错==。

      **什么时候必须换序**：

      | 信号 | 例 |
      |---|---|
      | ==内层积不出来== | $\int\dx\int e^{-y^{2}}\dy$ |
      | 内层要分段 | 被积函数含 $\abs\cdot$ 或 $\max$ |
      | 换序后能少分一块 | 区域是三角形之类 |

      **第一行是最常考的**：
      $$\int_0^{1}\dx\int_x^{1}e^{-y^{2}}\dy$$
      ==$e^{-y^{2}}$ 对 $y$ [积不出初等原函数](#/calculus/indefinite/toolbox?at=cannot)==，
      但换序后
      $$\int_0^{1}\dy\int_0^{y}e^{-y^{2}}\dx=\int_0^{1}ye^{-y^{2}}\dy$$
      ==内层对 $x$ 积分，$e^{-y^{2}}$ 是常数，直接出 $y$==，
      于是外层能凑微分了。

      **识别信号**：==被积函数只含一个变量且积不出来==，
      ==就换序让它变成"常数"==。
      $\frac{\sin y}{y}$、$e^{-y^{2}}$、$\frac{1}{\ln y}$ 都是这类。
    ` },

    { t: 'key', id: 'polar', title: '极坐标：什么时候换', c: String.raw`
      $$\boxed{\ \iint_Df(x,y)\dxy=\iint_{D'}f(r\cos\theta,r\sin\theta)\,r\,\d r\dtheta\ }$$
      ==那个 $r$ 是[雅可比行列式](#/threads/lines/quadratic?at=jacobian-one)，绝不能漏==。

      **该用极坐标的两个信号**：

      | 信号 | 例 |
      |---|---|
      | ==区域是圆、圆环、扇形== | $x^{2}+y^{2}\le a^{2}$ |
      | ==被积函数含 $x^{2}+y^{2}$== | $f=e^{-(x^{2}+y^{2})}$、$\sqrt{x^{2}+y^{2}}$ |

      ==两个信号中有一个就该考虑，两个都有就一定用==。

      **极坐标下的定限**：==先 $r$ 后 $\theta$==（绝大多数情况）
      $$\int_{\alpha}^{\beta}\dtheta\int_{r_1(\theta)}^{r_2(\theta)}f\cdot r\,\d r$$
      ==从原点出发沿 $\theta$ 方向画射线==，入口是 $r_1$、出口是 $r_2$。

      **几个常用区域的极坐标表示**：

      | 区域 | 极坐标 |
      |---|---|
      | 圆 $x^{2}+y^{2}\le a^{2}$ | $0\le\theta\le2\pi$，$0\le r\le a$ |
      | ==圆 $x^{2}+y^{2}\le2ax$== | ==$-\frac\pi2\le\theta\le\frac\pi2$，$0\le r\le2a\cos\theta$== |
      | 圆 $x^{2}+y^{2}\le2ay$ | $0\le\theta\le\pi$，$0\le r\le2a\sin\theta$ |
      | 直线 $x+y=1$ 下方 | $r\le\dfrac{1}{\cos\theta+\sin\theta}$ |

      ==第二、三行是"过原点的圆"，$r$ 的上限是 $\cos$ 或 $\sin$==，
      **判断方法：把 $x=r\cos\theta$ 代入 $x^{2}+y^{2}=2ax$ 得 $r^{2}=2ar\cos\theta$，
      约去 $r$ 即得。**

      **$\theta$ 的范围怎么定**：==看区域相对原点张开的角度==，
      过原点的圆只占半个平面（$\pi$ 的范围）。
    ` },

    { t: 'warn', id: 'common-traps', title: '三个高频陷阱', c: String.raw`
      **① 漏掉极坐标的 $r$。**
      $\dxy=r\,\d r\dtheta$，==漏了 $r$ 结果必错==。
      ==自检：算面积时 $\iint_D\d A$ 应当给出 $\pi a^{2}$（单位圆）==，
      漏 $r$ 会得到 $2\pi a$。

      **② 外层限含变量。**
      $$\int_0^{1}\dy\int_0^{y}f\dx\ \checkmark\qquad
      \int_0^{y}\dy\int_0^{1}f\dx\ \text{✗}$$
      ==外层必须是常数==。

      **③ 换序时不画图。**
      $\int_0^1\dx\int_x^1 f\dy$ 的区域是==三角形 $0\le x\le y\le1$==，
      换序后是 $\int_0^1\dy\int_0^y f\dx$，
      ==$x$ 的上限是 $y$ 而不是 $1$==。
      **不画图很容易写成 $\int_0^1\dy\int_0^1$（把三角形当成正方形）。**

      **一条通用的自检**：==换序前后，取 $f\equiv1$ 算面积，两者应当相等==。
      三十秒的验算，能挡住绝大多数换序错误。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-swap',
      title: '★ 换序：让积不出来的变成常数',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int_0^{1}\dx\int_{x}^{1}\frac{\sin y}{y}\dy$。
      `,
      idea: String.raw`
        **先看内层能不能积**：$\int\frac{\sin y}{y}\dy$
        ==[没有初等原函数](#/calculus/indefinite/toolbox?at=cannot)==，
        ==所以必须换序==。

        **读出区域**：
        $$0\le x\le1,\qquad x\le y\le1,$$
        即 $D=\set{(x,y):0\le x\le y\le1}$，
        ==是以 $(0,0),(1,1),(0,1)$ 为顶点的三角形==（对角线上方的一半）。

        **画图后按 $y$ 优先重新定限**：
        - $y$ 的范围：$0\le y\le1$；
        - 固定 $y$，水平穿线：==$x$ 从 $0$ 到 $y$==。

        $$\int_0^{1}\dy\int_0^{y}\frac{\sin y}{y}\dx.$$

        **内层对 $x$ 积分时 $\frac{\sin y}{y}$ 是常数**：
        $$\int_0^{y}\frac{\sin y}{y}\dx=\frac{\sin y}{y}\cdot y=\sin y.$$
        ==那个 $y$ 恰好把分母约掉==——这就是换序的全部收益。

        剩下 $\int_0^1\sin y\dy$，==一步出结果==。
      `,
      solution: String.raw`
        原积分的积分区域为
        $$D=\set{(x,y):\ 0\le x\le1,\ x\le y\le1}
        =\set{(x,y):\ 0\le y\le1,\ 0\le x\le y},$$
        即以 $(0,0)$、$(1,1)$、$(0,1)$ 为顶点的三角形。

        由于 $\dfrac{\sin y}{y}$ 关于 $y$ 无初等原函数，==交换积分次序==：
        $$\int_0^{1}\dx\int_{x}^{1}\frac{\sin y}{y}\dy
        =\int_0^{1}\dy\int_0^{y}\frac{\sin y}{y}\dx.$$

        内层积分（$\dfrac{\sin y}{y}$ 与 $x$ 无关）：
        $$\int_0^{y}\frac{\sin y}{y}\dx=\frac{\sin y}{y}\cdot y=\sin y.$$

        故
        $$\text{原式}=\int_0^{1}\sin y\dy=\left[-\cos y\right]_0^{1}=1-\cos1.$$

        （数值：$1-\cos1\approx1-0.5403=0.4597$。）
      `,
      comment: String.raw`
        **换序的收益一目了然**：
        ==原来内层积不出来，换序后内层是"常数乘区间长"，一步就完==。

        $$\boxed{\ \text{被积函数只含 }y\text{ 且积不出来}\ \Rightarrow\ \text{换成"先 }x\text{ 后 }y\text{"}\ }$$
        ==这样内层对 $x$ 积分时它是常数，积出来会乘上一个 $y$ 的因子==，
        ==而那个因子往往正好化简掉分母==。

        **同型题清单**（都是这个套路）：

        | 积分 | 换序后内层给出 |
        |---|---|
        | $\int_0^1\dx\int_x^1e^{-y^{2}}\dy$ | $ye^{-y^{2}}$，可凑微分 |
        | $\int_0^1\dx\int_x^1\frac{\sin y}{y}\dy$ | $\sin y$（本题） |
        | $\int_0^1\dx\int_{\sqrt x}^{1}\frac{\dy}{1+y^{4}}$ | $\frac{y^{2}}{1+y^{4}}$ |
        | $\int_0^1\dy\int_y^1 e^{x^{2}}\dx$ | $xe^{x^{2}}$ |

        ==第四行是"角色互换"的版本==：被积函数只含 $x$，就换成先 $y$ 后 $x$。

        **面积自检**：$f\equiv1$ 时
        - 原次序：$\int_0^1(1-x)\dx=\frac12$；
        - 新次序：$\int_0^1 y\dy=\frac12$ $\checkmark$

        ==两者相等，说明区域读对了==。
        **这个检验只要十秒，强烈建议每次换序都做。**

        **最容易错的地方**：把新的内层限写成 $\int_0^1\dx$（把三角形当正方形）。
        ==画图是唯一可靠的防错手段。==
      `,
    },

    { t: 'example',
      id: 'ex-polar',
      title: '极坐标：过原点的圆',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\iint_D\sqrt{x^{2}+y^{2}}\dxy$，
        其中 $D$ 是圆 $x^{2}+y^{2}\le2x$ 所围区域。
      `,
      idea: String.raw`
        **两个信号都齐了**：
        ==区域是圆、被积函数含 $x^{2}+y^{2}$== $\Rightarrow$ 一定用极坐标。

        **区域的极坐标表示**：把 $x=r\cos\theta$ 代入 $x^{2}+y^{2}\le2x$：
        $$r^{2}\le2r\cos\theta\ \Longrightarrow\ r\le2\cos\theta\quad(r>0).$$

        **$\theta$ 的范围**：需要 $r\le2\cos\theta$ 有意义，即 ==$\cos\theta\ge0$==，
        故 $-\frac\pi2\le\theta\le\frac\pi2$。

        ==几何上看：$x^{2}+y^{2}=2x$ 即 $(x-1)^{2}+y^{2}=1$，
        是圆心 $(1,0)$、半径 $1$ 的圆，==过原点、整个在右半平面==，
        所以从原点看它只张开 $\pi$ 的角度 $\checkmark$

        **被积函数**：$\sqrt{x^{2}+y^{2}}=r$。
        ==加上雅可比的 $r$，被积式是 $r\cdot r=r^{2}$==。

        $$\iint_D\sqrt{x^{2}+y^{2}}\dxy
        =\int_{-\pi/2}^{\pi/2}\dtheta\int_0^{2\cos\theta}r^{2}\,\d r.$$

        **最后会出现 $\int\cos^{3}\theta\dtheta$**，
        ==用[奇次幂凑微分](#/calculus/indefinite/substitution?at=spot)或[点火公式](#/calculus/definite/properties?at=wallis)==。
      `,
      solution: String.raw`
        由 $x^{2}+y^{2}\le2x$ 得 $(x-1)^{2}+y^{2}\le1$，
        是圆心 $(1,0)$、半径 $1$ 的圆盘（过原点）。

        **化极坐标**：$x=r\cos\theta$，$y=r\sin\theta$，代入边界方程
        $$r^{2}=2r\cos\theta\ \Longrightarrow\ r=2\cos\theta,$$
        故
        $$D':\ -\frac\pi2\le\theta\le\frac\pi2,\qquad 0\le r\le2\cos\theta.$$

        被积函数 $\sqrt{x^{2}+y^{2}}=r$，且 $\dxy=r\,\d r\dtheta$，故
        $$I=\int_{-\pi/2}^{\pi/2}\dtheta\int_0^{2\cos\theta}r\cdot r\,\d r
        =\int_{-\pi/2}^{\pi/2}\dtheta\int_0^{2\cos\theta}r^{2}\,\d r.$$

        **内层**：
        $$\int_0^{2\cos\theta}r^{2}\,\d r=\left[\frac{r^{3}}{3}\right]_0^{2\cos\theta}
        =\frac{8\cos^{3}\theta}{3}.$$

        **外层**（被积函数为偶函数，用对称性折半）：
        $$I=\frac83\int_{-\pi/2}^{\pi/2}\cos^{3}\theta\dtheta
        =\frac{16}{3}\int_0^{\pi/2}\cos^{3}\theta\dtheta.$$

        由[点火公式](#/calculus/definite/properties?at=wallis)（$n=3$ 为奇数）：
        $$\int_0^{\pi/2}\cos^{3}\theta\dtheta=\frac23\cdot1=\frac23.$$

        故
        $$I=\frac{16}{3}\times\frac23=\frac{32}{9}.$$
      `,
      comment: String.raw`
        **数值验证**：$\frac{32}{9}\approx3.5556$。
        粗估：区域是半径 $1$ 的圆盘（面积 $\pi\approx3.14$），
        被积函数 $\sqrt{x^{2}+y^{2}}$ 在区域上从 $0$ 到 $2$ 变化、平均约 $1.1$，
        ==积分应当在 $3.5$ 左右== $\checkmark$

        **"过原点的圆"是极坐标的标志性题型**：

        | 直角坐标 | 极坐标 | $\theta$ 范围 |
        |---|---|---|
        | $x^{2}+y^{2}\le2ax$（$a>0$） | $r\le2a\cos\theta$ | $\left[-\frac\pi2,\frac\pi2\right]$ |
        | $x^{2}+y^{2}\le2ay$ | $r\le2a\sin\theta$ | $[0,\pi]$ |
        | $x^{2}+y^{2}\le a^{2}$ | $r\le a$ | $[0,2\pi]$ |

        ==前两行的 $\theta$ 只有 $\pi$ 的范围==，
        **因为过原点的圆只占半个平面。写成 $[0,2\pi]$ 是常见错误**
        （那样会让 $r$ 的上限出现负数）。

        **对称性的使用**：$\cos^{3}\theta$ 是偶函数、区间对称，
        ==所以折半再乘 $2$==。
        ==也可以直接用点火公式在 $[-\frac\pi2,\frac\pi2]$ 上算==，
        但要注意点火公式是对 $[0,\frac\pi2]$ 说的。

        **不用点火公式的算法**（供对照）：
        $$\int\cos^{3}\theta\dtheta=\int(1-\sin^{2}\theta)\d(\sin\theta)
        =\sin\theta-\frac{\sin^{3}\theta}{3},$$
        在 $[0,\frac\pi2]$ 上得 $1-\frac13=\frac23$ $\checkmark$

        **一个常见的追问**：把被积函数改成 $x$，
        则 $x=r\cos\theta$，被积式变成 $r^{2}\cos\theta$，
        ==内层还是 $\frac{8\cos^{3}\theta}{3}$，但外层多一个 $\cos\theta$==，
        变成 $\int\cos^{4}\theta$，==这次点火（偶数）要乘 $\frac\pi2$==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **极坐标漏掉 $r$**：==$\dxy=r\,\d r\dtheta$==。
      2. **外层限含变量**：==外层必须是常数==。
      3. **换序不画图**：==画图是唯一可靠的办法==。
      4. **过原点的圆用 $\theta\in[0,2\pi]$**：==只有 $\pi$ 的范围==。
      5. **区域需要分块却没分**：穿线时入口/出口换了曲线就要分。
      6. **换序后不验面积**：==取 $f\equiv1$ 算两次，应当相等==。
      7. **该换序却硬积**：==被积函数积不出来就是换序的信号==。
      8. **点火公式用错区间**：公式是对 $[0,\frac\pi2]$ 的。
      9. **忘了利用对称性**：见[对称性那一页](#/calculus/multi-integral/symmetry?at=core)。
    ` },

  ],
});
