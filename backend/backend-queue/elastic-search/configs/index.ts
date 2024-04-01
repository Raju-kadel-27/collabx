import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 5001,
    nodeURL: process.env.NODE_URL || 'http://localhost:9200',
    amqlibURL: process.env.amqlibUrl || 'http://localhost:amqlib',
    indexName: 'collabx-users'
}

export default config;