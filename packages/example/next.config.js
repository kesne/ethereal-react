const withTM = require("next-transpile-modules")(["ethereal-react"]);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    reactRoot: "concurrent",
  },
});
