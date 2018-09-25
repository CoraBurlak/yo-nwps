import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  of
} from 'rxjs/observable/of';

import {
  IPageField,
  MockOneToOneEntryViewModel,
  ModuleDataViewService,
  NwCommonMocksModule,
  OneToOneEntryFactory
} from '@nwps/common';
import {
  FormInteropService
} from '@nwps/core';
import {
  DisplayField
} from '@nwps/records';

import {
  <%= moduleNameCaps %>Agent
} from '../../../<%= moduleName %>.agent';
import {
  I<%= moduleNameCaps %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
  <%= moduleNameCaps %><%= sectionNameCaps %>EditComponent
} from './<%= moduleName %>-<%= sectionName %>-edit.component';

describe('<%= moduleNameCaps %>: <%= moduleNameCaps %><%= sectionNameCaps %>EditComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameCaps %><%= sectionNameCaps %>EditComponent>;
  let component: <%= moduleNameCaps %><%= sectionNameCaps %>EditComponent;

  const viewMock: I<%= moduleNameCaps %>Detail = {
    id: 579,
  };

  function createComponent(): void {
    fixture = TestBed.createComponent(<%= moduleNameCaps %><%= sectionNameCaps %>EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule
      ],
      declarations: [
        <%= moduleNameCaps %><%= sectionNameCaps %>EditComponent
      ],
      providers: [
        {
          provide: <%= moduleNameCaps %>Agent,
          useValue: {
            get<%= sectionNameCaps %>Detail: jasmine.createSpy('get<%= sectionNameCaps %>Detail').and.returnValue(of({})),
            save<%= sectionNameCaps %>: jasmine.createSpy('save<%= sectionNameCaps %>').and.returnValue(of({}))
          }
        },
        {
          provide: FormInteropService,
          useValue: {
            createField: jasmine.createSpy('createField').and.callFake((formName, fieldName, controller, fieldOptions, data) => {
              return { controller, data };
            })
          }
        },
        {
          provide: ModuleDataViewService,
          useValue: {
            update: jasmine.createSpy('update'),
            snapshot: { data: jasmine.createSpy('data').and.callFake(() => viewMock) }
          }
        },
        {
          provide: OneToOneEntryFactory,
          useValue: {
            create: jasmine.createSpy('create').and.callFake(options => new MockOneToOneEntryViewModel(options))
          }
        }
      ]
    });
  }));

  afterEach(() => {
    if (fixture)
      fixture.destroy();
  });

  describe('oneToOneEntryVM', () => {
    describe('primaryRecordId', () => {
      it('should set the primaryRecordId correctly', () => {
        createComponent();
        expect(component.oneToOneEntryVM.primaryRecordId).toBe(viewMock.id);
      });
    });

    describe('createField', () => {
      // make sure your fields have the correct options
    });

    describe('getRecord', () => {
      it('should call the correct method on the <%= moduleName %>Agent', async(() => {
        const <%= moduleName %>Agent: <%= moduleNameCaps %>Agent = TestBed.get(<%= moduleNameCaps %>Agent);
        createComponent();
        component.oneToOneEntryVM.getRecord().subscribe();
        expect(<%= moduleName %>Agent.get<%= sectionNameCaps %>Detail).toHaveBeenCalledWith(viewMock.id);
      }));
    });

    describe('saveEntry', () => {
      it('should save the request', async(() => {
        const moduleDataViewService: ModuleDataViewService = TestBed.get(ModuleDataViewService);
        const <%= moduleName %>Agent: <%= moduleNameCaps %>Agent = TestBed.get(<%= moduleNameCaps %>Agent);
        createComponent();
        component.oneToOneEntryVM.saveEntry(null).subscribe();
        expect(<%= moduleName %>Agent.save<%= sectionNameCaps %>).toHaveBeenCalled();
        expect(moduleDataViewService.update).toHaveBeenCalled();
      }));
    });
  });
});
