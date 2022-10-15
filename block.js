if(window.location.hostname){
  getValue((WebsitesObj)=>{
   var websitesArr = WebsitesObj.websites;
   
   websitesArr.forEach((arr,index)=>{
    //alert(window.location.hostname)
    if(window.location.hostname == arr){
      //alert(window.location.hostname)
      //alert(arr)
      document.body.innerHTML = `<h1>You truly know why you blocked this website for 1 hour</h1>`;
      document.head.innerHTML = `{background: white}`
    }
   })
    
  })
}


function getValue(callback) {
  chrome.storage.sync.get("websites", callback);
}