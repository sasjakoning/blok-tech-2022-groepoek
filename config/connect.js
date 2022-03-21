// mongoDB connection here

require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.ATLAS_URI;

const connectDb = async () => {

    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

        console.log("db connection succesful")
    } catch (err) {
        console.log(`failed to connect: ${err}`)
        throw err
    }
}

module.exports = {
    connectDb
}

