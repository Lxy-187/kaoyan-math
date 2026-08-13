/* ==========================================================================
   blocks.js —— 内容块渲染器
   一个内容页 = 一个 blocks 数组。每个块有 t 字段决定类型和配色。
   块类型清单见 CLAUDE.md，新增类型时两边都要改。
   ========================================================================== */

(function (KM) {

  const md = s => '<div class="prose">' + KM.md(s) + '</div>';
  const esc = KM.esc;

  /* ---------------------------- 锚点 ----------------------------
     每个块都可以写 id: 'xxx'（短 ASCII，与中文标题解耦），
     别处就能用 #/<页面路径>?at=xxx 精确链过来。
     没写 id 的块退回自动生成的 id，仍然可寻址，只是改标题会断链。 */
  const idAttr = id => (id ? ' id="' + esc(id) + '"' : '');

  const anchorLink = id => (id && KM.ctx.path)
    ? '<a class="block-anchor" href="#/' + KM.ctx.path + '?at=' + encodeURIComponent(id) +
      '" title="这一块的直达链接" aria-hidden="true">#</a>'
    : '';

  /* 各类提示块的图标与中文名 */
  const KINDS = {
    key:     { icon: '◆', label: '核心结论', kind: 'KEY' },
    method:  { icon: '▶', label: '方法套路', kind: 'METHOD' },
    insight: { icon: '★', label: '我的思路', kind: 'INSIGHT' },
    warn:    { icon: '⚠', label: '易错警示', kind: 'PITFALL' },
    quote:   { icon: '❝', label: '原始记录', kind: 'NOTE' },
  };

  /* ------------------------------ 分发 ------------------------------ */
  function render(b, idx) {
    switch (b.t) {
      case 'md':      return md(b.c);
      case 'h':       return heading(b);
      case 'key':
      case 'method':
      case 'insight':
      case 'warn':
      case 'quote':   return callout(b);
      case 'steps':   return steps(b);
      case 'example': return example(b, idx);
      case 'compare': return compare(b);
      case 'formulas':return formulas(b);
      default:
        console.warn('[KM] 未知块类型：' + b.t, b);
        return md(b.c || '');
    }
  }

  /* ------------------------------ 二级标题 ------------------------------ */
  function heading(b) {
    const id = b.id || ('sec-' + slugify(b.c || b.title || ''));
    return '<h2 class="sec-title"' + idAttr(id) + '>' + inlineMd(b.c || b.title) +
           anchorLink(id).replace('block-anchor', 'anchor') + '</h2>';
  }

  /* ------------------------------ 提示块 ------------------------------ */
  function callout(b) {
    const k = KINDS[b.t];
    const head = (b.title || b.t !== 'quote')
      ? '<div class="block-head">' +
          '<span class="b-icon">' + k.icon + '</span>' +
          '<span class="b-kind">' + k.kind + '</span>' +
          '<span class="b-title">' + inlineMd(b.title || k.label) + '</span>' +
          anchorLink(b.id) +
        '</div>'
      : '';
    return '<div class="block ' + b.t + '"' + idAttr(b.id) + '>' + head + md(b.c) + '</div>';
  }

  /* ------------------------------ 步骤流程 ------------------------------ */
  function steps(b) {
    const head = b.title
      ? '<div class="block-head" style="--cl:var(--c-method)">' +
          '<span class="b-icon">▶</span><span class="b-kind">STEPS</span>' +
          '<span class="b-title">' + inlineMd(b.title) + '</span>' +
          anchorLink(b.id) + '</div>'
      : '';
    const items = (b.items || []).map(it => {
      const o = typeof it === 'string' ? { c: it } : it;
      return '<div class="step">' +
             (o.title ? '<div class="step-title">' + inlineMd(o.title) + '</div>' : '') +
             (o.c ? md(o.c) : '') + '</div>';
    }).join('');
    return '<div class="steps-wrap"' + idAttr(b.id) + '>' +
           head + '<div class="steps">' + items + '</div></div>';
  }

  /* ------------------------------ 例题卡 ------------------------------ */
  let exCounter = 0;
  function example(b) {
    exCounter++;
    // 位置编号 ex-N 会因为插入新例题而错位，所以优先用作者写死的 id
    const id = b.id || ('ex-' + exCounter);
    const stars = b.level ? '★'.repeat(Math.max(1, Math.min(5, b.level))) +
                            '☆'.repeat(5 - Math.max(1, Math.min(5, b.level))) : '';

    let h = '<section class="ex"' + idAttr(id) + '>';
    h += '<div class="ex-head">';
    h += '<span class="ex-badge">例 ' + exCounter + '</span>';
    if (b.title)  h += '<span class="ex-title">' + inlineMd(b.title) + '</span>';
    if (b.source) h += '<span class="ex-src">' + inlineMd(b.source) + '</span>';
    if (stars)    h += '<span class="ex-stars" title="难度 ' + b.level + '/5">' + stars + '</span>';
    h += anchorLink(b.id);
    h += '</div>';

    h += '<div class="ex-body">';
    if (b.problem) h += '<div class="ex-problem">' + md(b.problem) + '</div>';

    h += fold('f-idea',     '思路',   '先自己想 30 秒再展开', b.idea,     b.openIdea);
    h += fold('f-solution', '解答',   '',                     b.solution, b.openSolution);
    h += fold('f-comment',  '点评 / 拓展', '',                b.comment,  b.openComment);
    h += '</div></section>';
    return h;
  }

  function fold(cls, label, hint, content, open) {
    if (!content) return '';
    return '<details class="fold ' + cls + '"' + (open ? ' open' : '') + '>' +
             '<summary><span class="caret">▶</span>' + label +
             (hint ? '<span class="hint">' + esc(hint) + '</span>' : '') +
           '</summary>' +
           '<div class="fold-body">' + md(content) + '</div></details>';
  }

  /* ------------------------------ 对比表 ------------------------------ */
  function compare(b) {
    const cols = b.cols || [];
    const th = cols.map(c => '<th>' + inlineMd(c) + '</th>').join('');
    const tb = (b.rows || []).map(r =>
      '<tr>' + r.map(c => '<td>' + inlineMd(String(c == null ? '' : c)) + '</td>').join('') + '</tr>'
    ).join('');
    return '<div class="compare"' + idAttr(b.id) + '>' +
           (b.title ? '<div class="compare-title">' + inlineMd(b.title) + anchorLink(b.id) + '</div>' : '') +
           '<div class="table-wrap"><table class="data"><thead><tr>' + th +
           '</tr></thead><tbody>' + tb + '</tbody></table></div></div>';
  }

  /* ------------------------------ 公式速查 ------------------------------ */
  function formulas(b) {
    const head = b.title
      ? '<div class="block-head" style="--cl:var(--c-key)">' +
          '<span class="b-icon">◆</span><span class="b-kind">FORMULA</span>' +
          '<span class="b-title">' + inlineMd(b.title) + '</span>' +
          anchorLink(b.id) + '</div>'
      : '';
    const items = (b.items || []).map(it =>
      '<div class="formula-item">' +
        (it.label ? '<div class="f-label">' + inlineMd(it.label) + '</div>' : '') +
        KM.tex(it.tex, true) +
      '</div>').join('');
    return '<div class="formulas-wrap"' + idAttr(b.id) + '>' +
           head + '<div class="formula-grid">' + items + '</div></div>';
  }

  /* ------------------------------ 小工具 ------------------------------ */
  // 只做行内解析：去掉外层 <p>
  function inlineMd(s) {
    const h = KM.md(s || '');
    const m = h.match(/^<p>([\s\S]*)<\/p>$/);
    return m ? m[1] : h;
  }

  function slugify(s) {
    return String(s).replace(/[*_`~=#$\\]/g, '').trim()
      .replace(/\s+/g, '-').replace(/[^\w一-龥-]/g, '') || 'sec';
  }

  /* 提取页面大纲（供右侧目录用）：h 块 + 例题 */
  function outline(page) {
    const items = [];
    let ex = 0;
    (page.blocks || []).forEach(b => {
      if (b.t === 'h') {
        items.push({ level: 2, id: b.id || ('sec-' + slugify(b.c || b.title || '')),
                     text: stripMd(b.c || b.title) });
      } else if (b.t === 'example') {
        ex++;
        items.push({ level: 3, id: b.id || ('ex-' + ex),
                     text: '例' + ex + (b.title ? ' · ' + stripMd(b.title) : '') });
      }
    });
    return items;
  }

  function stripMd(s) {
    return String(s || '')
      .replace(/\$[^$]*\$/g, '□')   // 公式压成一个方块，目录里不适合展开
      .replace(/\*\*|==|~~|`/g, '') // 只去成对标记，单个 = ~ * 是正文内容
      .trim();
  }

  KM.renderBlock = render;
  KM.inlineMd = inlineMd;          // 供页头副标题等单行场合复用
  KM.resetExampleCounter = () => { exCounter = 0; };
  KM.outline = outline;
  KM.stripMd = stripMd;
  KM.slugify = slugify;

})(window.KM);
