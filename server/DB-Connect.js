const mongoose = require('mongoose');

const dbConnect = async() => {
    try {
        let connect = await mongoose.connect(process.env.BD_URI);
        console.log("DB connected successfully !")
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConnect;