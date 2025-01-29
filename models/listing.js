const mongoose=require("mongoose");
const review = require("./review");
const Review=require("./review.js");
const { ref } = require("joi");


const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:
    {type : String,
     required:true,
    },
    description:String,
    image: {
       url:String,
       filename:String,

    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
            

        },
    ],
owner:{
    type:Schema.Types.ObjectId,
    ref : "User",
},

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
     
})

// now create the model using this schema
const Listing=mongoose.model("Listing",listingSchema ); // so the listing is model ;
module.exports=Listing;
