
const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';

const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;
   
let eventConfig;
let playersArray;
let timeRecords;
let modalChanged;


const promiseOfEventConfig = fetch("http://localhost:8888/.netlify/functions/eventconfig?eventId=6578ad76e53c8b23971032c4")
    .then(r=>r.json())
    .then(data => {
    return data;
});

const promiseOfPlayers = fetch("http://localhost:8888/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
    .then(r=>r.json())
    .then(data => {
    return data;
});

window.onload = async () => {
    document.getElementById('divTAdvance').style.display='none';
    document.getElementById('divTOverall').style.display= 'none';
    document.getElementById('divTLadies').style.display='none';
    document.getElementById('divTOptics').style.display='none';
    document.getElementById('divTSeniors').style.display='none';

    eventConfig = await promiseOfEventConfig;
    playersArray= await promiseOfPlayers;
    
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    
    buildDivisions(eventConfig.divisions);
    modalChanged=false;

};
  
iId=1;
                timeRecords= [{'id':iId++,'shooterId':1                  ,'division':1                 , 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ,{'id':iId++,'shooterId':getRandomInt(1, 13),'division':getRandomInt(1, 4), 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
                                 ];

//    scoreCal();
  //  buildDivisions(eventConfig.divisions);
 //   buildCategory2(eventConfig,eventConfig.divisions[0].id);
//    buildPlayersTables(transformRegistrer(playersArray2), eventConfig, eventConfig.divisions[0].id);

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    
    return parseFloat(str);
    }

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

function getRandomDateTime() {
    return new Date((new Date()).getTime() - getRandomInt(4, 120)*60000);
}



function changeDivision(selectDivision){
    buildPlayersTables(transformRegistrer(playersArray), eventConfig, selectDivision.value);
    
    buildCategory2(eventConfig, selectDivision.value);
    
    if(selectDivision.value===null || selectDivision.value=='' || selectDivision.value<0||selectDivision.value<0){
        document.getElementById('btnAddShooter').disabled = true;
    }else{
        document.getElementById('btnAddShooter').disabled = false;
    }
};


function transformRegistrer(players){
    let registers = [];
    let rP= [];
    let aRow= '';
    for(i=0;i<players.length;i++){
        for(j=0;j<players[i].registered.length;j++){
            if(players[i].registered[j].score===undefined||players[i].registered[j].score===null||players[i].registered[j].score===''){
                players[i].registered[j].score=999;
                players[i].registered[j].tries=0;
            }
            aRow= {'division':players[i].registered[j].divisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries };
            rP.push(aRow);  
        }
    }

    rP= rP.sort((a, b) => {
        if (a.score < b.score) {
          return -1;
        }
      });
    return rP;
}

function buildPlayersTables(aPlayers, eventConfig, selectDivision){
    
    var row= "";
    spinner.style.visibility = 'visible'//'visible'; //'hidden'
    document.getElementById('tableAdvance').innerHTML= row;
    document.getElementById('tableOverall').innerHTML= row;
    document.getElementById('tableLadies').innerHTML= row;
    document.getElementById('tableOptics').innerHTML= row;
    document.getElementById('tableSeniors').innerHTML= row;

    let divisionIndex=-1;
    for(let i=0; i< eventConfig.divisions.length; i++){
        if(selectDivision===eventConfig.divisions[i]._id){
            divisionIndex=i;
            i= eventConfig.divisions.length;
        }
    }
    
    let actualAdvCount=0;
    let actualOverallCount=0;
    let actualLadiesCount=0;
    let actualOpticsCount=0;
    let actualSeniorsCount=0;
    let position=0;


    let table;
    let sScore;
    let sTries;

        for(let i=0; i< aPlayers.length; i++){
            
            if(aPlayers[i].division == selectDivision){
                
                if(aPlayers[i].category==cLadies){
                    
                    if(eventConfig.divisions[divisionIndex].categories.ladies){
                        
                        table= document.getElementById('tableLadies');
                        actualLadiesCount++;
                        position= actualLadiesCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position=actualAdvCount;

                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;

                    }
                }

                if(aPlayers[i].category==cSeniors){
                    if(eventConfig.divisions[divisionIndex].categories.seniors){
                        table= document.getElementById('tableSeniors');
                        actualSeniorsCount++;
                        position= actualSeniorsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++;
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position= actualAdvCount;
                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;

                    }
                }

                if(aPlayers[i].category==cOverall){
                    if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                        table= document.getElementById('tableOptics');
                        actualOpticsCount++
                        position= actualOpticsCount;
                    }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                            ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                            actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                        table= document.getElementById('tableAdvance');
                        actualAdvCount++;
                        position= actualAdvCount;

                    }else{
                        table= document.getElementById('tableOverall')
                        actualOverallCount++;
                        position=actualOverallCount;
                    }
                }

                if(aPlayers[i].score===undefined || aPlayers[i].score===null || aPlayers[i].score>100){ 
                    // aPlayers[i].score='NA';
                    sScore='NA';
                }
                else sScore= ''+aPlayers[i].score;

                if(aPlayers[i].tries===undefined||aPlayers[i].tries===null||aPlayers[i].tries<1){  
                    // aPlayers[i].tries=0;
                    sTries='';
                }
                else if(aPlayers[i].tries==1)sTries='|';
                else if(aPlayers[i].tries==2)sTries='||';
                else if(aPlayers[i].tries==3)sTries='|||';
                else sTries='|||+';

        //data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop"
                row= `<tr>
                    <td class="align-middle">${position}</td>
                    <td class="align-middle">
                    <a href="#" onClick="editShooter('${aPlayers[i].id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop">
                        ${aPlayers[i].name}
                        </a>
                    </td>
                    <td class="align-middle">${aPlayers[i].gun}</td>
                    <td class="align-middle">${sScore}</td>
                    <td class="align-middle">${sTries}</td>
                    <td class="align-middle">
                        <button onClick="timeTrack('${aPlayers[i].id}', '${aPlayers[i].name}', '${aPlayers[i].gun}', '${sScore}')" class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-stopwatch"></i></button>
                    </td>
                </tr>`;
                table.innerHTML+= row;
                // console.log(`row[${i}]=${row}`);

            }
        }
            // console.log(`BEFORE UNHIDDE SPINNER`);
            spinner.style.visibility = 'hidden'//'visible'; //'hidden'
                //)
}


