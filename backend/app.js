import express, { application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config'
import models from './models/index.js';

import apiRoutes from './routes/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/api', apiRoutes);

// for prod -> npm run build
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) =>
//         res.sendFile(
//             path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//         )
//     );
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }

app.get('/', (req, res) => {
    res.send('Please set to production')
});

export default app;
