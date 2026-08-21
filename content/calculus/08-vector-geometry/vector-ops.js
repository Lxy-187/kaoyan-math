/* ==========================================================================
   高等数学 / 8 向量代数与空间解析几何 / 向量运算与几何意义
   —— 点乘、叉乘、混合积。平面直线见 vector-geometry/plane-line。
   ========================================================================== */

KM.page({
  path: 'calculus/vector-geometry/vector-ops',
  title: '向量运算与几何意义',
  subtitle: '三种乘法，三种几何量：点乘给**投影**，叉乘给**面积与法向**，混合积给**体积**',
  tags: ['小题', '计算题'],
  updated: '2026-08-21',

  blocks: [

    { t: 'compare',
      id: 'three-products',
      title: '★ 三种乘法总对照',
      cols: ['', '点乘 $\\vec a\\cdot\\vec b$', '叉乘 $\\vec a\\times\\vec b$', '混合积 $[\\vec a\\vec b\\vec c]$'],
      rows: [
        ['结果是', '==数==', '==向量==', '==数=='],
        ['公式', '$\\sum a_ib_i=\\abs{\\vec a}\\abs{\\vec b}\\cos\\theta$', '行列式展开', '三阶行列式'],
        ['几何量', '投影 $\\times$ 长度', '==平行四边形面积==', '==平行六面体体积=='],
        ['为零表示', '==垂直==', '==平行==', '==共面=='],
        ['交换律', '$\\vec a\\cdot\\vec b=\\vec b\\cdot\\vec a$', '==反交换 $\\vec a\\times\\vec b=-\\vec b\\times\\vec a$==', '轮换不变'],
        ['自己乘自己', '$\\abs{\\vec a}^{2}$', '==$\\vec 0$==', '$0$'],
      ] },

    { t: 'key', id: 'dot', title: '点乘：投影与夹角', c: String.raw`
      $$\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3=\abs{\vec a}\,\abs{\vec b}\cos\theta$$

      **三个直接用途**：

      | 要求 | 公式 |
      |---|---|
      | 夹角 | $\cos\theta=\dfrac{\vec a\cdot\vec b}{\abs{\vec a}\abs{\vec b}}$ |
      | ==投影== | $\text{Prj}_{\vec b}\vec a=\dfrac{\vec a\cdot\vec b}{\abs{\vec b}}$ |
      | 判垂直 | $\vec a\cdot\vec b=0$ |

      ==注意投影是"数"（可正可负），投影**向量**还要再乘单位向量==：
      $$\vec a_{\parallel\vec b}=\frac{\vec a\cdot\vec b}{\abs{\vec b}^{2}}\,\vec b.$$
      **分母是 $\abs{\vec b}^{2}$ 不是 $\abs{\vec b}$**——这是最常见的错误。

      **一个很有用的恒等式**：
      $$\abs{\vec a\pm\vec b}^{2}=\abs{\vec a}^{2}\pm2\vec a\cdot\vec b+\abs{\vec b}^{2}$$
      ==凡是遇到"模长的平方"，一律展开成点乘==，
      这与[柯西–施瓦茨](#/threads/patterns/cauchy-schwarz?at=three-forms)那条主线是同一套语言。
    ` },

    { t: 'key', id: 'cross', title: '★ 叉乘：面积与法向量', c: String.raw`
      $$\vec a\times\vec b=\begin{vmatrix}
      \vec i&\vec j&\vec k\\
      a_1&a_2&a_3\\
      b_1&b_2&b_3
      \end{vmatrix}$$

      **三条性质**：

      1. ==$\vec a\times\vec b$ 同时垂直于 $\vec a$ 与 $\vec b$==（右手法则定方向）；
      2. $\abs{\vec a\times\vec b}=\abs{\vec a}\abs{\vec b}\sin\theta=$ ==平行四边形面积==；
      3. $\vec a\times\vec b=\vec0\iff\vec a\parallel\vec b$。

      **它在本章的核心用途**：==求法向量==。
      $$\boxed{\ \text{已知平面内两个不平行的向量}\ \Rightarrow\ \text{叉乘得法向量}\ }$$
      =="求平面方程"这类题几乎全靠这一步==，
      见[平面与直线](#/calculus/vector-geometry/plane-line?at=plane-forms)。

      **三角形面积**：
      $$S_{\triangle ABC}=\frac12\abs{\vec{AB}\times\vec{AC}}.$$

      **不满足结合律**：
      $$\left(\vec a\times\vec b\right)\times\vec c\ \ne\ \vec a\times\left(\vec b\times\vec c\right)$$
      ==叉乘既不交换也不结合==，写的时候括号不能省。

      **反交换的后果**：$\vec a\times\vec a=\vec0$，
      ==所以叉乘不能"约分"==：$\vec a\times\vec b=\vec a\times\vec c$ ==推不出 $\vec b=\vec c$==
      （只能推出 $\vec b-\vec c\parallel\vec a$）。
    ` },

    { t: 'key', id: 'mixed', title: '混合积：体积与共面判据', c: String.raw`
      $$\left[\vec a\,\vec b\,\vec c\right]=\left(\vec a\times\vec b\right)\cdot\vec c
      =\begin{vmatrix}
      a_1&a_2&a_3\\ b_1&b_2&b_3\\ c_1&c_2&c_3
      \end{vmatrix}$$

      **几何意义**：$\abs{[\vec a\vec b\vec c]}=$ ==以三向量为棱的平行六面体体积==。

      **四面体体积** $=\dfrac16\abs{[\vec a\vec b\vec c]}$
      （==平行六面体的六分之一==）。

      **最重要的判据**：
      $$\boxed{\ \left[\vec a\,\vec b\,\vec c\right]=0\iff \vec a,\vec b,\vec c\ \text{共面}\ }$$
      ==这与[行列式为零 $\iff$ 向量组线性相关](#/linear-algebra/matrix/operations?at=invertible-equiv)
      是同一件事==——
      **三维空间里"共面"就是"线性相关"。**

      **轮换对称性**：
      $$[\vec a\vec b\vec c]=[\vec b\vec c\vec a]=[\vec c\vec a\vec b]
      =-[\vec b\vec a\vec c]$$
      ==轮换不变号，对换变号==（就是[行列式交换两行变号](#/linear-algebra/determinant/computation?at=properties)）。

      **判断四点共面**：$A,B,C,D$ 共面 $\iff[\vec{AB},\vec{AC},\vec{AD}]=0$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-basic',
      title: '三种乘法各用一次',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        设 $\vec a=(1,2,-1)$，$\vec b=(2,-1,3)$，$\vec c=(0,1,1)$。求：

        1. $\vec a$ 与 $\vec b$ 的夹角余弦，以及 $\vec a$ 在 $\vec b$ 上的投影；
        2. $\vec a\times\vec b$，以及以 $\vec a,\vec b$ 为邻边的平行四边形面积；
        3. 以 $\vec a,\vec b,\vec c$ 为棱的平行六面体体积，并判断三者是否共面。
      `,
      idea: String.raw`
        ==三问分别对应[三种乘法](#/calculus/vector-geometry/vector-ops?at=three-products)==，
        直接套公式。

        **算模长先备着**：
        $$\abs{\vec a}=\sqrt{1+4+1}=\sqrt6,\qquad
        \abs{\vec b}=\sqrt{4+1+9}=\sqrt{14}.$$

        **第 1 问**：$\vec a\cdot\vec b=2-2-3=-3$。
        ==点乘为负说明夹角是钝角==，投影也是负的。

        **第 2 问**：叉乘用行列式展开，
        ==算完最好验一下它与 $\vec a,\vec b$ 都垂直==（点乘为零）。

        **第 3 问**：混合积就是三阶行列式，
        ==按第三行展开最快==（$\vec c=(0,1,1)$ 有个零）。
      `,
      solution: String.raw`
        **(1)** 点乘：
        $$\vec a\cdot\vec b=1\times2+2\times(-1)+(-1)\times3=2-2-3=-3.$$
        模长：$\abs{\vec a}=\sqrt6$，$\abs{\vec b}=\sqrt{14}$。故
        $$\cos\theta=\frac{-3}{\sqrt6\cdot\sqrt{14}}=\frac{-3}{\sqrt{84}}
        =\frac{-3}{2\sqrt{21}}=-\frac{3\sqrt{21}}{42}=-\frac{\sqrt{21}}{14}\approx-0.327.$$

        投影：
        $$\text{Prj}_{\vec b}\vec a=\frac{\vec a\cdot\vec b}{\abs{\vec b}}
        =\frac{-3}{\sqrt{14}}=-\frac{3\sqrt{14}}{14}\approx-0.802.$$

        **(2)** 叉乘：
        $$\vec a\times\vec b=\begin{vmatrix}
        \vec i&\vec j&\vec k\\ 1&2&-1\\ 2&-1&3
        \end{vmatrix}
        =\vec i\begin{vmatrix}2&-1\\-1&3\end{vmatrix}
        -\vec j\begin{vmatrix}1&-1\\2&3\end{vmatrix}
        +\vec k\begin{vmatrix}1&2\\2&-1\end{vmatrix}$$
        $$=\vec i(6-1)-\vec j(3+2)+\vec k(-1-4)=(5,-5,-5).$$

        **验证垂直**：$(5,-5,-5)\cdot(1,2,-1)=5-10+5=0$ $\checkmark$
        $(5,-5,-5)\cdot(2,-1,3)=10+5-15=0$ $\checkmark$

        平行四边形面积：
        $$S=\abs{\vec a\times\vec b}=\sqrt{25+25+25}=5\sqrt3.$$

        **(3)** 混合积：
        $$\left[\vec a\vec b\vec c\right]=\left(\vec a\times\vec b\right)\cdot\vec c
        =(5,-5,-5)\cdot(0,1,1)=0-5-5=-10.$$

        体积 $V=\abs{-10}=10$。

        由 $\left[\vec a\vec b\vec c\right]=-10\ne0$，故 $\vec a,\vec b,\vec c$ ==不共面==。
      `,
      comment: String.raw`
        **第 (2) 问的验证值得每次都做**：
        ==叉乘的结果必须同时垂直于两个原向量==，
        点乘一下三秒钟，==能抓住行列式展开时的符号错误==。

        **展开叉乘时中间那项的负号最容易漏**：
        $$\vec a\times\vec b=\vec i M_1-\vec j M_2+\vec k M_3,$$
        ==$\vec j$ 前面是减号==（来自 $(-1)^{1+2}$）。

        **另一种算混合积的办法**：直接算三阶行列式
        $$\begin{vmatrix}1&2&-1\\ 2&-1&3\\ 0&1&1\end{vmatrix}
        =1(-1-3)-2(2-0)+(-1)(2-0)=-4-4-2=-10\ \checkmark$$
        ==与先叉乘再点乘的结果一致==，可以互验。

        **符号的含义**：$[\vec a\vec b\vec c]=-10<0$ 说明
        ==$\vec a,\vec b,\vec c$ 构成左手系==（负定向）。
        ==体积要取绝对值==，但定向信息在[第二类曲面积分](#/calculus/line-surface/first-kind-surface?at=orientation)
        那里会变得重要。

        **投影为负的几何意义**：$\vec a$ 在 $\vec b$ 方向上的分量指向 $\vec b$ 的==反方向==，
        与 $\cos\theta<0$（钝角）一致 $\checkmark$
        ==两个结果互相印证==。
      `,
    },

    { t: 'example',
      id: 'ex-application',
      title: '★ 用向量解决几何问题',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        已知 $A(1,0,0)$、$B(0,1,0)$、$C(0,0,1)$、$D(1,1,1)$。

        1. 求三角形 $ABC$ 的面积；
        2. 求四面体 $ABCD$ 的体积；
        3. 求点 $D$ 到平面 $ABC$ 的距离。
      `,
      idea: String.raw`
        **先把边向量算出来**（==都从 $A$ 出发==）：
        $$\vec{AB}=(-1,1,0),\quad \vec{AC}=(-1,0,1),\quad \vec{AD}=(0,1,1).$$

        **第 1 问**：$S=\frac12\abs{\vec{AB}\times\vec{AC}}$。

        **第 2 问**：$V=\frac16\abs{[\vec{AB},\vec{AC},\vec{AD}]}$。

        **第 3 问的巧法**：
        ==不用求平面方程==，直接用"体积 $=$ 底面积 $\times$ 高 $\div3$"：
        $$V=\frac13S_{\triangle ABC}\cdot h\ \Longrightarrow\ h=\frac{3V}{S}.$$
        ==前两问的结果直接拿来用==。

        **对照：常规法**要先求平面 $ABC$ 的方程，
        再用[点到平面的距离公式](#/calculus/vector-geometry/plane-line?at=distances)。
        ==两条路都要会，但本题显然用巧法==。

        **预判**：$A,B,C$ 关于坐标轴对称，
        ==平面 $ABC$ 应当是 $x+y+z=1$==，
        而 $D(1,1,1)$ 代入得 $3$，
        ==距离 $=\frac{\abs{3-1}}{\sqrt3}=\frac{2}{\sqrt3}$==。
        算完对照这个预判。
      `,
      solution: String.raw`
        $$\vec{AB}=(-1,1,0),\qquad \vec{AC}=(-1,0,1),\qquad \vec{AD}=(0,1,1).$$

        **(1) 三角形面积**：
        $$\vec{AB}\times\vec{AC}=\begin{vmatrix}
        \vec i&\vec j&\vec k\\ -1&1&0\\ -1&0&1
        \end{vmatrix}
        =\vec i(1-0)-\vec j(-1-0)+\vec k(0+1)=(1,1,1).$$
        $$S_{\triangle ABC}=\frac12\abs{(1,1,1)}=\frac{\sqrt3}{2}.$$

        **(2) 四面体体积**：
        $$\left[\vec{AB},\vec{AC},\vec{AD}\right]
        =\left(\vec{AB}\times\vec{AC}\right)\cdot\vec{AD}
        =(1,1,1)\cdot(0,1,1)=0+1+1=2.$$
        $$V=\frac16\abs{2}=\frac13.$$

        **(3) 点 $D$ 到平面 $ABC$ 的距离**：由 $V=\dfrac13S\cdot h$，
        $$h=\frac{3V}{S}=\frac{3\times\frac13}{\frac{\sqrt3}{2}}
        =\frac{1}{\frac{\sqrt3}{2}}=\frac{2}{\sqrt3}=\frac{2\sqrt3}{3}\approx1.155.$$

        **验证（常规法）**：平面 $ABC$ 的法向量为 $\vec n=(1,1,1)$，
        过 $A(1,0,0)$ 的平面方程为
        $$1\cdot(x-1)+1\cdot y+1\cdot z=0\ \Longrightarrow\ x+y+z=1.$$
        点 $D(1,1,1)$ 到它的距离
        $$h=\frac{\abs{1+1+1-1}}{\sqrt{1^{2}+1^{2}+1^{2}}}=\frac{2}{\sqrt3}\ \checkmark$$
      `,
      comment: String.raw`
        **"体积公式反求高"是一个很实用的技巧**：
        $$\boxed{\ h=\frac{3V}{S}=\frac{\abs{\left[\vec{AB},\vec{AC},\vec{AD}\right]}}{\abs{\vec{AB}\times\vec{AC}}}\ }$$
        ==把 $\frac16$ 与 $\frac12$ 约掉后，就是"混合积除以叉乘的模"==。

        ==这个式子本身就是点到平面距离公式的向量形式==：
        $$h=\frac{\abs{\vec{AD}\cdot\vec n}}{\abs{\vec n}},\qquad \vec n=\vec{AB}\times\vec{AC},$$
        ==即"$\vec{AD}$ 在法向量上的投影的绝对值"==——
        **两种理解殊途同归。**

        **叉乘结果 $(1,1,1)$ 的意义**：它正是平面 $x+y+z=1$ 的法向量，
        ==平面方程的系数就是法向量的分量==，
        见[平面的点法式](#/calculus/vector-geometry/plane-line?at=plane-forms)。

        **这道题的对称性**：$A,B,C$ 是三个坐标轴上的单位点，
        ==平面 $x+y+z=1$ 关于三个变量对称==，
        所以法向量必然是 $(1,1,1)$ 方向——==不算也能猜到==。
        **利用对称性预判结果，是检验计算的好办法。**

        **常见的追问**：求 $D$ 在平面 $ABC$ 上的投影点。
        $$D'=D-h\cdot\frac{\vec n}{\abs{\vec n}}
        =(1,1,1)-\frac{2}{\sqrt3}\cdot\frac{(1,1,1)}{\sqrt3}
        =(1,1,1)-\frac23(1,1,1)=\left(\frac13,\frac13,\frac13\right).$$
        ==验证：$\frac13+\frac13+\frac13=1$ $\checkmark$ 在平面上==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **投影公式的分母写成 $\abs{\vec b}^{2}$**：==投影（数）的分母是 $\abs{\vec b}$==，
         投影向量的分母才是 $\abs{\vec b}^{2}$。
      2. **叉乘展开漏 $\vec j$ 前的负号**。
      3. **认为叉乘可以交换或结合**：==两个都不行==。
      4. **由 $\vec a\times\vec b=\vec a\times\vec c$ 推 $\vec b=\vec c$**：==不成立==。
      5. **混合积忘了取绝对值**：==体积非负==，混合积可正可负。
      6. **四面体体积漏 $\frac16$**：平行六面体是 $\abs{[\cdot]}$，四面体是它的 $\frac16$。
      7. **算完叉乘不验垂直**：==点乘一下，三秒钟==。
      8. **共面判据用错**：==三向量共面用混合积==，四点共面要先化成三个向量。
      9. **点乘为负却说夹角是锐角**：==符号直接给出锐角/钝角==。
    ` },

  ],
});
