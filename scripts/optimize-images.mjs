import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INPUT_DIR = "img";
const OUTPUT_DIR = "img/opt";
const WIDTHS = [400, 800, 1200, 1600];
const FORMATS = {
  avif: { quality: 55 },
  webp: { quality: 78 },
  jpg: { quality: 78, mozjpeg: true },
};

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(INPUT_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const base = path.basename(file, path.extname(file));
    const { width: nativeWidth } = await sharp(inputPath).metadata();
    const widths = [
      ...new Set([
        ...WIDTHS.filter((width) => width < nativeWidth),
        nativeWidth,
      ]),
    ];

    totalBefore += (await stat(inputPath)).size;

    for (const width of widths) {
      for (const [format, options] of Object.entries(FORMATS)) {
        const outputPath = path.join(OUTPUT_DIR, `${base}-${width}.${format}`);
        const pipeline = sharp(inputPath).resize({ width });

        if (format === "avif") {
          pipeline.avif(options);
        } else if (format === "webp") {
          pipeline.webp(options);
        } else {
          pipeline.jpeg(options);
        }

        const { size } = await pipeline.toFile(outputPath);
        totalAfter += size;
      }
    }

    console.log(
      `${file} -> ${widths.join(", ")}px (${Object.keys(FORMATS).join(", ")})`
    );
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(`\nOriginales: ${mb(totalBefore)} MB`);
  console.log(`Generadas: ${mb(totalAfter)} MB en ${OUTPUT_DIR}/`);
}

main();
