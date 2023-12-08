
const cPistolDivision= 1;
const cRevolverDivision= 2;
const cFreeforceDivision=3;

const cAdvance= 0;
const cOverall= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

// var eventConfig= 
//     {'id':123
//     ,'name':'1o. TPM Aldea da Serra'
//     ,'date':'10/12/2024'
//     ,'divisions':[{'id':cPistolDivision, 'name':'Pistol', 'categories':{'overall':true,'ladies':false,'advance':true,'optics':false,'seniors':false},'advanceLimit':{'passingScore':5,'topBestOf':-1}}
//                  ,{'id':cRevolverDivision, 'name':'Revolver', 'categories':{'overall':true,'ladies':true,'advance':true,'optics':true,'seniors':true},'advanceLimit':{'passingScore':5,'topBestOf':-1}}
//                  ,{'id':cFreeforceDivision, 'name':'Free-Force', 'categories':{'overall':true,'ladies':true,'advance':false,'optics':false,'seniors':false},'advanceLimit':{'passingScore':4,'topBestOf':-1}}
//                 ]
// };
   
let eventConfig;
let playersArray2;
let timeRecords;


const promiseOfEventConfig = fetch("http://localhost:8888/.netlify/functions/eventconfig")
    .then(r=>r.json())
    .then(data => {
    return data;
});

window.onload = async () => {
    eventConfig = await promiseOfEventConfig;
    // this code will run after 1 seconds
    setTimeout(function() {
    //spinner= document.getElementById('spinner');
    spinner.style.visibility = 'hidden'//'visible'; //'hidden'
    buildDivisions(eventConfig.divisions);
  }, 1000);
  document.getElementById('divTAdvance').style.display='none';
    document.getElementById('divTOverall').style.display= 'none';
    document.getElementById('divTLadies').style.display='none';
    document.getElementById('divTOptics').style.display='none';
    document.getElementById('divTSeniors').style.display='none';
};

