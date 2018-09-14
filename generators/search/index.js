'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
     // Calling the super constructor is important so our generator is correctly set up
     super(args, opts)

     this.createNwpsFile = function (filePath, destinationPath) {
       var moduleName = this.options.moduleName;
       this.fs.copyTpl(
         this.templatePath(filePath),
         this.destinationPath(destinationPath),
         {
           moduleName: moduleName,
           moduleNameNoDash: moduleName
             .split('-')
             .map(function(x) {
               return x && x[0].toUpperCase() + x.slice(1);
             })
             .join(''),
           moduleNameCaps: moduleName
             .split('-')
             .join('')
             .toUpperCase(),
           moduleNameNormalCap: moduleName
             .split('-')
             .map(function(x) {
               return x && x[0].toUpperCase() + x.slice(1);
             })
             .join(' '),
           moduleNameCapsUnder: moduleName
             .split('-')
             .join('_')
             .toUpperCase(),
           moduleNameCamel: moduleName
             .split('-')
             .map(function(x, index) {
               return x && (index > 0 ? x[0].toUpperCase(): x[0].toLowerCase()) + x.slice(1);
             })
             .join('')
         }
       );
     };
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
        `Creating search files in ${this.options.moduleName}s/search`
    );
  }

  writing() {
    var moduleName = this.options.moduleName;
    var folderBase = '';
    var resetBase = moduleName + 's/';
    var newFolderBase = resetBase;
    // Contracts
    folderBase = '_contracts';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(`${folderBase}/search-result-grid-view.interface.ts`, `${newFolderBase}/${moduleName}-search-result-grid-view.interface.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search-request.interface.ts`, `${newFolderBase}/${moduleName}-search-request.interface.ts`, moduleName);

    // Search files
    folderBase = '_search';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(`${folderBase}/search-options.factory.ts`, `${newFolderBase}/${moduleName}-search-options.factory.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search-options.module.ts`, `${newFolderBase}/${moduleName}-search-options.module.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search-options.ts`, `${newFolderBase}/${moduleName}-search-options.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search-options.spec.ts`, `${newFolderBase}/${moduleName}-search-options.spec.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search.component.ts`, `${newFolderBase}/${moduleName}-search.component.ts`, moduleName);
    this.createNwpsFile(`${folderBase}/search.component.spec.ts`, `${newFolderBase}/${moduleName}-search.component.spec.ts`, moduleName);

    // Add the ability to touch the child routing and paste something like this into the bottom of it.
    // {
  	// 	canActivate: [
  	// 		PermissionGuard
  	// 	],
  	// 	component: <%= moduleNameNoDash %>SearchComponent,
  	// 	data: {
  	// 		permissionType: PermissionType.Execute,
  	// 		securityComponent: SecurityComponent.<%= moduleNameNoDash %>Search
  	// 	},
  	// 	path: 'search',
  	// 	canDeactivate: [
  	// 		PromptIfDirtyDeactivateGuard
  	// 	]
  	// },
    // ADD TO COMPONENTS SEARCH COMPONENT
  }

  install() {}
};
