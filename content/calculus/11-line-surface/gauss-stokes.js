/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 高斯公式与斯托克斯公式
   —— 把曲面积分降成三重、把曲线积分降成曲面。
      格林公式见 line-surface/green（它是这两条的二维原型）。
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/gauss-stokes',
  title: '高斯公式与斯托克斯公式',
  subtitle: '和[格林公式](#/calculus/line-surface/green?at=meaning)是同一条定理的三个版本：**边界上的积分 $=$ 内部某种导数的积分**',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'unified', title: '★ 三条公式是同一件事', c: String.raw`
      $$\boxed{\ \int_{\partial\Omega}\omega=\int_\Omega\d\omega\ }$$
      ==（广义斯托克斯公式，考纲外，但理解它能把三条公式串成一条）==

      | 公式 | 边界 | 内部 | 降维方向 |
      |---|---|---|---|
      | **牛顿–莱布尼茨** | 两个端点 | 区间 | $0\to1$ 维 |
      | **格林** | 闭曲线 | 平面区域 | $1\to2$ 维 |
      | **高斯** | 闭曲面 | 空间区域 | ==$2\to3$ 维== |
      | **斯托克斯** | 闭曲线 | 曲面 | ==$1\to2$ 维（在曲面上）== |

      ==四条都在说"边界上的信息 $=$ 内部变化率的累积"==。

      **格林是高斯与斯托克斯在二维的退化**：
      - 把格林写成通量形式就是二维的高斯；
      - 把格林写成环流形式就是二维的斯托克斯。

      **实用价值**：
      $$\boxed{\ \text{看到闭曲面}\ \Rightarrow\ \text{高斯};\qquad
      \text{看到空间闭曲线}\ \Rightarrow\ \text{斯托克斯}\ }$$
      ==两者都能把难算的积分降成好算的==。
    ` },

    { t: 'key', id: 'gauss', title: '高斯公式（散度定理）', c: String.raw`
      设 $\Omega$ 是由分片光滑闭曲面 $\Sigma$ 围成的空间区域，
      $P,Q,R$ 在 $\Omega$ 上有连续偏导数，则
      $$\boxed{\ \oiint_{\Sigma\text{（外侧）}}P\d y\d z+Q\d z\d x+R\dxy
      =\iiint_\Omega\left(\pd Px+\pd Qy+\pd Rz\right)\d V\ }$$

      右端的 $\pd Px+\pd Qy+\pd Rz$ 就是==散度== $\operatorname{div}\vec F$。

      **三个使用条件（缺一不可）**：

      1. ==$\Sigma$ 必须**封闭**==；
      2. ==必须取**外侧**==（取内侧要加负号）；
      3. ==$P,Q,R$ 在 $\Omega$ 内**处处**有连续偏导==
         （有奇点要[挖洞](#/calculus/line-surface/green?at=how-to-dig)）。

      **不封闭时的标准操作（补面法）**：
      $$\iint_\Sigma=\oiint_{\Sigma+\Sigma_1}-\iint_{\Sigma_1}$$
      ==补一片好算的曲面 $\Sigma_1$（通常是平面）把它封闭==，
      ==注意补完之后整体要取外侧==。

      **选补面的原则**：==挑一个让 $\iint_{\Sigma_1}$ 最好算的==，
      通常是垂直于坐标轴的平面（此时[某些项会退化为零](#/calculus/line-surface/second-kind-surface?at=projection-method)）。

      **最省力的特例**：$\operatorname{div}\vec F$ 是常数时
      $$\oiint_\Sigma=\operatorname{div}\vec F\cdot V(\Omega),$$
      ==只需算体积==。
      $\vec F=(x,y,z)$ 时散度为 $3$，$\oiint=3V$——==这个组合极其常考==。
    ` },

    { t: 'key', id: 'stokes', title: '斯托克斯公式（旋度定理）', c: String.raw`
      设 $\Gamma$ 是分片光滑闭曲线，$\Sigma$ 是以 $\Gamma$ 为边界的曲面，则
      $$\oint_\Gamma P\dx+Q\dy+R\d z
      =\iint_\Sigma\begin{vmatrix}
      \d y\d z&\d z\d x&\dxy\\[2pt]
      \dfrac{\partial}{\partial x}&\dfrac{\partial}{\partial y}&\dfrac{\partial}{\partial z}\\[6pt]
      P&Q&R
      \end{vmatrix}$$

      展开就是
      $$\iint_\Sigma\left(\pd Ry-\pd Qz\right)\d y\d z
      +\left(\pd Pz-\pd Rx\right)\d z\d x
      +\left(\pd Qx-\pd Py\right)\dxy$$

      ==行列式形式好记得多==，与[叉乘](#/calculus/vector-geometry/vector-ops?at=cross)同构：
      $$\operatorname{rot}\vec F=\nabla\times\vec F.$$

      **方向的规定（右手法则）**：
      $$\boxed{\ \text{右手四指沿 }\Gamma\ \text{的方向，拇指指向 }\Sigma\ \text{的正侧}\ }$$
      ==这叫"$\Gamma$ 与 $\Sigma$ 符合右手法则"==，
      **方向配错会差一个负号。**

      **$\Sigma$ 可以任选**：==只要以 $\Gamma$ 为边界即可==，
      ==所以挑最简单的那个==——
      通常取==平面==（若 $\Gamma$ 是平面曲线）。

      **实用简化**：若 $\Gamma$ 落在某个平面上，
      ==取 $\Sigma$ 为该平面被 $\Gamma$ 围的部分==，
      此时法向量是常向量，右端往往能一步算出。

      **考研中的典型形态**：$\Gamma$ 是平面 $x+y+z=1$ 与某柱面的交线，
      ==取 $\Sigma$ 为平面上那块，法向量 $\frac{(1,1,1)}{\sqrt3}$==，
      再用[两类曲面积分的关系](#/calculus/line-surface/second-kind-surface?at=meaning)化成第一类。
    ` },

    { t: 'method', id: 'workflow', title: '解题流程', c: String.raw`
      **高斯（曲面积分）**：

      1. ==$\Sigma$ 封闭吗？== 不封闭 $\to$ 补面；
      2. ==是外侧吗？== 不是 $\to$ 加负号；
      3. ==$\Omega$ 内有奇点吗？== 有 $\to$ 挖掉一个小球；
      4. 算 $\operatorname{div}\vec F$，==看是不是常数==（是则只需体积）；
      5. 算三重积分（==用[对称性](#/calculus/multi-integral/symmetry?at=core)和柱/球坐标==）；
      6. 减掉补面的部分。

      **斯托克斯（空间曲线积分）**：

      1. ==$\Gamma$ 封闭吗？== 不封闭一般不用斯托克斯；
      2. ==选一个以 $\Gamma$ 为边界的最简单曲面 $\Sigma$==；
      3. ==按右手法则定 $\Sigma$ 的侧==；
      4. 算旋度（行列式）；
      5. 化成二重积分。

      **一条很有用的观察**：==若 $\operatorname{rot}\vec F=\vec0$==，
      则曲线积分与路径无关（空间版本），
      ==$\oint_\Gamma=0$ 对任何闭曲线成立==。
      **这是[路径无关判据](#/calculus/line-surface/green?at=digging-is-path-independence)在三维的推广。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-gauss',
      title: '★ 高斯公式：补面法',
      source: '标准例题（高频大题）',
      level: 4,
      problem: String.raw`
        计算 $\displaystyle\iint_\Sigma x\d y\d z+y\d z\d x+z\dxy$，
        其中 $\Sigma$ 是抛物面 $z=x^{2}+y^{2}$ 被平面 $z=1$ 所截部分的==下侧==。
      `,
      idea: String.raw`
        **$\Sigma$ 不封闭**（是个"碗"，上面开口），
        ==补上顶盖 $\Sigma_1:\ z=1,\ x^{2}+y^{2}\le1$==。

        **定方向**：补完后围成的区域 $\Omega$ 是碗内部。
        - ==$\Sigma$ 取下侧==，对 $\Omega$ 而言正是==外侧== $\checkmark$
          （碗底的外法向朝下）；
        - ==$\Sigma_1$ 要取上侧==（顶盖的外法向朝上）。

        $$\oiint_{\Sigma+\Sigma_1}=\iint_\Sigma+\iint_{\Sigma_1}
        \ \Longrightarrow\ \iint_\Sigma=\oiint-\iint_{\Sigma_1}.$$

        **算散度**：$\vec F=(x,y,z)$，
        $$\operatorname{div}\vec F=1+1+1=3,$$
        ==是常数==！所以
        $$\oiint=3\iiint_\Omega\d V=3V(\Omega).$$

        **算 $V(\Omega)$**：碗内部，
        $$V=\iint_{D}\left(1-\left(x^{2}+y^{2}\right)\right)\dxy
        =\int_0^{2\pi}\dtheta\int_0^{1}(1-r^{2})r\,\d r=2\pi\cdot\frac14=\frac\pi2.$$

        **算 $\iint_{\Sigma_1}$**（上侧，$z=1$）：
        - $x\d y\d z$：$\Sigma_1$ 是水平面，==垂直于 $yOz$ 面，投影退化为零==；
        - $y\d z\d x$：同理为零；
        - $z\dxy=1\cdot\dxy$：投影是单位圆盘，上侧取正，==得 $\pi$==。

        ==所以 $\iint_{\Sigma_1}=\pi$==。
      `,
      solution: String.raw`
        **补面**：取 $\Sigma_1:\ z=1,\ x^{2}+y^{2}\le1$，方向为==上侧==。
        则 $\Sigma$（下侧）与 $\Sigma_1$（上侧）合起来构成
        闭曲面 $\Sigma+\Sigma_1$ 的==外侧==，围成区域
        $$\Omega:\ x^{2}+y^{2}\le z\le1.$$

        **用高斯公式**：$P=x,Q=y,R=z$，
        $$\pd Px+\pd Qy+\pd Rz=1+1+1=3,$$
        故
        $$\oiint_{\Sigma+\Sigma_1}=\iiint_\Omega3\,\d V=3V(\Omega).$$

        **算体积**（投影 $D:\ x^{2}+y^{2}\le1$）：
        $$V(\Omega)=\iint_D\left[1-\left(x^{2}+y^{2}\right)\right]\dxy
        =\int_0^{2\pi}\dtheta\int_0^{1}\left(1-r^{2}\right)r\,\d r$$
        $$=2\pi\left[\frac{r^{2}}{2}-\frac{r^{4}}{4}\right]_0^{1}
        =2\pi\left(\frac12-\frac14\right)=\frac{\pi}{2}.$$

        故 $\oiint=3\times\dfrac\pi2=\dfrac{3\pi}{2}$。

        **算补面上的积分**（$\Sigma_1$ 为平面 $z=1$ 的上侧）：

        - $\displaystyle\iint_{\Sigma_1}x\d y\d z=0$（$\Sigma_1$ 垂直于 $yOz$ 面）；
        - $\displaystyle\iint_{\Sigma_1}y\d z\d x=0$（同理）；
        - $\displaystyle\iint_{\Sigma_1}z\dxy=\iint_{D}1\cdot\dxy=\pi$（上侧取正号）。

        故 $\displaystyle\iint_{\Sigma_1}=\pi$。

        **结论**：
        $$\iint_\Sigma=\oiint-\iint_{\Sigma_1}=\frac{3\pi}{2}-\pi=\frac{\pi}{2}.$$
      `,
      comment: String.raw`
        **符号自检**：$\Sigma$ 取下侧，向量场 $\vec F=(x,y,z)$ 在碗面上大致朝外上方，
        ==而下侧法向朝下==，所以通量……
        ==直接看结果 $\frac\pi2>0$==。
        用另一条路验证：在碗面上，外法向（对 $\Omega$ 而言）指向下方，
        $\vec F\cdot\vec n$ 的符号由具体位置定，==总和为正是合理的==。

        **更可靠的验算**：直接用[合一投影法](#/calculus/line-surface/second-kind-surface?at=unify)算 $\iint_\Sigma$。
        $z=x^{2}+y^{2}$，$z_x=2x$，$z_y=2y$，==下侧取负号==：
        $$\iint_\Sigma=-\iint_D\left[x(-2x)+y(-2y)+\left(x^{2}+y^{2}\right)\right]\dxy$$
        $$=-\iint_D\left[-2x^{2}-2y^{2}+x^{2}+y^{2}\right]\dxy
        =\iint_D\left(x^{2}+y^{2}\right)\dxy$$
        $$=\int_0^{2\pi}\dtheta\int_0^{1}r^{2}\cdot r\,\d r=2\pi\cdot\frac14=\frac\pi2\ \checkmark$$
        ==两法完全一致==。

        **本题两条路工作量相当**，但一般而言：

        | 情形 | 首选 |
        |---|---|
        | ==散度是常数== | ==高斯==（只需算体积） |
        | 散度复杂但曲面简单 | 直接投影 |
        | ==曲面复杂、封闭== | ==高斯== |

        **$\vec F=(x,y,z)$、$\operatorname{div}=3$ 是最常考的组合**：
        $$\oiint_{\text{闭}}x\d y\d z+y\d z\d x+z\dxy=3V,$$
        ==看到这个被积式就先想体积==。

        **补面时方向的判断**：==想象自己站在 $\Omega$ 内部，法向量都要指向外面==。
        本题碗底朝下、顶盖朝上 $\checkmark$
        ==这是补面法唯一容易错的地方。==
      `,
    },

    { t: 'example',
      id: 'ex-stokes',
      title: '斯托克斯：选一个最简单的曲面',
      source: '标准例题',
      level: 4,
      problem: String.raw`
        计算 $\displaystyle\oint_\Gamma y\dx+z\dy+x\d z$，
        其中 $\Gamma$ 是平面 $x+y+z=1$ 与三个坐标面的交线，
        方向从 $z$ 轴正向看去为==逆时针==。
      `,
      idea: String.raw`
        **$\Gamma$ 是空间闭曲线**（一个三角形的三条边）
        $\Rightarrow$ ==用[斯托克斯](#/calculus/line-surface/gauss-stokes?at=stokes)==。

        **选曲面**：$\Gamma$ 落在平面 $x+y+z=1$ 上，
        ==所以取 $\Sigma$ 为该平面上被 $\Gamma$ 围的三角形==（第一卦限部分），
        ==这是最简单的选择==。

        **定侧（右手法则）**：从 $z$ 轴正向看逆时针
        $\Rightarrow$ ==拇指指向 $z$ 轴正方向 $\Rightarrow$ 取上侧==，
        单位法向量
        $$\vec n=\frac{(1,1,1)}{\sqrt3}.$$

        **算旋度**：$P=y,Q=z,R=x$，
        $$\operatorname{rot}\vec F=\begin{vmatrix}
        \vec i&\vec j&\vec k\\
        \partial_x&\partial_y&\partial_z\\
        y&z&x
        \end{vmatrix}
        =\vec i\left(\pd xy-\pd zz\right)-\vec j\left(\pd xx-\pd yz\right)
        +\vec k\left(\pd zx-\pd yy\right)$$
        $$=\vec i(0-1)-\vec j(1-0)+\vec k(0-1)=(-1,-1,-1).$$
        ==旋度是常向量==，这让后面极其简单。

        **化成第一类**：
        $$\oint_\Gamma=\iint_\Sigma\operatorname{rot}\vec F\cdot\vec n\,\d S
        =\frac{(-1,-1,-1)\cdot(1,1,1)}{\sqrt3}\iint_\Sigma\d S
        =\frac{-3}{\sqrt3}\cdot S.$$

        **算 $S$**：三角形顶点 $(1,0,0),(0,1,0),(0,0,1)$，
        ==边长都是 $\sqrt2$ 的等边三角形==，
        $$S=\frac{\sqrt3}{4}\left(\sqrt2\right)^{2}=\frac{\sqrt3}{2}.$$
      `,
      solution: String.raw`
        $\Gamma$ 是平面 $x+y+z=1$ 在第一卦限部分的边界（三角形的三条边），
        顶点为 $A(1,0,0)$、$B(0,1,0)$、$C(0,0,1)$。

        取 $\Sigma$ 为该三角形（平面 $x+y+z=1$ 上被 $\Gamma$ 围的部分）。
        由右手法则（从 $z$ 轴正向看逆时针），$\Sigma$ 取==上侧==，
        单位法向量
        $$\vec n=\frac{1}{\sqrt3}(1,1,1).$$

        **计算旋度**（$P=y$，$Q=z$，$R=x$）：
        $$\operatorname{rot}\vec F=\begin{vmatrix}
        \vec i&\vec j&\vec k\\
        \dfrac{\partial}{\partial x}&\dfrac{\partial}{\partial y}&\dfrac{\partial}{\partial z}\\
        y&z&x
        \end{vmatrix}=(-1,-1,-1).$$

        **由斯托克斯公式**：
        $$\oint_\Gamma y\dx+z\dy+x\d z
        =\iint_\Sigma\operatorname{rot}\vec F\cdot\vec n\,\d S.$$

        由于 $\operatorname{rot}\vec F$ 与 $\vec n$ 均为常向量，
        $$\operatorname{rot}\vec F\cdot\vec n
        =\frac{(-1)(1)+(-1)(1)+(-1)(1)}{\sqrt3}=\frac{-3}{\sqrt3}=-\sqrt3.$$

        **三角形面积**：三边长均为 $\sqrt2$（如 $\abs{AB}=\sqrt{1+1}=\sqrt2$），
        为等边三角形，
        $$S=\frac{\sqrt3}{4}\left(\sqrt2\right)^{2}=\frac{\sqrt3}{2}.$$

        故
        $$\oint_\Gamma=-\sqrt3\times\frac{\sqrt3}{2}=-\frac32.$$
      `,
      comment: String.raw`
        **直接算的验证**（三段分别积，作为独立核对）：

        - **$A\to B$**：$z=0$，$\d z=0$，参数化 $x=1-t,y=t$（$t:0\to1$），
          $\dx=-\dt$，$\dy=\dt$：
          $$\int_0^{1}\left[t(-1)+0\cdot1\right]\dt=-\frac12;$$
        - **$B\to C$**：$x=0$，$\dx=0$，$y=1-t,z=t$：
          $$\int_0^{1}\left[z\dy+x\d z\right]=\int_0^{1}t(-1)\dt=-\frac12;$$
        - **$C\to A$**：$y=0$，$\dy=0$，$z=1-t,x=t$：
          $$\int_0^{1}\left[y\dx+x\d z\right]=\int_0^{1}t(-1)\dt=-\frac12.$$

        总和 $=-\frac32$ $\checkmark$
        ==三段各贡献 $-\frac12$，这个对称性也印证了结果==。

        **斯托克斯的价值在这道题上体现得不明显**（直接算也不难），
        ==但当 $\Gamma$ 是复杂曲线（如球面与平面的交线）时，
        直接参数化会非常麻烦，而斯托克斯只需算旋度和一个平面区域==。

        **选曲面的自由度**：$\Sigma$ 可以是==任何以 $\Gamma$ 为边界的曲面==。
        本题也可以取"三个坐标面上的三角形"拼成的曲面，
        ==结果必然相同==（这正是[散度与旋度的关系](#/calculus/line-surface/field-theory?at=identities)保证的：
        $\operatorname{div}\operatorname{rot}\vec F=0$）。
        ==但那样要算三片，显然不如取平面。==

        **右手法则的操作**：
        把右手四指沿 $\Gamma$ 的行进方向弯曲，==拇指所指就是 $\Sigma$ 的正侧==。
        本题从 $z$ 轴上方看逆时针 $\Rightarrow$ 拇指朝上 $\Rightarrow$ 上侧 $\checkmark$
        ==定错侧会差一个负号，答案变成 $+\frac32$。==
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **高斯公式不验封闭**：==不封闭必须补面==。
      2. **高斯公式忘了外侧**：==内侧要加负号==。
      3. **补面后方向不统一**：==所有法向量都要指向 $\Omega$ 外部==。
      4. **区域内有奇点还用高斯**：==要先挖洞==。
      5. **斯托克斯的右手法则搞反**：==差一个负号==。
      6. **斯托克斯的曲面选得太复杂**：==$\Sigma$ 可任选，挑最简单的==。
      7. **旋度行列式展开漏 $\vec j$ 前的负号**。
      8. **散度是常数却仍老实积分**：==直接乘体积==。
      9. **不做独立验算**：==高斯的结果可以用投影法核对==，反之亦然。
    ` },

  ],
});
