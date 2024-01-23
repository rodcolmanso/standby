const data= [{'eventId':0, 'name':'Revolver', 'categories':{'overall':true,'ladies':false,'advance':false,'optics':false,'seniors':true},'advanceLimit':{'passingScore':5,'topBestOf':-1},'order':2}
,{'eventId':0, 'name':'Pistol', 'categories':{'overall':true,'ladies':true,'advance':true,'optics':false,'seniors':false},'advanceLimit':{'passingScore':5,'topBestOf':-1},'order':1}
,{'eventId':0, 'name':'Free Force', 'categories':{'overall':true,'ladies':false,'advance':false,'optics':true,'seniors':false},'advanceLimit':{'passingScore':4,'topBestOf':-1},'order':3}]

use('standby');
db.divisions.insertMany(data);

////Insert Event //6578ad76e53c8b23971032c4
 data= [{'name':'1º Campeonado Regional de TPM - Aldea da Serra','date': new Date('2014-01-14'),'img':'events/aldeia1.jpg'}];
use('standby');
db.events.insertMany(data);




db.divisions.updateMany({eventId:0}, {$set:{eventId:'6578ad76e53c8b23971032c4'}});

db.events.updateOne({_id:0}, {$set:{eventId:'6578ad76e53c8b23971032c4'}});


db.divisions.find({eventId:'6578ad76e53c8b23971032c4'}).sort({order:1})





// {"_id":"6578ad76e53c8b23971032c4","name":"1º Campeonado Regional de TPM - Aldea da Serra","date":"2014-01-14T00:00:00.000Z","img":"events/aldeia1.jpg"
//    ,"divisions":[{"_id":"6578a6dae53c8b23971032c1","eventId":"6578ad76e53c8b23971032c4","name":"Pistol","categories":{"overall":true,"ladies":true,"advance":true,"optics":false,"seniors":false},"advanceLimit":{"passingScore":5,"topBestOf":-1},"order":1}
//                 ,{"_id":"6578a94ae53c8b23971032c3","eventId":"6578ad76e53c8b23971032c4","name":"Revolver","categories":{"overall":true,"ladies":false,"advance":false,"optics":false,"seniors":true},"advanceLimit":{"passingScore":5,"topBestOf":-1},"order":2}
//                 ,{"_id":"6578a6dae53c8b23971032c2","eventId":"6578ad76e53c8b23971032c4","name":"Free Force","categories":{"overall":true,"ladies":false,"advance":false,"optics":true,"seniors":false},"advanceLimit":{"passingScore":4,"topBestOf":-1},"order":3}]
//             }


const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

const shooters= [{'name':'Jonathan','email':'jonathan@email.com','category':cOverall}
    ,{'name':'Pietro','email':'','category':cSeniors}
    ,{'name':'Herrera Andrade','email':'','category':cSeniors}
    ,{'name':'Mary','email':'','category':cLadies}
    ,{'name':'Petra Fagundes','email':'','category':cLadies} 
    ,{'name':'Fanny','email':'','category':cLadies}    
    ,{'name':'Augusto','email':'','category':cOverall}    
    ,{'name':'Bia','email':'','category':cLadies}
    ,{'name':'Tereza','email':'','category':cLadies}
    ,{'name':'Nazaret','email':'','category':cLadies}                                
    ,{'name':'Bruno','email':'','category':cOverall}
    ,{'name':'Fernando','email':'','category':cSeniors}                                
    ,{'name':'Matarazzo','email':'','category':cOverall}];
db.shooters.insertMany(shooters);
/*
    '0': ObjectId("6578d331e53c8b23971032c5"),
    '1': ObjectId("6578d331e53c8b23971032c6"),
    '2': ObjectId("6578d331e53c8b23971032c7"),
    '3': ObjectId("6578d331e53c8b23971032c8"),
    '4': ObjectId("6578d331e53c8b23971032c9"),
    '5': ObjectId("6578d331e53c8b23971032ca"),
    '6': ObjectId("6578d331e53c8b23971032cb"),
    '7': ObjectId("6578d331e53c8b23971032cc"),
    '8': ObjectId("6578d331e53c8b23971032cd"),
    '9': ObjectId("6578d331e53c8b23971032ce"),
    '10': ObjectId("6578d331e53c8b23971032cf"),
    '11': ObjectId("6578d331e53c8b23971032d0"),
    '12': ObjectId("6578d331e53c8b23971032d1")
*/


