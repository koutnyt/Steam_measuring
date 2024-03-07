import { JsonData } from './dataParsing';

export class Uploader {
    constructor(private thingspeakLink: string, private apiKey: string) {}

    async uploadData(jsonData: JsonData) {
        // Data structure required by ThingSpeak service
        const data = {
            write_api_key: this.apiKey as string,
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

        try {
            // Send a POST request to ThingSpeak service
            const response = await fetch(this.thingspeakLink, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`${response.status + response.statusText} Unable to wtrite the data to ThingSpeak service`);
            }
            console.log(`Status code ${response.status}: data successfully stored to ThingSpeak service. ${new Date()}`, '\n', '--------------------------------');
        } catch (error) {
            console.log(`Error: ${error} ${new Date()}`);
        }
    }
}
