'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
     // Calling the super constructor is important so our generator is correctly set up
     super(args, opts);
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Hi! I'm the yeoman director. Please follow my commands and we will get along great!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: `What is the name of the folder you want created/are using? ${chalk.cyan(
          'please use dashes if necessary and singular tense please'
        )}`,
        default: 'nwps-module'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'What would you like to create today?',
        choices: [
          {
            name: 'Module with a general',
            value: 'includeBase',
            checked: false
          }, {
            name: 'Search',
            value: 'includeSearch',
            checked: false
          }, {
            name: 'Grid Entry Component',
            value: 'includeGridEntryComponent',
            checked: false
          }, {
            name: 'One to One Component',
            value: 'includeOneToOneComponent',
            checked: false
          }, {
            name: 'Grid View Component',
            value: 'includeGridViewComponent',
            checked: false
          }, {
            name: 'Comment Component',
            value: 'includeCommentComponent',
            checked: false
          }, {
            name: 'Document Component',
            value: 'includeDocumentComponent',
            checked: false
          }, {
            name: 'Event Component',
            value: 'includeEventComponent',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      const features = props.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      const includeBase = hasFeature('includeBase');
      if(includeBase) this.composeWith(require.resolve('../base'), this.props);

      const includeSearch = hasFeature('includeSearch');
      if(includeSearch) this.composeWith(require.resolve('../search'), this.props);

      const includeGridEntryComponent = hasFeature('includeGridEntryComponent');
      if(includeGridEntryComponent) this.composeWith(require.resolve('../gridEntry'), this.props);

      const includeOneToOneComponent = hasFeature('includeOneToOneComponent');
      if(includeOneToOneComponent) this.composeWith(require.resolve('../one'), this.props);

      const includeGridViewComponent = hasFeature('includeGridViewComponent');
      if(includeGridViewComponent) this.composeWith(require.resolve('../gridView'), this.props);

      const includeCommentComponent = hasFeature('includeCommentComponent');
      if(includeCommentComponent) this.composeWith(require.resolve('../comment'), this.props);

      const includeDocumentComponent = hasFeature('includeDocumentComponent');
      if(includeDocumentComponent) this.composeWith(require.resolve('../document'), this.props);

      const includeEventComponent = hasFeature('includeEventComponent');
      if(includeEventComponent) this.composeWith(require.resolve('../event'), this.props);
    });
  }

  install() {}
};
