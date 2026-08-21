/* ==========================================================================
   高等数学 / 7 常微分方程 / 微分方程应用题
   —— 建模：把"变化率"翻译成方程。解法见 first-order / linear-const。
   ========================================================================== */

KM.page({
  path: 'calculus/ode/applications',
  title: '微分方程应用题',
  subtitle: '应用题的难点全在**列方程**：把题目里的"变化率""增长""与……成正比"翻译成 $\\deriv yx$ 的等式',
  tags: ['大题', '计算题'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'translate', title: '★ 翻译对照表', c: String.raw`
      | 中文 | 数学 |
      |---|---|
      | $y$ 的变化率 / 增长率 | $\deriv yt$ |
      | 相对增长率 | ==$\dfrac{1}{y}\deriv yt$== |
      | $A$ 与 $B$ 成正比 | $A=kB$（==$k$ 待定==） |
      | 成反比 | $A=\dfrac kB$ |
      | 速度 / 加速度 | $\deriv st$ / $\deriv{^{2}s}{t^{2}}$ |
      | 曲线在点 $(x,y)$ 处的切线斜率 | $\deriv yx$ |
      | 法线斜率 | ==$-\dfrac{1}{y'}$== |

      **建模的四步**：

      1. ==设未知函数并写清它的实际意义与单位==；
      2. ==找出"变化率 $=$ 什么"这个等式==（守恒、几何关系、物理定律）；
      3. ==写出初值条件==（$t=0$ 时的状态）；
      4. 解方程，==代初值定常数==，回答问题。

      **第 2 步的通用模式**：
      $$\deriv yt=\underbrace{(\text{流入速率})}_{\text{增加}}-\underbrace{(\text{流出速率})}_{\text{减少}}$$
      ==混合问题、人口问题、冷却问题都是这个形状==。

      **第 3 步最容易漏**：应用题几乎总是初值问题，
      ==答案必须是具体的函数，不能带 $C$==。
    ` },

    { t: 'compare',
      id: 'model-table',
      title: '五个经典模型',
      cols: ['情境', '方程', '解'],
      rows: [
        ['**指数增长/衰减**（人口、放射性）', '$\\deriv yt=ky$', '$y=y_0e^{kt}$'],
        ['**牛顿冷却**', '$\\deriv Tt=-k(T-T_0)$', '$T=T_0+(T_1-T_0)e^{-kt}$'],
        ['**限制增长**（logistic）', '$\\deriv yt=ky\\left(1-\\dfrac yM\\right)$', '$y=\\dfrac{M}{1+Ce^{-kt}}$'],
        ['**混合问题**（溶液）', '$\\deriv xt=r_{\\text{in}}c_{\\text{in}}-r_{\\text{out}}\\dfrac{x}{V(t)}$', '一阶线性'],
        ['**变力运动**', '$m\\deriv vt=F(v)$ 或 $F(t)$', '看 $F$ 的形式'],
      ] },

    { t: 'key', id: 'geometry-model', title: '几何类应用题', c: String.raw`
      **题型**：已知曲线上任意一点处的某个几何量满足某关系，求曲线方程。

      **常用的几何量**（设曲线上一点为 $(x,y)$，切线斜率 $y'$）：

      | 几何量 | 表达式 |
      |---|---|
      | 切线方程 | $Y-y=y'(X-x)$ |
      | ==切线在 $x$ 轴上的截距== | $x-\dfrac{y}{y'}$ |
      | ==切线在 $y$ 轴上的截距== | $y-xy'$ |
      | 法线方程 | $Y-y=-\dfrac{1}{y'}(X-x)$ |
      | 法线在 $x$ 轴上的截距 | $x+yy'$ |

      ==截距的两个公式建议现推==：
      在切线方程里令 $Y=0$ 解 $X$ 得 $x$ 轴截距，令 $X=0$ 得 $y$ 轴截距。
      **三十秒的事，比背可靠。**

      **还常出现的两个量**：
      $$\text{曲边梯形面积}=\int_0^{x}y(t)\dt,\qquad
      \text{弧长}=\int_0^{x}\sqrt{1+y'^{2}}\dt.$$
      ==含这两个量的题，两边对 $x$ 求导就能[消掉积分号](#/calculus/definite/variable-limit?at=core)==，
      ==把积分方程变成微分方程==。

      $$\boxed{\ \text{题目里出现}\int_0^x\ \Rightarrow\ \text{两边求导}\ }$$
      **求导之后别忘了从原方程读出初值**（令 $x=0$）。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-mixing',
      title: '混合问题：流入减流出',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        一容器内盛有 $100\ \mathrm L$ 清水。
        现以 $3\ \mathrm{L/min}$ 的速度注入含盐 $2\ \mathrm{g/L}$ 的盐水，
        同时以 $3\ \mathrm{L/min}$ 的速度排出混合均匀的液体。
        求 $t$ 时刻容器内的含盐量 $x(t)$，并求 $t\to\infty$ 时的极限。
      `,
      idea: String.raw`
        **设未知函数**：$x(t)=$ $t$ 时刻容器内的含盐量（单位 $\mathrm g$）。

        **体积不变**：流入流出速度都是 $3\ \mathrm{L/min}$，
        ==所以容器内始终是 $100\ \mathrm L$==。
        （若两个速度不等，$V(t)=100+(r_{\text{in}}-r_{\text{out}})t$，
        ==方程会复杂得多==。）

        **列方程**（[流入减流出](#/calculus/ode/applications?at=translate)）：
        $$\deriv xt=\underbrace{3\times2}_{\text{流入}\ \mathrm{g/min}}
        -\underbrace{3\times\frac{x}{100}}_{\text{流出}}=6-\frac{3x}{100}.$$
        ==流出的浓度是 $\frac{x}{100}$（混合均匀）==，这是关键的一步。

        **初值**：$x(0)=0$（初始是清水）。

        **方程类型**：$\deriv xt+\frac{3}{100}x=6$，==一阶线性==（也可分离变量）。

        **预判极限**：$t\to\infty$ 时系统趋于平衡，
        ==平衡时 $\deriv xt=0$，得 $x=\frac{6\times100}{3}=200$==。
        ==也就是"整容器都变成 $2\ \mathrm{g/L}$"==，$100\times2=200$ $\checkmark$
        **先算出平衡值，能验证最后的答案。**
      `,
      solution: String.raw`
        设 $x(t)$ 为 $t$ 时刻容器内的含盐量（$\mathrm g$）。
        由于流入与流出速度相同，容器内液体体积恒为 $100\ \mathrm L$。

        **建立方程**：
        $$\deriv xt=\underbrace{3\times2}_{\text{单位时间流入的盐}}
        -\underbrace{3\times\frac{x}{100}}_{\text{单位时间流出的盐}},$$
        即
        $$\deriv xt+\frac{3}{100}x=6,\qquad x(0)=0.$$

        **求解**（一阶线性，$P=\frac{3}{100}$，$Q=6$）：
        积分因子 $e^{\int P\dt}=e^{3t/100}$，
        $$x=e^{-3t/100}\left(\int 6e^{3t/100}\dt+C\right)
        =e^{-3t/100}\left(6\cdot\frac{100}{3}e^{3t/100}+C\right)$$
        $$=200+Ce^{-3t/100}.$$

        **代初值** $x(0)=0$：$0=200+C$，故 $C=-200$。

        $$\boxed{\ x(t)=200\left(1-e^{-3t/100}\right)\ \mathrm g\ }$$

        **极限**：
        $$\lim_{t\to\infty}x(t)=200\ \mathrm g.$$

        **验证**：$x'=200\cdot\frac{3}{100}e^{-3t/100}=6e^{-3t/100}$，
        而 $6-\frac{3x}{100}=6-6\left(1-e^{-3t/100}\right)=6e^{-3t/100}$ $\checkmark$
      `,
      comment: String.raw`
        **极限 $200\ \mathrm g$ 的意义**：容器最终变成 $2\ \mathrm{g/L}$ 的盐水，
        ==与注入液的浓度一致==——这符合直觉，==也是最好的答案检验==。

        $$\boxed{\ \text{混合问题的极限}=\text{容器体积}\times\text{注入浓度}\ }$$
        （前提是流入流出速度相等。）

        **"半衰期"式的追问**：容器内盐量达到 $100\ \mathrm g$ 需要多久？
        $$200\left(1-e^{-3t/100}\right)=100\ \Rightarrow\ e^{-3t/100}=\frac12
        \ \Rightarrow\ t=\frac{100\ln2}{3}\approx23.1\ \mathrm{min}.$$

        **流入流出速度不等时的变化**：设流入 $3$、流出 $2$，则
        $$V(t)=100+t,\qquad \deriv xt=6-2\cdot\frac{x}{100+t},$$
        ==变成变系数的一阶线性方程==：
        $$\deriv xt+\frac{2}{100+t}x=6.$$
        ==积分因子是 $(100+t)^{2}$==，仍能解出，但要小心。
        **这是本题最常见的加难方式，注意 $V(t)$ 不再是常数。**

        **建模的三个易错点**：

        1. ==流出浓度写成注入浓度==（应当是 $\frac{x}{V}$，即当前浓度）；
        2. ==忘了体积可能随时间变==；
        3. ==单位不统一==（$\mathrm{L}$ 与 $\mathrm{g}$、$\mathrm{min}$ 与 $\mathrm h$）。
      `,
    },

    { t: 'example',
      id: 'ex-integral-eq',
      title: '★ 积分方程：两边求导 + 读初值',
      source: '经典例题（高频）',
      level: 3,
      problem: String.raw`
        设 $f(x)$ 连续，且满足
        $$f(x)=e^{x}+\int_0^{x}(x-t)f(t)\dt.$$
        求 $f(x)$。
      `,
      idea: String.raw`
        **含 $\int_0^{x}$ $\Rightarrow$ [两边求导](#/calculus/ode/applications?at=geometry-model)。**

        **但被积函数里有 $x$**，==不能直接求导==，
        ==要先把 $x$ 提出积分号==
        （[变限积分那一页](#/calculus/definite/variable-limit?at=integrand-has-x)）：
        $$\int_0^{x}(x-t)f(t)\dt=x\int_0^{x}f(t)\dt-\int_0^{x}tf(t)\dt.$$

        **第一次求导**：
        $$f'(x)=e^{x}+\int_0^{x}f(t)\dt+xf(x)-xf(x)=e^{x}+\int_0^{x}f(t)\dt.$$
        ==后两项相消==（这正是[那道例题的结论](#/calculus/definite/variable-limit?at=ex-derivative)）。

        **第二次求导**：
        $$f''(x)=e^{x}+f(x),$$
        即
        $$f''-f=e^{x},$$
        ==一个二阶常系数非齐次方程==。

        **读初值（关键）**：
        - 原方程令 $x=0$：$f(0)=e^{0}+0=1$；
        - 一次求导后的式子令 $x=0$：$f'(0)=e^{0}+0=1$。

        ==两个初值都要从"求导前的式子"里读，不能忘==。

        **解方程**：特征根 $\lambda=\pm1$，
        ==而右端 $e^{x}$ 与特征根 $1$ [共振](#/calculus/ode/linear-const?at=resonance)==，
        所以特解要设成 $Axe^{x}$。
      `,
      solution: String.raw`
        **化简积分**：
        $$\int_0^{x}(x-t)f(t)\dt=x\int_0^{x}f(t)\dt-\int_0^{x}tf(t)\dt,$$
        故
        $$f(x)=e^{x}+x\int_0^{x}f(t)\dt-\int_0^{x}tf(t)\dt.\tag{i}$$

        **求导一次**：
        $$f'(x)=e^{x}+\int_0^{x}f(t)\dt+xf(x)-xf(x)=e^{x}+\int_0^{x}f(t)\dt.\tag{ii}$$

        **再求导**：
        $$f''(x)=e^{x}+f(x),$$
        即
        $$f''-f=e^{x}.\tag{iii}$$

        **初值**：由 (i) 令 $x=0$ 得 $f(0)=1$；由 (ii) 令 $x=0$ 得 $f'(0)=1$。

        **解 (iii)**：齐次特征方程 $\lambda^{2}-1=0$，$\lambda=\pm1$，
        齐次通解 $C_1e^{x}+C_2e^{-x}$。

        右端 $e^{x}$ 中 $\lambda=1$ ==是特征单根（共振）==，故设特解 $y^{*}=Axe^{x}$：
        $$\left(y^{*}\right)'=A(1+x)e^{x},\qquad \left(y^{*}\right)''=A(2+x)e^{x},$$
        $$\left(y^{*}\right)''-y^{*}=A(2+x)e^{x}-Axe^{x}=2Ae^{x}=e^{x}
        \ \Longrightarrow\ A=\frac12.$$

        故
        $$f(x)=C_1e^{x}+C_2e^{-x}+\frac x2e^{x}.$$

        **代初值**：
        $$f(0)=C_1+C_2=1,$$
        $$f'(x)=C_1e^{x}-C_2e^{-x}+\frac12e^{x}+\frac x2e^{x},\quad
        f'(0)=C_1-C_2+\frac12=1.$$
        解得 $C_1-C_2=\dfrac12$，结合 $C_1+C_2=1$ 得
        $$C_1=\frac34,\qquad C_2=\frac14.$$

        $$\boxed{\ f(x)=\frac34e^{x}+\frac14e^{-x}+\frac x2e^{x}\ }$$
      `,
      comment: String.raw`
        **数值验证**（取 $x=1$）：
        $$f(1)=\frac34e+\frac14e^{-1}+\frac12e=\frac54e+\frac{1}{4e}
        \approx3.3979+0.0920=3.4899.$$
        代回原方程右端：$e^{1}+\int_0^{1}(1-t)f(t)\dt$。
        数值积分得 $\int_0^1(1-t)f(t)\dt\approx0.7716$，
        $$e+0.7716\approx2.7183+0.7716=3.4899\ \checkmark$$

        **这类题的固定套路**：

        $$\boxed{\ \text{积分方程}\ \xrightarrow{\ \text{求导}\ }\ \text{微分方程}
        \ \xrightarrow{\ \text{令 }x=0\ }\ \text{初值}\ }$$

        **三个关键动作**：

        1. ==被积函数含 $x$ 时先提出去==（本题的 $x-t$）；
        2. ==每求一次导，就从"求导前的式子"读一个初值==；
        3. 求导几次就得到几阶方程，==初值个数与阶数相同==。

        **本题为什么要求两次导**：一次求导后仍含 $\int_0^x f$，
        ==没有彻底消掉积分号==，所以再求一次。
        ==判据：求导后式子里还有积分号就继续求。==

        **共振那一步不能漏**：若不注意 $\lambda=1$ 是特征根，
        设特解为 $Ae^{x}$，代入会得到 $0=e^{x}$，==无解==。
        ==发现"设出的特解代入后左端为零"，就是共振的信号==，
        见[共振与 $k$ 的确定](#/calculus/ode/linear-const?at=k-trap)。

        **一个更快的路线**：注意到 (ii) 式两边求导前，
        可以直接令 $g=\int_0^x f$，则 (ii) 是 $f'=e^{x}+g$、$g'=f$，
        ==一个一阶方程组==。对考研而言两条路工作量相当。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **不写初值条件**：==应用题几乎都是初值问题==，答案不能带 $C$。
      2. **混合问题的流出浓度写错**：==是当前浓度 $\frac xV$==，不是注入浓度。
      3. **忘了体积随时间变**：流入流出速度不等时 $V(t)$ 是变的。
      4. **积分方程被积函数含 $x$ 就直接求导**：==要先提出积分号==。
      5. **求导后不读初值**：==每求一次导读一个==，从求导前的式子读。
      6. **求导一次就停**：==式子里还有积分号就继续求==。
      7. **忽略共振**：右端的指数与特征根相同时特解要乘 $x^{k}$。
      8. **几何题的截距公式记错**：==从切线方程现推==更稳。
      9. **单位不统一**：建模前统一单位。
      10. **不验证**：==把解代回原方程（含积分方程）==。
    ` },

  ],
});
