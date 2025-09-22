module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'node',
    coverageThreshold: {
      global: {
        statements: 20,
        branches: 20,
        functions: 20,
        lines: 20,
      },
    },
  };
  