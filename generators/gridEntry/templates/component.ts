import {
    Component
} from '@angular/core';

import {
    ModuleDataViewService,
    SecurityComponent,
    UsageType
} from '@nwps/common';

import { IRecordsListPassThroughOptions } from '@nwps/records';

import { I<%= moduleNameNoDash %>Detail } from '../../contracts/<%= moduleName %>-detail.interface';

@Component({
    selector: '<%= moduleName %>-<%= sectionNameSingular %>',
    template: `
      <rms-list-pass-through [options]="listPassThroughOptions | rmsListPassThroughOptions">
          <div class="sub-module-list">
              <<%= moduleName %>-<%= sectionName %>-entry></<%= moduleName %>-<%= sectionName %>-entry>
          </div>
      </rms-list-pass-through>
    `
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>Component {
    public listPassThroughOptions: IRecordsListPassThroughOptions;

    constructor(
        private _moduleDataViewService: ModuleDataViewService
    ) {
      const <%= moduleNameCamel %>View = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);
      this.listPassThroughOptions = {
          agencyId: <%= moduleNameCamel %>View.agency.id,
          moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
          subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>,
          moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>
      };
    }
}
