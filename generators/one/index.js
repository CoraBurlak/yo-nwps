'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.createNwpsFile = function(filePath, destinationPath, sectionName) {
      var moduleName = this.options.moduleName;
      var isBaseDefined = Boolean(this.options.isBase);
      const noDash = name =>
        name
          .split('-')
          .map(function(x) {
            return x && x[0].toUpperCase() + x.slice(1);
          })
          .join('');
      const noDashCaps = name =>
        name
          .split('-')
          .map(function(x) {
            return x && x[0].toUpperCase() + x.slice(1);
          })
          .join('');
      const nameCamel = name =>
        name
          .split('-')
          .map(function(x, index) {
            return (
              x && (index > 0 ? x[0].toUpperCase() : x[0].toLowerCase()) + x.slice(1)
            );
          })
          .join('');

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
          isBase: isBaseDefined
        }
      );
    };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Hold tight, one to one folder is doing a burn out!`));
    if (!this.options.sectionName) {
      const prompts = [
        {
          type: 'input',
          name: 'sectionName',
          message: `What is the section name? ${chalk.cyan(
            'please use dashes if necessary'
          )}`,
          default: 'nwps-section'
        }
      ];

      return this.prompt(prompts).then(props => {
        this.props = props;
      });
    }
  }

  writing() {
    var moduleName = this.options.moduleName;
    var sectionName =
      this.options && this.options.sectionName
        ? this.options.sectionName
        : this.props.sectionName;
    var folderBase = '';
    var resetBase = moduleName + 's/';
    var newFolderBase = resetBase;
    // Contracts
    folderBase = '_contracts';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(
      `${folderBase}/interface.ts`,
      `${newFolderBase}/${moduleName}-${sectionName}.interface.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${folderBase}/detail.interface.ts`,
      `${newFolderBase}/${moduleName}-${sectionName}-detail.interface.ts`,
      sectionName
    );
    // Entry files
    folderBase = '_entry';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    var edit = 'edit';
    var view = 'view';
    this.createNwpsFile(
      `component.ts`,
      `${newFolderBase}/${sectionName}/${moduleName}-${sectionName}.component.ts`,
      sectionName
    );
    this.createNwpsFile(
      `component.spec.ts`,
      `${newFolderBase}/${sectionName}/${moduleName}-${sectionName}.component.spec.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${view}/view.component.ts`,
      `${newFolderBase}/${sectionName}/${view}/${moduleName}-${sectionName}-view.component.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${view}/view.component.spec.ts`,
      `${newFolderBase}/${sectionName}/${view}/${moduleName}-${sectionName}-view.component.spec.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${edit}/edit.component.ts`,
      `${newFolderBase}/${sectionName}/${edit}/${moduleName}-${sectionName}-edit.component.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${edit}/edit.component.spec.ts`,
      `${newFolderBase}/${sectionName}/${edit}/${moduleName}-${sectionName}-edit.component.spec.ts`,
      sectionName
    );
    this.createNwpsFile(
      `${edit}/edit.component.ts`,
      `${newFolderBase}/${sectionName}/${edit}/${moduleName}-${sectionName}-edit.component.ts`,
      sectionName
    );
  }

  install() {}
};
