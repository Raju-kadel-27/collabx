import { Client } from '@elastic/elasticsearch';
import config from '../configs'

export class ElasticManager {

    private client: Client;
    private static instance: ElasticManager;

    constructor() {
        this.client = new Client({ node: config.nodeURL })
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ElasticManager()
        }
        return this.instance;
    }

    async createIndex(indexName: string) {
        try {
            console.log("Creating index")
            console.log("Loading...")
        } catch (error) {
            console.error({ error })
        }
    }

    async indexDocument(index: string, document: any) {
        try {
            const response = await this.client.index({
                index,
                body: document,
            });

            console.log('Document indexed successfully:', response);
            return response;
        } catch (error) {
            console.error('Error indexing document:', error);
        }
    }
}


