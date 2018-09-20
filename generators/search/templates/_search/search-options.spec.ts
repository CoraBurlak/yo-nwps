import {
    async,
    TestBed
} from '@angular/core/testing';

import {
    of
} from 'rxjs/observable/of';

import {
    ErrorService,
    IPageField,
    PageDetailService,
    PageType,
    PermissionType,
    RecordLockAgent,
    SecurityComponent,
    UserPermissionService,
    UserService
} from '@nwps/common';
import {
    BreadcrumbService,
    FormInteropService
} from '@nwps/core';
import {
    DisplayField
} from '@nwps/records';

import {
    <%= moduleNameNoDash %>Agent
} from '../shared/<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %>SearchOptions
} from './<%= moduleName %>-search-options';
import {
    <%= moduleNameNoDash %>SearchOptionsFactory
} from './<%= moduleName %>-search-options.factory';

describe('<%= moduleNameNormalCap %>: <%= moduleNameNoDash %>SearchOptions', () => {
	const mockConfig = {
		searchFn: jasmine.createSpy('searchFn')
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
			],
			providers: [
				<%= moduleNameNoDash %>SearchOptionsFactory,
				{
					provide: BreadcrumbService,
					useValue: {
						addBreadcrumb: jasmine.createSpy('addBreadcrumb'),
						getCurrentBreadcrumb: jasmine.createSpy('getCurrentBreadcrumb'),
						updateCurrentBreadcrumb: jasmine.createSpy('updateCurrentBreadcrumb')
					}
				},
				{
					provide: ErrorService,
					useValue: {
						displayErrorMessage: jasmine.createSpy('displayErrorMessage'),
						processError: jasmine.createSpy('processError')
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
						delete<%= moduleNameNoDash %>: jasmine.createSpy('delete<%= moduleNameNoDash %>')
					}
				},
				{
					provide: PageDetailService,
					useValue: {
						getPageDetail: jasmine.createSpy('getPageDetail').and.returnValue(of({}))
					}
				},
				{
					provide: RecordLockAgent,
					useValue: {
						acquireLock: jasmine.createSpy('acquireLock').and.returnValue(of({})),
						revokeLocks: jasmine.createSpy('revokeLocks').and.returnValue(of({}))
					}
				},
				{
					provide: UserPermissionService,
					useValue: {
						hasAgencyPermission: jasmine.createSpy('hasAgencyPermission').and.returnValue(true),
						hasAnyPermission: jasmine.createSpy('hasAnyPermission').and.returnValue(true),
						getAllAgenciesWithPermission: jasmine.createSpy('getAllAgenciesWithPermission').and.returnValue([123]),
						hasPermissionsForAnyAgency: jasmine.createSpy('hasPermissionsForAnyAgency').and.returnValue(true)
					}
				},
				{
					provide: UserService,
					useValue: {
						getUser: jasmine.createSpy('getUser').and.returnValue({
							id: 123
						})
					}
				},
				{
					provide: 'message-box-service',
					useValue: {
						confirmWithReasons: jasmine.createSpy('confirmWithReasons')
					}
        },
        {
          provide: 'agency-combobox-controller',
          useValue: (options) => ({
            options
          })
        },
			]
		}).compileComponents();
	});

	describe('constructor', () => {
		it('should compile the options', () => {
      // DELETE THIS TEST ONCE IT COMPILES
			const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
			const options = factory.create(mockConfig);
			expect(options).toBeDefined();
		});
	});

	describe('actionMenu', () => {
		let options: <%= moduleNameNoDash %>SearchOptions = null;
		let actionMenu: any = null;
    const mockGridView: I<%= moduleNameNoDash %>SearchResultGridView = {
    			agency: { value: 'agency', id: 234 },
    		};

    		beforeEach(() => {
    			const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
    			options = factory.create(mockConfig);
    			actionMenu = options.ctrlOptions.gridOptions.columnDefs[0].actionMenu.items;
    		});

    		it('should have the action menu items defined', () => {
    			expect(actionMenu).toBeDefined();
    			expect(actionMenu.length).toBe(3);
    		});

    		describe('open', () => {
    			it('should return the correct displayText for open', () => {
    				const openOption = actionMenu[0];
    				expect(openOption.displayText).toBe('Open');
    			});

    			it('should return the correct isHidden state for open', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const openOption = actionMenu[0];
    				const rowEntity = {
    					row: {
    						entity: mockGridView
    					}
    				};
    				openOption.isHidden(rowEntity);
    				expect(permissionService.hasAgencyPermission).toHaveBeenCalledWith(SecurityComponent.<%= moduleNameNoDash %>, mockGridView.agency.id, PermissionType.View);
    			});

    			it('should return the correct isHidden state for open with no row', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const openOption = actionMenu[0];
    				const rowEntity = {
    					row: null
    				};
    				expect(openOption.isHidden(rowEntity)).toBeTruthy();
    				expect(permissionService.hasAgencyPermission).not.toHaveBeenCalled();
    			});
    		});
    		describe('audit trail', () => {
    			it('should return the correct displayText for audit trail', () => {
    				const auditOption = actionMenu[1];
    				expect(auditOption.displayText).toBe('Audit Trail');
    			});
    			it('should return the correct isHidden state for audit trail', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const auditOption = actionMenu[1];
    				const rowEntity = {
    					row: {
    						entity: mockGridView
    					}
    				};
    				auditOption.isHidden(rowEntity);
    				expect(permissionService.hasAgencyPermission).toHaveBeenCalledWith(SecurityComponent.FieldLevelAuditSearch, mockGridView.agency.id, PermissionType.Execute);
    			});
    			it('should return the correct isHidden state for audit trail with no row', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const auditOption = actionMenu[1];
    				const rowEntity = {
    					row: null
    				};
    				expect(auditOption.isHidden(rowEntity)).toBeTruthy();
    				expect(permissionService.hasAgencyPermission).not.toHaveBeenCalled();
    			});
    		});
    		describe('delete', () => {
    			it('should return the correct displayText for delete and delete should be last', () => {
    				const actionMenuLength = actionMenu.length;
    				const deleteOption = actionMenu[actionMenuLength - 1];
    				expect(deleteOption.displayText).toBe('Delete');
    			});
    			it('should return the correct isHidden state for delete', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const actionMenuLength = actionMenu.length;
    				const deleteOption = actionMenu[actionMenuLength - 1];
    				const rowEntity = {
    					row: {
    						entity: mockGridView
    					}
    				};
    				deleteOption.isHidden(rowEntity);
    				expect(permissionService.hasAgencyPermission).toHaveBeenCalledWith(SecurityComponent.<%= moduleNameNoDash %>, mockGridView.agency.id, PermissionType.Delete);
    			});
    			it('should return the correct isHidden state for delete with no row', () => {
    				const permissionService: UserPermissionService = TestBed.get(UserPermissionService);
    				const actionMenuLength = actionMenu.length;
    				const deleteOption = actionMenu[actionMenuLength - 1];
    				const rowEntity = {
    					row: null
    				};
    				expect(deleteOption.isHidden(rowEntity)).toBeTruthy();
    				expect(permissionService.hasAgencyPermission).not.toHaveBeenCalled();
    			});
    		});
	});

	describe('pageDetail', () => {
		let options: <%= moduleNameNoDash %>SearchOptions = null;

		beforeEach(() => {
			const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
			options = factory.create(mockConfig);
		});

		it('should call the pageDetailService', async(() => {
			const pageDetailService: PageDetailService = TestBed.get(PageDetailService);
			options.getPageDetail().subscribe();
			expect(pageDetailService.getPageDetail).toHaveBeenCalledWith(123, PageType.<%= moduleNameNoDash %>Search);
		}));
	});

	describe('createField', () => {
		let options: <%= moduleNameNoDash %>SearchOptions = null;

		beforeEach(() => {
			const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
			options = factory.create(mockConfig);
		});
		it('should create the <%= moduleNameNoDash %>SearchAgency field with options', () => {
			const field = options.createField('', <IPageField>{ id: DisplayField.<%= moduleNameNoDash %>SearchAgency });
			expect(field).toBeDefined();
			expect(field.controller.options.isMultiSelect).toBeTruthy();
			expect(field.controller.options.filterByPermissions).toBeDefined();
			expect(field.controller.options.filterByPermissions.componentType).toBe(SecurityComponent.<%= moduleNameNoDash %>Search);
			expect(field.controller.options.filterByPermissions.permissionType).toBe(PermissionType.Execute);
		});
	});
});
