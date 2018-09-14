import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';

import {
	ModuleDataViewService,
	SecurityComponent,
	UsageType
} from '@nwps/common';
import {
	DisplayField,
	EventsComponent,
	GridIdentifiers,
	IEventsOptions,
	IRecordsFormPassThroughOptions
} from '@nwps/records';

import {
	I<%= moduleNameNoDash %>Detail
} from '../../contracts/<%= moduleName %>-detail.interface';
import {
	<%= moduleNameNoDash %>Agent
} from '../../<%= moduleName %>.agent';

@Component({
	selector: '<%= moduleName %>-events',
	template:  `
		<rms-list-pass-through *ngIf="formPassThroughOptions" [options]="formPassThroughOptions | rmsListPassThroughOptions">
			<div class="sub-module-list">
				<rms-events *ngIf="eventsOptions" [options]="eventsOptions"></rms-events>
			</div>
	   </rms-list-pass-through>
 	`
})
export class <%= moduleNameNoDash %>EventsComponent implements OnInit {
	@ViewChild(EventsComponent) eventsComponent: EventsComponent;

	private _<%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail;
	public eventsOptions: IEventsOptions;
	public formPassThroughOptions: IRecordsFormPassThroughOptions;

	constructor(
		private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
		private _moduleDataViewService: ModuleDataViewService
	) {
	}

	public ngOnInit(): void {
		this._<%= moduleNameCamel %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);
		this.eventsOptions = {
			agencyId: this._<%= moduleNameCamel %>Detail.agency.id,
			deleteEvent: (recordId: number, entryId: number, reason: string, recordLockId: string) => this._<%= moduleNameCamel %>Agent.deleteEvent(recordId, entryId, reason, recordLockId),
			getEvent: (parentRecordId: number, eventId: number) => this._<%= moduleNameCamel %>Agent.getEvent(parentRecordId, eventId),
			getGridViews: (primaryRecordId: number) => this._<%= moduleNameCamel %>Agent.getEventDetails(primaryRecordId),
			gridIdentifier: GridIdentifiers.<%= moduleNameCamel %>.eventLog,
			parentUsageTypeId: UsageType.<%= moduleNameNoDash %>,
			primaryRecordId: this._<%= moduleNameCamel %>Detail.id,
			saveEvent: (request: any, recordLockId: string) => this._<%= moduleNameCamel %>Agent.saveEvent(request, recordLockId),
			securityComponent: SecurityComponent.<%= moduleNameNoDash %>,
			usageTypeId: UsageType.<%= moduleNameNoDash %>Event,
			commentFieldId: DisplayField.<%= moduleNameNoDash %>EventComments,
			dateTimeFieldId: DisplayField.<%= moduleNameNoDash %>EventDateTime,
			personnelFieldId: DisplayField.<%= moduleNameNoDash %>EventPersonnel,
			typeFieldId: DisplayField.<%= moduleNameNoDash %>EventType
		};
		this.formPassThroughOptions = {
			recordId: this._<%= moduleNameCamel %>Detail.id,
			agencyId: this._<%= moduleNameCamel %>Detail.agency.id,
			moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
			subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %>Event,
			moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>
		};
	}
}
