const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://ezaananjum1601:pvY8lJ31nEikjqNw@namastenode.erqte.mongodb.net/devTinder"
    )
}

module.exports = {connectDB};