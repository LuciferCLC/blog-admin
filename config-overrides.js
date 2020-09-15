const {
  override,
  addWebpackAlias,
  addWebpackResolve
} = require('customize-cra');
const path = require('path');

const eslintConfig = require('./.eslintrc.js');

// fix useEslintRc
const useEslintConfig = (configRules) => (config) => {
  const updatedRules = config.module.rules.map((rule) => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (
      rule.use &&
      rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)
    ) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules }
      };
      ruleUse.options = newOptions;
      return rule;

      // Rule not using eslint. Do not modify.
    }
    return rule;
  });

  // config.module.rules = updatedRules;
  return {
    ...config,
    module: {
      ...config.module,
      rules: updatedRules
    }
  };
};

// Support environment -specific settings
const env = process.env.NODE_ENV;
const envs = {
  development: override(
    addWebpackResolve({
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    useEslintConfig(eslintConfig) // Use your imported .eslintrc.js file here
  ),
  production: override(
    addWebpackResolve({
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  )
};

module.exports = envs[env];
