import { Client } from '@elastic/elasticsearch';
export const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        apiKey: {
            id: 'elasticsearch-id',
            api_key: 'elasticsearch-api-key',
        }
    }
})
