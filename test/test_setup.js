// This file is necessary to get the css-modules classes to properly show up.
// https://gist.github.com/mmrko/288d159a55adf1916f71

import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
  extensions: ['.scss', '.css'],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({ file }).css,
});
