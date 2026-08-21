/* ==========================================================================
   高等数学 / 11 曲线积分与曲面积分 / 第一类 / 第二类曲线积分
   —— 两类曲线积分的区别与计算。格林公式见 line-surface/green。
   ========================================================================== */

KM.page({
  path: 'calculus/line-surface/line-integral',
  title: '第一类 / 第二类曲线积分',
  subtitle: '第一类**没有方向**（算质量），第二类**有方向**（算做功）。计算上都是"参数化 $\\to$ 化成一元定积分"',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'compare',
      id: 'two-kinds',
      title: '★ 两类曲线积分总对照',
      cols: ['', '第一类（对弧长）', '第二类（对坐标）'],
      rows: [
        ['记号', '$\\displaystyle\\int_Lf\\ds$', '$\\displaystyle\\int_LP\\dx+Q\\dy$'],
        ['物理意义', '==曲线的质量==（$f$ 为线密度）', '==变力沿曲线做的功=='],
        ['有无方向', '==无==', '==有=='],
        ['方向反转', '值==不变==', '==变号=='],
        ['微元', '$\\ds=\\sqrt{1+y\'^{2}}\\dx>0$', '$\\dx,\\dy$ ==可正可负=='],
        ['积分限', '==下限 $<$ 上限==（$\\ds>0$）', '==起点到终点==（可以下限 $>$ 上限）'],
        ['能否用对称性', '能（偶倍奇零）', '==要小心方向=='],
      ] },

    { t: 'key', id: 'first-kind', title: '第一类：参数化后 $\\d s$ 恒为正', c: String.raw`
      $$\int_Lf(x,y)\ds$$

      **三种参数化的公式**：

      | $L$ 的形式 | $\ds$ | 积分 |
      |---|---|---|
      | $y=y(x),\ a\le x\le b$ | $\sqrt{1+y'^{2}}\dx$ | $\displaystyle\int_a^{b}f\bigl(x,y(x)\bigr)\sqrt{1+y'^{2}}\dx$ |
      | $\begin{cases}x=x(t)\\y=y(t)\end{cases},\ \alpha\le t\le\beta$ | $\sqrt{x'^{2}+y'^{2}}\dt$ | $\displaystyle\int_{\alpha}^{\beta}f\sqrt{x'^{2}+y'^{2}}\dt$ |
      | $r=r(\theta)$ | $\sqrt{r^{2}+r'^{2}}\dtheta$ | 同上 |

      $$\boxed{\ \text{下限必须小于上限}\ }$$
      ==因为 $\ds>0$ 表示弧长微元，是正的==。
      **写成上限小于下限会得到负的"质量"，明显荒谬。**

      **最重要的化简技巧：代入曲线方程。**
      ==被积函数中的 $x,y$ 满足曲线方程，可以直接代进去化简==：
      $$\int_L\left(x^{2}+y^{2}\right)\ds,\quad L:\ x^{2}+y^{2}=a^{2}
      \ \Longrightarrow\ =a^{2}\int_L\ds=a^{2}\cdot2\pi a=2\pi a^{3}.$$
      ==一步完成，完全不用参数化==。

      **$\int_L\ds=$ 曲线的弧长**，这是最基本的事实，==常用来收尾==。
    ` },

    { t: 'key', id: 'second-kind', title: '★ 第二类：方向决定一切', c: String.raw`
      $$\int_LP(x,y)\dx+Q(x,y)\dy$$

      **参数化后的公式**：设 $L$ 从 $t=\alpha$ 到 $t=\beta$（==按方向==），
      $$\int_LP\dx+Q\dy=\int_{\alpha}^{\beta}\left[P\bigl(x(t),y(t)\bigr)x'(t)
      +Q\bigl(x(t),y(t)\bigr)y'(t)\right]\dt$$

      $$\boxed{\ \alpha\ \text{是**起点**对应的参数，}\beta\ \text{是**终点**的，与大小无关}\ }$$
      ==这是与第一类最大的区别==：
      第二类的上下限==由方向决定==，完全可能出现 $\alpha>\beta$。

      **方向反转变号**：
      $$\int_{L^{-}}P\dx+Q\dy=-\int_LP\dx+Q\dy$$
      ==而第一类 $\int_{L^{-}}f\ds=\int_Lf\ds$（不变）==。

      **计算的三步**：

      1. ==写出参数方程==，并确定起点、终点对应的参数值；
      2. ==把 $\dx,\dy$ 都换成 $\dt$==（$\dx=x'\dt$）；
      3. 化成一元定积分，==按"起点 $\to$ 终点"写上下限==。

      **常用参数化**：

      | 曲线 | 参数方程 |
      |---|---|
      | 圆 $x^{2}+y^{2}=a^{2}$（==逆时针==） | $x=a\cos t,\ y=a\sin t$，$t:0\to2\pi$ |
      | 直线段 $A\to B$ | $\vec r=A+t(B-A)$，$t:0\to1$ |
      | $y=f(x)$，从 $x=a$ 到 $x=b$ | 直接用 $x$ 作参数 |

      ==用 $x$ 作参数时，若曲线是"从右往左"走，则上限小于下限==，
      **这是合法的，不要擅自调换。**

      **两类之间的联系**：
      $$\int_LP\dx+Q\dy=\int_L\left(P\cos\alpha+Q\cos\beta\right)\ds,$$
      其中 $(\cos\alpha,\cos\beta)$ 是==切线方向的方向余弦==。
      ==即"第二类 $=$ 第一类 $\times$ 方向投影"==。
    ` },

    { t: 'method', id: 'strategy', title: '第二类的四条路线', c: String.raw`
      | 情形 | 方法 |
      |---|---|
      | 曲线简单、易参数化 | ==直接参数化== |
      | ==$L$ 是封闭曲线==、$P,Q$ 有连续偏导 | ==[格林公式](#/calculus/line-surface/green?at=five-steps)== |
      | $L$ 不封闭但 $\pd Qx=\pd Py$ | ==[路径无关](#/calculus/line-surface/green?at=digging-is-path-independence)==，换成折线 |
      | $L$ 不封闭、格林用不了 | ==补线成封闭==，再减掉补的部分 |

      **第四条是最常用的技巧**：
      $$\int_L=\oint_{L+L_1}-\int_{L_1},$$
      ==补一条好算的线段 $L_1$ 把 $L$ 封闭起来==，
      对封闭曲线用格林公式，再单独算 $L_1$ 上的积分减掉。

      ==补线时要注意方向==：补完之后整条闭曲线要么全逆时针、要么全顺时针，
      ==格林公式要求逆时针为正==。

      **动手前先查 $\pd Qx-\pd Py$**：
      ==若它恒为零，多半是路径无关题==（挑最简单的路径走）；
      ==若它是个常数或简单函数，格林公式会很好用==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-first',
      title: '第一类：代入曲线方程化简',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        计算 $\displaystyle\int_L\left(x^{2}+y^{2}+z^{2}\right)\ds$，
        其中 $L$ 是螺旋线
        $$x=a\cos t,\quad y=a\sin t,\quad z=bt,\qquad 0\le t\le2\pi.$$
      `,
      idea: String.raw`
        **先化简被积函数**（[代入曲线方程](#/calculus/line-surface/line-integral?at=first-kind)）：
        $$x^{2}+y^{2}=a^{2}\cos^{2}t+a^{2}\sin^{2}t=a^{2},$$
        ==所以被积函数 $=a^{2}+b^{2}t^{2}$==，只含 $t$，简单多了。

        **算 $\ds$**：
        $$x'=-a\sin t,\quad y'=a\cos t,\quad z'=b,$$
        $$\ds=\sqrt{x'^{2}+y'^{2}+z'^{2}}\dt=\sqrt{a^{2}\sin^{2}t+a^{2}\cos^{2}t+b^{2}}\dt
        =\sqrt{a^{2}+b^{2}}\dt.$$
        ==$\ds$ 是常数乘 $\dt$==——螺旋线是"匀速"参数化的，
        **这让积分变得很简单。**

        **组装**：
        $$\int_0^{2\pi}\left(a^{2}+b^{2}t^{2}\right)\sqrt{a^{2}+b^{2}}\dt.$$
        ==下限 $0$ 小于上限 $2\pi$== $\checkmark$（第一类的要求）。
      `,
      solution: String.raw`
        **化简被积函数**：在 $L$ 上
        $$x^{2}+y^{2}=a^{2}\left(\cos^{2}t+\sin^{2}t\right)=a^{2},\qquad z^{2}=b^{2}t^{2},$$
        故被积函数为 $a^{2}+b^{2}t^{2}$。

        **计算 $\ds$**：
        $$\ds=\sqrt{\left(-a\sin t\right)^{2}+\left(a\cos t\right)^{2}+b^{2}}\dt
        =\sqrt{a^{2}+b^{2}}\dt.$$

        **代入**：
        $$\int_L\left(x^{2}+y^{2}+z^{2}\right)\ds
        =\sqrt{a^{2}+b^{2}}\int_0^{2\pi}\left(a^{2}+b^{2}t^{2}\right)\dt$$
        $$=\sqrt{a^{2}+b^{2}}\left[a^{2}t+\frac{b^{2}t^{3}}{3}\right]_0^{2\pi}$$
        $$=\sqrt{a^{2}+b^{2}}\left(2\pi a^{2}+\frac{8\pi^{3}b^{2}}{3}\right)$$
        $$=\frac{2\pi}{3}\sqrt{a^{2}+b^{2}}\left(3a^{2}+4\pi^{2}b^{2}\right).$$
      `,
      comment: String.raw`
        **量级检查**：令 $b=0$（螺旋线退化成圆），
        $$S=\frac{2\pi}{3}\cdot a\cdot3a^{2}=2\pi a^{3},$$
        ==而圆上 $x^{2}+y^{2}=a^{2}$ 恒成立，积分 $=a^{2}\times$ 周长 $=a^{2}\cdot2\pi a=2\pi a^{3}$== $\checkmark$
        **退化检验是应用题和曲线积分最有效的自检。**

        **"代入曲线方程"这一步的威力**：
        本题若不化简，要处理 $a^{2}\cos^{2}t+a^{2}\sin^{2}t+b^{2}t^{2}$，
        ==虽然也能算，但多了一层三角运算==。

        更极端的例子：
        $$\int_L e^{\sqrt{x^{2}+y^{2}}}\ds,\quad L:\ x^{2}+y^{2}=a^{2}
        \ \Longrightarrow\ =e^{a}\cdot2\pi a,$$
        ==一步出答案==。
        $$\boxed{\ \text{第一类曲线积分：先把曲线方程代进被积函数}\ }$$

        **第一类的对称性也很好用**：
        $L$ 关于 $y$ 轴对称、$f$ 关于 $x$ 是奇函数 $\Rightarrow$ 积分为零。
        ==与[重积分的对称性](#/calculus/multi-integral/symmetry?at=core)完全一样==，
        **而且第一类没有方向问题，用起来比第二类干净**
        （见[第一类曲面积分](#/calculus/line-surface/first-kind-surface?at=symmetry-first)）。

        **常见错误**：把 $\ds$ 写成 $\dt$（漏掉 $\sqrt{x'^{2}+y'^{2}+z'^{2}}$）。
        ==本题这个因子是常数 $\sqrt{a^{2}+b^{2}}$，漏了很难发现==，
        所以要养成"先算 $\ds$"的习惯。
      `,
    },

    { t: 'example',
      id: 'ex-second',
      title: '★ 第二类：同一段路径，两种走法',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle\int_L 2xy\dx+x^{2}\dy$，其中 $L$ 为从 $O(0,0)$ 到 $B(1,1)$ 的路径：

        1. 沿抛物线 $y=x^{2}$；
        2. 沿折线 $O\to A(1,0)\to B(1,1)$。

        并解释结果。
      `,
      idea: String.raw`
        **先查 $\pd Qx-\pd Py$**（[决定用哪条路线](#/calculus/line-surface/line-integral?at=strategy)）：
        $$P=2xy,\quad Q=x^{2},$$
        $$\pd Py=2x,\qquad \pd Qx=2x.$$
        ==两者相等 $\Rightarrow$ [路径无关](#/calculus/line-surface/green?at=digging-is-path-independence)==！

        ==所以两问的答案必然相同==，这就是"解释结果"要说的。

        **预判答案**：路径无关意味着存在原函数 $u$ 使
        $$\d u=2xy\dx+x^{2}\dy.$$
        观察：$\d(x^{2}y)=2xy\dx+x^{2}\dy$ ==恰好就是它==！
        故积分 $=u(B)-u(O)=1^{2}\cdot1-0=1$。

        ==两问的答案都应当是 $1$==，下面分别验证。

        **第 1 问**：用 $x$ 作参数，$y=x^{2}$、$\dy=2x\dx$，$x:0\to1$。

        **第 2 问**：分两段。
        - $OA$：$y=0$、$\dy=0$，$x:0\to1$，==被积式全为零==；
        - $AB$：$x=1$、$\dx=0$，$y:0\to1$，只剩 $x^{2}\dy=\dy$。
      `,
      solution: String.raw`
        记 $P=2xy$，$Q=x^{2}$。

        **(1) 沿 $y=x^{2}$**：取 $x$ 为参数，$y=x^{2}$，$\dy=2x\dx$，$x$ 从 $0$ 到 $1$：
        $$\int_L=\int_0^{1}\left[2x\cdot x^{2}+x^{2}\cdot2x\right]\dx
        =\int_0^{1}4x^{3}\dx=\left[x^{4}\right]_0^{1}=1.$$

        **(2) 沿折线 $O\to A\to B$**：

        - **段 $OA$**（$y=0$，$\dy=0$，$x:0\to1$）：
          $$\int_{OA}=\int_0^{1}\left[2x\cdot0+0\right]\dx=0;$$
        - **段 $AB$**（$x=1$，$\dx=0$，$y:0\to1$）：
          $$\int_{AB}=\int_0^{1}1^{2}\dy=1.$$

        故 $\displaystyle\int_L=0+1=1$。

        **解释**：由于
        $$\pd Py=2x=\pd Qx$$
        在整个平面上成立，且平面是单连通区域，
        故该曲线积分==与路径无关==，只依赖起点与终点，所以两种走法结果相同。

        事实上 $2xy\dx+x^{2}\dy=\d\left(x^{2}y\right)$，故
        $$\int_L=\left[x^{2}y\right]_{(0,0)}^{(1,1)}=1-0=1.$$
      `,
      comment: String.raw`
        **路径无关时的最快解法是"找原函数"**：
        $$\boxed{\ \int_LP\dx+Q\dy=u(\text{终点})-u(\text{起点})\ }$$
        ==这就是[牛顿–莱布尼茨公式的多元版本](#/calculus/definite/properties?at=definition)==。

        **怎么找 $u$**：

        | 方法 | 做法 |
        |---|---|
        | ==凑微分== | 直接认出 $\d(x^{2}y)$ |
        | 偏积分 | $u=\int P\dx+g(y)$，再由 $u_y=Q$ 定 $g$ |
        | ==折线积分== | $u=\int_0^xP(t,0)\dt+\int_0^yQ(x,s)\d s$ |

        ==第三种最机械、最保险==，与[全微分方程](#/calculus/ode/first-order?at=bernoulli-exact)是同一个动作。

        **第 (2) 问的两段各"死掉"一半**：
        - $OA$ 上 $y=0$ 使 $P$ 项为零、$\dy=0$ 使 $Q$ 项为零；
        - $AB$ 上 $\dx=0$ 使 $P$ 项为零。

        ==沿坐标轴方向的直线段，总有一个微分为零==，
        **这就是"路径无关时挑折线走"能省力的原因。**

        **反例提醒：$\pd Py=\pd Qx$ 还不够。**
        必须==在单连通区域内==成立。
        经典的 $\frac{-y\dx+x\dy}{x^{2}+y^{2}}$ 满足 $\pd Py=\pd Qx$，
        ==但在挖了原点的区域上路径相关==（绕原点一圈得 $2\pi$），
        见[那道挖洞的例题](#/calculus/line-surface/green?at=ex-ellipse-hole)。

        **本题若把 $Q$ 改成 $x^{2}+1$**：
        $\pd Qx$ 仍是 $2x$，==仍然路径无关==，
        原函数变成 $x^{2}y+y$，积分值变成 $1+1=2$。
        ==加一个只含 $y$ 的项不影响路径无关性==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **第一类的上下限写反**：==$\ds>0$，必须下限 $<$ 上限==。
      2. **第二类不按方向定限**：==上下限由起点终点决定==，可以下限 $>$ 上限。
      3. **第一类漏掉 $\sqrt{x'^{2}+y'^{2}}$**：$\ds\ne\dt$。
      4. **第二类忘了 $\dx=x'\dt$**：两个微分都要换。
      5. **第一类不代入曲线方程化简**：==这是最省力的一步==。
      6. **认为 $\pd Py=\pd Qx$ 就一定路径无关**：==还要区域单连通==。
      7. **补线后方向不统一**：格林公式要求==逆时针为正==。
      8. **第一类用对称性时考虑方向**：==第一类无方向，不必管==；
         第二类才要小心。
      9. **不做退化检验**：==令某个参数为零看结果是否退化正确==。
    ` },

  ],
});