function buildPlayersTablesSave(aPlayers, eventConfig, selectDivision){
    scoreCal();
    aPlayers= aPlayers.sort((a, b) => {
        if (a.score < b.score) {
          return -1;
        }
      });
    var row= "";
    
    document.getElementById('tableAdvance').innerHTML= row;
    document.getElementById('tableOverall').innerHTML= row;
    document.getElementById('tableLadies').innerHTML= row;
    document.getElementById('tableOptics').innerHTML= row;
    document.getElementById('tableSeniors').innerHTML= row;

    //find division`s propreties
    //let selectDivision= document.getElementById('selectDivision').value;
    
    let divisionIndex=-1;
    for(let i=0; i< eventConfig.divisions.length; i++){
        if(selectDivision==eventConfig.divisions[i].id){
            divisionIndex=i;
            i= eventConfig.divisions.length;
        }
    }
    let actualAdvCount=0;
    let actualOverallCount=0;
    let actualLadiesCount=0;
    let actualOpticsCount=0;
    let actualSeniorsCount=0;
    let position=0;


    let table;
    let sScore;
    let sTries;
    
    for(let i=0; i< aPlayers.length; i++){

        if(aPlayers[i].division == selectDivision){

            if(aPlayers[i].category==cLadies){
                
                if(eventConfig.divisions[divisionIndex].categories.ladies){
                    
                    table= document.getElementById('tableLadies');
                    actualLadiesCount++;
                    position= actualLadiesCount;
                }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                    table= document.getElementById('tableOptics');
                    actualOpticsCount++;
                    position= actualOpticsCount;
                }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                         ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                          actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                     table= document.getElementById('tableAdvance');
                     actualAdvCount++;
                     position=actualAdvCount;

                }else{
                    table= document.getElementById('tableOverall')
                    actualOverallCount++;
                    position=actualOverallCount;

                }
            }

            
            if(aPlayers[i].category==cSeniors){
                if(eventConfig.divisions[divisionIndex].categories.seniors){
                    table= document.getElementById('tableSeniors');
                    actualSeniorsCount++;
                    position= actualSeniorsCount;
                }else if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                    table= document.getElementById('tableOptics');
                    actualOpticsCount++;
                    position= actualOpticsCount;
                }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                         ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                          actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                     table= document.getElementById('tableAdvance');
                     actualAdvCount++;
                     position= actualAdvCount;
                }else{
                    table= document.getElementById('tableOverall')
                    actualOverallCount++;
                    position=actualOverallCount;

                }
            }

            if(aPlayers[i].category==cOverall){
                if(eventConfig.divisions[divisionIndex].categories.optics && aPlayers[i].optics ){
                    table= document.getElementById('tableOptics');
                    actualOpticsCount++
                    position= actualOpticsCount;
                }else if(eventConfig.divisions[divisionIndex].categories.advance &&
                         ((aPlayers[i].score<100&&aPlayers[i].score<=eventConfig.divisions[divisionIndex].advanceLimit.passingScore) ||
                          actualAdvCount< eventConfig.divisions[divisionIndex].advanceLimit.topBestOf )){
                     table= document.getElementById('tableAdvance');
                     actualAdvCount++;
                     position= actualAdvCount;

                }else{
                    table= document.getElementById('tableOverall')
                    actualOverallCount++;
                    position=actualOverallCount;

                }
            }

            if(aPlayers[i].score>100) sScore='NA';
            else sScore= ''+aPlayers[i].score;

            if(aPlayers[i].tries<1)sTries='';
            else if(aPlayers[i].tries==1)sTries='|';
            else if(aPlayers[i].tries==2)sTries='||';
            else if(aPlayers[i].tries==3)sTries='|||';
            else sTries='|||+';
    //data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop"
            row= `<tr>
                <td class="align-middle">${position}</td>
                <td class="align-middle">
                <a href="#" onClick="editShooter('${aPlayers[i].id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-controls="offcanvasTop">
                    ${aPlayers[i].name}
                    </a>
                </td>
                <td class="align-middle">${aPlayers[i].gun}</td>
                <td class="align-middle">${sScore}</td>
                <td class="align-middle">${sTries}</td>
                <td class="align-middle">
                    <button onClick="timeTrack('${aPlayers[i].id}', '${aPlayers[i].name}', '${aPlayers[i].gun}', '${sScore}')" class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-stopwatch"></i></button>
                </td>
             </tr>`;
            table.innerHTML+= row;

        }
    }
    

}
function buildCategory2(eConfig, selectDivision){

    document.getElementById('divTAdvance').style.display='none';
    document.getElementById('divTOverall').style.display= 'none';
    document.getElementById('divTLadies').style.display='none';
    document.getElementById('divTOptics').style.display='none';
    document.getElementById('divTSeniors').style.display='none';

    document.getElementById('liAdvance').style.display='none';
    document.getElementById('liOverall').style.display= 'none';
    document.getElementById('liLadies').style.display='none';
    document.getElementById('liOptics').style.display='none';
    document.getElementById('liSeniors').style.display='none';
    
    document.getElementById('liDropdown').style.display='none';
    document.getElementById('dLiOptics').style.display='none';
    document.getElementById('dLiSeniors').style.display='none';


     let divisionIndex=-1;
     for(let i=0; i< eConfig.divisions.length; i++){
         if(selectDivision==eConfig.divisions[i]._id){
             divisionIndex=i;
             i= eConfig.divisions.length;
         }
     }

     if(divisionIndex>-1){
        const categories= eConfig.divisions[divisionIndex].categories;
        var i=0;
        var nav='';

        if(categories.advance){
            document.getElementById('divTAdvance').style.display='';
            document.getElementById('liAdvance').style.display='';
            i++;
        }
        
        if(categories.overall){
            document.getElementById('divTOverall').style.display='';
            document.getElementById('liOverall').style.display='';
            i++;
        }
        if(categories.ladies){
            document.getElementById('divTLadies').style.display='';
            document.getElementById('liLadies').style.display='';
            i++;
        }
        if(categories.optics){
            document.getElementById('divTOptics').style.display='';
            if(i<3){
                document.getElementById('liOptics').style.display='';
            }else{
                
                document.getElementById('liDropdown').style.display='';
                document.getElementById('dLiOptics').style.display='';    
                
            }
            i++;
        }

        if(categories.seniors){
            document.getElementById('divTSeniors').style.display='';
            if(i<3){
                document.getElementById('liSeniors').style.display='';
            }else{
                document.getElementById('liDropdown').style.display='';
                document.getElementById('dLiSeniors').style.display='';    
            }

            i++
        }
            
    }           
}

