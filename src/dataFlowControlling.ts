import { dataLoader, ILoader } from './webpageDownloading'
import { storageAdapter, ISotrageAdapter } from './dataRepository'




export interface IDataManager{
    dataLoader:ILoader
    storageAdapter:ISotrageAdapter
    processData():Promise<void>
}




/**
 * Controlls the flow of data including downloading and storing data.
 *
 * @class DataFlowController
 */
export class DataFlowController implements IDataManager {
    
    dataLoader:ILoader // Object responsible for downloading webpage
    storageAdapter:ISotrageAdapter // Object responsible for obtaining useful data from downloaded webpage and storing the data
    

    constructor(){
        this.dataLoader = dataLoader
        this.storageAdapter = storageAdapter
    }


    private async downloadData(): Promise<Response|undefined> {
        const data = await this.dataLoader.loadData()
        return data
    }
    

    private storeData(data:Response): void {
        this.storageAdapter.storeData(data)
    }


    /**
     * Processes the data flow, including downloading and storing data.
     *
     * @memberof DataFlowController
     */
    async processData():Promise<void> {
        let data = await this.downloadData()
        // Continuously attempt to download webpage until successfull
        while (!data) {
            data = await this.downloadData()
        }
        this.storeData(data)  
    }
}



