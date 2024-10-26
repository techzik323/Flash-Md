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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0RlYXZPSlZRYm1mTG80TEJUaUMreEQzOHlXYVRUNlVlYmtHaFpmWHNVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaENTdGIrWHQvTUY0UUpSL2hJRU5sTGFXSm04QXVPVDFHVnI1UERIcUh6Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQkFJMGg0RFhKZjdvODVwQi9nSHJCTWllNzFDZHdEdCt4dEE3R3Z1TlVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzczRpWTVGd2o2aVJJemZsS09hNFY1KzNuS3NRWU1RRG82VEx4dUhYdXlnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldDYmpuaHlWT0hSNHY4RXZpUzdLMTNKOEF1bTJJdk95bU9wbm55Wm1HMW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF4N3l3ZlJWRDg3TjVMWTBxbm90YWFGT1FDUnFXSTQyM2xMQkkxbDJhQTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU8zNnlDYWFnNHBhV3FqYk4zVW1kb0RoR1BFcWFRcVdyZWV5bUN6OVhuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFZSTG5RakVFVDRaNGx6NkZXb3VZZE9BWW9GMzY5NlpGcW9vTXlEM1RtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQrRzU0MUdHSWdSZXk4M0lKUEUyNGcrdExldlhuSDJxajU0ZlBNcGRxekRhVlNlMmFXZXBsYWN4dTJmR0ZGb01LZ1BIeXNOUmFhcFIzY1V0d2RrNGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJ6Y05XRXVuei9GL1A0VU9JMTFESjNlSC9TbS9qWjBzQ2pYYXoxZm9VbTg4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBRldQUWQ5WlJHdVZfTzF3dllxeU9RIiwicGhvbmVJZCI6IjBjOTg5MzgwLTk1ZjctNDlhZC04MGUxLWNmNDdkMzJhNTEyNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKZ2lDekI1WWtGRFV5UGxlcjdoTVNGcm9BelU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlRHSjlCTHlrd2h1WHNzTWphNDFSK1dDZ1JNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRNQVRZOThEIiwibWUiOnsiaWQiOiIyNTY3NTE2MTc3ODg6NzBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qdnRlc0ZFUDdwOWJnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Inc2ZndrbFdxZG9nY2lFdk9SWGxVVjVwbzBaRFJXM3JPaitSRjJ2NXpGMVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVzM3dzZnA0ZXQ4YmdBTy9TVy8yZ0tvM2I0eTNqa25ZOThQNEg1OU5nRVloRjVYMjB3WVI3YlNnQS82MU53VHV5dkFKTUdBT2F6azRJbVA3NzdrcUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4SkxxRHg0c1VEWEw3MnJEUTNnUjJoajBzVVZhZmJQVy94SkYvQ2xpeSthZ2dXWTZtL2NsbFhHcTlzMHQrcmIrdFdLQUtUd2czVlJCVUVJbitvRzhpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc1MTYxNzc4ODo3MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjT244SkpWcW5hSUhJaEx6a1Y1VkZlYWFOR1EwVnQ2em8va1JkcitjeGRVIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5OTgzNzU1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVBTCJ9',
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
