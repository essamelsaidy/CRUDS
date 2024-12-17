var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCatigory = document.getElementById("productCatigory");
var productDisc = document.getElementById("productDisc");
var productImage = document.getElementById("productImage");
var saerchInput = document.getElementById("search");
var addBtn = document.getElementById("add");
var updateBtn = document.getElementById("update");
var myindex;
var productList;

if (localStorage.getItem("products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("products"));
  display(productList);
}

function addProduct() {
  if (
    productName.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid") &&
    productCatigory.classList.contains("is-valid") &&
    productDisc.classList.contains("is-valid")
  ) {
    var product = {
      Name: productName.value,
      Price: productPrice.value,
      Catigory: productCatigory.value,
      Disc: productDisc.value,
      img: `imgs/${productImage.files[0]?.name}`,
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    display(productList);
    clear();
  } else {
    alert("data is not valid");
  }
}

function display(arr) {
  var cartona = "";

  for (var i = 0; i < arr.length; i++) {
    cartona += `
 <div class="col-md-3">
      <div class="item">
        <div class="card shadow">
          <img src="${arr[i].img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${arr[i].Name}</h5>
            <p class="card-text">${arr[i].Disc}</p>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">${arr[i].Catigory}</li>
            <li class="list-group-item">${arr[i].Price} $</li>
      
          </ul>
         <button onclick="deleteProduct(${i})" class="btn btn-outline-danger mb-1 w-100"> Delet <i class="fa-solid fa-trash"></i> </button>
         <button onclick="edit(${i})" class="btn btn-outline-warning w-100"> Edit <i class="fa-solid fa-pen"></i></button>

        </div>
      </div>
    </div>
   `;
  }

  document.getElementById("myRow").innerHTML = cartona;
}

function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  display(productList);
  localStorage.setItem("products", JSON.stringify(productList));
}
function search() {
  var word = saerchInput.value;
  var searchedProduct = [];

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].Name.toLowerCase().includes(word.toLowerCase())) {
      searchedProduct.push(productList[i]);
    }
  }
  if (searchedProduct == "") {
    document.getElementById(
      "myRow"
    ).innerHTML = `<h2 class="rounded-3 w-50 fs-3 m-auto mt-5 bg-danger p-3 text-white text-center fw-bold"> No Data To Show </h2`;
  } else {
    display(searchedProduct);
  }
}

function clear() {
  productName.value = null;
  productPrice.value = null;
  productCatigory.value = null;
  productDisc.value = null;
}

function edit(index) {
  myindex = index;
  productName.value = productList[index].Name;
  productPrice.value = productList[index].Price;
  productCatigory.value = productList[index].Catigory;
  productDisc.value = productList[index].Disc;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

  productName.classList.add("is-valid");
  productPrice.classList.add("is-valid");
  productCatigory.classList.add("is-valid");
  productDisc.classList.add("is-valid");
}
function update() {
  if (
    productName.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid") &&
    productCatigory.classList.contains("is-valid") &&
    productDisc.classList.contains("is-valid")
  ) {
    productList[myindex].Name = productName.value;
    productList[myindex].Price = productPrice.value;
    productList[myindex].Catigory = productCatigory.value;
    productList[myindex].Disc = productDisc.value;
    localStorage.setItem("products", JSON.stringify(productList));
    display(productList);
    console.log(myindex);
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    clear();
  } else {
    alert("not valid");
  }
}

function validInputs(element) {
  var regex = {
    productName: /^[A-Z][a-z]{1,10}$/,
    productPrice: /^[1-9][0-9]{1,5}$/,
    productCatigory: /^(mopile|screen|tv|labtop)$/i,
    productDisc: /^\w{3,}$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
