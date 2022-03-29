/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AbilityFactory } from './abilities';

@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilityModule {}
