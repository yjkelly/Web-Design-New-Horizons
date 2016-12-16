// The following code is to load the products and write them into the store section of the page
window.onload = function loadProducts() {
    var allProducts = [{
        "name": "Coleman 2 person tent",
        "price": "50",
        "image": "img/store/coleman-2-person-tent.jpg",
        "category": "tent",
    }, {
        "name": "Coleman 3 person tent",
        "price": "80",
        "image": "img/store/coleman-3-person-tent.jpg",
        "category": "tent",
    }, {
        "name": "Coleman 4 person tent",
        "price": "100",
        "image": "img/store/coleman-4-person-tent.jpg",
        "category": "tent",
    }, {
        "name": "Coleman 8 person tent",
        "price": "200",
        "image": "img/store/coleman-8-person-tent.jpg",
        "category": "tent",
    }, {
        "name": "Yodo 2 person tent",
        "price": "40",
        "image": "img/store/yodo-2-person-tent.jpg",
        "category": "tent",
    }, {
        "name": "Berghaus Hiking Boots",
        "price": "100",
        "image": "img/store/berghaus-boots.jpg",
        "category": "boots",
    }, {
        "name": "Hi-Tec Hiking Boots",
        "price": "70",
        "image": "img/store/hi-tec-boots.jpg",
        "category": "boots",
    }, {
        "name": "Karrimor Hiking Boots",
        "price": "50",
        "image": "img/store/karrimor-boots.jpg",
        "category": "boots",
    }, {
        "name": "Regatta Hiking Boots",
        "price": "85",
        "image": "img/store/regatta-boots.jpg",
        "category": "boots",
    }, {
        "name": "CampTeck Hiking Sticks",
        "price": "20",
        "image": "img/store/campteck-sticks.jpg",
        "category": "sticks",
    }, {
        "name": "Mountaintop Hiking Sticks",
        "price": "30",
        "image": "img/store/mountaintop-sticks.jpg",
        "category": "sticks",
    }, {
        "name": "Trekrite Hiking Sticks",
        "price": "15",
        "image": "img/store/trekrite-sticks.jpg",
        "category": "sticks",
    }, {
        "name": "EGOZ Sleeping Bag",
        "price": "20",
        "image": "img/store/egoz-bag.jpg",
        "category": "sleeping-bag",
    }, {
        "name": "Kingcamp Sleeping Bag",
        "price": "30",
        "image": "img/store/kingcamp-bag.jpg",
        "category": "sleeping-bag",
    }, {
        "name": "Milestone Sleeping Bag",
        "price": "40",
        "image": "img/store/milestone-bag.jpg",
        "category": "sleeping-bag",
    }, ];
    var qtycounter = 0;
    for (var p in allProducts) {
        qtycounter++;
        var newElement = document.createElement('div');
        newElement.id = allProducts[p].name;
        newElement.className = "storeitem";
        newElement.innerHTML = ('<img class="itemphoto" src="') + allProducts[p].image + ('" alt="') + allProducts[p].name + ('"/><h3>') + allProducts[p].name + ('</h3><h4>&euro;') + allProducts[p].price + ('</h4> <form class="add-to-cart" action="store.html" method="post"> <div>') + ('<label for="qty-') + qtycounter + ('">Quantity</label> <input type="number" name="qty-') + qtycounter + ('" id="qty-') + qtycounter + ('" class="qty" value="1" /> ') + ('<input type="button" value="Add to cart" onclick="AddtoCart(\'') + allProducts[p].name + ('\',') + allProducts[p].price + (',(document.getElementById(\'qty-') + qtycounter + ('\').value))" class="btn"/></div> </form>');
        document.getElementById('store').appendChild(newElement);
    }

};

// Shopping cart code originally found at https://stackoverflow.com/questions/16293977/creating-a-shopping-cart-using-only-html-javascript
// We modified it considerably to deal with quantity and to be able to empty the cart as well as clear individual items

//create array that will hold all ordered products
var shoppingCart = [];

//this function displays content of our shopping cart
function displayShoppingCart() {
    var orderedProductsTblBody = document.getElementById("orderedProductsTblBody");
    //ensure we delete all previously added rows from ordered products table
    while (orderedProductsTblBody.rows.length > 0) {
        orderedProductsTblBody.deleteRow(0);
    }

    //variable to hold total price of shopping cart
    var cart_total_price = 0;
    //iterate over array of objects
    for (var product in shoppingCart) {
        if (!isNaN(shoppingCart[product].Qty)) {
            //add new row
            var row = orderedProductsTblBody.insertRow();
            //create three cells for product properties
            var cellName = row.insertCell(0);
            var cellQty = row.insertCell(1);
            var cellPrice = row.insertCell(2);
            var cellDelete = row.insertCell(3);
            cellPrice.align = "right";
            //fill cells with values from current product object of our array
            cellName.innerHTML = shoppingCart[product].Name;
            cellQty.innerHTML = shoppingCart[product].Qty;
            cellPrice.innerHTML = shoppingCart[product].Price * shoppingCart[product].Qty;
            cellDelete.innerHTML = "<div id='deleteproduct' onclick='deleteItem(" + product + ")'>X</div>";
            cart_total_price += shoppingCart[product].Price * shoppingCart[product].Qty;
        }
    }
    //fill total cost of our shopping cart
    document.getElementById("cart_total").innerHTML = cart_total_price;
}


function AddtoCart(name, price, qty) {
    //Below we create JavaScript Object that will hold three properties: Name,Price, and Qty
    var singleProduct = {};
    //Fill the product object with data
    singleProduct.Name = name;
    singleProduct.Price = price;
    singleProduct.Qty = qty;
    //Add newly created product to our shopping cart
    shoppingCart.push(singleProduct);
    //call display function to show on screen
    displayShoppingCart();

    //update reciept table

    var storeprice = $('#shop-price').text();
    var newprice = (price * parseInt(qty)) + parseInt(storeprice);
    $('#shop-price').text(newprice);
    setCookie('shop-price', newprice);
    var oldTotal = $('#tPrice').text();
    var nPrice = parseInt(oldTotal) - parseInt(storeprice);
    $('#tPrice').text(nPrice + newprice);
}



// We added this code to remove items from the cart or to empty cart

function EmptyCart() {
    shoppingCart = [];
    displayShoppingCart();

    //update reciept
    var oldPrice = $('#shop-price').text();
    $('#shop-price').text(0);
    setCookie('shop-price', 0);
    var oldTotal = $('#tPrice').text();
    var newTotal = parseInt(oldTotal) - parseInt(oldPrice);
    $('#tPrice').text(newTotal);
}

function deleteItem(itemno) {

    var itemRemoved = shoppingCart[itemno];
    shoppingCart[itemno] = [];
    displayShoppingCart();

    //update reciept
    var removePrice = parseInt(itemRemoved['Price']) * parseInt(itemRemoved['Qty']);
    var oldPrice = $('#shop-price').text();
    var newprice = parseInt(oldPrice) - removePrice;
    $('#shop-price').text(newprice);
    var oldTotal = $('#tPrice').text();
    var newTotal = parseInt(oldTotal) - removePrice;
    $('#tPrice').text(newTotal);
}