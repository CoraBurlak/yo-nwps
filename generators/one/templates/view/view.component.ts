import {
	Component,
} from '@angular/core';

import {
	IOneToOneViewOptions,
	UsageType
} from '@nwps/common';

import {
	DisplayField,
	RecordFormatUtility
} from '@nwps/records';

import { I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail } from '../../../contracts/<%= moduleName %>-<%= sectionName %>-detail.interface';

@Component({
	selector: '<%= moduleName %>-<%= sectionName %>-view',
	template: '<one-to-one-view [options]="options"></one-to-one-view>'
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent {
	public options: IOneToOneViewOptions;

	constructor(
		recordFormatUtility: RecordFormatUtility
	) {

		this.options = {
			usageTypeId: UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>,
			fieldDefs: {
				[DisplayField.<%= moduleNameNoDash %><%= sectionNameNoDash %>]: (<%= sectionNameCamel %>Detail: I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail) => '',
			}
		};
	}
}
