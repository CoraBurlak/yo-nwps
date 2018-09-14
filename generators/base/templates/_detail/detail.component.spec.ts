import {
  Component
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute
} from '@angular/router';

import {
  Observable
} from 'rxjs/Observable';
import {
  of
} from 'rxjs/observable/of';

import {
  ApplicationService,
  ModuleDataViewService,
  NwCommonMocksModule,
  PageResponseDetailService,
  SecurityComponent,
  UsageType
} from '@nwps/common';
import {
  NwRecordsMocksModule
} from '@nwps/records';

import {
  I<%= moduleNameNoDash %>Detail
} from '../contracts/<%= moduleName %>-detail.interface';
import {
  <%= moduleNameNoDash %>Agent
} from '../<%= moduleName %>.agent';
import {
  <%= moduleNameNoDash %>DetailComponent
} from './<%= moduleName %>-detail.component';

@Component({ selector: '<%= moduleName %>-header', template: '' })
export class Mock<%= moduleNameNoDash %>HeaderComponent { }

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %>DetailComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %>DetailComponent>;
  let component: <%= moduleNameNoDash %>DetailComponent;

  const <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail = {
    agency: { id: 123, value: 'agency' },
    general: {
      // STUB THIS IS A GUESS
    },
    id: 1,
    number: '1234'
  };

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %>DetailComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule,
        NwRecordsMocksModule
      ],
      declarations: [
        Mock<%= moduleNameNoDash %>HeaderComponent,
        <%= moduleNameNoDash %>DetailComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                pageDetail: {}
              }
            }
          }
        },
        {
          provide: PageResponseDetailService,
          useValue: {
            set: jasmine.createSpy('set'),
            removePageDetail: jasmine.createSpy('removePageDetail')
          }
        },
        {
          provide: ApplicationService,
          useValue: {
            setTitle: jasmine.createSpy('setTitle')
          }
        },
        {
          provide: ModuleDataViewService,
          useValue: {
            data: jasmine.createSpy('data').and.callFake((): Observable<any> => of(<%= moduleNameCamel %>Detail))
          }
        },
        {
          provide: <%= moduleNameNoDash %>Agent,
          useValue: {
            delete<%= moduleNameNoDash %>: jasmine.createSpy('delete<%= moduleNameNoDash %>').and.returnValue(of(null))
          }
        },
        {
          provide: 'modeless-service',
          useValue: {
            register: jasmine.createSpy('register').and.returnValue(() => jasmine.createSpy('unregister'))
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

    it('should set the title', () => {
      const applicationService: ApplicationService = TestBed.get(ApplicationService);
      createComponent();

      expect(applicationService.setTitle).toHaveBeenCalledWith('<%= moduleNameNormalCap %> 1234');
    });

    it('should initialize deleteOptions', () => {
      createComponent();

      expect(component.deleteOptions).toBeDefined();
    });

    it('should initialize detailOptions', () => {
      createComponent();

      expect(component.detailOptions).toBeDefined();
    });
  });

  describe('deleteOptions', () => {
    it('should have the following options', () => {
      createComponent();

      expect(component.deleteOptions.usageTypeId).toBe(UsageType.<%= moduleNameNoDash %>);
      expect(component.deleteOptions.recordId).toBe(1);
      expect(component.deleteOptions.securityComponent).toBe(SecurityComponent.<%= moduleNameNoDash %>);
    });

    it('deleteRecord should call delete', () => {
      const <%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
      createComponent();

      component.deleteOptions.deleteRecord(1, 'reason', '15');

      expect(<%= moduleNameCamel %>Agent.delete<%= moduleNameNoDash %>).toHaveBeenCalledWith(1, 'reason', '15');
    });
  });

  describe('detailOptions', () => {
    it('should have the following options', () => {
      createComponent();

      expect(component.detailOptions.agencyId).toBe(123);
      expect(component.detailOptions.recordId).toBe(1);
      expect(component.detailOptions.recordDescription).toBe('1234');
      expect(component.detailOptions.referenceNumber).toBe('1234');
      expect(component.detailOptions.usageTypeId).toBe(UsageType.<%= moduleNameNoDash %>);
      expect(component.detailOptions.componentsBySection).toBeDefined();
    });
  });
});
