import mongoose from "mongoose";
const db = mongoose
    .connect("mongodb+srv://juanitoperez:Hfr123456789@cluster0.179y9yz.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected: '))
    .catch(err => console.log('ERROR: ', err));
export default db;
