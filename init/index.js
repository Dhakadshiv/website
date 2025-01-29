const mongoose=require("mongoose");
const initData=require("./data.js"); // init means initalise
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main() // Call the function to get the promise
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {

    try {
        // Clear the existing data
        await Listing.deleteMany({});
        // Insert new data from initData
        initData.data=initData.data.map((obj)=>({...obj,owner:"675dd9506efed1ff68e0f65b"}))
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error inserting data:", err.message); // Log the error message
        if (err.name === 'ValidationError') {
            console.error("Validation errors:", err.errors); // Log the specific validation errors
        }
    }
};


initDB();