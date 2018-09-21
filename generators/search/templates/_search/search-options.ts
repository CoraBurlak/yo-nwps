import {
    Observable
} from 'rxjs/Observable';

import {
    ErrorService,
    IPageDetail,
    IPageField,
    PageDetailService,
    PageType,
    PermissionType,
    RecordLockAgent,
    SearchOptions,
    SecurityComponent,
    UsageType,
    UserPermissionService,
    UserService
} from '@nwps/common';
import {
    ArrayUtility,
    BreadcrumbService,
    FormInteropService,
    IBreadcrumbListItem,
    IField,
    MessageUtility
} from '@nwps/core';
import {
    DisplayField,
    GridIdentifiers
} from '@nwps/records';

import {
    I<%= moduleNameNoDash %>SearchResultGridView
} from '../contracts/<%= moduleName %>-search-result-grid-view.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../shared/<%= moduleName %>.agent';

export class <%= moduleNameNoDash %>SearchOptions extends SearchOptions {
	private _ctrlOptions: any = {};
	private _recordLockId: string;

	constructor(
		private _breadcrumbService: BreadcrumbService,
		private _config: any,
		_errorService: ErrorService,
		private _formInteropService: FormInteropService,
    private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
    private _messageBoxService: any,
		private _pageDetailService: PageDetailService,
		private _recordLockAgent: RecordLockAgent,
		private _userPermissionService: UserPermissionService,
    private _userService: UserService,
    private AgencyComboboxController: any,
	) {
		super(_errorService);
		this._ctrlOptions.identifier = GridIdentifiers.<%= moduleNameCamel %>Search;

		const actionMenu = {
			items: [
				{
					displayText: 'Open',
					isHidden: options => {
						if (!options || !options.row || !options.row.entity)
							return true;

						const rowEntity: I<%= moduleNameNoDash %>SearchResultGridView = options.row.entity;
						const <%= moduleNameCamel %>Agency = rowEntity.agency.id;
						return !this._userPermissionService.hasAgencyPermission(SecurityComponent.<%= moduleNameNoDash %>, <%= moduleNameCamel %>Agency, PermissionType.View);
					},
					beforeNavigation: (options) => {
						const filteredDatasource: I<%= moduleNameNoDash %>SearchResultGridView[] = this._datasource.results.filter((record: I<%= moduleNameNoDash %>SearchResultGridView) => {
							return this._userPermissionService.hasAgencyPermission(SecurityComponent.<%= moduleNameNoDash %>, record.agency.id, PermissionType.View);
						});
						const rowEntity: I<%= moduleNameNoDash %>SearchResultGridView = options.row.entity;
						const listItems: IBreadcrumbListItem[] = ArrayUtility.getBuffer(filteredDatasource, filteredDatasource.findIndex(x => x.id === rowEntity.id), this._breadcrumbBufferSize).map(x => {
							return {
								description: `${x.number} (${x.name})`,
								sourceId: x.id,
								title: `${x.number}`,
								routeCommands: this.getDetailRoute(x)
							};
						});
						const breadcrumb = this._breadcrumbService.getCurrentBreadcrumb();
						breadcrumb.listItems = listItems;
						breadcrumb.selectedListItem = listItems.find(x => x.sourceId === options.row.entity.id);
						this._breadcrumbService.updateCurrentBreadcrumb(breadcrumb);
					},
					getRoute: options => {
						return this.getDetailRoute(options.row.entity);
					}
				},
				{
					displayText: 'Audit Trail',
					isHidden: options => {
            if (!options || !options.row || !options.row.entity)
							return true;
						const rowEntity: I<%= moduleNameNoDash %>SearchResultGridView = options.row.entity;
						const <%= moduleNameCamel %>Agency = rowEntity.agency.id;
						return !this._userPermissionService.hasAgencyPermission(SecurityComponent.FieldLevelAuditSearch, <%= moduleNameCamel %>Agency, PermissionType.Execute);
					},
					getRoute: options => {
						return this.getAuditRoute(options.row.entity);
					}
				},
				{
					displayText: 'Delete',
					isHidden: options => {
						if (!options || !options.row || !options.row.entity)
							return true;
						const rowEntity: I<%= moduleNameNoDash %>SearchResultGridView = options.row.entity;
						const <%= moduleNameCamel %>Agency = rowEntity.agency.id;
						return !this._userPermissionService.hasAgencyPermission(SecurityComponent.<%= moduleNameNoDash %>, <%= moduleNameCamel %>Agency, PermissionType.Delete);
					},
					callBack: callbackOptions => {
						const <%= moduleNameCamel %>Id = callbackOptions.row.entity.id;
						this._messageBoxService.confirmWithReasons(MessageUtility.getMessage('deleteWithReason'), 'Confirm <%= moduleNameNormalCap %> Delete', 'Delete Entry', 'Don\'t Delete').then((result) => {
							this.acquireLock(<%= moduleNameCamel %>Id).then(() => {
								return this._<%= moduleNameCamel %>Agent.delete<%= moduleNameNoDash %>(<%= moduleNameCamel %>Id, result.reason, this._recordLockId).subscribe({
									next: () => {
										this._config.searchFn();
										this.releaseLock();
									},
									error: error => {
										this.releaseLock();
										this._errorService.processError(error);
									}
								});
							}, error => this._errorService.processError(error));
						});
					},
					cssClass: 'context-menu-delete'
				}
			]
		};

		this._ctrlOptions.gridOptions = {
			dataFn: this.getSearchFn(criteria => this._<%= moduleNameCamel %>Agent.get<%= moduleNameNoDash %>SearchResultGridViews(criteria)),
			columnDefs: [
				{ actionMenu: actionMenu, width: 100 },
			]
		};
	}