const cPistolDivision= '6578a6dae53c8b23971032c1';
const cRevolverDivision= '6578a94ae53c8b23971032c3';
const cFreeforceDivision='6578a6dae53c8b23971032c2';

const shooterDivision=[{'shooterId':'6578d331e53c8b23971032c5','divisionId':cPistolDivision,'gun':'Glock 22','optics':true}
                      ,{'shooterId':'6578d331e53c8b23971032c5','divisionId':cRevolverDivision,'gun':'RT 692','optics':false}
                

                      ,{'shooterId':'6578d331e53c8b23971032c6','divisionId':cPistolDivision,'gun':'Glock 19','optics':true}
                      ,{'shooterId':'6578d331e53c8b23971032c6','divisionId':cRevolverDivision,'gun':'S&W 33','optics':false}
                      ,{'shooterId':'6578d331e53c8b23971032c6','divisionId':cFreeforceDivision,'gun':'T4','optics':true}
                

                      ,{'shooterId':'6578d331e53c8b23971032c7','divisionId':cPistolDivision,'gun':'G2C 9','optics':false}
                      ,{'shooterId':'6578d331e53c8b23971032c7','divisionId':cRevolverDivision,'gun':'Rossi Imperador','optics':false}
                      ,{'shooterId':'6578d331e53c8b23971032c7','divisionId':cFreeforceDivision,'gun':'Nylon 66','optics':true}
                      

                      ,{'shooterId':'6578d331e53c8b23971032c8','divisionId':cPistolDivision,'gun':'TX22','optics':true}
                      ,{'shooterId':'6578d331e53c8b23971032c8','divisionId':cRevolverDivision,'gun':'RT66','optics':false}
                      ,{'shooterId':'6578d331e53c8b23971032c8','divisionId':cFreeforceDivision,'gun':'Delta 22','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032c9','divisionId':cPistolDivision,'gun':'Glock 19','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032c9','divisionId':cRevolverDivision,'gun':'Coult Phyton','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032c9','divisionId':cFreeforceDivision,'gun':'Thyphon 12','optics':true}

                ,{'shooterId':'6578d331e53c8b23971032ca','divisionId':cPistolDivision,'gun':'G2C 9','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032ca','divisionId':cRevolverDivision,'gun':'RT92','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032ca','divisionId':cFreeforceDivision,'gun':'AR 12','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032cb','divisionId':cPistolDivision,'gun':'G2C 9','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032cb','divisionId':cRevolverDivision,'gun':'Colt Pacemaker','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032cb','divisionId':cFreeforceDivision,'gun':'CBC Military','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032cc','divisionId':cPistolDivision,'gun':'TS9','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032cc','divisionId':cRevolverDivision,'gun':'Rossi 38','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032cc','divisionId':cFreeforceDivision,'gun':'Brigade BMF-9','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032cd','divisionId':cPistolDivision,'gun':'PT59','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032cd','divisionId':cRevolverDivision,'gun':'Rossi 38','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032cd','divisionId':cFreeforceDivision,'gun':'Fire Eagle 9','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032ce','divisionId':cPistolDivision,'gun':'Glock 22','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032ce','divisionId':cRevolverDivision,'gun':'Coult Phyton','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032ce','divisionId':cFreeforceDivision,'gun':'CBC Military','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032cf','divisionId':cPistolDivision,'gun':'TS9','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032cf','divisionId':cRevolverDivision,'gun':'RT Hunter','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032cf','divisionId':cFreeforceDivision,'gun':'Colt M16','optics':true}
                
                ,{'shooterId':'6578d331e53c8b23971032d0','divisionId':cPistolDivision,'gun':'PT59','optics':true}
                ,{'shooterId':'6578d331e53c8b23971032d0','divisionId':cRevolverDivision,'gun':'RT 66','optics':false}
                
                ,{'shooterId':'6578d331e53c8b23971032d1','divisionId':cPistolDivision,'gun':'Glock 22','optics':false}
                ,{'shooterId':'6578d331e53c8b23971032d1','divisionId':cRevolverDivision,'gun':'S&W 32','optics':false}
        ];

        db.shooters_divisions.insertMany(shooterDivision);


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
        

        const time_records= [{'shooterId':'6578d331e53c8b23971032c5','divisionId':'6578a6dae53c8b23971032c1', 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3)}
                            ,{'shooterId':'6578d331e53c8b23971032cb','divisionId':'6578a6dae53c8b23971032c1', 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3)}
                            ,{'shooterId':'6578d331e53c8b23971032c5','divisionId':'6578a94ae53c8b23971032c3', 'datetime':getRandomDateTime(),'sTime':getRandomFloat(1.5, 12, 2),'penalties': getRandomInt(0, 3)}
                            ];
    
        db.time_records.insertMany(time_records);
        
        db.time_records.updateMany({divisionId:"6578ad76e53c8b23971032c4"}, {$set:{divisionId:'6578a6dae53c8b23971032c1'}});

        db.time_records.aggregate([
            {
                "$project":{"shooterId":1, "divisionId":1, "datetime":1, "sTime":1, "penalties":1, "score":{"$add":["$sTime","$penalties"]}},
            }
            ]) .sort({"score":1});

     db.time_records.aggregate([
                {
                    "$project":{"shooterId":1, "divisionId":1, "datetime":1, "sTime":1, "penalties":1, "score":{"$add":["$sTime","$penalties"]}},
                }
                ,{$match:
                    {"divisionId": "6578a6dae53c8b23971032c1"}
                }
                ,{
                    "$group":
                    {
                        _id:["$shooterId","$divisionId"],
                        tries:{$count:{}},
                        score:{$min:"$score"}
                    }}
            ]).sort({"score":1});
    
        
        
        // [{_id: [ '6578d331e53c8b23971032cb', '6578a6dae53c8b23971032c1' ], tries: 1, score: 12.73}
        // ,{_id: [ '6578d331e53c8b23971032c5', '6578a94ae53c8b23971032c3' ], tries: 1, score: 11.85}
        // ,{_id: [ '6578d331e53c8b23971032c5', '6578a6dae53c8b23971032c1' ],tries: 4,score: 5.93}]

       


        db.time_records.aggregate([
            {
                $lookup:
                  {
                    from: "shooters_divisions",
                    let: {record_shooter_id: "$shooterId", record_division_id:"$divisionId"},
                    pipeline:[{ $match:
                        { $expr:
                           { $and:
                              [
                                { $eq: [ "$shooterId",  "$$record_shooter_id" ] },
                                { $eq: [ "$divisionId", "$$record_division_id" ] }
                              ]
                           }
                        }
                     },
                     { $project: {  shooterId: 0, _id: 0 } }
                    ],
                    as: "registered"
                  }
             }
             ,
             { $project: {  divisionId: 0,  } }
        ])


