import {
    IRecord,
  	IVersionedRecord
} from '@nwps/common';

export interface I<%= moduleNameNoDash %>Base extends IRecord<number>, IVersionedRecord {
	agencyId: number;
	number: string;
}
