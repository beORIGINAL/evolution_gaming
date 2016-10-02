import path from 'path';

export const paths = {};

paths.root = path.resolve('./', 'app');
paths.indexHTML = path.resolve(paths.root, 'index.pug');
paths.appJS = path.resolve(paths.root, 'index.js');
paths.nodeModules = path.resolve('./', 'node_modules');
paths.packageJSON = path.resolve('./', 'package.json');
paths.build = path.join('./', 'build');

