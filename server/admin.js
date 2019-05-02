/*jshint node: true */
'use strict';

const kafka = require('kafka-node');

const KAFKA_HOST = process.env.KAFKA_HOST;

const client = new kafka.KafkaClient({
  kafkaHost: KAFKA_HOST
});

client.on("ready", function() {
  console.log("Producer connected");
});

client.on("error", function(err) {
  console.error('Producer connection error')
  console.error(err);
});

const admin = new kafka.Admin(client);
admin.listTopics((err, res) => {
  console.log('topics', res[1]);
  console.log('topic 0', res[1].metadata.test);
  console.log('topic 1', res[1].metadata.test2);
});