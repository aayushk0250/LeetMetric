document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search");
    const userInput = document.getElementById("userInput");
    const easyProgressCircle=document.querySelector(".progressEasy.circle");
    const medProgressCircle=document.querySelector(".progressMed.circle");
    const hardProgressCircle=document.querySelector(".progressHard.circle");
    
    async function fetchUserDetails(username) {
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent="searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("unable to fetch data");
            }
            const data = await response.json();
            
            // validate user
            console.log("Logging data: ", data);
            if(data.status === `error`) alert(`User does not exist !!!`)
                // progress
                let easyProblems=data.easySolved;
                let mediumProblems=data.mediumSolved;
                let hardProblems=data.hardSolved;
                
                let easyPer=document.querySelector(".progressEasy").innerHTML=`${Math.ceil(easyProblems*100/832)}%`;
                let medPer=document.querySelector(".progressMed").innerHTML=`${Math.ceil(mediumProblems*100/1750)}%`;
                let hardPer=document.querySelector(".progressHard").innerHTML=`${Math.ceil(hardProblems*100/761)}%`;

                // cards
                easyProgressCircle.style.background = `conic-gradient(black ${easyPer}, rgb(16, 193, 0) 1%)`;
                medProgressCircle.style.background = `conic-gradient(black ${medPer}, rgb(255, 115, 0) 1%)`;
                hardProgressCircle.style.background = `conic-gradient(black ${hardPer}, rgb(255, 0, 0) 1%)`;
                document.getElementById("cards").style.display=`flex`;
                document.getElementById("easyNum").innerHTML = `${easyProblems} / 832`;
                document.getElementById("easyNum").style.color="black";
                document.getElementById("medNum").innerHTML = `${mediumProblems} / 1750`;
                document.getElementById("medNum").style.color="black";
                document.getElementById("hardNum").innerHTML = `${hardProblems} / 761`;
                document.getElementById("hardNum").style.color="black";
                
                // details
                document.querySelector(`.detail`).style.display=`flex`;
                document.getElementById(`total`).innerHTML=`Total Solved : ${data.totalSolved} / ${data.totalQuestions}`;
                document.getElementById(`rank`).innerHTML=`Ranking : ${data.ranking}`;
                
                // h4
                document.querySelector(`h4`).innerHTML=`<a id="myLink" href="https://leetcode.com/u/${username}/"> Profile</a>`;
                document.getElementById("myLink").style.display = "flex";
        }
        catch(error){

        }
        finally{
            searchButton.innerHTML="Search";
            searchButton.disabled=false;
        }
    }

    searchButton.addEventListener('click',function(){
        const username=userInput.value;
        console.log(username);
        fetchUserDetails(username);
    })
})