function buildDivisions(eventDivisions){

    const selectDivisions= document.getElementById('selectDivision');

    while (selectDivisions.options.length > 0)
        selectDivisions.remove(0);

    let newOption = new Option('<<Select a Division>>','-1');
    selectDivisions.add(newOption,undefined);

    for(i=0;i<eventDivisions.length;i++){
        newOption = new Option(eventDivisions[i].name,eventDivisions[i]._id);
        selectDivisions.add(newOption,undefined);

    }

    //selectDivisions.value= eventDivisions[0].id;

    clearShooterModal();

}

function clearShooterModal(){
    
    document.getElementById('modalShooterId').value='';
    document.getElementById('modalName').value='';
    document.getElementById('modalEmail').value='';
    document.getElementById('modalOption'+cLadies).checked=false;
    document.getElementById('modalOption'+cOverall).checked=false;
    document.getElementById('modalOption'+cSeniors).checked=false;
    
    
    let modalRow='';
    document.getElementById('modalShooterDivisions').innerHTML='';
    for(k=0;k<eventConfig.divisions.length;k++){

        modalRow= `
        <tr>
            <th scope="row">
                <input type="checkbox" class="btn-check" id="btnCheckDivision${eventConfig.divisions[k]._id}" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnCheckDivision${eventConfig.divisions[k]._id}">${eventConfig.divisions[k].name}</label><br>
            </th>
                <td>
                    <input class="form-control form-control-sm" id="gunName${eventConfig.divisions[k]._id}" type="text" maxlength="10"
                        onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k]._id}').checked=true" placeholder="" aria-label=".form-control-sm example">
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k]._id}').checked=true" type="checkbox" role="switch" id="optic${eventConfig.divisions[k]._id}">
                    </div>
                </td>
        </tr>`;
        document.getElementById('modalShooterDivisions').innerHTML+=modalRow;
    }
}

