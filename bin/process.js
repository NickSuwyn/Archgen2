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

function parseDescriptor(desc) {
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

}

function buildEntityFile(desc, file, outputFiles) {
  file.replace(ENTITY, '');
  desc.entities.forEach(entity => )
}

function buildFile(desc, file, outputFiles, entity) {

}
