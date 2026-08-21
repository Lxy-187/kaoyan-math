/* ==========================================================================
   高等数学 / 9 多元函数微分学 / 偏导、全微分与可微性
   —— 多元与一元最大的分歧点：偏导存在推不出可微。
      链式与隐函数见 multi-derivative/chain-rule。
   ========================================================================== */

KM.page({
  path: 'calculus/multi-derivative/concepts',
  title: '偏导、全微分与可微性',
  subtitle: '一元里"可导 $\\iff$ 可微"，**多元里彻底断了**。这一页的全部内容就是理清那张四角关系图',
  tags: ['小题', '概念辨析', '高频', '易错'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'partial', title: '偏导数：把别的变量当常数', c: String.raw`
      $$\pd fx(x_0,y_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x,y_0)-f(x_0,y_0)}{\Delta x}$$

      ==求 $f_x$ 时把 $y$ 当常数==，就是一元求导。

      **几何意义**：用平面 $y=y_0$ 去截曲面，
      ==得到一条曲线，$f_x$ 是这条曲线的斜率==。
      所以偏导数==只反映沿坐标轴方向的变化率==——
      **这正是它比一元导数弱得多的根源。**

      **求分段点的偏导必须用定义**：
      $$f(x,y)=\begin{cases}\dfrac{xy}{x^{2}+y^{2}},&(x,y)\ne(0,0)\\ 0,&(x,y)=(0,0)\end{cases}$$
      在原点处
      $$f_x(0,0)=\lim_{\Delta x\to0}\frac{f(\Delta x,0)-f(0,0)}{\Delta x}
      =\lim\frac{0-0}{\Delta x}=0,$$
      ==同理 $f_y(0,0)=0$，两个偏导都存在==。
      ==但这个函数在原点甚至不连续==（见下）。

      **高阶偏导与次序无关的条件**：
      $$\boxed{\ f_{xy}\ \text{与}\ f_{yx}\ \text{在某点**都连续**}\ \Rightarrow\ f_{xy}=f_{yx}\ }$$
      ==考研中的函数几乎都满足==，可以放心交换次序；
      ==但概念题会拿"不连续时可以不等"做文章==。
    ` },

    { t: 'key', id: 'differentiable', title: '可微的定义', c: String.raw`
      称 $f$ 在 $(x_0,y_0)$ 处**可微**，若全增量可以写成
      $$\Delta z=A\Delta x+B\Delta y+o(\rho),\qquad \rho=\sqrt{(\Delta x)^{2}+(\Delta y)^{2}}$$
      此时 $\d z=A\Delta x+B\Delta y$，且必有 $A=f_x$、$B=f_y$，即
      $$\boxed{\ \d z=f_x\dx+f_y\dy\ }$$

      ==关键在 $o(\rho)$ 这个要求==：
      误差要比"到原点的距离"高阶，==这是对**所有方向**的要求==，
      而偏导只管两个坐标方向。
      **多元的分歧就藏在这里。**

      **验证可微的标准动作**（定义法）：
      $$\lim_{\rho\to0}\frac{\Delta z-f_x\Delta x-f_y\Delta y}{\rho}\ \overset{?}{=}\ 0$$
      ==算这个极限时通常要用极坐标 $\Delta x=\rho\cos\theta$、$\Delta y=\rho\sin\theta$==，
      ==并检查结果是否与 $\theta$ 无关==。

      **充分条件（实用）**：
      $$\boxed{\ f_x,f_y\ \text{在该点的某邻域内存在且**连续**}\ \Rightarrow\ f\ \text{可微}\ }$$
      ==这是"偏导连续"，比"偏导存在"强==。
      考研中初等函数在定义域内部都满足，==所以一般不必验证==；
      ==只有分段点才需要动用定义。==
    ` },

    { t: 'compare',
      id: 'four-relations',
      title: '★ 四角关系：多元与一元的根本差异',
      cols: ['命题', '一元', '多元'],
      rows: [
        ['可导（偏导存在）$\\Rightarrow$ 连续', '==成立==', '==**不成立**=='],
        ['可导（偏导存在）$\\Rightarrow$ 可微', '==成立==', '==**不成立**=='],
        ['可微 $\\Rightarrow$ 连续', '成立', '成立'],
        ['可微 $\\Rightarrow$ 偏导存在', '成立', '成立'],
        ['偏导**连续** $\\Rightarrow$ 可微', '成立', '==成立（充分不必要）=='],
      ] },

    { t: 'md', c: String.raw`
      **多元的完整关系链**：
      $$\underbrace{\text{偏导连续}}_{\text{最强}}\ \Longrightarrow\ \text{可微}
      \ \Longrightarrow\ \begin{cases}\text{连续}\\ \text{偏导存在}\end{cases}$$

      ==三个箭头都不可逆==，而且
      =="连续"与"偏导存在"之间**没有任何箭头**==——两者互不蕴含。

      $$\boxed{\ \text{偏导存在}\ \not\Rightarrow\ \text{连续};\qquad
      \text{连续}\ \not\Rightarrow\ \text{偏导存在}\ }$$
    ` },

    { t: 'warn', id: 'counterexamples', title: '★ 四个反例（必须能随口举出）', c: String.raw`
      **① 偏导存在但不连续**：
      $$f=\begin{cases}\dfrac{xy}{x^{2}+y^{2}},&(x,y)\ne(0,0)\\ 0,&\text{原点}\end{cases}$$
      两个偏导在原点都是 $0$（沿坐标轴走 $f\equiv0$）；
      ==但沿 $y=x$ 趋于原点时 $f=\frac{x^{2}}{2x^{2}}=\frac12\ne0$==，==不连续==。

      **② 连续但偏导不存在**：
      $$f=\sqrt{x^{2}+y^{2}}$$
      处处连续，==但在原点 $f_x$ 不存在==（$\frac{\abs{\Delta x}}{\Delta x}$ 左右极限不同，
      是一元 $\abs x$ 的推广）。

      **③ 偏导存在、连续，但不可微**：
      $$f=\sqrt{\abs{xy}}$$
      在原点连续、$f_x=f_y=0$，
      ==但沿 $y=x$ 方向 $\frac{\Delta z}{\rho}=\frac{\abs{\Delta x}}{\sqrt2\abs{\Delta x}}=\frac{1}{\sqrt2}\ne0$==，
      ==不可微==。

      **④ 可微但偏导不连续**：
      $$f=\begin{cases}\left(x^{2}+y^{2}\right)\sin\dfrac{1}{x^{2}+y^{2}},&\ne0\\ 0,&\text{原点}\end{cases}$$
      ==可微（误差是 $\rho^{2}$ 量级）但 $f_x$ 在原点震荡不连续==。
      ==这是一元 $x^{2}\sin\frac1x$ 的[多元版本](#/calculus/derivative/definition?at=derivative-not-continuous)。==

      **记忆线索**：
      ==①②说明"偏导存在"与"连续"互不相干；
      ③说明两者加起来仍不够；④说明可微不必偏导连续。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-check',
      title: '★ 判断连续、偏导存在、可微',
      source: '经典例题（高频概念题）',
      level: 4,
      problem: String.raw`
        设
        $$f(x,y)=\begin{cases}
        \dfrac{xy}{\sqrt{x^{2}+y^{2}}},&(x,y)\ne(0,0)\\[6pt]
        0,&(x,y)=(0,0)
        \end{cases}$$
        讨论 $f$ 在原点处的连续性、偏导数的存在性与可微性。
      `,
      idea: String.raw`
        ==三件事分别用三套方法，顺序是"连续 $\to$ 偏导 $\to$ 可微"==。

        **连续性**：用极坐标最快。
        令 $x=\rho\cos\theta$、$y=\rho\sin\theta$：
        $$f=\frac{\rho^{2}\cos\theta\sin\theta}{\rho}=\rho\cos\theta\sin\theta,$$
        ==$\abs f\le\rho\to0$，与 $\theta$ 无关，故连续==。

        **偏导**：必须用定义（分段点）。
        沿 $x$ 轴（$y=0$）时 $f\equiv0$，故 $f_x(0,0)=0$；同理 $f_y(0,0)=0$。

        **可微**：代入定义式，$A=B=0$，所以要看
        $$\lim_{\rho\to0}\frac{\Delta z-0-0}{\rho}=\lim_{\rho\to0}\frac{f(\Delta x,\Delta y)}{\rho}.$$
        用极坐标：
        $$\frac{\rho\cos\theta\sin\theta}{\rho}=\cos\theta\sin\theta,$$
        ==它依赖 $\theta$，不趋于 $0$（比如 $\theta=\frac\pi4$ 时恒为 $\frac12$）==，
        故==不可微==。

        ==这个函数正好落在"连续 + 偏导存在，但不可微"这一格==，
        是[反例③](#/calculus/multi-derivative/concepts?at=counterexamples)的同类。
      `,
      solution: String.raw`
        **① 连续性**：令 $x=\rho\cos\theta,\ y=\rho\sin\theta$（$\rho\to0^{+}$），则
        $$f=\frac{\rho^{2}\cos\theta\sin\theta}{\rho}=\rho\cos\theta\sin\theta,$$
        故
        $$\abs{f(x,y)-f(0,0)}=\abs{\rho\cos\theta\sin\theta}\le\frac{\rho}{2}\ \longrightarrow\ 0,$$
        ==与 $\theta$ 无关==。故 $f$ 在原点==连续==。

        **② 偏导数**（用定义）：
        $$f_x(0,0)=\lim_{\Delta x\to0}\frac{f(\Delta x,0)-f(0,0)}{\Delta x}
        =\lim_{\Delta x\to0}\frac{0-0}{\Delta x}=0,$$
        同理 $f_y(0,0)=0$。故两个偏导数==都存在且为 $0$==。

        **③ 可微性**：若可微，则应有
        $$\Delta z=f_x\Delta x+f_y\Delta y+o(\rho)=o(\rho).$$
        考察
        $$\lim_{\rho\to0}\frac{\Delta z-0}{\rho}
        =\lim_{\rho\to0}\frac{\rho\cos\theta\sin\theta}{\rho}=\cos\theta\sin\theta.$$

        该极限==依赖于 $\theta$==：沿 $\theta=0$（$x$ 轴）为 $0$，
        沿 $\theta=\dfrac\pi4$（直线 $y=x$）为 $\dfrac12\ne0$。

        故极限不存在（不等于 $0$），$f$ 在原点==不可微==。

        **结论**：连续 $\checkmark$，偏导数存在 $\checkmark$，==但不可微==。
      `,
      comment: String.raw`
        **数值验证不可微**：沿 $y=x$ 取 $x=y=t\to0^{+}$，
        $$\frac{\Delta z}{\rho}=\frac{t^{2}/(t\sqrt2)}{t\sqrt2}=\frac{t/\sqrt2}{t\sqrt2}=\frac12,$$
        ==无论 $t$ 多小都是 $\frac12$，不趋于零== $\checkmark$

        **三步的方法各不相同，不能混**：

        | 要判断 | 用什么 |
        |---|---|
        | 连续 | ==极坐标或放缩==，看是否与 $\theta$ 无关 |
        | 偏导存在 | ==定义==（分段点不能求导公式） |
        | 可微 | ==定义式的极限==，必须与方向无关 |

        **"与 $\theta$ 无关"是多元极限的核心判据**：
        ==极坐标化简后若结果仍含 $\theta$ 且不能被 $\rho$ 压掉，极限就不存在==。
        本题连续性那一步 $\rho\cos\theta\sin\theta$ ==有 $\rho$ 因子把 $\theta$ 压住了==；
        可微性那一步 $\rho$ 被约掉，==$\theta$ 就露出来了==。

        **把分母改一下结论就变**：
        $$g=\frac{xy}{x^{2}+y^{2}}\ \text{（分母不开根号）}$$
        极坐标下 $=\cos\theta\sin\theta$，==连 $\rho$ 都没有，所以连续性就已经失败==，
        这就是[反例①](#/calculus/multi-derivative/concepts?at=counterexamples)。
        ==分母开不开根号，决定了这个函数落在四角关系图的哪一格==，
        **命题人正是靠调整分母的次数来控制难度。**

        **一个快速判断的经验**：分子是 $k$ 次齐次、分母是 $m$ 次齐次时，
        极坐标下会得到 $\rho^{k-m}\cdot(\theta\ \text{的函数})$。

        | $k-m$ | 结论 |
        |---|---|
        | $>1$ | ==可微== |
        | $=1$ | 连续、偏导存在，==但一般不可微== |
        | $=0$ | ==不连续== |
        | $<0$ | 无界 |

        本题 $k=2$、$m=1$，$k-m=1$ ==正好落在第二行== $\checkmark$
      `,
    },

    { t: 'example',
      id: 'ex-partial-compute',
      title: '分段函数的偏导与二阶偏导',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $f(x,y)=\begin{cases}
        \dfrac{x^{2}y}{x^{2}+y^{2}},&(x,y)\ne(0,0)\\[4pt]
        0,&(x,y)=(0,0)
        \end{cases}$

        1. 求 $f_x(0,0)$ 与 $f_y(0,0)$；
        2. 求 $f_x(x,y)$（$(x,y)\ne(0,0)$）；
        3. 判断 $f_x$ 在原点是否连续。
      `,
      idea: String.raw`
        **第 1 问必须用定义**（原点是分段点）：
        沿 $x$ 轴 $f(\Delta x,0)=0$，沿 $y$ 轴 $f(0,\Delta y)=0$，
        ==两个偏导都是 $0$==。

        **第 2 问用商法则**（$y$ 当常数）：
        $$f_x=\frac{2xy(x^{2}+y^{2})-x^{2}y\cdot2x}{(x^{2}+y^{2})^{2}}
        =\frac{2xy^{3}}{(x^{2}+y^{2})^{2}}.$$
        ==分子的 $2xy\cdot y^{2}$ 那一项是化简后剩下的==，
        $2x^{3}y-2x^{3}y$ 相消。

        **第 3 问看 $\lim\limits_{(x,y)\to(0,0)}f_x$ 是否等于 $f_x(0,0)=0$**。
        极坐标：
        $$f_x=\frac{2\rho\cos\theta\cdot\rho^{3}\sin^{3}\theta}{\rho^{4}}
        =2\cos\theta\sin^{3}\theta,$$
        ==$\rho$ 全约掉了，只剩 $\theta$ 的函数==，
        所以极限依赖方向，==不存在==，故 $f_x$ 在原点不连续。

        ==这说明 $f$ 虽然偏导处处存在，但偏导不连续==，
        ==于是"偏导连续 $\Rightarrow$ 可微"这个充分条件在这里用不上==，
        可微性必须回到定义单独判。
        （按[齐次次数经验](#/calculus/multi-derivative/concepts?at=ex-check)预判：
        分子 $3$ 次、分母 $2$ 次，$k-m=1$，==落在"不可微"那一行==，
        点评里会验证。）
      `,
      solution: String.raw`
        **(1)** 由定义，
        $$f_x(0,0)=\lim_{\Delta x\to0}\frac{f(\Delta x,0)-0}{\Delta x}
        =\lim_{\Delta x\to0}\frac{0}{\Delta x}=0,$$
        $$f_y(0,0)=\lim_{\Delta y\to0}\frac{f(0,\Delta y)-0}{\Delta y}
        =\lim_{\Delta y\to0}\frac{0}{\Delta y}=0.$$

        **(2)** 当 $(x,y)\ne(0,0)$ 时，把 $y$ 视为常数，用商法则：
        $$f_x=\frac{2xy\left(x^{2}+y^{2}\right)-x^{2}y\cdot2x}{\left(x^{2}+y^{2}\right)^{2}}
        =\frac{2x^{3}y+2xy^{3}-2x^{3}y}{\left(x^{2}+y^{2}\right)^{2}}
        =\frac{2xy^{3}}{\left(x^{2}+y^{2}\right)^{2}}.$$

        **(3)** 令 $x=\rho\cos\theta$、$y=\rho\sin\theta$：
        $$f_x=\frac{2\cdot\rho\cos\theta\cdot\rho^{3}\sin^{3}\theta}{\rho^{4}}
        =2\cos\theta\sin^{3}\theta.$$

        该值==与 $\rho$ 无关而依赖 $\theta$==：
        沿 $\theta=0$ 为 $0$，沿 $\theta=\dfrac\pi4$ 为
        $2\cdot\dfrac{1}{\sqrt2}\cdot\dfrac{1}{2\sqrt2}=\dfrac12\ne0$。

        故 $\lim\limits_{(x,y)\to(0,0)}f_x$ ==不存在==，
        从而 $f_x$ 在原点==不连续==。
      `,
      comment: String.raw`
        **本题揭示了一个重要事实**：
        ==$f_x$ 处处存在，但 $f_x$ 本身不连续==。
        所以[充分条件](#/calculus/multi-derivative/concepts?at=differentiable)
        "偏导连续 $\Rightarrow$ 可微"==在这里用不上==，
        ==可微性必须回到定义去判==。

        **顺带判一下可微性**（常见的追问）：
        $$\frac{\Delta z-0-0}{\rho}=\frac{\rho^{3}\cos^{2}\theta\sin\theta/\rho^{2}}{\rho}
        =\cos^{2}\theta\sin\theta,$$
        ==依赖 $\theta$，故不可微==。

        **四个结论汇总**（本题的函数）：

        | 性质 | 结论 |
        |---|---|
        | 原点连续 | ==是==（$\abs f\le\frac{\rho}{2}$） |
        | 偏导存在 | ==是==（都为 $0$） |
        | 偏导连续 | ==否== |
        | 可微 | ==否== |

        ==这是"连续 + 偏导存在但不可微"的又一个标准例子==，
        与[上一题](#/calculus/multi-derivative/concepts?at=ex-check)同属一格。

        **齐次次数经验的再次验证**：
        本题分子 $x^{2}y$ 是 $3$ 次、分母 $x^{2}+y^{2}$ 是 $2$ 次，
        $k-m=1$ ==恰好落在"连续、偏导存在、不可微"那一行== $\checkmark$

        **计算上的提醒**：第 (2) 问化简时
        $2x^{3}y$ 与 $-2x^{3}y$ ==必须相消==，
        ==算不出这个相消说明商法则用错了==。
        分子只剩 $2xy^{3}$ 这种"干净"的结果，是这类题的正常现象。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **把一元的"可导 $\iff$ 可微"搬到多元**：==多元中偏导存在推不出可微==。
      2. **由偏导存在推连续**：==两者互不蕴含==，
         见[四个反例](#/calculus/multi-derivative/concepts?at=counterexamples)。
      3. **分段点用求导公式**：==必须用定义==。
      4. **多元极限只沿坐标轴验**：==要沿任意方向==，
         用极坐标看是否与 $\theta$ 无关。
      5. **由"沿几条直线极限相同"断言极限存在**：==直线不够==，
         还要试 $y=kx^{2}$ 之类的抛物线路径。
      6. **可微的充分条件记成"偏导存在"**：==是"偏导连续"==。
      7. **认为 $f_{xy}=f_{yx}$ 无条件成立**：==要求两者连续==。
      8. **判可微时忘了减去线性部分**：极限式的分子是
         ==$\Delta z-f_x\Delta x-f_y\Delta y$==。
      9. **$\rho$ 与 $\Delta x$ 混用**：分母是 ==$\rho=\sqrt{(\Delta x)^{2}+(\Delta y)^{2}}$==。
    ` },

  ],
});
