/* eslint-disable prettier/prettier */
import { Subjects } from 'src/ability/abilities/ability.factory';
import { Action } from 'src/ability/enums/actions.enums';

export interface RequiredRule {
    action: Action;
    subject: Subjects;
}
