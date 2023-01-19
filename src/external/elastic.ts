import { Client } from '@elastic/elasticsearch'
import { Config } from '../config/config.interface'

class Elastic {
    public elastic: Client
    constructor({ elastic }: Config) {
        this.elastic = new Client({
            cloud: {
                id: elastic.cloud_id,
            },
            auth: {
                apiKey: elastic.api_key,
            },
        })
    }
}

export default Elastic
