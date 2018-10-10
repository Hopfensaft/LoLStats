var API_KEY = "?api_key=RGAPI-30a8839d-4a82-4da4-b8ea-be5dda87736a";
var summoner_id = "32499748";
var url = "https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + summoner_id + API_KEY;
var apibtn = document.querySelector("#api_call");
var display = document.querySelector("#quote");

console.log(url);
apibtn.addEventListener("click", function(){
   axios.get(url)
   .then(function(data){
       console.log(data);
       display.innerText = data["data"];
   })
   .catch(function(){
       alert("No live game!");
   })
});