import { JSDOM } from 'jsdom';

export interface JsonData {
    aLineActual: number;
    bLineActual: number;
    cLineActual: number;
    aLineMonthly: number;
    bLineMonthly: number;
    cLineMonthly: number;
}

export class Parser {
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

    jsDomDataToJSON(data: JSDOM) {
        const jsonData: JsonData = {
            aLineActual: this.domElementTextContentToNumber(data, 1, 3),
            bLineActual: this.domElementTextContentToNumber(data, 2, 3),
            cLineActual: this.domElementTextContentToNumber(data, 3, 3),
            aLineMonthly: this.domElementTextContentToNumber(data, 6, 6),
            bLineMonthly: this.domElementTextContentToNumber(data, 10, 6),
            cLineMonthly: this.domElementTextContentToNumber(data, 14, 6),
        };
        return jsonData;
    }
}
