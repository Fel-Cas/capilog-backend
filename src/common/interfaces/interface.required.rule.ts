/* eslint-disable prettier/prettier */
import { Subjects } from 'src/ability/ability.factory';
import { Action } from 'src/ability/enums/actions.enums';

export interface RequiredRule {
    action: Action;
    subject: Subjects;
}
