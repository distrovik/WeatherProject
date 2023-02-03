const express = require("express");
const https = require("https");
const app = express();
const port = 420;
const bodyParser = require("body-parser");

app.listen(port, () => {
    console.log("Server started on port " +port);
  })

app.use(bodyParser.urlencoded({extended:true}));  

app.get("/", (req,res) => {

    res.sendFile(__dirname+"/index.html")
});

app.post("/", (req,res) =>{
    console.log(req.body.cityName)
     const userCity = req.body.cityName
     const units = "metric"
     const key = "b01cacd4ad4e38e09efedce53cd0f034"
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&units="+units+"&appid="+key
    
     https.get(url, (resp) =>{
         console.log(resp.statusCode)
    
        resp.on("data", (data) => {
             const weatherData = JSON.parse(data)
            const temp = Math.round(weatherData.main.temp)
            console.log(temp);
            const desc = weatherData.weather[0].description
            console.log(desc);
            const icon = weatherData.weather[0].icon
            const weatherIcon = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Hello, "+ userCity.toUpperCase() +" dweller!</h1>");
            res.write("<h1>The temperature in "+ userCity.toUpperCase() +" is "+ temp + " Celcius with " +desc+"  <img src="+weatherIcon+"> "+".</h1>");
            res.send()
       })
    })
})
