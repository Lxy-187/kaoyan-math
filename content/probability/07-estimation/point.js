/* ==========================================================================
   概率论 / 7 参数估计与假设检验 / 矩估计与最大似然估计
   —— 两种点估计方法。评价它们的标准见 estimation/evaluation。
   ========================================================================== */

KM.page({
  path: 'probability/estimation/point',
  title: '矩估计与最大似然估计',
  subtitle: '矩估计是**让样本矩等于总体矩**；最大似然是**让已经发生的事最像会发生**。两套方法，两种套路',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'md', c: String.raw`
      **点估计**：用一个统计量 $\hat\theta(X_1,\dots,X_n)$ 去猜未知参数 $\theta$。

      考研只要求两种方法，==而且几乎每年必考一道大题==：

      | 方法 | 思想 | 计算 |
      |---|---|---|
      | [矩估计](#/probability/estimation/point?at=moment-method) | 样本矩 $=$ 总体矩 | ==解方程==，简单 |
      | [最大似然](#/probability/estimation/point?at=mle-method) | 让观测到的样本"最可能出现" | ==求最值==，稍繁但更常考 |

      两者==常常给出不同的答案==，这本身就是考点：
      题目往往一问矩估计、二问最大似然，==就是要看你会不会把两个混起来==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'moment-sec', c: '一、矩估计法' },

    { t: 'method', id: 'moment-method', title: '矩估计三步', c: String.raw`
      1. **算总体矩**：把 $\E X$（必要时还有 $\E X^{2}$）用未知参数 $\theta$ 表示出来。
         ==有几个未知参数，就要算到几阶矩。==
      2. **令样本矩等于总体矩**：
         $$\E X=\bar X,\qquad \E X^{2}=A_2=\frac1n\sum X_i^{2}$$
      3. **反解 $\theta$**，把解出来的记作 $\hat\theta$。

      **一个参数只用一阶矩，两个参数才用到二阶矩。**
      ==别一上来就列两个方程==，浪费时间还容易算错。

      **第 2 步的一个常用替换**：两个参数时，
      与其用 $\E X^{2}=A_2$，不如用等价的
      $$\Var X=A_2-\bar X^{2}=\frac1n\sum(X_i-\bar X)^{2},$$
      ==直接令"总体方差 = 样本二阶中心矩"==，往往能少写一步。
      注意这里除的是 $n$ ==不是 $n-1$==——矩估计用的是 $A_2-\bar X^{2}$。

      **写答案的格式**：估计量用大写（$\hat\mu=\bar X$），
      估计值用小写（$\hat\mu=\bar x$）。==题目问"估计量"就写大写。==
    ` },

    { t: 'key', id: 'moment-why', title: '矩估计凭什么合理：辛钦大数定律', c: String.raw`
      由[辛钦大数定律的推论](#/probability/lln-clt/lln?at=which-lln)，
      $$A_k=\frac1n\sum_{i=1}^{n}X_i^{k}\ \xrightarrow{\ P\ }\ \E X^{k}.$$

      ==样本矩依概率收敛到总体矩==——这就是"令两者相等"的全部理由。
      $n$ 越大，这个等号越接近真的成立。

      **由此顺带得到一条性质**：矩估计量==总是相合的==
      （在 $g$ 连续的条件下），见[相合性](#/probability/estimation/evaluation?at=consistency)。
      但它==不一定无偏==——
      比如 $\sigma^{2}$ 的矩估计 $\frac1n\sum(X_i-\bar X)^{2}$
      就是[有偏的](#/probability/statistics/sampling?at=why-n-1)。

      **矩估计的短板**：它==只用了样本的前几阶矩==，
      把分布的其余信息全扔了。
      所以遇到均匀分布这种"矩不敏感"的情形，
      矩估计会给出==明显不如最大似然的答案==，
      下面的[例题](#/probability/estimation/point?at=ex-moment-uniform)就是。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'mle-sec', c: '二、最大似然估计' },

    { t: 'method', id: 'mle-method', title: '最大似然五步', c: String.raw`
      **思想**：既然这组样本已经被抽到了，
      就==选那个让"抽到这组样本"的概率最大的 $\theta$==。

      1. **写似然函数**（把[样本的联合分布](#/probability/statistics/sampling?at=simple-sample)看成 $\theta$ 的函数）：
         $$L(\theta)=\prod_{i=1}^{n}p(x_i;\theta)\quad(\text{离散})
         \qquad\text{或}\qquad
         L(\theta)=\prod_{i=1}^{n}f(x_i;\theta)\quad(\text{连续})$$
         ==定义域要写清楚==（比如"$x_i>0$"），这一步决定了第 4 步走哪条路。
      2. **取对数**：$\ln L(\theta)=\sum_{i=1}^{n}\ln f(x_i;\theta)$。
      3. **求导令零**（似然方程）：$\dfrac{\d\ln L}{\d\theta}=0$。
      4. **解出 $\hat\theta$**，==并验证它确实是最大值点==。
      5. 若有多个参数，对每个参数求偏导，==解方程组==。

      **第 3 步不一定走得通**——见[求导法失效的情形](#/probability/estimation/point?at=mle-boundary)，
      ==这是本页最重要的一节，也是失分最多的地方==。

      **答案的形式**：解出来的是含 $x_i$ 的式子；
      ==问"估计量"时把 $x_i$ 换成 $X_i$==。
    ` },

    { t: 'key', id: 'mle-log', title: '为什么要取对数', c: String.raw`
      $$\ln\ \text{把}\ \prod\ \text{变成}\ \sum$$

      $L(\theta)$ 是 $n$ 个因子的连乘，直接求导要用 $n$ 重乘积法则，==根本没法算==；
      取对数后变成求和，求导逐项进行，==瞬间可解==。

      **这么做不改变答案，因为 $\ln$ 严格单调递增**：
      $$L(\theta)\ \text{在}\ \hat\theta\ \text{处最大}
      \iff \ln L(\theta)\ \text{在}\ \hat\theta\ \text{处最大}.$$
      ==单调变换不移动极值点的位置==，只改变极值的大小。

      **实操提示**：写 $\ln L$ 时==先把与 $\theta$ 无关的项归并成常数==。
      例如正态总体
      $$\ln L=-\frac n2\ln(2\pi)-\frac n2\ln\sigma^{2}
      -\frac{1}{2\sigma^{2}}\sum(x_i-\mu)^{2},$$
      对 $\mu$ 求导时前两项直接是 $0$，==省掉大量笔墨==。
    ` },

    { t: 'warn', id: 'mle-boundary', title: '★ 求导法失效：似然函数单调时看边界', c: String.raw`
      **不是所有似然函数都靠求导取到最大值。**
      当 $L(\theta)$ 关于 $\theta$ ==单调==时，最大值在==定义域的端点==取到，
      而求导令零会得到"无解"或者错误的答案。

      **识别信号**：==参数 $\theta$ 出现在密度的"取值范围"里==，而不只是在表达式里。

      | 密度 | $\theta$ 在哪 | 用什么 |
      |---|---|---|
      | $\lambda e^{-\lambda x},\ x>0$ | ==只在表达式里== | 求导 |
      | $\frac1\theta,\ 0<x<\theta$ | ==在范围里== | ==看边界== |
      | $e^{-(x-\theta)},\ x>\theta$ | ==在范围里== | ==看边界== |

      **边界型的标准处理**：把"所有 $x_i$ 都落在范围内"这个约束==翻译成对 $\theta$ 的不等式==。

      以 $U(0,\theta)$ 为例：
      $$L(\theta)=\prod\frac1\theta=\frac{1}{\theta^{n}}
      \qquad\text{但必须}\ 0<x_i<\theta\ \text{对所有}\ i\ \text{成立}$$
      $$\iff\ \theta\ \ge\ \max_i x_i.$$
      $\frac{1}{\theta^{n}}$ 关于 $\theta$ ==严格递减==，
      所以 $\theta$ ==取得越小越好==，而它又不能小于 $\max x_i$，故
      $$\boxed{\ \hat\theta=\max\set{X_1,\dots,X_n}\ }$$

      ==整个推理里一次导数都没求。==
      考场上看到"$\theta$ 出现在取值范围里"，立刻切换到这条路。
    ` },

    { t: 'key', id: 'mle-invariance', title: '不变性：估完 $\\theta$ 就免费得到 $g(\\theta)$', c: String.raw`
      若 $\hat\theta$ 是 $\theta$ 的最大似然估计，$g$ 是连续函数，则
      $$\boxed{\ \widehat{g(\theta)}=g(\hat\theta)\ }$$

      **用法**：题目问"求 $\sigma$ 的最大似然估计"，
      你只要求出 $\hat{\sigma^{2}}$，==直接开根号==即可：
      $\hat\sigma=\sqrt{\hat{\sigma^{2}}}$。
      问"求 $P(X>1)=e^{-\lambda}$ 的最大似然估计"，
      就把 $\hat\lambda$ ==代进去==：$\widehat{e^{-\lambda}}=e^{-\hat\lambda}$。

      ==这条性质省掉了重新做一遍最大似然的工夫==，是解答题里的常见第二问。

      **注意矩估计没有这条性质**，而且
      ==无偏性也不具有不变性==：
      $\E\hat{\sigma^{2}}=\sigma^{2}$ ==推不出== $\E\hat\sigma=\sigma$，
      见[样本标准差是有偏的](#/probability/statistics/sampling?at=why-n-1)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-mle-exp',
      title: '指数分布：两种方法给出同一个答案',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设总体 $X$ 服从参数为 $\lambda$ 的指数分布，密度为
        $$f(x;\lambda)=\begin{cases}\lambda e^{-\lambda x},&x>0\\0,&x\le0\end{cases}\qquad(\lambda>0)$$
        $X_1,\dots,X_n$ 为简单随机样本。求 $\lambda$ 的矩估计与最大似然估计。
      `,
      idea: String.raw`
        **矩估计**：一个参数，只用一阶矩。
        $\E X=\frac1\lambda$（[查表](#/probability/random-var/distributions?at=table)），
        令 $\frac1\lambda=\bar X$ 反解即可，==一行的事==。

        **最大似然**：$\lambda$ ==只出现在表达式里，取值范围 $x>0$ 与 $\lambda$ 无关==，
        所以走标准的求导路线，不是边界型。

        写 $L$ 时注意 $\prod e^{-\lambda x_i}=e^{-\lambda\sum x_i}$——
        ==指数相加，这是连乘变求和最舒服的一种情形==。

        **预判**：两种方法都会得到 $\frac{1}{\bar X}$。
        指数分布是少数几个==两种估计一致==的例子，
        这是因为它的一阶矩恰好把参数完全决定了。
      `,
      solution: String.raw`
        **矩估计**：$\E X=\dfrac1\lambda$，令 $\dfrac1\lambda=\bar X$，得
        $$\hat\lambda_{\text{矩}}=\frac{1}{\bar X}.$$

        **最大似然**：对 $x_i>0$，
        $$L(\lambda)=\prod_{i=1}^{n}\lambda e^{-\lambda x_i}
        =\lambda^{n}e^{-\lambda\sum_{i=1}^{n}x_i},$$
        $$\ln L(\lambda)=n\ln\lambda-\lambda\sum_{i=1}^{n}x_i.$$
        令
        $$\frac{\d\ln L}{\d\lambda}=\frac n\lambda-\sum_{i=1}^{n}x_i=0
        \ \Longrightarrow\ \lambda=\frac{n}{\sum x_i}=\frac{1}{\bar x}.$$

        **验证是最大值**：$\dfrac{\d^{2}\ln L}{\d\lambda^{2}}=-\dfrac{n}{\lambda^{2}}<0$，
        故 $\ln L$ 是凹函数，驻点即最大值点。

        故
        $$\hat\lambda_{\text{MLE}}=\frac{1}{\bar X}.$$
        ==两种估计相同。==
      `,
      comment: String.raw`
        **顺带用一次[不变性](#/probability/estimation/point?at=mle-invariance)**：
        若题目再问"求 $\E X=\frac1\lambda$ 的最大似然估计"，
        直接得 $\widehat{\frac1\lambda}=\frac{1}{\hat\lambda}=\bar X$，==不必重做==。
        再问"求 $P(X>1)=e^{-\lambda}$ 的最大似然估计"，答案是 $e^{-1/\bar X}$。

        **一个值得注意的细节**：$\hat\lambda=\frac{1}{\bar X}$ ==不是无偏估计==。
        因为 $\E\frac{1}{\bar X}\ne\frac{1}{\E\bar X}$——
        这正是[$\E g(X)\ne g(\E X)$](#/probability/moments/expectation?at=lotus) 的又一次现身。
        ==最大似然估计经常是有偏的，这不算缺陷==，
        它换来的是[大样本下的良好性质](#/probability/estimation/evaluation?at=consistency)。

        **写解答的两个踩分点**：

        1. ==必须写出 $L$ 的定义域==（"当 $x_i>0$ 时"）；
        2. ==必须验证是最大值==（二阶导为负，或说明 $\ln L$ 先增后减）。
           很多人解完似然方程就收笔，这一步是要扣分的。
      `,
    },

    { t: 'example',
      id: 'ex-moment-uniform',
      title: '★ 均匀分布：两种方法分道扬镳',
      source: '经典例题（必考题型）',
      level: 4,
      problem: String.raw`
        设总体 $X\sim U(0,\theta)$（$\theta>0$ 未知），$X_1,\dots,X_n$ 为简单随机样本。

        1. 求 $\theta$ 的矩估计量；
        2. 求 $\theta$ 的最大似然估计量；
        3. 判断两者是否无偏。
      `,
      idea: String.raw`
        **第 1 问照套三步**：$\E X=\frac\theta2$，令它等于 $\bar X$，得 $\hat\theta=2\bar X$。

        **第 2 问是本题的重点，也是[边界型](#/probability/estimation/point?at=mle-boundary)的样板**。
        关键在于看清：密度 $\frac1\theta$ ==只在 $0<x<\theta$ 上非零==，
        所以 ==$\theta$ 藏在取值范围里==。

        若不管这一点直接求导：
        $\ln L=-n\ln\theta$，$\frac{\d\ln L}{\d\theta}=-\frac n\theta$ ==恒小于零，无驻点==——
        求导法在这里直接失效，==这本身就是"该看边界"的信号==。

        正确的想法是把约束翻译出来：
        $L(\theta)=\frac{1}{\theta^{n}}$ ==仅当所有 $x_i<\theta$ 时才成立==，
        否则 $L=0$。于是 $\theta\ge\max x_i$，
        而 $\frac{1}{\theta^{n}}$ 递减，==$\theta$ 取到下界最好==。

        **第 3 问要分别算期望**。
        $2\bar X$ 好办；$\max$ 的期望要先求[最大值的分布](#/probability/multi-random-var/function-2d?at=max-min)，
        ==$F_{\max}(z)=[F(z)]^{n}$== 是关键一步。
      `,
      solution: String.raw`
        **(1) 矩估计**：$\E X=\dfrac{0+\theta}{2}=\dfrac\theta2$，令 $\dfrac\theta2=\bar X$，得
        $$\hat\theta_{\text{矩}}=2\bar X.$$

        **(2) 最大似然**：密度 $f(x;\theta)=\dfrac1\theta$（$0<x<\theta$），故
        $$L(\theta)=\begin{cases}\dfrac{1}{\theta^{n}},&\theta\ge\max_i x_i\\[4pt]
        0,&\theta<\max_i x_i\end{cases}$$
        （因为只要有一个 $x_i>\theta$，那个因子就是 $0$。）

        在 $\theta\ge\max x_i$ 上 $\dfrac{1}{\theta^{n}}$ 严格递减，
        故 $L$ 在 $\theta=\max x_i$ 处取最大值。因此
        $$\hat\theta_{\text{MLE}}=\max\set{X_1,\dots,X_n}.$$

        **(3) 无偏性**：

        矩估计：$\E(2\bar X)=2\E X=2\cdot\dfrac\theta2=\theta$，==无偏==。

        最大似然：记 $M=\max X_i$。由 $F(x)=\dfrac x\theta$（$0<x<\theta$），
        $$F_M(z)=\left(\frac z\theta\right)^{n},\qquad
        f_M(z)=\frac{n z^{n-1}}{\theta^{n}}\quad(0<z<\theta),$$
        $$\E M=\int_0^{\theta}z\cdot\frac{nz^{n-1}}{\theta^{n}}\dz
        =\frac{n}{\theta^{n}}\cdot\frac{\theta^{n+1}}{n+1}=\frac{n}{n+1}\theta\ <\ \theta,$$
        ==有偏，且系统性地偏小==。

        修正后 $\dfrac{n+1}{n}M$ 是无偏的。
      `,
      comment: String.raw`
        **为什么 $\max$ 一定偏小**：样本最大值==永远小于 $\theta$==（概率为 $1$），
        所以它的期望必然小于 $\theta$。
        ==这个"结构性偏差"从直觉上就能看出来，不必等算完==。

        **但偏小不等于差**。比较两者的方差（可以算出）：
        $$\Var(2\bar X)=\frac{\theta^{2}}{3n},\qquad
        \Var\!\left(\frac{n+1}{n}M\right)=\frac{\theta^{2}}{n(n+2)}.$$
        ==后者是 $O(n^{-2})$，前者只是 $O(n^{-1})$==，
        修正后的最大似然估计==精度高一个数量级==。

        **原因说得清**：矩估计只用了[样本的一阶矩](#/probability/estimation/point?at=moment-why)，
        而 $\theta$ 的信息几乎全集中在==最大的那几个观测值==上，
        平均值把这个信息稀释掉了。
        ==最大似然直接盯住了 $\max$，用对了地方。==

        **两种估计还有一个尴尬的对比**：
        $2\bar X$ 虽然无偏，却==可能小于某个观测值==
        （比如样本是 $0.1,0.2,0.9$ 时 $2\bar X=0.8<0.9$），
        而 $\theta$ 显然不可能小于任何观测值。
        ==一个"不可能正确"的无偏估计==——
        这是[无偏性不是万能标准](#/probability/estimation/evaluation?at=unbiased-not-unique)最好的注脚。

        **考试提醒**：这道题的四个结论
        （矩估计 $2\bar X$、MLE $\max$、MLE 有偏、修正系数 $\frac{n+1}{n}$）
        ==年年出现，建议直接背下来==。
      `,
    },

    { t: 'example',
      id: 'ex-mle-normal',
      title: '两个参数：正态总体的最大似然',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $X_1,\dots,X_n$ 是来自 $N(\mu,\sigma^{2})$ 的简单随机样本，
        $\mu$ 与 $\sigma^{2}$ 均未知。求它们的最大似然估计量。
      `,
      idea: String.raw`
        **两个参数，就求两个偏导**，其余流程不变。

        **技巧一**：把 $\sigma^{2}$ ==当作一个整体变量==（记作 $\sigma^{2}$ 而不是 $\sigma$）去求导，
        这样 $\ln L$ 里的 $-\frac n2\ln\sigma^{2}$ 求导得 $-\frac{n}{2\sigma^{2}}$，
        ==比对 $\sigma$ 求导干净得多==。

        **技巧二**：先对 $\mu$ 求导。
        $\mu$ 只出现在 $\sum(x_i-\mu)^{2}$ 里，
        ==而这个和恰好在 $\mu=\bar x$ 处取最小==（[上一章的老结论](#/probability/statistics/sampling?at=why-n-1)），
        所以 $\hat\mu=\bar x$ 几乎不用算。
        求出 $\hat\mu$ 后==代回去==再对 $\sigma^{2}$ 求导。

        **预判结果**：$\hat{\sigma^{2}}$ 的分母会是 $n$ 而不是 $n-1$——
        ==最大似然估计给出的是有偏的那一个==。
        这是本题最重要的结论，也是选择题常考点。
      `,
      solution: String.raw`
        似然函数
        $$L(\mu,\sigma^{2})=\prod_{i=1}^{n}\frac{1}{\sqrt{2\pi}\,\sigma}
        e^{-\frac{(x_i-\mu)^{2}}{2\sigma^{2}}}
        =(2\pi\sigma^{2})^{-n/2}\exp\left\{-\frac{1}{2\sigma^{2}}\sum_{i=1}^{n}(x_i-\mu)^{2}\right\},$$
        $$\ln L=-\frac n2\ln(2\pi)-\frac n2\ln\sigma^{2}-\frac{1}{2\sigma^{2}}\sum_{i=1}^{n}(x_i-\mu)^{2}.$$

        **对 $\mu$ 求偏导**：
        $$\frac{\partial\ln L}{\partial\mu}=\frac{1}{\sigma^{2}}\sum_{i=1}^{n}(x_i-\mu)=0
        \ \Longrightarrow\ \sum x_i=n\mu\ \Longrightarrow\ \hat\mu=\bar x.$$

        **对 $\sigma^{2}$ 求偏导**：
        $$\frac{\partial\ln L}{\partial\sigma^{2}}
        =-\frac{n}{2\sigma^{2}}+\frac{1}{2\sigma^{4}}\sum_{i=1}^{n}(x_i-\mu)^{2}=0
        \ \Longrightarrow\ \sigma^{2}=\frac1n\sum_{i=1}^{n}(x_i-\mu)^{2}.$$

        代入 $\hat\mu=\bar x$：
        $$\boxed{\ \hat\mu=\bar X,\qquad
        \hat{\sigma^{2}}=\frac1n\sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)^{2}\ }$$
      `,
      comment: String.raw`
        **必须记住的一条**：
        $$\hat{\sigma^{2}}_{\text{MLE}}=\frac1n\sum(X_i-\bar X)^{2}
        \ \ne\ S^{2}=\frac{1}{n-1}\sum(X_i-\bar X)^{2}$$
        ==最大似然给出的是除以 $n$ 的版本，它是有偏的==：
        $$\E\hat{\sigma^{2}}=\frac{n-1}{n}\sigma^{2}<\sigma^{2}.$$
        （由[上一章的推导](#/probability/statistics/sampling?at=ex-es2)立得。）

        ==这正好和"样本方差为什么除以 $n-1$"配成一对==：
        最大似然不管无偏不无偏，它只管"让观测最可能出现"；
        而 $S^{2}$ 是==人为把系数改成 $\frac{1}{n-1}$ 换来无偏性==的结果。
        ==两种标准，两个答案。==

        **顺带一提**：正态总体的矩估计与最大似然==结果完全相同==
        （$\E X=\mu$、$\Var X=\sigma^{2}$，矩方程直接给出同样的两式）。
        所以这道题两问合一，==是考察"两种方法何时一致"的好素材==。

        **常见追问**：求 $\sigma$ 的最大似然估计。
        由[不变性](#/probability/estimation/point?at=mle-invariance)，
        $$\hat\sigma=\sqrt{\frac1n\sum(X_i-\bar X)^{2}},$$
        ==直接开根号，不要重新做一遍==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **边界型硬求导**：$\theta$ 出现在取值范围里时求导必然失效，
         ==要看单调性和端点==，见[$U(0,\theta)$](#/probability/estimation/point?at=ex-moment-uniform)。
      2. **不写似然函数的定义域**：$L(\theta)$ 只在某个范围上等于那个乘积，
         ==写不清楚就丢了边界型的全部得分==。
      3. **解完似然方程就收笔**：==要验证是最大值==（二阶导为负或单调性说明）。
      4. **$\hat{\sigma^{2}}$ 的分母写成 $n-1$**：
         ==最大似然给的是除以 $n$==，$S^{2}$ 才是 $n-1$。
      5. **矩估计列了多余的方程**：==一个参数只用一阶矩==。
      6. **把估计量和估计值搞混**：问"估计量"用大写 $X_i$，问"估计值"代入数据。
      7. **以为最大似然一定无偏**：==经常是有偏的==，
         $\max$ 和 $\hat{\sigma^{2}}$ 都是例子。
      8. **对矩估计用不变性**：==不变性是最大似然独有的==。
      9. **由 $\E\hat{\sigma^{2}}=\sigma^{2}$ 推 $\E\hat\sigma=\sigma$**：
         ==无偏性不具有不变性==。
    ` },

  ],
});