playersArray2= [{'id':1,'name':'Jonathan','email':'jonathan@email.com','category':cOverall, 'registered':[
                                                {'division':cPistolDivision,'gun':'Glock 22','optics':true,'score':3.43,'tries':2 }
                                                ,{'division':cRevolverDivision,'gun':'RT 692','optics':false,'score':4.43,'tries':2 }
                                                ]}
                   ,{'id':2,'name':'Pietro','email':'','category':cSeniors, 'registered':[
                                                {'division':cPistolDivision,'gun':'Glock 19','optics':true,'score':3.54,'tries':1 }
                                                ,{'division':cRevolverDivision,'gun':'S&W 33','optics':false,'score':3.54,'tries':1 }
                                                ,{'division':cFreeforceDivision,'gun':'T4','optics':true,'score':3.54,'tries':1 }
                                                ]}
                  ,{'id':3,'name':'Herrera Andrade','email':'','category':cSeniors, 'registered':[
                                                {'division':cPistolDivision,'gun':'G2C 9','optics':false,'score':3.76,'tries':3 }
                                                ,{'division':cRevolverDivision,'gun':'Rossi Imperador','optics':false,'score':3.76,'tries':3 }
                                                ,{'division':cFreeforceDivision,'gun':'Nylon 66','optics':true,'score':3.76,'tries':3 }
                                                ]}
                  ,{'id':4,'name':'Mary','email':'','category':cLadies, 'registered':[
                                                {'division':cPistolDivision,'gun':'TX22','optics':true,'score':3.93,'tries':4 }
                                                ,{'division':cRevolverDivision,'gun':'RT66','optics':false,'score':3.93,'tries':4 }
                                                ,{'division':cFreeforceDivision,'gun':'Delta 22','optics':true,'score':3.93,'tries':4 }
                                                ]}
                  ,{'id':5,'name':'Petra Fagundes','email':'','category':cLadies, 'registered':[                                
                                                {'division':cPistolDivision,'gun':'Glock 19','optics':true,'score':4.54,'tries':4 }
                                                ,{'division':cRevolverDivision,'gun':'Coult Phyton','optics':true,'score':4.54,'tries':4 }
                                                ,{'division':cFreeforceDivision,'gun':'Thyphon 12','optics':true,'score':4.54,'tries':4 }
                            ]}
                  ,{'id':6,'name':'Fanny','email':'','category':cLadies, 'registered':[              
                                                {'division':cPistolDivision,'gun':'G2C 9','optics':false,'score':5.76,'tries':2 }
                                                ,{'division':cRevolverDivision,'gun':'RT92','optics':false,'score':5.76,'tries':2 }
                                                ,{'division':cFreeforceDivision,'gun':'AR 12','optics':true,'score':5.76,'tries':2 }
                                                ]}
                 ,{'id':7,'name':'Augusto','email':'','category':cOverall, 'registered':[
                                                {'division':cPistolDivision,'gun':'G2C 9','optics':false,'score':5.77,'tries':19 }
                                                ,{'division':cRevolverDivision,'gun':'Colt Pacemaker','optics':false,'score':5.77,'tries':19 }
                                                ,{'division':cFreeforceDivision,'gun':'CBC Military','optics':true,'score':5.77,'tries':19 }
                                                ]}
                 ,{'id':8,'name':'Bia','email':'','category':cLadies, 'registered':[
                                                {'division':cPistolDivision,'gun':'TS9','optics':true,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'Rossi 38','optics':false,'score':999,'tries':0 }
                                                ,{'division':cFreeforceDivision,'gun':'Brigade BMF-9','optics':true,'score':999,'tries':0 }
                                                ]}
                ,{'id':9,'name':'Tereza','email':'','category':cLadies, 'registered':[
                                                {'division':cPistolDivision,'gun':'PT59','optics':false,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'Rossi 38','optics':false,'score':999,'tries':0 }
                                                ,{'division':cFreeforceDivision,'gun':'Fire Eagle 9','optics':true,'score':999,'tries':0 }
                                                ]}
                ,{'id':10,'name':'Nazaret','email':'','category':cLadies, 'registered':[                                
                                                {'division':cPistolDivision,'gun':'Glock 22','optics':false,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'Coult Phyton','optics':false,'score':999,'tries':0 }
                                                ,{'division':cFreeforceDivision,'gun':'CBC Military','optics':true,'score':999,'tries':0 }
                                                ]}
                ,{'id':11,'name':'Bruno','email':'','category':cOverall, 'registered':[
                                                {'division':cPistolDivision,'gun':'TS9','optics':true,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'RT Hunter','optics':true,'score':999,'tries':0 }
                                                ,{'division':cFreeforceDivision,'gun':'Colt M16','optics':true,'score':999,'tries':0 }
                                                ]}
                ,{'id':12,'name':'Fernando','email':'','category':cSeniors, 'registered':[                                
                                                {'division':cPistolDivision,'gun':'PT59','optics':true,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'RT 66','optics':false,'score':999,'tries':0 }
                                                ]}
                ,{'id':13,'name':'Matarazzo','email':'','category':cOverall, 'registered':[
                                                {'division':cPistolDivision,'gun':'Glock 22','optics':false,'score':999,'tries':0 }
                                                ,{'division':cRevolverDivision,'gun':'S&W 32','optics':false,'score':999,'tries':0 }
                                                ]}
                ];

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
    buildPlayersTables(transformRegistrer(playersArray2), eventConfig, selectDivision.value);
    buildCategory2(eventConfig, selectDivision.value);
    if(selectDivision.value===null || selectDivision.value=='' || selectDivision.value<0||selectDivision.value<0){
        document.getElementById('btnAddShooter').disabled = true;
    }else{
        document.getElementById('btnAddShooter').disabled = false;
    }
};


function transformRegistrer(players){
    let registers = [];;
    let rP= [];
    let aRow= '';
    for(i=0;i<players.length;i++){
        for(j=0;j<players[i].registered.length;j++){
            aRow= {'division':players[i].registered[j].division,'category':players[i].category,'name':players[i].name,'id':players[i].id,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries };
            rP.push(aRow);  
        }
    }

    return rP;
}