function editShooter(idShooter){

    //clearShooterModal();

    //populate modal registered
    for(i=0;i< playersArray.length;i++){

        if(idShooter== playersArray[i].shooterId){
            for(j=0;j< playersArray[i].registered.length;j++){

            
                //&& selectDivision==playersArray2[i].registered[j].division
                

                document.getElementById('modalShooterId').value= playersArray[i].shooterId;
                document.getElementById('modalName').value= playersArray[i].name;
                document.getElementById('modalEmail').value= playersArray[i].email;
                document.getElementById('modalOption'+playersArray[i].category).checked=true;

                document.getElementById('btnCheckDivision'+playersArray[i].registered[j].divisionId).checked=true;
                document.getElementById('gunName'+playersArray[i].registered[j].divisionId).value= playersArray[i].registered[j].gun;
                if(playersArray[i].registered[j].optics)
                     document.getElementById('optic'+playersArray[i].registered[j].divisionId).checked= true;
                else
                    document.getElementById('optic'+playersArray[i].registered[j].divisionId).checked= false;

            }
        }
    }
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
//////////------------UPDATES-----------------------
function addUpdateShooter(){

    
    let idShooter= document.getElementById('modalShooterId').value;
    console.log(`entro update shooter. idShooter=${idShooter}`);
    let aRegistered=[];
        
        for(let i=0; i<eventConfig.divisions.length;i++){
            if(document.getElementById('btnCheckDivision'+eventConfig.divisions[i]._id).checked){
                aRegistered.push({'division':eventConfig.divisions[i]._id
                                 ,'gun':document.getElementById('gunName'+eventConfig.divisions[i]._id).value
                                 ,'optics':document.getElementById('optic'+eventConfig.divisions[i]._id).checked
                                 ,'score':9999,'tries':0 });
            }
        }

        //Validations

        document.getElementById('modalName').value= document.getElementById('modalName').value.trim();
        let idDublicated= null;
        for(let i=0; i<playersArray.length;i++){
            if(playersArray[i].name.toUpperCase()===document.getElementById('modalName').value.toUpperCase()
            && idShooter!= playersArray[i].id){
                idDublicated=  playersArray[i].id;
            }
        }

        //At least one Division
        if(aRegistered.length<1){
            alert('You need to select at least one Division!');
            return 0;
        }
        
        if (idDublicated!=null){
            if(confirm('The name "'+document.getElementById('modalName').value+'" is already in use. Would you like to update it?')) {
                idShooter=  idDublicated;
            }else return 0;
        }

            let categ= cOverall;

            if(document.getElementById('modalOption'+cLadies).checked)
                categ= cLadies;
            if(document.getElementById('modalOption'+cOverall).checked)
                categ= cOverall;
            if(document.getElementById('modalOption'+cSeniors).checked)
                categ= cSeniors;
            
        
            if(idShooter===null || idShooter==''){
                //new user

                idShooter= uuidv4();
                document.getElementById('modalShooterId').value= idShooter;

                let jShooter= {'id':idShooter
                            ,'name':document.getElementById('modalName').value
                            ,'email':document.getElementById('modalEmail').value
                            ,'category':categ
                            ,'registered':aRegistered};     

                playersArray.push(jShooter);
                alert(document.getElementById('modalName').value+' joined the event!');

            }else{
                //update

                for(i=0;i<playersArray.length;i++){
                    if(idShooter==playersArray[i].id){
                        playersArray[i].name=document.getElementById('modalName').value;
                        playersArray[i].email=document.getElementById('modalEmail').value;
                        playersArray[i].category= categ;
                        playersArray[i].registered= aRegistered;
                    alert('Shooter '+ playersArray[i].name+' has been updated!');
                    }

                }
            }
            scoreCal();
            buildPlayersTables(transformRegistrer(playersArray), eventConfig, document.getElementById('selectDivision').value);
    
}
    
function deleteShooter(){
    let idShooter= document.getElementById('modalShooterId').value;
    
    if(idShooter===null ||idShooter==''){
        return 0;
    }else if(confirm('Are you sure you want to remove this shoothe?')) {

        for(i=0;i<playersArray.length;i++){
            if(idShooter==playersArray[i].id){
                playersArray.splice(i, 1);
            }

        }
       
        scoreCal();
        buildPlayersTables(transformRegistrer(playersArray), eventConfig, document.getElementById('selectDivision').value);
        document.getElementById('modalShooterId').value=null;
    }
    
}

function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i]._id == divisionID){
            return eventDivisions[i];
        }
    }
}

