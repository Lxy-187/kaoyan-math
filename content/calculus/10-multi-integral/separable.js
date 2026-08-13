/* ==========================================================================
   高等数学 / 10 重积分 / 变量分离与升维：高斯积分与柯西不等式
   ========================================================================== */

KM.page({
  path: 'calculus/multi-integral/separable',
  title: '变量分离与升维：高斯积分与柯西不等式',
  subtitle: '什么时候二重积分等于两个一重积分相乘；反过来，怎么把一个算不出的一重积分故意升成二重',
  tags: ['专题', '概念辨析', '证明题', '高频'],
  updated: '2026-08-13',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'principle', c: '一、可分离性：其实就是乘法分配律' },

    { t: 'insight', id: 'my-observation', title: '我的观察：能分离才等于乘积，否则必须累次', c: String.raw`
      二重积分可以理解为两个一重积分的乘积。
      ==但如果是标准的累次积分，这里是不能分别算两个一重积分然后相乘的，
      因为区间范围和被积函数都会有关联。==
      如果可以分离，那其实就是多个一重积分相乘，三重积分也是这样。

      ---

      **这个判断完全正确，而且可以说得更狠一点**：所谓"关联"，
      区域上的关联和函数上的关联==根本是同一件事==（见[下面这条](#/calculus/multi-integral/separable?at=same-obstacle)）。
      整节要做的就是把"关联"这个词换成一条可以照着查的判据。
    ` },

    { t: 'key', id: 'criterion', title: '分离判据：两个条件，缺一不可', c: String.raw`
      $$\left(\int_a^b g(x)\dx\right)\left(\int_c^d h(y)\dy\right)
        =\iint_{[a,b]\times[c,d]} g(x)\,h(y)\dxy$$

      成立需要**同时**满足：

      | 条件 | 说的是什么 | 违反的样子 |
      |---|---|---|
      | **区域是矩形** | 四条积分限全是==常数==，$y$ 的范围不看 $x$ 的脸色 | $\displaystyle\int_0^1\!\!\d x\int_0^{x}\cdots\d y$ |
      | **函数是乘积** | 被积函数能写成 ==$g(x)\cdot h(y)$== | $x+y$、$\sin(xy)$、$\dfrac{1}{x+y}$ |

      **为什么是这两条 —— 因为这就是乘法分配律。** 把两个和式乘开：
      $$\Bigl(\sum_i g_i\,\Delta x\Bigr)\Bigl(\sum_j h_j\,\Delta y\Bigr)
        =\sum_{i}\sum_{j} g_i h_j\,\Delta x\,\Delta y$$
      左边是"两串数各自求和再相乘"，右边是==一张 $m\times n$ 的乘法表全部格子之和==。
      二重积分正是这张表的连续版本。于是两个条件立刻有了直白的意思：

      * **矩形区域** = 乘法表是完整的长方形，每个 $x$ 和每个 $y$ 配一次，==不漏格也不多格==；
      * **乘积形式** = 第 $(i,j)$ 格里填的确实是 $g_i h_j$，而不是 $g_i+h_j$ 这种别的东西。

      ==记住这个"乘法表"的画面，比记两条判据管用==：想拆开，就得先确认你面对的是一张完整的、按乘法填的表。
    ` },

    { t: 'key', id: 'same-obstacle', title: '进一步：两个条件其实是一个条件', c: String.raw`
      非矩形区域可以强行装进矩形里，代价是乘一个**示性函数**（区域内取 $1$，区域外取 $0$）：
      $$\iint_D f(x,y)\dxy=\iint_{[a,b]\times[c,d]} f(x,y)\cdot\mathbf 1_D(x,y)\dxy$$

      而 $\mathbf 1_D$ 能拆成 $\mathbf 1_{[a,b]}(x)\cdot\mathbf 1_{[c,d]}(y)$ 当且仅当 ==$D$ 本来就是矩形==。

      于是"区域有关联"只是"函数有关联"换了件衣服，真正的判据只剩**一条**：

      $$\boxed{\ \text{把区域限制也算进去之后，整个被积对象能否写成 } g(x)\,h(y)\ }$$

      这条统一的说法在概率论里会原样再见一次：
      $X,Y$ 独立 $\iff f(x,y)=f_X(x)f_Y(y)$，
      而教材总要额外强调"==支撑区域必须是矩形=="（比如在 $0<x<y<1$ 上均匀分布的两个变量一定不独立，
      哪怕密度是常数）—— 那句附加条件根本不是附加的，它就是同一条判据的另一半。
    ` },

    { t: 'warn', id: 'traps', title: '判据用错的四种典型', c: String.raw`
      | 式子 | 能拆吗 | 原因 |
      |---|---|---|
      | $\displaystyle\iint_{[0,1]^2}e^{x+y}\dxy$ | ==能== | $e^{x+y}=e^x\cdot e^y$。==看的是能不能化成乘积，不是表面长相== |
      | $\displaystyle\iint_{[0,1]^2}(x+y)\dxy$ | 不能 | 和不是积。老实累次，先对 $y$ 积（把 $x$ 当常数） |
      | $\displaystyle\iint_{x^2+y^2\le1}xy\dxy$ | 不能 | ==函数可分离，但区域不是矩形==。这是最常见的误判 |
      | $\displaystyle\int_0^1\!\!\d x\int_0^x e^{x+y}\dy$ | 不能 | ==函数可分离，但内层限带 $x$==。同上 |

      后两行是同一个错误的两副面孔：**只检查了被积函数就动手拆**。
      ==两个条件必须都点头才能拆，任何一个摇头就退回累次积分，由内向外老实算。==

      推广到 $n$ 重完全一样：**超矩形 + 完全乘积 $f_1(x_1)\cdots f_n(x_n)$**
      $\iff$ 等于 $n$ 个一重积分连乘。只要有一个变量的限依赖别人，或者函数里出现
      $x_1x_2+x_3$ 这种拆不开的项，就必须逐层降维。
      三重积分里最常吃到这个红利的是球坐标下的 $\theta$：
      被积函数常常与 $\theta$ 无关，$\int_0^{2\pi}\dtheta=2\pi$ 直接提到最外面
      —— [那道偏心球例题的解法 2](#/calculus/multi-integral/triple?at=ex-x2-ball) 走的就是这一步。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'lift', c: '二、反用：算不出来就升维' },

    { t: 'insight', id: 'why-lift', title: '升维换来的到底是什么：自由度', c: String.raw`
      第一节是"二重 → 一重"，==把等号反过来读，就是一套主动的手法：一重 → 二重==。

      听起来很怪：一维都算不出来，凭什么二维就能算？

      **因为升维换来的是换元的自由度。**

      * 一元积分的换元只有 $u=u(x)$ 一种形状，本质是在一条线上重新标刻度，==花样有限==；
      * 二重积分可以做**极坐标、旋转**这类一维根本不存在的变换，
        而且每次换元都会吐出一个==雅可比因子==。

      高斯积分能算出来，==不是因为二重积分更强大，而是因为极坐标的雅可比恰好是 $r$==：

      $$\int e^{-x^2}\dx\ \text{算不出}\qquad\text{但}\qquad
        \int r\,e^{-r^2}\d r\ \text{一眼可算}$$

      $e^{-r^2}$ 求导会掉出一个 $-2r$，所以它的原函数天生"缺一个 $r$"。
      一维里没地方变出这个 $r$；升到二维走极坐标，雅可比==免费送了一个 $r$==，缺口正好补上。

      ==这才是整个手法的心脏：升维不是为了变复杂，是为了去二维捡那个一维捡不到的因子。==
    ` },

    { t: 'method', id: 'skeleton', title: '升维法的骨架：分离 → 换元 → 分离', c: String.raw`
      高斯积分的证明只有三个动作，而且首尾两个动作用的是==同一条恒等式的两个方向==：

      1. **分离（反着用）**：把 $I^2$ 写成两个一重积分的乘积，==两个积分要换成不同的哑变量==，
         再合并成一个二重积分；
      2. **换元**：在二维里做一维做不到的变换（这里是极坐标），收下雅可比因子；
      3. **分离（正着用）**：换完之后区域仍然是矩形、函数仍然是乘积，直接拆回两个一重积分。

      ==第 3 步能成立是有前提的：全平面在直角坐标下是矩形，在极坐标下 $[0,+\infty)\times[0,2\pi]$ 还是矩形。==
      这个"两头都是矩形"是高斯积分能一路拆到底的关键。
      换个区域（比如只在第一象限的某块上）就未必这么顺，那时第 3 步得改成累次。
    ` },

    { t: 'steps', id: 'gauss-steps', title: '高斯积分：$\\int_{-\\infty}^{+\\infty}e^{-x^2}\\d x=\\sqrt{\\pi}$', items: [
      { title: '平方，并换掉哑变量',
        c: String.raw`记 $I=\displaystyle\int_{-\infty}^{+\infty}e^{-x^2}\dx$。
          定积分的值与积分变量的字母无关，所以
          $$I^2=\left(\int_{-\infty}^{+\infty}e^{-x^2}\dx\right)\left(\int_{-\infty}^{+\infty}e^{-y^2}\dy\right).$$
          ==把第二个因子的 $x$ 改写成 $y$，这一步就是全部的"手法"==，
          目的是让两个积分的变量互相独立，好合并。` },

      { title: '合并成全平面上的二重积分',
        c: String.raw`区域 $\R\times\R$ 是矩形，被积函数 $e^{-x^2}\cdot e^{-y^2}$ 是乘积，
          [判据](#/calculus/multi-integral/separable?at=criterion)两条全中，可以反着用：
          $$I^2=\iint_{\R^2}e^{-(x^2+y^2)}\dxy .$$
          ==注意 $e^{-x^2}e^{-y^2}=e^{-(x^2+y^2)}$ 这一步：指数相加合并，
          $x^2+y^2$ 一露面就是在喊"极坐标"。==` },

      { title: '换极坐标，收下雅可比 $r$',
        c: String.raw`令 $x=r\cos\theta,\;y=r\sin\theta$，三处同时替换：
          * 被积函数：$x^2+y^2=r^2\Rightarrow e^{-r^2}$；
          * 面积微元：$\dxy=r\,\d r\,\dtheta$（==这个 $r$ 是整道题的胜负手，漏了就前功尽弃==）；
          * 积分限：全平面对应 $r\in[0,+\infty)$，$\theta\in[0,2\pi]$。

          $$I^2=\int_0^{2\pi}\!\!\dtheta\int_0^{+\infty}e^{-r^2}\,r\,\d r$$` },

      { title: '再分离，两个积分各算各的',
        c: String.raw`新区域 $[0,+\infty)\times[0,2\pi]$ 仍是矩形，被积函数 $r\,e^{-r^2}$ 里根本没有 $\theta$，
          于是又能拆：
          $$I^2=\left(\int_0^{2\pi}\dtheta\right)\left(\int_0^{+\infty}r\,e^{-r^2}\,\d r\right)$$
          * 角度部分：$\displaystyle\int_0^{2\pi}\dtheta=2\pi$（==是 $2\pi$，不是 $1$==，最常见的低级失分）；
          * 径向部分：凑微分 $r\,\d r=\tfrac12\,\d(r^2)$，原函数是 $-\tfrac12e^{-r^2}$，
            $$\int_0^{+\infty}r\,e^{-r^2}\d r=\left[-\tfrac12 e^{-r^2}\right]_0^{+\infty}
              =0-\left(-\tfrac12\right)=\tfrac12 .$$

          $$I^2=2\pi\cdot\tfrac12=\pi$$` },

      { title: '开方，说明取正号',
        c: String.raw`$e^{-x^2}>0$ 恒成立，故 $I>0$，负根舍去：
          $$\boxed{\ I=\int_{-\infty}^{+\infty}e^{-x^2}\dx=\sqrt{\pi}\ }$$
          ==这句"因为被积函数恒正所以取正根"不能省==，
          否则从 $I^2=\pi$ 到 $I=\sqrt\pi$ 是跳步。` },
    ] },

    { t: 'formulas', id: 'gauss-family', title: '$e^{-x^2}$ 家族速查（背下来）', items: [
      { label: '本尊', tex: String.raw`\int_{-\infty}^{+\infty}e^{-x^2}\,\mathrm{d}x=\sqrt{\pi}` },
      { label: '半边（偶函数折半）', tex: String.raw`\int_{0}^{+\infty}e^{-x^2}\,\mathrm{d}x=\frac{\sqrt{\pi}}{2}` },
      { label: '带系数（令 $t=\\sqrt a\\,x$）', tex: String.raw`\int_{-\infty}^{+\infty}e^{-ax^2}\,\mathrm{d}x=\sqrt{\frac{\pi}{a}}\quad(a>0)` },
      { label: '二阶矩', tex: String.raw`\int_{0}^{+\infty}x^{2}e^{-x^{2}}\,\mathrm{d}x=\frac{\sqrt{\pi}}{4}` },
      { label: '正态密度归一化', tex: String.raw`\int_{-\infty}^{+\infty}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}\,\mathrm{d}x=\sqrt{2\pi}\,\sigma` },
      { label: 'Gamma 函数的半整数值', tex: String.raw`\Gamma\!\left(\tfrac12\right)=\int_0^{+\infty}t^{-1/2}e^{-t}\,\mathrm{d}t=\sqrt{\pi}` },
    ] },

    { t: 'key', id: 'downstream', title: '考研里高斯积分真正的用武之地：概率论', c: String.raw`
      数一的高数部分几乎不会直接考"求 $\int e^{-x^2}\dx$"，
      ==它的价值全在下游==：所有含 $e^{-(\text{二次式})}$ 的反常积分，最后都归到它。

      * **正态密度积分为 $1$**：令 $t=\dfrac{x-\mu}{\sqrt2\,\sigma}$，
        $$\int_{-\infty}^{+\infty}\frac{1}{\sqrt{2\pi}\,\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}\dx
          =\frac{1}{\sqrt\pi}\int_{-\infty}^{+\infty}e^{-t^2}\d t=1 .$$
      * **算正态的 $\E X$、$\Var X$**、二维正态求边缘密度、$\E\left|X\right|$ 之类，
        换元之后剩下的都是速查表里那几个。
      * 遇到 $\displaystyle\int_{-\infty}^{+\infty}e^{-x^2/2}\dx=\sqrt{2\pi}$ 时，
        ==直接引用"标准正态密度积分为 1"往往比换元更快==。

      **反过来也成立**：概率论里"密度函数积分为 $1$"是一条==免费的积分公式==。
      看到形状像某个已知分布的反常积分，先想能不能靠归一化秒杀，别急着硬算。
    ` },

    { t: 'warn', id: 'rigor', title: '严格性：全平面的反常二重积分凭什么能这么算', c: String.raw`
      上面第 2 步把两个反常一重积分合并成反常二重积分，第 4 步又拆开，
      ==这两步在反常积分上不是无条件的==（一般要求绝对收敛，即 Fubini 定理）。

      本题能放心用的理由：**被积函数恒正**。
      非负函数的重积分与累次积分总是同时收敛、同时发散且取值相同（Tonelli），不需要额外验证。

      严格的极限写法是用两族区域夹逼：方块 $[-R,R]^2$ 与圆盘 $x^2+y^2\le R^2$，
      $$\iint_{|x|,|y|\le R}\le\iint_{r\le R\sqrt2}\quad\text{且两者极限相同}\ \Rightarrow\ I^2=\pi .$$

      ==考研答卷不必写这一段==，但要知道"被积函数非负"是这里能随便换序的护身符；
      如果哪天被积函数变号，分离与换序就得先说明绝对收敛。
    ` },

    { t: 'example',
      id: 'ex-x2-gauss',
      title: '$\\int_0^{+\\infty}x^2e^{-x^2}\\d x$：靠分部积分退回高斯积分',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\int_0^{+\infty}x^{2}e^{-x^{2}}\dx$，并由此验证标准正态分布的方差为 $1$。
      `,
      openIdea: true,
      idea: String.raw`
        $x^2e^{-x^2}$ 不能再升维了（升维只对 $e^{-x^2}$ 那个"裸"形式有用）。
        换个思路：==既然 $\int e^{-x^2}$ 的值已知，就想办法把这道题化归过去==。

        关键观察：$x\,e^{-x^2}$ 是==可以直接积的==（凑微分），
        所以把 $x^2e^{-x^2}$ 拆成 $x\cdot\bigl(x e^{-x^2}\bigr)$，
        让能积的那半去当 $\d v$，剩下的 $x$ 求导变成 $1$ —— 分部积分正好降到 $\int e^{-x^2}$。

        ==口诀：见到 $x^{2k+1}e^{-x^2}$ 直接凑微分；见到 $x^{2k}e^{-x^2}$ 分部积分往下降一级，
        最终落到 $\int e^{-x^2}=\frac{\sqrt\pi}{2}$。==
      `,
      solution: String.raw`
        **一、拆成分部积分的形状**：$x\,e^{-x^2}\dx=-\dfrac12\,\d\bigl(e^{-x^2}\bigr)$，于是
        $$\int_0^{+\infty}x^{2}e^{-x^{2}}\dx
          =-\frac12\int_0^{+\infty}x\,\d\bigl(e^{-x^2}\bigr).$$

        **二、分部**：
        $$=-\frac12\left[x\,e^{-x^2}\right]_0^{+\infty}+\frac12\int_0^{+\infty}e^{-x^2}\dx .$$

        **三、边界项为 $0$**：$x\to+\infty$ 时 $e^{-x^2}$ 衰减远快于 $x$ 增长，极限为 $0$；$x=0$ 时也为 $0$。

        **四、代入高斯积分**：
        $$=\frac12\cdot\frac{\sqrt\pi}{2}=\boxed{\dfrac{\sqrt\pi}{4}}$$

        ---

        **验证 $\Var X=1$**（$X\sim N(0,1)$，$\E X=0$ 故 $\Var X=\E X^2$）：
        $$\E X^{2}=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{+\infty}x^{2}e^{-x^{2}/2}\dx
          \xrightarrow{\;x=\sqrt2\,u\;}
          \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{+\infty}2u^{2}e^{-u^{2}}\cdot\sqrt2\,\d u$$
        $$=\frac{2\sqrt2}{\sqrt{2\pi}}\cdot 2\int_0^{+\infty}u^{2}e^{-u^{2}}\d u
          =\frac{2\sqrt2}{\sqrt{2\pi}}\cdot 2\cdot\frac{\sqrt\pi}{4}=1 .\ \checkmark$$
      `,
      comment: String.raw`
        **递推关系值得记**：设 $J_n=\displaystyle\int_0^{+\infty}x^{n}e^{-x^{2}}\dx$，上面那步分部给出
        $$J_n=\frac{n-1}{2}J_{n-2},\qquad J_0=\frac{\sqrt\pi}{2},\quad J_1=\frac12 .$$
        于是==偶数阶带 $\sqrt\pi$，奇数阶是有理数==：$J_2=\frac{\sqrt\pi}{4}$，$J_3=\frac12$，$J_4=\frac{3\sqrt\pi}{8}$。

        这条递推等价于 $\Gamma$ 函数的 $\Gamma(s+1)=s\,\Gamma(s)$，
        也正是正态分布各阶矩公式 $\E X^{2k}=(2k-1)!!$ 的来源。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'cauchy', c: '三、升维的第二个战场：柯西–施瓦茨不等式' },

    { t: 'insight', id: 'why-double-works', title: '为什么升维能证不等式：把"没法比"变成"逐点比"', c: String.raw`
      要证
      $$\left(\int_a^b fg\dx\right)^{2}\ \le\ \left(\int_a^b f^{2}\dx\right)\left(\int_a^b g^{2}\dx\right)$$

      **一维视角下的困难**：左边是"一个积分的平方"，右边是"两个积分的乘积"，
      ==形状不同，没法逐点比较==。所以标准做法只好绕道，
      引入参数 $t$ 造一个二次三项式，看[判别式](#/threads/patterns/cauchy-schwarz?at=discriminant)。

      **升维之后困难就消失了**：用[判据](#/calculus/multi-integral/separable?at=criterion)反着用，
      两边都能写成==同一个正方形 $[a,b]^2$ 上的二重积分==：
      $$\left(\int fg\right)^{2}=\iint f(x)g(x)f(y)g(y)\dxy,\qquad
        \left(\int f^{2}\right)\left(\int g^{2}\right)=\iint f^{2}(x)g^{2}(y)\dxy$$

      ==同一区域上的两个积分，比大小只需要比被积函数。== 问题从"比两个数"降级成了"看一个函数的符号"。
      这就是升维在不等式里的作用：**统一战场**。
    ` },

    { t: 'method', id: 'symmetrize', title: '关键动作：对称化（$x\\leftrightarrow y$ 是免费的）', c: String.raw`
      直接作差会卡住：
      $$f^{2}(x)g^{2}(y)-f(x)g(x)f(y)g(y)$$
      ==这个式子不是恒非负的==（取 $f=g$、$x\ne y$ 就能让它变号），所以不能直接下结论。

      **补救靠一个二重积分独有的免费性质**：正方形区域关于 $x\leftrightarrow y$ 对称，
      所以交换字母不改变积分值：
      $$\iint_{[a,b]^2}F(x,y)\dxy=\iint_{[a,b]^2}F(y,x)\dxy
        =\frac12\iint_{[a,b]^2}\bigl[F(x,y)+F(y,x)\bigr]\dxy$$

      把差式对称化（$f^2(x)g^2(y)$ 换名后变成 $f^2(y)g^2(x)$，交叉项换名后不变）：
      $$\left(\int f^{2}\right)\left(\int g^{2}\right)-\left(\int fg\right)^{2}
        =\frac12\iint_{[a,b]^2}\Bigl[f^{2}(x)g^{2}(y)-2f(x)g(x)f(y)g(y)+f^{2}(y)g^{2}(x)\Bigr]\dxy$$
      中括号里正好是一个完全平方：
      $$\boxed{\ \left(\int_a^b f^{2}\right)\left(\int_a^b g^{2}\right)-\left(\int_a^b fg\right)^{2}
        =\frac12\iint_{[a,b]^2}\bigl[f(x)g(y)-f(y)g(x)\bigr]^{2}\dxy\ \ge\ 0\ }$$

      ==那个"凭空冒出来"的 $[f(x)g(y)-f(y)g(x)]^2$ 不是猜的，它是对称化的必然产物。==
      教材上先写出这个平方再展开，是把发现顺序倒过来讲了；
      真实的思路是：**升维统一战场 → 作差发现不对称 → 对称化 → 完全平方自己长出来**。
    ` },

    { t: 'key', id: 'lagrange-continuous', title: '这个证明的真正身份：拉格朗日恒等式的连续版', c: String.raw`
      上面那个方框不是不等式，是==等式==——它把"差多少"精确地写了出来。
      而它正是[离散拉格朗日恒等式](#/threads/patterns/cauchy-schwarz?at=lagrange-identity)的连续对应物：

      | | 离散 | 连续 |
      |---|---|---|
      | 缺口 | $\displaystyle\sum_{i<j}\bigl(a_ib_j-a_jb_i\bigr)^{2}$ | $\displaystyle\frac12\iint\bigl[f(x)g(y)-f(y)g(x)\bigr]^{2}\dxy$ |
      | 那个 $\frac12$ | $i<j$ 只数一半格子 | ==$\frac12\iint$ 数全部格子再折半== |
      | 取等 | 所有 $a_ib_j-a_jb_i=0$ | $f(x)g(y)=f(y)g(x)$（几乎处处） |
      | 含义 | $2\times2$ 行列式全为零 | ==两向量成比例，即线性相关== |

      $i<j$ 与 $\frac12\sum_{i,j}$ 是同一件事（对角线上 $i=j$ 那些项本来就是 $0$），
      ==这就是连续版那个 $\frac12$ 的来历==。

      **取等条件顺手就读出来了**：非负连续函数积分为零 $\Rightarrow$ 恒为零 $\Rightarrow$
      $\dfrac{f(x)}{g(x)}=\dfrac{f(y)}{g(y)}$ 与 $x,y$ 无关 $\Rightarrow$ ==$f=kg$==。
      不用像判别式法那样再回头讨论 $\Delta=0$。
    ` },

    { t: 'compare', id: 'two-proofs',
      title: '两种证法怎么选',
      cols: ['', '判别式法', '二重积分法'],
      rows: [
        ['构造的东西', '$\\displaystyle\\int(f+tg)^{2}\\dx\\ge0$，引入==参数 $t$==',
                       '$\\displaystyle\\iint\\bigl[f(x)g(y)-f(y)g(x)\\bigr]^{2}\\ge0$，引入==第二个变量 $y$=='],
        ['非负的来源', '平方非负', '平方非负（同一个源头）'],
        ['取等怎么得到', '$\\Delta=0\\Rightarrow$ 有实根 $t_0\\Rightarrow f+t_0g=0$', '被积函数几乎处处为零，一步到位'],
        ['给出缺口吗', '不给，只给"$\\le$"', '==给，而且是精确等式=='],
        ['适用范围', '任何内积空间（向量 / 数列 / 积分 / 概率通吃）', '只对积分形式（要有二重积分可用）'],
        ['考场推荐', '==默认用它==，通用且行数少', '题目明确要求"用二重积分证"，或要估计缺口时'],
      ] },

    /* ================================================================== */
    { t: 'h', id: 'summary', c: '四、收口：什么时候该想到升维' },

    { t: 'method', id: 'when-to-lift', title: '三个触发信号', c: String.raw`
      | 信号 | 动作 | 例子 |
      |---|---|---|
      | 一维积不出来，但**平方后出现 $x^2+y^2$** | 升维 + ==极坐标==，去捡雅可比 $r$ | $\displaystyle\int e^{-x^2}\dx$ |
      | 要比较两个**形状不同**的一维积分 | 都升到同一个正方形上，==逐点比较被积函数== | 柯西–施瓦茨 |
      | 式子里出现 $f(x)f(y)$ 型的**配对结构** | 升维后用 ==$x\leftrightarrow y$ 对称化== | 拉格朗日恒等式、切比雪夫积分不等式 |

      三条共用一句话：==一维不够用的时候，多一个变量就多一份自由度==——
      多出的自由度可以是新的换元方式（极坐标），也可以是新的对称性（$x\leftrightarrow y$）。

      **反向的提醒**：升维只在"升上去之后能重新分离或能换元"时才划算。
      如果升维后既拆不开也换不了元，那只是把一个难题变成了更难的题，趁早收手。
    ` },

    { t: 'warn', id: 'checklist', title: '踩分点清单', c: String.raw`
      | 错误 | 出现在哪 | 自查 |
      |---|---|---|
      | 只看被积函数就把二重积分拆成乘积 | 判据第一节 | ==积分限里有变量吗？== 有就不能拆 |
      | 合并 $I\cdot I$ 时不换哑变量 | 高斯积分第 1 步 | 写成 $\iint$ 之前，两个变量名必须不同 |
      | 极坐标漏掉雅可比 $r$ | 高斯积分第 3 步 | ==换完坐标先写 $\d x\d y=r\d r\d\theta$，再写被积函数== |
      | $\int_0^{2\pi}\dtheta$ 写成 $1$ | 高斯积分第 4 步 | 常数函数的积分 = 常数 × 区间长度 |
      | 从 $I^2=\pi$ 直接写 $I=\sqrt\pi$ | 高斯积分第 5 步 | ==必须说明被积函数恒正故 $I>0$== |
      | 柯西证明里忘了那个 $\frac12$ | 对称化那一步 | 展开验算：$\frac12(AB-2C^2+AB)=AB-C^2$ |
      | 取等写成"处处相等" | 积分版取等条件 | 积分版只能得到==几乎处处==，写 $f=kg$ 即可 |
    ` },

  ],
});
