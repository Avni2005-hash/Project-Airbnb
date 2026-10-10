const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review = require("./review.js")

const listingSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    description:String,
    image: {
        filename: String,
        url: {
        type: String,
        default: "https://unsplash.com/photos/a-sunset-over-a-body-of-water-with-houses-in-the-background-jVrZgVhqsqs",
        set: (v)=> v==="" ? "https://unsplash.com/photos/a-sunset-over-a-body-of-water-with-houses-in-the-background-jVrZgVhqsqs" : v,
    }
},
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;