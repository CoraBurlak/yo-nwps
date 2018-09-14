'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
     // Calling the super constructor is important so our generator is correctly set up
     super(args, opts);

     this.createNwpsFile = function (filePath, destinationPath, sectionName) {
       var moduleName = this.options.moduleName;
       const noDash = (name) => name.split('-').map(function(x) {
        return x && x[0].toUpperCase() + x.slice(1);
       }).join('');
       const noDashCaps = (name) => name.split('-').map(function(x) {
        return x && x[0].toUpperCase() + x.slice(1);
       }).join('');
       const nameCamel = (name) => name.split('-').map(function(x, index) {
         return x && (index > 0 ? x[0].toUpperCase(): x[0].toLowerCase()) + x.slice(1);
       }).join('');
       const singularStrip = (name) => name.slice(0, -1);

       this.fs.copyTpl(
         this.templatePath(filePath),
         this.destinationPath(destinationPath),
         {
           moduleName: moduleName,
           moduleNameNoDash: noDash(moduleName),
           moduleNameCaps: noDashCaps(moduleName),
           moduleNameCamel: nameCamel(moduleName),
           sectionName: sectionName,
           sectionNameNoDash: noDash(sectionName),
           sectionNameCaps: noDashCaps(sectionName),
           sectionNameCamel: nameCamel(sectionName),
           sectionNameSingular: singularStrip(sectionName),
           sectionNameNoDashSingular: singularStrip(noDash(sectionName)),
           sectionNameCapsSingular: singularStrip(noDashCaps(sectionName)),
           sectionNameCamelSingular: singularStrip(nameCamel(sectionName))
         }
       );
     };
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Hold tight, grid entry ready for building!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'sectionName',
        message: `What is the folder name? ${chalk.cyan(
          'please use dashes if necessary and pluralize'
        )}`,
        default: 'nwps-section'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var sectionName = this.props.sectionName;
    var sectionNameSingular = sectionName.slice(0, -1);
    var moduleName = this.options.moduleName;
    var folderBase = '';
    var resetBase = moduleName + 's/';
    var newFolderBase = resetBase;
    // Contracts
    folderBase = '_contracts';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(`${folderBase}/interface.ts`, `${newFolderBase}/${moduleName}-${sectionNameSingular}.interface.ts`, sectionName);
    this.createNwpsFile(`${folderBase}/detail.interface.ts`, `${newFolderBase}/${moduleName}-${sectionNameSingular}-detail.interface.ts`, sectionName);
    // Entry files
    folderBase = '_entry';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    var entry = 'entry';
    this.createNwpsFile(`component.ts`, `${newFolderBase}/${sectionName}/${moduleName}-${sectionName}.component.ts`, sectionName);
    this.createNwpsFile(`${folderBase}/entry.component.ts`, `${newFolderBase}/${sectionName}/${entry}/${moduleName}-${sectionName}-entry.component.ts`, sectionName);
    this.createNwpsFile(`${folderBase}/entry.component.spec.ts`, `${newFolderBase}/${sectionName}/${entry}/${moduleName}-${sectionName}-entry.component.spec.ts`,  sectionName);
  }

  install() {}
};
