import { Controller, Get, Post } from '@nestjs/common';
import { RelationsService } from './relations.service';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationService: RelationsService) {}
  @Post()
  create() {
    return this.relationService.createUser();
  }
  @Get()
  getAll() {
    return this.relationService.findAll();
  }
}
