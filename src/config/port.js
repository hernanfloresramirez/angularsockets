import express from 'express';
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 3001);
const port = app.get('port');

export default port;