function buildPlayersTables(aPlayersx, eventConfig, selectDivision){
    
    var row= "";
    spinner.style.visibility = 'visible'//'visible'; //'hidden'
    document.getElementById('tableAdvance').innerHTML= row;
    document.getElementById('tableOverall').innerHTML= row;
    document.getElementById('tableLadies').innerHTML= row;
    document.getElementById('tableOptics').innerHTML= row;
    document.getElementById('tableSeniors').innerHTML= row;

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

    fetch("http://localhost:8888/.netlify/functions/shooters?eventID=1&divisionID="+selectDivision)
        .then(r=>r.json() )
        .then(aPlayers=>{
        
            for(let i=0; i< aPlayers.length; i++){

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
            
            spinner.style.visibility = 'hidden'//'visible'; //'hidden'
                
        })
    
    
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
         if(selectDivision==eConfig.divisions[i].id){
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

    let newOption = new Option('<<Select a Division>>',-1);
    selectDivisions.add(newOption,undefined);

    for(i=0;i<eventDivisions.length;i++){
        newOption = new Option(eventDivisions[i].name,eventDivisions[i].id);
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
                <input type="checkbox" class="btn-check" id="btnCheckDivision${eventConfig.divisions[k].id}" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnCheckDivision${eventConfig.divisions[k].id}">${eventConfig.divisions[k].name}</label><br>
            </th>
                <td>
                    <input class="form-control form-control-sm" id="gunName${eventConfig.divisions[k].id}" type="text" maxlength="10"
                        onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k].id}').checked=true" placeholder="" aria-label=".form-control-sm example">
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="document.getElementById('btnCheckDivision${eventConfig.divisions[k].id}').checked=true" type="checkbox" role="switch" id="optic${eventConfig.divisions[k].id}">
                    </div>
                </td>
        </tr>`;
        document.getElementById('modalShooterDivisions').innerHTML+=modalRow;
    }
}

function editShooter(idShooter){

    clearShooterModal();

    //populate modal registered
    for(i=0;i< playersArray2.length;i++){

        if(idShooter== playersArray2[i].id){
            for(j=0;j< playersArray2[i].registered.length;j++){

            
                //&& selectDivision==playersArray2[i].registered[j].division
                

                document.getElementById('modalShooterId').value= playersArray2[i].id;
                document.getElementById('modalName').value= playersArray2[i].name;
                document.getElementById('modalEmail').value= playersArray2[i].email;
                document.getElementById('modalOption'+playersArray2[i].category).checked=true;

                document.getElementById('btnCheckDivision'+playersArray2[i].registered[j].division).checked=true;
                document.getElementById('gunName'+playersArray2[i].registered[j].division).value= playersArray2[i].registered[j].gun;
                if(playersArray2[i].registered[j].optics)
                     document.getElementById('optic'+playersArray2[i].registered[j].division).checked= true;
                else
                    document.getElementById('optic'+playersArray2[i].registered[j].division).checked= false;

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
    let aRegistered=[];
        
        for(let i=0; i<eventConfig.divisions.length;i++){
            if(document.getElementById('btnCheckDivision'+eventConfig.divisions[i].id).checked){
                aRegistered.push({'division':eventConfig.divisions[i].id
                                 ,'gun':document.getElementById('gunName'+eventConfig.divisions[i].id).value
                                 ,'optics':document.getElementById('optic'+eventConfig.divisions[i].id).checked
                                 ,'score':9999,'tries':0 });
            }
        }

        //Validations

        document.getElementById('modalName').value= document.getElementById('modalName').value.trim();
        let idDublicated= null;
        for(let i=0; i<playersArray2.length;i++){
            if(playersArray2[i].name.toUpperCase()===document.getElementById('modalName').value.toUpperCase()
            && idShooter!= playersArray2[i].id){
                idDublicated=  playersArray2[i].id;
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

                playersArray2.push(jShooter);
                alert(document.getElementById('modalName').value+' joined the event!');

            }else{
                //update

                for(i=0;i<playersArray2.length;i++){
                    if(idShooter==playersArray2[i].id){
                        playersArray2[i].name=document.getElementById('modalName').value;
                        playersArray2[i].email=document.getElementById('modalEmail').value;
                        playersArray2[i].category= categ;
                        playersArray2[i].registered= aRegistered;
                    alert('Shooter '+ playersArray2[i].name+' has been updated!');
                    }

                }
            }
            scoreCal();
            buildPlayersTables(transformRegistrer(playersArray2), eventConfig, document.getElementById('selectDivision').value);
    
}
    
function deleteShooter(){
    let idShooter= document.getElementById('modalShooterId').value;
    
    if(idShooter===null ||idShooter==''){
        return 0;
    }else if(confirm('Are you sure you want to remove this shoothe?')) {

        for(i=0;i<playersArray2.length;i++){
            if(idShooter==playersArray2[i].id){
                playersArray2.splice(i, 1);
            }

        }
       
        scoreCal();
        buildPlayersTables(transformRegistrer(playersArray2), eventConfig, document.getElementById('selectDivision').value);
        document.getElementById('modalShooterId').value=null;
    }
    
}

function getDivision(eventDivisions, divisionID){

    for(let i=0; i<eventDivisions.length;i++){
        if(eventDivisions[i].id == divisionID){
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
    let vPenalties= Number(document.getElementById('timeRecordPenalty').value);
    if(vPenalties===null || vPenalties==='') vPenalties=0
    let vScore= Math.round(((vTime + vPenalties) + Number.EPSILON) * 100) / 100;

    console.log(`idShooter=${idShooter}, idDivision= ${idDivision}, vTime= ${vTime}, vPenalties=${ vPenalties}, vScore= ${vScore}`);
    
    
    let newRecord={'id':uuidv4(),'shooterId':idShooter,'division':idDivision, 'datetime':new Date()
        ,'sTime': vTime
        ,'penalties': vPenalties
        ,'score':vScore};

    console.log(`newRecord.score= ${newRecord.score}`)
    timeRecords.push(newRecord);

    buildPlayersTables(transformRegistrer(playersArray2), eventConfig, idDivision);
    buildTimeTable(idShooter,idDivision);
    document.getElementById('timeBestScore').innerText= getBestScoreAndTries(idShooter, idDivision)[0]>=999?'NA':getBestScoreAndTries(idShooter, idDivision)[0];
                
}



function buildTimeTable(idShooter,idDivision){
    
    
    fetch(`http://localhost:8888/.netlify/functions/records?eventID=${eventConfig.id}&shooterID=${idShooter}&divisionID=${idDivision}`)
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
                    <td><button onClick="deleteTime('${records[i].id}', ${idShooter}, ${idDivision})" type="button" class="btn btn-danger btn-circle btn-xl">-</button>
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

    if(idTimeRecord===null ||idTimeRecord==''){
        return 0;
    }else if(confirm('Are you sure you want to remove this time record?')) {

        for(i=0;i<timeRecords.length;i++){
            if(idTimeRecord==timeRecords[i].id){
                timeRecords.splice(i, 1);
                

                scoreCal();
                buildPlayersTables(transformRegistrer(playersArray2), eventConfig, document.getElementById('selectDivision').value);
                buildTimeTable(idShooter,idDivision);
                document.getElementById('timeBestScore').innerText= getBestScoreAndTries(idShooter, idDivision)[0]>=999?'NA':getBestScoreAndTries(idShooter, idDivision)[0];
                return 0;
            }

        }
        
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


    for(let i=0;i<playersArray2.length;i++){

        
        for(let j=0; j < playersArray2[i].registered.length;j++){

            playersArray2[i].registered[j].score=999;
            playersArray2[i].registered[j].tries=0;

            for(k=0;k<timeRecords.length;k++){

                if(playersArray2[i].id==timeRecords[k].shooterId && playersArray2[i].registered[j].division ==timeRecords[k].division){
                    playersArray2[i].registered[j].tries++;
                    if(timeRecords[k].score<playersArray2[i].registered[j].score){
                        playersArray2[i].registered[j].score=timeRecords[k].score;
                    }
                }

            }

        }        
    }

}
