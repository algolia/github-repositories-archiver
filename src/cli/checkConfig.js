const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const OPTIONS = {
  path: {
    validate(input) {
      return this.getErrorMessage(input) === null;
    },

    getErrorMessage(input) {
      // file exist
      if (!fs.existsSync(input)) {
        return null;
      }

      // read/write access
      try {
        fs.accessSync(input, fs.constants.R_OK | fs.constants.W_OK);
      } catch (err) {
        return `The path ${input} is either not readable or not writable.`;
      }

      // clean repo
      exec(`cd "${input}" && git diff-index --quiet HEAD --`);
      return null;
    }
  },
  organization: {
    validate(input) {
      return input || true; // FIXME
    },
  },
  login: {
    validate(input) {
      return input === true || input === false;
    },
  },
  minMonths: {
    validate(input) {
      return input || true; // FIXME
    },
  },
  onlyPrivate: {
    validate(input) {
      return input || true; // FIXME
    },
  },
  repositories: {
    validate(input) {
      return input || true; // FIXME
    },
  },
  dryRun: {
    validate(input) {
      return input === true || input === false;
    },
  },
};

function checkConfig(config) {
  Object.keys(config).forEach(optionName => {
    if (!OPTIONS[optionName]) {
      throw new Error(`The option \`${optionName}\` is unknown.`);
    }

    const isOptionValid = OPTIONS[optionName].validate(config[optionName]);

    if (!isOptionValid) {
      const errorMessage = OPTIONS[optionName].getErrorMessage
        ? OPTIONS[optionName].getErrorMessage(config[optionName])
        : `The option \`${optionName}\` is required.`;

      throw new Error(errorMessage);
    }
  });
}

module.exports = checkConfig;
