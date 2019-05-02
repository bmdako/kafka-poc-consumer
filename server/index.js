/*jshint node: true */
'use strict';

const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
  kafkaHost: KAFKA_HOST
});

client.on("ready", function() {
  console.log("Consumer connected");
});

client.on("error", function(err) {
  console.error('Consumer connection error')
  console.error(err);
});

const consumer = new kafka.Consumer(
    client,
    [
        { topic: 'test', partition: 0 },
        { topic: 'test2', partition: 0 }
    ],
    {
      groupId: 'kafka-node-group',
      id: 'nodeconsumer1',
      // sessionTimeout: 15000,
      autoCommit: false
    }
);

consumer.on('error', function (err) {
  console.log('Consumer ready');
});

consumer.on('ready', function (err) {
  console.error('Consumer error')
  console.error(err);
});

consumer.on('message', handleMessage);

function handleMessage(message) {
  console.log(message);
}