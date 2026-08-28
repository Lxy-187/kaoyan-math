/* ==========================================================================
   概率论 / 附 分布图鉴 / 韦布尔分布
   —— 超纲。指数分布的"会老化"版本；由失效率反推密度的范例。
   ========================================================================== */

KM.page({
  path: 'probability/models/weibull',
  title: '韦布尔分布：会老化的寿命',
  subtitle: '[指数分布](#/probability/models/exponential?at=hazard)假设"永不老化"，现实里的轴承显然不是。==把失效率从常数改成幂函数==，就得到它',
  tags: ['概念辨析'],
  updated: '2026-08-28',

  blocks: [

    { t: 'md', c: String.raw`
      > **地位**：韦布尔分布==不在考研大纲内==。
      > 收进本章有两个理由：
      > 一是它把"[无记忆性](#/probability/models/exponential?at=memoryless)只适用于电子元件"这句提醒变成了正面的答案；
      > 二是==它的推导演示了一个通用手法：由失效率反求分布==。
      > 这个手法在真题里以"已知 $\frac{f(x)}{1-F(x)}$ 求 $F$"的形式出现过。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'birth', c: '一、由失效率反推出来' },

    { t: 'key', id: 'story', title: '把常数失效率换成幂函数', c: String.raw`
      回忆[失效率](#/probability/models/exponential?at=hazard)的定义：
      $$h(t)=\frac{f(t)}{1-F(t)}=\text{"活到 }t\text{ 的前提下此刻坏掉的瞬时速率"}.$$
      指数分布对应 $h(t)\equiv\lambda$（恒定），==这意味着东西不会变老==。

      现实里的机械零件会磨损，失效率应当==随时间递增==。
      最简单的递增函数是幂函数，于是假设
      $$h(t)=\frac{m}{\eta}\left(\frac t\eta\right)^{m-1},\qquad m>0.$$

      **反解的关键恒等式**（这一步是通用手法）：
      $$h(t)=\frac{f(t)}{1-F(t)}=-\bigl[\ln(1-F(t))\bigr]'$$
      $$\Longrightarrow\ 1-F(t)=\exp\left(-\int_0^{t}h(u)\du\right).$$
      ==失效率一旦给定，分布就唯一确定==——这是可靠性理论的基本方程。

      代入幂函数积分得
      $$\boxed{\ F(t)=1-e^{-(t/\eta)^{m}},\qquad
      f(t)=\frac m\eta\left(\frac t\eta\right)^{m-1}e^{-(t/\eta)^{m}}\quad(t>0)\ }$$
      这就是**韦布尔分布** $W(m,\eta)$：$m$ 是==形状参数==，$\eta$ 是==尺度参数==。
    ` },

    { t: 'key', id: 'shape', title: '一个参数管住三种寿命行为', c: String.raw`
      | $m$ | 失效率 | 现实对应 | 浴盆曲线的哪一段 |
      |---|---|---|---|
      | $m<1$ | ==递减== | 早期缺陷、新生儿死亡 | 左边下降段 |
      | $m=1$ | ==恒定== | ==退化成[指数分布](#/probability/models/exponential?at=story)== | 中间平底 |
      | $m>1$ | ==递增== | 磨损、疲劳、老化 | 右边上升段 |
      | $m=2$ | 线性递增 | 瑞利分布（雷达杂波、风速） | —— |

      ==$m=1$ 时 $\eta=\frac1\lambda$，与指数分布完全重合==——
      所以韦布尔是指数分布的严格推广，多出来的那个 $m$ 专门用来描述"老化的速度"。

      **一句话记住它**：==指数分布是"随机失效"，韦布尔是"随机失效 + 老化"。==
    ` },

    { t: 'key', id: 'moments', title: '数字特征：$\\Gamma$ 函数登场', c: String.raw`
      换元 $u=(t/\eta)^{m}$ 后积分变成伽马积分：
      $$\E X=\eta\,\Gamma\!\left(1+\frac1m\right),\qquad
      \Var X=\eta^{2}\left[\Gamma\!\left(1+\frac2m\right)-\Gamma^{2}\!\left(1+\frac1m\right)\right]$$

      ==验算 $m=1$==：$\Gamma(2)=1!=1$，$\Gamma(3)=2!=2$，
      于是 $\E X=\eta$、$\Var X=\eta^{2}(2-1)=\eta^{2}$，
      正是[指数分布](#/probability/models/exponential?at=moments)的 $\frac1\lambda$ 与 $\frac{1}{\lambda^{2}}$。$\checkmark$

      **这类"含 $\Gamma$ 的期望"不必背**，需要时按套路推：
      ==遇到 $\int t^{k}e^{-t^{m}}\dt$ 一律换元 $u=t^{m}$，化成 $\int u^{s-1}e^{-u}\du=\Gamma(s)$==，
      见[伽马函数](#/probability/models/gamma?at=gamma-function)。

      **一个方便的性质**：$X\sim W(m,\eta)\iff X^{m}\sim E\!\left(\eta^{-m}\right)$。
      ==把韦布尔取 $m$ 次幂就变回指数分布==，
      这条让所有关于它的计算都能转回熟悉的指数分布上做。
    ` },

    { t: 'key', id: 'in-exam', title: '考研里它以什么面目出现', c: String.raw`
      不会点名字，但这两种题面等价于在考它：

      1. **给失效率求分布**：
         "设寿命 $X$ 的失效率为 $h(x)=2x$，求 $F(x)$"——
         套 $1-F=\exp\left(-\int_0^{x}h\right)$ 得 $F=1-e^{-x^{2}}$，
         ==这就是 $m=2$ 的韦布尔（瑞利分布）==；
      2. **给一个含指数的分布函数**：
         $F(x)=1-e^{-x^{3}}$ 这类形式，==直接按定义求密度、算期望即可==，
         认出它是韦布尔只是让你知道题目背景是可靠性。

      **和[极值分布](#/probability/models/others?at=extreme)的联系**：
      韦布尔是"大量零件中最弱的一个决定整体寿命"的极限分布——
      ==所谓"最弱链条原理"==。这也解释了它为什么在材料强度、风速、地震里到处出现。
    ` },

    { t: 'warn', id: 'pitfalls', title: '注意事项', c: String.raw`
      1. **答题不要引用名字**：==超纲==，按失效率方程推导即可；
      2. **失效率公式的负号**：$1-F(t)=\exp\left(-\int_0^{t}h\right)$，
         ==漏掉负号是这类题最常见的错误==；
      3. **参数化多种多样**：有的书写成 $F=1-e^{-\lambda t^{m}}$，
         与本页的 $\eta$ 相差一个 $m$ 次方根，==看题目给的形式为准==；
      4. **别把 $m>1$ 说成"更容易坏"**：$m>1$ 说的是==失效率随时间递增==，
         早期反而比指数分布更安全。
    ` },

  ],
});
