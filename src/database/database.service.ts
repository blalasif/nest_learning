import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private isConnected = false;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      this.isConnected = true;
      console.log('✅ Database Connected Successfully');
    } catch (error) {
      console.error('❌ Database Connection Failed:', error.message);
    }
  }
  async onApplicationShutdown(signal: string) {
    await mongoose.disconnect();
    this.isConnected = false;
    console.log(
      `❌ Database Disconnected due to app shutdown. Signal: ${signal}`,
    );
  }

  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
