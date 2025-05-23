import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configureService: ConfigService) {}
  getDbUrl() {
    return this.configureService.get<string>('DB_URL');
  }
}
