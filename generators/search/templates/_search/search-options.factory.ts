import {
    Inject,
    Injectable
} from '@angular/core';

import {
    ErrorService,
    ISearchOptionsFactory,
    PageDetailService,
    RecordLockAgent,
    UsageType,
    UserPermissionService,
    UserService
} from '@nwps/common';
import {
    BreadcrumbService,
    FormInteropService
} from '@nwps/core';

import {
    <%= moduleNameNoDash %>Agent
} from '../shared/<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %>SearchOptions
} from './<%= moduleName %>-search-options';

@Injectable()
export class <%= moduleNameNoDash %>SearchOptionsFactory implements ISearchOptionsFactory {
	public usageTypeId: UsageType = UsageType.<%= moduleNameNoDash %>;
	constructor(
		private _breadcrumbService: BreadcrumbService,
		private _errorService: ErrorService,
		private _formInteropService: FormInteropService,
		private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
    @Inject('message-box-service') private _messageBoxService: any,
		private _pageDetailService: PageDetailService,
		private _recordLockAgent: RecordLockAgent,
		private _userPermissionService: UserPermissionService,
    private _userService: UserService,
    @Inject('agency-combobox-controller') private AgencyComboboxController: any,
	) { }

	public create(config: any) {
		return new <%= moduleNameNoDash %>SearchOptions(
			this._breadcrumbService,
			config,
			this._errorService,
			this._formInteropService,
      this._<%= moduleNameCamel %>Agent,
      this._messageBoxService,
			this._pageDetailService,
			this._recordLockAgent,
			this._userPermissionService,
      this._userService,
      this.AgencyComboboxController
		);
	}
}
