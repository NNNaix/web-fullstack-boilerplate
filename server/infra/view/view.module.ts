import { Module } from '@nestjs/common';
import { ViewController } from '@server/infra/view/view.controller';

@Module({
    controllers: [ViewController],
})
export class ViewModule {}
