const loadJsonFile = require('load-json-file');
const getConfiguration = require('../getConfiguration');

jest.mock('load-json-file');

test('without repositories throws', async () => {
  expect.assertions(1);

  try {
    await getConfiguration({});
  } catch (err) {
    expect(err.message).toBe('The `repositories` is required in the config.');
  }
});

