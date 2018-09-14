import {
    IRecord,
    IVersionedRecord
} from '@nwps/common';
import {
    IUserDefinedProperties
} from '@nwps/records';

export interface I<%= moduleNameNoDash %><%= sectionNameNoDash %>Detail extends IUserDefinedProperties, IRecord<number>, IVersionedRecord {

}
