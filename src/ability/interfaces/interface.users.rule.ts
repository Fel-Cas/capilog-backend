/* eslint-disable prettier/prettier */
import { Subjects } from '../subjects';
import { Action } from 'src/ability/enums/actions.enums';

export interface Rules {
    action: Action;
    subject: Subjects;
}
