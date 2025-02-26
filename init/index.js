const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js")

main()
      .then((res)=>{
        console.log("success!");
})
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/havenly');

}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "67b780f2e9cab833cc7c797f"}))
    await Listing.insertMany(initData.data);
    console.log("Data is entered successfully");
} 
initDB();