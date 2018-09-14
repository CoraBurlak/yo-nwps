'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.additionalFeatures = {};

    this.createNwpsFile = function(filePath, destinationPath) {
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
          moduleNameCaps: moduleName
            .split('-')
            .join('')
            .toUpperCase(),
          moduleNameCamel: moduleName
            .split('-')
            .map(function(x, index) {
              return (
                x && (index > 0 ? x[0].toUpperCase() : x[0].toLowerCase()) + x.slice(1)
              );
            })
            .join('')
        }
      );
    };
  }

  prompting() {
    this.log(yosay(`Welcome to the module generator for Tomahawk Web Development!`));

    const prompts = [
      {
        type: 'checkbox',
        name: 'features',
        message: 'Would you like to any of these additional files/folders?',
        choices: [
          {
            name: 'Shared Folder',
            value: 'includeSharedFolder',
            checked: false
          },
          {
            name: 'Index file',
            value: 'includeIndexFile',
            checked: false
          },
          {
            name: 'Assets folder',
            value: 'includeAssetsFolder',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.sectionName = 'general';
      this.props.isBase = true;
      this.props.moduleName = this.options.moduleName;
      this.additionalFeatures = props.features;
      this.composeWith(require.resolve('../one'), this.props);
    });
  }

  writing() {
    var moduleName = this.options.moduleName;
    const hasFeature = feat =>
      this.additionalFeatures && this.additionalFeatures.indexOf(feat) !== -1;
    var includeIndexFile = hasFeature('includeIndexFile');
    var includeAssetsFolder = hasFeature('includeAssetsFolder');
    var includeSharedFolder = hasFeature('includeSharedFolder');
    var folderBase = '';
    var resetBase = moduleName + 's/';
    var newFolderBase = resetBase;
    // Base files
    if (includeIndexFile) {
      this.createNwpsFile('index.ts', `${newFolderBase}index.ts`);
    }
    this.createNwpsFile(
      'child.routing.ts',
      `${newFolderBase}${moduleName}.child.routing.ts`
    );
    this.createNwpsFile(
      'resource.enum.ts',
      `${newFolderBase}${moduleName}.resource.enum.ts`
    );
    this.createNwpsFile(
      'components-by-section.ts',
      `${newFolderBase}${moduleName}-components-by-section.ts`
    );
    this.createNwpsFile('agent.spec.ts', `${newFolderBase}${moduleName}.agent.spec.ts`);
    this.createNwpsFile('agent.ts', `${newFolderBase}${moduleName}.agent.ts`);
    this.createNwpsFile('module.ts', `${newFolderBase}${moduleName}.module.ts`);
    // Add files
    folderBase = '_add';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(
      `${folderBase}/add.component.ts`,
      `${newFolderBase}/${moduleName}-add.component.ts`
    );
    this.createNwpsFile(
      `${folderBase}/add.component.spec.ts`,
      `${newFolderBase}/${moduleName}-add.component.spec.ts`
    );
    this.createNwpsFile(
      `${folderBase}/add.component.html`,
      `${newFolderBase}/${moduleName}-add.component.html`
    );
    // Asset files
    if (includeAssetsFolder) {
      folderBase = '_assets';
      newFolderBase = resetBase;
      newFolderBase += folderBase.replace(/^_/, '');
      this.createNwpsFile(
        `${folderBase}/messages.ts`,
        `${newFolderBase}/${moduleName}-messages.ts`
      );
    }
    // Shared files
    if (includeSharedFolder) {
      folderBase = '_shared';
      newFolderBase = resetBase;
      newFolderBase += folderBase.replace(/^_/, '');
      this.createNwpsFile(
        `${folderBase}/shared.module.ts`,
        `${newFolderBase}/${moduleName}.shared.module.ts`
      );
    }
    // Contracts
    folderBase = '_contracts';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(
      `${folderBase}/interface.ts`,
      `${newFolderBase}/${moduleName}.interface.ts`
    );
    this.createNwpsFile(
      `${folderBase}/detail.interface.ts`,
      `${newFolderBase}/${moduleName}-detail.interface.ts`
    );
    this.createNwpsFile(
      `${folderBase}/header.interface.ts`,
      `${newFolderBase}/${moduleName}-header.interface.ts`
    );
    this.createNwpsFile(
      `${folderBase}/base.interface.ts`,
      `${newFolderBase}/${moduleName}-base.interface.ts`
    );
    // Detail files
    folderBase = '_detail';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(
      `${folderBase}/detail-page.resolver.ts`,
      `${newFolderBase}/${moduleName}-detail-page.resolver.ts`
    );
    this.createNwpsFile(
      `${folderBase}/detail-page.resolver.spec.ts`,
      `${newFolderBase}/${moduleName}-detail-page.resolver.spec.ts`
    );
    this.createNwpsFile(
      `${folderBase}/detail.component.ts`,
      `${newFolderBase}/${moduleName}-detail.component.ts`
    );
    this.createNwpsFile(
      `${folderBase}/detail.component.spec.ts`,
      `${newFolderBase}/${moduleName}-detail.component.spec.ts`
    );
    this.createNwpsFile(
      `${folderBase}/detail.component.html`,
      `${newFolderBase}/${moduleName}-detail.component.html`
    );
    // Detail files
    folderBase = '_header';
    newFolderBase = resetBase;
    newFolderBase += folderBase.replace(/^_/, '');
    this.createNwpsFile(
      `${folderBase}/header.component.ts`,
      `${newFolderBase}/${moduleName}-header.component.ts`
    );
    this.createNwpsFile(
      `${folderBase}/header.component.html`,
      `${newFolderBase}/${moduleName}-header.component.html`
    );
    this.createNwpsFile(
      `${folderBase}/header.component.spec.ts`,
      `${newFolderBase}/${moduleName}-header.component.spec.ts`
    );
  }

  install() {}
};
