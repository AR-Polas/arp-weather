const express = require('express')
const app = express();
const path = require("path");
const hbs = require('hbs');
const port = process.env.PORT || 3000;



const dynamicPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',dynamicPath)

const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path))
hbs.registerPartials(partialsPath);


app.get("/",(req,res) =>{
  res.render('index')
})
app.get("/weather",(req,res) =>{
  res.render('weather')
})
app.get("/about",(req,res) =>{
  res.render('about')
})
app.get("*",(req,res) =>{
  res.render('error')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})