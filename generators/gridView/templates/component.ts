import {
  Component
} from '@angular/core';

import {
    SecurityComponent,
    UsageType
} from '@nwps/common';

import {
  IRecordsListPassThroughOptions
} from '@nwps/records';

@Component({
    selector: '<%= moduleName %>-<%= sectionName %>',
    template: `
      <rms-list-pass-through [options]="listPassThroughOptions | rmsListPassThroughOptions">
          <div class="sub-module-list">
              <<%= moduleName %>-<%= sectionName %>-view></<%= moduleName %>-<%= sectionName %>-view>
          </div>
      </rms-list-pass-through>
    `
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>Component {
    public listPassThroughOptions: IRecordsListPassThroughOptions;

    constructor() {
        this.listPassThroughOptions = {
            isReadOnly: true,
            moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
            subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>,
            moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>
        };
    }
}
