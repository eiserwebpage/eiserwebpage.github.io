const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const port = 4000


const {Schema} = mongoose

const productsSchema = new Schema({
    title:{type:String},
    price:{type:Number},
    off:{type:Boolean},
    price_off:{type:Number},
    About:{type:String},
    imageurl:{type:String},
    category:{type:String},
    kind:{type:String},
    moresell:{type:String},
    new:{type:Boolean},
    keyforSearch:{type:String},
    user:{type:String},
    brend:{type:String},
    color:{type:String},
    colorforfav:{type:String},
    colorforbasket:{type:String},
},
{timestamps:true}
)

const usersSchema = new Schema({
    name:{type:String},
    surname:{type:String},
    number:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
},
{timestamps:true}
)

const favoriteSchema = new Schema({
    userid:{type:String},
    productID:{type:String},
    title:{type:String},
    price:{type:Number},
    off:{type:Boolean},
    price_off:{type:Number},
    About:{type:String},
    imageurl:{type:String},
    category:{type:String},
    kind:{type:String},
    moresell:{type:String},
    new:{type:Boolean},
    keyforSearch:{type:String},
    user:{type:String},
    brend:{type:String},
    color:{type:String},
})

const basketSchema = new Schema({
    userid:{type:String},
    productID:{type:String},
    title:{type:String},
    quantity:{type:Number},
    price:{type:Number},
    off:{type:Boolean},
    price_off:{type:Number},
    About:{type:String},
    imageurl:{type:String},
    category:{type:String},
    kind:{type:String},
    moresell:{type:String},
    new:{type:Boolean},
    keyforSearch:{type:String},
    user:{type:String},
    brend:{type:String},
    color:{type:String}
})



const Products = mongoose.model("products",productsSchema)
const Users = mongoose.model("users",usersSchema)
const Favorite = mongoose.model("favorite",favoriteSchema)
const Basket = mongoose.model("basket",basketSchema)



const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send(`<h1>Database api</h1><br>Products url : http://localhost:${port}/API/products`)
})


// ---------------------products------------------------------

app.get("/API/products",(req,res)=>{
    Products.find({},(err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.get("/API/products/:id",(req,res)=>{
    const {id} = req.params
    Products.findById(id,(err,doc)=>{
        if(!err){
            if(doc){
                res.send(doc)
            }
            else{
                res.status(404).json({message:"not found"})
            }
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.delete("/API/products/:id",(req,res)=>{
    const {id} = req.params
    Products.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.send("deleted")
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.post("/API/products",(req,res)=>{
    const products = new Products({
        title:req.body.title,
        price:req.body.price,
        off:req.body.off,
        price_off:req.body.price_off,
        About:req.body.About,
        imageurl:req.body.imageurl,
        category:req.body.category,
        kind:req.body.kind,
        moresell:req.body.moresell,
        new:req.body.new,
        keyforSearch:req.body.keyforSearch,
        user:req.body.user,
        brend:req.body.brend,
        color:req.body.color,
        colorforfav:req.body.colorforfav,
        colorforbasket:req.body.colorforbasket,
    })
    products.save()

    res.send("Saved!")
})

app.put("/API/products/:id",(req,res)=>{
    const {id}=req.params

    Products.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){
            res.status(200)
        }
        else{
            res.status(404).json({message:err})
        }
    })
    res.send({message:"Successfully Updated"})
})

// ------------------users--------------------------

app.get("/API/users",(req,res)=>{
    Users.find({},(err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.get("/API/users/:id",(req,res)=>{
    const {id} = req.params
    Users.findById(id,(err,doc)=>{
        if(!err){
            if(doc){
                res.send(doc)
            }
            else{
                res.status(404).json({message:"not found"})
            }
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.delete("/API/users/:id",(req,res)=>{
    const {id} = req.params
    Users.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.send("deleted")
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.post("/API/users",(req,res)=>{
    const users = new Users({
        name:req.body.name,
        surname:req.body.surname,
        number:req.body.number,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    users.save()
    res.send("Saved!")
})

app.put("/API/users/:id",(req,res)=>{
    const {id}=req.params

    Users.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){
            res.status(200)
        }
        else{
            res.status(404).json({message:err})
        }
    })
    res.send({message:"Successfully Updated"})
})

// -----------------favorite----------------------

app.get("/API/favorite",(req,res)=>{
    Favorite.find({},(err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.get("/API/favorite/:id",(req,res)=>{
    const {id} = req.params
    Favorite.findById(id,(err,doc)=>{
        if(!err){
            if(doc){
                res.send(doc)
            }
            else{
                res.status(404).json({message:"not found"})
            }
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.delete("/API/favorite/:id",(req,res)=>{
    const {id} = req.params
    Favorite.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.send("deleted")
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.post("/API/favorite",(req,res)=>{
    const favorite = new Favorite({
        userid:req.body.userid,
        productID:req.body.productID,
        title:req.body.title,
        price:req.body.price,
        off:req.body.off,
        price_off:req.body.price_off,
        About:req.body.About,
        imageurl:req.body.imageurl,
        category:req.body.category,
        kind:req.body.kind,
        moresell:req.body.moresell,
        new:req.body.new,
        keyforSearch:req.body.keyforSearch,
        user:req.body.user,
        brend:req.body.brend,
        color:req.body.color,
        colorforfav:req.body.colorforfav
    })
    favorite.save()
    res.send("Saved!")
})

app.put("/API/favorite/:id",(req,res)=>{
    const {id}=req.params

    Favorite.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){
            res.status(200)
        }
        else{
            res.status(404).json({message:err})
        }
    })
    res.send({message:"Successfully Updated"})
})



// -----------------basket----------------------

app.get("/API/basket",(req,res)=>{
    Basket.find({},(err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.get("/API/basket/:id",(req,res)=>{
    const {id} = req.params
    Basket.findById(id,(err,doc)=>{
        if(!err){
            if(doc){
                res.send(doc)
            }
            else{
                res.status(404).json({message:"not found"})
            }
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.delete("/API/basket/:id",(req,res)=>{
    const {id} = req.params
    Basket.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.send("deleted")
        }
        else{
            res.status(404).json({message:err})
        }
    })
})

app.post("/API/basket",(req,res)=>{
    const basket = new Basket({
        userid:req.body.userid,
        productID:req.body.productID,
        title:req.body.title,
        quantity:req.body.quantity,
        price:req.body.price,
        off:req.body.off,
        price_off:req.body.price_off,
        About:req.body.About,
        imageurl:req.body.imageurl,
        category:req.body.category,
        kind:req.body.kind,
        moresell:req.body.moresell,
        new:req.body.new,
        keyforSearch:req.body.keyforSearch,
        user:req.body.user,
        brend:req.body.brend,
        color:req.body.color,
    })
    basket.save()
    res.send("Saved!")
})

app.put("/API/basket/:id",(req,res)=>{
    const {id}=req.params

    Basket.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){
            res.status(200)
        }
        else{
            res.status(404).json({message:err})
        }
    })
    res.send({message:"Successfully Updated"})
})


// ------------------------------






const url = "mongodb+srv://admin:<password>@projectdatabase.fkyl9ws.mongodb.net/?retryWrites=true&w=majority"
const password = "admin123"
const con_url = url.replace("<password>",password)

mongoose.set('strictQuery', false);
mongoose.connect(con_url,(err)=>{
    console.log("Connect succesfully!");
    app.listen(port,()=>{
        console.log("Server working...");
    })
})