function timeTrack(idShooter, nameShooter, gunShooter, bestScore){
    const selectedDivision= selectDivision= document.getElementById('selectDivision').value;

     
    document.getElementById('timeRecordTime').value= '';
    document.getElementById('timeRecordPenalty').value= '';
    
    document.getElementById('timeRecordShooterId').value= idShooter;
    document.getElementById('timeRecordDivision').value= selectedDivision;

    document.getElementById('timeShooterName').innerText= nameShooter;
    document.getElementById('timeShooterGun').innerText= gunShooter;
    document.getElementById('timeBestScore').innerText= bestScore;    

    document.getElementById('timeDivision').innerText= getDivision(eventConfig.divisions, selectedDivision).name;    


    buildTimeTable(idShooter,selectedDivision);

}

function addTimeRecord(){

    let idShooter= document.getElementById('timeRecordShooterId').value;
    let idDivision= document.getElementById('timeRecordDivision').value;
    let vTime= Number(document.getElementById('timeRecordTime').value);
    document.getElementById('timeRecordTime').value="";
    let vPenalties= Number(document.getElementById('timeRecordPenalty').value);
    document.getElementById('timeRecordPenalty').value="";
    if(vPenalties===null || vPenalties==='') vPenalties=0
    let vScore= Math.round(((vTime + vPenalties) + Number.EPSILON) * 100) / 100;


    
    let newRecord={'shooterId':idShooter,'divisionId':idDivision,'sTime': vTime,'penalties': vPenalties};


    fetch('http://localhost:8888/.netlify/functions/time-records', {
        method: "POST",
        body: JSON.stringify(newRecord),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
            modalChanged=true;
            let bestScore= document.getElementById('timeBestScore').innerText;

            console.log(`document.getElementById('timeBestScore').innerText; ${bestScore}`);

            if(bestScore=='NA' || Number(bestScore) >vScore){
                document.getElementById('timeBestScore').innerText=vScore;
                console.log(`Apply new score ${vScore}`);
            }else console.log(`Not applied new score ${vScore}`);
            
            buildTimeTable(idShooter,idDivision);
            console.log(json);
        })
        // .then({
        
        //     fetch("http://localhost:8888/.netlify/functions/shooters_divisions?eventId=6578ad76e53c8b23971032c4")
        //     .then(r=>r.json())
        //     .then(data => {
        //         playersArray=data;
        //         buildPlayersTables(transformRegistrer(playersArray), eventConfig, idDivision);
        //     })
        // })
        .catch(err => console.log(err));

    //timeRecords.push(newRecord);

    
    
    //document.getElementById('timeBestScore').innerText= getBestScoreAndTries(idShooter, idDivision)[0]>=999?'NA':getBestScoreAndTries(idShooter, idDivision)[0];
                
}



