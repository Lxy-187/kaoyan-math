/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 第二类曲面积分
   —— 有方向的曲面积分（通量）。第一类见 line-surface/first-kind-surface；
      高斯公式见 line-surface/gauss-stokes。
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/second-kind-surface',
  title: '第二类曲面积分',
  subtitle: '第一类算"质量"，第二类算**通量**。多出来的那个"侧"，是全部难点的来源',
  tags: ['大题', '计算题', '高频', '易错'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'meaning', title: '通量：穿过曲面的流量', c: String.raw`
      $$\iint_{\Sigma}P\d y\d z+Q\d z\d x+R\dxy$$
      物理意义：==向量场 $\vec F=(P,Q,R)$ 穿过有向曲面 $\Sigma$ 的**通量**==
      （单位时间流过的流体体积）。

      **两类曲面积分的联系**：
      $$\boxed{\ \iint_\Sigma P\d y\d z+Q\d z\d x+R\dxy
      =\iint_\Sigma\left(P\cos\alpha+Q\cos\beta+R\cos\gamma\right)\d S\ }$$
      其中 $(\cos\alpha,\cos\beta,\cos\gamma)$ 是==单位法向量==（按选定的侧）。

      ==即"第二类 $=$ 第一类 $\times$ 法向投影"==，
      与[曲线积分的两类关系](#/calculus/line-surface/line-integral?at=second-kind)完全平行：
      $$\underbrace{\vec F\cdot\vec T\ds}_{\text{曲线：切向}}
      \qquad\longleftrightarrow\qquad
      \underbrace{\vec F\cdot\vec n\,\d S}_{\text{曲面：法向}}$$

      **"侧"的规定**：

      | 曲面 | 上侧 / 下侧的判据 |
      |---|---|
      | $z=z(x,y)$ | ==上侧：$\cos\gamma>0$==（法向量 $z$ 分量为正） |
      | 闭曲面 | ==外侧==（法向量朝外）为正 |

      **换侧变号**：
      $$\iint_{\Sigma^{-}}=-\iint_{\Sigma}$$
      ==这是第二类最本质的性质，也是错误的主要来源==。
    ` },

    { t: 'method', id: 'projection-method', title: '★ 投影法：一投二代三定号', c: String.raw`
      以 $\displaystyle\iint_\Sigma R(x,y,z)\dxy$ 为例（==投影到 $xOy$ 面==）：

      1. **投影**：把 $\Sigma$ 投影到 $xOy$ 面得区域 $D_{xy}$；
      2. **代入**：把曲面方程 $z=z(x,y)$ 代入被积函数，
         ==化成只含 $x,y$ 的二重积分==；
      3. **定号**：==$\Sigma$ 取上侧则前面加 $+$，下侧加 $-$==。

      $$\boxed{\ \iint_\Sigma R\dxy=\pm\iint_{D_{xy}}R\bigl(x,y,z(x,y)\bigr)\dxy\ }$$

      ==第 3 步是与第一类唯一的区别，也是最容易漏的==。
      **第一类永远是 $+$，第二类要看侧。**

      **三个投影方向要一一对应**：

      | 积分项 | 投影到 | 用哪个方程 |
      |---|---|---|
      | $R\dxy$ | $xOy$ 面 | $z=z(x,y)$ |
      | $P\d y\d z$ | ==$yOz$ 面== | $x=x(y,z)$ |
      | $Q\d z\d x$ | ==$zOx$ 面== | $y=y(z,x)$ |

      ==不能把 $P\d y\d z$ 投影到 $xOy$ 面==——
      **"哪两个字母，就投到哪个面"。**

      **曲面垂直于投影面时**：该项积分为 $0$
      （投影退化成一条线，面积为零）。
      ==比如 $\Sigma$ 是柱面 $x^{2}+y^{2}=1$ 时，$\iint_\Sigma R\dxy=0$==，
      **这个观察常常能省掉一整项。**
    ` },

    { t: 'key', id: 'unify', title: '★ 合一投影法：转化成一个二重积分', c: String.raw`
      三项分别投影很麻烦（要解出三个显式方程）。
      ==若 $\Sigma$ 能写成 $z=z(x,y)$，可以把三项一起投到 $xOy$ 面==：

      $$\boxed{\ \iint_\Sigma P\d y\d z+Q\d z\d x+R\dxy
      =\pm\iint_{D_{xy}}\left[P\left(-z_x\right)+Q\left(-z_y\right)+R\right]\dxy\ }$$
      （==上侧取 $+$，下侧取 $-$；$P,Q,R$ 中的 $z$ 都代成 $z(x,y)$==）

      **来历**：$z=z(x,y)$ 的法向量是 $\left(-z_x,-z_y,1\right)$（指向上侧），
      代入[两类关系](#/calculus/line-surface/second-kind-surface?at=meaning)即得。

      $$\boxed{\ \text{记住法向量}\ \left(-z_x,-z_y,1\right)\ \text{，公式自己就出来了}\ }$$
      ==两个负号是关键==，来自把 $z-z(x,y)=0$ 看成 $F=0$ 后取 $\nabla F$。

      **这个方法的优势**：==只需一次投影、一个二重积分==，
      而且不必解出 $x=x(y,z)$ 这类反函数。

      **什么时候不能用**：$\Sigma$ ==不能写成单值的 $z=z(x,y)$== 时
      （比如整个球面），要==分成上下两片==分别处理。

      **另一条路：用[高斯公式](#/calculus/line-surface/gauss-stokes?at=gauss)。**
      ==$\Sigma$ 封闭时优先考虑高斯==，把曲面积分变成三重积分，
      ==往往简单一个数量级==。
    ` },

    { t: 'warn', id: 'traps', title: '第二类曲面积分的三个陷阱', c: String.raw`
      **① 忘了定号。**
      投影法的 $\pm$ ==由侧决定==，
      ==漏掉负号是本节最高频的错误==。
      **自检：如果积分表示"向上的通量"而算出负数，就要检查侧。**

      **② 投影方向配错。**
      $P\d y\d z$ ==必须投到 $yOz$ 面==。
      ==用合一公式就能避开这个问题==（全部投到 $xOy$）。

      **③ 曲面不是单值时不分片。**
      球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 投影到 $xOy$ 面时，
      ==上半球与下半球投影重合==，
      必须分成两片、==而且两片的侧不同==（外侧对上半球是上侧、对下半球是下侧）。

      ==这就是为什么闭曲面优先用高斯公式==：
      一次搞定，不必分片、不必管侧。

      **一条实用的判断**：

      | $\Sigma$ | 首选方法 |
      |---|---|
      | ==封闭曲面== | ==[高斯公式](#/calculus/line-surface/gauss-stokes?at=gauss)== |
      | 不封闭但补一片就封闭 | ==补面 + 高斯==，再减掉补的 |
      | 单片、易写成 $z=z(x,y)$ | 合一投影法 |
      | 只有一项且曲面垂直于某面 | 直接判零 |
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-projection',
      title: '投影法：定号是关键',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\iint_\Sigma z\dxy$，
        其中 $\Sigma$ 是上半球面 $z=\sqrt{a^{2}-x^{2}-y^{2}}$ 的==上侧==。
      `,
      idea: String.raw`
        **只有一项 $R\dxy$，直接[投影法](#/calculus/line-surface/second-kind-surface?at=projection-method)。**

        1. **投影**：$\Sigma$ 投到 $xOy$ 面得 $D:\ x^{2}+y^{2}\le a^{2}$；
        2. **代入**：$z=\sqrt{a^{2}-x^{2}-y^{2}}$；
        3. **定号**：==上侧，取 $+$==。

        $$\iint_\Sigma z\dxy=+\iint_D\sqrt{a^{2}-x^{2}-y^{2}}\dxy.$$

        **化极坐标**：
        $$\int_0^{2\pi}\dtheta\int_0^{a}\sqrt{a^{2}-r^{2}}\cdot r\,\d r,$$
        ==内层凑微分==（$r\,\d r=-\frac12\d(a^{2}-r^{2})$）。

        **预判**：这个积分在几何上是==半球的体积==
        （$\iint_D z\,\d A$ 是以 $D$ 为底、半球面为顶的立体体积），
        ==应当是 $\frac23\pi a^{3}$==。算完对照。
      `,
      solution: String.raw`
        $\Sigma$ 在 $xOy$ 面上的投影为 $D:\ x^{2}+y^{2}\le a^{2}$。

        由于 $\Sigma$ 取==上侧==（$\cos\gamma>0$），投影法取正号：
        $$\iint_\Sigma z\dxy=\iint_D\sqrt{a^{2}-x^{2}-y^{2}}\dxy.$$

        化极坐标：
        $$=\int_0^{2\pi}\dtheta\int_0^{a}\sqrt{a^{2}-r^{2}}\,r\,\d r
        =2\pi\int_0^{a}r\sqrt{a^{2}-r^{2}}\,\d r.$$

        内层凑微分：
        $$\int_0^{a}r\sqrt{a^{2}-r^{2}}\,\d r
        =-\frac12\int_0^{a}\sqrt{a^{2}-r^{2}}\,\d\left(a^{2}-r^{2}\right)
        =-\frac12\cdot\frac23\left[\left(a^{2}-r^{2}\right)^{3/2}\right]_0^{a}$$
        $$=-\frac13\left(0-a^{3}\right)=\frac{a^{3}}{3}.$$

        故
        $$\iint_\Sigma z\dxy=2\pi\cdot\frac{a^{3}}{3}=\frac{2\pi a^{3}}{3}.$$
      `,
      comment: String.raw`
        **与预判一致**：$\frac23\pi a^{3}$ ==正是半球的体积== $\checkmark$
        ==因为 $\iint_D z\,\d A$ 就是"以 $z$ 为高的曲顶柱体体积"==，
        而这个曲顶正是上半球面。
        **这个几何解释是最好的验算。**

        **若改成下侧**：
        $$\iint_{\Sigma^{-}}z\dxy=-\frac{2\pi a^{3}}{3},$$
        ==仅仅换个侧，答案变号==。

        **若 $\Sigma$ 改成下半球面 $z=-\sqrt{a^{2}-x^{2}-y^{2}}$ 的下侧**：
        - 代入后被积函数是 $-\sqrt{a^{2}-x^{2}-y^{2}}$；
        - 下侧取 $-$ 号；
        - ==两个负号相乘得正==：结果仍是 $\frac{2\pi a^{3}}{3}$。

        ==这说明整个球面外侧的 $\iint z\dxy=\frac{4\pi a^{3}}{3}$==，
        **恰好是球的体积**——用[高斯公式](#/calculus/line-surface/gauss-stokes?at=gauss)一眼可见：
        $$\oiint_\Sigma z\dxy=\iiint_\Omega\pd zz\d V=\iiint_\Omega1\d V=V.\ \checkmark$$

        **定号的自检办法**：
        ==上侧时 $z>0$ 的部分应当贡献正值==。
        本题 $z\ge0$ 且取上侧，==答案必须为正== $\checkmark$
        ==算出负数就说明号定反了。==
      `,
    },

    { t: 'example',
      id: 'ex-unify',
      title: '★ 合一投影法：三项一起投',
      source: '标准例题',
      level: 4,
      problem: String.raw`
        计算 $\displaystyle\iint_\Sigma x\d y\d z+y\d z\d x+z\dxy$，
        其中 $\Sigma$ 是平面 $x+y+z=1$ 位于第一卦限部分的==上侧==。
      `,
      idea: String.raw`
        **三项都有，且曲面是平面**——
        ==用[合一投影法](#/calculus/line-surface/second-kind-surface?at=unify)最省事==。

        **写成 $z=z(x,y)$**：$z=1-x-y$，故
        $$z_x=-1,\qquad z_y=-1.$$

        **法向量**（指向上侧）：$\left(-z_x,-z_y,1\right)=(1,1,1)$。
        ==这与平面 $x+y+z=1$ 的法向量一致== $\checkmark$
        （系数就是法向量，见[平面方程](#/calculus/vector-geometry/plane-line?at=plane-forms)）。

        **代公式**（上侧取 $+$）：
        $$\iint_\Sigma=\iint_{D_{xy}}\left[x\cdot1+y\cdot1+z\right]\dxy,$$
        ==而 $z=1-x-y$ 要代进去==：
        $$=\iint_{D}\left[x+y+(1-x-y)\right]\dxy=\iint_D1\dxy.$$

        ==被积函数化成了常数 $1$==！
        **这不是巧合：$x+y+z=1$ 在曲面上恒成立。**

        **投影区域**：第一卦限部分对应
        $$D:\ x\ge0,\ y\ge0,\ x+y\le1,$$
        ==是直角边为 $1$ 的三角形，面积 $\frac12$==。

        ==所以答案就是 $\frac12$==，几乎不用计算。
      `,
      solution: String.raw`
        由 $x+y+z=1$ 得 $z=1-x-y$，故
        $$z_x=-1,\qquad z_y=-1,$$
        指向上侧的法向量为 $\left(-z_x,-z_y,1\right)=(1,1,1)$。

        $\Sigma$ 在 $xOy$ 面上的投影为
        $$D:\ x\ge0,\ y\ge0,\ x+y\le1.$$

        由合一投影法（上侧取正号）：
        $$\iint_\Sigma x\d y\d z+y\d z\d x+z\dxy
        =\iint_D\left[x\cdot\left(-z_x\right)+y\cdot\left(-z_y\right)+z\right]\dxy$$
        $$=\iint_D\left[x\cdot1+y\cdot1+(1-x-y)\right]\dxy
        =\iint_D1\,\dxy.$$

        故
        $$\iint_\Sigma=\text{面积}(D)=\frac12\times1\times1=\frac12.$$
      `,
      comment: String.raw`
        **被积函数化成常数 $1$ 的原因**：
        合一公式给出 $x+y+z$，==而曲面上恒有 $x+y+z=1$==。
        ==这是"[代入曲面方程化简](#/calculus/line-surface/line-integral?at=first-kind)"的又一次应用==。

        **另一种理解（几何）**：
        被积向量场是 $\vec F=(x,y,z)=\vec r$（位置向量），
        单位法向量 $\vec n=\frac{(1,1,1)}{\sqrt3}$，
        $$\vec F\cdot\vec n=\frac{x+y+z}{\sqrt3}=\frac{1}{\sqrt3},$$
        ==是常数==！而三角形 $\Sigma$ 的面积是 $\frac{\sqrt3}{2}$
        （边长 $\sqrt2$ 的等边三角形），故
        $$\iint_\Sigma\vec F\cdot\vec n\,\d S=\frac{1}{\sqrt3}\cdot\frac{\sqrt3}{2}=\frac12\ \checkmark$$
        ==两种算法完全一致==。

        **合一投影法的记忆要点**：
        $$\boxed{\ \text{法向量}\ \left(-z_x,-z_y,1\right)\ \Rightarrow\
        P\left(-z_x\right)+Q\left(-z_y\right)+R\ }$$
        ==两个负号必须记牢==。
        ==符号搞反会得到 $x\cdot(-1)+y\cdot(-1)+z=-x-y+1-x-y=1-2x-2y$，
        积出来是 $\frac12-2\cdot\frac16\cdot2=\frac16$，明显与几何法不符。==

        **对照高斯公式的做法**：本题曲面不封闭，
        ==补上三个坐标面上的三角形==围成四面体 $\Omega$，则
        $$\oiint_{\text{闭}}=\iiint_\Omega\left(\pd xx+\pd yy+\pd zz\right)\d V
        =3V=3\cdot\frac16=\frac12.$$

        ==而补的三片贡献都是零==，逐片看：

        | 补片 | 三项各自 |
        |---|---|
        | $z=0$ | $z\dxy=0$；另两项的曲面==垂直于对应投影面==，退化为零 |
        | $x=0$ | $x\d y\d z=0$；另两项同理为零 |
        | $y=0$ | $y\d z\d x=0$；另两项同理为零 |

        ==每片上"与自己同名的那一项"因变量为零而消失，
        另外两项因曲面垂直于投影面而消失==。
        故 $\iint_\Sigma=\frac12$ $\checkmark$，与投影法一致。

        ==本题直接投影更快，不必绕道高斯==；
        但这个对照说明了两条路的一致性。

        **判据**：==曲面不封闭且只有一片时，合一投影法通常最快==；
        ==封闭或补一片就封闭时，考虑[高斯](#/calculus/line-surface/gauss-stokes?at=gauss)==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **忘了定号**：==投影法的 $\pm$ 由侧决定==，这是头号错误。
      2. **投影方向配错**：$P\d y\d z$ 投到 $yOz$ 面，==用合一公式可避开==。
      3. **合一公式的负号写错**：法向量是 ==$(-z_x,-z_y,1)$==。
      4. **曲面非单值不分片**：球面要分上下两片，==且两片的侧不同==。
      5. **闭曲面不用高斯**：==封闭优先高斯公式==，能省一个数量级。
      6. **不代入曲面方程化简**：==常常能把被积函数化成常数==。
      7. **曲面垂直于投影面时不判零**：柱面上 $\iint R\dxy=0$。
      8. **换侧不变号**：$\iint_{\Sigma^{-}}=-\iint_\Sigma$。
      9. **不做符号自检**：=="向上的通量"算出负数就要检查侧==。
    ` },

  ],
});
