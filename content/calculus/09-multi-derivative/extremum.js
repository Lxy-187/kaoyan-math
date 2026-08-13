/* ==========================================================================
   高等数学 / 9 多元函数微分学 / 极值、条件极值与最值
   ========================================================================== */

KM.page({
  path: 'calculus/multi-derivative/extremum',
  title: '极值、条件极值与最值',
  subtitle: '无条件极值靠 Hessian 判别，条件极值靠拉格朗日 —— 难点全在解那个非线性方程组',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-10',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'unconditional', c: '一、无条件极值' },

    { t: 'steps', id: 'uncond-steps', title: '两步走', items: [
      { title: '求驻点',
        c: String.raw`令 $\begin{cases}f_x(x,y)=0\\ f_y(x,y)=0\end{cases}$，解出所有驻点 $(x_0,y_0)$。
                      ==别漏解==：这个方程组常有多组解，漏一组就丢分。` },
      { title: '用二阶偏导数判别',
        c: String.raw`在每个驻点算 $A=f_{xx}$、$B=f_{xy}$、$C=f_{yy}$，
                      按下面的表判定。` },
    ] },

    { t: 'key', id: 'hessian', title: 'Hessian 判别法', c: String.raw`
      记 $A=f_{xx}(x_0,y_0)$，$B=f_{xy}(x_0,y_0)$，$C=f_{yy}(x_0,y_0)$：

      | 条件 | 结论 |
      |---|---|
      | $AC-B^{2}>0$ 且 $A>0$ | ==极小值== |
      | $AC-B^{2}>0$ 且 $A<0$ | ==极大值== |
      | $AC-B^{2}<0$ | ==不是极值==（鞍点） |
      | $AC-B^{2}=0$ | ==判别法失效==，需用定义或泰勒公式另行判断 |

      记忆：$AC-B^{2}>0$ 决定"是不是极值"，$A$ 的符号决定"是大还是小"
      （==和一元的 $f''>0$ 取极小完全一致==）。

      $AC-B^2=0$ 的情形考研中出得很少，真遇到就直接看 $f(x,y)-f(x_0,y_0)$ 在
      该点附近的符号能不能定号。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'lagrange', c: '二、条件极值与拉格朗日乘数法' },

    { t: 'steps', id: 'lagrange-steps', title: '标准流程', items: [
      { title: '构造辅助函数',
        c: String.raw`在约束 $\varphi(x,y,z)=0$ 下求 $f(x,y,z)$ 的极值，令
                      $$L(x,y,z,\lambda)=f(x,y,z)+\lambda\varphi(x,y,z).$$
                      多个约束就多加几个 $\lambda$：$L=f+\lambda_1\varphi_1+\lambda_2\varphi_2$。` },
      { title: '列方程组',
        c: String.raw`$$L_x=0,\quad L_y=0,\quad L_z=0,\quad L_\lambda=\varphi(x,y,z)=0 .$$
                      ==最后一个方程就是原约束条件==，别漏。` },
      { title: '解方程组（真正的难点）',
        c: String.raw`这是个非线性方程组，见下面的技巧。` },
      { title: '比较函数值',
        c: String.raw`把所有解代入 $f$ 比大小，最大者为最大值、最小者为最小值。
                      ==条件极值通常不做二阶判别==——实际问题里最值一定存在，
                      驻点又只有有限个，比大小即可。` },
    ] },

    { t: 'method', id: 'solve-tricks', title: '解方程组的三个通用招式', c: String.raw`
      拉格朗日方程组几乎都是非线性的，硬解会卡死。按这个顺序试：

      **① 消 $\lambda$**
      从前几个方程分别解出 $\lambda$（如 $\lambda=-\frac{f_x}{\varphi_x}$），令它们相等，
      $\lambda$ 就消掉了，剩下只含 $x,y,z$ 的方程。

      **② 两式相除或相减，提公因式**
      相除能约掉大量重复因子；相减后往往能==因式分解==成 $(x-y)(\cdots)=0$ 的形式，
      从而分情况讨论。这是最常用的一招。

      **③ 利用轮换对称性**
      若方程组把 $x,y,z$ 任意对调后形式不变（==轮换对称==），
      则通常存在 $x=y=z$ 的解。==但不能只写这一组==——
      还要讨论"不全相等"的分支，否则会漏掉边界上的最值点。
    ` },

    { t: 'method', id: 'symmetry-preserve', title: '为什么不消元：拉格朗日买的是「对称性」', c: String.raw`
      条件极值当然可以消元：从 $\varphi=0$ 解出 $z$ 代进 $f$，化成二元无条件极值。
      ==理论上完全可行，但常常算不动==。

      原因不在于多了一个变量，而在于**消元会破坏原变量之间的代数对称性**：
      代入 $z=C-x-y$ 之后，原本干干净净的平方和会炸出一堆
      $x^2,\;y^2,\;xy,\;x,\;y$ 的交叉项，求偏导后得到系数极其难看的二元一次方程组。

      拉格朗日反其道而行：==多引入一个未知数 $\lambda$，换来三个方程形式完全一致==。
      $L_x,L_y,L_z$ 各自只含一个变量，比例关系一眼可见，
      $\lambda$ 在下一步就被消掉了。

      **判据**：目标函数和约束对各变量的地位越对称，消元越亏、拉格朗日越赚。
    ` },

    { t: 'key', id: 'cauchy-quadratic', title: '秒杀：一次约束下求二次型最小值', c: String.raw`
      形如"已知 $\displaystyle\sum c_ix_i=C$，求 $\displaystyle\sum a_ix_i^{2}$ 的最小值"（$a_i>0$）
      的问题，用**柯西–施瓦茨不等式**可以跳过全部微积分：

      $$\left(\sum a_ix_i^{2}\right)\left(\sum\frac{c_i^{2}}{a_i}\right)
      \ \ge\ \left(\sum c_ix_i\right)^{2}=C^{2}$$

      $$\boxed{\ \min\sum a_ix_i^{2}=\frac{C^{2}}{\displaystyle\sum\frac{c_i^{2}}{a_i}}\ }$$

      取等条件 $\dfrac{a_1x_1}{c_1}=\dfrac{a_2x_2}{c_2}=\cdots$，
      ==和拉格朗日解出的比例关系完全一致==（本来就是同一件事的两种说法）。

      **怎么凑**：把 $\sum a_ix_i^2$ 看成 $\sum\left(\sqrt{a_i}\,x_i\right)^2$，
      另一组取 $\dfrac{c_i}{\sqrt{a_i}}$，点乘出来正好是 $\sum c_ix_i$。

      积分形式见
      [证明题总纲 · 柯西–施瓦茨](#/calculus/derivative-app/proof-overview?at=cauchy-schwarz)。
    ` },

    { t: 'warn', id: 'trap-skip', title: '这一节最大的坑：觉得眼熟就跳步', c: String.raw`
      这三个板块（几何应用、极值、方向导数）的底层逻辑高度依赖==偏导数与代数运算==，
      步骤看着都很熟，于是很容易在脑子里"过一遍"就翻页。

      但真题的区分度恰恰藏在==需要具体落地的代数化简与符号判断==里：
      拉格朗日方程组怎么分解、叉乘中间项的负号、显函数法向量的 $-1$ ——
      这些地方脑内演算全都会自动跳过。

      ==必须真的把方程组解到底==，只看解答等于没做。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'maxmin', c: '三、有界闭区域上的最值' },

    { t: 'method', id: 'maxmin-method', title: '内部 + 边界，两路都要走', c: String.raw`
      求 $f(x,y)$ 在有界闭区域 $D$ 上的最大最小值：

      1. **内部**：求 $D$ 内部的驻点，算出函数值（==不必判别是极大还是极小==，
         最后统一比大小）；
      2. **边界**：把边界方程代入化成一元函数求最值，或用==拉格朗日乘数法==；
      3. **比大小**：把 1、2 得到的所有值放在一起，最大的是最大值，最小的是最小值。

      ==漏掉边界是这类题最常见的错法。== 有界闭区域上连续函数必有最值
      （[最值定理](#/calculus/limit/closed-interval?at=four-theorems)），
      而最值点要么在内部驻点、要么在边界上。

      **几何题的常见变形**：求曲面上到某点 / 某平面距离最短的点，
      通常先把"距离"换成"距离的平方"（避免根号，驻点相同），再做条件极值；
      或者改用[切平面平行](#/calculus/multi-derivative/geometry-app?at=condition-map)的几何条件，往往更快。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'insight', id: 'why-elimination-hard', title: '我的卡点：用二元极值做，量太大', c: String.raw`
      这题我==尝试用二元微分的极值去算，计算量太大==。

      **卡在哪**：消元本身没错，错在它把对称性弄丢了。
      原来的 $S=\frac{x^{2}}{4\pi}+\frac{y^{2}}{16}+\frac{\sqrt3z^{2}}{36}$
      三项地位完全一样，谁也不比谁复杂；
      一旦代入 $z=2-x-y$，就炸出 $x^{2},y^{2},xy,x,y$ 一堆交叉项，
      求偏导后是一个系数极难看的二元一次方程组 —— 这就是"算不动"的根源。

      **该有的反应**：==看到"目标函数和约束对各变量对称"，就不要消元==，
      直接上拉格朗日。多设一个 $\lambda$，换来三个形式一致的方程，
      比例关系一眼就能看出来。
      更狠的是这题还是"一次约束 + 平方和"的标准型，
      [柯西不等式](#/calculus/multi-derivative/extremum?at=cauchy-quadratic)可以直接秒。
    ` },

    { t: 'example',
      id: 'ex-wire',
      title: '铁丝分三段围圆、正方形、正三角形，求面积和的最小值',
      source: '经典应用题',
      level: 3,
      problem: String.raw`
        将长为 $2\,\mathrm{m}$ 的铁丝分成三段，依次围成圆、正方形与正三角形。
        三个图形的面积之和是否存在最小值？若存在，求出最小值。
      `,
      idea: String.raw`
        **第一步永远是把几何量翻译成代数式。** 设三段长为 $x,y,z$，
        每段的长度就是对应图形的==周长==，由周长反解出半径 / 边长，再写面积：

        - 圆：$2\pi r=x\Rightarrow r=\frac{x}{2\pi}$，$S_1=\pi r^{2}=\frac{x^{2}}{4\pi}$；
        - 正方形：边长 $\frac y4$，$S_2=\frac{y^{2}}{16}$；
        - 正三角形：边长 $\frac z3$，$S_3=\frac{\sqrt3}{4}\left(\frac z3\right)^{2}=\frac{\sqrt3z^{2}}{36}$。

        写出来就看清了本质：==目标是平方和，约束是一次的==，
        三个变量地位完全对称。这正是拉格朗日（或柯西不等式）的主场，
        而消元恰恰会把这份对称性毁掉。

        **注意题目先问"是否存在"**，不能上来就求。
        $x,y,z>0$ 是开区域，开区域上最值未必存在，需要专门交代一句（见解答）。
      `,
      solution: String.raw`
        设三段长分别为 $x,y,z>0$，则
        $$S(x,y,z)=\frac{x^{2}}{4\pi}+\frac{y^{2}}{16}+\frac{\sqrt3}{36}z^{2},
        \qquad x+y+z=2 .$$

        **存在性。** $S$ 在闭三角形
        $D=\{x,y,z\ge0,\;x+y+z=2\}$ 上连续，$D$ 是有界闭集，
        由[最值定理](#/calculus/limit/closed-interval?at=four-theorems)最小值存在；
        下面求出的驻点满足 $x,y,z>0$，且其函数值小于任一边界值，故最小值在内部取得。

        ---

        **方法一：拉格朗日乘数法。**

        构造
        $$L=\frac{x^{2}}{4\pi}+\frac{y^{2}}{16}+\frac{\sqrt3}{36}z^{2}+\lambda(x+y+z-2),$$
        令
        $$\begin{cases}
        L_x=\dfrac{x}{2\pi}+\lambda=0\\[4pt]
        L_y=\dfrac{y}{8}+\lambda=0\\[4pt]
        L_z=\dfrac{\sqrt3\,z}{18}+\lambda=0\\[4pt]
        L_\lambda=x+y+z-2=0
        \end{cases}$$

        前三式给出统一的比例关系（注意 $\frac{\sqrt3z}{18}=\frac{z}{6\sqrt3}$）：
        $$-\lambda=\frac{x}{2\pi}=\frac{y}{8}=\frac{z}{6\sqrt3}\;\triangleq\;k ,$$
        即
        $$x=2\pi k,\qquad y=8k,\qquad z=6\sqrt3\,k .$$

        代入约束：
        $$2\pi k+8k+6\sqrt3\,k=2
        \;\Longrightarrow\; 2k\left(\pi+4+3\sqrt3\right)=2
        \;\Longrightarrow\; k=\frac{1}{\pi+4+3\sqrt3}.$$

        代回目标函数：
        $$S=\frac{(2\pi k)^{2}}{4\pi}+\frac{(8k)^{2}}{16}+\frac{\sqrt3\left(6\sqrt3k\right)^{2}}{36}
        =\pi k^{2}+4k^{2}+3\sqrt3\,k^{2}=\left(\pi+4+3\sqrt3\right)k^{2},$$
        故
        $$S_{\min}=\left(\pi+4+3\sqrt3\right)\cdot\frac{1}{\left(\pi+4+3\sqrt3\right)^{2}}
        =\frac{1}{\pi+4+3\sqrt3}\ \left(\mathrm{m}^{2}\right).$$

        ---

        **方法二：柯西–施瓦茨不等式（一步到位）。**

        把 $S$ 写成平方和 $S=a_1^{2}+a_2^{2}+a_3^{2}$，其中
        $$a_1=\frac{x}{\sqrt{4\pi}},\qquad a_2=\frac{y}{4},\qquad a_3=\frac{\sqrt[4]{3}\,z}{6},$$
        再取 $b_i$ 使 $a_ib_i$ 还原出 $x,y,z$：
        $$b_1=\sqrt{4\pi},\qquad b_2=4,\qquad b_3=\frac{6}{\sqrt[4]{3}},$$
        于是 $b_1^{2}+b_2^{2}+b_3^{2}=4\pi+16+12\sqrt3$，且
        $a_1b_1+a_2b_2+a_3b_3=x+y+z=2$。由柯西不等式
        $$S\cdot\left(4\pi+16+12\sqrt3\right)\ \ge\ (x+y+z)^{2}=4 ,$$
        即
        $$S\cdot 4\left(\pi+4+3\sqrt3\right)\ge 4
        \;\Longrightarrow\; S\ \ge\ \frac{1}{\pi+4+3\sqrt3}.$$
        等号当且仅当 $\dfrac{a_1}{b_1}=\dfrac{a_2}{b_2}=\dfrac{a_3}{b_3}$，
        即 $\dfrac{x}{2\pi}=\dfrac{y}{8}=\dfrac{z}{6\sqrt3}$ 时成立，
        与方法一的比例关系完全一致。

        ---

        **结论**：面积之和存在最小值，
        $$S_{\min}=\frac{1}{\pi+4+3\sqrt3}\ \mathrm{m^{2}}\approx 0.081\,\mathrm{m^{2}} .$$
      `,
      comment: String.raw`
        **一个很好用的自检**：分配比例是
        $$x:y:z=2\pi:8:6\sqrt3=\pi:4:3\sqrt3 ,$$
        而 ==$\pi+4+3\sqrt3$ 恰好就是最后答案的分母==。
        这不是巧合：$x_i\propto \frac{1}{a_i}$，比例份数之和与分母同源。
        算完对一眼比例和分母，能立刻发现低级错误。

        **数值感**：$S_{\min}\approx0.081$。而全部围成圆是 $\frac1\pi\approx0.318$、
        全围正方形 $0.25$、全围正三角形 $\approx0.192$。
        ==分得越散，总面积越小==（面积是周长的二次函数，拆分必然减小平方和）。
        所以这题只有最小值、==没有最大值==（最大值在边界"全给圆"处取到，
        但那已经不算"分成三段"了）。

        **同族变式**：
        换成 $n$ 个任意正多边形、或加权求 $\sum a_ix_i^{2}$ 的最值，
        [通用公式](#/calculus/multi-derivative/extremum?at=cauchy-quadratic)
        $\min=\frac{C^{2}}{\sum c_i^{2}/a_i}$ 一步就能写出答案，不必重推。

        **反过来问也常考**：固定总面积求周长和最小，做法对称。
      `,
    },

    { t: 'warn', id: 'pitfalls', title: '易错清单', c: String.raw`
      1. **驻点漏解**：$f_x=0,f_y=0$ 的方程组常有多组解，尤其是含平方或三角函数时。
      2. **忘记 $L_\lambda=0$**：那个方程就是原约束，漏了必然解错。
      3. **只写 $x=y=z$ 的对称解**：轮换对称只是"通常有"这样的解，==不代表只有==。
      4. **条件极值做二阶判别**：多此一举且容易出错，直接比函数值。
      5. **有界闭区域最值只看内部**：边界必须单独处理。
      6. **距离问题不平方**：带根号求导会麻烦一倍，且容易算错。
      7. **对称问题硬消元**：目标与约束对各变量对称时，
         [消元会毁掉对称性](#/calculus/multi-derivative/extremum?at=symmetry-preserve)，
         算不动是必然的，不是你算错了。
      8. **题目问"是否存在"却直接开算**：开区域上最值未必存在，
         要先交代存在性（扩到闭集用最值定理，或说明驻点唯一 + 实际背景）。
    ` },

  ],
});
