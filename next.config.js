const path = require("path");
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: "raw-loader",
    // });
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(mp3)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/")],
    prependData: `
    @import 'colors.scss';
    `,
  },
};
