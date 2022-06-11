import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    url: string
}

console.log(process.env)

export const oauth2Client = new google.auth.OAuth2(
    process.env.GCP_OAUTH_CLIENT_ID,
    process.env.GCP_OAUTH_CLIENT_SECRET,
    `http://localhost:3000/google/calendar`
);

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
});

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ url: authorizationUrl })
}
