import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      brokers: ['38.242.152.41:29092'],
    },
    consumer: {
      groupId: 'app.subscription',
      allowAutoTopicCreation: true,
    },
  },
};
