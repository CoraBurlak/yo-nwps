import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    MockSearchComponent,
    NwCommonMocksModule,
    UserPermissionService
} from '@nwps/common';

import {
    <%= moduleNameCamel %>ChildRoutePaths
} from '../<%= moduleName %>.child.routing';
import {
    <%= moduleNameNoDash %>SearchComponent
} from './<%= moduleName %>-search.component';

describe('<%= moduleNameNormalCap %>: <%= moduleNameNoDash %>SearchComponent ', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %>SearchComponent>;
	let component: <%= moduleNameNoDash %>SearchComponent;

	function createComponent(): void {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %>SearchComponent);
		component = fixture.componentInstance;
		component.searchComponent = new MockSearchComponent();
		fixture.detectChanges();
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCommonMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %>SearchComponent
			],
			providers: [
				{
					provide: UserPermissionService,
					useValue: {
						hasAnyPermission: jasmine.createSpy('hasAnyPermission').and.returnValue(true)
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
	}));

	afterEach(() => {
		fixture.destroy();
	});

	describe('Initialize', () => {
		it('should initialize the component', () => {
			createComponent();
			expect(fixture).toBeDefined();
		});
	});

	describe('searchComponentOptions', () => {
		it('should be defined', () => {
			createComponent();
			expect(component.searchComponentOptions).toBeDefined();
		});
		it('should have the correct add route', () => {
			createComponent();
			expect(component.searchComponentOptions.addRoute).toBeDefined();
			expect(component.searchComponentOptions.addRoute).toBe(<%= moduleNameCamel %>ChildRoutePaths.<%= moduleNameNoDash %>Add);
		});
		it('should have a defined errorContainerConfig', () => {
			createComponent();
			const errorContainerConfig = component.searchComponentOptions.errorContainerConfig;
			expect(errorContainerConfig).toBeDefined();
			expect(errorContainerConfig.component).toBe('<%= moduleNameCamel %>RequestSearch');
		});
		it('should return the correct value for showAdd', () => {
			createComponent();
			expect(component.searchComponentOptions.showAdd).toBeTruthy();
		});
		it('should have the searchInfo defined', () => {
			createComponent();
			expect(component.searchComponentOptions.searchInfo).toBeDefined();
		});
	});
});
