// Some insights about Apache-kafka

// Think topic like folders
// Think partition like sub-folders
// Partition are shared across multiple brokers enabling usage of extra bandwidth ( High Throughput )

// One partition is fixed to one consumer.
// Had to do rebalancing if broker scales.
// Generally odd number of workers are preferred (helps in election for Master)
// Hence, apache kafka is not actually a message queue.

// Queue like Rabbitmq allows concurrent reads to consumers.

// One great alternative to apache kafka is Apache Pulsar that has built in balancing on scale
// It even act as Message Queue
