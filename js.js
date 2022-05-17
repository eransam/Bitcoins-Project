const oneCoin =  "https://api.coingecko.com/api/v3/coins/";
const allCoins = "https://api.coingecko.com/api/v3/coins/list/";
 const theMainDiv = document.getElementById("mainDiv")
 let theAllCoins = [];
let the100Coins = [];
let theClickedCoins = [];
let theCoinsThatClicked = [];

//------------------------------פונקציה בהטענת הדף-------------------------------
 //functions on load//
 $(async function () {
  theAllCoins = JSON.parse(localStorage.getItem("coins"));
   //console.log(theAllCoins);
   if (!theAllCoins || theAllCoins.lenght <= 0) {
         console.log("in");
         theAllCoins = await getJSON(allCoins);
     //adding field to coin
     theAllCoins = theAllCoins.map((coin) => ({
       ...coin, //All existing fields
       clicked: false, //The field added
     }));
     theAllCoins = theAllCoins.map((coin) => ({
        ...coin, //All existing fields
        dataid: coin.id, //The field added
      }));
     localStorage.setItem("coins", JSON.stringify(theAllCoins)); //local storage
   }
    theAllCoins.forEach((user, idx) => {
    if (idx<100) {
        the100Coins.push(user);
        //console.log(the100Coins);
 tmepi(user);      
  }
})
  });
 //-------------סיום פונקציה האון לואוד------------------------------------------






 //------------פונקציה אשר מדווחת איזה מטבע הוקלק------------------------------------------
function changeClicked(id) {


        const splitToFaindTheIdOfTheObj = id.split('  ');
        const TheIdOfTheArry = splitToFaindTheIdOfTheObj[1];
    
        let theObj;
        the100Coins.forEach((coin)=> {
            if (coin.id === TheIdOfTheArry) {
                theObj = coin
            }
        })
        
        theObj.clicked = !theObj.clicked;
        console.log(theObj.clicked);

   
    theCoinsThatClicked = [];
    the100Coins.forEach((data)=>{
        if (data.clicked === true) {
            theCoinsThatClicked.push(data);
        }
    })
    console.log(theCoinsThatClicked);
    if (theCoinsThatClicked.length > 5) {
        alert(theCoinsThatClicked.length);
    
        if (theMainDiv.children.length>=1) {
            let theMainDivChildren = theMainDiv.children;
           $(theMainDivChildren).remove()
        }
        $(theMainDiv).append($(`<br><center><button id="Deselect" onclick="displayAgain5Coins()">Deselect</button></center>`));
         $(theMainDiv).append("<h3>Select one of the currencies you want to remove so that the selection of the sixth currency will converge, after u select please click on the Deselect button on the top</h3>");

         $(theMainDiv).append($(`</br>`))
        theCoinsThatClicked.forEach((data)=>{tmepi(data)});

    }
};
 //-------------סיום פונקציה אשר מדווחת איזה מטבע הוקלק------------------------------------------








 
 //------------- פונקציה אשר מציגה 5 מטבעות------------------------------------------
    function displayAgain5Coins(){    
    if (theMainDiv.children.length>=1) {
        let theMainDivChildren = theMainDiv.children;
       $(theMainDivChildren).remove()
    }
    theCoinsThatClicked.forEach((data)=>{tmepi(data)});
};
 //------------סיום פונקציה אשר מציגה 5 מטבעות------------------------------------------








 //----------------פונקציה של הכפתור -לחץ למטבעות ניבחרים--------------------------------
$("#showTheChoseCoints").click(function(){

    
        if (theMainDiv.children.length>=1) {
            let theMainDivChildren = theMainDiv.children;
           $(theMainDivChildren).remove()
        }
        theCoinsThatClicked.forEach((data)=>{tmepi(data)});

});
 //---------------סיום פונקציה של הכפתור -לחץ למטבעות ניבחרים--------------------------------








 //---------------פונקציית התבנית-------------------------------------------------------------
 function tmepi(user) {
  $(`
  <div class='coin'>
  <label class="switch">
  <input type="checkbox" onclick="changeClicked(this.id)" id= "checkbox  ${user.id}" >
  <span class="slider round"></span>
</label>
  <label class="custom-control-label" for="${user.name}"></label>
  <div>
  name: <b>${user.name}</b>
  </div>
  <div>
  id: <b>${user.id}</b>
  </div>
  <div>
  symbol: <b>${user.symbol}</b>
  </div>
  <br>
  <button class="btn-more-info" data-coin-id="${user.id}">More Info</button>
  <div id="${user.id}" class="more-info"></div>
  </div>
  <br>
  `).appendTo('#mainDiv')
   
 }
 //--------------- סיום פונקציית התבנית-----------------------------------------------------









