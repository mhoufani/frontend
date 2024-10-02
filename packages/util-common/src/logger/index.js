import chalk from 'chalk';
const logger = ({ prefixMessage = '' } = {}) => ({
  prefixes: {
    warn: `- ${chalk.yellow(`warn`)} ${prefixMessage}`,
    event: `- ${chalk.magenta(`event`)} ${prefixMessage}`,
    ready: `- ${chalk.green(`ready`)} ${prefixMessage}`,
    error: `- ${chalk.red(`error`)} ${prefixMessage}`,
  },
  error(message) {
    console.info(
      chalk.red(
        JSON.stringify({
          severity: 'ERROR',
          service: prefixMessage,
          message: message || null,
        })
      )
    );
  },
  warn(message) {
    console.info(
      chalk.yellow(
        JSON.stringify({
          severity: 'WARNING',
          service: prefixMessage,
          message: message || null,
        })
      )
    );
  },
  event(message) {
    console.info(
      chalk.magenta(
        JSON.stringify({
          severity: 'INFO',
          service: prefixMessage,
          message: message || null,
        })
      )
    );
  },
  ready(message) {
    console.info(
      chalk.green(
        JSON.stringify({
          severity: 'INFO',
          service: prefixMessage,
          message: message || null,
        })
      )
    );
  },
});

export default logger;
