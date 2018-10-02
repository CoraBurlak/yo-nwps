import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    of
} from 'rxjs/observable/of';

import {
    IFieldDefinition,
    IPageField,
    MockGridEntryViewModel,
    ModuleDataViewService,
    NwCommonMocksModule,
    SecurityComponent,
    UsageType
} from '@nwps/common';
import {
    FormInteropService
} from '@nwps/core';
import {
    DeletedRecordAgent,
    DisplayField,
    IRecordsGridEntryOptions,
    RecordFormatUtility,
    RecordsGridEntryFactory
} from '@nwps/records';

import {
    I<%= moduleNameNoDash %>Detail
} from '../../../contracts/<%= moduleName %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail
} from '../../../contracts/<%= moduleName %>-<%= sectionNameSingular %>-detail.interface';
import {
    I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>
} from '../../../contracts/<%= moduleName %>-<%= sectionNameSingular %>.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../../shared/<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent
} from './<%= moduleName %>-<%= sectionNameSingular %>s-entry.component';

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent>;
	let component: <%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent;
	let gridEntryOptions: IRecordsGridEntryOptions<I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail, I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>> = null;
	const <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail = {
		id: 123,
		number: '123',
		agency: { id: 777, value: 'Agency 777' }
	};
	let gridView: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail = null;
	function createComponent() {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCommonMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>sEntryComponent
			],
			providers: [
				{
					provide: DeletedRecordAgent,
					useValue: {
						restoreMany: jasmine.createSpy('restoreMany').and.returnValue(of({}))
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
					provide: <%= moduleNameNoDash %>Agent,
					useValue: {
						get<%= sectionNameNoDashSingular %>Details: jasmine.createSpy('get<%= sectionNameNoDashSingular %>Details').and.returnValue(of({})),
						get<%= sectionNameNoDashSingular %>Detail: jasmine.createSpy('get<%= sectionNameNoDashSingular %>Detail').and.returnValue(of({})),
						save<%= sectionNameNoDashSingular %>: jasmine.createSpy('save<%= sectionNameNoDashSingular %>').and.returnValue(of({})),
						delete<%= sectionNameNoDashSingular %>: jasmine.createSpy('delete<%= sectionNameNoDashSingular %>').and.returnValue(of({}))
					}
				},
				{
					provide: ModuleDataViewService,
					useValue: {
						refresh: jasmine.createSpy('refresh'),
						update: jasmine.createSpy('update'),
						snapshot: { data: jasmine.createSpy('data').and.callFake(() => <%= moduleNameCamel %>Detail) }
					}
				},
				{
					provide: RecordFormatUtility,
					useValue: {
						formatDateTime: jasmine.createSpy('formatDateTime'),
						formatFormattedValue: jasmine.createSpy('formatFormattedValue')
					}
				},
				{
					provide: RecordsGridEntryFactory,
					useValue: {
						create: jasmine.createSpy('create').and.callFake((options) => {
							gridEntryOptions = options;

							return new MockGridEntryViewModel(options);
						})
					}
				},
			]
		}).compileComponents();
	});

	afterEach(() => {
		fixture.destroy();
		component = null;
		gridEntryOptions = null;

	});

	describe('constructor', () => {
		it('should compile the component', () => {
      // DELETE THIS TEST ONCE IT COMPILES
			createComponent();
			expect(component).toBeDefined();
			expect(fixture).toBeDefined();
		});
	});

	describe('gridEntryOptions', () => {
		it('should have the proper agencyId', () => {
			createComponent();
			expect(gridEntryOptions.agencyId).toBe(<%= moduleNameCamel %>Detail.agency.id);
		});

		it('should call the delete on the <%= moduleNameNoDash %>Agent', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			gridView = {
				id: 123,
				<%= moduleNameCamel %>Id: 123,
				<%= sectionNameCamelSingular %>: null,
				reportedDateTime: '12/12/2013',
				role: null,
				comment: 'main spot'
			};
			createComponent();
			gridEntryOptions.deleteEntry(123, gridView, null, null).subscribe();
			expect(agent.delete<%= sectionNameNoDashSingular %>).toHaveBeenCalledWith(123, 123, null, null);
		}));

    it('should call the getEntryForEdit and call get<%= sectionNameNoDashSingular %> on the <%= moduleNameNoDash %>Agent', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			gridView = {
        id: 234
			};
			createComponent();
			gridEntryOptions.getEntryForEdit(gridView).subscribe();
			expect(agent.get<%= sectionNameNoDashSingular %>).toHaveBeenCalledWith(123, 234);
		}));

		describe('createField', () => {

		});

    describe('gridParams', () => {
      // STUB this is a stubbed piece of code, update the count
      it('should have the correct count for columnDefs', () => {
				createComponent();
				expect(gridEntryOptions.gridParams).toBeDefined();
				const columnDefs = gridEntryOptions.gridParams.gridOptions.columnDefs;
				expect(columnDefs.length).toBe(-1); // make this your count
			});

      // This is for sanity, make sure you are unique, you shouldn't need to repeat column anywayss
      it('should have uniqueness with no columns repeated', () => {
				createComponent();
				const columnDefs: any[] = gridEntryOptions.gridParams.gridOptions.columnDefs;
				const getDuplicate = (values) => values.sort().reduce((d, v, i, a) => i && v === a[i - 1] ? d.concat(v) : d, []);
				expect(getDuplicate(columnDefs.map(x => x.field)).length).toBe(0);
				expect(getDuplicate(columnDefs.map(x => x.displayName)).length).toBe(0);
			});
    });

		it('should get the gridViews for the grid', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			createComponent();
			gridEntryOptions.getGridViews().subscribe();
			expect(agent.get<%= sectionNameNoDashSingular %>Details).toHaveBeenCalledWith(<%= moduleNameCamel %>Detail.id);
		}));

		it('should initialize the save request', () => {
			createComponent();
			const saveRequest: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %> = <I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>>{};
      const detail: I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail = <I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail>{id: 12};

      gridEntryOptions.initializeSaveRequest(saveRequest, 489, detail);
      expect(saveRequest.<%= moduleNameCamel %>Id).toBe(<%= moduleNameCamel %>Detail.id);
			expect(saveRequest.id).toBe(detail.id);
		});

		it('should have gridParams defined', () => {
			createComponent();
			expect(gridEntryOptions.gridParams).toBeDefined();
		});

		it('should have reloadOnDelete be truthy', () => {
			createComponent();
			expect(gridEntryOptions.reloadOnDelete).toBeTruthy();
		});

		it('should have the correct record Id', () => {
			createComponent();
			expect(gridEntryOptions.recordId).toBe(<%= moduleNameCamel %>Detail.id);
		});

		it('should restore the entries from the deleteRecordAgent', async(() => {
			const agent: DeletedRecordAgent = TestBed.get(DeletedRecordAgent);
			createComponent();
			gridEntryOptions.restoreEntries([1]).subscribe();
			expect(agent.restoreMany).toHaveBeenCalledWith(UsageType.<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>, [1]);
		}));

		it('should call save<%= sectionNameNoDashSingular %> on the <%= moduleNameNoDash %>Agent', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			createComponent();
			gridEntryOptions.saveEntry(null, '123').subscribe();
			expect(agent.save<%= sectionNameNoDashSingular %>).toHaveBeenCalledWith(null, '123');
		}));

		it('should have the correct SecurityComponent', () => {
			createComponent();
			expect(gridEntryOptions.securityComponent).toBe(SecurityComponent.<%= moduleNameNoDash %>);
		});

		describe('fieldDefs', () => {

		});
	});
});
