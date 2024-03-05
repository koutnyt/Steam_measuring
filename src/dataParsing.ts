import { JSDOM } from 'jsdom';

// Data structure required by ThingSpeak service
export interface DataStructure {
    write_api_key: string
    updates: MeasureValue[]
}

interface MeasureValue {
    created_at: Date
    field1: number
    field2: number
    field3: number
    field4: number
    field5: number
    field6: number
    field7: number
    field8: number
}

export class Parser {
    constructor(private apiKey: string) {}

    domElementTextContentToNumber(dom: JSDOM, line: number, slicePosition: number): number {
        // Extracts the text content from specific DOM elements, replaces commas with dots,
        // and slices the text content to the specified position
        const elementTextContent = dom.window.document
            .getElementsByTagName('TABLE')[3]
            .getElementsByTagName('TBODY')[0]
            .getElementsByTagName('TR')[line]
            .getElementsByTagName('TD')[1]
            .getElementsByTagName('FONT')[0]
            .textContent!.replace(',', '.')
            .slice(0, -slicePosition);
        return Number(elementTextContent);
    }

    jsDomDataToJSON(data: JSDOM): DataStructure {
        const jsonData: DataStructure = {
            write_api_key: this.apiKey as string, // authorization by write_api_key
            updates: [{
                created_at: new Date(),
                field1: this.domElementTextContentToNumber(data, 1, 3), // Conti actual
                field2: this.domElementTextContentToNumber(data, 2, 3), // JML actual
                field3: this.domElementTextContentToNumber(data, 3, 3), // Finishing actual
                field4: 0, // reserved
                field5: 0, // reserved
                field6: this.domElementTextContentToNumber(data, 6, 6), // Conti monthly
                field7: this.domElementTextContentToNumber(data, 10, 6), // JML monthly
                field8: this.domElementTextContentToNumber(data, 14, 6), // Finishing monthly
            }],
        };
        return jsonData;
    }
}
