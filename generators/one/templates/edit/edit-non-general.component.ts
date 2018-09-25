import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';

import {
  tap
} from 'rxjs/operators/tap';

import {
  IOneToOneEntryViewModel,
  IPageField,
  ISaveResult,
  ModuleDataViewService,
  OneToOneEntryFactory,
  UsageType,
  UsageTypeProperties
} from '@nwps/common';
import {
  FormInteropService,
  IField,
} from '@nwps/core';

import {
  <%= moduleNameCaps %>Agent
} from '../../../<%= moduleName %>.agent';
import {
  I<%= moduleNameCaps %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
  I<%= moduleNameCaps %><%= sectionNameCaps %>Detail
} from '../../../contracts/<%= moduleName %>-<%= sectionName %>-detail.interface';
import {
  I<%= moduleNameCaps %><%= sectionNameCaps %>
} from '../../../contracts/<%= moduleName %>-<%= sectionName %>.interface';

@Component({
  selector: '<%= moduleName %>-<%= sectionName %>-edit',
  template: `<nw-one-to-one-entry [vm]="oneToOneEntryVM"></nw-one-to-one-entry>`
})
export class <%= moduleNameCaps %><%= sectionNameCaps %>EditComponent {
  @Input() addMode: boolean;
  @Input() recordLockId: string;
  @Output() done = new EventEmitter;

  public oneToOneEntryVM: IOneToOneEntryViewModel;

  private _<%= moduleName %>Detail: I<%= moduleNameCaps %>Detail;

  constructor(
    private _<%= moduleName %>Agent: <%= moduleNameCaps %>Agent,
    private _formInteropService: FormInteropService,
    private _moduleDataViewService: ModuleDataViewService,
    private _oneToOneEntryFactory: OneToOneEntryFactory,
  ) {
    this._<%= moduleName %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameCaps %>Detail>(UsageType.<%= moduleNameCaps %>);

    this.oneToOneEntryVM = this._oneToOneEntryFactory.create({
      onEditComplete: () => this.done.emit(),
      primaryRecordId: this._<%= moduleName %>Detail.id,
      usageType: UsageTypeProperties[UsageType.<%= moduleNameCaps %>StructuralInformation],
      createField: (formName, field, shouldApplyDefault) => this.createField(formName, field, shouldApplyDefault),
      getRecord: () => this._<%= moduleName %>Agent.get<%= sectionNameCaps %>Detail(this._<%= moduleName %>Detail.id),
      getSaveRequest: () => this.getSaveRequest(),
      saveEntry: request => this._<%= moduleName %>Agent.save<%= sectionNameCaps %>(request, this.recordLockId).pipe(
        tap((saveResponse: ISaveResult<I<%= moduleNameCaps %><%= sectionNameCaps %>Detail>) => this._moduleDataViewService.update(UsageType.<%= moduleNameCaps %>StructuralInformation, saveResponse.source))
      ),
      fieldDefs: {

      }

    });
  }

  private getSaveRequest(): I<%= moduleNameCaps %><%= sectionNameCaps %> {
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
