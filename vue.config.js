const path = require("path");

function resolve(dir){
  return path.resolve(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "utils": resolve("utils"),
        "api": resolve("api"),
      },
    },
  },
};
