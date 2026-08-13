/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 格林公式与路径无关
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/green',
  title: '格林公式与路径无关',
  subtitle: '偏导相等不等于积分为零。真正决定结果的是：区域里有没有洞，以及路径绕了它几圈',
  tags: ['大题', '计算题', '易错', '高频'],
  updated: '2026-08-13',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'diagnosis', c: '一、为什么"知道有奇点"还是会漏' },

    { t: 'insight', id: 'know-vs-familiar', title: '我的复盘：知道 ≠ 熟悉', c: String.raw`
      我知道有奇点这回事儿，==但是真做起来其实还是没有考虑到==，
      说明我对这个点还不是真的熟悉。

      ---

      **这个复盘比题目本身重要，而且漏掉的原因是可以指出来的 —— 不是记性问题，是==检查的时机==放错了。**

      看你的动作顺序：

      $$\text{写出 }P,Q\ \longrightarrow\ \text{算 }P_y,\ Q_x\ \longrightarrow\ \text{发现相等}\ \longrightarrow\ \text{下结论}$$

      ==问题出在第三步：算出"相等"这件事，本身发出了一个极强的"做完了"信号。==
      你花了力气做了一次不轻的求导，得到一个干净漂亮的结果，还正好命中了教材里
      "$Q_x=P_y$ 则路径无关"这句现成结论 —— 心理上这已经是一个**终点**，
      人在终点是不会再退回去查前提的。

      所以修法不是"下次记得查奇点"（这次你也"记得"，没用），
      而是==把定义域检查挪到偏导计算之前==：

      $$\text{写出 }P,Q\ \longrightarrow\ \boxed{\text{先看分母，标出奇点，判断在不在 }L\text{ 内}}
        \ \longrightarrow\ \text{再算 }P_y,\ Q_x$$

      这样它就不需要你"记得"了 —— ==流程本身逼你先做它==。

      **这就是"知道 ≠ 熟悉"的准确含义**：知道是一条可以复述的陈述，
      熟悉是==这个动作在流程里占了一个位置==，不占位置的知识在考场上等于没有。
    ` },

    { t: 'warn', id: 'alarm', title: '奇点警报：见到分母就停一下', c: String.raw`
      触发条件极其机械，==不需要理解题意也能查==：

      1. **看 $P,Q$ 的分母**（以及根号内、$\ln$ 内），找出使它为零的点；
      2. 本题分母 $4x^2+y^2$，为零只有 $(0,0)$ ⟹ ==奇点集 $=\left\{(0,0)\right\}$==；
      3. **判断奇点在不在 $L$ 围成的区域内**：$L:\;x^2+y^2=2$ 是绕原点的圆，
         原点在里面 ⟹ ==命中，不能直接用格林公式==。

      $$\text{分母里出现 }x^2+y^2\text{ 型的式子}\ \Longrightarrow\ \text{奇点警报}$$

      ==这条几乎是考研出题的固定信号==：只要分母是 $x^2+y^2$、$4x^2+y^2$、$(x-1)^2+y^2$ 这类
      在某点为零的二次式，题目就是在考挖洞，而不是在考"算个二重积分"。

      **第三种情况也要会判**：奇点恰好落在 $L$ **上**（比如 $L$ 过原点），
      此时曲线积分本身是反常的，考研不会这么出，看到就是自己把 $L$ 写错了。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'meaning', c: '二、"偏导相等"到底推出了什么' },

    { t: 'key', id: 'correct-syllogism', title: '被跳掉的那个前提：单连通', c: String.raw`
      教材那句话的完整版是：

      $$\boxed{\ Q_x=P_y\ \textbf{且区域单连通}\ \Longrightarrow\ \text{路径无关，闭路积分为 }0\ }$$

      ==单连通（没有洞）这半句才是这道题的胜负手==，而它偏偏不出现在任何一次计算里，
      所以最容易被跳过去。

      **少了单连通会怎样？** 不是结论作废，而是结论==减弱==：

      | 区域 | $Q_x=P_y$ 推出什么 |
      |---|---|
      | **单连通**（无洞） | 闭路积分恒为 $0$，真·保守场 |
      | **多连通**（有洞） | 积分只取决于==绕洞绕了几圈==，与具体走法无关。绕 $0$ 圈才是 $0$ |

      本题的场在 $\R^2\setminus\left\{(0,0)\right\}$ 上处处满足 $Q_x=P_y$，
      但这个区域==有一个洞==，所以它是**局部保守、整体不保守**：
      任何不绕原点的闭路积分确实为 $0$，一旦绕原点一圈就冒出一个非零常数。
    ` },

    { t: 'insight', id: 'digging-is-path-independence', title: '换个角度：挖洞法不是补救，它就是"路径无关"本身', c: String.raw`
      很多人把挖洞法记成"格林公式失效后的补救措施"，==这个理解会让人记不住为什么合法==。

      反过来看：上表第二行说的是"积分只与绕洞圈数有关，与具体路径无关"。
      那么 —— ==既然与具体路径无关，我当然可以把又大又难算的 $L$，
      换成任何一条同样绕原点一圈的曲线==。

      挖洞法就是在**行使**这个自由度，而不是在弥补什么。于是三件事被串成了一条：

      $$Q_x=P_y\ \Longrightarrow\ \text{路径可以随便换（只要绕数不变）}\ \Longrightarrow\ \text{换成最好算的那一条}$$

      **这样一来，"洞挖成什么形状"就不再是需要背的技巧，而是一个自然的问题**：
      既然随便换，那就换成让被积函数最舒服的那条 —— 见[下一节](#/calculus/line-surface/green?at=how-to-dig)。

      顺带一提：这也解释了为什么答案里 ==$\varepsilon$ 一定会全部约掉==。
      洞的大小根本不影响绕数，结果必须与 $\varepsilon$ 无关。
      ==算完发现式子里还剩 $\varepsilon$，不用检查，一定是算错了。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'how-to-dig', c: '三、挖洞：形状、大小、方向' },

    { t: 'method', id: 'dig-three-choices', title: '挖洞的三个决策', c: String.raw`
      **一、形状 —— 跟着分母走，让分母变成常数。**

      这是本题最值钱的一步。曲线积分==允许把曲线方程代进被积函数==
      （曲线上每一点都满足它，和[第一类曲面积分的"二代"](#/calculus/line-surface/first-kind-surface?at=forget-substitute)是同一回事；
      与之相反，[重积分不能代边界方程](#/calculus/multi-integral/triple?at=no-substitution)，因为那是实心区域）。

      于是问题变成：**哪条曲线能让"代入"这一招真正见效？**

      * 在原曲线 $L:\;x^2+y^2=2$ 上代入：$4x^2+y^2=4x^2+(2-x^2)=3x^2+2$，==还是个变量，白代==；
      * 挖成小椭圆 $l:\;4x^2+y^2=\varepsilon^2$：分母直接变成==常数 $\varepsilon^2$==，可以提到积分号外。

      $$\boxed{\ \text{洞的形状 = 让分母恒为常数的那条曲线，即}\ \text{分母}=\varepsilon^2\ }$$

      ==所以看到分母 $4x^2+y^2$ 就挖椭圆，看到 $x^2+y^2$ 就挖圆，看到 $(x-1)^2+y^2$ 就挖以 $(1,0)$ 为心的圆。==
      形状不是凭经验选的，是被分母指定的。

      **二、大小 —— $\varepsilon$ 只要小到 $l$ 完全落在 $L$ 内部即可**，其余随意；
      结果与 $\varepsilon$ 无关（上一节已说明原因）。

      **三、方向 —— 两种写法，别记混。**

      | 写法 | $l$ 的方向 | 关系式 |
      |---|---|---|
      | 常用（推荐） | $l$ 取==逆时针==，与 $L$ 同向 | $\displaystyle\oint_L=\oint_l$ |
      | 按环域正向 | $l$ 取==顺时针==（环域边界正向） | $\displaystyle\oint_L+\oint_{l\text{顺}}=\iint_D\left(Q_x-P_y\right)\d A=0$ |

      两式等价（$\oint_{l\text{顺}}=-\oint_{l\text{逆}}$）。==推荐记第一行==：
      "同向的两条闭曲线，只要中间的环域里 $Q_x=P_y$，积分就相等"，一句话且不容易搞错符号。
    ` },

    { t: 'method', id: 'two-greens', title: '第二次格林：把分母提出去之后，内部就没有奇点了', c: String.raw`
      挖完洞不必急着参数化。在 $l$ 上分母恒为 $\varepsilon^2$，先提出来：

      $$\oint_l\frac{P_1\dx+Q_1\dy}{4x^2+y^2}=\frac{1}{\varepsilon^2}\oint_l P_1\dx+Q_1\dy$$

      ==关键在于：提完之后剩下的 $P_1,Q_1$ 是多项式，在整个小椭圆内部处处光滑，奇点没有了。==
      于是可以对 $l$ 的内部**再用一次格林公式**，而且这次是完全合法的。

      $$\frac{1}{\varepsilon^2}\oint_l P_1\dx+Q_1\dy
        =\frac{1}{\varepsilon^2}\iint_{D_\varepsilon}\left(\frac{\partial Q_1}{\partial x}-\frac{\partial P_1}{\partial y}\right)\d A$$

      $P_1,Q_1$ 常常是一次式，括号里就是个**常数**，二重积分退化成"常数 × 椭圆面积"，一行出答案。

      $$\text{标准套路：}\quad\text{挖洞（第一次格林）}\ \to\ \text{代曲线方程、提常数}\ \to\ \text{再用格林（第二次）}$$

      ==这比参数化快得多，而且不用碰三角函数。== 唯一要小心的是：
      **提常数这一步只在曲线 $l$ 上合法**（因为只有 $l$ 上才有 $4x^2+y^2=\varepsilon^2$），
      提完之后被积函数已经换成了新的 $P_1,Q_1$，第二次格林是对**新**函数用的。

      需要的面积公式：椭圆 $4x^2+y^2=\varepsilon^2$ 即 $\dfrac{x^2}{(\varepsilon/2)^2}+\dfrac{y^2}{\varepsilon^2}=1$，
      半轴 $a=\dfrac{\varepsilon}{2},\;b=\varepsilon$，面积 $=\pi ab=\dfrac{\pi\varepsilon^2}{2}$。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'example-section', c: '四、例题' },

    { t: 'example',
      id: 'ex-ellipse-hole',
      title: '奇点在里面，偏导却相等 —— 三种解法',
      source: '考研典型题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle I=\oint_L\frac{4x-y}{4x^2+y^2}\dx+\frac{x+y}{4x^2+y^2}\dy$，
        其中 $L$ 为圆 $x^2+y^2=2$，取==逆时针==方向。
      `,
      openIdea: true,
      idea: String.raw`
        **第一反应必须是查奇点，不是算偏导。**
        分母 $4x^2+y^2=0$ 只在原点成立，而 $L$ 是绕原点的圆 ⟹ ==奇点在里面，格林公式不能直接用==。

        然后再算偏导，看它是不是相等 —— 这一步不是白算的，
        它决定了挖洞之后==环域上的二重积分是 $0$ 还是要真算==：

        * 相等 ⟹ 环域积分为 $0$，$\oint_L=\oint_l$，只剩小曲线要算（本题）；
        * 不相等 ⟹ 还得老实算环域上的二重积分，两部分都要。

        **洞挖成什么形状？** 让分母变常数的那条：$4x^2+y^2=\varepsilon^2$。
        在原来的 $L$ 上代入 $x^2+y^2=2$ 是没用的（分母变成 $3x^2+2$，还是变量），
        ==这正是必须换一条曲线的动机==。

        最后一步有三条路：**两次格林**（最快）、**参数化**（最稳）、
        **拆成径向 + 旋转**（最能看清结构）。三条都写在下面。
      `,
      solution: String.raw`
        ### 第 0 步：查奇点（这一步在任何计算之前）

        $P=\dfrac{4x-y}{4x^2+y^2},\;Q=\dfrac{x+y}{4x^2+y^2}$，分母零点只有 $(0,0)$，且 $(0,0)$ 在 $L$ 内 ⟹ ==挖洞==。

        ### 第 1 步：验证偏导相等（决定环域积分是否为零）

        $$\frac{\partial P}{\partial y}=\frac{-\left(4x^2+y^2\right)-(4x-y)\cdot 2y}{\left(4x^2+y^2\right)^2}
          =\frac{-4x^2+y^2-8xy}{\left(4x^2+y^2\right)^2}$$
        $$\frac{\partial Q}{\partial x}=\frac{\left(4x^2+y^2\right)-(x+y)\cdot 8x}{\left(4x^2+y^2\right)^2}
          =\frac{-4x^2+y^2-8xy}{\left(4x^2+y^2\right)^2}$$

        除原点外恒有 $Q_x=P_y$。

        ### 第 2 步：挖洞

        取 $l:\;4x^2+y^2=\varepsilon^2$（$\varepsilon$ 充分小），逆时针。
        在 $L$ 与 $l$ 之间的环域 $D$ 上 $P,Q$ 有连续偏导且 $Q_x=P_y$，故
        $$I=\oint_L P\dx+Q\dy=\oint_l P\dx+Q\dy .$$

        ---

        ### 解法 1：再用一次格林（推荐）

        在 $l$ 上 $4x^2+y^2=\varepsilon^2$，提出常数：
        $$I=\frac{1}{\varepsilon^2}\oint_l (4x-y)\dx+(x+y)\dy .$$
        新的 $P_1=4x-y,\;Q_1=x+y$ 是多项式，在 $l$ 内部处处光滑，可以放心用格林：
        $$\frac{\partial Q_1}{\partial x}-\frac{\partial P_1}{\partial y}=1-(-1)=2$$
        $$I=\frac{1}{\varepsilon^2}\iint_{D_\varepsilon}2\,\d A
          =\frac{2}{\varepsilon^2}\cdot\underbrace{\frac{\pi\varepsilon^2}{2}}_{\text{椭圆面积}}
          =\boxed{\pi}$$

        ==$\varepsilon$ 全部约掉，符合预期。==

        ---

        ### 解法 2：参数化

        取 $x=\dfrac{\varepsilon}{2}\cos\theta,\;y=\varepsilon\sin\theta$，$\theta:0\to2\pi$（逆时针），
        此时 $4x^2+y^2=\varepsilon^2$，$\dx=-\dfrac{\varepsilon}{2}\sin\theta\,\d\theta$，$\dy=\varepsilon\cos\theta\,\d\theta$。

        分子逐项算：
        $$(4x-y)\dx=\left(2\varepsilon\cos\theta-\varepsilon\sin\theta\right)\left(-\frac{\varepsilon}{2}\sin\theta\right)\d\theta
          =\varepsilon^2\left(-\cos\theta\sin\theta+\tfrac12\sin^2\theta\right)\d\theta$$
        $$(x+y)\dy=\left(\frac{\varepsilon}{2}\cos\theta+\varepsilon\sin\theta\right)\left(\varepsilon\cos\theta\right)\d\theta
          =\varepsilon^2\left(\tfrac12\cos^2\theta+\sin\theta\cos\theta\right)\d\theta$$

        相加时 ==$\sin\theta\cos\theta$ 恰好抵消==，只剩
        $$I=\frac{1}{\varepsilon^2}\int_0^{2\pi}\varepsilon^2\cdot\frac12\left(\sin^2\theta+\cos^2\theta\right)\d\theta
          =\int_0^{2\pi}\frac12\,\d\theta=\boxed{\pi}$$

        ---

        ### 解法 3：拆成"径向 + 旋转"（看清结构）

        把分子按 $x\,\d x$ 型与 $x\,\d y$ 型分开：
        $$P\dx+Q\dy=\underbrace{\frac{4x\dx+y\dy}{4x^2+y^2}}_{\text{径向}}
          +\underbrace{\frac{-y\dx+x\dy}{4x^2+y^2}}_{\text{旋转}}$$

        **径向部分是全微分**：注意 $\d\left(4x^2+y^2\right)=2\left(4x\dx+y\dy\right)$，故
        $$\frac{4x\dx+y\dy}{4x^2+y^2}=\frac12\,\d\ln\left(4x^2+y^2\right),$$
        它在 $\R^2\setminus\left\{(0,0)\right\}$ 上是==单值函数的全微分==，沿任何闭路积分为 $0$。

        **旋转部分**才是环流的来源，在 $l$ 上：
        $$\oint_l\frac{-y\dx+x\dy}{\varepsilon^2}=\frac{1}{\varepsilon^2}\iint_{D_\varepsilon}\left(1+1\right)\d A
          =\frac{2}{\varepsilon^2}\cdot\frac{\pi\varepsilon^2}{2}=\pi$$

        $$I=0+\pi=\boxed{\pi}$$
      `,
      comment: String.raw`
        **解法 3 值得单独消化**：它说明这道题里 $4x-y$ 的那个 $4x$ 完全是**烟雾弹**——
        ==径向部分一个子儿都不贡献==，答案只由 $\dfrac{-y\dx+x\dy}{4x^2+y^2}$ 决定。

        一般地，只要分子能拆成"$\text{某函数的全微分}+\lambda\left(-y\dx+x\dy\right)$"，
        ==前一半永远扔掉，只算后一半==。这在改编题里屡试不爽：
        出题人常在分子上加一堆看着吓人、实则是全微分的项。

        **反过来的用法**：如果哪天算出的答案与 $\varepsilon$ 有关，
        或者拆出来的"径向部分"不为零，一定是哪一步错了 ——
        [环域上 $Q_x=P_y$ 保证结果与洞无关](#/calculus/line-surface/green?at=digging-is-path-independence)。
      `,
    },

    { t: 'formulas', id: 'circulation', title: '环流速查（绕原点一圈，逆时针）', items: [
      { label: '标准型（务必背）', tex: String.raw`\oint_L\frac{-y\,\mathrm{d}x+x\,\mathrm{d}y}{x^{2}+y^{2}}=2\pi` },
      { label: '一般二次型分母', tex: String.raw`\oint_L\frac{-y\,\mathrm{d}x+x\,\mathrm{d}y}{ax^{2}+by^{2}}=\frac{2\pi}{\sqrt{ab}}\quad(a,b>0)` },
      { label: '本题（$a=4,b=1$）', tex: String.raw`\oint_L\frac{-y\,\mathrm{d}x+x\,\mathrm{d}y}{4x^{2}+y^{2}}=\frac{2\pi}{2}=\pi` },
      { label: '径向型：恒为零', tex: String.raw`\oint_L\frac{x\,\mathrm{d}x+y\,\mathrm{d}y}{x^{2}+y^{2}}=0` },
      { label: '绕 $n$ 圈 / 不绕', tex: String.raw`\oint_L\frac{-y\,\mathrm{d}x+x\,\mathrm{d}y}{x^{2}+y^{2}}=2\pi n,\qquad n=\text{绕数}` },
    ] },

    { t: 'key', id: 'why-2pi-over-sqrt-ab', title: '那条一般公式怎么来的（不用背，三行现推）', c: String.raw`
      挖洞取 $l:\;ax^2+by^2=\varepsilon^2$，分母恒为 $\varepsilon^2$，提出后对分子用格林：
      $$\oint_l\frac{-y\dx+x\dy}{ax^2+by^2}
        =\frac{1}{\varepsilon^2}\iint_{D_\varepsilon}\bigl(1-(-1)\bigr)\d A
        =\frac{2}{\varepsilon^2}\cdot S$$
      椭圆 $ax^2+by^2=\varepsilon^2$ 的半轴为 $\dfrac{\varepsilon}{\sqrt a},\dfrac{\varepsilon}{\sqrt b}$，
      面积 $S=\dfrac{\pi\varepsilon^2}{\sqrt{ab}}$，代入即得
      $$\oint_l=\frac{2\pi}{\sqrt{ab}} .$$

      ==$a=b=1$ 时退化成 $2\pi$==，和标准型对得上，可以拿来当验算。
      记住推法比记住公式可靠：**分母化常数 → 格林 → 常数 × 椭圆面积**，永远是这三步。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'workflow', c: '五、动作反射：固定五步' },

    { t: 'steps', id: 'five-steps', title: '拿到第二类曲线积分，按这个顺序走', items: [
      { title: '看曲线闭不闭合',
        c: String.raw`不闭合 $\Rightarrow$ ==先补线==（补最好算的那条，通常是坐标轴上的线段或直线），
          用格林算完整个闭路，再==减去补的那一段==。
          补线时记清方向，让补完之后整体是正向（逆时针）。` },

      { title: '★ 查奇点（在算任何偏导之前）',
        c: String.raw`看 $P,Q$ 的==分母、根号内、对数内==，找出使其失去意义的点；
          再判断这些点在不在 $L$ 围成的区域内部。
          ==这一步是整页的核心，也是最容易被跳过的一步==——
          它必须排在偏导计算前面，否则"偏导相等"的成就感会把它挤掉。` },

      { title: '算 $Q_x-P_y$',
        c: String.raw`这一步不管有没有奇点都要做，它决定后面二重积分要不要真算。
          ==算出相等不等于结束==，它只是告诉你"环域上那一块可以省"。` },

      { title: '按四种情况分头处理',
        c: String.raw`见[下面的对照表](#/calculus/line-surface/green?at=four-cases)。
          有奇点就挖洞，形状由==分母指定==，方向取与 $L$ 同向（逆时针）。` },

      { title: '收尾自查',
        c: String.raw`* 结果里还剩 $\varepsilon$ $\Rightarrow$ ==必错==；
          * 方向是顺时针的话，最后要==整体变号==；
          * $Q_x-P_y$ 是常数时，二重积分 = 常数 × 面积，别去硬积。` },
    ] },

    { t: 'compare', id: 'four-cases',
      title: '四种情况对照表',
      cols: ['$L$ 内有奇点吗', '$Q_x-P_y$', '做法', '结果'],
      rows: [
        ['无', '$=0$', '什么都不用做', '$0$'],
        ['无', '$\\ne 0$', '直接格林', '$\\displaystyle\\iint_D\\left(Q_x-P_y\\right)\\d A$'],
        ['==有==', '$=0$', '==挖洞==，换成分母恒为常数的小曲线', '小曲线上的积分（× 绕数）'],
        ['==有==', '$\\ne 0$', '挖洞 + ==环域==上的二重积分', '两部分相加，一个都不能少'],
        ['曲线不闭合', '—', '先补线成闭路，算完再减补的那段', '按上面四行继续判'],
      ] },

    { t: 'warn', id: 'pitfalls', title: '踩分点清单', c: String.raw`
      | 错误 | 后果 | 自查 |
      |---|---|---|
      | ==算完偏导相等就下结论为 $0$== | 整题作废（本题的原始错误） | ==查奇点必须排在算偏导之前== |
      | 挖洞形状随手挖成圆 | 分母不变常数，参数化后一团乱 | ==洞的形状由分母指定==：分母 $=\varepsilon^2$ |
      | 在原曲线 $L$ 上代入 $L$ 的方程去化简分母 | 白代，分母仍是变量 | 代入只在"分母恰好是曲线方程"时才有用 |
      | 环域格林时 $l$ 的方向弄反 | 差一个负号 | 记"同向两闭曲线积分相等"，别记环域正向 |
      | 有奇点 且 $Q_x\ne P_y$ 时只算了小曲线 | 漏掉环域二重积分 | ==只有 $Q_x=P_y$ 才能把环域那块扔掉== |
      | 补线后忘记减去补的那一段 | 多算一段 | 写式子时就写成 $\oint_{L+l_0}-\int_{l_0}$ |
      | $L$ 是顺时针却按逆时针算 | 符号相反 | 题面"顺时针"直接在结果前加负号 |
      | 结果里还带着 $\varepsilon$ | 必错 | 环流与洞的大小无关，$\varepsilon$ 一定约干净 |
    ` },

    { t: 'key', id: 'takeaway', title: '一句话收口', c: String.raw`
      $$\boxed{\ Q_x=P_y\ \text{说的是"路径可以换"，不是"积分等于零"}\ }$$

      * 区域==没有洞==：路径可以换到起点终点之间的任何一条，闭路自然为 $0$；
      * 区域==有洞==：路径只能换到绕数相同的另一条 —— ==挖洞法就是在用这个换法==，
        换完得到的那个非零常数叫环流。

      ==把这句话记成"偏导相等 ⟹ 为零"，就正好丢掉了考研在这里唯一想考的东西。==
    ` },

  ],
});
