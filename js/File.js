var productName = document.getElementById("productName") ,

    productCategory = document.getElementById("productCategory") ,

    productPrice = document.getElementById("productPrice") ,
    
    searchInp = document.getElementById("search"),

    productDescription = document.getElementById("productDescription") ;


if(localStorage.getItem("productData") == null){

    var productList = [] ;
    
} else{

    var productList = JSON.parse(localStorage.getItem("productData"));
}

displayProduct();

function addProduct(){

    if( productNameValdation() == true &&
        productCategory.value != "" &&
        productPrice.value != "" &&
        productDescription.value != ""){

       var products = {

        Name : productName.value,
        Category : productCategory.value,    
        Price : productPrice.value,    
        Decription : productDescription.value        
        };        

        productList.push(products);
        
        localStorage.setItem("productData", JSON.stringify(productList));

        displayProduct();

        clearForm(); 
    }   
}

function displayProduct(){

    var trs = "";

    for (var i = 0 ; i< productList.length ; i ++){
        trs +=
         `
        <tr>
        <td>${i}</td>
        <td>${productList[i].Name}</td>
        <td>${productList[i].Category}</td>
        <td>${productList[i].Price}</td>
        <td>${productList[i].Decription}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="updateProduct(${i})" class="btn btn-dark">Update</button></td>
        </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = trs;
}

function deleteProduct(index){

    productList.splice(index,1)

    localStorage.setItem("productData", JSON.stringify(productList));

    displayProduct();
}

function search(){

    var str = "";

    for(var i = 0; i < productList.length ; i++){

        if(productList[i].Name.toLowerCase().includes(searchInp.value)){

            str += 
            `
            <tr>
            <td>${i}</td>
            <td>${productList[i].Name.toLowerCase().replace(searchInp.value,`<span style='background-color: yellow;'>${searchInp.value}</span>`)}</td>
            <td>${productList[i].Category}</td>
            <td>${productList[i].Price}</td>
            <td>${productList[i].Decription}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            <td><button class="btn btn-dark">Update</button></td>
            </tr>
            `;
        }
        
        else
        {
            
        }
    }

    document.getElementById("tbody").innerHTML = str;
}

var addBtn = document.getElementById("addProduct")
function updateProduct(index){

    productName.value = productList[index].Name;
    productCategory.value = productList[index].Category;
    productPrice.value = productList[index].Price;
    productDescription.value = productList[index].Decription;

    addBtn.innerHTML = "Update Product";

    addBtn.onclick = function(){

        productList[index].Name = productName.value;
        productList[index].Category = productCategory.value;
        productList[index].Price = productPrice.value;
        productList[index].Decription = productDescription.value;
    
        localStorage.setItem("productData", JSON.stringify(productList));

        displayProduct();

        addBtn.onclick = addProduct;
    
        addBtn.innerHTML = "Add Product";

        clearForm();
    }

}

function clearForm(){

    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
}

var alert = document.getElementById("alert");

function productNameValdation(){

    var nameRegex = /^[A-Z][a-zA-Z 0-9]{0,15}$/;
    var nameValue = productName.value;

    if(nameRegex.test(nameValue)){

        alert.classList.add("d-none")
        productName.classList.remove("is-invalid")
        productName.classList.add("is-valid")
        addBtn.removeAttribute("disabled")

        return true;
    }
    else if(productName.value == ""){

        productName.classList.remove("is-invalid")
        productName.classList.remove("is-valid")
        addBtn.removeAttribute("disabled")
        alert.classList.add("d-none")
    }
    else
    {
        alert.classList.remove("d-none")
        productName.classList.add("is-invalid")
        addBtn.setAttribute("disabled","true")

        return false;
    }
}

productName.addEventListener("keyup",productNameValdation);