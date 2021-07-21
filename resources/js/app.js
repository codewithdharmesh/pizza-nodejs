// console.log("this is js file dynamic resources ");

import axios from 'axios';
import pnotify from 'pnotify';



let addtocart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(
        (res)=>{
            // console.log(res)
            cartCounter.innerText = res.data.totalQty
            alert({
                text: "I'm an alert.",
                type: 'info'
              });
           
        }
    )
}



addtocart.forEach( (btn) =>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza);
        // console.log(pizza);
    })
})
