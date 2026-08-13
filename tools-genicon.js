/* 直接在 Node 里生成图标 PNG —— 不经过任何 base64 传输，避免截断。
   画法：把积分号 ∫ 当成一条加粗的三次贝塞尔曲线，沿曲线盖圆盘，
   4 倍超采样后降采样得到抗锯齿。输出 colorType=2（RGB，无 alpha）。 */

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

/* ---------------- CRC32 ---------------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/* rgb: Uint8Array，长度 w*h*3 */
function encodePNG(w, h, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 2;    // color type 2 = truecolor RGB，无 alpha
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // 每行前面加一个 filter 字节 0
  const stride = w * 3;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgb.buffer, rgb.byteOffset + y * stride, stride)
      .copy(raw, y * (stride + 1) + 1);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------------- 画 ∫ ---------------- */
// 单位坐标 (0..1)，y 向下。三次贝塞尔的四个点。
const P = [
  [0.635, 0.150],   // 上端点（右上）
  [0.330, 0.055],   // 控制点：把顶部往左上拉 → 上钩
  [0.670, 0.945],   // 控制点：把底部往右下拉 → 下钩
  [0.365, 0.850],   // 下端点（左下）
];

function bez(t) {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [
    a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0],
    a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1],
  ];
}

const BG = [0x1d, 0x4e, 0xd8];
const FG = [0xff, 0xff, 0xff];

function render(size) {
  const SS = 4;                    // 超采样倍数
  const G = size * SS;
  const cov = new Uint8Array(G * G);

  const r = 0.052 * G;             // 笔画半径
  const r2 = r * r;
  const N = 2400;

  for (let i = 0; i <= N; i++) {
    const [ux, uy] = bez(i / N);
    const cx = ux * G, cy = uy * G;
    const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(G - 1, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(G - 1, Math.ceil(cy + r));
    for (let y = y0; y <= y1; y++) {
      const dy = y + 0.5 - cy;
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx;
        if (dx * dx + dy * dy <= r2) cov[y * G + x] = 1;
      }
    }
  }

  // 降采样成覆盖率，再把白色混到蓝底上
  const out = new Uint8Array(size * size * 3);
  const per = SS * SS;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let hit = 0;
      for (let sy = 0; sy < SS; sy++) {
        const row = (y * SS + sy) * G + x * SS;
        for (let sx = 0; sx < SS; sx++) hit += cov[row + sx];
      }
      const a = hit / per;
      const o = (y * size + x) * 3;
      for (let k = 0; k < 3; k++) out[o + k] = Math.round(BG[k] * (1 - a) + FG[k] * a);
    }
  }
  return out;
}

/* ---------------- 输出并自检 ---------------- */
function verify(file) {
  const b = fs.readFileSync(file);
  if (b.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error(file + '：签名错误');
  let p = 8, idat = [], w, h, seenIEND = false;
  while (p < b.length) {
    const len = b.readUInt32BE(p);
    const type = b.slice(p + 4, p + 8).toString('latin1');
    if (p + 12 + len > b.length) throw new Error(file + '：' + type + ' 块越界（文件被截断）');
    const stored = b.readUInt32BE(p + 8 + len);
    const calc = crc32(b.slice(p + 4, p + 8 + len));
    if (stored !== calc) throw new Error(file + '：' + type + ' 块 CRC 不符');
    if (type === 'IHDR') { w = b.readUInt32BE(p + 8); h = b.readUInt32BE(p + 12); }
    if (type === 'IDAT') idat.push(b.slice(p + 8, p + 8 + len));
    if (type === 'IEND') seenIEND = true;
    p += 12 + len;
  }
  if (!seenIEND) throw new Error(file + '：缺少 IEND');
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const want = h * (1 + w * 3);
  if (raw.length !== want) throw new Error(file + '：像素数据长度 ' + raw.length + '，应为 ' + want);
  // 统计颜色，确认不是一整块纯色（那就说明字形没画上）
  let white = 0, blue = 0;
  for (let i = 0; i < h; i++) {
    const off = i * (1 + w * 3) + 1;
    for (let j = 0; j < w; j++) {
      const v = raw[off + j * 3];
      if (v > 200) white++; else if (v < 80) blue++;
    }
  }
  const pct = (white / (w * h) * 100).toFixed(1);
  return { file: path.basename(file), size: w + 'x' + h, bytes: b.length, 白色占比: pct + '%' };
}

const dir = process.argv[2];
const sizes = [32, 152, 167, 180, 192, 512];
const names = { 32: 'favicon-32.png', 180: 'apple-touch-icon.png' };

const report = [];
for (const s of sizes) {
  const name = names[s] || ('icon-' + s + '.png');
  const file = path.join(dir, name);
  fs.writeFileSync(file, encodePNG(s, s, render(s)));
  report.push(verify(file));
}
console.table(report);
