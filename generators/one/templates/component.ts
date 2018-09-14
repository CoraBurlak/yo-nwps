import {
    Component
} from '@angular/core';

import {
    ModuleDataViewService,
    SecurityComponent,
    UsageType
} from '@nwps/common';

import { IRecordsFormPassThroughOptions } from '@nwps/records';

import { I<%= moduleNameNoDash %>Detail } from '../../contracts/<%= moduleName %>-detail.interface';

@Component({
    selector: '<%= moduleName %>-<%= sectionName %>',
    template: `
      <rms-form-pass-through *ngIf="formPassThroughOptions" [options]="formPassThroughOptions | rmsFormPassThroughOptions" #formPT>
        <<%= moduleName %>-<%= sectionName %>-view *ngIf="!formPT.isAddWorkflow" [hidden]="formPT.isEditMode()"></<%= moduleName %>-<%= sectionName %>-view>
        <<%= moduleName %>-<%= sectionName %>-edit *ngIf="formPT.isEditMode()" (done)="formPT.endEdit()" [recordLockId]="formPT.recordLockId"></<%= moduleName %>-<%= sectionName %>-edit>
      </rms-form-pass-through>
    `
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>Component {

    public formPassThroughOptions: IRecordsFormPassThroughOptions;

    constructor(
        private _moduleDataViewService: ModuleDataViewService
    ) {
      const <%= moduleNameCamel %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);
      this.formPassThroughOptions = {
          recordId: <%= moduleNameCamel %>Detail.id,
          agencyId: <%= moduleNameCamel %>Detail.agency.id,
          moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
          subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>,
          moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>
      };
    }
}
