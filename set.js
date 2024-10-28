const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUJVZ212MkV1djllV0VlYitiK28wQmhweHo5UllNZDhZQ3JhNTNrZGMzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNjAzQ0o1T3BBM0dhZkxIR2lMTWgxUlZpVytqbWdlTkZpUDZ6T2kvdnBnVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvUElNNXpBRWN3c2VpMU5nZVErWnZWVW9KZ3B0T3YwU2F1WUs5bmFFYUdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTmkwL015OTg1aElqemVSa3k2UnJwZTJOTmI2TTZpdWpaUGhqRkJ1YWtJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFLWHVPWUdPL1piUitaMGszSUtZaGMyUG9JeElxZW1QRWM3RjNPOE5rSGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndUK1BDVXI3QlZpMHkrZUNpaUZoZjh0Zk1rMkE3cmZ2L1BHQUs4ZEx1V1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUEwR0E4MmkxRFJOdzkvQUUrZHJKMEVGZkNMcVNWRUJ4RGNiV2phdU1sND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN3ZWbDgyL1J1M0EwcE92a1Yxc1V3Tlk5Z1RQUDUwWVo2OFVVMkZ1dElROD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt0QlNuK3l1VGQxL3ZIaURQRzVVWkxXRU41WEI5cDVyeWkwK3FNU1ZBbzBMNm5NNytUSmk3bEswTGVmeE1haWpNdHRjOSsycERIUHpjQllGRnRpNmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6InpTbWlaUkd0RlZ6bmVJNmpyODZsRmg2K21OSUhxQ2pTMVlHME5RTDBmbGM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImVlVVB1VTk0UjNLM1ZaLWZZV0ZUb2ciLCJwaG9uZUlkIjoiYWExMGUxNjYtOWM1Yi00Yzc4LWIxNzUtYTA0ZjhlMWViYzMyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxUQ2JDdWhiWWhZSUM5TENLTFJKRVZKV1c3UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1Q2VhcFRRQ3k3aTFhYmxLb1plSzgxOEFPdEU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTTIyVzVNNTUiLCJtZSI6eyJpZCI6IjI1Njc1MTYxNzc4ODo3M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXZ2dGVzRkVJcm0vN2dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidzZmd2tsV3Fkb2djaUV2T1JYbFVWNXBvMFpEUlczck9qK1JGMnY1ekYxUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQU9GNS9YRFBjQU1zN0RGYVVLVjZpY0RqUWZMblhCYkRLQ0xnQnJhNlFOTnV2WFlkTmNidFF4Y3RPeDJseXhvTVczRC9YcTBUR0txdU01Ty9nd3RpQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImlTdVpjemU4U1Yxam5VUTQ3NC96MytqRkRSMURUc284NjMxNHV2aklkbHJuMGNzVkx0Vll1YXNIR0xiTFFjZlBFRGxRQUdrMUVZeWhuVTRIcmZ2RGp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzUxNjE3Nzg4OjczQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNPbjhKSlZxbmFJSEloTHprVjVWRmVhYU5HUTBWdDZ6by9rUmRyK2N4ZFUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzAxNDcwOTR9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "ZIK TECH UG",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "256751617788",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
