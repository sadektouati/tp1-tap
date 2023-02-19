const express = require('express');
const app = require('express')();
const path = require("path");
const fs = require('fs');
const request = require('request');
const { PORT , API_KEY } = require('./config');
const company = 'apple'

request.get({
    url: 'https://newsapi.org/v2/everything?q=' + company + '&from=2023-02-18&to=2023-02-18&sortBy=popularity&apiKey=' + API_KEY ,
    headers: {'User-Agent': 'SaddeksAPI'}
    }, (err, res, data) => {
        if (err) {
            throw 'Error:' + err

        } else {
            const jsonData = JSON.parse(data);
            if(jsonData.status == 'ok'){
                fs.writeFile(company + '.json', data, err => {
                    if(err) throw err;
                })
            }else{
                throw jsonData.message;
            }
        }
  
    })


    app.get('/api/donnees/:id', function(req, res){
        
        fs.readFile(__dirname + "/" + company +'.json', 'utf8', function (err, data){
            res.json(JSON.parse(data).articles[req.params.id])
        })

    })

    app.get('/api/donnees', function(req, res){

        fs.readFile(__dirname + "/" + company +'.json', 'utf8', function (err, data){
        res.json(JSON.parse(data))

        })
    })

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

app.get("/*", function(req, res){
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})

app.listen(PORT || 8000, () => {
   console.log("Server running on PORT", PORT)
})