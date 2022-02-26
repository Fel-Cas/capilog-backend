/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { CHECK_ABILITY } from 'src/config/constants';
import { RequiredRule } from '../interfaces';

export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);
