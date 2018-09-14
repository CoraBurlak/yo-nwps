import {
	ModuleWithProviders
} from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';
import {
  ModuleAction,
  PageType,
	PermissionType,
	SecurityComponent
} from '@nwps/common';
import {
	PromptIfDirtyDeactivateGuard,
	UiGridGridSettingResolver
} from '@nwps/core';

import {
  AgencyPageDetailResolver,
  GridIdentifiers,
  PermissionGuard
} from '@nwps/records';
import {
	<%= moduleNameNoDash %>AddPageResolver
} from './add/<%= moduleName %>-add-page.resolver';
import {
	<%= moduleNameNoDash %>AddComponent
} from './add/<%= moduleName %>-add.component';
import {
	<%= moduleNameNoDash %>DetailPageResolver
} from './detail/<%= moduleName %>-detail-page.resolver';
import {
	<%= moduleNameNoDash %>DetailComponent
} from './detail/<%= moduleName %>-detail.component';
import {
    <%= moduleNameNoDash %>Agent
} from './<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %>HeaderComponent
} from './header/<%= moduleName %>-header.component';

const basePath = '<%= moduleNameCamel %>';
export const <%= moduleNameCamel %>ChildRoutePaths = {
	<%= moduleNameNoDash %>Add: `${basePath}/add`,
	<%= moduleNameNoDash %>Detail: `${basePath}/:recordId`,
	<%= moduleNameNoDash %>Search: `/${basePath}/search`
};

export const <%= moduleNameCamel %>DetailRouteData = {
	forceRefresh: true,
	[UiGridGridSettingResolver.GridIdentifierRouteDataKey]: GridIdentifiers.<%= moduleNameCamel %>
};

export const <%= moduleNameCamel %>ChildRoutes: Routes = [
	{
		canActivate: [
			PermissionGuard
		],
		component: <%= moduleNameNoDash %>AddComponent,
		data: {
			forceRefresh: true,
      moduleAction: ModuleAction.Add,
      pageType: PageType.<%= moduleNameNoDash %>Add,
			permissionType: PermissionType.Add,
			securityComponent: SecurityComponent.<%= moduleNameNoDash %>
		},
		path: 'add',
		canDeactivate: [
			PromptIfDirtyDeactivateGuard
		],
		resolve: {
      pageDetail: AgencyPageDetailResolver
		}
	},
	{
		resolve: {
			pageDetail: <%= moduleNameNoDash %>DetailPageResolver,
			UiGridGridSettingResolver
		},
		component: <%= moduleNameNoDash %>DetailComponent,
		data: <%= moduleNameCamel %>DetailRouteData,
		path: ':recordId',
		canDeactivate: [
			PromptIfDirtyDeactivateGuard
		]
	}
];

export const <%= moduleNameCamel %>Routing: ModuleWithProviders = RouterModule.forChild(<%= moduleNameCamel %>ChildRoutes);

export const <%= moduleNameCapsUnder %>_PROVIDERS = [
	<%= moduleNameNoDash %>Agent,
	<%= moduleNameNoDash %>DetailPageResolver
];

export const <%= moduleNameCapsUnder %>_COMPONENTS = [
	<%= moduleNameNoDash %>AddComponent,
	<%= moduleNameNoDash %>DetailComponent,
	<%= moduleNameNoDash %>HeaderComponent
];
