import { JSDOM } from 'jsdom';

export class WebPageDownloader {
    constructor(private webPageLink: string) {}

    private async downloadWebPage(): Promise<Response | void> {
        try {
            const response = await fetch(this.webPageLink);
            if (!response.ok) {
                throw new Error(`${response.status + response.statusText} Unable to load steam consumption counter webserver`);
            }
            console.log(`Status code ${response.status}: response loaded successfully`);
            return response;
        } catch (error) {
            console.log(error);
            console.log(new Date());
        }
    }

    async downloadPageAndReturnJSDOM(): Promise<JSDOM> {
        let response: Response | void;
        do {
            response = await this.downloadWebPage();
        } while (!response);
        const responseTextFormat = await response.text();
        return new JSDOM(responseTextFormat);
    }
}