//-------------- הצג - כפתור ראשי----------------------
$("#mainButton").click(  function(){


  const select = document.getElementById("select").value;
  console.log(select);


 if (select === "liveReports") {
   if (theMainDiv.children.length>=1) {
       let theMainDivChildren = theMainDiv.children;
      $(theMainDivChildren).remove()
   }

  let newDiv1 = document.createElement("div");
  newDiv1.innerText="How does a crypto work?/n Most cryptocurrencies are based on blockchain technology, a networking protocol through which computers can work together to keep a shared, tamper-proof record of transactions. The challenge in a blockchain network is in making sure that all participants can agree on the correct copy of the historical ledger.";
  $(theMainDiv).append(newDiv1);
  }

  if (select === "report") {
    if (theMainDiv.children.length>=1) {
        let theMainDivChildren = theMainDiv.children;
       $(theMainDivChildren).remove()
    }
 
   let newDiv1 = document.createElement("div");
   newDiv1.innerText="report";
    $(theMainDiv).append(newDiv1);
   }


  if (select === "coins") {

    if (theMainDiv.children.length>=1) {
      let theMainDivChildren = theMainDiv.children;
     $(theMainDivChildren).remove()
    }
    let newDiv1 = document.createElement("div");
    newDiv1.setAttribute("id", "Div1");
    if (theMainDiv.firstChild!=null) {
     $.ajax({
        url: allCoins,
        type: 'GET',
        success: function(res) {
        }
    }).then((data) => {
        console.log(data)
    
       data.forEach((user, idx) => {
            if (idx<100) {
         tmepi(user);      
          }
        })
        return data;
    }).append(newDiv1);
     }
    else{

      $.ajax({
        url: allCoins,
        type: 'GET',
        success: function(res) {
        }
    }).then((data) => {
        console.log(data)
    
       data.forEach((user, idx) => {
            if (idx<100) {
         tmepi(user);      
          }
        })
        return data;
    }).append(newDiv1);

    }

}

//--------------פונקציה שבודקת האם ניבחרו יותר מ5 מטבעות------------------
if (theCoinsThatClicked.length > 5) {
    alert(theCoinsThatClicked.length);

    if (theMainDiv.children.length>=1) {
        let theMainDivChildren = theMainDiv.children;
       $(theMainDivChildren).remove()
    }
     $(theMainDiv).append("<h3>Select one of the currencies you want to remove so that the selection of the sixth currency will converge</h3>");
        // $(`</br>`);
        
    theCoinsThatClicked.forEach((data)=>{tmepi(data)});

    $(theMainDiv).append($(`<br><br><div class="Deselect"><button id="Deselect" class="Deselect" onclick="displayAgain5Coins()">Deselect</button></div>`));
}
//-------------סיום פונקציה שבודקת האם ניבחרו יותר מ5 מטבעות----------------






//--------------מראה תוצאות חיפוש בעת כתיבת ערך החיפוש----------------
    $("input[type='search']").keyup(function () {
      const text = $(this).val();
      showSearch(text);
  });
//-------------- סיום מראה תוצאות חיפוש בעת כתיבת ערך החיפוש----------------
  







//--------------בקשת משיכה של כל המטבעות--------------------------------------
  $.ajax({
    url: allCoins,
    type: 'GET',
    success: function(res) {
        console.log(res);
    }
}).then((data) => {
    console.log(data)

    data.forEach((user, idx) => {
        if (idx<100) {
          
        
          $(`
          <div class='coin'>
          <div class='user'>
          name: <b>${user.name}</b>
          </div>
          <div class='user'>
          id: <b>${user.id}</b>
          </div>
          <div class='user'>
          symbol: <b>${user.symbol}</b>
          <br>
          <button class="btn-more-info" data-coin-id="${user.id}">More Info</button>
          <div id="${user.id}" class="more-info"></div>
          </div>
          </div>
          `).appendTo('#Div1')
      }
    })
})
//-------------------------סיום בקשת משיכה של כל המטבעות-------------------------------------

}
);
//------------------------------סיום כפתור ראשי------------------------------------------------







//-------------מראה תוצאות חיפוש בעת כתיבת ערך החיפוש----------------

function showSearch(text) {
  const foundCoins = coins.filter(c => c.symbol.toLowerCase().includes(text.toLowerCase()));
  displayCoins(foundCoins);
}
//-------------סיום מראה תוצאות חיפוש בעת כתיבת ערך החיפוש----------






