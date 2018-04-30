#! /usr/bin/env node
const fs = require('file-system');
const fileUtil = require('./file-util');

let desc;
const archTemplates = [];
const outputFiles = [];
const dir = fileUtil.getArchetypeDir(process.argv[2]);
const ENTITY = '<_Entity_>';

parseDescriptor(desc);
loadArchetypeTemplates(archTemplates);
buildFiles(desc, archTemplates, outputFiles);
printFiles(outputFiles);

function parseDescriptor() {
  try {
    desc = JSON.parse(fs.readFileSync(fileUtil.DESCRIPTOR_PATH, 'utf8'));
  } catch (e) {
    //TODO: Handle json parse errors
    throw e;
  }
}

function loadArchetypeTemplates(archTemplates) {
  fileDirectories = fs.readdirSync(dir);
  fileDirectories.forEach(
    file => {
      if (file.includes('.txt')) {
        archTemplates.push(fs.readFileSync(dir + '/' + file, 'utf8'))
      }
    }
  );
}

function buildFiles(desc, archTemplates, outputFiles) {
  archTemplates.forEach(file => {
    if (file.includes(ENTITY)) {
      buildEntityFile(desc, file, outputFiles);
    } else {
      buildFile(desc, file, outputFiles);
    }
  });
}

function printFiles(outputFiles) {
  console.log(outputFiles);
  outputFiles.forEach(file => fs.writeFileSync(file.url, file.contents));
}

function buildEntityFile(desc, file, outputFiles) {
  file = file.replace(ENTITY, '');
  desc.entities.forEach(entity => buildFile(desc, file, outputFiles, entity));
}

function buildFile(desc, file, outputFiles, entity) {
  let interpolation;
  while (file.indexOf('<_') != -1) {
    interpolation = file.substring(file.indexOf('<_'), file.indexOf('_>') + 2)
    file = file.replace(interpolation, fileUtil.evaluateJS(interpolation.substring(2, interpolation.length - 2), desc, entity));
  }
  outputFiles.push(fileUtil.createOuputFileObject(file));
}
