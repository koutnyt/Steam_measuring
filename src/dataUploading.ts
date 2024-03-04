import { DataStructure } from './dataParsing';

export class Uploader {
    constructor(private thingspeakLink: string) {}

    async uploadData(jsonData: DataStructure) {
        try {
            // Send a POST request to the Thingspeak service
            const response = await fetch(this.thingspeakLink, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (!response.ok) {
                throw new Error(`${response.status + response.statusText} Unable to wtrite the data to thingspeak`);
            }
            console.log(`Status code ${response.status}: data successfully stored to thingspeak database. ${new Date()}`, '\n', '--------------------------------');
        } catch (error) {
            console.log(error);
            console.log(new Date());
        }
    }
}
