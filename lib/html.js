let minifyHtml;
try {
  minifyHtml = require('../index.node');
} catch (error) {
}
const { inExcludes } = require('./util');

module.exports = function(str, path, config) {
  const { excludes } = config.filter_optimize.html;
  if (!minifyHtml || inExcludes(path, excludes)) return str;
  const result = minifyHtml.minify(Buffer.from(str), {
    minify_css: false,
    minify_js: true,
  });
  console.log(`Optimize "${path}" ${str.length} => ${result.length}`);
  return result
};
