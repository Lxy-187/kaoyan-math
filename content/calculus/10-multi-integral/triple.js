/* ==========================================================================
   高等数学 / 10 重积分 / 三重积分：投影法与截面法
   ========================================================================== */

KM.page({
  path: 'calculus/multi-integral/triple',
  title: '三重积分：投影法与截面法',
  subtitle: '把三维压成"二维 + 一维"的两种压法。选哪一种，先看被积函数少了谁',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-13',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'two-ways', c: '一、只有两种拆法：穿线 与 切片' },

    { t: 'key', id: 'projection-vs-section', title: '投影法（先一后二） vs 截面法（先二后一）', c: String.raw`
      三重积分不能一次算完，必须拆成"二重 + 单重"。拆的方式只有两种，==区别在于哪一步先做==。

      **投影法（先一后二）**——先穿线，再投影：
      $$\iiint_\Omega f\,\d V=\iint_{D_{xy}}\d x\d y\int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z)\,\d z$$
      固定 $(x,y)$，沿 $z$ 方向射一根线穿过立体，==穿入面 $z_1$、穿出面 $z_2$ 就是内层积分限==；
      立体在 $xOy$ 面的影子 $D_{xy}$ 是外层二重积分的区域。

      **截面法（先二后一）**——先切片，再叠加：
      $$\iiint_\Omega f\,\d V=\int_a^b\d z\iint_{D_z} f(x,y,z)\,\d x\d y$$
      用平面 $z=$ 常数把立体切成一片一片，==先在每一片上做二重积分==，再把所有片叠起来。

      ==注意"先二后一"的切片方向不一定是 $z$。== 沿 $x$ 切就是
      $\displaystyle\int_a^b\d x\iint_{D_x}f\,\d y\d z$，本页主例题走的正是这一条。
    ` },

    { t: 'insight', id: 'function-picks-direction', title: '我的发现：被积函数决定往哪个方向切', c: String.raw`
      被积函数里==缺谁，就沿谁切==。

      本题被积函数是 $x^2$，完全不含 $y,z$。沿 $x$ 轴切片后，每一片上 $x$ 都是常数，于是
      $$\iint_{D_x} x^2\,\d y\d z=x^2\iint_{D_x}1\,\d y\d z=x^2\cdot\bigl(\text{截面 } D_x \text{ 的面积}\bigr).$$
      ==内层二重积分被直接降级成了"套一个面积公式"==，整道题只剩一个一元定积分。

      推广开来是完全对称的：被积函数是 $z^2$ 就沿 $z$ 切，是 $y^2$ 就沿 $y$ 切。
      更一般地，只要被积函数形如 $f(z)$（单变量），截面法就一定优于投影法。

      **但这条规则有前提**：积分区域得"不挑方向"。
      球体各向同性，怎么切都一样容易，所以被积函数说了算；
      要是区域是沿 $z$ 轴立着的抛物面，边界只有投到 $xOy$ 面才好写，
      那就是==区域说了算，被积函数得让路==。

      口诀：**区域先否决，被积函数再挑。**
    ` },

    { t: 'warn', id: 'no-substitution', title: '三重积分不能把边界方程代进被积函数', c: String.raw`
      这是和[第一类曲面积分](#/calculus/line-surface/first-kind-surface?at=forget-substitute)最容易串味的地方。

      | | 积分区域是什么 | 由什么描述 | 能不能代入被积函数 |
      |---|---|---|---|
      | 第一类曲面积分 | 一张==曲面==（皮） | ==等式== $F(x,y,z)=0$ | ==能==，面上每点都满足 |
      | 三重积分 | 一块==实心体==（馅） | ==不等式== $F(x,y,z)\le 0$ | ==不能==，只有边界点满足 |

      在 $\Omega:\,x^2+y^2+(z-1)^2\le 1$ 上，==绝不能==把 $x^2+y^2+(z-1)^2$ 换成 $1$ ——
      内部的点（比如球心 $(0,0,1)$）代进去是 $0$，不是 $1$。

      **那不等式的作用在哪？** 全部用在==确定积分限==上：
      穿入穿出面、投影区域、截面半径、球坐标的 $r$ 上限，都是把不等式取等号解出来的。
      ==等式没有浪费，只是用在"限"上而不是"被积函数"上。==

      三重积分能用的整体性简化只有两类：**对称性**（偶倍奇零）和**形心 / 质心公式**
      $\displaystyle\iiint_\Omega z\,\d V=\bar z\,V$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'choose', c: '二、四条路怎么选' },

    { t: 'compare', id: 'method-table', title: '拿到题先做的判断', cols: ['方法', '拆成什么', '识别信号', '典型区域'], rows: [
      ['**截面法**（先二后一）', '$\\int_a^b\\d z\\iint_{D_z}f\\,\\d x\\d y$', '被积函数==只含一个变量==；截面面积一眼可见', '球、旋转体、椭球'],
      ['**投影法**（先一后二）', '$\\iint_{D_{xy}}\\d x\\d y\\int_{z_1}^{z_2}f\\,\\d z$', '区域被==上下两张曲面夹住==', '"由 $z=g_1$ 与 $z=g_2$ 围成"'],
      ['**柱坐标**', '$\\iiint f\\cdot r\\,\\d r\\,\\d\\theta\\,\\d z$', '$x^2+y^2$ ==成对==出现', '圆柱、圆锥、抛物面'],
      ['**球坐标**', '$\\iiint f\\cdot r^2\\sin\\varphi\\,\\d r\\,\\d\\varphi\\,\\d\\theta$', '$x^2+y^2+z^2$ ==成对==出现', '球体、球与锥夹出的"冰淇淋"'],
    ] },

    { t: 'method', id: 'decision', title: '决策顺序（照着往下走，不要跳）', c: String.raw`
      1. **先查对称性**。区域关于某坐标面对称、被积函数关于该变量为奇 $\Rightarrow$ 直接为 $0$，题做完了。
      2. **看被积函数是不是单变量** $f(x)$ / $f(z)$。是 $\Rightarrow$ 沿该变量==截面法==，内层退化成面积公式。
      3. **看有没有 $x^2+y^2$ 或 $x^2+y^2+z^2$ 抱团出现**。有 $\Rightarrow$ 换柱 / 球坐标。
      4. **都没有** $\Rightarrow$ 老实用投影法，画图找穿入穿出面。

      ==第 1、2 步是"能不能不算"，第 3、4 步才是"怎么算"。== 顺序颠倒会白干很多活。

      柱坐标与球坐标的选择还有一条捷径：
      **被积函数或区域里出现 $z$ 与 $x^2+y^2$ 各管各的 $\to$ 柱坐标；
      三个平方项必须捆在一起才好看 $\to$ 球坐标。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'spherical', c: '三、球坐标：平方项越"完整"越简单' },

    { t: 'key', id: 'spherical-basic', title: '球坐标三件套', c: String.raw`
      $$\begin{cases}x=r\sin\varphi\cos\theta\\ y=r\sin\varphi\sin\theta\\ z=r\cos\varphi\end{cases}
        \qquad \d V=r^2\sin\varphi\,\d r\,\d\varphi\,\d\theta$$

      * $r\ge 0$：到原点的距离；
      * $\varphi\in[0,\pi]$：**天顶角**，从 $z$ 轴正向往下量（$\varphi=0$ 是北极，$\pi/2$ 是赤道面，$\pi$ 是南极）；
      * $\theta\in[0,2\pi]$：绕 $z$ 轴的经度。

      两个恒等式随时会用到：$x^2+y^2+z^2=r^2$，$x^2+y^2=r^2\sin^2\varphi$。

      ==雅可比因子 $r^2\sin\varphi$ 必须写==，漏掉是最常见的整题作废错误。
      记忆方式：$\d V$ 是三条弧长相乘 $\ \d r\times r\,\d\varphi\times r\sin\varphi\,\d\theta$。
    ` },

    { t: 'key', id: 'off-center-sphere', title: '偏心球 $(z-1)^2$ 不是负担，是礼物', c: String.raw`
      看到 $x^2+y^2+(z-1)^2\le 1$ 的第一反应常常是"配了方，球坐标要变麻烦"。==恰恰相反。==

      把它展开：
      $$x^2+y^2+z^2-2z+1\le 1\;\Longrightarrow\;x^2+y^2+z^2\le 2z .$$
      ==常数项 $1$ 被两边抵消了==（这正是"球面过原点"的代数表现）。代入球坐标：
      $$r^2\le 2r\cos\varphi\;\Longrightarrow\;\boxed{\,r\le 2\cos\varphi\,}$$

      $(z-1)^2$ 这个"困扰"被完全消灭，换来一个只含 $\varphi$ 的极简 $r$ 上限。

      **这类球的通用结论**（==建议直接背==，考场上常考）：

      | 区域 | 球心 | 球坐标下的边界 |
      |---|---|---|
      | $x^2+y^2+z^2\le 2az$ | $(0,0,a)$，在 $z$ 轴上 | $r\le 2a\cos\varphi$ |
      | $x^2+y^2+z^2\le 2ax$ | $(a,0,0)$，在 $x$ 轴上 | $r\le 2a\sin\varphi\cos\theta$ |
      | $x^2+y^2+z^2\le R^2$ | 原点 | $r\le R$ |

      ==判定信号：球面方程里没有常数项（即球面过原点）$\Rightarrow$ 球坐标会特别舒服。==
      反过来，球心不过原点又不在坐标轴上（如球心 $(a,a,a)$），球坐标就会很难看，那时该换别的方法。
    ` },

    { t: 'warn', id: 'phi-range', title: '$\\varphi$ 只能取到 $\\pi/2$，不是 $\\pi$', c: String.raw`
      对 $r\le 2\cos\varphi$：因为 $r\ge 0$，必须 $\cos\varphi\ge 0$，故 $\varphi\in\left[0,\dfrac{\pi}{2}\right]$。

      **几何上是一回事**：这个球"坐"在原点上方、与 $xOy$ 面==相切于原点==。
      从原点射出的射线，天顶角一旦超过 $\pi/2$ 就完全打不到球体了
      （$\varphi=\pi/2$ 时 $r$ 的上限已经是 $0$，射线与球只交于原点这一个点，测度为零）。

      ==$\varphi$ 的上限不需要另外去想，它由"$r$ 的上限必须非负"自动给出。==
      这是自洽性检查的好习惯：写完 $r\le g(\varphi)$，立刻解一次 $g(\varphi)\ge 0$。

      **踩坑写法**：习惯性地写 $\varphi\in[0,\pi]$，后半段 $\cos\varphi<0$ 使得 $r$ 上限为负，
      积分会算出一个符号错乱的结果，而且数值看着不离谱，很难查出来。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '四、例题' },

    { t: 'example',
      id: 'ex-x2-ball',
      title: '偏心球上的 $x^2$：切片法 vs 球坐标',
      source: '常见教辅填空题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle m=\iiint_\Omega x^2\,\d V$，其中 $\Omega:\;x^2+y^2+(z-1)^2\le 1$。
      `,
      openIdea: true,
      idea: String.raw`
        **先做那两个"能不能不算"的检查：**

        * 对称性：$\Omega$ 关于平面 $x=0$ 对称，但 $x^2$ 是==偶==函数，消不掉，只能算。
        * 被积函数 $x^2$ ==只含一个变量== $\Rightarrow$ 命中截面法的信号，沿 $x$ 轴切片。

        **为什么沿 $x$ 切这么香**：切完每片上 $x$ 是常数，提出去以后
        内层二重积分变成"求这一片的面积"。而球的截面必然是圆，面积公式白给。
        ==整道三重积分被压成一个一元定积分==，这是能达到的最省力形态。

        **球坐标为什么也能走通**：区域是球，$x^2+y^2+z^2$ 天然抱团；
        更关键的是这个球==过原点==，展开后常数项抵消，
        $r$ 的上限化成极干净的 $2\cos\varphi$，见[偏心球那一条](#/calculus/multi-integral/triple?at=off-center-sphere)。

        两条路都要会：截面法快，球坐标通用（区域一旦不是"每片都是圆"就只剩球坐标）。
      `,
      solution: String.raw`
        ### 解法 1：截面法（先二后一），沿 $x$ 轴切片

        **一、切片范围**：$\Omega$ 在 $x$ 轴上的投影为 $x\in[-1,1]$。

        **二、截面形状**：固定 $x$，截面 $D_x$ 满足
        $$y^2+(z-1)^2\le 1-x^2,$$
        这是 $yOz$ 面上以 $(0,1)$ 为圆心、$R=\sqrt{1-x^2}$ 为半径的圆盘。

        **三、内层二重积分**：在 $D_x$ 上 $x^2$ 是常数，直接提出，剩下的就是面积：
        $$\iint_{D_x} x^2\,\d y\d z=x^2\cdot\pi R^2=\pi x^2\bigl(1-x^2\bigr).$$

        **四、外层定积分**（偶函数，折半再乘 2）：
        $$m=\int_{-1}^{1}\pi x^2\bigl(1-x^2\bigr)\d x
          =2\pi\int_{0}^{1}\bigl(x^2-x^4\bigr)\d x
          =2\pi\left(\frac13-\frac15\right)=\frac{4}{15}\pi .$$

        ---

        ### 解法 2：球坐标

        **一、化边界**：$x^2+y^2+(z-1)^2\le1\Rightarrow x^2+y^2+z^2\le 2z\Rightarrow r\le 2\cos\varphi$。
        由 $r\ge0$ 得 $\varphi\in\left[0,\frac{\pi}{2}\right]$；区域绕 $z$ 轴旋转对称，$\theta\in[0,2\pi]$。

        **二、换被积函数与体积元**：$x^2=r^2\sin^2\varphi\cos^2\theta$，$\d V=r^2\sin\varphi\,\d r\,\d\varphi\,\d\theta$：
        $$m=\int_0^{2\pi}\!\!\d\theta\int_0^{\pi/2}\!\!\d\varphi\int_0^{2\cos\varphi}
          r^2\sin^2\varphi\cos^2\theta\cdot r^2\sin\varphi\,\d r .$$

        **三、三层分别算**（三个变量已完全分离，可以各算各的，
        依据见[分离判据](#/calculus/multi-integral/separable?at=criterion)）：
        $$\int_0^{2\pi}\cos^2\theta\,\d\theta=\pi,\qquad
          \int_0^{2\cos\varphi}r^4\,\d r=\frac{(2\cos\varphi)^5}{5}=\frac{32}{5}\cos^5\varphi .$$
        于是
        $$m=\pi\cdot\frac{32}{5}\int_0^{\pi/2}\sin^3\varphi\,\cos^5\varphi\,\d\varphi .$$

        **四、凑微分收尾**：$\sin^3\varphi=\bigl(1-\cos^2\varphi\bigr)\sin\varphi$，而 $\sin\varphi\,\d\varphi=-\d(\cos\varphi)$。
        令 $u=\cos\varphi$（$\varphi:0\to\frac\pi2$ 时 $u:1\to0$）：
        $$m=\frac{32\pi}{5}\int_0^{1}\bigl(1-u^2\bigr)u^5\,\d u
          =\frac{32\pi}{5}\left(\frac16-\frac18\right)
          =\frac{32\pi}{5}\cdot\frac{1}{24}=\boxed{\dfrac{4}{15}\pi}$$
      `,
      comment: String.raw`
        **两法对比**：截面法四行结束，球坐标要处理 $\sin^3\varphi\cos^5\varphi$ 的凑微分。
        ==本题截面法明显更优==，因为被积函数恰好单变量、截面恰好是圆。

        但把区域换成"球被平面 $z=1$ 截去下半"这类情况，截面不再是完整圆，
        截面法的面积公式就用不了，球坐标反而稳。==所以两法不是二选一，是备用关系。==

        **$\sin^m\varphi\cos^n\varphi$ 的通用做法**：只要 $\sin$ 或 $\cos$ 有一个是==奇次幂==，
        就把那一个拆出一次去凑微分（本题 $\sin^3$ 是奇次，拆出 $\sin\varphi\,\d\varphi$）。
        两个都是偶次时才需要降幂公式。

        **值得记的中间结论**：截面法那一步 $\iint_{D_x}1\,\d y\d z=$ 截面面积。
        ==凡是被积函数能提出内层积分的题，内层永远退化成"面积"或"体积"==，
        这在重积分应用题里反复出现。
      `,
    },

    { t: 'example',
      id: 'ex-z-centroid',
      title: '同一区域换成 $z$：切片方向跟着换，还能用形心秒杀',
      level: 2,
      problem: String.raw`
        仍取 $\Omega:\;x^2+y^2+(z-1)^2\le 1$，计算 $\displaystyle\iiint_\Omega z\,\d V$。
      `,
      idea: String.raw`
        被积函数从 $x^2$ 换成 $z$，按[那条规则](#/calculus/multi-integral/triple?at=function-picks-direction)，
        切片方向就该从沿 $x$ 换成==沿 $z$==。

        但这题还有更快的一步：被积函数是==一次的==，直接上形心公式。
        球体的形心就是球心，$\bar z=1$ 一眼可见，根本不用积分。
      `,
      solution: String.raw`
        ### 秒杀：形心公式

        $$\iiint_\Omega z\,\d V=\bar z\cdot V=1\cdot\frac{4}{3}\pi\cdot 1^3=\frac{4}{3}\pi .$$

        ### 验算：截面法沿 $z$ 切

        $z\in[0,2]$，截面 $D_z:\;x^2+y^2\le 1-(z-1)^2$，面积 $\pi\bigl[1-(z-1)^2\bigr]$。
        $$\iiint_\Omega z\,\d V=\int_0^2 z\,\pi\bigl[1-(z-1)^2\bigr]\d z
          \xlongequal{t=z-1}\pi\int_{-1}^{1}(1+t)\bigl(1-t^2\bigr)\d t .$$
        展开后 $\displaystyle\int_{-1}^1 t\bigl(1-t^2\bigr)\d t=0$（奇函数），只剩
        $$\pi\int_{-1}^{1}\bigl(1-t^2\bigr)\d t=\pi\cdot\frac43=\frac43\pi .\ \checkmark$$
      `,
      comment: String.raw`
        **形心公式为什么能用而"代入边界"不能用**：
        形心公式是对==整个实心区域==定义的整体量，不依赖任何单点满足边界方程；
        而"代入"要求每一点都满足等式，实心区域做不到（见
        [这条辨析](#/calculus/multi-integral/triple?at=no-substitution)）。

        **常用形心速查**：球体形心 = 球心；圆柱形心 = 轴上中点；
        上半球（半径 $R$）形心 $\bar z=\frac38 R$；圆锥（高 $h$，尖朝下）形心 $\bar z=\frac34 h$。
        ==被积函数是 $x$、$y$、$z$ 的一次式时，先想形心==。
      `,
    },

    { t: 'example',
      id: 'ex-cylindrical',
      title: '投影法 + 柱坐标的标准动作',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\iiint_\Omega\bigl(x^2+y^2\bigr)\d V$，其中 $\Omega$ 由抛物面 $z=x^2+y^2$
        与平面 $z=1$ 围成。
      `,
      idea: String.raw`
        两个信号同时亮：
        * 区域是"==上下两张曲面夹住==的"（下面抛物面、上面平面）$\to$ 投影法；
        * $x^2+y^2$ ==成对==出现在被积函数和边界里 $\to$ 柱坐标。

        这题不能用截面法沿 $z$ 切吗？能，截面是半径 $\sqrt z$ 的圆，
        但被积函数 $x^2+y^2$ 在截面上==不是常数==，提不出去，内层还得老实做二重积分，
        白白多绕一圈。=="被积函数能否提出内层"才是截面法的准入条件。==
      `,
      solution: String.raw`
        **投影**：两曲面交线满足 $x^2+y^2=1$，故 $D_{xy}:\;x^2+y^2\le 1$。

        **穿线**：固定 $(x,y)$，$z$ 从抛物面 $z=x^2+y^2$ 穿入，到平面 $z=1$ 穿出。

        **换柱坐标**（$x^2+y^2=r^2$，$\d V=r\,\d r\,\d\theta\,\d z$）：
        $$\iiint_\Omega\bigl(x^2+y^2\bigr)\d V
          =\int_0^{2\pi}\!\!\d\theta\int_0^{1}\!\!\d r\int_{r^2}^{1} r^2\cdot r\,\d z
          =2\pi\int_0^1 r^3\bigl(1-r^2\bigr)\d r$$
        $$=2\pi\left(\frac14-\frac16\right)=2\pi\cdot\frac{1}{12}=\frac{\pi}{6}.$$
      `,
      comment: String.raw`
        **柱坐标的雅可比是 $r$，不是 $r^2$**——和球坐标的 $r^2\sin\varphi$ 别记混。
        速记：柱坐标 = 极坐标（贡献一个 $r$）+ 原封不动的 $z$。

        **投影法的固定顺序**：先求两曲面的==交线==并投影得 $D_{xy}$，再定穿入穿出面。
        顺序反过来（先想 $z$ 的范围）容易把 $D_{xy}$ 写错。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'checklist', c: '五、做题动作与自查' },

    { t: 'steps', id: 'steps', title: '三重积分的固定顺序', items: [
      { title: '查对称性',
        c: String.raw`区域关于某坐标面对称 + 被积函数关于该变量为奇 $\Rightarrow$ ==直接为 0==。
                      这一步是"能不能不算"，必须最先做。` },
      { title: '看被积函数是不是一次式',
        c: String.raw`是 $\Rightarrow$ 试[形心公式](#/calculus/multi-integral/triple?at=ex-z-centroid)
                      $\displaystyle\iiint z\,\d V=\bar z\,V$，往往一行出答案。` },
      { title: '看被积函数少了哪个变量',
        c: String.raw`只含单变量 $\Rightarrow$ ==沿该变量切片==，内层退化成截面面积。
                      准入条件是"被积函数能提出内层"，不是"截面好看"。` },
      { title: '看平方项抱不抱团',
        c: String.raw`$x^2+y^2$ 成对 $\to$ 柱坐标（雅可比 $r$）；
                      $x^2+y^2+z^2$ 成对 $\to$ 球坐标（雅可比 $r^2\sin\varphi$）。
                      球面==过原点==时球坐标格外舒服。` },
      { title: '都不命中就投影法',
        c: String.raw`画图 $\to$ 求交线 $\to$ 定投影区域 $D_{xy}$ $\to$ 定穿入穿出面。
                      顺序不能反。` },
    ] },

    { t: 'warn', id: 'pitfalls', title: '踩分点清单', c: String.raw`
      | 错误 | 后果 | 自查方式 |
      |---|---|---|
      | 把边界等式代进被积函数 | 概念性错误，整题作废 | ==不等式只能用来定限==，见[辨析](#/calculus/multi-integral/triple?at=no-substitution) |
      | 漏掉雅可比 $r$ 或 $r^2\sin\varphi$ | 量纲都不对 | 换完坐标先写体积元，再写被积函数 |
      | 球坐标里 $\varphi$ 一律写 $[0,\pi]$ | 符号错乱 | 写完 $r\le g(\varphi)$ 立刻解 $g(\varphi)\ge0$ |
      | 截面法用在被积函数含多变量时 | 内层提不出，白绕一圈 | 提出内层之前先问：这一片上它是常数吗 |
      | 投影法先定 $z$ 范围再找 $D_{xy}$ | 投影区域写错 | ==永远先求交线== |
      | 结果为负 | 若 $f\ge0$ 则必错 | $\d V>0$，被积函数非负时结果必非负 |
    ` },

  ],
});
