exports.handler = async (event, context) => {
    
    const eventId= event.queryStringParameters.eventID;
    const shooterId= event.queryStringParameters.shooterID;
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

timeRecords= timeRecords.sort((a, b) => {
            if (a.score < b.score) {
              return -1;
            }
          });


    let r= [];
    for(let i=0; i<timeRecords.length;i++){
        if(timeRecords[i].shooterId==shooterId&&timeRecords[i].division==divisionID){
            r.push(timeRecords[i]);       
        }
    }

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