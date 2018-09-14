import {
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ObjectUtility } from '@nwps/core';
import {
    ModuleDataViewService,
    UsageType
} from '@nwps/common';
import {
    GridIdentifiers,
    HistoricalChangeReasonTypeProperties
} from '@nwps/records';

import { <%= moduleNameNoDash %>Agent } from '../../../<%= moduleName %>.agent';
import { I<%= moduleNameNoDash %>Detail } from '../../../contracts/<%= moduleName %>-detail.interface';
import { I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail } from '../../../contracts/<%= moduleName %>-<%= sectionNameSingular %>-detail.interface';
@Component({
    selector: '<%= moduleName %>-<%= sectionName %>-view',
    templateUrl: '<%= moduleName %>-<%= sectionName %>-view.component.html'
})

export class <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent implements OnDestroy, OnInit {
    private _subscriptions: ISubscription[] = [];
    private _<%= moduleNameCamel %><%= sectionNameNoDashSingular %>Details: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail[] = [];

    public <%= moduleNameCamel %><%= sectionNameNoDashSingular %>GridController: any;
    public selectedView: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail;
    private _<%= moduleNameCamel %>Id: number;

    constructor(
        @Inject('ui-grid-controller') private UiGridController: any
    ) {
      // STUB if you need more put it here or below.
    }

    public ngOnInit(): void {
        let actionMenu = {
            items: [
                {
                    displayText: options => { return options.row.entity === this.selectedView ? 'Hide' : 'Show'; },
                    callBack: options => { this.selectedView = (options.row.entity === this.selectedView) ? null : options.row.entity; }
                }
            ]
        };

        this.<%= moduleNameCamel %><%= sectionNameNoDashSingular %>GridController = new this.UiGridController({
            identifier: GridIdentifiers.<%= moduleNameCamel %>.<%= sectionNameCamelSingular %>,
            gridOptions: {
                data: this._<%= moduleNameCamel %><%= sectionNameNoDashSingular %>Details,
                getGridViews: () => this._<%= moduleNameCamel %>Agent.get<%= sectionNameNoDashSingular %>DetailsFor<%= moduleNameNoDash %>(this._<%= moduleNameCamel %>Id),
                columnDefs: [
                    { actionMenu: actionMenu, width: 100 },
                    // Add field defs here.
                ]
            }
        });
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }
}
