/* ==========================================================================
   跨章节手法主线 ⑤ / 换元与坐标变换
   —— 换元不是技巧，是换参考系。合法性只有一条：可逆。
   ========================================================================== */

KM.page({
  path: 'threads/lines/substitution',
  title: '换元与坐标变换：换一个参考系',
  subtitle: '所有换元做的是同一件事 —— 把问题搬到一个新坐标系里，让它自己的**对称性 / 解耦性 / 比例结构**显式地露出来。合法性只有一条：==可逆，自由度不变==',
  tags: ['专题', '主线', '跨章节'],
  updated: '2026-08-31',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'thesis', c: '一、这条线在说什么' },

    { t: 'insight', id: 'my-thesis', title: '我的想法：所有换元其实是同一件事', c: String.raw`
      我发现其实可以有更宏观的替换逻辑。

      比如涉及 $a,b$ 及其中点，我们可以把==中点设成一个变量，长度的一半设成另一个变量==；
      比如比例参数 $t$ 是一个变量，我们==把它表达的那个整体设成一个变量==；
      还有积分和微分方程里那么多换元操作，有一种也是==重新去配平系数==。

      这里实际上好像做的都是同一件事情 ——
      ==换元的重要意义在于转换了问题的视角，只要保证自由度没有改变==。

      ---

      **这个判断是对的，而且它有一个严格的名字。**
      "视角变了、自由度没变"在数学里就叫==同构==（isomorphism）／==双射==（bijection）。
      往下再走一步，它的标准名称是：

      $$\boxed{\ \text{换元}\;=\;\text{改变坐标基底（change of basis）}\ }$$

      只要新旧变量之间存在唯一对应的可逆映射，就可以自由地挑一个最有利的观察位置。
      ==觉得题难，常常只是因为站错了坐标系。==
    ` },

    { t: 'key', id: 'one-line', title: '一句话定义', c: String.raw`
      一次换元是一个映射 $\Phi:\ \text{新变量}\longrightarrow\text{旧变量}$，要求它==可逆==。

      | 说法 | 同一件事的不同表述 |
      |---|---|
      | 直觉 | 换一个参考系去看同一个问题 |
      | 代数 | 双射／同构，信息一点不丢 |
      | 几何 | 换基底，坐标换了、向量没换 |
      | 用户的说法 | ==自由度没有改变== |
      | 可操作的判据 | ==能不能原封不动地代回去== |

      "能代回去"是最实用的自检：齐次方程解完必须把 $u=\dfrac yx$ 代回，
      三角代换算完必须把 $t$ 换回 $x$。==代不回去，说明这次换元丢了信息。==
    ` },

    { t: 'key', id: 'legit', title: '换元的合法性：三条，缺一不可', c: String.raw`
      1. **可逆**（至少在所讨论的范围内单射）。
         $u=x^{2}$ 在 $\R$ 上不可逆，必须拆成 $x\ge0$ 与 $x<0$ 两支；
         $x=a\sin t$ 必须限定 $t\in\left[-\frac\pi2,\frac\pi2\right]$ 才是一一对应。
      2. **足够光滑**：一元要 $\varphi'(t)$ 连续，多元要 ==雅可比行列式 $J\ne0$==。
      3. **范围跟着换**：定积分换上下限、重积分换积分区域、
         级数换收敛域、反常积分换奇点位置、概率换随机变量的取值范围。

      ==第 3 条是失分重灾区。== 前两条错了通常算不下去，第 3 条错了会算出一个
      看起来很整齐的错误答案。
    ` },

    { t: 'compare',
      id: 'battle-map',
      title: '一张表看清：为什么换 → 换什么 → 在哪一章遇到',
      cols: ['换元的动机', '典型操作', '战场'],
      rows: [
        ['**① 为了对称**<br>把参考系搬到问题自己的中心',
         '$a=m-r,\\;b=m+r$；$x\\to a+b-x$；平移到交点',
         '定积分对称性 · 重积分轮换对称 · 可化齐次方程 · 二次曲面配方 · 概率标准化'],
        ['**② 为了解耦**<br>把纠缠在一起的变量分开',
         '$u=\\dfrac yx$；极坐标；正交变换 $x=Qy$',
         '齐次方程 · 二重／三重积分 · 二次型标准化 · 相似对角化 · 二维正态'],
        ['**③ 为了剥离尺度**<br>只留比例，丢掉绝对长度',
         '$x=tx_1+(1-t)x_2$；归一到 $[0,1]$；$\\dfrac kn\\to t$',
         '凸函数割线 · Hermite–Hadamard · 黎曼和 · 标准化 $Z$ · 无穷小比较'],
        ['**④ 为了配平**<br>把非标准形状扳回标准形状',
         '$z=y^{1-n}$；$x=\\mathrm{e}^{t}$；$p=y\'$；乘积分因子',
         '伯努利方程 · 欧拉方程 · 可降阶方程 · 对数求导 · 倒代换 · 万能代换'],
      ] },

    { t: 'md', c: String.raw`
      这四个动机不是并列的四个知识点，而是==同一个动作的四种用途==。
      下面每一节的结构都一样：先说这个动机长什么样，再把散落在各章的题型挂上去。

      读法建议：先扫[总表](#/threads/lines/substitution?at=battle-map)，
      再直接跳到你正卡住的那一节。最后一节是
      [一张检索表](#/threads/lines/substitution?at=lookup)，考场上用的就是它。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'symmetry', c: '二、动机①：为了对称 —— 把参考系搬到问题自己的中心' },

    { t: 'key', id: 'midpoint-halflength', title: '中点 + 半长：区间的自然坐标', c: String.raw`
      区间 $[a,b]$ 的端点 $(a,b)$ 是一组==外来的==坐标：它是从原点 $0$ 量出来的，
      而问题本身根本不关心原点在哪。换成

      $$m=\frac{a+b}{2},\qquad r=\frac{b-a}{2},\qquad\text{即}\quad a=m-r,\;\; b=m+r,$$

      参考系就平移到了==区间自己的中心==，问题变成关于中心对称的 $[-r,r]$。

      **立刻兑现的好处**：在对称区间上
      ==奇函数积分为 $0$，偶函数积分减半==。
      很多看起来要硬算的定积分，平移到中心之后一半的项直接消失。

      这一步和线代里"把二次曲面的中心平移到原点、消掉一次项"是==同一个动作==，
      也和微分方程里的[平移法](#/threads/lines/substitution?at=translate-to-center)是同一个动作。
    ` },

    { t: 'method', id: 'symmetric-sub', title: '定积分的对称换元三件套', c: String.raw`
      三个换元，全部只做一件事：==把积分区间翻过来，让它和自己重合==。

      1. **区间翻转** $x=a+b-t$：
         $$\int_a^b f(x)\dx=\int_a^b f(a+b-x)\dx$$
         两式相加除以 $2$，被积函数变成 $\dfrac{f(x)+f(a+b-x)}{2}$ ——
         这是一个==自动对称化==的操作。
      2. **半区间翻转** $x=\dfrac\pi2-t$：
         $$\int_0^{\pi/2}f(\sin x)\dx=\int_0^{\pi/2}f(\cos x)\dx$$
         正弦和余弦在 $\left[0,\frac\pi2\right]$ 上==完全平权==，这是[华里士公式](#/calculus/definite/properties?at=wallis)成立的根。
      3. **原点对称** $x=-t$：把 $\int_{-a}^{a}$ 拆成奇偶两半。

      配套的固定题型见[定积分的对称性](#/calculus/definite/properties?at=symmetry)。

      ==识别信号==：区间端点之和是个"好数"（$a+b$、$\pi$、$\frac\pi2$、$0$），
      被积函数里出现 $\sin,\cos$ 或者 $f(x)+f(a+b-x)$ 能化简 —— 就该想翻转。
    ` },

    { t: 'example',
      id: 'ex-x-sinx',
      title: '把 $x$ 从被积函数里"洗掉"',
      level: 3,
      problem: String.raw`
        证明 $\displaystyle\int_0^\pi x\,f(\sin x)\dx=\frac\pi2\int_0^\pi f(\sin x)\dx$，
        并求 $\displaystyle\int_0^\pi\frac{x\sin x}{1+\cos^{2}x}\dx$。
      `,
      idea: String.raw`
        **为什么想到换元**：碍事的是那个孤零零的 $x$。$f(\sin x)$ 本身是关于
        $x=\dfrac\pi2$ 对称的（因为 $\sin(\pi-x)=\sin x$），==只有前面那个 $x$ 破坏了对称==。

        既然函数的对称中心是 $\dfrac\pi2$，就把参考系搬过去：令 $x=\pi-t$。
        此时 $f(\sin x)$ 纹丝不动，而 $x$ 变成 $\pi-t$ ——
        ==破坏对称的那一项被换成了"它自己 + 一个常数"==，加起来就能把它解出来。

        这就是[中点坐标](#/threads/lines/substitution?at=midpoint-halflength)最典型的兑现方式：
        ==对称的部分保持不动，不对称的部分被换成常数减自己==。
      `,
      solution: String.raw`
        记 $I=\displaystyle\int_0^\pi x\,f(\sin x)\dx$。令 $x=\pi-t$，$\dx=-\dt$，
        $x:0\to\pi$ 对应 $t:\pi\to0$：

        $$I=\int_\pi^0(\pi-t)f(\sin(\pi-t))(-\dt)=\int_0^\pi(\pi-t)f(\sin t)\dt.$$

        与原式相加：
        $$2I=\int_0^\pi\pi f(\sin t)\dt\ \Longrightarrow\ I=\frac\pi2\int_0^\pi f(\sin x)\dx.$$

        取 $f(u)=\dfrac{u}{1+(1-u^{2})}$ 不方便，直接用结论：
        $$\int_0^\pi\frac{x\sin x}{1+\cos^{2}x}\dx=\frac\pi2\int_0^\pi\frac{\sin x}{1+\cos^{2}x}\dx.$$
        令 $u=\cos x$，$\du=-\sin x\dx$，$u:1\to-1$：
        $$=\frac\pi2\int_{-1}^{1}\frac{\du}{1+u^{2}}=\frac\pi2\cdot\left[\arctan u\right]_{-1}^{1}
        =\frac\pi2\cdot\frac\pi2=\frac{\pi^{2}}{4}.$$
      `,
      comment: String.raw`
        **这道题连用了两次换元，动机完全不同**：

        - 第一次 $x=\pi-t$ 是==为了对称==（动机①），目的是消掉那个 $x$；
        - 第二次 $u=\cos x$ 是==为了配平==（动机④），目的是把 $\sin x\dx$ 收进 $\du$。

        能看出"这两步不是同一类操作"，比会做这道题更重要。

        **同族题**：$\displaystyle\int_0^\pi\frac{x}{1+\sin x}\dx$、
        $\displaystyle\int_0^{\pi}x\sin^{3}x\dx$、
        以及 $\displaystyle\int_0^1\frac{\ln(1+x)}{1+x^{2}}\dx$（换元 $x=\tan\theta$ 后再翻转区间）。
      `,
    },

    { t: 'key', id: 'translate-to-center', title: '★ 平移消常数：三个学科里的同一个动作', c: String.raw`
      "式子里有个碍事的常数项，把坐标原点挪到某个特殊点上，它就没了" ——
      这个套路在三个地方一字不差地重演：

      | 场景 | 碍事的东西 | 原点挪到哪 | 挪完变成 |
      |---|---|---|---|
      | **可化为齐次的方程**<br>$\deriv yx=\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$ | 常数 $c_1,c_2$ | 两条直线的==交点== $(h,k)$ | 标准齐次方程 |
      | **二次曲面／二次型定型** | 一次项 | 曲面的==中心== | 只剩平方项，能读类型 |
      | **概率的标准化** | 均值 $\mu$ | 分布的==中心== $\mu$ | $\E=0$，再除 $\sigma$ 得 $\Var=1$ |

      三者的共同点：==那个"特殊点"是问题自己带的，不是人为选的==。
      交点、中心、均值都是由方程本身唯一决定的。

      **可化齐次的完整操作**（$a_1b_2-a_2b_1\ne0$ 时）：
      解 $\begin{cases}a_1x+b_1y+c_1=0\\ a_2x+b_2y+c_2=0\end{cases}$ 得交点 $(h,k)$，
      令 $x=X+h,\;y=Y+k$。因为是平移，$\dx=\d X,\;\dy=\d Y$，
      ==微分算子完全不变==：$\deriv yx=\deriv YX$。常数项自动抵消。

      配套题型见[一阶方程的识别与解法](#/calculus/ode/first-order?at=homogeneous)。
    ` },

    { t: 'warn', id: 'parallel-case', title: '平移法失效时：整体换元', c: String.raw`
      如果两条直线==平行==（$a_1b_2-a_2b_1=0$），方程组无唯一解，平移法直接死掉。例如

      $$\deriv yx=\frac{x+y+1}{2x+2y-3}.$$

      此时 $2x+2y=2(x+y)$，==重复出现的那个线性组合 $x+y$ 才是真正的自由度==。
      直接令 $u=x+y$，两边对 $x$ 求导得 $\deriv ux=1+\deriv yx$，即 $\deriv yx=\deriv ux-1$：

      $$\deriv ux-1=\frac{u+1}{2u-3},$$

      $x$ 被完全剥离，剩下一个只含 $u$ 的可分离变量方程。

      ==两种做法的区别==：平移法是把视角从"任意原点"切到"系统固有的对称中心"；
      整体换元是==直接把那个反复出现的结构打包成一个一维视角==。
      平行意味着这个结构只有一维，所以打包才有效。
    ` },

    { t: 'md', id: 'symmetry-more', c: String.raw`
      **对称这条支线还挂着几个不太像换元的东西**：

      - **重积分的轮换对称性**：$\displaystyle\iint_D f(x,y)\dxy=\iint_D f(y,x)\dxy$
        （当 $D$ 关于 $y=x$ 对称）。它的证明就是做换元 $(x,y)\to(y,x)$，
        ==这是一个线性变换，$\abs{J}=1$，所以不产生任何补偿因子==。
        细节见[重积分的对称性](#/calculus/multi-integral/symmetry?at=rotation)。
      - **三重积分里"三个变量地位相同"** 的题（如 $\iiint(x^{2}+y^{2}+z^{2})$ 在球内），
        用轮换对称把三项合并成 $3\iiint x^{2}$，见
        [三重积分](#/calculus/multi-integral/triple?at=ex-x2-ball)。
      - **拉格朗日方程组的轮换对称**：解方程组时先假设对称解，
        见[条件极值的解方程技巧](#/calculus/multi-derivative/extremum?at=symmetry-preserve)。

      共同点：==先识别出"问题在某个变换下不变"，再用这个不变性省掉一半计算==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'decouple', c: '三、动机②：为了解耦 —— 把纠缠的变量分开' },

    { t: 'key', id: 'homogeneous', title: '齐次方程：把绝对坐标换成比例', c: String.raw`
      考察 $\displaystyle\deriv yx=\frac{x^{2}+y^{2}}{xy}$。
      右边的 $x,y$ 深度纠缠，==无论怎么加减乘除都写不成 $f(x)g(y)$==，变量分离法失效。

      但注意右端 $F(x,y)=\dfrac{x^{2}+y^{2}}{xy}$ 有一个性质：
      $$F(tx,ty)=\frac{t^{2}(x^{2}+y^{2})}{t^{2}xy}=F(x,y).$$
      这叫==零次齐次==。它的几何含义是：
      ==变化率只取决于 $x,y$ 的相对比例，与它们的绝对大小无关。==

      既然如此，就以比例为基准重新定义自由度：令
      $$u=\frac yx\quad(\text{即}\ y=ux),\qquad \deriv yx=u+x\deriv ux.$$

      自由度的**数量**没变（$(x,y)\to(x,u)$ 仍是二维），但描述方式变了：
      $x$ 还是横向的绝对尺度，==$u$ 变成了原点到该点的连线斜率==。
    ` },

    { t: 'steps', id: 'homo-steps', title: '齐次方程的四步：换 → 解耦 → 积 → 还原', items: [
      { title: '识别缩放不变性',
        c: String.raw`
          检验 $F(tx,ty)=F(x,y)$，或者更快的判据：==把右端写成只含 $\dfrac yx$ 的一元函数 $g\!\left(\dfrac yx\right)$==。
          能写出来就是齐次的。$\dfrac{x^{2}+y^{2}}{xy}=\dfrac xy+\dfrac yx=\dfrac1u+u$。` },
      { title: '换元并替换微分算子',
        c: String.raw`
          令 $y=ux$，则 $\deriv yx=u+x\deriv ux$。
          ==这一步最容易漏==：换了变量就必须同时把导数也换掉，否则新旧坐标系混用。` },
      { title: '见证解耦',
        c: String.raw`
          代入得 $u+x\deriv ux=g(u)$，移项：
          $$x\deriv ux=g(u)-u\ \Longrightarrow\ \frac{\du}{g(u)-u}=\frac{\dx}{x}.$$
          ==左边只剩 $u$，右边只剩 $x$==。齐次性保证了 $u$ 必然被消掉一次，这不是巧合。` },
      { title: '积分后还原视角',
        c: String.raw`
          两边积分解出 $u$ 与 $x$ 的关系，再把 $u=\dfrac yx$ ==代回==。
          答案停在 $(x,u)$ 空间是不完整的 —— 物理上存在的是 $(x,y)$。` },
    ] },

    { t: 'example',
      id: 'ex-homo',
      title: '齐次方程的完整样板',
      level: 2,
      problem: String.raw`求 $\displaystyle\deriv yx=\frac{x^{2}+y^{2}}{xy}$ 的通解。`,
      idea: String.raw`
        分子分母次数相同（都是二次）$\Rightarrow$ 零次齐次 $\Rightarrow$ 令 $u=\dfrac yx$。
        ==看见"分子分母同次"就该条件反射==，不必每次都验证 $F(tx,ty)=F(x,y)$。
      `,
      solution: String.raw`
        令 $y=ux$，$\deriv yx=u+x\deriv ux$。右端
        $$\frac{x^{2}+y^{2}}{xy}=\frac{x^{2}(1+u^{2})}{x^{2}u}=\frac1u+u.$$
        代入：$u+x\deriv ux=\dfrac1u+u$，两边的 $u$ 抵消：
        $$x\deriv ux=\frac1u\ \Longrightarrow\ u\du=\frac{\dx}{x}.$$
        积分：$\dfrac12u^{2}=\ln\abs{x}+C$。代回 $u=\dfrac yx$：
        $$\boxed{\ y^{2}=2x^{2}\left(\ln\abs{x}+C\right)\ }$$
      `,
      comment: String.raw`
        **为什么 $u$ 一定会被抵消**：设方程为 $\deriv yx=g\!\left(\dfrac yx\right)$，代入后必然是
        $u+x\deriv ux=g(u)$，移项就得到 $\dfrac{\du}{g(u)-u}=\dfrac{\dx}x$。
        ==只要原系统存在关于比例的缩放对称性，"提取比例系数"作为新自由度就必定能解耦。==
        这是一个定理，不是运气。

        **别漏解**：上面除以了 $g(u)-u$。如果存在 $u_0$ 使 $g(u_0)=u_0$，
        那么 $y=u_0x$ 是一条==被除掉的直线解==，要单独补回来。本题 $g(u)-u=\frac1u\ne0$，无遗漏。
      `,
    },

    { t: 'key', id: 'diagonalize-is-substitution', title: '★ 高数↔线代的焊接点：相似对角化就是换元', c: String.raw`
      齐次方程用 $u=\dfrac yx$ 解耦，和线代用 $P\inv AP=\Lambda$ 解耦，
      ==不是"像"，是同一件事的两个实例==。

      | | 齐次微分方程 | 相似对角化 |
      |---|---|---|
      | 纠缠的表现 | 右端写不成 $f(x)g(y)$ | 矩阵有非零的非对角元 |
      | 换什么 | $u=\dfrac yx$ | 换基：$x=Py$ |
      | 换完 | $\du$ 与 $\dx$ 分家 | $\Lambda$ 是对角阵，==各分量互不影响== |
      | 可逆性保证 | $x\ne0$ | $P$ 可逆（特征向量线性无关） |
      | 还原 | 代回 $u=\dfrac yx$ | 左乘 $P$ 回到原坐标 |

      线代那边的官方说法是：==相似的两个矩阵，是同一个线性变换在两组不同基下的矩阵==
      —— 这句话和"换元不改变问题、只改变描述方式"是同一句话。
      见[相似的本质](#/linear-algebra/eigen/similarity?at=same-transform)。

      同理，[二次型的正交变换标准化](#/linear-algebra/quadratic/standard?at=orthogonal-method)
      就是"为了消掉交叉项而换一组基"，它是[主线④](#/threads/lines/quadratic?at=core)的主题。
    ` },

    { t: 'compare',
      id: 'three-equivalences',
      title: '★ 三种矩阵变换 = 三种换元，各自"保住"不同的东西',
      cols: ['关系', '形式', '换元的含义', '保住的不变量'],
      rows: [
        ['**等价**', '$PAQ$（$P,Q$ 可逆）',
         '进出两端各换一次基，最松',
         '==秩=='],
        ['**相似**', '$P\\inv AP$',
         '同一个==线性映射==换基<br>（进出必须用同一组基）',
         '特征值 · 特征多项式 · $\\det$ · $\\tr$ · 秩'],
        ['**合同**', '$C\\T AC$',
         '同一个==二次型==换基<br>（要保住"长度平方"的形状）',
         '正负惯性指数 · 秩'],
        ['**正交**', '$Q\\T AQ=Q\\inv AQ$',
         '既是相似又是合同',
         '以上==全部==，外加几何形状不变'],
      ] },

    { t: 'md', c: String.raw`
      这张表是"自由度守恒"这句话的严格版本：==可逆保证了信息不丢，
      但不同的可逆变换保住的是不同的东西==。

      正交变换之所以在二次型和重积分里都是主角，正因为它是这四种里==最强的==：
      特征值和几何形状同时保住，所以既能读惯性指数，
      又能让[重积分换元的 $\abs J=1$](#/threads/lines/quadratic?at=jacobian-one)、区域形状不变形。

      对比 [合同与相似的关系](#/linear-algebra/quadratic/congruence?at=three-relations)
      和 [秩在初等变换下不变](#/linear-algebra/matrix/rank?at=rank-invariance)。
    ` },

    { t: 'md', id: 'decouple-more', c: String.raw`
      **解耦这条支线上的其它战场**：

      | 题型 | 纠缠在哪 | 换什么 | 换完 |
      |---|---|---|---|
      | 二重积分区域是圆／扇形 | 圆边界是 $x^{2}+y^{2}=R^{2}$，非线性 | [极坐标](#/calculus/multi-integral/double?at=polar) $x=r\cos\theta$ | 边界变成 $r=R$，==矩形边界== |
      | 三重积分区域是球 | 同上 | [球坐标](#/calculus/multi-integral/triple?at=spherical-basic) | 三重积分变成三个独立的一重 |
      | 二维正态求概率 | $X,Y$ 相关（$\rho\ne0$） | 线性变换成不相关 | 不相关 $\Rightarrow$ ==正态下等价于独立==，见[二维正态](#/probability/multi-random-var/normal-2d?at=rho-zero-indep) |
      | 多元函数极值判别 | 二阶偏导交叉项 | Hesse 矩阵对角化 | 化归为[二次型正定性](#/threads/lines/quadratic?at=hessian-is-quadratic) |
      | 条件极值 | 变量被约束绑死 | 拉格朗日乘数 $\lambda$ | 有约束 $\to$ 无约束，见[条件极值](#/calculus/multi-derivative/extremum?at=lagrange) |

      ==注意最后一行不是严格意义的换元==（自由度确实变了），
      理由见[什么不是换元](#/threads/lines/substitution?at=not-substitution)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'scale', c: '四、动机③：为了剥离尺度 —— 只留比例' },

    { t: 'insight', id: 't-confusing', title: '我的困惑：为什么带 $t$ 的式子看着就昏', c: String.raw`
      凸函数那个含 $t$ 的式子

      $$f(tx_1+(1-t)x_2)\le tf(x_1)+(1-t)f(x_2)$$

      我看起来那么昏，==就是不知道它想表达什么==；
      但是如果换成三点式，我就很明显地发现==这是表示三个斜率==：

      $$\frac{f(x)-f(x_1)}{x-x_1}\le\frac{f(x_2)-f(x_1)}{x_2-x_1}\le\frac{f(x_2)-f(x)}{x_2-x}.$$

      这两个东西之间怎么转换，怎么培养对于这种转换的敏感性？

      ---

      **两个式子完全等价，差别只在坐标系**：

      - 三点斜率式用的是==绝对坐标差==（$\Delta y/\Delta x$），符合日常几何直觉；
      - 含 $t$ 的式子==把绝对坐标藏起来了，只留相对比例==（凸组合）。

      昏的原因不是式子难，是==它换了一个你不熟悉的坐标系==。
      认出"这是同一个东西的另一套坐标"，昏就消失了。
    ` },

    { t: 'key', id: 'convex-combination', title: '凸组合参数：把线段压缩到 $[0,1]$', c: String.raw`
      对 $x_1<x<x_2$，令 $x=tx_1+(1-t)x_2$，解出

      $$t=\frac{x_2-x}{x_2-x_1},\qquad 1-t=\frac{x-x_1}{x_2-x_1}.$$

      **视角发生了什么**：剥离了具体的物理长度和位置，
      ==把任意大小、任意位置的线段全部压缩到标准的 $[0,1]$==。
      这是一种**无量纲化**（nondimensionalization）：变量被关进固定范围后，
      变量之间的耦合被打破，放缩和求极限变得极干净、不受常数项干扰。

      **反过来读**（这是理解的关键）：

      $$\boxed{\ A=tB+(1-t)C,\ t\in[0,1]\ \Longleftrightarrow\ A\ \text{是}\ B,C\ \text{的加权平均}\ }$$

      于是凸函数定义式的白话翻译是：
      ==自变量先平均再映射 $\;\le\;$ 先映射再平均==。
      这句话可以原封不动地推广到多元函数、以及概率论里的
      $\E f(X)\ge f(\E X)$（Jensen 不等式），见[凹凸性与不等式](#/calculus/derivative-app/convexity?at=jensen)。
    ` },

    { t: 'method', id: 'three-intuitions', title: '培养对 $t$ 的敏感性：三个直觉模型', c: String.raw`
      **① 加权平均直觉（最重要）**
      以后在任何推导中，只要看到 $A=tB+(1-t)C$ 且 $t\in[0,1]$，
      立刻翻译成"$A$ 是 $B$ 和 $C$ 的加权平均"。$t$ 与 $1-t$ 是分给两端的权重，和恒为 $1$。

      **② 杠杆／质心直觉**
      注意 $t$ 是乘在 $x_1$ 上的系数，但它的分子是 $(x_2-x)$ —— ==对侧的长度==。
      这在物理上就是杠杆原理（质心公式）：==离得越远的一端，权重越小==。
      看到 $t$ 表达式，脑海里应该立刻浮现"一条线段被点 $x$ 分割，
      系数与对侧线段长度成正比"的图像。

      **③ 恒等拆分直觉**
      把总长度拆成两段 $(x_2-x_1)=(x_2-x)+(x-x_1)$，
      是从 $t$ 式推回斜率式的关键一步。
      ==看到两边都有混合系数时，就去找那个"公共的几何量"，
      拆开它并与对应项结合，凑出 $\Delta y$ 和 $\Delta x$== —— 一旦凑出差分，
      就立刻能和导数、斜率建立联系。
    ` },

    { t: 'example',
      id: 'ex-t-to-slope',
      title: '$t$ 式与三点斜率式的互推',
      level: 2,
      problem: String.raw`
        设 $x_1<x<x_2$。证明凸函数定义式
        $f(tx_1+(1-t)x_2)\le tf(x_1)+(1-t)f(x_2)$
        与三点斜率递增式
        $\dfrac{f(x)-f(x_1)}{x-x_1}\le\dfrac{f(x_2)-f(x)}{x_2-x}$ 等价。
      `,
      idea: String.raw`
        核心动作只有一个：==令 $x=tx_1+(1-t)x_2$，把 $t$ 和 $1-t$ 解成几何量==。
        解出来之后 $t$ 就不再是抽象参数，而是"对侧线段占总长的比例"。

        剩下的全是代数：通分、乘掉总长度、用恒等拆分制造差值。
        ==难的从来不是这几步代数，而是敢不敢把 $t$ 解出来。==
      `,
      solution: String.raw`
        **第一步：解出比例参数。** 由 $x=tx_1+(1-t)x_2$，
        $$x_2-x=t(x_2-x_1),\qquad x-x_1=(1-t)(x_2-x_1),$$
        故 $t=\dfrac{x_2-x}{x_2-x_1}$，$1-t=\dfrac{x-x_1}{x_2-x_1}$。

        **第二步：代入并去分母。**
        $$f(x)\le\frac{x_2-x}{x_2-x_1}f(x_1)+\frac{x-x_1}{x_2-x_1}f(x_2),$$
        两边乘 $(x_2-x_1)>0$：
        $$(x_2-x_1)f(x)\le(x_2-x)f(x_1)+(x-x_1)f(x_2).$$

        **第三步：恒等拆分。** 把左边的 $(x_2-x_1)$ 拆成 $(x_2-x)+(x-x_1)$：
        $$\left[(x_2-x)+(x-x_1)\right]f(x)\le(x_2-x)f(x_1)+(x-x_1)f(x_2).$$
        把含 $(x_2-x)$ 的项移到左边、含 $(x-x_1)$ 的项移到右边并提公因式：
        $$(x_2-x)\left[f(x)-f(x_1)\right]\le(x-x_1)\left[f(x_2)-f(x)\right].$$

        **第四步：同除以 $(x_2-x)(x-x_1)>0$：**
        $$\frac{f(x)-f(x_1)}{x-x_1}\le\frac{f(x_2)-f(x)}{x_2-x}.$$

        每一步都可逆，故两式等价。$\blacksquare$
      `,
      comment: String.raw`
        **这道题的价值在于示范"两套坐标之间怎么翻译"**，
        而这类翻译在考场上的直接用途是：

        - 要用==割线放缩==证积分不等式时，用 $t$ 式（便于对 $t$ 从 $0$ 到 $1$ 积分）；
        - 要联系==单调性、中值定理==时，用斜率式（差商就是 $f'(\xi)$）。

        两种证法在 [Hermite–Hadamard 不等式](#/threads/lines/substitution?at=hadamard) 里正好各用一次。

        **进一步**：三点斜率式再取极限就是 $f'$ 单调递增，
        也就是 $f''\ge0$ —— ==凸性的三个定义（割线、斜率、二阶导）是同一件事的三套坐标==。
      `,
    },

    { t: 'key', id: 'hadamard', title: '归一到 $[0,1]$：Hermite–Hadamard 不等式', c: String.raw`
      $$f\!\left(\frac{a+b}{2}\right)\;\le\;\frac{1}{b-a}\int_a^b f(x)\dx\;\le\;\frac{f(a)+f(b)}{2}$$

      **几何意义**：中间是曲边梯形的==平均高度==；
      右边是割线下方梯形的平均高度（==割线在上==）；
      左边是以中点函数值为高的矩形（==切线在下==）。

      **右半边**用[归一化换元](#/threads/lines/substitution?at=convex-combination)最快：
      令 $x=ta+(1-t)b$，则 $\dx=-(b-a)\dt$，$x:a\to b$ 对应 $t:1\to0$，
      $$\int_a^b f(x)\dx=(b-a)\int_0^1 f(ta+(1-t)b)\dt
      \le(b-a)\int_0^1\left[tf(a)+(1-t)f(b)\right]\dt=(b-a)\frac{f(a)+f(b)}{2}.$$
      ==把区间压到 $[0,1]$ 之后，凸性的定义式可以直接逐点用在被积函数上。==

      **左半边**用[对称换元](#/threads/lines/substitution?at=symmetric-sub)最快：
      由 $\int_a^b f(x)\dx=\int_a^b f(a+b-x)\dx$ 得
      $$\int_a^b f(x)\dx=\frac12\int_a^b\left[f(x)+f(a+b-x)\right]\dx
      \ge\frac12\int_a^b 2f\!\left(\frac{a+b}{2}\right)\dx=(b-a)f\!\left(\frac{a+b}{2}\right),$$
      中间一步取的正是凸性定义里的 $t=\dfrac12$。
      ==这个证法不需要 $f$ 可导==（切线法需要）。

      **一道题里同时用到了动机①和动机③** —— 这是这条主线最好的样例。
    ` },

    { t: 'key', id: 'riemann', title: '黎曼和：把离散下标换成连续变量', c: String.raw`
      $$\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}f\!\left(\frac kn\right)=\int_0^1 f(t)\dt$$

      这也是一次==剥离尺度==的换元：下标 $k$ 是绝对的（跑到 $n$），
      而 $t=\dfrac kn$ 是相对的（永远在 $[0,1]$ 里）。
      ==把 $k$ 换成 $\dfrac kn$，离散求和就变成了连续积分。==

      **识别的三个特征**：
      1. 提得出公因子 $\dfrac1n$（这是 $\dt$）；
      2. 剩下的每一项只依赖 $\dfrac kn$（这是 $t$）；
      3. $k$ 从 $1$（或 $0$）跑到 $n$（这是积分限）。

      ==第 2 条是判别的关键==：若出现的是 $\dfrac{k}{n^{2}}$ 而不是 $\dfrac kn$，
      就凑不出定积分，只能改用夹逼。
      两条路的正反对比见[夹逼 vs 定积分](#/calculus/limit/limit-existence?at=ex-squeeze)。
    ` },

    { t: 'md', c: String.raw`
      **剥离尺度这条支线还挂着**：

      - **标准化** $Z=\dfrac{X-\mu}{\sigma}$：先平移（动机①）再缩放（动机③），两步换元；
        $\chi^{2},t,F$ 三个统计量的构造也是"用换元造一个不含未知参数的量"，
        见[三大抽样分布](#/probability/statistics/distributions?at=three)。
      - **幂级数展开中心的平移** $t=x-x_0$：把在 $x_0$ 处展开化归为在 $0$ 处展开，
        见[展开中心的转移](#/calculus/series/expansion?at=shift-center)。
      - **等价无穷小替换**：本质是"在局部换一个尺度看"，
        只保留主部、丢掉高阶部分。
      - **微元法**：把整体换成"典型小段 $\d Q$"再积回去，
        见[微元法](#/calculus/definite-app/micro-element?at=core)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'normalize', c: '五、动机④：为了配平 —— 把非标准形状扳回标准' },

    { t: 'md', c: String.raw`
      前三个动机是"问题本身有某种结构，我去把它显式化"。
      第四个动机反过来：==问题不长成我会解的样子，我强行把它掰成那个样子==。

      判断标准很直接：**我手上只有几套标准解法**（可分离变量、一阶线性、常系数、基本积分表）。
      看到不在表上的形状，就问一句 ——
      ==缺什么才能变成标准形？把这个"缺"补上的那个变量，就是要换的元。==
    ` },

    { t: 'compare',
      id: 'normalize-table',
      title: '配平型换元总表：换什么、为什么是它',
      cols: ['遇到', '换', '为什么正好是这个换法', '换成'],
      rows: [
        ['$y\'+Py=Qy^{n}$<br>（伯努利）',
         '$z=y^{1-n}$',
         '求导降幂 $1$：$z\'$ 恰好吃掉 $y^{-n}y\'$',
         '一阶线性'],
        ['$x^{2}y\'\'+pxy\'+qy=f$<br>（欧拉）',
         '$x=\\mathrm{e}^{t}$',
         '$x^{k}\\dfrac{\\mathrm{d}^{k}}{\\mathrm{d}x^{k}}$ 换成 $t$ 的常系数算子',
         '常系数线性'],
        ['$y\'\'=f(x,y\')$（缺 $y$）',
         '$p=y\'$',
         '方程里根本没出现 $y$，它不是真正的自由度',
         '一阶方程'],
        ['$y\'\'=f(y,y\')$（缺 $x$）',
         '$p=y\'$，且 $y\'\'=p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y}$',
         '没出现 $x$ $\\Rightarrow$ ==改用 $y$ 当自变量==',
         '一阶方程'],
        ['$y\'+Py=Q$',
         '$z=\\mathrm{e}^{\\int P\\mathrm{d}x}y$',
         '乘上因子后左边恰好是 $z\'$（乘法版配平）',
         '直接积分'],
        ['$y=u(x)^{v(x)}$',
         '两边取 $\\ln$',
         '$\\ln$ 把幂/乘除换成乘/加减',
         '[对数求导](#/calculus/derivative/techniques?at=log-derivative)'],
        ['$\\sqrt{a^{2}-x^{2}}$ 等根式',
         '$x=a\\sin t$',
         '用 $\\sin^{2}+\\cos^{2}=1$ 把根号吃掉',
         '[三角代换](#/calculus/indefinite/substitution?at=trig-sub)'],
        ['分母次数高、$x\\to\\infty$',
         '$x=\\dfrac1t$',
         '把无穷远处换到原点附近看',
         '常规积分／极限'],
        ['$\\sin x,\\cos x$ 的有理式',
         '$t=\\tan\\dfrac x2$',
         '万能公式把三角有理式变成 $t$ 的有理式',
         '[有理函数积分](#/threads/lines/rational?at=core)'],
      ] },

    { t: 'steps', id: 'bernoulli-steps', title: '伯努利方程：指数配平的四步', items: [
      { title: '认清冲突来源',
        c: String.raw`
          标准一阶线性是 $y'+P(x)y=Q(x)$。伯努利方程 $y'+P(x)y=Q(x)y^{n}$
          多了一个因子 $y^{n}$，==它破坏了 $y$ 的线性叠加性==，积分因子法直接失效。
          方程左右两端在 $y$ 的"幂次维度"上失衡了。` },
      { title: '强制剥离：两边同除 $y^{n}$',
        c: String.raw`
          $$y^{-n}y'+P(x)y^{1-n}=Q(x).$$
          右端干净了，代价是左边出现两个含 $y$ 的东西：$y^{-n}y'$ 和 $y^{1-n}$。` },
      { title: '锁定配平目标：定义 $z=y^{1-n}$',
        c: String.raw`
          为了让第二项回到标准形 $P(x)z$，直接令 $z=y^{1-n}$。
          ==这是"缺什么补什么"：标准形要求那一项是 $z$，那就把它命名为 $z$。==` },
      { title: '链式法则自动吃掉第一项',
        c: String.raw`
          $$\deriv zx=(1-n)y^{-n}\deriv yx.$$
          这==精准地匹配==了第一项（只差常数倍 $1-n$）。代回得
          $$\frac{1}{1-n}\deriv zx+P(x)z=Q(x)\ \Longrightarrow\ \deriv zx+(1-n)Pz=(1-n)Q.$$
          解出 $z$ 后代回 $y=z^{\frac{1}{1-n}}$。` },
    ] },

    { t: 'insight', id: 'why-1-minus-n', title: '为什么必然是 $1-n$（不用记）', c: String.raw`
      因为==求导让指数降 $1$==。

      对 $y^{k}$ 求导得 $ky^{k-1}y'$，指数必然下降 $1$。
      同除 $y^{n}$ 之后，左边剩下的两项是 $y^{1-n}$ 和 $y^{-n}y'$ ——
      ==它们的指数差恰好也是 $1$==。这不是巧合，是幂函数代数结构的必然。

      所以只要把高次那一项 $y^{1-n}$ 设为整体变量 $z$，
      它的导数 $z'$ 就必然会自动吃掉低次项 $y^{-n}y'$。

      $$\boxed{\ \text{换元的意义：用一个新变量,把原本分散的"代数项"和"微分项"统一在降幂逻辑下}\ }$$

      记住这句，$z=y^{1-n}$ 就不用背了 —— 现推。
    ` },

    { t: 'warn', id: 'bernoulli-boundary', title: '伯努利的适用边界', c: String.raw`
      - $n=0$：方程本来就是 $y'+Py=Q$，==已经是一阶线性==，不需要换元。
      - $n=1$：方程是 $y'+Py=Qy$，移项得 $y'+(P-Q)y=0$，
        ==退化为可分离变量==，直接 $\dfrac{\dy}{y}=(Q-P)\dx$。
        此时 $1-n=0$，$z=y^{0}=1$ ==没有意义==，公式失效。
      - 同除 $y^{n}$ 时，==$y\equiv0$ 这个解被丢掉了==，需要单独检查是否满足原方程。

      配套见[一阶方程的识别](#/calculus/ode/first-order?at=bernoulli-exact)。
    ` },

    { t: 'key', id: 'euler-eq', title: '欧拉方程：换的是自变量', c: String.raw`
      $$x^{2}y''+pxy'+qy=f(x)\ \xrightarrow{\ x=\mathrm{e}^{t}\ }\ \text{常系数方程}$$

      **为什么是 $x=\mathrm{e}^{t}$**：欧拉方程的特征是==每一项里 $x$ 的次数与求导阶数相同==
      （$x^{2}y''$、$xy'$、$y$）。这种"次数配平"正是[缩放不变性](#/threads/lines/substitution?at=homogeneous)
      在导数上的版本 —— 方程只关心 $x$ 的相对倍数，不关心绝对值。
      而 $t=\ln x$ 恰好==把乘法尺度换成加法尺度==（$x$ 翻倍 $\Leftrightarrow$ $t$ 加一个常数）。

      换完之后（记 $D=\dfrac{\d}{\dt}$）：
      $$xy'=Dy,\qquad x^{2}y''=D(D-1)y,$$
      方程变为 $y_{tt}+(p-1)y_t+qy=f(\mathrm{e}^{t})$，==变系数变常系数==。

      注意 $x<0$ 时要用 $x=-\mathrm{e}^{t}$，或者统一写 $t=\ln\abs x$ ——
      这是[可逆性](#/threads/lines/substitution?at=legit)那一条在起作用。
      解法细节见[欧拉方程](#/calculus/ode/euler?at=euler-form)。
    ` },

    { t: 'key', id: 'swap-roles', title: '★ 最被低估的一种换元：交换自变量与因变量', c: String.raw`
      前面所有换元都在换"变量的表达式"。还有一种换的是==角色==：
      谁是自变量、谁是因变量。

      **典型信号**：方程对 $y$ 是非线性的，但==对 $x$ 恰好是线性的==。例如

      $$\deriv yx=\frac{1}{x+y^{2}}.$$

      对 $y$ 来说这不是一阶线性；但取倒数：
      $$\deriv xy=x+y^{2}\ \Longrightarrow\ \deriv xy-x=y^{2},$$
      ==把 $x$ 看成 $y$ 的函数，它就是标准的一阶线性方程==。见[这道题](#/calculus/ode/first-order?at=ex-swap)。

      **配套的导数换算**（必须会现推）：
      $$\deriv xy=\frac{1}{\;\deriv yx\;},\qquad
      \frac{\d^{2}x}{\dy^{2}}=-\frac{y''}{(y')^{3}}.$$
      第二式的推法：$\dfrac{\d}{\dy}\!\left(\dfrac1{y'}\right)
      =\dfrac{\d}{\dx}\!\left(\dfrac1{y'}\right)\cdot\deriv xy
      =-\dfrac{y''}{(y')^{2}}\cdot\dfrac{1}{y'}$。
      见[反函数求导](#/calculus/derivative/techniques?at=inverse)。

      **同一个思想的另外两处化身**：
      $y''=f(y,y')$ 缺 $x$ 时改用 $y$ 当自变量（$y''=p\dfrac{\d p}{\dy}$），
      见[可降阶方程](#/calculus/ode/euler?at=missing-x)；
      以及二重积分里[交换积分次序](#/calculus/multi-integral/double?at=swap)
      —— ==换的是"先对谁积"==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'jacobian', c: '六、★ 换坐标要付费：Jacobian 这条暗线' },

    { t: 'key', id: 'jacobian-core', title: '一个公式，五个考点', c: String.raw`
      换坐标不是免费的：==新坐标下的"一小块"和旧坐标下的"一小块"大小不同，
      必须乘一个补偿因子==。这个因子就是雅可比行列式。

      $$\text{新的体积元}=\abs{J}\times\text{旧的体积元},\qquad
      J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}\pd xu&\pd xv\\[2pt]\pd yu&\pd yv\end{vmatrix}$$

      一元时它退化成 $\varphi'(t)$，多元时是行列式，
      在概率论里它换了个名字叫"密度变换公式"，==但公式一字未改==。

      ==只要记住"换坐标要付面积/体积的变形费"，五个考点全部同源。==
    ` },

    { t: 'compare',
      id: 'jacobian-table',
      title: '同一个补偿因子在五个战场上的化身',
      cols: ['场景', '换元', '补偿因子', '带绝对值吗'],
      rows: [
        ['定积分',
         '$x=\\varphi(t)$',
         '$\\varphi\'(t)$',
         '==否==（区间有向，$\\int_a^b=-\\int_b^a$）'],
        ['二重积分',
         '$(x,y)\\to(u,v)$',
         '$\\left|J\\right|$；极坐标为 $r$',
         '是（面积无向）'],
        ['三重积分',
         '柱／球坐标',
         '柱：$r$；球：$r^{2}\\sin\\varphi$',
         '是'],
        ['随机变量函数的密度',
         '$Y=g(X)$ 单调，$X=h(Y)$',
         '$f_Y(y)=f_X(h(y))\\left|h\'(y)\\right|$',
         '==是==（概率无向，且必须非负）'],
        ['弧长／面积元',
         '$y=y(x)$ 或参数式',
         '$\\mathrm{d}s=\\sqrt{1+y\'^{2}}\\,\\mathrm{d}x$<br>$\\mathrm{d}S=\\sqrt{1+z_x^{2}+z_y^{2}}\\,\\mathrm{d}x\\mathrm{d}y$',
         '是（长度、面积非负）'],
      ] },

    { t: 'warn', id: 'signed-vs-unsigned', title: '为什么只有定积分不加绝对值', c: String.raw`
      这是最容易混的一处，但道理只有一句：

      $$\boxed{\ \text{定积分是}\underline{\text{有向}}\text{的，其余都是}\underline{\text{测度}}\ }$$

      - 定积分自带方向（$\int_a^b=-\int_b^a$），换元时==上下限也跟着换==，
        方向的符号由积分限承担，所以 $\varphi'(t)$ 保留正负号。
      - 重积分的区域、概率、弧长、面积==都没有方向==，
        它们必须是非负的，所以补偿因子取绝对值。

      **由此产生的两个固定失分点**：
      1. 定积分换元==只换被积函数不换限==（最常见）；
      2. 重积分或概率密度==漏掉绝对值==，算出负密度还不觉得奇怪。

      顺带一提：==第二类曲线／曲面积分是有向的==，
      所以它才需要单独讨论"取哪一侧"，而第一类不需要。
      这个"有向 vs 无向"的分界线，贯穿整个多元积分。
    ` },

    { t: 'example',
      id: 'ex-density-jacobian',
      title: '把重积分换元公式搬到概率上',
      source: '概率 · 随机变量函数的分布',
      level: 3,
      problem: String.raw`
        设 $X\sim U(0,1)$，求 $Y=-\dfrac1\lambda\ln(1-X)$（$\lambda>0$）的概率密度。
      `,
      idea: String.raw`
        课本给的公式法 $f_Y(y)=f_X(h(y))\abs{h'(y)}$ 看着像一条要背的公式，
        ==其实它就是一维的重积分换元==：概率是"密度 × 长度"，
        换了坐标之后长度被拉伸了 $\abs{h'(y)}$ 倍，密度必须相应地补偿。

        所以做法和算 $\int f(x)\dx$ 换元一模一样：
        ==解出反函数 → 求导 → 取绝对值 → 别忘了换取值范围。==
        最后那一步（范围）就是[合法性第 3 条](#/threads/lines/substitution?at=legit)。
      `,
      solution: String.raw`
        $y=-\dfrac1\lambda\ln(1-x)$ 在 $x\in(0,1)$ 上严格单调递增，
        反函数 $x=h(y)=1-\mathrm{e}^{-\lambda y}$。

        **换范围**：$x\in(0,1)\Rightarrow y\in(0,+\infty)$。

        **求补偿因子**：$h'(y)=\lambda\mathrm{e}^{-\lambda y}>0$。

        **代公式**：$f_X(x)=1$（$0<x<1$），故
        $$f_Y(y)=f_X(h(y))\abs{h'(y)}=
        \begin{cases}\lambda\mathrm{e}^{-\lambda y},&y>0,\\[2pt]0,&y\le0.\end{cases}$$

        即 $Y\sim E(\lambda)$，指数分布。
      `,
      comment: String.raw`
        **这就是"逆变换抽样"**：用均匀分布造出任意指定分布，
        计算机生成随机数靠的就是它。反过来看更漂亮：
        ==任何连续型随机变量 $X$，$F(X)$ 都服从 $U(0,1)$== —— 分布函数是一次"标准化换元"。

        **考试提醒**：$g$ 不单调时不能用这个公式，
        必须退回==分布函数法==（先求 $F_Y(y)=P\{g(X)\le y\}$ 再求导），
        见[单调与非单调的分界](#/probability/random-var/function-of-rv?at=non-monotone)。
        这正是[可逆性](#/threads/lines/substitution?at=legit)那一条：
        ==不单调 $\Rightarrow$ 不可逆 $\Rightarrow$ 不能直接换元==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'boundary', c: '七、边界：什么不算换元' },

    { t: 'warn', id: 'not-substitution', title: '"自由度不变"这条原则的适用范围', c: String.raw`
      "只要自由度不变就可以随便换"是对的，但它==只覆盖真正的换元==。
      下面这些操作看起来像换元，其实改变了问题的维数或结构，
      各有各的额外代价，==不能套用同一套心法==：

      | 操作 | 自由度发生了什么 | 额外代价 |
      |---|---|---|
      | **拉格朗日乘数法** | $n$ 变量 $+1$ 个 $\lambda$，方程也多一条 | 得到的是==必要条件==，还要另行判定是不是极值 |
      | **构造辅助函数**<br>（中值定理证明） | 凭空造一个新函数 | 构造对不对没有保证，==是灵感不是算法== |
      | **参数化曲线曲面** | $2$ 维曲面用 $2$ 个参数描述，维数对上了 | 但要检查参数域与曲面==一一对应==，重叠会重复计算 |
      | **分部积分** | 不换变量 | 换的是"$\d$ 挂在谁头上"，属于恒等变形 |
      | **不可逆代换**（如 $u=x^{2}$ 在 $\R$ 上） | ==自由度真的丢了== | 必须分段，否则漏解 |

      ==判据仍然是那一条：能不能原样代回去。==
      代不回去的，就不是换元，得按它自己的规则来。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '八、通用失分点' },

    { t: 'warn', id: 'pitfall-list', title: '这条线的固定失分点', c: String.raw`
      1. **定积分换元不换限**：$\int_a^b\to\int_\alpha^\beta$，
         ==换了元就必须换限==，见[换元与换限](#/calculus/definite/properties?at=substitution-limits)。
      2. **三角代换不交代范围**：$x=a\sin t$ 必须限定 $t\in\left[-\frac\pi2,\frac\pi2\right]$，
         否则回代时 $\sqrt{a^{2}-x^{2}}=a\cos t$ 的正负号会错。
      3. **重积分漏 $\abs J$ 或忘了取绝对值**：极坐标漏掉 $r$ 是头号错误。
      4. **概率密度变换漏绝对值或漏定义域**：算出来的密度必须非负、积分为 $1$，
         ==这两条可以当场自检==。
      5. **除法丢解**：齐次方程除以 $g(u)-u$、伯努利除以 $y^{n}$，
         都可能丢掉常数解或 $y\equiv0$，==要回头单独检查==。
      6. **换完不代回**：答案停在 $u,t,z$ 空间里，直接扣分。
      7. **万能代换的间断**：$t=\tan\dfrac x2$ 在 $x=\pi$ 处失效，
         积分区间含 $\pi$ 时必须分段或换别的方法。
      8. **可化齐次时两直线平行还硬求交点**：
         先算 $a_1b_2-a_2b_1$，为零就改用[整体换元](#/threads/lines/substitution?at=parallel-case)。
      9. **反常积分换元后不重新判敛**：换元可能把有限点换到无穷远，
         ==收敛性要重新讨论==，见[反常积分](#/calculus/definite/improper?at=judge)。
      10. **多元换元只换了函数没换微分算子**：
         齐次方程里忘了 $\deriv yx=u+x\deriv ux$ 是最典型的，==新旧坐标系混用必错==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'lookup', c: '九、检索表：看到什么，就换什么' },

    { t: 'compare',
      id: 'lookup-table',
      title: '考场上用的那一张',
      cols: ['看到这个特征', '第一反应换', '动机'],
      rows: [
        ['出现 $a,b$ 及其中点，或区间不对称', '$m=\\frac{a+b}2,\\;r=\\frac{b-a}2$；或 $x\\to a+b-x$', '①对称'],
        ['积分限之和是 $\\pi$、$\\frac\\pi2$、$0$', '区间翻转', '①对称'],
        ['分式方程有常数项，分子分母是两条直线', '平移到交点（平行则整体换元）', '①对称'],
        ['二次式含一次项', '配方（平移到中心）', '①对称'],
        ['分子分母同次 / 只含 $\\frac yx$', '$u=\\dfrac yx$', '②解耦'],
        ['区域是圆、扇形、球', '极／柱／球坐标', '②解耦'],
        ['二次型含交叉项 $x_ix_j$', '正交变换 $x=Qy$', '②解耦'],
        ['两个随机变量相关', '线性变换化为不相关', '②解耦'],
        ['出现 $tx_1+(1-t)x_2$', '翻译成"加权平均"，或解出 $t$ 变三点斜率', '③剥离尺度'],
        ['$\\frac1n\\sum f\\!\\left(\\frac kn\\right)$', '$t=\\dfrac kn$，化为 $\\int_0^1$', '③剥离尺度'],
        ['要在 $[a,b]$ 上用凸性定义', '归一到 $[0,1]$', '③剥离尺度'],
        ['$y\'+Py=Qy^{n}$', '$z=y^{1-n}$', '④配平'],
        ['$x^{k}y^{(k)}$ 次数与阶数相同', '$x=\\mathrm{e}^{t}$', '④配平'],
        ['$y\'\'$ 里缺 $y$ 或缺 $x$', '$p=y\'$（缺 $x$ 时改以 $y$ 为自变量）', '④配平'],
        ['对 $y$ 非线性但对 $x$ 线性', '交换自变量：$\\deriv xy$', '④配平'],
        ['根式 $\\sqrt{a^{2}\\pm x^{2}}$', '三角代换', '④配平'],
        ['$x\\to\\infty$ 或分母次数很高', '倒代换 $x=\\dfrac1t$', '④配平'],
        ['幂指函数 $u^{v}$', '取对数', '④配平'],
      ] },

    { t: 'insight', id: 'closing', title: '一句话收尾', c: String.raw`
      这条主线和另外四条不太一样。
      [泰勒](#/threads/lines/taylor?at=core)、[几何级数](#/threads/lines/geometric?at=core)、
      [有理拆分](#/threads/lines/rational?at=core)、[二次型](#/threads/lines/quadratic?at=core)
      各自对应一类具体的对象；而换元==不针对任何对象，它针对的是"你站在哪里看"==。

      所以它出现的频率比其它四条都高，高到让人以为它只是一堆零散技巧。

      $$\boxed{\ \text{觉得这道题难，先别急着找技巧 —— 先问一句：我是不是站错了坐标系}\ }$$
    ` },

  ],
});
