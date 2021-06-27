const path = require("path");
module.exports = {
  reactStrictMode: true,
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: "raw-loader",
  //   });

  //   return config;
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/")],
    prependData: `
    @import 'colors.scss';
    `,
  },
};
