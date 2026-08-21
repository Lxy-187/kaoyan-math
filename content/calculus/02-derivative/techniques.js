/* ==========================================================================
   高等数学 / 2 一元函数微分学 / 求导技巧（复合 / 隐函数 / 参数方程）
   —— 四则、链式、隐函数、参数、对数求导、反函数。
      定义见 derivative/definition；高阶见 derivative/high-order。
   ========================================================================== */

KM.page({
  path: 'calculus/derivative/techniques',
  title: '求导技巧（复合 / 隐函数 / 参数方程）',
  subtitle: '求导是**有算法**的：认出结构，套对法则。难点只在于**认清谁是谁的函数**',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'formulas', id: 'basic-table', title: '基本求导公式（必须是本能）', items: [
      { label: '幂', tex: String.raw`\left(x^{\mu}\right)'=\mu x^{\mu-1}` },
      { label: '指数', tex: String.raw`\left(a^{x}\right)'=a^{x}\ln a,\qquad\left(e^{x}\right)'=e^{x}` },
      { label: '对数', tex: String.raw`\left(\log_a x\right)'=\frac{1}{x\ln a},\qquad(\ln x)'=\frac1x` },
      { label: '正弦余弦', tex: String.raw`(\sin x)'=\cos x,\qquad(\cos x)'=-\sin x` },
      { label: '正切余切', tex: String.raw`(\tan x)'=\sec^{2}x,\qquad(\cot x)'=-\csc^{2}x` },
      { label: '正割余割', tex: String.raw`(\sec x)'=\sec x\tan x,\qquad(\csc x)'=-\csc x\cot x` },
      { label: '反正弦余弦', tex: String.raw`(\arcsin x)'=\frac{1}{\sqrt{1-x^{2}}},\qquad(\arccos x)'=-\frac{1}{\sqrt{1-x^{2}}}` },
      { label: '反正切余切', tex: String.raw`(\arctan x)'=\frac{1}{1+x^{2}},\qquad(\operatorname{arccot}x)'=-\frac{1}{1+x^{2}}` },
    ] },

    { t: 'md', c: String.raw`
      ==带"余"字的（余弦、余切、余割、反余弦、反余切）导数全带负号==，
      这是最省事的记忆线索。
    ` },

    { t: 'key', id: 'chain', title: '链式法则：由外向内，逐层剥', c: String.raw`
      $$\bigl[f(g(x))\bigr]'=f'\bigl(g(x)\bigr)\cdot g'(x)$$

      **操作口诀**：==从最外层开始求导，每剥一层就乘上那一层的导数==。

      **例**（三层复合）：
      $$y=\ln\left(\sin\left(x^{2}\right)\right)$$
      $$y'=\underbrace{\frac{1}{\sin(x^{2})}}_{\ln\ \text{的导}}
      \cdot\underbrace{\cos(x^{2})}_{\sin\ \text{的导}}
      \cdot\underbrace{2x}_{x^{2}\ \text{的导}}
      =\frac{2x\cos(x^{2})}{\sin(x^{2})}.$$

      ==每一层的导数都要在"该层的自变量"处取值==，
      写成 $f'(g(x))$ 而不是 $f'(x)$，==这是最常见的书写错误==。

      **抽象函数的链式法则**：
      $$\bigl[f(u(x))\bigr]'=f'(u)u',\qquad
      \bigl[f(u(x))\bigr]''=f''(u)\left(u'\right)^{2}+f'(u)u''$$
      ==二阶导有两项==，第一项来自对 $f'(u)$ 再用链式、
      第二项来自 $u'$ 求导。==漏掉第二项是高频错误。==
    ` },

    { t: 'method', id: 'implicit', title: '隐函数求导：两边同时对 $x$ 求导', c: String.raw`
      方程 $F(x,y)=0$ 确定 $y=y(x)$ 时：

      **动作**：==把 $y$ 看成 $x$ 的函数==，方程两边同时对 $x$ 求导，
      ==凡是碰到 $y$ 就要多乘一个 $y'$==（链式法则）。

      **例**：$x^{2}+y^{2}=1$
      $$2x+2yy'=0\ \Longrightarrow\ y'=-\frac xy.$$

      **三条纪律**：

      1. ==$y$ 的任何函数求导都要带 $y'$==：
         $(\sin y)'=\cos y\cdot y'$、$(e^{y})'=e^{y}y'$、$(y^{3})'=3y^{2}y'$；
      2. ==$xy$ 这类乘积要用乘积法则==：$(xy)'=y+xy'$；
      3. ==答案里允许含 $y$==，不必（通常也无法）解出 $y$。

      **求二阶导**：对 $y'$ 的表达式==再求一次导，仍然把 $y$ 看成 $x$ 的函数==，
      最后把 $y'$ 的表达式代回。
      $$y''=\deriv{}{x}\left(-\frac xy\right)=-\frac{y-xy'}{y^{2}}
      \ \xrightarrow{\ y'=-x/y\ }\ -\frac{y+\frac{x^{2}}{y}}{y^{2}}=-\frac{x^{2}+y^{2}}{y^{3}}=-\frac{1}{y^{3}}$$
      ==最后一步用了原方程 $x^{2}+y^{2}=1$ 化简==——
      **别忘了原方程也是可用的条件，常能大幅简化结果。**

      **求某点的导数值**：==把点的坐标代入求导后的方程==，
      比先解出 $y'$ 的一般表达式再代入更快。

      **另一条路（公式法）**：由[多元函数的隐函数定理](#/calculus/multi-derivative/chain-rule?at=implicit-formula)，
      $$y'=-\frac{F_x}{F_y},$$
      ==适合 $F$ 形状复杂时使用==。
    ` },

    { t: 'key', id: 'parametric', title: '参数方程求导：分子分母都对 $t$ 求导', c: String.raw`
      $$\begin{cases}x=\varphi(t)\\ y=\psi(t)\end{cases}
      \ \Longrightarrow\
      \boxed{\ \deriv yx=\frac{\psi'(t)}{\varphi'(t)}=\frac{\dy/\dt}{\dx/\dt}\ }$$

      **二阶导数（最容易错的地方）**：
      $$\boxed{\ \deriv{^{2}y}{x^{2}}=\frac{\d}{\dx}\left(\deriv yx\right)
      =\frac{\dfrac{\d}{\dt}\left(\dfrac{\psi'}{\varphi'}\right)}{\varphi'(t)}\ }$$

      ==注意最后还要再除以一个 $\varphi'(t)$==！
      理由：$\frac{\d}{\dx}=\frac{\d}{\dt}\cdot\frac{\dt}{\dx}=\frac{\d}{\dt}\cdot\frac{1}{\varphi'}$。

      **写成展开式**：
      $$\deriv{^{2}y}{x^{2}}=\frac{\psi''\varphi'-\psi'\varphi''}{\left(\varphi'\right)^{3}}$$
      ==分母是三次方==，不是二次方。
      **漏掉那一次除法（写成二次方）是本节头号错误。**

      **实操建议**：==不要背展开式==，
      而是老老实实"先算出 $\frac{\dy}{\dx}$ 作为 $t$ 的函数，
      再对 $t$ 求导，最后除以 $\varphi'(t)$"，==三步走不会错==。
    ` },

    { t: 'method', id: 'log-derivative', title: '对数求导法：两种情形', c: String.raw`
      **两边取对数再求导**，适用于：

      **① 幂指函数 $y=u(x)^{v(x)}$**（底和指数都含 $x$）
      $$\ln y=v\ln u\ \Longrightarrow\ \frac{y'}{y}=v'\ln u+v\cdot\frac{u'}{u},$$
      $$y'=u^{v}\left(v'\ln u+\frac{vu'}{u}\right).$$

      ==幂指函数不能用幂函数或指数函数的公式==：
      $(x^{x})'\ne x\cdot x^{x-1}$，也 $\ne x^{x}\ln x$，
      ==正确答案是 $x^{x}(\ln x+1)$==。

      **另一条路（更推荐）**：先化成 $y=e^{v\ln u}$，==再用链式法则==，
      $$y'=e^{v\ln u}\left(v\ln u\right)'=u^{v}\left(v'\ln u+\frac{vu'}{u}\right),$$
      ==结果相同但不用管"两边取对数"的合法性（$y$ 是否为正）==。

      **② 多个因子的连乘除**
      $$y=\frac{(x-1)^{2}\sqrt{x+2}}{(x+3)^{4}}$$
      直接求导要用两次乘积法则加商法则，==极其繁琐==；
      取对数后
      $$\ln\abs y=2\ln\abs{x-1}+\frac12\ln\abs{x+2}-4\ln\abs{x+3},$$
      ==求导变成简单的加减==：
      $$\frac{y'}{y}=\frac{2}{x-1}+\frac{1}{2(x+2)}-\frac{4}{x+3},$$
      最后乘回 $y$。

      ==取绝对值是为了在 $y<0$ 时也合法==，
      **求导后绝对值不影响结果**（$(\ln\abs u)'=\frac{u'}{u}$）。
    ` },

    { t: 'key', id: 'inverse', title: '反函数求导', c: String.raw`
      $$\boxed{\ \left[f^{-1}\right]'(y)=\frac{1}{f'(x)}\qquad\text{其中 }y=f(x)\ }$$

      ==注意左边在 $y$ 处取值、右边在 $x$ 处取值==，
      写成 $\frac{1}{f'(f^{-1}(y))}$ 更严格。

      **二阶导**：
      $$\left[f^{-1}\right]''(y)=-\frac{f''(x)}{\left[f'(x)\right]^{3}}$$
      ==分母同样是三次方==（与参数方程二阶导同构，都源于"再除一次 $\frac{\dx}{\dy}$"）。

      **典型用法**：已知 $y=f(x)$ 的信息，求反函数在某点的导数。
      ==先由 $y$ 的值反推 $x$ 的值==，再代入公式。

      **例**：$f(x)=x+e^{x}$，求 $\left[f^{-1}\right]'(1)$。
      由 $f(x)=1$ 解得 $x=0$（$0+e^{0}=1$），
      而 $f'(x)=1+e^{x}$，$f'(0)=2$，故 $\left[f^{-1}\right]'(1)=\frac12$。
      ==关键的第一步是"由 $y=1$ 找出对应的 $x=0$"==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-parametric',
      title: '★ 参数方程二阶导：那个额外的除法',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        设
        $$\begin{cases}x=\ln(1+t^{2})\\ y=t-\arctan t\end{cases}$$
        求 $\deriv yx$ 与 $\deriv{^{2}y}{x^{2}}$。
      `,
      idea: String.raw`
        **第一步：各自对 $t$ 求导。**
        $$\varphi'(t)=\frac{2t}{1+t^{2}},\qquad
        \psi'(t)=1-\frac{1}{1+t^{2}}=\frac{t^{2}}{1+t^{2}}.$$

        **第二步：相除。**
        $$\deriv yx=\frac{t^{2}/(1+t^{2})}{2t/(1+t^{2})}=\frac{t}{2},$$
        ==$(1+t^{2})$ 上下约掉，结果异常干净==——
        这是命题人设计好的，==算出来不干净就要检查==。

        **第三步（关键）**：$\deriv{^{2}y}{x^{2}}$ 不是对 $\frac t2$ 直接求导。
        $$\deriv{^{2}y}{x^{2}}=\frac{\d}{\dx}\left(\frac t2\right)
        =\frac{\frac{\d}{\dt}\left(\frac t2\right)}{\varphi'(t)}
        =\frac{1/2}{\frac{2t}{1+t^{2}}}.$$
        ==那个"再除以 $\varphi'(t)$"就是[本节头号错误](#/calculus/derivative/techniques?at=parametric)==。

        **自检**：若答案里没有出现 $\varphi'$ 的痕迹（本题是 $\frac{1+t^{2}}{t}$ 这种形状），
        ==多半是漏了那次除法==。
      `,
      solution: String.raw`
        **一阶导**：
        $$\deriv xt=\frac{2t}{1+t^{2}},\qquad
        \deriv yt=1-\frac{1}{1+t^{2}}=\frac{t^{2}}{1+t^{2}},$$
        $$\deriv yx=\frac{\dy/\dt}{\dx/\dt}
        =\frac{t^{2}/(1+t^{2})}{2t/(1+t^{2})}=\frac{t}{2}\qquad(t\ne0).$$

        **二阶导**：
        $$\deriv{^{2}y}{x^{2}}=\frac{\d}{\dx}\left(\deriv yx\right)
        =\frac{\dfrac{\d}{\dt}\left(\dfrac t2\right)}{\dfrac{\dx}{\dt}}
        =\frac{\dfrac12}{\dfrac{2t}{1+t^{2}}}
        =\frac{1+t^{2}}{4t}.$$

        **验算**（用展开公式）：
        $$\psi''=\deriv{}{t}\frac{t^{2}}{1+t^{2}}=\frac{2t(1+t^{2})-t^{2}\cdot2t}{(1+t^{2})^{2}}
        =\frac{2t}{(1+t^{2})^{2}},$$
        $$\varphi''=\deriv{}{t}\frac{2t}{1+t^{2}}=\frac{2(1+t^{2})-2t\cdot2t}{(1+t^{2})^{2}}
        =\frac{2(1-t^{2})}{(1+t^{2})^{2}},$$
        $$\frac{\psi''\varphi'-\psi'\varphi''}{(\varphi')^{3}}
        =\frac{\frac{2t}{(1+t^{2})^{2}}\cdot\frac{2t}{1+t^{2}}
        -\frac{t^{2}}{1+t^{2}}\cdot\frac{2(1-t^{2})}{(1+t^{2})^{2}}}
        {\dfrac{8t^{3}}{(1+t^{2})^{3}}}.$$
        分子 $=\dfrac{4t^{2}-2t^{2}(1-t^{2})}{(1+t^{2})^{3}}
        =\dfrac{2t^{2}(1+t^{2})}{(1+t^{2})^{3}}=\dfrac{2t^{2}}{(1+t^{2})^{2}}$，故
        $$=\frac{2t^{2}}{(1+t^{2})^{2}}\cdot\frac{(1+t^{2})^{3}}{8t^{3}}
        =\frac{1+t^{2}}{4t}.\ \checkmark$$
      `,
      comment: String.raw`
        **两种算法结果一致**，但工作量差得很远：
        ==三步法（求导、相除、再除）几行就完==，
        展开公式要算 $\varphi'',\psi''$ 并处理一大堆 $(1+t^{2})$ 的幂。

        $$\boxed{\ \text{实战一律用三步法，展开公式只用来验算}\ }$$

        **漏掉最后那次除法会得到 $\frac12$**，
        ==这个答案的特征是"太简单、且不含 $\varphi'$ 的痕迹"==。
        本题正确答案 $\frac{1+t^{2}}{4t}$ 里那个 $\frac{1+t^{2}}{t}$ 正是 $\frac{1}{\varphi'}$ 的一部分。
        ==自检办法：看答案里有没有"除以 $\varphi'$"留下的结构。==

        **参数方程的几何意义**：本题的曲线在 $t\to0$ 时
        $\deriv yx=\frac t2\to0$（水平切线），
        而 $\deriv{^{2}y}{x^{2}}=\frac{1+t^{2}}{4t}\to\infty$，
        ==说明该点附近曲率很大==。
        （$t=0$ 时 $\varphi'=0$，参数方程在该点退化，==求导公式失效==，
        所以我们注明了 $t\ne0$。）

        **同类题的常见追问**：求某点处的切线方程。
        ==要先由 $t$ 的值算出 $(x,y)$ 和 $\deriv yx$==，
        再写 $y-y_0=k(x-x_0)$。
        ==注意 $t$ 的值不是 $x$ 的值==，这是参数方程题最容易搞混的地方。
      `,
    },

    { t: 'example',
      id: 'ex-implicit-log',
      title: '隐函数 + 对数求导：组合使用',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        1. 设 $y=y(x)$ 由方程 $e^{y}+xy=e$ 确定，求 $y'(0)$ 与 $y''(0)$。
        2. 求 $y=\left(\sin x\right)^{\cos x}$（$0<x<\pi$）的导数。
      `,
      idea: String.raw`
        **第 1 问**：先由方程定出 $x=0$ 时的 $y$：
        $$e^{y}+0=e\ \Longrightarrow\ y=1.$$
        ==所以要求的是点 $(0,1)$ 处的导数==。

        两边对 $x$ 求导（==$y$ 是 $x$ 的函数==）：
        $$e^{y}y'+y+xy'=0.$$
        ==代入 $(0,1)$ 立刻得 $e\cdot y'+1=0$，$y'(0)=-\frac1e$==，
        ==比解出 $y'$ 的一般表达式再代入快得多==。

        再对 $x$ 求导一次（==仍然把 $y$ 看成 $x$ 的函数==）：
        $$e^{y}(y')^{2}+e^{y}y''+y'+y'+xy''=0,$$
        ==注意 $e^{y}y'$ 求导要用乘积法则，得两项==。
        再代 $(0,1)$ 和 $y'(0)=-\frac1e$。

        **第 2 问是[幂指函数](#/calculus/derivative/techniques?at=log-derivative)**，
        ==底和指数都含 $x$==，必须化成 $e^{(\cdot)}$ 或取对数。
        我用"化成 $e$ 的指数"这条路，==它不需要讨论 $y$ 的正负==。
      `,
      solution: String.raw`
        **(1)** 令 $x=0$：$e^{y}=e$，故 $y(0)=1$。

        方程两边对 $x$ 求导（$y=y(x)$）：
        $$e^{y}y'+y+xy'=0.\tag{i}$$
        代入 $x=0,y=1$：
        $$e\cdot y'(0)+1+0=0\ \Longrightarrow\ y'(0)=-\frac1e.$$

        (i) 式两边再对 $x$ 求导：
        $$e^{y}\left(y'\right)^{2}+e^{y}y''+y'+\left(y'+xy''\right)=0,$$
        即
        $$e^{y}\left(y'\right)^{2}+e^{y}y''+2y'+xy''=0.\tag{ii}$$
        代入 $x=0,\ y=1,\ y'=-\dfrac1e$：
        $$e\cdot\frac{1}{e^{2}}+e\,y''(0)-\frac2e=0
        \ \Longrightarrow\ e\,y''(0)=\frac2e-\frac1e=\frac1e,$$
        $$y''(0)=\frac{1}{e^{2}}.$$

        **(2)** 由 $0<x<\pi$ 知 $\sin x>0$，可写
        $$y=e^{\cos x\ln\sin x}.$$
        由链式法则，
        $$y'=e^{\cos x\ln\sin x}\cdot\left(\cos x\ln\sin x\right)'$$
        $$=\left(\sin x\right)^{\cos x}\left[-\sin x\ln\sin x+\cos x\cdot\frac{\cos x}{\sin x}\right]$$
        $$=\left(\sin x\right)^{\cos x}\left(\frac{\cos^{2}x}{\sin x}-\sin x\ln\sin x\right).$$
      `,
      comment: String.raw`
        **(1) 的关键是"边求导边代值"**。
        若先从 (i) 解出
        $y'=-\frac{y}{e^{y}+x}$ 再求导，
        ==要用商法则处理一个含 $y$ 的分式，繁琐且易错==。
        ==直接对 (i) 再求导、最后一次性代值，是标准做法。==

        **(ii) 式的推导要小心两处**：

        - $\left(e^{y}y'\right)'=e^{y}y'\cdot y'+e^{y}y''$，==是两项==；
        - $(xy')'=y'+xy''$，==也是两项==。

        ==漏掉任何一项都会得到错误的 $y''$。==

        **数值验证 (1)**：在 $x=0$ 附近，
        $y\approx1-\frac xe+\frac{x^{2}}{2e^{2}}$。
        取 $x=0.01$：预测 $y\approx1-0.003679+0.00000677=0.996328$。
        代回原方程：$e^{0.996328}+0.01\times0.996328=2.708283+0.009963=2.718246$，
        而 $e=2.718282$，==误差 $3.6\times10^{-5}$，与三阶项同量级== $\checkmark$

        **(2) 的两种写法对照**：

        | 路线 | 优点 | 缺点 |
        |---|---|---|
        | 化成 $e^{v\ln u}$ | ==不需讨论正负== | 要写指数 |
        | 两边取 $\ln$ | 式子短 | ==要保证 $y>0$== |

        本题给了 $0<x<\pi$（保证 $\sin x>0$），==两种都行==；
        ==但若题目没给这个条件，取对数就要加绝对值或分类讨论==。
        **默认用 $e^{v\ln u}$ 更安全。**

        **常见错误**：把 $(\sin x)^{\cos x}$ 当幂函数求导得
        $\cos x(\sin x)^{\cos x-1}\cos x$，==完全错误==。
        ==幂指函数既不是幂函数也不是指数函数，两个公式都不能用。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **参数方程二阶导漏最后一次除法**：==分母是 $(\varphi')^{3}$==，
         用三步法就不会错。
      2. **隐函数求导忘了带 $y'$**：==$y$ 的任何函数求导都要乘 $y'$==。
      3. **$(xy)'$ 写成 $xy'$**：==要用乘积法则==，是 $y+xy'$。
      4. **幂指函数套幂函数或指数公式**：==必须化成 $e^{v\ln u}$ 或取对数==。
      5. **链式法则的取值点写错**：是 $f'(g(x))$ 不是 $f'(x)$。
      6. **复合函数二阶导漏项**：$[f(u)]''=f''(u)(u')^{2}+f'(u)u''$，==两项==。
      7. **反函数求导的取值点混淆**：==左边在 $y$ 处、右边在 $x$ 处==。
      8. **隐函数求二阶导时不代原方程化简**：==原方程也是可用条件==。
      9. **求某点导数时先解一般表达式**：==边求导边代值更快==。
      10. **取对数不加绝对值**：$\ln\abs y$ 才对一切 $y\ne0$ 合法。
    ` },

  ],
});
