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
  ApplicationService,
  NwCommonMocksModule,
  PageResponseDetailService,
  UsageType
} from '@nwps/common';

import {
  <%= moduleNameNoDash %>AddComponent
} from './<%= moduleName %>-add.component';

@Component({ selector: '<%= moduleName %>-header', template: '' })
export class Mock<%= moduleNameNoDash %>HeaderComponent { }

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %>AddComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %>AddComponent>;
  let component: <%= moduleNameNoDash %>AddComponent;

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %>AddComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule
      ],
      declarations: [
        Mock<%= moduleNameNoDash %>HeaderComponent,
        <%= moduleNameNoDash %>AddComponent
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

      expect(applicationService.setTitle).toHaveBeenCalledWith('Add <%= moduleNameNormalCap %>');
    });

    it('should set the addOptions', () => {
      createComponent();

      expect(component.addOptions.usageTypeId).toBe(UsageType.<%= moduleNameNoDash %>);
      expect(component.addOptions.componentsBySection).toBeDefined();
    });
  });
});
