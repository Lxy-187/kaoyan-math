/* ==========================================================================
   跨章节手法主线 / 同构结构 / 柯西–施瓦茨不等式
   ========================================================================== */

KM.page({
  path: 'threads/patterns/cauchy-schwarz',
  title: '柯西–施瓦茨：内积被范数控制',
  subtitle: '点乘、求和、积分、协方差 —— 同一个不等式的四副面孔，一个证明管全部',
  tags: ['专题', '概念辨析', '高频'],
  updated: '2026-08-13',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'one-inequality', c: '一、先回答：柯西和施瓦茨是两个不等式吗' },

    { t: 'insight', id: 'my-observation', title: '我的观察：柯西不等式也是一种通用代数结构', c: String.raw`
      ==柯西不等式也有一种非常通用的代数结构呀==，
      从普通的柯西不等式，到柯西–施瓦茨不等式这一块。

      ---

      **对，而且比"相似"更强：它们根本就是同一个不等式。**

      "柯西不等式"通常指离散求和版，"施瓦茨不等式"通常指积分版
      （有些教材还加上"布尼亚科夫斯基"），
      ==但它们不是三个不等式，而是同一条定理在三个不同空间里的名字==。

      统一的说法是：在任何定义了**内积** $\langle x,y\rangle$ 的空间里，

      $$\boxed{\ \left|\langle x,y\rangle\right|^{2}\le\langle x,x\rangle\,\langle y,y\rangle
      \quad\text{即}\quad\left|\langle x,y\rangle\right|\le\left\|x\right\|\cdot\left\|y\right\|\ }$$

      一句话：==两个对象「相互作用」的规模，不超过它们各自「独立规模」的乘积==。

      **取等条件在所有版本里完全一致**：$x$ 与 $y$ ==线性相关==。
      下一节会看到，这个"一致"不是巧合 —— 它们共用同一个证明。
    ` },

    { t: 'compare',
      id: 'four-faces',
      title: '四副面孔：换个空间就换个名字',
      cols: ['出处', '内积 $\\langle x,y\\rangle$ 是什么', '不等式长什么样'],
      rows: [
        ['空间解析几何', '$\\vec a\\cdot\\vec b$', '$\\left|\\vec a\\cdot\\vec b\\right|\\le\\left|\\vec a\\right|\\left|\\vec b\\right|$'],
        ['数列 / 线代', '$\\sum a_ib_i$', '$\\left(\\sum a_ib_i\\right)^{2}\\le\\sum a_i^{2}\\cdot\\sum b_i^{2}$'],
        ['微积分', '$\\int_a^b fg\\,\\mathrm{d}x$', '$\\left(\\int fg\\right)^{2}\\le\\int f^{2}\\cdot\\int g^{2}$'],
        ['概率论', '$E(XY)$', '$\\left[E(XY)\\right]^{2}\\le E(X^{2})E(Y^{2})$'],
        ['概率论（中心化后）', '$\\operatorname{Cov}(X,Y)$', '$\\operatorname{Cov}^{2}(X,Y)\\le D(X)D(Y)$'],
        ['二次型（$A$ 半正定）', '$\\vec x^{\\T}A\\vec y$', '$\\left(\\vec x^{\\T}A\\vec y\\right)^{2}\\le\\left(\\vec x^{\\T}A\\vec x\\right)\\left(\\vec y^{\\T}A\\vec y\\right)$'],
      ] },

    { t: 'md', c: String.raw`
      **几何版是最好的直觉入口**：$\vec a\cdot\vec b=\left|\vec a\right|\left|\vec b\right|\cos\theta$，
      而 $\left|\cos\theta\right|\le1$ —— ==柯西不等式说白了就是"余弦值不超过 1"==。
      其余三副面孔，不过是把"夹角"这个概念搬到了数列、函数、随机变量上。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'one-proof', c: '二、一个证明管全部：判别式法' },

    { t: 'method', id: 'discriminant', title: '构造一个恒非负的二次式，看判别式', c: String.raw`
      设 $t$ 是实参数，考察
      $$\langle x+ty,\;x+ty\rangle\ \ge\ 0\qquad(\text{内积的正定性，对一切 }t\text{ 成立}).$$
      展开：
      $$\underbrace{\langle y,y\rangle}_{A}t^{2}
      +\underbrace{2\langle x,y\rangle}_{B}t
      +\underbrace{\langle x,x\rangle}_{C}\ \ge\ 0 .$$

      这是关于 $t$ 的二次三项式，==恒非负 $\iff$ 判别式 $\le0$==：
      $$\Delta=4\langle x,y\rangle^{2}-4\langle x,x\rangle\langle y,y\rangle\le0
      \;\Longrightarrow\;\langle x,y\rangle^{2}\le\langle x,x\rangle\langle y,y\rangle .$$

      **这个证明对四副面孔一字不改**，只要把 $\langle\cdot,\cdot\rangle$ 换成对应的运算：

      | 空间 | 那个"恒非负"的量 |
      |---|---|
      | 向量 | $\left|\vec a+t\vec b\right|^{2}\ge0$ |
      | 数列 | $\sum(a_i+tb_i)^{2}\ge0$ |
      | 积分 | $\int\left(f+tg\right)^{2}\dx\ge0$ |
      | 概率 | $E\!\left[(X+tY)^{2}\right]\ge0$ |

      ==所有版本共用一个骨架==：**平方非负 → 二次式恒非负 → 判别式 ≤ 0**。
      记住这条路径，考场上任何一个版本都能现场推出来，不必分别背。
    ` },

    { t: 'method', id: 'double-integral-proof', title: '积分版还有第二条路：升维成二重积分', c: String.raw`
      判别式法靠"引入参数 $t$"，积分版还可以靠=="引入第二个变量 $y$"==：
      把两边都写成同一个正方形 $[a,b]^2$ 上的二重积分，==战场统一了就能逐点比较被积函数==，
      再用 $x\leftrightarrow y$ 对称化，完全平方会自己长出来：

      $$\left(\int_a^b f^{2}\right)\left(\int_a^b g^{2}\right)-\left(\int_a^b fg\right)^{2}
        =\frac12\iint_{[a,b]^2}\bigl[f(x)g(y)-f(y)g(x)\bigr]^{2}\dxy\ \ge\ 0$$

      注意这是个==等式==——它其实就是本页第三节
      [拉格朗日恒等式](#/threads/patterns/cauchy-schwarz?at=lagrange-identity)的连续版，
      $\frac12$ 对应离散版 $\sum_{i<j}$ 的"只数一半格子"。

      完整推导、对称化那一步为什么必须做、以及两种证法的取舍表，见
      [升维法专页的柯西一节](#/calculus/multi-integral/separable?at=symmetrize)。
      ==考场默认仍用判别式法（通用、行数少）==，二重积分法用在题目点名"用二重积分证"
      或需要写出"缺口是多少"的时候。
    ` },

    { t: 'key', id: 'why-equality', title: '取等条件为什么永远是「线性相关」', c: String.raw`
      顺着上面的证明往下读一步就明白了：

      $$\Delta=0\iff\text{二次式有实根 }t_0\iff\langle x+t_0y,\;x+t_0y\rangle=0 .$$

      再由内积的**正定性**（$\langle v,v\rangle=0\iff v=0$）得
      $$x+t_0y=0\quad\text{即}\quad x=-t_0\,y .$$

      ==所以"取等 $\iff$ 线性相关"不是各个版本各自的巧合，而是同一句话==：

      | 空间 | 取等条件的具体样子 |
      |---|---|
      | 向量 | $\vec a\parallel\vec b$（共线） |
      | 数列 | $\dfrac{a_1}{b_1}=\dfrac{a_2}{b_2}=\cdots$（成比例） |
      | 积分 | $f(x)=k\,g(x)$（==几乎处处==成立） |
      | 概率 | $Y=aX+b$ 以概率 $1$ 成立 $\Rightarrow$ $\left|\rho\right|=1$ |
    ` },

    { t: 'key', id: 'rho', title: '副产品：相关系数为什么必在 $[-1,1]$ 内', c: String.raw`
      把柯西不等式用在中心化的随机变量上：
      $$\operatorname{Cov}^{2}(X,Y)\le D(X)D(Y)
      \;\Longrightarrow\;
      \left|\rho\right|=\frac{\left|\operatorname{Cov}(X,Y)\right|}{\sqrt{D(X)D(Y)}}\le1 .$$

      而取等（$\left|\rho\right|=1$）$\iff$ 两个中心化变量线性相关
      $\iff$ ==$Y$ 与 $X$ 之间存在严格的线性关系==。

      这就完整解释了相关系数的含义：==$\rho$ 就是概率空间里两个随机变量的「余弦值」==，
      衡量的是**线性**相关程度 —— 也顺带说清了为什么 $\rho=0$ 只能推出"不相关"，
      推不出"独立"（余弦为零只说明垂直，不说明毫无关系）。

      **另一个副产品**：取 $Y\equiv1$，得 $\left[E(X)\right]^{2}\le E(X^{2})$，
      即 ==$D(X)=E(X^{2})-\left[E(X)\right]^{2}\ge0$== ——
      连"方差非负"都是柯西不等式的推论。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'gap', c: '三、差多少：拉格朗日恒等式' },

    { t: 'key', id: 'lagrange-identity', title: '不等式的「精确版」', c: String.raw`
      和[次可加性的重叠型有容斥等式](#/threads/patterns/subadditive?at=two-mechanisms)一样，
      柯西不等式也有一个==等式版本==，它把"差多少"写了出来：

      $$\left(\sum a_i^{2}\right)\left(\sum b_i^{2}\right)-\left(\sum a_ib_i\right)^{2}
      =\sum_{i<j}\left(a_ib_j-a_jb_i\right)^{2}$$

      右边是一堆 ==$2\times2$ 行列式的平方==，恒 $\ge0$ —— 柯西不等式立刻得证。
      而且取等条件一目了然：所有 $a_ib_j-a_jb_i=0$，即 ==$(a_i)$ 与 $(b_j)$ 成比例==。

      **三维的几何意义特别漂亮**：
      $$\left|\vec a\right|^{2}\left|\vec b\right|^{2}-\left(\vec a\cdot\vec b\right)^{2}
      =\left|\vec a\times\vec b\right|^{2}$$
      ==缺口恰好是叉乘的模平方，也就是平行四边形面积的平方==。
      两向量越接近共线，面积越小，不等式越接近取等 —— 完全对得上。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'exam', c: '四、考研里的实战形态' },

    { t: 'method', id: 'construct', title: '战术动作：配凑内积（三步）', c: String.raw`
      考题不会把 $\sum a_ib_i$ 直接摆好，要自己拆出两组来配对。

      **三步**：

      1. **认出目标里的"一次式"和"平方和"**：
         已知 $\sum c_ix_i=C$（一次），求 $\sum a_ix_i^{2}$（平方和）的最值；
      2. **把平方和写成 $\sum(\sqrt{a_i}\,x_i)^{2}$**，这一组就是第一个向量；
      3. **让另一组去"补"出一次式**：取 $\dfrac{c_i}{\sqrt{a_i}}$，
         点乘出来正好是 $\sum c_ix_i$。

      于是
      $$C^{2}=\left(\sum\frac{c_i}{\sqrt{a_i}}\cdot\sqrt{a_i}x_i\right)^{2}
      \le\left(\sum\frac{c_i^{2}}{a_i}\right)\left(\sum a_ix_i^{2}\right)
      \;\Longrightarrow\;\sum a_ix_i^{2}\ \ge\ \frac{C^{2}}{\sum c_i^{2}/a_i}.$$

      这就是[铁丝围面积那道题的秒杀公式](#/calculus/multi-derivative/extremum?at=cauchy-quadratic)。
      ==配凑的口诀：谁在平方里，谁就带 $\sqrt{a_i}$；另一组负责把它约掉。==
    ` },

    { t: 'key', id: 'three-forms', title: '三种必须认识的变形', c: String.raw`
      | 形态 | 式子 | 什么时候用 |
      |---|---|---|
      | **标准型** | $\left(\sum a_ib_i\right)^{2}\le\sum a_i^{2}\sum b_i^{2}$ | 一般配对 |
      | **取 $b_i\equiv1$** | $\left(\sum a_i\right)^{2}\le n\sum a_i^{2}$ | 由和估平方和 |
      | **权方和（Engel 形式）** | $\displaystyle\sum\frac{a_i^{2}}{b_i}\ \ge\ \frac{\left(\sum a_i\right)^{2}}{\sum b_i}$（$b_i>0$） | 分母带变量的分式和 |

      积分版同理，==最常用的是 $g\equiv1$ 那一条==：
      $$\left(\int_a^b f\dx\right)^{2}\le(b-a)\int_a^b f^{2}\dx .$$
      看到"已知 $\int f^{2}$ 的界，要估 $\int f$"（或反过来），第一反应就是它。
    ` },

    { t: 'method', id: 'lagrange-meet', title: '与拉格朗日乘数法的会师', c: String.raw`
      求 $\langle x,c\rangle$ 在 $\left\|x\right\|=1$ 下的最大值：

      - **柯西视角**：$\langle x,c\rangle\le\left\|x\right\|\left\|c\right\|=\left\|c\right\|$，
        取等当 $x\parallel c$；
      - **拉格朗日视角**：$L=\langle x,c\rangle-\lambda\left(\left\|x\right\|^{2}-1\right)$，
        求导得 $c=2\lambda x$，即 ==$x$ 与 $c$ 共线==。

      两条路给出同一个结论。==柯西不等式的"取等条件"和拉格朗日乘数法的"梯度共线条件"
      是同一件事==：极值总出现在两个向量方向对齐的时刻。

      同样的会师也发生在
      [$\vec x^{\T}A\vec x$ 在单位球上的最值](#/threads/lines/quadratic?at=eigen-extremum)那里。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'relation', c: '五、它和次可加性的关系：有因果，不只是并列' },

    { t: 'key', id: 'implies-triangle', title: '柯西–施瓦茨 ⟹ 三角不等式 ⟹ 次可加性', c: String.raw`
      $$\left\|x+y\right\|^{2}=\left\|x\right\|^{2}+2\langle x,y\rangle+\left\|y\right\|^{2}
      \ \le\ \left\|x\right\|^{2}+2\left\|x\right\|\left\|y\right\|+\left\|y\right\|^{2}
      =\left(\left\|x\right\|+\left\|y\right\|\right)^{2}$$

      开方即得 $\left\|x+y\right\|\le\left\|x\right\|+\left\|y\right\|$ ——
      这正是[次可加性](#/threads/patterns/subadditive)里"抵消型"的那一整族。

      ==中间那个 $\le$ 用的就是柯西不等式==。所以两页讲的不是两件平行的事：

      $$\text{内积（柯西–施瓦茨）}\ \longrightarrow\ \text{范数（三角不等式）}
      \ \longrightarrow\ \text{次可加性}$$

      一个具体例证：[标准差的次可加性](#/threads/patterns/subadditive?at=sigma-case)
      $\sigma(X+Y)\le\sigma(X)+\sigma(Y)$，
      它的证明就是把 $\left|\operatorname{Cov}\right|\le\sigma_X\sigma_Y$（柯西）代进方差展开式 ——
      和上面这三行一字不差。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '六、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '用柯西不等式时最容易出错的地方', c: String.raw`
      1. **配对配反**：把 $\sqrt{a_i}$ 分到了错误的一组，导致约不掉。
         ==验算方法：把两组乘起来，看是不是恰好等于题目里的一次式。==
      2. **忘记验证取等能否达到**：求最值必须说明取等条件==在约束范围内可以满足==
         （比如解出的 $x_i$ 是否都为正）。否则只证明了一个界，不是最值。
      3. **积分版忽略"几乎处处"**：$f=kg$ 只需在积分意义下成立，
         考研写"$f(x)=kg(x)$"即可，但不能说"处处相等"。
      4. **$\rho=0$ 推独立**：柯西只管==线性==相关。$\rho=0$ 是"垂直"，不是"无关"。
         唯一的例外是[二维正态](#/threads/lines/quadratic?at=probability)，那里两者等价。
      5. **对 $A$ 不半正定的二次型硬套**：$\vec x^{\T}A\vec y$ 要成为内积，
         $A$ ==必须半正定==，否则"平方非负"这个前提就没了。
      6. **和均值不等式混用**：柯西管"内积 vs 范数"，均值不等式管"算术 vs 几何平均"，
         两者常一起出现但取等条件不同（后者要求各项==相等==，前者要求==成比例==）。
    ` },

  ],
});
