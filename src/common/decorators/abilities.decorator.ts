/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { CHECK_ABILITY } from 'src/config/constants';
import { Rules } from '../../ability/interfaces';

export const CheckAbilities = (...requirements: Rules[]) => SetMetadata(CHECK_ABILITY, requirements);
