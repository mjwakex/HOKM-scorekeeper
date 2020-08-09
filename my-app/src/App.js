import React, { useState } from 'react';
import './App.css';


function App() {

    let numPlayersValue;
    const [data, setData] = useState([]);
    const [roundData, setRoundData] = useState([]);
    const [winner, setWinner] = useState([]);

    function players() {
      document.getElementById("playerPara").style.display = "none";
      document.getElementById("namePara").style.display = "block";
      var i;
      var scoreboard = [];
      
      for (i = 0; i < numPlayersValue; i++) {
        scoreboard.push({name:"",dealer:false,currentBid:0,currentScore:0,totalScore:0,totalLosses:0});
      }
      setData(scoreboard);
    }

    function handleChange(event) {
      numPlayersValue = event.target.value;
    }

    function startGame(){
      var i;
      var scoreboard = [];
  
      for (i = 0; i < data.length; i++) {
        scoreboard.push(data[i]);
        scoreboard[i].currentBid = 0;
        scoreboard[i].actualBid = 0;
        scoreboard[i].name = document.getElementById("name"+i).value;

      }
      setRoundData(scoreboard);
      setData(roundData);


      document.getElementById("resultsPara").style.display = "none";
      document.getElementById("bidPara").style.display = "block";
      document.getElementById("namePara").style.display = "none";
    }

    function nextRound() {


      document.getElementById("resultsPara").style.display = "none";
      document.getElementById("bidPara").style.display = "block";
      document.getElementById("namePara").style.display = "none";      
    }

    function setBids(){
      var i;
      var scoreboard = [];
  
      for (i = 0; i < roundData.length; i++) {
        scoreboard.push(roundData[i]);
        scoreboard[i].currentBid = 0;
        scoreboard[i].actualBid = 0;
        scoreboard[i].currentBid = document.getElementById("bid"+i).value;
        document.getElementById("bid"+i).value = "";

      }
      setRoundData(scoreboard);

      document.getElementById("bidPara").style.display = "none";
      document.getElementById("accPara").style.display = "block";
    }

    function setScore(){  
      var i;
      var scoreboard = [];
  
      for (i = 0; i < roundData.length; i++) {
        scoreboard.push(roundData[i]);
        scoreboard[i].currentScore = document.getElementById("acc"+i).value;
        document.getElementById("acc"+i).value = "";
        if(scoreboard[i].currentScore === scoreboard[i].currentBid){
          scoreboard[i].totalScore += 10 + parseInt(scoreboard[i].currentScore);
        }else{
          scoreboard[i].totalScore += parseInt(scoreboard[i].currentScore);
          scoreboard[i].totalLosses ++;
        }


      }
      setRoundData(scoreboard);

      document.getElementById("resultsPara").style.display = "block";
      document.getElementById("accPara").style.display = "none";
    }

    
    


  

  return (

    <div className="App">
      <header className="App-header">
      <h1>Tofighian Kokm</h1>
        
        <p id="playerPara">
          How many players??
          <br/>
          <input type="number" id="numPlayers" value={numPlayersValue} onChange={handleChange} />
          <br/>
          <input type="submit" value="Submit"  onClick={players} />
        </p>

        <div id="namePara">
        Enter names starting with dealer
        <br/>
        {data.map((row, i) =>
              <p key={i}>
                <input type="text" id={'name'+ i}/>
              </p>
            )}
            <input type="submit" value="Next" onClick={startGame} />
        </div>

        <div id="bidPara">
        Enter ammount of bids
        <br/>
        {roundData.map((row, i) =>
              <p key={i}>
                {row.name} ... <input type="number" id={'bid'+ i}/>
              </p>
            )}
            <input type="submit" value="Next" onClick={setBids} />
        </div>

         <div id="accPara">
        Enter ammount of hands won
        <br/>
        {roundData.map((row, i) =>
              <p key={i}>
                {row.name} ; placed bid: ({row.currentBid})... <input type="number" id={'acc'+ i}/>
              </p>
            )}
            <input type="submit" value="Next" onClick={setScore} />
        </div>

         <div id="resultsPara">
        <br/>
        <table>
          <thead>
            <td>Name</td>
            <td>Score</td>
            <td>Losses</td>
          </thead>
        {roundData.map((row, i) =>
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.totalScore}</td>
                <td>{row.totalLosses}</td>
              </tr>
            )}
        </table>
            <input type="submit" value="New round" onClick={nextRound} />
            <input type="submit" value="End"/>
        </div>


        <div id="endPara">
        Thanks for playing
        <br/>
        Congratulations {winner.name}!!
        </div>


        





      </header>
    </div>
  );
}

export default App;
