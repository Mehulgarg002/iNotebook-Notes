const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to DB!'))
        .catch(error => console.log(error))
}

module.exports = connectToMongo;

// mongodb://127.0.0.1:27017