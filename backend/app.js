'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let http = require('http');
let cookieParser = require('cookie-parser');
let path = require('path');
let sessionChecker = require('./helpers/sessionChecker');

let config = require('./config');

let dbPath = "mongodb://localhost/" + config.db;
mongoose.connect(dbPath,{ useNewUrlParser: true, useUnifiedTopology: true });

let donationRoute = require('./routes/donation.route');
let itemRoute = require('./routes/item.route');
let requestRoute = require('./routes/request.route');
let userRoute = require('./routes/user.route');

let app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/donation-system')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));

app.get("/api/isauthenticated", sessionChecker.isAuthenticated);

app.use('/api', userRoute);
app.use('/api', requestRoute);
app.use('/api', itemRoute);
app.use('/api', donationRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/donation-system/index.html'));
});

let httpServer = http.createServer(app);
httpServer.listen(3000, '0.0.0.0', () => {
    console.log('App running on port 3000')
});
