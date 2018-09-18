import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    of
} from 'rxjs/observable/of';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import {
    IPageField,
    MockOneToOneEntryViewModel,
    ModuleDataTranslatorService,
    ModuleDataViewService,
    NwCommonMocksModule,
    OneToOneEntryFactory,
    PageResponseDetailService,
    UsageType
} from '@nwps/common';
import {
    FormInteropService
} from '@nwps/core';

import {
    I<%= moduleNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../../<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent
} from './<%= moduleName %>-<%= sectionName %>-edit.component';

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent>;
	let component: <%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent;

	const viewMock: I<%= moduleNameNoDash %>Detail = {
		id: 579,
		agency: { id: 1, value: 'test agency ' },
		<%= sectionNameCamel %>: null
	};

	function createComponent(): void {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCommonMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %><%= sectionNameNoDash %>EditComponent
			],
			providers: [
				{
					provide: <%= moduleNameNoDash %>Agent,
					useValue: {
						get<%= sectionNameNoDash %>Detail: jasmine.createSpy('get<%= sectionNameNoDash %>Detail').and.returnValue(of({})),
            save<%= moduleNameNoDash %>: jasmine.createSpy('save<%= moduleNameNoDash %>').and.returnValue(of({})),
            save<%= sectionNameNoDash %>: jasmine.createSpy('save<%= sectionNameNoDash %>').and.returnValue(of({}))
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
					provide: ModuleDataTranslatorService,
					useValue: {
						translate: jasmine.createSpy('translate').and.returnValue([])
					}
				},
				{
					provide: ModuleDataViewService,
					useValue: {
						refresh: jasmine.createSpy('refresh'),
						update: jasmine.createSpy('update'),
						snapshot: { data: jasmine.createSpy('data').and.callFake(() => viewMock) }
					}
				},
				{
					provide: OneToOneEntryFactory,
					useValue: {
						create: jasmine.createSpy('create').and.callFake(options => new MockOneToOneEntryViewModel(options))
					}
        },
        {
					provide: PageResponseDetailService,
					useValue: {
						header: new BehaviorSubject({})
					}
				}
				// put your mocked controllers down here.
			]
		});
	}));

	afterEach(() => {
		fixture.destroy();
	});

	describe('constructor', () => {
		it('should set up the component', () => {
			createComponent();
			expect(component).toBeDefined();
		});
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
			it('should call the correct method on the <%= moduleNameCamel %>Agent', async(() => {
        createComponent();

			}));
    });

		describe('getSaveRequest', () => {
			it('should get the proper saveRequest', () => {
        createComponent();

			});
    });

		describe('saveEntry', () => {
			it('should save the request', async(() => {
        createComponent();

			}));
		});
	});
});
