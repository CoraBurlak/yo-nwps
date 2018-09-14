import {
	CommonModule
} from '@angular/common';
import {
	NgModule
} from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';
import {
	RouterModule
} from '@angular/router';

import {
	ModuleDataTranslatorService,
	NwCommonModule,
	UsageType
} from '@nwps/common';
import {
	CheckboxModule,
	NwCoreModule,
	OverflowTooltipModule
} from '@nwps/core';

import {
	RmsRecordsModule
} from '@nwps/records';
import {
    I<%= moduleNameNoDash %>Detail
} from './contracts/<%= moduleName %>-detail.interface';
import {
	<%= moduleNameNoDash %>GeneralEditComponent
} from './entry/general/edit/<%= moduleName %>-general-edit.component';
import {
	<%= moduleNameNoDash %>GeneralComponent
} from './entry/general/<%= moduleName %>-general.component';
import {
	<%= moduleNameNoDash %>GeneralViewComponent
} from './entry/general/view/<%= moduleName %>-general-view.component';
import {
	<%= moduleNameCapsUnder %>_COMPONENTS,
  <%= moduleNameCapsUnder %>_PROVIDERS,
	<%= moduleNameCamel %>Routing
} from './<%= moduleName %>.child.routing';

export const <%= moduleNameCapsUnder %>_SECTION_COMPONENTS = [
	<%= moduleNameNoDash %>GeneralComponent,
];
export const <%= moduleNameCapsUnder %>_SUBMODULE_COMPONENTS = [
  ...<%= moduleNameCapsUnder %>_SECTION_COMPONENTS,
	<%= moduleNameNoDash %>GeneralEditComponent,
	<%= moduleNameNoDash %>GeneralViewComponent,
];

@NgModule({
	imports: [
		CheckboxModule,
		CommonModule,
		FormsModule,
		<%= moduleNameCamel %>Routing,
		OverflowTooltipModule,
		NwCommonModule,
		NwCoreModule,
		ReactiveFormsModule,
		RmsRecordsModule,
		RouterModule
	],
	declarations: [
		...<%= moduleNameCapsUnder %>_COMPONENTS,
		...<%= moduleNameCapsUnder %>_SUBMODULE_COMPONENTS
	],
	exports: [
		...<%= moduleNameCapsUnder %>_COMPONENTS,
		...<%= moduleNameCapsUnder %>_SUBMODULE_COMPONENTS
	],
	entryComponents: [
		...<%= moduleNameCapsUnder %>_SECTION_COMPONENTS
	],
	providers: [
		...<%= moduleNameCapsUnder %>_PROVIDERS,
	]
})
export class <%= moduleNameNoDash %>Module {
	constructor(moduleDataTranslatorService: ModuleDataTranslatorService) {
		moduleDataTranslatorService.register(UsageType.<%= moduleNameNoDash %>, (source: I<%= moduleNameNoDash %>Detail) => {
			return [
				{ usageTypeId: UsageType.<%= moduleNameNoDash %>, source: source },
				{ usageTypeId: UsageType.<%= moduleNameNoDash %>General, source: source.general }
			];
		});
	}
}
