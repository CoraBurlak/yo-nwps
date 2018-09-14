import {
    Component,
    Inject,
    OnInit,
    ViewChild
} from '@angular/core';

import {
    ISearchComponent,
    ISearchComponentOptions,
    PermissionType,
    SearchComponent,
    SecurityComponent,
    UsageType,
    UserPermissionService
} from '@nwps/common';
import {
    BaseFieldHelpComponent,
    RecordsSearchUsageInfo
} from '@nwps/records';

import {
    <%= moduleNameCamel %>ChildRoutePaths
} from '../<%= moduleName %>.child.routing';

@Component({
	selector: '<%= moduleName %>-search',
	template: '<rms-search *ngIf="searchComponentOptions" [options]="searchComponentOptions"></rms-search>'
})
export class <%= moduleNameNoDash %>SearchComponent extends BaseFieldHelpComponent implements OnInit {
	@ViewChild(SearchComponent) searchComponent: ISearchComponent;

	public searchComponentOptions: ISearchComponentOptions;

	constructor(
		private _userPermissionService: UserPermissionService,
		@Inject('modeless-service') modelessService: any
	) {
		super(modelessService);
	}

	public ngOnInit(): void {
		this.searchComponentOptions = {
			addRoute: <%= moduleNameCamel %>ChildRoutePaths.<%= moduleNameNoDash %>Add,
			errorContainerConfig: { component: '<%= moduleNameCamel %>RequestSearch' },
			showAdd: () => this._userPermissionService.hasAnyPermission([SecurityComponent.<%= moduleNameNoDash %>], PermissionType.Add),
			searchInfo: RecordsSearchUsageInfo[UsageType.<%= moduleNameNoDash %>]
		};
	}
}
