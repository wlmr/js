

const backendServer = "http://localhost:8080/";

const options = {
  method: 'GET'
};

async function fetchData(url) {
  let response = await fetch(url, options);
  if (response.error) {
    throw new Error(response.error);
  }
  let data = await response.text();
  return JSON.parse(data);
}

export default async function buildInventory(inventoryObj, postFetch) {
    /** Asynchronously fetches the inventory from the backend and adds components to
     * the inventory object. At the end, calls the function "postFetch". This is a workaround,
     * Since we do not want users to be able to show the ComposeSaladModal before the inventory
     * has been created. PostFetch is supposed to set the state of the calling scope, in a manner
     * which shows that this process has been completed and that the inventory may now be used.
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
                    console.log("Setting inventory item");
                      
                    inventoryObj[typeItem] = itemObject;
                  });
              });
          }).catch(function(error) {
              alert("Failed to fetch from resource.");
              return;
          });
      });
      postFetch();
  }