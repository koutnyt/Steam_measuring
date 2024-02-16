import { DataFlowController, IDataManager } from './dataFlowControlling'
import schedule from 'node-schedule'
import dotenv from 'dotenv';




dotenv.config({path:'../../.env'});




//factory function
function createDataFlowController():IDataManager{
    return new DataFlowController()
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



