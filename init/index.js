const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');


let Mongo_Url='mongodb://127.0.0.1:27017/wonderlust'
main()
.then((res)=>{console.log("working....")})
.catch((err)=>{console.log(err)})
async function main(params) {
    await mongoose.connect(Mongo_Url);   
}


const initDb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is initialized..")
}

initDb();