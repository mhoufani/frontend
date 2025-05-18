import fs from 'node:fs';
import path from 'node:path';
import { Try } from '@repo/util-common/entity';
import log from './log';

/**
 * Writes the environment variables to the public __ENV.js file and make them
 * accessible under `window.__ENV`.
 */
export default function makeEnvFile(env: Record<string, string>, { directory = '' }) {
  Try(() => {
    const file = `${directory}__ENV.js`;

    const content = `window.__ENV = ${JSON.stringify(env)};`;

    const dirname = path.dirname(file);

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(file, content);

    log.ready(
      `wrote browser runtime environment variables to '${file}'.`
    );
  }).fork(e => {
    if(e instanceof Error)
      log.error(`[makeEnvFile] ${e.message}`);
  })
}
