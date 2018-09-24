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
    ISearchResponse,
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
    FormInteropService,
    IBreadcrumb
} from '@nwps/core';
import {
    DisplayField
} from '@nwps/records';
import {
  I<%= moduleNameNoDash %>SearchResultGridView
} from '../contracts/<%= moduleName %>-search-result-grid-view.interface';
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
  const searchResultGridViews: ISearchResponse<I<%= moduleNameNoDash %>SearchResultGridView> = {
    totalResults: '2',
    facets: null,
    results: [
      // put your results here.
    ]
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
            getCurrentBreadcrumb: jasmine.createSpy('getCurrentBreadcrumb'),
            updateCurrentBreadcrumb: jasmine.createSpy('updateCurrentBreadcrumb')
          }
        },
        {
          provide: ErrorService,
          useValue: {
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
            delete<%= moduleNameNoDash %>: jasmine.createSpy('delete<%= moduleNameNoDash %>').and.returnValue(of({})),
            get<%= moduleNameNoDash %> SearchResultGridViews: jasmine.createSpy('get<%= moduleNameNoDash %>SearchResultGridViews').and.returnValue(of(searchResultGridViews))
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
            hasAgencyPermission: jasmine.createSpy('hasAgencyPermission').and.returnValue(true)
          }
        },
        {
          provide: UserService,
          useValue: {
            getUser: jasmine.createSpy('getUser').and.returnValue({
              id: 123,
              agencyId: 234
            })
          }
        },
        {
          provide: 'message-box-service',
          useValue: {
            confirmWithReasons: jasmine.createSpy('confirmWithReasons').and.returnValue(Promise.resolve({ reason: 'deleted' }))
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
      const <%= moduleNameCamel %> SearchOptions = factory.create({});
      expect(<%= moduleNameCamel %> SearchOptions).toBeDefined();
    });
  });

  describe('actionMenu', () => {
    let <%= moduleNameCamel %>SearchOptions: <%= moduleNameNoDash %>SearchOptions = null;
    let actionMenu: any = null;
    const mockGridView: I<%= moduleNameNoDash %>SearchResultGridView = {
          agency: { value: 'agency', id: 234 },
        };

        beforeEach(() => {
          const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
          <%= moduleNameCamel %>SearchOptions = factory.create({});
          actionMenu = <%= moduleNameCamel %>SearchOptions.ctrlOptions.gridOptions.columnDefs[0].actionMenu.items;
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

          describe('beforeNavigation', () => {
            it('should have the correct breadcrumb value', () => {
              const openOption = actionMenu[0];
              const rowEntity = {
                row: {
                  entity: mockGridView
                }
              };
              const breadcrumbService: BreadcrumbService = TestBed.get(BreadcrumbService);
              let breadcrumbListItems: IBreadcrumb = null;
              <%= moduleNameCamel %> SearchOptions.ctrlOptions.gridOptions.dataFn({});
              breadcrumbService.updateCurrentBreadcrumb = jasmine.createSpy('updateCurrentBreadcrumb').and.callFake(items => {
                return breadcrumbListItems = items;
              });
              expect(openOption.beforeNavigation(rowEntity));
              expect(breadcrumbListItems.listItems.length).not.toBe(0);
            });
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
    let <%= moduleNameCamel %>SearchOptions: <%= moduleNameNoDash %>SearchOptions = null;

    beforeEach(() => {
      const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
      <%= moduleNameCamel %>SearchOptions = factory.create({});
    });

    it('should call the pageDetailService', async(() => {
      const pageDetailService: PageDetailService = TestBed.get(PageDetailService);
      <%= moduleNameCamel %>SearchOptions.getPageDetail().subscribe();
      expect(pageDetailService.getPageDetail).toHaveBeenCalledWith(123, PageType.<%= moduleNameNoDash %>Search);
    }));
  });

  describe('createField', () => {
    let <%= moduleNameCamel %>SearchOptions: <%= moduleNameNoDash %>SearchOptions = null;

    beforeEach(() => {
      const factory: <%= moduleNameNoDash %>SearchOptionsFactory = TestBed.get(<%= moduleNameNoDash %>SearchOptionsFactory);
      <%= moduleNameCamel %>SearchOptions = factory.create({});
    });
    it('should create the <%= moduleNameNoDash %>SearchAgency field with options', () => {
      const field = <%= moduleNameCamel %> SearchOptions.createField('', <IPageField>{ id: DisplayField.<%= moduleNameNoDash %>SearchAgency });
      expect(field).toBeDefined();
      expect(field.controller.options.isMultiSelect).toBeTruthy();
      expect(field.controller.options.filterByPermissions).toBeDefined();
      expect(field.controller.options.filterByPermissions.componentType).toBe(SecurityComponent.<%= moduleNameNoDash %>Search);
      expect(field.controller.options.filterByPermissions.permissionType).toBe(PermissionType.Execute);
    });
  });
});
