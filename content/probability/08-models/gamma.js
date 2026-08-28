/* ==========================================================================
   概率论 / 附 分布图鉴 / 伽马分布
   —— 超纲，但它是"指数 → 卡方"这条路上唯一的桥。
   ========================================================================== */

KM.page({
  path: 'probability/models/gamma',
  title: '伽马分布：等到第 k 次',
  subtitle: '把[指数分布](#/probability/models/exponential?at=story)的"等第一次"改成"等第 $k$ 次"。==考研不直接考它，但卡方分布就是它的一个特例==',
  tags: ['概念辨析'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      > **地位**：伽马分布==不在考研大纲内==。
      > 但它是整张[家谱](#/probability/models/overview?at=family-table)的枢纽：
      > **指数、卡方、爱尔朗全是它的特例**，
      > 而[贝塔分布](#/probability/models/beta?at=story)由它构造。
      > 知道这座桥在，第 6 章那三个"凭空出现"的抽样分布就不再突兀。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'birth', c: '一、它是怎么被推出来的' },

    { t: 'key', id: 'story', title: '等到第 $k$ 位顾客：把"时间"翻译回"计数"', c: String.raw`
      设事件按速率 $\lambda$ 的[泊松流](#/probability/models/poisson?at=axioms)发生，
      $T_k=$ 第 $k$ 次发生的时刻。

      **窍门是把等待问题翻译成计数问题**：
      $$T_k>t\iff [0,t]\ \text{内发生的次数不足}\ k\iff N(t)\le k-1$$
      $$P(T_k>t)=\sum_{j=0}^{k-1}\frac{(\lambda t)^{j}}{j!}e^{-\lambda t}$$

      对 $t$ 求导（每一项求导出两块，==相邻项望远镜式地相消==，只剩最后一项）：
      $$\boxed{\ f_{T_k}(t)=\frac{\lambda^{k}}{(k-1)!}\,t^{k-1}e^{-\lambda t},\qquad t>0\ }$$

      这就是**伽马分布** $\Gamma(k,\lambda)$，
      整数 $k$ 时也叫==爱尔朗分布==（丹麦工程师爱尔朗研究电话交换机排队时得到的）。

      **另一个等价说法**：
      $$T_k=Y_1+Y_2+\cdots+Y_k,\qquad Y_i\sim E(\lambda)\ \text{独立}$$
      ==等第 $k$ 次 $=$ 等第一次、再等下一次、…… 重复 $k$ 段==，
      每段由[无记忆性](#/probability/models/exponential?at=memoryless)都是全新的指数分布。
      $k=1$ 时退回指数分布。
    ` },

    { t: 'key', id: 'gamma-function', title: '把 $k$ 从整数解放出来：$\\Gamma$ 函数', c: String.raw`
      分母的 $(k-1)!$ 只对整数有意义。换成
      $$\Gamma(\alpha)=\int_0^{+\infty}x^{\alpha-1}e^{-x}\dx\qquad(\alpha>0)$$
      $\alpha$ 就可以取任意正实数：
      $$f(x)=\frac{\lambda^{\alpha}}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda x},\qquad x>0.$$

      **$\Gamma$ 函数的三条必备性质**：

      | 性质 | 说明 |
      |---|---|
      | $\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$ | ==分部积分一步得到==，阶乘的递推 |
      | $\Gamma(n)=(n-1)!$ | 由 $\Gamma(1)=1$ 递推 |
      | ==$\Gamma\!\left(\frac12\right)=\sqrt\pi$== | 换元后就是[高斯积分](#/calculus/multi-integral/separable?at=gauss-family) |

      ==$\Gamma$ 函数存在的全部理由就是"给阶乘补上非整数点"==。
      而 $\Gamma\!\left(\frac12\right)=\sqrt\pi$ 这个半整数值极其重要：
      **[卡方分布](#/probability/models/chi2?at=density)的自由度之所以可以是奇数，靠的正是它。**

      **一个立刻能用的副产品**：
      $$\int_0^{+\infty}x^{n}e^{-\lambda x}\dx=\frac{n!}{\lambda^{n+1}}$$
      ==这条能省掉大量分部积分==，算指数分布的高阶矩时直接套。
    ` },

    { t: 'key', id: 'moments', title: '数字特征：由"指数之和"一眼看出', c: String.raw`
      $$\E X=\frac{\alpha}{\lambda},\qquad \Var X=\frac{\alpha}{\lambda^{2}}$$

      整数 $\alpha=k$ 时理由不用算：==$k$ 个独立 $E(\lambda)$ 相加==，
      期望与方差各自相加即可（$\frac1\lambda$ 与 $\frac{1}{\lambda^{2}}$ 各 $k$ 份）。

      **两个参数的分工**：
      $\alpha$ 叫**形状参数**（决定图像的胖瘦与是否单峰），
      $\lambda$ 叫**尺度参数**（只负责横轴的伸缩）。

      | $\alpha$ | 图像 |
      |---|---|
      | $\alpha<1$ | 在 $0$ 处发散，单调递减 |
      | $\alpha=1$ | ==指数分布==，从 $\lambda$ 单调降 |
      | $\alpha>1$ | ==先升后降==，峰值在 $\frac{\alpha-1}{\lambda}$ |
      | $\alpha$ 很大 | 趋于[正态](#/probability/models/normal?at=clt)（中心极限定理） |

      **可加性**：$\Gamma(\alpha_1,\lambda)+\Gamma(\alpha_2,\lambda)=\Gamma(\alpha_1+\alpha_2,\lambda)$（独立时）。
      ==注意 $\lambda$ 必须相同==——形状参数可加，尺度参数不可加。
      理由还是那句："把两段等待接起来"。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'relations', c: '二、它连着哪些分布' },

    { t: 'key', id: 'to-chi2', title: '★ 卡方分布就是它的一个特例', c: String.raw`
      $$\boxed{\ \chi^{2}(n)=\Gamma\!\left(\frac n2,\ \frac12\right)\ }$$

      对照两个密度：
      $$f_{\Gamma}(x)=\frac{\lambda^{\alpha}}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda x}
      \quad\xrightarrow{\ \alpha=\frac n2,\ \lambda=\frac12\ }\quad
      \frac{1}{2^{n/2}\Gamma\!\left(\frac n2\right)}x^{\frac n2-1}e^{-\frac x2}
      =f_{\chi^{2}(n)}(x).$$
      ==它们本来就是同一个分布，只是统计学给了它另一个名字和另一套记号。==

      这条对应立刻解释了三件在第 6 章看起来要死记的事：

      | 卡方的事实 | 伽马的解释 |
      |---|---|
      | $\E\chi^{2}=n$，$\Var\chi^{2}=2n$ | 代入 $\frac\alpha\lambda$、$\frac{\alpha}{\lambda^{2}}$ |
      | ==自由度可加== | 就是伽马的形状参数可加 |
      | $\chi^{2}(2)=E\!\left(\frac12\right)$ | $\alpha=1$ 时伽马就是指数 |

      详见[卡方分布](#/probability/models/chi2?at=density)那一页。
    ` },

    { t: 'key', id: 'family', title: '伽马家族总览', c: String.raw`
      | 参数 | 得到 | 场景 |
      |---|---|---|
      | $\alpha=1$ | ==[指数 $E(\lambda)$](#/probability/models/exponential?at=story)== | 等第一次 |
      | $\alpha=k$ 整数 | 爱尔朗分布 | 等第 $k$ 次 |
      | $\alpha=\frac n2,\lambda=\frac12$ | ==[卡方 $\chi^{2}(n)$](#/probability/models/chi2?at=story)== | 正态平方和 |
      | $\alpha$ 大 | 近似正态 | 中心极限定理 |
      | $\frac{X}{X+Y}$（两个独立伽马） | ==[贝塔分布](#/probability/models/beta?at=from-gamma)== | 比例 |
      | 混合泊松的参数 | [负二项](#/probability/models/negative-binomial?at=in-exam) | 过度离散的计数 |

      ==这张表就是伽马分布在本章的全部价值==：
      它不直接考，但它把六个分布串成了一家人。
    ` },

    { t: 'warn', id: 'pitfalls', title: '注意事项', c: String.raw`
      1. **答题时不要直接引用**：==超纲==。
         需要用到"$k$ 个指数之和"时，老实写成卷积或用[可加性](#/probability/multi-random-var/function-2d?at=stable-families)论证；
      2. **两种参数化**：有的书用 $\theta=\frac1\lambda$（尺度），
         写作 $\frac{1}{\Gamma(\alpha)\theta^{\alpha}}x^{\alpha-1}e^{-x/\theta}$，
         ==期望就成了 $\alpha\theta$==。看到就先辨认 $\lambda$ 是速率还是尺度；
      3. **可加性要求 $\lambda$ 相同**：形状参数才相加；
      4. **$\Gamma(\alpha)$ 与 $\Gamma(\alpha,\lambda)$ 是两码事**：
         一个是函数，一个是分布，==记号撞车但含义无关==。
    ` },

  ],
});
