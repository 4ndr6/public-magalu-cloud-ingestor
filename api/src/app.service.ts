import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      api: process.env.API_TITLE || '',
      module: process.env.API_NAME || '',
      version: process.env.API_VERSION || '',
      node: process.env.NODE_VERSION || '',
    };
  }
}
