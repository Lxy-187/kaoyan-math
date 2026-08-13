/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 第一类曲面积分
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/first-kind-surface',
  title: '第一类曲面积分',
  subtitle: '$\\d S$ 是一块倾斜的面积，不是 $\\d x,\\d y,\\d z$ 的和。整章的算法都从「投影」这一件事长出来',
  tags: ['大题', '计算题', '数一', '高频'],
  updated: '2026-08-13',

  blocks: [

    /* ================================================================== */
    { t: 'h', id: 'what-is-ds', c: '一、$\\d S$ 到底是什么' },

    { t: 'key', id: 'ds-is-scalar', title: '$\\d S$ 是标量，不能被"展开"', c: String.raw`
      在曲面上切下一小块碎片，这块碎片的==面积大小==就是 $\d S$。它是一个**正的标量**。

      所以 $\d S$ ==不能==写成 $\d x+\d y+\d z$ 这类线性组合 ——
      面积和长度不是一个量纲的东西，加不起来。

      $\d S$ 与坐标微元之间只有一种关系：**倾斜面积 与 它的平面投影面积 之间的三角关系**。
      整个第一类曲面积分的计算体系，全部由这一条关系生成。
    ` },

    { t: 'key', id: 'projection-bridge', title: '桥梁公式：投影面积 = 原面积 × 夹角余弦', c: String.raw`
      设曲面在该点的单位法向量为 $\vec n^{\,0}=(\cos\alpha,\cos\beta,\cos\gamma)$，
      即 $\alpha,\beta,\gamma$ 分别是法向量与 $x,y,z$ 轴正向的夹角。则

      $$\d y\d z=\cos\alpha\,\d S,\qquad
        \d z\d x=\cos\beta\,\d S,\qquad
        \d x\d y=\cos\gamma\,\d S .$$

      为什么夹角是法向量的夹角：$\d S$ 所在平面与 $xOy$ 面的**二面角**，
      恰好等于两个平面各自法向量的夹角，而 $xOy$ 面的法向量就是 $z$ 轴。
      所以"面与面的倾斜程度"可以完全交给法向量来记录。

      ==这三条既是两类曲面积分互化的公式，也是所有 $\d S$ 换算公式的唯一来源。==
    ` },

    { t: 'insight', id: 'flashlight', title: '我的理解：手电筒光斑', c: String.raw`
      把倾斜的小面积 $\d S$ 看成一个手电筒的光斑，==垂直照射==到坐标平面这面墙上。

      * 正对着墙（法向量与轴平行，$\cos=1$）：影子和光斑一样大；
      * 越倾斜，影子被压得越扁；
      * 光斑垂直于墙（法向量与轴垂直，$\cos=0$）：影子退化成一条线，面积为 $0$。

      所以"投影面积 = 原面积 × 余弦"这件事==本来就该是余弦，不可能是别的函数==。
      反过来用：知道投影，想还原原面积，就得==除以余弦==——
      这就是后面所有 $\d S$ 公式里那个大于 $1$ 的根号的由来。
    ` },

    { t: 'warn', id: 'two-dxdy', title: '致命混淆：两个 $\\d x\\d y$ 长得一样，含义不同', c: String.raw`
      同一个记号 $\d x\d y$ 在两处出现，一处**带符号**，一处**不带**：

      | 出现的地方 | 含义 | 有没有符号 |
      |---|---|---|
      | 第二类曲面积分 $\iint_\Sigma P\,\d x\d y$ | 定义为 $\cos\gamma\,\d S$，$\gamma$ 取==指定侧==的法向量 | ==有正负==，取下侧就变号 |
      | 二重积分 $\iint_{D_{xy}} f\,\d x\d y$ | 平面上的几何面积微元 | ==恒正== |

      因此：
      * 化第一类为第二类时写 $\cos\gamma\,\d S=\d x\d y$，**不加绝对值**（符号靠"侧"承担）；
      * 化第一类为二重积分时写 $\d S=\dfrac{\d x\d y}{\abs{\cos\gamma}}$，**必须加绝对值**（面积不能为负）。

      ==看到绝对值就想到"这一步的终点是二重积分"，看不到绝对值就想到"终点是第二类"。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'standard-flow', c: '二、标准流程：一投、二代、三换' },

    { t: 'method', id: 'flow', title: '第一类曲面积分的通法只有一条路：降维成二重积分', c: String.raw`
      $$\iint_\Sigma f(x,y,z)\,\d S
        \;=\;\iint_{D_{xy}} f\bigl(x,\;y,\;z(x,y)\bigr)\,
        \sqrt{1+z_x'^2+z_y'^2}\;\d x\d y$$

      三个动作，缺一不可：

      1. **一投**——把曲面 $\Sigma$ 投影到某个坐标面，得到平面区域 $D_{xy}$，这是积分的新范围；
      2. **二代**——把曲面方程 $z=z(x,y)$ ==代进被积函数==，消掉第三个变量；
      3. **三换**——把 $\d S$ 换成 $\sqrt{1+z_x'^2+z_y'^2}\,\d x\d y$。

      投影到 $yOz$ 或 $zOx$ 面时公式同理轮换。
      ==选哪个坐标面投影，标准是"投影区域好描述、根号好算"，不是习惯性投 $xOy$。==
    ` },

    { t: 'warn', id: 'forget-substitute', title: '最高频失分点：忘了"二代"', c: String.raw`
      第一类曲面积分与二重积分的**唯一实质差别**，就是被积函数里的变量
      ==被曲面方程绑死了==。凡是点在 $\Sigma$ 上，$x,y,z$ 就必须满足曲面方程。

      于是可以（也必须）大胆代入化简：

      * $\Sigma:\;x^2+y^2+z^2=R^2$ $\Rightarrow$
        $\displaystyle\oiint_\Sigma (x^2+y^2+z^2)\,\d S=R^2\oiint_\Sigma \d S=R^2\cdot 4\pi R^2=4\pi R^4 .$
      * $\Sigma:\;z=\sqrt{x^2+y^2}$ $\Rightarrow$ 被积函数里的 $z$ 一律换成 $\sqrt{x^2+y^2}$。

      ==把曲面方程代进被积函数，这一步是"免费"的化简，先做再说。==
      很多题目的全部难度就在于看出这一步。

      **同一条规则在曲线积分里更值钱**：既然"代入"是免费的，
      那么当曲线可以自己挑的时候，就该==挑一条让代入见效的曲线==——
      [格林公式挖洞时"洞的形状由分母指定"](#/calculus/line-surface/green?at=dig-three-choices)
      正是这条规则的主动用法。
    ` },

    { t: 'warn', id: 'projection-traps', title: '投影的两个前提，破了就必须分片', c: String.raw`
      **前提一：投影必须单值（不重叠）。**
      整个球面 $x^2+y^2+z^2=R^2$ 往 $xOy$ 面投影时，上下半球压在同一个圆盘上。
      此时==绝不能==直接投，必须拆成 $z=\pm\sqrt{R^2-x^2-y^2}$ 两片分别算再相加
      （若被积函数关于 $z$ 是偶函数，就是"上半球 $\times 2$"）。

      **前提二：曲面不能与投影方向平行。**
      若曲面某处垂直于 $xOy$ 面（此时 $\cos\gamma=0$，$z_x',z_y'$ 不存在），
      往 $xOy$ 投影退化成一条线，公式失效。
      典型就是==圆柱侧面 $x^2+y^2=R^2$== —— 它在 $xOy$ 面的投影只是一个圆周。
      这时改投 $yOz$ / $zOx$ 面，或者直接用[柱面参数式](#/calculus/line-surface/first-kind-surface?at=ds-table)。

      ==看到"闭曲面"或"柱面"两个词，先问一句：这题能一次投影投完吗？==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'ds-formulas', c: '三、$\\d S$ 换算速查（按曲面的给法分类）' },

    { t: 'md', c: String.raw`
      下面五种全部是[桥梁公式](#/calculus/line-surface/first-kind-surface?at=projection-bridge)的马甲。
      ==先看题目把曲面写成了什么形状，再决定用哪一行==，不要一律硬解成 $z=z(x,y)$。
    ` },

    { t: 'compare', id: 'ds-table', title: '五种曲面给法 → 五种 $\\d S$', cols: ['曲面给法', '典型例子', '$\\d S$ 换算', '化成谁的二重积分'], rows: [
      ['显式 $z=z(x,y)$', '$z=x^2+y^2$、平面', '$\\sqrt{1+z_x^2+z_y^2}\\,\\d x\\d y$', '$D_{xy}$ 上的 $(x,y)$'],
      ['隐式 $F(x,y,z)=0$', '椭球面 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$', '$\\dfrac{\\sqrt{F_x^2+F_y^2+F_z^2}}{\\abs{F_z}}\\,\\d x\\d y$', '$D_{xy}$，需 $F_z\\neq0$'],
      ['球面 $x^2+y^2+z^2=R^2$', '整球、球冠、球带', '$R^2\\sin\\varphi\\,\\d\\varphi\\,\\d\\theta$', '$(\\varphi,\\theta)$ 矩形域'],
      ['柱面 $x^2+y^2=R^2$（侧面）', '柱面被平面截下的部分', '$R\\,\\d z\\,\\d\\theta$', '$(\\theta,z)$ 矩形域'],
      ['一般参数 $\\vec r(u,v)$', '环面、螺旋面', '$\\abs{\\vec r_u\\times\\vec r_v}\\,\\d u\\,\\d v=\\sqrt{EG-F^2}\\,\\d u\\,\\d v$', '$(u,v)$ 参数域'],
    ] },

    { t: 'key', id: 'derive-explicit', title: '显式公式的三行推导（记不住就现推）', c: String.raw`
      曲面 $z=z(x,y)$ 改写成隐式 $F(x,y,z)=z-z(x,y)=0$，法向量取梯度：
      $$\vec n=(F_x,F_y,F_z)=\left(-z_x',\;-z_y',\;1\right),\qquad
        \abs{\vec n}=\sqrt{1+z_x'^2+z_y'^2}.$$

      单位法向量的第三个分量就是 $\cos\gamma$：
      $$\cos\gamma=\frac{1}{\sqrt{1+z_x'^2+z_y'^2}} .$$

      代进 $\d S=\dfrac{\d x\d y}{\abs{\cos\gamma}}$（[为什么有绝对值](#/calculus/line-surface/first-kind-surface?at=two-dxdy)），即得
      $$\boxed{\;\d S=\sqrt{1+z_x'^2+z_y'^2}\;\d x\d y\;}$$

      隐式那一行同理：$\cos\gamma=\dfrac{F_z}{\sqrt{F_x^2+F_y^2+F_z^2}}$，取倒数加绝对值即可。
      ==根号里恒 $\ge 1$，这正对应"倾斜面积总不小于它的影子"。==
    ` },

    { t: 'insight', id: 'one-formula', title: '我的收获：这些公式其实是同一条', c: String.raw`
      教材上 $\d S$ 有五六个长相完全不同的公式，看起来要背一堆。
      但把它们全部倒回去，都是同一句话：

      $$\d S=\frac{\text{投影面积}}{\abs{\cos(\text{法向量与投影轴的夹角})}}$$

      * 显式给法：$\cos\gamma$ 用 $z_x',z_y'$ 算；
      * 隐式给法：$\cos\gamma$ 用 $F_x,F_y,F_z$ 算；
      * 球面/柱面：干脆不投影了，直接用几何量拼出小面积（$R\,\d\varphi \times R\sin\varphi\,\d\theta$）；
      * 一般参数：小面积由两个切向量张成的==平行四边形==，面积就是叉乘的模。

      ==所以真正要记的只有"投影 = 面积 × 余弦"这一条，剩下的现推都来得及。==
    ` },

    { t: 'formulas', id: 'geo-ds', title: '球面 / 柱面的 $\\d S$ 是"拼"出来的，不用投影', items: [
      { label: '球面：两条弧长相乘', tex: String.raw`\d S=\underbrace{R\,\d\varphi}_{\text{经线方向}}\times\underbrace{R\sin\varphi\,\d\theta}_{\text{纬线方向}}=R^2\sin\varphi\,\d\varphi\,\d\theta` },
      { label: '球面参数（$\\varphi$ 为天顶角）', tex: String.raw`\begin{cases}x=R\sin\varphi\cos\theta\\ y=R\sin\varphi\sin\theta\\ z=R\cos\varphi\end{cases}\ \ \varphi\in[0,\pi],\ \theta\in[0,2\pi]` },
      { label: '柱面：弧长 × 高', tex: String.raw`\d S=\underbrace{R\,\d\theta}_{\text{周向}}\times\underbrace{\d z}_{\text{轴向}}=R\,\d z\,\d\theta` },
      { label: '一般参数：切向量张成平行四边形', tex: String.raw`\d S=\abs{\vec r_u\times\vec r_v}\,\d u\,\d v` },
    ] },

    /* ================================================================== */
    { t: 'h', id: 'symmetry', c: '四、动笔之前先查对称性' },

    { t: 'method', id: 'symmetry-first', title: '优先级最高的一步：能对称掉的绝不硬算', c: String.raw`
      第一类曲面积分==没有方向问题==，对称性用起来比第二类干净得多，
      而且往往能把整道大题压缩成一行。**看到题先做这三个检查：**

      1. 曲面关于某个平面对称吗？→ 用[偶倍奇零](#/calculus/line-surface/first-kind-surface?at=odd-even)；
      2. 曲面方程里 $x,y,z$ 地位平等吗？→ 用[轮换对称性](#/calculus/line-surface/first-kind-surface?at=rotational)；
      3. 被积函数是一次的（$x$、$y$、$z$）吗？→ 用[形心公式](#/calculus/line-surface/first-kind-surface?at=centroid)。

      ==三条全部失败，才轮到"一投二代三换"。==
    ` },

    { t: 'key', id: 'odd-even', title: '偶倍奇零：关键是"关于哪个平面"，不是"关于原点"', c: String.raw`
      设曲面 $\Sigma$ 关于平面 $z=c$ 对称（对称映射 $z\mapsto 2c-z$）：

      $$\iint_\Sigma f\,\d S=
      \begin{cases}
      0, & f\bigl(x,y,2c-z\bigr)=-f(x,y,z)\quad(\text{奇}),\\[4pt]
      2\displaystyle\iint_{\Sigma_{z\ge c}} f\,\d S, & f\bigl(x,y,2c-z\bigr)=f(x,y,z)\quad(\text{偶}).
      \end{cases}$$

      ==对称平面不必是坐标面。== 球心在 $(a,a,a)$ 的球面，关于 $x=a$、$y=a$、$z=a$ 都对称，
      于是 $(x-a)$、$(y-a)$、$(z-a)$ 在其上的积分全为零 ——
      这正是[主例题解法 1](#/calculus/line-surface/first-kind-surface?at=ex-shifted-sphere) 一行秒杀的原理。

      **所以看到被积函数里出现 $(x-a)$ 这种"偏移量"，要立刻反查：曲面是不是以 $x=a$ 为对称面？**
    ` },

    { t: 'key', id: 'rotational', title: '轮换对称性：看曲面方程，不是看被积函数', c: String.raw`
      若把曲面方程中的 $x,y,z$ 任意轮换后**方程不变**（如球面 $x^2+y^2+z^2=R^2$、
      正八面体面 $\abs x+\abs y+\abs z=1$），则

      $$\iint_\Sigma f(x)\,\d S=\iint_\Sigma f(y)\,\d S=\iint_\Sigma f(z)\,\d S .$$

      标准用法是==把偏心的被积函数补成对称的，再除以 3==：
      $$\oiint_\Sigma x^2\,\d S=\frac13\oiint_\Sigma\bigl(x^2+y^2+z^2\bigr)\d S
       =\frac13 R^2\cdot 4\pi R^2=\frac{4}{3}\pi R^4 .$$

      注意判定对象：==是曲面方程轮换不变，跟被积函数长什么样无关==。
      抛物面 $z=x^2+y^2$ 只在 $x\leftrightarrow y$ 之间对称，不能把 $z$ 也轮换进去。
    ` },

    { t: 'key', id: 'centroid', title: '形心公式：一次项的终极偷懒', c: String.raw`
      由形心定义 $\bar x=\dfrac{1}{S}\displaystyle\iint_\Sigma x\,\d S$ 直接反解：
      $$\iint_\Sigma x\,\d S=\bar x\,S,\qquad
        \iint_\Sigma y\,\d S=\bar y\,S,\qquad
        \iint_\Sigma z\,\d S=\bar z\,S .$$

      只要曲面的形心位置一眼可见（球面形心 = 球心，柱面形心在轴上中点），
      被积函数又是==一次的==，答案直接写出来。

      对球心 $(a,a,a)$、半径 $\sqrt2 a$ 的球面：$S=8\pi a^2$，$\bar x=\bar y=\bar z=a$，于是
      $\oiint (x+y+z)\d S=3a\cdot 8\pi a^2$ —— [主例题](#/calculus/line-surface/first-kind-surface?at=ex-shifted-sphere)还能再快一步。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'convert', c: '五、化成第二类：什么时候值得，什么时候是自杀' },

    { t: 'insight', id: 'not-routine', title: '我的结论：这不是流程化做法', c: String.raw`
      把第一类曲面积分转成第二类，==在绝大多数情况下计算量会爆炸==。

      它是**特殊技巧**，不是通法。强行使用要付两笔代价：
      一是得凭空构造出方向余弦项（而一般曲面的方向余弦本身就带一个丑根号），
      二是会打破被积函数原有的代数结构，转完往往更难积。

      ==第一类曲面积分的标准动作永远是"投影降维成二重积分"。==
      互化只在下面那张触发条件全中的时候才用。
    ` },

    { t: 'method', id: 'when-convert', title: '三个条件同时满足才转（缺一不转）', c: String.raw`
      | 条件 | 为什么必需 |
      |---|---|
      | ① 被积函数==恰好是法向量分量的常数倍== | 否则凑不出 $\cos\alpha$，转化无从下手 |
      | ② 曲面是==封闭==的（$\oiint$） | 否则转成第二类也用不了高斯公式，白转 |
      | ③ 转出的向量场==散度很简单==（常为 $0$ 或常数） | 否则三重积分比原题还难 |

      条件 ① 的识别信号非常具体：**曲面是球面（或球面平移），且被积函数里出现
      $(x-x_0)$、$(y-y_0)$、$(z-z_0)$ 的一次组合**。
      因为球面的法向量恰好是 $\bigl(x-x_0,\,y-y_0,\,z-z_0\bigr)$，模长恒为半径 $R$，
      ==这个"模长是常数"的巧合，是整个技巧成立的唯一支点==。

      三步走：
      $$(x-x_0)=R\cos\alpha
        \;\xrightarrow{\ \cos\alpha\,\d S=\d y\d z\ }\;
        R\iint_\Sigma \d y\d z
        \;\xrightarrow{\ \text{高斯}\ }\;
        R\iiint_V \operatorname{div}\vec F\,\d V .$$
    ` },

    { t: 'warn', id: 'orientation', title: '转化时必须钉死"侧"', c: String.raw`
      第一类积分==没有侧==，第二类==有侧==。
      写下 $\cos\alpha\,\d S=\d y\d z$ 的那一刻，就等于宣布：
      第二类积分取的侧，==就是你算 $\cos\alpha$ 时所用的那个法向量的指向==。

      * 用外法向量 $\Rightarrow$ 第二类取**外侧** $\Rightarrow$ 高斯公式直接用；
      * 若不慎用了内法向量，$\cos\alpha$ 全部变号，最后结果==差一个负号==，
        且这种错误算出来的数看着完全正常。

      **自查**：球面外法向量指向背离球心，所以 $\vec n=\bigl(x-x_0,y-y_0,z-z_0\bigr)$
      （不带负号）就是外法向量。写完先确认这一点再往下走。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '六、例题' },

    { t: 'example',
      id: 'ex-shifted-sphere',
      title: '偏心球面上的一次函数：一道题三种打法',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle I=\oiint_\Sigma\bigl(x+y+z-\sqrt3\,a\bigr)\d S$，
        其中 $\Sigma$ 为球面 $(x-a)^2+(y-a)^2+(z-a)^2=2a^2$，$a>0$。
      `,
      openIdea: true,
      idea: String.raw`
        **第一眼要抓的两个信息：**

        1. 球心在 $(a,a,a)$ 而==不在原点==，半径 $R=\sqrt2\,a$，故 $S=4\pi R^2=8\pi a^2$。
           球心不在原点，意味着"关于坐标面对称"这类现成结论==全部失效==，
           必须把对称中心找回来。
        2. 被积函数是==一次==的。一次 + 球面，几乎必然不用真积。

        **于是唯一的动作是配凑成"相对球心的偏移量"：**
        $$x+y+z-\sqrt3\,a=(x-a)+(y-a)+(z-a)+\bigl(3-\sqrt3\bigr)a .$$

        这一步为什么必然要做：球面的一切好性质（对称面、法向量、形心）都是
        ==相对球心==说的，只要变量还写成 $x$，就用不上；写成 $x-a$，三条路同时打开。

        配凑完，变量部分 $\displaystyle\oiint\bigl[(x-a)+(y-a)+(z-a)\bigr]\d S$
        用下面任意一种方法都是 $0$，常数部分直接乘表面积。
      `,
      solution: String.raw`
        **配凑：**
        $$I=\oiint_\Sigma\bigl[(x-a)+(y-a)+(z-a)\bigr]\d S+\bigl(3-\sqrt3\bigr)a\oiint_\Sigma \d S .$$
        记前一项为 $I_1$。

        ---

        **解法 1（对称性，推荐）**

        $\Sigma$ 关于平面 $x=a$ 对称：作对称映射 $x\mapsto 2a-x$，被积项
        $(2a-x)-a=-(x-a)$，即 $(x-a)$ 在该对称下为==奇函数==。故
        $$\oiint_\Sigma(x-a)\,\d S=0 .$$
        同理关于 $y=a$、$z=a$ 对称给出另两项为 $0$，所以 $I_1=0$。

        ---

        **解法 2（形心公式，最快）**

        球面形心即球心 $(\bar x,\bar y,\bar z)=(a,a,a)$，于是
        $$\oiint_\Sigma x\,\d S=a S,\quad\text{三项相加}\quad
          \oiint_\Sigma(x+y+z)\,\d S=3aS,$$
        减去 $3a\cdot S$ 即得 $I_1=0$。

        ---

        **解法 3（化第二类 + 高斯公式，通法但绕）**

        球面外法向量 $\vec n=2(x-a,\;y-a,\;z-a)$，模长 $2\sqrt2\,a$，故单位外法向量
        $$\vec n^{\,0}=\left(\frac{x-a}{\sqrt2\,a},\;\frac{y-a}{\sqrt2\,a},\;\frac{z-a}{\sqrt2\,a}\right)
          =(\cos\alpha,\cos\beta,\cos\gamma),$$
        ==注意这里分母是常数==（因为球面上每点到球心距离恒为 $\sqrt2 a$），这是本题能转的关键。
        反解得 $x-a=\sqrt2\,a\cos\alpha$ 等，代入并用 $\cos\alpha\,\d S=\d y\d z$：
        $$I_1=\sqrt2\,a\oiint_\Sigma(\cos\alpha+\cos\beta+\cos\gamma)\,\d S
             =\sqrt2\,a\oiint_{\Sigma_{\text{外}}}\bigl(\d y\d z+\d z\d x+\d x\d y\bigr) .$$
        对 $\vec F=(1,1,1)$ 用高斯公式，$\operatorname{div}\vec F=0+0+0=0$，故
        $$I_1=\sqrt2\,a\iiint_V 0\,\d V=0 .$$

        ---

        **收尾（三种解法共用）**
        $$I=0+\bigl(3-\sqrt3\bigr)a\cdot 8\pi a^2=\boxed{\,8\bigl(3-\sqrt3\bigr)\pi a^3\,}$$
      `,
      comment: String.raw`
        **三种解法的关系**：解法 3 是"通法"，但它能走通完全依赖一个巧合 ——
        ==球面法向量的模长是常数==，才使得 $x-a$ 与 $\cos\alpha$ 只差一个常数倍。
        换成椭球面，这条路当场断掉，而解法 1、2 依然有效。
        所以考场上的顺序应当是 **形心 → 对称性 → 投影硬算**，互化排在最后。

        **命题人埋的点**：$-\sqrt3\,a$ 这个系数看着别扭，其实只是为了让答案不那么整齐、
        逼你老老实实做配凑。真正的考点只有一个：==球心不在原点时，先平移视角再谈对称==。

        **同类变形**：把被积函数换成 $(x+y+z)^2$，就不能靠奇偶性了，
        但配凑成 $\bigl[(x-a)+(y-a)+(z-a)+3a\bigr]^2$ 展开后，
        交叉项 $(x-a)(y-a)$ 仍关于 $x=a$ 为奇 $\to 0$，
        平方项用[轮换对称性](#/calculus/line-surface/first-kind-surface?at=rotational)
        合并成 $\frac13\oiint\bigl[(x-a)^2+(y-a)^2+(z-a)^2\bigr]\d S=\frac13\cdot 2a^2 S$。
      `,
    },

    { t: 'example',
      id: 'ex-rotational',
      title: '轮换对称性的标准动作：把偏心项补全再除以 3',
      level: 2,
      problem: String.raw`
        设 $\Sigma:\;x^2+y^2+z^2=R^2$，计算 $\displaystyle\oiint_\Sigma\bigl(x^2+2y^2\bigr)\d S$。
      `,
      idea: String.raw`
        直接投影要拆上下半球、还要处理 $\sqrt{R^2-x^2-y^2}$ 的根号，是明显的下策。

        看曲面方程：$x,y,z$ 完全平等 $\Rightarrow$ ==轮换对称性可用==。
        轮换对称性的用法不是"直接算"，而是"==把缺的项补齐，凑出能用曲面方程消掉的整体=="。
        这里唯一能被曲面方程消掉的整体是 $x^2+y^2+z^2=R^2$，所以目标就是把
        $x^2$、$y^2$ 各自还原成 $\frac13(x^2+y^2+z^2)$。
      `,
      solution: String.raw`
        由轮换对称性，
        $$\oiint_\Sigma x^2\,\d S=\oiint_\Sigma y^2\,\d S=\oiint_\Sigma z^2\,\d S
          =\frac13\oiint_\Sigma\bigl(x^2+y^2+z^2\bigr)\d S .$$
        在 $\Sigma$ 上 $x^2+y^2+z^2=R^2$（这一步就是"二代"），且 $S=4\pi R^2$，故
        $$\oiint_\Sigma x^2\,\d S=\frac13 R^2\cdot 4\pi R^2=\frac43\pi R^4 .$$
        于是
        $$\oiint_\Sigma\bigl(x^2+2y^2\bigr)\d S=3\oiint_\Sigma x^2\,\d S=4\pi R^4 .$$
      `,
      comment: String.raw`
        ==这个 $\frac43\pi R^4$ 建议直接背下来==，它是球面上二次型积分的通用零件：
        $\oiint x^2\d S=\oiint y^2\d S=\oiint z^2\d S=\frac43\pi R^4$，
        而 $\oiint xy\,\d S=0$（关于 $y=0$ 为奇）。
        有了这两条，球面上任意二次型 $\oiint(Ax^2+By^2+Cz^2+Dxy+Eyz+Fzx)\d S$
        当场就能写出答案 $\frac43\pi R^4(A+B+C)$。
      `,
    },

    { t: 'example',
      id: 'ex-cone',
      title: '通法演练：锥面投影，一投二代三换',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\iint_\Sigma z\,\d S$，其中 $\Sigma$ 为锥面 $z=\sqrt{x^2+y^2}$
        被柱面 $x^2+y^2\le 1$ 截下的部分。
      `,
      idea: String.raw`
        曲面不封闭、不是球面、也没有能用的奇偶性（$z\ge0$ 恒成立，谈不上奇函数），
        对称性三连全部失败 $\Rightarrow$ ==老老实实走通法==。

        锥面是标准的显式给法 $z=z(x,y)$，投影区域就是题目直接给的单位圆盘，
        所以三个动作都没有难点。唯一值得记住的是：==锥面 $z=\sqrt{x^2+y^2}$ 的
        $\d S=\sqrt2\,\d x\d y$ 是个常数==，因为锥面处处与 $xOy$ 面成 $45^\circ$。
      `,
      solution: String.raw`
        **一投**：$D_{xy}:\;x^2+y^2\le 1$。

        **三换**：
        $$z_x'=\frac{x}{\sqrt{x^2+y^2}},\quad z_y'=\frac{y}{\sqrt{x^2+y^2}},\quad
          \sqrt{1+z_x'^2+z_y'^2}=\sqrt{1+\frac{x^2+y^2}{x^2+y^2}}=\sqrt2 .$$

        **二代**：被积函数 $z=\sqrt{x^2+y^2}$。于是
        $$\iint_\Sigma z\,\d S=\sqrt2\iint_{D_{xy}}\sqrt{x^2+y^2}\;\d x\d y
          =\sqrt2\int_0^{2\pi}\!\!\d\theta\int_0^1 r\cdot r\,\d r
          =\sqrt2\cdot 2\pi\cdot\frac13=\frac{2\sqrt2}{3}\pi .$$
      `,
      comment: String.raw`
        **值得固化的两个常数**：
        锥面 $z=\sqrt{x^2+y^2}$ 给 $\d S=\sqrt2\,\d x\d y$；
        平面 $z=Ax+By+C$ 给 $\d S=\sqrt{1+A^2+B^2}\,\d x\d y$。
        这两类曲面的根号是常数，可以直接提到积分号外，题目难度会掉一个档次。

        **易错**：锥面顶点处 $z_x',z_y'$ 不存在，严格说是一个奇点。
        但它是==零面积的单点==，不影响积分值，考试中直接忽略即可，不必讨论。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'checklist', c: '七、做题动作与自查' },

    { t: 'steps', id: 'steps', title: '拿到第一类曲面积分的固定顺序', items: [
      { title: '先把曲面方程代进被积函数',
        c: String.raw`免费化简，常常一步就把 $x^2+y^2+z^2$ 变成常数 $R^2$。
                      ==这一步永远先做==，见[二代](#/calculus/line-surface/first-kind-surface?at=forget-substitute)。` },
      { title: '查对称性三连',
        c: String.raw`形心（一次项）→ 偶倍奇零（关于某平面奇）→ 轮换对称（补齐再除以 3）。
                      ==注意对称面可以不是坐标面==，球心平移过的题就靠这一点。` },
      { title: '判断是不是"球面 + 法向量型"',
        c: String.raw`只有[三条件全中](#/calculus/line-surface/first-kind-surface?at=when-convert)
                      才化成第二类去用高斯公式，否则不要转。` },
      { title: '走通法：一投、二代、三换',
        c: String.raw`选投影面的标准是根号好算、区域好描述；
                      先确认==投影不重叠、曲面不垂直于投影面==，否则分片。` },
      { title: '化完的二重积分照常处理',
        c: String.raw`出现 $x^2+y^2$ 就上极坐标。到这一步为止，曲面积分的内容已经全部结束了。` },
    ] },

    { t: 'warn', id: 'pitfalls', title: '踩分点清单', c: String.raw`
      | 错误 | 后果 | 自查方式 |
      |---|---|---|
      | 忘记把曲面方程代入被积函数 | 算成了另一道题 | 写下二重积分前，检查被积函数里还有没有第三个变量 |
      | $\d S$ 的根号忘了或写成 $1$ | 结果偏小 | 根号必 $\ge1$，等于 $1$ 只在曲面为水平平面时 |
      | 化二重积分时漏绝对值 | 曲面在下方时结果变号 | ==第一类的结果只要 $f\ge0$ 就必须 $\ge0$==，负数一定错 |
      | 闭曲面直接投影不分片 | 少算一半 | 见到 $\oiint$ 先想"投影会不会重叠" |
      | 用轮换对称性时看的是被积函数 | 用错前提 | 轮换的判定对象==只能是曲面方程== |
      | 化第二类时用了内法向量 | 差一个负号 | 球面外法向量 $=(x-x_0,y-y_0,z-z_0)$，不带负号 |
      | 把第一类也讨论"侧" | 概念错误 | ==$\d S$ 是面积，恒正，永远无侧== |
    ` },

  ],
});
