/* ==========================================================================
   高等数学 / 9 多元函数微分学 / 复合与隐函数求导
   —— 多元链式法则（画树图）与隐函数求导公式。
      可微性见 multi-derivative/concepts。
   ========================================================================== */

KM.page({
  path: 'calculus/multi-derivative/chain-rule',
  title: '复合与隐函数求导',
  subtitle: '多元链式法则的全部内容是**画一张树图**：有几条路径就有几项，每条路径上的导数相乘',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'chain-core', title: '★ 链式法则：路径求和，路径内相乘', c: String.raw`
      设 $z=f(u,v)$，$u=u(x,y)$，$v=v(x,y)$，则
      $$\boxed{\ \pd zx=\pd zu\pd ux+\pd zv\pd vx\ }$$

      **两条口诀**：
      $$\text{**有几条路径通到 }x\text{，就有几项**（加法）}$$
      $$\text{**每条路径上经过几个环节，就乘几个导数**（乘法）}$$

      **画树图的方法**：
      $$z\ \longrightarrow\ \begin{cases}u\\ v\end{cases}\ \longrightarrow\ \begin{cases}x\\ y\end{cases}$$
      ==从 $z$ 出发走到 $x$，数一数有几条路==：
      $z\to u\to x$ 和 $z\to v\to x$，==两条，所以两项==。

      **变量个数不同的情形**：

      | 结构 | $\deriv zx$ 或 $\pd zx$ |
      |---|---|
      | $z=f(u,v),\ u=u(x),v=v(x)$ | $\deriv zx=\pd zu\deriv ux+\pd zv\deriv vx$（==全导数==） |
      | $z=f(x,y),\ y=y(x)$ | $\deriv zx=\pd fx+\pd fy\deriv yx$ |
      | $z=f(u),\ u=u(x,y)$ | $\pd zx=f'(u)\pd ux$ |

      ==第二行最容易错==：$\deriv zx$ 与 $\pd fx$ ==是两个不同的东西==。
      $\pd fx$ 只管"$x$ 直接进入 $f$"的那条路，
      ==$\deriv zx$ 还要加上"$x$ 通过 $y$ 间接影响"的那条==。
      **这个区别是本节头号考点。**
    ` },

    { t: 'warn', id: 'notation', title: '记号的坑：$f_1\'$ 与 $f_2\'$', c: String.raw`
      抽象复合函数题里普遍使用简记：
      $$f_1'=\pd fu\ \text{（对第 1 个位置求导）},\qquad f_2'=\pd fv$$
      $$f_{11}''=\pd{^{2}f}{u^{2}},\qquad f_{12}''=\frac{\partial^{2}f}{\partial u\partial v},\ \dots$$

      ==下标指的是"第几个自变量位置"，不是"对哪个字母"==。

      **求二阶导时的关键认识**：
      $$\boxed{\ f_1'\ \text{和}\ f\ \text{一样，仍是**同一组中间变量**的函数}\ }$$
      ==所以对 $f_1'$ 再求导，要再走一遍链式法则==。

      **例**：$z=f(xy,\,x+y)$，记 $u=xy$、$v=x+y$。
      $$\pd zx=yf_1'+f_2',$$
      $$\pd{^{2}z}{x\partial y}=\pd{}{y}\left(yf_1'+f_2'\right)
      =\underbrace{f_1'}_{y\ \text{的导}}+y\pd{f_1'}{y}+\pd{f_2'}{y}.$$
      而
      $$\pd{f_1'}{y}=xf_{11}''+f_{12}'',\qquad \pd{f_2'}{y}=xf_{21}''+f_{22}''.$$
      合并（用 $f_{12}''=f_{21}''$）：
      $$\pd{^{2}z}{x\partial y}=f_1'+xyf_{11}''+(x+y)f_{12}''+f_{22}''.$$

      **两个最常见的错误**：

      1. ==把 $f_1'$ 当成常数==（忘了它还是 $u,v$ 的函数）；
      2. ==漏掉乘积法则那一项==（本例的第一个 $f_1'$）。
    ` },

    { t: 'key', id: 'implicit-formula', title: '隐函数求导公式', c: String.raw`
      **一个方程、两个变量**：$F(x,y)=0$ 确定 $y=y(x)$ 时
      $$\boxed{\ \deriv yx=-\frac{F_x}{F_y}\qquad(F_y\ne0)\ }$$

      **一个方程、三个变量**：$F(x,y,z)=0$ 确定 $z=z(x,y)$ 时
      $$\pd zx=-\frac{F_x}{F_z},\qquad \pd zy=-\frac{F_y}{F_z}\qquad(F_z\ne0)$$

      ==负号的来历==：对 $F(x,y(x))=0$ 两边求全导数得
      $F_x+F_y\deriv yx=0$，==移项即得==。
      **记不住符号就现推，两行的事。**

      **两条路线的对照**：

      | 路线 | 做法 | 适合 |
      |---|---|---|
      | ==公式法== | 算 $F_x,F_y,F_z$ 代入 | $F$ 形状规整 |
      | ==直接求导== | 方程两边对 $x$ 求导，把 $z$ 当 $z(x,y)$ | ==求二阶导时更清楚== |

      **求二阶偏导时推荐直接求导法**：
      公式法要对一个分式再求导（还要用商法则和链式法则），
      ==而直接法只需把一阶的结果再对 $x$ 求一次，思路更直==。

      **方程组的情形**（数一要求）：
      $$\begin{cases}F(x,y,u,v)=0\\ G(x,y,u,v)=0\end{cases}$$
      确定 $u=u(x,y)$、$v=v(x,y)$ 时，
      ==两边分别对 $x$ 求导得到关于 $\pd ux,\pd vx$ 的**线性方程组**==：
      $$\begin{cases}F_x+F_u\pd ux+F_v\pd vx=0\\ G_x+G_u\pd ux+G_v\pd vx=0\end{cases}$$
      ==用克拉默法则或消元解出==。
      **这是把[线性方程组](#/linear-algebra/linear-systems/solvability?at=three-cases)用到微分学上。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-abstract-chain',
      title: '★ 抽象复合函数的二阶偏导',
      source: '经典例题（高频大题）',
      level: 4,
      problem: String.raw`
        设 $z=f\left(x^{2}-y^{2},\,e^{xy}\right)$，其中 $f$ 具有二阶连续偏导数。
        求 $\pd zx$ 与 $\pd{^{2}z}{x\partial y}$。
      `,
      idea: String.raw`
        **设中间变量**：$u=x^{2}-y^{2}$、$v=e^{xy}$。
        $$\pd ux=2x,\quad\pd uy=-2y,\quad\pd vx=ye^{xy},\quad\pd vy=xe^{xy}.$$

        **一阶**（两条路径）：
        $$\pd zx=f_1'\cdot2x+f_2'\cdot ye^{xy}.$$

        **二阶的关键**：对上式再对 $y$ 求导时，
        ==$f_1'$ 和 $f_2'$ 都还是 $u,v$ 的函数==，
        [必须再走一遍链式法则](#/calculus/multi-derivative/chain-rule?at=notation)。

        逐项处理：
        - $2x f_1'$ 对 $y$：$2x$ 与 $y$ 无关，==只需 $2x\cdot\pd{f_1'}{y}$==；
        - $ye^{xy}f_2'$ 对 $y$：==是三个因子的乘积==，
          $y$ 和 $e^{xy}$ 都含 $y$，$f_2'$ 也含 $y$，
          ==用乘积法则展开成三项==。

        **$\pd{f_1'}{y}$ 怎么算**：
        $$\pd{f_1'}{y}=f_{11}''\pd uy+f_{12}''\pd vy=-2yf_{11}''+xe^{xy}f_{12}''.$$
        ==$f_2'$ 同理==。

        **最后用 $f_{12}''=f_{21}''$ 合并**（题目给了"二阶连续偏导"，
        [保证可交换](#/calculus/multi-derivative/concepts?at=partial)）。
      `,
      solution: String.raw`
        记 $u=x^{2}-y^{2}$，$v=e^{xy}$，则
        $$u_x=2x,\quad u_y=-2y,\quad v_x=ye^{xy},\quad v_y=xe^{xy}.$$

        **一阶偏导**：
        $$\pd zx=f_1'\cdot u_x+f_2'\cdot v_x=2xf_1'+ye^{xy}f_2'.$$

        **二阶混合偏导**：对上式关于 $y$ 求导。

        先算两个中间量：
        $$\pd{f_1'}{y}=f_{11}''u_y+f_{12}''v_y=-2yf_{11}''+xe^{xy}f_{12}'',$$
        $$\pd{f_2'}{y}=f_{21}''u_y+f_{22}''v_y=-2yf_{21}''+xe^{xy}f_{22}''.$$

        于是
        $$\pd{^{2}z}{x\partial y}=\pd{}{y}\left(2xf_1'\right)+\pd{}{y}\left(ye^{xy}f_2'\right)$$
        $$=2x\left(-2yf_{11}''+xe^{xy}f_{12}''\right)
        +\underbrace{e^{xy}f_2'+y\cdot xe^{xy}f_2'}_{\text{对 }ye^{xy}\text{ 求导}}
        +ye^{xy}\left(-2yf_{21}''+xe^{xy}f_{22}''\right).$$

        由 $f$ 的二阶偏导连续知 $f_{12}''=f_{21}''$，整理得
        $$\pd{^{2}z}{x\partial y}
        =(1+xy)e^{xy}f_2'-4xyf_{11}''
        +\left(2x^{2}e^{xy}-2y^{2}e^{xy}\right)f_{12}''
        +xye^{2xy}f_{22}''.$$

        即
        $$\boxed{\ \pd{^{2}z}{x\partial y}
        =(1+xy)e^{xy}f_2'-4xyf_{11}''
        +2\left(x^{2}-y^{2}\right)e^{xy}f_{12}''+xye^{2xy}f_{22}''\ }$$
      `,
      comment: String.raw`
        **结果的结构值得核对**（这是最有效的自检）：

        | 项 | 系数 | 来源 |
        |---|---|---|
        | $f_2'$ | $(1+xy)e^{xy}$ | ==乘积法则==（$ye^{xy}$ 对 $y$ 求导） |
        | $f_{11}''$ | $2x\cdot(-2y)=-4xy$ | $u_x\cdot u_y$ |
        | $f_{12}''$ | $2x\cdot xe^{xy}+ye^{xy}\cdot(-2y)$ | ==$u_xv_y+v_xu_y$== |
        | $f_{22}''$ | $ye^{xy}\cdot xe^{xy}$ | $v_xv_y$ |

        ==三个二阶项的系数分别是 $u_xu_y$、$u_xv_y+u_yv_x$、$v_xv_y$==，
        **这个模式对任何 $z=f(u,v)$ 都成立**，可以用来快速验算：
        $$\pd{^{2}z}{x\partial y}=u_xu_yf_{11}''+(u_xv_y+u_yv_x)f_{12}''+v_xv_yf_{22}''
        +\left(\pd{^{2}u}{x\partial y}f_1'+\pd{^{2}v}{x\partial y}f_2'\right).$$
        ==最后括号里那两项来自"对 $u_x,v_x$ 再求导"==。
        本题 $\pd{^{2}u}{x\partial y}=0$（$u_x=2x$ 与 $y$ 无关），
        $\pd{^{2}v}{x\partial y}=\pd{}{y}(ye^{xy})=(1+xy)e^{xy}$ $\checkmark$

        **两个高频失分点**：

        1. ==把 $f_1',f_2'$ 当常数==——它们仍是 $u,v$ 的函数，要再链式一次；
        2. ==漏掉 $ye^{xy}$ 对 $y$ 求导产生的 $f_2'$ 项==——
           这是唯一的一阶项，漏了很明显。

        **书写建议**：先把 $u_x,u_y,v_x,v_y$ ==单独列出来==，
        再套上面那个模式，==比一路展开不容易乱==。
        考场上时间紧时，==这个模式可以直接用==（阅卷认结果）。
      `,
    },

    { t: 'example',
      id: 'ex-implicit',
      title: '隐函数：一阶与二阶偏导',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $z=z(x,y)$ 由方程
        $$x^{2}+y^{2}+z^{2}=4z$$
        确定，求 $\pd zx$ 与 $\pd{^{2}z}{x^{2}}$。
      `,
      idea: String.raw`
        **两条路都走得通，这里用直接求导法**（[求二阶时更清楚](#/calculus/multi-derivative/chain-rule?at=implicit-formula)）。

        **一阶**：两边对 $x$ 求导，==把 $z$ 看成 $z(x,y)$==：
        $$2x+0+2z\pd zx=4\pd zx.$$
        ==$y^{2}$ 对 $x$ 求导是 $0$（$y$ 是独立变量）==。
        移项：
        $$\pd zx=\frac{2x}{4-2z}=\frac{x}{2-z}.$$

        **公式法核对**：$F=x^{2}+y^{2}+z^{2}-4z$，
        $F_x=2x$、$F_z=2z-4$，
        $$\pd zx=-\frac{2x}{2z-4}=\frac{x}{2-z}\ \checkmark$$

        **二阶**：对 $\pd zx=\frac{x}{2-z}$ 再对 $x$ 求导，
        ==$z$ 仍是 $x$ 的函数，要用商法则 + 链式==：
        $$\pd{^{2}z}{x^{2}}=\frac{1\cdot(2-z)-x\cdot\left(-\pd zx\right)}{(2-z)^{2}}
        =\frac{(2-z)+x\pd zx}{(2-z)^{2}}.$$
        ==再把 $\pd zx=\frac{x}{2-z}$ 代回去==。

        **注意定义域**：$z=2$ 时 $F_z=0$，==公式失效==，
        答题时最好注明 $z\ne2$。
      `,
      solution: String.raw`
        **一阶**：方程两边对 $x$ 求导（$z=z(x,y)$，$y$ 视为常数）：
        $$2x+2z\pd zx=4\pd zx,$$
        $$\left(2z-4\right)\pd zx=-2x,$$
        $$\pd zx=\frac{-2x}{2z-4}=\frac{x}{2-z}\qquad(z\ne2).$$

        **二阶**：对上式再关于 $x$ 求导，用商法则（注意 $z$ 是 $x$ 的函数）：
        $$\pd{^{2}z}{x^{2}}=\pd{}{x}\left(\frac{x}{2-z}\right)
        =\frac{1\cdot(2-z)-x\cdot\left(-\pd zx\right)}{(2-z)^{2}}
        =\frac{(2-z)+x\pd zx}{(2-z)^{2}}.$$

        代入 $\pd zx=\dfrac{x}{2-z}$：
        $$\pd{^{2}z}{x^{2}}=\frac{(2-z)+\dfrac{x^{2}}{2-z}}{(2-z)^{2}}
        =\frac{(2-z)^{2}+x^{2}}{(2-z)^{3}}.$$
      `,
      comment: String.raw`
        **这个方程的几何意义**：配方得
        $$x^{2}+y^{2}+(z-2)^{2}=4,$$
        ==是球心在 $(0,0,2)$、半径为 $2$ 的球面==。

        $z=2$ 正是==球的"赤道"==，那里切平面竖直、$z$ 关于 $(x,y)$ 不可导，
        ==这解释了为什么 $z\ne2$ 是必要条件==。
        **几何图像能帮你理解公式失效的位置。**

        **数值验证**：取下半球上的点 $(1,1)$，
        由 $z=2-\sqrt{4-x^{2}-y^{2}}$ 得 $z=2-\sqrt2\approx0.5857864$，
        此时 $2-z=\sqrt2$。

        | | 公式值 | 数值差商 |
        |---|---|---|
        | $\pd zx=\dfrac{x}{2-z}$ | $\dfrac{1}{\sqrt2}=0.7071068$ | $0.7071068$ |
        | $\pd{^{2}z}{x^{2}}=\dfrac{(2-z)^{2}+x^{2}}{(2-z)^{3}}$ | $\dfrac{3}{2\sqrt2}=1.060660$ | $1.060660$ |

        ==两个都对到七位== $\checkmark$
        **显式解 $z=2-\sqrt{4-x^{2}-y^{2}}$ 存在时，
        用它来验算隐函数求导的结果是最可靠的检查。**

        **两条路线的分工**（本题都试了）：

        | | 公式法 | 直接求导法 |
        |---|---|---|
        | 一阶 | ==快==（算三个偏导代入） | 也快 |
        | 二阶 | ==要对分式再求导，繁== | ==思路直，推荐== |

        **易错点**：对 $x$ 求导时 ==$y^{2}$ 的导数是 $0$==
        （$y$ 是与 $x$ 独立的自变量），
        ==但 $z^{2}$ 的导数是 $2z\pd zx$==（$z$ 依赖 $x$）。
        **分清"谁是自变量、谁是因变量"是隐函数题的全部关键。**
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **把 $f_1',f_2'$ 当常数**：==它们仍是中间变量的函数==，
         求二阶导时要再链式一次。
      2. **混淆 $\deriv zx$ 与 $\pd fx$**：
         ==全导数还要加上"通过中间变量"的那条路径==。
      3. **漏掉乘积法则产生的一阶项**：见[例题的结构核对表](#/calculus/multi-derivative/chain-rule?at=ex-abstract-chain)。
      4. **树图路径数错**：==有几条路就有几项==。
      5. **隐函数求导时把 $y$ 也当因变量**：对 $x$ 求导时 ==$y$ 是独立自变量，导数为 $0$==。
      6. **隐函数公式的负号漏掉**：$\pd zx=-\frac{F_x}{F_z}$。
      7. **不注明 $F_z\ne0$**：==公式在 $F_z=0$ 处失效==。
      8. **$f_{12}''=f_{21}''$ 无条件使用**：==要求二阶偏导连续==（题目通常会给）。
      9. **方程组情形不列线性方程组**：==两个方程对同一变量求导，联立解==。
    ` },

  ],
});
