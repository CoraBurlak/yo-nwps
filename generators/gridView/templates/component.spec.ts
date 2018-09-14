import {
    Component,
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    NwCommonMocksModule,
    SecurityComponent,
    UsageType,
} from '@nwps/common';

import {
    <%= moduleNameNoDash %><%= sectionNameNoDash %>
} from './<%= moduleName %>-<%= sectionName %>.component';


@Component({
	selector: '<%= moduleName %>-<%= sectionName %>-view',
	template: ''
})
export class <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponentMock {
	constructor() { }
}

@Pipe({ name: 'rmsListPassThroughOptions' })
export class MockRmsListPassThroughOptionsPipe implements PipeTransform {
	public transform() { }
}

describe('<%= moduleNameCaps %>: <%= moduleNameNoDash %><%= sectionNameNoDash %>Component', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDash %>Component>;
	let component: <%= moduleNameNoDash %><%= sectionNameNoDash %>Component;

	function createComponent() {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDash %>Component);
		fixture.detectChanges();
		component = fixture.componentInstance;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCommonMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %><%= sectionNameNoDash %>Component,
        <%= moduleNameNoDash %><%= sectionNameNoDash %>ViewComponentMock
			],
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

		it('should have the correct options for the list passThrough', () => {
			createComponent();
			expect(component.listPassThroughOptions).toBeDefined();
			expect(component.listPassThroughOptions.isReadOnly).toBeTruthy();
			expect(component.listPassThroughOptions.moduleUsageTypeId).toBe(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>);
			expect(component.listPassThroughOptions.subModuleUsageTypeId).toBe(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDash %>);
			expect(component.listPassThroughOptions.moduleSecurityComponent).toBe(SecurityComponent.<%= moduleNameNoDash %><%= sectionNameNoDash %>);
		});
	});
});
