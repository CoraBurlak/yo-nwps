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
  <%= moduleNameNoDash %>GeneralViewComponent
} from './<%= moduleName %>-general-view.component';

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %>GeneralViewComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %>GeneralViewComponent>;
  let component: <%= moduleNameNoDash %>GeneralViewComponent;

  const <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail = {
    agency: { id: 123, value: 'agency' },
    general: {
      // STUB best guess
    },
    id: 1,
    number: '1234'
  };

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %>GeneralViewComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule
      ],
      declarations: [
        <%= moduleNameNoDash %>GeneralViewComponent
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

      expect(component.options.usageTypeId).toBe(UsageType.<%= moduleNameNoDash %>General);
    });

    it('should have fieldDefs', () => {
      createComponent();

      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralTransactionDate](<%= moduleNameCamel %>Detail.general)).toBe('1/1/2015 11:00 AM');
      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralTransactionTime](<%= moduleNameCamel %>Detail.general)).toBe(null);
      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralTransactionType](<%= moduleNameCamel %>Detail.general)).toBe('Type');
      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralTicketNumber](<%= moduleNameCamel %>Detail.general)).toBe('12345');
      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralPawnbroker](<%= moduleNameCamel %>Detail.general)).toBe(25);
      expect(component.options.fieldDefs[DisplayField.<%= moduleNameNoDash %>GeneralPawnerBuyer](<%= moduleNameCamel %>Detail.general)).toBe(50);
    });

    it('should have createViewField', () => {
      const globalSubjectViewerFactory: GlobalSubjectViewerFactory = TestBed.get(GlobalSubjectViewerFactory);
      createComponent();

      component.options.createViewField(<IPageField>{
        id: DisplayField.<%= moduleNameNoDash %>GeneralPawnbroker,
        systemName: '<%= moduleNameCamel %>GeneralPawnbroker',
        name: 'Pawnbroker'
      });

      expect(globalSubjectViewerFactory.create).toHaveBeenCalledWith({
        agencyId: 123,
        name: '<%= moduleNameCamel %>GeneralPawnbroker',
        label: 'Pawnbroker',
        isViewOnly: true
      });

      component.options.createViewField(<IPageField>{
        id: DisplayField.<%= moduleNameNoDash %>GeneralPawnerBuyer,
        systemName: '<%= moduleNameCamel %>GeneralPawnerBuyer',
        name: 'Pawner/Buyer'
      });

      expect(globalSubjectViewerFactory.create).toHaveBeenCalledWith({
        agencyId: 123,
        name: '<%= moduleNameCamel %>GeneralPawnerBuyer',
        label: 'Pawner/Buyer',
        isViewOnly: true
      });
    });
  });
});
