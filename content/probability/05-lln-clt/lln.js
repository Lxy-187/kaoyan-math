/* ==========================================================================
   概率论 / 5 大数定律与中心极限定理 / 切比雪夫不等式与大数定律
   —— 回答"为什么频率能代替概率、平均值能代替期望"。
      正态近似（分布层面的结论）见 lln-clt/clt。
   ========================================================================== */

KM.page({
  path: 'probability/lln-clt/lln',
  title: '切比雪夫不等式与大数定律',
  subtitle: '大数定律说的是**平均值会稳定下来**：$\\frac1n\\sum X_i$ 依概率收敛到 $\\E X$——整个数理统计的立身之本',
  tags: ['小题', '概念辨析', '高频'],
  updated: '2026-08-20',

  blocks: [

    { t: 'md', c: String.raw`
      前四章都在研究==一个==（或几个）随机变量。
      这一章第一次让 $n\to\infty$，问的是：
      **大量随机变量放在一起，会不会浮现出确定性？**

      答案分两个层次，也就是本章的两页：

      | | 收敛到什么 | 回答的问题 |
      |---|---|---|
      | **大数定律**（本页） | 收敛到==一个数== $\mu$ | 平均值稳不稳得住 |
      | [**中心极限定理**](#/probability/lln-clt/clt?at=clt-statement) | 收敛到==一个分布== $N(0,1)$ | 稳定下来之后，波动长什么样 |

      ==大数定律说"往哪儿去"，中心极限定理说"怎么去"==。
      前者只保证误差趋于零，后者进一步说明误差大约有多大——
      所以真正能拿来算概率的是后者，本页则是概念题的主场。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'chebyshev-sec', c: '一、切比雪夫不等式' },

    { t: 'key', id: 'chebyshev', title: '只用期望和方差就能框住概率', c: String.raw`
      设 $\E X=\mu$，$\Var X=\sigma^{2}$ 存在，则对任意 $\varepsilon>0$
      $$\boxed{\ P\bigl(\abs{X-\mu}\ge\varepsilon\bigr)\le\frac{\sigma^{2}}{\varepsilon^{2}}\ }$$
      等价形式
      $$P\bigl(\abs{X-\mu}<\varepsilon\bigr)\ge1-\frac{\sigma^{2}}{\varepsilon^{2}}.$$

      **它凭什么成立（一行）**：
      $$\sigma^{2}=\int(x-\mu)^{2}f(x)\dx
      \ \ge\ \int_{\abs{x-\mu}\ge\varepsilon}(x-\mu)^{2}f(x)\dx
      \ \ge\ \varepsilon^{2}\!\!\int_{\abs{x-\mu}\ge\varepsilon}\!\!f(x)\dx
      =\varepsilon^{2}P\bigl(\abs{X-\mu}\ge\varepsilon\bigr).$$
      ==第一个不等号是"只留下一部分积分区域"，第二个是"把被积函数换成它的下界"==。
      两步都极粗糙，这正是下面那条"界很松"的根源。

      **它的价值在于普适**：
      ==不需要知道 $X$ 服从什么分布==，只要有期望和方差就能用。
      代价是结论很弱——
      这是概率论里"信息越少、结论越松"的典型例子。
    ` },

    { t: 'key', id: 'chebyshev-loose', title: '这个界有多松：和 $3\\sigma$ 法则对比一下', c: String.raw`
      取 $\varepsilon=k\sigma$，切比雪夫给出
      $$P\bigl(\abs{X-\mu}\ge k\sigma\bigr)\le\frac{1}{k^{2}}.$$

      | $k$ | 切比雪夫的上界 | 若 $X$ 是正态，真实值 |
      |---|---|---|
      | $1$ | $1$（==等于没说==） | $0.3174$ |
      | $2$ | $0.25$ | $0.0455$ |
      | $3$ | $0.1111$ | ==$0.0027$== |

      ==正态分布下真实值比切比雪夫的界小几十倍==。

      **所以怎么用它**：

      - 题目==没告诉你分布==时，它是唯一能用的工具；
      - 题目==告诉你是正态==时，==老老实实标准化查表==，别用切比雪夫，
        否则算出的界会松到毫无意义（还可能与选项对不上）。

      **另一个用途更重要**：它是[证明大数定律](#/probability/lln-clt/lln?at=lln-three)的工具。
      $\Var\bar X=\frac{\sigma^{2}}{n}\to0$ 时，
      切比雪夫的右端 $\frac{\sigma^{2}}{n\varepsilon^{2}}\to0$，==结论就出来了==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'convergence', c: '二、依概率收敛' },

    { t: 'key', id: 'convergence-p', title: '定义：不是"越来越接近"，而是"偏离的概率越来越小"', c: String.raw`
      称 $Y_n$ **依概率收敛**于 $a$，记 $Y_n\xrightarrow{\ P\ }a$，若对任意 $\varepsilon>0$
      $$\lim_{n\to\infty}P\bigl(\abs{Y_n-a}\ge\varepsilon\bigr)=0
      \qquad\text{等价于}\qquad
      \lim_{n\to\infty}P\bigl(\abs{Y_n-a}<\varepsilon\bigr)=1.$$

      **和高数里的收敛差在哪**：
      $$\underbrace{\forall\varepsilon\ \exists N\ \forall n>N:\ \abs{y_n-a}<\varepsilon}_{\text{数列收敛：从某项起**一定**在管子里}}
      \quad\text{vs}\quad
      \underbrace{P(\abs{Y_n-a}\ge\varepsilon)\to0}_{\text{依概率：跑出管子的**概率**趋于零}}$$

      ==依概率收敛允许"偶尔跑出去"，只要求跑出去这件事越来越罕见==。
      $Y_n$ 是随机变量，对每一个 $n$ 它都可能取到离 $a$ 很远的值，
      只是那种情形的概率在衰减。

      **一条很好用的性质**：$g$ 连续时
      $$Y_n\xrightarrow{\ P\ }a\ \Longrightarrow\ g(Y_n)\xrightarrow{\ P\ }g(a).$$
      ==这条是[矩估计相合性](#/probability/estimation/evaluation?at=consistency)的依据==，
      也让"$\bar X\xrightarrow{P}\mu\Rightarrow\bar X^{2}\xrightarrow{P}\mu^{2}$"这类推理合法。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'laws', c: '三、三个大数定律' },

    { t: 'compare',
      id: 'lln-three',
      title: '条件对照表：区别全在「要不要独立同分布」「要不要方差」',
      cols: ['名称', '对 $X_i$ 的要求', '结论', '记忆点'],
      rows: [
        ['**切比雪夫**', '两两==不相关==，方差有共同上界 $C$', '$\\frac1n\\sum X_i-\\frac1n\\sum\\E X_i\\xrightarrow{P}0$', '最弱的独立性，但==必须有方差=='],
        ['**伯努利**', '$n$ 重伯努利试验，$n_A$ 为 $A$ 发生次数', '$\\frac{n_A}{n}\\xrightarrow{P}p$', '==频率稳定到概率==，切比雪夫的特例'],
        ['**辛钦**', '独立==同分布==，$\\E X_i=\\mu$ 存在', '$\\frac1n\\sum X_i\\xrightarrow{P}\\mu$', '==不要求方差存在==，最常用'],
      ] },

    { t: 'key', id: 'which-lln', title: '选哪一个：看题目给了什么', c: String.raw`
      三条定律==不是三种结论，是同一个结论的三种前提==。
      做题时按下面这条链子往下走：

      1. 题目说"**独立同分布**"$\Rightarrow$ ==辛钦==（哪怕方差存在也用它，条件最省）；
      2. 题目只说"**两两不相关 / 相互独立**"但==分布各不相同==
         $\Rightarrow$ 切比雪夫，此时要==检查方差是否一致有界==；
      3. 题目在数"某事件发生了多少次"$\Rightarrow$ 伯努利。

      **考研里的典型陷阱**：给一列独立但**不同分布**的 $X_i$，
      问能否用辛钦大数定律。==不能，辛钦要求同分布==。
      反过来，给一列同分布但方差不存在的（比如柯西分布），
      问能否用切比雪夫大数定律，==也不能，切比雪夫要方差==。

      ==选择题几乎全考在"抽掉一个前提还成不成立"上。==

      **辛钦定律最重要的推论**（$g$ 连续、$\E g(X_1)$ 存在）：
      $$\frac1n\sum_{i=1}^{n}g(X_i)\ \xrightarrow{\ P\ }\ \E\bigl[g(X_1)\bigr]$$
      取 $g(x)=x^{k}$ 就得到==样本 $k$ 阶矩依概率收敛到总体 $k$ 阶矩==——
      这一行==就是[矩估计法](#/probability/estimation/point?at=moment-why)的全部理论依据==。
    ` },

    { t: 'key', id: 'lln-meaning', title: '大数定律到底说了什么、没说什么', c: String.raw`
      **说了**：$n$ 足够大时，样本平均值 $\bar X$ ==几乎肯定==落在 $\mu$ 附近任意小的邻域内。
      于是"用平均值估计期望""用频率估计概率"==在理论上站得住脚==。

      **没说**：

      - ==没说 $\bar X$ 会等于 $\mu$==，只说偏离超过 $\varepsilon$ 的概率趋于零；
      - ==没说偏离有多大==。要回答"$\bar X$ 与 $\mu$ 大约差多少"，
        必须用[中心极限定理](#/probability/lln-clt/clt?at=sum-vs-mean)，
        它给出偏离的量级是 $\frac{\sigma}{\sqrt n}$；
      - ==没说单次试验会被"补偿"==。
        抛硬币连出十次正面，后面并不会更容易出反面（各次[独立](#/probability/events/independence?at=def-indep)）；
        频率回到 $\frac12$ 靠的是==后面海量的试验把这十次稀释掉==，不是靠反向修正。

      最后一条是"赌徒谬误"的来源，==也是本章唯一会考直觉的地方==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-chebyshev',
      title: '不知道分布时，用切比雪夫框一个界',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设随机变量 $X$ 的期望 $\E X=10$，方差 $\Var X=0.04$，
        用切比雪夫不等式估计 $P(9.5<X<10.5)$。
      `,
      idea: String.raw`
        **注意题目没给分布**——这就是切比雪夫的适用信号。
        如果给了"$X\sim N(10,0.04)$"，就该老老实实标准化查表，
        ==那样得到的是 $0.9876$，比切比雪夫的界精确得多==。

        **动作**：把待求的事件改写成 $\abs{X-\E X}<\varepsilon$ 的形式。
        $$9.5<X<10.5\iff-0.5<X-10<0.5\iff\abs{X-10}<0.5,$$
        ==读出 $\varepsilon=0.5$==，代公式即可。

        **方向别搞反**：切比雪夫给的是 $P(\abs{X-\mu}\ge\varepsilon)$ 的**上界**，
        所以 $P(\abs{X-\mu}<\varepsilon)$ 得到的是**下界**。
        ==题目问"估计"，答案应当写成"$\ge$ 某个数"。==
      `,
      solution: String.raw`
        取 $\varepsilon=0.5$。由切比雪夫不等式
        $$P\bigl(\abs{X-10}\ge0.5\bigr)\le\frac{\Var X}{\varepsilon^{2}}=\frac{0.04}{0.25}=0.16,$$
        故
        $$P(9.5<X<10.5)=P\bigl(\abs{X-10}<0.5\bigr)\ge1-0.16=\boxed{0.84}.$$
      `,
      comment: String.raw`
        **和真实值差多远**：若 $X\sim N(10,0.2^{2})$，则 $\varepsilon=0.5=2.5\sigma$，
        $$P(\abs{X-10}<0.5)=2\Phi(2.5)-1\approx0.9876.$$
        ==切比雪夫说"至少 $0.84$"，实际是 $0.99$==——界确实很松，但它==没错==，
        而且它在不知道分布时是唯一可用的。

        **这类题的固定套路**：

        1. 从待求区间读出 $\mu$ 和 $\varepsilon$（==$\varepsilon$ 是区间半长==）；
        2. 代 $\frac{\sigma^{2}}{\varepsilon^{2}}$；
        3. 用 $1-$ 它，写成"$\ge$"。

        **常见变体（反着问）**：
        "要使 $P(\abs{X-\mu}<\varepsilon)\ge0.95$，$\varepsilon$ 至少取多大？"
        令 $1-\frac{\sigma^{2}}{\varepsilon^{2}}\ge0.95$，解得 $\varepsilon\ge\frac{\sigma}{\sqrt{0.05}}$。
        ==同一个不等式，换个未知数而已。==
      `,
    },

    { t: 'example',
      id: 'ex-lln-apply',
      title: '辛钦大数定律用在 $g(X_i)$ 上',
      source: '标准例题（概念型）',
      level: 3,
      problem: String.raw`
        设 $X_1,X_2,\dots,X_n,\dots$ 独立同分布，$\E X_i=\mu$，$\Var X_i=\sigma^{2}$。
        问 $\displaystyle\frac1n\sum_{i=1}^{n}X_i^{2}$ 依概率收敛到什么？
        $\displaystyle\frac1n\sum_{i=1}^{n}\bigl(X_i-\bar X\bigr)^{2}$ 呢？
      `,
      idea: String.raw`
        **第一问的关键一步是换对象**：不要盯着 $X_i$，
        ==令 $Y_i=X_i^{2}$==。

        $X_i$ 独立同分布 $\Rightarrow$ $Y_i=X_i^{2}$ ==也独立同分布==
        （[独立对函数封闭](#/probability/multi-random-var/independence?at=indep-of-functions)）。
        于是对 $Y_i$ 用辛钦大数定律，极限就是 $\E Y_1=\E X_1^{2}$。

        而 $\E X^{2}$ 由[方差公式](#/probability/moments/expectation?at=var-def)反解：
        $\E X^{2}=\Var X+(\E X)^{2}=\sigma^{2}+\mu^{2}$。
        ==注意答案不是 $\mu^{2}$——这是最常见的错答。==

        **第二问要先把式子拆开**，因为 $\bar X$ 里含所有的 $X_i$，
        ==它不是"独立同分布之和"的形式，不能直接套定律==。
        用恒等式
        $$\frac1n\sum(X_i-\bar X)^{2}=\frac1n\sum X_i^{2}-\bar X^{2},$$
        右端两项各自有极限，再用极限的四则运算。
      `,
      solution: String.raw`
        **(1)** 令 $Y_i=X_i^{2}$。由 $X_i$ 独立同分布知 $Y_i$ 独立同分布，且
        $$\E Y_1=\E X_1^{2}=\Var X_1+(\E X_1)^{2}=\sigma^{2}+\mu^{2}<\infty.$$
        由辛钦大数定律
        $$\frac1n\sum_{i=1}^{n}X_i^{2}\ \xrightarrow{\ P\ }\ \boxed{\sigma^{2}+\mu^{2}}.$$

        **(2)** 先化简：
        $$\frac1n\sum_{i=1}^{n}(X_i-\bar X)^{2}
        =\frac1n\sum X_i^{2}-2\bar X\cdot\frac1n\sum X_i+\bar X^{2}
        =\frac1n\sum X_i^{2}-\bar X^{2}.$$

        由辛钦大数定律 $\bar X\xrightarrow{P}\mu$，
        再由[连续函数保持依概率收敛](#/probability/lln-clt/lln?at=convergence-p)得 $\bar X^{2}\xrightarrow{P}\mu^{2}$。
        结合 (1)：
        $$\frac1n\sum(X_i-\bar X)^{2}\ \xrightarrow{\ P\ }\
        (\sigma^{2}+\mu^{2})-\mu^{2}=\boxed{\sigma^{2}}.$$
      `,
      comment: String.raw`
        **第二问的结论很重要**：它说==样本方差是总体方差的相合估计==。

        注意这里除的是 $n$ 而不是 $n-1$，得到的极限仍是 $\sigma^{2}$——
        因为 $\frac{n}{n-1}\to1$，==两种定义的样本方差有同一个极限==。
        但它们的==无偏性不同==：只有除以 $n-1$ 的那个才满足 $\E S^{2}=\sigma^{2}$，
        见[为什么除以 $n-1$](#/probability/statistics/sampling?at=why-n-1)。
        ==相合性看极限，无偏性看每一个固定的 $n$，是两件事。==

        **这道题的通用手法**：遇到 $\frac1n\sum g(X_i)$，
        一律==令 $Y_i=g(X_i)$，验证独立同分布，答案就是 $\E g(X_1)$==。
        常考的几个：

        | 式子 | 依概率极限 |
        |---|---|
        | $\frac1n\sum X_i$ | $\mu$ |
        | $\frac1n\sum X_i^{2}$ | ==$\sigma^{2}+\mu^{2}$== |
        | $\frac1n\sum\abs{X_i}$ | $\E\abs{X_1}$ |
        | $\frac1n\sum e^{X_i}$ | $\E e^{X_1}$ |

        ==第二行是失分重灾区：不少人直接写 $\mu^{2}$，漏掉了方差那一项。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '五、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **对已知分布的题用切比雪夫**：==界会松到没用==，
         知道是正态就标准化查表。
      2. **切比雪夫的方向搞反**：$P(\abs{X-\mu}\ge\varepsilon)$ 得到==上界==，
         $P(\abs{X-\mu}<\varepsilon)$ 得到==下界==。
      3. **辛钦定律用在不同分布上**：辛钦==要求同分布==，
         不同分布只能用切比雪夫（且要验方差一致有界）。
      4. **切比雪夫定律忘了验方差**：方差不存在（如柯西分布）时该定律不适用。
      5. **$\frac1n\sum X_i^{2}$ 的极限写成 $\mu^{2}$**：正确的是 ==$\sigma^{2}+\mu^{2}$==。
      6. **把依概率收敛当成普通收敛**：它==允许偶尔跑偏==，只要求跑偏的概率趋于零。
      7. **赌徒谬误**：连出十次正面之后，下一次仍是 $\frac12$。
         ==大数定律靠稀释，不靠补偿。==
      8. **拿大数定律去算概率**：它只给极限，==不给"差多少"==。
         要算概率必须用[中心极限定理](#/probability/lln-clt/clt?at=three-steps)。
    ` },

  ],
});
