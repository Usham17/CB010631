// card
let cardIcon = document.querySelector("#card-icon");
let card = document.querySelector(".card");
let closeCard = document.querySelector("#close-card");
//open Card
cardIcon.addEventListener ("click", () => {
    card.classList.add("active");
});
//close Card
closeCard.addEventListener ("click", () => {
    card.classList.remove("active");
});

//Card working JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// Making Function
function ready() {
    //Remove Items From Card
    var removeCardButtons = document.getElementsByClassName('card-remove')
    console.log(removeCardButtons)
    for(var i =0; i < removeCardButtons.length; i++){
        var button = removeCardButtons[i]
        button.addEventListener('click', removeCardItem);
    }

    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('card-quantity')
    for (var i =0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }
    //Add to Card 
    var addCard = document.getElementsByClassName('add-card')
    for (var i =0; i < addCard.length; i++) {
        var button = addCard[i];
        button.addEventListener("click", addCardClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

function buyButtonClicked(){
    alert('YOur Order Is Placed')
    var cardContent = document.getElementsByClassName('card-content')[0]
    while (cardContent.hasChildNodes()){
        cardContent.removeChild(cardContent.firstChild);
    } 
    updatetotal();
}

 //Remove Items From Card
 function removeCardItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event){
    var input = event.target 
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1; 
    }
    updatetotal();
}

//add to card
function addCardClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var tittle = shopProducts.getElementsByClassName('product-tittle')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCard(tittle, price, productImg);
    updatetotal();
}
function addProductToCard(tittle, price, productImg){
    var cardShopBox = document.createElement('div');
    cardShopBox.classList.add('card-box')
    var cardItems = document.getElementsByClassName('card-content')[0];
    var cardItemsNames = cardItems.getElementsByClassName('card-product-tittle');
    for (var i =0; i < cardItemsNames.length; i++) {
        alert("You have already add this item to card");
        return;
    }
}    


var cardBoxContent =`
                    <img src="${productImg}" alt="" class="card-img">
                    <div class="details-box">
                        <div class="card-product-tittle">${tittle}</div>
                        <div class="card-price">${price}</div>
                        <input type="number" value="1" class="card-quantity">
                    </div>
                    <!-- remove card -->
                    <i class="card-remove">Remove</i>`;

                                        

cardShopBox.innerHTML = cardBoxContent;
cardItems.append(cardShopBox);
cardShopBox
    .getElementsByClassName('card-remove')[0]
    .addEventListener("click", removeCard)
cardShopBox
    .getElementsByClassName('card-quantity')[0]
    .addEventListener("change", quantityChanged)




//update total

function updatetotal(){
    var cardContent = document.getElementsByClassName('card-content')[0];
    var cardBoxes = cardContent.getElementsByClassName('card-box');
    var total = 0;
    for (var i = 0; i < cardBoxes.length; i++){
        var cardBox = cardBoxes[i];
        var priceElement = cardBox.getElementsByClassName('card-price')[0];
        var quantityElement = cardBox.getElementsByClassName('card-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("RS", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        document.getElementsByClassName('total-price')[0].innerText = 'RS' + total;
}