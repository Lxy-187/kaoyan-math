/* ==========================================================================
   概率论 / 6 数理统计的基本概念 / 总体、样本与统计量
   —— 从"已知分布算概率"翻转成"由数据反推分布"。
      三大抽样分布见 statistics/distributions。
   ========================================================================== */

KM.page({
  path: 'probability/statistics/sampling',
  title: '总体、样本与统计量',
  subtitle: '数理统计把前五章**倒过来做**：不再是已知分布求概率，而是拿着一把数据去猜那个分布',
  tags: ['小题', '概念辨析'],
  updated: '2026-08-20',

  blocks: [

    { t: 'md', c: String.raw`
      前五章的姿势是：==已知分布 $\Rightarrow$ 算概率==。
      从这一章起方向反过来：==拿到一批数据 $\Rightarrow$ 猜分布（或它的参数）==。

      $$\underbrace{\text{概率论}}_{\text{分布}\ \to\ \text{数据}}
      \qquad\Longleftrightarrow\qquad
      \underbrace{\text{数理统计}}_{\text{数据}\ \to\ \text{分布}}$$

      ==工具还是前五章那一套==，只是被拿来干反向的活：
      样本均值要用[期望与方差的性质](#/probability/moments/expectation?at=var-props)，
      正态总体的结论要用[二维正态与线性组合](#/probability/multi-random-var/normal-2d?at=linear-combination)，
      大样本的近似要用[中心极限定理](#/probability/lln-clt/clt?at=clt-statement)。
      这一章几乎没有新工具，==新的只有"看问题的方向"==。
    ` },

    { t: 'key', id: 'population', title: '总体就是一个分布，不是一堆人', c: String.raw`
      **总体**：研究对象某项数量指标的==全体取值==，
      在数学上==就等同于一个概率分布 $F$==。
      个体的那个指标值 $X$ 是随机变量，称"总体 $X$"或"总体 $F$"。

      ==这是本章第一个观念转换==：
      日常说"总体是全校三万名学生"，
      数学上说的却是"身高这个指标的分布 $N(\mu,\sigma^{2})$"。
      **人是载体，分布才是研究对象。**

      **参数**：分布中未知的常数（如 $\mu,\sigma^{2},\lambda,p$）。
      ==统计推断的目标就是这些参数==，
      分为[点估计](#/probability/estimation/point?at=moment-method)、
      [区间估计](#/probability/estimation/interval?at=what-is-ci)、
      [假设检验](#/probability/estimation/hypothesis?at=logic)三类问法。
    ` },

    { t: 'key', id: 'simple-sample', title: '简单随机样本 = 独立同分布', c: String.raw`
      称 $X_1,X_2,\dots,X_n$ 为来自总体 $X$ 的**简单随机样本**，若

      1. 每个 $X_i$ 与总体 $X$ ==同分布==；
      2. $X_1,\dots,X_n$ ==相互独立==。

      $$\boxed{\ \text{简单随机样本}\ \equiv\ \text{独立同分布（i.i.d.）}\ }$$

      **由此立刻得到联合分布**：
      $$F(x_1,\dots,x_n)=\prod_{i=1}^{n}F(x_i),\qquad
      f(x_1,\dots,x_n)=\prod_{i=1}^{n}f(x_i).$$
      ==右边这个连乘就是[最大似然估计](#/probability/estimation/point?at=mle-method)里的似然函数==，
      整章最重要的一个式子在这里就出现了。

      **两个层次要分清**：

      | 记号 | 是什么 | 什么时候 |
      |---|---|---|
      | $X_1,\dots,X_n$ | ==随机变量==（还没抽） | 讨论性质、算期望方差时 |
      | $x_1,\dots,x_n$ | ==具体的数==（已经抽完） | 代入算出估计值时 |

      ==大写是随机的，小写是抽完之后的一组数==。
      估计量 $\hat\theta(X_1,\dots,X_n)$ 是随机变量，
      估计值 $\hat\theta(x_1,\dots,x_n)$ 是一个数——
      这个区别在[评价估计量](#/probability/estimation/evaluation?at=unbiased)时至关重要。
    ` },

    { t: 'key', id: 'statistic', title: '统计量：算得出来才算数', c: String.raw`
      称样本的函数 $g(X_1,\dots,X_n)$ 为**统计量**，
      若它 ==不含任何未知参数==。

      $$\bar X=\frac1n\sum X_i\ \checkmark\qquad
      \frac{\bar X-\mu}{\sigma/\sqrt n}\ \text{（}\mu,\sigma\text{ 未知时）}\ \times$$

      **"不含未知参数"这个要求的道理很实在**：
      统计量是要==拿真实数据算出一个数==的，
      式子里若还留着不知道的 $\mu$，你根本算不出来。

      ==这是选择题的固定考点==：给四个式子问哪个是统计量。
      判断只看一句话：==把样本值代进去，能不能得到一个确定的数？==

      **注意 $\mu,\sigma$ 已知时情况会变**：
      若题目说"$\sigma=2$ 已知，$\mu$ 未知"，
      则 $\frac{\bar X-\mu}{\sigma/\sqrt n}$ ==仍然不是==统计量（含 $\mu$），
      而 $\frac{\bar X}{\sigma}$ ==是==统计量。
      ==已知的常数不算未知参数。==
    ` },

    { t: 'key', id: 'common-statistics', title: '几个常用统计量', c: String.raw`
      **样本均值**：
      $$\bar X=\frac1n\sum_{i=1}^{n}X_i$$

      **样本方差**（==注意分母是 $n-1$==）：
      $$S^{2}=\frac{1}{n-1}\sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)^{2}
      =\frac{1}{n-1}\left(\sum_{i=1}^{n}X_i^{2}-n\bar X^{2}\right)$$
      ==右边那个展开式是实际计算时用的==，比逐项减均值快得多。
      样本标准差 $S=\sqrt{S^{2}}$。

      **样本 $k$ 阶原点矩**：
      $$A_k=\frac1n\sum_{i=1}^{n}X_i^{k},\qquad A_1=\bar X$$
      ==它是[矩估计法](#/probability/estimation/point?at=moment-method)的主角==。

      **两个恒等式，考试常用**：
      $$\sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)=0,\qquad
      \sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)^{2}=\sum_{i=1}^{n}X_i^{2}-n\bar X^{2}$$
      ==第一条说"离差之和恒为零"，这正是自由度少一个的直观来源==。
    ` },

    { t: 'key', id: 'xbar-props', title: '$\\bar X$ 与 $S^{2}$ 的期望方差（对任何总体都成立）', c: String.raw`
      设总体 $\E X=\mu$，$\Var X=\sigma^{2}$，样本容量为 $n$，则
      $$\boxed{\ \E\bar X=\mu,\qquad \Var\bar X=\frac{\sigma^{2}}{n},\qquad \E S^{2}=\sigma^{2}\ }$$

      ==这三条不需要总体是正态==，只要期望方差存在就成立。
      （需要正态的是"$\bar X$ 服从什么分布"这类问题，
      见[正态总体四定理](#/probability/statistics/distributions?at=normal-four)。）

      **推导只用到前几章的性质**：
      $$\E\bar X=\frac1n\sum\E X_i=\mu,\qquad
      \Var\bar X=\frac{1}{n^{2}}\sum\Var X_i=\frac{\sigma^{2}}{n}.$$
      第一式只需[期望的线性性](#/probability/moments/expectation?at=linearity)，==不需要独立==；
      第二式要把 $\frac1n$ 提出来==平方==（$\Var(aX)=a^{2}\Var X$），
      而把 $\Var$ 拆进求和号里==用到了独立性==。

      **$\Var\bar X=\frac{\sigma^{2}}{n}$ 是整个数理统计的引擎**：
      样本越大，均值越稳。
      它同时解释了[大数定律](#/probability/lln-clt/lln?at=lln-meaning)、
      [样本量的 $\sqrt n$ 律](#/probability/lln-clt/clt?at=ex-clt-sample-size)
      和[置信区间的长度](#/probability/estimation/interval?at=steps)。

      ==注意 $\Var\bar X$ 里除的是 $n$，而 $\bar X$ 的标准差除的是 $\sqrt n$。==
    ` },

    { t: 'key', id: 'why-n-1', title: '★ 为什么样本方差要除以 $n-1$', c: String.raw`
      若定义 $S_0^{2}=\frac1n\sum(X_i-\bar X)^{2}$（除以 $n$），可以算出
      $$\E S_0^{2}=\frac{n-1}{n}\sigma^{2}\ <\ \sigma^{2},$$
      ==它系统性地偏小==。除以 $n-1$ 恰好把这个折扣补回来。

      **偏小的根源**：定义里减的是 $\bar X$ 而不是真正的 $\mu$。
      而 $\bar X$ ==是由这批数据自己算出来的、离它们最近的那个中心==——
      $$\sum(X_i-\bar X)^{2}\ \le\ \sum(X_i-c)^{2}\qquad\text{对任何常数}\ c$$
      （右端在 $c=\bar X$ 处取最小）。
      ==所以拿 $\bar X$ 当中心量出来的离散程度，天然比拿 $\mu$ 量出来的小。==

      **"自由度"的说法**：$n$ 个离差 $X_i-\bar X$ 受一条约束
      $\sum(X_i-\bar X)=0$ 的束缚，
      ==只有 $n-1$ 个能自由取值==，所以平均时除以 $n-1$。
      这个 $n-1$ 会一路跟到
      [$\chi^{2}(n-1)$ 和 $t(n-1)$](#/probability/statistics/distributions?at=normal-four)里去，
      ==它们是同一个自由度==。

      **别过度解读**：$S^{2}$ 无偏==不代表 $S$ 无偏==。
      事实上 $\E S<\sigma$（由 $\Var S>0$ 与 $\E S^{2}=\sigma^{2}$ 立得），
      ==样本标准差是有偏的==。这是概念题的一个刁钻考点。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-statistic-check',
      title: '判断哪些是统计量',
      source: '标准例题（概念型）',
      level: 1,
      problem: String.raw`
        设 $X_1,X_2,X_3$ 是来自总体 $N(\mu,\sigma^{2})$ 的简单随机样本，
        其中 $\mu$ 未知、$\sigma^{2}=4$ 已知。判断下列各式是否为统计量：

        $$\text{(A)}\ X_1+X_2+X_3\qquad
        \text{(B)}\ \frac{X_1-\mu}{2}\qquad
        \text{(C)}\ \frac{1}{\sigma^{2}}\sum_{i=1}^{3}X_i^{2}\qquad
        \text{(D)}\ \max\set{X_1,X_2,X_3}-\bar X$$
      `,
      idea: String.raw`
        判据只有一条：==把抽到的数代进去，能不能算出一个确定的数？==

        逐个扫描式子里出现的字母，
        ==凡是出现"未知参数"的立刻淘汰，出现"已知常数"的没关系==。

        本题的关键在于 $\sigma^{2}=4$ **已知**——
        所以含 $\sigma$ 的式子仍然是统计量，含 $\mu$ 的才不是。
        ==命题人正是靠"一个已知、一个未知"来区分是否真懂定义。==
      `,
      solution: String.raw`
        **(A) 是。** 只含样本，代入即得。

        **(B) 不是。** 含未知参数 $\mu$，无法算出具体数值。

        **(C) 是。** $\sigma^{2}=4$ 已知，式子等于 $\frac14\sum X_i^{2}$，可以算出。

        **(D) 是。** $\max$ 与 $\bar X$ 都只依赖样本。

        故 ==(A)(C)(D) 是统计量，(B) 不是==。
      `,
      comment: String.raw`
        **把条件改一下，答案就变**：若题目改成"$\mu,\sigma^{2}$ 均未知"，
        则 (C) 也不再是统计量。==读题时务必看清哪些参数已知。==

        **常见的干扰项设计**：

        | 式子 | 是否统计量 | 理由 |
        |---|---|---|
        | $\bar X-\mu$ | ==否== | 含 $\mu$ |
        | $\frac{\bar X-\mu}{\sigma/\sqrt n}$ | ==否==（$\mu$ 未知时） | 这是[枢轴量](#/probability/estimation/interval?at=pivot)，不是统计量 |
        | $\frac{(n-1)S^{2}}{\sigma^{2}}$ | 看 $\sigma$ 是否已知 | ==同上== |
        | $S^{2}$ | 是 | 只含样本 |

        ==第二、三行值得特别注意==：区间估计里用的那些式子
        （$\frac{\bar X-\mu}{S/\sqrt n}$ 之类）==往往不是统计量==，
        它们叫**枢轴量**——含未知参数，但分布已知。
        ==两个概念只有一字之差，是第 7 章的重要区分。==
      `,
    },

    { t: 'example',
      id: 'ex-es2',
      title: '证明 $\\E S^{2}=\\sigma^{2}$：$n-1$ 是怎么冒出来的',
      source: '标准例题（必会推导）',
      level: 3,
      problem: String.raw`
        设 $X_1,\dots,X_n$ 是来自期望为 $\mu$、方差为 $\sigma^{2}$ 的总体的简单随机样本，
        $$S^{2}=\frac{1}{n-1}\sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)^{2}.$$
        证明 $\E S^{2}=\sigma^{2}$。
      `,
      idea: String.raw`
        **直接对 $(X_i-\bar X)^{2}$ 取期望很难**，因为 $\bar X$ 里含着 $X_i$ 自己，
        两者不独立，展开会出现一堆交叉项。

        **正确的第一步是用恒等式把 $\bar X$ 从括号里赶出去**：
        $$\sum(X_i-\bar X)^{2}=\sum X_i^{2}-n\bar X^{2}.$$
        右端==两项各自都是"平方的和"，可以分别取期望==，交叉项全没了。

        **第二步是同一个公式用两次**：
        $$\E X_i^{2}=\Var X_i+(\E X_i)^{2}=\sigma^{2}+\mu^{2},$$
        $$\E\bar X^{2}=\Var\bar X+(\E\bar X)^{2}=\frac{\sigma^{2}}{n}+\mu^{2}.$$
        ==注意两式的结构完全相同，只是 $\bar X$ 的方差被 $n$ 除过==——
        **这个 $\frac1n$ 就是 $n-1$ 的全部来源**。

        看清楚这一点，整个证明就只剩相减了。
      `,
      solution: String.raw`
        **第一步（恒等变形）**：
        $$\sum_{i=1}^{n}(X_i-\bar X)^{2}
        =\sum X_i^{2}-2\bar X\sum X_i+n\bar X^{2}
        =\sum X_i^{2}-2n\bar X^{2}+n\bar X^{2}
        =\sum X_i^{2}-n\bar X^{2}.$$

        **第二步（两次用 $\E Y^{2}=\Var Y+(\E Y)^{2}$）**：
        $$\E X_i^{2}=\sigma^{2}+\mu^{2},\qquad
        \E\bar X^{2}=\Var\bar X+(\E\bar X)^{2}=\frac{\sigma^{2}}{n}+\mu^{2}.$$

        **第三步（取期望）**：
        $$\E\!\left[\sum(X_i-\bar X)^{2}\right]
        =n\bigl(\sigma^{2}+\mu^{2}\bigr)-n\!\left(\frac{\sigma^{2}}{n}+\mu^{2}\right)$$
        $$=n\sigma^{2}+n\mu^{2}-\sigma^{2}-n\mu^{2}=(n-1)\sigma^{2}.$$

        ==$n\mu^{2}$ 整块相消==，剩下 $(n-1)\sigma^{2}$。故
        $$\E S^{2}=\frac{1}{n-1}\cdot(n-1)\sigma^{2}=\sigma^{2}.\qquad\blacksquare$$
      `,
      comment: String.raw`
        **这个证明的美感在于 $(n-1)$ 是"算出来的"而不是"凑出来的"**：
        $$n\sigma^{2}-\underbrace{\frac{n\sigma^{2}}{n}}_{\text{来自 }\bar X}=(n-1)\sigma^{2}.$$
        ==正因为 $\Var\bar X$ 比 $\Var X_i$ 小了 $n$ 倍，减出来才恰好少一个 $\sigma^{2}$。==

        **这里没有用到正态性**，也没有用到"同分布"以外的任何条件——
        ==$\E S^{2}=\sigma^{2}$ 对一切有二阶矩的总体都成立==。
        考试中若题目说"总体服从某个奇怪的分布，求 $\E S^{2}$"，
        ==答案永远是 $\sigma^{2}$，不必算==。

        **顺带得到一个常考的副产品**：
        $$\E\!\left[\sum_{i=1}^{n}(X_i-\bar X)^{2}\right]=(n-1)\sigma^{2},$$
        所以除以 $n$ 的那个 $S_0^{2}$ 满足 $\E S_0^{2}=\frac{n-1}{n}\sigma^{2}$，
        ==它是有偏的，偏小==。
        题目若给 $S_0^{2}$ 让你判断无偏性，直接用这个结论。

        **推导本身也是考点**：这是数理统计部分==最常出现的证明题==，
        建议把三步（恒等变形、两次 $\E Y^{2}$、相减）背到能默写。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **样本方差的分母写成 $n$**：==定义是 $n-1$==。
         除以 $n$ 的那个是有偏的。
      2. **把含未知参数的式子当统计量**：判据是"代入样本值能否算出数"。
      3. **$\Var\bar X$ 写成 $\frac{\sigma}{\sqrt n}$**：
         ==方差是 $\frac{\sigma^{2}}{n}$，标准差才是 $\frac{\sigma}{\sqrt n}$==。
      4. **以为 $\E S^{2}=\sigma^{2}$ 需要正态总体**：==不需要==，任何总体都成立。
      5. **由 $\E S^{2}=\sigma^{2}$ 推出 $\E S=\sigma$**：==错==，
         事实上 $\E S<\sigma$。
      6. **大小写不分**：$X_i$ 是随机变量，$x_i$ 是抽完之后的数；
         估计量是随机变量，估计值是一个数。
      7. **忘了 $\sum(X_i-\bar X)=0$**：这条恒等式是很多化简的起点，
         也是自由度 $n-1$ 的来源。
      8. **算 $S^{2}$ 时逐项减均值**：用 $\sum X_i^{2}-n\bar X^{2}$ ==快得多且不易错==。
    ` },

  ],
});
