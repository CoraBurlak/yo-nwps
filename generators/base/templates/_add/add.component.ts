import {
    Component,
    Inject,
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';

import {
    Subscription
} from 'rxjs/Subscription';

import {
    ApplicationService,
    IAddOptions,
    PageResponseDetailService,
    UsageType
} from '@nwps/common';
import {
    BaseModuleWithFieldHelpComponent
} from '@nwps/records';

import {
    <%= moduleNameCapsUnder %>_COMPONENTS_BY_SECTION
} from '../<%= moduleName %>-components-by-section';

@Component({
    selector: '<%= moduleName %>-add',
    templateUrl: '<%= moduleName %>-add.component.html'
})
export class <%= moduleNameNoDash %>AddComponent extends BaseModuleWithFieldHelpComponent {

    public addOptions: IAddOptions;

    constructor(
      activatedRoute: ActivatedRoute,
      pageResponseDetailService: PageResponseDetailService,
      private _applicationService: ApplicationService,
      @Inject('modeless-service') modelessService: any
    ) {
      super(activatedRoute, pageResponseDetailService, modelessService);

      this._applicationService.setTitle(`Add <%= moduleNameNormalCap %>`);

      this.addOptions = {
        usageTypeId: UsageType.<%= moduleNameNoDash %>,
        componentsBySection: <%= moduleNameCapsUnder %>_COMPONENTS_BY_SECTION
      };
    }
}
