/* ==========================================================================
   概率论 / 附 分布图鉴 / 零星补遗
   —— 剩下那些偶尔露面的分布，每个一小段：它解决什么问题、和谁有关。
   ========================================================================== */

KM.page({
  path: 'probability/models/others',
  title: '零星补遗：其余见得到的分布',
  subtitle: '前面每个分布都值得一整页。这里收的是==偶尔露一面的那些==：知道它们存在、知道它们挂在家谱的哪根枝上就够了',
  tags: ['概念辨析'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      ==本页全部超出考研大纲==，收录理由只有一个：
      **它们会在题目里以"给你一个陌生的密度"的形式出现**，
      认出背景能让你更快判断该怎么下手。

      读法：==每一小段只回答两个问题——它在解决什么问题、它和谁是亲戚。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'discrete', c: '一、离散的几个' },

    { t: 'key', id: 'discrete-uniform', title: '离散均匀分布：掷骰子', c: String.raw`
      取值 $1,2,\dots,n$ 各以 $\frac1n$ 出现。
      $$\E X=\frac{n+1}{2},\qquad \Var X=\frac{n^{2}-1}{12}$$

      ==方差里又是那个 $12$==，和[连续均匀分布](#/probability/models/uniform?at=moments)的 $\frac{L^{2}}{12}$ 同源：
      求和 $\sum k^{2}$ 与积分 $\int t^{2}$ 的结构相同。

      **最常用的一个数**：掷一枚骰子 $\Var X=\dfrac{35}{12}$，
      ==这个数在"掷 $n$ 次骰子求点数和"的中心极限定理题里天天出现==。

      **应用场景**：抽签、随机排列、[古典概型](#/probability/events/operations?at=classical)的所有题目——
      "等可能"这四个字就是在说离散均匀。
    ` },

    { t: 'key', id: 'multivariate-hypergeometric', title: '多元超几何分布：不放回地摸多种颜色', c: String.raw`
      箱里有 $r$ 种颜色的球，第 $i$ 种有 $M_i$ 个，共 $N$ 个。不放回抓 $n$ 个：
      $$P(X_1=k_1,\dots,X_r=k_r)=\frac{\prod_{i}\binom{M_i}{k_i}}{\binom Nn}$$

      ==它之于[超几何](#/probability/models/hypergeometric?at=story)，
      正如[多项分布](#/probability/models/multinomial?at=story)之于二项==：
      把"两类"扩成"多类"。

      **考研里的样子**：
      "袋中有 $3$ 红 $4$ 白 $5$ 黑，任取 $4$ 个，求恰好 $1$ 红 $2$ 白 $1$ 黑的概率"——
      ==这就是它，直接按古典概型数即可，不必知道名字。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'continuous', c: '二、连续的几个' },

    { t: 'key', id: 'laplace', title: '拉普拉斯分布（双指数）：两边各一条指数尾', c: String.raw`
      $$f(x)=\frac{1}{2b}e^{-\frac{\abs{x-\mu}}{b}},\qquad x\in\R$$
      $$\E X=\mu,\qquad \Var X=2b^{2}$$

      ==把[指数分布](#/probability/models/exponential?at=story)沿 $y$ 轴对称地翻一份==就是它，
      所以也叫**双指数分布**。

      **和正态的对照很值得记**：

      | | 正态 | 拉普拉斯 |
      |---|---|---|
      | 指数上 | $-\frac{(x-\mu)^{2}}{2\sigma^{2}}$，==平方== | $-\frac{\abs{x-\mu}}{b}$，==绝对值== |
      | 峰顶 | 光滑 | ==有尖角（不可导）== |
      | 最大似然估计给出 | ==样本均值== | ==样本中位数== |

      ==最后一行很漂亮==：假设误差是正态，最小化的是平方和（最小二乘）；
      假设误差是拉普拉斯，最小化的就是绝对值之和，
      **而使 $\sum\abs{x_i-\theta}$ 最小的 $\theta$ 正是中位数**。
      这解释了为什么"中位数比均值抗异常值"——==它对应的是更重的尾部假设==。
    ` },

    { t: 'key', id: 'rayleigh', title: '瑞利分布：二维正态的长度', c: String.raw`
      $X,Y$ 独立同服从 $N(0,\sigma^{2})$，则 $R=\sqrt{X^{2}+Y^{2}}$ 服从瑞利分布：
      $$f(r)=\frac{r}{\sigma^{2}}e^{-\frac{r^{2}}{2\sigma^{2}}},\qquad r>0$$

      ==它就是[卡方那条球壳法](#/probability/models/chi2?at=density)在 $n=2$ 时的样子==：
      $f_R(r)\propto r^{n-1}e^{-r^{2}/2}$ 取 $n=2$ 即得。

      **亲戚关系一串**：

      - $R^{2}\sim\chi^{2}(2)$，也就是[指数分布](#/probability/models/exponential?at=story)；
      - 它是[韦布尔分布](#/probability/models/weibull?at=shape)在 $m=2$ 时的特例；
      - ==风速、雷达杂波、靶心偏离距离==都用它建模，
        因为这些量本质上都是"二维随机向量的长度"。

      **一个常考的小结论**：$\E R=\sigma\sqrt{\frac\pi2}$，
      ==那个 $\sqrt\pi$ 又是[高斯积分](#/calculus/multi-integral/separable?at=gauss-family)==。
    ` },

    { t: 'key', id: 'pareto', title: '帕累托分布：幂律与"二八法则"', c: String.raw`
      $$f(x)=\frac{\alpha x_m^{\alpha}}{x^{\alpha+1}}\ (x\ge x_m),\qquad
      P(X>x)=\left(\frac{x_m}{x}\right)^{\alpha}$$

      ==尾概率按幂函数衰减==，比[指数分布](#/probability/models/exponential?at=story)慢得多，
      所以它是典型的**重尾分布**：极端值远比直觉常见。

      **性质与代价**：
      $$\E X=\frac{\alpha x_m}{\alpha-1}\ (\alpha>1),\qquad
      \Var X\ \text{要求}\ \alpha>2$$
      ==$\alpha\le1$ 时期望不存在==——和[柯西分布](#/probability/models/cauchy?at=no-mean)一样的病。

      **它描述的现象**：财富分布、城市人口、网站访问量、地震震级。
      帕累托当年观察到==意大利 $80\%$ 的土地属于 $20\%$ 的人==，
      "二八法则"就是这个分布的通俗说法。

      **和[对数正态](#/probability/models/lognormal?at=story)的区别**：两者都右偏、都描述收入，
      ==但帕累托的尾巴更重==。判断实际数据该用哪个，是统计建模里的经典问题。
    ` },

    { t: 'key', id: 'extreme', title: '极值分布：最大值的极限有三种', c: String.raw`
      [中心极限定理](#/probability/lln-clt/clt?at=clt-statement)讲的是==和==的极限。
      那么==最大值==的极限呢？

      **极值定理（费希尔–蒂皮特）**：$\max(X_1,\dots,X_n)$ 适当标准化后，
      ==极限分布只可能是三种之一==：

      | 类型 | 适用于 | 尾部 |
      |---|---|---|
      | 耿贝尔（Gumbel） | 正态、指数等==轻尾== | $e^{-e^{-x}}$ |
      | 弗雷歇（Fréchet） | [帕累托](#/probability/models/others?at=pareto)等==重尾== | 幂律 |
      | ==[韦布尔](#/probability/models/weibull?at=story)== | 有上界的分布 | 有限端点 |

      ==这和中心极限定理是完全平行的一件事==：
      **和的极限只有正态一族，最大值的极限只有这三族。**

      **现实里的用处**：百年一遇的洪水、极端风速、材料的断裂强度、金融风险的 VaR——
      ==凡是关心"最坏情况"的地方用的都是极值分布，而不是正态==。
      [韦布尔分布](#/probability/models/weibull?at=in-exam)在材料强度里流行的理由正在于此：
      ==一根链条的强度由最弱的一环决定，那是个最小值问题。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'map', c: '三、放回家谱里' },

    { t: 'compare',
      id: 'map-table',
      title: '本页这些分布挂在哪根枝上',
      cols: ['分布', '它是谁的亲戚', '一句话'],
      rows: [
        ['离散均匀', '[连续均匀](#/probability/models/uniform?at=story)的离散版',
         '古典概型的"等可能"'],
        ['多元超几何', '[超几何](#/probability/models/hypergeometric?at=story)的多类版',
         '不放回摸多种颜色'],
        ['拉普拉斯', '[指数](#/probability/models/exponential?at=story)对称地翻一份',
         '对应==中位数==估计'],
        ['瑞利', '[卡方](#/probability/models/chi2?at=density) $n=2$ 的开方',
         '二维正态的长度'],
        ['帕累托', '重尾家族，和[柯西](#/probability/models/cauchy?at=no-mean)同病',
         '幂律与二八法则'],
        ['极值分布', '和[中心极限定理](#/probability/models/normal?at=clt)平行',
         '最大值的三种极限'],
      ] },

    { t: 'warn', id: 'how-to-use', title: '怎么用这一页', c: String.raw`
      1. **一律不要在答卷上引用这些名字**：==全部超纲==；
      2. **真正的用法是"认出结构"**：
         看到 $e^{-\abs x}$ 想到分段积分、
         看到 $\frac{1}{x^{\alpha+1}}$ 先检查期望是否存在、
         看到 $re^{-r^{2}}$ 想到[极坐标](#/calculus/multi-integral/separable?at=gauss-steps)；
      3. **考题只会给密度让你算**：求常数、求分布函数、求期望方差、
         判断某个矩是否存在——==这些动作和分布叫什么名字无关==。
    ` },

  ],
});
