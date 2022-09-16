//
//
//
//
//1:39:01

let title = document.getElementById("title"),
  price = document.getElementById("price"),
  tex = document.getElementById("tex"),
  ads = document.getElementById("ads"),
  dic = document.getElementById("dic"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  search = document.getElementById("search"),
  btnCreate = document.getElementById("create"),
  btnSearchCategory = document.getElementById("btn-search-category"),
  btnSearchTitle = document.getElementById("btn-search-title");

let tmp = "";
let mood = "create";

// ################################# Total of price
function getTotal() {
  let blockTotal = [price, tex, dic, ads];
  total.innerHTML = "00";
  blockTotal.forEach((element) => {
    element.addEventListener("keyup", function () {
      // Start check on values
      if ((price.value, tex.value, ads.value, dic.value !== "")) {
        total.innerHTML = +price.value + +tex.value + +ads.value - +dic.value;
        total.style.background = "#040";
      } else {
        total.style.background = "blue";
      }
      // Start check on values
    });
  });
}
getTotal();
// ################################## Create one product
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

btnCreate.addEventListener("click", function () {
  if (
    title.value &&
    price.value &&
    tex.value &&
    ads.value &&
    dic.value &&
    count.value &&
    category.value &&
    total.innerHTML !== ""
  ) {
    let newPro = {
      title: title.value,
      price: price.value,
      tex: tex.value,
      ads: ads.value,
      dic: dic.value,
      count: count.value,
      category: category.value,
      total: total.innerHTML,
    };

    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      showData();
      mood = "create";
      count.style.display = "block";
      btnCreate.textContent = "cteate";
    }

    localStorage.setItem("product", JSON.stringify(dataPro));
    clearData();
    showData();
  } else {
    console.log("empty data");
  }
});

// ################################## Clear inputs data

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  tex.value = "";
  dic.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

let btnRest = document.getElementById("rest");
btnRest.onclick = function () {
  clearData();
  // localStorage.clear();
};

// ################################## Read data SHow data of product in screen

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table = dataPro[i];
    document.getElementById("tbody").innerHTML += `
            <tr> 
              <td>${i}</td>
              <td>${table.title} </td>
              <td>${table.price}</td>
              <td>${table.tex}</td>
              <td>${table.ads}</td>
              <td>${table.dic}</td>
              <td>${table.total}</td>
              <td>${table.category} </td>
              <td> <button class="update" id="update" data-update="${i}">update  </button> </td>
              <td> <button class="del" id="del" data-serial="${i}">del  </button> </td>
            </tr>
    `;
  }
}
showData();
// ################################## Delete one products

let btnsDel = document.querySelectorAll("#del");

btnsDel.forEach(function (e) {
  e.addEventListener("click", function () {
    let serialProDelBtn = e.getAttribute("data-serial");
    dataPro.splice(serialProDelBtn, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
  });
});

// ################################## Delete All products
if (dataPro.length > 0) {
  let deleteAll = document.getElementById("deleteAll");
  deleteAll.innerHTML = `<button class="btnDel" id="btnDeleteAll">delete All ${dataPro.length}</button>`;
  let btnDeleteAll = document.getElementById("btnDeleteAll");

  btnDeleteAll.onclick = () => {
    console.log("cliced on delete all");
    localStorage.clear();
    dataPro = "";
    showData();
  };
} else {
  deleteAll.innerHTML = "";
}
// ################################## Update product
let update = document.querySelectorAll("#update");

update.forEach(function (ele) {
  ele.addEventListener("click", function () {
    let updateDataCustom = ele.getAttribute("data-update");
    console.log(dataPro[updateDataCustom]);
    title.value = dataPro[updateDataCustom].title;
    price.value = dataPro[updateDataCustom].price;
    ads.value = dataPro[updateDataCustom].ads;
    tex.value = dataPro[updateDataCustom].tex;
    dic.value = dataPro[updateDataCustom].dic;
    getTotal();
    count.value = dataPro[updateDataCustom].count;
    category.value = dataPro[updateDataCustom].category;

    count.style.display = "none";
    btnCreate.textContent = "update";
    mood = "update";
    tmp = updateDataCustom;
  });
});