//--------------כפתור מחיקה----------------
$("#removeButton").click(function(){
    theAllCoins = theAllCoins.map((coin) => ({
        ...coin, //All existing fields
        clicked: false, //The field added
      }));
      the100Coins = the100Coins.map((coin) => ({
        ...coin, //All existing fields
        clicked: false, //The field added
      }));
      the100Coins
theCoinsThatClicked = [];
const eranosh = theMainDiv.children;
$(eranosh).remove()
theAllCoins.forEach((user, idx) => {
    if (idx<100) {
        the100Coins.push(user);
        //console.log(the100Coins);
 tmepi(user);      
  }
})

});
//---------סיום כפתור מחיקה---------------








//--------------מושך כתובת איפיאי ומחזיר את הערך שלה----------------

function getJSON(url) {
  return new Promise((resolve, reject) => {
      $.ajax({
          method: "GET",
          url: url,
          success: data => {
              resolve(data);
          },
          error: err => {
              reject(err);
          }
      });
  });
}
//-----------סיום מושך כתובת איפיאי ומחזיר את הערך שלה-----------------------










//--------------------כפתור לעוד מידע ---------------------------

$("#mainDiv").on("click", ".coin > button", function () {
  const coinId = $(this).attr("data-coin-id");
  getJSON(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  .then((data)=>
  {
    const display = $(`#${coinId}`).css("display");
  if (display === "none") {
      $(`#${coinId}`).slideDown(500);    
    $(`#${data.id}`).html(`
    <span>${data.market_data.current_price.usd} $</span>
    <br>
    <span>${data.market_data.current_price.eur} €</span>
    <br>
    <span>${data.market_data.current_price.ils} ₪</span>
    <br>
    <span><img src="${data.image.small}"></span>
    
    
`);

 }
 else {
  $(`#${coinId}`).slideUp(500);
}


})

});
//----------------------------------------------------------------------









  function search(coins) {

    //משתנה עם הערך שהזין המשתמש
    const searchValue = $("#searchInput").val().toLowerCase();
  
    //אנימצית טעינה 
    //$("#throbber").show();
  
    //if coins array not empty- ? , filter- return array//
    let coinsResult = coins?.filter(
      (coin) =>
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    //אנימצית טעינה
    //$("#throbber").hide();
  
    //if the input search is invalid: numbers/invalid character/empty/coin doesn't found
    if (!isNaN(searchValue) || !searchValue || coinsResult?.length === 0) {
    $(theMainDiv).empty();
      $(theMainDiv).html("");
      $(theMainDiv).append(
        `<div class="numericSearch"> Search input is invalid/not found,<br>
         please enter coin id/name/symbol </div>`
      );
    } else {
      $(theMainDiv).empty();
      console.log(coinsResult);
      coinsResult.forEach((user)=>{tmepi(user);})
    }
  }


  //print cards to page
function printCards(coins) {
  $(theMainDiv).empty();
	$(theMainDiv).html("");
	if (coins) {
		for (let coin of coins) {
			$(theMainDiv).append(`
    <div class="card coinCard" style="width: 210px;">
    <div class="card-header">
    <h5 class="card-title">${coin.symbol}</h5>
  
	
    <div class="custom-control custom-switch">
    <input onclick="toggle(this)" id="${
			coin.id
		}" type="checkbox" class="custom-control-input toggler-input" ${
				coin.checked ? "checked" : "unchecked"
			} />
    <label class="custom-control-label" for="${coin.name}"></label>
    </div>

    </div>
    <div class="card-body">
    <p class="card-text">${coin.name}</p>
    <p>
    <button
    class="btn btn-success moreInfoBtn"
    id="${coin.id}"
    onclick="handleMoreInfo(this)" 
    type="button"
    data-toggle="collapse"
    data-target="#coll${coin.symbol}"
    aria-expanded="false"
    aria-controls="coll${coin.symbol}"
    >
    More Info
    </button>
    <div class="collapse" id="coll${coin.symbol}">
    <div class=" spinner-border spinner-border-sm text-text-secondary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
    </div>
    </div>
    </div>
    </p>
    `);
		}
	}
}
console.log(allCoins);
 //search btn


$.ajax({
  url: allCoins,
  type: 'GET',
  success: function(res) {
    //console.log(res);
      return(res);
      
  }
}).then((data)=>{$("#searchBtn").on("click", () => {search(data)});})
;

