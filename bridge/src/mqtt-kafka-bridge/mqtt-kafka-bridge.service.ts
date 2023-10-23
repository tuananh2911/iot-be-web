import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import * as kafka from 'kafka-node';
import { Repository } from 'typeorm';
import { IotEntity } from './iot.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MqttKafkaBridgeService {
  private kafkaProducer;
  private mqttClient;

  constructor(
    @InjectRepository(IotEntity)
    private readonly iotRepository: Repository<IotEntity>,
  ) {
    // Khởi tạo Kafka producer
    const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    this.kafkaProducer = new kafka.Producer(kafkaClient);

    this.kafkaProducer.on('ready', () => {
      console.log('Kafka Producer is ready');
    });

    // Khởi tạo MQTT client
    this.mqttClient = mqtt.connect('mqtt://localhost:1883');

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.mqttClient.subscribe('mqtt/topic', (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    this.mqttClient.on('message', (topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);
      this.sendToKafka('kafka_topic', message.toString());
    });
  }

  sendToKafka(topic: string, message: string) {
    this.kafkaProducer.send([{ topic, messages: [message] }], (err, data) => {
      if (err) {
        console.error('Failed to send message to Kafka:', err);
      } else {
        console.log('Sent message to Kafka:', data);
      }
    });
  }

  async insertData() {}
}
