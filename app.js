const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path =require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}))
const methodOverride=require("method-override");
app.use(methodOverride("_method"))
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


let Mongo_Url='mongodb://127.0.0.1:27017/wonderlust'
main()
.then((res)=>{console.log("working....")})
.catch((err)=>{console.log(err)})

async function main(params) {
    await mongoose.connect(Mongo_Url);   
}


app.get("/",(req,res)=>{res.send("the server is on..")})

//index route
app.get("/listings",async (req,res)=>
    {
        const allListings=await Listing.find({});
        res.render("listings/index.ejs",{allListings})
    })


app.get("/listings/new",async (req,res)=>
        {
            res.render("listings/new.ejs")
        }
    )

app.get("/listings/:id",async (req,res)=>
    {
        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("listings/show.ejs",{listing})
    })


app.post("/listings",async(req,res)=>
{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})


app.get("/listings/:id/edit",async(req,res)=>
{
        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id",async(req,res)=>
{
    let {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true,returnDocument:"after"});
    res.redirect(`/listings/${id}`);
}
)



app.delete("/listings/:id",async(req,res)=>
{
    let {id}=req.params;    
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}
)


app.listen(8080,()=>{console.log("server is listening to the port 8080..")})











