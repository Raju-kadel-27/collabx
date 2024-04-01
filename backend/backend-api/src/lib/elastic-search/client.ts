import {Client} from '@elastic/elasticsearch';

export const client = new Client({
  node: 'https:/', 
  auth: {
    apiKey: { 
      id: 'elasticsearch',
      api_key: 'elasticsearch',
    }
  }
})
