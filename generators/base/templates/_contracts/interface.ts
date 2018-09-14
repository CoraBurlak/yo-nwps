import {
  I<%= moduleNameNoDash %>Base
} from './<%= moduleName %>-base.interface';
import {
  I<%= moduleNameNoDash %>General
} from './<%= moduleName %>-general.interface';

export interface I<%= moduleNameNoDash %> extends I<%= moduleNameNoDash %>Base {
    general?: I<%= moduleNameNoDash %>General;
}
