/* ==========================================================================
   概率论 / 2 一维随机变量及其分布 / 常见分布及其背景
   —— 八个分布，重点不在背公式，而在"什么场景生出什么分布"。
      分布函数与密度的一般理论见 random-var/cdf-pdf。
   ========================================================================== */

KM.page({
  path: 'probability/random-var/distributions',
  title: '常见分布及其背景',
  subtitle: '每个分布都是一个**故事**：认出故事就认出分布，比背分布律可靠得多',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'why-random-var', title: '为什么要有随机变量', c: String.raw`
      随机变量 $X$ 是从样本空间到实数的一个函数：$X:\Omega\to\R$。

      **它做的事只有一件：把"事件的语言"换成"数值的语言"。**

      | 第 1 章说 | 第 2 章说 |
      |---|---|
      | 事件 $A$ 发生 | $X\in$ 某个集合 |
      | $P(A)$ | $P(X\le x)$、$P(a<X\le b)$ |
      | 分类讨论各种事件 | ==一个函数 $F(x)$ 装下全部信息== |

      换语言的收益是巨大的：数值可以==加、乘、取极限、求期望==，
      而事件不行。第 3、4、5 章全部建立在这次翻译之上。

      **一句要点**：$\set{X\le x}$ 永远是一个==事件==，
      所以 $P(X\le x)$ 有意义；
      ==随机变量本身不是数，它是函数==，说"$X=2$"指的是一个事件而不是一个等式。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'discrete', c: '一、离散型：四个故事' },

    { t: 'key', id: 'binom', title: '二项分布 $B(n,p)$：数成功的次数', c: String.raw`
      **故事**：独立重复做 $n$ 次同一件事，每次成功概率 $p$，$X=$ 成功次数。
      $$P(X=k)=\binom nk p^{k}(1-p)^{n-k},\qquad k=0,1,\dots,n$$
      $$\E X=np,\qquad \Var X=np(1-p)$$

      **$n=1$ 时退化成两点分布（$0$-$1$ 分布）**：$P(X=1)=p$，$\E X=p$，$\Var X=p(1-p)$。
      ==两点分布是整门课最重要的"原子"==：
      任何二项分布都是 $n$ 个独立两点分布之和，
      这正是[分解成和](#/probability/moments/tricks?at=decompose)那一招的原型。

      **识别信号**：==有放回==、==次数固定为 $n$==、==每次概率相同==、==问"恰好 $k$ 次"==。
      背景就是[伯努利试验](#/probability/events/independence?at=bernoulli)。

      **常用变形**：
      $$P(X\ge1)=1-(1-p)^{n},\qquad P(X=0)=(1-p)^{n}.$$
      ==$\Var X=np(1-p)$ 在 $p=\frac12$ 时最大==，即"最不确定"，
      这一点在做"哪个方差更大"的比较题时很好用。
    ` },

    { t: 'key', id: 'poisson', title: '泊松分布 $P(\\lambda)$：数单位时间内发生的次数', c: String.raw`
      **故事**：在一段固定的时间 / 空间里，某种事件"零星地、独立地"发生，
      $X=$ 发生的次数。典型如==一小时内到达的顾客数、一页书上的错字数、一段电缆的疵点数==。
      $$P(X=k)=\frac{\lambda^{k}}{k!}e^{-\lambda},\qquad k=0,1,2,\dots$$
      $$\E X=\Var X=\lambda$$

      ==期望和方差相等，这是泊松独有的指纹==。
      题目里出现"$\E X=\Var X$"或"$\E X=2,\ \E X^{2}=6$"，
      基本就是在暗示泊松。

      **归一性**：$\sum_{k\ge0}\frac{\lambda^{k}}{k!}e^{-\lambda}=e^{-\lambda}e^{\lambda}=1$，
      用的是 $e^{x}$ 的[幂级数展开](#/threads/lines/taylor?at=basic-eight)。
      ==凡是泊松的计算，最后都会碰到 $e^{x}$ 的级数==，
      所以"求 $\sum_{k}k\cdot\frac{\lambda^k}{k!}$"这类和式要会现场推。

      **参数的含义**：$\lambda$ 就是==平均发生次数==。
      题目说"平均每小时 $3$ 人"，则一小时内的人数是 $P(3)$，
      而==两小时内的人数是 $P(6)$==——
      $\lambda$ 随时间长度成比例放大，这一点常考。
    ` },

    { t: 'key', id: 'poisson-limit', title: '泊松定理：二项分布在「大 $n$ 小 $p$」下的极限', c: String.raw`
      设 $np_n\to\lambda>0$，则
      $$\boxed{\ \binom nk p_n^{k}(1-p_n)^{n-k}\ \longrightarrow\ \frac{\lambda^{k}}{k!}e^{-\lambda}\ }$$

      **实用形式**：当 $n$ 很大、$p$ 很小时，
      $$B(n,p)\ \approx\ P(\lambda),\qquad \lambda=np.$$
      考研里的门槛通常是 $n\ge20$、$p\le0.05$。

      **这条定理解释了泊松分布"从哪来"**：
      把一小时切成 $n$ 个极短的小段，每段里最多来一个顾客、概率 $p=\lambda/n$，
      各段独立——==这就是一个 $B(n,\lambda/n)$==，
      让切分无限细化，就得到泊松分布。
      ==所以泊松是"把伯努利试验的次数推到无穷、单次概率推到零，而期望保持不变"的产物==，
      它也因此被叫作**稀有事件分布**。

      **两个地方已经见过这个极限**：

      - [装错信封](#/probability/events/operations?at=ex-matching)的 $1-e^{-1}$；
      - [射击至少一次](#/probability/events/independence?at=ex-at-least-once)里 $np=1$ 时的 $0.632$。

      ==它们其实是同一个 $P(X=0)=e^{-\lambda}$ 在 $\lambda=1$ 处的值。==
    ` },

    { t: 'key', id: 'geometric-mem', title: '几何分布与超几何分布', c: String.raw`
      **几何分布 $G(p)$——数"第一次成功要等多久"**：
      $$P(X=k)=(1-p)^{k-1}p,\quad k=1,2,\dots\qquad
      \E X=\frac1p,\quad \Var X=\frac{1-p}{p^{2}}$$
      最好用的形式是尾概率：==$P(X>k)=(1-p)^{k}$==（前 $k$ 次全失败）。
      $\E X=\frac1p$ 很符合直觉：==成功率十分之一，平均要试十次==。

      **无记忆性**：
      $$P(X>m+n\mid X>m)=P(X>n)$$
      "已经失败了 $m$ 次"这个信息==对将来毫无价值==。
      离散场合只有几何分布有这个性质，
      连续场合只有[指数分布](#/probability/random-var/distributions?at=exp-memoryless)有。

      ---

      **超几何分布 $H(n,M,N)$——不放回地摸**：
      $N$ 件中有 $M$ 件次品，任取 $n$ 件，$X=$ 取到的次品数：
      $$P(X=k)=\frac{\binom Mk\binom{N-M}{n-k}}{\binom Nn},\qquad \E X=n\cdot\frac MN$$

      ==注意期望和二项分布的 $np$ 长得一样==（$p=\frac MN$），
      但方差要小一些——不放回抽取"自带纠偏"，波动更小。

      **与二项的关系**：$N\to\infty$ 而 $\frac MN\to p$ 时，超几何 $\to B(n,p)$。
      现实含义是==总体足够大时，抽走几个不影响成分，放不放回都一样==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'continuous', c: '二、连续型：三个故事' },

    { t: 'key', id: 'uniform', title: '均匀分布 $U(a,b)$：完全没有偏好', c: String.raw`
      $$f(x)=\begin{cases}\dfrac{1}{b-a},&a<x<b\\[4pt]0,&\text{其他}\end{cases}
      \qquad
      F(x)=\begin{cases}0,&x<a\\[2pt]\dfrac{x-a}{b-a},&a\le x<b\\[4pt]1,&x\ge b\end{cases}$$
      $$\E X=\frac{a+b}{2},\qquad \Var X=\frac{(b-a)^{2}}{12}$$

      **它就是[几何概型](#/probability/events/operations?at=geometric-prob)的随机变量版**：
      $$P(c<X<d)=\frac{d-c}{b-a}\quad(a\le c<d\le b),$$
      ==概率只看区间长度，与位置无关==。

      **$\frac{(b-a)^2}{12}$ 这个 $12$ 值得记一下来历**：
      $\Var X=\int_a^b\frac{(x-\frac{a+b}{2})^2}{b-a}\dx$，
      换元后是 $\frac{1}{L}\int_{-L/2}^{L/2}t^{2}\dt=\frac{L^{2}}{12}$。
      ==现推只要三十秒，比背安全。==
    ` },

    { t: 'key', id: 'exponential', title: '指数分布 $E(\\lambda)$：等待时间', c: String.raw`
      $$f(x)=\begin{cases}\lambda e^{-\lambda x},&x>0\\0,&x\le0\end{cases}
      \qquad
      F(x)=\begin{cases}1-e^{-\lambda x},&x>0\\0,&x\le0\end{cases}$$
      $$\E X=\frac1\lambda,\qquad \Var X=\frac{1}{\lambda^{2}}$$

      ==最该记的是 $F$ 而不是 $f$==：
      $$P(X>x)=e^{-\lambda x}\quad(x>0)$$
      指数分布的题十有八九直接用这条尾概率，几乎不用积分。

      **故事**：元件的寿命、顾客到达的间隔时间、电话呼叫的等待时间。
      ==它是[几何分布的连续版本](#/probability/random-var/distributions?at=geometric-mem)==：
      几何数"要试几次"，指数量"要等多久"。

      **与泊松的关系（很重要的一条直觉）**：
      若单位时间内发生的次数服从 $P(\lambda)$，
      则==相邻两次发生之间的间隔时间服从 $E(\lambda)$==。
      一眼看出：
      $$P(\text{等待时间}>t)=P(\text{在}\ [0,t]\ \text{内一次都没发生})=e^{-\lambda t}\cdot\frac{(\lambda t)^{0}}{0!}=e^{-\lambda t}.\ \checkmark$$
      ==同一个随机现象的两种切法：数次数是泊松，量间隔是指数。==

      **参数陷阱**：有的教材用 $\theta=\frac1\lambda$ 作参数（即 $f=\frac1\theta e^{-x/\theta}$）。
      看到题目给"平均寿命为 $1000$ 小时"，意思是 $\E X=1000$，即 ==$\lambda=\frac{1}{1000}$==。
    ` },

    { t: 'key', id: 'exp-memoryless', title: '无记忆性：指数分布的身份证', c: String.raw`
      $$\boxed{\ P(X>s+t\mid X>s)=P(X>t),\qquad s,t>0\ }$$

      **一行证明**：
      $$P(X>s+t\mid X>s)=\frac{P(X>s+t)}{P(X>s)}
      =\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}=P(X>t).$$
      ==用的是 $e$ 的指数律 $e^{a+b}=e^{a}e^{b}$==，
      也就是[移位与调制](#/threads/patterns/shift?at=exp-law)那条主线里的同一个性质：
      **加法在自变量上，乘法在函数值上**。

      **现实含义**：一个已经用了 $1000$ 小时还没坏的元件，
      它==再用 $t$ 小时不坏的概率，和一个全新元件一样==。
      指数分布描述的是"不会老化、只会突然失效"的对象。
      现实中的机械磨损并不满足这一点——
      ==所以指数分布适合描述电子元件，不适合描述轴承==。

      **反过来也成立**：在连续型非负随机变量中，
      ==只有指数分布具有无记忆性==。
      这条"唯一性"是选择题的常见素材：
      "若 $X$ 非负连续且满足 $P(X>s+t\mid X>s)=P(X>t)$，则 $X$ 服从……"。
    ` },

    { t: 'key', id: 'normal', title: '正态分布 $N(\\mu,\\sigma^{2})$：大量微小因素叠加的结果', c: String.raw`
      $$f(x)=\frac{1}{\sqrt{2\pi}\,\sigma}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}},\qquad x\in\R$$
      $$\E X=\mu,\qquad \Var X=\sigma^{2}$$

      **两个参数的几何意义**：
      $\mu$ 是==对称轴的位置==（也是期望、中位数、众数），
      $\sigma$ 是==胖瘦==（$\sigma$ 越大越矮胖，越分散）。
      曲线在 $x=\mu\pm\sigma$ 处有拐点——==这是 $\sigma$ 的图像含义==。

      **密度积分为 $1$ 靠的是高斯积分**
      $\int_{-\infty}^{+\infty}e^{-t^{2}}\dt=\sqrt\pi$，
      见[高斯积分族](#/calculus/multi-integral/separable?at=gauss-family)。
      ==概率论里几乎所有含 $e^{-(\text{二次式})}$ 的积分，最后都归到它==，
      算 $\E X$、$\Var X$、二维正态的边缘密度全都用它。

      **为什么正态如此普遍**：中心极限定理说，
      ==大量独立微小随机因素之和，不论各自服从什么分布，都趋于正态==。
      测量误差、身高、噪声都属于这一类。
    ` },

    { t: 'key', id: 'normal-standardize', title: '标准化：一切正态计算的唯一动作', c: String.raw`
      $$X\sim N(\mu,\sigma^{2})\ \Longrightarrow\ Z=\frac{X-\mu}{\sigma}\sim N(0,1)$$
      $$P(a<X\le b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)$$

      ==正态分布的计算题只有这一步，剩下的都是查表。==

      **标准正态的三条必备性质**：

      1. **对称性**：$\varphi(-x)=\varphi(x)$，故
         $$\boxed{\ \Phi(-x)=1-\Phi(x)\ }\qquad\text{特别地}\ \Phi(0)=\tfrac12$$
         ==表里通常只给 $x>0$ 的值，负数一律靠这条翻过去==。
      2. **对称区间**：$P(\abs Z\le a)=2\Phi(a)-1$。
      3. **$3\sigma$ 法则**：
         $$P(\abs{X-\mu}<\sigma)\approx0.6826,\quad
         P(\abs{X-\mu}<2\sigma)\approx0.9545,\quad
         P(\abs{X-\mu}<3\sigma)\approx0.9973.$$

      **线性变换保持正态**：
      $$X\sim N(\mu,\sigma^{2}),\ a\ne0\ \Longrightarrow\ aX+b\sim N(a\mu+b,\ a^{2}\sigma^{2})$$
      ==注意方差乘的是 $a^{2}$，而且要取绝对值平方，$a<0$ 时结果仍是正态==。
      这条"正态族对线性变换封闭"的性质，
      是[二维正态](#/probability/multi-random-var/normal-2d?at=linear-combination)那一页的主角。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'summary', c: '三、总表与关系图' },

    { t: 'compare',
      id: 'table',
      title: '八个分布速查（数字特征这一列到第 4 章会反复用）',
      cols: ['分布', '分布律 / 密度', '$\\E X$', '$\\Var X$', '故事'],
      rows: [
        ['两点 $B(1,p)$', '$P(X=1)=p$', '$p$', '$p(1-p)$', '做一次，成不成'],
        ['二项 $B(n,p)$', '$\\binom nk p^{k}q^{n-k}$', '$np$', '$npq$', '做 $n$ 次，成几次'],
        ['泊松 $P(\\lambda)$', '$\\frac{\\lambda^{k}}{k!}e^{-\\lambda}$', '$\\lambda$', '==$\\lambda$==', '单位时间内发生几次'],
        ['几何 $G(p)$', '$q^{k-1}p$', '$\\frac1p$', '$\\frac{q}{p^{2}}$', '第一次成功要试几次'],
        ['超几何 $H(n,M,N)$', '$\\frac{\\binom Mk\\binom{N-M}{n-k}}{\\binom Nn}$', '$n\\frac MN$', '（不要求）', '不放回地摸 $n$ 个'],
        ['均匀 $U(a,b)$', '$\\frac{1}{b-a}$', '$\\frac{a+b}{2}$', '$\\frac{(b-a)^{2}}{12}$', '区间内毫无偏好'],
        ['指数 $E(\\lambda)$', '$\\lambda e^{-\\lambda x}\\ (x>0)$', '$\\frac1\\lambda$', '$\\frac{1}{\\lambda^{2}}$', '等到下一次要多久'],
        ['正态 $N(\\mu,\\sigma^{2})$', '$\\frac{1}{\\sqrt{2\\pi}\\sigma}e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}}$', '$\\mu$', '$\\sigma^{2}$', '大量微小因素叠加'],
      ] },

    { t: 'key', id: 'relations', title: '关系图：这些分布不是八个孤岛', c: String.raw`
      $$
      \begin{array}{ccc}
      B(1,p) & \xrightarrow{\ \text{独立叠加}\ n\ \text{次}\ } & B(n,p)\\[4pt]
       & & \downarrow{\scriptstyle n\to\infty,\ np\to\lambda}\\[4pt]
       & & P(\lambda)
      \end{array}
      $$

      | 从 | 到 | 桥梁 |
      |---|---|---|
      | $B(n,p)$ | $P(\lambda)$ | ==$n$ 大 $p$ 小==，$\lambda=np$（泊松定理） |
      | $B(n,p)$ | $N(np,npq)$ | ==$n$ 大 $p$ 不小==（[棣莫弗–拉普拉斯](#/probability/lln-clt/clt?at=demoivre)） |
      | $G(p)$ | $E(\lambda)$ | 离散等待 $\to$ 连续等待，共享==无记忆性== |
      | $P(\lambda)$ | $E(\lambda)$ | 同一个泊松流：==数次数 vs 量间隔== |
      | $H(n,M,N)$ | $B(n,\frac MN)$ | ==总体很大==时放不放回无所谓 |
      | $U(0,1)$ | 任意分布 | $F^{-1}(U)$，见[概率积分变换](#/probability/random-var/function-of-rv?at=ex-uniform-to-exp) |
      | $N(0,1)$ | $\chi^{2}(1)$ | 平方一下，见[正态的平方](#/probability/random-var/function-of-rv?at=ex-normal-square) |

      ==记住这张表比记住八个公式有用==：
      考研的分布题常常在"识别故事"这一步就决定了成败，
      而故事之间的转换关系正是命题人最爱做文章的地方。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-poisson-approx',
      title: '什么时候该把二项换成泊松',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某电子设备装有 $1000$ 个元件，各元件独立工作，
        每个元件在一年内损坏的概率为 $0.002$。
        求一年内损坏元件数==不超过 $2$ 个==的概率。
      `,
      idea: String.raw`
        **精确模型是二项**：$X\sim B(1000,0.002)$，
        $$P(X\le2)=\sum_{k=0}^{2}\binom{1000}{k}(0.002)^{k}(0.998)^{1000-k}.$$
        理论上没错，但 $\binom{1000}{2}$ 和 $0.998^{998}$ ==手算不现实==。

        **认出近似的信号**：$n=1000$ 很大，$p=0.002$ 很小，
        而乘积 $np=2$ ==是个不大不小的常数==——
        这正是[泊松定理](#/probability/random-var/distributions?at=poisson-limit)的适用条件。

        近似之后，$e^{-2}$ 是个可查的常数，三项相加就完事了。
        =="$n$ 大 $p$ 小而 $np$ 适中"这三件事要同时看，缺一条都不该用泊松。==
      `,
      solution: String.raw`
        设 $X$ 为一年内损坏的元件数，则 $X\sim B(1000,0.002)$。

        由于 $n=1000$ 较大、$p=0.002$ 较小，取 $\lambda=np=2$，用泊松近似 $X\ \dot\sim\ P(2)$：

        $$P(X\le2)=\sum_{k=0}^{2}\frac{2^{k}}{k!}e^{-2}
        =e^{-2}\left(1+2+\frac{4}{2}\right)=5e^{-2}\approx\boxed{0.677}.$$

        （作为对照，二项分布的精确值约为 $0.6767$，==误差在千分之一以内==。）
      `,
      comment: String.raw`
        **近似的边界在哪**：常用判据是 $n\ge20$ 且 $p\le0.05$；
        $n\ge100$、$np\le10$ 时精度已经相当好。
        ==如果 $p$ 不小（比如 $0.3$），$np$ 会随 $n$ 一起变大，
        该用的是正态近似而不是泊松近似==——这是第 5 章的内容。

        **两条近似路线的分工**（值得单独记）：

        | 条件 | 用什么近似 |
        |---|---|
        | $n$ 大、$p$ ==小==、$np$ 适中 | ==泊松== $P(np)$ |
        | $n$ 大、$p$ ==不小==（$np$ 与 $nq$ 都较大） | ==正态== $N(np,npq)$ |

        **本题的变体**：把问题改成"求损坏元件数的期望与方差"，
        则应当用**精确模型**：$\E X=np=2$，$\Var X=npq=1.996$。
        ==近似只用于算概率，不要拿来算数字特征==——
        泊松近似会给出 $\Var X=2$，虽然接近但不是精确值。
      `,
    },

    { t: 'example',
      id: 'ex-exp-memory',
      title: '指数分布：三个问法，一条尾概率全包',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        某种电子元件的寿命 $X$（单位：小时）服从参数为 $\lambda=\frac{1}{1000}$ 的指数分布。

        1. 求一个元件能使用 $1000$ 小时以上的概率；
        2. 已知某元件已使用了 $1000$ 小时，求它还能再用 $1000$ 小时以上的概率；
        3. 三个这样的元件独立工作，求恰有一个使用 $1000$ 小时以上的概率。
      `,
      idea: String.raw`
        **三问共用一个量**：$p=P(X>1000)=e^{-\lambda\cdot1000}=e^{-1}$。
        算出这一个数，后面全是套用。

        - 第 1 问：直接就是[尾概率](#/probability/random-var/distributions?at=exponential)，
          ==不要去积分密度==。
        - 第 2 问：形式上是条件概率，
          但由[无记忆性](#/probability/random-var/distributions?at=exp-memoryless)==答案与第 1 问相同==。
          出题人放这一问就是在考这个性质，看到"已使用了 $t$ 小时"要立刻反应过来。
        - 第 3 问：把"元件能否活过 $1000$ 小时"看成一次==伯努利试验==，
          三个独立元件就是 $B(3,p)$。
          ==这一步是"连续问题离散化"的常见手法==：
          连续型随机变量一旦被一个阈值切开，就变回了二项分布。
      `,
      solution: String.raw`
        记 $p=P(X>1000)$。由指数分布的分布函数，
        $$p=e^{-\frac{1}{1000}\times1000}=e^{-1}\approx0.368.$$

        **(1)** $P(X>1000)=e^{-1}\approx\boxed{0.368}$。

        **(2)** 由无记忆性，
        $$P(X>2000\mid X>1000)=\frac{e^{-2}}{e^{-1}}=e^{-1}\approx\boxed{0.368},$$
        ==与第 1 问完全相同==。

        **(3)** 设 $Y$ 为三个元件中使用超过 $1000$ 小时的个数，则 $Y\sim B(3,e^{-1})$，
        $$P(Y=1)=\binom31 e^{-1}\left(1-e^{-1}\right)^{2}
        =3e^{-1}(1-e^{-1})^{2}\approx3\times0.368\times0.632^{2}\approx\boxed{0.441}.$$
      `,
      comment: String.raw`
        **本题的三个动作，覆盖了指数分布的全部考法**：

        1. ==背 $P(X>x)=e^{-\lambda x}$==，不背密度也能做题；
        2. ==看到"已经用了多久"就想无记忆性==；
        3. ==多个独立同分布的元件 + 一个阈值 $\Rightarrow$ 二项分布==。

        **参数别搞反**：题目若说"平均寿命 $1000$ 小时"，
        那是 $\E X=\frac1\lambda=1000$，即 $\lambda=\frac{1}{1000}$。
        ==把 $\lambda$ 写成 $1000$ 是这一节最高频的低级错误。==

        **一个漂亮的推广**：$n$ 个独立元件中，
        "最短寿命" $\min(X_1,\dots,X_n)$ 仍服从指数分布，参数为 $n\lambda$——
        因为 $P(\min>t)=\prod P(X_i>t)=e^{-n\lambda t}$。
        ==指数族对取最小值封闭==，这是[最大最小值分布](#/probability/multi-random-var/function-2d?at=max-min)里最常考的一条。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **指数分布的参数取倒数**：$\E X=\frac1\lambda$，
         "平均寿命 $1000$"意味着 $\lambda=0.001$ 而不是 $1000$。
      2. **泊松的 $\lambda$ 不随时间缩放**：平均每小时 $3$ 次，
         则==三小时内的次数服从 $P(9)$==，不是 $P(3)$。
      3. **有放回 / 不放回搞混**：有放回是二项，不放回是超几何。
      4. **$\Phi(-x)$ 写成 $-\Phi(x)$**：正确的是 ==$1-\Phi(x)$==。
      5. **正态线性变换的方差**：$aX+b$ 的方差是 $a^{2}\sigma^{2}$，
         ==不是 $a\sigma^{2}$，也不是 $a^{2}\sigma^{2}+b$==。
      6. **拿泊松近似去算数字特征**：近似只用于算概率。
      7. **几何分布的起点**：$P(X=k)=q^{k-1}p$ 从 $k=1$ 开始；
         若题目定义为"成功前的失败次数"，则是 $q^{k}p$ 从 $k=0$ 开始，==看清定义==。
      8. **均匀分布的方差**：$\frac{(b-a)^{2}}{12}$，
         分母是 $12$ 不是 $2$，==记不清就当场积一遍==。
      9. **把连续型的 $P(X=a)$ 当成 $f(a)$**：连续型下 $P(X=a)=0$，
         见[密度不是概率](#/probability/random-var/cdf-pdf?at=pdf-not-prob)。
    ` },

  ],
});
