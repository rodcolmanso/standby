exports.handler = async (event, context) => {
    
    const eventId= event.queryStringParameters.eventID;
    const divisionID= event.queryStringParameters.divisionID;
    
    const cPistolDivision= 1;
    const cRevolverDivision= 2;
    const cFreeforceDivision=3;

    const cAdvance= 0;
    const cOverall= 1;
    const cLadies= 2;
    const cOptics= 4;
    const cSeniors= 5;

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
    
    let iId=1;
    let timeRecords= [{'id':iId++,'shooterId':1                  ,'division':1                 , 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3),'score':0}
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

let aPlayers= [{'id':1,'name':'Jonathan','email':'jonathan@email.com','category':cOverall, 'registered':[
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
        ]}];

aPlayers= aPlayers.sort((a, b) => {
            if (a.score < b.score) {
              return -1;
            }
          });


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

    let r= [];
    for(let i=0; i<aPlayers.length;i++){
        for(let j=0; j<aPlayers[i].registered.length;j++){
            if(aPlayers[i].registered[j].division==divisionID){
            r.push({'id':aPlayers[i].id,'name':aPlayers[i].name,'email':aPlayers[i].email,'category':aPlayers[i].category, 'registered':[
                {'division':aPlayers[i].registered[j].division,'gun':aPlayers[i].registered[j].gun,'optics':aPlayers[i].registered[j].optics,'score':aPlayers[i].registered[j].score,'tries':aPlayers[i].registered[j].tries }]});
            }       
        }
    }

     r= transformRegistrer(r);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
    }
}