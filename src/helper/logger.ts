import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        dateFile: {
            type: 'dateFile',
            filename: '../../app.log',
        },
    },
    categories: {
        default: { appenders: ['dateFile'], level: 'info' },
    },
});

export const logger = getLogger();
