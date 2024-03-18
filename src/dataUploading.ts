import type { JsonData } from './dataParsing';
import { HttpRequest } from './utils/request';
import type { FetchResource, FetchOption } from './utils/request';

export class Uploader {
    httpRequest: HttpRequest;

    constructor(private thingspeakLink: FetchResource, private apiKey: string) {
        this.httpRequest = new HttpRequest();
    }

    async uploadData(jsonData: JsonData) {
        // Data structure required by ThingSpeak service
        const data = {
            write_api_key: this.apiKey,
            updates: [{
                created_at: new Date(),
                field1: jsonData.aLineActual,
                field2: jsonData.bLineActual,
                field3: jsonData.cLineActual,
                field4: 0, // reserved
                field5: 0, // reserved
                field6: jsonData.aLineMonthly,
                field7: jsonData.bLineMonthly,
                field8: jsonData.cLineMonthly,
            }],
        };

        const fetchOption: FetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        await this.httpRequest.sendHttpRequest(this.thingspeakLink, fetchOption);
    }
}
