/* ==========================================================================
   高等数学 / 10 重积分 / 重积分的应用
   —— 微元法在二维、三维上的直接搬用。
      一维版本见 definite-app/micro-element。
   ========================================================================== */

KM.page({
  path: 'calculus/multi-integral/integral-app',
  title: '重积分的应用',
  subtitle: '公式不用背——把[微元法](#/calculus/definite-app/micro-element?at=core)里的 $\\d x$ 换成 $\\d A$ 或 $\\d V$，公式自己就出来了',
  tags: ['大题', '计算题'],
  updated: '2026-08-21',

  blocks: [

    { t: 'formulas', id: 'formulas', title: '公式速查', items: [
      { label: '曲顶柱体体积', tex: String.raw`V=\iint_D f(x,y)\,\mathrm{d}x\mathrm{d}y\quad(f\ge0)` },
      { label: '平面薄片质量', tex: String.raw`m=\iint_D\rho(x,y)\,\mathrm{d}x\mathrm{d}y` },
      { label: '空间物体质量', tex: String.raw`m=\iiint_\Omega\rho(x,y,z)\,\mathrm{d}V` },
      { label: '形心（平面）', tex: String.raw`\bar x=\frac{\iint_D x\,\mathrm{d}A}{\iint_D\mathrm{d}A},\qquad\bar y=\frac{\iint_D y\,\mathrm{d}A}{\iint_D\mathrm{d}A}` },
      { label: '质心（空间）', tex: String.raw`\bar x=\frac{\iiint_\Omega x\rho\,\mathrm{d}V}{\iiint_\Omega\rho\,\mathrm{d}V}` },
      { label: '转动惯量（绕 $z$ 轴）', tex: String.raw`I_z=\iiint_\Omega\left(x^{2}+y^{2}\right)\rho\,\mathrm{d}V` },
      { label: '曲面面积', tex: String.raw`S=\iint_D\sqrt{1+z_x^{2}+z_y^{2}}\,\mathrm{d}x\mathrm{d}y` },
    ] },

    { t: 'key', id: 'how-to-read', title: '这些公式怎么"读"出来', c: String.raw`
      ==每一条都是"微元 $\times$ 权重，再积起来"==：

      | 要求的量 | 微元 |
      |---|---|
      | 质量 | $\d m=\rho\,\d A$（面密度 $\times$ 面积） |
      | 体积 | $\d V=f\,\d A$（高 $\times$ 底面积） |
      | 力矩 | $x\,\d m$ |
      | 转动惯量 | ==$r^{2}\d m$==（$r$ 是到转轴的距离） |
      | 曲面面积 | $\d S=\sqrt{1+z_x^{2}+z_y^{2}}\,\d A$ |

      **转动惯量那条要看清 $r$ 是什么**：

      | 绕什么转 | $r^{2}$ |
      |---|---|
      | ==$z$ 轴== | $x^{2}+y^{2}$ |
      | $x$ 轴 | $y^{2}+z^{2}$ |
      | 原点（极转动惯量） | $x^{2}+y^{2}+z^{2}$ |

      ==是"到转轴的距离平方"，不是到原点==。
      **绕 $z$ 轴转时 $z$ 不出现**——这是最容易错的地方。

      **曲面面积公式的来历**（==与[弧长](#/calculus/definite-app/area-volume?at=arc-length)完全平行==）：
      $$\underbrace{\ds=\sqrt{1+y'^{2}}\dx}_{\text{一维}}
      \qquad\longleftrightarrow\qquad
      \underbrace{\d S=\sqrt{1+z_x^{2}+z_y^{2}}\dxy}_{\text{二维}}$$
      ==都是"投影面积乘上一个大于 $1$ 的倾斜因子"==，
      详见[第一类曲面积分](#/calculus/line-surface/first-kind-surface?at=one-formula)。

      **形心与质心的区别**：==形心是密度均匀时的质心==，
      $\rho$ 为常数时会上下约掉，==所以形心公式里没有 $\rho$==。
    ` },

    { t: 'method', id: 'workflow', title: '解题流程', c: String.raw`
      1. **画出区域**，==定积分限==（这仍是主要工作量）；
      2. **写出微元**（照上表）；
      3. ==**查对称性**==（[能对称掉的先扔](#/calculus/multi-integral/symmetry?at=workflow)）；
      4. **选坐标系**：含 $x^{2}+y^{2}$ 或区域是圆 $\Rightarrow$ 极坐标 / 柱坐标；
         球形区域 $\Rightarrow$ [球坐标](#/calculus/multi-integral/triple?at=spherical)；
      5. 计算，==并做量级检查==。

      **第 3 步在应用题里尤其有用**：
      求形心时，==若区域关于某轴对称，该方向的形心坐标立刻可知==，
      $$D\ \text{关于 }y\text{ 轴对称}\ \Longrightarrow\ \bar x=0,$$
      ==只需算另一个坐标==，工作量减半。

      **量级检查的办法**：

      | 量 | 检查 |
      |---|---|
      | 形心 | ==必须落在区域内部== |
      | 质量 | 在 $\rho_{\min}V$ 与 $\rho_{\max}V$ 之间 |
      | 转动惯量 | $\le mR^{2}$（$R$ 为最大半径） |
      | 曲面面积 | ==$\ge$ 投影区域的面积== |

      ==最后一行是因为倾斜因子 $\sqrt{1+z_x^2+z_y^2}\ge1$==，
      **算出的曲面面积小于投影面积，一定错了。**
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-centroid',
      title: '形心：先用对称性省掉一半',
      source: '标准例题',
      level: 3,
      problem: String.raw`
        求由 $y=x^{2}$ 与 $y=1$ 所围平面薄片（密度均匀）的形心。
      `,
      idea: String.raw`
        **先画图**：抛物线与水平线围成的区域，
        $$D:\ -1\le x\le1,\quad x^{2}\le y\le1.$$

        **查对称性**：区域关于 ==$y$ 轴对称==
        （$x\to-x$ 时 $y=x^{2}$ 不变、$y=1$ 不变）。

        $$\boxed{\ \bar x=0\ }$$
        ==不用算==——由[对称性](#/calculus/multi-integral/symmetry?at=core)，
        $\iint_D x\,\d A$ 中 $x$ 是奇函数、区域对称，故为零。

        **只需算 $\bar y$**：
        $$\bar y=\frac{\iint_Dy\,\d A}{\iint_D\d A}.$$

        **分母（面积）**：
        $$A=\int_{-1}^{1}\left(1-x^{2}\right)\dx=2\int_0^1(1-x^{2})\dx
        =2\left(1-\frac13\right)=\frac43.$$

        **分子**：先对 $y$ 积分
        $$\int_{x^{2}}^{1}y\dy=\frac{1-x^{4}}{2},$$
        再对 $x$ 积分。

        **预判 $\bar y$**：区域在 $y\in[0,1]$ 之间，
        ==而靠上的部分更宽（抛物线开口向上）==，
        所以形心应当偏上，==$\bar y>\frac12$==。
      `,
      solution: String.raw`
        区域为
        $$D:\ -1\le x\le1,\qquad x^{2}\le y\le1.$$

        **由对称性**：$D$ 关于 $y$ 轴对称，被积函数 $x$ 关于 $x$ 为奇函数，故
        $$\iint_Dx\,\d A=0\ \Longrightarrow\ \bar x=0.$$

        **面积**：
        $$A=\iint_D\d A=\int_{-1}^{1}\left(1-x^{2}\right)\dx
        =\left[x-\frac{x^{3}}{3}\right]_{-1}^{1}=\frac23-\left(-\frac23\right)=\frac43.$$

        **$y$ 方向的矩**：
        $$\iint_Dy\,\d A=\int_{-1}^{1}\dx\int_{x^{2}}^{1}y\dy
        =\int_{-1}^{1}\left[\frac{y^{2}}{2}\right]_{x^{2}}^{1}\dx
        =\frac12\int_{-1}^{1}\left(1-x^{4}\right)\dx$$
        $$=\frac12\cdot2\int_0^{1}\left(1-x^{4}\right)\dx
        =\left(1-\frac15\right)=\frac45.$$

        **形心**：
        $$\bar y=\frac{4/5}{4/3}=\frac45\cdot\frac34=\frac35.$$

        故形心为 $\left(0,\dfrac35\right)$。
      `,
      comment: String.raw`
        **验证预判**：$\bar y=\frac35=0.6>\frac12$ $\checkmark$
        ==与"上半部分更宽、形心偏上"的直觉一致==。

        **形心必须落在区域内**：$(0,0.6)$ 满足 $0^{2}=0\le0.6\le1$ $\checkmark$
        ==这是[量级检查](#/calculus/multi-integral/integral-app?at=workflow)的第一条==。

        **对称性省掉了一半工作**：
        若不查对称性，要算 $\iint_D x\,\d A=\int_{-1}^1x(1-x^{2})\dx$，
        ==虽然结果也是 $0$，但要多算一个积分==。
        ==而且如果算错了符号，会得到非零的 $\bar x$，与图形明显矛盾==。

        **常见的变体**：把密度改成 $\rho=y$（非均匀）。
        此时
        $$\bar y=\frac{\iint_Dy\cdot y\,\d A}{\iint_Dy\,\d A}
        =\frac{\iint_Dy^{2}\d A}{4/5}.$$
        算 $\iint_Dy^{2}\d A=\frac13\int_{-1}^1(1-x^{6})\dx=\frac13\cdot2\cdot\frac67=\frac{4}{7}$，
        故 $\bar y=\frac{4/7}{4/5}=\frac57\approx0.714$，
        ==比均匀时更靠上== $\checkmark$（因为上面更重）。
        ==$\bar x=0$ 仍然成立==（$\rho=y$ 关于 $x$ 是偶函数，$x\rho$ 仍是奇函数）。

        **注意密度非均匀时形心变成质心**，
        ==$\rho$ 不能约掉，分子分母都要带上==。
      `,
    },

    { t: 'example',
      id: 'ex-surface-area',
      title: '★ 曲面面积：球面被柱面截出的部分',
      source: '经典例题（维维安尼窗）',
      level: 4,
      problem: String.raw`
        求球面 $x^{2}+y^{2}+z^{2}=4a^{2}$ 被柱面 $x^{2}+y^{2}=2ax$（$a>0$）
        所截得的（含在柱面内的）那部分面积。
      `,
      idea: String.raw`
        **先定投影区域**：柱面 $x^{2}+y^{2}=2ax$ ==不含 $z$==，
        ==所以它在 $xOy$ 面上的投影就是它自己==：
        $$D:\ x^{2}+y^{2}\le2ax,$$
        即圆心 $(a,0)$、半径 $a$ 的圆盘（[过原点的圆](#/calculus/multi-integral/double?at=polar)）。

        **写曲面**：取上半球面
        $$z=\sqrt{4a^{2}-x^{2}-y^{2}},$$
        ==由对称性，总面积是上半部分的 $2$ 倍==。

        **算倾斜因子**：
        $$z_x=\frac{-x}{\sqrt{4a^{2}-x^{2}-y^{2}}},\qquad
        z_y=\frac{-y}{\sqrt{4a^{2}-x^{2}-y^{2}}},$$
        $$\sqrt{1+z_x^{2}+z_y^{2}}
        =\sqrt{1+\frac{x^{2}+y^{2}}{4a^{2}-x^{2}-y^{2}}}
        =\frac{2a}{\sqrt{4a^{2}-x^{2}-y^{2}}}.$$
        ==分子分母通分后开根号，$4a^{2}$ 整体出来==——
        **球面的倾斜因子总是 $\frac{R}{\sqrt{R^{2}-x^{2}-y^{2}}}$，这个形式值得记。**

        **化极坐标**：$D$ 是 $r\le2a\cos\theta$、$\theta\in[-\frac\pi2,\frac\pi2]$，
        被积式 $\frac{2a}{\sqrt{4a^{2}-r^{2}}}\cdot r$，
        ==内层对 $r$ 积分可以凑微分==（$r\,\d r=-\frac12\d(4a^{2}-r^{2})$）。

        **注意这是反常积分的边界情形**：$r$ 能取到 $2a\cos\theta$，
        而当 $\theta=0$ 时 $r$ 可达 $2a$，==此时被积式分母为零==。
        ==但积分收敛==（$\frac{1}{\sqrt{\cdot}}$ 是 $\frac12$ 阶，
        [瑕积分 $p<1$ 收敛](#/calculus/definite/improper?at=p-integral)）。
      `,
      solution: String.raw`
        由对称性，所求面积为上半球面部分的 $2$ 倍。

        **上半球面**：$z=\sqrt{4a^{2}-x^{2}-y^{2}}$，投影区域
        $$D:\ x^{2}+y^{2}\le2ax.$$

        **倾斜因子**：
        $$z_x=\frac{-x}{z},\qquad z_y=\frac{-y}{z},$$
        $$\sqrt{1+z_x^{2}+z_y^{2}}=\sqrt{\frac{z^{2}+x^{2}+y^{2}}{z^{2}}}
        =\frac{2a}{\sqrt{4a^{2}-x^{2}-y^{2}}}.$$

        故
        $$S=2\iint_D\frac{2a}{\sqrt{4a^{2}-x^{2}-y^{2}}}\dxy.$$

        **化极坐标**（$D:\ -\frac\pi2\le\theta\le\frac\pi2,\ 0\le r\le2a\cos\theta$）：
        $$S=2\int_{-\pi/2}^{\pi/2}\dtheta\int_0^{2a\cos\theta}
        \frac{2a}{\sqrt{4a^{2}-r^{2}}}\,r\,\d r.$$

        **内层**（凑微分）：
        $$\int_0^{2a\cos\theta}\frac{2ar\,\d r}{\sqrt{4a^{2}-r^{2}}}
        =2a\left[-\sqrt{4a^{2}-r^{2}}\right]_0^{2a\cos\theta}$$
        $$=2a\left(2a-\sqrt{4a^{2}-4a^{2}\cos^{2}\theta}\right)
        =2a\cdot2a\left(1-\abs{\sin\theta}\right)=4a^{2}\left(1-\abs{\sin\theta}\right).$$

        ==注意 $\sqrt{\sin^{2}\theta}=\abs{\sin\theta}$==。

        **外层**（被积函数为偶函数，折半）：
        $$S=2\int_{-\pi/2}^{\pi/2}4a^{2}\left(1-\abs{\sin\theta}\right)\dtheta
        =2\cdot2\cdot4a^{2}\int_0^{\pi/2}\left(1-\sin\theta\right)\dtheta$$
        $$=16a^{2}\left[\theta+\cos\theta\right]_0^{\pi/2}
        =16a^{2}\left(\frac\pi2+0-0-1\right)=16a^{2}\left(\frac\pi2-1\right).$$

        故
        $$S=8a^{2}\left(\pi-2\right).$$
      `,
      comment: String.raw`
        **数值检查**（取 $a=1$）：$S=8(\pi-2)\approx9.13$。

        - 投影区域面积 $=\pi a^{2}=\pi\approx3.14$；
        - ==曲面面积必须大于投影面积== $\checkmark$（$9.13>3.14$）；
        - 整个球面面积 $=4\pi(2a)^{2}=16\pi\approx50.3$，
          ==所截部分约占 $18\%$==，合理。

        **$\abs{\sin\theta}$ 的绝对值不能丢**：
        $\theta\in[-\frac\pi2,\frac\pi2]$ 时 $\sin\theta$ ==可正可负==，
        而 $\sqrt{\sin^{2}\theta}=\abs{\sin\theta}$。
        ==漏掉绝对值会得到 $16a^{2}\cdot\frac\pi2=8\pi a^{2}$，明显偏大==。

        **这道题的名字**：球面被"直径等于球半径"的柱面截出的部分
        叫==维维安尼窗（Viviani's window）==，
        ==它的面积恰好是 $8a^{2}(\pi-2)$，一个不含 $\pi^{2}$ 的漂亮结果==。

        **球面倾斜因子的通用形式**（值得记）：
        $$z=\sqrt{R^{2}-x^{2}-y^{2}}\ \Longrightarrow\
        \sqrt{1+z_x^{2}+z_y^{2}}=\frac{R}{\sqrt{R^{2}-x^{2}-y^{2}}}=\frac Rz.$$
        ==所以球面的面积微元是 $\d S=\frac Rz\dxy$==，
        这与[第一类曲面积分](#/calculus/line-surface/first-kind-surface?at=ds-table)那里的公式一致。

        **验证整个球面**：用这个公式算上半球面积，
        $$\iint_{x^{2}+y^{2}\le R^{2}}\frac{R\dxy}{\sqrt{R^{2}-x^{2}-y^{2}}}
        =R\int_0^{2\pi}\dtheta\int_0^{R}\frac{r\,\d r}{\sqrt{R^{2}-r^{2}}}
        =R\cdot2\pi\cdot R=2\pi R^{2}\ \checkmark$$
        ==正是半个球面的面积==，公式无误。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **转动惯量的 $r$ 取成到原点的距离**：==是到**转轴**的距离==，
         绕 $z$ 轴时是 $x^{2}+y^{2}$。
      2. **曲面面积漏掉倾斜因子**：==$\d S=\sqrt{1+z_x^{2}+z_y^{2}}\dxy$==。
      3. **开根号丢绝对值**：$\sqrt{\sin^{2}\theta}=\abs{\sin\theta}$。
      4. **形心与质心混用**：==密度非均匀时 $\rho$ 不能约掉==。
      5. **不查对称性**：==对称轴上的形心坐标可以直接写==。
      6. **算出的曲面面积小于投影面积**：==必错==，倾斜因子 $\ge1$。
      7. **形心落在区域外**：==必错==，重算。
      8. **只算了上半部分忘了乘 $2$**：对称的曲面要注意。
      9. **过原点的圆用 $\theta\in[0,2\pi]$**：==只有 $\pi$ 的范围==。
    ` },

  ],
});
