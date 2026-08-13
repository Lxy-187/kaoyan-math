/* ==========================================================================
   高等数学 / 9 多元函数微分学 / 方向导数与梯度
   ========================================================================== */

KM.page({
  path: 'calculus/multi-derivative/gradient',
  title: '方向导数与梯度',
  subtitle: '一个标量、一个向量。公式只有一条，考点全在三个陷阱上',
  tags: ['小题', '概念辨析', '数一', '易错'],
  updated: '2026-08-10',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'definition', c: '一、定义与公式' },

    { t: 'key', id: 'formulas', title: '一条公式串起全部', c: String.raw`
      **方向导数**：函数在某点沿某个方向的变化率，是一个==标量（实数）==。

      **梯度**：函数在某点的一个==向量==，
      $$\operatorname{grad}f=\nabla f=\left(f_x,\;f_y,\;f_z\right).$$

      两者的关系就是一个点乘：
      $$\frac{\partial f}{\partial l}=\nabla f\cdot\vec e_l=\left|\nabla f\right|\cos\theta$$

      其中 $\vec e_l$ 是方向 $l$ 的==单位==向量，$\theta$ 是梯度与该方向的夹角。

      ==记住"标量 = 向量 · 单位向量"这个类型检查==，
      就不会把方向导数写成向量、也不会忘记单位化。
    ` },

    { t: 'key', id: 'max-min', title: '最大 / 最小方向导数（直接背结论）', c: String.raw`
      因为 $\dfrac{\partial f}{\partial l}=\left|\nabla f\right|\cos\theta$，而 $\cos\theta\in[-1,1]$：

      | 问什么 | 答什么 |
      |---|---|
      | 方向导数的**最大值** | $\left|\nabla f\right|$（梯度的模） |
      | 取最大值的**方向** | 梯度方向 $\nabla f$（$\theta=0$） |
      | 方向导数的**最小值** | $-\left|\nabla f\right|$ |
      | 取最小值的**方向** | 负梯度方向 $-\nabla f$（$\theta=\pi$） |
      | 方向导数为 **0** 的方向 | 与梯度==垂直==的方向（沿等值线 / 等值面） |

      一句话：==梯度指向函数增长最快的方向，模长就是那个最快的速率。==
    ` },

    { t: 'key', id: 'level-surface', title: '梯度 = 等值面的法向量', c: String.raw`
      函数 $u=F(x,y,z)$ 的**等值面** $F(x,y,z)=c$ 在某点的法向量
      $$\vec n=\left(F_x,F_y,F_z\right)=\nabla F .$$

      ==曲面的法向量和梯度本来就是同一个东西==，只是叫法不同：
      在[几何应用](#/calculus/multi-derivative/geometry-app?at=normal-implicit)里叫法向量，
      在这里叫梯度。

      直观理解：沿着等值面走，函数值不变 $\Rightarrow$ 该方向的方向导数为 $0$
      $\Rightarrow$ 该方向与梯度垂直 $\Rightarrow$ 梯度垂直于等值面，即为法向量。

      ==严格证明只有三行==（在曲面上取曲线，代入后是真正的恒等式，两边对 $t$ 求导），
      见 [沿曲面求导确实为零](#/calculus/multi-derivative/geometry-app?at=intuition-becomes-theorem)。
      那里同时澄清了一个高频误解：==$F=0$ 是方程不是恒等式，不能两边求偏导==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'traps', c: '二、三个命题陷阱' },

    { t: 'warn', id: 'trap-unit', title: '陷阱 1：方向向量没有单位化（最高频）', c: String.raw`
      题目常说"沿点 $A$ 到点 $B$ 的方向"求方向导数。此时==绝不能==直接拿 $\vec{AB}$ 去点乘，
      必须先除以模长：
      $$\vec e_l=\frac{\vec{AB}}{\left|\vec{AB}\right|},\qquad
      \frac{\partial f}{\partial l}=\nabla f\cdot\vec e_l .$$

      直接用 $\vec{AB}$ 会让答案==整体差一个 $\left|\vec{AB}\right|$ 倍==，
      而且这个错误算出来的数看着很正常，检查时很难发现。

      **自查习惯**：写下 $\vec e_l$ 之前先算一次 $\left|\vec{AB}\right|$，
      看到根号出现才继续往下走。
    ` },

    { t: 'warn', id: 'trap-implicit', title: '陷阱 2：隐函数的梯度 vs 曲面的法向量', c: String.raw`
      给出 $F(x,y,z)=0$ 确定隐函数 $z=f(x,y)$，问 $z=f(x,y)$ 在某点的梯度。

      ==这是二维函数的梯度，只有两个分量==：
      $$\nabla z=\left(z_x,\;z_y\right),\qquad
      z_x=-\frac{F_x}{F_z},\qquad z_y=-\frac{F_y}{F_z}.$$

      必须先用隐函数求导公式算出 $z_x,z_y$，再写成二维向量。

      **绝不能**写成 $(F_x,F_y,F_z)$ —— 那是==三维曲面的法向量==，是另一个对象。
      两者维数都不一样，一旦混淆整题作废。

      | 问的是 | 答案 | 维数 |
      |---|---|---|
      | 曲面 $F(x,y,z)=0$ 的法向量 | $(F_x,F_y,F_z)$ | 三维 |
      | 函数 $z=f(x,y)$ 的梯度 | $\left(-\frac{F_x}{F_z},\,-\frac{F_y}{F_z}\right)$ | ==二维== |
      | 函数 $u=F(x,y,z)$ 的梯度 | $(F_x,F_y,F_z)$ | 三维 |

      ==看清"梯度的对象是谁"是唯一的解法。==
    ` },

    { t: 'warn', id: 'trap-differentiable', title: '陷阱 3：公式的前提是「可微」', c: String.raw`
      $$\frac{\partial f}{\partial l}=f_x\cos\alpha+f_y\cos\beta$$
      这条公式成立的前提是 ==$f$ 在该点可微==，不是"偏导数存在"就行。

      概念题常这样设陷阱：给一个偏导数存在但不可微的函数（典型如
      $f(x,y)=\sqrt{|xy|}$ 在原点），问某方向的方向导数能否用公式算 —— ==不能==，
      只能回到定义
      $$\frac{\partial f}{\partial l}\bigg|_{P_0}=\lim_{t\to 0^{+}}\frac{f(P_0+t\vec e_l)-f(P_0)}{t}.$$

      顺带记住多元函数的概念链（单向，==反过来都不成立==）：
      $$\text{连续偏导}\Rightarrow\text{可微}\Rightarrow
      \begin{cases}\text{连续}\\ \text{偏导数存在}\\ \text{各方向导数存在}\end{cases}$$
    ` },

    /* ================================================================== */
    { t: 'h', id: 'checklist', c: '三、做题动作' },

    { t: 'steps', id: 'steps', title: '方向导数题的固定四步', items: [
      { title: '求梯度',
        c: String.raw`算出 $f_x,f_y,f_z$ 并==代入具体点==，得到一个数字向量 $\nabla f$。
                      若函数由隐函数给出，先分清[梯度的对象](#/calculus/multi-derivative/gradient?at=trap-implicit)。` },
      { title: '求单位方向向量',
        c: String.raw`写出方向向量后==必须除以模长==。
                      若题目直接给了方向余弦 $(\cos\alpha,\cos\beta,\cos\gamma)$，它本身就是单位向量，无需再除。` },
      { title: '点乘',
        c: String.raw`$\dfrac{\partial f}{\partial l}=\nabla f\cdot\vec e_l$，结果是一个==数==。
                      算完检查一下类型：出现向量说明哪一步错了。` },
      { title: '若问最值，直接套结论',
        c: String.raw`最大值 $\left|\nabla f\right|$、方向 $\nabla f$；
                      最小值 $-\left|\nabla f\right|$、方向 $-\nabla f$。==不需要真的去求极值==。` },
    ] },

  ],
});
