

const backendServer = "http://localhost:8080/";

async function fetchData(url) {
let response = await fetch(url);
return response;
}


async function getIngredients(topic) {

    async function getIngredientData(topicName, ingredientName) {
    let url = backendServer + topicName + "s/" + ingredientName
    let response = await fetchData(url);
    let text = await response.json();
    return {url: url, key: ingredientName, value: text}; 
}

    let nextStep = Promise.all(topic.value.map(x => getIngredientData(topic.key, x)));
    return nextStep;
}

async function getTopics() {

    async function getTopicData(topicName) {
      let url = backendServer + topicName + "s";
      let response = await fetchData(url);
      let text = await response.json();
      return {url: url, key: topicName, value: text};
    }

    let topics = ['protein', 'extra', 'dressing', 'foundation'];
    let allt = await Promise.all(topics.map(x => getTopicData(x)));
    let nextstep = await Promise.all(allt.map(x => getIngredients(x)));
    return [].concat.apply([], nextstep);
}

export async function getInventory() {
  let topics = await getTopics();
  let inv = topics.reduce(function(obj, itm) {
      obj[itm.key] = itm.value;
      return obj;
  }, {});
  return inv;
}


/*

let inventory = {};

getTopics().then(resultList => {
    resultList.forEach(x => {
        inventory[x.key] = x.value;
    });
}).then(() => console.log(inventory));

*/