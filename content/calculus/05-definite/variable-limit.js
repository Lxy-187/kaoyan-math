/* ==========================================================================
   高等数学 / 5 定积分与反常积分 / 变限积分函数
   —— 用积分"造"函数。求导公式 + 光滑性 + 三类典型题。
      定积分性质见 definite/properties。
   ========================================================================== */

KM.page({
  path: 'calculus/definite/variable-limit',
  title: '变限积分函数',
  subtitle: '$\\Phi(x)=\\int_a^x f(t)\\dt$ 是一台**造函数的机器**：给一个可积的 $f$，产出一个更光滑的 $\\Phi$',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'core', title: '★ 微积分基本定理与求导公式', c: String.raw`
      设 $f$ 在 $[a,b]$ 上连续，$\Phi(x)=\displaystyle\int_a^{x}f(t)\dt$，则
      $$\boxed{\ \Phi'(x)=f(x)\ }$$

      ==这条是整个微积分的枢纽==：它说明"求导"与"积分"互为逆运算，
      也保证了==每个连续函数都有原函数==（就是 $\Phi$ 本身）。

      **一般形式（上下限都是函数）**：
      $$\deriv{}{x}\int_{\varphi(x)}^{\psi(x)}f(t)\dt
      =f\bigl(\psi(x)\bigr)\psi'(x)-f\bigl(\varphi(x)\bigr)\varphi'(x)$$

      **口诀**：==上限代入乘上限的导，减去下限代入乘下限的导==。
      两个"乘导数"来自链式法则，==减号来自 $\int_\varphi^\psi=\int_a^\psi-\int_a^\varphi$==。

      **写法上的铁律**：
      $$\int_a^{x}f(x)\dx\qquad\text{✗ 变量重名}$$
      $$\int_a^{x}f(t)\dt\qquad\text{✓}$$
      ==上限的字母和被积变量的字母必须不同==——
      因为[定积分与积分变量的字母无关](#/calculus/definite/properties?at=definition)，
      $x$ 同时扮演两个角色会出错。
    ` },

    { t: 'key', id: 'smoothness', title: '变限积分让函数「变光滑一档」', c: String.raw`
      | $f$ 的性质 | $\Phi(x)=\int_a^x f$ 的性质 |
      |---|---|
      | 可积（可以有跳跃间断） | ==连续== |
      | 连续 | ==可导，且 $\Phi'=f$== |
      | 可导 | 二阶可导 |
      | $n$ 阶可导 | $n+1$ 阶可导 |

      $$\boxed{\ \text{积分是"光滑化"算子：每积一次，光滑度提升一档}\ }$$

      **第一行值得单独强调**：$f$ 有跳跃间断点时 $\Phi$ ==仍然连续==，
      只是在那个点==不可导==（左右导数分别等于 $f$ 的左右极限）。

      **这条常被用来出选择题**：
      "$f$ 在 $[a,b]$ 上可积，则 $\Phi$ 必然______"
      ==答案是"连续"而不是"可导"==。

      **一个反直觉的推论**：$f$ 可积但没有原函数是可能的
      （$f$ 有跳跃间断点时），==但 $\Phi$ 照样存在且连续==。
      ==所以"$\Phi$ 存在"比"$f$ 有原函数"要求低得多。==
      这正是[原函数存在性](#/calculus/derivative-app/proof-overview?at=antiderivative)与可积性的区别。
    ` },

    { t: 'method', id: 'integrand-has-x', title: '★ 被积函数里也有 $x$：先请出去', c: String.raw`
      ==求导公式要求被积函数只含积分变量 $t$==。
      若式子长成 $\displaystyle\int_0^{x}f(x,t)\dt$，==必须先把 $x$ 移出积分号==。

      **情形一：$x$ 能提出来**（关于 $x$ 是可分离的）
      $$\int_0^{x}xf(t)\dt=x\int_0^{x}f(t)\dt,$$
      ==提出来之后用乘积法则求导==：
      $$\deriv{}{x}\left[x\int_0^xf\right]=\int_0^xf(t)\dt+xf(x).$$

      **情形二：$x$ 提不出来，用换元把它赶走**。
      典型的 $\displaystyle\int_0^{x}f(x-t)\dt$（卷积形状）：
      令 $u=x-t$，$\du=-\dt$，$t:0\to x$ 对应 $u:x\to0$，
      $$\int_0^{x}f(x-t)\dt=\int_0^{x}f(u)\du,$$
      ==$x$ 从被积函数里跑到了上限上==，可以直接求导得 $f(x)$。

      **情形三：$x$ 在里面且形如 $f(xt)$**，令 $u=xt$：
      $$\int_0^{1}f(xt)\dt\ \xlongequal{u=xt}\ \frac1x\int_0^{x}f(u)\du\quad(x\ne0).$$

      $$\boxed{\ \text{看到被积函数含 }x\text{，先想"提出去"或"换元赶出去"}\ }$$
      ==直接对着 $f(x,t)$ 用求导公式是本节最严重的错误==，
      因为公式的前提被破坏了。
    ` },

    { t: 'key', id: 'cannot-integrate', title: '积不出来照样能用', c: String.raw`
      $\int_0^{x}e^{-t^{2}}\dt$、$\int_0^{x}\frac{\sin t}{t}\dt$ 这些
      [没有初等原函数](#/calculus/indefinite/toolbox?at=cannot)，
      ==但这不妨碍我们研究它们==：

      - **求导**：$\left(\int_0^{x}e^{-t^{2}}\dt\right)'=e^{-x^{2}}$，==一步到位==；
      - **判单调**：导数恒正 $\Rightarrow$ 严格递增；
      - **求极限**：用[洛必达](#/calculus/definite/variable-limit?at=ex-limit)，
        变限积分求导正好消掉积分号；
      - **判凹凸**：再求一次导。

      ==考研出现变限积分，十有八九是因为它积不出来==——
      **题目考的就是"你会不会绕开求原函数"**。

      **一条常用的估计**：$f$ 连续时
      $$\int_0^{x}f(t)\dt\ \sim\ f(0)\cdot x\qquad(x\to0),$$
      ==这是等价无穷小在积分上的版本==，
      由积分中值定理或洛必达立得，求极限时非常好用。

      更精细地，若 $f(t)\sim ct^{k}$（$t\to0$），则
      $$\int_0^{x}f(t)\dt\sim\frac{c}{k+1}x^{k+1},$$
      ==积分把无穷小的阶数提高一档==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-derivative',
      title: '求导：四种形状各来一个',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        求下列函数的导数：
        $$\text{(1)}\ F(x)=\int_0^{x^{2}}e^{-t^{2}}\dt\qquad
        \text{(2)}\ F(x)=\int_{\sin x}^{\cos x}e^{t^{2}}\dt$$
        $$\text{(3)}\ F(x)=\int_0^{x}(x-t)f(t)\dt\qquad
        \text{(4)}\ F(x)=\int_0^{x}tf(x-t)\dt$$
        （其中 $f$ 连续。）
      `,
      idea: String.raw`
        **(1)(2) 直接套[公式](#/calculus/definite/variable-limit?at=core)**，
        注意上下限都要"代入 $\times$ 求导"。

        **(3)(4) 被积函数含 $x$，==必须先处理==**：

        **(3)** 把 $(x-t)$ 展开，==$x$ 能提出来==：
        $$\int_0^{x}(x-t)f(t)\dt=x\int_0^{x}f(t)\dt-\int_0^{x}tf(t)\dt,$$
        第一项用乘积法则，第二项直接求导。

        **(4)** $f(x-t)$ ==提不出来==，用[卷积换元](#/calculus/definite/variable-limit?at=integrand-has-x)
        $u=x-t$（则 $t=x-u$，$\dt=-\du$）：
        $$\int_0^{x}tf(x-t)\dt=\int_0^{x}(x-u)f(u)\du,$$
        ==换完之后就是 (3) 的形状==。

        **注意 (3) 和 (4) 换元后完全相同**——这不是巧合，
        ==卷积是可交换的==：$f*g=g*f$。
      `,
      solution: String.raw`
        **(1)** 上限是 $x^{2}$：
        $$F'(x)=e^{-(x^{2})^{2}}\cdot(x^{2})'=2x\,e^{-x^{4}}.$$

        **(2)** 上限 $\cos x$、下限 $\sin x$：
        $$F'(x)=e^{\cos^{2}x}\cdot(-\sin x)-e^{\sin^{2}x}\cdot\cos x
        =-\sin x\,e^{\cos^{2}x}-\cos x\,e^{\sin^{2}x}.$$

        **(3)** 先拆：
        $$F(x)=x\int_0^{x}f(t)\dt-\int_0^{x}tf(t)\dt.$$
        求导（第一项用乘积法则）：
        $$F'(x)=\int_0^{x}f(t)\dt+xf(x)-xf(x)=\int_0^{x}f(t)\dt.$$
        ==后两项相消==。

        **(4)** 令 $u=x-t$：
        $$F(x)=\int_0^{x}(x-u)f(u)\du,$$
        与 (3) 完全相同，故
        $$F'(x)=\int_0^{x}f(u)\du.$$
      `,
      comment: String.raw`
        **(3) 的结果值得记住**：
        $$\boxed{\ \deriv{}{x}\int_0^{x}(x-t)f(t)\dt=\int_0^{x}f(t)\dt\ }$$
        再求一次导得 $F''(x)=f(x)$。
        ==所以 $\int_0^x(x-t)f(t)\dt$ 是 $f$ 的"二次原函数"==，
        它满足 $F(0)=F'(0)=0$、$F''=f$。

        **这个结构在微分方程里会再见**：
        初值问题 $y''=f(x)$、$y(0)=y'(0)=0$ 的解正是它，
        ==把二阶方程一步写成积分==。
        更一般的 $n$ 次原函数是
        $\frac{1}{(n-1)!}\int_0^x(x-t)^{n-1}f(t)\dt$，
        ==这也是[泰勒公式积分型余项](#/calculus/derivative-app/taylor-proof?at=remainders)的来历==。

        **(2) 的两个高频错误**：

        1. ==下限那一项忘了减号==；
        2. ==下限的导数忘了乘==（$(\sin x)'=\cos x$）。

        **(1) 的检查办法**：$F(x)=\int_0^{x^2}e^{-t^2}\dt$ 是偶函数
        （$x\to-x$ 时上限不变），==所以 $F'$ 应当是奇函数==。
        算出的 $2xe^{-x^{4}}$ 确实是奇函数 $\checkmark$
        ==这种奇偶性自检几乎免费。==
      `,
    },

    { t: 'example',
      id: 'ex-limit',
      title: '★ 变限积分求极限：洛必达消积分号',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        求 $\displaystyle\lim_{x\to0}\frac{\int_0^{x}\left(\int_0^{u}e^{-t^{2}}\dt\right)\du}{x^{2}}$，
        并求 $\displaystyle\lim_{x\to0^{+}}\frac{\int_0^{x}\sqrt{t}\sin t\dt}{x^{3}}$。
      `,
      idea: String.raw`
        **两题都是 $\frac00$ 型**，而且分子是[积不出来或不好积的变限积分](#/calculus/definite/variable-limit?at=cannot-integrate)，
        ==正是洛必达的主场==：求一次导积分号就少一层。

        **第一题是双层积分**，要用两次洛必达
        （或者用一次洛必达 + 一次等价无穷小）：
        $$\text{分子}'=\int_0^{x}e^{-t^{2}}\dt\ \xrightarrow{\ \text{再求导}\ }\ e^{-x^{2}}.$$
        分母 $x^{2}$ 两次求导得 $2$。==答案应当是 $\frac12$==。

        **第二题**：分子求导得 $\sqrt x\sin x$，分母得 $3x^{2}$，
        $$\frac{\sqrt x\sin x}{3x^{2}}\ \sim\ \frac{\sqrt x\cdot x}{3x^{2}}=\frac{1}{3\sqrt x}\to+\infty.$$
        ==极限是 $+\infty$==——这题的"陷阱"是答案不是有限数。

        **也可以不用洛必达**：由[积分的阶数估计](#/calculus/definite/variable-limit?at=cannot-integrate)，
        $\sqrt t\sin t\sim t^{3/2}$，故 $\int_0^x\sim\frac{x^{5/2}}{5/2}$，
        ==比 $x^{3}$ 低阶==，所以比值趋于无穷。
        **这个"数阶数"的办法比洛必达快，而且不会漏掉发散的情形。**
      `,
      solution: String.raw`
        **第一题**：$x\to0$ 时分子分母都趋于 $0$，用洛必达：
        $$\lim_{x\to0}\frac{\int_0^{x}\left(\int_0^{u}e^{-t^{2}}\dt\right)\du}{x^{2}}
        =\lim_{x\to0}\frac{\int_0^{x}e^{-t^{2}}\dt}{2x}.$$
        仍是 $\frac00$，再用一次：
        $$=\lim_{x\to0}\frac{e^{-x^{2}}}{2}=\frac12.$$

        **第二题**：$x\to0^{+}$ 时分子分母都趋于 $0$，用洛必达：
        $$\lim_{x\to0^{+}}\frac{\int_0^{x}\sqrt t\sin t\dt}{x^{3}}
        =\lim_{x\to0^{+}}\frac{\sqrt x\sin x}{3x^{2}}.$$
        由 $\sin x\sim x$，
        $$=\lim_{x\to0^{+}}\frac{x^{3/2}}{3x^{2}}=\lim_{x\to0^{+}}\frac{1}{3\sqrt x}=+\infty.$$

        故第一个极限为 $\dfrac12$，第二个极限为 $+\infty$（不存在）。
      `,
      comment: String.raw`
        **用洛必达前必须验 $\frac00$**。第二题若不验，
        ==直接写"极限为 $\frac13$"是常见错答==。

        **"数阶数"是更稳的办法**。设 $x\to0^{+}$ 时被积函数 $g(t)\sim ct^{k}$，则
        $$\int_0^{x}g(t)\dt\ \sim\ \frac{c}{k+1}x^{k+1},$$
        ==积分把阶数抬高一档==。于是

        | 题 | 被积函数的阶 | 积分的阶 | 与分母比 |
        |---|---|---|---|
        | 第一题内层 | $e^{-t^{2}}\sim1$，阶 $0$ | 阶 $1$ | |
        | 第一题外层 | 阶 $1$ | 阶 ==$2$== | 与 $x^{2}$ 同阶 $\to$ 有限 |
        | 第二题 | $\sqrt t\sin t\sim t^{3/2}$，阶 $\frac32$ | 阶 ==$\frac52$== | 低于 $x^{3}$ $\to$ $\infty$ |

        ==先数阶数判断结果的量级，再动笔算==，能避免"算出有限数其实发散"这类错误。
        这与[无穷小比较](#/threads/lines/taylor?at=limit-order)是同一套思路。

        **第一题的另一种写法（交换积分次序）**：
        $$\int_0^{x}\left(\int_0^{u}e^{-t^{2}}\dt\right)\du
        =\int_0^{x}(x-t)e^{-t^{2}}\dt$$
        （由[上一题的二次原函数结构](#/calculus/definite/variable-limit?at=ex-derivative)），
        ==这样只需一次洛必达==：
        $$\lim_{x\to0}\frac{\int_0^x(x-t)e^{-t^2}\dt}{x^2}
        =\lim_{x\to0}\frac{\int_0^xe^{-t^2}\dt}{2x}=\frac12.$$
        ==双层变限积分能压成单层，这个变形值得记。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **上限与积分变量同名**：==必须写 $\int_a^x f(t)\dt$==，不能写 $\dx$。
      2. **被积函数含 $x$ 就直接求导**：==要先提出去或换元赶出去==，
         见[那一节](#/calculus/definite/variable-limit?at=integrand-has-x)。
      3. **下限那项忘了减号或忘了乘导数**：
         公式是 $f(\psi)\psi'-f(\varphi)\varphi'$，==两个都要乘==。
      4. **认为 $f$ 可积就有 $\Phi'=f$**：==$f$ 要连续==；
         $f$ 只可积时 $\Phi$ 只保证连续。
      5. **不验 $\frac00$ 就用洛必达**：见第二个例题。
      6. **对积不出来的函数死磕原函数**：==变限积分题就是考"绕开"==。
      7. **忘了 $\Phi(a)=0$**：这是很多证明题的起点。
      8. **奇偶性判断出错**：$f$ 为奇函数时 $\int_0^x f$ 是==偶函数==
         （见[奇偶性那一页](#/calculus/limit/parity?at=antiderivative)）。
    ` },

  ],
});
