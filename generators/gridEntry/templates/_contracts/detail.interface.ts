import {
    IRecord,
    IVersionedRecord
} from '@nwps/common';
import {
    IUserDefinedProperties
} from '@nwps/records';

export interface I<%= moduleNameNoDash %><%= sectionNameNoDashSingular %>Detail extends IUserDefinedProperties, IRecord<number>, IVersionedRecord {

}
