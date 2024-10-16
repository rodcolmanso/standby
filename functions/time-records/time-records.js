const { cat } = require("@cloudinary/url-gen/qualifiers/focusOn");
const {MongoClient} = require ("mongodb");
require('dotenv').config();

const mongoClient= new MongoClient(process.env.MONGODB_URI);
const clientPromise= mongoClient.connect();
var ObjectId = require('mongodb').ObjectId; 


const handler = async (event, context)=>{
  try {

    const database = (await clientPromise).db(process.env.MONGODB_DATABASE_STANDBY);
    const cTime_Records= database.collection(process.env.MONGODB_COLLECTION_TIME_RECORDS);

    switch (event.httpMethod){
      case 'GET':
        const p_shooterId= event.queryStringParameters.shooterId?event.queryStringParameters.shooterId.toString():null;
        const p_divisionId= event.queryStringParameters.divisionId?event.queryStringParameters.divisionId.toString():null;
        const p_shooter_divisionId= event.queryStringParameters.shooterDivisionId?event.queryStringParameters.shooterDivisionId.toString():null;

        const p_rank= event.queryStringParameters.rank?event.queryStringParameters.rank.toString():null;

        let p_report=null;
        let p_eventId=null;

        if(p_rank!==null){

          let _filter= {};
          let _filterMonth= {};
          // if(p_shooterId!==null){
          //   _filter.shooterId= p_shooterId;
          // }

          const p_year= event.queryStringParameters.year?event.queryStringParameters.year.toString():null;
          if(p_year!==null){
            let _year;

            try{
                _year= Number (p_year);
            }catch(e){
              console.error('year: '+e);
              return  {
                statusCode: 400,
                body: JSON.stringify('Year: '+e)
              };
            }
            
            _filter.evYear= _year;
            console.log('filter year:',JSON.stringify(_filter,null,2));

            
            const p_month= event.queryStringParameters.month?event.queryStringParameters.month.toString():null;
            if(p_month!==null){
              
              let _month;

              try{
                  _month= Number (p_month);
              
                if(_month<1 || _month>12)
                  throw new Error('Invalid month. out of range. _month='+_month+".");
              }catch(e){
                console.error('Month '+e);
                return  {
                  statusCode: 400,
                  body: JSON.stringify('Month '+e)
                };
              }
              
              _filter.evMonth= _month;
              console.log('filter month:',JSON.stringify(_filter,null,2));

              let _monthAux= String(_month+1).padStart(2, '0') ;
              let _yearAux= _year;

              if(_month>12){
                _monthAux="01";
                _yearAux= _year+1;
              }
              
              _filterMonth.datetime={$gte: (new Date(""+_year+"-"+String(_month).padStart(2, '0')+"-01")),$lt: (new Date(""+_yearAux+"-"+_monthAux+"-01"))};
              console.log('_filterMonth:',JSON.stringify(_filterMonth,null,2));
            }
          }

          const p_rangeAdm= event.queryStringParameters.rangeAdm?event.queryStringParameters.rangeAdm.toString():null;
          if(p_rangeAdm!==null){
            _filter.rangeAdms= p_rangeAdm;
          }

          const p_divisionName= event.queryStringParameters.divisionName?event.queryStringParameters.divisionName.toString():null;
          if(p_divisionName!==null){
            _filter.divisionName= p_divisionName;
          }
          
          const p_optics= event.queryStringParameters.optics?event.queryStringParameters.optics.toString():null;
          if(p_optics!==null && p_optics.toLowerCase()==="true")
            p_optics=true;
          if(p_optics!==null){
            _filter.optics= p_optics;
          }
          
          const p_gun= event.queryStringParameters.gun?event.queryStringParameters.gun.toString():null;
          if(p_gun!==null){
            _filter.optics= p_gun;
          }

          const p_local= event.queryStringParameters.p_local?event.queryStringParameters.p_local.toString():null;
          if(p_local!==null){
            _filter.local= p_local;
          }
          console.log('_filter='+JSON.stringify(_filter,null,2));
          let rank= await cTime_Records.aggregate([
        {$addFields:{_shooterId:{$toObjectId:"$shooterId"}
                    ,_divisionId:{$toObjectId:"$divisionId"}
                    ,_eventId:{$toObjectId:"$eventId"}
                    ,_shooterDivisionId:{$toObjectId:"$shooterDivisionId"}}}
        ,{$match:_filterMonth}
        ,{$lookup:{
            from: "shooters"
            ,localField: "_shooterId"
            ,foreignField: "_id"
            ,as: "shooter"
            ,pipeline:[
                {$addFields:{shooterName:"$name"}}
            ]
        }}
        ,{$lookup:{
            from: "divisions"
            ,localField: "_divisionId"
            ,foreignField: "_id"
            ,as: "division"
            ,pipeline:[
                {$addFields:{divisionName:"$name"}}
            ]
        }}
        ,{$lookup:{
            from: "events"
            ,localField: "_eventId"
            ,foreignField: "_id"
            ,as: "event"
            ,pipeline:[
                {$addFields:{eventName:"$name",clockDate:"$date"
                             ,evMonth:{ "$month": "$date" }
                             ,evYear:{ "$year": "$date" }
                             ,_rangeId:{ $toObjectId: "$rangeId" }
                }}
                ,{$lookup:{
                    from: "ranges"
                    ,localField: "_rangeId"
                    ,foreignField: "_id"
                    ,as: "range"
                    ,pipeline:[
                        {$addFields:{rangeName: "$name", rangeAdms:"$adm"}}
                    ]
                }}
                ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$range", 0 ] }, "$$ROOT" ] } } }
                ,{$project: {range:0, _rangeId:0, _id:0, address:0, active:0}}
            ]
        }}
        ,{$lookup:{
            from: "shooters_divisions"
            ,localField: "_shooterDivisionId"
            ,foreignField: "_id"
            ,as: "shooter_division"
            ,pipeline:[
                {$addFields:{_gunId:{ $toObjectId: "$gunId" }}}
                ,{$lookup:{
                    from: "guns"
                    ,localField: "_gunId"
                    ,foreignField: "_id"
                    ,as: "gun_det"
                    ,pipeline:[
                        {$addFields:{gunFullName: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] }}}
                    ]
                }}
                ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$gun_det", 0 ] }, "$$ROOT" ] } } }
                ,{$project: {gun_det:0, _gunId:0}}
            ]
        }}
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter_division", 0 ] }, "$$ROOT" ] } } }
        ,{$addFields:{fixDivisionName:{ $replaceAll: { input: "$divisionName", find: "Armas curtas", replacement: "$type" } }}}
        ,{$group: {
            _id: {divisionName: "$fixDivisionName"
                 ,shooterId:"$shooterId"
                 ,eventId: "$eventId"
                 ,divisionId: "$divisionId"
                 ,shooterName:"$shooterName"
                 ,shooterCategory:"$category"
                 ,eventName: "$eventName"
                //  ,local: "$local"
                 ,clockDate: "$clockDate"
                 ,gun: "$gunFullName"
                 ,type: "$type"
                 ,gunId: "$gunId"
                 ,model: "$model"
                 ,factory: "$factory"
                 ,caliber: "$caliber"
                 ,operation: "$operation"
                 ,optics: "$optics"
                 ,evMonth: "$evMonth"
                 ,evYear: "$evYear"
                 ,local:"$rangeName"
                 ,rangeAdms:"$rangeAdms"}
                 ,bestTime: {$min:{$sum:[ {$multiply:[10000,"$penalties"]},"$sTime"]}}
            }
        }
        ,{$replaceRoot: { newRoot: {$mergeObjects:["$_id", "$$ROOT"] } } }
        ,{$project: {_id:0} }
        ,{$match: _filter}
      ]).sort({ divisionName:1, bestTime:1, shooterName:1, gun:1, optics:1}).toArray();

          let _ret=[];

          let _divisionName=""
          let _pos=0;

          for(let i=0; i<rank.length;i++){
             if(_divisionName!==rank[i].divisionName){
              _divisionName= rank[i].divisionName;
              _pos=1;
             }else{
              _pos++;
            }

            if(p_shooterId===null || p_shooterId===rank[i].shooterId){
              rank[i].position= _pos;
              rank[i].sortDivision= ""+rank[i].divisionName+rank[i].gunId +Math.round(rank[i].bestTime*100+1000000);
              rank[i].sortDivisionShooter= ""+rank[i].divisionName+rank[i].shooterId+rank[i].gunId+Math.round(rank[i].bestTime*100+1000000);
              _ret.push(rank[i]);
            }
          }
          rank= _ret;
          
          _ret=[];
          if(p_rank==="0"){ // mantem apenas o melhor tempo por divisão
            console.log('Entrou no rank 0');

            rank= rank.sort((a, b) => {
              if (a.sortDivision < b.sortDivision) {
                return -1;
              }
            });

            let _divisionName="";
            for(let i=0; i<rank.length;i++){
              if(_divisionName!==rank[i].divisionName){
                _divisionName=rank[i].divisionName;
                _ret.push(rank[i]);
              }
            }

            }else if(p_rank==="1"){ // mantem apenas o melhor tempo por divisão por atirador
              console.log('Entrou no rank 1');

              rank= rank.sort((a, b) => {
                if (a.sortDivisionShooter < b.sortDivisionShooter) {
                  return -1;
                }
              });

              let _divisionName="";
              let _shooterId="";
              // let _gun="";
              for(let i=0; i<rank.length;i++){ 

                  if(_divisionName!==rank[i].divisionName
                    || _shooterId!==rank[i].shooterId){
                    _divisionName=rank[i].divisionName;
                    _shooterId=rank[i].shooterId;
                    _ret.push(rank[i]);
                  }
                }

            }else if(p_rank==="2"){ // mantem melhores tempos por divisao/atirador/arma

              console.log('Entrou no rank 2');

              let _divisionName="";
              let _shooterId="";
              // let _gun="";
              let _gunId="";
              let _optics="";

              rank= rank.sort((a, b) => {
                if (a.sortDivisionShooter < b.sortDivisionShooter) {
                  return -1;
                }
              });

              for(let i=0; i<rank.length;i++){

                if(_divisionName!==rank[i].divisionName.toLowerCase().trim()
                  || _shooterId!==rank[i].shooterId
                  // || _gun!==rank[i].gun
                  || _gunId!==rank[i].gunId
                  || _optics!== rank[i].optics){
                  _divisionName=rank[i].divisionName.toLowerCase().trim();
                  _shooterId=rank[i].shooterId;
                  // _gun= rank[i].gun;
                  _gunId= rank[i].gunId;
                  _optics= rank[i].optics;
                  _ret.push(rank[i]);
                }

              }

            } else{ //mantem todos os tempos por divisao/evento e arma
            console.log('Entrou no rank xxxxx');
            _ret= rank;
          }

          return  {
            statusCode: 200,
            body: JSON.stringify(_ret)
          };

        }else if(event.queryStringParameters.report && event.queryStringParameters.eventId){
          p_report= event.queryStringParameters.report.toString();
          p_eventId= event.queryStringParameters.eventId.toString();
          console.log('got in report');
          const triesReport= await cTime_Records.aggregate([
              {$match:{eventId:p_eventId}}
              ,{$addFields:{"_shooterId":{$toObjectId:"$shooterId"}
                          ,"_eventId"  :{$toObjectId:"$eventId"}
                          ,"_divisionId"  :{$toObjectId:"$divisionId"}
                          ,"_shooterDivisionId"  :{$toObjectId:"$shooterDivisionId"}
                          }}
              ,{$lookup:{
                          from: "events"
                          ,localField:"_eventId"
                          ,foreignField: "_id"
                          ,as:"event"
              }}                     
              ,{$lookup:{
                          from: "shooters"
                          ,localField:"_shooterId"
                          ,foreignField:"_id"
                          ,as: "shooter"
              }}
              ,{$lookup:{
                          from: "divisions"
                          ,localField:"_divisionId"
                          ,foreignField:"_id"
                          ,as: "division"
                          ,pipeline:[
                              {$project:{"divisionName":"$name"}}
                          ]
              }}
              ,{$lookup:{
                from: "shooters_divisions"
                ,localField:"_shooterDivisionId"
                ,foreignField:"_id"
                ,as: "shooters_divisions"
               }}  
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooters_divisions", 0 ] }, "$$ROOT" ] } } }
              ,{$group:{
                  // _id:["$shooterId", "$email" , "$name" ,"$vl_first_try", "$vl_second_try", "$vl_other_tries"],
                  _id:["$shooterId", "$email" , "$name", "$vl_first_try", "$vl_second_try", "$vl_other_tries","$gun"],
                  tries:{$count:{}}
              }}
          ]).toArray();

          let _triesReport = triesReport.sort((a, b) => {
            if (a._id[2] < b._id[2]) {
              return -1;
            }
          });

          return  {
            statusCode: 200,
            body: JSON.stringify(_triesReport)
          };

        }else{
        
          //listing all time records from a particular shooter and division
            console.log(`Estamos no GET! p_shooterId,p_divisionId = ${p_shooterId}, ${p_divisionId} `);

            const timerRcords= await cTime_Records.aggregate([
              // {$match:{shooterId: p_shooterId, divisionId: p_divisionId}}
              {$match:{shooterDivisionId: p_shooter_divisionId}}
              ,{$project:{"shooterId":1, "divisionId":1, "datetime":1, "sTime":1, "penalties":1, "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]} }}
              ,{$sort:{score:1}}
            ]).toArray();

            return  {
              statusCode: 200,
              body: JSON.stringify(timerRcords)
            };
        }

        case 'POST':

              let new_record= JSON.parse(event.body);

              new_record.datetime= new Date();
              console.log(`POSTING NEW TIME, JSON.stringify(new_record)=:${JSON.stringify(new_record,null,2)} `);

              new_record= await cTime_Records.insertOne(new_record);
    
              return  { 
                statusCode: 201,
                body: JSON.stringify(new_record)
              };

          case 'DELETE':

          // var ObjectId = require('mongodb').ObjectId; const o_id = new ObjectId(id);
            const p_time_record_id= event.queryStringParameters.timeRecordId.toString();
            const delTimerRcords= await cTime_Records.deleteOne( { "_id" : new ObjectId(p_time_record_id) } );

            return  { 
              statusCode: 204,
              body: JSON.stringify(delTimerRcords)
            };



          default:
            return  {
              statusCode: 400,
              body: JSON.stringify({message: "Route not found"})
            };

    }

  } catch (error) {
    console.log(`error: ${error.toString()}`);
    return {statusCode: 500,
    body: error.toString()};
  }
}

module.exports= {handler}