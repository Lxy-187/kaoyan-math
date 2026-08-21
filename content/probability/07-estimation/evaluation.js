/* ==========================================================================
   概率论 / 7 参数估计与假设检验 / 估计量的评价
   —— 同一个参数可以有很多估计量，这一页给挑选的标准。
      估计量怎么造出来见 estimation/point。
   ========================================================================== */

KM.page({
  path: 'probability/estimation/evaluation',
  title: '估计量的评价（无偏 / 有效 / 一致）',
  subtitle: '无偏是**平均起来不偏**，有效是**波动更小**，相合是**样本大了会准**——三把尺子量三件不同的事',
  tags: ['小题', '大题', '证明题', '概念辨析'],
  updated: '2026-08-20',

  blocks: [

    { t: 'md', c: String.raw`
      [上一页](#/probability/estimation/point?at=moment-method)造出了估计量，
      这一页问：==好不好？==

      同一个参数往往有很多个估计量。以正态总体的 $\mu$ 为例，
      $\bar X$、$X_1$、$\frac{X_1+X_2}{2}$、$0.9\bar X$ ==都是候选==。
      要在它们之间排序，就得先说清"好"指的是什么。

      | 标准 | 问的问题 | 看的是 |
      |---|---|---|
      | [**无偏性**](#/probability/estimation/evaluation?at=unbiased) | 平均起来对不对 | $\E\hat\theta$ |
      | [**有效性**](#/probability/estimation/evaluation?at=efficiency) | 波动大不大 | $\Var\hat\theta$ |
      | [**相合性**](#/probability/estimation/evaluation?at=consistency) | $n$ 大了会不会准 | $n\to\infty$ 的极限 |

      ==前两条是"固定 $n$"的性质，第三条是"$n\to\infty$"的性质==，
      这是三者最根本的区分，也是判断题最爱考的地方。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'unbiased-sec', c: '一、无偏性' },

    { t: 'key', id: 'unbiased', title: '定义：期望恰好等于真值', c: String.raw`
      称 $\hat\theta$ 是 $\theta$ 的**无偏估计量**，若
      $$\boxed{\ \E\hat\theta=\theta\qquad\text{对一切可能的}\ \theta\ \text{都成立}\ }$$
      差值 $\E\hat\theta-\theta$ 称为**偏差**。

      **"对一切 $\theta$"这五个字不能省**：
      无偏性是对==整个参数空间==的要求，
      恰好在某一个 $\theta_0$ 处相等不算无偏。

      **它的含义是"没有系统性偏差"**：
      如果反复抽样、反复计算 $\hat\theta$，==这些值的平均会落在 $\theta$ 上==。
      注意它==完全没说单次估计有多准==——
      一个无偏估计量可能次次离谱，只要正负偏差能相抵。

      **三个必须记住的例子**：

      | 估计量 | 无偏吗 |
      |---|---|
      | $\bar X$ 估 $\mu$ | ==是==（任何总体） |
      | $S^{2}=\frac{1}{n-1}\sum(X_i-\bar X)^{2}$ 估 $\sigma^{2}$ | ==是==（[证明](#/probability/statistics/sampling?at=ex-es2)） |
      | $\hat{\sigma^{2}}_{\text{MLE}}=\frac1n\sum(X_i-\bar X)^{2}$ | ==否==，偏小 |

      ==$S^{2}$ 无偏而 $S$ 不无偏==（$\E S<\sigma$），这个反直觉的事实常考。
    ` },

    { t: 'key', id: 'unbiased-not-unique', title: '无偏估计不唯一，而且无偏不等于好', c: String.raw`
      **不唯一**：设 $X_1,\dots,X_n$ 来自期望为 $\mu$ 的总体，则
      $$X_1,\qquad \frac{X_1+X_2}{2},\qquad \bar X,\qquad
      \sum_{i=1}^{n}a_iX_i\ \left(\textstyle\sum a_i=1\right)$$
      ==全都是 $\mu$ 的无偏估计==。
      最后一个式子说明无偏估计有==无穷多个==，只要系数之和为 $1$。

      ==这正是需要第二把尺子（有效性）的原因==：
      无偏只筛掉了一部分候选，剩下的还要比方差。

      **无偏不等于好**：[$U(0,\theta)$ 那道题](#/probability/estimation/point?at=ex-moment-uniform)里，
      无偏的 $2\bar X$ ==可能小于某个观测值==——
      而 $\theta$ 显然不可能小于任何一个观测到的 $x_i$。
      ==一个"明知道错了"却仍然无偏的估计==。
      与此同时，有偏的 $\max X_i$ 修正后方差小一个数量级。

      **结论**：==无偏性是个方便的性质，不是终极标准==。
      考研只要求会判断，不要求评价它的优劣。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'efficiency-sec', c: '二、有效性' },

    { t: 'key', id: 'efficiency', title: '定义：在无偏的前提下比方差', c: String.raw`
      设 $\hat\theta_1,\hat\theta_2$ ==都是 $\theta$ 的无偏估计量==，若
      $$\Var\hat\theta_1\ \le\ \Var\hat\theta_2\qquad(\text{且至少有一个 }\theta\text{ 处严格小})$$
      则称 $\hat\theta_1$ 比 $\hat\theta_2$ **有效**。

      =="都是无偏估计"是前提==：比较两个有偏估计量的方差没有意义
      （常数 $0$ 的方差最小，但它显然不是好估计）。
      ==选择题里最常见的错项就是漏掉这个前提。==

      **典型比较**：估计 $\mu$ 时
      $$\Var(X_1)=\sigma^{2},\qquad
      \Var\!\left(\frac{X_1+X_2}{2}\right)=\frac{\sigma^{2}}{2},\qquad
      \Var(\bar X)=\frac{\sigma^{2}}{n}.$$
      ==$\bar X$ 最有效==，而且在所有"系数和为 $1$ 的线性无偏估计"里，
      $\bar X$ ==就是方差最小的那个==。

      **为什么是它**：由柯西–施瓦茨，在 $\sum a_i=1$ 的约束下
      $$\Var\!\left(\sum a_iX_i\right)=\sigma^{2}\sum a_i^{2}\ \ge\ \frac{\sigma^{2}}{n},$$
      ==等号当且仅当所有 $a_i=\frac1n$==。
      这是[柯西–施瓦茨](#/threads/patterns/cauchy-schwarz?at=three-forms)在统计里的一次直接应用：
      **系数和固定时，平均分配让平方和最小。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'consistency-sec', c: '三、相合性（一致性）' },

    { t: 'key', id: 'consistency', title: '定义：样本越多越准', c: String.raw`
      称 $\hat\theta_n$ 是 $\theta$ 的**相合估计量**（一致估计量），若
      $$\boxed{\ \hat\theta_n\ \xrightarrow{\ P\ }\ \theta\qquad(n\to\infty)\ }$$
      即对任意 $\varepsilon>0$，$P(\abs{\hat\theta_n-\theta}\ge\varepsilon)\to0$，
      见[依概率收敛](#/probability/lln-clt/lln?at=convergence-p)。

      ==这是三条里唯一涉及 $n\to\infty$ 的==，
      所以它和前两条==互不蕴含==：

      | | 无偏 | 相合 |
      |---|---|---|
      | $\bar X$ 估 $\mu$ | ==是== | ==是== |
      | $X_1$ 估 $\mu$ | ==是== | ==否==（永远只用一个数据） |
      | $\hat{\sigma^{2}}_{\text{MLE}}$ 估 $\sigma^{2}$ | ==否== | ==是== |

      ==第二行和第三行是最好的两个反例==，务必记住：
      **无偏推不出相合，相合也推不出无偏。**

      **判相合性的两条常用路子**：

      1. **直接套[大数定律](#/probability/lln-clt/lln?at=which-lln)**：
         $\bar X\xrightarrow{P}\mu$，
         $\frac1n\sum g(X_i)\xrightarrow{P}\E g(X)$。
         ==矩估计量因此天然相合。==
      2. **用充分条件**（更好用）：
         $$\E\hat\theta_n\to\theta\ \text{且}\ \Var\hat\theta_n\to0
         \ \Longrightarrow\ \hat\theta_n\ \text{相合}.$$
         由[切比雪夫不等式](#/probability/lln-clt/lln?at=chebyshev)立得。
         ==这条把"证依概率收敛"变成了"算两个极限"，是解答题的标准写法。==
    ` },

    { t: 'method', id: 'how-to-prove', title: '三种性质各自怎么证', c: String.raw`
      **证无偏**：算 $\E\hat\theta$，看是否等于 $\theta$。
      工具是[期望的线性性](#/probability/moments/expectation?at=linearity)
      和 $\E X^{2}=\Var X+(\E X)^{2}$。
      ==绝大多数题目算到这一步就结束了。==

      **证有效**：先各自验无偏，再算两个方差比大小。
      工具是 $\Var(aX+b)=a^{2}\Var X$ 与独立时方差可加。

      **证相合**：优先用上面那条充分条件——
      $$\text{算}\ \E\hat\theta_n\ \text{与}\ \Var\hat\theta_n,
      \ \text{说明前者}\to\theta\ \text{、后者}\to0.$$
      写法固定：

      > 由于 $\E\hat\theta_n=\cdots\to\theta$，$\Var\hat\theta_n=\cdots\to0$，
      > 由切比雪夫不等式，对任意 $\varepsilon>0$，
      > $$P(\abs{\hat\theta_n-\theta}\ge\varepsilon)\le\frac{\Var\hat\theta_n+(\E\hat\theta_n-\theta)^2}{\varepsilon^{2}}\to0,$$
      > 故 $\hat\theta_n$ 是 $\theta$ 的相合估计。

      ==若 $\hat\theta_n$ 本身就是样本矩的连续函数，直接引大数定律更快==，
      连算方差都省了。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-unbiased',
      title: '含参数的线性组合：定系数使之无偏，再挑最有效的',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        设 $X_1,X_2,X_3$ 是来自总体 $X$（$\E X=\mu$，$\Var X=\sigma^{2}$）的简单随机样本，
        考虑三个估计量
        $$\hat\mu_1=\frac13X_1+\frac13X_2+\frac13X_3,\qquad
        \hat\mu_2=\frac12X_1+\frac14X_2+\frac14X_3,$$
        $$\hat\mu_3=\frac12X_1+\frac13X_2+aX_3.$$

        1. 求 $a$，使 $\hat\mu_3$ 为 $\mu$ 的无偏估计；
        2. 在三者中指出最有效的一个。
      `,
      idea: String.raw`
        **第 1 问**：$\E\hat\mu_3=\left(\frac12+\frac13+a\right)\mu$，
        要它恒等于 $\mu$，==只需系数之和为 $1$==。
        这条规律对所有 $\sum a_iX_i$ 型的估计量都成立，
        ==看到"求 $a$ 使之无偏"，直接令系数和为 $1$==，不用真的算期望。

        **第 2 问**：三者都无偏（第一、二个的系数和显然是 $1$），
        所以==可以正当地比较方差==。由独立性
        $$\Var\!\left(\sum a_iX_i\right)=\sigma^{2}\sum a_i^{2},$$
        ==只需比较 $\sum a_i^{2}$，$\sigma^{2}$ 是公因子==。

        **预判**：由[有效性那一节](#/probability/estimation/evaluation?at=efficiency)的结论，
        系数和固定为 $1$ 时，==平均分配的 $\sum a_i^{2}$ 最小==，
        所以 $\hat\mu_1=\bar X$ 必然最有效。算一遍确认即可。
      `,
      solution: String.raw`
        **(1)** 由期望的线性性，
        $$\E\hat\mu_3=\left(\frac12+\frac13+a\right)\mu.$$
        无偏要求对一切 $\mu$ 成立，故
        $$\frac12+\frac13+a=1\ \Longrightarrow\ a=1-\frac56=\boxed{\frac16}.$$

        **(2)** 三者的系数和均为 $1$，都是无偏估计。由 $X_i$ 独立同方差，
        $$\Var\!\left(\sum a_iX_i\right)=\sigma^{2}\sum a_i^{2}.$$

        $$\hat\mu_1:\ \sum a_i^{2}=3\times\frac19=\frac13\approx0.3333$$
        $$\hat\mu_2:\ \sum a_i^{2}=\frac14+\frac1{16}+\frac1{16}=\frac38=0.375$$
        $$\hat\mu_3:\ \sum a_i^{2}=\frac14+\frac19+\frac1{36}=\frac{9+4+1}{36}=\frac{14}{36}\approx0.3889$$

        ==$\frac13$ 最小==，故 $\hat\mu_1=\bar X$ 最有效。
      `,
      comment: String.raw`
        **两条可以直接背的结论**：

        1. $\sum a_iX_i$ 无偏 $\iff$ ==$\sum a_i=1$==；
        2. 在此约束下 $\Var$ 最小 $\iff$ ==所有 $a_i=\frac1n$==，即 $\bar X$。

        ==有了这两条，这类题可以口算==：先看系数和定无偏，再看"谁最接近平均分配"定有效。

        **背后是柯西–施瓦茨**：
        $$1=\left(\sum a_i\cdot1\right)^{2}\le n\sum a_i^{2}
        \ \Longrightarrow\ \sum a_i^{2}\ge\frac1n,$$
        ==等号当且仅当所有 $a_i$ 相等==。
        这和[四条主线里的柯西–施瓦茨](#/threads/patterns/cauchy-schwarz?at=why-equality)
        取等条件完全一致：==向量成比例时取等==。

        **常见变体**：把 $X_i$ 的方差改成各不相同（$\Var X_i=\sigma_i^{2}$），
        此时最优系数不再是 $\frac1n$，而是 ==与方差成反比==：
        $a_i\propto\frac{1}{\sigma_i^{2}}$。
        直观上很合理——==测量越精确的那个观测，权重就该越大==。
      `,
    },

    { t: 'example',
      id: 'ex-consistency',
      title: '证相合性：算两个极限就够了',
      source: '标准例题（证明题）',
      level: 3,
      problem: String.raw`
        设 $X_1,\dots,X_n$ 是来自 $U(0,\theta)$ 的简单随机样本，
        $M=\max\set{X_1,\dots,X_n}$。已知
        $$\E M=\frac{n}{n+1}\theta,\qquad \Var M=\frac{n\theta^{2}}{(n+1)^{2}(n+2)}.$$

        1. 说明 $M$ 是 $\theta$ 的有偏估计，并给出一个无偏修正；
        2. 证明 $M$ 是 $\theta$ 的相合估计。
      `,
      idea: String.raw`
        **第 1 问**：$\E M=\frac{n}{n+1}\theta\ne\theta$，==直接读出有偏==。
        修正就是==乘上倒数==：$\frac{n+1}{n}M$。
        这是"发现偏差是个常数倍，就除掉它"的标准动作。

        **第 2 问**：$M$ ==不是样本矩的形式==，
        所以不能直接引大数定律，
        应当走[充分条件那条路](#/probability/estimation/evaluation?at=consistency)：
        ==算 $\E M\to\theta$ 和 $\Var M\to0$==。

        题目已经把两个量都给出来了，==这题实际上只考"知不知道该看这两个极限"==。

        **注意有偏时的切比雪夫要小心**：$\E M\ne\theta$，
        所以不能直接写 $P(\abs{M-\theta}\ge\varepsilon)\le\frac{\Var M}{\varepsilon^{2}}$。
        规范的做法是==先把 $M-\theta$ 拆成"随机偏离 + 系统偏差"==：
        $$M-\theta=\underbrace{(M-\E M)}_{\text{随机}}+\underbrace{(\E M-\theta)}_{\text{确定}}.$$
      `,
      solution: String.raw`
        **(1)** 由 $\E M=\dfrac{n}{n+1}\theta\ne\theta$（对一切 $\theta>0$），
        故 $M$ ==是有偏估计，且系统性地偏小==。

        取 $\hat\theta=\dfrac{n+1}{n}M$，则
        $$\E\hat\theta=\frac{n+1}{n}\cdot\frac{n}{n+1}\theta=\theta,$$
        故 $\dfrac{n+1}{n}M$ 是 $\theta$ 的无偏估计。

        **(2)** 记 $b_n=\E M-\theta=-\dfrac{\theta}{n+1}$。对任意 $\varepsilon>0$，
        当 $n$ 充分大时 $\abs{b_n}<\dfrac\varepsilon2$，此时
        $$\abs{M-\theta}\ge\varepsilon\ \Longrightarrow\ \abs{M-\E M}\ge\varepsilon-\abs{b_n}>\frac\varepsilon2,$$
        故由切比雪夫不等式
        $$P\bigl(\abs{M-\theta}\ge\varepsilon\bigr)
        \le P\!\left(\abs{M-\E M}>\frac\varepsilon2\right)
        \le\frac{\Var M}{(\varepsilon/2)^{2}}
        =\frac{4n\theta^{2}}{\varepsilon^{2}(n+1)^{2}(n+2)}.$$

        右端分子是 $n$ 的一次、分母是三次，故 $n\to\infty$ 时趋于 $0$。因此
        $$M\ \xrightarrow{\ P\ }\ \theta,$$
        即 $M$ 是 $\theta$ 的相合估计。$\blacksquare$
      `,
      comment: String.raw`
        **这道题演示了三条标准的独立性**：
        $M$ ==有偏但相合==，
        而[前一道题](#/probability/estimation/evaluation?at=ex-unbiased)里的
        $X_1$ ==无偏但不相合==。
        ==两个例子合起来说明：无偏与相合谁也推不出谁。==

        **通用的判据（值得记住）**：
        $$\E\hat\theta_n\to\theta\quad\text{且}\quad\Var\hat\theta_n\to0
        \ \Longrightarrow\ \hat\theta_n\ \text{相合}$$
        ==这是充分条件，不是必要条件==，但考研范围内够用了。
        无偏时（$\E\hat\theta_n=\theta$）它简化成"只要方差趋于零"。

        **为什么 $X_1$ 不相合**：$\Var X_1=\sigma^{2}$ ==不随 $n$ 变化==，
        永远不趋于零。
        直观上更清楚：不管抽多少样本，$X_1$ ==只看第一个数据==，
        再多的信息也用不上。

        **一个不用切比雪夫的更短证法**（若允许直接算）：
        $$P(\abs{M-\theta}\ge\varepsilon)=P(M\le\theta-\varepsilon)
        =\left(\frac{\theta-\varepsilon}{\theta}\right)^{n}\to0,$$
        因为括号里的数小于 $1$。==这个做法更快，但要会求 $M$ 的分布==，
        见[最大值的分布](#/probability/multi-random-var/function-2d?at=max-min)。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **比较有效性时不先验无偏**：==有效性只在无偏估计之间比较==。
      2. **无偏只在某个 $\theta_0$ 处验证**：定义要求==对一切 $\theta$ 成立==。
      3. **把无偏和相合混为一谈**：$X_1$ 无偏不相合，
         $\hat{\sigma^{2}}_{\text{MLE}}$ 相合不无偏，==两个方向都有反例==。
      4. **由 $\E\hat{\sigma^{2}}=\sigma^{2}$ 推 $\E\hat\sigma=\sigma$**：
         ==无偏性对非线性变换不保持==。
      5. **证相合时忘了方差趋于零**：两个极限==都要算==。
      6. **有偏时直接套切比雪夫**：要==先把系统偏差分离出来==，
         见[上面那道题](#/probability/estimation/evaluation?at=ex-consistency)。
      7. **认为无偏估计唯一**：$\sum a_iX_i$（$\sum a_i=1$）==有无穷多个==。
      8. **认为无偏就是最好**：[$2\bar X$ 那个例子](#/probability/estimation/point?at=ex-moment-uniform)
         无偏却可能小于观测值。
    ` },

  ],
});
