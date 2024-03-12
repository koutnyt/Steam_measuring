import { logger } from '../helper/logger';

export type FetchOption = RequestInit | undefined;
export type FetchResource = string | URL | Request;

export class HttpRequest {
    async sendHttpRequest(resource: FetchResource, option?: FetchOption): Promise<Response | void> {
        try {
            const response = await fetch(resource, option);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status + response.statusText}`);
            }
            logger.info(`Http request to ${resource} was succesful`);
            return response;
        } catch (error) {
            logger.warn(error);
        }
    }
}
