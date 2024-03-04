import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import { WebPageDownloader } from './webPageDownloading';
import { Parser } from './dataParsing';
import { Uploader } from './dataUploading';

dotenv.config({ path: '../../.env' });

const webPageLink = process.env.STEAM_WEBSERVER;
const thingspeakLink = process.env.DATABASE;
const apiKey = process.env.WRITE_API_KEY;

if (!webPageLink) {
    throw new Error('Connection link is not defined');
}

if (!thingspeakLink) {
    throw new Error('Connection link to the thingspeak is not defined');
}

if (!apiKey) {
    throw new Error('Write api key to the thingspeak is not defined');
}

const webPageDownloader = new WebPageDownloader(webPageLink);
const dataParser = new Parser(apiKey);
const dataUploader = new Uploader(thingspeakLink);

async function storeDataFromWeb(downloader: WebPageDownloader, parser: Parser, uploader: Uploader) {
    const downloadedData: JSDOM = await downloader.downloadPageAndReturnJSDOM();
    const jsonData = parser.jsDomDataToJSON(downloadedData);
    uploader.uploadData(jsonData);
}

// run every 15 seconds
schedule.scheduleJob('*/15 * * * * *', () => {
    storeDataFromWeb(webPageDownloader, dataParser, dataUploader);
});
