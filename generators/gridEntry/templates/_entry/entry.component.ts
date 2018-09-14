import {
    Component,
    Inject
} from '@angular/core';

import {
    of
} from 'rxjs/observable/of';

import {
    IGridEntryViewModel,
    IPageField,
    ModuleDataViewService,
    SecurityComponent,
    UsageType,
    UsageTypeProperties
} from '@nwps/common';
import {
    FormInteropService,
    IField
} from '@nwps/core';
import {
    DeletedRecordAgent,
    DisplayField,
    GridIdentifiers,
    RecordFormatUtility,
    RecordsGridEntryFactory
} from '@nwps/records';

import {
    I<%= moduleNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail
} from '../../../contracts/<%= moduleName %>-<%= sectionNameSingular %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>
} from '../../../contracts/<%= moduleName %>-<%= sectionNameSingular %>.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../../shared/<%= moduleName %>.agent';

@Component({
	selector: '<%= moduleName %>-<%= sectionNameSingular %>s-entry',
	template: '<nw-grid-entry [vm]="gridEntryVM"></nw-grid-entry>'
})
export class <%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent {
	private _<%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail;

	public gridEntryVM: IGridEntryViewModel<I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail, I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>>;

	constructor(
		private _deletedRecordAgent: DeletedRecordAgent,
		private _formInteropService: FormInteropService,
		private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
		private _moduleDataViewService: ModuleDataViewService,
		private _recordFormatUtility: RecordFormatUtility,
		private _recordsGridEntryFactory: RecordsGridEntryFactory,
	) {

		const gridParams = {
			identifier: GridIdentifiers.<%= moduleNameCamel %>.<%= sectionNameCamelSingular %>,
			gridOptions: {
				columnDefs: [

				]
			}
		};

		this._<%= moduleNameCamel %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);
		this.gridEntryVM = this._recordsGridEntryFactory.create<I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail, I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>>({
			usageType: UsageTypeProperties[UsageType.<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>],
			agencyId: this._<%= moduleNameCamel %>Detail.agency.id,
			deleteEntry: (recordId, entry, activityConfirmation, recordLockId) => this._<%= moduleNameCamel %>Agent.delete<%= sectionNameNoDashSingular %>(recordId, entry.id, activityConfirmation, recordLockId),
      getEntryForEdit: (gridView) => this._<%= moduleNameCamel %>Agent.get<%= sectionNameNoDashSingular %>Detail(this._<%= moduleNameCamel %>Detail.id, gridView.id),
			createField: (formName, field) => this.createField(formName, field),
			getGridViews: () => this._<%= moduleNameCamel %>Agent.get<%= sectionNameNoDashSingular %>Details(this._<%= moduleNameCamel %>Detail.id),
			gridParams: gridParams,
			recordId: this._<%= moduleNameCamel %>Detail.id,
			reloadOnDelete: true,
			restoreEntries: (recordIds) => this._deletedRecordAgent.restoreMany(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>, recordIds),
			saveEntry: (request, recordLockId) => this._<%= moduleNameCamel %>Agent.save<%= sectionNameNoDashSingular %>(request, recordLockId),
      initializeSaveRequest: (saveRequest, recordId, entry) => this.initializeSaveRequest(saveRequest, recordId, entry),
      securityComponent: SecurityComponent.<%= moduleNameNoDash %>,
			fieldDefs: {

			},
			viewFieldDefs: {

			}
		});
	}

	private createField(formName: string, field: IPageField): IField {
		switch (field.id) {
			default:
				return null;
		}
	}
  private initializeSaveRequest(saveRequest: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>, recordId: number, detail: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail): void {
		saveRequest.<%= moduleNameCamel %>Id = this._<%= moduleNameCamel %>Detail.id;
    saveRequest.id = detail.id;
	}
}
