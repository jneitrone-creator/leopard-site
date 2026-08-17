const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(dir);

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of files) {
    const fp = path.join(dir, f);
    const before = fs.statSync(fp).size;
    totalBefore += before;
    const buf = fs.readFileSync(fp);
    const img = sharp(buf).rotate();
    const meta = await img.metadata();

    let pipeline = img;
    if (meta.width && meta.width > 1600) {
      pipeline = pipeline.resize({ width: 1600 });
    }

    const ext = path.extname(f).toLowerCase();
    let outBuf;
    if (ext === '.png') {
      outBuf = await pipeline.png({ quality: 80, compressionLevel: 9 }).toBuffer();
    } else {
      outBuf = await pipeline.jpeg({ quality: 76, mozjpeg: true }).toBuffer();
    }
    fs.writeFileSync(fp, outBuf);
    const after = outBuf.length;
    totalAfter += after;
    console.log(f, (before/1024).toFixed(0)+'KB', '->', (after/1024).toFixed(0)+'KB');
  }
  console.log('TOTAL', (totalBefore/1024/1024).toFixed(2)+'MB', '->', (totalAfter/1024/1024).toFixed(2)+'MB');
})();
