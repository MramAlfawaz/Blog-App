const express = require("express");
const moment = require("moment");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");


//models
const Article = require("../models/Article");


//GET - retrieve data
//POST - send data
//PUT/PATCH - updates
//DELETE - removes

//http://google.com - GET
app.get("/", (request, response) => {
    Article.find()
      .then(articles => {
        //   console.log(articles);
        //{ articles: articles } \\ { articles }
        //{ moment: moment } \\ { moment }
        response.render("articles/index", { articles, moment });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  //create article routes
  app.get("/create", (request, response) => {
    response.render("articles/create");
  });
  
  app.post("/create", (request, response) => {
    console.log(request.body);
    let article = new Article(request.body);
  
    //   console.log(article);
    //save article
    article
      .save()
      .then(() => {
        //   response.send("Post worked!!");
        response.redirect("/");
      })
      .catch(err => {
        console.log(err);
        response.send("Error!!!!!");
      });
  });
  
  app.get("/article/:id", (request, response) => {
    //   console.log(request.params.id);
    //   Article.find({_id: request.params.id })
    Article.findById(request.params.id).then(article => {
      //{article: article} || {article}
      response.render("articles/show", { article, moment });
    });
  });
  
  app.delete("/article/:id/delete", (request, response) => {
    //   console.log(request.params.id);
    //   Article.find({_id: request.params.id })
    Article.findByIdAndDelete(request.params.id).then(article => {
      //{article: article} || {article}
      response.redirect("/");
    });
  });