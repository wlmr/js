

const backendServer = "http://localhost:8080/";

const options = {
  method: 'GET'
};

async function fetchData(url) {
  //console.log("fetching from " + url);
  let response = await fetch(url, options);
  if (response.error) {
    throw new Error(response.error);
  }
  //console.log("parsing from " + url);
  let data = await response.text();
  //let data = await response.json();
  
  return JSON.parse(data);
}

export default async function buildInventory(inventory, callback) {
    /** Asynchronously fetches the inventory from the backend and adds components to
     * the inventory object.
     * 
     * 
     */
    let types = ['foundation', 'protein', 'extra', 'dressing'];
    types.forEach(typeName => 
      {
        let typeUrl = backendServer + typeName + "s";
        fetchData(typeUrl)
        .then(typeItems => 
          {
            typeItems.forEach(typeItem => 
              { 
                let itemUrl = typeUrl + "/" + typeItem
                fetchData(itemUrl).then(itemObject => 
                  {   
                    inventory[typeItem] = itemObject;
                  });
  
              });
          }).catch(function(error) {
              alert("Failed to fetch from resource.");
              return;
          });
      });
      callback();
  }