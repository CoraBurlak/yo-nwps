import {
    NgModule
} from '@angular/core';

import {
    NwCommonModule,
    SEARCH_OPTIONS_FACTORY
} from '@nwps/common';
import {
    NwCoreModule
} from '@nwps/core';

import {
    <%= moduleNameNoDash %>Agent
} from '../<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %>SearchOptionsFactory
} from './<%= moduleName %>-search-options.factory';

@NgModule({
	imports: [
		NwCoreModule,
		NwCommonModule
	],
	providers: [
		<%= moduleNameNoDash %>Agent,
		{ provide: SEARCH_OPTIONS_FACTORY, useClass: <%= moduleNameNoDash %>SearchOptionsFactory }
	]
})
export class <%= moduleNameNoDash %>SearchOptionsModule { }
