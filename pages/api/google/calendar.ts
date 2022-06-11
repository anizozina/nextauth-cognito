
import type { NextApiRequest, NextApiResponse } from 'next'

import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { oauth2Client } from './auth';


type Data = {
    events: any[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const client = await auth(req.query.code as string || '');
    const result = await listEvents(client)

    res.status(200).json({ events: result })
}


const auth = async (code: string) => {
    const token = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(token.tokens);
    return oauth2Client
}

const listEvents = async (auth: OAuth2Client) => {
    const calendar = google.calendar({ version: 'v3', auth });
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    })
    const events = res.data.items;
    if (events?.length) {
        console.log(JSON.stringify(events));
        return events
    } else {
        console.log('No upcoming events found.');
        return []
    }
}