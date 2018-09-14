import {
    Component,
    OnDestroy,
} from '@angular/core';

import {
    Subscription
} from 'rxjs/Subscription';

import {
    ModuleAction,
    PageResponseDetailService,
} from '@nwps/common';
import {
    FormInteropService,
    IField,
    ObjectUtility
} from '@nwps/core';
import {
    CounterType
} from '@nwps/records';

import {
    I<%= moduleNameNoDash %>Detail
} from '../contracts/<%= moduleName %>-detail.interface';
import {
    I<%= moduleNameNoDash %>Header
} from '../contracts/<%= moduleName %>-header.interface';

@Component({
	selector: '<%= moduleName %>-header',
	templateUrl: '<%= moduleName %>-header.component.html'
})
export class <%= moduleNameNoDash %>HeaderComponent implements OnDestroy {
	public isAddMode: boolean;
	public header: I<%= moduleNameNoDash %>Header;

	private _subscriptions: Subscription[] = [];

	constructor(
		private _pageResponseDetailService: PageResponseDetailService
	) {
    this.isAddMode = this._pageResponseDetailService.snapshot.routeData['moduleAction'] === ModuleAction.Add;
    this._subscriptions.push(this._pageResponseDetailService.header.subscribe((header: I<%= moduleNameNoDash %>Header) => this.header = header));
	}

	public ngOnDestroy(): void {
		this._subscriptions.forEach(s => s.unsubscribe());
	}
}
