import {
	async,
	inject,
	TestBed
} from '@angular/core/testing';

import {
    of
} from 'rxjs/observable/of';

import {
	HttpService,
	PageType,
	ISaveRequest
} from '@nwps/common';

import { I<%= moduleNameNoDash %> } from './contracts/<%= moduleName %>.interface';
import { I<%= moduleNameNoDash %>General } from './contracts/<%= moduleName %>-general.interface';
import { <%= moduleNameNoDash %>Agent } from './<%= moduleName %>.agent';

describe('<%= moduleNameNoDash %>: <%= moduleNameNoDash %>Agent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				<%= moduleNameNoDash %>Agent,
				{
					provide: HttpService,
					useValue: {
						delete: jasmine.createSpy('delete').and.returnValue(of(true)),
						get: jasmine.createSpy('get').and.returnValue(of(true)),
						post: jasmine.createSpy('post').and.returnValue(of(true))
					}
				}
			]
		});
	});

	describe('getPageDetailView', () => {
		it('should request the page detail from the correct endpoint', async(() => {
			const <%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			const httpService: HttpService = TestBed.get(HttpService);
			<%= moduleNameCamel %>Agent.getPageDetailView(1).subscribe(response => {
				expect(response).toEqual(true);
			});
			expect(httpService.get).toHaveBeenCalledWith('internal/<%= moduleNameNoDash %>Pages/:pageId/<%= moduleNameNoDash %>Details/:requestId', { requestId: 1, pageId: PageType.<%= moduleNameNoDash %>Detail });
		}));
	});

	describe('getGeneral', () => {
		it('should request the general from the correct endpoint', async(() => {
			const <%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			const httpService: HttpService = TestBed.get(HttpService);
			<%= moduleNameCamel %>Agent.getGeneral(1).subscribe(response => {
				expect(response).toEqual(true);
			});
			expect(httpService.get).toHaveBeenCalledWith('internal/<%= moduleNameNoDash %>s/:requestId/General', { requestId: 1 });
		}));
	});

	describe('save<%= moduleNameNoDash %>', () => {
		it('should save the request with the correct endpoint', async(() => {
			const <%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			const httpService: HttpService = TestBed.get(HttpService);
			const saveRequest: ISaveRequest<I<%= moduleNameNoDash %>> = {
				validationMode: 1,
				source: {
					agencyId: 123,
					number: '123',
					general: null
				}
			};
			<%= moduleNameCamel %>Agent.save<%= moduleNameNoDash %>(saveRequest, '123').subscribe(response => {
				expect(response).toEqual(true);
			});
			expect(httpService.post).toHaveBeenCalledWith('internal/<%= moduleNameNoDash %>s', saveRequest, { recordLockId: '123' });
		}));
	});

	describe('delete<%= moduleNameNoDash %>', () => {
    it('should delete a <%= moduleNameNormalCap %> from the correct endpoint', async(() => {
			const <%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			const httpService: HttpService = TestBed.get(HttpService);
			<%= moduleNameCamel %>Agent.delete<%= moduleNameNoDash %>(1, 'delete', '1').subscribe(response => {
				expect(response).toEqual(true);
			});
			expect(httpService.delete).toHaveBeenCalledWith(
				'internal/<%= moduleNameNoDash %>s/:<%= moduleNameCamel %>Id',
				{ <%= moduleNameCamel %>Id: 1, activityConfirmation: 'delete', recordLockId: '1' }
			);
		}));
	});
});
