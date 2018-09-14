import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';
import {
    tap
} from 'rxjs/operators/tap';
import {
    Subscription
} from 'rxjs/Subscription';

import {
    IOneToOneEntryViewModel,
    IPageDetail,
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
    ValidationMode
} from '@nwps/common';
import {
    FormInteropService,
    IField,
} from '@nwps/core';
import {
    DisplayField
} from '@nwps/records';

import {
    I<%= moduleNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-<%= sectionNameCamel %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDash %>
} from '../../../contracts/<%= moduleName %>-<%= sectionNameCamel %>.interface';
import {
    I<%= moduleNameNoDash %>
} from '../../../contracts/<%= moduleName %>.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../../<%= moduleName %>.agent';

@Component({
  selector: '<%= moduleName %>-<%= sectionName %>-edit',
  template: `<nw-one-to-one-entry [vm]="oneToOneEntryVM"></nw-one-to-one-entry>`
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent implements OnDestroy {
  @Input() addMode: boolean;
  @Input() recordLockId: string;
  @Output() done = new EventEmitter;

  public oneToOneEntryVM: IOneToOneEntryViewModel;

  private _<%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail;
  private _<%= moduleNameCamel %><%= sectionNameNoDash %>: I<%= moduleNameNoDash %><%= sectionNameNoDash %>;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent,
    private _formInteropService: FormInteropService,
    private _moduleDataTranslatorService: ModuleDataTranslatorService,
    private _moduleDataViewService: ModuleDataViewService,
    private _oneToOneEntryFactory: OneToOneEntryFactory,
    private _pageResponseDetailService: PageResponseDetailService,
  ) {
    this._subscriptions.push(this._moduleDataViewService.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>).subscribe(<%= moduleNameCamel %>Detail => {
      this._<%= moduleNameCamel %>Detail = <%= moduleNameCamel %>Detail;
    }));

    this._subscriptions.push(this._moduleDataViewService.data<I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>).subscribe(<%= moduleNameCamel %><%= sectionNameNoDash %>Detail => {
      this._<%= moduleNameCamel %><%= sectionNameNoDash %>Detail = <%= moduleNameCamel %><%= sectionNameNoDash %>Detail;
    }));
    this.oneToOneEntryVM = this._oneToOneEntryFactory.create({
      onEditComplete: () => this.done.emit(),
      primaryRecordId: this._<%= moduleNameCamel %>Detail.id,
      usageType: UsageTypeProperties[UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>],
      createField: (formName, field, shouldApplyDefault) => this.createField(formName, field, shouldApplyDefault),
      getRecord: (gridView) => this._<%= moduleNameCamel %>Agent.get<%= sectionNameNoDash %>Detail(gridView.<%=moduleNameCamel%>Id, gridView.id),
      getSaveRequest: () => this.getSaveRequest(),
      <% if (isBase) { %> recordPath: 'source.<%= sectionNameCamel %>', <% } %>
      <% if (isBase) { %> saveEntry: request => this.save<%= moduleNameNoDash %>(request), <% } %>
      <% if (!isBase) { %> saveEntry: request => this.save<%= sectionNameNoDash %>(request), <% } %>
      afterViewInit: (fields) => {
      },
      fieldDefs: {
        [DisplayField.<%= moduleNameNoDash %><%= sectionNameNoDash %>]: (<%= sectionNameCamel %>: I<%= moduleNameNoDash %><%= sectionNameNoDash %>) => null,

      }
    })
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  <% if (isBase) { %>
  private save<%= moduleNameNoDash %>(request: ISaveRequest <I<%= moduleNameNoDash %>>): Observable <ISaveResult<I<%= moduleNameNoDash %>Detail, I<%= moduleNameNoDash %>Header >> {
    // Scaffold Note: If you are creating a new module (e.g. the general) use this save
    return this._<%= moduleNameCamel %>Agent.save<%= moduleNameNoDash %>(request, this.recordLockId).pipe(
      tap(saveResponse => {
        this._moduleDataTranslatorService.translate(UsageType.<%= moduleNameNoDash %>, saveResponse.source).forEach(d => this._moduleDataViewService.updateSourceIfDefined(d.usageTypeId, d.source));
        this._pageResponseDetailService.header.next(saveResponse.header);
      })
    );
  }
  <% } %>

  <% if (!isBase) { %>
    private save<%=sectionNameNoDash%>(request: I<%= moduleNameNoDash %><%= sectionNameNoDash %>): Observable <I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail > {
      // Scaffold Note: If you are creating a new one to one section (not general) use this save
      return this._<%= moduleNameCamel %>Agent.save<%= sectionNameNoDash %>(request, this.recordLockId).pipe(
        tap(saveResponse => this._moduleDataViewService.update(UsageType.<%= moduleNameNoDash %> <%= sectionNameNoDash %>, saveResponse)
        );
    }
  <% } %>

  private getSaveRequest(): ISaveRequest<I<%= moduleNameNoDash %>> {
    const <%= moduleNameCamel %>SaveRequest: ISaveRequest<I<%= moduleNameNoDash %>> = {
      mask: {
        includeChildren: true,
        overrides: {
          [UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>]: SaveMode.Save
        }
      },
      validationMode: ValidationMode.RequireValid,
      source: <I<%= moduleNameNoDash %>>{
        <%= sectionNameCamel %>: this.get<%= sectionNameNoDash %>(this._<%= moduleNameCamel %>Detail.id)
      }
    };
    return <%= moduleNameCamel %>SaveRequest;
  }

  private get<%= sectionNameNoDash %>(<%= moduleNameCamel %>Id: number): I<%= moduleNameNoDash %><%= sectionNameNoDash %> {
    return {

    };
  }

  private createField(formName: string, field: IPageField, shouldApplyDefault: () => boolean): IField {
    switch (field.id) {
      default:
        return null;
    }
  }
}
