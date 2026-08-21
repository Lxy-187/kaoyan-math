/* ==========================================================================
   高等数学 / 4 不定积分 / 分部积分法
   —— 乘积法则的逆用。换元法见 indefinite/substitution；
      有理式见 indefinite/rational。
   ========================================================================== */

KM.page({
  path: 'calculus/indefinite/by-parts',
  title: '分部积分法',
  subtitle: '换元法对付**复合**，分部积分对付**乘积**。核心只有一个决策：谁去当 $u$、谁被凑进 $\\d v$',
  tags: ['小题', '计算题', '高频'],
  updated: '2026-08-21',

  blocks: [

    { t: 'key', id: 'core', title: '公式与它的来历', c: String.raw`
      由乘积法则 $(uv)'=u'v+uv'$ 两边积分：
      $$uv=\int u'v\dx+\int uv'\dx
      \ \Longrightarrow\ \boxed{\ \int u\dv=uv-\int v\du\ }$$

      **它在做什么**：把一个积分==换成另一个积分==。
      $$\underbrace{\int u\dv}_{\text{难}}\ \longrightarrow\ \underbrace{\int v\du}_{\text{希望更简单}}$$

      ==所以分部积分不保证成功，成败全在"选谁当 $u$"==：
      选对了新积分更简单，选反了会更复杂。

      **什么时候想到它**：被积函数是==两类不同函数的乘积==，
      而且这两类"求导"和"积分"的难易==不对称==。

      | 典型形状 | 例 |
      |---|---|
      | 多项式 $\times$ 指数 / 三角 | $\int x e^{x}\dx$，$\int x\sin x\dx$ |
      | 多项式 $\times$ 对数 / 反三角 | $\int x\ln x\dx$，$\int x\arctan x\dx$ |
      | 只有一个"难求积分"的函数 | $\int\ln x\dx$，$\int\arcsin x\dx$ |
      | 指数 $\times$ 三角 | $\int e^{x}\sin x\dx$（==循环型==） |
    ` },

    { t: 'method', id: 'lipet', title: '★ 选 $u$ 的口诀：反对幂指三', c: String.raw`
      $$\boxed{\ \textbf{反}\ \to\ \textbf{对}\ \to\ \textbf{幂}\ \to\ \textbf{指}\ \to\ \textbf{三}\ }$$
      **排在前面的当 $u$（求导），排在后面的凑进 $\dv$（积分）。**

      | 字 | 指 | 为什么排这个位置 |
      |---|---|---|
      | **反** | 反三角 $\arcsin,\arctan$ | ==求导后变成有理式==，大幅简化 |
      | **对** | 对数 $\ln x$ | 求导后变成 $\frac1x$，简化 |
      | **幂** | $x^{n}$ | 求导降次，==积分升次==，所以宁可求导 |
      | **指** | $e^{x},a^{x}$ | ==求导积分难度不变==，当 $\dv$ 无所谓 |
      | **三** | $\sin,\cos$ | 同上 |

      ==口诀的逻辑是"把求导后变简单的放前面"==：
      反三角和对数求导后从超越函数掉成有理式，收益最大；
      指数和三角求导积分都一样，==放最后当 $\dv$ 正合适==。

      **两个直接推论**：

      - $\int x^{n}e^{x}\dx$：幂在指前，==取 $u=x^{n}$==，
        每用一次分部积分 $n$ 降一次，==用 $n$ 次就完==；
      - $\int x^{n}\ln x\dx$：对在幂前，==取 $u=\ln x$==，
        一次就把 $\ln$ 消成 $\frac1x$。

      **"只有一个函数"的情形**：$\int\ln x\dx$ 看似不是乘积，
      ==把它看成 $\ln x\cdot1$==，取 $u=\ln x$、$\dv=\dx$：
      $$\int\ln x\dx=x\ln x-\int x\cdot\frac1x\dx=x\ln x-x+C.$$
      ==$\int\arcsin x\dx$、$\int\arctan x\dx$ 同法==，这是送分题。
    ` },

    { t: 'key', id: 'recurrence', title: '循环型：把原积分当未知数解出来', c: String.raw`
      $\int e^{ax}\sin bx\dx$ 这类，==用两次分部积分之后会回到原积分==。
      此时==不要再做第三次==，而是把它当方程解。

      **标准操作**：记 $I=\int e^{x}\sin x\dx$。两次分部积分后得
      $$I=e^{x}\sin x-e^{x}\cos x-I,$$
      ==移项== $2I=e^{x}(\sin x-\cos x)$，故
      $$I=\frac{e^{x}}{2}\left(\sin x-\cos x\right)+C.$$

      ==注意 $+C$ 要在最后加==（解出 $I$ 之后），不是中间就带着。

      **两次的方向必须一致**：第一次取 $u=\sin x$，
      ==第二次也必须取 $u=\cos x$（都是三角当 $u$）==。
      若第二次反过来取 $u=e^{x}$，会原样退回 $I=I$，==白做==。
      **这是循环型唯一的坑。**

      **递推型**：$I_n=\int\sec^{n}x\dx$、$\int\frac{\dx}{(x^{2}+a^{2})^{n}}$ 这类，
      分部积分给出 $I_n$ 与 $I_{n-2}$（或 $I_{n-1}$）的关系式，
      ==逐级降到 $I_0,I_1$==。

      考研中最需要记住的一条：
      $$\int\sec^{3}x\dx=\frac12\left(\sec x\tan x+\ln\abs{\sec x+\tan x}\right)+C.$$
      ==它是 $\int\sqrt{x^{2}+a^{2}}\dx$ 型三角代换后必然遇到的==，
      推导就是一次循环型分部积分。
    ` },

    { t: 'key', id: 'tricks', title: '两个提速技巧', c: String.raw`
      **① 表格法（多项式 $\times$ 指数/三角）**：
      $u$ 那列反复求导直到 $0$，$\dv$ 那列反复积分，==交叉相乘、符号正负交替==。

      $\int x^{2}e^{x}\dx$：

      | 符号 | $u$ 求导 | $\dv$ 积分 |
      |---|---|---|
      | $+$ | $x^{2}$ | $e^{x}$ |
      | $-$ | $2x$ | $e^{x}$ |
      | $+$ | $2$ | $e^{x}$ |
      | | $0$ | |

      $$\Rightarrow\ \int x^{2}e^{x}\dx=x^{2}e^{x}-2xe^{x}+2e^{x}+C.$$
      ==三次分部积分压缩成一张表==，$n$ 较大时优势明显。

      **② 凑 $v$ 时可以加常数**：$\dv=\dx$ 时 $v$ 取 $x$ 或 $x+a$ 都行，
      ==选一个能和分母约掉的==。

      **例**：$\int\frac{\ln x}{(1+x)^{2}}\dx$，取 $\dv=\frac{\dx}{(1+x)^{2}}$，
      $v$ 可取 $-\frac{1}{1+x}$，==也可取 $-\frac{1}{1+x}+1=\frac{x}{1+x}$==。
      用后者时
      $$\int v\du=\int\frac{x}{1+x}\cdot\frac{\dx}{x}=\int\frac{\dx}{1+x},$$
      ==$x$ 直接约掉==，比前者干净得多。

      ==看到 $\int v\du$ 里有能约的因子，就回头调整 $v$ 的常数。==
    ` },

    /* ================================================================== */
    { t: 'h', id: 'examples', c: '一、例题' },

    { t: 'example',
      id: 'ex-basic',
      title: '三种基本型',
      source: '标准例题',
      level: 2,
      problem: String.raw`
        计算：
        $$\text{(1)}\ \int x\arctan x\dx\qquad
        \text{(2)}\ \int x^{2}\sin x\dx\qquad
        \text{(3)}\ \int e^{\sqrt x}\dx$$
      `,
      idea: String.raw`
        **(1) 反在幂前** $\Rightarrow$ 取 $u=\arctan x$、$\dv=x\dx$。
        $v=\frac{x^{2}}{2}$，于是 $\int v\du=\frac12\int\frac{x^{2}}{1+x^{2}}\dx$，
        ==这是[假分式，要先带余除法](#/calculus/indefinite/rational?at=long-division)==：
        $\frac{x^{2}}{1+x^{2}}=1-\frac{1}{1+x^{2}}$。

        **小技巧**：这里 $v$ 取 $\frac{x^{2}+1}{2}$（加了常数 $\frac12$）会更快，
        因为 $\int v\du=\frac12\int\frac{x^{2}+1}{1+x^{2}}\dx=\frac12\int\dx$，==直接约掉==。

        **(2) 幂在三前** $\Rightarrow$ 取 $u=x^{2}$，==要用两次==（$x^{2}\to2x\to2$）。
        ==用[表格法](#/calculus/indefinite/by-parts?at=tricks)更快==。

        **(3) 先换元再分部**。$e^{\sqrt x}$ 不是乘积，分部积分无从下手；
        ==令 $t=\sqrt x$ 把根号消掉==，变成 $\int 2te^{t}\dt$，
        这才是标准的"幂 $\times$ 指"。
        ==这种"换元开路、分部收尾"的组合是常考套路。==
      `,
      solution: String.raw`
        **(1)** 取 $u=\arctan x$，$\dv=x\dx$，$v=\dfrac{x^{2}+1}{2}$（加常数 $\frac12$）：
        $$\int x\arctan x\dx=\frac{x^{2}+1}{2}\arctan x-\int\frac{x^{2}+1}{2}\cdot\frac{\dx}{1+x^{2}}$$
        $$=\frac{x^{2}+1}{2}\arctan x-\frac12\int\dx
        =\frac{x^{2}+1}{2}\arctan x-\frac x2+C.$$

        **(2)** 表格法：

        | 符号 | 求导 | 积分 |
        |---|---|---|
        | $+$ | $x^{2}$ | $\sin x$ |
        | $-$ | $2x$ | $-\cos x$ |
        | $+$ | $2$ | $-\sin x$ |
        | | $0$ | $\cos x$ |

        $$\int x^{2}\sin x\dx=-x^{2}\cos x+2x\sin x+2\cos x+C.$$

        **(3)** 令 $t=\sqrt x$，则 $x=t^{2}$，$\dx=2t\dt$：
        $$\int e^{\sqrt x}\dx=\int 2te^{t}\dt=2\left(te^{t}-e^{t}\right)+C
        =2e^{\sqrt x}\left(\sqrt x-1\right)+C.$$
      `,
      comment: String.raw`
        **(1) 的常数技巧值得单独记**：取 $v=\frac{x^{2}+1}{2}$ 而非 $\frac{x^{2}}{2}$，
        ==把一次带余除法省掉了==。
        识别信号：==$\du$ 的分母能被 $v$ 的某个平移约掉==。
        同类的还有 $\int x\arcsin x\dx$（取 $v=\frac{x^{2}-1}{2}$）。

        **(2) 用表格法的收益**：常规写法要写两遍"$uv-\int v\du$"、
        管两次符号，==表格法一次到位==。
        ==注意符号列是 $+,-,+,-\cdots$ 交替==，从 $+$ 开始。

        **(3) 揭示了一条通用策略**：
        $$\boxed{\ \text{被积式含 }\sqrt x,\ \ln x,\ e^{\sqrt x}\ \text{这类"套着"的结构}
        \ \Rightarrow\ \text{先换元，再分部}\ }$$
        同型的还有 $\int\sin\sqrt x\dx$、$\int\ln(1+\sqrt x)\dx$。
        ==单独用分部或单独用换元都做不动，必须两招接力。==

        **三题都可以求导验算**，例如 (3)：
        $$\left[2e^{\sqrt x}(\sqrt x-1)\right]'
        =2e^{\sqrt x}\cdot\frac{1}{2\sqrt x}(\sqrt x-1)+2e^{\sqrt x}\cdot\frac{1}{2\sqrt x}
        =\frac{e^{\sqrt x}}{\sqrt x}\left(\sqrt x-1+1\right)=e^{\sqrt x}.\ \checkmark$$
      `,
    },

    { t: 'example',
      id: 'ex-cycle',
      title: '★ 循环型：解方程而不是继续积',
      source: '标准例题（高频）',
      level: 3,
      problem: String.raw`
        计算 $\displaystyle I=\int e^{2x}\cos 3x\dx$。
      `,
      idea: String.raw`
        **指数 $\times$ 三角，典型的[循环型](#/calculus/indefinite/by-parts?at=recurrence)**。

        ==按"反对幂指三"，三排在指后面，所以取 $u=e^{2x}$、$\dv=\cos3x\dx$==。
        （其实这里取哪个当 $u$ 都行，==只要两次保持一致==。）

        **预判**：两次分部积分后会出现 $\lambda I$ 的项，
        移项解出 $I$。系数 $\lambda$ 会是 $-\frac{9}{4}$ 之类，
        ==算完检查"$1-\lambda\ne0$"==——若恰好为零说明哪里错了。

        **最容易错的地方**：第二次分部积分时若把 $u$ 换成三角函数，
        ==会退回恒等式 $I=I$==，白做一轮。
        **纪律：第一次谁当 $u$，第二次还是同一类当 $u$。**

        **另一条更快的路（复数法）**：
        $$\int e^{2x}\cos3x\dx=\Re\int e^{(2+3i)x}\dx=\Re\frac{e^{(2+3i)x}}{2+3i},$$
        ==一步积分再取实部==，见[复指数技巧](#/calculus/derivative/high-order?at=complex-exp)。
        考研可以用来验算。
      `,
      solution: String.raw`
        取 $u=e^{2x}$，$\dv=\cos3x\dx$，$v=\frac13\sin3x$：
        $$I=\frac13e^{2x}\sin3x-\frac23\int e^{2x}\sin3x\dx.$$

        对 $J=\int e^{2x}\sin3x\dx$ ==再取 $u=e^{2x}$==（保持一致），$v=-\frac13\cos3x$：
        $$J=-\frac13e^{2x}\cos3x+\frac23\int e^{2x}\cos3x\dx
        =-\frac13e^{2x}\cos3x+\frac23I.$$

        代回：
        $$I=\frac13e^{2x}\sin3x-\frac23\left(-\frac13e^{2x}\cos3x+\frac23I\right)$$
        $$=\frac13e^{2x}\sin3x+\frac29e^{2x}\cos3x-\frac49I.$$

        移项：
        $$\frac{13}{9}I=\frac13e^{2x}\sin3x+\frac29e^{2x}\cos3x,$$
        $$I=\frac{9}{13}\left(\frac13\sin3x+\frac29\cos3x\right)e^{2x}+C
        =\frac{e^{2x}}{13}\left(3\sin3x+2\cos3x\right)+C.$$

        **验算（求导）**：
        $$\left[\frac{e^{2x}}{13}(3\sin3x+2\cos3x)\right]'
        =\frac{e^{2x}}{13}\left[2(3\sin3x+2\cos3x)+(9\cos3x-6\sin3x)\right]$$
        $$=\frac{e^{2x}}{13}\left(6\sin3x+4\cos3x+9\cos3x-6\sin3x\right)
        =\frac{13e^{2x}\cos3x}{13}=e^{2x}\cos3x.\ \checkmark$$
      `,
      comment: String.raw`
        **通用公式**（值得记，能直接秒杀这类题）：
        $$\int e^{ax}\cos bx\dx=\frac{e^{ax}}{a^{2}+b^{2}}\left(a\cos bx+b\sin bx\right)+C,$$
        $$\int e^{ax}\sin bx\dx=\frac{e^{ax}}{a^{2}+b^{2}}\left(a\sin bx-b\cos bx\right)+C.$$
        本题 $a=2,b=3$，$a^{2}+b^{2}=13$，==与算出的分母对上了==。

        **记忆办法**：分母永远是 $a^{2}+b^{2}$；
        分子里"和自己同名的三角函数"配系数 $a$、"另一个"配系数 $b$，
        ==$\cos$ 那条全是加号，$\sin$ 那条中间是减号==。

        **复数法一行验证**：
        $$\int e^{(a+bi)x}\dx=\frac{e^{(a+bi)x}}{a+bi}
        =\frac{(a-bi)e^{ax}(\cos bx+i\sin bx)}{a^{2}+b^{2}},$$
        取实部得 $\frac{e^{ax}(a\cos bx+b\sin bx)}{a^{2}+b^{2}}$，==与公式一致==。

        **这个结构在别处还会出现**：
        [二阶常系数方程的共振情形](#/calculus/ode/linear-const?at=resonance)、
        [傅里叶系数的计算](#/calculus/series/fourier?at=coefficients)
        都要算 $\int e^{ax}\sin bx$ 型积分，==公式记熟收益很高==。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '二、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **$u$ 选反**：按==反对幂指三==，排前面的当 $u$。
         选反了新积分更复杂，==发现变难就立刻换==。
      2. **循环型第二次换了方向**：==两次必须同一类当 $u$==，
         否则退回 $I=I$。
      3. **循环型忘了移项**：得到 $I=\cdots-\lambda I$ 后要==解出 $I$==，
         不能继续积第三次。
      4. **$+C$ 加错位置**：循环型的 $C$ 在==解出 $I$ 之后==加。
      5. **符号漏掉**：$\int u\dv=uv-\int v\du$ 中间是==减号==；
         $v=\int\cos x\dx=\sin x$ 但 $v=\int\sin x\dx=-\cos x$。
      6. **该先换元却硬分部**：$\int e^{\sqrt x}\dx$ 这类==要先消掉根号==。
      7. **不用表格法**：多项式次数 $\ge2$ 时表格法==省一半时间且不易错符号==。
      8. **忘了调整 $v$ 的常数**：能约掉分母时收益很大。
    ` },

  ],
});
