import {
    IVersionedRecord
} from '@nwps/common';
import {
    IFormattedValue
} from '@nwps/records';
import {
    I<%= moduleNameNoDash %>GeneralDetail
} from './<%= moduleName %>-general-detail.interface';

export interface I<%= moduleNameNoDash %>Detail extends IVersionedRecord {
  id: number;
  agency: IFormattedValue;
  general: I<%= moduleNameNoDash %>GeneralDetail;
}
