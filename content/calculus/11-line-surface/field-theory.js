/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 散度、旋度与场论初步
   —— 把前面几节的公式统一到向量语言。全书最后一页。
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/field-theory',
  title: '散度、旋度与场论初步',
  subtitle: '用向量语言把[格林](#/calculus/line-surface/green?at=meaning)、[高斯、斯托克斯](#/calculus/line-surface/gauss-stokes?at=unified)统一起来——这一章的**收尾**',
  tags: ['小题', '概念辨析'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'three-operators', title: '★ 三个算子', c: String.raw`
      记 $\nabla=\left(\pd{}{x},\pd{}{y},\pd{}{z}\right)$（哈密顿算子）。

      | 算子 | 作用对象 | 结果 | 定义 |
      |---|---|---|---|
      | **梯度** $\operatorname{grad}u=\nabla u$ | ==数量场== | ==向量场== | $\left(u_x,u_y,u_z\right)$ |
      | **散度** $\operatorname{div}\vec F=\nabla\cdot\vec F$ | ==向量场== | ==数量场== | $P_x+Q_y+R_z$ |
      | **旋度** $\operatorname{rot}\vec F=\nabla\times\vec F$ | ==向量场== | ==向量场== | 行列式 |

      ==三个算子的"输入输出类型"必须记牢==，
      **概念题常考"$\operatorname{div}(\operatorname{grad}u)$ 是什么类型"这种。**

      $$\operatorname{grad}:\ \text{数}\to\text{向},\qquad
      \operatorname{div}:\ \text{向}\to\text{数},\qquad
      \operatorname{rot}:\ \text{向}\to\text{向}$$

      **旋度的行列式写法**：
      $$\operatorname{rot}\vec F=\begin{vmatrix}
      \vec i&\vec j&\vec k\\[2pt]
      \dfrac{\partial}{\partial x}&\dfrac{\partial}{\partial y}&\dfrac{\partial}{\partial z}\\[6pt]
      P&Q&R
      \end{vmatrix}
      =\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right)$$

      ==注意第二个分量是 $P_z-R_x$（不是 $R_x-P_z$）==，
      **来自行列式展开时 $\vec j$ 前的负号。**

      **拉普拉斯算子**：
      $$\Delta u=\operatorname{div}\left(\operatorname{grad}u\right)
      =u_{xx}+u_{yy}+u_{zz}$$
      ==$\Delta u=0$ 的函数叫调和函数==（考纲外，但常在题目中出现）。
    ` },

    { t: 'key', id: 'physical', title: '散度与旋度的物理意义', c: String.raw`
      **散度 $=$ 单位体积的"发散量"**：
      $$\operatorname{div}\vec F(M)=\lim_{\Omega\to M}\frac{1}{V(\Omega)}\oiint_{\partial\Omega}\vec F\cdot\d\vec S$$
      ==即"从该点流出的通量密度"==。

      | $\operatorname{div}$ | 含义 |
      |---|---|
      | $>0$ | ==源==（流体从此涌出） |
      | $<0$ | ==汇==（流体在此消失） |
      | $\equiv0$ | ==无源场==（不可压缩） |

      **旋度 $=$ 单位面积的"环流量"**：
      $$\operatorname{rot}\vec F\cdot\vec n=\lim_{\Sigma\to M}\frac{1}{S}\oint_{\partial\Sigma}\vec F\cdot\d\vec r$$
      ==即"绕该点旋转的强度"==，方向是旋转轴（右手法则）。

      | $\operatorname{rot}$ | 含义 |
      |---|---|
      | $\ne\vec0$ | 该点处流体在打转 |
      | $\equiv\vec0$ | ==无旋场==（保守场） |

      $$\boxed{\ \text{高斯公式}=\text{散度的定义在整体上的积分形式};\qquad
      \text{斯托克斯}=\text{旋度的}\ }$$
      ==两条大公式就是这两个"局部定义"积分起来的结果==——
      **理解了这一点，公式就不需要背了。**
    ` },

    { t: 'key', id: 'identities', title: '两个恒等式（记住能省很多事）', c: String.raw`
      $$\boxed{\ \operatorname{rot}\left(\operatorname{grad}u\right)=\vec0\ }$$
      =="梯度场无旋"==。
      理由：$\left(u_y\right)_z=\left(u_z\right)_y$（[混合偏导可交换](#/calculus/multi-derivative/concepts?at=partial)），
      ==每个分量都是两个相等的量相减==。

      $$\boxed{\ \operatorname{div}\left(\operatorname{rot}\vec F\right)=0\ }$$
      =="旋度场无源"==。
      同样由混合偏导相消得到。

      **它们的用处**：

      | 场合 | 用法 |
      |---|---|
      | 判断某向量场是否为梯度场 | ==$\operatorname{rot}\ne\vec0$ 则一定不是== |
      | [斯托克斯选曲面](#/calculus/line-surface/gauss-stokes?at=stokes) | ==保证结果与所选曲面无关== |
      | 简化计算 | 看到 $\operatorname{div}\operatorname{rot}$ 直接写 $0$ |

      ==第二行值得展开==：斯托克斯公式允许任选以 $\Gamma$ 为边界的曲面，
      ==两个不同的曲面 $\Sigma_1,\Sigma_2$ 合起来是闭曲面==，
      对它用高斯公式：
      $$\oiint\operatorname{rot}\vec F\cdot\d\vec S
      =\iiint\operatorname{div}\left(\operatorname{rot}\vec F\right)\d V=0,$$
      ==所以两个曲面上的积分相等== $\checkmark$
      **这就是"曲面可以任选"的证明。**
    ` },

    { t: 'compare',
      id: 'conservative',
      title: '★ 保守场（有势场）的等价条件',
      cols: ['说法', '内容'],
      rows: [
        ['**保守**', '$\\displaystyle\\oint_\\Gamma\\vec F\\cdot\\d\\vec r=0$ 对一切闭曲线'],
        ['**路径无关**', '$\\displaystyle\\int_{\\Gamma}\\vec F\\cdot\\d\\vec r$ 只依赖起点终点'],
        ['**有势**', '存在 $u$ 使 $\\vec F=\\operatorname{grad}u$'],
        ['**无旋**', '==$\\operatorname{rot}\\vec F=\\vec0$=='],
      ] },

    { t: 'md', c: String.raw`
      **四者在==单连通区域==上等价。**

      =="单连通"这个前提不能丢==：
      在挖了洞的区域上，==无旋推不出保守==。
      经典反例是 $\vec F=\left(\frac{-y}{x^{2}+y^{2}},\frac{x}{x^{2}+y^{2}},0\right)$，
      ==它无旋，但绕原点一圈的环流是 $2\pi\ne0$==，
      见[那道挖洞的例题](#/calculus/line-surface/green?at=ex-ellipse-hole)。

      **势函数 $u$ 怎么求**（==与[全微分方程](#/calculus/ode/first-order?at=bernoulli-exact)同一个动作==）：
      $$u(x,y,z)=\int_{x_0}^{x}P(t,y_0,z_0)\dt+\int_{y_0}^{y}Q(x,s,z_0)\d s
      +\int_{z_0}^{z}R(x,y,\tau)\d\tau$$
      ==沿"先 $x$ 再 $y$ 再 $z$"的折线积分==，
      **注意每一步都要把前面已经变成变量的坐标代进去。**

      有了 $u$ 之后
      $$\int_A^B\vec F\cdot\d\vec r=u(B)-u(A),$$
      ==这就是[牛顿–莱布尼茨公式的向量版本](#/calculus/line-surface/line-integral?at=ex-second)==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-compute',
      title: '计算散度与旋度',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $\vec F=\left(x^{2}y,\ yz^{2},\ zx^{2}\right)$，$u=xyz$。求：

        1. $\operatorname{div}\vec F$ 与 $\operatorname{rot}\vec F$；
        2. $\operatorname{grad}u$，并验证 $\operatorname{rot}\left(\operatorname{grad}u\right)=\vec0$。
      `,
      idea: String.raw`
        ==直接套定义==，注意旋度第二个分量的符号。

        **散度**：三个"同名偏导"相加，
        $$\pd{}{x}\left(x^{2}y\right)+\pd{}{y}\left(yz^{2}\right)+\pd{}{z}\left(zx^{2}\right)
        =2xy+z^{2}+x^{2}.$$

        **旋度**：$P=x^{2}y$，$Q=yz^{2}$，$R=zx^{2}$，
        $$\operatorname{rot}\vec F=\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right).$$
        ==逐个算==：
        - $R_y=\pd{}{y}(zx^{2})=0$，$Q_z=\pd{}{z}(yz^{2})=2yz$ $\Rightarrow$ 第一分量 $-2yz$；
        - $P_z=0$，$R_x=2zx$ $\Rightarrow$ 第二分量 $-2zx$；
        - $Q_x=0$，$P_y=x^{2}$ $\Rightarrow$ 第三分量 $-x^{2}$。

        **第 2 问**：$\operatorname{grad}(xyz)=(yz,xz,xy)$，
        ==再算它的旋度，应当全零==。
      `,
      solution: String.raw`
        **(1)** $P=x^{2}y$，$Q=yz^{2}$，$R=zx^{2}$。

        **散度**：
        $$\operatorname{div}\vec F=\pd Px+\pd Qy+\pd Rz
        =2xy+z^{2}+x^{2}.$$

        **旋度**：
        $$\operatorname{rot}\vec F=\begin{vmatrix}
        \vec i&\vec j&\vec k\\
        \dfrac{\partial}{\partial x}&\dfrac{\partial}{\partial y}&\dfrac{\partial}{\partial z}\\
        x^{2}y&yz^{2}&zx^{2}
        \end{vmatrix}$$
        $$=\vec i\left(0-2yz\right)-\vec j\left(2zx-0\right)+\vec k\left(0-x^{2}\right)$$
        $$=\left(-2yz,\ -2zx,\ -x^{2}\right).$$

        **(2)** $u=xyz$：
        $$\operatorname{grad}u=\left(u_x,u_y,u_z\right)=(yz,\ xz,\ xy).$$

        **验证**：记 $\vec G=\operatorname{grad}u=(yz,xz,xy)$，则
        $$\operatorname{rot}\vec G=\begin{vmatrix}
        \vec i&\vec j&\vec k\\
        \partial_x&\partial_y&\partial_z\\
        yz&xz&xy
        \end{vmatrix}$$
        $$=\vec i\left(\pd{(xy)}{y}-\pd{(xz)}{z}\right)
        -\vec j\left(\pd{(xy)}{x}-\pd{(yz)}{z}\right)
        +\vec k\left(\pd{(xz)}{x}-\pd{(yz)}{y}\right)$$
        $$=\vec i\left(x-x\right)-\vec j\left(y-y\right)+\vec k\left(z-z\right)=\vec0\ \checkmark$$
      `,
      comment: String.raw`
        **验证过程展示了恒等式的机制**：
        ==每个分量都是"同一个二阶混合偏导算了两次再相减"==，
        $$u_{zy}-u_{yz}=0,\quad u_{xy}-u_{yx}=0,\quad u_{xz}-u_{zx}=0,$$
        ==全靠[混合偏导可交换](#/calculus/multi-derivative/concepts?at=partial)==。

        **所以 $\vec F=(x^{2}y,yz^{2},zx^{2})$ 不是梯度场**：
        它的旋度 $(-2yz,-2zx,-x^{2})\ne\vec0$，
        ==由[保守场的等价条件](#/calculus/line-surface/field-theory?at=conservative)，
        它不可能写成某个 $u$ 的梯度== $\checkmark$

        **旋度第二分量的符号是高频错误**：
        $$\text{第二分量}=P_z-R_x\quad(\text{不是}\ R_x-P_z)$$
        ==来自 $\vec j$ 前的负号：$-\left(R_x-P_z\right)=P_z-R_x$==。
        **建议每次都按行列式展开，不要凭记忆写分量。**

        **一个快速自检**：$\vec F=\operatorname{grad}u$ 时
        ==三个分量必须满足两两"交叉相等"==：
        $$P_y=Q_x,\qquad Q_z=R_y,\qquad P_z=R_x.$$
        本题 $P_y=x^{2}$ 而 $Q_x=0$，==第一条就不满足== $\Rightarrow$ 非梯度场。
        ==这比算完整的旋度快。==
      `,
    },

    { t: 'example',
      id: 'ex-potential',
      title: '★ 求势函数并用它算积分',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $\vec F=\left(2xy+z,\ x^{2},\ x\right)$。

        1. 验证 $\vec F$ 是保守场；
        2. 求其势函数 $u$；
        3. 计算 $\displaystyle\int_{\Gamma}\vec F\cdot\d\vec r$，
           其中 $\Gamma$ 是从 $(0,0,0)$ 到 $(1,1,1)$ 的任意路径。
      `,
      idea: String.raw`
        **第 1 问：算旋度。**
        $P=2xy+z$，$Q=x^{2}$，$R=x$。
        - $R_y-Q_z=0-0=0$；
        - $P_z-R_x=1-1=0$；
        - $Q_x-P_y=2x-2x=0$。

        ==旋度为零，且 $\R^{3}$ 是单连通的==，故保守 $\checkmark$

        **第 2 问：折线积分法**（[最机械可靠](#/calculus/line-surface/field-theory?at=conservative)）。
        取 $(x_0,y_0,z_0)=(0,0,0)$：
        $$u=\int_0^{x}P(t,0,0)\dt+\int_0^{y}Q(x,s,0)\d s+\int_0^{z}R(x,y,\tau)\d\tau.$$
        - $P(t,0,0)=2t\cdot0+0=0$ $\Rightarrow$ 第一项为 $0$；
        - $Q(x,s,0)=x^{2}$ $\Rightarrow$ 第二项 $=x^{2}y$；
        - $R(x,y,\tau)=x$ $\Rightarrow$ 第三项 $=xz$。

        ==$u=x^{2}y+xz$==。

        **验证**：$u_x=2xy+z\ \checkmark$，$u_y=x^{2}\ \checkmark$，$u_z=x\ \checkmark$

        **第 3 问**：$u(1,1,1)-u(0,0,0)=(1+1)-0=2$。

        ==也可以直接凑微分==：
        $(2xy+z)\dx+x^{2}\dy+x\d z=\d\left(x^{2}y\right)+\d(xz)=\d\left(x^{2}y+xz\right)$，
        **一眼就看出来了。**
      `,
      solution: String.raw`
        **(1)** $P=2xy+z$，$Q=x^{2}$，$R=x$。
        $$\operatorname{rot}\vec F=\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right)
        =\left(0-0,\ 1-1,\ 2x-2x\right)=\vec0.$$
        由于 $\vec F$ 在整个 $\R^{3}$（单连通）上有连续偏导且无旋，
        故 $\vec F$ 为==保守场==。

        **(2)** 取起点 $(0,0,0)$，沿折线积分：
        $$u(x,y,z)=\int_0^{x}P(t,0,0)\dt+\int_0^{y}Q(x,s,0)\d s+\int_0^{z}R(x,y,\tau)\d\tau.$$

        - $P(t,0,0)=2t\cdot0+0=0$，故 $\displaystyle\int_0^{x}0\dt=0$；
        - $Q(x,s,0)=x^{2}$，故 $\displaystyle\int_0^{y}x^{2}\d s=x^{2}y$；
        - $R(x,y,\tau)=x$，故 $\displaystyle\int_0^{z}x\,\d\tau=xz$。

        故
        $$u(x,y,z)=x^{2}y+xz.$$

        **验证**：
        $$u_x=2xy+z=P\ \checkmark,\qquad u_y=x^{2}=Q\ \checkmark,\qquad u_z=x=R\ \checkmark$$

        **(3)** 由保守场的性质，
        $$\int_\Gamma\vec F\cdot\d\vec r=u(1,1,1)-u(0,0,0)
        =\left(1^{2}\cdot1+1\cdot1\right)-0=2.$$
      `,
      comment: String.raw`
        **两条求势函数的路线对照**：

        | 方法 | 优点 | 缺点 |
        |---|---|---|
        | ==凑微分== | 一眼看出时极快 | 复杂时看不出来 |
        | ==折线积分== | ==完全机械，一定成功== | 要写三个积分 |
        | 逐个偏积分 | 中等 | 要处理待定函数 |

        ==考场上先试凑微分（十秒），不行就上折线积分==。

        **折线积分公式里的"代入"很关键**：
        第二个积分是 $Q(x,s,0)$——==$x$ 已经是变量了，但 $z$ 还是 $0$==；
        第三个是 $R(x,y,\tau)$——==$x,y$ 都是变量了==。
        ==把这个顺序搞乱会得到错误的 $u$==，
        **所以验证 $\operatorname{grad}u=\vec F$ 这一步不能省。**

        **第三种方法（逐个偏积分）**：
        由 $u_x=2xy+z$ 得
        $$u=x^{2}y+xz+g(y,z);$$
        由 $u_y=x^{2}+g_y=x^{2}$ 得 $g_y=0$，故 $g=g(z)$；
        由 $u_z=x+g'(z)=x$ 得 $g'=0$，故 $g=C$。
        ==得 $u=x^{2}y+xz+C$==，与折线法一致（差一个常数，不影响积分值）。

        **势函数差一个常数不影响结果**：
        $$\left[u(B)+C\right]-\left[u(A)+C\right]=u(B)-u(A),$$
        ==所以不必纠结 $C$==。

        **这道题把全书串了起来**：
        无旋 $\to$ 保守 $\to$ 有势 $\to$ 用势函数算积分，
        ==正是[牛顿–莱布尼茨](#/calculus/definite/properties?at=definition)在三维的完整形态==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **算子的输入输出类型搞混**：
         ==$\operatorname{grad}$ 数$\to$向，$\operatorname{div}$ 向$\to$数，$\operatorname{rot}$ 向$\to$向==。
      2. **旋度第二分量符号写反**：==是 $P_z-R_x$==，按行列式展开最稳。
      3. **由无旋断言保守却不验单连通**：==挖洞区域上不成立==。
      4. **折线积分求势函数时代入顺序错**：==第二段 $z$ 还是 $z_0$==。
      5. **求出 $u$ 不验证**：==$\operatorname{grad}u=\vec F$ 要验三个分量==。
      6. **写 $\operatorname{div}(\operatorname{rot}\vec F)$ 时老实计算**：==恒为 $0$==。
      7. **梯度场判据只验一个等式**：==要三个交叉相等全满足==。
      8. **把散度写成向量、旋度写成数**：==类型错误==。
    ` },

    { t: 'md', c: String.raw`
      ---

      **高等数学十二章到此结束。**

      回头看，全书其实在反复做同一件事：==把"整体的量"拆成"局部的变化率"再累加回去==。

      $$\underbrace{\text{导数}}_{\text{局部变化率}}
      \ \longrightarrow\ \underbrace{\text{积分}}_{\text{累加}}
      \ \longrightarrow\ \underbrace{\text{牛顿-莱布尼茨}}_{\text{两者互逆}}$$

      而这条线在更高维度上不断重演：

      | 维度 | 局部 | 整体 | 联系两者的定理 |
      |---|---|---|---|
      | 一维 | $f'$ | $\int_a^bf'$ | 牛顿–莱布尼茨 |
      | 二维 | 偏导 | 二重积分 | [格林](#/calculus/line-surface/green?at=meaning) |
      | 三维 | 散度 | 三重积分 | [高斯](#/calculus/line-surface/gauss-stokes?at=gauss) |
      | 曲面上 | 旋度 | 曲面积分 | [斯托克斯](#/calculus/line-surface/gauss-stokes?at=stokes) |

      ==四行说的是同一句话：$\int_{\partial\Omega}\omega=\int_\Omega\d\omega$==。

      按"动作"重新组织这些内容的另一张地图，
      见[跨章节手法主线](#/threads/map/overview?at=thesis)。
    ` },

  ],
});
