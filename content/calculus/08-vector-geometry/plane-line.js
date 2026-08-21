/* ==========================================================================
   高等数学 / 8 向量代数与空间解析几何 / 平面与直线
   —— 方程的各种形式 + 位置关系 + 距离公式。
      向量运算见 vector-geometry/vector-ops。
   ========================================================================== */

KM.page({
  path: 'calculus/vector-geometry/plane-line',
  title: '平面与直线',
  subtitle: '平面认**法向量**，直线认**方向向量**。所有题目都是先找这两个向量，剩下的是套公式',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'plane-forms', title: '平面方程的三种形式', c: String.raw`
      **点法式**（最常用）：过点 $M_0(x_0,y_0,z_0)$、法向量 $\vec n=(A,B,C)$：
      $$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$$

      **一般式**：
      $$Ax+By+Cz+D=0,\qquad \vec n=(A,B,C)$$
      $$\boxed{\ \text{一般式里 }x,y,z\ \text{的系数就是法向量的分量}\ }$$
      ==这条要形成条件反射==：看到平面方程立刻读出法向量。

      **截距式**（三个截距为 $a,b,c$）：
      $$\frac xa+\frac yb+\frac zc=1$$

      **建立平面方程的三步**：

      1. ==找法向量 $\vec n$==；
      2. ==找平面上一个点 $M_0$==；
      3. 套点法式。

      **法向量怎么找**（==这是全部难点==）：

      | 已知 | $\vec n$ |
      |---|---|
      | 平面内两个不平行向量 $\vec u,\vec v$ | ==$\vec u\times\vec v$== |
      | 平面过三点 $A,B,C$ | $\vec{AB}\times\vec{AC}$ |
      | 平面垂直于某直线 | ==直线的方向向量== |
      | 平面平行于另一平面 | 另一平面的法向量 |
      | 平面过一条直线且垂直于某平面 | $\vec s\times\vec n_1$ |

      ==前两行靠[叉乘](#/calculus/vector-geometry/vector-ops?at=cross)，是最常用的==。
    ` },

    { t: 'key', id: 'line-forms', title: '直线方程的三种形式', c: String.raw`
      **对称式（点向式）**：过 $M_0$、方向向量 $\vec s=(m,n,p)$：
      $$\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p}$$
      ==分母是方向向量的分量==。

      **参数式**：
      $$\begin{cases}x=x_0+mt\\ y=y_0+nt\\ z=z_0+pt\end{cases}$$
      ==求交点、求距离时用参数式最方便==。

      **一般式（两平面相交）**：
      $$\begin{cases}A_1x+B_1y+C_1z+D_1=0\\ A_2x+B_2y+C_2z+D_2=0\end{cases}$$

      $$\boxed{\ \text{一般式}\to\text{对称式}:\quad \vec s=\vec n_1\times\vec n_2\ }$$
      ==直线在两个平面内，所以同时垂直于两个法向量==，
      叉乘就是它的方向。
      ==再取一个具体点（令某个坐标为 $0$ 解方程组）即可==。

      **分母出现 $0$ 的约定**：
      $$\frac{x-1}{0}=\frac{y}{2}=\frac{z}{3}$$
      ==不是"除以零"，而是约定 $x-1=0$==，
      即该直线落在平面 $x=1$ 内。
      **这个写法是标准的，不要以为是错的。**
    ` },

    { t: 'compare',
      id: 'relations',
      title: '位置关系的判据',
      cols: ['关系', '判据'],
      rows: [
        ['平面 $\\parallel$ 平面', '$\\vec n_1\\parallel\\vec n_2$'],
        ['平面 $\\perp$ 平面', '==$\\vec n_1\\cdot\\vec n_2=0$=='],
        ['直线 $\\parallel$ 直线', '$\\vec s_1\\parallel\\vec s_2$'],
        ['直线 $\\perp$ 直线', '$\\vec s_1\\cdot\\vec s_2=0$'],
        ['==直线 $\\parallel$ 平面==', '==$\\vec s\\cdot\\vec n=0$==（方向向量垂直于法向量）'],
        ['==直线 $\\perp$ 平面==', '==$\\vec s\\parallel\\vec n$=='],
        ['两直线共面', '$\\left[\\vec s_1,\\vec s_2,\\vec{M_1M_2}\\right]=0$'],
      ] },

    { t: 'md', c: String.raw`
      ==第 5、6 行最容易记反==：
      **直线与平面"平行"时，方向向量与法向量是"垂直"的**；
      **直线与平面"垂直"时，方向向量与法向量是"平行"的**。

      $$\boxed{\ \text{直线与平面的关系，和 }\vec s\ \text{与}\ \vec n\ \text{的关系**恰好相反**}\ }$$
      理由：法向量本身就垂直于平面。

      **夹角公式也因此不同**：

      | 夹角 | 公式 |
      |---|---|
      | 面面角 | $\cos\theta=\dfrac{\abs{\vec n_1\cdot\vec n_2}}{\abs{\vec n_1}\abs{\vec n_2}}$ |
      | 线线角 | $\cos\theta=\dfrac{\abs{\vec s_1\cdot\vec s_2}}{\abs{\vec s_1}\abs{\vec s_2}}$ |
      | ==线面角== | ==$\sin\theta=\dfrac{\abs{\vec s\cdot\vec n}}{\abs{\vec s}\abs{\vec n}}$== |

      ==线面角用 $\sin$ 不用 $\cos$==（因为差了个 $90°$），
      **这是最高频的公式错误。**
      三个公式都==带绝对值==（约定取锐角）。
    ` },

    { t: 'formulas', id: 'distances', title: '距离公式', items: [
      { label: '点到平面', tex: String.raw`d=\frac{\left|Ax_0+By_0+Cz_0+D\right|}{\sqrt{A^{2}+B^{2}+C^{2}}}` },
      { label: '点到直线', tex: String.raw`d=\frac{\left|\vec{M_0M_1}\times\vec s\right|}{\left|\vec s\right|}` },
      { label: '两平行平面', tex: String.raw`d=\frac{\left|D_1-D_2\right|}{\sqrt{A^{2}+B^{2}+C^{2}}}\quad(\text{系数需先化成相同})` },
      { label: '两异面直线', tex: String.raw`d=\frac{\left|\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]\right|}{\left|\vec s_1\times\vec s_2\right|}` },
    ] },

    { t: 'md', c: String.raw`
      **点到直线公式的来历**：$\abs{\vec{M_0M_1}\times\vec s}$ 是平行四边形面积，
      ==除以底 $\abs{\vec s}$ 就是高==，正是所求距离。

      **异面直线公式的来历**：分子是平行六面体体积、分母是底面积，
      ==商就是高==，即两直线的公垂线段长。
      ==$\vec s_1\times\vec s_2$ 恰好是公垂线的方向==。

      **两条经验**：

      - ==所有距离公式都是"某个几何量除以另一个"==，
        记不住就画图现推；
      - ==点到平面的公式要求方程是一般式==（右端为 $0$），
        写成 $Ax+By+Cz=D$ 时分子是 $\abs{Ax_0+By_0+Cz_0-D}$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-plane',
      title: '求平面方程：关键是找法向量',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        求过直线
        $$L:\ \frac{x-1}{2}=\frac{y}{-1}=\frac{z+1}{1}$$
        且垂直于平面 $\Pi_1:\ x+2y-z+3=0$ 的平面方程。
      `,
      idea: String.raw`
        **要找的平面 $\Pi$ 满足两个条件**：

        1. 包含直线 $L$ $\Rightarrow$ ==$\Pi$ 的法向量 $\vec n\perp\vec s$==；
        2. 垂直于 $\Pi_1$ $\Rightarrow$ ==$\vec n\perp\vec n_1$==
           （[面面垂直的判据](#/calculus/vector-geometry/plane-line?at=relations)）。

        ==$\vec n$ 同时垂直于两个已知向量 $\Rightarrow$ 叉乘==：
        $$\vec n=\vec s\times\vec n_1.$$

        **读出两个向量**：
        - $\vec s=(2,-1,1)$（对称式的分母）；
        - $\vec n_1=(1,2,-1)$（一般式的系数）。

        **取点**：$L$ 上的点 $M_0(1,0,-1)$（==对称式里现成的==）。

        ==三步：找 $\vec n$、取点、套点法式。==

        **算完的验证**：
        - $\vec n\cdot\vec s=0$（$L$ 的方向在平面内）；
        - $\vec n\cdot\vec n_1=0$（两平面垂直）；
        - $M_0$ 代入方程成立。
      `,
      solution: String.raw`
        由直线 $L$ 读出方向向量 $\vec s=(2,-1,1)$ 与其上一点 $M_0(1,0,-1)$；
        由 $\Pi_1$ 读出法向量 $\vec n_1=(1,2,-1)$。

        所求平面 $\Pi$ 包含 $L$ 且垂直于 $\Pi_1$，故其法向量 $\vec n$ 同时垂直于
        $\vec s$ 与 $\vec n_1$：
        $$\vec n=\vec s\times\vec n_1=\begin{vmatrix}
        \vec i&\vec j&\vec k\\ 2&-1&1\\ 1&2&-1
        \end{vmatrix}$$
        $$=\vec i\left[(-1)(-1)-1\cdot2\right]-\vec j\left[2\cdot(-1)-1\cdot1\right]
        +\vec k\left[2\cdot2-(-1)\cdot1\right]$$
        $$=\vec i(1-2)-\vec j(-2-1)+\vec k(4+1)=(-1,3,5).$$

        由点法式（过 $M_0(1,0,-1)$）：
        $$-1(x-1)+3(y-0)+5(z+1)=0,$$
        即
        $$-x+3y+5z+6=0\ \Longrightarrow\ \boxed{x-3y-5z-6=0}.$$

        **验证**：
        - $\vec n\cdot\vec s=(-1)(2)+3(-1)+5(1)=-2-3+5=0$ $\checkmark$
        - $\vec n\cdot\vec n_1=(-1)(1)+3(2)+5(-1)=-1+6-5=0$ $\checkmark$
        - $M_0(1,0,-1)$ 代入：$1-0+5-6=0$ $\checkmark$
        - 再取 $L$ 上另一点（$t=1$）：$(3,-1,0)$，代入 $3+3-0-6=0$ $\checkmark$
      `,
      comment: String.raw`
        **最后那个"再取 $L$ 上另一点"的验证很值得做**：
        ==它确认了整条直线都在平面内==，而不只是那一个点。
        取 $t=1$ 得 $(1+2,0-1,-1+1)=(3,-1,0)$，代入成立 $\checkmark$

        **"叉乘找法向量"是本章最核心的动作**。
        识别信号：==所求平面的法向量同时垂直于两个已知向量==。

        | 题目条件 | $\vec n=$ |
        |---|---|
        | 过直线 $L$ 且垂直于平面 $\Pi_1$ | $\vec s\times\vec n_1$ |
        | 过两条平行直线 | $\vec s\times\vec{M_1M_2}$ |
        | 过点且平行于两个方向 | $\vec u\times\vec v$ |
        | 过三点 | $\vec{AB}\times\vec{AC}$ |

        ==四种情形本质相同==：都是"找两个平面内的向量，叉乘"。

        **符号可以整体反号**：$\vec n=(-1,3,5)$ 与 $(1,-3,-5)$ ==给出同一个平面==，
        ==所以答案写成 $x-3y-5z-6=0$ 或 $-x+3y+5z+6=0$ 都对==。
        习惯上把 $x$ 的系数化成正的。

        **常见的追问**：求 $L$ 与 $\Pi_1$ 的夹角。
        由[线面角公式](#/calculus/vector-geometry/plane-line?at=relations)，
        $$\sin\theta=\frac{\abs{\vec s\cdot\vec n_1}}{\abs{\vec s}\abs{\vec n_1}}
        =\frac{\abs{2-2-1}}{\sqrt6\cdot\sqrt6}=\frac16,$$
        ==注意用 $\sin$ 不是 $\cos$==。
      `,
    },

    { t: 'example',
      id: 'ex-distance',
      title: '异面直线的距离与公垂线',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设
        $$L_1:\ \frac{x}{1}=\frac{y}{0}=\frac{z}{-1},\qquad
        L_2:\ \frac{x-1}{1}=\frac{y-1}{1}=\frac{z}{0}.$$

        1. 判断 $L_1$ 与 $L_2$ 是否异面；
        2. 若异面，求它们之间的距离。
      `,
      idea: String.raw`
        **读出四个要素**：
        $$\vec s_1=(1,0,-1),\ M_1(0,0,0);\qquad \vec s_2=(1,1,0),\ M_2(1,1,0).$$
        $$\vec{M_1M_2}=(1,1,0).$$

        **判异面**：用[混合积](#/calculus/vector-geometry/vector-ops?at=mixed)。
        $$\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]\ne0\ \iff\ \text{异面}$$
        ==等于零则共面（相交或平行）==。

        **注意 $\vec{M_1M_2}=(1,1,0)$ 恰好等于 $\vec s_2$**——
        ==这说明 $M_1$ 也在 $L_2$ 上？== 验一下：
        $L_2$ 上的点是 $(1+t,1+t,0)$，取 $t=-1$ 得 $(0,0,0)=M_1$。
        ==所以 $M_1$ 确实在 $L_2$ 上，两直线相交于原点，不异面！==

        ==这个发现改变了整道题==：混合积必然为零。
        **所以第 2 问的"若异面"是个条件，本题不满足。**

        重新看：$L_1$ 过原点，$L_2$ 也过原点（$t=-1$），
        ==两直线相交，距离为 $0$==。

        **教训**：==动手套公式前，先检查两直线是否有公共点==。
      `,
      solution: String.raw`
        **(1)** 读出要素：
        $$\vec s_1=(1,0,-1),\quad M_1(0,0,0);\qquad \vec s_2=(1,1,0),\quad M_2(1,1,0).$$
        $$\vec{M_1M_2}=(1,1,0).$$

        计算混合积：
        $$\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]
        =\begin{vmatrix}1&0&-1\\ 1&1&0\\ 1&1&0\end{vmatrix}=0$$
        （==第二、三行相同==）。

        故 $L_1,L_2$ ==共面==，不是异面直线。

        又 $\vec s_1=(1,0,-1)$ 与 $\vec s_2=(1,1,0)$ ==不平行==
        （分量不成比例），故两直线==相交==。

        **求交点**：$L_1$ 上的点为 $(t,0,-t)$，$L_2$ 上的点为 $(1+u,1+u,0)$。
        令两者相等：
        $$t=1+u,\qquad 0=1+u,\qquad -t=0.$$
        由第三式 $t=0$，由第二式 $u=-1$，代入第一式 $0=1+(-1)=0$ $\checkmark$

        故交点为 $(0,0,0)$，即原点。

        **(2)** 由于两直线相交，==它们之间的距离为 $0$==。
      `,
      comment: String.raw`
        **这道题的价值在于"先判断再套公式"**。
        若不加判断直接套异面直线距离公式
        $$d=\frac{\abs{\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]}}{\abs{\vec s_1\times\vec s_2}},$$
        ==分子为 $0$，得到 $d=0$——答案碰巧对==，
        ==但"异面"这个前提是错的，判断题会失分==。

        **两直线位置关系的完整判断流程**：

        | 步骤 | 判据 | 结论 |
        |---|---|---|
        | ① | $\vec s_1\parallel\vec s_2$？ | 是 $\to$ 平行或重合 |
        | ② | $\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]=0$？ | 是 $\to$ ==共面== |
        | ③ | 共面 + 不平行 | ==相交== |
        | ④ | 不共面 | ==异面== |

        ==顺序不能乱==：先判平行，再判共面。

        **重合的判别**：$\vec s_1\parallel\vec s_2$ ==且== $M_2$ 在 $L_1$ 上。

        **把题目改成异面的版本**：把 $L_2$ 改成
        $$\frac{x-1}{1}=\frac{y-1}{1}=\frac{z-1}{0},$$
        则 $\vec{M_1M_2}=(1,1,1)$，
        $$\left[\vec s_1,\vec s_2,\vec{M_1M_2}\right]
        =\begin{vmatrix}1&0&-1\\1&1&0\\1&1&1\end{vmatrix}
        =1(1-0)-0(1-0)+(-1)(1-1)=1,$$
        $$\vec s_1\times\vec s_2=(0\cdot0-(-1)\cdot1,\ (-1)\cdot1-1\cdot0,\ 1\cdot1-0\cdot1)=(1,-1,1),$$
        $$d=\frac{\abs1}{\sqrt3}=\frac{\sqrt3}{3}.$$
        ==这才是标准的异面距离题==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **线面角用 $\cos$**：==必须用 $\sin$==。
      2. **直线平行平面的判据记反**：==$\vec s\cdot\vec n=0$ 才是平行==。
      3. **对称式分母为 $0$ 以为是错的**：==是约定==，表示该坐标为常数。
      4. **一般式化对称式忘了取点**：==方向向量之外还要一个点==。
      5. **不先判位置关系就套距离公式**：==平行、相交、异面的公式不同==。
      6. **点到平面公式用了非一般式**：==右端要是 $0$==。
      7. **两平行平面距离忘了先统一系数**：$2x+2y+2z+1=0$ 要先化成 $x+y+z+\frac12=0$。
      8. **算出法向量不验证**：==与两个已知向量点乘应为零==。
      9. **只验一个点在平面上**：==要再验直线上另一点==，确认整条线都在。
    ` },

  ],
});
