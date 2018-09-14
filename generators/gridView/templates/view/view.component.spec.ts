import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    NwCoreMocksModule,
} from '@nwps/core';

import {
    <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent
} from './<%= moduleName %>-<%= sectionName %>-view.component';

describe('<%= moduleNameCaps %>: <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent>;
	let component: <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent;
	function createComponent() {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCoreMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponent,
			],
			providers: [
				{
					provide: 'ui-grid-controller',
					useValue: (options) => {
						return {
							options,
							setDataSource: jasmine.createSpy('setDataSource')
						};
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
	});

	describe('UiGridController', () => {
		it('should have the grid controller defined', () => {
			createComponent();
			expect(component.<%= moduleNameCamel %><%= sectionNameNoDashSingular %>GridController).toBeDefined();
		});

		it('should have the correct number of columnDefs', () => {
			createComponent();
			const columnDefs: any[] = component.<%= moduleNameCamel %><%= sectionNameNoDashSingular %>GridController.options.gridOptions.columnDefs;
			expect(columnDefs.length).toBe(8);
		});

		it('should have uniqueness with no columns repeated', () => {
			createComponent();
			const columnDefs: any[] = component.<%= moduleNameCamel %><%= sectionNameNoDashSingular %>GridController.options.gridOptions.columnDefs;
			const getDuplicate = (values) => values.sort().reduce((d, v, i, a) => i && v === a[i - 1] ? d.concat(v) : d, []);
			expect(getDuplicate(columnDefs.map(x => x.field)).length).toBe(0);
			expect(getDuplicate(columnDefs.map(x => x.displayName)).length).toBe(0);
		});
	});
});
