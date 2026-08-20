/* ==========================================================================
   高等数学 / 12 无穷级数 / 幂级数收敛域与和函数
   —— 本页核心是「逆向字典」：从一般项的分母特征反查和函数。
   ========================================================================== */

KM.page({
  path: 'calculus/series/power-series',
  title: '幂级数收敛域与和函数',
  subtitle: '逆向字典：看到一般项，三秒定出它属于哪个函数家族',
  tags: ['大题', '计算题', '高频'],
  updated: '2026-08-19',

  blocks: [

    { t: 'insight', id: 'why-reverse-hard', title: '我的卡点：正向记住了，反过来却很迟钝', c: String.raw`
      我发现，==虽然记住了展开级数的形式，但是反过来看却反应很迟钝==。

      **原因**：正向和逆向根本是两套能力。
      正向（$e^{x}\to\sum\frac{x^{n}}{n!}$）是==回忆==，只要背下来就行；
      逆向（$\sum\frac{x^{n}}{n!}\to e^{x}$）是==模式匹配==，
      要先从一堆符号里抽出"特征"，再去索引。背了正向不等于会逆向。

      **解法**：给逆向单独建一套索引，==按分母的代数特征分类== ——
      分母决定了它属于哪个函数家族，这是最稳定、最容易一眼看出的特征。
      下面这本字典就是照这个思路建的。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'decision', c: '一、逆向识别：三问定家族' },

    { t: 'md', c: String.raw`
      **先确认这一页适不适用**：下面这套字典的前提是==你手上有一般项的显式表达式==。
      如果题目==只给一条递推关系==（如 $(n+1)a_{n+1}=\left(n+\frac12\right)a_n$），
      通项要么求不出、要么求出来也不在字典里，那就换一条路 ——
      见[求和函数：路线四，构造微分方程](#/calculus/series/sum-function?at=route4)。
    ` },

    { t: 'steps', id: 'three-questions', title: '拿到一般项，按顺序问这三句', items: [
      { title: '分母有没有阶乘？',
        c: String.raw`**有** $\Rightarrow$ [第二家族](#/calculus/series/power-series?at=family-factorial)：
                      $e^{x}$ / $\sin x$ / $\cos x$ 族，收敛域几乎必是 $(-\infty,+\infty)$。
                      **没有** $\Rightarrow$ 往下问。` },
      { title: '分母有没有 $n$？',
        c: String.raw`**没有**（系数是常数或只有正负号）$\Rightarrow$
                      [第一家族](#/calculus/series/power-series?at=family-geometric)：几何级数族。
                      **有一次的 $n$、$2n+1$** $\Rightarrow$
                      [第三家族](#/calculus/series/power-series?at=family-log)：$\ln$ / $\arctan$ 族。
                      **是 $n$ 的乘积**（如 $n(n+1)$）$\Rightarrow$
                      [第四家族](#/calculus/series/power-series?at=family-product)：先裂项。` },
      { title: '幂次和符号长什么样？',
        c: String.raw`定完家族后，用这两条锁定具体是哪一个：
                      **幂次**——全次幂 $x^{n}$ / 只有奇次 $x^{2n+1}$ / 只有偶次 $x^{2n}$；
                      **符号**——全正（$q=x$）/ 交错（$q=-x$，或 $x^{2}\to-x^{2}$）。` },
    ] },

    { t: 'key', id: 'quick-table', title: '一张速查：特征 → 家族', c: String.raw`
      | 分母长什么样 | 家族 | 函数 |
      |---|---|---|
      | 无 $n$、无阶乘 | ① 几何级数 | $\dfrac{1}{1\mp x}$ 及其求导版 |
      | $n!$、$(2n)!$、$(2n+1)!$ | ② 阶乘族 | $e^{x},\;\sin x,\;\cos x$ |
      | $n$、$2n$、$2n+1$（一次） | ③ 对数族 | $\ln,\;\arctan$ |
      | $n(n+1)$、$n(n+2)$ | ④ 乘积族 | 先裂项，退回③ |
      | 系数是 $\binom{\alpha}{n}$ 形状 | ⑤ 二项式 | $(1+x)^{\alpha}$ |

      **两条辅助线索**（定完家族再用）：

      - ==幂次跳着走（只有奇次或偶次）$\Rightarrow$ 把基本式里的 $x$ 换成 $x^{2}$==；
      - ==系数上多出一个 $n$ $\Rightarrow$ 求过导；多出一个 $\frac1n$ $\Rightarrow$ 积过分==。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'dict', c: '二、字典正文' },

    { t: 'key', id: 'family-geometric', title: '第一家族｜几何级数：分母无 $n$、无阶乘', c: String.raw`
      **识别**：系数全是常数，或只有符号交替；幂次逐个递增。
      看到就往 $\dfrac{1}{1-q}$ 上凑。

      | 级数 | 和函数 | 收敛域 |
      |---|---|---|
      | $\sum\limits_{n=0}^{\infty}x^{n}$ | $\dfrac{1}{1-x}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}x^{n}$ | $\dfrac{1}{1+x}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}x^{2n}$ | $\dfrac{1}{1-x^{2}}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}x^{2n}$ | $\dfrac{1}{1+x^{2}}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}a^{n}x^{n}$ | $\dfrac{1}{1-ax}$ | $\left|x\right|<\frac{1}{\left|a\right|}$ |

      **系数含 $n$ 的（几何级数求导来的）**

      | 级数 | 和函数 | 收敛域 |
      |---|---|---|
      | $\sum\limits_{n=1}^{\infty}nx^{n-1}$ | $\dfrac{1}{(1-x)^{2}}$ | $(-1,1)$ |
      | $\sum\limits_{n=1}^{\infty}nx^{n}$ | $\dfrac{x}{(1-x)^{2}}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}(n+1)x^{n}$ | $\dfrac{1}{(1-x)^{2}}$ | $(-1,1)$ |
      | $\sum\limits_{n=1}^{\infty}n^{2}x^{n}$ | $\dfrac{x(1+x)}{(1-x)^{3}}$ | $(-1,1)$ |
      | $\sum\limits_{n=0}^{\infty}\dfrac{(n+1)(n+2)}{2}x^{n}$ | $\dfrac{1}{(1-x)^{3}}$ | $(-1,1)$ |

      ==通式==：$\displaystyle\sum_{n=0}^{\infty}\binom{n+k-1}{k-1}x^{n}=\frac{1}{(1-x)^{k}}$。
      记住 $k=2$ 那一条就够用，$k=3$ 现推。
    ` },

    { t: 'key', id: 'geometric-two-slots', title: '等比公式是通法：整张表其实只有两个空要填', c: String.raw`
      上面那张表不必背死。==等比级数求和只有两个空==：**首项**和**公比**。
      $$\sum(\text{等比})=\frac{\text{首项}}{1-\text{公比}},\qquad
      \text{成立的前提是}\ \left|\text{公比}\right|<1 .$$

      ==公比不一定是 $x$==。只要「相邻两项之比是个与 $n$ 无关的固定式子」，它就是等比：

      | 级数 | 首项 | 公比 | 收敛条件 |
      |---|---|---|---|
      | $\sum\limits_{n=1}^{\infty}x^{n-1}$ | $1$ | $x$ | $\left|x\right|<1$ |
      | $\sum\limits_{n=1}^{\infty}x^{n}$ | $x$ | $x$ | $\left|x\right|<1$ |
      | $\sum\limits_{n=1}^{\infty}x^{3n}$ | $x^{3}$ | $x^{3}$ | $\left|x^{3}\right|<1$ 即 $\left|x\right|<1$ |
      | $\sum\limits_{n=1}^{\infty}e^{-nx}$ | $e^{-x}$ | $e^{-x}$ | $e^{-x}<1$ 即 $x>0$ |
      | $\sum\limits_{n=1}^{\infty}\left(\frac{x}{2}\right)^{n}$ | $\frac{x}{2}$ | $\frac{x}{2}$ | $\left|x\right|<2$ |

      **指数偏离标准的 $x^{n}$ 时，按三档处理**：

      | 指数形状 | 例子 | 公比动了吗 | 怎么办 |
      |---|---|---|---|
      | $n\pm k$（差个常数） | $x^{n-1}$、$x^{n+2}$ | 没动，还是 $x$ | ==只需重读首项==，套 $\frac{a_1}{1-x}$ |
      | $kn$（差个倍数） | $x^{2n}$、$x^{3n}$ | 变成 $x^{k}$ | 把 $x^{k}$ 当一个整体新变量，条件写 $\left|x^{k}\right|<1$ |
      | $n^{2}$、$2^{n}$（非线性） | $x^{n^{2}}$ | ==根本不是等比== | 相邻项之比不是常数式，超纲，别硬凑 |

      **最后一档补一句**：$x+x^{4}+x^{9}+\cdots$ 相邻两项之比是 $x^{2n+1}$，随 $n$ 变，
      所以它不是等比级数，也化归不到 $\frac{1}{1-x}$ 上去 —— 考纲内不会要求求它的初等和。
    ` },

    { t: 'insight', id: 'my-first-term', title: '我的读法：先把 $n$ 的起点代进去，看第一项长什么样', c: String.raw`
      以前看到 $x^{n-1}$、$x^{n+1}$ 这种指数就发怵，
      总怕自己==少乘或者多乘一个 $x$==。后来发现根本不用盯着指数看，
      把 $n$ 的起点代进去、把第一项算出来就够了：

      $\displaystyle\sum_{n=1}^{\infty}x^{n-1}$ 的 $n=1$ 项是 $x^{0}=1$，
      展开就是 $1+x+x^{2}+\cdots$ —— ==它本身已经是标准几何级数了==，和为 $\frac{1}{1-x}$。
      这时候再顺手乘个 $x$，答案就被改成 $\frac{x}{1-x}$，直接错。

      所以我的固定动作变成两步：==写出前两项==，
      第一项就是分子，第二项除以第一项就是公比，$\frac{a_1}{1-q}$ 直接落笔。
      还不放心就做一次[平移换元](#/calculus/series/power-series?at=shift-index)：
      令 $k=n-1$，级数变成 $\sum_{k=0}^{\infty}x^{k}$，和字典一字不差地对上。
    ` },

    { t: 'key', id: 'family-factorial', title: '第二家族｜阶乘族：$e^{x}$ / $\\sin x$ / $\\cos x$', c: String.raw`
      **识别**：分母出现 $n!$、$(2n)!$、$(2n+1)!$。阶乘增长极快，
      ==收敛域几乎必是 $(-\infty,+\infty)$== —— 看到阶乘就可以先把收敛域写上。

      | 级数 | 和函数 | 记忆钩子 |
      |---|---|---|
      | $\sum\limits_{n=0}^{\infty}\dfrac{x^{n}}{n!}$ | $e^{x}$ | 全正、全次幂、连续阶乘 |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}\dfrac{x^{n}}{n!}$ | $e^{-x}$ | 交错 |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}\dfrac{x^{2n+1}}{(2n+1)!}$ | $\sin x$ | ==奇幂配奇阶乘，交错== |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}\dfrac{x^{2n}}{(2n)!}$ | $\cos x$ | ==偶幂配偶阶乘，交错== |
      | $\sum\limits_{n=0}^{\infty}\dfrac{x^{2n+1}}{(2n+1)!}$ | $\operatorname{sh}x=\dfrac{e^{x}-e^{-x}}{2}$ | 同上但==全正== |
      | $\sum\limits_{n=0}^{\infty}\dfrac{x^{2n}}{(2n)!}$ | $\operatorname{ch}x=\dfrac{e^{x}+e^{-x}}{2}$ | 同上但全正 |

      **系数被 $n$ 污染的变形**（考研最爱在这里出题）

      | 级数 | 和函数 | 怎么想 |
      |---|---|---|
      | $\sum\limits_{n=1}^{\infty}\dfrac{x^{n}}{(n-1)!}$ | $xe^{x}$ | 提一个 $x$，下标平移 |
      | $\sum\limits_{n=0}^{\infty}\dfrac{n}{n!}x^{n}$ | $xe^{x}$ | $\frac{n}{n!}=\frac{1}{(n-1)!}$ |
      | $\sum\limits_{n=0}^{\infty}\dfrac{n+1}{n!}x^{n}$ | $(1+x)e^{x}$ | 拆成 $\frac{n}{n!}+\frac{1}{n!}$ |
      | $\sum\limits_{n=0}^{\infty}\dfrac{n^{2}}{n!}x^{n}$ | $x(x+1)e^{x}$ | $\frac{n^{2}}{n!}=\frac{n}{(n-1)!}$，再拆 |
      | $\sum\limits_{n=0}^{\infty}\dfrac{x^{n}}{(n+1)!}$ | $\dfrac{e^{x}-1}{x}$ | 乘除一个 $x$ 补齐阶乘 |

      ==所有变形的核心动作只有一个：让分母的阶乘和分子的幂次「对齐」==，
      多出来的 $x$ 提到外面，缺的 $x$ 乘进去再除掉。
    ` },

    { t: 'key', id: 'family-log', title: '第三家族｜对数与反正切：分母是一次的 $n$', c: String.raw`
      **识别**：分母出现 $n$、$2n$、$2n+1$，==没有阶乘==。
      这一族全是第一家族==积分==出来的，所以分母才多了个 $n$。

      | 级数 | 和函数 | 收敛域 |
      |---|---|---|
      | $\sum\limits_{n=1}^{\infty}(-1)^{n-1}\dfrac{x^{n}}{n}$ | $\ln(1+x)$ | ==$(-1,1]$== |
      | $\sum\limits_{n=1}^{\infty}\dfrac{x^{n}}{n}$ | $-\ln(1-x)$ | ==$[-1,1)$== |
      | $\sum\limits_{n=0}^{\infty}(-1)^{n}\dfrac{x^{2n+1}}{2n+1}$ | $\arctan x$ | ==$[-1,1]$== |
      | $\sum\limits_{n=0}^{\infty}\dfrac{x^{2n+1}}{2n+1}$ | $\dfrac12\ln\dfrac{1+x}{1-x}$ | $(-1,1)$ |
      | $\sum\limits_{n=1}^{\infty}\dfrac{x^{2n}}{2n}$ | $-\dfrac12\ln\left(1-x^{2}\right)$ | $(-1,1)$ |
      | $\sum\limits_{n=1}^{\infty}(-1)^{n-1}\dfrac{x^{2n}}{2n}$ | $\dfrac12\ln\left(1+x^{2}\right)$ | $(-1,1)$ |
      | $\sum\limits_{n=1}^{\infty}\dfrac{x^{n}}{n+1}$ | $\dfrac{-\ln(1-x)-x}{x}$ | $[-1,1)$，$x\neq0$ |

      ==这一族的收敛域端点各不相同，是唯一需要单独记的地方==：
      $\ln(1+x)$ 右端点闭、$-\ln(1-x)$ 左端点闭、$\arctan x$ ==两端都闭==。
      判据是端点处化成交错级数（收敛）还是调和级数（发散）。
    ` },

    { t: 'key', id: 'family-product', title: '第四家族｜分母是乘积：先裂项，退回第三家族', c: String.raw`
      **识别**：分母形如 $n(n+1)$、$n(n+2)$、$(2n-1)(2n+1)$、$4n^{2}-1$。

      **动作**：==先部分分式拆开==（和积分里的拆法完全一样，
      见[有理函数拆分](#/threads/lines/rational?at=telescoping)），再逐项套第三家族。

      $$\sum_{n=1}^{\infty}\frac{x^{n}}{n(n+1)}
      =\sum\frac{x^{n}}{n}-\sum\frac{x^{n}}{n+1}
      =1+\frac{1-x}{x}\ln(1-x),\qquad x\in[-1,1),\ x\neq0 .$$

      验算：$x\to0$ 时右边 $\to\frac x2$，与级数首项 $\frac{x}{1\cdot2}$ 一致。

      ==只要看到分母能因式分解，第一动作永远是拆==，
      不要试图直接找它对应哪个函数。
    ` },

    { t: 'key', id: 'family-binomial', title: '第五家族｜二项式：系数是组合数形状', c: String.raw`
      $$(1+x)^{\alpha}=\sum_{n=0}^{\infty}\binom{\alpha}{n}x^{n}
      =1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^{2}+\cdots,\qquad\left|x\right|<1$$

      | $\alpha$ | 得到 |
      |---|---|
      | 正整数 $m$ | 有限项，中学二项式定理 |
      | $-1$ | $\dfrac{1}{1+x}$（退化成第一家族） |
      | $-k$ | $\dfrac{1}{(1+x)^{k}}$，系数是 $(-1)^{n}\binom{n+k-1}{k-1}$ |
      | $\frac12$ | $\sqrt{1+x}=1+\frac x2-\frac{x^{2}}{8}+\frac{x^{3}}{16}-\cdots$ |
      | $-\frac12$ | $\dfrac{1}{\sqrt{1+x}}$，积分后得 $\operatorname{arsh}x$ / $\arcsin$ 族 |

      ==第一家族只是 $\alpha=-1$ 的特例==。
      $\arcsin x=x+\frac{x^{3}}{6}+\frac{3x^{5}}{40}+\cdots$ 就是把 $(1-x^{2})^{-1/2}$
      展开后逐项积分得到的，考研只需记前两项。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'transform', c: '三、对不上号时的四个平移动作' },

    { t: 'md', c: String.raw`
      考题给的一般项几乎==不会==和字典里的形式严丝合缝，
      差的永远是下面这几类"位移"。认出位移比记住更多条目重要得多。
    ` },

    { t: 'key', id: 'two-stages', title: '先分清哪一半能动：分母定家族，幂次随便改', c: String.raw`
      "不知道往哪个公式上靠"，多半是把一般项当成一个整体在比对。
      正确的做法是==把它拆成两半，分别处理==：

      | 部分 | 看什么 | 能不能动 |
      |---|---|---|
      | **分母 + 符号** | 有无阶乘、阶乘是 $n!$ 还是 $(2n)!$、有无 $(-1)^{n}$ | ==动不了==，它唯一决定了是哪个函数 |
      | **$x$ 的幂次** | 指数是 $n$、$2n$ 还是 $2n+1$ | ==随便改==，换个自变量就行 |

      **为什么幂次可以随便改**：字典里的公式是关于某个哑变量 $t$ 写的，
      $t$ 叫什么、等于什么，完全由你指定。
      ==幂次只是自变量穿的外衣，不是函数的身份证。==

      **于是流程就固定了：**

      1. **看分母定家族** —— 比如看到 $(2n)!$ 配 $(-1)^{n}$，锁定 $\cos$；
      2. **写出该家族的标准形**，把自变量特意写成 $t$：$\cos t=\sum\frac{(-1)^{n}}{(2n)!}t^{2n}$；
      3. **让两边的幂次相等**，解出 $t$ —— 标准形要 $t^{2n}$，题目给 $x^{n}$，
         那就要求 $t^{2n}=x^{n}$，即 ==$t^{2}=x$，$t=\sqrt x$==；
      4. **回代**，顺便检查 $t$ 的取值范围（这一步决定定义域）。

      ==第 3 步是全部的关键，而且它是解方程解出来的，不是猜出来的。==
    ` },

    { t: 'method', id: 'shift-coefficient', title: '① 系数上多了 $n$ 或 $\\frac1n$ → 求导 / 积分', c: String.raw`
      | 一般项里的 | 说明基本级数被 | 逆动作 |
      |---|---|---|
      | 多乘了 $n$ | ==求过导==（求导会把 $x^{n}$ 变成 $nx^{n-1}$） | 先积分回去，算完再求导 |
      | 多除了 $n$ | ==积过分== | 先求导化简，算完再积分 |

      **标准流程**（以 $\sum\frac{x^{n}}{n}$ 为例）：
      设 $S(x)=\sum\frac{x^{n}}{n}$，==先求导==把碍事的 $n$ 消掉：
      $$S'(x)=\sum_{n\ge1}x^{n-1}=\frac{1}{1-x},$$
      再积分回去，用 $S(0)=0$ 定常数：
      $$S(x)=\int_0^x\frac{\d t}{1-t}=-\ln(1-x).$$

      ==别忘了用 $S(0)$ 定积分常数==，这一步漏了答案会差一个常数。
    ` },

    { t: 'method', id: 'shift-power', title: '② 幂次和下标对不齐 → 提取或补进 $x$', c: String.raw`
      $$\sum_{n=1}^{\infty}\frac{x^{n}}{(n-1)!}
      =x\sum_{n=1}^{\infty}\frac{x^{n-1}}{(n-1)!}
      \xrightarrow{\ m=n-1\ }x\sum_{m=0}^{\infty}\frac{x^{m}}{m!}=xe^{x}$$

      **口诀**：==让指数和分母里的那个数字变成同一个==。
      分子幂次高了就提 $x$ 出来，低了就乘 $x$ 进去（外面再除回来）：
      $$\sum_{n=0}^{\infty}\frac{x^{n}}{(n+1)!}
      =\frac1x\sum_{n=0}^{\infty}\frac{x^{n+1}}{(n+1)!}=\frac{e^{x}-1}{x}.$$
      ==注意 $e^{x}$ 的展开从 $m=0$ 起，平移后要减掉那一项==。
    ` },

    { t: 'method', id: 'shift-index', title: '③ 求和起点不一样 → 补项 / 减项', c: String.raw`
      字典里 $\frac{1}{1-x}=\sum_{n=0}^{\infty}x^{n}$ 从 $n=0$ 起，
      而题目常从 $n=1$ 或 $n=2$ 起。直接加减首项即可：

      $$\sum_{n=1}^{\infty}x^{n}=\frac{1}{1-x}-1=\frac{x}{1-x},\qquad
      \sum_{n=2}^{\infty}\frac{x^{n}}{n}=-\ln(1-x)-x .$$

      ==这是最"低级"却最高频的失分点==：结构全看对了，答案差一个 $1$ 或一个 $x$。
      写完和函数一定要==用 $x=0$ 或首项验算一次==。
    ` },

    { t: 'method', id: 'shift-substitute', title: '④ 幂次跳着走 → 把 $x$ 整体换成 $x^{2}$ 或 $-x$', c: String.raw`
      只出现偶次幂或奇次幂时，不要找新公式，==做整体代换==：

      | 看到 | 从哪来 |
      |---|---|
      | $\sum x^{2n}$ | $\frac{1}{1-x}$ 里 $x\to x^{2}$ |
      | $\sum(-1)^{n}x^{2n}$ | $\frac{1}{1-x}$ 里 $x\to -x^{2}$ |
      | $\sum\frac{x^{2n}}{2n}$ | $-\ln(1-x)$ 里 $x\to x^{2}$，再除 $2$ |
      | $\sum(-1)^{n}\frac{x^{2n+1}}{2n+1}$ | $\frac{1}{1+x^{2}}$ 积分 |

      ==代换后收敛域跟着变==：$\left|x\right|<1$ 变成 $\left|x^{2}\right|<1$ 仍是 $\left|x\right|<1$，
      但若换成 $x\to 2x$ 就要改成 $\left|x\right|<\frac12$。
    ` },

    { t: 'method', id: 'shift-root', title: '⑤ 幂次比标准形**低** → 反过来开根号', c: String.raw`
      上一条是"幂次跳着走"（题目 $x^{2n}$，字典 $t^{n}$），往里代就行。
      还有==反过来==的一类：**分母要求 $t^{2n}$，题目只给 $x^{n}$**。
      这时不是往里代，而是==解出 $t$==：

      $$t^{2n}=x^{n}\ \Longrightarrow\ t^{2}=x\ \Longrightarrow\ t=\sqrt x .$$

      | 分母（家族） | 标准形要的幂次 | 题目给的 | 令 |
      |---|---|---|---|
      | $(2n)!$ | $t^{2n}$ | $x^{n}$ | $t=\sqrt x$ |
      | $(2n+1)!$ | $t^{2n+1}$ | $x^{n}$ | $t=\sqrt x$，再补一个 $\frac{1}{\sqrt x}$ |
      | $2n+1$ | $t^{2n+1}$ | $x^{n}$ | $t=\sqrt x$，同上 |

      ==这一步会自动带出定义域限制==：$\sqrt x$ 要有意义就必须 $x\geq0$。
      **题目里那句"在 $(0,+\infty)$ 内"往往就是在提示你开根号**，
      而不是级数只在那里收敛 —— 两回事，别混。

      $x<0$ 时级数照样收敛，只是答案要换一副面孔，
      见[下面这道题的点评](#/calculus/series/power-series?at=ex-cos-sqrt)。
    ` },

    { t: 'example',
      id: 'ex-cos-sqrt',
      title: '幂次对不上时怎么靠：$\\displaystyle\\sum_{n=0}^{\\infty}\\frac{(-1)^{n}}{(2n)!}x^{n}$',
      source: '填空题常见形式',
      level: 2,
      problem: String.raw`
        求幂级数 $\displaystyle\sum_{n=0}^{\infty}\frac{(-1)^{n}}{(2n)!}x^{n}$ 在 $(0,+\infty)$ 内的和函数 $S(x)$。
      `,
      idea: String.raw`
        **先拆两半**（[两阶段模型](#/calculus/series/power-series?at=two-stages)）：

        - 分母 $(2n)!$ + 符号 $(-1)^{n}$ $\Rightarrow$ ==只可能是 $\cos$==。
          偶阶乘配交错，字典里唯此一条，这一步没有第二种可能。
        - 幂次是 $x^{n}$，而 $\cos$ 的标准形要 $t^{2n}$ —— ==差在这里==。

        卡住的人通常在这一步想"是不是记错公式了""要不要求导积分"。
        都不是。==分母已经把家族钉死了，能动的只剩幂次==，
        而幂次靠换元就能改。

        怎么换？不用猜，==列个等式解出来==：要让 $t^{2n}=x^{n}$，
        就要 $t^{2}=x$，于是 $t=\sqrt x$。

        题目那句"在 $(0,+\infty)$ 内"这时候就说得通了：==它是在保证 $\sqrt x$ 有意义==。
      `,
      solution: String.raw`
        余弦的麦克劳林展开（对一切实数 $t$ 成立）：
        $$\cos t=\sum_{n=0}^{\infty}\frac{(-1)^{n}}{(2n)!}t^{2n}.$$

        令 $t=\sqrt x$（$x>0$ 时有意义），则 $t^{2n}=\left(\sqrt x\right)^{2n}=x^{n}$，代入即得
        $$\sum_{n=0}^{\infty}\frac{(-1)^{n}}{(2n)!}x^{n}
        =\sum_{n=0}^{\infty}\frac{(-1)^{n}}{(2n)!}\left(\sqrt x\right)^{2n}=\cos\sqrt x .$$

        $$\boxed{\ S(x)=\cos\sqrt x,\qquad x\in(0,+\infty)\ }$$

        **顺带说清收敛域**：$\left|\dfrac{a_{n+1}}{a_n}\right|=\dfrac{(2n)!}{(2n+2)!}
        =\dfrac{1}{(2n+1)(2n+2)}\to0$，故 ==$R=+\infty$，级数在整个 $\R$ 上收敛==。
        题目限制在 $(0,+\infty)$ 不是因为别处发散。
      `,
      comment: String.raw`
        ### 验算：代一个数

        取 $x=0$：级数只剩首项 $=1$，而 $\cos\sqrt0=\cos0=1$ ✓。
        再看 $x^{1}$ 的系数：级数给 $-\frac{1}{2!}=-\frac12$；
        而 $\cos\sqrt x=1-\frac{x}{2!}+\frac{x^{2}}{4!}-\cdots$ ✓。

        ### $x<0$ 时它是什么？（题目为什么要限制区间）

        级数在整个 $\R$ 上收敛，所以 $x<0$ 处一定也有和，只是 $\sqrt x$ 不是实数了。
        令 $x=-u\;(u>0)$：
        $$\sum_{n=0}^{\infty}\frac{(-1)^{n}}{(2n)!}(-u)^{n}
        =\sum_{n=0}^{\infty}\frac{u^{n}}{(2n)!}
        =\sum_{n=0}^{\infty}\frac{\left(\sqrt u\right)^{2n}}{(2n)!}=\operatorname{ch}\sqrt u .$$
        ==两个 $(-1)^{n}$ 抵消，交错变成全正，$\cos$ 就变成了 $\operatorname{ch}$==。故
        $$S(x)=\begin{cases}\cos\sqrt x, & x\geq0,\\[2pt]
        \operatorname{ch}\sqrt{-x}, & x<0.\end{cases}$$

        这也正是 $\cos(it)=\operatorname{ch}t$ 的一个实数版本 ——
        [双曲函数与三角函数本来就是同一族](#/calculus/series/power-series?at=family-factorial)，
        差别只在符号交不交错。

        ### 一个反直觉的观察

        $\sqrt x$ 在 $x=0$ 处==导数是无穷大==（图像竖直切入），
        但 $\cos\sqrt x$ 在 $x=0$ 处却==光滑得不能再光滑==：
        它等于一个处处收敛的幂级数 $1-\frac{x}{2}+\frac{x^{2}}{24}-\cdots$，是整函数。

        原因是 ==$\cos$ 是偶函数，只用到 $\sqrt x$ 的偶次幂==，
        而偶次幂恰好把根号全部消掉了。
        换成 $\sin\sqrt x$ 就不行了——它含 $\left(\sqrt x\right)^{2n+1}$，
        在 $0$ 处不可导；必须写成 $\dfrac{\sin\sqrt x}{\sqrt x}$ 才重新变得光滑。
        =="根号能不能被吸收掉"，取决于外层函数的奇偶性。==

        ### 同类题，照搬这套流程

        | 题目 | 家族 | 令 | 答案 |
        |---|---|---|---|
        | $\sum\limits_{n=0}^{\infty}\dfrac{x^{n}}{(2n)!}$ | $\operatorname{ch}$ | $t=\sqrt x$ | $\operatorname{ch}\sqrt x$ |
        | $\sum\limits_{n=0}^{\infty}\dfrac{(-1)^{n}}{(2n+1)!}x^{n}$ | $\sin$ | $t=\sqrt x$ | $\dfrac{\sin\sqrt x}{\sqrt x}$ |
        | $\sum\limits_{n=0}^{\infty}\dfrac{x^{2n}}{n!}$ | $e$ | $t=x^{2}$ | $e^{x^{2}}$ |
        | $\sum\limits_{n=0}^{\infty}\dfrac{(-1)^{n}}{n!}x^{2n}$ | $e$ | $t=-x^{2}$ | $e^{-x^{2}}$ |

        ==第二行注意补 $\frac{1}{\sqrt x}$==：标准形是 $t^{2n+1}$，比 $x^{n}=t^{2n}$ 多一次幂，
        所以要先乘 $\sqrt x$ 凑齐、再除回来。
      `,
    },

    /* ================================================================== */
    { t: 'h', id: 'domain', c: '四、收敛域：两步，端点必须单独查' },

    { t: 'method', id: 'radius', title: '先算半径，再逐个试端点', c: String.raw`
      **第一步：比值法（或根值法）求收敛半径**
      $$\rho=\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|,\qquad R=\frac1\rho .$$
      （$\rho=0$ 时 $R=+\infty$；$\rho=+\infty$ 时 $R=0$。）

      **第二步：把 $x=\pm R$ 分别代回原级数**，用数项级数的判别法单独判断。
      ==端点绝不能靠推理，必须代进去看==。

      | 端点代入后变成 | 结论 |
      |---|---|
      | 调和级数 $\sum\frac1n$ | 发散 |
      | 交错调和 $\sum\frac{(-1)^{n}}{n}$ | 收敛（莱布尼茨） |
      | $\sum\frac{1}{n^{p}},\;p>1$ | 收敛 |
      | $\sum(\pm1)^{n}$ | 发散（通项不趋于零） |

      **缺项级数的陷阱**：$\sum a_nx^{2n}$ 这类==不能直接对 $a_n$ 用比值法==，
      要把 $x^{2n}$ 整体看成 $u^{n}$（令 $u=x^{2}$），或直接对
      $\left|\frac{u_{n+1}(x)}{u_n(x)}\right|$ 求极限再解不等式。
    ` },

    { t: 'key', id: 'endpoint-shift', title: '逐项求导 / 积分：半径纹丝不动，端点会跳', c: String.raw`
      > ==逐项求导、逐项积分不改变收敛半径 $R$，却会改变端点处的敛散性。==

      **为什么半径不变**：求导相当于给系数乘一个 $n$，积分相当于除一个 $n$，
      而 $\frac{n+1}{n}\to1$，==撼不动 $\lim\left|\frac{a_{n+1}}{a_n}\right|$==。

      **为什么端点会变**：端点上比的是 $\frac1n$ 与 $\frac{1}{n^{2}}$ 这种量级，
      乘掉一个 $n$ 就是生死之别。==求导往外丢端点，积分往回捡端点。==

      一条链看得最清楚（三个级数半径都是 $1$）：

      | 级数 | 收敛域 | 关系 |
      |---|---|---|
      | $\sum\limits_{n=1}^{\infty}\frac{x^{n+1}}{n(n+1)}$ | $[-1,1]$ | 两端都收敛 |
      | $\sum\limits_{n=1}^{\infty}\frac{x^{n}}{n}$ | $[-1,1)$ | 求导一次，==丢了 $x=1$== |
      | $\sum\limits_{n=1}^{\infty}x^{n-1}$ | $(-1,1)$ | 再求导一次，==两端全丢== |

      **实战推论（这三条是踩分点）**：
      1. 求和函数时可以放心求导，==中间那个开区间上算出来的表达式是对的==；
      2. ==但收敛域必须回到原级数去定==，绝不能拿求导后那个级数的端点结论交卷；
      3. 端点处原级数收敛、而求出来的表达式在那里没定义时，
         用[阿贝尔定理](#/calculus/series/sum-function?at=abel)取单侧极限把值补上。

      配套的完整例题见[两截拼接那道](#/calculus/series/power-series?at=ex-split-exp)。
    ` },

    { t: 'method', id: 'numeric', title: '数项级数求和：代一个具体的 $x$ 进去', c: String.raw`
      看到 $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2^{n}}$ 这种没有 $x$ 的，
      ==先把它还原成幂级数在某点的值==：

      $$\sum_{n=1}^{\infty}\frac{n}{2^{n}}=\sum_{n=1}^{\infty}n\left(\frac12\right)^{n}
      =\left.\frac{x}{(1-x)^{2}}\right|_{x=1/2}=2 .$$

      三步：认出 $x=\frac12$ $\to$ 查字典得和函数 $\to$ 代值。
      ==代入点必须在收敛区间内==；恰好落在端点时要用阿贝尔定理讨论连续性。
      更多见[几何级数主线](#/threads/lines/geometric?at=numeric-series)。
    ` },

    { t: 'example',
      id: 'ex-split-exp',
      title: '两截拼起来的函数项级数：$e^{-nx}+\\dfrac{x^{n+1}}{n(n+1)}$',
      level: 3,
      problem: String.raw`设
        $$u_n(x)=e^{-nx}+\frac{x^{n+1}}{n(n+1)}\quad(n=1,2,\dots),$$
        求级数 $\displaystyle\sum_{n=1}^{\infty}u_n(x)$ 的收敛域及和函数。`,

      idea: String.raw`**第一眼：通项是两个东西相加，那就拆。**
        级数的加减是[线性运算](#/calculus/series/abstract?at=linear-safe)，
        两个都收敛时和可以分开算。代价是==最后收敛域必须取交集==，一个都不能少查。

        **第一截 $\sum e^{-nx}$**：别被 $e$ 吓住。写成 $\sum\left(e^{-x}\right)^{n}$，
        ==公比是 $e^{-x}$，首项也是 $e^{-x}$==，是纯粹的等比级数，
        直接[套那两个空](#/calculus/series/power-series?at=geometric-two-slots)，
        收敛条件由 $\left|e^{-x}\right|<1$ 解出来。

        **第二截 $\sum\frac{x^{n+1}}{n(n+1)}$**：分母是两个因子的乘积，
        对应[第四家族](#/calculus/series/power-series?at=family-product)的处理法 ——
        ==求两次导，把 $n+1$ 和 $n$ 逐个消掉==：
        第一次求导，分子的幂次 $n+1$ 掉下来约掉分母的 $n+1$；
        第二次求导，剩下的 $n$ 掉下来约掉分母的 $n$，通项变成 $x^{n-1}$。

        ==注意这里 $n$ 从 $1$ 起，首项恰好是 $x^{0}=1$==，
        所以 $\sum x^{n-1}$ 本身就是标准几何级数，和是 $\frac{1}{1-x}$，
        **不需要再乘一个 $x$**（乘了就变成 $\frac{x}{1-x}$，后面积分还原全盘皆错）。

        **最后一步最容易丢分**：求导会丢端点，所以
        ==第二截的收敛域必须回到它自己的原级数去定，而不是看 $\sum x^{n-1}$==。`,

      solution: String.raw`**一、第一截：等比级数**

        $$\sum_{n=1}^{\infty}e^{-nx}=\sum_{n=1}^{\infty}\left(e^{-x}\right)^{n},
        \qquad a_1=e^{-x},\quad q=e^{-x}.$$
        由 $e^{-x}>0$，收敛条件 $\left|q\right|<1$ 即 $e^{-x}<1$，两边取对数得 $-x<0$，
        所以 $\boxed{x>0}$，且
        $$S_1(x)=\frac{e^{-x}}{1-e^{-x}}=\frac{1}{e^{x}-1},\qquad x\in(0,+\infty).$$

        **二、第二截：收敛域**

        记 $S_2(x)=\displaystyle\sum_{n=1}^{\infty}\frac{x^{n+1}}{n(n+1)}$。比值法
        $$\rho=\lim_{n\to\infty}\left|\frac{n(n+1)}{(n+1)(n+2)}\,x\right|=\left|x\right|
        \ \Longrightarrow\ R=1 .$$
        端点==代回原级数==：$x=\pm1$ 时 $\left|u_n\right|=\frac{1}{n(n+1)}\sim\frac{1}{n^{2}}$，
        由 $p$ 级数（$p=2>1$）绝对收敛。故第二截的收敛域是 $[-1,1]$，==两端都要==。

        **三、第二截：和函数**

        先在 $(-1,1)$ 内逐项求导两次：
        $$S_2'(x)=\sum_{n=1}^{\infty}\frac{(n+1)x^{n}}{n(n+1)}=\sum_{n=1}^{\infty}\frac{x^{n}}{n}
        =-\ln(1-x),$$
        $$S_2''(x)=\sum_{n=1}^{\infty}x^{n-1}=\frac{1}{1-x}.$$
        由 $S_2(0)=0$ 逐项积分还原：
        $$S_2(x)=\int_{0}^{x}\left[-\ln(1-t)\right]\dt=(1-x)\ln(1-x)+x .$$
        （验算：右端展开为 $\frac{x^{2}}{2}+\frac{x^{3}}{6}+\cdots$，与 $n=1,2$ 两项吻合。）

        **四、取交集，合并**

        $$(0,+\infty)\cap[-1,1]=(0,1].$$
        故收敛域为 $\boxed{(0,1]}$，且当 $0<x<1$ 时
        $$S(x)=\frac{1}{e^{x}-1}+x+(1-x)\ln(1-x);$$
        当 $x=1$ 时原级数为 $\sum\left(e^{-n}+\frac{1}{n(n+1)}\right)$，
        由等比求和与裂项相消得
        $$S(1)=\frac{1}{e-1}+1 ,$$
        与上式在 $x\to1^{-}$ 的极限一致（因为 $(1-x)\ln(1-x)\to0$），
        所以约定 $0\cdot\ln0=0$ 后可以合写成一个式子。`,

      comment: String.raw`**这道题真正考的是"端点归谁管"。**
        求导后的 $\sum x^{n-1}$ 在 $x=1$ 是发散的；
        如果拿它的结论去定收敛域，答案会写成 $(0,1)$，==右端点白丢==。
        原理见[求导积分与端点](#/calculus/series/power-series?at=endpoint-shift)。

        **为什么只用查 $x=1$ 一个端点**：第一截的条件 $x>0$ 是个不对称区间，
        ==它把左半边整个砍掉了==，$x=-1$ 根本进不了交集。
        先算第一截、再算第二截，能省掉一半端点检验。

        **同类变形**（换汤不换药，都是先认公比）：
        把 $e^{-nx}$ 换成 $\frac{1}{2^{n}}$、$\sin^{n}x$、$\left(\frac{x}{3}\right)^{n}$，
        第一截的做法完全一致，只是收敛条件从 $x>0$ 换成别的不等式。`,
    },

    /* ================================================================== */
    { t: 'h', id: 'abstract-radius', c: '五、抽象幂级数：$R$ 与子级数之间只有一个箭头' },

    { t: 'key', id: 'only-arrow', title: '能用的信息就这一条链', c: String.raw`
      设 $R$ 是幂级数 $\sum a_nx^{n}$ 的收敛半径，$r$ 是实数，则

      $$\left|r\right|<R\ \Longrightarrow\ \sum a_nr^{n}\ \text{绝对收敛}
      \ \Longrightarrow\ \text{它的任何子级数（抽出一部分项）也绝对收敛}.$$

      > **术语提醒**：这里的"子级数"指==抽出一部分项==组成的新级数（如只留偶数项）。
      > 它和[加括号那节](#/calculus/series/abstract?at=grouping)里说的
      > "==部分和数列 $\left\{S_n\right\}$ 的子列==" ==不是一回事==，别混。

      **第二个箭头为什么成立**：绝对收敛就是 $\sum\left|a_nr^{n}\right|$ 这个==正项级数==收敛；
      从一个收敛的正项级数里抽走一部分项，剩下的部分和==单调递增且被原来的和压住==，
      由单调有界准则必收敛。$\sum a_{2n}r^{2n}$ 正是"只留偶数项"的那个子级数。
      ==用的是单调有界，跟子列定理无关==。

      取逆否，得到唯一一条能反着用的结论：

      $$\sum a_{2n}r^{2n}\ \text{发散}\ \Longrightarrow\ \left|r\right|\geq R .$$

      ==除此之外的方向全是假的==：

      - 原级数发散 $\nRightarrow$ 子级数发散 —— 子级数可能==系数全是 $0$==；
      - 子级数收敛 $\nRightarrow$ 原级数收敛 —— ==它只看到一半的项，信息更少==；
      - $\left|r\right|=R$ 时原级数可能只是==条件收敛==，
        而条件收敛==撑不起上面那个"抽子项仍收敛"的保障==，子级数可能发散
        （$a_n=\frac{(-1)^{n}}{n}$、$r=1$ 时偶数项子级数就是 $\frac12\sum\frac1n$）。
        ==注意反过来说不成立==：条件收敛时子级数也可能照样收敛，
        细节见[奇偶项那条结论的前提](#/calculus/series/abstract?at=odd-even)。

      **一句话记法**：$R$ 是==绝对收敛==的分界线，不是"收敛/发散"的开关。
      凡是把 $R$ 当开关用、或者把 $<$ 写成 $\leq$ 的选项，先怀疑边界。
    ` },

    { t: 'example',
      id: 'ex-even-subseries',
      title: '偶数项子级数发散，能推出 $r$ 与 $R$ 的什么关系',
      source: '选择题',
      level: 3,
      problem: String.raw`设 $R$ 为幂级数 $\displaystyle\sum_{n=1}^{\infty}a_nx^{n}$ 的收敛半径，$r$ 是实数，则（　）。

        |  |  |
        |---|---|
        | **A** 当 $\sum\limits_{n=1}^{\infty}a_{2n}r^{2n}$ 发散时，$\left|r\right|\geq R$ | **B** 当 $\sum\limits_{n=1}^{\infty}a_{2n}r^{2n}$ 收敛时，$\left|r\right|\leq R$ |
        | **C** 当 $\left|r\right|\geq R$ 时，$\sum\limits_{n=1}^{\infty}a_{2n}r^{2n}$ 发散 | **D** 当 $\left|r\right|\leq R$ 时，$\sum\limits_{n=1}^{\infty}a_{2n}r^{2n}$ 收敛 |`,

      idea: String.raw`==四个选项其实是同一个蕴含关系的四种排列==：
        "$\left|r\right|<R\Rightarrow$ 绝对收敛 $\Rightarrow$ 子列收敛"。

        所以先把这条唯一为真的链写在草稿纸上，再逐个比对：
        ==是它本身或它的逆否，就选；方向反了或者前提被放宽了，就去找反例。==

        找反例的方向也是固定的两个：
        1. 想让==子列强行收敛==（打掉 B、C）：让偶数项系数全为 $0$；
        2. 想让==子列强行发散==（打掉 D）：把 $r$ 卡在边界上，让原级数只是条件收敛。`,

      solution: String.raw`**A 正确。** 反证：若 $\left|r\right|<R$，则 $\sum a_nr^{n}$ 绝对收敛，
        其偶数项子列 $\sum a_{2n}r^{2n}$ 也绝对收敛，与题设"发散"矛盾。
        故必有 $\left|r\right|\geq R$。
        （这正是[那条链](#/calculus/series/power-series?at=only-arrow)的逆否命题。）

        **B、C 错，共用一个反例。** 取
        $$a_{2n-1}=n!,\qquad a_{2n}=0 .$$
        此时 $\sum a_nx^{n}=\sum n!\,x^{2n-1}$，$x\neq0$ 时通项不趋于 $0$，故 $R=0$。
        再取 $r=10$，则 $\sum a_{2n}r^{2n}=\sum 0=0$ ==收敛==。

        - 对 B：子列收敛，却有 $\left|r\right|=10>R=0$，"$\left|r\right|\leq R$" 不成立；
        - 对 C：$\left|r\right|=10\geq R=0$ 成立，子列却收敛而非发散。

        **D 错，边界点失效。** 取 $a_n=\frac{(-1)^{n}}{n}$，易知 $R=1$。
        取 $r=1$，满足 $\left|r\right|\leq R$，但
        $$\sum_{n=1}^{\infty}a_{2n}r^{2n}=\sum_{n=1}^{\infty}\frac{(-1)^{2n}}{2n}
        =\frac12\sum_{n=1}^{\infty}\frac1n$$
        是调和级数，==发散==。

        **答案：A。**`,

      comment: String.raw`**两个反例分工明确**：$a_{2n}=0$ 治"整体推局部"（B、C），
        $r$ 取在边界治"含等号"（D）。这两招几乎覆盖了此类选择题的全部命题手法。

        **D 只差一个等号**：把 $\left|r\right|\leq R$ 改成 $\left|r\right|<R$，它就是真命题。
        这正是[抽象级数那页说的"砍前提"](#/calculus/series/abstract?at=meta-method)——
        ==读选项时要盯死 $<$ 和 $\leq$==。

        **迁移**：把"偶数项子级数"换成"奇数项子级数"、或"抽出下标为平方数的项"，
        结论一字不改，因为整个推理只用到"==收敛的正项级数抽子项必收敛=="这一条。`,
    },

    { t: 'insight', id: 'my-contrapositive', title: '我的读法：真命题只有一条，其余三个都是它的伪装', c: String.raw`
      这题我最后是这么想通的：==有用的结论就一条== ——
      $\left|r\right|<R$ 时原级数绝对收敛，所以它的子列也绝对收敛。

      把它取逆否：==子列既然发散，那就说明 $\left|r\right|<R$ 这个条件压根没被满足==，
      也就是 $\left|r\right|\geq R$。这正好就是 A。

      剩下三个选项都是在==反着用==这条链：
      要么想从"整体发散"推"局部发散"，要么想从"局部收敛"推"整体"。
      ==方向一反，信息就不够了==，必然存在反例。

      所以这类题我不再一个个去凑反例，而是
      ==先把唯一那条真命题和它的逆否写出来，对不上的直接判错==，
      只在拿不准的那一项上才动手构造反例。
    ` },

    /* ================================================================== */
    { t: 'h', id: 'pitfalls', c: '六、易错清单' },

    { t: 'warn', id: 'pitfall-list', title: '这一节的固定失分点', c: String.raw`
      1. **忘写收敛域**：求和函数必须给出定义区间，这是踩分点，不是附加题。
      2. **求和起点没对齐**：$\sum_{n=1}$ 与 $\sum_{n=0}$ 差一个首项，
         ==写完务必用 $x=0$ 或首项验算==。
      3. **逐项求导后下标没跟着变**：求导会消掉 $n=0$ 那一项，下标要从 $1$ 起。
      4. **积分后忘记定常数**：用 $S(0)=0$（或首项）定出来，不能默认为 $0$。
      5. **端点靠猜**：$\ln(1+x)$ 收敛域是 $(-1,1]$、$-\ln(1-x)$ 是 $[-1,1)$、
         $\arctan x$ 是 $[-1,1]$ —— ==三个都不一样==，必须逐个代入验证。
      6. **缺项级数直接用比值法**：$\sum a_nx^{2n}$ 要整体换元。
      7. **拿求导后的级数定收敛域**：求导会丢端点，==收敛域只能回原级数去查==
         （见[求导积分与端点](#/calculus/series/power-series?at=endpoint-shift)）。
      8. **拆成两截后忘了取交集**：两部分各有各的收敛域，
         ==最终收敛域取交集，交集的端点还要再回代原级数验一次==。
      9. **$x=0$ 处的和函数没单独说明**：像 $\frac{e^{x}-1}{x}$ 这种在 $x=0$
         无定义的表达式，要补一句"$x=0$ 时和为 $1$"（由原级数直接读出）。
    ` },

  ],
});
