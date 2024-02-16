export interface ILoader{
    loadData():Promise<Response|undefined>
}




/**
 * WebPageLoader class to load web page
 *
 * @class WebPageLoader
 * @implements {ILoader}
 */
class WebPageLoader implements ILoader{

    /**
     * Loads webpage asynchronously
     *
     * @return {*}  {(Promise<Response|undefined>)}
     * @memberof WebPageLoader
     */
    async loadData():Promise<Response|undefined> {
        try {
            const response = await fetch(process.env.STEAM_WEBSERVER as string);
            console.log(`Status code ${response.status}: response loaded successfully`)
            return response} 
        catch (error) {
            console.log(error)
            console.log(new Date())
            return
        }
    }
}




export const dataLoader = new WebPageLoader()



