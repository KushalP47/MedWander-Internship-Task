import { google } from 'googleapis';
import dotenv from 'dotenv';
import client from '../src/db.js';

// Load environment variables from .env file
dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function authorize() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    return authClient;
}

async function writeToSheet(auth, data) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A2'; 

    const resource = {
        values: data,
    };

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
        console.log('Data successfully written to Google Sheet');
    } catch (error) {
        console.error('Error writing to Google Sheet:', error);
        throw error;
    }
}

const getExcelData = async (req, res) => {
    try {
        const response = await client.query('SELECT * FROM users');
        const data = response.rows.map(Object.values);

        const auth = await authorize();
        await writeToSheet(auth, data);

        res.status(200).json({ message: 'Data successfully written to Google Sheet' });
    } catch (error) {
        console.error('Error in getExcelData:', error);
        res.status(500).json({ error: error.message });
    }
};

export { getExcelData };
