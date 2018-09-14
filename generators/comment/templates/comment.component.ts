import {
    Component
} from '@angular/core';
import {
    CommentFactory,
    ICommentViewModel,
    ModuleDataViewService,
    SecurityComponent,
    UsageType,
    UsageTypeProperties
} from '@nwps/common';

import {
    DisplayField,
    IRecordsFormPassThroughOptions
} from '@nwps/records';
import {
    I<%= moduleNameNoDash %>Detail
} from '../../contracts/<%= moduleName %>-detail.interface';
import {
    <%= moduleNameNoDash %>Agent
} from '../../<%= moduleName %>.agent';

@Component({
	selector: '<%= moduleName %>-comment',
	template: `
    <rms-form-pass-through [options]="formPassThroughOptions | rmsFormPassThroughOptions"
                         #formPT>
    	<nw-comment [vm]="commentVm"
    	            [isEditMode]="formPT.isEditMode()"
    	            (done)="formPT.endEdit()"
    	            [recordLockId]="formPT.recordLockId">
    	</nw-comment>
    </rms-form-pass-through>
  `
})
export class <%= moduleNameNoDash %>CommentComponent {
	public commentVm: ICommentViewModel;
	public formPassThroughOptions: IRecordsFormPassThroughOptions;

	constructor(
		private _commentFactory: CommentFactory,
		private _moduleDataViewService: ModuleDataViewService,
		private _<%= moduleNameCamel %>Agent: <%= moduleNameNoDash %>Agent
	) {
		const <%= moduleName %>Detail = this._moduleDataViewService.snapshot.data<I<%= moduleNameNoDash %>Detail>(UsageType.<%= moduleNameNoDash %>);
		this.formPassThroughOptions = {
			recordId: <%= moduleName %>Detail.id,
			agencyId: <%= moduleName %>Detail.agency.id,
			moduleUsageTypeId: UsageType.<%= moduleNameNoDash %>,
			subModuleUsageTypeId: UsageType.<%= moduleNameNoDash %>Comment,
			moduleSecurityComponent: SecurityComponent.<%= moduleNameNoDash %>
		};
		this.commentVm = this._commentFactory.create({
			usageType: UsageTypeProperties[UsageType.<%= moduleNameNoDash %>Comment],
			parentRecordId: <%= moduleName %>Detail.id,
			parentUsageTypeId: UsageType.<%= moduleNameNoDash %>,
			saveEntry: (request, recordLockId) => this._<%= moduleNameCamel %>Agent.saveComment(request, recordLockId),
			deleteEntry: (<%= moduleName %>Id, commentId, recordLockId) => this._<%= moduleNameCamel %>Agent.deleteComment(<%= moduleName %>Id, commentId, recordLockId),
			displayField: DisplayField.<%= moduleNameNoDash %>CommentComments
		});
	}
}
