#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const categories = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  document: ['pdf', 'doc', 'docx'],
  audio: ['mp3', 'wav', 'aac'],
  video: ['mp4', 'avi', 'mov'],
  archive: ['zip', 'rar', '7z'],
  other: [],
};

// -s/--source: (required) folder you want to organise
// -d/--dest: where to put organised subfolders
// -b/--by: grouping criterion (defaults to type)
program
  .requiredOption('-s, --source <dir>', 'source folder')
  .option('-d, --dest <dir>', 'target folder')
  .option(
    '-b, --by <criteria>',
    'organise by (extension|date|size|type)',
    'type'
  )
  .parse(process.argv);
const opts = program.opts();

// default dest to source if not provided
const dest = opts.dest || opts.source;

(async () => {
  const files = await fs.readdir(opts.source);

  for (const file of files) {
    const src = path.join(opts.source, file);
    // get extension as lowercase
    const ext = path.extname(file).slice(1).toLowerCase();
    let key;

    switch (opts.by) {
      case 'extension':
        key = ext || 'no_ext';
        break;
      case 'date':
        key = (await fs.stat(src)).birthtime.toISOString().slice(0, 10);
        break;
      case 'size':
        key = Math.floor((await fs.stat(src)).size / 1024) + 'KB';
        break;
      case 'type':
        // find category by ext, default to 'other'
        key =
          Object.keys(categories).find((cat) =>
            categories[cat].includes(ext)
          ) || 'other';
        break;
    }

    await fs.ensureDir(path.join(dest, key));
    await fs.move(src, path.join(dest, key, file));
    console.log(chalk.green(`✓ Moved ${file} → ${key}/`));
  }

  console.log(chalk.green('✓ Done!'));
})();
