/* ==========================================================================
   高等数学 / 6 定积分的应用 / 面积、体积与弧长
   —— 几何量的公式群。建模思路见 definite-app/micro-element。
   ========================================================================== */

KM.page({
  path: 'calculus/definite-app/area-volume',
  title: '面积、体积与弧长',
  subtitle: '公式不必背——**知道"一小块长什么样"，公式自己就写出来了**。真正要练的是选切法',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'formulas', id: 'area-formulas', title: '面积', items: [
      { label: '直角坐标（上减下）', tex: String.raw`A=\int_a^b\left[f(x)-g(x)\right]\mathrm{d}x` },
      { label: '直角坐标（右减左）', tex: String.raw`A=\int_c^d\left[\varphi(y)-\psi(y)\right]\mathrm{d}y` },
      { label: '极坐标（扇形微元）', tex: String.raw`A=\frac{1}{2}\int_{\alpha}^{\beta}r^{2}(\theta)\,\mathrm{d}\theta` },
      { label: '参数方程', tex: String.raw`A=\int_{t_1}^{t_2}y(t)\,x'(t)\,\mathrm{d}t` },
    ] },

    { t: 'key', id: 'polar-half', title: '极坐标为什么有个 $\\frac12$', c: String.raw`
      ==极坐标的微元不是矩形，是**扇形**==。
      半径为 $r$、圆心角为 $\dtheta$ 的扇形面积是
      $$\d A=\frac12r^{2}\dtheta,$$
      ==这个 $\frac12$ 来自扇形面积公式 $\frac12r^{2}\alpha$，不是凭空来的==。

      **别和二重积分的 $r\,\d r\dtheta$ 混了**：
      $$\underbrace{\frac12r^{2}\dtheta}_{\text{一维：整个扇形}}
      \qquad\text{vs}\qquad
      \underbrace{r\,\d r\dtheta}_{\text{二维：小方块}}$$
      ==前者已经把 $r$ 方向积完了==（从 $0$ 积到 $r(\theta)$）：
      $$\int_0^{r(\theta)}r\,\d r=\frac{r^{2}(\theta)}{2},$$
      ==这就是 $\frac12$ 的另一个来源==。两者完全一致。

      **常见的极坐标曲线**：

      | 曲线 | 方程 | $\theta$ 范围 |
      |---|---|---|
      | 心形线 | $r=a(1+\cos\theta)$ | $[0,2\pi]$ |
      | 三叶玫瑰线 | $r=a\sin3\theta$ | 一叶：$\left[0,\frac\pi3\right]$ |
      | 双纽线 | $r^{2}=a^{2}\cos2\theta$ | 一叶：$\left[-\frac\pi4,\frac\pi4\right]$ |

      ==定 $\theta$ 的范围时要看 $r\ge0$==：
      双纽线要求 $\cos2\theta\ge0$，==这就限定了 $\theta$==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'volume-sec', c: '一、旋转体体积' },

    { t: 'compare',
      id: 'two-methods',
      title: '★ 圆盘法 vs 柱壳法：切法垂直还是平行于轴',
      cols: ['', '圆盘（垫圈）法', '柱壳法'],
      rows: [
        ['切片方向', '==垂直==于旋转轴', '==平行==于旋转轴'],
        ['一片的形状', '圆盘 / 圆环', '薄圆筒'],
        ['绕 $x$ 轴', '$\\d V=\\pi y^{2}\\,\\mathrm{d}x$', '$\\d V=2\\pi y\\cdot x(y)\\,\\mathrm{d}y$'],
        ['绕 $y$ 轴', '$\\d V=\\pi x^{2}(y)\\,\\mathrm{d}y$', '==$\\d V=2\\pi x\\cdot y(x)\\,\\mathrm{d}x$=='],
        ['积分变量', '与轴==同名==', '与轴==不同名=='],
        ['适合', '曲线写成"$y=$"且绕 $x$ 轴', '曲线写成"$y=$"却绕 $y$ 轴'],
      ] },

    { t: 'key', id: 'shell-why', title: '柱壳法的微元怎么来的', c: String.raw`
      绕 $y$ 轴旋转、在 $x$ 处取宽为 $\dx$ 的竖条，
      转一圈得到一个==半径 $x$、高 $y(x)$、厚 $\dx$ 的薄圆筒==。
      把它剪开摊平是一块长方形板：
      $$\d V=\underbrace{2\pi x}_{\text{周长}}\times\underbrace{y(x)}_{\text{高}}\times\underbrace{\dx}_{\text{厚}}$$

      $$\boxed{\ \d V=2\pi\cdot(\text{到轴的距离})\times(\text{高})\times(\text{厚})\ }$$

      ==这个写法的好处是不必解出反函数==。
      比如 $y=x\sin x$ 绕 $y$ 轴转，
      用圆盘法要写成 $x=x(y)$（解不出来），==柱壳法直接 $2\pi x\cdot x\sin x\dx$==。

      **选择的一句话判据**：
      $$\boxed{\ \text{曲线是 }y=f(x)\ \text{的形式}:\ \text{绕 }x\text{ 轴用圆盘，绕 }y\text{ 轴用柱壳}\ }$$
      ==这样永远不用求反函数==。

      **绕其他直线**：把"到轴的距离"换成相应的表达式即可。
      绕 $x=a$ 转时距离是 $\abs{x-a}$，绕 $y=b$ 转时是 $\abs{y-b}$。
      ==公式的结构不变，只换那个距离。==
    ` },

    { t: 'formulas', id: 'volume-formulas', title: '体积公式速查', items: [
      { label: '绕 $x$ 轴（圆盘）', tex: String.raw`V=\pi\int_a^b f^{2}(x)\,\mathrm{d}x` },
      { label: '绕 $x$ 轴（有洞，垫圈）', tex: String.raw`V=\pi\int_a^b\left[f^{2}(x)-g^{2}(x)\right]\mathrm{d}x` },
      { label: '绕 $y$ 轴（柱壳）', tex: String.raw`V=2\pi\int_a^b x\,f(x)\,\mathrm{d}x\quad(0\le a<b)` },
      { label: '已知截面积', tex: String.raw`V=\int_a^b A(x)\,\mathrm{d}x` },
    ] },

    { t: 'warn', id: 'washer-trap', title: '有洞时是"平方之差"，不是"差的平方"', c: String.raw`
      $$V=\pi\int_a^b\left[f^{2}(x)-g^{2}(x)\right]\dx
      \qquad\ne\qquad
      \pi\int_a^b\left[f(x)-g(x)\right]^{2}\dx$$

      ==左边对，右边错==。
      理由：一片是==圆环==，面积是"大圆减小圆"
      $$\pi f^{2}-\pi g^{2},$$
      ==不是"半径之差"的圆的面积==。

      **这是本章最高频的错误。**
      记忆办法：==面积的差，不是半径的差==。

      **对比面积公式**：求面积时是 $\int(f-g)\dx$（==一次==，可以相减），
      求体积时是 $\int(f^{2}-g^{2})\dx$（==平方之后再相减==）。
      ==两者形式相似但不能类推。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'arc-sec', c: '二、弧长与旋转曲面' },

    { t: 'key', id: 'arc-length', title: '弧长：勾股定理的无穷小版本', c: String.raw`
      $$\ds=\sqrt{(\dx)^{2}+(\dy)^{2}}$$
      把 $\dx$ 或 $\dt$ 提出来就得到三个公式：

      $$\text{直角坐标}:\ L=\int_a^b\sqrt{1+f'^{2}(x)}\dx$$
      $$\text{参数方程}:\ L=\int_{t_1}^{t_2}\sqrt{x'^{2}(t)+y'^{2}(t)}\dt$$
      $$\text{极坐标}:\ L=\int_{\alpha}^{\beta}\sqrt{r^{2}(\theta)+r'^{2}(\theta)}\dtheta$$

      ==三个公式其实是同一个==，只是把 $\ds$ 用不同的参数表示。
      **极坐标那条的推导**：由 $x=r\cos\theta$、$y=r\sin\theta$，
      $$x'=r'\cos\theta-r\sin\theta,\quad y'=r'\sin\theta+r\cos\theta,$$
      $$x'^{2}+y'^{2}=r'^{2}+r^{2},$$
      ==交叉项相消==，得到那个漂亮的形式。

      **旋转曲面面积**（绕 $x$ 轴）：
      $$S=2\pi\int_a^b f(x)\ds=2\pi\int_a^b f(x)\sqrt{1+f'^{2}(x)}\dx$$
      ==这里的 $\ds$ 不能写成 $\dx$==——
      一小片是圆台侧面，母线长是 $\ds$ 而不是 $\dx$。

      $$\boxed{\ \text{体积用 }\dx\text{，曲面面积用 }\ds\ }$$
      **这是本节第二高频的错误**：
      $2\pi\int f\dx$ 少了 $\sqrt{1+f'^{2}}$，==算出来偏小==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-shell',
      title: '★ 柱壳法：避开求反函数',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        求由 $y=\sin x$（$0\le x\le\pi$）与 $x$ 轴围成的图形
        绕 $y$ 轴旋转所得旋转体的体积。
      `,
      idea: String.raw`
        **曲线是 $y=\sin x$ 的形式，绕 $y$ 轴转**——
        按[判据](#/calculus/definite-app/area-volume?at=shell-why)==直接用柱壳法==。

        **若用圆盘法会怎样**：要把 $y=\sin x$ 反解成 $x=x(y)$，
        而 $[0,\pi]$ 上 $\sin$ ==不单调==，
        要分成 $x=\arcsin y$（左半）与 $x=\pi-\arcsin y$（右半）两支，
        $$V=\pi\int_0^{1}\left[(\pi-\arcsin y)^{2}-(\arcsin y)^{2}\right]\dy,$$
        ==能算但相当麻烦==（还要处理 $\arcsin$ 的积分）。

        **柱壳法**：在 $x$ 处取宽 $\dx$ 的竖条，
        到 $y$ 轴的距离是 $x$、高是 $\sin x$、厚是 $\dx$：
        $$\d V=2\pi x\sin x\dx,$$
        ==直接积，一个式子到底==。

        **剩下的是 $\int_0^\pi x\sin x\dx$**，
        典型的"幂 × 三角"，用[分部积分](#/calculus/indefinite/by-parts?at=lipet)。
        ==顺带一提，这个积分在[定积分对称换元](#/calculus/definite/properties?at=ex-substitution)那题里出现过==。
      `,
      solution: String.raw`
        用柱壳法。在 $x\in[0,\pi]$ 处取宽为 $\dx$ 的竖条，绕 $y$ 轴旋转得薄圆筒：
        $$\d V=2\pi\cdot\underbrace{x}_{\text{半径}}\cdot\underbrace{\sin x}_{\text{高}}\cdot\dx.$$

        故
        $$V=2\pi\int_0^{\pi}x\sin x\dx.$$

        分部积分（取 $u=x$，$\dv=\sin x\dx$，$v=-\cos x$）：
        $$\int_0^{\pi}x\sin x\dx=\left[-x\cos x\right]_0^{\pi}+\int_0^{\pi}\cos x\dx$$
        $$=\left(-\pi\cos\pi-0\right)+\left[\sin x\right]_0^{\pi}
        =\pi+0=\pi.$$

        故
        $$V=2\pi\cdot\pi=2\pi^{2}.$$
      `,
      comment: String.raw`
        **合理性检查**：这个旋转体外接于"半径 $\pi$、高 $1$ 的圆柱"，
        其体积为 $\pi\cdot\pi^{2}\cdot1=\pi^{3}\approx31$。
        算出的 $2\pi^{2}\approx19.7$，==确实小于外接圆柱，量级合理==。$\checkmark$

        **帕普斯定理的验证**（作为第二重检验）：
        旋转体体积 $=$ 平面图形面积 $\times$ 形心绕行的周长。
        - 面积 $A=\int_0^\pi\sin x\dx=2$；
        - 形心横坐标 $\bar x=\frac{\int_0^\pi x\sin x\dx}{\int_0^\pi\sin x\dx}=\frac{\pi}{2}$
          （==由对称性也能看出==）；
        - 故 $V=A\cdot2\pi\bar x=2\cdot2\pi\cdot\frac\pi2=2\pi^{2}\ \checkmark$

        ==帕普斯定理不是考纲要求，但用来验算非常快==，
        而且它揭示了"柱壳法的公式 $2\pi\int xf\dx$ 里，
        $\int xf\dx$ 正是[形心的分子](#/calculus/definite-app/micro-element?at=ex-density)"。

        **什么时候柱壳法反而不好用**：
        图形不在 $x\ge0$ 一侧时，"到轴的距离"要写 $\abs x$，==要分段==。
        本题 $x\in[0,\pi]$ 全在右侧，==所以直接写 $x$ 就行==。
      `,
    },

    { t: 'example',
      id: 'ex-arc',
      title: '弧长与旋转曲面：$\\d s$ 不能写成 $\\d x$',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设曲线 $y=\dfrac{x^{2}}{2}$，$0\le x\le1$。

        1. 求该曲线的弧长；
        2. 求该曲线绕 $x$ 轴旋转所得曲面的面积。
      `,
      idea: String.raw`
        **两问共用同一个 $\ds$**：
        $$y'=x\ \Longrightarrow\ \ds=\sqrt{1+x^{2}}\dx.$$

        **第 1 问**：$L=\int_0^1\sqrt{1+x^{2}}\dx$，
        这是[必背结论](#/calculus/indefinite/toolbox?at=classics)里的
        $\int\sqrt{x^{2}+a^{2}}\dx$（$a=1$）。

        **第 2 问**：$S=2\pi\int_0^1 y\ds=2\pi\int_0^1\frac{x^{2}}{2}\sqrt{1+x^{2}}\dx$。
        ==这个积分要三角代换或分部==，比第 1 问难。

        ==注意第 2 问里的 $\ds$ 绝不能换成 $\dx$==：
        写成 $2\pi\int\frac{x^{2}}{2}\dx$ 是[本节第二高频错误](#/calculus/definite-app/area-volume?at=arc-length)。

        **第 2 问的计算路线**：令 $x=\tan t$ 会出现 $\int\tan^{2}t\sec^{3}t\dt$，
        ==比较繁==。更快的办法是先分部：
        $$\int x^{2}\sqrt{1+x^{2}}\dx
        =\int x\cdot x\sqrt{1+x^{2}}\dx,$$
        取 $\dv=x\sqrt{1+x^{2}}\dx$（==这块能直接凑微分==），
        $v=\frac13(1+x^{2})^{3/2}$。
      `,
      solution: String.raw`
        由 $y=\dfrac{x^{2}}{2}$ 得 $y'=x$，故
        $$\ds=\sqrt{1+y'^{2}}\dx=\sqrt{1+x^{2}}\dx.$$

        **(1) 弧长**：
        $$L=\int_0^{1}\sqrt{1+x^{2}}\dx
        =\left[\frac x2\sqrt{1+x^{2}}+\frac12\ln\left(x+\sqrt{1+x^{2}}\right)\right]_0^{1}$$
        $$=\frac{\sqrt2}{2}+\frac12\ln\left(1+\sqrt2\right).$$

        **(2) 旋转曲面面积**：
        $$S=2\pi\int_0^{1}y\ds=2\pi\int_0^{1}\frac{x^{2}}{2}\sqrt{1+x^{2}}\dx
        =\pi\int_0^{1}x^{2}\sqrt{1+x^{2}}\dx.$$

        记 $I=\displaystyle\int_0^{1}x^{2}\sqrt{1+x^{2}}\dx$。分部积分，
        取 $u=x$、$\dv=x\sqrt{1+x^{2}}\dx$，$v=\dfrac13\left(1+x^{2}\right)^{3/2}$：
        $$I=\left[\frac x3(1+x^{2})^{3/2}\right]_0^{1}-\frac13\int_0^{1}(1+x^{2})^{3/2}\dx
        =\frac{2\sqrt2}{3}-\frac13\int_0^{1}(1+x^{2})^{3/2}\dx.$$

        对 $J=\displaystyle\int_0^{1}(1+x^{2})^{3/2}\dx$，注意
        $(1+x^{2})^{3/2}=(1+x^{2})\sqrt{1+x^{2}}=\sqrt{1+x^{2}}+x^{2}\sqrt{1+x^{2}}$，故
        $$J=L+I.$$

        代回：$I=\dfrac{2\sqrt2}{3}-\dfrac13(L+I)$，即 $\dfrac43I=\dfrac{2\sqrt2}{3}-\dfrac L3$，
        $$I=\frac{2\sqrt2}{4}-\frac L4=\frac{\sqrt2}{2}-\frac L4.$$

        代入 $L=\dfrac{\sqrt2}{2}+\dfrac12\ln(1+\sqrt2)$：
        $$I=\frac{\sqrt2}{2}-\frac14\left[\frac{\sqrt2}{2}+\frac12\ln(1+\sqrt2)\right]
        =\frac{3\sqrt2}{8}-\frac18\ln\left(1+\sqrt2\right).$$

        故
        $$S=\pi I=\frac{\pi}{8}\left[3\sqrt2-\ln\left(1+\sqrt2\right)\right].$$
      `,
      comment: String.raw`
        **第 (2) 问的"$J=L+I$"是全题的巧点**：
        把 $(1+x^{2})^{3/2}$ 拆成 $\sqrt{1+x^{2}}+x^{2}\sqrt{1+x^{2}}$，
        ==右边两块正好是已经出现过的 $L$ 和 $I$==，
        于是得到一个关于 $I$ 的方程。
        ==这与[分部积分的循环型](#/calculus/indefinite/by-parts?at=recurrence)是同一个念头：
        不硬算，而是解方程。==

        **数值检查**：$L\approx0.7071+0.4407=1.1478$，
        而曲线从 $(0,0)$ 到 $(1,0.5)$ 的直线距离是 $\sqrt{1.25}\approx1.118$。
        ==弧长略大于弦长，合理==。$\checkmark$

        $S=\frac{\pi}{8}(4.243-0.881)\approx1.32$。
        粗估：曲面大致是"半径 $0\sim0.5$、母线约 $1.15$"的锥面，
        侧面积量级 $\pi\bar r\cdot\ell\approx\pi\times0.25\times1.15\approx0.9$，
        ==同量级==。$\checkmark$

        **本题的教训**：
        $$\boxed{\ \text{弧长和曲面面积都用 }\ds\text{；体积和面积用 }\dx\ }$$
        ==判据是"这个量是沿曲线量的，还是沿区间量的"==。
        沿曲线 $\Rightarrow$ $\ds$；沿区间 $\Rightarrow$ $\dx$。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **垫圈法写成"差的平方"**：==是 $f^{2}-g^{2}$，不是 $(f-g)^{2}$==。
      2. **旋转曲面面积用 $\dx$**：==必须用 $\ds=\sqrt{1+f'^{2}}\dx$==。
      3. **极坐标面积漏 $\frac12$**：微元是==扇形==不是矩形。
      4. **极坐标的 $\theta$ 范围没定对**：要保证 ==$r\ge0$==，
         双纽线、玫瑰线尤其要小心。
      5. **绕 $y$ 轴硬求反函数**：==用柱壳法==，$2\pi\int xf(x)\dx$。
      6. **柱壳法的"距离"写错**：绕 $x=a$ 转时是 $\abs{x-a}$。
      7. **上下（左右）减反**：==算出负值就是减反了==。
      8. **积分限与切法不匹配**：见[微元法](#/calculus/definite-app/micro-element?at=common-mistakes)。
      9. **不做量级检查**：==用外接图形或退化情形验一下==，成本极低。
    ` },

  ],
});
