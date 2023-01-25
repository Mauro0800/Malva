const express = require("express");
const app = express();
const port = 2023;
const path = require("path");

app.listen(port,()=>console.log(`Servidor corriendo en https://localhost ${port}`));
app.use(express.static(path.resolve(__dirname,'public')));

app.get("/",(req,res)=>res.sendFile(path.resolve(__dirname,'views','index.html')));
app.get("/login",(req,res)=>res.sendFile(path.resolve(__dirname,'views','login.html')));
app.get("/register",(req,res)=>res.sendFile(path.resolve(__dirname,'views','register.html')));
app.get("/shopping-cart",(req,res)=>res.sendFile(path.resolve(__dirname,'views','shoppingcart.html')));
app.get("/product-detail",(req,res)=>res.sendFile(path.resolve(__dirname,'views','productdetail.html')));
app.get("/reset-password",(req,res)=>res.sendFile(path.resolve(__dirname,'views','resetpassword.html')));
app.get("/dashboard",(req,res)=>res.sendFile(path.resolve(__dirname,'views','dashboard.html')));