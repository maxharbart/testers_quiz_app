import { google } from "googleapis";
import keys from "../../key";

export default function handler(req, res) {
    try {
        const { inputValue } = req.body;

        if (!inputValue) {
            return res.status(400).send(JSON.stringify({ error: "inputValue is a required field" }));
        }

        const client = new google.auth.JWT(
            keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function (err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({ error: true }));
            }

            const gsapi = google.sheets({ version: 'v4', auth: client });
            const valuesToAppend = [[inputValue]];

            const opt = {
                spreadsheetId: keys.sheet_id,
                range: 'Sheet1!A3:A',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: valuesToAppend,
                },
            };

            gsapi.spreadsheets.values.append(opt, (err, response) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(JSON.stringify({ error: true }));
                }

                // The value was successfully appended
                console.log(response.data);

                return res.status(200).send(JSON.stringify({ success: true }));
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(JSON.stringify({ error: true }));
    }
}