/////////////////
// shooterId: '6578d331e53c8b23971032c5',
//divisionId: '6578a6dae53c8b23971032c1',
//
// shooterId: '6578d331e53c8b23971032c5',
//divisionId: '6578a94ae53c8b23971032c3',
//
// shooterId: '6578d331e53c8b23971032cb',
//divisionId: '6578a6dae53c8b23971032c1',
/////////////////

db.shooters.aggregate([
    {$match:{eventId: "6578ad76e53c8b23971032c4"}} //"6578ad76e53c8b23971032c4"
    ,{ "$addFields": { "shooterId": { "$toString": "$_id" }}},
    {$lookup:
        {
            from: "shooters_divisions",
            let: {div_shooterId:"$shooterId", div_divisionId:"$divisionId"},
            pipeline: [
                { $match: { $expr: 
                                { $eq: [ "$shooterId", "$$div_shooterId" ] }
                          } 
                }
                //,{ $project: { shooterId: 0, _id:0 } }
                ,{ $lookup:
                      {
                        from: "time_records",
                        let: {record_shooter_id: "$shooterId", record_division_id:"$divisionId"},
                        pipeline:[{ $match:
                            { $expr:
                               { $and:
                                  [
                                    { $eq: [ "$shooterId",  "$$record_shooter_id" ] },
                                    { $eq: [ "$divisionId", "$$record_division_id" ] }
                                  ]
                               }
                            }
                         }
                         ,{
                            $project:{ "score":{"$add":["$sTime","$penalties"]}},
                        }
                        ,{$group:
                            { _id:["$shooterId","$divisionId"],
                               tries:{$count:{}},
                                score:{$min:"$score"},
                                fistTry:{$min:"$datetime"}
                            }
                        }
                        ],
                        as: "time_records"
                      }
                 }
                 ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
                ],
            as: "registered"
        }
    }            
    ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0, "registered.time_records":0}}
]).sort({"registered.score":1, "registered.tries":1, "registered.fistTry":1});

