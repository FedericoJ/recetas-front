module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    // allow .js files to contain JSX code
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],

    // prevent eslint to complain about the "styles" variable being used before it was defined
    "no-use-before-define": ["error", { variables: false }],

    // ignore errors for the react-navigation package
    "react/prop-types": [
      "error",
      { ignore: ["navigation", "navigation.navigate"] },
    ],
  },
};
