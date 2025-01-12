import { Client, Databases } from 'appwrite';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('6767d4ce000b5450b827');

const databases = new Databases(client)

export {client, databases}