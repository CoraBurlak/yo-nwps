import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  IPageField,
  ModuleDataViewService,
  NwCommonMocksModule,
  UsageType
} from '@nwps/common';
import {
  DisplayField,
  GlobalSubjectViewerFactory,
  RecordFormatUtility
} from '@nwps/records';

import {
  I<%= moduleNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
  <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent
} from './<%= moduleName %>-<%= sectionName %>-view.component';

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent>;
  let component: <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent;

  const <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail = {
    agency: { id: 123, value: 'agency' },
    <%= sectionName %>: {
      // STUB best guess
    },
    id: 1,
    number: '1234'
  };

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule
      ],
      declarations: [
        <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent
      ],
      providers: [
        {
          provide: GlobalSubjectViewerFactory,
          useValue: {
            create: jasmine.createSpy('create').and.callFake(options => ({
              options
            }))
          }
        },
        {
          provide: ModuleDataViewService,
          useValue: {
            snapshot: {
              data: jasmine.createSpy('data').and.returnValue(<%= moduleNameCamel %>Detail)
            }
          }
        },
        {
          provide: RecordFormatUtility,
          useValue: {
            // `pro-recordFormatUtility` for more possible mocks
          }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('constructor', () => {
    it('should compile the component', () => {
      // DELETE THIS TEST ONCE IT COMPILES
      createComponent();
      expect(component).toBeDefined();
      expect(fixture).toBeDefined();
    });

    it('should initialize the options', () => {
      createComponent();

      expect(component.options).toBeDefined();
    });
  });

  describe('options', () => {
    it('should have a usage type', () => {
      createComponent();

      expect(component.options.usageTypeId).toBe(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>);
    });

    it('should have fieldDefs', () => {
      createComponent();

    });

    it('should have createViewField', () => {
      createComponent();
    });
  });
});