///////////-------------
db.shooters_divisions.aggregate([
    {$match:
        {"divisionId": "6578a6dae53c8b23971032c2"} //6578a94ae53c8b23971032c3, 6578a6dae53c8b23971032c2, 6578a6dae53c8b23971032c1
    }
    ,{
        $lookup:
          {
            from: "time_records",
            let: {record_shooter_id: "$shooterId", record_division_id:"$divisionId"},
            pipeline:[{ $match:
                { $expr:
                   { $and:
                      [
                        { $eq: [ "$shooterId",  "$$record_shooter_id" ] },
                        { $eq: [ "$divisionId", "$$record_division_id" ] }
                      ]
                   }
                }
             }
             ,{
                "$project":{ "score":{"$add":["$sTime","$penalties"]}},
            }
            ,{
                "$group":
                {
                    _id:["$shooterId","$divisionId"],
                    tries:{$count:{}},
                    score:{$min:"$score"}
                }}
            ],
            as: "records"
          }
     }
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$records", 0 ] }, "$$ROOT" ] } } }
    ,{ $project: { "records": 0 } }
]).sort({"score":1});



/////////////////
db.shooters_divisions.aggregate([
    { $addFields: { "q_shooterId": { $toObjectId: "$shooterId" }}},
    {$lookup:
        {
            from: "shooters",
            let: {s_shooterId: "$_id"},
            pipeline: [
                { $match: { $expr: 
                                { $and:
                                    [
                                        { $eq: [ "$q_shooterId", "$$s_shooterId" ] }
                                    ]}
                          } }
                ],
            as: "shooter_info"
        }
    },
]);


/////////////////
db.shooters_divisions.aggregate([
    { $addFields: { "obj_id": { $toObjectId: "$shooterId" }}},
    {$lookup:
        {
            from: "shooters",
            localField:"obj_id'",
            foreignField: "_id",
            as: "shooter_info"
        }
    },
]);




//db.shooters.updateMany({}, {$set:{eventId:['6578ad76e53c8b23971032c4']}});


db.time_records.aggregate([
    {$match:{shooterId: "6578d331e53c8b23971032c5", divisionId: "6578a6dae53c8b23971032c1"}}
    ,{"$project":{"shooterId":1, "divisionId":1, "datetime":1, "sTime":1, "penalties":1, "score":{"$add":["$sTime","$penalties"]}}}
    ,{$sort:{score:1}}
  ]);

  db.shooters_divisions.createIndex( {"shooterId":1, "divisionId":1}, { "unique": true } );



  db.shooters_divisions.insertOne({"shooterId": '6578d331e53c8b23971032cb',
    "divisionId": '6578a6dae53c8b23971032c2',
    "gun": 'NEW REC TESTE',
    "optics": true});



    db.shooters.updateOne({ "_id" : ObjectId("6578d331e53c8b23971032d0") }
                                                 ,{ $set: { 
                                                   "name" : 'Fernandex'
                                                   ,"email": 'ema@el.c' 
                                                   ,"category": 0 
                                                   ,"eventId": ['6578ad76e53c8b23971032c4']
                                                  }
                                                 });



db.shooters.createIndex( {"name":1, "eventId":1}, { "unique": true } );




///
db.divisions.aggregate([{$match:{eventId:"6578ad76e53c8b23971032c4"}}])


db.events.updateOne({ "_id" : ObjectId("6578ad76e53c8b23971032c4") }
                    ,{ $set: { 
                    "local" : 'CT Aldeia'
                    ,"img": '/img/shooters_lineup.jpg' 
                    }
                    });



////Insert Event //6578ad76e53c8b23971032c4
data= [{'name':'2º Campeonado Regional de TPM - CT Marília', 'local': 'CT Mariilia','date': new Date('2024-02-12'),'img':'/img/shooters_lineup.jpg'}
     ,{'name':'1º Nacional de TPM - CT Pinda', 'local': 'CT Pinda','date': new Date('2024-03-20'),'img':'/img/shooters_lineup.jpg'}];
db.events.insertMany(data);