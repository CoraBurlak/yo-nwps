import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
	HttpService,
	IPageResponseDetail,
	PageType,
	ISaveRequest,
	ISaveResult
} from '@nwps/common';

import { <%= moduleNameNoDash %>Resource } from './<%= moduleName %>.resource.enum';
import { I<%= moduleNameNoDash %>Header } from './contracts/<%= moduleName %>-header.interface';
import { I<%= moduleNameNoDash %> } from './contracts/<%= moduleName %>.interface';
import { I<%= moduleNameNoDash %>Detail } from './contracts/<%= moduleName %>-detail.interface';
import { I<%= moduleNameNoDash %>General } from './contracts/<%= moduleName %>-general.interface';

@Injectable()
export class <%= moduleNameNoDash %>Agent {
	constructor(
		private _httpService: HttpService
	) { }

	public getPageDetailView(<%= moduleNameCamel %>Id: number): Observable<IPageResponseDetail<I<%= moduleNameNoDash %>Header, I<%= moduleNameNoDash %>Detail>> {
    return this._httpService.get(<%= moduleNameNoDash %> Resource.<%= moduleNameCapsUnder %> _PAGE_DETAIL_VIEW, { <%= moduleNameCamel %> Id, pageId: PageType.<%= moduleNameNoDash %> Detail });
	}

	public getGeneral(<%= moduleNameCamel %>Id: number): Observable<I<%= moduleNameNoDash %>General> {
		return this._httpService.get(<%= moduleNameNoDash %>Resource.<%= moduleNameCapsUnder %>_GENERAL, { <%= moduleNameCamel %>Id });
	}

	public saveGeneral(<%= moduleNameCamel %>Id: number): Observable<I<%= moduleNameNoDash %>General> {
		return this._httpService.get(<%= moduleNameNoDash %>Resource.<%= moduleNameCapsUnder %>_GENERAL, { <%= moduleNameCamel %>Id });
	}

	public save<%= moduleNameNoDash %>(<%= moduleNameCamel %>I: ISaveRequest<I<%= moduleNameNoDash %>>, recordLockId: string): Observable<ISaveResult<I<%= moduleNameNoDash %>Detail, I<%= moduleNameNoDash %>Header>> {
		return this._httpService.post(<%= moduleNameNoDash %>Resource.<%= moduleNameCapsUnder %>_SAVE, <%= moduleNameCamel %>I, { recordLockId });
	}

	public delete<%= moduleNameNoDash %>(<%= moduleNameCamel %>Id: number, activityConfirmation: string, recordLockId?: string): Observable<void> {
		return this._httpService.delete(<%= moduleNameNoDash %>Resource.<%= moduleNameCapsUnder %>_DELETE, { <%= moduleNameCamel %>Id, recordLockId, activityConfirmation });
	}
}
