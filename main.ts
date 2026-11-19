// Sum up 18 November 2026 world news in one image.
// Entry for make.fun bounty news-image-20261118, by @naksu-backup.
// The image is entry.jpg beside this file: a 1024x1024 front page
// with six labelled panels (Shenzhen summit, Gulf flashpoint, Gaza
// operation, Cyclone Akvan, US Senate flips, Nvidia surge). The
// program copies it to /output/entry.jpg, deterministically, with
// no network. Outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.jpg', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.jpg');

copyFileSync(source, target);
const size = statSync(target).size;
if (size > 1024 * 1024) {
  throw new Error(`entry.jpg is ${size} bytes, over the 1 MiB limit`);
}
const head = readFileSync(target).subarray(0, 3);
if (head[0] !== 0xff || head[1] !== 0xd8 || head[2] !== 0xff) {
  throw new Error('entry.jpg does not start with JPEG magic bytes');
}
console.log(`wrote ${target} (${size} bytes)`);
