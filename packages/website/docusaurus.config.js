const path = require("path");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const pkg = require("../ethereal-react/package.json");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Ethereal React",
    tagline:
      "A collection of React hooks and components, making it easy to develop frontends for Ethereum dApps.",
    url: "https://kesne.github.io/",
    baseUrl: "/ethereal-react/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "kesne",
    projectName: "ethereal-react",
    trailingSlash: true,

    plugins: [
      [
        "docusaurus-plugin-typedoc-api",
        {
          projectRoot: path.join(__dirname, "..", "ethereal-react"),
          packages: ["."],
        },
      ],
    ],

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: "/",
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/kesne/ethereal-react/edit/main/packages/website/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "Ethereal React",
          logo: {
            alt: "Ethereal React Logo",
            src: "img/logo.png",
          },
          items: [
            {
              label: `v${pkg.version}`,
              position: "left",
              href: `https://www.npmjs.com/package/${pkg.name}`,
            },
            {
              type: "doc",
              docId: "introduction",
              position: "left",
              label: "Docs",
            },
            {
              to: "api",
              label: "API",
              position: "left",
            },
            {
              href: "https://github.com/kesne/ethereal-react",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          copyright: `Copyright © ${new Date().getFullYear()} Jordan Gensler.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
        algolia: {
          appId: 'BH4D9OD16A',
          apiKey: 'f61089ad1969eedcb146c5c351c28b69',
          indexName: 'ethereal-react',
          contextualSearch: false,
          searchParameters: {},
        },
      }),
  }
);