function buildTimeTable(idShooter,idDivision){
    
    document.getElementById('timeTable').innerHTML="";
    
    fetch(`http://localhost:8888/.netlify/functions/time-records?eventID=${eventConfig.id}&shooterId=${idShooter}&divisionId=${idDivision}`)
        .then(r=>r.json())
        .then(records=>{

            let row='';

            let ord=1;
            const zeroPad = (num, places) => String(num).padStart(places, '0');

            let dt; 
            for(let i=0; i< records.length ; i++){
                
                console.log(`records[i].datetime= ${records[i].datetime}`);

                dt= new Date(records[i].datetime.toString());
                console.log(`dt ${dt}`);
                
                row+= `<tr>
                    <th scope="row">${ord++}</th>
                    <td>${dt.getHours()}:${zeroPad(dt.getMinutes(), 2)}</td>
                    <td class="text-end">${records[i].sTime}</td>
                    <td class="text-end">${records[i].penalties}</td>
                    <td><button onClick="deleteTime('${records[i]._id}', '${idShooter}', '${idDivision}')" type="button" class="btn btn-danger btn-circle btn-xl">-</button>
                    </td>
                </tr>`;
                
                document.getElementById('timeTable').innerHTML=row;
            }

        } );
    
    
}

function getBestScoreAndTries(idShooter, idDivision){
    let scoreAux;
    let score =999;
    let tries= 0;
    for(i=0;i<timeRecords.length;i++){
        if(timeRecords[i].shooterId==idShooter && timeRecords[i].division== idDivision){
            tries++;
            scoreAux= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 100) / 100
            if(scoreAux <score)
                score= scoreAux;
        }
    }
    return [score, tries];

}

function deleteTime(idTimeRecord, idShooter, idDivision){

    console.log(`idTimeRecord= ${idTimeRecord}`);

    if(idTimeRecord===null ||idTimeRecord==''){
        return 0;
    }else if(confirm('Are you sure you want to remove this time record?')) {

        fetch(`http://localhost:8888/.netlify/functions/time-records?timeRecordId=${idTimeRecord}`, {
            method: "DELETE",
            // body: JSON.stringify(newRecord),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            // .then(response => response.json()) 
            .then(r => {
                modalChanged=true;
                document.getElementById('timeBestScore').innerText='';
        
                buildTimeTable(idShooter,idDivision);
                console.log(r);
            })


        // for(i=0;i<timeRecords.length;i++){
        //     if(idTimeRecord==timeRecords[i].id){
        //         timeRecords.splice(i, 1);
                

        //         scoreCal();
        //         buildPlayersTables(transformRegistrer(playersArray), eventConfig, document.getElementById('selectDivision').value);
        //         buildTimeTable(idShooter,idDivision);
        //         document.getElementById('timeBestScore').innerText= getBestScoreAndTries(idShooter, idDivision)[0]>=999?'NA':getBestScoreAndTries(idShooter, idDivision)[0];
        //         return 0;
        //     }

        // }
        
    }


}

function scoreCal(){

    for(let i=0;i<timeRecords.length;i++){

        
        timeRecords[i].score= Math.round(((timeRecords[i].sTime+timeRecords[i].penalties) + Number.EPSILON) * 100) / 100
    }

    timeRecords= timeRecords.sort((a, b) => {
        if (a.score < b.score) {
          return -1;
        }
      });


    for(let i=0;i<playersArray.length;i++){

        
        for(let j=0; j < playersArray[i].registered.length;j++){

            playersArray[i].registered[j].score=999;
            playersArray[i].registered[j].tries=0;

            for(k=0;k<timeRecords.length;k++){

                if(playersArray[i].id==timeRecords[k].shooterId && playersArray[i].registered[j].division ==timeRecords[k].division){
                    playersArray[i].registered[j].tries++;
                    if(timeRecords[k].score<playersArray[i].registered[j].score){
                        playersArray[i].registered[j].score=timeRecords[k].score;
                    }
                }

            }

        }        
    }

}
