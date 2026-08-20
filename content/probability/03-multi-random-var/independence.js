/* ==========================================================================
   概率论 / 3 多维随机变量及其分布 / 独立性判定
   —— 独立是"由边缘还原联合"的唯一入场券。
      事件的独立性见 events/independence；不相关见 moments/covariance。
   ========================================================================== */

KM.page({
  path: 'probability/multi-random-var/independence',
  title: '独立性判定',
  subtitle: '一句判据打天下：**支撑是矩形 + 密度能拆成 $g(x)h(y)$**，两条同时成立才独立',
  tags: ['小题', '概念辨析', '高频', '易错'],
  updated: '2026-08-20',

  blocks: [

    { t: 'key', id: 'def', title: '定义：联合分布函数能拆成乘积', c: String.raw`
      称随机变量 $X,Y$ **相互独立**，若==对一切实数 $x,y$==
      $$\boxed{\ F(x,y)=F_X(x)\,F_Y(y)\ }$$

      等价地：对任意区间（或更一般的集合）$A,B$，
      $$P(X\in A,\ Y\in B)=P(X\in A)\,P(Y\in B).$$

      ==这就是[事件独立](#/probability/events/independence?at=def-indep)推广到了"一族事件"上==：
      不是某一对事件独立，而是==由 $X$ 生成的所有事件与由 $Y$ 生成的所有事件两两独立==。

      **独立性的实际价值只有一条**：
      $$\text{独立}\ \Longrightarrow\ \text{联合} = \text{边缘的乘积}$$
      它是[边缘丢失的信息](#/probability/multi-random-var/joint?at=marginal-loses)
      唯一的补救办法，也因此成为后面所有计算的前提条件。
    ` },

    { t: 'key', id: 'criterion-discrete', title: '离散型判据：逐格验证', c: String.raw`
      $$X,Y\ \text{独立}\iff p_{ij}=p_{i\cdot}\,p_{\cdot j}\quad\text{对**所有**}\ i,j$$

      **操作**：把联合分布表的每一格和"对应的行和 $\times$ 列和"比一遍。

      ==判"不独立"只要找到**一格**不满足就够了==，
      而判"独立"必须==全部==格子都验证。
      考场上先扫一眼有没有 $p_{ij}=0$ 而 $p_{i\cdot}p_{\cdot j}>0$ 的格子——
      ==这种格子是最容易发现的破绽==。

      **等价的说法**：把每一行归一化（即算条件分布 $P(Y=\cdot\mid X=x_i)$），
      ==若所有行归一化之后完全相同，就独立==。
      这个说法更有直观意义："$X$ 取什么值都不影响 $Y$ 的分布"。
    ` },

    { t: 'key', id: 'criterion-continuous', title: '连续型判据：密度能拆', c: String.raw`
      $$X,Y\ \text{独立}\iff f(x,y)=f_X(x)\,f_Y(y)\quad\text{（几乎处处）}$$

      "几乎处处"的意思是==允许在面积为零的集合（若干条线）上不相等==，
      因为改动这种集合上的密度值不影响任何概率。
      所以考试中在分段线上不必纠结。

      **正规做法**：先求出 $f_X$ 与 $f_Y$，再验证乘积是否等于 $f$。
      ==这条路一定对，但慢==。下面的快速判据能省掉求边缘这一步。
    ` },

    { t: 'method', id: 'rect-support', title: '★ 快速判据：矩形支撑 + 可分离', c: String.raw`
      $$\boxed{\ X,Y\ \text{独立}\iff
      \begin{cases}\text{① 支撑区域是**矩形**}\ (a,b)\times(c,d)\ \text{（允许无穷）}\\[2pt]
      \text{② 在该矩形上}\ f(x,y)=g(x)\,h(y)\end{cases}}$$

      ==两条必须同时成立，缺一不可==。这是本章效率最高的一句话。

      **① 为什么支撑必须是矩形**：
      密度里其实藏着一个示性函数 $\mathbf 1_{D}(x,y)$。
      $D$ 若是三角形 $\set{0<y<x<1}$，
      ==$y$ 的取值范围依赖 $x$==，这个约束本身就不可分离，
      无论 $g,h$ 取什么都拆不开。

      **判别口诀**：==看积分限里有没有另一个字母==。
      求 $f_X$ 时若积分限写成 $\int_0^{x}$，就说明范围依赖 $x$，==立即判定不独立==。

      **② 常数可以随便挪**：$f=8xy$ 拆成 $g=8x,h=y$ 或 $g=x,h=8y$ 都行，
      ==常数因子会在"分别归一化"时自动定下来==，不必操心。

      **两个高频结论直接记住**：

      | 支撑 | 独立性 |
      |---|---|
      | 矩形（含全平面、半平面的乘积） | ==有可能独立==，再看能否拆 |
      | 三角形、圆盘、任何斜边或曲边区域 | ==必不独立== |

      **典型的"必不独立"**：$(X,Y)$ 在单位圆盘上均匀分布。
      密度是常数 $\frac1\pi$，看起来最"可分离"，
      但支撑是圆盘，==所以 $X,Y$ 不独立==（知道 $X=0.9$ 就把 $Y$ 限制在很窄的范围里）。
    ` },

    { t: 'key', id: 'separable-density', title: '拆出来之后，怎么定各自的常数', c: String.raw`
      若已判定独立且 $f(x,y)=g(x)h(y)$（在矩形 $(a,b)\times(c,d)$ 上），则
      $$f_X(x)=\frac{g(x)}{\int_a^b g},\qquad f_Y(y)=\frac{h(y)}{\int_c^d h},$$
      而归一性自动给出 $\left(\int_a^b g\right)\left(\int_c^d h\right)=1$。

      **例**：$f(x,y)=4xy$ 在 $(0,1)\times(0,1)$ 上。
      取 $g=x,h=y$，$\int_0^1x\dx=\frac12$，故
      $$f_X(x)=2x,\quad f_Y(y)=2y\quad(0<x,y<1),$$
      验证 $f_Xf_Y=4xy=f\ \checkmark$。

      ==注意和三角形上的 $f=8xy$ 对照==：
      被积函数一模一样，只因区域从正方形换成三角形，
      结论就从"独立"变成"不独立"，边缘也从 $2x$ 变成 $4x^{3}$。
      **区域比表达式更重要。**
    ` },

    { t: 'key', id: 'indep-of-functions', title: '独立性对函数是封闭的', c: String.raw`
      $$X,Y\ \text{独立}\ \Longrightarrow\ g(X),\ h(Y)\ \text{独立}$$
      对任意（可测）函数 $g,h$ 都成立。

      ==这条在做题时用得极多==：$X,Y$ 独立就自动有
      $X^{2}$ 与 $e^{Y}$ 独立、$\abs X$ 与 $\sin Y$ 独立、$2X+1$ 与 $Y^{3}$ 独立。

      **最重要的推论**：独立时
      $$\boxed{\ \E\bigl[g(X)h(Y)\bigr]=\E g(X)\cdot\E h(Y)\ }$$
      特别地 $\E(XY)=\E X\cdot\E Y$，于是
      $\Cov(X,Y)=0$——==独立必不相关==。
      反过来==不成立==，见[不相关不等于独立](#/probability/moments/covariance?at=indep-vs-uncorrelated)。

      **多维推广**：$X_1,\dots,X_n$ 相互独立时，
      ==分成互不相交的两组，各组内做任意运算，两组的结果仍然独立==。
      比如 $X_1+X_2$ 与 $X_3X_4$ 独立。
      这和[事件独立的封闭性](#/probability/events/independence?at=closure)是同一条性质。
    ` },

    { t: 'key', id: 'n-dim', title: '$n$ 维与独立同分布', c: String.raw`
      $X_1,\dots,X_n$ **相互独立**：
      $$F(x_1,\dots,x_n)=\prod_{i=1}^{n}F_{X_i}(x_i)\quad\text{对一切}\ x_1,\dots,x_n$$

      ==和事件的情形不同，随机变量这里"两两独立"仍然弱于"相互独立"==，
      但考研题中的多维独立性==几乎总是题目直接给定==（"设 $X_1,\dots,X_n$ 相互独立"），
      不需要自己验证。

      **独立同分布（i.i.d.）**：相互独立 + 每个 $X_i$ 的分布相同。
      这是第 5 章大数定律、中心极限定理和第 6 章数理统计里
      =="简单随机样本"的标准假设==。

      **两条最常用的推论**：
      $$\E\!\left(\sum X_i\right)=\sum\E X_i\quad(\text{不需要任何条件}),$$
      $$\Var\!\left(\sum X_i\right)=\sum\Var X_i\quad(\text{需要两两不相关}).$$
      ==期望的可加性无条件成立，方差的可加性有条件==——
      这个不对称是第 4 章的核心，见[方差的性质](#/probability/moments/expectation?at=var-props)。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-uniform-triangle',
      title: '同一个 $8xy$，换个区域结论就反过来',
      source: '对照例题',
      level: 2,
      problem: String.raw`
        判断下列两种情形中 $X,Y$ 是否独立：

        1. $f_1(x,y)=8xy$，$0<y<x<1$；
        2. $f_2(x,y)=4xy$，$0<x<1,\ 0<y<1$。
      `,
      idea: String.raw`
        ==两个密度的表达式都能写成"$x$ 的函数乘 $y$ 的函数"==，
        所以第 ② 条（可分离）都满足。
        差别只在第 ① 条：==支撑区域是不是矩形==。

        情形 1 的 $0<y<x<1$ 是三角形——
        "$y$ 的上界是 $x$"这句话本身就把两个变量绑在了一起，
        ==这是任何 $g(x)h(y)$ 都表达不出来的约束==。

        情形 2 的 $(0,1)\times(0,1)$ 是正方形，$x$ 和 $y$ 的范围互不干涉，
        ==这才是真正的"可分离"==。

        **这道对照题的意义**：它说明
        ==判独立时先看区域，再看表达式==，顺序不能反。
        很多人一看到 $8xy$ 就说"能拆，独立"，正好中招。
      `,
      solution: String.raw`
        **情形 1**：支撑 $\set{0<y<x<1}$ 是三角形，==不是矩形，故不独立==。

        验证（[上一页已算过](#/probability/multi-random-var/joint?at=ex-marginal)）：
        $$f_X(x)=4x^{3}\ (0<x<1),\qquad f_Y(y)=4y(1-y^{2})\ (0<y<1),$$
        $$f_X(x)f_Y(y)=16x^{3}y(1-y^{2})\ne8xy.$$

        **情形 2**：支撑是正方形，且 $4xy=(2x)(2y)$ 可分离，==故独立==。
        $$f_X(x)=\int_0^1 4xy\dy=2x\ (0<x<1),\qquad f_Y(y)=2y\ (0<y<1),$$
        $$f_X(x)f_Y(y)=4xy=f_2(x,y).\ \checkmark$$
      `,
      comment: String.raw`
        **一眼判定的流程（考场用）**：

        1. 画支撑区域。==不是矩形 $\Rightarrow$ 直接写"不独立"，结束==；
        2. 是矩形，则看密度能否写成 $g(x)h(y)$。能 $\Rightarrow$ 独立；
        3. 需要边缘时再去积分。

        ==第 1 步能在三秒内解决大多数选择题。==

        **常见的"矩形"伪装**：

        - $\set{x>0,\ y>0}$ 是矩形（第一象限，边长无穷）；
        - $\set{x>y>0}$ ==不是==；
        - $\set{x^{2}+y^{2}<1}$ ==不是==；
        - $\set{0<x<1,\ 0<y<2}$ 是。

        **反向的题型也要会**：题目说"已知 $X,Y$ 独立"，
        ==这就等于白送了 $f=f_Xf_Y$==，
        可以直接由两个边缘写出联合密度，
        这是求 $Z=X+Y$ 分布时[卷积公式](#/probability/multi-random-var/function-2d?at=sum-convolution)的前提。
      `,
    },

    { t: 'example',
      id: 'ex-check',
      title: '含参数的分布表：由独立性定参数',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        设 $(X,Y)$ 的联合分布律为

        | $X\backslash Y$ | $1$ | $2$ |
        |---|---|---|
        | $1$ | $\frac16$ | $a$ |
        | $2$ | $b$ | $\frac13$ |

        且 $X,Y$ 相互独立，求 $a,b$。
      `,
      idea: String.raw`
        **两个方程从哪来**：一个是归一性 $\frac16+a+b+\frac13=1$，
        另一个必须来自独立性。

        独立性给的是==四个==等式（每格一个），看似太多，
        但它们不是相互无关的——==有了归一性，四个里只有一个是新的==。
        取最方便的一格即可。

        **更快的一条路**：独立时联合分布表==每一行都成比例==
        （行 $i$ 的元素 $=p_{i\cdot}\times$ 同一组列比例）。
        于是
        $$\frac{p_{11}}{p_{12}}=\frac{p_{21}}{p_{22}}
        \ \Longrightarrow\ \frac{1/6}{a}=\frac{b}{1/3}.$$
        ==这个"交叉相乘"的形式比列 $p_{ij}=p_{i\cdot}p_{\cdot j}$ 好算得多==，
        因为它不牵涉边缘。
      `,
      solution: String.raw`
        **方程一（归一性）**：
        $$\frac16+a+b+\frac13=1\ \Longrightarrow\ a+b=\frac12.$$

        **方程二（独立性 $\Rightarrow$ 两行成比例）**：
        $$p_{11}p_{22}=p_{12}p_{21}\ \Longrightarrow\ \frac16\cdot\frac13=ab
        \ \Longrightarrow\ ab=\frac{1}{18}.$$

        于是 $a,b$ 是 $t^{2}-\frac12t+\frac1{18}=0$ 的两根，即
        $$18t^{2}-9t+1=0\ \Longrightarrow\ t=\frac{9\pm\sqrt{81-72}}{36}=\frac{9\pm3}{36},$$
        得 $t=\frac13$ 或 $t=\frac16$。

        **两组解都要验证**：

        - $a=\frac13,\ b=\frac16$：行和 $\frac12,\frac12$，列和 $\frac13,\frac23$，
          验 $p_{11}=\frac12\times\frac13=\frac16\ \checkmark$；
        - $a=\frac16,\ b=\frac13$：行和 $\frac13,\frac23$，列和 $\frac12,\frac12$，
          验 $p_{11}=\frac13\times\frac12=\frac16\ \checkmark$。

        故 $\boxed{(a,b)=\left(\tfrac13,\tfrac16\right)\ \text{或}\ \left(\tfrac16,\tfrac13\right)}$。
      `,
      comment: String.raw`
        **"两行成比例"是离散独立性最好用的等价形式**。
        $2\times2$ 表下它就是==对角线乘积相等==：
        $$p_{11}p_{22}=p_{12}p_{21}.$$
        这个式子和二阶行列式为零是一回事——
        ==独立等价于联合分布表（作为矩阵）的秩为 $1$==。
        秩为 $1$ 的矩阵恰好能写成"列向量 $\times$ 行向量"，
        也就是 $p_{ij}=p_{i\cdot}p_{\cdot j}$。
        这个视角在 $m\times n$ 表下同样成立，==比逐格验证快得多==。

        **两组解都合法这件事值得注意**：
        题目只要求独立，没有指定谁大谁小，==所以答案不唯一==。
        考试中漏掉一组是常见失分。
        ==解出二次方程时先问一句"两根是否都满足题设"==。

        **若题目改成"$X,Y$ 不独立"**，那就只能靠归一性给一个方程，
        $a+b=\frac12$ 加上 $ab\ne\frac{1}{18}$，==答案是一族==。
        这类题一般会再给一个条件（比如 $P(X=Y)$ 的值）来补足。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **只看密度能不能拆，不看支撑**：==本页头号错误==。
         $8xy$ 在三角形上不独立，在正方形上独立，
         见[对照例题](#/probability/multi-random-var/independence?at=ex-uniform-triangle)。
      2. **圆盘上的均匀分布当成独立**：密度是常数，但支撑不是矩形，==不独立==。
      3. **离散型只验一格就下"独立"的结论**：
         判不独立找一格就够，==判独立必须全查==（或用秩为 $1$ 的等价形式）。
      4. **把"不相关"当成"独立"**：独立 $\Rightarrow$ 不相关，==反之不成立==，
         见[辨析](#/probability/moments/covariance?at=indep-vs-uncorrelated)。
      5. **无条件使用 $\Var(X+Y)=\Var X+\Var Y$**：==需要不相关==，
         而 $\E(X+Y)=\E X+\E Y$ 是无条件的。
      6. **由边缘直接写联合**：只有独立时 $f=f_Xf_Y$ 才成立。
      7. **忘了独立对函数封闭**：$X,Y$ 独立时 $g(X),h(Y)$ 也独立，
         这条常被忘记而绕远路。
      8. **二次方程只取一个根**：含参数的独立性题常有两组解，==都要验、都要写==。
    ` },

  ],
});
