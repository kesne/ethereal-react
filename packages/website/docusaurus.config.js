const path = require("path");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const pkg = require('../ethereal-react/package.json');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Ethereal React",
    tagline: "TODO: Tagline",
    url: "https://kesne.github.io/",
    baseUrl: "/ethereal-react/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "kesne",
    projectName: "ethereal-react",
    trailingSlash: true,

    plugins: [
      // [
      //   "docusaurus-plugin-typedoc-api",
      //   {
      //     projectRoot: path.join(__dirname, "..", 'ethereal-react'),
      //     packages: ["."],
      //     // minimal: true,
      //   },
      // ],
    ],

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/kesne/ethereal-react/edit/main/website/",
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
            src: "img/logo.svg",
          },
          items: [
            {
              label: `v${pkg.version}`,
              position: "left",
              href: `https://www.npmjs.com/package/${pkg.name}`,
            },
            // {
            //   type: "doc",
            //   docId: "intro",
            //   position: "left",
            //   label: "Docs",
            // },
            // {
            //   to: "api",
            //   label: "API",
            //   position: "left",
            // },
            {
              href: "https://github.com/facebook/docusaurus",
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
      }),
  }
);
