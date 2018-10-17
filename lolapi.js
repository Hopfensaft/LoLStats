var API_KEY = "?api_key=RGAPI-3e673f8c-5d78-4885-89c7-20fabe0026a4";
var summoner_id = "32499748";
var account_id = "36241712";
var url_live = "https://euw1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + summoner_id + API_KEY;
var url_last = "https://euw1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + account_id + API_KEY;
var url_match = "https://euw1.api.riotgames.com/lol/match/v3/matches/"
var livebtn = document.querySelector("#get_live_data");
var lastbtn = document.querySelector("#get_last_match_data");
var display = document.querySelector("#quote");

livebtn.addEventListener("click", function(){
   axios.get(url_live)
   .then(function(data){
       console.log(data);
       display.innerText = data["data"];
   })
   .catch(function(){
       alert("No live game!");
   })
});

lastbtn.addEventListener("click", function(){
   axios.get(url_last)
   .then(function(data){;
      for(var i = 0; i < 100; i++) {
         if(data["data"]["matches"][i]["queue"] === 420) {
            var match_id = data["data"]["matches"][i]["gameId"];
            break;
         }
      }
      
      axios.get(url_match + match_id + API_KEY)
      .then(function(match_data){
          // console.log(match_data);
          var team_info = match_data["data"]["teams"];
          processTeamStats(team_info);
          // $("#team_100 #first_kill").hide();
          // $("#team_200 #first_tower").hide();
      })
      .catch(function(){
          alert("Problems retrieving match data!");
      });
   })
   .catch(function(){
       alert("No valid match found!");
   })
});

function processTeamStats (team_info){
   for(var i = 0; i < 3; i++) {
         team_info[i]["win"] = (team_info[i]["win"] === "Win")
         var team_keys = Object.keys(team_info[i]);
         // console.log(team_keys);
         for(var j = 0; j < team_keys.length; j++) {
            if (team_keys[j] === "firstTower" || team_keys[j] === "firstBlood" || team_keys[j] === "firstDragon" || team_keys[j] === "win") {
              console.log(team_info[i][team_keys[j]])
              if (team_info[i][team_keys[j]]) {
               $("#team_" + team_info[i]["teamId"] + " #" + team_keys[j]).hide(); 
              }
            }
         }
   }
}