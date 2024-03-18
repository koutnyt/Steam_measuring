import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        dateFile: {
            type: 'dateFile',
            filename: '../../app.log',
            maxLogSize: 10485760,
            numBackups: 3,
        },
    },
    categories: {
        default: { appenders: ['dateFile'], level: 'info' },
    },
});

export const logger = getLogger();
