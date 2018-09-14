import {
	Component,
	Inject
} from '@angular/core';

import {
	ModuleDataViewService,
	SecurityComponent,
	UsageType
} from '@nwps/common';

import { IRecordsListPassThroughOptions } from '@nwps/records';

import { I<%= moduleNameNoDash %>Detail } from '../../contracts/<%= moduleName %>-detail.interface';

@Component({
	selector: '<%= moduleName %>-documents',
	template: `
    <rms-list-pass-through *ngIf="listPassThroughOptions"
                     [options]="listPassThroughOptions | rmsListPassThroughOptions">
      <nws-document-control-component [nwsCtrl]="controller"></nws-document-control-component>
    </rms-list-pass-through>
  `
})
export class <%= moduleNameNoDash %>DocumentsComponent {
	public controller: any;
	public listPassThroughOptions: IRecordsListPassThroughOptions;

	constructor(
		private _moduleDataViewService: ModuleDataViewService,
		@Inject('document-control-controller') private DocumentControlController
	) {
		const <%= moduleNameCamel %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);

		this.listPassThroughOptions = {
			isReadOnly: true,
			moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>,
			moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
			subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %>Document
		};

		this.controller = new this.DocumentControlController(
			UsageType.<%= moduleNameNoDash %>Document,
			<%= moduleNameCamel %>Detail.id,
			<%= moduleNameCamel %>Detail.agency.id,
			<%= moduleNameCamel %>Detail.number,
			SecurityComponent.<%= moduleNameNoDash %>Document,
			(documents) => {
				this._moduleDataViewService.update(UsageType.<%= moduleNameNoDash %>Document, documents);
			},
			null,
			null,
			SecurityComponent.<%= moduleNameNoDash %>Sealing
		);
	}
}
