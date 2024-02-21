import { JSDOM } from 'jsdom';




export interface IStorageAdapter{
    storeData(data:Response):void
}




export interface IStorageManager{
    storeData(data:DataStructure):void
}




interface DataStructure {
    write_api_key: string;
    updates: MeasureValue[];
}
  
interface MeasureValue {
    created_at: Date;
    field1: number;
    field2: number;
    field3: number;
    field4: number;
    field5: number;
    field6: number;
    field7: number;
    field8: number;
}




/**
 * StorageAdapter class to obtain useful data from downloaded webpage
 * 
 * 
 * @class StorageAdapter
 * @implements {IStorageAdapter}
 */
export class StorageAdapter implements IStorageAdapter{
    
    private adaptee: IStorageManager;

    constructor(adaptee: IStorageManager){
        this.adaptee = adaptee
    }
    
    private async responseToText(response:Response):Promise<string>{
        const textResponse = await response.text();
        return textResponse
    }

    private textToJSDOM(textData:string):JSDOM{
        const domData = new JSDOM(textData)
        return domData
    }

    
    /**
     * Reads the text content of a DOM element of downloaded webpage and parses it to a number.
     *
     * @private
     * @param {JSDOM} dom  The JSDOM object representing the document
     * @param {number} line The line number of the table row to read
     * @param {number} slicePosition The position to slice the text content
     * @return {*}  {number} The parsed number extracted from the DOM element's text content
     * @memberof StorageAdapter
     */
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
    

    jsDomdDataToJSON(data:JSDOM):DataStructure{
        const jsonData:DataStructure = {
            write_api_key: process.env.WRITE_API_KEY as string,
            updates: [{
                    created_at: new Date(),
                    field1: this.domElementTextContentToNumber(data,1,3), //Conti actual
                    field2: this.domElementTextContentToNumber(data,2,3), //JML actual
                    field3: this.domElementTextContentToNumber(data,3,3), //Finishing actual
                    field4:0,
                    field5:0,
                    field6: this.domElementTextContentToNumber(data,6,6), //Conti monthly
                    field7: this.domElementTextContentToNumber(data,10,6), //JML monthly
                    field8: this.domElementTextContentToNumber(data,14,6) //Finishing monthly
                }
            ]
        }
        return jsonData
    }


    /**
     * Stores data received as a Response object.
     *
     * @param {Response} data The Response object containing the data to store
     * @return {*}  {Promise<void>}  
     * @memberof StorageAdapter
     */
    async storeData(data: Response): Promise<void> {
        // Convert Response object to text
        const textData = await this.responseToText(data)
        
        // Convert text data to JSDOM object
        const jsdomData = this.textToJSDOM(textData)

        // Convert JSDOM data to JSON format
        const jsonData = this.jsDomdDataToJSON(jsdomData)
        
        // Store JSON data using the adaptee
        this.adaptee.storeData(jsonData)
    }
}



/**
 * Manages the storage of data.
 *
 * @class DataStorageManager
 * @implements {IStorageManager}
 */
export class DataStorageManager implements IStorageManager{

    /**
     * Stores the provided JSON data to a specified database link.
     *
     * @param {DataStructure} jsonData jsonData The JSON data to be stored
     * @memberof DataStorageManager
     */
    async storeData(jsonData:DataStructure) {
        try {
            // Send a POST request to the thingspeak database link with JSON data
            const response = await fetch(process.env.DATABASE as string, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(jsonData)}
            )
    
            if(!response.ok){
                throw new Error(response.status + 
                    response.statusText + 
                    'Unable to wtrite the data to thingspeak');
            }

            // Log the successful storage of data to the console
            console.log(`Status code ${response.status}: data successfully stored to thingspeak database. ${new Date()}`, '\n', 
            '--------------------------------') 

        } catch (error) {
            console.log(error)
            console.log(new Date())
            return
        }
    }
}



