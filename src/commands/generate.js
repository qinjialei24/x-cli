const fs = require('fs');
const path = require('path');
const { toUpperCaseFirstWord, generateFileByTemplate } = require('../utils');

const PATH = './pages';
const ACTION_NAME = 'page';

function copyTemplate(from, to, fileName) {
  from = path.join(__dirname, '../templates', from);
  const rawContent = fs.readFileSync(from, 'utf-8');
  const finalContent = generateFileByTemplate(rawContent, {
    fileName,
  });
  write(to, finalContent);
}

function write(path, str, mode) {
  fs.writeFileSync(path, str);
}

// 新建目录
function mkdir(path, fn) {
  fs.mkdir(path, function (err) {
    fn && fn();
  });
}

function generatePage(fileName) {
  fileName = toUpperCaseFirstWord(fileName);
  mkdir(PATH + `/${fileName}`, function () {
    copyTemplate(ACTION_NAME, PATH + `/${fileName}/${fileName}.tsx`, fileName);
  });
}

module.exports = (actionName, fileName, ...option) => {
  if (actionName === ACTION_NAME) {
    if (!process.cwd().endsWith('/src')) {
      console.error('请在项目的 src 目录下运行！');
      return;
    }

    generatePage(fileName);
  }
  if (actionName === 'component') {
    // xc g component basic / business
  }
};