	public get fieldDefs(): any {
		return {
			[DisplayField.<%= moduleNameNoDash %>SearchAgency]: { path: 'agencyIds' },
		};
	}

	public get ctrlOptions(): any {
		return this._ctrlOptions;
	}

	private acquireLock(primaryId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = {
				primaryRecordId: primaryId,
				usageTypeId: UsageType.<%= moduleNameNoDash %>
			};
			this._recordLockAgent.acquireLock(request).subscribe({
				next: (result) => {
					this._recordLockId = result.id;
					resolve();
				},
				error: (error) => {
					this._errorService.processError(error);
					reject(error);
				}
			});
		});
	}

	public createField(formName: string, field: IPageField): IField {
		return this._fields[field.id] = this._createField(formName, field);
	}
	private _createField(formName: string, field: IPageField): IField {
		switch (+field.id) {
			case DisplayField.<%= moduleNameNoDash %>SearchAgency:
				return this._formInteropService.createField(formName, field.systemName, new this.AgencyComboboxController({
					name: field.systemName,
					label: field.name,
					isRequired: field.isRequired,
					isMultiSelect: true,
					displayInactive: true,
					filterByPermissions: {
						componentType: SecurityComponent.<%= moduleNameNoDash %>Search,
						permissionType: PermissionType.Execute
					}
				}));
			default:
				return null;
		}
	}

	public getPageDetail(): Observable<IPageDetail> {
		return this._pageDetailService.getPageDetail(this._userService.getUser().id, PageType.<%= moduleNameNoDash %>Search);
	}

	private releaseLock(): void {
		this._recordLockAgent.revokeLocks([this._recordLockId])
			.subscribe({
				next: () => this._recordLockId = null,
				error: error => this._errorService.processError(error)
			});
	}

	private getDetailRoute(item: I<%= moduleNameNoDash %>SearchResultGridView): any[] {
		if (!item) return null;

		return [`/<%= moduleNameCamel %>/${item.id}`];
	}

	private getAuditRoute(item: I<%= moduleNameNoDash %>SearchResultGridView): any {
		if (!item) return null;
		const auditParams = {
			agencyIds: item.agency.id,
			usageTypeIds: UsageType.<%= moduleNameNoDash %>,
			referenceNumber: item.number
		};
		// tODO: http://confab:8080/browse/JUP-5060 Remove hard-coded route path.
		return {
			commands: ['/fieldLevelAudit/search'],
			extras: {
				queryParams: auditParams
			}
		};
	}
}
