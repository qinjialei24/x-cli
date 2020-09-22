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

function generatePage(fileName) {
  fileName = toUpperCaseFirstWord(fileName);
  fs.mkdirSync(PATH + `/${fileName}`);
  copyTemplate(ACTION_NAME, PATH + `/${fileName}/${fileName}.tsx`, fileName);
  copyTemplate(
    ACTION_NAME + 'Less',
    PATH + `/${fileName}/${fileName}.less`,
    fileName
  );
  fs.mkdirSync(PATH + `/${fileName}` + '/Components');
}

function generateComponent(fileName, componentOptions) {
  const { basic, business } = componentOptions;
  if (basic) {
    generateComponentBasic(fileName);
  } else if (business) {
    generateComponentBusiness(fileName);
  }
}

function generateComponentBasic(componentName) {
  
}

function generateComponentBusiness(componentName) {}

function generate(options, actionName, fileName) {
  if (actionName === ACTION_NAME) {
    if (!process.cwd().endsWith('/src')) {
      console.error('请在项目的 src 目录下运行！');
      return;
    }
    if (fileName.includes('-')) {
      console.error('pages下文件必须以首字母大写+驼峰命名！');
      return;
    }
    //TODO:检查文件名是否重复
    generatePage(fileName);
  }
  if (actionName === 'component' || 'c') {
    // xc g component basic / business
    generateComponent(fileName, options);
  }
}

function initCommandGenerate(program) {
  program
    .command('generate')
    .alias('g')
    .description('generate a page/components/api')
    .option('-ba, --basic', '创建 basic components')
    .option('-bu, --business', '创建 business components')
    .action((options) => {
      generate(options, ...process.argv.slice(3)); // xc g component
    });
}

module.exports = initCommandGenerate;
