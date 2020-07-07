const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
// Data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View/HTML Routes



// API/JSON Routes
app.get("/",(req,res)=>{
    res.send("Hello World!")
})


//Listening to PORT
app.listen(PORT, (req,res)=>{
    console.log(`Currently Running on http://localhost:${PORT}`)
})

// One route at a time, push, deploy, troubleshoot.