document.querySelector('button.saveBtn').onclick = function(){
 var inputValue= document.querySelector('input#input').value;


 getValue((websitesObj)=>{   
 
    var websitesArr = websitesObj.websites;
  if(websitesArr != null){
    websitesArr.push(inputValue);
  
    chrome.storage.sync.set({websites:websitesArr},()=>{
      //console.log(websitesArr);
      document.querySelector('input#input').value = ''
      startTimer();
      fetchItems();
    })
  }else{
    chrome.storage.sync.set({websites:[inputValue]},()=>{
      //console.log(websitesArr);
      document.querySelector('input#input').value = ''
      startTimer();
      fetchItems();
    })
  }
 })
}


//Getting the urls which are to be blocked.
function fetchItems(){
  var websiteList = document.querySelector('ul.websiteList');
  websiteList.innerHTML = '';

  var newWebsiteList = '';
  try{
    getValue((websitesObj)=>{
    
    var websitesArr = websitesObj.websites;
    if(websitesArr != null){
      for (let i = 0; i < websitesArr.length; i++) {
        
          newWebsiteList += `
          <li data-itemIndex="${i}">
          ${websitesArr[i]}
          <div>
          <span></span>
          </div>
          </li>
          `    
        websiteList.innerHTML = newWebsiteList;
        }

    }  
    });
    
  }
  catch(e){
    console.log(e);
  }
  
}

//Setting the urls to block
function setItemsForNow(arr){
  var str = JSON.stringify(arr);
  localStorage.setItem('websites',str);
  chrome.storage.sync.set({websites:arr},()=>{
    //console.log(arr);
  })
}





//The async function disaster
function getValue(callback) {
  chrome.storage.sync.get("websites", callback);
}

function startTimer(){
  setInterval(()=>{
    chrome.storage.sync.remove('websites')
    fetchItems();
  },60000*60)
}
fetchItems();
