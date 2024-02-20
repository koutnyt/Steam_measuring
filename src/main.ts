import schedule from 'node-schedule'
import dotenv from 'dotenv';
import { IDataManager } from './dataFlowControlling'
import { WebPageLoader } from './webpageDownloading';
import { StorageAdapter, DataStorageManager } from './dataRepository';
import { DataFlowController } from './dataFlowControlling';



dotenv.config({path:'../../.env'});




//factory function
function createDataFlowController():IDataManager{
    const dataFlowController = new DataFlowController(new WebPageLoader(), new StorageAdapter(new DataStorageManager()))
    return dataFlowController
}




if (process.env.STEAM_WEBSERVER == undefined){
    throw new Error('Connection link is not defined')
}




if (process.env.DATABASE == undefined){ 
    throw new Error("Connection link to the thingspeak is not defined");
}




if (process.env.WRITE_API_KEY == undefined){
    throw new Error("Write api key to the thingspeak is not defined");
}




const dataFlowController = createDataFlowController()




//run every 15 seconds
schedule.scheduleJob('*/15 * * * * *', function(){
    dataFlowController.processData()
});



