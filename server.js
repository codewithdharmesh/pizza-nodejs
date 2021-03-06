require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const PORT = process.env.port || 7000;



// const connection =  require("./dbconn");
const pizzacollection = require("./app/models/pizzamodel");

const expresslayout = require("express-ejs-layouts");

const session =  require("express-session");
const uuid = require('uuid').v4
const flash = require("express-flash");
const MongoDbStore = require('connect-mongodb-session')(session);

const publicpath = path.join(__dirname,'public/css')
    


  mongoose.connect("mongodb://localhost:27017/pizza",{useNewUrlParser:true , useCreateIndex:true,
useUnifiedTopology:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{

    console.log('database connect');
}).catch(err=>{
    console.log("connec failed");
});


// sessionn store
 let astore = new MongoDbStore({
    uri:'mongodb://localhost:27017/pizza',
    // mongooseConnection: connection,
    collection: 'sessions'
})

// session config
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: astore ,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000* 60 *60 *60 *24} //24 hours
  
}))



//set template engine 
app.use(expresslayout);
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
  res.locals.session = req.session
  next()
})

app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs' )

require("./routes/web")(app);

app.use(flash())
//Assets
app.use(express.static('public'))




// // insert data function **************************************
// const insertDocument = async () =>{

//     try{
//         // new document creatioin
//         const Playlist = new pizzacollection({
//             name:"indiana",
//             image:"pizza.jpg",
//             price:300,
//             size:"Large"
//          })

// const expressPlaylist = new pizzacollection({
//    name:"CheeseIndian",
//    image:"pizza.jpg",
//    price:450,
//    size:"medium"
// })

// // for single document to save
// // const result = await expressPlaylist.save();


// // to insert many document at one time
// const result = await pizzacollection.insertMany([expressPlaylist,Playlist]);
// console.log(result);

//     }catch(err){
//         console.log(err);
//     }
    
// }
// insertDocument();






app.listen(PORT ,()=>{
    console.log(`listning to the port no: ${PORT}`);
})