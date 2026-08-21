/* ==========================================================================
   高等数学 / 7 常微分方程 / 一阶方程的类型识别与解法
   —— 五种类型，按顺序识别。解的结构见 ode/solution-structure；
      高阶常系数见 ode/linear-const。
   ========================================================================== */

KM.page({
  path: 'calculus/ode/first-order',
  title: '一阶方程的类型识别与解法',
  subtitle: '一阶方程的全部难度在**认类型**。认对了都是套公式，认错了怎么算都不对',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'steps', id: 'identify', title: '★ 识别流程：按这个顺序问', items: [
      { title: '① 能不能分离变量？',
        c: String.raw`能写成 $\deriv yx=f(x)g(y)$ 就==两边分离直接积==。
                      **这是最省事的，一定先试。**` },
      { title: '② 是不是齐次方程？',
        c: String.raw`能写成 $\deriv yx=\varphi\!\left(\dfrac yx\right)$（==右端只含 $\frac yx$==）
                      就令 $u=\dfrac yx$ 化成可分离。
                      ==判据：把 $x,y$ 同时换成 $tx,ty$，方程不变。==` },
      { title: '③ 是不是一阶线性？',
        c: String.raw`能写成 $y'+P(x)y=Q(x)$（==$y$ 和 $y'$ 都是一次、且不相乘==）
                      就套[通解公式](#/calculus/ode/first-order?at=linear)。` },
      { title: '④ 是不是伯努利？',
        c: String.raw`形如 $y'+Py=Qy^{n}$（$n\ne0,1$）
                      就令 $z=y^{1-n}$ 化成线性。` },
      { title: '⑤ 是不是全微分方程？',
        c: String.raw`$P\dx+Q\dy=0$ 且 ==$\pd Py=\pd Qx$==，
                      则存在原函数 $u$ 使 $\d u=P\dx+Q\dy$，通解为 $u=C$。` },
      { title: '都不是？',
        c: String.raw`==试着把 $x$ 看成 $y$ 的函数==（即求 $\deriv xy$），
                      很多方程反过来看就是线性的。==这一招常被忽略，但很有效。==` },
    ] },

    { t: 'key', id: 'separable', title: '① 可分离变量', c: String.raw`
      $$\deriv yx=f(x)g(y)\ \Longrightarrow\ \frac{\dy}{g(y)}=f(x)\dx
      \ \Longrightarrow\ \int\frac{\dy}{g(y)}=\int f(x)\dx$$

      **两个要注意的地方**：

      1. ==除以 $g(y)$ 时要单独检查 $g(y)=0$ 的情形==——
         那些常数解可能是[奇解](#/calculus/ode/solution-structure?at=singular-solution)，
         也可能已包含在通解里；
      2. ==积分后的常数怎么写==：
         出现 $\ln$ 时把 $C$ 写成 $\ln\abs C$ 能让结果更整齐。

      **例**：$\deriv yx=\dfrac{y}{x}$
      $$\frac{\dy}{y}=\frac{\dx}{x}\ \Rightarrow\ \ln\abs y=\ln\abs x+\ln\abs C
      \ \Rightarrow\ y=Cx.$$
      ==$y=0$ 对应 $C=0$，已包含在通解中==，不必单列。
    ` },

    { t: 'key', id: 'homogeneous', title: '② 齐次方程：令 $u=\\frac yx$', c: String.raw`
      $$\deriv yx=\varphi\!\left(\frac yx\right)$$

      **换元**：令 $u=\dfrac yx$，则 $y=ux$，
      $$\deriv yx=u+x\deriv ux.$$
      ==注意 $y=ux$ 求导要用乘积法则，得两项==——漏掉 $u$ 是最常见的错误。

      代入得
      $$u+x\deriv ux=\varphi(u)\ \Longrightarrow\ \frac{\du}{\varphi(u)-u}=\frac{\dx}{x},$$
      ==化成了可分离变量==。

      **识别的技巧**：把方程整理成 $\deriv yx=\dfrac{\text{关于 }x,y\text{ 的齐次式}}{\text{同次齐次式}}$，
      ==分子分母同除以 $x$ 的最高次幂==，若能只剩 $\frac yx$ 就是齐次的。

      **例**：$\deriv yx=\dfrac{x^{2}+y^{2}}{xy}$
      $$=\frac{1+(y/x)^{2}}{y/x}=\frac{1+u^{2}}{u}\ \checkmark$$

      **准齐次**（了解）：$\deriv yx=f\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$，
      ==先平移坐标消去常数项==，再化成齐次。
    ` },

    { t: 'key', id: 'linear', title: '★ ③ 一阶线性：通解公式', c: String.raw`
      $$y'+P(x)y=Q(x)$$
      $$\boxed{\ y=e^{-\int P\dx}\left(\int Q\,e^{\int P\dx}\dx+C\right)\ }$$

      **公式的来历（积分因子法）**：两边乘 $\mu=e^{\int P\dx}$，
      ==左端恰好变成 $(\mu y)'$==：
      $$\mu y'+\mu Py=\mu y'+\mu'y=(\mu y)',$$
      两边积分即得。
      ==理解了这一步就不必死记公式==，见[积分因子](#/calculus/ode/solution-structure?at=integrating-factor)。

      **三个书写要点**：

      1. ==必须先把方程化成标准形==（$y'$ 的系数为 $1$）；
      2. $\int P\dx$ ==取任意一个原函数即可，不加常数==
         （常数会被 $C$ 吸收）；
      3. ==$e^{\int P\dx}$ 中出现 $\ln$ 时要化简==：
         $e^{\ln x}=x$、$e^{-2\ln x}=x^{-2}$。

      **结构上的意义**：通解 $=$ 齐次通解 $+$ 一个特解，
      $$y=\underbrace{Ce^{-\int P}}_{\text{齐次通解}}
      +\underbrace{e^{-\int P}\int Qe^{\int P}\dx}_{\text{特解}},$$
      ==这正是[解的结构](#/calculus/ode/solution-structure?at=affine-rule)==。
    ` },

    { t: 'key', id: 'bernoulli-exact', title: '④⑤ 伯努利与全微分', c: String.raw`
      **伯努利方程** $y'+Py=Qy^{n}$（$n\ne0,1$）：

      两边同除 $y^{n}$：
      $$y^{-n}y'+Py^{1-n}=Q.$$
      ==令 $z=y^{1-n}$，则 $z'=(1-n)y^{-n}y'$==，代入得
      $$\frac{z'}{1-n}+Pz=Q\ \Longrightarrow\ z'+(1-n)Pz=(1-n)Q,$$
      ==是关于 $z$ 的一阶线性方程==。

      ==别忘了最后把 $z$ 换回 $y$==。

      **全微分方程** $P\dx+Q\dy=0$：

      $$\boxed{\ \pd Py=\pd Qx\ \Longrightarrow\ \text{存在 }u\ \text{使}\ \d u=P\dx+Q\dy}$$
      通解为 $u(x,y)=C$。

      **求 $u$ 的两种办法**：

      | 方法 | 做法 |
      |---|---|
      | ==凑微分== | 直接把 $P\dx+Q\dy$ 凑成某个 $\d(\cdot)$ |
      | ==线积分== | $u=\displaystyle\int_{x_0}^{x}P(t,y_0)\dt+\int_{y_0}^{y}Q(x,s)\d s$ |

      ==第二种是[格林公式那一章](#/calculus/line-surface/green?at=digging-is-path-independence)
      "路径无关时用折线积分"的直接应用==——
      **两章讲的是同一件事。**

      **常见的可凑微分组合**（值得记）：
      $$x\dy+y\dx=\d(xy),\qquad \frac{x\dy-y\dx}{x^{2}}=\d\!\left(\frac yx\right),$$
      $$\frac{x\dx+y\dy}{x^{2}+y^{2}}=\frac12\d\ln\left(x^{2}+y^{2}\right),\qquad
      \frac{x\dy-y\dx}{x^{2}+y^{2}}=\d\arctan\frac yx.$$
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-linear',
      title: '一阶线性：先化标准形',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        求解 $x\deriv yx-2y=x^{3}e^{x}$（$x>0$）。
      `,
      idea: String.raw`
        **先化标准形**（$y'$ 的系数化成 $1$）：两边除以 $x$，
        $$y'-\frac2xy=x^{2}e^{x}.$$
        ==这一步不做，套公式必错==。

        识别：$P=-\frac2x$，$Q=x^{2}e^{x}$。

        **算积分因子**：
        $$\int P\dx=-2\int\frac{\dx}{x}=-2\ln x\quad(x>0),$$
        $$e^{\int P\dx}=e^{-2\ln x}=x^{-2}.$$
        ==$e^{\ln}$ 一定要化简成幂==，留着 $e^{-2\ln x}$ 后面会算不下去。

        **代公式**：
        $$y=x^{2}\left(\int x^{2}e^{x}\cdot x^{-2}\dx+C\right)
        =x^{2}\left(\int e^{x}\dx+C\right).$$
        ==$x^{2}$ 与 $x^{-2}$ 恰好抵消==，剩下最简单的 $\int e^{x}\dx$——
        **这是命题人设计好的，算出复杂积分就要检查前面。**
      `,
      solution: String.raw`
        方程两边除以 $x$（$x>0$）化为标准形：
        $$y'-\frac2xy=x^{2}e^{x},$$
        故 $P(x)=-\dfrac2x$，$Q(x)=x^{2}e^{x}$。

        **积分因子**：
        $$\int P\dx=-2\ln x,\qquad e^{\int P\dx}=x^{-2},\qquad e^{-\int P\dx}=x^{2}.$$

        **代通解公式**：
        $$y=x^{2}\left(\int x^{2}e^{x}\cdot x^{-2}\dx+C\right)
        =x^{2}\left(\int e^{x}\dx+C\right)=x^{2}\left(e^{x}+C\right).$$

        **通解**：
        $$y=x^{2}e^{x}+Cx^{2}.$$

        **验证**：$y'=2xe^{x}+x^{2}e^{x}+2Cx$，代入原方程左端
        $$x\left(2xe^{x}+x^{2}e^{x}+2Cx\right)-2\left(x^{2}e^{x}+Cx^{2}\right)$$
        $$=2x^{2}e^{x}+x^{3}e^{x}+2Cx^{2}-2x^{2}e^{x}-2Cx^{2}=x^{3}e^{x}\ \checkmark$$
      `,
      comment: String.raw`
        **通解的结构一目了然**：
        $$y=\underbrace{x^{2}e^{x}}_{\text{特解}}+\underbrace{Cx^{2}}_{\text{齐次通解}},$$
        ==正是[一阶线性的仿射结构](#/calculus/ode/solution-structure?at=affine-rule)==。

        **验证这一步值得保留**。微分方程的答案==代回去就能验==，
        成本很低（求一次导 + 代入），
        ==而积分因子法里最容易在 $e^{\int P}$ 那一步出符号错误==。

        **三个高频失分点**：

        | 错误 | 后果 |
        |---|---|
        | ==不化标准形==（直接用 $P=-2$） | 积分因子完全错 |
        | ==$e^{-2\ln x}$ 不化简== | 后面积不出来 |
        | ==$\int P$ 加了常数 $C_1$== | 多一个冗余常数（虽然最终会消掉） |

        **本题也可以用"常数变易法"**：
        先解齐次方程 $y'=\frac2xy$ 得 $y=Cx^{2}$，
        ==再把 $C$ 变成 $C(x)$ 代回原方程==：
        $$C'x^{2}+2Cx-\frac2x\cdot Cx^{2}=x^{2}e^{x}\ \Rightarrow\ C'=e^{x},$$
        $$C(x)=e^{x}+C.$$
        ==结果相同==。常数变易法不需要记公式，==但步骤多一点==。
      `,
    },

    { t: 'example',
      id: 'ex-swap',
      title: '★ 反过来看：把 $x$ 当作 $y$ 的函数',
      source: '经典例题',
      level: 3,
      problem: String.raw`
        求解 $\deriv yx=\dfrac{1}{x+y^{2}}$。
      `,
      idea: String.raw`
        **按[识别流程](#/calculus/ode/first-order?at=identify)逐条试**：

        - 可分离？$\frac{1}{x+y^{2}}$ ==拆不开==；
        - 齐次？$x\to tx,y\to ty$ 时右端变成 $\frac{1}{tx+t^{2}y^{2}}$，==不齐次==；
        - 线性？整理得 $y'(x+y^{2})=1$，==含 $y^{2}$，关于 $y$ 不是线性的==；
        - 伯努利？也不是。

        **四条路都不通，就试第 ⑥ 条：把 $x$ 看成 $y$ 的函数。**
        $$\deriv xy=\frac{1}{\deriv yx}=x+y^{2},$$
        即
        $$\deriv xy-x=y^{2}.$$
        ==这是关于 $x(y)$ 的一阶线性方程==！$P(y)=-1$，$Q(y)=y^{2}$。

        ==方程对 $y$ 非线性，对 $x$ 却是线性的==——
        **这就是"倒过来看"的价值，是本题唯一的技巧。**

        **识别信号**：==方程里 $y$ 的次数高、$x$ 的次数低==（本题 $x$ 是一次的），
        就该考虑交换自变量与因变量。
      `,
      solution: String.raw`
        原方程可写成
        $$\deriv xy=x+y^{2},$$
        即
        $$\deriv xy-x=y^{2},$$
        这是以 $y$ 为自变量、$x$ 为未知函数的==一阶线性方程==，
        $P(y)=-1$，$Q(y)=y^{2}$。

        **积分因子**：$e^{\int P\dy}=e^{-y}$。

        **代公式**：
        $$x=e^{y}\left(\int y^{2}e^{-y}\dy+C\right).$$

        计算 $\displaystyle\int y^{2}e^{-y}\dy$（[表格法](#/calculus/indefinite/by-parts?at=tricks)）：

        | 符号 | 求导 | 积分 |
        |---|---|---|
        | $+$ | $y^{2}$ | $e^{-y}$ |
        | $-$ | $2y$ | $-e^{-y}$ |
        | $+$ | $2$ | $e^{-y}$ |
        | | $0$ | $-e^{-y}$ |

        $$\int y^{2}e^{-y}\dy=-y^{2}e^{-y}-2ye^{-y}-2e^{-y}
        =-e^{-y}\left(y^{2}+2y+2\right).$$

        故
        $$x=e^{y}\left[-e^{-y}\left(y^{2}+2y+2\right)+C\right]
        =-\left(y^{2}+2y+2\right)+Ce^{y}.$$

        **通解**：
        $$x=Ce^{y}-y^{2}-2y-2.$$

        **验证**：$\deriv xy=Ce^{y}-2y-2$，而
        $$x+y^{2}=Ce^{y}-y^{2}-2y-2+y^{2}=Ce^{y}-2y-2\ \checkmark$$
      `,
      comment: String.raw`
        **"交换 $x$ 与 $y$ 的角色"是一阶方程里最容易被忽略的一招**。
        依据是
        $$\deriv xy=\frac{1}{\deriv yx}\qquad\left(\deriv yx\ne0\right),$$
        ==这是[反函数求导](#/calculus/derivative/techniques?at=inverse)==。

        **什么时候想到它**：

        | 信号 | 例 |
        |---|---|
        | $y$ 的次数高、$x$ 的次数低 | 本题（$x$ 一次、$y$ 二次） |
        | 分母含 $y$ 的复杂式子 | $y'=\frac{1}{e^{y}-x}$ |
        | 整理后 $x$ 与 $x'$ 都是一次 | 一律试 |

        **答案的形式**：本题解出的是 ==$x$ 关于 $y$ 的显式表达式==，
        ==而 $y$ 解不出来（隐式）==。
        **这完全可以接受**——微分方程的通解允许是隐式的，
        ==不必强行解出 $y$==。

        **表格法在这里很划算**：$\int y^{2}e^{-y}\dy$ 要用两次分部积分，
        ==表格法一次到位且不会错符号==。
        注意积分那一列的符号：$\int e^{-y}\dy=-e^{-y}$，
        ==每积一次多一个负号==，与左边的正负交替叠加，
        ==最终三项全是负号==（$-y^{2}e^{-y}-2ye^{-y}-2e^{-y}$）。

        **一个记忆点**：
        $$\int y^{n}e^{-y}\dy=-e^{-y}\left(y^{n}+ny^{n-1}+n(n-1)y^{n-2}+\cdots+n!\right),$$
        ==括号里是"逐项降次、系数是排列数"==。
        $n=2$ 时是 $y^{2}+2y+2$ $\checkmark$
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **不化标准形就套线性公式**：==$y'$ 的系数必须先化成 $1$==。
      2. **$e^{\int P}$ 不化简**：$e^{-2\ln x}$ ==要写成 $x^{-2}$==。
      3. **齐次换元漏掉一项**：$y=ux\Rightarrow y'=u+xu'$，==两项==。
      4. **分离变量时不检查 $g(y)=0$**：==可能丢掉常数解==。
      5. **伯努利忘了换回 $y$**：解出 $z$ 之后要还原。
      6. **全微分方程不验 $\pd Py=\pd Qx$**：==这是前提==。
      7. **想不到交换 $x,y$ 的角色**：==四种类型都不是时一定要试==。
      8. **通解硬要解出显式的 $y$**：==隐式解是合法的==。
      9. **不验证**：==代回原方程==，成本很低。
      10. **初值问题解完不代初值**：求特解时别停在通解。
    ` },

  ],
});
