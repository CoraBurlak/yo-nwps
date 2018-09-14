'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
     // Calling the super constructor is important so our generator is correctly set up
     super(args, opts);

     this.createNwpsFile = function (filePath, destinationPath) {
       var moduleName = this.options.moduleName;
       const noDash = (name) => name.split('-').map(function(x) {
        return x && x[0].toUpperCase() + x.slice(1);
       }).join('');
       const noDashCaps = (name) => name.split('-').map(function(x) {
        return x && x[0].toUpperCase() + x.slice(1);
       }).join('');
       const noDashCapsSpace = (name) => name.split('-').map(function(x) {
        return x && x[0].toUpperCase() + x.slice(1);
       }).join('');
       const nameCamel = (name) => name.split('-').map(function(x, index) {
         return x && (index > 0 ? x[0].toUpperCase(): x[0].toLowerCase()) + x.slice(1);
       }).join('');
       const hasFeature = feat => features && features.indexOf(feat) !== -1;

       this.fs.copyTpl(
         this.templatePath(filePath),
         this.destinationPath(destinationPath),
         {
           moduleName: moduleName,
           moduleNameNoDash: noDash(moduleName),
           moduleNameCaps: noDashCaps(moduleName),
           moduleNameCamel: nameCamel(moduleName),
           moduleNameCapsSpace: noDashCapsSpace(moduleName)
         }
       );
     };
  }
  prompting() {
    var moduleName = this.options.moduleName;
    this.log(
        `Hold tight, one ${moduleName}-comments.component coming right up!`
    );
  }

  writing() {
    var moduleName = this.options.moduleName;
    this.createNwpsFile(`comment.component.ts`, `${moduleName}s/entry/comments/${moduleName}-comments.component.ts`);
    this.createNwpsFile(`comment.component.spec.ts`, `${moduleName}s/entry/comments/${moduleName}-comments.component.spec.ts`);
  }

  install() {}
};
