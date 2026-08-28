/* ==========================================================================
   概率论 / 6 数理统计的基本概念 / 三大抽样分布与正态总体
   —— 本章的核心。四条正态总体定理决定了第 7 章所有的区间与检验。
      样本与统计量的定义见 statistics/sampling。
   ========================================================================== */

KM.page({
  path: 'probability/statistics/distributions',
  title: '三大抽样分布与正态总体',
  subtitle: '$\\chi^{2}$、$t$、$F$ 都由正态拼出来。真正要背的是**四条正态总体定理**——第 7 章的每一条公式都从它们来',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      这一页要解决的问题只有一个：
      ==$\bar X$ 和 $S^{2}$ 究竟服从什么分布？==

      [上一页](#/probability/statistics/sampling?at=xbar-props)只给了它们的期望和方差，
      那对算概率是不够的。
      要做[区间估计](#/probability/estimation/interval?at=pivot)和[假设检验](#/probability/estimation/hypothesis?at=steps)，
      必须知道==完整的分布==。

      而只要总体是正态的，答案就异常干净——
      **三个新分布 $\chi^{2},t,F$ 恰好把这些统计量全部装了进去。**

      **这三个分布是从哪冒出来的、为什么偏偏是这三个**，见分布图鉴那一章：
      [卡方](#/probability/models/chi2?at=picture)、
      [$t$](#/probability/models/t?at=story)、
      [$F$](#/probability/models/f?at=story) 各有一篇。
      把 $n$ 个样本看成 $n$ 维空间里的一个点，==四条定理是[同一次旋转](#/probability/models/chi2?at=helmert)的四个侧面==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'three', c: '一、三大抽样分布' },

    { t: 'key', id: 'chi2', title: '$\\chi^{2}$ 分布：正态的平方和', c: String.raw`
      设 $X_1,\dots,X_n$ ==独立==且都服从 $N(0,1)$，则
      $$\chi^{2}=\sum_{i=1}^{n}X_i^{2}\ \sim\ \chi^{2}(n),$$
      $n$ 称为**自由度**。

      $$\E\chi^{2}=n,\qquad \Var\chi^{2}=2n$$

      **期望为什么是 $n$**：$\E X_i^{2}=\Var X_i+(\E X_i)^{2}=1$，$n$ 项相加即得。
      方差用 $\Var X_i^{2}=\E X_i^{4}-1=3-1=2$（标准正态四阶矩为 $3$），
      ==独立可加==，故 $\Var\chi^{2}=2n$。
      $n=1$ 的情形就是[标准正态的平方](#/probability/random-var/function-of-rv?at=ex-normal-square)。

      **可加性**（==常考==）：$\chi^{2}(m)$ 与 $\chi^{2}(n)$ ==独立==时，
      $$\chi^{2}(m)+\chi^{2}(n)\sim\chi^{2}(m+n),$$
      ==自由度直接相加==，理由就是"平方项的个数加起来"，
      属于[可加分布族](#/probability/multi-random-var/function-2d?at=stable-families)之一。

      **三个前提缺一不可**：==标准==正态、==独立==、==平方求和==。
      若 $X_i\sim N(\mu,\sigma^{2})$，必须先标准化成 $\frac{X_i-\mu}{\sigma}$ 再平方。
      =="忘了标准化"是本页最常见的错误。==
    ` },

    { t: 'key', id: 't-dist', title: '$t$ 分布：正态除以「根号卡方比自由度」', c: String.raw`
      设 $X\sim N(0,1)$，$Y\sim\chi^{2}(n)$，且 ==$X$ 与 $Y$ 相互独立==，则
      $$\boxed{\ t=\frac{X}{\sqrt{Y/n}}\ \sim\ t(n)\ }$$

      **记忆结构**：==分子一个标准正态，分母是卡方除以自己的自由度再开根==。
      分母那一堆的作用是"用样本自己估出来的标准差"去替换未知的 $\sigma$——
      ==这正是 $t$ 分布存在的全部理由==，见[$\sigma$ 已知与未知](#/probability/statistics/distributions?at=sigma-known-or-not)。

      **图形性质**：

      - 密度==关于 $y$ 轴对称==，形状像正态但==更矮更胖==（尾部更厚）；
      - $n\to\infty$ 时 $t(n)\to N(0,1)$。
        ==$n>45$ 左右就可以用正态代替==（这也是 $t$ 分布表通常只列到 $45$ 的原因）；
      - $n>1$ 时 $\E t=0$；$n>2$ 时 $\Var t=\frac{n}{n-2}>1$，==比标准正态更分散==。

      **"更胖"的直观解释**：分母不再是常数 $\sigma$，而是一个==会波动的估计值 $S$==。
      分母偶尔取到偏小的值，整个比值就被放大，==于是极端值出现得更频繁==。
      样本量越大，$S$ 越稳，$t$ 就越接近正态。

      **对称性推论**（查表必用）：
      $$t_{1-\alpha}(n)=-t_{\alpha}(n)$$
    ` },

    { t: 'key', id: 'f-dist', title: '$F$ 分布：两个卡方各除自由度之比', c: String.raw`
      设 $U\sim\chi^{2}(m)$，$V\sim\chi^{2}(n)$，且 ==$U,V$ 独立==，则
      $$F=\frac{U/m}{V/n}\ \sim\ F(m,n),$$
      $m$ 为==第一自由度==，$n$ 为==第二自由度==，==顺序不能颠倒==。

      **两条必用性质**：
      $$F\sim F(m,n)\ \Longrightarrow\ \frac1F\sim F(n,m)$$
      $$\boxed{\ F_{1-\alpha}(m,n)=\frac{1}{F_{\alpha}(n,m)}\ }$$

      ==第二条是查表的救命公式==：$F$ 分布表通常只印 $\alpha=0.05,0.025,0.01$ 这几列，
      要用 $F_{0.95}$ 时表里查不到，==必须靠这条翻过去，而且两个自由度要交换==。

      **与 $t$ 的关系**：$t\sim t(n)\Rightarrow t^{2}\sim F(1,n)$。
      （因为 $t^{2}=\frac{X^{2}/1}{Y/n}$，而 $X^{2}\sim\chi^{2}(1)$。）
      ==这条能解释为什么双侧 $t$ 检验和 $F$ 检验在某些场合等价。==

      **主要用途**：比较两个正态总体的方差，见[双正态总体](#/probability/statistics/distributions?at=two-normal)。
    ` },

    { t: 'key', id: 'quantile', title: '上侧分位点：三个分布的对称性各不相同', c: String.raw`
      **定义**：$P\bigl(X>x_{\alpha}\bigr)=\alpha$，
      即 $x_\alpha$ 右边的面积恰好是 $\alpha$。==记住"上侧"指的是右尾。==

      | 分布 | 对称吗 | 分位点关系 |
      |---|---|---|
      | $N(0,1)$ | ==是== | $u_{1-\alpha}=-u_{\alpha}$ |
      | $t(n)$ | ==是== | $t_{1-\alpha}(n)=-t_{\alpha}(n)$ |
      | $\chi^{2}(n)$ | ==否==（只取正值） | ==没有简单关系，两端都要查表== |
      | $F(m,n)$ | ==否== | $F_{1-\alpha}(m,n)=\dfrac{1}{F_{\alpha}(n,m)}$ |

      ==前两行能取负号，后两行不能==——这是查表时最容易出错的地方。
      $\chi^{2}$ 和 $F$ 都只取正值，==写出负的分位点一定错了==。

      **几个必须记住的数**：
      $$u_{0.05}=1.645,\qquad u_{0.025}=1.96,\qquad u_{0.01}=2.326,\qquad u_{0.005}=2.576$$
      ==$1.645$ 用于单侧、$1.96$ 用于双侧==，这两个数考研出现频率最高。

      **和 $\Phi$ 的换算**：$u_\alpha$ 满足 $\Phi(u_\alpha)=1-\alpha$。
      ==别把 $\alpha$ 和 $1-\alpha$ 弄反==：$u_{0.025}=1.96$ 对应 $\Phi(1.96)=0.975$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'normal-sec', c: '二、正态总体的四条定理（本章核心）' },

    { t: 'key', id: 'normal-four', title: '★ 单正态总体：四条定理', c: String.raw`
      设 $X_1,\dots,X_n$ 是来自 $N(\mu,\sigma^{2})$ 的简单随机样本，则

      $$\textbf{①}\qquad \bar X\sim N\!\left(\mu,\frac{\sigma^{2}}{n}\right),
      \qquad\text{即}\qquad \frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1)$$

      $$\textbf{②}\qquad \frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}(n-1)$$

      $$\textbf{③}\qquad \bar X\ \text{与}\ S^{2}\ \textbf{相互独立}$$

      $$\textbf{④}\qquad \frac{\bar X-\mu}{S/\sqrt n}\sim t(n-1)$$

      **四条之间的关系**（==理清了就不用死背==）：

      - ① 来自[正态的线性组合仍是正态](#/probability/multi-random-var/normal-2d?at=linear-combination)，
        参数就是[上一页算过的](#/probability/statistics/sampling?at=xbar-props) $\mu$ 与 $\frac{\sigma^{2}}{n}$；
      - ② 的自由度是 ==$n-1$ 而不是 $n$==，
        因为 $\sum(X_i-\bar X)=0$ 吃掉了一个自由度，
        与[样本方差除以 $n-1$](#/probability/statistics/sampling?at=why-n-1) 是同一个原因；
      - ④ ==就是把 ① 和 ② 按 $t$ 的定义拼起来==：
        $$\frac{\bar X-\mu}{S/\sqrt n}
        =\underbrace{\frac{\bar X-\mu}{\sigma/\sqrt n}}_{N(0,1)}
        \Bigg/\sqrt{\underbrace{\frac{(n-1)S^{2}}{\sigma^{2}}}_{\chi^{2}(n-1)}\Big/(n-1)}$$
        ==注意 $\sigma$ 在分子分母上下相消==，这正是 ④ 里不再出现 $\sigma$ 的原因；
      - ③ 是 ④ 能成立的==前提==（$t$ 的定义要求分子分母独立），
        ==而且它是正态总体独有的性质==——非正态总体下 $\bar X$ 与 $S^{2}$ 一般不独立。

      ==把 ④ 的推导过程看懂，四条就串成了一条线。==
    ` },

    { t: 'key', id: 'sigma-known-or-not', title: '★ 一句话决定第 7 章用哪个公式', c: String.raw`
      $$\boxed{\ \sigma\ \text{已知}\ \Rightarrow\ \text{用}\ u\ \text{（正态）};
      \qquad \sigma\ \text{未知}\ \Rightarrow\ \text{用}\ t\ \text{（自由度}\ n-1\text{）}\ }$$

      | | 枢轴量 | 分布 |
      |---|---|---|
      | $\sigma$ 已知 | $\dfrac{\bar X-\mu}{\sigma/\sqrt n}$ | $N(0,1)$ |
      | $\sigma$ 未知 | $\dfrac{\bar X-\mu}{S/\sqrt n}$ | ==$t(n-1)$== |

      ==两个式子只差一个字母：分母是 $\sigma$ 还是 $S$。==
      但换成 $S$ 之后分布就从正态变成了 $t$，
      因为分母本身成了随机变量。

      **这条判断贯穿整个第 7 章**：
      [区间估计](#/probability/estimation/interval?at=formulas)选哪条公式、
      [假设检验](#/probability/estimation/hypothesis?at=table)用 $u$ 检验还是 $t$ 检验，
      ==全看题目有没有告诉你 $\sigma$==。

      **读题时的关键词**：
      "已知总体标准差为 $2$" $\Rightarrow$ 用 $u$；
      "由样本算得 $s=2$"或"$\sigma$ 未知" $\Rightarrow$ 用 $t$。
      ==看到题目给了样本标准差，基本就是在提示你用 $t$。==
    ` },

    { t: 'key', id: 'two-normal', title: '双正态总体（数一要求）', c: String.raw`
      设 $X_1,\dots,X_{n_1}$ 来自 $N(\mu_1,\sigma_1^{2})$，
      $Y_1,\dots,Y_{n_2}$ 来自 $N(\mu_2,\sigma_2^{2})$，两组样本相互独立。

      **① 均值之差（$\sigma_1^{2},\sigma_2^{2}$ 已知）**：
      $$\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}
      {\sqrt{\dfrac{\sigma_1^{2}}{n_1}+\dfrac{\sigma_2^{2}}{n_2}}}\sim N(0,1)$$
      ==两个方差是相加的==（独立时方差可加），不是相减。

      **② 均值之差（$\sigma_1^{2}=\sigma_2^{2}=\sigma^{2}$ 未知）**：
      $$\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{S_w\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t(n_1+n_2-2),$$
      其中**合并样本方差**
      $$S_w^{2}=\frac{(n_1-1)S_1^{2}+(n_2-1)S_2^{2}}{n_1+n_2-2}.$$
      ==$S_w^{2}$ 是两个样本方差按自由度加权的平均==，
      自由度 $n_1+n_2-2$ 就是两个 $n_i-1$ 相加（[卡方可加](#/probability/statistics/distributions?at=chi2)）。

      **③ 方差之比**：
      $$\frac{S_1^{2}/\sigma_1^{2}}{S_2^{2}/\sigma_2^{2}}\sim F(n_1-1,\ n_2-1)$$
      特别地 $\sigma_1^{2}=\sigma_2^{2}$ 时 $\dfrac{S_1^{2}}{S_2^{2}}\sim F(n_1-1,n_2-1)$。
      ==这是检验"两个总体方差是否相等"的依据==，
      也是使用 ② 之前本该先做的一步。
    ` },

    { t: 'compare',
      id: 'table',
      title: '统计量速查（考前扫一眼）',
      cols: ['统计量', '服从', '条件'],
      rows: [
        ['$\\dfrac{\\bar X-\\mu}{\\sigma/\\sqrt n}$', '$N(0,1)$', '$\\sigma$ 已知'],
        ['$\\dfrac{\\bar X-\\mu}{S/\\sqrt n}$', '==$t(n-1)$==', '$\\sigma$ 未知'],
        ['$\\dfrac{(n-1)S^{2}}{\\sigma^{2}}$', '$\\chi^{2}(n-1)$', '$\\mu$ 未知'],
        ['$\\dfrac{1}{\\sigma^{2}}\\sum(X_i-\\mu)^{2}$', '==$\\chi^{2}(n)$==', '$\\mu$ **已知**（自由度不减）'],
        ['$\\dfrac{S_1^{2}/\\sigma_1^{2}}{S_2^{2}/\\sigma_2^{2}}$', '$F(n_1-1,n_2-1)$', '两样本独立'],
        ['$\\bar X$ 与 $S^{2}$', '==相互独立==', '仅正态总体'],
      ] },

    { t: 'warn', id: 'df-trap', title: '自由度是 $n$ 还是 $n-1$：只看减的是 $\\mu$ 还是 $\\bar X$', c: String.raw`
      对照速查表的第三、四行：

      $$\frac{1}{\sigma^{2}}\sum_{i=1}^{n}(X_i-\mu)^{2}\sim\chi^{2}(n)
      \qquad\text{vs}\qquad
      \frac{1}{\sigma^{2}}\sum_{i=1}^{n}(X_i-\bar X)^{2}\sim\chi^{2}(n-1)$$

      ==减真值 $\mu$，自由度是 $n$；减样本均值 $\bar X$，自由度是 $n-1$。==

      **道理**：左边是 $n$ 个独立的标准正态平方和，货真价实的 $n$ 项；
      右边的 $n$ 个离差受 $\sum(X_i-\bar X)=0$ 束缚，==只有 $n-1$ 个是自由的==。

      **一句口诀**：==每用样本估计掉一个参数，自由度就减一。==
      这条规律在双正态总体里同样成立：
      估计了 $\mu_1,\mu_2$ 两个参数，自由度就是 $n_1+n_2-2$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-construct',
      title: '构造服从指定分布的统计量',
      source: '标准例题（高频题型）',
      level: 3,
      problem: String.raw`
        设 $X_1,\dots,X_6$ 是来自总体 $N(0,4)$ 的简单随机样本。

        1. 求常数 $c$，使 $c\sum_{i=1}^{6}X_i^{2}$ 服从 $\chi^{2}$ 分布，并指出自由度；
        2. 求常数 $k$，使 $\dfrac{k(X_1+X_2)}{\sqrt{X_3^{2}+X_4^{2}+X_5^{2}+X_6^{2}}}$ 服从 $t$ 分布，并指出自由度。
      `,
      idea: String.raw`
        **这类题只有一个动作：把式子凑成定义的样子。**

        **第 1 问**：$\chi^{2}$ 要求==标准正态==的平方和。
        这里 $X_i\sim N(0,4)$，标准差是 $2$，
        所以 $\frac{X_i}{2}\sim N(0,1)$，
        $$\sum\left(\frac{X_i}{2}\right)^{2}=\frac14\sum X_i^{2}\sim\chi^{2}(6).$$
        ==$c=\frac14$，自由度是 $6$（减的是真值 $0$，不是 $\bar X$，所以不减一）。==

        **第 2 问**：$t$ 的定义是 $\dfrac{N(0,1)}{\sqrt{\chi^{2}(n)/n}}$，
        所以要==分子分母各自凑==：

        - 分子：$X_1+X_2\sim N(0,8)$，除以 $\sqrt8$ 才是标准正态；
        - 分母：$X_3^{2}+\cdots+X_6^{2}$ 除以 $4$ 是 $\chi^{2}(4)$，
          按定义还要==再除以自由度 $4$ 再开根==。

        ==把两边各自凑好，$k$ 就是那些常数合并的结果==。
        独立性由"不同的 $X_i$ 相互独立"自动保证——==这一句在解答里要写出来==。
      `,
      solution: String.raw`
        $X_i\sim N(0,4)$，故 $\dfrac{X_i}{2}\sim N(0,1)$，且相互独立。

        **(1)**
        $$\sum_{i=1}^{6}\left(\frac{X_i}{2}\right)^{2}=\frac14\sum_{i=1}^{6}X_i^{2}\sim\chi^{2}(6),$$
        故 $\boxed{c=\dfrac14}$，自由度为 $\boxed{6}$。

        **(2)** **分子**：$X_1+X_2\sim N(0,4+4)=N(0,8)$，故
        $$\frac{X_1+X_2}{2\sqrt2}\sim N(0,1).$$

        **分母**：由 (1) 的做法，
        $$Y=\frac14\left(X_3^{2}+X_4^{2}+X_5^{2}+X_6^{2}\right)\sim\chi^{2}(4).$$

        由于 $X_1,X_2$ 与 $X_3,\dots,X_6$ 相互独立，分子与 $Y$ 独立。按 $t$ 的定义
        $$T=\frac{(X_1+X_2)/(2\sqrt2)}{\sqrt{Y/4}}
        =\frac{(X_1+X_2)/(2\sqrt2)}{\sqrt{\dfrac{X_3^{2}+\cdots+X_6^{2}}{16}}}
        =\frac{(X_1+X_2)/(2\sqrt2)\cdot4}{\sqrt{X_3^{2}+\cdots+X_6^{2}}}$$
        $$=\frac{\sqrt2\,(X_1+X_2)}{\sqrt{X_3^{2}+\cdots+X_6^{2}}}\ \sim\ t(4).$$

        故 $\boxed{k=\sqrt2}$，自由度为 $\boxed{4}$。
      `,
      comment: String.raw`
        **这类题的固定流程**（照做不会错）：

        1. ==先把每个 $X_i$ 标准化==，把 $\sigma$ 提干净；
        2. 对照定义，看要凑的是 $\chi^{2}$（平方和）、$t$（正态比根号卡方比自由度）
           还是 $F$（两卡方各除自由度之比）；
        3. ==分子分母分别凑成标准形==，剩下的常数就是待求系数；
        4. ==写一句独立性的理由==（$t$ 和 $F$ 的定义都要求独立，不写扣分）。

        **第 2 问最容易漏的一步**：分母不只是"除以 $\sigma^{2}$"，
        ==按 $t$ 的定义还要再除以自由度 $4$==。
        漏掉这一步会把 $k$ 算成 $\frac12$，==自由度写对了系数却错==。

        **同型变体**：把分母改成 $\sqrt{X_3^{2}+X_4^{2}}$，
        则自由度变成 $2$，$k$ 也随之改变；
        或者问"$\dfrac{X_1^{2}+X_2^{2}}{X_3^{2}+X_4^{2}}$ 服从什么分布"——
        两个 $\chi^{2}(2)$ 各除以 $2$ 之比，==直接就是 $F(2,2)$==，
        而且这里的系数 $\frac{1}{4}$ 上下相消，==连标准化都不必做==。
      `,
    },

    { t: 'example',
      id: 'ex-normal-four',
      title: '四条定理的直接应用',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $X_1,\dots,X_{16}$ 是来自 $N(\mu,\sigma^{2})$ 的简单随机样本，
        $\bar X$ 与 $S^{2}$ 分别为样本均值与样本方差。

        1. 写出 $\dfrac{\bar X-\mu}{S/4}$ 服从的分布；
        2. 已知 $\sigma=2$，求 $P\bigl(\abs{\bar X-\mu}<1\bigr)$（$\Phi(2)=0.9772$）；
        3. 写出 $\dfrac{15S^{2}}{\sigma^{2}}$ 服从的分布，并求 $\E S^{2}$ 与 $\Var S^{2}$。
      `,
      idea: String.raw`
        **第 1 问**：$n=16$，$\sqrt n=4$，
        所以 $\frac{S}{4}$ 就是 $\frac{S}{\sqrt n}$，
        整个式子正是[定理 ④](#/probability/statistics/distributions?at=normal-four)的左端。
        ==自由度是 $n-1=15$，不是 $16$。==

        **第 2 问**：$\sigma$ 已知，用[定理 ①](#/probability/statistics/distributions?at=normal-four)，
        $\bar X\sim N(\mu,\frac{4}{16})=N(\mu,0.25)$，标准差 $0.5$。
        ==注意这里该用 $u$ 而不是 $t$==，见[那条判断](#/probability/statistics/distributions?at=sigma-known-or-not)。

        **第 3 问**：$(n-1)=15$，所以 $\frac{15S^{2}}{\sigma^{2}}\sim\chi^{2}(15)$。
        求 $\E S^{2},\Var S^{2}$ 时==不要去积密度==，
        直接用 $\chi^{2}(15)$ 的期望 $15$、方差 $30$ 反解——
        ==$S^{2}$ 只是这个卡方变量乘了个常数 $\frac{\sigma^{2}}{15}$==，
        再用 $\Var(aY)=a^{2}\Var Y$ 即可。
      `,
      solution: String.raw`
        $n=16$，$\sqrt n=4$。

        **(1)** 由定理 ④，
        $$\frac{\bar X-\mu}{S/\sqrt{16}}=\frac{\bar X-\mu}{S/4}\ \sim\ \boxed{t(15)}.$$

        **(2)** 由定理 ①，$\bar X\sim N\!\left(\mu,\dfrac{2^{2}}{16}\right)=N(\mu,0.5^{2})$，故
        $$P\bigl(\abs{\bar X-\mu}<1\bigr)
        =P\!\left(\abs{Z}<\frac{1}{0.5}\right)=2\Phi(2)-1
        =2\times0.9772-1=\boxed{0.9544}.$$

        **(3)** 由定理 ②，
        $$\frac{(16-1)S^{2}}{\sigma^{2}}=\frac{15S^{2}}{\sigma^{2}}\ \sim\ \boxed{\chi^{2}(15)}.$$

        记 $Y=\dfrac{15S^{2}}{\sigma^{2}}$，则 $\E Y=15$，$\Var Y=30$，而 $S^{2}=\dfrac{\sigma^{2}}{15}Y$，故
        $$\E S^{2}=\frac{\sigma^{2}}{15}\times15=\boxed{\sigma^{2}},$$
        $$\Var S^{2}=\left(\frac{\sigma^{2}}{15}\right)^{2}\times30=\boxed{\frac{2\sigma^{4}}{15}}.$$
      `,
      comment: String.raw`
        **第 3 问给出的通式值得记住**：
        $$\E S^{2}=\sigma^{2},\qquad \Var S^{2}=\frac{2\sigma^{4}}{n-1}\quad(\text{正态总体})$$
        ==$\E S^{2}=\sigma^{2}$ 对任何总体都成立==
        （[上一页证过](#/probability/statistics/sampling?at=ex-es2)），
        但 $\Var S^{2}=\frac{2\sigma^{4}}{n-1}$ ==只对正态总体成立==，
        因为它用到了定理 ②。这个区别是概念题的好素材。

        **"由卡方反解"这个动作很通用**：
        凡是题目问某个统计量的期望方差，
        ==先把它写成"常数 × 某个标准分布"，再查那个分布的数字特征==，
        比直接积分快得多。同型的还有：

        | 统计量 | 写成 | 期望 / 方差 |
        |---|---|---|
        | $S^{2}$ | $\frac{\sigma^{2}}{n-1}\chi^{2}(n-1)$ | $\sigma^{2}$ / $\frac{2\sigma^{4}}{n-1}$ |
        | $\sum(X_i-\mu)^{2}$ | $\sigma^{2}\chi^{2}(n)$ | $n\sigma^{2}$ / $2n\sigma^{4}$ |

        **第 2 问的一个变体**：若把 $\sigma$ 改成未知、并告知 $s=2$，
        则要用 $t(15)$ 而不是正态，==答案会略小于 $0.9544$==
        （$t$ 的尾部更厚）。==这就是那条"$\sigma$ 已知与否"的判断在起作用。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **凑 $\chi^{2}$ 时忘了标准化**：$X_i\sim N(0,4)$ 时要用 $\frac{X_i}{2}$，
         ==直接平方求和得到的不是 $\chi^{2}$==。
      2. **自由度写成 $n$**：$\frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}(n-1)$，
         判据是[减的是 $\mu$ 还是 $\bar X$](#/probability/statistics/distributions?at=df-trap)。
      3. **$t$ 的分母漏除自由度**：定义是 $\dfrac{X}{\sqrt{Y/n}}$，==那个 $/n$ 不能省==。
      4. **$F$ 的两个自由度写反**：$\frac{U/m}{V/n}\sim F(m,n)$，==分子的在前==。
      5. **$F_{1-\alpha}(m,n)$ 直接查表**：表里没有，
         要用 ==$\frac{1}{F_\alpha(n,m)}$，且自由度交换==。
      6. **给 $\chi^{2}$ 或 $F$ 的分位点写负号**：它们==只取正值==。
      7. **$\sigma$ 未知却用 $u$**：应当用 $t(n-1)$，
         见[那条判断](#/probability/statistics/distributions?at=sigma-known-or-not)。
      8. **忘了写独立性**：$t$ 与 $F$ 的定义都要求分子分母独立，
         解答题里这是踩分点。
      9. **以为 $\bar X$ 与 $S^{2}$ 总是独立**：==这是正态总体独有的性质==。
    ` },

  ],
});
