import {
    SectionType
} from '@nwps/common';
import {
    <%= moduleNameNoDash %>GeneralComponent
} from './entry/general/<%= moduleName %>-general.component';

export const <%= moduleNameCapsUnder %>_COMPONENTS_BY_SECTION = {
	[SectionType.<%= moduleNameNoDash %>General]: <%= moduleNameNoDash %>GeneralComponent,
};
