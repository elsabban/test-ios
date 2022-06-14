





 function gameOn() {
    // variables 
    var leftSide = document.getElementById('leftSide');
    var rightSide = document.getElementById('rightSide');
    var marketPath = document.getElementById('market-path');
    var marketPathWidth = getElmWidth(marketPath)
    var basket = document.getElementById('basket');
    var leftSideWidth = getElmWidth(leftSide)
    var rightSideWidth = getElmWidth(rightSide)
    var basketWidth = getElmWidth(basket)
    var products = `<div class="products"></div>`
    var initScore = 10000;
    document.getElementById('score').innerHTML = initScore
    class Product {
        constructor(obj,id,price,x,y,w,h,vx,vy){
            this.obj = obj
            this.id = id;
            this.price = price;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vx = vx;
            this.vy = vy;
        }
        
    }
    // var newProduct;
    var arrElements = []
    let i = 0
    var newElm;
    // generate products
    function generateProduct() {
        i++
        let leftPos = Math.floor(Math.random() * 100);
        let randomPrice = Math.floor(Math.random() * 400) + 100;
        // let randomAnimationDuration = Math.random() * (1 - 0.5) + 0.5;
        let div = document.createElement("div")
        div.setAttribute('id',i)
        div.classList.add('products')
        div.style.left = leftPos > 90 ? `clac(${leftPos}'%' -  20px)` : leftPos + '%';
        marketPath.appendChild(div);
        let elm = document.getElementById(i)
         newElm = new Product(elm,i,randomPrice,leftPos,elm.getBoundingClientRect().top,20,20,2,2)
         arrElements.push(newElm)
        return newElm
    }
    
    var generationInterv= setInterval(() => {
    generateProduct()
    if(arrElements.length >= 50) {
        clearInterval(interv)
    }
    }, 300);

  
var movingInterv = setInterval(() => {
    if(initScore >= 0) {
    arrElements.forEach(
        (elm) => {
            var case2 = (elm.y + elm.h >= basket.getBoundingClientRect().top)
            var case1 = ((elm.obj.getBoundingClientRect().left + elm.w >= (basket.getBoundingClientRect().left)) && (elm.obj.getBoundingClientRect().right - elm.w <= basket.getBoundingClientRect().right ))

              if (elm.y >= marketPath.getBoundingClientRect().height) {
                elm.obj.remove()
                arrElements = arrElements.filter( obj => obj.id !== elm.id);
              }
             if ((case1 &&  case2)) {
                if(initScore >= 0) { 
                    initScore = initScore - elm.price 
                }
                                 
                 document.getElementById('score').innerHTML = initScore
                 elm.vy =- elm.vy; 
                 elm.obj.remove()
                 arrElements = arrElements.filter( obj => obj.id !== elm.id);
             }
         // elm.vy =- elm.vy; 
         elm.y += elm.vy;
         elm.obj.style.top = elm.y+"px"
        }
    )
}else {
    document.getElementById('score').innerHTML = 0
    clearInterval(generationInterv)
    clearInterval(movingInterv)
}
}, 10);





document.addEventListener("visibilitychange", function() {
if (document.hidden) {
    clearInterval(generationInterv)
    clearInterval(movingInterv)
}else {
    location.reload();
}
});
// using observable on
//     const targetNode = document.body;

//     // Options for the observer (which mutations to observe)
// const config = { attributes: true, childList: true, subtree: true };
// // Callback function to execute when mutations are observed
// const callback = function(mutationsList, observer) {
// // Use traditional 'for loops' for IE 11
// for(const mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//         console.log('A child node has been added or removed.');
//     }
//     else if (mutation.type === 'attributes') {
//         console.log('A ' + mutation.attributeName + ' attribute was modified.');
//     }
// }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);

    function runGame(newProduct) {
      
       var case2 = (newProduct.y + newProduct.h >= basket.getBoundingClientRect().top)
       var case1 = ((newProduct.obj.getBoundingClientRect().left + newProduct.w >= (basket.getBoundingClientRect().left)) && (newProduct.obj.getBoundingClientRect().right - newProduct.w <= basket.getBoundingClientRect().right ))
        if ((case1 &&  case2)) {
            // newProduct.vy =- newProduct.vy; 
            console.log(newProduct.price)
            newProduct.obj.remove()
        }
       
        newProduct.y += newProduct.vy;
        // newProduct.obj.style = `top:${newProduct.y+"px"}`
   
    }
    // get elements width
    function getElmWidth(elm) {
        return elm.getBoundingClientRect().width
    }

    // desktop basket moves 
    function desktopMoves () {
        document.addEventListener('mousemove',(e) => {
            
            var leftlimit = (e.x -basketWidth/2 ) > leftSideWidth
            var rightLimit = (e.x + basketWidth/2) < (window.innerWidth - rightSideWidth)
            // move the basket according to anchor
            if(leftlimit && rightLimit) {
                basket.style.left = (e.x - (leftSideWidth + basketWidth/2)) + 'px'
                basket.style.top = (e.y + 'px')
            }

            // when enter left or right side stick it to this corner
            if(e.target == leftSide) {
                basket.style.left = 0
            }
            if ((e.target == rightSide)) {
                basket.style.left = (window.innerWidth - (rightSideWidth*2) - basketWidth) + 'px'
            }
            // ---------------------------
        })
    }

    // mobile basket moves
    function mobileMoves() {
        if(window.innerWidth < 575) {
            document.addEventListener('touchmove',function(e){
                var touch = e.touches[0] || e.changedTouches[0];
                var getCurrentTargetElm = document.elementFromPoint(touch.clientX,touch.clientY)
                var leftlimit = (touch.pageX -basketWidth/2 ) > leftSideWidth
                var rightLimit = (touch.pageX + basketWidth/2) < (window.innerWidth - rightSideWidth)
                // move the basket according to anchor
                if(leftlimit && rightLimit) {
                    basket.style.top = (touch.pageY + 'px')
                    basket.style.left = (touch.pageX - (leftSideWidth + basketWidth/2)) + 'px'
                    
                }
        
                // when enter left or right side stick it to this corner
                if(getCurrentTargetElm == leftSide) {
                    
                    basket.style.left = 0
                }
                if ((getCurrentTargetElm == rightSide)) {
                    console.log(window.innerWidth)
                    basket.style.left = (window.innerWidth - (rightSideWidth*2) - basketWidth) + 'px'
                }
                // ---------------------------
            });
        }
    }

  


    

      
    desktopMoves();
    mobileMoves();
   
    
 
 };
 const trigger =  document.getElementById('gameTrigger')


 trigger.addEventListener('click',() => {
    
     const layer = document.getElementById('gameOption')
     console.log(layer)
     layer.classList.add('remove')
     gameOn()
 })
 