import fs from 'fs';
import path from 'path';
import { Try } from 'util-common/entity';
import log from './log.js';

/**
 * Writes the environment variables to the public __ENV.js file and make them
 * accessible under `window.__ENV`.
 */
export default function makeEnvFile(env, { directory = '' }) {
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
  }).fork(e => log.error(`[makeEnvFile] ${e.message}`));
}
