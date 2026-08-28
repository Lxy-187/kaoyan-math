/* ==========================================================================
   概率论 / 附 分布图鉴 / 正态分布
   —— 全章的核心。三条独立的来路，说明这个形状别无选择。
   ========================================================================== */

KM.page({
  path: 'probability/models/normal',
  title: '正态分布：三次被独立发现',
  subtitle: '$\\frac{1}{\\sqrt{2\\pi}\\sigma}e^{-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}}$ 是全课最"不像人写得出来"的公式。==但它不是被设计的，是被三个毫不相干的问题分别逼出来的==',
  tags: ['小题', '大题', '高频'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      $$f(x)=\frac{1}{\sqrt{2\pi}\,\sigma}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}},\qquad x\in\R$$

      三个问题必须回答：**为什么是指数？为什么指数上是平方？那个 $\sqrt{2\pi}$ 从哪来？**

      下面三节各走一条完全不同的路，==而三条路给出同一个形状==。
      任何一条走通，都足以说明这个密度别无选择——
      **这就是"正态"（normal，常态）这个名字的底气。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'story', c: '一、三条来路' },

    { t: 'key', id: 'demoivre', title: '第一次：棣莫弗要算二项分布的中间那一项（1733）', c: String.raw`
      抛 $n$ 次均匀硬币，$P(X=k)=\binom nk2^{-n}$。$n$ 一大组合数就没法算了。
      棣莫弗想知道==这堆概率的整体形状==，于是盯住相邻两项的比值。

      记 $a_d=P\!\left(X=\frac n2+d\right)$（$d$ 是离中心的偏移）：
      $$\frac{a_{d+1}}{a_d}=\frac{\frac n2-d}{\frac n2+d+1}.$$
      取对数，用 $\ln(1\pm u)\approx\pm u$（$\abs d\ll n$）：
      $$\ln a_{d+1}-\ln a_d\approx
      \ln\!\left(1-\frac{2d}{n}\right)-\ln\!\left(1+\frac{2d}{n}\right)\approx-\frac{4d}{n}.$$

      **关键一步**：把 $d$ 从 $0$ 累加，右端是等差数列求和，
      $$\ln a_d-\ln a_0\approx-\frac4n\sum_{j=0}^{d-1}j\approx-\frac{2d^{2}}{n}
      \ \Longrightarrow\ a_d\approx a_0\,e^{-2d^{2}/n}.$$

      ==指数上的平方就是这么来的==：**一阶差分正比于 $d$，累加起来自然出平方**。
      而 $B\!\left(n,\frac12\right)$ 的方差 $\sigma^{2}=\frac n4$，
      代入得 $\frac{2d^{2}}{n}=\frac{d^{2}}{2\sigma^{2}}$——==指数上那个 $2\sigma^{2}$ 现身了==。

      **连常数都不是凑的**：用斯特林公式 $n!\sim\sqrt{2\pi n}\left(\frac ne\right)^{n}$ 算中心项，
      $$a_0=\binom{n}{n/2}2^{-n}\approx\sqrt{\frac{2}{\pi n}}=\frac{1}{\sqrt{2\pi}\,\sigma}.$$

      $$a_d\approx\frac{1}{\sqrt{2\pi}\,\sigma}e^{-\frac{d^{2}}{2\sigma^{2}}}$$
      ==正态密度的每一个零件，都是从二项分布里掉出来的。==

      后来拉普拉斯把它推广到一般的 $p$，
      就是[棣莫弗–拉普拉斯定理](#/probability/lln-clt/clt?at=demoivre)。
      ==注意它比中心极限定理早了近一百年——正态最初只是二项分布的计算工具。==
    ` },

    { t: 'key', id: 'herschel', title: '第二次：射击的误差应该长什么样（赫歇尔–麦克斯韦）', c: String.raw`
      这条路最能说明"形状别无选择"，==而且全程不需要取极限==。

      **场景**：往靶心射击，落点 $(X,Y)$，误差纯属偶然。只提两个要求：

      1. ==两个坐标方向的误差相互独立==；
      2. ==概率只与到靶心的距离有关==（没有哪个方向更容易偏，即各向同性）。

      写成式子：$X,Y$ 同分布、密度为 $f$，则联合密度只能依赖 $x^{2}+y^{2}$：
      $$f(x)f(y)=g\bigl(x^{2}+y^{2}\bigr).$$

      **解它**：令 $y=0$ 得 $g(x^{2})=f(x)f(0)$；代回去取对数，记 $\varphi(u)=\ln f(\sqrt u)$：
      $$\varphi(x^{2})+\varphi(y^{2})=\varphi(x^{2}+y^{2})+\text{常数}.$$
      ==这是柯西函数方程==，连续解只能是线性的：$\varphi(u)=A+Cu$，于是
      $$f(x)=e^{A}e^{Cx^{2}}.$$
      要 $\int f=1$ 必须 $C<0$，写成 $C=-\frac{1}{2\sigma^{2}}$，==正态密度就出来了==。

      **这段推导说了一件很强的事**：
      只要"两方向独立"与"各向同性"同时成立，==密度就必须是 $e^{-cx^{2}}$，别的形状一概不行==。

      $x^{2}+y^{2}$ 是唯一同时兼容"可分离"（独立）与"只看半径"（对称）的组合——
      这也正是[高斯积分](#/calculus/multi-integral/separable?at=gauss-steps)那一招能成立的原因：
      ==$e^{-x^{2}}e^{-y^{2}}=e^{-r^{2}}$，同一条性质，一次用来解方程，一次用来算积分。==

      **它还预告了第 6 章**：$n$ 个独立标准正态的联合密度只依赖长度、不依赖方向，
      这个各向同性是[卡方分布](#/probability/models/chi2?at=picture)全部推导的钥匙。
    ` },

    { t: 'key', id: 'clt', title: '第三次：正态是加法运算的吸引子', c: String.raw`
      前两条是"算出来"的。第三条解释==为什么现实世界里到处都是正态==。

      **中心极限定理**：大量独立的、每个都很小的随机因素之和，
      不论各自服从什么分布，标准化后都趋于 $N(0,1)$，
      见[列维–林德伯格定理](#/probability/lln-clt/clt?at=clt-statement)。

      **为什么终点偏偏是正态**：正态对加法==封闭==——
      两个独立正态之和还是正态（[可加分布族](#/probability/multi-random-var/function-2d?at=stable-families)）。
      也就是说，==在"不断相加"这个运算下，正态是一个不动点==；
      而中心极限定理进一步说，它还是==吸引子==：
      从任何分布出发，反复相加再压缩尺度，都会被吸到它上面。

      | 出发点 | 反复做什么 | 极限 |
      |---|---|---|
      | 任意分布（方差有限） | ==相加加标准化== | $N(0,1)$ |
      | $B(n,p)$，$p$ 固定 | 增大 $n$ | $N(np,npq)$ |
      | $B(n,p)$，$np=\lambda$ 固定 | 增大 $n$ | ==[泊松](#/probability/models/poisson?at=route-limit)== |

      ==同样是 $n\to\infty$，"固定谁"决定流向哪里==——
      这就是[两条近似路线](#/probability/models/binomial?at=two-limits)分工的根源。

      **一句总结**：==身高、误差、噪声之所以是正态，不是因为它们有什么共性，
      恰恰是因为它们没有共性==——每个都是大量互不相干的小因素叠出来的，
      而"叠加"这个动作本身就会抹掉个性，只留下正态。

      **也要知道它的边界**：方差必须有限。
      [柯西分布](#/probability/models/cauchy?at=no-clt)的和永远不会趋于正态，
      因为它连期望都没有。
    ` },

    { t: 'key', id: 'constant', title: '那个 $\\sqrt{2\\pi}$ 到底是谁', c: String.raw`
      归一化常数由
      $$\int_{-\infty}^{+\infty}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}\dx=\sqrt{2\pi}\,\sigma$$
      决定，归根到底是[高斯积分](#/calculus/multi-integral/separable?at=gauss-family)
      $\int_{-\infty}^{+\infty}e^{-t^{2}}\dt=\sqrt\pi$。

      **一个值得停一停的巧合**：$\sqrt{2\pi}$ 在两条路上分别出现过——
      [棣莫弗那条路](#/probability/models/normal?at=demoivre)里它来自==斯特林公式==，
      这里它来自==极坐标下那个 $2\pi$==。
      ==它们其实是同一个 $2\pi$==：斯特林公式的证明本身就要用高斯积分。

      **为什么圆周率会出现在一个和圆无关的地方**：
      因为[各向同性那条路](#/probability/models/normal?at=herschel)——
      ==正态密度的本质是平面上的各向同性，而各向同性就是圆==。

      **实用提醒**：算 $\E X$、$\Var X$、二维正态的边缘密度时，
      ==遇到"$e$ 的负二次式次方"的积分，先配方再套这条公式，不要硬积==，
      见[高斯积分在概率论里的用武之地](#/calculus/multi-integral/separable?at=downstream)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'props', c: '二、性质与计算' },

    { t: 'key', id: 'params', title: '两个参数各管什么', c: String.raw`
      $$\E X=\mu,\qquad \Var X=\sigma^{2}$$

      - $\mu$ 是==对称轴的位置==，同时是期望、中位数、众数（==三者重合是正态的特点==）；
      - $\sigma$ 管==胖瘦==：$\sigma$ 越大越矮胖越分散。
        ==曲线在 $x=\mu\pm\sigma$ 处有拐点==——这是 $\sigma$ 的图像含义，
        对密度求二阶导即可验证。

      **期望方差怎么算出来的**：作代换 $t=\frac{x-\mu}{\sigma}$，
      $$\E X=\int(\mu+\sigma t)\frac{1}{\sqrt{2\pi}}e^{-t^{2}/2}\dt=\mu$$
      （==奇函数那部分积分为零==），
      $$\Var X=\sigma^{2}\int t^{2}\frac{1}{\sqrt{2\pi}}e^{-t^{2}/2}\dt=\sigma^{2}$$
      （分部积分或直接查[高斯积分族](#/calculus/multi-integral/separable?at=gauss-family)）。
      =="先标准化再积"是所有正态积分的通用第一步。==
    ` },

    { t: 'key', id: 'standardize', title: '★ 标准化：一切正态计算的唯一动作', c: String.raw`
      $$X\sim N(\mu,\sigma^{2})\ \Longrightarrow\ Z=\frac{X-\mu}{\sigma}\sim N(0,1)$$
      $$P(a<X\le b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)$$

      ==正态分布的计算题只有这一步，剩下的全是查表。==

      **标准正态的三条必备性质**：

      1. **对称性**：$\varphi(-x)=\varphi(x)$，故
         $$\boxed{\ \Phi(-x)=1-\Phi(x)\ },\qquad \Phi(0)=\tfrac12$$
         ==表里只给 $x>0$ 的值，负数一律靠这条翻过去==；
      2. **对称区间**：$P(\abs Z\le a)=2\Phi(a)-1$；
      3. **$3\sigma$ 法则**：
         $$P(\abs{X-\mu}<\sigma)\approx0.6826,\quad
         P(\abs{X-\mu}<2\sigma)\approx0.9545,\quad
         P(\abs{X-\mu}<3\sigma)\approx0.9973$$
         ==工业上"超出 $3\sigma$ 就认为异常"就是这么来的==：正常情况下只有千分之三的机会。
    ` },

    { t: 'key', id: 'linear', title: '★ 线性变换与可加性：正态族的封闭性', c: String.raw`
      $$X\sim N(\mu,\sigma^{2}),\ a\ne0\ \Longrightarrow\ aX+b\sim N(a\mu+b,\ a^{2}\sigma^{2})$$
      ==方差乘的是 $a^{2}$==，所以 $a<0$ 时结果仍是正态（负号被平方吃掉了）。

      $$X\sim N(\mu_1,\sigma_1^{2}),\ Y\sim N(\mu_2,\sigma_2^{2})\ \textbf{独立}
      \ \Longrightarrow\ X\pm Y\sim N(\mu_1\pm\mu_2,\ \sigma_1^{2}+\sigma_2^{2})$$
      ==注意是 $X-Y$ 时方差仍然相加==，这是最高频的符号错误。

      **这条封闭性是[抽样分布](#/probability/models/chi2?at=picture)整套理论的前提**：
      $\bar X$ 是样本的线性组合，所以正态总体的 $\bar X$ 仍是正态。

      **但要小心一个陷阱**：
      =="独立"不能省==。两个边缘正态但不独立时，和未必是正态，
      见[边缘正态推不出联合正态](#/probability/multi-random-var/normal-2d?at=marginal-not-enough)。
      更完整的讨论在[多维正态](#/probability/models/multinormal?at=linear)那一页。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '三、例题' },

    { t: 'example',
      id: 'ex-normal-calc',
      title: '标准化 + 对称性：正态计算题的全部',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $X\sim N(10,4)$，已知 $\Phi(1)=0.8413$，$\Phi(2)=0.9772$，$\Phi(1.5)=0.9332$。

        1. 求 $P(8<X<14)$；
        2. 求 $P(X>13)$；
        3. 求常数 $c$，使 $P(X>c)=0.9332$。
      `,
      idea: String.raw`
        $\sigma=\sqrt4=2$，==别把方差当标准差==，这是本题唯一的坑。

        - 1、2 问直接标准化后查表，==负数用 $\Phi(-x)=1-\Phi(x)$ 翻过去==；
        - 第 3 问是反问：$P(X>c)=0.9332>\frac12$ 说明 ==$c$ 在均值左边==，
          标准化后的分位点是负的。
          先写 $P\!\left(Z>\frac{c-10}{2}\right)=0.9332$，
          即 $\Phi\!\left(\frac{c-10}{2}\right)=1-0.9332=0.0668$，
          再用对称性把它翻成 $\Phi(1.5)=0.9332$，得 $\frac{c-10}{2}=-1.5$。
      `,
      solution: String.raw`
        $X\sim N(10,2^{2})$，令 $Z=\frac{X-10}{2}\sim N(0,1)$。

        **(1)**
        $$P(8<X<14)=P(-1<Z<2)=\Phi(2)-\Phi(-1)=\Phi(2)-\bigl(1-\Phi(1)\bigr)$$
        $$=0.9772-1+0.8413=\boxed{0.8185}.$$

        **(2)**
        $$P(X>13)=P(Z>1.5)=1-\Phi(1.5)=1-0.9332=\boxed{0.0668}.$$

        **(3)** 由 $P(X>c)=0.9332$ 得
        $$1-\Phi\!\left(\frac{c-10}{2}\right)=0.9332\ \Longrightarrow\
        \Phi\!\left(\frac{c-10}{2}\right)=0.0668=1-\Phi(1.5),$$
        故 $\frac{c-10}{2}=-1.5$，$c=\boxed{7}$。
      `,
      comment: String.raw`
        **三个必须形成条件反射的动作**：
        看到 $N(\mu,\sigma^{2})$ 先开根号取 $\sigma$；
        看到负的标准化值就用 $\Phi(-x)=1-\Phi(x)$；
        看到概率大于 $\frac12$ 就知道分位点在均值哪一侧。

        **一个自查方法**：算完回头看合理性。
        第 3 问答案 $c=7$ 在均值 $10$ 左边，
        ==而"大于 $7$"的概率确实应该超过一半==。$\checkmark$
      `,
    },

    { t: 'example',
      id: 'ex-normal-combine',
      title: '线性组合：把新变量的 $\\mu,\\sigma^{2}$ 算出来就完事',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $X\sim N(1,4)$，$Y\sim N(2,9)$，且 $X,Y$ 相互独立。

        1. 求 $Z=2X-Y+3$ 的分布；
        2. 求 $P(Z>0)$（$\Phi(0.6)=0.7257$）；
        3. 若 $X_1,\dots,X_{16}$ 是来自 $N(1,4)$ 的简单随机样本，求 $\bar X$ 的分布。
      `,
      idea: String.raw`
        [线性封闭性](#/probability/models/normal?at=linear)说结果一定还是正态，
        ==所以全部工作就是算出新的 $\mu$ 和 $\sigma^{2}$==，一步都不用积分。

        - 期望是线性的：$\E Z=2\E X-\E Y+3$；
        - 方差==常数不影响、系数要平方、独立才能相加==：
          $\Var Z=4\Var X+\Var Y$（==注意 $-Y$ 的系数平方后是 $+1$==）；
        - 第 3 问是[样本均值](#/probability/statistics/sampling?at=xbar-props)：
          $\bar X=\frac1n\sum X_i$，系数 $\frac1n$ 平方后是 $\frac{1}{n^{2}}$，
          $n$ 项相加得 $\frac{\sigma^{2}}{n}$。
      `,
      solution: String.raw`
        **(1)**
        $$\E Z=2\times1-2+3=3,\qquad
        \Var Z=2^{2}\times4+(-1)^{2}\times9=16+9=25,$$
        故 $Z\sim\boxed{N(3,25)}$。

        **(2)**
        $$P(Z>0)=P\!\left(\frac{Z-3}{5}>\frac{0-3}{5}\right)=P(W>-0.6)=\Phi(0.6)=\boxed{0.7257}.$$

        **(3)** $\bar X\sim N\!\left(1,\dfrac{4}{16}\right)=\boxed{N(1,0.25)}$，即标准差为 $0.5$。
      `,
      comment: String.raw`
        **两个高频错误**：

        - $\Var(2X-Y)$ 写成 $2\Var X-\Var Y$。==正确的是 $4\Var X+\Var Y$==：
          系数要平方，减法的方差也是相加；
        - $\bar X$ 的方差写成 $\sigma^{2}$ 或 $n\sigma^{2}$。==是 $\frac{\sigma^{2}}{n}$==，
          样本越多，均值越稳——这是[大数定律](#/probability/lln-clt/lln?at=examples)的直接体现。

        **第 3 问是第 6 章的入口**：
        $\bar X\sim N\!\left(\mu,\frac{\sigma^{2}}{n}\right)$ 就是[正态总体四条定理](#/probability/statistics/distributions?at=normal-four)的第一条，
        而它成立的全部理由就是本页的[线性封闭性](#/probability/models/normal?at=linear)。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls-sec', c: '四、易错清单' },

    { t: 'warn', id: 'pitfalls', title: '这个模型的固定失分点', c: String.raw`
      1. **把 $\sigma^{2}$ 当成 $\sigma$**：$N(10,4)$ 的标准差是 $2$，
         ==标准化时除的是 $2$ 不是 $4$==；
      2. **$\Phi(-x)$ 写成 $-\Phi(x)$**：正确的是 ==$1-\Phi(x)$==；
      3. **线性变换的方差**：$aX+b$ 的方差是 $a^{2}\sigma^{2}$，
         ==不是 $a\sigma^{2}$，也不加 $b$==；
      4. **$X-Y$ 的方差写成相减**：独立时==方差永远相加==；
      5. **可加性忘了"独立"**：不独立时和未必是正态，
         见[反例](#/probability/multi-random-var/normal-2d?at=ex-counterexample)；
      6. **$\bar X$ 的方差**：是 $\frac{\sigma^{2}}{n}$；
      7. **拿中心极限定理去套无穷方差的分布**：
         ==[柯西分布](#/probability/models/cauchy?at=no-clt)不满足条件==，它的均值永远不收敛。
    ` },

  ],
});
