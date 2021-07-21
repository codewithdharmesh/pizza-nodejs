const pizzacollection = require("../../models/pizzamodel");
function homeController(){
    return{
       async index(req,res){
           const pizzas = await pizzacollection.find();
        //    console.log(pizzas);
           res.render('home',{pizzas:pizzas})
        },
       

    }
}

module.exports = homeController
