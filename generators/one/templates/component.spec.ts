import {
  Component,
  Input,
  Output,
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ModuleDataViewService,
  NwCommonMocksModule,
  SecurityComponent,
  UsageType
} from '@nwps/common';


import {
  I<%= moduleNameNoDash %> Detail
} from '../../contracts/<%= moduleName %>-detail.interface';

import {
  <%= moduleNameNoDash %><%= sectionNameNoDash %>Component
} from './<%= moduleName %>-<%= sectionName %>.component';

@Component({
  selector: '<%= moduleName %>-<%= sectionName %>-view',
  template: ''
})
export class Mock<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent {
  constructor() { }
}

@Component({
  selector: '<%= moduleName %>-<%= sectionName %>-edit',
  template: ''
})
export class Mock<%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent {
  @Input() recordLockId;
  @Output() done;
}

@Pipe({ name: 'rmsFormPassThroughOptions' })
export class MockRmsFormPassThroughOptionsPipe implements PipeTransform {
  public transform() { }
}

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %><%= sectionNameNoDash %>Component', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDash %>Component>;
  let component: <%= moduleNameNoDash %><%= sectionNameNoDash %>Component;

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDash %>Component);
    component = fixture.componentInstance;
    // set any necessary values if you need
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NwCommonMocksModule
      ],
      declarations: [
        <%= moduleNameNoDash %><%= sectionNameNoDash %>Component,
        MockRmsFormPassThroughOptionsPipe,
        Mock<%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent,
        Mock<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent
      ],
      providers: [
        {
          provide: ModuleDataViewService,
          useValue: {
            snapshot: {
              data: jasmine.createSpy('data').and.callFake(() => <I<%= moduleNameNoDash %>Detail>{
                id: 1,
                agency: { id: 2, value: 'agency' }
              })
            }
          }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    if(!fixture) return;
    fixture.destroy();
  });

  describe('formPassThroughOptions', () => {
    it('should have the correct form pass through options', () => {
      createComponent();
      expect(component.formPassThroughOptions).toBeDefined();
      expect(component.formPassThroughOptions.recordId).toBe(1);
      expect(component.formPassThroughOptions.agencyId).toBe(2);
      expect(component.formPassThroughOptions.moduleUsageTypeId).toBe(UsageType.<%= moduleNameNoDash %>);
      expect(component.formPassThroughOptions.subModuleUsageTypeId).toBe(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>);
      expect(component.formPassThroughOptions.moduleSecurityComponent).toBe(SecurityComponent.<%= moduleNameNoDash %>);
    });
  });
});
