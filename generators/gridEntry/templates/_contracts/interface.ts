import {
    IRecord,
    IVersionedRecord
} from '@nwps/common';
import {
    IUserDefinedProperties
} from '@nwps/records';

export interface I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %> extends IRecord<number>, IVersionedRecord, IUserDefinedProperties {

}
