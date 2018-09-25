import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IOneToOneEntryViewModel,
  IPageField,
  ISaveRequest,
  ISaveResult,
  ModuleDataTranslatorService,
  ModuleDataViewService,
  OneToOneEntryFactory,
  PageResponseDetailService,
  SaveMode,
  UsageType,
  UsageTypeProperties,
  ValidationMode,
} from '@nwps/common';
import { FormInteropService, IField } from '@nwps/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { Subscription } from 'rxjs/Subscription';

import { I<%= sectionNameCaps %>Detail } from '../../../contracts/<%= moduleName %>-detail.interface';
import { I<%= sectionNameCaps %>GeneralDetail } from '../../../contracts/<%= moduleName %>-general-detail.interface';
import { I<%= sectionNameCaps %>General } from '../../../contracts/<%= moduleName %>-general.interface';
import { I<%= sectionNameCaps %>Header } from '../../../contracts/<%= moduleName %>-header.interface';
import { I<%= sectionNameCaps %> } from '../../../contracts/<%= moduleName %>.interface';
import { <%= sectionNameCaps %>Agent } from '../../../<%= moduleName %>.agent';

@Component({
  selector: '<%= moduleName %>-general-edit',
  template: `<nw-one-to-one-entry [vm]="oneToOneEntryVM"></nw-one-to-one-entry>`
})
export class <%= sectionNameCaps %>GeneralEditComponent implements OnDestroy {
  @Input() addMode: boolean;
  @Input() recordLockId: string;
  @Output() done = new EventEmitter;

  public oneToOneEntryVM: IOneToOneEntryViewModel;

  private _<%= moduleNameCamel %>Detail: I<%= sectionNameCaps %>Detail;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _<%= moduleNameCamel %>Agent: <%= sectionNameCaps %>Agent,
    private _formInteropService: FormInteropService,
    private _moduleDataTranslatorService: ModuleDataTranslatorService,
    private _moduleDataViewService: ModuleDataViewService,
    private _oneToOneEntryFactory: OneToOneEntryFactory,
    private _pageResponseDetailService: PageResponseDetailService,
  ) {
    this._subscriptions.push(this._moduleDataViewService.data<I<%= sectionNameCaps %>Detail>(UsageType.<%= sectionNameCaps %>).subscribe(<%= moduleNameCamel %>Detail => {
      this._<%= moduleNameCamel %>Detail = <%= moduleNameCamel %>Detail;
    }));

    this.oneToOneEntryVM = this._oneToOneEntryFactory.create({
      onEditComplete: () => this.done.emit(),
      primaryRecordId: this._<%= moduleNameCamel %>Detail.id,
      usageType: UsageTypeProperties[UsageType.<%= sectionNameCaps %>General],
      createField: (formName, field, shouldApplyDefault) => this.createField(formName, field, shouldApplyDefault),
      getRecord: () => this._<%= moduleNameCamel %>Agent.getGeneralDetail(this._<%= moduleNameCamel %>Detail.id),
      getSaveRequest: () => this.getSaveRequest(),
      recordPath: 'source.general',
      saveEntry: request => this.saveEntry(request),
      fieldDefs: {

      }
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  private saveEntry(request: ISaveRequest<I<%= sectionNameCaps %>>): Observable<ISaveResult<I<%= sectionNameCaps %>Detail, I<%= sectionNameCaps %>Header>> {
    return this._<%= moduleNameCamel %>Agent.save<%= sectionNameCaps %>(request, this.recordLockId).pipe(
      tap(saveResponse => this._moduleDataTranslatorService.translate(UsageType.<%= sectionNameCaps %>, saveResponse.source).forEach(d => this._moduleDataViewService.update(d.usageTypeId, d.source))),
      tap(saveResponse => this._pageResponseDetailService.header.next(saveResponse.header))
    );
  }

  private getSaveRequest(): ISaveRequest<I<%= sectionNameCaps %>> {
    const <%= moduleNameCamel %>SaveRequest: ISaveRequest<I<%= sectionNameCaps %>> = {
      mask: {
        includeChildren: true,
        overrides: {
          [UsageType.<%= sectionNameCaps %>General]: SaveMode.Save
        }
      },
      validationMode: ValidationMode.RequireValid,
      source: {
        id: this._<%= moduleNameCamel %>Detail.id,
        number: parseInt(this._<%= moduleNameCamel %>Detail.number, 10),
        agencyId: this._<%= moduleNameCamel %>Detail.agency.id,
        general: this.getGeneral(this._<%= moduleNameCamel %>Detail.id)
      }
    };
    return <%= moduleNameCamel %>SaveRequest;
  }

  private getGeneral(<%= moduleNameCamel %>Id: number): I<%= sectionNameCaps %>General {
    return {
      <%= moduleNameCamel %>Id,
    };
  }

  private createField(formName: string, field: IPageField, shouldApplyDefault: () => boolean): IField {
    switch (field.id) {
      default:
        return null;
    }
  }
}
