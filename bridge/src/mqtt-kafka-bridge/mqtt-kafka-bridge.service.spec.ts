import { Test, TestingModule } from '@nestjs/testing';
import { MqttKafkaBridgeService } from './mqtt-kafka-bridge.service';

describe('MqttKafkaBridgeService', () => {
  let service: MqttKafkaBridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttKafkaBridgeService],
    }).compile();

    service = module.get<MqttKafkaBridgeService>(MqttKafkaBridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
