const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 4000;
let locationData;
async function longPoll() {
    try {
        const data = await axios.get('http://10.4.5.221:5000/poll')
        locationData = data.data
        setTimeout(longPoll, 30000);
    }
    catch (err) {
        console.log("error occured", err);
        setTimeout(longPoll, 30000);
    }
}

app.get('/start-polling', (req, res) => {
    res.send('Starting long polling...');
    locationData = longPoll();
});
app.get('/test', (req, res) => {
    res.json({ "geeting": "All Good to Start" })
})
app.get("/getLocationData", (req, res) => {
    res.send(locationData)
})
app.listen(PORT, () => {
    console.log(`Express client server is running on port ${PORT}`);
});
