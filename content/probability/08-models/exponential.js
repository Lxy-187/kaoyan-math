/* ==========================================================================
   概率论 / 附 分布图鉴 / 指数分布
   —— 泊松流的另一种切法；无记忆性的连续原型；恒定失效率。
   ========================================================================== */

KM.page({
  path: 'probability/models/exponential',
  title: '指数分布：不会变老的等待',
  subtitle: '同一条泊松流，==把镜头从"数次数"转向"量间隔"==就得到它。而它又是唯一一个"不会老化"的连续分布',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      **场景**：电子元件的寿命、顾客到达的间隔时间、电话呼叫的等待时间、
      放射性原子的衰变时刻。

      $$f(x)=\begin{cases}\lambda e^{-\lambda x},&x>0\\0,&x\le0\end{cases}
      \qquad
      F(x)=\begin{cases}1-e^{-\lambda x},&x>0\\0,&x\le0\end{cases}$$

      ==最该记的是 $F$ 而不是 $f$==。理由在下面第一节：
      $e^{-\lambda x}$ 本来就是"什么都没发生"的概率，密度只是它的副产品。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'story', c: '一、两条来路' },

    { t: 'key', id: 'from-poisson', title: '来路一：泊松流的等待时间', c: String.raw`
      设事件按[泊松流](#/probability/models/poisson?at=axioms)发生，速率 $\lambda$。
      问"等到下一次要多久"，记这个时间为 $T$。

      $$T>t\iff [0,t]\ \text{内一次也没发生}$$
      $$\Longrightarrow\ P(T>t)=P_0(t)=e^{-\lambda t}\ \Longrightarrow\ F(t)=1-e^{-\lambda t}$$

      求导即得密度 $f(t)=\lambda e^{-\lambda t}$。==全程一次积分都没有==——
      泊松那条微分方程已经把活干完了。

      **参数的含义因此很清楚**：$\lambda$ 是"单位时间发生几次"，
      所以平均每 $\frac1\lambda$ 个单位时间发生一次：
      $$\boxed{\ \E T=\frac1\lambda\ }$$
      ==这个倒数不是巧合，是同一个"速率"的两种读法==。
      "平均寿命 $1000$ 小时"意味着 $\lambda=\frac{1}{1000}$，==不是 $1000$==。
    ` },

    { t: 'key', id: 'unique', title: '来路二：只要"不会变老"，形状就唯一确定', c: String.raw`
      反过来走也能到它，==而且只需要一个要求==。

      要求："已经等了 $s$ 还没等到"这个信息==对将来毫无价值==：
      $$P(T>s+t\mid T>s)=P(T>t).$$
      记 $G(t)=P(T>t)$，把条件概率展开，这一行化成一个==函数方程==：
      $$\boxed{\ G(s+t)=G(s)\,G(t),\qquad s,t>0\ }$$

      **它只有一族解**。$G$ 单调有界（分布函数的性质），
      在这个前提下解必是指数型 $G(t)=e^{-\lambda t}$。
      直观地看：$G(1)=G\!\left(\tfrac12\right)^{2}=G\!\left(\tfrac13\right)^{3}=\cdots$，
      ==所有有理点的值都被 $G(1)$ 一个数锁死==，再由单调性补齐无理点。

      **机制只有一条**：$e^{a}e^{b}=e^{a+b}$，
      即==自变量相加对应函数值相乘==，
      和[移位与调制](#/threads/patterns/shift?at=exp-law)那条主线里的是同一句话。
      常系数微分方程的 $e^{\lambda x}$、[几何分布](#/probability/models/geometric?at=memoryless)的 $q^{k}$、
      这里的 $e^{-\lambda t}$，==全是同一件事在不同场合的样子==。
    ` },

    { t: 'key', id: 'moments', title: '数字特征：分部积分或者直接用伽马函数', c: String.raw`
      $$\E T=\int_0^{+\infty}t\lambda e^{-\lambda t}\dt
      \xlongequal{\text{分部积分}}\left[-te^{-\lambda t}\right]_0^{+\infty}
      +\int_0^{+\infty}e^{-\lambda t}\dt=\frac1\lambda$$

      $$\E T^{2}=\int_0^{+\infty}t^{2}\lambda e^{-\lambda t}\dt=\frac{2}{\lambda^{2}}
      \ \Longrightarrow\ \Var T=\frac{2}{\lambda^{2}}-\frac{1}{\lambda^{2}}=\frac{1}{\lambda^{2}}$$

      **更快的算法**（记住这条能省很多时间）：换元 $u=\lambda t$ 后
      $$\int_0^{+\infty}t^{n}\lambda e^{-\lambda t}\dt=\frac{n!}{\lambda^{n}}
      \qquad\text{即}\qquad \E T^{n}=\frac{n!}{\lambda^{n}}$$
      用的是[伽马函数](#/probability/models/gamma?at=gamma-function) $\Gamma(n+1)=n!$。
      ==$n=1,2$ 就是上面两条==，而且高阶矩题目也一并解决了。

      $$\boxed{\ \E T=\frac1\lambda,\qquad \Var T=\frac{1}{\lambda^{2}},
      \qquad \sigma=\E T\ }$$
      ==标准差恰好等于期望==——这说明指数分布的波动非常大，
      "平均寿命 $1000$ 小时"绝不意味着元件都在 $1000$ 小时左右坏。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'props', c: '二、性质' },

    { t: 'key', id: 'memoryless', title: '★ 无记忆性：它的身份证', c: String.raw`
      $$\boxed{\ P(T>s+t\mid T>s)=P(T>t)\ }$$

      **一行证明**：
      $$\frac{P(T>s+t)}{P(T>s)}=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}=P(T>t).$$

      **现实含义**：一个已经用了 $1000$ 小时还没坏的元件，
      ==它再用 $t$ 小时不坏的概率，和一个全新元件完全一样==。
      指数分布描述的是"不会老化、只会突然失效"的对象。

      **唯一性（考点）**：连续型非负随机变量中==只有指数分布无记忆==，
      离散场合==只有[几何分布](#/probability/models/geometric?at=memoryless)==。
      看到"若 $X$ 非负连续且满足 $P(X>s+t\mid X>s)=P(X>t)$，则 $X$ 服从……"，直接答指数。

      ==注意方向别写反==："指数分布无记忆"是性质，
      "无记忆的必是指数"才是那条唯一性定理。
    ` },

    { t: 'key', id: 'hazard', title: '换个说法：失效率恒定', c: String.raw`
      定义**失效率**（危险率）：
      $$h(t)=\frac{f(t)}{1-F(t)}=\lim_{\Delta t\to0}\frac{P(t<T\le t+\Delta t\mid T>t)}{\Delta t}$$
      含义是=="活到 $t$ 的前提下，此刻坏掉的瞬时速率"==。

      对指数分布：
      $$h(t)=\frac{\lambda e^{-\lambda t}}{e^{-\lambda t}}=\lambda\quad(\text{常数}).$$

      $$\boxed{\ \text{无记忆性}\iff\text{失效率恒定}\ }$$
      两句话说的是同一件事，==只是一个从概率角度说，一个从工程角度说==。

      **这条对照解释了指数分布的适用边界**：

      | 对象 | 失效率 | 该用什么 |
      |---|---|---|
      | 电子元件（突然击穿） | ==恒定== | 指数分布 |
      | 轴承、齿轮（磨损） | ==递增== | [韦布尔分布](#/probability/models/weibull?at=story) |
      | 新生儿、新设备（早期缺陷） | 递减 | 韦布尔（形状参数 $<1$） |

      ==可靠性工程里那条著名的"浴盆曲线"，中间那段平底就是指数分布==。
    ` },

    { t: 'key', id: 'min', title: '取最小值仍是指数', c: String.raw`
      $X_i\sim E(\lambda_i)$ 相互独立，则
      $$P\bigl(\min_i X_i>t\bigr)=\prod_i P(X_i>t)=e^{-(\sum_i\lambda_i)t}
      \ \Longrightarrow\ \min_i X_i\sim E\!\left(\sum_i\lambda_i\right).$$

      ==速率直接相加==。现实含义："$n$ 个零件串联，任一个坏了系统就停"，
      则系统寿命仍是指数分布，==失效率是各零件之和==。
      特别地 $n$ 个同参数元件的最短寿命服从 $E(n\lambda)$。

      **注意 $\max$ 就不封闭了**：
      $P(\max\le t)=\left(1-e^{-\lambda t}\right)^{n}$ 展开后不是指数形式。
      ==$\min$ 用尾概率、$\max$ 用分布函数==，见[最大最小值分布](#/probability/multi-random-var/function-2d?at=max-min)。

      **和相加也不封闭**：$n$ 个独立同参数指数之和是
      [伽马分布](#/probability/models/gamma?at=story)（爱尔朗分布），不再是指数。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-exp',
      title: '三个问法，一条尾概率全包',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某电子元件寿命 $X$（小时）服从 $\lambda=\frac{1}{1000}$ 的指数分布。

        1. 求一个元件能用 $1000$ 小时以上的概率；
        2. 已知某元件已用了 $1000$ 小时，求它还能再用 $1000$ 小时以上的概率；
        3. 三个这样的元件独立工作，求恰有一个能用 $1000$ 小时以上的概率。
      `,
      idea: String.raw`
        **三问共用一个数**：$p=P(X>1000)=e^{-1}$。

        - 第 1 问：直接[尾概率](#/probability/models/exponential?at=from-poisson)，==不要去积密度==；
        - 第 2 问：形式上是条件概率，==但由[无记忆性](#/probability/models/exponential?at=memoryless)答案与第 1 问相同==。
          出题人放这一问就是在考这个；
        - 第 3 问：把"元件能否活过 $1000$ 小时"看成一次伯努利试验，
          三个独立元件就是 $B(3,p)$。
          ==连续型被一个阈值切开，立刻变回二项分布==，这个动作很常用。
      `,
      solution: String.raw`
        $p=P(X>1000)=e^{-\frac{1}{1000}\times1000}=e^{-1}\approx0.368$。

        **(1)** $\boxed{e^{-1}\approx0.368}$。

        **(2)** 由无记忆性，
        $$P(X>2000\mid X>1000)=\frac{e^{-2}}{e^{-1}}=e^{-1}\approx\boxed{0.368},$$
        ==与第 1 问完全相同==。

        **(3)** 设 $Y$ 为三个中寿命超过 $1000$ 小时的个数，$Y\sim B(3,e^{-1})$，
        $$P(Y=1)=\binom31 e^{-1}\left(1-e^{-1}\right)^{2}\approx3\times0.368\times0.632^{2}\approx\boxed{0.441}.$$
      `,
      comment: String.raw`
        **本题三个动作覆盖了指数分布的全部考法**：
        背尾概率、看到"已经用了多久"就想无记忆性、
        多个独立元件加一个阈值就是二项分布。

        **一个漂亮的推广**：三个元件里==最短的那个==寿命服从 $E(3\lambda)$，
        平均只有 $\frac{1000}{3}\approx333$ 小时——
        ==串联系统比单个元件脆弱得多==，见[取最小值](#/probability/models/exponential?at=min)。
      `,
    },

    { t: 'warn', id: 'pitfalls', title: '易错清单', c: String.raw`
      1. **参数取倒数**：$\E X=\frac1\lambda$。
         =="平均寿命 $1000$"意味着 $\lambda=0.001$，把 $\lambda$ 写成 $1000$ 是本页第一高频错误==；
      2. **教材参数化不同**：有的书用 $\theta=\frac1\lambda$，写作 $f=\frac1\theta e^{-x/\theta}$，
         ==看到 $\theta$ 先确认它是速率还是均值==；
      3. **去积密度算尾概率**：直接写 $e^{-\lambda x}$；
      4. **忘了 $x\le0$ 那一段**：密度和分布函数都是分段的，
         ==写答案时那一半不能省==；
      5. **无记忆性用到别的分布上**：==只有指数（连续）和几何（离散）==；
      6. **以为指数之和还是指数**：==是[伽马](#/probability/models/gamma?at=story)==；
         只有 $\min$ 才封闭；
      7. **把 $\lambda$ 当成概率**：$\lambda$ 是速率，可以大于 $1$。
    ` },

  ],
});
