import elasticClient from '@elastic/elasticsearch';

const createIndex = async (indexName:string) => {
    await elasticClient.indices.create({ index: indexName });
};

createIndex("posts");