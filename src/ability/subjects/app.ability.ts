/* eslint-disable prettier/prettier */
import { Ability } from '@casl/ability';
import { Action } from '../enums/actions.enums';
import { Subjects } from './subjtecs.ability';

export type AppAbility = Ability<[Action, Subjects]>;
