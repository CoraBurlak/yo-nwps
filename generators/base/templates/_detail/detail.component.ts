import {
	Component,
	OnDestroy,
	ViewChild,
	Inject
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

import {
	Observable
} from 'rxjs/Observable';
import {
	Subscription
} from 'rxjs/Subscription';

import {
	ApplicationService,
	BaseModuleComponent,
	IDetailComponent,
	IDetailOptions,
	ModuleDataViewService,
	PageResponseDetailService,
	SectionType,
	SecurityComponent,
	UsageType
} from '@nwps/common';

import {
	IDeleteRecordButtonOptions,
	BaseModuleWithFieldHelpComponent
} from '@nwps/records';

import {
	I<%= moduleNameNoDash %>Detail
} from '../contracts/<%= moduleName %>-detail.interface';
import {
	<%= moduleNameNoDash %>Agent
} from '../<%= moduleName %>.agent';
import {
	<%= moduleNameCapsUnder %>_COMPONENTS_BY_SECTION
} from '../<%= moduleName %>-components-by-section';

@Component({
	selector: '<%= moduleName %>-detail',
	templateUrl: '<%= moduleName %>-detail.component.html'
})
export class <%= moduleNameNoDash %>DetailComponent extends BaseModuleWithFieldHelpComponent implements IDetailComponent, OnDestroy {
	private _<%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail;
	private _subscriptions: Subscription[] = [];

	public deleteOptions: IDeleteRecordButtonOptions;
	public detailOptions: IDetailOptions;

	constructor(
    activatedRoute: ActivatedRoute,
		pageResponseDetailService: PageResponseDetailService,
		private _applicationService: ApplicationService,
		private _moduleDataViewService: ModuleDataViewService,
		private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
		@Inject('modeless-service') modelessService: any
	) {
		super(activatedRoute, pageResponseDetailService, modelessService);
		this._<%= moduleNameCamel %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);


		this._subscriptions.push(this._moduleDataViewService.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>General).subscribe(<%= moduleNameCamel %>Detail => {
			this._<%= moduleNameCamel %>Detail = <%= moduleNameCamel %>Detail;
			this._applicationService.setTitle(`<%= moduleNameNormalCap %> ${<%= moduleName %>Detail.<someValue>}`);
		}));

		this.deleteOptions = {
			deleteRecord: (recordId, reason, recordLockId) => this._<%= moduleNameCamel %>Agent.delete<%= moduleNameNoDash %>(recordId, reason, recordLockId);,
			usageTypeId: UsageType.<%= moduleNameNoDash %>,
			recordId: this._<%= moduleNameCamel %>Detail.id,
			securityComponent: SecurityComponent.<%= moduleNameNoDash %>
		};

		this.detailOptions = {
      agencyId: this._<%= moduleNameCamel %>Detail.agency.id,
			recordId: this._<%= moduleNameCamel %>Detail.id,
			recordDescription: this._<%= moduleNameCamel %>Detail.number,
			referenceNumber: this._<%= moduleNameCamel %>Detail.number.toString(),
			usageTypeId: UsageType.<%= moduleNameNoDash %>,
			componentsBySection: <%= moduleNameCapsUnder %>_COMPONENTS_BY_SECTION
		};
	}

	public ngOnDestroy(): void {
    super.ngOnDestroy();
		this._subscriptions.forEach(x => x.unsubscribe());
	}
}
