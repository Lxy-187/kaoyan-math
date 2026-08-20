/* ==========================================================================
   概率论 / 3 多维随机变量及其分布 / 二维随机变量函数的分布
   —— Z = g(X,Y) 的分布。核心仍是分布函数法，只是"解不等式"变成了"画区域"。
      一维版本见 random-var/function-of-rv。
   ========================================================================== */

KM.page({
  path: 'probability/multi-random-var/function-2d',
  title: '二维随机变量函数的分布',
  subtitle: '万能法还是那一句：$F_Z(z)=\\iint_{g(x,y)\\le z}f\\,\\d x\\,\\d y$——**难点从解不等式变成了画区域**',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'overview', title: '总纲：一个公式，四种常考的 $g$', c: String.raw`
      $$\boxed{\ F_Z(z)=P\bigl(g(X,Y)\le z\bigr)=\iint_{\set{(x,y):\,g(x,y)\le z}}f(x,y)\dxy\ }$$

      ==这是[一维分布函数法](#/probability/random-var/function-of-rv?at=cdf-method)的原样搬运==：
      唯一的变化是"解不等式得到区间"变成了"画出平面区域"。

      **考研只考四种 $g$**：

      | $Z=g(X,Y)$ | 区域 $g\le z$ 的形状 | 专用工具 |
      |---|---|---|
      | $X+Y$ | 直线 $x+y=z$ 的==左下方== | [卷积公式](#/probability/multi-random-var/function-2d?at=sum-convolution) |
      | $\max(X,Y)$ | 以 $(z,z)$ 为右上角的==正方形区域== | $F_M=F_XF_Y$ |
      | $\min(X,Y)$ | 补集是右上方的正方形区域 | $1-F_N=(1-F_X)(1-F_Y)$ |
      | $X-Y$、$XY$、$\frac XY$ | 直线或双曲线的一侧 | 老实画图 |

      ==前三种有现成公式，第四种必须回到定义画图==。
      画图时的固定动作是：**把 $z$ 当参数，让那条直线（或曲线）从左下方扫到右上方，
      看它与支撑区域的交是怎么变化的**——==变化的转折点就是 $z$ 的分段点==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'sum', c: '一、和：$Z=X+Y$' },

    { t: 'key', id: 'sum-convolution', title: '卷积公式', c: String.raw`
      $$f_Z(z)=\int_{-\infty}^{+\infty}f(x,\,z-x)\dx
              =\int_{-\infty}^{+\infty}f(z-y,\,y)\dy$$

      **$X,Y$ 独立时**（最常用）：
      $$\boxed{\ f_Z(z)=\int_{-\infty}^{+\infty}f_X(x)\,f_Y(z-x)\dx\ }$$
      这就是 $f_X$ 与 $f_Y$ 的**卷积** $f_X*f_Y$。

      **公式怎么来的**：
      $$F_Z(z)=\iint_{x+y\le z}f\dxy=\int_{-\infty}^{+\infty}\!\!\left(\int_{-\infty}^{z-x}f(x,y)\dy\right)\dx,$$
      对 $z$ 求导（求导与外层积分交换），内层的变限积分==只在上限处贡献被积函数==，
      得到 $\int f(x,z-x)\dx$。
      ==本质就是"沿着直线 $x+y=z$ 把密度扫一遍"。==

      **实操的全部难点是积分限**，而且是==两重限制求交==：

      1. $f_X(x)\ne0$ 要求 $x$ 在某个范围；
      2. $f_Y(z-x)\ne0$ 要求 $z-x$ 在某个范围，==也就是 $x$ 在一个随 $z$ 平移的范围里==。

      两个范围求交，交集随 $z$ 变化——==这就是必须对 $z$ 分段讨论的原因==。
      建议在草稿纸上把两个 $x$ 区间画成两条线段，看它们怎么错开。

      **离散型的对应公式**：
      $$P(Z=k)=\sum_i P(X=x_i,\ Y=k-x_i)
      \overset{\text{独立}}{=}\sum_i P(X=x_i)P(Y=k-x_i).$$
    ` },

    { t: 'key', id: 'stable-families', title: '可加性：四个「加起来还是自己」的族', c: String.raw`
      设 $X,Y$ ==相互独立==，则

      | 分布 | 可加性 |
      |---|---|
      | 正态 | $N(\mu_1,\sigma_1^{2})+N(\mu_2,\sigma_2^{2})=N(\mu_1+\mu_2,\ \sigma_1^{2}+\sigma_2^{2})$ |
      | 泊松 | $P(\lambda_1)+P(\lambda_2)=P(\lambda_1+\lambda_2)$ |
      | 二项（==同一个 $p$==） | $B(n,p)+B(m,p)=B(n+m,p)$ |
      | 卡方 | $\chi^{2}(m)+\chi^{2}(n)=\chi^{2}(m+n)$ |

      ==参数直接相加，这是考场上最省时间的一类结论==。

      **注意两条边界**：

      - ==方差相加，标准差不相加==：$\sigma=\sqrt{\sigma_1^{2}+\sigma_2^{2}}$；
      - ==二项必须同 $p$==，不同 $p$ 的两个二项之和不是二项。

      **不可加的反例（常考）**：
      $$E(\lambda_1)+E(\lambda_2)\ne\text{指数分布}$$
      两个独立指数分布之和服从**伽马分布**（$\lambda$ 相同时也叫爱尔朗分布），
      密度为 $\lambda^{2}xe^{-\lambda x}$（$x>0$）。
      ==均匀分布同样不可加==，两个 $U(0,1)$ 之和是[三角形分布](#/probability/multi-random-var/function-2d?at=ex-sum-uniform)。

      **泊松可加性的两行推导**（值得会推）：
      $$P(Z=k)=\sum_{i=0}^{k}\frac{\lambda_1^{i}}{i!}e^{-\lambda_1}\cdot\frac{\lambda_2^{k-i}}{(k-i)!}e^{-\lambda_2}
      =\frac{e^{-(\lambda_1+\lambda_2)}}{k!}\sum_{i=0}^{k}\binom ki\lambda_1^{i}\lambda_2^{k-i}
      =\frac{(\lambda_1+\lambda_2)^{k}}{k!}e^{-(\lambda_1+\lambda_2)},$$
      ==最后一步用的是二项式定理==。
      现实解读：两个独立的泊松流合并起来仍是泊松流，强度相加。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'maxmin', c: '二、最大值与最小值' },

    { t: 'key', id: 'max-min', title: '$\\max$ 与 $\\min$：把「都」和「至少一个」翻译过来', c: String.raw`
      设 $X,Y$ ==相互独立==，$M=\max(X,Y)$，$N=\min(X,Y)$。

      **最大值**：$\set{M\le z}$ 意思是==两个都 $\le z$==，
      $$\boxed{\ F_M(z)=F_X(z)\,F_Y(z)\ }$$

      **最小值**：$\set{N>z}$ 意思是==两个都 $>z$==，
      $$\boxed{\ 1-F_N(z)=\bigl(1-F_X(z)\bigr)\bigl(1-F_Y(z)\bigr)\ }$$

      ==这两条的逻辑就是第 1 章的[对偶律](#/probability/events/operations?at=dual)==：
      "最大值不超过 $z$"是**交**，直接乘；
      "最小值不超过 $z$"是**并**，先取补变成交再乘。
      ==$\min$ 一定要走补集，直接乘是错的。==

      **$n$ 个独立同分布的情形**（更常考）：
      $$F_M(z)=\bigl[F(z)\bigr]^{n},\qquad F_N(z)=1-\bigl[1-F(z)\bigr]^{n}.$$

      **一条漂亮的推论**：$X_i\sim E(\lambda_i)$ 独立时，
      $$P(N>z)=\prod_i e^{-\lambda_i z}=e^{-(\sum\lambda_i)z}
      \ \Longrightarrow\ N\sim E\!\left(\sum_i\lambda_i\right).$$
      ==指数族对取最小值封闭==（对求和不封闭）。
      现实含义：$n$ 个元件串联，任何一个坏就整体失效，
      ==系统寿命仍是指数分布，失效率是各元件失效率之和==。
    ` },

    { t: 'key', id: 'mixed-discrete-continuous', title: '一个离散、一个连续：用全概率拆开', c: String.raw`
      当 $X$ 离散、$Y$ 连续且相互独立时，
      ==不要去找联合密度==（它不存在通常意义上的二维密度），
      而是按 $X$ 的取值做[全概率](#/probability/events/conditional?at=total-prob)：
      $$F_Z(z)=\sum_i P(X=x_i)\,P\bigl(g(x_i,Y)\le z\bigr)$$

      **每一项都退化成一维问题**：$x_i$ 已经是个具体的数，
      $g(x_i,Y)$ 就是[一元函数的分布](#/probability/random-var/function-of-rv?at=cdf-method)。

      ==这是"离散分类 + 连续计算"的标准配合==，
      也是[全概率公式](#/probability/events/conditional?at=when-total)在第 3 章的主要用途。
      条件"$X=x_i$"下 $Y$ 的分布不变（因为独立），这一步一定要写出来。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-sum-uniform',
      title: '两个均匀分布之和：为什么是个三角形',
      source: '经典模型',
      level: 3,
      problem: String.raw`
        设 $X,Y$ 相互独立，均服从 $U(0,1)$，求 $Z=X+Y$ 的概率密度。
      `,
      idea: String.raw`
        **先预判形状**：$Z$ 的取值范围是 $(0,2)$。
        $Z$ 接近 $0$ 需要 $X,Y$ 都很小，==这种组合很少==；
        $Z$ 接近 $1$ 的组合最多（$x$ 取任何值，$y=1-x$ 都可行）。
        ==所以密度应当在 $z=1$ 处最高、两端趋于零，是个三角形==。
        有了这个预判，算出别的形状就知道错了。

        **两条路**：

        - **几何路**：$F_Z(z)=P(X+Y\le z)$ 就是==正方形 $[0,1]^{2}$ 中直线 $x+y=z$ 左下方的面积==
          （因为密度恒为 $1$，概率就是面积）。
          让直线从左下扫到右上：$z<1$ 时切出一个小三角形，$z>1$ 时是正方形挖掉一个角。
          ==这条路几乎不用积分==。
        - **卷积路**：$f_Z(z)=\int f_X(x)f_Y(z-x)\dx$，
          两个限制 $0<x<1$ 与 $0<z-x<1$（即 $z-1<x<z$）==求交==，
          交集在 $z=1$ 处换形式，这就是分段点的来源。

        两条路都要会，==几何路适合验算，卷积路适合密度不是常数的情形==。
      `,
      solution: String.raw`
        $f_X(x)=1$（$0<x<1$），$f_Y(y)=1$（$0<y<1$），独立故 $f(x,y)=1$ 在单位正方形上。

        **卷积公式**：
        $$f_Z(z)=\int_{-\infty}^{+\infty}f_X(x)f_Y(z-x)\dx.$$
        被积函数非零需要
        $$0<x<1\quad\text{且}\quad 0<z-x<1\ \Longleftrightarrow\ z-1<x<z.$$
        两区间求交：

        - **$0<z\le1$**：交集为 $(0,z)$，长度 $z$，故 $f_Z(z)=z$；
        - **$1<z<2$**：交集为 $(z-1,1)$，长度 $2-z$，故 $f_Z(z)=2-z$；
        - 其余 $f_Z(z)=0$。

        即
        $$\boxed{\ f_Z(z)=\begin{cases}z,&0<z\le1\\ 2-z,&1<z<2\\ 0,&\text{其他}\end{cases}\ }$$

        **检验**：$\int_0^1z\dz+\int_1^2(2-z)\dz=\frac12+\frac12=1\ \checkmark$，
        且图像是以 $(1,1)$ 为顶点的等腰三角形，与预判一致。
      `,
      comment: String.raw`
        **这个分布叫辛普森分布（三角形分布）**，
        是"均匀分布不可加"最简洁的证据：
        ==两个 $U(0,1)$ 之和不是 $U(0,2)$==。
        直觉上的理由已经在思路里说了：中间的组合方式远多于两端。

        **再加一个就更像正态了**：三个独立 $U(0,1)$ 之和的密度是分段二次的钟形，
        $n$ 个之和迅速趋于正态——==这是中心极限定理最容易看到的实例==。
        早年计算机生成正态随机数就用"$12$ 个均匀数相加减 $6$"这个土办法。

        **求交那一步的通用写法**（务必掌握）：
        $$\max(0,\,z-1)<x<\min(1,\,z),$$
        ==分段点就是让 $\max$ 和 $\min$ 换分支的地方==，
        即 $z-1=0$ 与 $z=1$，都给出 $z=1$。
        密度不是常数时，这个写法能保证不漏段。

        **常见变体**：$X\sim U(0,1)$，$Y\sim E(1)$ 独立，求 $X+Y$ 的密度。
        做法完全一样，只是交集内的被积函数变成了 $e^{-(z-x)}$。
      `,
    },

    { t: 'example',
      id: 'ex-max-min',
      title: '串联与并联：$\\min$ 和 $\\max$ 的物理意义',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设两个电子元件的寿命 $X,Y$ 相互独立，
        分别服从参数为 $\lambda_1$ 和 $\lambda_2$ 的指数分布（$\lambda_1,\lambda_2>0$）。

        1. 两元件==串联==（任一损坏则系统失效），求系统寿命 $N=\min(X,Y)$ 的分布；
        2. 两元件==并联==（都损坏才失效），求系统寿命 $M=\max(X,Y)$ 的分布函数；
        3. 求 $P(X<Y)$。
      `,
      idea: String.raw`
        **第 1 问**：$\min$ 一定走==尾概率==（补集），
        因为 $\set{N>z}=\set{X>z}\cap\set{Y>z}$ 是交，可以直接乘；
        而 $\set{N\le z}$ 是并，不能直接乘。
        ==指数分布的尾概率是 $e^{-\lambda z}$，两个一乘就出答案==，
        这是全题最省力的一问。

        **第 2 问**：$\max$ 走正面，$F_M=F_XF_Y$ 直接乘。
        ==注意 $F_M$ 展开后有三项，不是指数分布==——
        并联系统的寿命不再具有无记忆性，这一点很值得体会。

        **第 3 问**：$P(X<Y)$ 是个二重积分，
        但可以用[全概率](#/probability/events/conditional?at=total-prob)的连续版本
        ==按 $X$ 的取值分类==：给定 $X=x$，需要 $Y>x$，概率 $e^{-\lambda_2x}$，
        再对 $x$ 加权积分。==这比画区域快。==
      `,
      solution: String.raw`
        由指数分布，$P(X>z)=e^{-\lambda_1z}$，$P(Y>z)=e^{-\lambda_2z}$（$z>0$）。

        **(1)** 对 $z>0$，由独立性
        $$P(N>z)=P(X>z)P(Y>z)=e^{-(\lambda_1+\lambda_2)z},$$
        故 $F_N(z)=1-e^{-(\lambda_1+\lambda_2)z}$（$z>0$），即
        $$\boxed{\ N\sim E(\lambda_1+\lambda_2)\ }$$

        **(2)** 对 $z>0$，
        $$F_M(z)=F_X(z)F_Y(z)=\left(1-e^{-\lambda_1z}\right)\left(1-e^{-\lambda_2z}\right)
        =1-e^{-\lambda_1z}-e^{-\lambda_2z}+e^{-(\lambda_1+\lambda_2)z},$$
        $z\le0$ 时 $F_M(z)=0$。
        ==这不是指数分布==（求导后密度是三项之和）。

        **(3)** 按 $X$ 分类，$f_X(x)=\lambda_1e^{-\lambda_1x}$：
        $$P(X<Y)=\int_0^{+\infty}f_X(x)\,P(Y>x)\dx
        =\int_0^{+\infty}\lambda_1e^{-\lambda_1x}e^{-\lambda_2x}\dx$$
        $$=\lambda_1\int_0^{+\infty}e^{-(\lambda_1+\lambda_2)x}\dx
        =\boxed{\dfrac{\lambda_1}{\lambda_1+\lambda_2}}.$$
      `,
      comment: String.raw`
        **第 3 问的答案值得单独记**：
        $$P(X<Y)=\frac{\lambda_1}{\lambda_1+\lambda_2}$$
        形式非常直观——==谁的失效率大，谁先坏的概率就大，按比例分==。
        与第 1 问合起来看：两个独立指数流合并后，
        "总的失效"服从 $E(\lambda_1+\lambda_2)$，
        而"这次失效是谁造成的"按 $\lambda_i$ 的比例分配，==且与失效时刻独立==。
        这是泊松过程叠加的核心性质。

        **串联 vs 并联的对照**：

        | | 串联 $\min$ | 并联 $\max$ |
        |---|---|---|
        | 事件 | 至少一个坏 | 都坏了 |
        | 算法 | ==先取补再乘== | ==直接乘== |
        | 结果 | 仍是指数 $E(\lambda_1+\lambda_2)$ | 不是指数 |
        | 期望 | $\frac{1}{\lambda_1+\lambda_2}$（==比单个还短==） | 比单个长 |

        ==串联系统比任何一个元件都脆弱，并联系统比任何一个都耐用==，
        这两句话可以用来检验算出来的答案方向对不对。

        **同分布时的简化**：$\lambda_1=\lambda_2=\lambda$ 时
        $\E M=\frac{1}{\lambda}\left(1+\frac12\right)=\frac{3}{2\lambda}$，
        $\E N=\frac{1}{2\lambda}$。
        一般地 $n$ 个独立 $E(\lambda)$ 的最大值期望是
        $\frac1\lambda\left(1+\frac12+\cdots+\frac1n\right)$，
        ==里面出现了[调和级数](#/calculus/series/convergence?at=rulers)==。
      `,
    },

    { t: 'example',
      id: 'ex-mixed',
      title: '一离散一连续：按离散的取值拆开',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $X$ 与 $Y$ 相互独立，$X$ 的分布律为 $P(X=0)=P(X=1)=\frac12$，
        $Y\sim U(0,1)$。求 $Z=X+Y$ 的分布函数与密度。
      `,
      idea: String.raw`
        $X$ 离散、$Y$ 连续，==没有二维联合密度可用==，
        所以走[全概率](#/probability/multi-random-var/function-2d?at=mixed-discrete-continuous)：
        按 $X$ 的两个取值分类。

        **分类之后每一支都是平凡的**：

        - $X=0$ 那一支，$Z=Y\sim U(0,1)$；
        - $X=1$ 那一支，$Z=1+Y\sim U(1,2)$。

        所以 $Z$ 是==两个均匀分布各占一半的混合==，
        直觉上密度应该是 $\frac12$ 在 $(0,1)$ 上、$\frac12$ 在 $(1,2)$ 上，
        合起来就是 ==$U(0,2)$==。
        ==先猜出这个结论，再用公式确认，比闷头算稳。==

        **注意与前一道对比**：那里 $X$ 也是连续的均匀分布，
        和是三角形；这里 $X$ 只取两个值，==和反而摊平成了均匀分布==。
        原因是离散的那一支只做了"整体平移"，没有做"叠加平均"。
      `,
      solution: String.raw`
        由独立性，条件"$X=k$"下 $Y$ 的分布不变，故由全概率公式
        $$F_Z(z)=\sum_{k=0}^{1}P(X=k)\,P(Y\le z-k)
        =\frac12F_Y(z)+\frac12F_Y(z-1).$$

        其中 $F_Y(y)=0,\ y,\ 1$ 分别对应 $y<0$、$0\le y<1$、$y\ge1$。分段：

        - **$z<0$**：$F_Z=0$；
        - **$0\le z<1$**：$F_Z(z)=\frac12z+0=\frac z2$；
        - **$1\le z<2$**：$F_Z(z)=\frac12\cdot1+\frac12(z-1)=\frac z2$；
        - **$z\ge2$**：$F_Z=\frac12+\frac12=1$。

        中间两段==拼成了同一个表达式==，故
        $$F_Z(z)=\begin{cases}0,&z<0\\[2pt]\dfrac z2,&0\le z<2\\[6pt]1,&z\ge2\end{cases}
        \qquad
        f_Z(z)=\begin{cases}\dfrac12,&0<z<2\\[6pt]0,&\text{其他}\end{cases}$$

        即 ==$Z\sim U(0,2)$==。
      `,
      comment: String.raw`
        **结论很漂亮但要小心推广**：这里成立是因为两段区间
        $(0,1)$ 与 $(1,2)$ ==恰好首尾相接、不重不漏==。
        若把 $X$ 改成取 $0$ 和 $0.5$，两段就会重叠，
        $f_Z$ 在重叠区变成 $1$、在别处 $\frac12$，==就不是均匀分布了==。
        ==拿到这类题一定要画出各支的区间看是否重叠。==

        **通用套路**（值得记成三步）：

        1. 按离散变量的每个取值 $x_i$ 分类，写 $F_Z(z)=\sum_iP(X=x_i)F_Y(z-x_i)$；
        2. 每一支都是 $F_Y$ 的一个==平移副本==；
        3. 分段点是所有平移副本的分段点的并集，逐段相加。

        **常见变体**：$Z=XY$ 时，$X=0$ 那一支会给出 $P(Z=0)=\frac12$，
        ==$Z$ 变成混合型==，有一个概率原子在 $0$ 处，
        见[混合型](#/probability/random-var/cdf-pdf?at=mixed)。
        乘法比加法更容易产生原子，==看到 $XY$ 且离散变量能取 $0$，先警惕==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '四、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **$\min$ 直接乘分布函数**：==必须先取补==，
         $F_N=1-(1-F_X)(1-F_Y)$，
         见[对偶的用法](#/probability/multi-random-var/function-2d?at=max-min)。
      2. **卷积不做区间求交**：两个"非零条件"必须同时满足，
         ==交集随 $z$ 变化，所以要分段==。
      3. **忘了 $z$ 的分段点**：分段点来自 $\max$、$\min$ 换分支的位置。
      4. **用可加性时忘了独立**：正态、泊松的可加性==都以独立为前提==。
      5. **以为指数、均匀可加**：==它们不可加==，
         两个指数之和是伽马分布，两个均匀之和是三角形分布。
      6. **标准差相加**：正态可加时相加的是==方差==。
      7. **对"一离散一连续"硬找联合密度**：应当按离散取值走全概率。
      8. **不检验归一性**：算完 $f_Z$ 积一遍是最快的自检。
      9. **忽略 $Z$ 可能是混合型**：$g$ 里出现乘积、$\min$、截断时，
         ==可能有概率原子==，此时没有密度。
    ` },

  ],
});
