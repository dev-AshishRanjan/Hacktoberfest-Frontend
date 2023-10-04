let id = 0;
var answer;
var score =0;
var count = 1;
var maxTurns = 10;
var done = false;
var restart = false;
function random()
{
    if(count <= maxTurns)
    {
      document.getElementById("imageContainer").innerHTML = "<img src='' alt='Image Not Found' id = 'gameImage' onerror='err()'>";
      count++;
      document.getElementById("gameImage").style.filter = "brightness(0)";   
      id = Math.floor(Math.random() * 650);
      let imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +id + ".svg";
      document.getElementById("gameImage").src = imgUrl;

      let url = "https://pokeapi.co/api/v2/pokemon/" + id;
      fetch(url)
      .then(response => response.json())
      .then(data => {displayData(data)});
      
      document.getElementById("start").disabled = false;
      document.getElementById("text").textContent = "";
      document.getElementById("start").innerText = "Next";
      document.getElementById("getAns").disabled = false;
      document.getElementById("check").disabled = false;
      document.getElementById("answer").disabled = false;
      document.getElementById("answer").value = "";
      
      if(count > maxTurns)
      {
        document.getElementById("start").innerText = "See Score";
        done=true;
      }
    }
    else{
      document.getElementById("score").innerHTML = "";
      document.getElementById("text").textContent = "";
      document.getElementById("imageContainer").innerHTML = `<font color = "#cccac4" size = 7> Your Final Score is ${score} / 10 <br> 
      <font color ='#75ea54'><b>${(score/maxTurns)*100} %</b></font></font>`
      document.getElementById("start").innerText = "Restart";
      document.getElementById("start").disabled = false;
      if(restart)
      {
        console.log("Restaring.....");
        //Restart logic here
         window.location.reload();
      }
      restart = true;
    }
  }


let displayData=(data) =>
{
  answer = capitaliseFirstLetter(data.forms[0].name);
}



let err = () =>
{
    let imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +id + ".svg";
    document.getElementById("gameImage").src = imgUrl;
}



check = () =>
{
    var playerAnwer =  document.getElementById("answer").value;
    if(checkStringDist(playerAnwer , answer) <= 3)
    {
        score++;
        document.getElementById("score").innerHTML = `<font color = "#cccac4" size = 7>Score : ${score} / 10 </font>`
        document.getElementById("check").disabled = true;
        document.getElementById("gameImage").style.filter = "brightness(1)"
        document.getElementById("text").textContent = "Correct!! It's " + answer;
        if(done)
        {
          done = false;
          document.getElementById("score").innerHTML = '';
          document.getElementById("gameImage").style.filter = "brightness(1)"
          document.getElementById("check").disabled = true;
          document.getElementById("answer").disabled = true;
          document.getElementById("getAns").disabled = true;
          document.getElementById("start").disabled = false;
          document.getElementById("start").innerText = "See Score";
          document.getElementById("answer").value = "";
        }
    }else
    {
        document.getElementById("text").textContent = "Incorrect..try again or Reveal Answer";
        document.getElementById("getAns").disabled = false;
    }
  
    
}


//Reveals answer....
revelio = () =>
{
  if(count > maxTurns)
  {
    
    document.getElementById("gameImage").style.filter = "brightness(1)"
    document.getElementById("text").textContent = "It's " + answer + "!!";
    document.getElementById("check").disabled = true;
    document.getElementById("answer").disabled = true;
    document.getElementById("getAns").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("start").innerText = "See Score";
  }
  else{
    document.getElementById("gameImage").style.filter = "brightness(1)"
    document.getElementById("text").textContent = "It's " + answer + "!!";
    document.getElementById("check").disabled = true;
    document.getElementById("answer").disabled = true;
  }
}




//For Asthetics....
capitaliseFirstLetter = (s) =>
{
    var s1 = s.replace(s.charAt(0) , s.charAt(0).toUpperCase());
    return s1;
}
  


//Levenshetein algorith to forgivspelling erors
checkStringDist = (str1 , str2) =>
{
  var matrix = [];
  for(var i = 0 ; i <= str1.length ; i++)
  {
      matrix[i] = [i];
  }
  for (var j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if(str1[i-1] == str2[j-1])
      {
          matrix[i][j] = matrix[i-1][j-1];
      }
      else{
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, // deletion
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j - 1] + 1 // substitution
          );
      }
    }
  }
  return matrix[str1.length][str2.length];
}