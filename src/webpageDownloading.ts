import { JSDOM } from 'jsdom';
import { HttpRequest } from './utils/request';
import type { FetchResource } from './utils/request';

export class WebPageDownloader {
    private httpRequest: HttpRequest;

    constructor(private webPageLink: FetchResource) {
        this.httpRequest = new HttpRequest();
    }

    async downloadPageAndReturnJSDOM(): Promise<JSDOM> {
        let response: Response | void;
        do {
            response = await this.httpRequest.sendHttpRequest(this.webPageLink);
        } while (!response);
        const responseTextFormat = await response.text();
        return new JSDOM(responseTextFormat);
    }
}
