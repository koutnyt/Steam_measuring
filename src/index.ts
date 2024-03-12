import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import { WebPageDownloader } from './webPageDownloading';
import { Parser } from './dataParsing';
import { Uploader } from './dataUploading';
import { logger } from './helper/logger';

dotenv.config({ path: '../../.env' });

logger.info('App started');

const webPageLink = process.env.STEAM_WEBSERVER;
const apiKey = process.env.WRITE_API_KEY;
const thingspeakLink = process.env.DATABASE;

if (!webPageLink) {
    throw new Error('Connection link to web page is not defined');
}

if (!apiKey) {
    throw new Error('Write api key to ThingSpeak service is not defined');
}

if (!thingspeakLink) {
    throw new Error('Connection link to ThingSpeak service is not defined');
}

const webPageDownloader = new WebPageDownloader(webPageLink);
const dataParser = new Parser();
const dataUploader = new Uploader(thingspeakLink, apiKey);

async function storeDataFromWeb(downloader: WebPageDownloader, parser: Parser, uploader: Uploader) {
    const downloadedData: JSDOM = await downloader.downloadPageAndReturnJSDOM();
    const jsonData = parser.jsDomDataToJSON(downloadedData);
    uploader.uploadData(jsonData);
}

// run every 15 seconds
schedule.scheduleJob('*/15 * * * * *', () => {
    storeDataFromWeb(webPageDownloader, dataParser, dataUploader);
});
