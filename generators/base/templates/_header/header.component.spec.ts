import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Observable
} from 'rxjs/Observable';
import {
  of
} from 'rxjs/observable/of';

import {
  PageResponseDetailService,
  ModuleAction,
} from '@nwps/common';
import {
  NwCoreMocksModule
} from '@nwps/core';
import {
  NwRecordsMocksModule
} from '@nwps/records';

import {
  I<%= moduleNameNoDash %>Detail
} from '../contracts/<%= moduleName %>-detail.interface';
import {
  I<%= moduleNameNoDash %>Header
} from '../contracts/<%= moduleName %>-header.interface';
import {
  <%= moduleNameNoDash %>HeaderComponent
} from './<%= moduleName %>-header.component';

@Pipe({ name: 'dateTime' })
export class MockDateTimePipe implements PipeTransform {
  public transform() { }
}
@Pipe({ name: 'formattedValue' })
export class MockFormattedValuePipe implements PipeTransform {
  public transform() { }
}

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %>HeaderComponent', () => {
  let fixture: ComponentFixture<<%= moduleNameNoDash %>HeaderComponent>;
  let component: <%= moduleNameNoDash %>HeaderComponent;
  let <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail;
  let <%= moduleNameCamel %>Header: I<%= moduleNameNoDash %>Header;

  function createComponent() {
    fixture = TestBed.createComponent(<%= moduleNameNoDash %>HeaderComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    <%= moduleNameCamel %>Detail = {
      agency: { id: 123, value: 'agency' },
      general: {
        // STUB this is another guess, fill it in!
      },
      id: 1,
      number: '1234'
    };

    <%= moduleNameCamel %>Header = {
        // STUB this is another guess, fill it in!
    };

    TestBed.configureTestingModule({
      imports: [
        NwCoreMocksModule,
        NwRecordsMocksModule
      ],
      declarations: [
        MockDateTimePipe,
        MockFormattedValuePipe,
        <%= moduleNameNoDash %>HeaderComponent
      ],
      providers: [
        {
          provide: PageResponseDetailService,
          useValue: {
            header: of(<%= moduleNameCamel %>Header),
            snapshot: {
              routeData: {
                moduleAction: ModuleAction.Add
              }
            }
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

    it('should set the header', () => {
      createComponent();

      expect(component.header).toBe(<%= moduleNameCamel %>Header);
    });
  });
});
