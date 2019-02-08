const OPTIONS = {
  path: {
    validate(input) {
      return input || true; // FIXME
    },
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
