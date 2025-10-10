const mongoose = require('mongoose');
const dbURL = "mongodb://localhost:27017/paw2-si5c";

mongoose.connect(dbURL, {});
mongoose.connection.on('connected', () => {
    console.log(`Mongoose terhubung ${dbURL}`)
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
})
mongoose.connection.on("disconnected", () => {
    console.log('Mongoose terputus')
})