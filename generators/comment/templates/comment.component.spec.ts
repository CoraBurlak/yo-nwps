import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import {
    of
} from 'rxjs/observable/of';

import {
    CommentFactory,
    ICommentOptions,
    ModuleDataViewService,
    NwCommonMocksModule,
    SecurityComponent,
    UsageType
} from '@nwps/common';

import {
    I<%= moduleNameNoDash %>Detail
} from '../../contracts/<%= moduleName %>-detail.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../<%= moduleName %>.agent';
import {
    <%= moduleNameNoDash %>CommentComponent
} from './<%= moduleName %>-comment.component';

@Pipe({
	name: 'rmsFormPassThroughOptions'
})
export class FormPassThroughOptionsPipeMock implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		return null;
	}
}

describe('<%= moduleNameCapsSpace %>: <%= moduleNameNoDash %>CommentComponent', () => {
	let fixture: ComponentFixture<<%= moduleNameNoDash %>CommentComponent>;
	let component: <%= moduleNameNoDash %>CommentComponent;
	let commentOptions: ICommentOptions = null;

	const <%= moduleNameCamel %>Detail: I<%= moduleNameNoDash %>Detail = {
		id: 123,
		number: '123',
		agency: { id: 777, value: 'Agency 777' }
	};

	function createComponent() {
		fixture = TestBed.createComponent(<%= moduleNameNoDash %>CommentComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NwCommonMocksModule
			],
			declarations: [
				<%= moduleNameNoDash %>CommentComponent,
				FormPassThroughOptionsPipeMock
			],
			providers: [
				{
					provide: CommentFactory,
					useValue: {
						create: jasmine.createSpy('create').and.callFake((options) => {
							commentOptions = options;
							return {};
						})
					}
				},
				{
					provide: <%= moduleNameNoDash %>Agent,
					useValue: {
						saveComment: jasmine.createSpy('saveComment').and.returnValue(of({})),
						deleteComment: jasmine.createSpy('deleteComment').and.returnValue(of({}))
					}
				},
				{
					provide: ModuleDataViewService,
					useValue: {
						refresh: jasmine.createSpy('refresh'),
						update: jasmine.createSpy('update'),
						snapshot: { data: jasmine.createSpy('data').and.callFake(() => <%= moduleNameCamel %>Detail) }
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

	describe('saveComment', () => {
		it('should call saveComment on the <%= moduleNameNoDash %>Agent', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			createComponent();
			commentOptions.saveEntry(commentOptions, '1').subscribe();
			expect(agent.saveComment).toHaveBeenCalledWith(commentOptions, '1');
		}));
	});

	describe('deleteComment', () => {
		it('should call deleteComment on the <%= moduleNameNoDash %>Agent', async(() => {
			const agent: <%= moduleNameNoDash %>Agent = TestBed.get(<%= moduleNameNoDash %>Agent);
			createComponent();
			commentOptions.deleteEntry(1, 1, '1').subscribe();
			expect(agent.deleteComment).toHaveBeenCalledWith(1, 1, '1');
		}));
	});
});
