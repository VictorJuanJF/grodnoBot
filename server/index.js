const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
require('./chatbot/app');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

const routes = require('./routes/api/api.js');
const webhook = require('./routes/chatbot.js');
app.use('/api', routes);
app.use('/', webhook);

//Handle Production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public'));
    //Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    });
}
process.env.PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Server starting on port ${process.env.PORT}`);
});