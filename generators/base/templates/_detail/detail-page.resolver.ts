import {
  Injectable
} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve
} from '@angular/router';

import {
    ErrorService,
    IPageResponseDetail
} from '@nwps/common';

import {
  I<%= moduleNameNoDash %>Detail
} from '../contracts/<%= moduleName %>-detail.interface';
import {
  I<%= moduleNameNoDash %>Header
 } from '../contracts/<%= moduleName %>-header.interface';
import {
  <%= moduleNameNoDash %>Agent
} from '../<%= moduleName %>.agent';

@Injectable()
export class <%= moduleNameNoDash %>DetailPageResolver implements Resolve<IPageResponseDetail<I<%= moduleNameNoDash %>Header, I<%= moduleNameNoDash %>Detail>> {
    constructor(
        private _errorService: ErrorService,
        private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent) { }

    public resolve(route: ActivatedRouteSnapshot) {
        return this._<%= moduleNameCamel %>Agent.getPageDetailView(+route.params['recordId']).catch(error => this._errorService.processError(error));
    }
}
