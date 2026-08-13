/* ==========================================================================
   manifest.js —— 知识树（全站唯一的结构定义）
   ==========================================================================
   层级：学科 subject → 章 chapter → 专题 topic
   路由：#/<subject.id>/<chapter.id>/<topic.id>

   topic 带 file 字段  = 已有内容，启动时自动加载该文件
   topic 不带 file     = 占位，侧栏显示为灰色「待补充」

   新增一个专题：
     1. 在下面对应章节的 topics 里加一条，写上 file 路径
     2. 新建那个内容文件（格式见 CLAUDE.md）
   顺序即侧栏顺序，也是「上一篇 / 下一篇」的顺序。
   ========================================================================== */

KM.tree([

  /* ======================================================================
     高等数学
     ====================================================================== */
  {
    id: 'calculus',
    title: '高等数学',
    chapters: [
      {
        id: 'limit', no: '1', title: '函数、极限、连续',
        topics: [
          { id: 'parity',          title: '函数的奇偶性与对称性',
            file: 'content/calculus/01-limit/parity.js' },
          { id: 'limit-methods',   title: '极限计算方法总览' },
          { id: 'equivalent',      title: '等价无穷小与泰勒展开' },
          { id: 'limit-existence', title: '极限存在性的证明' },
          { id: 'sign-preserving', title: '极限的局部保号性',
            file: 'content/calculus/01-limit/sign-preserving.js' },
          { id: 'continuity',      title: '连续性与间断点' },
          { id: 'closed-interval', title: '闭区间连续函数四大定理',
            file: 'content/calculus/01-limit/closed-interval.js' },
          { id: 'asymptotic',      title: '无穷小比较与渐近分析' },
        ],
      },
      {
        id: 'derivative', no: '2', title: '一元函数微分学（导数与微分）',
        topics: [
          { id: 'definition',   title: '导数定义与可导性判定' },
          { id: 'techniques',   title: '求导技巧（复合 / 隐函数 / 参数方程）' },
          { id: 'high-order',   title: '高阶导数与莱布尼茨公式',
            file: 'content/calculus/02-derivative/high-order.js' },
          { id: 'differential', title: '微分与近似计算' },
        ],
      },
      {
        id: 'derivative-app', no: '3', title: '微分中值定理与导数应用',
        topics: [
          { id: 'proof-overview', title: '证明题总纲：工具箱与构造技巧',
            file: 'content/calculus/03-derivative-app/proof-overview.js' },
          { id: 'mvt-proof',     title: '中值定理证明题',
            file: 'content/calculus/03-derivative-app/mvt-proof.js' },
          { id: 'derivative-bound', title: '导数有界与函数的控制',
            file: 'content/calculus/03-derivative-app/derivative-bound.js' },
          { id: 'taylor-proof',  title: '泰勒公式类证明',
            file: 'content/calculus/03-derivative-app/taylor-proof.js' },
          { id: 'inequality',    title: '不等式的证明' },
          { id: 'roots',         title: '零点个数与方程的根',
            file: 'content/calculus/03-derivative-app/roots.js' },
          { id: 'monotone',      title: '单调性 / 极值 / 最值' },
          { id: 'convexity',     title: '凹凸性 / 拐点 / 渐近线' },
          { id: 'curvature',     title: '曲率与相关变化率' },
        ],
      },
      {
        id: 'indefinite', no: '4', title: '不定积分',
        topics: [
          { id: 'substitution', title: '换元法（凑微分 / 三角代换）' },
          { id: 'by-parts',     title: '分部积分法' },
          { id: 'rational',     title: '有理函数与三角有理式' },
          { id: 'toolbox',      title: '常见积分类型速查' },
        ],
      },
      {
        id: 'definite', no: '5', title: '定积分与反常积分',
        topics: [
          { id: 'properties',   title: '定积分的性质与计算' },
          { id: 'variable-limit', title: '变限积分函数' },
          { id: 'integral-proof', title: '积分不等式与积分证明题' },
          { id: 'improper',     title: '反常积分及其敛散性' },
        ],
      },
      {
        id: 'definite-app', no: '6', title: '定积分的应用',
        topics: [
          { id: 'area-volume', title: '面积、体积与弧长' },
          { id: 'physics',     title: '物理应用（压力 / 功 / 质心）' },
          { id: 'micro-element', title: '微元法的建模思路' },
        ],
      },
      {
        id: 'ode', no: '7', title: '常微分方程',
        topics: [
          { id: 'first-order',   title: '一阶方程的类型识别与解法' },
          { id: 'solution-structure', title: '解的结构：通解、特解与叠加原理',
            file: 'content/calculus/07-ode/solution-structure.js' },
          { id: 'linear-const',  title: '高阶常系数线性方程',
            file: 'content/calculus/07-ode/linear-const.js' },
          { id: 'euler',         title: '欧拉方程与可降阶方程' },
          { id: 'applications',  title: '微分方程应用题' },
        ],
      },
      {
        id: 'vector-geometry', no: '8', title: '向量代数与空间解析几何',
        topics: [
          { id: 'vector-ops',  title: '向量运算与几何意义' },
          { id: 'plane-line',  title: '平面与直线' },
          { id: 'surfaces',    title: '曲面、空间曲线与投影' },
        ],
      },
      {
        id: 'multi-derivative', no: '9', title: '多元函数微分学',
        topics: [
          { id: 'concepts',      title: '偏导、全微分与可微性' },
          { id: 'chain-rule',    title: '复合与隐函数求导' },
          { id: 'extremum',      title: '极值、条件极值与最值',
            file: 'content/calculus/09-multi-derivative/extremum.js' },
          { id: 'geometry-app',  title: '几何应用：切平面与切线',
            file: 'content/calculus/09-multi-derivative/geometry-app.js' },
          { id: 'gradient',      title: '方向导数与梯度',
            file: 'content/calculus/09-multi-derivative/gradient.js' },
        ],
      },
      {
        id: 'multi-integral', no: '10', title: '重积分',
        topics: [
          { id: 'double',        title: '二重积分：换序与坐标选择' },
          { id: 'separable',     title: '变量分离与升维：高斯积分与柯西不等式',
            file: 'content/calculus/10-multi-integral/separable.js' },
          { id: 'triple',        title: '三重积分：投影法与截面法',
            file: 'content/calculus/10-multi-integral/triple.js' },
          { id: 'symmetry',      title: '对称性与轮换对称性' },
          { id: 'integral-app',  title: '重积分的应用' },
        ],
      },
      {
        id: 'line-surface', no: '11', title: '曲线积分与曲面积分',
        topics: [
          { id: 'line-integral',    title: '第一类 / 第二类曲线积分' },
          { id: 'green',            title: '格林公式与路径无关',
            file: 'content/calculus/11-line-surface/green.js' },
          { id: 'first-kind-surface',  title: '第一类曲面积分',
            file: 'content/calculus/11-line-surface/first-kind-surface.js' },
          { id: 'second-kind-surface', title: '第二类曲面积分' },
          { id: 'gauss-stokes',     title: '高斯公式与斯托克斯公式' },
          { id: 'field-theory',     title: '散度、旋度与场论初步' },
        ],
      },
      {
        id: 'series', no: '12', title: '无穷级数',
        topics: [
          { id: 'convergence',   title: '正项级数敛散性判别' },
          { id: 'general-series', title: '交错级数与任意项级数' },
          { id: 'power-series',  title: '幂级数收敛域与和函数',
            file: 'content/calculus/12-series/power-series.js' },
          { id: 'expansion',     title: '函数展开成幂级数' },
          { id: 'fourier',       title: '傅里叶级数' },
        ],
      },
    ],
  },

  /* ======================================================================
     线性代数
     ====================================================================== */
  {
    id: 'linear-algebra',
    title: '线性代数',
    chapters: [
      {
        id: 'determinant', no: '1', title: '行列式',
        topics: [
          { id: 'computation', title: '行列式的计算技巧' },
          { id: 'special',     title: '特殊行列式与递推' },
        ],
      },
      {
        id: 'matrix', no: '2', title: '矩阵',
        topics: [
          { id: 'operations',  title: '矩阵运算与可逆性' },
          { id: 'rank',        title: '秩的性质与求法' },
          { id: 'block',       title: '分块矩阵与初等变换' },
          { id: 'equations',   title: '矩阵方程与抽象矩阵' },
        ],
      },
      {
        id: 'vectors', no: '3', title: '向量组',
        topics: [
          { id: 'independence', title: '线性相关性的判定与证明' },
          { id: 'basis',        title: '极大无关组、秩与等价' },
          { id: 'space',        title: '向量空间、基与坐标变换',
            file: 'content/linear-algebra/03-vectors/space.js' },
        ],
      },
      {
        id: 'linear-systems', no: '4', title: '线性方程组',
        topics: [
          { id: 'solvability', title: '解的存在性与结构' },
          { id: 'parameters',  title: '含参数方程组的讨论' },
          { id: 'common-sol',  title: '公共解与同解问题' },
        ],
      },
      {
        id: 'eigen', no: '5', title: '特征值与特征向量',
        topics: [
          { id: 'basics',        title: '特征值特征向量的求法与性质' },
          { id: 'similarity',    title: '相似对角化',
            file: 'content/linear-algebra/05-eigen/similarity.js' },
          { id: 'symmetric',     title: '实对称矩阵与正交相似',
            file: 'content/linear-algebra/05-eigen/symmetric.js' },
          { id: 'applications',  title: '由特征值反求矩阵 / 求方幂' },
        ],
      },
      {
        id: 'quadratic', no: '6', title: '二次型',
        topics: [
          { id: 'standard',     title: '化标准形（配方法 / 正交变换）' },
          { id: 'definite',     title: '正定性判定' },
          { id: 'congruence',   title: '合同、惯性定理与规范形' },
        ],
      },
    ],
  },

  /* ======================================================================
     概率论与数理统计
     ====================================================================== */
  {
    id: 'probability',
    title: '概率论与数理统计',
    chapters: [
      {
        id: 'events', no: '1', title: '随机事件与概率',
        topics: [
          { id: 'operations',   title: '事件关系与概率计算' },
          { id: 'conditional',  title: '条件概率、全概率与贝叶斯' },
          { id: 'independence', title: '独立性与伯努利试验' },
        ],
      },
      {
        id: 'random-var', no: '2', title: '一维随机变量及其分布',
        topics: [
          { id: 'distributions', title: '常见分布及其背景' },
          { id: 'cdf-pdf',       title: '分布函数与密度函数' },
          { id: 'function-of-rv', title: '随机变量函数的分布' },
        ],
      },
      {
        id: 'multi-random-var', no: '3', title: '多维随机变量及其分布',
        topics: [
          { id: 'joint',        title: '联合分布、边缘分布与条件分布' },
          { id: 'independence', title: '独立性判定' },
          { id: 'function-2d',  title: '二维随机变量函数的分布' },
          { id: 'normal-2d',    title: '二维正态分布' },
        ],
      },
      {
        id: 'moments', no: '4', title: '随机变量的数字特征',
        topics: [
          { id: 'expectation', title: '期望与方差的计算' },
          { id: 'covariance',  title: '协方差与相关系数' },
          { id: 'tricks',      title: '数字特征的常用技巧' },
        ],
      },
      {
        id: 'lln-clt', no: '5', title: '大数定律与中心极限定理',
        topics: [
          { id: 'lln', title: '切比雪夫不等式与大数定律' },
          { id: 'clt', title: '中心极限定理的应用' },
        ],
      },
      {
        id: 'statistics', no: '6', title: '数理统计的基本概念',
        topics: [
          { id: 'sampling',      title: '总体、样本与统计量' },
          { id: 'distributions', title: '三大抽样分布与正态总体' },
        ],
      },
      {
        id: 'estimation', no: '7', title: '参数估计与假设检验',
        topics: [
          { id: 'point',        title: '矩估计与最大似然估计' },
          { id: 'evaluation',   title: '估计量的评价（无偏 / 有效 / 一致）' },
          { id: 'interval',     title: '区间估计' },
          { id: 'hypothesis',   title: '假设检验' },
        ],
      },
    ],
  },

  /* ======================================================================
     跨章节手法主线
     —— 另一条轴。上面三个学科按「对象」（函数 / 矩阵 / 随机变量）组织，
        这里按「动作」组织：同一个操作手法，在不同章节的不同战场上反复出现。
        专题文章性质，不对应任何单一考点。
     ====================================================================== */
  {
    id: 'threads',
    title: '跨章节手法主线',
    chapters: [
      {
        id: 'map', title: '总纲',
        topics: [
          { id: 'overview', title: '按手法重组：另一张地图',
            file: 'content/threads/00-map/overview.js' },
        ],
      },
      {
        id: 'lines', title: '四条主线',
        topics: [
          { id: 'taylor',    title: '① 泰勒展开：把超越函数换成多项式',
            file: 'content/threads/01-lines/taylor.js' },
          { id: 'geometric', title: '② 几何级数：从求和函数到矩阵求逆',
            file: 'content/threads/01-lines/geometric.js' },
          { id: 'rational',  title: '③ 有理函数拆分：降维与解耦',
            file: 'content/threads/01-lines/rational.js' },
          { id: 'quadratic', title: '④ 二次型与正交变换：消掉交叉项',
            file: 'content/threads/01-lines/quadratic.js' },
        ],
      },
      {
        id: 'patterns', title: '同构结构',
        topics: [
          /* 结构层：不是操作步骤，而是反复出现的代数骨架 */
          { id: 'subadditive', title: '次可加性：整体 ≤ 部分之和',
            file: 'content/threads/02-patterns/subadditive.js' },
          { id: 'cauchy-schwarz', title: '柯西–施瓦茨：内积被范数控制',
            file: 'content/threads/02-patterns/cauchy-schwarz.js' },
          { id: 'shift', title: '移位与调制：乘指数 ⟺ 平移自变量',
            file: 'content/threads/02-patterns/shift.js' },
        ],
      },
    ],
  },

  /* ======================================================================
     随笔
     —— 既不是知识点（对象），也不是手法（动作），而是元层面的思考：
        数学在做什么、学它是在干什么、能用到哪里。
        不对应任何考点，属于「额外的部分」。
     ====================================================================== */
  {
    id: 'notes',
    title: '随笔',
    chapters: [
      {
        id: 'essays', title: '关于数学本身',
        topics: [
          { id: 'math-as-language', title: '数学作为一门语言',
            file: 'content/notes/00-essays/math-as-language.js' },
          { id: 'certainty', title: '专注即确定性表达',
            file: 'content/notes/00-essays/certainty.js' },
        ],
      },
    ],
  },

]);
