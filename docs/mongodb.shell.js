const { ObjectId } = require("mongodb");

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

//   db.shooters_divisions.createIndex( {"shooterId":1, "divisionId":1}, { "unique": true } );
  db.shooters_divisions.createIndex( {"shooterId":1, "divisionId":1, "gun":1}, { "unique": true } );
  db.shooters_divisions.createIndex( {"shooterId":1, "divisionId":1, "gunId":1}, { "unique": true } );
  db.shooters_divisions.createIndex( {"shooterId":1, "divisionId":1, "gunId":1, "gun":1}, { "unique": true } );




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



// db.shooters.createIndex( {"name":1, "eventId":1}, { "unique": true } );
db.shooters.createIndex( {"email":1}, { "unique": true } );

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


//====================2024-04-22 Find shooters_division by email ==================
    db.shooters.aggregate([
        { "$addFields": { 
            "shooterId": { "$toString": "$_id" }
            ,"p_event_Id": "65b03f80081f13eb9a8d8c1a"
        }}
        ,{$lookup:
            {
                from: "shooters_divisions"
                ,localField: "shooterId"
                ,foreignField: "shooterId"
                ,let: {p_event_Id:"$p_event_Id"}
                ,pipeline: [
                    { "$addFields": { "division_id": { "$toObjectId": "$divisionId" }
                                ,"p_event_Id":"$$p_event_Id"
                                    }
                    },
                    { $lookup:
                        {
                            from: "divisions"
                            ,localField:"division_id"
                            ,foreignField: "_id"
                            ,let:{p_event_Id: "$p_event_Id"}
                            ,pipeline:[ { $match: {$expr:{$and:
                                [{$eq: ["$eventId", "$$p_event_Id"]}
                                ,{}]
                            }}}]
                            ,as: "divisions"
                        }
                    }
                    ,{$match: {divisions: {$ne: []}}}
                    ]
                ,as: "shooters_divisions"
            }
        }
        ,{$match:{ $and:[{email: "petra@tpm.com"}
                        // ,{shooters_divisions: {$ne: []}}
                    ]
                }}
        ,{$project:{"_id":0,"eventId":0,"p_event_Id":0,"shooters_divisions.shooterId":0,"shooters_divisions.division_id":0,"shooters_divisions.p_event_Id":0 ,"shooters_divisions.divisions.advanceLimit":0,"shooters_divisions.divisions.order":0,"shooters_divisions.divisions.categories":0,"shooters_divisions.divisions._id":0}}
        ])
//=================================================================================
//====================2024-04-23 Find shooters_division by email. New shooter_division with eventId==================
db.shooters.aggregate([
    { "$addFields": { 
        "shooterId": { "$toString": "$_id" }
    }}
    ,{$lookup:
        {
            from: "shooters_divisions"
            ,localField: "shooterId"
            ,foreignField: "shooterId"
            ,pipeline: [
                { $match: { eventId: "661ab4f9c412f4a5f17f0624"}}
                ]
            ,as: "shooters_divisions"
        }
    }
    ,{$match:{ $and:[{email: "lucca@tpm.com"}
                    // ,{shooters_divisions: {$ne: []}}
                ]
            }}
    ,{$project:{"_id":0,"eventId":0,"shooters_divisions.shooterId":0}}
    ])
//=================================================================================


    db.shooters_divisions.aggregate([
        { $match: {$expr:{$and:
                            [{$eq: ["$eventId", "661ab4f9c412f4a5f17f0624" ]}
                            ,{}]}}}
        ,{ "$addFields": { "shooterId": { "$toObjectId": "$shooterId" }}}
        ,{$lookup:{
            from: "shooters"
            ,localField: "shooterId"
            ,foreignField: "_id"
            ,as: "shooters"
            }   
        }
        ,{ "$addFields": {"shooterDivision_Id": { "$toString": "$_id" }}}
        ,{ $lookup:
            {
                from: "time_records"
                ,localField: "shooterDivision_Id"
                ,foreignField: "shooterDivisionId"
                ,as: "time_records"
            }
        }
        ,{$project:{"shooters.eventId":0}}
        ])

        // ======================

        db.shooters.aggregate([
            { "$addFields": {"shooterId": { "$toString": "$_id" }}}
            ,{$lookup:{
                from: "shooters_divisions"
                ,localField: "shooterId"
                ,foreignField: "shooterId"
                ,as: "registered"
                ,pipeline:[
                    {$match:{eventId:"661ab4f9c412f4a5f17f0624"}}
                    ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
                    ,{ $lookup:
                        {
                            from: "time_records"
                            ,localField: "shooterDivisionId"
                            ,foreignField: "shooterDivisionId"
                            ,as: "time_records"
                            ,pipeline:[
                                {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                                ,{$group:
                                    { _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}
                                }
                            ]
                        }
                    }
                    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
                ]
                }
            }
            ,{$match: {registered: {$ne: []}}}
            ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
            ]).sort({"registered.score":1})



//===========================================

db.events.aggregate( [
    // Stage 1: Filter 
    {
        $match:{_id:  ObjectId("661ab4f9c412f4a5f17f0624")}
    }
    ,{ "$addFields": { "eventId": { "$toString": "$_id" }, "eventIdd": { "$toString": "$_id" }}}
    // Stage 1: Leftjoin with divisions
    ,{
      $lookup:
        {
          from: "divisions",
          localField: "eventId",
          foreignField: "eventId",
          as: "divisions"
          ,pipeline:[
            { "$addFields": { "divisionId": { "$toString": "$_id" }}}
            ,{$lookup:{ from: "shooters_divisions"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "count_shooters_divisions"
                      ,pipeline:[
                        {$group: {_id: "$divisionId"
                                  ,subscribers:{$sum:1}}}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$count_shooters_divisions", 0 ] }, "$$ROOT" ] } } }
            ,{$lookup:{ from: "time_records"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "best"
                      ,pipeline:[
                        { "$addFields": { "_penalty": {$sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}}}
                        ,{$group: {_id: "$divisionId"
                                  ,best_score:{$min:"$_penalty"}
                        }}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$best", 0 ] }, "$$ROOT" ] } } }
          ]
        }
   }
   ,{"$project":{"divisions.count_shooters_divisions":0, "divisions.best":0}}
    // Stage 3: Sort events by event_date in descending order
  ,{
       $sort: { "date": -1 }
    }
  ] )

//=================================================================

  db.events.aggregate( [
    {$match:{_id: ObjectId('661ab4f9c412f4a5f17f0624')
            , owners: 'pris.rocha@gmail.com'}}
  ]);



//=================================================================
db.shooters_divisions.aggregate( [
    {$match:{_id: { $in: [ObjectId('000000000000000000000000')
                        ,ObjectId('6626d668f670ad607b70cf9e')
                        ,ObjectId('662807725a3a3004ecd39792')
                        ,ObjectId('662807725a3a3004ecd39793')
                        ,ObjectId('662807785a3a3004ecd39794')
                        ,ObjectId('662807785a3a3004ecd39795')
                        ,ObjectId('6628077f5a3a3004ecd39796')
                        ,ObjectId('6628077f5a3a3004ecd39797')
                        ]} }}
    ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
    ,{ $lookup:{ from: "events"
             ,localField: "eventId"
             ,foreignField: "_id"
             ,as: "events_adm"
             ,pipeline:[
                {$match:{"owners": 'pris.rocha@gmail.com'}}
             ]
    }}
    ,{ $addFields: { "shooterId": { $toObjectId: "$shooterId" }}}
    ,{$lookup:{ from: "shooters"
        ,localField: "shooterId"
        ,foreignField: "_id"
        ,as: "shooters"
        ,pipeline:[
            {$match:{"email": 'pris.rocha@gmail.com'}}
         ]
    }}
    ,{$match: { $or:[ {events_adm: {$ne: []}}, {shooters: {$ne: []}} ]  }}
    ]);






// ======================
db.shooters_divisions.aggregate([
      {$match:{eventId: "661ab4f9c412f4a5f17f0624" //  p_eventId
              ,divisionId:"00000000c412f4a5f17f0625"  //p_division 
              ,duel:true}}
              ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
              ,{$lookup:
                {    from: "events"
                ,localField: "eventId"
                ,foreignField: "_id"
                ,as:"event" }}
              ,{ $addFields: { "_shooterId": { $toObjectId: "$shooterId" }}}   
              ,{$lookup:
                  {    from: "shooters"
                      ,localField: "_shooterId"
                      ,foreignField: "_id"
                      ,as:"shooter" //"shooters"
                  }
              } 
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }           
              ,{$project:{"_shooterId":0,"shooter":0}}
              /// Stage time records
              ,{ "$addFields": { "shooterDivisionId": { "$toString": "$_id" }}}
              ,{ $lookup:
                  {from: "time_records"
                  ,localField:"shooterDivisionId"
                  ,foreignField: "shooterDivisionId"
                  ,as:"time_records"
                  ,pipeline:[
                    {$project:{
                          "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}
                          ,datetime:1
                      }}
                    ,{$group:
                        { _id:["$shooterDivisionId"],
                           tries:{$count:{}},
                            score:{$min:"$score"},
                            datetime:{$min:"$datetime"}
                        }
                    }]}
             }
             ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
             ,{$project:{"time_records":0}}
          ]).sort({"score":1,"tries":1, "datetime":1}).toArray();



  db.shooters_divisions.deleteMany({divisionId:"00000000c412f4a5f17f0625"})


// ==========================
db.shooters.aggregate([
    { "$addFields": {"shooterId": { "$toString": "$_id" }}}
    ,{$lookup:{
        from: "shooters_divisions"
        ,localField: "shooterId"
        ,foreignField: "shooterId"
        ,as: "registered"
        ,pipeline:[
            {$match:{eventId: "661ab4f9c412f4a5f17f0624"}}
            ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
            ,{ $lookup:
                {
                    from: "time_records"
                    ,localField: "shooterDivisionId"
                    ,foreignField: "shooterDivisionId"
                    ,as: "time_records"
                    ,pipeline:[
                        // {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                        {$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                        
                        // ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}}
                        ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}, penalties:{$min:"$penalties"}}}
                    ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
        ]
        }
    }
    ,{$match: {registered: {$ne: []}}}
    ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
    ]).sort({"registered.score":1}).toArray();

// ==========================




/////////=========
db.events.aggregate( [
    // Stage 1: Filter pizza events by date range
    {
       $match: {_id:ObjectId("6621d4cfc55df3c3e277cc2a")}
    }
    ,{ "$addFields": { "eventId": { "$toString": "$_id" }, "eventIdd": { "$toString": "$_id" }}}
    // Stage 1: Leftjoin with divisions
    ,{
      $lookup:
        {
          from: "divisions",
          localField: "eventId",
          foreignField: "eventId",
          as: "divisions"
          ,pipeline:[
            { "$addFields": { "divisionId": { "$toString": "$_id" }}}
            ,{$lookup:{ from: "shooters_divisions"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "count_shooters_divisions"
                      ,pipeline:[
                        {$group: {_id: "$divisionId"
                                  ,subscribers:{$sum:1}}}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$count_shooters_divisions", 0 ] }, "$$ROOT" ] } } }
            ,{$lookup:{ from: "time_records"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "best"
                      ,pipeline:[
                        { "$addFields": { "_penalty": {$sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}}}
                        ,{$group: {_id: "$divisionId"
                                  ,best_score:{$min:"$_penalty"}
                        }}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$best", 0 ] }, "$$ROOT" ] } } }
          ]
        }
   }
   ,{"$project":{"divisions.count_shooters_divisions":0, "divisions.best":0}}
    // Stage 3: Sort events by event_date in descending order
  ,{
       $sort: { "date": -1 }
    }
  ] )







//   =============
db.shooters.aggregate([
    { "$addFields": { 
        "shooterId": { "$toString": "$_id" }
    }}
    ,{$lookup:
        {
            from: "shooters_divisions"
            ,localField: "shooterId"
            ,foreignField: "shooterId"
            ,pipeline: [
                { $match: { eventId: p_eventId}}
                ]
            ,as: "shooters_divisions"
        }
    }
    // ,{$match:{ $and:[{email: p_email}]}
    ,{$match: fEmail }
    ,{$match: {shooters_divisions: {$ne: []}}}
    ,{$project:{"eventId":0}}
    ]).toArray();


    // ============== Relatorio de Custo/checkout/ ================

    // Atirador    Passagens   Vl 1ª Passagen      Vl 2ª Passagen  Vl 3ª Passagens Vl Demais passagens Total

    // Divisão     Total de Passagens      Vl 1ª Passagen      Vl 2ª Passagen  Vl 3ª Passagens Vl Demais passagens

    db.time_records.aggregate([
        {$match:{eventId:'661ab4f9c412f4a5f17f0624'}}
        ,{$addFields:{"_shooterId":{$toObjectId:"$shooterId"}
                     ,"_eventId"  :{$toObjectId:"$eventId"}
                     ,"_divisionId"  :{$toObjectId:"$divisionId"}
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
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
        ,{$group:{
            // _id:["$divisionName","$shooterId", "$email" , "$name" ,"$vl_first_try", "$vl_second_try", "$vl_other_tries"],
            _id:["$shooterId", "$email" , "$name" ,"$vl_first_try", "$vl_second_try", "$vl_other_tries"],
            tries:{$count:{}}
        }}
    ]);

    db.events.aggregate(
        [
         {$match: {owners: 'rodrigo2000inf@hotmail.com'}}
        ,{$addFields:{"eventId": { "$toString": "$_id" }}}
        // ,{$group:{_id:null, Xyz:{$push:"$eventId"}}}
        ,{$project:{eventId:1,_id:0}}
        ]).toArray()[0].eventId;




        db.events.aggregate(
            [
                {$match: {owners: 'pris.rocha@gmail.com'}}
            ,{$addFields:{"eventId": { "$toString": "$_id" }}}
            ,{$group:{_id:null, array:{$push:"$eventId"}}}
            ,{$project:{array:true,_id:false}}
            ]).toArray()[0].array



// =============================================================================================
// =========================Encontrando usuarios sem eventos para deletar em massa =============
// =============================================================================================

            db.shooters.aggregate(
                [{ $match:{ docnum:{$exists:false}}}
                ,{$addFields:{"shooterId": { "$toString": "$_id" }}}
                ,{$lookup:
                    {
                        from: "shooters_divisions"
                        ,localField: "shooterId"
                        ,foreignField: "shooterId"
                        ,as: "shooters_divisions"
                    }
                }
                ,{ $match:{ shooters_divisions:{$eq:[]}}}
                ,{$group:{_id:null, array:{$push:"$email"}}}
                ,{$project:{array:true,_id:false}}
                ]
            ).toArray()[0].array;

            db.shooters.deleteMany(
                { email:{$in:[
                    'jonathan.ggg@tpm.com',
                    'mary@tpm.com',
                    'petra@tpm.com',
                    'ema@el.com.vc',
                    'jonathan@tpm.com',
                    'mf@t.c',
                    'jecson@tpm.com',
                    'testes@teste',
                    'rmanso@outlook.com',
                    'pedro@tpm.com.br',
                    'priscila.manso@tivit.com',
                    'guto@tpm.com',
                    'guilherme@rozzino.com'
                  ]
                  }}    
            )


            db.shooters.updateMany({}, [{$set:{docnum:{ "$toString": "$_id" }}}])

            db.shooters.createIndex( {"docnum":1}, { "unique": true } );

        //sudo ntl functions:invoke identity-login


// -------------------------------------------------------

    db.shooters.aggregate( 
        { $match:{ _id: ObjectId("661be2184277ae7378717fe3")}}
        ,{$addFields:{"shooterId": { $toString: "$_id" }}}
        ,{$lookup:
            {
                from: "time_records"
                ,localField: "shooterId"
                ,foreignField: "shooterId"
                ,as: "time_records"
                ,pipeline:[
                    {$addFields:{"divisionId": { $toObjectId: "$_divisionId" }}}
                    ,{$lookup:
                        {   from: "divisions"
                            ,localField: "_divisionId"
                            ,foreignField: "id"
                            ,as: "divisions"}}
                    
                    // ,{$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                    // ,{$group:{ _id:["$name"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}, penalties:{$min:"$penalties"}}}
                
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$divisions", 0 ] }, "$$ROOT" ] } } }]
            }
            
        }
    )





    // ===========================



    db.shooters.aggregate([
        { "$addFields": {"shooterId": { "$toString": "$_id" }}}
        ,{$lookup:{
            from: "shooters_divisions"
            ,localField: "shooterId"
            ,foreignField: "shooterId"
            ,as: "registered"
            ,pipeline:[
                {$match:{eventId: '6686f9ca62206161ff93e174'}}
                // {$match:_match}
                ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
                ,{ $lookup:
                    {
                        from: "time_records"
                        ,localField: "shooterDivisionId"
                        ,foreignField: "shooterDivisionId"
                        ,as: "time_records"
                        ,pipeline:[
                            // {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                            {$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                            
                            // ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}}
                            ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$max:"$datetime"}, penalties:{$min:"$penalties"}}}
                        ]
                    }
                }
                ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
            ]
            }
        }
        ,{$match: {registered: {$ne: []}}}
        ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
        ]).sort({"registered.score":1}).toArray();


// =====================================================================================================================
db.time_records.aggregate(
    [{$group: {
        _id: {shooterId:"$shooterId"
             ,eventId: "$eventId"
             ,divisionId: "$divisionId"}
        ,bestTime: {$min:"$sTime"}
        }
    }
    ,{$replaceRoot: { newRoot: {$mergeObjects:["$_id", "$$ROOT"] } } }
    ,{$project: {_id:0} }
    ,{$addFields:{_shooterId:{$toObjectId:"$shooterId"}
    ,_divisionId:{$toObjectId:"$divisionId"}}}
    ,{$lookup:{
        from: "shooters"
        ,localField: "_shooterId"
        ,foreignField: "_id"
        ,as: "shooter"
    }}
    ,{$lookup:{
        from: "divisions"
        ,localField: "_divisionId"
        ,foreignField: "_id"
        ,as: "division"
    }}
]);

30056800000
52699999

lpad = function (str, len, padstr=" ") {
    var redExpr={$reduce:{
      input:{$range:[0,{$subtract:[len, {$strLenCP:str}]}]},
      initialValue:"",
      in:{$concat:["$$value",padstr]}}};
    return {$cond:{
      if:{$gte:[{$strLenCP:str},len]},
      then:str,
      else:{$concat:[ redExpr, str]}
    }};
}

100505000000

db.time_records.aggregate([
    {$addFields:{_shooterId:{$toObjectId:"$shooterId"}
                ,_divisionId:{$toObjectId:"$divisionId"}
                ,_eventId:{$toObjectId:"$eventId"}
                ,_shooterDivisionId:{$toObjectId:"$shooterDivisionId"}}}
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
            {$addFields:{eventName:"$name",clockDate:"$date"}}
        ]
    }}
    ,{$lookup:{
        from: "shooters_divisions"
        ,localField: "_shooterDivisionId"
        ,foreignField: "_id"
        ,as: "shooter_division"
    }}
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter_division", 0 ] }, "$$ROOT" ] } } }
    ,{$group: {
        _id: {shooterId:"$shooterId"
             ,shooterName:"$shooterName"
             ,eventId: "$eventId"
             ,eventName: "$eventName"
             ,local: "$local"
             ,clockDate: "$clockDate"
             ,divisionName: "$divisionName"
             ,gun: "$gun"
             ,optics: "$optics"}
             ,bestTime: {$min:{$sum:[ {$multiply:[10000,"$penalties"]},"$sTime"]}}
            //  ,sortFiled: {$concat: [ "$divisionName", " - ", {$toString:"$sTime"} ] }
        }
    }
    // ,{$project: { sortFiled: { $concat: [ "_id.$divisionName", " - ", {$toString:{$round:[ {$multiply:[100000,{$round:["$_id.bestTime",2]} ]},0]}} ] } } }
    ,{$replaceRoot: { newRoot: {$mergeObjects:["$_id", "$$ROOT"] } } }
    ,{$project: {_id:0} }
    ,{$match: {}}
]).sort({ divisionName:1, shooterName:1, bestTime:1});
// =====================================================================================================================

db.shooters_divisions.aggregate([
    // {$project:{gunl:{$toLower:"$gun"}}}
    {$project:{_id:0, gun:{$toLower:{ $replaceAll :{ input:"$gun", find:" ", replacement:""}}}}}
    ,{$group:{_id:{gun:"$gun"}
              ,count:{$count:{}}}}
    ]).sort({gun:1});


// =====================================================================================================================

db.shooters_divisions.find({gun: {$regex:/rt627/i}});
db.shooters_divisions.updateMany({gun: {$regex:/rt627/i}}, {$set:{gun:'RT 627'}});


// ==================================================================

db.shooters.aggregate([
    { "$addFields": {"shooterId": { "$toString": "$_id" }}}
    ,{$lookup:{
        from: "shooters_divisions"
        ,localField: "shooterId"
        ,foreignField: "shooterId"
        ,as: "registered"
        ,pipeline:[
            // {$match:_match},
            { "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
            ,{ $lookup:
                {
                    from: "time_records"
                    ,localField: "shooterDivisionId"
                    ,foreignField: "shooterDivisionId"
                    ,as: "time_records"
                    ,pipeline:[
                        // {$project:{ "score":{"$add":["$sTime","$penalties"]} ,datetime:1}}
                        {$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                        
                        // ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$min:"$datetime"}}}
                        ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$max:"$datetime"}, penalties:{$min:"$penalties"}}}
                    ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
        
            ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
            ,{ $lookup:
                {
                    from: "guns"
                    ,localField: "_gunId"
                    ,foreignField: "_id"
                    ,as: "gun_det"
                }
            }
          ]
        }
    }
    ,{$match: {registered: {$ne: []}}}
    ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
    ]).sort({"registered.score":1}).toArray();

    //===================================================


    db.shooters_divisions.aggregate([
        {$match:{eventId: "66958096492636e283f83f4c" //  p_eventId
                ,divisionId: "00000000492636e283f83f4d"  //p_division 
                ,duel:true}}
        ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
        ,{$lookup:
          {    from: "events"
          ,localField: "eventId"
          ,foreignField: "_id"
          ,as:"event" }}
        ,{ $addFields: { "_shooterId": { $toObjectId: "$shooterId" }}}   
        ,{$lookup:
            {    from: "shooters"
                ,localField: "_shooterId"
                ,foreignField: "_id"
                ,as:"shooter" //"shooters"
            }
        } 
        ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }           
        ,{$project:{"_shooterId":0,"shooter":0}}
        /// Stage time records
        ,{ "$addFields": { "shooterDivisionId": { "$toString": "$_id" }}}
        ,{ $lookup:
            {from: "time_records"
            ,localField:"shooterDivisionId"
            ,foreignField: "shooterDivisionId"
            ,as:"time_records"
            ,pipeline:[
              {$project:{
                    "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}
                    ,datetime:1
                }}
              ,{$group:
                  { _id:["$shooterDivisionId"],
                     tries:{$count:{}},
                      score:{$min:"$score"},
                      datetime:{$min:"$datetime"}
                  }
              }]}
       }
       ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
       ,{$project:{"time_records":0}}
       ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
       ,{ $lookup:
           {
               from: "guns"
               ,localField: "_gunId"
               ,foreignField: "_id"
               ,as: "gun_det"
           }
       }
    ]).sort({"score":1,"tries":1, "datetime":1}).toArray();

    //==================================

    db.shooters.aggregate([
        { "$addFields": { 
            "shooterId": { "$toString": "$_id" }
        }}
        ,{$lookup:
            {
                from: "shooters_divisions"
                ,localField: "shooterId"
                ,foreignField: "shooterId"
                ,pipeline: [
                    { $match: { eventId: "66958096492636e283f83f4c"}}
                    ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
                    ,{ $lookup:
                      {
                          from: "guns"
                          ,localField: "_gunId"
                          ,foreignField: "_id"
                          ,as: "gun_det"
                      }
                    }
                ]
                ,as: "shooters_divisions"
            }
        }
    //    ,{$match: fEmail }
    
        ,{$project:{"eventId":0}}
        ]).toArray();






// ==============================

db.time_records.aggregate([
    {$addFields:{_shooterId:{$toObjectId:"$shooterId"}
                ,_divisionId:{$toObjectId:"$divisionId"}
                ,_eventId:{$toObjectId:"$eventId"}
                ,_shooterDivisionId:{$toObjectId:"$shooterDivisionId"}}}
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
            {$addFields:{eventName:"$name",clockDate:"$date"}}
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
            // ,{ $project: { type:1, factory:1, model:1, caliber:1, operation:1, alias: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] } } }
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
             ,shooterName:"$shooterName"
             ,eventName: "$eventName"
             ,local: "$local"
             ,clockDate: "$clockDate"
             ,gunFullName: "$gunFullName"
             ,type: "$type"
             ,gunId: "$gunId"
             ,optics: "$optics"}
             ,bestTime: {$min:{$sum:[ {$multiply:[10000,"$penalties"]},"$sTime"]}}
        }
    }
    ,{$replaceRoot: { newRoot: {$mergeObjects:["$_id", "$$ROOT"] } } }
    ,{$project: {_id:0} }
    // ,{$match: _filter}
  ]).sort({ divisionName:1, bestTime:1, shooterName:1, gun:1, optics:1}).toArray();
//   .sort({ divisionName:1, shooterName:1, gun:1, optics:1, bestTime:1}).toArray();




// --=============================================
db.kos.aggregate(
    [//{$match:{eventId:"66958096492636e283f83f4c", divisionId:"00000000492636e283f83f4d"}},
    {$lookup:
        {
            from: "shooters_divisions"
            ,localField: "divisionId"
            ,foreignField: "divisionId"
            ,pipeline: [{$match:{shooterId:"668011c2c06847c9a6515a7b"}}]
            ,as: "shooters_divisions"
        }
    }
    ,{$match:{shooters_divisions:{$ne:[]}}}
    ]).toArray();



    db.time_records.aggregate(
        [//{$match:{eventId:"66958096492636e283f83f4c", divisionId:"00000000492636e283f83f4d"}},
        {$lookup:
            {
                from: "shooters_divisions"
                ,localField: "divisionId"
                ,foreignField: "divisionId"
                ,let:{"p_shooterId":"$shooterId"}
                ,pipeline: [{$match:{ $expr:{$and:[{$eq:["$$p_shooterId","$shooterId"]},{shooterId:"6680248cc06847c9a66248f3"}]}}}]
                ,as: "shooters_divisions"
            }
        }
        ,{$match:{shooters_divisions:{$ne:[]}}}
        ]).toArray();


        db.shooters_divisions.aggregate(
            [{$match:{eventId:"66958096492636e283f83f4c",divisionId:"00000000492636e283f83f4d"}},
             {$lookup:{
                from: "kos"
                ,localField: "divisionId"
                ,foreignField: "divisionId"
                ,as: "kos"
             }}
             ,{$match:{kos:{$ne:[]}}}

            ]
        ).toArray();



        db.kos.aggregate([
             {$match:{eventId:"66958096492636e283f83f4c",divisionId:"00000000492636e283f83f4d"}}
             ,{$addFields:{eventId:{$toObjectId:"$eventId"}}}
            ,{$lookup:{
                from: "events"
                ,localField: "eventId"
                ,foreignField: "_id"
                ,as: "events"
             }}
            ,{$match:{events:{$ne:[]}}}
        ]);


        db.duel_results.insertMany([{
            "eventId": "66958096492636e283f83f4c",
            "divisionId": "00000000492636e283f83f4d",
            "_category": 0,
            "duelDate": "2024-07-18T21:00:00.000Z",
            "duelId": "r.4.0",
            "shooterDivisionId": "66999869c320bcf6e804e264",
            "v_shooterId": "6684825ec06847c9a6dd5fe5",
            "v_shooterName": "Marcos Stolses",
            "v_gun": "G17",
            "v_optics": false,
            "v_gunId": "669c8e49e5d894d10adf6933",
            "v_gunModel": "G17",
            "v_gunFactory": "Glock",
            "d_shooterId": "66648fcdf4d045c776fa7937",
            "d_shooterName": "Guilherme Rozzino",
            "d_gun": "TS9",
            "d_optics": false,
            "d_gunId": "669c8e49e5d894d10adf6987",
            "d_gunModel": "TS9",
            "d_gunFactory": "Taurus",
            "v_reward": "silver",
            "d_reward": "bronze"
          }]);



// ============================================================
,{$group: {
    _id: {divisionName: "$fixDivisionName"
         ,shooterId:"$shooterId"
         ,eventId: "$eventId"
         ,shooterName:"$shooterName"
         ,eventName: "$eventName"
         ,local: "$local"
         ,clockDate: "$clockDate"
         ,gunFullName: "$gunFullName"
         ,type: "$type"
         ,gunId: "$gunId"
         ,optics: "$optics"}
         ,bestTime: {$min:{$sum:[ {$multiply:[10000,"$penalties"]},"$sTime"]}}
    }

"661be2184277ae7378717fe3"
db.duel_results.aggregate([
    {$group:{
        _id:["$v_shooterId"
            //  ,"$d_shooterId"
             ,"$v_reward"
            //  ,"$d_reward"
            ]
        ,count:{$count:{}}
    }}
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$_id", 0 ] }, "$$ROOT" ] } } }
    ,{$project: {_id:0} }
]);


"$group":
                {
                    _id:["$shooterId","$divisionId"],
                    tries:{$count:{}},
                    score:{$min:"$score"}
                }}








                db.duel_results.find({gundId:""})


//====================================
db.duel_results.updateMany({divisionName:{$regex:/força/i}}, {$set:{divisionName:"Força livre"}})

//====================================
countDocuments
db.duel_results.find({ $and:[ {divisionName:"Pistola"} ,{$or:[{v_shooterId:{$in:["661ab6ae501fc2cd2ff558e1","661be2184277ae7378717fe3"]}},{d_shooterId:{$in:["661ab6ae501fc2cd2ff558e1","661be2184277ae7378717fe3"]}}]}]})
                     {"$and":[{"divisionName":"661be2184277ae7378717fe3"},{"$or":[{"v_shooterId":{"$in":["661ab6ae501fc2cd2ff558e1","661be2184277ae7378717fe3"]}},{"d_shooterId":{"$in":["661ab6ae501fc2cd2ff558e1","661be2184277ae7378717fe3"]}}]}]}


//====================================
{"divisionId":"000000006018d78882298a4c","divisionName":"Pistola"
,"shooterA":{"shooterId":"661ab6ae501fc2cd2ff558e1","victories":11,"defeats":10,"direct_victories":2,"direct_defeats":2,"gold_reward":1,"silver_reward":0,"bronze_reward":2}
,"shooterB":{"shooterId":"661be2184277ae7378717fe3","victories":14,"defeats":12,"direct_victories":2,"direct_defeats":2,"gold_reward":1,"silver_reward":2,"bronze_reward":1}}
                        
db.duel_results.find({divisionName:"Pistola", v_shooterId:"661ab6ae501fc2cd2ff558e1"});
db.duel_results.countDocuments({divisionName:"Pistola", v_shooterId:"661ab6ae501fc2cd2ff558e1"});


db.duel_results.find({divisionName:"Pistola", v_shooterId:"661be2184277ae7378717fe3"});
db.duel_results.countDocuments({divisionName:"Pistola", v_shooterId:"661be2184277ae7378717fe3"});




// ==================

db.guns.insertOne({
// _id: '66cfb8ee0badeb112d52d3c1'
type: "Revolver"
,factory: "Smith & Wesson"
,model: "67"
,caliber: ".38 SPL"
,operation: "Repetição"
});

db.guns.insertOne({
    type: "Revolver"
    ,factory: "Rossi"
    ,model: "845"
    ,caliber: ".38 SPL"
    ,operation: "Repetição"
    });

db.guns.insertOne({
    type: "Pistola"
    ,factory: "Imbel"
    ,model: "MD2"
    ,caliber: ".45 ACP"
    ,operation: "Semi-auto"
    });

db.guns.insertOne({
    type: "Pistola"
    ,factory: "Taurus"
    ,model: "PT 940"
    ,caliber: ".40S&W"
    ,operation: "Semi-auto"
    });


//===================

const clubs= [{ local: 'Assault',address: 'Estrada Velha do Mar, 3100 - Riacho Grande',city: 'São Bernardo do Campo',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Naja',address: 'Rua do Manifesto, 1421 - Ipiranga - SP',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT Rangers',address: 'Rua Raphael Perissinoto, km 1 - Rural',city: 'Paulínia',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT Raposo',address: 'R. Ifema, 1166',city: 'Vargem Grande Paulista',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT São Roque',address: 'Estrada do Paraíso, 274',city: 'São Roque',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CTR Rangers Paulínia',address: '',city: 'Paulínia',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CTR Rangers Cosmópolis',address: '',city: 'Cosmópolis',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Continental - SBC',address: '',city: 'SBC',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'OPS Adventure',address: 'Av. Dom Pedro I, 221 - Vila América',city: 'Santo André',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Raid Alphaville ',address: 'Al. Araguaia, 401',city: 'Barueri ',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'The Continental', address: 'Av. Índico, 759', city: 'São Bernardo do Campo', state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'The Redneck Club',address: 'Av Pauliceia, 5049',city: 'Caieiras',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Typhoon',address: 'Rua João Rudge, 294 - Casa Verde',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com']}];
db.ranges.insertMany(clubs);

db.ranges.insertOne({ name: 'Opsrange',address: 'Av. Pedro Bueno, 690 - Aeroporto Congonhas',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com','rmanso@outlook.com'], active:true});

db.ranges.insertOne({ name: 'CT 3 Porcento',address: 'R. Prof. João Machado, 84 - Nossa Sra. do O',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com','rmanso@outlook.com', 'gcfragnator@gmail.com'], active:true});
clubedetiro3porcento

db.events.aggregate([
    {$group:{_id:{local:'$local', address:'$address', city:'$city', state:'$state'} }}
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$clube", 0 ] }, "$$ROOT" ] } } }
])




db.events.updateMany({local:{$regex:/assaul/i}}, {$set:{rangeId:'66bb69bb55b6d11c7ed7a60a'}});

db.events.find({local:{$regex:/naja/i}, rangeId:{$exists:false}});
db.events.updateMany({local:{$regex:/naja/i}, rangeId:{$exists:false}}, {$set:{rangeId:'66bb69bb55b6d11c7ed7a60b'}});

db.events.find({local:{$regex:/raposo/i}});
db.events.updateMany({local:{$regex:/raposo/i}}, {$set:{rangeId:'66bb69bb55b6d11c7ed7a60d'}});

db.events.find({local:{$regex:/roque/i}, rangeId:{$exists:false}});
db.events.updateMany({local:{$regex:/roque/i}, rangeId:{$exists:false}}, {$set:{rangeId:'66bb69bb55b6d11c7ed7a60e'}});


db.events.find({rangeId:{$exists:false}});
db.events.updateMany({rangeId:{$exists:false}}, {$set:{rangeId:'66bbd18655b6d11c7ed7a617'}});


db.events.find({local:{$regex:/ct ct/i}, rangeId:{$exists:false}});
db.events.updateMany({local:{$regex:/ct ct/i}, rangeId:{$exists:false}}, {$set:{rangeId:'66bbd18655b6d11c7ed7a617'}});

db.ranges.find({name:{$regex:/tEST/i}, adm:{$eq:'rmanso@outlook.com'}});



db.events.aggregate( [
    // Stage 1: Filter
    {
       $match: {_id:ObjectId('66ac2ba6821d4b8174e46b8f')}
    }
    // Stage 1: Leftjoin with range
    ,{ "$addFields": { "_rangeId": { "$toObjectId": "$rangeId" }}}
    ,{$lookup: {from: "ranges"
               ,localField: "_rangeId"
               ,foreignField: "_id"
               ,as: "range"
    }

    }
    // Stage 2: Leftjoin with divisions
    ,{ "$addFields": { "eventId": { "$toString": "$_id" }, "eventIdd": { "$toString": "$_id" }}}
    ,{
      $lookup:
        {
          from: "divisions",
          localField: "eventId",
          foreignField: "eventId",
          as: "divisions"
          ,pipeline:[
            { "$addFields": { "divisionId": { "$toString": "$_id" }}}
            ,{$lookup:{ from: "shooters_divisions"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "count_shooters_divisions"
                      ,pipeline:[
                        {$group: {_id: "$divisionId"
                                  ,subscribers:{$sum:1}}}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$count_shooters_divisions", 0 ] }, "$$ROOT" ] } } }
            ,{$lookup:{ from: "time_records"
                      ,localField: "divisionId"
                      ,foreignField: "divisionId"
                      ,as: "best"
                      ,pipeline:[
                        { "$addFields": { "_penalty": {$sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}}}
                        ,{$group: {_id: "$divisionId"
                                  ,best_score:{$min:"$_penalty"}
                        }}
                      ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$best", 0 ] }, "$$ROOT" ] } } }
          ]
        }
   }
   ,{"$project":{"divisions.count_shooters_divisions":0, "divisions.best":0}}
    // Stage 3: Sort events by event_date in descending order
  ,{
       $sort: { "date": 1 }
    }
  ] )


//   ----------------------------------

  db.shooters_divisions.aggregate([
    {$match:{eventId: "66958096492636e283f83f4c" //"66958096492636e283f83f4c" //  p_eventId
            ,divisionId: "00000000492636e283f83f4d" //"00000000492636e283f83f4d"  //p_division 
            ,duel:true}}
    ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
    ,{$lookup:
      {    from: "events"
      ,localField: "eventId"
      ,foreignField: "_id"
      ,as:"event" }}
    ,{ $addFields: { "_shooterId": { $toObjectId: "$shooterId" }}}   
    ,{$lookup:
        {    from: "shooters"
            ,localField: "_shooterId"
            ,foreignField: "_id"
            ,as:"shooter" //"shooters"
        }
    } 
    ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }           
    ,{$project:{"_shooterId":0,"shooter":0}}
    /// Stage time records
    ,{ "$addFields": { "shooterDivisionId": { "$toString": "$_id" }}}
    ,{ $lookup:
        {from: "time_records"
        ,localField:"shooterDivisionId"
        ,foreignField: "shooterDivisionId"
        ,as:"time_records"
        ,pipeline:[
          {$project:{
                "score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]}
                ,datetime:1
            }}
          ,{$group:
              { _id:["$shooterDivisionId"],
                 tries:{$count:{}},
                  score:{$min:"$score"},
                  datetime:{$min:"$datetime"}
              }
          }]}
   }
   ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
   ,{$project:{"time_records":0}}
   ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
   ,{ $lookup:
       {
           from: "guns"
           ,localField: "_gunId"
           ,foreignField: "_id"
           ,as: "gun_det"
       }
   }
]).sort({"score":1,"tries":1, "datetime":1}).toArray();






db.events.aggregate( [
    { $addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
    ,{$lookup:{
        from: "ranges"
        ,localField: "_rangeId"
        ,foreignField: "_id"
        ,as: "range"
    }}
    ,{$match:{_id: ObjectId('66958096492636e283f83f4c')
             ,$or:[ {owners: 'cleiadba@gmail.com'}
             , {'range.adm': 'cleiadba@gmail.com'}]
            }
        }
  ])


  db.shooters_divisions.aggregate( [
    {$match:{_id: { $in: [ObjectId("669988b5c320bcf6e804e250")]} }}
    ,{ $addFields: { "eventId": { $toObjectId: "$eventId" }}}
    ,{ $lookup:{ from: "events"
            ,localField: "eventId"
            ,foreignField: "_id"
            ,as: "events_adm"
            ,pipeline:[
                {$match:{"owners": "rmanso@outlook.com"}}
            ]
    }}
    ,{ $addFields: { "shooterId": { $toObjectId: "$shooterId" }}}
    ,{$lookup:{ from: "shooters"
        ,localField: "shooterId"
        ,foreignField: "_id"
        ,as: "shooters"
        ,pipeline:[
            {$match:{"email": "rmanso@outlook.com"}}
        ]
    }}
    ,{$match: { $or:[ {events_adm: {$ne: []}}, {shooters: {$ne: []}} ]  }}
    ])


    const _e= await cEvent.aggregate( [
        { $addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
        ,{$lookup:{
            from: "ranges"
            ,localField: "_rangeId"
            ,foreignField: "_id"
            ,as: "range"
        }}
        ,{$match:{_id: f_id
                 ,$or:[ {owners: user.email}
                 , {'range.adm': user.email}]
                }
            }
      ]).toArray();

const 
      {}



    //   =========================

    //>  mongoexport --db=standby --collection=shooters --type=csv --out=shooters.txt --fields=_id,name,email,category,docnum --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=exporter-user-rl
    //>  mongoexport --db=standby --collection=shooters_divisions --type=csv --out=shooters_divisions.txt --fields=_id,shooterId,divisionId,eventId,optics,clock,duel,gunId,gun --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=exporter-user-rl



    {$or:[{_id:ObjectId('661ab680b99563a97948e2cc')},{_id:ObjectId('6635b721653ca9fccd411627')},{_id:ObjectId('663bf283653ca9fccdf363e3')},{_id:ObjectId('663ed77c653ca9fccd516d7f')},{_id:ObjectId('663f7e39a48de60c8cb69f25')},{_id:ObjectId('663fee03a48de60c8ce23871')},{_id:ObjectId('664365dff0bacfe9bc0933f3')},{_id:ObjectId('66436dd3f0bacfe9bc0cab52')},{_id:ObjectId('6643ff6ff0bacfe9bc4bce83')},{_id:ObjectId('664e4afef0bacfe9bcd406c6')},{_id:ObjectId('664e7c8ef0bacfe9bceda2a5')},{_id:ObjectId('664e7f47f0bacfe9bcef6180')},{_id:ObjectId('664e80e0f0bacfe9bcf06482')},{_id:ObjectId('666f0ab0f4d045c776ebdcaf')},{_id:ObjectId('666f0b34f4d045c776ec2495')},{_id:ObjectId('666f0b55f4d045c776ec353c')},{_id:ObjectId('666f0c94f4d045c776ece0d1')}] }


    

// select 
// s.name Atirador
// , d.name Divisão
// , concat(g.factory,' ',g.model,'(',g.caliber,')') Arma
// , t.sTime Tempo
// , t.datetime 'Data_Hora'
// , r.name Clube
// from
// (SELECT m_t.shooterId
//    ,min(m_t.sTime) min_time
// FROM `tpmonline_time_records` m_t
// inner join `tpmonline_events` e on m_t.eventId= e._id
// where 1
// and e.rangeId in ('66bb69bb55b6d11c7ed7a615', '66bb69bb55b6d11c7ed7a60d', '66bb69bb55b6d11c7ed7a60e') -- <-- Clubes do Chico
// and m_t.penalties<1
// and STR_TO_DATE(LEFT(m_t.datetime,10),'%Y-%m-%d')> STR_TO_DATE('2024-07-31','%Y-%m-%d')  -- <-- Somente tempos no mês de agosto
// and STR_TO_DATE(LEFT(m_t.datetime,10),'%Y-%m-%d')< STR_TO_DATE('2024-09-01','%Y-%m-%d')  -- <-- Somente tempos no mês de agosto
// group by m_t.shooterId)
// m_t inner join `tpmonline_time_records` t on m_t.shooterId = t.shooterId
//                                            and m_t.min_time = t.sTime
//                                         and t.penalties<1
//                                         and STR_TO_DATE(LEFT(t.datetime,10),'%Y-%m-%d')> STR_TO_DATE('2024-07-31','%Y-%m-%d') 
//                                         and STR_TO_DATE(LEFT(t.datetime,10),'%Y-%m-%d')< STR_TO_DATE('2024-09-01','%Y-%m-%d')
// inner join `tpmonline_events` e on t.eventId= e._id
// inner join `tpmonline_shooters` s on t.shooterId = s._id
// inner join `tpmonline_divisions` d on t.divisionId = d._id
// inner join `tpmonline_shooters_divisions` sd on t.shooterdivisionId = sd._id
// inner join `tpmonline_guns` g on sd.gunId = g._id
// inner join `tpmonline_ranges` r on e.rangeId = r._id
// where 1
// and e.rangeId in ('66bb69bb55b6d11c7ed7a615', '66bb69bb55b6d11c7ed7a60d', '66bb69bb55b6d11c7ed7a60e')
// order by Tempo;

// https://tpmonline.com.br/event-details.html?inscription=clock&selected_division=00000000c7ac9ee6445d0166&shooterId=66816e4bc06847c9a611bde8&tbord=W1swLCJhc2MiXV0=
//  http://localhost:8888  /event-details.html?inscription=clock&selected_division=00000000c7ac9ee6445d0166&shooterId=66816e4bc06847c9a611bde8&tbord=W1swLCJhc2MiXV0=



db.shooters.aggregate([
    { "$addFields": {"shooterId": { "$toString": "$_id" }}}
    ,{$lookup:{
        from: "shooters_divisions"
        ,localField: "shooterId"
        ,foreignField: "shooterId"
        ,as: "registered"
        ,pipeline:[
            // {$match:{eventId: p_eventId}}
            {$match:{"eventId": '66bccf75b133f973d29ae656', clock:true}}
            ,{ "$addFields": {"shooterDivisionId": { "$toString": "$_id" }}}
            ,{ $lookup:
                {
                    from: "time_records"
                    ,localField: "shooterDivisionId"
                    ,foreignField: "shooterDivisionId"
                    ,as: "time_records"
                    ,pipeline:[
                        {$project:{"score":{  $sum:[ {$multiply:[1000,"$penalties"]},"$sTime"]},datetime:1, penalties:1}}
                        ,{$group:{ _id:["$shooterDivisionId"], tries:{$count:{}}, score:{$min:"$score"}, datetime:{$max:"$datetime"}, penalties:{$min:"$penalties"}}}
                    ]
                }
            }
            ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$time_records", 0 ] }, "$$ROOT" ] } } }
        
            ,{ $addFields: {_gunId: { $toObjectId: "$gunId" }}}
            ,{ $lookup:
                {
                    from: "guns"
                    ,localField: "_gunId"
                    ,foreignField: "_id"
                    ,as: "gun_det"
                }
            }

          ]
        }
    }
    ,{$match: {registered: {$ne: []}}}
    ,{$project:{eventId:0, _id:0 ,"registered.shooterId":0 ,"registered.time_records":0 }}
    ]).sort({"registered.score":1}).toArray();


    db.shooters_divisions.updateMany({},{$set:{'order_aux':0}});
    db.shooters_divisions.updateMany({},{$set:{'subscribe_date':new Date()}});
    subscribe_date


   db.shooters_divisions.aggregate([
        {$addFields: {"_shooterDivisionId": { $toString: "$_id" }
                     ,"_eventId": { $toObjectId: "$eventId" }
                     ,"_shooterId": { $toObjectId: "$shooterId" }}}
        ,{$match:{"_shooterDivisionId":"66d32ee070e72584e6773baa"}}
        ,{$lookup:{ from: 'shooters'
                   ,foreignField: '_id'
                   ,localField: '_shooterId'
                   ,as: 'shooter'
        }}
        ,{$lookup:{ from:"events"
                   ,localField:'_eventId'
                   ,foreignField:'_id'
                   ,as: 'events'
                   ,pipeline:[
                    {$addFields: {"_rangeId": { $toObjectId: "$rangeId" }}}
                    ,{$lookup:{ from: 'ranges'
                               ,localField: '_rangeId'
                               ,foreignField: '_id'
                               ,as: 'range'
                    }}
                   ]
        }}
    ]);



    // ---------------------



    db.events.createIndex( { owners : 1 } );

    db.events.createIndex( { date : 1, public:1 } );

    db.events.createIndex( { date : 1, public:1, owners : 1  } );
    
    db.shooters.createIndex( { name : 1 } );

    db.shooters_divisions.createIndex( { eventId : 1 } );

    db.shooters_divisions.createIndex( { eventId : 1, shooterId : 1 } );


    db.time_records.createIndex( { shooterDivisionId : 1 } );


    db.divisions.createIndex( { eventId : 1 } );


    db.kos.createIndex( { eventId : 1, divisionId:1 } );


    db.time_records.createIndex( { eventId : 1 } );

    db.time_records.createIndex( { eventId : 1,divisionId:1 } );

    db.time_records.createIndex( { eventId : 1,divisionId:1,shooterId:1 } );

    db.time_records.createIndex( { eventId : 1,divisionId:1,shooterId:1 ,shooterDivisionId:1 } );

    db.time_records.createIndex( { datetime : 1 } );

    
    db.events.find({  "$eq": [{ "$month": "$date" }, 8]  });

    db.events.find({ "$expr": { "$eq": [{ "$month": "$date" }, 8] , "$eq": [{ "$year": "$date" }, 2024] } })

    db.events.aggregate([        
                {$addFields:{eventName:"$name",clockDate:"$date"
                             ,evMonth:{ "$month": "$date" }
                             ,evYear:{ "$year": "$date" }
                             ,_rangeId:{ $toObjectId: "$rangeId" }
                             ,seventId:{ $toString: "$_id" }
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
                ,{$project: {range:0, _rangeId:0, _id:0, address:0, active:0, city:0, owners:0, img:0, note:0}}

                ,{$match: {evMonth:8, evYear:2024, public:true, rangeAdms:'gcfragnator@gmail.com'}}

                ,{$lookup:{
                    from: "divisions"
                    ,localField: "seventId"
                    ,foreignField: "eventId"
                    ,as: "division"
                    ,pipeline:[
                        {$addFields:{divisionName:"$name"
                                    ,sdivisionId:{ $toString: "$_id" }}
                        }
                    ]
                }}

                ,{$lookup:{
                    from: "time_records"
                    ,localField: "sdivisionId"
                    ,foreignField: "divisionId"
                    ,as: "time_records"
                    ,pipeline:[{$addFields:{_shooterId:{$toObjectId:"$shooterId"}
                        // ,_divisionId:{$toObjectId:"$divisionId"}
                        // ,_eventId:{$toObjectId:"$eventId"}
                        ,_shooterDivisionId:{$toObjectId:"$shooterDivisionId"}}}]
                }}
        
        //         ,{$lookup:{
        //             from: "shooters"
        //             ,localField: "_shooterId"
        //             ,foreignField: "_id"
        //             ,as: "shooter"
        //             ,pipeline:[
        //                 {$addFields:{shooterName:"$name"}}
        //             ]
        //         }}

        // ,{$lookup:{
        //     from: "shooters_divisions"
        //     ,localField: "_shooterDivisionId"
        //     ,foreignField: "_id"
        //     ,as: "shooter_division"
        //     ,pipeline:[
        //         {$addFields:{_gunId:{ $toObjectId: "$gunId" }}}
        //         ,{$lookup:{
        //             from: "guns"
        //             ,localField: "_gunId"
        //             ,foreignField: "_id"
        //             ,as: "gun_det"
        //             ,pipeline:[
        //                 {$addFields:{gunFullName: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] }}}
        //             ]
        //         }}
        //         ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$gun_det", 0 ] }, "$$ROOT" ] } } }
        //         ,{$project: {gun_det:0, _gunId:0}}
        //     ]
        // }}
        // ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
        // ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
        // ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
        // ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter_division", 0 ] }, "$$ROOT" ] } } }
        // ,{$addFields:{fixDivisionName:{ $replaceAll: { input: "$divisionName", find: "Armas curtas", replacement: "$type" } }}}
        // ,{$group: {
        //     _id: {divisionName: "$fixDivisionName"
        //          ,shooterId:"$shooterId"
        //          ,eventId: "$eventId"
        //          ,divisionId: "$divisionId"
        //          ,shooterName:"$shooterName"
        //          ,eventName: "$eventName"
        //         //  ,local: "$local"
        //          ,clockDate: "$clockDate"
        //          ,gun: "$gunFullName"
        //          ,type: "$type"
        //          ,gunId: "$gunId"
        //          ,model: "$model"
        //          ,factory: "$factory"
        //          ,caliber: "$caliber"
        //          ,optics: "$optics"
        //          ,evMonth: "$evMonth"
        //          ,evYear: "$evYear"
        //          ,local:"$rangeName"
        //          ,rangeAdms:"$rangeAdms"}
        //          ,bestTime: {$min:{$sum:[ {$multiply:[10000,"$penalties"]},"$sTime"]}}
        //     }
        // }
        // ,{$replaceRoot: { newRoot: {$mergeObjects:["$_id", "$$ROOT"] } } }
        // ,{$project: {_id:0} }
        // // ,{$match: _filter}
      ]).sort({ divisionName:1, bestTime:1, shooterName:1, gun:1, optics:1}).toArray();




      db.shooters.updateOne({sex:{$ne:"F"} ,birthday:{$lt:ISODate('1975-01-01T00:00:00.000Z')}, category:{$ne:2}}
      ,{$set:{category:5}});

      db.shooters.updateMany({sex:{$ne:"F"} ,birthday:{$lt:ISODate('1975-01-01T00:00:00.000Z')}, category:{$ne:2}}
      ,{$set:{category:5}});


      db.shooters.find({crEndDate:{$ne:null}});
      ,{$set:{crEndDate:null}});


      db.shooters.updateMany({sex:"M",category:5 ,birthday:{$gt:ISODate('1974-12-31T00:00:00.000Z')}}
      ,{$set:{category:0}});



      db.shooters.updateOne({_id:ObjectId('661ab5b8b99563a97948e2c6')},{$set:{fullName:"Francisco Fernando Campadello",birthday: new Date("1971-11-03") ,sex:"M",cr:"30575",crEndDate: new Date("2030-07-30") ,SH_email:"acespade43@uol.com.br"}});
      db.shooters.updateOne({_id:ObjectId('661ab6ae501fc2cd2ff558e1')},{$set:{fullName:"Priscila da Rocha Manso",birthday: new Date("1980-05-15") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"pris.rocha@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('661be2184277ae7378717fe3')},{$set:{fullName:"Rodrigo Colasuonno Manso",birthday: new Date("1978-03-20") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigo.manso@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('663f66cb653ca9fccd8dd80b')},{$set:{fullName:"Ricardo Rocha Cianfrone",birthday: new Date("1978-06-19") ,sex:"M",cr:"94852",crEndDate: new Date("2032-08-28") ,SH_email:"ricardocianfrone@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66646551f4d045c776de161a')},{$set:{fullName:"Fabíola P Espinha",birthday: new Date("1983-01-27") ,sex:"F",cr:"000.661.425-63",crEndDate: new Date("2031-12-21") ,SH_email:"buba_vet@hotmail"}});
      db.shooters.updateOne({_id:ObjectId('66646664f4d045c776deb8e3')},{$set:{fullName:"Mauro Bergoc Gomes",birthday: new Date("1979-03-26") ,sex:"M",cr:"000.659.668-13",crEndDate: new Date("2031-12-18") ,SH_email:"bergoc@tutanota.com"}});
      
      db.shooters.updateOne({_id:ObjectId('66647aaef4d045c776eb98bd')},{$set:{fullName:"LUCAS RIBEIRO ASSUNCAO",birthday: new Date("1996-01-09") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"lucassunco@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66648fcdf4d045c776fa7937')},{$set:{fullName:"Guilherme San Juan Rozzino",birthday: new Date("1981-12-11") ,sex:"M",cr:"000.612.903-00",crEndDate: new Date("2031-10-17") ,SH_email:"guilherme@rozzino.com.br"}});
      db.shooters.updateOne({_id:ObjectId('666f0ad8f4d045c776ebf277')},{$set:{fullName:"Wayne Xavier Martins",birthday: new Date("1996-10-24") ,sex:"M",cr:"77333136",crEndDate: new Date("2032-05-25") ,SH_email:"waynexmartins@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('668011c2c06847c9a6515a7b')},{$set:{fullName:"LUIS SERGIO GONCALVES MARTINS",birthday: new Date("1961-02-23") ,sex:"M",cr:"0",crEndDate: new Date("2026-07-21") ,SH_email:"luisergiomartins@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66803b37cc75030f3c411b46')},{$set:{fullName:"DIEGO WONHRATH STATHAKIS PINTO",birthday: new Date("1989-09-15") ,sex:"M",cr:"155.428-07",crEndDate: new Date("2030-10-07") ,SH_email:"diegowonhrath@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('668481bcee04a8e427d62d2a')},{$set:{fullName:"DANIEL LUCENA",birthday: new Date("1975-06-21") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"deliucena1975@gamil.com"}});
      db.shooters.updateOne({_id:ObjectId('6684825ec06847c9a6dd5fe5')},{$set:{fullName:"MARCOS ALEXANDRE RAMOS STOLSES",birthday: new Date("1976-02-04") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"mstolses@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6684837bc06847c9a6de05bd')},{$set:{fullName:"LORIVALDO RODRIGUES BARBOSA",birthday: new Date("1965-11-26") ,sex:"M",cr:"000.747.357-56",crEndDate: new Date("2032-04-29") ,SH_email:"lorivaldobarbosa@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848433c06847c9a6de69da')},{$set:{fullName:"Wagner Silva de Souza",birthday: new Date("1990-06-23") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"wagner.souza.contabil@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848441c06847c9a6de7141')},{$set:{fullName:"PAULO CESAR GARRUTTE",birthday: new Date("1964-03-31") ,sex:"M",cr:"70936323",crEndDate: new Date("2032-03-14") ,SH_email:"paulogarrutte@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848473c06847c9a6de8d70')},{$set:{fullName:"LEANDRO CRAVO APOLO SANTOS",birthday: new Date("1982-10-02") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"leandroastos@yahoo.com.br"}});
      db.shooters.updateOne({_id:ObjectId('668484b7c06847c9a6deb108')},{$set:{fullName:"GILBERTO ARAUJO JR",birthday: new Date("1966-01-29") ,sex:"M",cr:"001016793-51",crEndDate: new Date("2027-06-08") ,SH_email:"gilozz34@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('668484ccc06847c9a6debe15')},{$set:{fullName:"Ivan Carlos Zeidan",birthday: new Date("1977-01-13") ,sex:"M",cr:"99712385",crEndDate: new Date("2032-12-30") ,SH_email:"ivanzeidan@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848612c06847c9a6df6eee')},{$set:{fullName:"Bruno Moraes da Silva",birthday: new Date("1996-09-20") ,sex:"M",cr:"001.031.586-18",crEndDate: new Date("2027-06-24") ,SH_email:"bmoraes.silva@outlook.com"}});
      db.shooters.updateOne({_id:ObjectId('66848c4ac06847c9a6e2e4ba')},{$set:{fullName:"HENRY SEITI HARADA",birthday: new Date("1974-05-17") ,sex:"M",cr:"99205874",crEndDate: new Date("2032-12-27") ,SH_email:"henryharada@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848da74d7685970126e0a7')},{$set:{fullName:"Edimilson Jesus dos Santos",birthday: new Date("1987-04-18") ,sex:"M",cr:"947216-96",crEndDate: new Date("2032-11-11") ,SH_email:"pocatudo007@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66848e5dc06847c9a6e4163c')},{$set:{fullName:"CLEIA DE BRITO ARAUJO",birthday: new Date("1992-01-16") ,sex:"F",cr:"95050167",crEndDate: new Date("2032-11-15") ,SH_email:"cleiadba@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6687eacdc06847c9a6edb488')},{$set:{fullName:"Luiz Alberto Barberini",birthday: new Date("1965-03-18") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"labarberini@terra.com.br"}});
      db.shooters.updateOne({_id:ObjectId('6687f4adc8c34e728974c280')},{$set:{fullName:"ANDRE MILLAN RODRIGUES",birthday: new Date("1980-08-09") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"andre.de@me.com"}});
      db.shooters.updateOne({_id:ObjectId('6687faa0c06847c9a6fc4471')},{$set:{fullName:"Andreas Schmidt",birthday: new Date("1967-08-13") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"andreas@audiobizz.com.br"}});
      db.shooters.updateOne({_id:ObjectId('6690522c82afbc262152b5d5')},{$set:{fullName:"celina ferreira elais dos reis",birthday: new Date("1977-01-13") ,sex:"F",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"ivanzeidan@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66905c7d0a2ee740904d32ac')},{$set:{fullName:"eduardo tyfy zeidan",birthday: new Date("1974-08-05") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"zeidan@gunstorebrasil"}});
      db.shooters.updateOne({_id:ObjectId('66905ece0a2ee740904e90a9')},{$set:{fullName:"RAFAEL GIANESELLA GALVAO",birthday: new Date("1982-06-25") ,sex:"M",cr:"56658338",crEndDate: new Date("2031-08-09") ,SH_email:"rafael.gianesella@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6690694f0a2ee7409054f5f1')},{$set:{fullName:"HIGOR DA SILVA SANCHES LOPES",birthday: new Date("1996-09-07") ,sex:"M",cr:"129.615-90",crEndDate: new Date("2029-10-06") ,SH_email:"higor_sanches15@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('669283270a2ee740908bade7')},{$set:{fullName:"Raul Michel da Silva Meloso",birthday: new Date("1988-11-02") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"raul.meloso@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('669283700a2ee740908bd521')},{$set:{fullName:"CRISTIANO FADIN ROSSI",birthday: new Date("1977-01-20") ,sex:"M",cr:"95466690",crEndDate: new Date("2032-11-18") ,SH_email:"creshnaro77@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6692839a0a2ee740908bec78')},{$set:{fullName:"FRANCISCO DE OLIVEIRA JUNIOR",birthday: new Date("1964-06-08") ,sex:"M",cr:"709.427-22",crEndDate: new Date("2032-03-14") ,SH_email:"franciscooljr@hotmail.com"}});

      db.shooters.updateOne({_id:ObjectId('669283d40a2ee740908c0bed')},{$set:{fullName:"Marcelo Nydegger",birthday: new Date("1993-05-04") ,sex:"M",cr:"60615249",crEndDate: new Date("2031-10-08") ,SH_email:"marcelonydegger@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('669284420a2ee740908c4886')},{$set:{fullName:"Willians Adriano Martins Franco",birthday: new Date("1975-10-14") ,sex:"M",cr:"300749-91",crEndDate: new Date("2029-07-01") ,SH_email:"wmartinsfranco@yahoo.com.br"}});
      db.shooters.updateOne({_id:ObjectId('669284d70a2ee740908ca2a5')},{$set:{fullName:"Thiago Fernandes Okuda",birthday: new Date("1987-05-11") ,sex:"M",cr:"986.636-15",crEndDate: new Date("2032-12-22") ,SH_email:"japaok@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6692878f0a2ee740908e1b8d')},{$set:{fullName:"DIEGO GRUNHO",birthday: new Date("1982-02-28") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"diegogrunho@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6692880b0a2ee740908e5dfc')},{$set:{fullName:"Mauricio Dias de Oliveira",birthday: new Date("1962-08-15") ,sex:"M",cr:"34551220",crEndDate: new Date("2026-07-21") ,SH_email:"mauricio.carna54@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6692ad8c0a2ee74090a378ec')},{$set:{fullName:"Marco Antonio Greco Bortz",birthday: new Date("1962-05-31") ,sex:"M",cr:"32355",crEndDate: new Date("2031-08-10") ,SH_email:"marcobortz@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6692aef70a2ee74090a44721')},{$set:{fullName:"Marcelo Ferreira",birthday: new Date("1971-05-23") ,sex:"M",cr:"000.463.073-46",crEndDate: new Date("2030-12-28") ,SH_email:"asffermfa@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6696e59b0a2ee7409025ec02')},{$set:{fullName:"VINICIUS NEGRAO ZOLLONGER",birthday: new Date("1985-06-05") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"vinicius@vnzadvogado.adv.br"}});
      db.shooters.updateOne({_id:ObjectId('6699861dc4c4d8c004f3a728')},{$set:{fullName:"Alexandre Aron Prestes Pereira da Silva",birthday: new Date("1992-06-24") ,sex:"M",cr:"000.186.822-51",crEndDate: new Date("2031-09-01") ,SH_email:"aron.sp@raidgr.com"}});
      db.shooters.updateOne({_id:ObjectId('6699889ec4c4d8c004f3a72d')},{$set:{fullName:"CAIO HENRIQUE NOBRE CESAR",birthday: new Date("2001-01-01") ,sex:"0",cr:"000.816.295-67",crEndDate: new Date("2026-06-16") ,SH_email:"admnobrecesar@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('669989000a2ee740909f8292')},{$set:{fullName:"NELSON PEREIRA DA MOTTA FILHO",birthday: new Date("2001-01-01") ,sex:"0",cr:"000.649.436-66",crEndDate: new Date("2026-06-16") ,SH_email:"nelsonmotta65@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66998d321dae219aa695eb9b')},{$set:{fullName:"Magnus Carvalho do Couto",birthday: new Date("1967-09-24") ,sex:"M",cr:"48665096",crEndDate: new Date("2031-02-27") ,SH_email:"magnuscouto@terra.com.br"}});
      db.shooters.updateOne({_id:ObjectId('66998db01dae219aa695eb9c')},{$set:{fullName:"Paulo César Lopreato Cotrim",birthday: new Date("1960-09-13") ,sex:"M",cr:"366347",crEndDate: new Date("2030-02-17") ,SH_email:"cotrim@uol.com.br"}});
      db.shooters.updateOne({_id:ObjectId('669992d63bfa35f1a7e0379b')},{$set:{fullName:"Fernando Biancardi Cirne",birthday: new Date("1972-12-12") ,sex:"M",cr:"000991785-32",crEndDate: new Date("2032-12-27") ,SH_email:"fbcirne@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('6699959b7b9dc18978f52ee0')},{$set:{fullName:"MARIO HENRIQUE NOGUEIRA",birthday: new Date("1982-06-16") ,sex:"0",cr:"25984420",crEndDate: new Date("2032-04-29") ,SH_email:"iat.mario.nogueira@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66999e13eba51f58ca6422ed')},{$set:{fullName:"Paulo Sergio Bacil Teixeira",birthday: new Date("1975-11-04") ,sex:"M",cr:"66393647",crEndDate: new Date("2031-12-25") ,SH_email:"paulosbt@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66a023da0a2ee74090844fe9')},{$set:{fullName:"André Yuji Honda",birthday: new Date("1988-05-25") ,sex:"M",cr:"47244020",crEndDate: new Date("2031-01-21") ,SH_email:"honda.andre@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66a4ecb10a2ee74090518027')},{$set:{fullName:"RICARDO MOURA SANCHES",birthday: new Date("1977-01-13") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"ricardosanches@gmail.com"}});

      db.shooters.updateOne({_id:ObjectId('66a4ef2c0a2ee7409052f3b2')},{$set:{fullName:"Carlos Alexandre de Souza",birthday: new Date("1977-09-22") ,sex:"M",cr:"102684480",crEndDate: new Date("2027-06-07") ,SH_email:"alecolisaojj@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66a4ff7b0a2ee740905c2ede')},{$set:{fullName:"ANDRE AUGUSTO AMARAL GOMES",birthday: new Date("2001-01-01") ,sex:"0",cr:"000.907.967-05",crEndDate: new Date("2026-06-17") ,SH_email:"contatoamaral.pl@yahoo.com"}});
      db.shooters.updateOne({_id:ObjectId('66a502c30a2ee740905e16ac')},{$set:{fullName:"Eduardo de Aizenstein",birthday: new Date("1970-12-19") ,sex:"M",cr:"11838",crEndDate: new Date("2031-11-17") ,SH_email:"edu@shilton.com.br"}});
      db.shooters.updateOne({_id:ObjectId('66a5375e0a2ee740907d352c')},{$set:{fullName:"GENILSON SILVA SANTOS",birthday: new Date("2001-01-01") ,sex:"0",cr:"000.193.439.22",crEndDate: new Date("2026-06-16") ,SH_email:"genilsonsantosgama@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66a538fc0a2ee740907e28fc')},{$set:{fullName:"ROGERIO BAIRRADA TAVARES DA CRUZ",birthday: new Date("2001-01-01") ,sex:"0",cr:"001.019.642-00",crEndDate: new Date("2026-06-16") ,SH_email:"rogerio.bairrada@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66b29b2d8ef89323d3189f41')},{$set:{fullName:"Hilton Teixeira Mendes",birthday: new Date("1967-05-13") ,sex:"M",cr:"45108102",crEndDate: new Date("2030-11-26") ,SH_email:"hilton.mendes13@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66b76d92cbfd215e2512a97c')},{$set:{fullName:"Jose Henrique de Oliveira",birthday: new Date("1966-04-07") ,sex:"M",cr:"31642411",crEndDate: new Date("2029-08-08") ,SH_email:"tenentehenrique86@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66bbd63ecbfd215e25685a59')},{$set:{fullName:"Mauricio de Araujo",birthday: new Date("1973-01-13") ,sex:"M",cr:"52922-20",crEndDate: new Date("2031-09-27") ,SH_email:"funjump@terra.com.br"}});

      db.shooters.updateOne({_id:ObjectId('66be7ee2cbfd215e25f80f4f')},{$set:{fullName:"EDUARDO TAKEU NAKIRI",birthday: new Date("1970-01-01") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"enakiri@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66be7f70cbfd215e25f85e54')},{$set:{fullName:"Marcos Flávio Genaro",birthday: new Date("1973-07-06") ,sex:"M",cr:"1059963",crEndDate: new Date("2032-06-06") ,SH_email:"marcosfgenaro@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66be7f9ecbfd215e25f87547')},{$set:{fullName:"Cícero Augusto Fernandes Campos",birthday: new Date("1965-06-22") ,sex:"M",cr:"1004730-16",crEndDate: new Date("2027-03-11") ,SH_email:"cicero.camposjr@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66be7fdbcbfd215e25f8985d')},{$set:{fullName:"Henrique Parente",birthday: new Date("1990-07-31") ,sex:"M",cr:"380441",crEndDate: new Date("2030-04-30") ,SH_email:"henrique@loteinvest.com"}});
      db.shooters.updateOne({_id:ObjectId('66be866ecbfd215e25fc0406')},{$set:{fullName:"Fernando Estefan Filho",birthday: new Date("2000-08-06") ,sex:"M",cr:"21421048",crEndDate: new Date("2032-11-23") ,SH_email:"grupospg@terra.com.br"}});
      db.shooters.updateOne({_id:ObjectId('66c9dfd28e17e83dcdac5c69')},{$set:{fullName:"Guilherme Vaz Guimaraes Nogueira",birthday: new Date("1960-05-30") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"guilherme.nogueira@terra.com.br"}});
      db.shooters.updateOne({_id:ObjectId('66d0d5b3a9ce64324dcb0dcf')},{$set:{fullName:"Flavio Tortelli",birthday: new Date("1961-12-01") ,sex:"M",cr:"891325-05",crEndDate: new Date("2032-09-26") ,SH_email:"ftortel@terra.com.br"}});
      db.shooters.updateOne({_id:ObjectId('66e1c9881d6382fbe85bb0cb')},{$set:{fullName:"Andre Ricardo Ramos Stolses",birthday: new Date("1981-07-03") ,sex:"M",cr:"001.019.246-82",crEndDate: new Date("2027-05-15") ,SH_email:"andrestolses@hotmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66e225292b487f20e097327a')},{$set:{fullName:"HUGO VITOR BUENO",birthday: new Date("1976-04-06") ,sex:"M",cr:"0",crEndDate: new Date("1980-01-01") ,SH_email:"hv.bueno.hbv@gmail.com"}});
      db.shooters.updateOne({_id:ObjectId('66e2cdb711d8b71acab70020')},{$set:{fullName:"Fabio Luiz Perfeito Damasceno",birthday: new Date("1976-05-28") ,sex:"M",cr:"410.852-30",crEndDate: new Date("2030-09-04") ,SH_email:"fabio.perfeito@hotmail.com"}});



db.shooters.insertOne({name:"Adailton Evangelista dos Santos Carneiro", email:"28727888835@tpmonline.com.br", category:0, docnum:"28727888835", fullName:"Adailton Evangelista dos Santos Carneiro",birthday: new Date("1976-07-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"oscar.assessoria@ig.com.br"})

db.shooters.insertOne({name:"ADENILSON APARECIDO LOCKS", email:"28175892897@tpmonline.com.br", category:0, docnum:"28175892897", fullName:"ADENILSON APARECIDO LOCKS",birthday: new Date("1978-12-01") ,sex:"M",cr:"422898",crEndDate: new Date("2030-10-06") ,SH_email:"adenilsonlocks@yahoo.com.br"});
db.shooters.insertOne({name:"Adhemar de Barros", email:"39660235801@tpmonline.com.br", category:0, docnum:"39660235801", fullName:"Adhemar de Barros",birthday: new Date("1992-08-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dibarros@uol.com.br"});
db.shooters.insertOne({name:"Adilson Antonio da Silva", email:"89986350468@tpmonline.com.br", category:0, docnum:"89986350468", fullName:"Adilson Antonio da Silva",birthday: new Date("1973-03-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"adilsonantonio588@gmail.com"});
db.shooters.insertOne({name:"Adilson Ferreira Rodrigues", email:"25445967832@tpmonline.com.br", category:0, docnum:"25445967832", fullName:"Adilson Ferreira Rodrigues",birthday: new Date("1977-10-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"oxigeniocambuci@gmail.com"});
db.shooters.insertOne({name:"adriano antonio de novaes", email:"31766246893@tpmonline.com.br", category:0, docnum:"31766246893", fullName:"adriano antonio de novaes",birthday: new Date("1985-01-14") ,sex:"M",cr:"381196",crEndDate: new Date("2030-05-05") ,SH_email:"adrianoanovaes@gmail.com"});
db.shooters.insertOne({name:"ADRIANO RIVOLTA CIDRO", email:"08631286885@tpmonline.com.br", category:0, docnum:"08631286885", fullName:"ADRIANO RIVOLTA CIDRO",birthday: new Date("1967-02-03") ,sex:"M",cr:"7629621",crEndDate: new Date("2032-06-30") ,SH_email:"rivolta@terra.com.br"});
db.shooters.insertOne({name:"Adriano Santos Cipriano", email:"38189613871@tpmonline.com.br", category:0, docnum:"38189613871", fullName:"Adriano Santos Cipriano",birthday: new Date("1987-06-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"adrianocipriano@gmail.com"});
db.shooters.insertOne({name:"Ahmad Mohamad El-Ghazzawi", email:"23606386885@tpmonline.com.br", category:0, docnum:"23606386885", fullName:"Ahmad Mohamad El-Ghazzawi",birthday: new Date("1994-07-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"armando-77@live.com"});
db.shooters.insertOne({name:"Aifu Chen", email:"23408736812@tpmonline.com.br", category:0, docnum:"23408736812", fullName:"Aifu Chen",birthday: new Date("1989-03-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"chenaifu89@gmail.com"});
db.shooters.insertOne({name:"Ailton Ferreira dos Santos", email:"26872973803@tpmonline.com.br", category:0, docnum:"26872973803", fullName:"Ailton Ferreira dos Santos",birthday: new Date("1979-03-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ailton13.ferreirasantos@gmail.com"});


db.shooters.insertOne({name:"Airton Jorge de Sousa Junior", email:"29914502822@tpmonline.com.br", category:0, docnum:"29914502822", fullName:"Airton Jorge de Sousa Junior",birthday: new Date("1982-02-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"airton.sousa@fmgengenharia.com.br"});
db.shooters.insertOne({name:"Alan Jorge Semaan", email:"31459766806@tpmonline.com.br", category:0, docnum:"31459766806", fullName:"Alan Jorge Semaan",birthday: new Date("1980-07-23") ,sex:"M",cr:"319292",crEndDate: new Date("2029-08-19") ,SH_email:"alansemaan@hotmail.com"});
db.shooters.insertOne({name:"Alcides Manoel de Carvalho", email:"01302641808@tpmonline.com.br", category:0, docnum:"01302641808", fullName:"Alcides Manoel de Carvalho",birthday: new Date("1961-10-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"alcidesmanoel@gmail.com"});
db.shooters.insertOne({name:"Alessandro Henrique Sevilha Fonseca", email:"29211673879@tpmonline.com.br", category:0, docnum:"29211673879", fullName:"Alessandro Henrique Sevilha Fonseca",birthday: new Date("1982-06-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"farmacoale@gmail.com"});
db.shooters.insertOne({name:"ALEX FIGUEIREDO DOS REIS", email:"56349220110@tpmonline.com.br", category:0, docnum:"56349220110", fullName:"ALEX FIGUEIREDO DOS REIS",birthday: new Date("1975-06-17") ,sex:"M",cr:"321838-44",crEndDate: new Date("2029-08-26") ,SH_email:"alexfgreis@gmail.com"});
db.shooters.insertOne({name:"ALEX JULIO SOARES DOS SANTOS", email:"39026740832@tpmonline.com.br", category:0, docnum:"39026740832", fullName:"ALEX JULIO SOARES DOS SANTOS",birthday: new Date("1991-08-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"zirlex@outlook.com.br"});
db.shooters.insertOne({name:"Alexandre Nanni", email:"15465427876@tpmonline.com.br", category:0, docnum:"15465427876", fullName:"Alexandre Nanni",birthday: new Date("1973-07-17") ,sex:"M",cr:"10892931",crEndDate: new Date("2031-10-08") ,SH_email:"alexandrenanni@uol.com.br"});
db.shooters.insertOne({name:"ALLAN SEARA DA SILVA", email:"03897802600@tpmonline.com.br", category:0, docnum:"03897802600", fullName:"ALLAN SEARA DA SILVA",birthday: new Date("1980-07-29") ,sex:"M",cr:"73527",crEndDate: new Date("2032-04-09") ,SH_email:"allanseara@gmail.com"});
db.shooters.insertOne({name:"Allan Szacher", email:"26804402855@tpmonline.com.br", category:0, docnum:"26804402855", fullName:"Allan Szacher",birthday: new Date("1977-09-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"a@zupi.live"});
db.shooters.insertOne({name:"Almir Almeida Marcelo", email:"26565022844@tpmonline.com.br", category:0, docnum:"26565022844", fullName:"Almir Almeida Marcelo",birthday: new Date("1977-12-07") ,sex:"M",cr:"103024",crEndDate: new Date("2029-08-14") ,SH_email:""});
db.shooters.insertOne({name:"Alvaro Henrique da Silva", email:"30499067827@tpmonline.com.br", category:0, docnum:"30499067827", fullName:"Alvaro Henrique da Silva",birthday: new Date("1974-07-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dhdconstrutora@terra.com.br"});
db.shooters.insertOne({name:"AMER MOHAMAD MAJZOUB", email:"28699059809@tpmonline.com.br", category:0, docnum:"28699059809", fullName:"AMER MOHAMAD MAJZOUB",birthday: new Date("1976-11-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"majzoub_2000@hotmail.com"});
db.shooters.insertOne({name:"Ana Carolina Gomes Mitri", email:"29668894898@tpmonline.com.br", category:2, docnum:"29668894898", fullName:"Ana Carolina Gomes Mitri",birthday: new Date("1981-12-02") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"acdogomes@gmail.com"});
db.shooters.insertOne({name:"Anderson Aparecido de Souza", email:"28306471814@tpmonline.com.br", category:0, docnum:"28306471814", fullName:"Anderson Aparecido de Souza",birthday: new Date("1979-11-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nano.mcbda.fzn@gmail.com"});
db.shooters.insertOne({name:"Anderson de Marco Benedito", email:"26501329817@tpmonline.com.br", category:0, docnum:"26501329817", fullName:"Anderson de Marco Benedito",birthday: new Date("1977-02-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andersondemarco3@gmail.com"});
db.shooters.insertOne({name:"ANDERSON LUIZ FERNANDES", email:"08022292982@tpmonline.com.br", category:0, docnum:"08022292982", fullName:"ANDERSON LUIZ FERNANDES",birthday: new Date("1991-12-04") ,sex:"M",cr:"431327",crEndDate: new Date("2030-10-20") ,SH_email:"anddystyle@icloud.com"});

db.shooters.insertOne({name:"Anderson Nakama", email:"35349035878@tpmonline.com.br", category:0, docnum:"35349035878", fullName:"Anderson Nakama",birthday: new Date("1986-02-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andy.andersonnakama@gmail.com"});
db.shooters.insertOne({name:"Andre Burgos da Silva", email:"16243731863@tpmonline.com.br", category:0, docnum:"16243731863", fullName:"Andre Burgos da Silva",birthday: new Date("1976-01-02") ,sex:"M",cr:"000.126.664-08",crEndDate: new Date("2032-05-30") ,SH_email:"andreburgos76@icloud.com"});
db.shooters.insertOne({name:"André Henrique Brognoli de Matos", email:"06914706930@tpmonline.com.br", category:0, docnum:"06914706930", fullName:"André Henrique Brognoli de Matos",birthday: new Date("1988-10-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andrenriquematos@gmail.com"});
db.shooters.insertOne({name:"Andre Leonel Rocha Giglio", email:"43230443802@tpmonline.com.br", category:0, docnum:"43230443802", fullName:"Andre Leonel Rocha Giglio",birthday: new Date("1995-01-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andrelgiglio@hotmail.com"});
db.shooters.insertOne({name:"André Luis Senra Antonini", email:"36461802851@tpmonline.com.br", category:0, docnum:"36461802851", fullName:"André Luis Senra Antonini",birthday: new Date("1992-03-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andreluissemaantonini@gmail.com"});
db.shooters.insertOne({name:"Andre Marcondes Souza", email:"37818394869@tpmonline.com.br", category:0, docnum:"37818394869", fullName:"Andre Marcondes Souza",birthday: new Date("1995-02-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"souzatwo@hotmail.com"});
db.shooters.insertOne({name:"ANDRE MAZZILLI MESQUITA", email:"27355614886@tpmonline.com.br", category:0, docnum:"27355614886", fullName:"ANDRE MAZZILLI MESQUITA",birthday: new Date("1978-08-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andre@gmail.com"});
db.shooters.insertOne({name:"Andre Paulozzi Villar", email:"22143576889@tpmonline.com.br", category:0, docnum:"22143576889", fullName:"Andre Paulozzi Villar",birthday: new Date("1981-02-08") ,sex:"M",cr:"20911190",crEndDate: new Date("2031-06-10") ,SH_email:"andre.villar@me.com"});
db.shooters.insertOne({name:"Andre Roberto Villar Dias", email:"27534632803@tpmonline.com.br", category:0, docnum:"27534632803", fullName:"Andre Roberto Villar Dias",birthday: new Date("1978-04-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"avillar1978@gmail.com"});
db.shooters.insertOne({name:"Andrea Lilian Goldmann", email:"14736785870@tpmonline.com.br", category:2, docnum:"14736785870", fullName:"Andrea Lilian Goldmann",birthday: new Date("1971-03-04") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andrea.goldmann@outlook.com.br"});
db.shooters.insertOne({name:"Andreas Johann Jacob Kuhn", email:"39686202838@tpmonline.com.br", category:0, docnum:"39686202838", fullName:"Andreas Johann Jacob Kuhn",birthday: new Date("1990-02-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andreasjacob@gmail.com"});
db.shooters.insertOne({name:"Andrew Mittendorfer Ourique", email:"36922988892@tpmonline.com.br", category:0, docnum:"36922988892", fullName:"Andrew Mittendorfer Ourique",birthday: new Date("1988-12-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"andrew@e-dealers.com.br"});
db.shooters.insertOne({name:"Angelo Freitas da Silva", email:"43091492869@tpmonline.com.br", category:0, docnum:"43091492869", fullName:"Angelo Freitas da Silva",birthday: new Date("1994-04-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"angelofreitas@gmail.com"});
db.shooters.insertOne({name:"Angelo Marcio de Jesus Silva", email:"29151866854@tpmonline.com.br", category:0, docnum:"29151866854", fullName:"Angelo Marcio de Jesus Silva",birthday: new Date("1976-04-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"angelomarcio@gmail.com"});
db.shooters.insertOne({name:"Anhui Cai", email:"24028434890@tpmonline.com.br", category:2, docnum:"24028434890", fullName:"Anhui Cai",birthday: new Date("1970-07-20") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"caianhui50@gmail.com"});
db.shooters.insertOne({name:"ANIE DA SILVA GOMES", email:"02964444056@tpmonline.com.br", category:2, docnum:"02964444056", fullName:"ANIE DA SILVA GOMES",birthday: new Date("1993-04-15") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"aniegomess@gmail.com"});
db.shooters.insertOne({name:"Anis Ghattas Mitri Filho", email:"33069334814@tpmonline.com.br", category:0, docnum:"33069334814", fullName:"Anis Ghattas Mitri Filho",birthday: new Date("1984-10-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"anismitri@gmail.com"});
db.shooters.insertOne({name:"Anselio Frutuoso de Carvalho", email:"19179536824@tpmonline.com.br", category:0, docnum:"19179536824", fullName:"Anselio Frutuoso de Carvalho",birthday: new Date("1974-05-31") ,sex:"M",cr:"229.799-05",crEndDate: new Date("2032-03-14") ,SH_email:"ancservicecontato@gmail.com"});
db.shooters.insertOne({name:"Antonio Carlos Carvalho Gomes", email:"16596821854@tpmonline.com.br", category:0, docnum:"16596821854", fullName:"Antonio Carlos Carvalho Gomes",birthday: new Date("1973-02-06") ,sex:"M",cr:"000.450.185-37",crEndDate: new Date("2030-11-25") ,SH_email:"carlosbrow.275@gmail.com"});
db.shooters.insertOne({name:"Antonio Carlos de Freitas", email:"96512997891@tpmonline.com.br", category:0, docnum:"96512997891", fullName:"Antonio Carlos de Freitas",birthday: new Date("1957-09-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"regina_lucon@gmai.com"});
db.shooters.insertOne({name:"Antonio Carlos Lopes", email:"19527017831@tpmonline.com.br", category:0, docnum:"19527017831", fullName:"Antonio Carlos Lopes",birthday: new Date("1975-03-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carlos.lopes@petronet.com.br"});
db.shooters.insertOne({name:"Antonio Sergio de Aguiar", email:"02330397836@tpmonline.com.br", category:0, docnum:"02330397836", fullName:"Antonio Sergio de Aguiar",birthday: new Date("1963-04-30") ,sex:"M",cr:"139334",crEndDate: new Date("1980-01-01") ,SH_email:"antoniosergioadv@hotmail.com"});
db.shooters.insertOne({name:"Antonio Sergio Lousao", email:"07494333886@tpmonline.com.br", category:0, docnum:"07494333886", fullName:"Antonio Sergio Lousao",birthday: new Date("1965-11-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"se.s7@hotmail.com"});
db.shooters.insertOne({name:"ANTONIO TEIXEIRA DE OLIVEIRA", email:"05594696830@tpmonline.com.br", category:0, docnum:"05594696830", fullName:"ANTONIO TEIXEIRA DE OLIVEIRA",birthday: new Date("1962-06-24") ,sex:"",cr:"4073800",crEndDate: new Date("2031-12-19") ,SH_email:"antonio@gmail.com"});
db.shooters.insertOne({name:"ANTONIO XAVIER JUNIOR", email:"23430452830@tpmonline.com.br", category:0, docnum:"23430452830", fullName:"ANTONIO XAVIER JUNIOR",birthday: new Date("1991-07-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"antonio.xavier@hotmail.com"});
db.shooters.insertOne({name:"Arthur Garuti dos Santos", email:"37075736809@tpmonline.com.br", category:0, docnum:"37075736809", fullName:"Arthur Garuti dos Santos",birthday: new Date("1991-05-08") ,sex:"M",cr:"128564-52",crEndDate: new Date("2029-09-21") ,SH_email:"arthur.garuti@gmail.com"});
db.shooters.insertOne({name:"Artur Jorge Souza Silva", email:"66747422368@tpmonline.com.br", category:0, docnum:"66747422368", fullName:"Artur Jorge Souza Silva",birthday: new Date("1973-10-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"arturj@gmail.com"});
db.shooters.insertOne({name:"ARTUR RODRIGUES DA SILVA NETO", email:"25341333810@tpmonline.com.br", category:0, docnum:"25341333810", fullName:"ARTUR RODRIGUES DA SILVA NETO",birthday: new Date("1976-04-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"contato@dinamicasonechaveiro.com.br"});
db.shooters.insertOne({name:"Badwi Jean Semaan", email:"29860648840@tpmonline.com.br", category:0, docnum:"29860648840", fullName:"Badwi Jean Semaan",birthday: new Date("1977-04-30") ,sex:"M",cr:"319300",crEndDate: new Date("2029-08-19") ,SH_email:"badwisemaan@hotmail.com"});
db.shooters.insertOne({name:"Benedito Roberto Melo Bortoletto", email:"82235783872@tpmonline.com.br", category:0, docnum:"82235783872", fullName:"Benedito Roberto Melo Bortoletto",birthday: new Date("1953-11-01") ,sex:"M",cr:"582.781-76",crEndDate: new Date("2031-08-24") ,SH_email:"betoborto@gmail.com"});
db.shooters.insertOne({name:"BERTONITO SALDANHA RODRIGUES", email:"06451022888@tpmonline.com.br", category:0, docnum:"06451022888", fullName:"BERTONITO SALDANHA RODRIGUES",birthday: new Date("1965-01-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"BRUNA DA SILVA RIBEIRO", email:"42950424805@tpmonline.com.br", category:2, docnum:"42950424805", fullName:"BRUNA DA SILVA RIBEIRO",birthday: new Date("1995-11-20") ,sex:"F",cr:"95633855",crEndDate: new Date("2032-11-21") ,SH_email:"brunaribeiro751@gmail.com"});
db.shooters.insertOne({name:"Bruno Eduardo Baradel Leal da Mota", email:"37746409806@tpmonline.com.br", category:0, docnum:"37746409806", fullName:"Bruno Eduardo Baradel Leal da Mota",birthday: new Date("1998-06-30") ,sex:"M",cr:"98109944",crEndDate: new Date("2032-12-13") ,SH_email:"motalealad@hotmail.com"});
db.shooters.insertOne({name:"Bruno Miranda de Souza", email:"07764005681@tpmonline.com.br", category:0, docnum:"07764005681", fullName:"Bruno Miranda de Souza",birthday: new Date("1990-03-24") ,sex:"M",cr:"172402",crEndDate: new Date("2031-03-31") ,SH_email:"bruno.mirandas@hotmail.com"});
db.shooters.insertOne({name:"Bruno Oliveira Marega", email:"38219782870@tpmonline.com.br", category:0, docnum:"38219782870", fullName:"Bruno Oliveira Marega",birthday: new Date("1990-02-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"bruno.oliveiramarega@gmail.com"});
db.shooters.insertOne({name:"Bruno Said da Cunha", email:"21465879897@tpmonline.com.br", category:0, docnum:"21465879897", fullName:"Bruno Said da Cunha",birthday: new Date("1983-01-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"brusaid@hotmail.com"});
db.shooters.insertOne({name:"Bruno Sousa Rodrigues", email:"22670578837@tpmonline.com.br", category:0, docnum:"22670578837", fullName:"Bruno Sousa Rodrigues",birthday: new Date("1982-12-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"brunobrunard@gmail.com"});
db.shooters.insertOne({name:"Bruno Straccia Neto", email:"36027450827@tpmonline.com.br", category:0, docnum:"36027450827", fullName:"Bruno Straccia Neto",birthday: new Date("1986-11-29") ,sex:"M",cr:"314520",crEndDate: new Date("2029-08-04") ,SH_email:"brunostraccia@gmail.com"});
db.shooters.insertOne({name:"Bruno Toledo Pinelli", email:"39631080889@tpmonline.com.br", category:0, docnum:"39631080889", fullName:"Bruno Toledo Pinelli",birthday: new Date("1990-02-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"pinelli@gmail.com"});
db.shooters.insertOne({name:"Caijie Cheng", email:"75698692149@tpmonline.com.br", category:0, docnum:"75698692149", fullName:"Caijie Cheng",birthday: new Date("1975-11-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"1114707514@qq.com"});
db.shooters.insertOne({name:"Caio Moreira Galvao", email:"36558151820@tpmonline.com.br", category:0, docnum:"36558151820", fullName:"Caio Moreira Galvao",birthday: new Date("1988-11-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"caiogalvaossp@hotmail.com"});
db.shooters.insertOne({name:"CAMILA MARTINS RUIZ VALVERDE", email:"32980881880@tpmonline.com.br", category:2, docnum:"32980881880", fullName:"CAMILA MARTINS RUIZ VALVERDE",birthday: new Date("1984-07-02") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"camila.valverde@hotmail.com"});
db.shooters.insertOne({name:"CARLOS ALBERTO DA SILVA BRAZ PINTO", email:"14742074807@tpmonline.com.br", category:0, docnum:"14742074807", fullName:"CARLOS ALBERTO DA SILVA BRAZ PINTO",birthday: new Date("2000-01-01") ,sex:"M",cr:"359814",crEndDate: new Date("2030-01-16") ,SH_email:"carlos@c3atechnology.com.br"});
db.shooters.insertOne({name:"CARLOS ALBERTO RAIZA", email:"01076847803@tpmonline.com.br", category:0, docnum:"01076847803", fullName:"CARLOS ALBERTO RAIZA",birthday: new Date("1960-09-06") ,sex:"",cr:"11547860",crEndDate: new Date("2030-12-29") ,SH_email:"c.a.raiza@uol.com.br"});
db.shooters.insertOne({name:"CARLOS ALBERTO YAMASHITA", email:"06927880852@tpmonline.com.br", category:0, docnum:"06927880852", fullName:"CARLOS ALBERTO YAMASHITA",birthday: new Date("1962-07-07") ,sex:"",cr:"68579",crEndDate: new Date("2030-12-31") ,SH_email:"carlos@gmail.com"});
db.shooters.insertOne({name:"Carlos Augusto Rodrigues Bernardes", email:"13016617838@tpmonline.com.br", category:0, docnum:"13016617838", fullName:"Carlos Augusto Rodrigues Bernardes",birthday: new Date("1968-06-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"CARLOS BAUMGRATZ FALCÃO", email:"22474272860@tpmonline.com.br", category:0, docnum:"22474272860", fullName:"CARLOS BAUMGRATZ FALCÃO",birthday: new Date("1980-03-07") ,sex:"M",cr:"84878711",crEndDate: new Date("2032-08-14") ,SH_email:"falconjeep@hotmail.com"});
db.shooters.insertOne({name:"Carlos Eduardo Della Rovere", email:"03635167860@tpmonline.com.br", category:0, docnum:"03635167860", fullName:"Carlos Eduardo Della Rovere",birthday: new Date("1958-10-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelo@mrovere.com"});
db.shooters.insertOne({name:"Carlos Eduardo Di Palma Pereira", email:"34470973882@tpmonline.com.br", category:0, docnum:"34470973882", fullName:"Carlos Eduardo Di Palma Pereira",birthday: new Date("1999-11-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carlos123123.cgce@gmail.com"});
db.shooters.insertOne({name:"Carlos Eduardo Martinho Cais Malieri", email:"22083676858@tpmonline.com.br", category:0, docnum:"22083676858", fullName:"Carlos Eduardo Martinho Cais Malieri",birthday: new Date("1980-06-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"adfdocumentos@gmail.com"});
db.shooters.insertOne({name:"Carlos Fantoni Carmelo de Oliveira", email:"33177055823@tpmonline.com.br", category:0, docnum:"33177055823", fullName:"Carlos Fantoni Carmelo de Oliveira",birthday: new Date("1984-08-02") ,sex:"M",cr:"11141310",crEndDate: new Date("2031-11-22") ,SH_email:"carlosfantoni@uol.com.br"});
db.shooters.insertOne({name:"Carlos Ferreira dos Santos Junior", email:"25715811805@tpmonline.com.br", category:0, docnum:"25715811805", fullName:"Carlos Ferreira dos Santos Junior",birthday: new Date("1977-08-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jr947117005@gmail.com"});
db.shooters.insertOne({name:"CARLOS HENRIQUE DE ALMEIDA CASTELO BRANCO JUNIOR", email:"01308923430@tpmonline.com.br", category:0, docnum:"01308923430", fullName:"CARLOS HENRIQUE DE ALMEIDA CASTELO BRANCO JUNIOR",birthday: new Date("1984-07-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carlos.almeida@hotmail.com"});
db.shooters.insertOne({name:"Carlos Roberto Rentroia", email:"18349106840@tpmonline.com.br", category:0, docnum:"18349106840", fullName:"Carlos Roberto Rentroia",birthday: new Date("1977-06-04") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"qualidade@fame.com.br"});
db.shooters.insertOne({name:"Carlos Welber Figueiredo Tolentino", email:"85491659487@tpmonline.com.br", category:0, docnum:"85491659487", fullName:"Carlos Welber Figueiredo Tolentino",birthday: new Date("1973-03-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Carolina da Silva Rodrigues Aragao", email:"32514074819@tpmonline.com.br", category:2, docnum:"32514074819", fullName:"Carolina da Silva Rodrigues Aragao",birthday: new Date("1988-07-08") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carolinasaragao@gmail.com"});
db.shooters.insertOne({name:"Cayo Augusto Pfutzenreuter Riskalla", email:"34953443810@tpmonline.com.br", category:0, docnum:"34953443810", fullName:"Cayo Augusto Pfutzenreuter Riskalla",birthday: new Date("1987-08-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cayo.riskalla@hotmail.com"});
db.shooters.insertOne({name:"CEDRIC CRAZE", email:"00731627954@tpmonline.com.br", category:0, docnum:"00731627954", fullName:"CEDRIC CRAZE",birthday: new Date("1970-05-13") ,sex:"M",cr:"74314904",crEndDate: new Date("2032-04-26") ,SH_email:"cedric.craze@gmail.com"});
db.shooters.insertOne({name:"Celso de Sallas", email:"01425563864@tpmonline.com.br", category:0, docnum:"01425563864", fullName:"Celso de Sallas",birthday: new Date("1961-04-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"desallas@uol.com.br"});
db.shooters.insertOne({name:"Celso Ossamu Shimomura", email:"10797206850@tpmonline.com.br", category:0, docnum:"10797206850", fullName:"Celso Ossamu Shimomura",birthday: new Date("1969-05-05") ,sex:"M",cr:"1227",crEndDate: new Date("2029-09-03") ,SH_email:"coshimo@gmail.com"});
db.shooters.insertOne({name:"Chadi Skaff", email:"70073984132@tpmonline.com.br", category:0, docnum:"70073984132", fullName:"Chadi Skaff",birthday: new Date("1985-04-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"chadiskaff@hotmail.com"});
db.shooters.insertOne({name:"Chana Karin Tsai", email:"21983675806@tpmonline.com.br", category:2, docnum:"21983675806", fullName:"Chana Karin Tsai",birthday: new Date("1979-10-13") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"chana.tsai@gmail.com"});
db.shooters.insertOne({name:"Chaoxing Zheng", email:"23248188847@tpmonline.com.br", category:0, docnum:"23248188847", fullName:"Chaoxing Zheng",birthday: new Date("1979-04-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"276796326@qq.com"});
db.shooters.insertOne({name:"CHEN JU", email:"38588453886@tpmonline.com.br", category:0, docnum:"38588453886", fullName:"CHEN JU",birthday: new Date("1987-09-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"juchen1987@gmail.com"});
db.shooters.insertOne({name:"Chen Rui", email:"15667149664@tpmonline.com.br", category:0, docnum:"15667149664", fullName:"Chen Rui",birthday: new Date("1999-11-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"chenrui19991120@gmail.com"});
db.shooters.insertOne({name:"CHEN ZU DAO", email:"21770855866@tpmonline.com.br", category:0, docnum:"21770855866", fullName:"CHEN ZU DAO",birthday: new Date("1972-09-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"chenzudao@gmail.com"});
db.shooters.insertOne({name:"Chengqiang He", email:"23620522812@tpmonline.com.br", category:0, docnum:"23620522812", fullName:"Chengqiang He",birthday: new Date("1982-12-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"804312966@qq.com"});
db.shooters.insertOne({name:"Chengwei Wu", email:"23780834839@tpmonline.com.br", category:0, docnum:"23780834839", fullName:"Chengwei Wu",birthday: new Date("1986-05-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"609974279@qq.com"});
db.shooters.insertOne({name:"Christian Figlioli", email:"13195706822@tpmonline.com.br", category:0, docnum:"13195706822", fullName:"Christian Figlioli",birthday: new Date("1972-02-15") ,sex:"M",cr:"000.412.798-67",crEndDate: new Date("2030-09-09") ,SH_email:"christian@cefisa.com.br"});
db.shooters.insertOne({name:"Chrystian Musarra da Costa", email:"22114692809@tpmonline.com.br", category:0, docnum:"22114692809", fullName:"Chrystian Musarra da Costa",birthday: new Date("1979-03-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"verinhamusarra@gmail.com"});
db.shooters.insertOne({name:"Claudia Gorett Schlink Moreira", email:"26088419881@tpmonline.com.br", category:2, docnum:"26088419881", fullName:"Claudia Gorett Schlink Moreira",birthday: new Date("1974-06-30") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"confeacc@gmail.com.br"});
db.shooters.insertOne({name:"Claudio Gonçalves da Silva", email:"26197838877@tpmonline.com.br", category:0, docnum:"26197838877", fullName:"Claudio Gonçalves da Silva",birthday: new Date("1975-08-23") ,sex:"M",cr:"000.458.994-79",crEndDate: new Date("2030-12-15") ,SH_email:"claudiogoncalves@hotmail.com"});
db.shooters.insertOne({name:"CLAUDIO HENRIQUE DE ALBUQUERQUE CANTERO", email:"08027195705@tpmonline.com.br", category:0, docnum:"08027195705", fullName:"CLAUDIO HENRIQUE DE ALBUQUERQUE CANTERO",birthday: new Date("1978-06-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"claudio.cantero@gmail.com"});
db.shooters.insertOne({name:"Cleber Luis Pradella Rodrigues", email:"73410845704@tpmonline.com.br", category:0, docnum:"73410845704", fullName:"Cleber Luis Pradella Rodrigues",birthday: new Date("1962-03-02") ,sex:"M",cr:"000.337.57496",crEndDate: new Date("2029-10-09") ,SH_email:"cleber.lpr@gmail.com"});
db.shooters.insertOne({name:"Cleber William Ausrotas", email:"27030047885@tpmonline.com.br", category:0, docnum:"27030047885", fullName:"Cleber William Ausrotas",birthday: new Date("1976-10-31") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cleber.willian@terra.com.br"});
db.shooters.insertOne({name:"Cleilson Campos da Costa", email:"46014316892@tpmonline.com.br", category:0, docnum:"46014316892", fullName:"Cleilson Campos da Costa",birthday: new Date("1998-08-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cleilsoncampos@gmail.com"});
db.shooters.insertOne({name:"CLEITON BRUNS", email:"05236477948@tpmonline.com.br", category:0, docnum:"05236477948", fullName:"CLEITON BRUNS",birthday: new Date("1985-12-05") ,sex:"M",cr:"765268",crEndDate: new Date("2026-07-21") ,SH_email:"cl_bruns@hotmail.com"});
db.shooters.insertOne({name:"Congjie Xie", email:"23378539852@tpmonline.com.br", category:0, docnum:"23378539852", fullName:"Congjie Xie",birthday: new Date("1969-06-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"395226260@qq.com"});
db.shooters.insertOne({name:"Congming Huang", email:"07936657100@tpmonline.com.br", category:0, docnum:"07936657100", fullName:"Congming Huang",birthday: new Date("1977-11-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"smith.huang@gosuperc.com.br"});
db.shooters.insertOne({name:"Cristiano Aparecido Conte", email:"18166211882@tpmonline.com.br", category:0, docnum:"18166211882", fullName:"Cristiano Aparecido Conte",birthday: new Date("1977-12-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cristianoconte@gmail.com"});
db.shooters.insertOne({name:"Cristiano Leite Guiron", email:"85113077968@tpmonline.com.br", category:0, docnum:"85113077968", fullName:"Cristiano Leite Guiron",birthday: new Date("1973-05-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"clguiron@terra.com.br"});
db.shooters.insertOne({name:"CYRO BUONAVOGLIA", email:"12420140800@tpmonline.com.br", category:0, docnum:"12420140800", fullName:"CYRO BUONAVOGLIA",birthday: new Date("1948-12-15") ,sex:"M",cr:"1457691",crEndDate: new Date("2027-07-04") ,SH_email:""});
db.shooters.insertOne({name:"Daniel Fernandes de Mello", email:"32347632833@tpmonline.com.br", category:0, docnum:"32347632833", fullName:"Daniel Fernandes de Mello",birthday: new Date("1984-02-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"daniel.mello84@gmail.com"});
db.shooters.insertOne({name:"DANIEL SOUZA", email:"86260910959@tpmonline.com.br", category:0, docnum:"86260910959", fullName:"DANIEL SOUZA",birthday: new Date("1972-07-28") ,sex:"M",cr:"103155783",crEndDate: new Date("2027-06-24") ,SH_email:"daniel.souza.br@hotmail.com"});
db.shooters.insertOne({name:"Daniela de Brito Ferreira Sansão", email:"22824942886@tpmonline.com.br", category:0, docnum:"22824942886", fullName:"Daniela de Brito Ferreira Sansão",birthday: new Date("1983-12-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"daniela.chemix@gmail.com"});
db.shooters.insertOne({name:"Danielle Fortunato", email:"24861587824@tpmonline.com.br", category:2, docnum:"24861587824", fullName:"Danielle Fortunato",birthday: new Date("1977-04-13") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"danif2003@yahoo.com.br"});
db.shooters.insertOne({name:"Danilo Bezerra de Vasconcelos", email:"39231604880@tpmonline.com.br", category:0, docnum:"39231604880", fullName:"Danilo Bezerra de Vasconcelos",birthday: new Date("1991-01-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"DANILO CORREIA ROSSI", email:"37491055885@tpmonline.com.br", category:0, docnum:"37491055885", fullName:"DANILO CORREIA ROSSI",birthday: new Date("1999-01-01") ,sex:"M",cr:"13615467",crEndDate: new Date("2030-01-31") ,SH_email:"danilo@gmail.com"});
db.shooters.insertOne({name:"Danilo Tadashi Saito", email:"15311063823@tpmonline.com.br", category:0, docnum:"15311063823", fullName:"Danilo Tadashi Saito",birthday: new Date("1974-03-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tadashiodontologiaestetica@hotmail.com"});
db.shooters.insertOne({name:"David Carvalho Loiola", email:"35132306802@tpmonline.com.br", category:0, docnum:"35132306802", fullName:"David Carvalho Loiola",birthday: new Date("1995-01-04") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"davidloiola@gmail.com"});
db.shooters.insertOne({name:"David Emanuel Caramaschi", email:"39987199895@tpmonline.com.br", category:0, docnum:"39987199895", fullName:"David Emanuel Caramaschi",birthday: new Date("1997-03-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"davidcaramaschi@gmail.com"});
db.shooters.insertOne({name:"David Honório Alves Junior", email:"17096270850@tpmonline.com.br", category:0, docnum:"17096270850", fullName:"David Honório Alves Junior",birthday: new Date("1975-03-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"davidjuniorpeavey@gmail.com"});
db.shooters.insertOne({name:"Davidson Gonçalves dos Santos", email:"39984659879@tpmonline.com.br", category:0, docnum:"39984659879", fullName:"Davidson Gonçalves dos Santos",birthday: new Date("1989-10-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"davidsongon@hotmail.com"});
db.shooters.insertOne({name:"Dayvi Mizrahi", email:"24593421870@tpmonline.com.br", category:0, docnum:"24593421870", fullName:"Dayvi Mizrahi",birthday: new Date("1970-05-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dayvi@mizrahi.eu"});
db.shooters.insertOne({name:"Denis Ellkson Tomaz Nascimento", email:"33007337828@tpmonline.com.br", category:0, docnum:"33007337828", fullName:"Denis Ellkson Tomaz Nascimento",birthday: new Date("1984-03-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"denisellkson@gm,ail.com"});
db.shooters.insertOne({name:"Diego Cidro Gea", email:"31503803830@tpmonline.com.br", category:0, docnum:"31503803830", fullName:"Diego Cidro Gea",birthday: new Date("1985-02-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"diego@wattcron.com.br"});
db.shooters.insertOne({name:"DIEGO DA SILVA", email:"05281607960@tpmonline.com.br", category:0, docnum:"05281607960", fullName:"DIEGO DA SILVA",birthday: new Date("1987-04-19") ,sex:"M",cr:"73716839",crEndDate: new Date("2032-04-12") ,SH_email:"diegodasilva@otimizesolucoes.com.br"});
db.shooters.insertOne({name:"Diego Micael Vieira Santana", email:"05567757590@tpmonline.com.br", category:0, docnum:"05567757590", fullName:"Diego Micael Vieira Santana",birthday: new Date("1992-04-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"diegomicael58@gmail.com"});
db.shooters.insertOne({name:"Diego Píres da Silva", email:"37949450851@tpmonline.com.br", category:0, docnum:"37949450851", fullName:"Diego Píres da Silva",birthday: new Date("1989-08-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"stephaniedi3@icloud.com"});
db.shooters.insertOne({name:"Diego Soares de Menezes", email:"10443036705@tpmonline.com.br", category:0, docnum:"10443036705", fullName:"Diego Soares de Menezes",birthday: new Date("1985-04-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dmenezes3004@gmail.com"});
db.shooters.insertOne({name:"Dirceu de Souza Lima Junior", email:"26232673832@tpmonline.com.br", category:0, docnum:"26232673832", fullName:"Dirceu de Souza Lima Junior",birthday: new Date("1976-06-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dirceusouzajr@hotmail.com"});
db.shooters.insertOne({name:"Dong Yiyun", email:"22085716814@tpmonline.com.br", category:0, docnum:"22085716814", fullName:"Dong Yiyun",birthday: new Date("1966-01-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulodong@yahoo.com"});
db.shooters.insertOne({name:"Dongjian Zhen", email:"24115342803@tpmonline.com.br", category:0, docnum:"24115342803", fullName:"Dongjian Zhen",birthday: new Date("1988-03-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"dongjianzhen76@gmail.com"});
db.shooters.insertOne({name:"DOUGLAS DE ALMEIDA SOARES BISPO", email:"22533765821@tpmonline.com.br", category:0, docnum:"22533765821", fullName:"DOUGLAS DE ALMEIDA SOARES BISPO",birthday: new Date("1984-03-18") ,sex:"M",cr:"45443076",crEndDate: new Date("2030-12-04") ,SH_email:"douglasdodoo@hotmail.com"});
db.shooters.insertOne({name:"Douglas Rafael Rodrigues Vieira", email:"37206456812@tpmonline.com.br", category:0, docnum:"37206456812", fullName:"Douglas Rafael Rodrigues Vieira",birthday: new Date("1989-01-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"douglasrafael161@gmail.com"});
db.shooters.insertOne({name:"douglas victor goulart andrade", email:"07443672632@tpmonline.com.br", category:2, docnum:"07443672632", fullName:"douglas victor goulart andrade",birthday: new Date("1986-11-03") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"douglasvgandrade@yahoo.com.br"});
db.shooters.insertOne({name:"EDILÇON CAMARGO DA SILVA", email:"93466633087@tpmonline.com.br", category:0, docnum:"93466633087", fullName:"EDILÇON CAMARGO DA SILVA",birthday: new Date("1977-04-04") ,sex:"M",cr:"96695163",crEndDate: new Date("2032-11-30") ,SH_email:"ejmcamargo@gmail.com"});
db.shooters.insertOne({name:"Edilson Rato Galdino", email:"35250422802@tpmonline.com.br", category:0, docnum:"35250422802", fullName:"Edilson Rato Galdino",birthday: new Date("1990-03-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edilsonr@gmail.com"});
db.shooters.insertOne({name:"Edimar Soares Oliveira", email:"22480568857@tpmonline.com.br", category:0, docnum:"22480568857", fullName:"Edimar Soares Oliveira",birthday: new Date("1981-08-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edimar@gmail.com"});
db.shooters.insertOne({name:"Edison Jose Dias Cury", email:"03609961830@tpmonline.com.br", category:0, docnum:"03609961830", fullName:"Edison Jose Dias Cury",birthday: new Date("1962-06-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ejdcury@terra.com.br"});
db.shooters.insertOne({name:"Edmo Luiz Pereira da Costa", email:"88764389715@tpmonline.com.br", category:0, docnum:"88764389715", fullName:"Edmo Luiz Pereira da Costa",birthday: new Date("1966-08-26") ,sex:"M",cr:"311509",crEndDate: new Date("2029-07-29") ,SH_email:"edmo@edmocosta.com.br"});
db.shooters.insertOne({name:"EDMUNDO APARECIDO SILVEIRA", email:"19855736877@tpmonline.com.br", category:0, docnum:"19855736877", fullName:"EDMUNDO APARECIDO SILVEIRA",birthday: new Date("1977-09-25") ,sex:"M",cr:"19655736877",crEndDate: new Date("2032-03-30") ,SH_email:"dinhocas@gmail.com"});
db.shooters.insertOne({name:"EDSON DA SILVA REIS", email:"35270437805@tpmonline.com.br", category:0, docnum:"35270437805", fullName:"EDSON DA SILVA REIS",birthday: new Date("1985-11-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edsonreis@gmail.com"});
db.shooters.insertOne({name:"Edson Farhat Rahal", email:"02181046859@tpmonline.com.br", category:0, docnum:"02181046859", fullName:"Edson Farhat Rahal",birthday: new Date("1954-02-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edsonfahal@gmail.com"});
db.shooters.insertOne({name:"Edson Gomes de Andrade", email:"30227581890@tpmonline.com.br", category:0, docnum:"30227581890", fullName:"Edson Gomes de Andrade",birthday: new Date("1982-06-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edsongomes@gmail.com"});
db.shooters.insertOne({name:"Eduardo Alfredo dos Santos", email:"30960691820@tpmonline.com.br", category:0, docnum:"30960691820", fullName:"Eduardo Alfredo dos Santos",birthday: new Date("1981-01-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"alfredosantos3435@gmail.com"});
db.shooters.insertOne({name:"Eduardo Baradel Leal da Mota", email:"14742540808@tpmonline.com.br", category:0, docnum:"14742540808", fullName:"Eduardo Baradel Leal da Mota",birthday: new Date("1973-03-08") ,sex:"M",cr:"17809568",crEndDate: new Date("2031-04-23") ,SH_email:"motalealad@hotmail.com.br"});
db.shooters.insertOne({name:"Eduardo Geraldo Galhardo", email:"09074085830@tpmonline.com.br", category:0, docnum:"09074085830", fullName:"Eduardo Geraldo Galhardo",birthday: new Date("1967-03-08") ,sex:"M",cr:"66266",crEndDate: new Date("2029-09-20") ,SH_email:"edugalhardo@gmail.com"});
db.shooters.insertOne({name:"EDUARDO GOMES MACHADO", email:"26136161800@tpmonline.com.br", category:0, docnum:"26136161800", fullName:"EDUARDO GOMES MACHADO",birthday: new Date("1976-08-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"emachadomd@hotmail.com"});
db.shooters.insertOne({name:"EDUARDO HENRIQUE BITAR", email:"31543589863@tpmonline.com.br", category:0, docnum:"31543589863", fullName:"EDUARDO HENRIQUE BITAR",birthday: new Date("1983-08-15") ,sex:"M",cr:"4682076",crEndDate: new Date("2031-05-30") ,SH_email:"eduardobitar@hotmail.com"});
db.shooters.insertOne({name:"Eduardo Ribeiro da Silva", email:"25210590801@tpmonline.com.br", category:0, docnum:"25210590801", fullName:"Eduardo Ribeiro da Silva",birthday: new Date("1978-05-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"eduribeirosilva@uol.com.br"});
db.shooters.insertOne({name:"EDVALDO FERREIRA DOS SANTOS", email:"15761989875@tpmonline.com.br", category:0, docnum:"15761989875", fullName:"EDVALDO FERREIRA DOS SANTOS",birthday: new Date("1973-07-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"edvaldoguilhermesantos@hotmail.com"});
db.shooters.insertOne({name:"EDVALDO LUIZ BATISTA MATOS", email:"16322443810@tpmonline.com.br", category:0, docnum:"16322443810", fullName:"EDVALDO LUIZ BATISTA MATOS",birthday: new Date("1975-06-13") ,sex:"M",cr:"122651",crEndDate: new Date("2029-06-29") ,SH_email:"edvaldo.matos190@gmail.com"});
db.shooters.insertOne({name:"ELCIO ARI MAZZALI", email:"16301019822@tpmonline.com.br", category:0, docnum:"16301019822", fullName:"ELCIO ARI MAZZALI",birthday: new Date("1971-07-27") ,sex:"M",cr:"25159",crEndDate: new Date("2029-10-23") ,SH_email:"eamazzali@gmail.com"});
db.shooters.insertOne({name:"Eli Szwarc", email:"27689076858@tpmonline.com.br", category:0, docnum:"27689076858", fullName:"Eli Szwarc",birthday: new Date("1977-05-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"eli.szwarc@gmail.com"});
db.shooters.insertOne({name:"ELIAS LAPINSKAS JUNIOR", email:"07666955812@tpmonline.com.br", category:0, docnum:"07666955812", fullName:"ELIAS LAPINSKAS JUNIOR",birthday: new Date("1968-03-08") ,sex:"M",cr:"44643977",crEndDate: new Date("2030-11-18") ,SH_email:"elias.lapinskas@hotmail.com.br"});
db.shooters.insertOne({name:"Elisangela de Mattos", email:"31026255848@tpmonline.com.br", category:2, docnum:"31026255848", fullName:"Elisangela de Mattos",birthday: new Date("1982-03-15") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"elismattos01@hotmail.com"});
db.shooters.insertOne({name:"Elizana Silvia Gomes", email:"27812363813@tpmonline.com.br", category:2, docnum:"27812363813", fullName:"Elizana Silvia Gomes",birthday: new Date("1971-11-16") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Elvanjo Cardoso dos Santos Junior", email:"04021564632@tpmonline.com.br", category:0, docnum:"04021564632", fullName:"Elvanjo Cardoso dos Santos Junior",birthday: new Date("1980-11-20") ,sex:"M",cr:"62649132",crEndDate: new Date("2031-11-04") ,SH_email:""});
db.shooters.insertOne({name:"Elvio Lozano Filho", email:"02984958802@tpmonline.com.br", category:0, docnum:"02984958802", fullName:"Elvio Lozano Filho",birthday: new Date("1962-02-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"elviolozanofilho@outlook.com"});
db.shooters.insertOne({name:"Elvis Gonçalves Carreira dos Santos", email:"31202139850@tpmonline.com.br", category:0, docnum:"31202139850", fullName:"Elvis Gonçalves Carreira dos Santos",birthday: new Date("1983-04-04") ,sex:"M",cr:"4477308",crEndDate: new Date("2030-12-31") ,SH_email:"elviscarreira@gmail.com"});
db.shooters.insertOne({name:"Epifanio Gomes", email:"03578270660@tpmonline.com.br", category:0, docnum:"03578270660", fullName:"Epifanio Gomes",birthday: new Date("1977-10-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"epifaniogomes507@gmail.com"});
db.shooters.insertOne({name:"Eraldo Galdino", email:"54267765472@tpmonline.com.br", category:0, docnum:"54267765472", fullName:"Eraldo Galdino",birthday: new Date("1968-04-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Eric Augusto do Nascimento", email:"47295414215@tpmonline.com.br", category:0, docnum:"47295414215", fullName:"Eric Augusto do Nascimento",birthday: new Date("1977-06-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ericaugusto.apvs@gmail.com"});
db.shooters.insertOne({name:"Erik Atsumori Gakiya", email:"29933509861@tpmonline.com.br", category:0, docnum:"29933509861", fullName:"Erik Atsumori Gakiya",birthday: new Date("1981-11-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"atsugak@gmail.com"});
db.shooters.insertOne({name:"Erinei Aparecido dos Santos", email:"69522243868@tpmonline.com.br", category:0, docnum:"69522243868", fullName:"Erinei Aparecido dos Santos",birthday: new Date("1955-10-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cialeste@uol.com.br"});
db.shooters.insertOne({name:"Erinei Laranjeira Nascimento", email:"01912486571@tpmonline.com.br", category:0, docnum:"01912486571", fullName:"Erinei Laranjeira Nascimento",birthday: new Date("1985-08-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"erineilaranjeira637@gmail.com"});
db.shooters.insertOne({name:"Erivelton Santos Nascimento", email:"35728534864@tpmonline.com.br", category:0, docnum:"35728534864", fullName:"Erivelton Santos Nascimento",birthday: new Date("1988-10-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"eriveltonnacimento@gmail.com"});
db.shooters.insertOne({name:"Ernesto Yi Cho", email:"15380639801@tpmonline.com.br", category:0, docnum:"15380639801", fullName:"Ernesto Yi Cho",birthday: new Date("1976-11-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ernesto.cho2018@gmail.com"});
db.shooters.insertOne({name:"ESTEFANI LUCK DE LIMA", email:"30871353806@tpmonline.com.br", category:0, docnum:"30871353806", fullName:"ESTEFANI LUCK DE LIMA",birthday: new Date("1985-10-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luckdiretoria@gmail.com"});
db.shooters.insertOne({name:"Eugenio Mumic de Oliveira", email:"66606322634@tpmonline.com.br", category:0, docnum:"66606322634", fullName:"Eugenio Mumic de Oliveira",birthday: new Date("1970-12-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Everaldo José De Oliveira", email:"73063568953@tpmonline.com.br", category:0, docnum:"73063568953", fullName:"Everaldo José De Oliveira",birthday: new Date("1971-07-12") ,sex:"M",cr:"251449",crEndDate: new Date("2032-09-14") ,SH_email:"everallempreiteira@gmail.com"});
db.shooters.insertOne({name:"Everardo de Souza Pereira", email:"70508097304@tpmonline.com.br", category:0, docnum:"70508097304", fullName:"Everardo de Souza Pereira",birthday: new Date("1975-10-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"everardosouza@gmail.com"});
db.shooters.insertOne({name:"EVILÁSIO NASCIMENTO JAMBEIRO", email:"03324118859@tpmonline.com.br", category:0, docnum:"03324118859", fullName:"EVILÁSIO NASCIMENTO JAMBEIRO",birthday: new Date("2000-01-01") ,sex:"",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"evilasio@gmail.com"});
db.shooters.insertOne({name:"Fabiana Caparroz Silva da Mota", email:"15309962875@tpmonline.com.br", category:2, docnum:"15309962875", fullName:"Fabiana Caparroz Silva da Mota",birthday: new Date("1975-10-04") ,sex:"F",cr:"99170124",crEndDate: new Date("2032-12-27") ,SH_email:"fabianacaparrozmota@gmail.com"});
db.shooters.insertOne({name:"Fabiano Lopes de Araujo", email:"29789463855@tpmonline.com.br", category:0, docnum:"29789463855", fullName:"Fabiano Lopes de Araujo",birthday: new Date("1980-01-06") ,sex:"M",cr:"96537329",crEndDate: new Date("2032-11-29") ,SH_email:"falope95@gmail.com"});
db.shooters.insertOne({name:"Fabio Adriano Kulek", email:"05229639946@tpmonline.com.br", category:0, docnum:"05229639946", fullName:"Fabio Adriano Kulek",birthday: new Date("1985-10-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"adrianofabiokulek@yahoo.com"});
db.shooters.insertOne({name:"Fabio da Silva Marques", email:"21529292840@tpmonline.com.br", category:0, docnum:"21529292840", fullName:"Fabio da Silva Marques",birthday: new Date("1982-05-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fabio@gmail.com"});
db.shooters.insertOne({name:"Fábio de Aquino Povoas", email:"63073609172@tpmonline.com.br", category:0, docnum:"63073609172", fullName:"Fábio de Aquino Povoas",birthday: new Date("1976-02-20") ,sex:"M",cr:"37658735",crEndDate: new Date("2030-04-09") ,SH_email:"fabio@neespovoas.adv.br"});
db.shooters.insertOne({name:"Fabio dias Baeta", email:"13036905863@tpmonline.com.br", category:0, docnum:"13036905863", fullName:"Fabio dias Baeta",birthday: new Date("1975-01-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"baetametais@hotmail.com"});
db.shooters.insertOne({name:"FABIO HUCK", email:"21317523857@tpmonline.com.br", category:0, docnum:"21317523857", fullName:"FABIO HUCK",birthday: new Date("2001-01-01") ,sex:"",cr:"25720287",crEndDate: new Date("2032-04-22") ,SH_email:"fabiofabio@gmail.com"});
db.shooters.insertOne({name:"Fabio Moschetto Sevilha", email:"28576871840@tpmonline.com.br", category:0, docnum:"28576871840", fullName:"Fabio Moschetto Sevilha",birthday: new Date("1980-06-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Fabio Oliveira Costa", email:"13250042862@tpmonline.com.br", category:0, docnum:"13250042862", fullName:"Fabio Oliveira Costa",birthday: new Date("1971-04-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fabio@essbrasil.com.br"});
db.shooters.insertOne({name:"Fabio Tartari Martins da Cunha", email:"22244299830@tpmonline.com.br", category:0, docnum:"22244299830", fullName:"Fabio Tartari Martins da Cunha",birthday: new Date("1981-10-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fabiocunha@macromidiaexpress.com.br"});
db.shooters.insertOne({name:"FABIO TESSIDOR", email:"26457532802@tpmonline.com.br", category:0, docnum:"26457532802", fullName:"FABIO TESSIDOR",birthday: new Date("1978-07-17") ,sex:"",cr:"150380",crEndDate: new Date("2030-09-30") ,SH_email:"fabio@fakenioneus.com.br"});
db.shooters.insertOne({name:"Fabricio Piccoli", email:"21618846892@tpmonline.com.br", category:0, docnum:"21618846892", fullName:"Fabricio Piccoli",birthday: new Date("1980-02-07") ,sex:"M",cr:"717.328-88",crEndDate: new Date("2032-03-21") ,SH_email:"fpiccoli@gmail.com"});
db.shooters.insertOne({name:"Fangshun Hu", email:"23351310870@tpmonline.com.br", category:0, docnum:"23351310870", fullName:"Fangshun Hu",birthday: new Date("1983-12-10") ,sex:"M",cr:"72852801",crEndDate: new Date("2032-04-04") ,SH_email:"alexhu1210@gmail.com"});
db.shooters.insertOne({name:"FANGYAO LIN", email:"23297734809@tpmonline.com.br", category:0, docnum:"23297734809", fullName:"FANGYAO LIN",birthday: new Date("1984-09-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jamesesusicintos@hotmail.com"});
db.shooters.insertOne({name:"Felipe de Arruda Sansão", email:"32398518817@tpmonline.com.br", category:0, docnum:"32398518817", fullName:"Felipe de Arruda Sansão",birthday: new Date("1984-02-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fel.sansao@gmail.com"});
db.shooters.insertOne({name:"Felipe Romeu Ribeiro", email:"36780445819@tpmonline.com.br", category:0, docnum:"36780445819", fullName:"Felipe Romeu Ribeiro",birthday: new Date("1987-03-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"feliperomeu87@gmail.com"});
db.shooters.insertOne({name:"Felix Limeira Santos Tavares", email:"28076340870@tpmonline.com.br", category:0, docnum:"28076340870", fullName:"Felix Limeira Santos Tavares",birthday: new Date("1981-04-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"felixlimeira@gmail.com"});
db.shooters.insertOne({name:"Fernanda Botelho Rocha", email:"09692778738@tpmonline.com.br", category:0, docnum:"09692778738", fullName:"Fernanda Botelho Rocha",birthday: new Date("1981-10-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nandinhabotelho3.0@gmaill.com"});
db.shooters.insertOne({name:"FERNANDO AUGUSTO FONSECA", email:"26492409892@tpmonline.com.br", category:0, docnum:"26492409892", fullName:"FERNANDO AUGUSTO FONSECA",birthday: new Date("1978-10-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fefonseca78@gmail.com"});
db.shooters.insertOne({name:"FERNANDO CAVALCANTE GOMES", email:"17911539847@tpmonline.com.br", category:0, docnum:"17911539847", fullName:"FERNANDO CAVALCANTE GOMES",birthday: new Date("1973-10-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"apontomentoria@gmail.com"});
db.shooters.insertOne({name:"FERNANDO DE ANDRADE", email:"31352687801@tpmonline.com.br", category:0, docnum:"31352687801", fullName:"FERNANDO DE ANDRADE",birthday: new Date("1984-11-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fernando.andrade@hotmail.com"});
db.shooters.insertOne({name:"FERNANDO DOS SANTOS ANDRADE CAVALCANTI", email:"04742459423@tpmonline.com.br", category:0, docnum:"04742459423", fullName:"FERNANDO DOS SANTOS ANDRADE CAVALCANTI",birthday: new Date("1985-03-30") ,sex:"M",cr:"293108",crEndDate: new Date("2029-06-03") ,SH_email:"fernandp.cavalcanti@nwadv.com.br"});
db.shooters.insertOne({name:"FERNANDO GONÇALVES DA SILVA", email:"33658990813@tpmonline.com.br", category:0, docnum:"33658990813", fullName:"FERNANDO GONÇALVES DA SILVA",birthday: new Date("1985-07-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fernando@gmail.com"});
db.shooters.insertOne({name:"Fernando Henrique Pittner Vieira Gomes", email:"26858316817@tpmonline.com.br", category:0, docnum:"26858316817", fullName:"Fernando Henrique Pittner Vieira Gomes",birthday: new Date("1978-09-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fernandopittner@hotmail.com"});
db.shooters.insertOne({name:"FERNANDO STURIÃO FUTENMA", email:"28105339897@tpmonline.com.br", category:0, docnum:"28105339897", fullName:"FERNANDO STURIÃO FUTENMA",birthday: new Date("1979-06-06") ,sex:"M",cr:"15.685-07",crEndDate: new Date("2030-11-27") ,SH_email:"ffutenma@gmail.com"});
db.shooters.insertOne({name:"FLAVIO FERNANDO PRADO", email:"21439897840@tpmonline.com.br", category:0, docnum:"21439897840", fullName:"FLAVIO FERNANDO PRADO",birthday: new Date("1981-03-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"flavioprado@icloud.com"});
db.shooters.insertOne({name:"Francildo Phennes Alves de Souza", email:"36465419890@tpmonline.com.br", category:0, docnum:"36465419890", fullName:"Francildo Phennes Alves de Souza",birthday: new Date("1987-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"francildophennes@gmail.com"});
db.shooters.insertOne({name:"Francisco Antonio Tortorelli", email:"23709464820@tpmonline.com.br", category:0, docnum:"23709464820", fullName:"Francisco Antonio Tortorelli",birthday: new Date("1946-07-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"drfrancisco@hmv.com.br"});
db.shooters.insertOne({name:"Francisco Antonio Tortorelli Junior", email:"21391762860@tpmonline.com.br", category:0, docnum:"21391762860", fullName:"Francisco Antonio Tortorelli Junior",birthday: new Date("1978-04-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tortorellijunior@gmail.com"});
db.shooters.insertOne({name:"Francisco da Chaga Ribeiro da Silva", email:"88557340320@tpmonline.com.br", category:0, docnum:"88557340320", fullName:"Francisco da Chaga Ribeiro da Silva",birthday: new Date("1982-01-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"franribeiro39@icloud.com"});
db.shooters.insertOne({name:"Francisco Jotaro Ishihara", email:"17007473806@tpmonline.com.br", category:0, docnum:"17007473806", fullName:"Francisco Jotaro Ishihara",birthday: new Date("1968-06-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"f.ishihara@adv.oabsp.org.br"});
db.shooters.insertOne({name:"FRANCISCO LATERZA NETO", email:"04988447812@tpmonline.com.br", category:0, docnum:"04988447812", fullName:"FRANCISCO LATERZA NETO",birthday: new Date("1962-08-30") ,sex:"M",cr:"22677",crEndDate: new Date("2026-07-21") ,SH_email:"chiquinho@3mrecuperadora.com.br"});
db.shooters.insertOne({name:"Francisco Lucivaldo da Silva Ferreira", email:"29108614814@tpmonline.com.br", category:0, docnum:"29108614814", fullName:"Francisco Lucivaldo da Silva Ferreira",birthday: new Date("1982-08-07") ,sex:"M",cr:"325718",crEndDate: new Date("2029-09-04") ,SH_email:"rodrigohopolito@outlook.com"});
db.shooters.insertOne({name:"Francisco Wellington Cavalcante Alves", email:"04879808830@tpmonline.com.br", category:0, docnum:"04879808830", fullName:"Francisco Wellington Cavalcante Alves",birthday: new Date("1965-12-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ton@rmschemicals.com"});
db.shooters.insertOne({name:"Francivaldo Gomes da Silva", email:"46613457892@tpmonline.com.br", category:0, docnum:"46613457892", fullName:"Francivaldo Gomes da Silva",birthday: new Date("1996-02-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"francivaldogomes@gmail.com"});
db.shooters.insertOne({name:"Frederico Bortoletto", email:"29586813860@tpmonline.com.br", category:0, docnum:"29586813860", fullName:"Frederico Bortoletto",birthday: new Date("1982-01-12") ,sex:"M",cr:"212110-78",crEndDate: new Date("2031-07-26") ,SH_email:"frebort@gmail.com"});
db.shooters.insertOne({name:"Gabriel de Matos Kato", email:"34453682875@tpmonline.com.br", category:0, docnum:"34453682875", fullName:"Gabriel de Matos Kato",birthday: new Date("1998-11-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gabriel.kato@hotmail.com"});
db.shooters.insertOne({name:"Gabriel Joao Evangelista da Silva", email:"22135411833@tpmonline.com.br", category:0, docnum:"22135411833", fullName:"Gabriel Joao Evangelista da Silva",birthday: new Date("1980-02-20") ,sex:"M",cr:"70931364",crEndDate: new Date("2032-03-14") ,SH_email:"gjes@outlook.com"});
db.shooters.insertOne({name:"Gabriel Rego Garcez Guimaraes", email:"38236220800@tpmonline.com.br", category:0, docnum:"38236220800", fullName:"Gabriel Rego Garcez Guimaraes",birthday: new Date("1988-07-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"garcezgabriel6@gmail.com"});
db.shooters.insertOne({name:"Gean Carlos Soares da Silva", email:"18366202844@tpmonline.com.br", category:0, docnum:"18366202844", fullName:"Gean Carlos Soares da Silva",birthday: new Date("1975-11-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"geanfolhasp@gmail.com"});
db.shooters.insertOne({name:"Gehad Mohamad Majzoub", email:"28023306839@tpmonline.com.br", category:0, docnum:"28023306839", fullName:"Gehad Mohamad Majzoub",birthday: new Date("1980-12-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gehadmajzoub@gmail.com"});
db.shooters.insertOne({name:"Gilberto Galdino de Lima Leite", email:"39153705840@tpmonline.com.br", category:0, docnum:"39153705840", fullName:"Gilberto Galdino de Lima Leite",birthday: new Date("1991-05-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"galdino.eite.milton@gmail.com"});
db.shooters.insertOne({name:"Gileno Soares de Oliveira", email:"00312861516@tpmonline.com.br", category:0, docnum:"00312861516", fullName:"Gileno Soares de Oliveira",birthday: new Date("1981-11-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gilenosoares36@gmail.com"});
db.shooters.insertOne({name:"Gilvan Batista da Silva", email:"08440421451@tpmonline.com.br", category:0, docnum:"08440421451", fullName:"Gilvan Batista da Silva",birthday: new Date("1989-01-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gilbatista.gilvan@hotmail.com"});
db.shooters.insertOne({name:"Gilvan Monteiro do Nascimento", email:"94519188334@tpmonline.com.br", category:0, docnum:"94519188334", fullName:"Gilvan Monteiro do Nascimento",birthday: new Date("1975-11-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gilvanmonteiro@gmail.com"});
db.shooters.insertOne({name:"GIOZIVANI GOMES CATAPRETA COSTA", email:"48150304649@tpmonline.com.br", category:0, docnum:"48150304649", fullName:"GIOZIVANI GOMES CATAPRETA COSTA",birthday: new Date("1963-05-24") ,sex:"M",cr:"40572",crEndDate: new Date("2030-09-30") ,SH_email:"giozivani.costa@uol.com.br"});
db.shooters.insertOne({name:"Girlano Pereira Cangirana", email:"05153560503@tpmonline.com.br", category:0, docnum:"05153560503", fullName:"Girlano Pereira Cangirana",birthday: new Date("1991-07-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"confeacc@gmail.com"});
db.shooters.insertOne({name:"Giuseppe Chuang", email:"22792304880@tpmonline.com.br", category:0, docnum:"22792304880", fullName:"Giuseppe Chuang",birthday: new Date("1983-09-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"zech010@hotmail.com"});
db.shooters.insertOne({name:"Glaucia Soares Pereira", email:"33204584852@tpmonline.com.br", category:0, docnum:"33204584852", fullName:"Glaucia Soares Pereira",birthday: new Date("1985-06-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"glauciapereira68@gmail.com"});
db.shooters.insertOne({name:"Grimaldi Alves Mesquita", email:"33054819434@tpmonline.com.br", category:0, docnum:"33054819434", fullName:"Grimaldi Alves Mesquita",birthday: new Date("1962-07-04") ,sex:"M",cr:"92267106",crEndDate: new Date("1980-01-01") ,SH_email:"grimaldi.alves@gmail.com"});
db.shooters.insertOne({name:"Grisolino Cassia Borges Junior", email:"32156596115@tpmonline.com.br", category:0, docnum:"32156596115", fullName:"Grisolino Cassia Borges Junior",birthday: new Date("1966-05-22") ,sex:"M",cr:"4682076",crEndDate: new Date("2031-05-30") ,SH_email:"grisolinocassia@hotmail.com"});
db.shooters.insertOne({name:"Guotai Chen", email:"23799360808@tpmonline.com.br", category:0, docnum:"23799360808", fullName:"Guotai Chen",birthday: new Date("1977-11-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"137720300@qq.com"});
db.shooters.insertOne({name:"Gustavo Barri Novo Metidieri", email:"27842249881@tpmonline.com.br", category:0, docnum:"27842249881", fullName:"Gustavo Barri Novo Metidieri",birthday: new Date("1978-04-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gumetidieri@terra.com.br"});
db.shooters.insertOne({name:"Gustavo Gasparini Piloni", email:"29904120854@tpmonline.com.br", category:0, docnum:"29904120854", fullName:"Gustavo Gasparini Piloni",birthday: new Date("1982-12-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Gustavo Mastopietro Racy", email:"38224416860@tpmonline.com.br", category:0, docnum:"38224416860", fullName:"Gustavo Mastopietro Racy",birthday: new Date("1977-10-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Haidong Ruan", email:"23197575890@tpmonline.com.br", category:0, docnum:"23197575890", fullName:"Haidong Ruan",birthday: new Date("1973-10-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"haidong@gmail.com"});
db.shooters.insertOne({name:"HELITON ALVES TEXEIRA", email:"38085750856@tpmonline.com.br", category:0, docnum:"38085750856", fullName:"HELITON ALVES TEXEIRA",birthday: new Date("1988-04-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"heliton@gmail.com"});
db.shooters.insertOne({name:"Henrique Marques Campina", email:"40719578833@tpmonline.com.br", category:0, docnum:"40719578833", fullName:"Henrique Marques Campina",birthday: new Date("1991-06-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"socialsmook@gmail.com"});
db.shooters.insertOne({name:"Herick Reis do Nascimento", email:"33905998866@tpmonline.com.br", category:0, docnum:"33905998866", fullName:"Herick Reis do Nascimento",birthday: new Date("1986-01-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"herick.reis@hotmail.com"});
db.shooters.insertOne({name:"Hilario Luiz Manzo", email:"90582187834@tpmonline.com.br", category:0, docnum:"90582187834", fullName:"Hilario Luiz Manzo",birthday: new Date("1956-06-15") ,sex:"M",cr:"1641786",crEndDate: new Date("2031-12-19") ,SH_email:"indgfb@gmail.com"});
db.shooters.insertOne({name:"HILMAR BECKER", email:"18021904810@tpmonline.com.br", category:0, docnum:"18021904810", fullName:"HILMAR BECKER",birthday: new Date("1972-06-07") ,sex:"M",cr:"15621260",crEndDate: new Date("2031-01-08") ,SH_email:"hibecker7@gmai.com"});
db.shooters.insertOne({name:"Hilton Costa Batista", email:"34724511818@tpmonline.com.br", category:0, docnum:"34724511818", fullName:"Hilton Costa Batista",birthday: new Date("1987-09-09") ,sex:"M",cr:"45108102",crEndDate: new Date("2030-11-26") ,SH_email:"hilton.batista.hb@gmail.com"});
db.shooters.insertOne({name:"HUA HU", email:"23176845847@tpmonline.com.br", category:0, docnum:"23176845847", fullName:"HUA HU",birthday: new Date("1976-11-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"82155036@qq.com"});
db.shooters.insertOne({name:"Huihong Chen", email:"23298326801@tpmonline.com.br", category:0, docnum:"23298326801", fullName:"Huihong Chen",birthday: new Date("1979-06-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"88429813@qq.com"});
db.shooters.insertOne({name:"Humberto D Orto Neto", email:"27866675856@tpmonline.com.br", category:0, docnum:"27866675856", fullName:"Humberto D Orto Neto",birthday: new Date("1979-07-31") ,sex:"M",cr:"46812660",crEndDate: new Date("2031-01-11") ,SH_email:"humbertodorto@hotmail.com"});
db.shooters.insertOne({name:"Igor Roberto Dai", email:"52795992809@tpmonline.com.br", category:0, docnum:"52795992809", fullName:"Igor Roberto Dai",birthday: new Date("1999-11-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"igordai618@gmail.com"});
db.shooters.insertOne({name:"Igor Silva de Alcantara", email:"46415447866@tpmonline.com.br", category:0, docnum:"46415447866", fullName:"Igor Silva de Alcantara",birthday: new Date("1998-11-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"igor.alcantara@hotmail.com"});
db.shooters.insertOne({name:"Isaias Rodrigues da Silva", email:"38958964898@tpmonline.com.br", category:0, docnum:"38958964898", fullName:"Isaias Rodrigues da Silva",birthday: new Date("1989-05-14") ,sex:"M",cr:"122717",crEndDate: new Date("2029-06-30") ,SH_email:"rodriguesisaias273@gmail.com"});
db.shooters.insertOne({name:"Israel Grytz", email:"11027240844@tpmonline.com.br", category:0, docnum:"11027240844", fullName:"Israel Grytz",birthday: new Date("1946-01-17") ,sex:"M",cr:"3671844",crEndDate: new Date("2032-06-13") ,SH_email:"grytzsr@uol.com"});
db.shooters.insertOne({name:"Ivan Roberto Barbieri", email:"32696467803@tpmonline.com.br", category:0, docnum:"32696467803", fullName:"Ivan Roberto Barbieri",birthday: new Date("1983-06-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"administrativo@irbgsaude.com.br"});
db.shooters.insertOne({name:"IVO ALTMANN", email:"35261099900@tpmonline.com.br", category:0, docnum:"35261099900", fullName:"IVO ALTMANN",birthday: new Date("1958-08-22") ,sex:"M",cr:"88000737",crEndDate: new Date("2032-09-15") ,SH_email:"ivoaltmann@hotmail.com"});
db.shooters.insertOne({name:"Jacinto Antonio Ribeiro", email:"08795591877@tpmonline.com.br", category:0, docnum:"08795591877", fullName:"Jacinto Antonio Ribeiro",birthday: new Date("1952-12-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jacinto.antonio@uol.com.br"});
db.shooters.insertOne({name:"Jaime Shen You", email:"23591923885@tpmonline.com.br", category:0, docnum:"23591923885", fullName:"Jaime Shen You",birthday: new Date("1993-05-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jaimeluis2008@gmail.com"});
db.shooters.insertOne({name:"Jaime Yukishigue Michima Watanabe", email:"02314127897@tpmonline.com.br", category:0, docnum:"02314127897", fullName:"Jaime Yukishigue Michima Watanabe",birthday: new Date("1963-03-20") ,sex:"M",cr:"17397",crEndDate: new Date("2030-01-25") ,SH_email:"jaimewatanabe@hotmail.com"});
db.shooters.insertOne({name:"Jair Lisboa dos Santos", email:"47150190863@tpmonline.com.br", category:0, docnum:"47150190863", fullName:"Jair Lisboa dos Santos",birthday: new Date("1950-10-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jair@lsferramentas.com.br"});
db.shooters.insertOne({name:"JAYME BARBOSA DE SOUZA JUNIOR", email:"12624723854@tpmonline.com.br", category:0, docnum:"12624723854", fullName:"JAYME BARBOSA DE SOUZA JUNIOR",birthday: new Date("1963-06-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jaymebarbosadesouzajunior@gmail.com"});
db.shooters.insertOne({name:"Jenifer Gorett de Medeiros Linhares", email:"40826744893@tpmonline.com.br", category:2, docnum:"40826744893", fullName:"Jenifer Gorett de Medeiros Linhares",birthday: new Date("1992-11-25") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jennifer.gorett@hotmail.com"});
db.shooters.insertOne({name:"Jenival Batista", email:"14626511864@tpmonline.com.br", category:0, docnum:"14626511864", fullName:"Jenival Batista",birthday: new Date("1974-05-17") ,sex:"M",cr:"34423575",crEndDate: new Date("2029-10-25") ,SH_email:"jenival.batista@icloud.com"});
db.shooters.insertOne({name:"Jessica Alves Oliveira", email:"40254956866@tpmonline.com.br", category:0, docnum:"40254956866", fullName:"Jessica Alves Oliveira",birthday: new Date("1991-01-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jessicameltavares@gmail.com"});
db.shooters.insertOne({name:"Jesus Cristiano Barros Pozeli", email:"28354670848@tpmonline.com.br", category:0, docnum:"28354670848", fullName:"Jesus Cristiano Barros Pozeli",birthday: new Date("1981-03-23") ,sex:"M",cr:"000.076.551-18",crEndDate: new Date("2032-02-09") ,SH_email:"jpozeli2@gmail.com"});
db.shooters.insertOne({name:"Jhon Fredy Marin Salazar", email:"23996776845@tpmonline.com.br", category:0, docnum:"23996776845", fullName:"Jhon Fredy Marin Salazar",birthday: new Date("1994-09-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"freddymaring23@gmail.com"});
db.shooters.insertOne({name:"Jiang Wensheng", email:"22680874846@tpmonline.com.br", category:0, docnum:"22680874846", fullName:"Jiang Wensheng",birthday: new Date("1983-09-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"gilbertomcc34@hotmail.com"});
db.shooters.insertOne({name:"Jianguo Wang", email:"23486395807@tpmonline.com.br", category:0, docnum:"23486395807", fullName:"Jianguo Wang",birthday: new Date("1977-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"1026430877@qq.com"});
db.shooters.insertOne({name:"Jianjun Jin", email:"23827600871@tpmonline.com.br", category:0, docnum:"23827600871", fullName:"Jianjun Jin",birthday: new Date("1987-05-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jianjunjin@gmail.com"});
db.shooters.insertOne({name:"Jianzhan Guo", email:"23988091880@tpmonline.com.br", category:0, docnum:"23988091880", fullName:"Jianzhan Guo",birthday: new Date("1997-02-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"llt0924@outlook.com"});
db.shooters.insertOne({name:"Jie Weng", email:"23845183802@tpmonline.com.br", category:0, docnum:"23845183802", fullName:"Jie Weng",birthday: new Date("1995-01-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"suzy1026weng@gmail.com"});
db.shooters.insertOne({name:"JIN YONGHUA", email:"21816945838@tpmonline.com.br", category:0, docnum:"21816945838", fullName:"JIN YONGHUA",birthday: new Date("1968-06-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"contabil1@americai.com.br"});
db.shooters.insertOne({name:"João Alves Correa Neto", email:"28864320830@tpmonline.com.br", category:0, docnum:"28864320830", fullName:"João Alves Correa Neto",birthday: new Date("1979-04-20") ,sex:"M",cr:"327774",crEndDate: new Date("2029-09-11") ,SH_email:"joaocneto@hotmail.com"});
db.shooters.insertOne({name:"JOAO BATISTA JUNIOR", email:"39006121886@tpmonline.com.br", category:0, docnum:"39006121886", fullName:"JOAO BATISTA JUNIOR",birthday: new Date("1992-10-26") ,sex:"M",cr:"96453303",crEndDate: new Date("2032-11-29") ,SH_email:""});
db.shooters.insertOne({name:"João Carlos dos Santos", email:"31051169828@tpmonline.com.br", category:0, docnum:"31051169828", fullName:"João Carlos dos Santos",birthday: new Date("1982-08-13") ,sex:"M",cr:"56660405",crEndDate: new Date("2031-08-09") ,SH_email:"meuinss@.gov.br"});
db.shooters.insertOne({name:"João Carlos Helene de Vita", email:"09080214884@tpmonline.com.br", category:0, docnum:"09080214884", fullName:"João Carlos Helene de Vita",birthday: new Date("1970-02-15") ,sex:"M",cr:"304996",crEndDate: new Date("2029-07-11") ,SH_email:""});
db.shooters.insertOne({name:"João Eduardo Martins da Cunha", email:"93955790800@tpmonline.com.br", category:0, docnum:"93955790800", fullName:"João Eduardo Martins da Cunha",birthday: new Date("1955-06-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"joaoedu@gmail.com"});
db.shooters.insertOne({name:"Joao Gustavo Haenel Neto", email:"28739714870@tpmonline.com.br", category:0, docnum:"28739714870", fullName:"Joao Gustavo Haenel Neto",birthday: new Date("1978-11-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jghaenel@yahoo.com"});
db.shooters.insertOne({name:"João Jefferson Marinho Bermal", email:"31981004882@tpmonline.com.br", category:0, docnum:"31981004882", fullName:"João Jefferson Marinho Bermal",birthday: new Date("1983-08-14") ,sex:"M",cr:"48824585",crEndDate: new Date("2031-03-02") ,SH_email:"jjbermal@hotmail.com"});
db.shooters.insertOne({name:"João Leite Neto", email:"26466285871@tpmonline.com.br", category:0, docnum:"26466285871", fullName:"João Leite Neto",birthday: new Date("1978-05-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"João Pedro Santos Teodoro", email:"45556802866@tpmonline.com.br", category:0, docnum:"45556802866", fullName:"João Pedro Santos Teodoro",birthday: new Date("1996-09-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"joaopedro@gmail.com"});
db.shooters.insertOne({name:"Jonas Cardoso Trisotto", email:"04399962950@tpmonline.com.br", category:0, docnum:"04399962950", fullName:"Jonas Cardoso Trisotto",birthday: new Date("1984-01-01") ,sex:"M",cr:"422906",crEndDate: new Date("2030-10-06") ,SH_email:"jonas_cardoso@hotmail.com"});
db.shooters.insertOne({name:"JONATAS GABRIEL BENKENDORF", email:"00693461942@tpmonline.com.br", category:0, docnum:"00693461942", fullName:"JONATAS GABRIEL BENKENDORF",birthday: new Date("1981-01-31") ,sex:"M",cr:"73901814",crEndDate: new Date("2032-04-21") ,SH_email:"jonatasqueijo@outlook.com"});
db.shooters.insertOne({name:"Jorge Luis Suarez Antunez", email:"21422655881@tpmonline.com.br", category:0, docnum:"21422655881", fullName:"Jorge Luis Suarez Antunez",birthday: new Date("1963-11-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jlsantunes@hotmail.com"});
db.shooters.insertOne({name:"José Braz Ribeiro da Silva", email:"70173010806@tpmonline.com.br", category:0, docnum:"70173010806", fullName:"José Braz Ribeiro da Silva",birthday: new Date("1949-06-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ze@joardo.com.br"});
db.shooters.insertOne({name:"Jose Cordeiro Santiago", email:"25007642819@tpmonline.com.br", category:0, docnum:"25007642819", fullName:"Jose Cordeiro Santiago",birthday: new Date("1975-12-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"josecordeirosantiago@hotmail.com"});
db.shooters.insertOne({name:"José Eduardo Ribeiro Matta", email:"03168000825@tpmonline.com.br", category:0, docnum:"03168000825", fullName:"José Eduardo Ribeiro Matta",birthday: new Date("1945-02-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"josematta@gmail.com"});
db.shooters.insertOne({name:"JOSE EVANDRO PEREIRA", email:"11678080888@tpmonline.com.br", category:0, docnum:"11678080888", fullName:"JOSE EVANDRO PEREIRA",birthday: new Date("1973-12-07") ,sex:"M",cr:"17449766",crEndDate: new Date("2031-03-15") ,SH_email:"joseevandropereira@gmail.com"});
db.shooters.insertOne({name:"Jose Jodielson Leite", email:"28720017863@tpmonline.com.br", category:0, docnum:"28720017863", fullName:"Jose Jodielson Leite",birthday: new Date("1979-06-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jodielson@gmail.com"});
db.shooters.insertOne({name:"José Kades Macedo Teixeira", email:"02988571546@tpmonline.com.br", category:0, docnum:"02988571546", fullName:"José Kades Macedo Teixeira",birthday: new Date("1984-09-24") ,sex:"M",cr:"46621806",crEndDate: new Date("2031-01-05") ,SH_email:"kdescocos@hotmail.com"});
db.shooters.insertOne({name:"Jose Leandro Carvalho do Nascimento", email:"29027095876@tpmonline.com.br", category:0, docnum:"29027095876", fullName:"Jose Leandro Carvalho do Nascimento",birthday: new Date("1977-05-25") ,sex:"M",cr:"000.511.822-03",crEndDate: new Date("2031-05-05") ,SH_email:"josecarvalho@gmail.com"});
db.shooters.insertOne({name:"Jose Luiz Aparecido Leopoldino", email:"37079625807@tpmonline.com.br", category:0, docnum:"37079625807", fullName:"Jose Luiz Aparecido Leopoldino",birthday: new Date("1987-07-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"joseluiz.davi1104@gmail.com"});
db.shooters.insertOne({name:"Jose Luiz da Silva", email:"30691129860@tpmonline.com.br", category:0, docnum:"30691129860", fullName:"Jose Luiz da Silva",birthday: new Date("1982-05-04") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luiz_gi@hotmail.com"});
db.shooters.insertOne({name:"Jose Maria da Silva", email:"53854748434@tpmonline.com.br", category:0, docnum:"53854748434", fullName:"Jose Maria da Silva",birthday: new Date("1970-06-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"josezelador@hotmail.com"});
db.shooters.insertOne({name:"JOSE RICARDO FERREIRA DA SILVA", email:"09271288882@tpmonline.com.br", category:0, docnum:"09271288882", fullName:"JOSE RICARDO FERREIRA DA SILVA",birthday: new Date("1969-08-16") ,sex:"M",cr:"49595",crEndDate: new Date("2030-03-23") ,SH_email:"ricardolavarapido@gmail.com"});
db.shooters.insertOne({name:"José Ricardo Lemos Rezek", email:"31538640805@tpmonline.com.br", category:0, docnum:"31538640805", fullName:"José Ricardo Lemos Rezek",birthday: new Date("1988-05-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardo.rezel@gruporezek.com.br"});
db.shooters.insertOne({name:"Jose Roberto Hernandez", email:"76816494849@tpmonline.com.br", category:0, docnum:"76816494849", fullName:"Jose Roberto Hernandez",birthday: new Date("1955-10-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"jrhernandeznegocios@gmail.com"});
db.shooters.insertOne({name:"JOSE SANDOVAL DOS SANTOS", email:"01357910576@tpmonline.com.br", category:0, docnum:"01357910576", fullName:"JOSE SANDOVAL DOS SANTOS",birthday: new Date("1971-01-19") ,sex:"",cr:"178102",crEndDate: new Date("2031-08-15") ,SH_email:"sandovalsan2015@gmail.com"});
db.shooters.insertOne({name:"José Wilker Leite da Silva", email:"41575488841@tpmonline.com.br", category:0, docnum:"41575488841", fullName:"José Wilker Leite da Silva",birthday: new Date("1992-06-17") ,sex:"M",cr:"000.695.828-15",crEndDate: new Date("2032-02-21") ,SH_email:"josewilker@gmail.com"});
db.shooters.insertOne({name:"Josenaldo Pereira de Assis", email:"11944113800@tpmonline.com.br", category:0, docnum:"11944113800", fullName:"Josenaldo Pereira de Assis",birthday: new Date("1968-03-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mariadv@aasp.org.br"});
db.shooters.insertOne({name:"Juan Fellipe Sousa Alves", email:"37168821865@tpmonline.com.br", category:0, docnum:"37168821865", fullName:"Juan Fellipe Sousa Alves",birthday: new Date("1987-08-09") ,sex:"M",cr:"51316854",crEndDate: new Date("2031-05-09") ,SH_email:"juanfellipe87@gmail.com"});
db.shooters.insertOne({name:"JULIAN ROBERT GIOVANAZ", email:"83844465049@tpmonline.com.br", category:0, docnum:"83844465049", fullName:"JULIAN ROBERT GIOVANAZ",birthday: new Date("2001-01-01") ,sex:"",cr:"000.342.457-07",crEndDate: new Date("1980-01-01") ,SH_email:"juliangiovanaz@gmail.com"});
db.shooters.insertOne({name:"JULIANO APARECIDO BATISTA", email:"37901182814@tpmonline.com.br", category:0, docnum:"37901182814", fullName:"JULIANO APARECIDO BATISTA",birthday: new Date("1988-09-19") ,sex:"M",cr:"95596046",crEndDate: new Date("2032-11-21") ,SH_email:"juliano@gmail.com"});
db.shooters.insertOne({name:"Juliano Sarti Domene", email:"21870066898@tpmonline.com.br", category:0, docnum:"21870066898", fullName:"Juliano Sarti Domene",birthday: new Date("1981-02-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"julianosarti@yahoo.com.br"});
db.shooters.insertOne({name:"JULIO SARUHASHI JUNIOR", email:"03056876974@tpmonline.com.br", category:0, docnum:"03056876974", fullName:"JULIO SARUHASHI JUNIOR",birthday: new Date("1982-05-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"juliosaru@hotmail.com"});
db.shooters.insertOne({name:"kAICKY JOSE MIGUEL", email:"35580407831@tpmonline.com.br", category:0, docnum:"35580407831", fullName:"kAICKY JOSE MIGUEL",birthday: new Date("1993-06-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Kalil  José Angoti", email:"31570639876@tpmonline.com.br", category:0, docnum:"31570639876", fullName:"Kalil  José Angoti",birthday: new Date("1982-10-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"kalilangoti1982@hotmail.com"});
db.shooters.insertOne({name:"Kelvin Otaviano Bento", email:"38172714840@tpmonline.com.br", category:0, docnum:"38172714840", fullName:"Kelvin Otaviano Bento",birthday: new Date("1991-04-29") ,sex:"M",cr:"35487321",crEndDate: new Date("2029-12-16") ,SH_email:"kelvin.contato465@gmail.com"});
db.shooters.insertOne({name:"KHALIL GHANTOUS", email:"70073992151@tpmonline.com.br", category:0, docnum:"70073992151", fullName:"KHALIL GHANTOUS",birthday: new Date("1978-04-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"khalilgantous3@gmail.com"});
db.shooters.insertOne({name:"LADISLAU SZAKACS JUNIOR", email:"15108928858@tpmonline.com.br", category:0, docnum:"15108928858", fullName:"LADISLAU SZAKACS JUNIOR",birthday: new Date("1971-09-11") ,sex:"M",cr:"000.105.059-11",crEndDate: new Date("2031-06-01") ,SH_email:"junior.midas@gmail.com"});
db.shooters.insertOne({name:"LAERCIO DA SILVA LEITE", email:"21456560816@tpmonline.com.br", category:0, docnum:"21456560816", fullName:"LAERCIO DA SILVA LEITE",birthday: new Date("1981-10-14") ,sex:"M",cr:"62084",crEndDate: new Date("2030-09-30") ,SH_email:"laercio.leite@globo.com"});
db.shooters.insertOne({name:"Leandro Alves da Silva", email:"22762044863@tpmonline.com.br", category:0, docnum:"22762044863", fullName:"Leandro Alves da Silva",birthday: new Date("1984-03-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leandroalves@gmail.com"});
db.shooters.insertOne({name:"LEANDRO AUGUSTO CAMPOLONGO", email:"21924330857@tpmonline.com.br", category:0, docnum:"21924330857", fullName:"LEANDRO AUGUSTO CAMPOLONGO",birthday: new Date("1980-07-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leandro@gmail.com"});
db.shooters.insertOne({name:"LEANDRO CICERO DE OLIVEIRA", email:"28720488807@tpmonline.com.br", category:0, docnum:"28720488807", fullName:"LEANDRO CICERO DE OLIVEIRA",birthday: new Date("1981-11-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cacaca@gmail"});
db.shooters.insertOne({name:"Leandro de Moraes Ferreira", email:"29956934810@tpmonline.com.br", category:0, docnum:"29956934810", fullName:"Leandro de Moraes Ferreira",birthday: new Date("1982-12-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"namoocapizzaria@gmail.com"});
db.shooters.insertOne({name:"Leandro Fori Elias", email:"15358169881@tpmonline.com.br", category:0, docnum:"15358169881", fullName:"Leandro Fori Elias",birthday: new Date("1976-05-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"contato@fori.com.br"});
db.shooters.insertOne({name:"Leandro Graciano", email:"28463657842@tpmonline.com.br", category:0, docnum:"28463657842", fullName:"Leandro Graciano",birthday: new Date("1980-03-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leandrogra@hotmail.com"});
db.shooters.insertOne({name:"LEANDRO HENRIQUE STURION PATREZE", email:"11940904609@tpmonline.com.br", category:0, docnum:"11940904609", fullName:"LEANDRO HENRIQUE STURION PATREZE",birthday: new Date("1995-04-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leandropatreze@hotmail.com"});
db.shooters.insertOne({name:"Leandro Jose Borelli", email:"11795927860@tpmonline.com.br", category:0, docnum:"11795927860", fullName:"Leandro Jose Borelli",birthday: new Date("1971-09-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leandro@colombex.com.br"});
db.shooters.insertOne({name:"LEANDRO KRIST BOGOS", email:"24915010821@tpmonline.com.br", category:0, docnum:"24915010821", fullName:"LEANDRO KRIST BOGOS",birthday: new Date("1978-10-12") ,sex:"M",cr:"000.048.055-00",crEndDate: new Date("2030-04-01") ,SH_email:"diretoria@ondaforte.com.br"});
db.shooters.insertOne({name:"Leandro Sales", email:"22449028897@tpmonline.com.br", category:0, docnum:"22449028897", fullName:"Leandro Sales",birthday: new Date("1982-01-10") ,sex:"M",cr:"81780540",crEndDate: new Date("2032-07-09") ,SH_email:"leandrosan10@yahoo.com.br"});
db.shooters.insertOne({name:"Leda Alves dos Santos Lopes", email:"00024930717@tpmonline.com.br", category:2, docnum:"00024930717", fullName:"Leda Alves dos Santos Lopes",birthday: new Date("1966-11-21") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Leonardo Graciano", email:"29774970802@tpmonline.com.br", category:0, docnum:"29774970802", fullName:"Leonardo Graciano",birthday: new Date("1983-06-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cannes@cannesmobiliario.com"});
db.shooters.insertOne({name:"Leticia Beloto Turim Barbosa", email:"39217542830@tpmonline.com.br", category:2, docnum:"39217542830", fullName:"Leticia Beloto Turim Barbosa",birthday: new Date("1991-10-12") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"leticiaturim@gmail.com"});
db.shooters.insertOne({name:"Li Jing", email:"22881016871@tpmonline.com.br", category:0, docnum:"22881016871", fullName:"Li Jing",birthday: new Date("1956-05-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ljing1960@gmail.com"});
db.shooters.insertOne({name:"Li Ming", email:"00459353942@tpmonline.com.br", category:0, docnum:"00459353942", fullName:"Li Ming",birthday: new Date("1963-07-24") ,sex:"M",cr:"3063631",crEndDate: new Date("2032-07-20") ,SH_email:"liming628@hotmail.com"});
db.shooters.insertOne({name:"Lienilson de Oliveira Queiroz", email:"26098634890@tpmonline.com.br", category:0, docnum:"26098634890", fullName:"Lienilson de Oliveira Queiroz",birthday: new Date("1974-05-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Lin Benda", email:"23100074807@tpmonline.com.br", category:0, docnum:"23100074807", fullName:"Lin Benda",birthday: new Date("1972-11-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"linhesheng97@gmail.com"});
db.shooters.insertOne({name:"Lin Zhanfeng", email:"23352289867@tpmonline.com.br", category:0, docnum:"23352289867", fullName:"Lin Zhanfeng",birthday: new Date("1989-10-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"feng00520@hotmail.com"});
db.shooters.insertOne({name:"Lingbin Xia", email:"23702880860@tpmonline.com.br", category:0, docnum:"23702880860", fullName:"Lingbin Xia",birthday: new Date("1979-10-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"lingbiaxia@gamil.com"});
db.shooters.insertOne({name:"Linqiang Zheng", email:"23812507862@tpmonline.com.br", category:0, docnum:"23812507862", fullName:"Linqiang Zheng",birthday: new Date("1987-05-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"oscar.beautyhair@gmail.com"});
db.shooters.insertOne({name:"Liping Wang", email:"23839793840@tpmonline.com.br", category:0, docnum:"23839793840", fullName:"Liping Wang",birthday: new Date("1982-11-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"qtweq88688@gmail.com"});
db.shooters.insertOne({name:"Liu Zhen Kui", email:"21640098860@tpmonline.com.br", category:0, docnum:"21640098860", fullName:"Liu Zhen Kui",birthday: new Date("1966-12-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"lzk5887882@163.com"});
db.shooters.insertOne({name:"LUCAS DA SILVA DOREA", email:"38089897851@tpmonline.com.br", category:0, docnum:"38089897851", fullName:"LUCAS DA SILVA DOREA",birthday: new Date("1995-05-04") ,sex:"M",cr:"52901475",crEndDate: new Date("2031-06-15") ,SH_email:"lucas95_lhp@hotmail.com"});
db.shooters.insertOne({name:"LUCAS SANGALI AUGUSTO", email:"31115109804@tpmonline.com.br", category:0, docnum:"31115109804", fullName:"LUCAS SANGALI AUGUSTO",birthday: new Date("1983-04-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"lucas.sangali@terra.com.br"});
db.shooters.insertOne({name:"Luciano Lima Santos", email:"32888656884@tpmonline.com.br", category:0, docnum:"32888656884", fullName:"Luciano Lima Santos",birthday: new Date("1981-12-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"atendimento@belicoblindagem.com.br"});
db.shooters.insertOne({name:"Luciano Teixeira Cerny", email:"14238038843@tpmonline.com.br", category:0, docnum:"14238038843", fullName:"Luciano Teixeira Cerny",birthday: new Date("1968-05-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"lucianocerny@gmail.com"});
db.shooters.insertOne({name:"Luis Carlos Lima", email:"13575345821@tpmonline.com.br", category:0, docnum:"13575345821", fullName:"Luis Carlos Lima",birthday: new Date("1972-06-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carloslima1972@uol.com.br"});
db.shooters.insertOne({name:"Luis Carlos Pedreira Marques", email:"11581406819@tpmonline.com.br", category:0, docnum:"11581406819", fullName:"Luis Carlos Pedreira Marques",birthday: new Date("1969-01-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luiscarlospmarques@hotmail.com"});
db.shooters.insertOne({name:"LUIS FERNANDO NOGUEIRA", email:"02446054404@tpmonline.com.br", category:0, docnum:"02446054404", fullName:"LUIS FERNANDO NOGUEIRA",birthday: new Date("1999-01-01") ,sex:"M",cr:"99710927",crEndDate: new Date("2032-12-30") ,SH_email:"fernandoluis@gmail.com"});
db.shooters.insertOne({name:"Luis Oscar Rotenberg", email:"25816881817@tpmonline.com.br", category:0, docnum:"25816881817", fullName:"Luis Oscar Rotenberg",birthday: new Date("1976-12-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luisrot@gmail.com"});
db.shooters.insertOne({name:"Luiz Alberto Martinho Cais Malieri", email:"16616796841@tpmonline.com.br", category:0, docnum:"16616796841", fullName:"Luiz Alberto Martinho Cais Malieri",birthday: new Date("1971-01-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luizalberto@gmail.com"});
db.shooters.insertOne({name:"LUIZ ANTONIO JOERS PINTO", email:"05024582837@tpmonline.com.br", category:0, docnum:"05024582837", fullName:"LUIZ ANTONIO JOERS PINTO",birthday: new Date("1967-08-26") ,sex:"M",cr:"66614082",crEndDate: new Date("2031-12-31") ,SH_email:"luiz@gmail.com"});
db.shooters.insertOne({name:"Luiz António Silva Cerqueira", email:"00692015604@tpmonline.com.br", category:0, docnum:"00692015604", fullName:"Luiz António Silva Cerqueira",birthday: new Date("1973-02-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"bmlasc@gmail.com"});
db.shooters.insertOne({name:"Luiz Felipe Dedone", email:"31315318865@tpmonline.com.br", category:0, docnum:"31315318865", fullName:"Luiz Felipe Dedone",birthday: new Date("1984-02-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"luizfelipe@gmail.com"});
db.shooters.insertOne({name:"Luiz Fernando Secali", email:"25437048840@tpmonline.com.br", category:0, docnum:"25437048840", fullName:"Luiz Fernando Secali",birthday: new Date("1999-11-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Luiz Fernando Taddeo", email:"30020691831@tpmonline.com.br", category:0, docnum:"30020691831", fullName:"Luiz Fernando Taddeo",birthday: new Date("1981-06-25") ,sex:"M",cr:"000.627.720-90",crEndDate: new Date("2031-11-05") ,SH_email:"lftaddeo@gmail.com"});
db.shooters.insertOne({name:"LUO SHUJUN", email:"23058817894@tpmonline.com.br", category:2, docnum:"23058817894", fullName:"LUO SHUJUN",birthday: new Date("1973-02-10") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"karenluo2002@gmail.com"});
db.shooters.insertOne({name:"MACELO LIMA ALMEIDA", email:"03986968377@tpmonline.com.br", category:0, docnum:"03986968377", fullName:"MACELO LIMA ALMEIDA",birthday: new Date("1988-10-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rhfassessoriadocumental@gmail.com"});
db.shooters.insertOne({name:"Maciel Sinezio de Paiva", email:"01177075466@tpmonline.com.br", category:0, docnum:"01177075466", fullName:"Maciel Sinezio de Paiva",birthday: new Date("1982-10-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sinezio@gmail.com"});
db.shooters.insertOne({name:"Magno Cury Haddad", email:"34573302808@tpmonline.com.br", category:0, docnum:"34573302808", fullName:"Magno Cury Haddad",birthday: new Date("1985-10-04") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"MAICO RAFAEL RAUBER", email:"29967847824@tpmonline.com.br", category:0, docnum:"29967847824", fullName:"MAICO RAFAEL RAUBER",birthday: new Date("1982-12-29") ,sex:"M",cr:"64134121",crEndDate: new Date("2031-11-24") ,SH_email:"maico.rafael@yahoo.com.br"});
db.shooters.insertOne({name:"Manoel Ferreira da Silva", email:"65574494515@tpmonline.com.br", category:0, docnum:"65574494515", fullName:"Manoel Ferreira da Silva",birthday: new Date("1971-09-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"MANUEL DAVID DE ABREU SOUSA", email:"21726690830@tpmonline.com.br", category:0, docnum:"21726690830", fullName:"MANUEL DAVID DE ABREU SOUSA",birthday: new Date("1964-02-24") ,sex:"M",cr:"8445192",crEndDate: new Date("2032-05-13") ,SH_email:"fazemp@gmail.com"});
db.shooters.insertOne({name:"Marcelo Alves Barreto", email:"28940787811@tpmonline.com.br", category:0, docnum:"28940787811", fullName:"Marcelo Alves Barreto",birthday: new Date("1981-04-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"malvesbarreto@yahoo.com.br"});
db.shooters.insertOne({name:"Marcelo Bazza", email:"21989808867@tpmonline.com.br", category:0, docnum:"21989808867", fullName:"Marcelo Bazza",birthday: new Date("1982-07-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelo@speedlaser.com.br"});
db.shooters.insertOne({name:"Marcelo Chillotti", email:"26207202813@tpmonline.com.br", category:0, docnum:"26207202813", fullName:"Marcelo Chillotti",birthday: new Date("1975-05-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelochillotti@gmail.com"});
db.shooters.insertOne({name:"Marcelo dos Santos", email:"13484412836@tpmonline.com.br", category:0, docnum:"13484412836", fullName:"Marcelo dos Santos",birthday: new Date("1967-10-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelodossantos2910@gmail.com"});
db.shooters.insertOne({name:"Marcelo Felinto de Lima", email:"29849221828@tpmonline.com.br", category:0, docnum:"29849221828", fullName:"Marcelo Felinto de Lima",birthday: new Date("1982-10-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelofelinto@gmail.com"});
db.shooters.insertOne({name:"Marcelo Fortes Della Rovere", email:"33918512878@tpmonline.com.br", category:0, docnum:"33918512878", fullName:"Marcelo Fortes Della Rovere",birthday: new Date("1985-05-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelo@mrovere.com.br"});
db.shooters.insertOne({name:"Marcelo Gourlart Pettinati", email:"32780491876@tpmonline.com.br", category:0, docnum:"32780491876", fullName:"Marcelo Gourlart Pettinati",birthday: new Date("1984-03-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelogourlart@gmail.com"});
db.shooters.insertOne({name:"Marcelo Guimarães Fernandes", email:"96519622753@tpmonline.com.br", category:0, docnum:"96519622753", fullName:"Marcelo Guimarães Fernandes",birthday: new Date("1967-11-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"eng.mgf@pcairworthiness.com"});
db.shooters.insertOne({name:"Marcelo Lima Bevilacqua", email:"17372168848@tpmonline.com.br", category:0, docnum:"17372168848", fullName:"Marcelo Lima Bevilacqua",birthday: new Date("1972-10-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcelo.lima@hotmail.com"});
db.shooters.insertOne({name:"Marcelo Rozendo da Silva", email:"18749727885@tpmonline.com.br", category:0, docnum:"18749727885", fullName:"Marcelo Rozendo da Silva",birthday: new Date("1974-01-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rhfassessoriadocumental@gmail.com.br"});
db.shooters.insertOne({name:"Marcilio Nascimento Soares", email:"77763106620@tpmonline.com.br", category:0, docnum:"77763106620", fullName:"Marcilio Nascimento Soares",birthday: new Date("1971-07-22") ,sex:"M",cr:"635636-22",crEndDate: new Date("2032-07-08") ,SH_email:"miau9mm@gmail.com"});
db.shooters.insertOne({name:"Marcio Antonio dos Santos", email:"11697256864@tpmonline.com.br", category:0, docnum:"11697256864", fullName:"Marcio Antonio dos Santos",birthday: new Date("1968-11-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Marcio Augusto Arrepia Sampaio", email:"17445279890@tpmonline.com.br", category:0, docnum:"17445279890", fullName:"Marcio Augusto Arrepia Sampaio",birthday: new Date("1974-03-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ma.arrepia@hotmail.com"});
db.shooters.insertOne({name:"Marcio Cabral dos Santos", email:"14733322810@tpmonline.com.br", category:0, docnum:"14733322810", fullName:"Marcio Cabral dos Santos",birthday: new Date("1974-02-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcio.4500@gmail.com"});
db.shooters.insertOne({name:"Marcio Calixto", email:"13180934816@tpmonline.com.br", category:0, docnum:"13180934816", fullName:"Marcio Calixto",birthday: new Date("1971-09-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sequencialegaladv@gmail.com"});
db.shooters.insertOne({name:"Marcio dos Reis Oliveira", email:"14376056804@tpmonline.com.br", category:0, docnum:"14376056804", fullName:"Marcio dos Reis Oliveira",birthday: new Date("1971-05-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcioreisoliveira@hotmail.com"});
db.shooters.insertOne({name:"MARCIO LOPES DE MELLO", email:"01893070050@tpmonline.com.br", category:0, docnum:"01893070050", fullName:"MARCIO LOPES DE MELLO",birthday: new Date("2001-01-01") ,sex:"",cr:"00.703.761-90",crEndDate: new Date("2026-06-16") ,SH_email:"marcio.lopesdemello@hotmail.com"});
db.shooters.insertOne({name:"Marcio Lopes Sanches", email:"26330744807@tpmonline.com.br", category:0, docnum:"26330744807", fullName:"Marcio Lopes Sanches",birthday: new Date("1975-06-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcinho.sanches@hotmail.com"});
db.shooters.insertOne({name:"Marcio Pereira de Souza", email:"26495852851@tpmonline.com.br", category:0, docnum:"26495852851", fullName:"Marcio Pereira de Souza",birthday: new Date("1977-04-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcio.souza1979@uol.com.br"});
db.shooters.insertOne({name:"Marcio Rodrigo de Faria", email:"29318244886@tpmonline.com.br", category:0, docnum:"29318244886", fullName:"Marcio Rodrigo de Faria",birthday: new Date("1981-01-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"boymarcio25@gmail.com"});
db.shooters.insertOne({name:"Marco Antonio de Souza Armando", email:"30706967836@tpmonline.com.br", category:0, docnum:"30706967836", fullName:"Marco Antonio de Souza Armando",birthday: new Date("1978-10-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marco@construtorabelisco.com.br"});
db.shooters.insertOne({name:"Marco Aurelio Gomes Junior", email:"43607070881@tpmonline.com.br", category:0, docnum:"43607070881", fullName:"Marco Aurelio Gomes Junior",birthday: new Date("1994-09-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mgomes9@live.com"});
db.shooters.insertOne({name:"MARCOS AMBROSINO DE MATOS", email:"04308863813@tpmonline.com.br", category:0, docnum:"04308863813", fullName:"MARCOS AMBROSINO DE MATOS",birthday: new Date("1960-09-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marquinhostallone@yahoo.com.br"});
db.shooters.insertOne({name:"Marcos Cohen Schwartz", email:"21376469863@tpmonline.com.br", category:0, docnum:"21376469863", fullName:"Marcos Cohen Schwartz",birthday: new Date("1983-08-04") ,sex:"M",cr:"000.817.952-20",crEndDate: new Date("2032-07-09") ,SH_email:"drmarcosschwartz@gmail.com"});
db.shooters.insertOne({name:"Marcos Corsi", email:"09405663895@tpmonline.com.br", category:0, docnum:"09405663895", fullName:"Marcos Corsi",birthday: new Date("1968-04-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"corsimarcos1@gmail.com"});
db.shooters.insertOne({name:"Marcos da Silva Rocha", email:"18756775857@tpmonline.com.br", category:0, docnum:"18756775857", fullName:"Marcos da Silva Rocha",birthday: new Date("1976-04-19") ,sex:"M",cr:"000.406.454-28",crEndDate: new Date("2030-08-20") ,SH_email:"marcos.silva@hotmail.com"});
db.shooters.insertOne({name:"MARCOS MIGUEL GABRIEL", email:"02209517800@tpmonline.com.br", category:0, docnum:"02209517800", fullName:"MARCOS MIGUEL GABRIEL",birthday: new Date("1999-11-30") ,sex:"M",cr:"120618",crEndDate: new Date("2029-05-26") ,SH_email:"marcos@gmail.com"});
db.shooters.insertOne({name:"Marcos Paulo Janaudis", email:"28134616879@tpmonline.com.br", category:0, docnum:"28134616879", fullName:"Marcos Paulo Janaudis",birthday: new Date("1980-06-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mpjan@hotmail.com"});
db.shooters.insertOne({name:"Marcos Pereira de Oliveira", email:"89985672100@tpmonline.com.br", category:0, docnum:"89985672100", fullName:"Marcos Pereira de Oliveira",birthday: new Date("1980-01-16") ,sex:"M",cr:"363476",crEndDate: new Date("2030-02-04") ,SH_email:"marquinhos_enf@hotmail.com"});
db.shooters.insertOne({name:"Marcus Vinicius Guidetti", email:"33066072827@tpmonline.com.br", category:0, docnum:"33066072827", fullName:"Marcus Vinicius Guidetti",birthday: new Date("1985-11-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marcusgui@gmail.com"});
db.shooters.insertOne({name:"Maria Carolina Perez de Lima Rodrigues", email:"29674601848@tpmonline.com.br", category:2, docnum:"29674601848", fullName:"Maria Carolina Perez de Lima Rodrigues",birthday: new Date("1978-12-05") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"carol@cosmeticosnic.com.br"});
db.shooters.insertOne({name:"MARIO APARECIDO SCACCABAROZZI", email:"41311728872@tpmonline.com.br", category:0, docnum:"41311728872", fullName:"MARIO APARECIDO SCACCABAROZZI",birthday: new Date("1999-11-30") ,sex:"M",cr:"16052",crEndDate: new Date("2029-09-28") ,SH_email:"marioap@gmail.com"});
db.shooters.insertOne({name:"mario knichalla neto", email:"01484913671@tpmonline.com.br", category:0, docnum:"01484913671", fullName:"mario knichalla neto",birthday: new Date("1983-03-07") ,sex:"M",cr:"147400",crEndDate: new Date("2030-07-22") ,SH_email:"mknichalla@hotmail.com"});
db.shooters.insertOne({name:"Mario Slerca Neto", email:"79752144772@tpmonline.com.br", category:0, docnum:"79752144772", fullName:"Mario Slerca Neto",birthday: new Date("1964-07-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mslerca@outlook.com"});
db.shooters.insertOne({name:"Marly Tomaz Dias", email:"50842862315@tpmonline.com.br", category:2, docnum:"50842862315", fullName:"Marly Tomaz Dias",birthday: new Date("1974-09-03") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"marly.roberto@gmail.com"});
db.shooters.insertOne({name:"MASSIMO RODORIGO", email:"90597257868@tpmonline.com.br", category:0, docnum:"90597257868", fullName:"MASSIMO RODORIGO",birthday: new Date("2001-01-01") ,sex:"",cr:"102354774",crEndDate: new Date("2027-05-28") ,SH_email:"massimo@gmail.com"});
db.shooters.insertOne({name:"Matheus Del Corso Rodrigues", email:"36495893892@tpmonline.com.br", category:0, docnum:"36495893892", fullName:"Matheus Del Corso Rodrigues",birthday: new Date("1986-12-27") ,sex:"M",cr:"321383",crEndDate: new Date("2029-08-22") ,SH_email:"matheus_rodrigues18@hotmail.com"});
db.shooters.insertOne({name:"Matheus Galan Manzo", email:"44157581857@tpmonline.com.br", category:0, docnum:"44157581857", fullName:"Matheus Galan Manzo",birthday: new Date("1997-04-04") ,sex:"M",cr:"99589087",crEndDate: new Date("2032-12-30") ,SH_email:"manzomatheus@gmail.com"});
db.shooters.insertOne({name:"Mauricio Cavalieri", email:"65450051891@tpmonline.com.br", category:0, docnum:"65450051891", fullName:"Mauricio Cavalieri",birthday: new Date("1954-05-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"macavali@gmail.com"});
db.shooters.insertOne({name:"Mauricio Costa da Silva Santos", email:"28541282813@tpmonline.com.br", category:0, docnum:"28541282813", fullName:"Mauricio Costa da Silva Santos",birthday: new Date("1979-05-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mauriciocosta@gmail.com"});
db.shooters.insertOne({name:"Mauricio Issa Martins", email:"26622507805@tpmonline.com.br", category:0, docnum:"26622507805", fullName:"Mauricio Issa Martins",birthday: new Date("1979-06-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Mauricio Pires Moreno", email:"25480938835@tpmonline.com.br", category:0, docnum:"25480938835", fullName:"Mauricio Pires Moreno",birthday: new Date("1976-01-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mauriciopiresmoreno@gmail.com"});
db.shooters.insertOne({name:"Mauro Renato Inouye", email:"15147189874@tpmonline.com.br", category:0, docnum:"15147189874", fullName:"Mauro Renato Inouye",birthday: new Date("1973-06-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mauroynouye@gmail.com"});
db.shooters.insertOne({name:"Mauro Sergio Ortiz de Castro", email:"15739265827@tpmonline.com.br", category:0, docnum:"15739265827", fullName:"Mauro Sergio Ortiz de Castro",birthday: new Date("1971-10-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"mauro@guard.com.br"});
db.shooters.insertOne({name:"Melanias José Pinheiro Filho", email:"16892540848@tpmonline.com.br", category:0, docnum:"16892540848", fullName:"Melanias José Pinheiro Filho",birthday: new Date("1973-06-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"melianiasjose@gmail.com"});
db.shooters.insertOne({name:"Michael Franklin Gabriel Leite", email:"33067208870@tpmonline.com.br", category:0, docnum:"33067208870", fullName:"Michael Franklin Gabriel Leite",birthday: new Date("1984-05-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nichaelfgl@hotmail.com"});
db.shooters.insertOne({name:"Michelle Priscila Musachi", email:"29372243850@tpmonline.com.br", category:0, docnum:"29372243850", fullName:"Michelle Priscila Musachi",birthday: new Date("1982-08-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fenixarquivo2020@gmail.com"});
db.shooters.insertOne({name:"Nelson Manoel de Miranda", email:"88254712891@tpmonline.com.br", category:0, docnum:"88254712891", fullName:"Nelson Manoel de Miranda",birthday: new Date("1952-09-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nelsonbutre2@gmail.com"});
db.shooters.insertOne({name:"Nelson Wilians Fratoni Rodrigues", email:"66801800906@tpmonline.com.br", category:0, docnum:"66801800906", fullName:"Nelson Wilians Fratoni Rodrigues",birthday: new Date("1971-03-14") ,sex:"M",cr:"38315",crEndDate: new Date("2030-09-30") ,SH_email:""});
db.shooters.insertOne({name:"NICOLA ABDUCH NETO", email:"07302832838@tpmonline.com.br", category:0, docnum:"07302832838", fullName:"NICOLA ABDUCH NETO",birthday: new Date("1969-10-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nicolaneto@gmail.com"});
db.shooters.insertOne({name:"Odamiron Mascarenhas Oliveira", email:"64035549568@tpmonline.com.br", category:0, docnum:"64035549568", fullName:"Odamiron Mascarenhas Oliveira",birthday: new Date("1975-02-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"odamiron@hotmail.com"});
db.shooters.insertOne({name:"Olimpio Jose Ferreira Rodrigues", email:"89769104604@tpmonline.com.br", category:0, docnum:"89769104604", fullName:"Olimpio Jose Ferreira Rodrigues",birthday: new Date("1974-07-26") ,sex:"M",cr:"12932906",crEndDate: new Date("2029-09-29") ,SH_email:"olimpio07@gmail.com"});
db.shooters.insertOne({name:"Omar Said Saifi", email:"12503984878@tpmonline.com.br", category:0, docnum:"12503984878", fullName:"Omar Said Saifi",birthday: new Date("1970-05-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"omarsaifi@hotmail.com"});
db.shooters.insertOne({name:"Orlando Ribeiro Ferraz", email:"80795420820@tpmonline.com.br", category:0, docnum:"80795420820", fullName:"Orlando Ribeiro Ferraz",birthday: new Date("1955-08-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"orlandoferraz@gmail.com"});
db.shooters.insertOne({name:"OSEIAS CANDIDO DE JESUS", email:"04427004903@tpmonline.com.br", category:0, docnum:"04427004903", fullName:"OSEIAS CANDIDO DE JESUS",birthday: new Date("1982-03-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"oseyascandido.jesus@gmail.com"});
db.shooters.insertOne({name:"OSNIR DE PAULA", email:"95091483853@tpmonline.com.br", category:0, docnum:"95091483853", fullName:"OSNIR DE PAULA",birthday: new Date("1957-10-25") ,sex:"M",cr:"6788130",crEndDate: new Date("2032-02-15") ,SH_email:"osnirdepaula25@gmail.com"});
db.shooters.insertOne({name:"OSVALDO PRUDENTE BINTTENCOURT", email:"48950084953@tpmonline.com.br", category:0, docnum:"48950084953", fullName:"OSVALDO PRUDENTE BINTTENCOURT",birthday: new Date("1962-06-19") ,sex:"M",cr:"66731984",crEndDate: new Date("2032-01-05") ,SH_email:"55bittencourt@gmail.com"});
db.shooters.insertOne({name:"Otavio Vinicius Seabra do Rosário", email:"17580738880@tpmonline.com.br", category:0, docnum:"17580738880", fullName:"Otavio Vinicius Seabra do Rosário",birthday: new Date("1976-05-06") ,sex:"M",cr:"000.627.298-37",crEndDate: new Date("2031-11-04") ,SH_email:""});
db.shooters.insertOne({name:"Pablo Nascimento Folha", email:"32629353877@tpmonline.com.br", category:0, docnum:"32629353877", fullName:"Pablo Nascimento Folha",birthday: new Date("1984-10-31") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nascimento_199@hotmail.com"});
db.shooters.insertOne({name:"Paulo  Mangabeira Albernaz Neto", email:"01039213898@tpmonline.com.br", category:0, docnum:"01039213898", fullName:"Paulo  Mangabeira Albernaz Neto",birthday: new Date("1956-08-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"pauloalbernaz@gmail.com"});
db.shooters.insertOne({name:"Paulo de Tarso Andrade Bastos", email:"86026607820@tpmonline.com.br", category:0, docnum:"86026607820", fullName:"Paulo de Tarso Andrade Bastos",birthday: new Date("1953-12-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sgtfortunato12@gmail.com"});
db.shooters.insertOne({name:"Paulo Donizete Gomes", email:"01422281841@tpmonline.com.br", category:0, docnum:"01422281841", fullName:"Paulo Donizete Gomes",birthday: new Date("1963-03-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulodonizetegomes@bol.com.br"});
db.shooters.insertOne({name:"Paulo Egídio Pinheiro Torres", email:"78095522104@tpmonline.com.br", category:0, docnum:"78095522104", fullName:"Paulo Egídio Pinheiro Torres",birthday: new Date("1977-09-24") ,sex:"M",cr:"1002114-02",crEndDate: new Date("2026-02-05") ,SH_email:"paulo.jatofer@hotmail.com"});
db.shooters.insertOne({name:"Paulo Engel Vieira", email:"01376304848@tpmonline.com.br", category:0, docnum:"01376304848", fullName:"Paulo Engel Vieira",birthday: new Date("1960-06-09") ,sex:"M",cr:"000.69582815",crEndDate: new Date("2032-02-21") ,SH_email:"paulo.vieira@vdv.com.br"});
db.shooters.insertOne({name:"Paulo Henrique Mendes de Almeida", email:"38307964806@tpmonline.com.br", category:0, docnum:"38307964806", fullName:"Paulo Henrique Mendes de Almeida",birthday: new Date("1988-10-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulo.he.me.al@gmail.com"});
db.shooters.insertOne({name:"PAULO MACEDO BUCARESKY", email:"62769219715@tpmonline.com.br", category:0, docnum:"62769219715", fullName:"PAULO MACEDO BUCARESKY",birthday: new Date("2000-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulo@gmail.com"});
db.shooters.insertOne({name:"Paulo Pergentino da Silva", email:"04002674460@tpmonline.com.br", category:0, docnum:"04002674460", fullName:"Paulo Pergentino da Silva",birthday: new Date("1980-10-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulosilva@gmail.com"});
db.shooters.insertOne({name:"PAULO ROBERTO MUNIZ DO NASCIMENTO", email:"32711003817@tpmonline.com.br", category:0, docnum:"32711003817", fullName:"PAULO ROBERTO MUNIZ DO NASCIMENTO",birthday: new Date("1984-12-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulo.muniz@hotmail.com"});
db.shooters.insertOne({name:"Paulo Sergio Assumpção Carneiro", email:"12909917827@tpmonline.com.br", category:0, docnum:"12909917827", fullName:"Paulo Sergio Assumpção Carneiro",birthday: new Date("1970-08-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulo@pg4pro.com"});
db.shooters.insertOne({name:"Paulo Watanabe", email:"87675625820@tpmonline.com.br", category:0, docnum:"87675625820", fullName:"Paulo Watanabe",birthday: new Date("1958-04-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"paulo.watanabe@maxima.com.net"});
db.shooters.insertOne({name:"PEDRO AUGUSTO ALMEIDA FREDERICO", email:"47401814870@tpmonline.com.br", category:0, docnum:"47401814870", fullName:"PEDRO AUGUSTO ALMEIDA FREDERICO",birthday: new Date("1997-02-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"pedro@pazlast.com.br"});
db.shooters.insertOne({name:"PEDRO GONCALLES RAIZA", email:"46922174801@tpmonline.com.br", category:0, docnum:"46922174801", fullName:"PEDRO GONCALLES RAIZA",birthday: new Date("1996-06-21") ,sex:"M",cr:"000.553.628-59",crEndDate: new Date("2031-07-18") ,SH_email:"pedro-raiza@uol.com.br"});
db.shooters.insertOne({name:"Pedro Henrique Martins Cassia", email:"32689022869@tpmonline.com.br", category:0, docnum:"32689022869", fullName:"Pedro Henrique Martins Cassia",birthday: new Date("1985-11-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"pedro_cassia@hotmail.com"});
db.shooters.insertOne({name:"Pedro Jose Trindade", email:"03312379890@tpmonline.com.br", category:0, docnum:"03312379890", fullName:"Pedro Jose Trindade",birthday: new Date("1960-04-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"pjtrindadeadvoc@hotmail.com"});
db.shooters.insertOne({name:"Ping Yang", email:"23663801861@tpmonline.com.br", category:0, docnum:"23663801861", fullName:"Ping Yang",birthday: new Date("1984-06-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"yangping1188@sina.com"});
db.shooters.insertOne({name:"Priscilla Aline Nees Povoas", email:"92247636187@tpmonline.com.br", category:2, docnum:"92247636187", fullName:"Priscilla Aline Nees Povoas",birthday: new Date("1979-07-27") ,sex:"F",cr:"47497904",crEndDate: new Date("2031-01-27") ,SH_email:"priscilla@neespovoas.adv.br"});
db.shooters.insertOne({name:"Priscilla Martins Tozatti Sevilha", email:"29857868860@tpmonline.com.br", category:2, docnum:"29857868860", fullName:"Priscilla Martins Tozatti Sevilha",birthday: new Date("1982-10-18") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Rafael Araujo de Oliveira Antoniaci", email:"35947010852@tpmonline.com.br", category:0, docnum:"35947010852", fullName:"Rafael Araujo de Oliveira Antoniaci",birthday: new Date("1990-09-03") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rafara0311@hotmail.com"});
db.shooters.insertOne({name:"Rafael Araujo Marques", email:"33429390877@tpmonline.com.br", category:0, docnum:"33429390877", fullName:"Rafael Araujo Marques",birthday: new Date("1997-09-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rafaam19@hotmail.com"});
db.shooters.insertOne({name:"Rafael de Carvalho Pinto", email:"31698982801@tpmonline.com.br", category:0, docnum:"31698982801", fullName:"Rafael de Carvalho Pinto",birthday: new Date("1985-10-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rafac@hotmail.com"});
db.shooters.insertOne({name:"Rafael Garcia de Queiroz", email:"32672173850@tpmonline.com.br", category:0, docnum:"32672173850", fullName:"Rafael Garcia de Queiroz",birthday: new Date("1984-04-05") ,sex:"M",cr:"000.445.638-68",crEndDate: new Date("2030-11-18") ,SH_email:"rafael@mggconstrutora.com.br"});
db.shooters.insertOne({name:"RAFAEL MELLO DOS SANTOS", email:"31915666864@tpmonline.com.br", category:0, docnum:"31915666864", fullName:"RAFAEL MELLO DOS SANTOS",birthday: new Date("1985-01-29") ,sex:"M",cr:"466386-10",crEndDate: new Date("2031-01-06") ,SH_email:"rafa35744@hotmail.com"});
db.shooters.insertOne({name:"Rafael Tian", email:"34696363899@tpmonline.com.br", category:0, docnum:"34696363899", fullName:"Rafael Tian",birthday: new Date("1992-02-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tian593@hotmail.com"});
db.shooters.insertOne({name:"Rafael Vieira Martins", email:"31504938895@tpmonline.com.br", category:0, docnum:"31504938895", fullName:"Rafael Vieira Martins",birthday: new Date("1984-11-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rafael_leane@hotmail.com"});
db.shooters.insertOne({name:"RAFAELA REY PRADO FERNANDES", email:"16637908843@tpmonline.com.br", category:2, docnum:"16637908843", fullName:"RAFAELA REY PRADO FERNANDES",birthday: new Date("1974-10-03") ,sex:"F",cr:"86137107",crEndDate: new Date("2032-08-29") ,SH_email:"rafa00mena@gmail.com"});
db.shooters.insertOne({name:"Raimundo Nonato Tomaz de Aquino", email:"16499677809@tpmonline.com.br", category:0, docnum:"16499677809", fullName:"Raimundo Nonato Tomaz de Aquino",birthday: new Date("1976-10-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"raimundononato@gmail.com"});
db.shooters.insertOne({name:"Ramon Lanciano Zanardi", email:"31258351862@tpmonline.com.br", category:0, docnum:"31258351862", fullName:"Ramon Lanciano Zanardi",birthday: new Date("1983-03-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ramonzanardi@gmail.com"});
db.shooters.insertOne({name:"Ranieri Rabelo", email:"39206951866@tpmonline.com.br", category:0, docnum:"39206951866", fullName:"Ranieri Rabelo",birthday: new Date("1991-01-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ranieri@gmail.com"});
db.shooters.insertOne({name:"Raphael Zhou Junwei Wu", email:"06041002720@tpmonline.com.br", category:0, docnum:"06041002720", fullName:"Raphael Zhou Junwei Wu",birthday: new Date("1989-02-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"raphaelwsw@gmail.com"});
db.shooters.insertOne({name:"Raquel Soares Beserra", email:"39344687803@tpmonline.com.br", category:2, docnum:"39344687803", fullName:"Raquel Soares Beserra",birthday: new Date("1991-03-15") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rauqelb@gmail.com"});
db.shooters.insertOne({name:"Rau Noriyassu Kakazu", email:"14747888829@tpmonline.com.br", category:0, docnum:"14747888829", fullName:"Rau Noriyassu Kakazu",birthday: new Date("1971-11-27") ,sex:"M",cr:"660082-47",crEndDate: new Date("2031-12-20") ,SH_email:"noriyassu_kakazu@uol.com.br"});
db.shooters.insertOne({name:"Reginaldo Damião Bernardes", email:"22464673811@tpmonline.com.br", category:0, docnum:"22464673811", fullName:"Reginaldo Damião Bernardes",birthday: new Date("1981-05-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"reginaldoda33@gmail.com"});
db.shooters.insertOne({name:"REGINALDO DE CAMPOS", email:"04049925958@tpmonline.com.br", category:0, docnum:"04049925958", fullName:"REGINALDO DE CAMPOS",birthday: new Date("1983-03-19") ,sex:"M",cr:"136490",crEndDate: new Date("2030-02-06") ,SH_email:"reginaldodecampos@yahoo.com.br"});
db.shooters.insertOne({name:"Reginaldo de Lima", email:"34896583884@tpmonline.com.br", category:0, docnum:"34896583884", fullName:"Reginaldo de Lima",birthday: new Date("1987-07-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"reginaldo@gmail.com"});
db.shooters.insertOne({name:"Reinaldo Manoel Belo de Oliveira", email:"01226897800@tpmonline.com.br", category:0, docnum:"01226897800", fullName:"Reinaldo Manoel Belo de Oliveira",birthday: new Date("1957-06-10") ,sex:"M",cr:"1471414",crEndDate: new Date("2031-01-19") ,SH_email:"cgpedro1505@yahoo.com.br"});
db.shooters.insertOne({name:"REINALDO RAGAZZO BOARIM", email:"01683466802@tpmonline.com.br", category:0, docnum:"01683466802", fullName:"REINALDO RAGAZZO BOARIM",birthday: new Date("2001-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"reinaldo@gmail.com"});
db.shooters.insertOne({name:"Renata Nobrega de Arruda Inouye", email:"22033057895@tpmonline.com.br", category:2, docnum:"22033057895", fullName:"Renata Nobrega de Arruda Inouye",birthday: new Date("1981-11-25") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"renatainouye@gmail.com"});
db.shooters.insertOne({name:"RENATO ALVES PEDRO", email:"07558106869@tpmonline.com.br", category:0, docnum:"07558106869", fullName:"RENATO ALVES PEDRO",birthday: new Date("1999-11-30") ,sex:"",cr:"730.932-54",crEndDate: new Date("2031-08-15") ,SH_email:"renatoalves@gmail.com"});
db.shooters.insertOne({name:"Renato Beltrao Abdo", email:"84461187691@tpmonline.com.br", category:0, docnum:"84461187691", fullName:"Renato Beltrao Abdo",birthday: new Date("1972-09-23") ,sex:"M",cr:"849366-90",crEndDate: new Date("2032-08-15") ,SH_email:"renato.beltrao23@gmail.com"});
db.shooters.insertOne({name:"RENATO CANTERO LADEIA", email:"22476509884@tpmonline.com.br", category:0, docnum:"22476509884", fullName:"RENATO CANTERO LADEIA",birthday: new Date("1983-05-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"renato.cantero@hotmail.com"});
db.shooters.insertOne({name:"RENATO KUHN", email:"11748806866@tpmonline.com.br", category:0, docnum:"11748806866", fullName:"RENATO KUHN",birthday: new Date("1999-01-01") ,sex:"M",cr:"20687",crEndDate: new Date("2029-11-10") ,SH_email:"renato@gmail.com"});
db.shooters.insertOne({name:"RENATO KUSZLEWICZ", email:"28734305831@tpmonline.com.br", category:0, docnum:"28734305831", fullName:"RENATO KUSZLEWICZ",birthday: new Date("1999-11-30") ,sex:"",cr:"154943-06",crEndDate: new Date("2031-07-04") ,SH_email:"renatokusz@gmail.com"});
db.shooters.insertOne({name:"Renato Lisboa dos Santos", email:"27678994842@tpmonline.com.br", category:0, docnum:"27678994842", fullName:"Renato Lisboa dos Santos",birthday: new Date("1979-05-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"renato@lsferramentas.com.br"});
db.shooters.insertOne({name:"Renato Machado Berwerth", email:"36818555870@tpmonline.com.br", category:0, docnum:"36818555870", fullName:"Renato Machado Berwerth",birthday: new Date("1988-10-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"renatomberwerth@gmail.com"});
db.shooters.insertOne({name:"RENATO PAULO DE VITA", email:"63643480849@tpmonline.com.br", category:0, docnum:"63643480849", fullName:"RENATO PAULO DE VITA",birthday: new Date("2001-01-01") ,sex:"M",cr:"13661",crEndDate: new Date("1980-01-01") ,SH_email:"rpv0018@gmail.com"});
db.shooters.insertOne({name:"Renato Pires Moreno", email:"25801698817@tpmonline.com.br", category:0, docnum:"25801698817", fullName:"Renato Pires Moreno",birthday: new Date("1971-03-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"renatopmoreno@hotmail.com"});
db.shooters.insertOne({name:"RENE ADUAN JUNIOR", email:"14840062838@tpmonline.com.br", category:0, docnum:"14840062838", fullName:"RENE ADUAN JUNIOR",birthday: new Date("2001-01-01") ,sex:"M",cr:"508.411-30",crEndDate: new Date("2031-04-30") ,SH_email:"rene@gmail.com"});
db.shooters.insertOne({name:"Ricardo Azevedo Leitão", email:"84696974715@tpmonline.com.br", category:0, docnum:"84696974715", fullName:"Ricardo Azevedo Leitão",birthday: new Date("1966-08-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cleide@raladv.com.br"});
db.shooters.insertOne({name:"Ricardo Borgatti Neto", email:"47563656634@tpmonline.com.br", category:0, docnum:"47563656634", fullName:"Ricardo Borgatti Neto",birthday: new Date("1963-11-05") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Ricardo Camilo de Souza", email:"29436170831@tpmonline.com.br", category:0, docnum:"29436170831", fullName:"Ricardo Camilo de Souza",birthday: new Date("1980-12-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Ricardo Cardoso Gomes", email:"32750685800@tpmonline.com.br", category:0, docnum:"32750685800", fullName:"Ricardo Cardoso Gomes",birthday: new Date("1986-11-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardogomes@gmail.com"});
db.shooters.insertOne({name:"Ricardo dos Santos de Almeida", email:"26237665846@tpmonline.com.br", category:0, docnum:"26237665846", fullName:"Ricardo dos Santos de Almeida",birthday: new Date("1978-06-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardo.almeida@gmail.com"});
db.shooters.insertOne({name:"RICARDO EJZENBAUM", email:"16286382810@tpmonline.com.br", category:0, docnum:"16286382810", fullName:"RICARDO EJZENBAUM",birthday: new Date("1972-07-14") ,sex:"M",cr:"28.500-52",crEndDate: new Date("2031-01-13") ,SH_email:"daniele@afonsoadv.com.br"});
db.shooters.insertOne({name:"Ricardo Kalil de Oliveira Janeiro", email:"26733022800@tpmonline.com.br", category:0, docnum:"26733022800", fullName:"Ricardo Kalil de Oliveira Janeiro",birthday: new Date("1977-07-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tirokrill@gmail.com"});
db.shooters.insertOne({name:"Ricardo Landim Ladeia", email:"34085128841@tpmonline.com.br", category:0, docnum:"34085128841", fullName:"Ricardo Landim Ladeia",birthday: new Date("1984-04-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"kadu_stanks@yahoo.com.br"});
db.shooters.insertOne({name:"Ricardo Losinfeldt", email:"30839063822@tpmonline.com.br", category:0, docnum:"30839063822", fullName:"Ricardo Losinfeldt",birthday: new Date("1985-03-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardo.losinnfeldt@gmail.com"});
db.shooters.insertOne({name:"Ricardo Nahat", email:"85596850810@tpmonline.com.br", category:0, docnum:"85596850810", fullName:"Ricardo Nahat",birthday: new Date("1954-06-04") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"oficial@14ri.com.br"});
db.shooters.insertOne({name:"Ricardo Rozenblit", email:"12637798831@tpmonline.com.br", category:0, docnum:"12637798831", fullName:"Ricardo Rozenblit",birthday: new Date("1968-11-30") ,sex:"M",cr:"4406",crEndDate: new Date("2022-01-09") ,SH_email:"ricardorozenblit@gmail.com"});
db.shooters.insertOne({name:"Ricardo Sarti Domene", email:"28068918841@tpmonline.com.br", category:0, docnum:"28068918841", fullName:"Ricardo Sarti Domene",birthday: new Date("1977-02-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardo@streckmetal.com.br"});
db.shooters.insertOne({name:"Ricardo Vazquez Somoza", email:"26431526899@tpmonline.com.br", category:0, docnum:"26431526899", fullName:"Ricardo Vazquez Somoza",birthday: new Date("1975-08-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ricardo-somoza@hotmail.com"});
db.shooters.insertOne({name:"Roberson Laurindo Tomé", email:"22418800865@tpmonline.com.br", category:0, docnum:"22418800865", fullName:"Roberson Laurindo Tomé",birthday: new Date("1983-08-23") ,sex:"M",cr:"299493",crEndDate: new Date("2029-06-26") ,SH_email:"robersontome@hotmail.com"});
db.shooters.insertOne({name:"ROBERT SHOITI SEICHI", email:"13746977886@tpmonline.com.br", category:0, docnum:"13746977886", fullName:"ROBERT SHOITI SEICHI",birthday: new Date("1968-09-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"robert@usemetaissp.com.br"});
db.shooters.insertOne({name:"Roberto Baumgratz Grassia", email:"35031189851@tpmonline.com.br", category:0, docnum:"35031189851", fullName:"Roberto Baumgratz Grassia",birthday: new Date("1987-10-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rbgrassia@uol.com.br"});
db.shooters.insertOne({name:"ROBERTO FULCHERBERGUER", email:"12395558818@tpmonline.com.br", category:0, docnum:"12395558818", fullName:"ROBERTO FULCHERBERGUER",birthday: new Date("2000-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"roberto@gmail.com"});
db.shooters.insertOne({name:"ROBERTO GUIMARAES RIBEIRO JUNIOR", email:"26147627848@tpmonline.com.br", category:0, docnum:"26147627848", fullName:"ROBERTO GUIMARAES RIBEIRO JUNIOR",birthday: new Date("1978-01-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rjunior@rircontabil.com.br"});
db.shooters.insertOne({name:"Roberto Hiroshi Yamamura", email:"10636786846@tpmonline.com.br", category:0, docnum:"10636786846", fullName:"Roberto Hiroshi Yamamura",birthday: new Date("1967-09-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"hiroshi@gmail.com"});
db.shooters.insertOne({name:"Roberto Shalders de Oliveira Roxo Neto", email:"28468488828@tpmonline.com.br", category:0, docnum:"28468488828", fullName:"Roberto Shalders de Oliveira Roxo Neto",birthday: new Date("1980-12-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"robertoroxoneto@gmail.com"});
db.shooters.insertOne({name:"Robson Fernandes Marques", email:"25930782865@tpmonline.com.br", category:0, docnum:"25930782865", fullName:"Robson Fernandes Marques",birthday: new Date("1976-09-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"robsonfmarques@gmail.com"});
db.shooters.insertOne({name:"Robson Ria Campos Nunes", email:"35691766813@tpmonline.com.br", category:0, docnum:"35691766813", fullName:"Robson Ria Campos Nunes",birthday: new Date("1986-12-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"RODIVAL BITTENCOURT", email:"04582294901@tpmonline.com.br", category:0, docnum:"04582294901", fullName:"RODIVAL BITTENCOURT",birthday: new Date("1985-05-16") ,sex:"M",cr:"435162",crEndDate: new Date("2030-10-28") ,SH_email:"rodival_giba@icloud.com"});
db.shooters.insertOne({name:"RODRIGO BITTENCOURT", email:"04582295983@tpmonline.com.br", category:0, docnum:"04582295983", fullName:"RODRIGO BITTENCOURT",birthday: new Date("1985-05-16") ,sex:"M",cr:"427635",crEndDate: new Date("2030-10-13") ,SH_email:"rodrigobit1606@icloud.com"});
db.shooters.insertOne({name:"Rodrigo Coelho", email:"25193292895@tpmonline.com.br", category:0, docnum:"25193292895", fullName:"Rodrigo Coelho",birthday: new Date("1976-03-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rodrinapoli@gmail.com"});
db.shooters.insertOne({name:"Rodrigo da Costa Wagner", email:"21263615864@tpmonline.com.br", category:0, docnum:"21263615864", fullName:"Rodrigo da Costa Wagner",birthday: new Date("1976-08-08") ,sex:"M",cr:"217286",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigow@uol.com.br"});
db.shooters.insertOne({name:"Rodrigo de Alcantara", email:"22779719877@tpmonline.com.br", category:0, docnum:"22779719877", fullName:"Rodrigo de Alcantara",birthday: new Date("1986-03-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fisioterapia.rodrigo.alcantara@gmail.com"});
db.shooters.insertOne({name:"Rodrigo Figueiredo Machado Soares", email:"22677193809@tpmonline.com.br", category:0, docnum:"22677193809", fullName:"Rodrigo Figueiredo Machado Soares",birthday: new Date("1982-09-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigofigueiredo@gmail.com"});
db.shooters.insertOne({name:"Rodrigo Hipolito Fernandes", email:"22349683800@tpmonline.com.br", category:0, docnum:"22349683800", fullName:"Rodrigo Hipolito Fernandes",birthday: new Date("1981-12-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigohipolito@outlook.com"});
db.shooters.insertOne({name:"Rodrigo Moreno Dias", email:"29776688888@tpmonline.com.br", category:0, docnum:"29776688888", fullName:"Rodrigo Moreno Dias",birthday: new Date("1980-06-24") ,sex:"M",cr:"52896293",crEndDate: new Date("2031-06-15") ,SH_email:"butina.rodrigo@gmail.com"});
db.shooters.insertOne({name:"Rodrigo Outorelo Reboreda", email:"25506666829@tpmonline.com.br", category:0, docnum:"25506666829", fullName:"Rodrigo Outorelo Reboreda",birthday: new Date("1975-12-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"lumazrodrigo@gmail.com"});
db.shooters.insertOne({name:"Rodrigo Pedroso Majzoub", email:"51041761856@tpmonline.com.br", category:0, docnum:"51041761856", fullName:"Rodrigo Pedroso Majzoub",birthday: new Date("2000-08-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"digo_1118@outlook.com"});
db.shooters.insertOne({name:"RODRIGO PIOTTO", email:"13802856821@tpmonline.com.br", category:0, docnum:"13802856821", fullName:"RODRIGO PIOTTO",birthday: new Date("1972-04-06") ,sex:"M",cr:"47130288",crEndDate: new Date("2031-01-18") ,SH_email:"rodrigopiotto1972@gmail.com"});
db.shooters.insertOne({name:"RODRIGO SERRÃO RIBEIRO PINTO", email:"30378288890@tpmonline.com.br", category:0, docnum:"30378288890", fullName:"RODRIGO SERRÃO RIBEIRO PINTO",birthday: new Date("1999-11-30") ,sex:"",cr:"44.194-56",crEndDate: new Date("2032-06-14") ,SH_email:"rodrigo@gmail.com"});
db.shooters.insertOne({name:"Rodrigo Soares Rivolta", email:"21996996843@tpmonline.com.br", category:0, docnum:"21996996843", fullName:"Rodrigo Soares Rivolta",birthday: new Date("1981-03-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigo@healthtransportes.com.br"});
db.shooters.insertOne({name:"Rogerio dos Santos Duarte", email:"27542891863@tpmonline.com.br", category:0, docnum:"27542891863", fullName:"Rogerio dos Santos Duarte",birthday: new Date("1978-05-18") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Ronaldo dos Santos", email:"16989047895@tpmonline.com.br", category:0, docnum:"16989047895", fullName:"Ronaldo dos Santos",birthday: new Date("1975-07-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ronirep@icloud.com"});
db.shooters.insertOne({name:"Ronaldo Jose Gomes do Nascimento", email:"30718873882@tpmonline.com.br", category:0, docnum:"30718873882", fullName:"Ronaldo Jose Gomes do Nascimento",birthday: new Date("1982-06-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fenixarquivo2020@gmail.com.br"});
db.shooters.insertOne({name:"Ronaldo Jose Vicintin", email:"44735090878@tpmonline.com.br", category:0, docnum:"44735090878", fullName:"Ronaldo Jose Vicintin",birthday: new Date("1951-04-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ronaldovicintin@gmail.com"});
db.shooters.insertOne({name:"Rongbing Chen", email:"24305827832@tpmonline.com.br", category:0, docnum:"24305827832", fullName:"Rongbing Chen",birthday: new Date("1976-11-24") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"693711252@qq.com"});
db.shooters.insertOne({name:"Rosenildo Felix do Nascimento", email:"92773567404@tpmonline.com.br", category:0, docnum:"92773567404", fullName:"Rosenildo Felix do Nascimento",birthday: new Date("1974-05-02") ,sex:"M",cr:"20463189",crEndDate: new Date("2031-06-28") ,SH_email:"nildofelix@gmail.com"});
db.shooters.insertOne({name:"SALVATORE SANINO", email:"12573879879@tpmonline.com.br", category:0, docnum:"12573879879", fullName:"SALVATORE SANINO",birthday: new Date("1999-11-30") ,sex:"M",cr:"70371474",crEndDate: new Date("2032-03-07") ,SH_email:"salvatore@gmail.com"});
db.shooters.insertOne({name:"SAMUEL FERREIRA DE CAMPOS LEME", email:"33470124884@tpmonline.com.br", category:0, docnum:"33470124884", fullName:"SAMUEL FERREIRA DE CAMPOS LEME",birthday: new Date("2000-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"samuel@gmail.com"});
db.shooters.insertOne({name:"Samuel Luiz Santos Prior", email:"31134489803@tpmonline.com.br", category:0, docnum:"31134489803", fullName:"Samuel Luiz Santos Prior",birthday: new Date("1984-06-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"samuelprior@gmail.com"});
db.shooters.insertOne({name:"Samy Sarfatis Metta", email:"34397767866@tpmonline.com.br", category:0, docnum:"34397767866", fullName:"Samy Sarfatis Metta",birthday: new Date("1986-02-09") ,sex:"M",cr:"000.211.980-39",crEndDate: new Date("2031-09-01") ,SH_email:"samy@udlog.com.br"});
db.shooters.insertOne({name:"SEDINEY MARI DA SILVA JUNIOR", email:"37853881878@tpmonline.com.br", category:0, docnum:"37853881878", fullName:"SEDINEY MARI DA SILVA JUNIOR",birthday: new Date("1989-04-15") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sedinei@gmail.com"});
db.shooters.insertOne({name:"SERGIO ACCURSO", email:"06382693855@tpmonline.com.br", category:0, docnum:"06382693855", fullName:"SERGIO ACCURSO",birthday: new Date("2000-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sergio@gmail.com"});
db.shooters.insertOne({name:"Sergio Fliter", email:"99709945815@tpmonline.com.br", category:0, docnum:"99709945815", fullName:"Sergio Fliter",birthday: new Date("1952-01-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"segiofly@me.com"});
db.shooters.insertOne({name:"Sergio Jose Nascimento", email:"18487621864@tpmonline.com.br", category:0, docnum:"18487621864", fullName:"Sergio Jose Nascimento",birthday: new Date("1973-03-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Sérgio Luiz Alves Ferroni", email:"09122104860@tpmonline.com.br", category:0, docnum:"09122104860", fullName:"Sérgio Luiz Alves Ferroni",birthday: new Date("1970-08-21") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Sergio Rodrigues Veneziano", email:"14836574854@tpmonline.com.br", category:0, docnum:"14836574854", fullName:"Sergio Rodrigues Veneziano",birthday: new Date("1969-11-29") ,sex:"M",cr:"27917",crEndDate: new Date("2029-11-01") ,SH_email:"srveneziano@hotmail.com"});
db.shooters.insertOne({name:"Sergio Vagner Fernandes da Silva", email:"02615364782@tpmonline.com.br", category:0, docnum:"02615364782", fullName:"Sergio Vagner Fernandes da Silva",birthday: new Date("1973-10-31") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sergio.fernandes@brssolucoes.com.br"});
db.shooters.insertOne({name:"SILVIO ANTONIO MOREIRA", email:"06523950824@tpmonline.com.br", category:0, docnum:"06523950824", fullName:"SILVIO ANTONIO MOREIRA",birthday: new Date("1971-11-09") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"silviodocumentos2016@gmail.com"});
db.shooters.insertOne({name:"Silvio José Cecchi", email:"03661634852@tpmonline.com.br", category:0, docnum:"03661634852", fullName:"Silvio José Cecchi",birthday: new Date("1956-12-31") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"silviocecchi@gmail.com"});
db.shooters.insertOne({name:"Silvio Renato Siqueira Kirsten", email:"26735120809@tpmonline.com.br", category:0, docnum:"26735120809", fullName:"Silvio Renato Siqueira Kirsten",birthday: new Date("1977-09-24") ,sex:"M",cr:"53570",crEndDate: new Date("2029-10-03") ,SH_email:"silvio.kirsten@gmail.com"});
db.shooters.insertOne({name:"Simon Szacher", email:"28005259832@tpmonline.com.br", category:0, docnum:"28005259832", fullName:"Simon Szacher",birthday: new Date("1979-11-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"siszacher@gmail.com"});
db.shooters.insertOne({name:"Simone Aparecida Perci", email:"33758207800@tpmonline.com.br", category:0, docnum:"33758207800", fullName:"Simone Aparecida Perci",birthday: new Date("1975-12-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"simoneperci09@gmail.com"});
db.shooters.insertOne({name:"Soraya Albernaz Alves Figlioli", email:"28735114860@tpmonline.com.br", category:2, docnum:"28735114860", fullName:"Soraya Albernaz Alves Figlioli",birthday: new Date("1979-12-07") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"soraya.alves@me.com"});
db.shooters.insertOne({name:"TADEU KARASEK JUNIOR", email:"88096491920@tpmonline.com.br", category:0, docnum:"88096491920", fullName:"TADEU KARASEK JUNIOR",birthday: new Date("1972-10-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"karasek.adv@gmail.com"});
db.shooters.insertOne({name:"Tania Christina Neto Soares", email:"00762782633@tpmonline.com.br", category:2, docnum:"00762782633", fullName:"Tania Christina Neto Soares",birthday: new Date("1972-11-03") ,sex:"F",cr:"816466-58",crEndDate: new Date("2032-07-08") ,SH_email:"miau9mm@gmail.com"});
db.shooters.insertOne({name:"Thiago Dias Coimbra", email:"31646976860@tpmonline.com.br", category:0, docnum:"31646976860", fullName:"Thiago Dias Coimbra",birthday: new Date("1999-11-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Thiago Ferreira de Oliveira", email:"26165518885@tpmonline.com.br", category:0, docnum:"26165518885", fullName:"Thiago Ferreira de Oliveira",birthday: new Date("1977-08-24") ,sex:"M",cr:"91543",crEndDate: new Date("2029-10-14") ,SH_email:"thiagotrt@terra.com.br"});
db.shooters.insertOne({name:"Thiago Moreira de Queiroz", email:"48558650870@tpmonline.com.br", category:0, docnum:"48558650870", fullName:"Thiago Moreira de Queiroz",birthday: new Date("1998-09-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"thiagoqueiroz@gmail.com"});
db.shooters.insertOne({name:"THIAGO PAMPLONA FELCAR", email:"36014945822@tpmonline.com.br", category:0, docnum:"36014945822", fullName:"THIAGO PAMPLONA FELCAR",birthday: new Date("1987-12-12") ,sex:"M",cr:"67415415",crEndDate: new Date("2032-01-17") ,SH_email:"tfelcar@gmail.com"});
db.shooters.insertOne({name:"Thiago Souza Santos", email:"36964849890@tpmonline.com.br", category:0, docnum:"36964849890", fullName:"Thiago Souza Santos",birthday: new Date("1988-09-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"TIAGO FERREIRA DE CAMPOS LEME", email:"27267981879@tpmonline.com.br", category:0, docnum:"27267981879", fullName:"TIAGO FERREIRA DE CAMPOS LEME",birthday: new Date("2001-01-01") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tiago@gmail.com"});
db.shooters.insertOne({name:"Tiago Robert Santana Martins", email:"41537544802@tpmonline.com.br", category:0, docnum:"41537544802", fullName:"Tiago Robert Santana Martins",birthday: new Date("1992-05-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"tiago-rms@live.com"});
db.shooters.insertOne({name:"Tiansheng Xu", email:"23526385858@tpmonline.com.br", category:0, docnum:"23526385858", fullName:"Tiansheng Xu",birthday: new Date("1994-12-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"xtsara@foxmail.com"});
db.shooters.insertOne({name:"Tingheng Gao", email:"23326833806@tpmonline.com.br", category:0, docnum:"23326833806", fullName:"Tingheng Gao",birthday: new Date("1989-07-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cristianogao2@outlook.com"});
db.shooters.insertOne({name:"Tsai Chih Wei", email:"37409404841@tpmonline.com.br", category:0, docnum:"37409404841", fullName:"Tsai Chih Wei",birthday: new Date("1987-08-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"rodrigo.rcbr@gmail.com"});
db.shooters.insertOne({name:"Valdemir Aparecido Costa", email:"09150367897@tpmonline.com.br", category:0, docnum:"09150367897", fullName:"Valdemir Aparecido Costa",birthday: new Date("1969-07-07") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"valdemir@kativacontabil.com.br"});
db.shooters.insertOne({name:"Valter Carrasco Junior", email:"07750351817@tpmonline.com.br", category:0, docnum:"07750351817", fullName:"Valter Carrasco Junior",birthday: new Date("1966-09-28") ,sex:"M",cr:"31534791",crEndDate: new Date("2029-08-06") ,SH_email:"valtercarrasco@gmail.com"});
db.shooters.insertOne({name:"Valter Vieira Carrasco", email:"41806963809@tpmonline.com.br", category:0, docnum:"41806963809", fullName:"Valter Vieira Carrasco",birthday: new Date("1992-05-27") ,sex:"M",cr:"27037347",crEndDate: new Date("2032-07-07") ,SH_email:"valtervc92@gmail.com"});
db.shooters.insertOne({name:"VANDERLEI AMARAL DE SOUZA", email:"10041186869@tpmonline.com.br", category:0, docnum:"10041186869", fullName:"VANDERLEI AMARAL DE SOUZA",birthday: new Date("1999-01-01") ,sex:"",cr:"13598198",crEndDate: new Date("2032-06-22") ,SH_email:"vanderlei@gmail.com"});
db.shooters.insertOne({name:"Vando Jose da Silva", email:"29687078847@tpmonline.com.br", category:0, docnum:"29687078847", fullName:"Vando Jose da Silva",birthday: new Date("1982-10-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"vandosilvaeng@gmail.com"});
db.shooters.insertOne({name:"Victor Fernandes de Amorim", email:"40007694806@tpmonline.com.br", category:0, docnum:"40007694806", fullName:"Victor Fernandes de Amorim",birthday: new Date("1991-09-10") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"victorcimaq@gmail.com"});
db.shooters.insertOne({name:"Victor Lopes Mucugê", email:"42928371800@tpmonline.com.br", category:0, docnum:"42928371800", fullName:"Victor Lopes Mucugê",birthday: new Date("1993-02-17") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"victormucuge@gmail.com"});
db.shooters.insertOne({name:"Victor Magaroti Fernandes Braga", email:"33609823801@tpmonline.com.br", category:0, docnum:"33609823801", fullName:"Victor Magaroti Fernandes Braga",birthday: new Date("1986-12-11") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"magaroti@gmail.com"});
db.shooters.insertOne({name:"Victor Mauad", email:"04944850867@tpmonline.com.br", category:0, docnum:"04944850867", fullName:"Victor Mauad",birthday: new Date("1966-01-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:""});
db.shooters.insertOne({name:"Victor Sarfatis Metta", email:"22286909881@tpmonline.com.br", category:0, docnum:"22286909881", fullName:"Victor Sarfatis Metta",birthday: new Date("1981-11-08") ,sex:"M",cr:"3591069",crEndDate: new Date("2032-05-04") ,SH_email:"vmettabr@yahoo.com.br"});
db.shooters.insertOne({name:"VINICIUS MACHADO DE SOUZA", email:"25937045866@tpmonline.com.br", category:0, docnum:"25937045866", fullName:"VINICIUS MACHADO DE SOUZA",birthday: new Date("1976-08-31") ,sex:"M",cr:"25712268",crEndDate: new Date("2032-05-10") ,SH_email:"vinicius@gmail.com"});
db.shooters.insertOne({name:"Vinicius Santana Lima", email:"36799299869@tpmonline.com.br", category:0, docnum:"36799299869", fullName:"Vinicius Santana Lima",birthday: new Date("1988-08-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"viniciussantana@gmail.com"});
db.shooters.insertOne({name:"VINICIUS SCHADECK", email:"09866173933@tpmonline.com.br", category:0, docnum:"09866173933", fullName:"VINICIUS SCHADECK",birthday: new Date("1993-11-29") ,sex:"M",cr:"431263",crEndDate: new Date("2030-10-20") ,SH_email:"vinicius0schadeck@gmail.com"});
db.shooters.insertOne({name:"Vinicius Xavier Parra", email:"42350415848@tpmonline.com.br", category:0, docnum:"42350415848", fullName:"Vinicius Xavier Parra",birthday: new Date("1992-08-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"viniciusvxp@gmail.com"});
db.shooters.insertOne({name:"Vitor Antonio Facciolli Pereira Pinto", email:"26974532881@tpmonline.com.br", category:0, docnum:"26974532881", fullName:"Vitor Antonio Facciolli Pereira Pinto",birthday: new Date("1979-11-23") ,sex:"M",cr:"81787472",crEndDate: new Date("2032-07-09") ,SH_email:"vitoreng@hotmail.com"});
db.shooters.insertOne({name:"Vitor Henrique Seravalli", email:"42672123845@tpmonline.com.br", category:0, docnum:"42672123845", fullName:"Vitor Henrique Seravalli",birthday: new Date("1997-04-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"vitor_req@hotmail.com"});
db.shooters.insertOne({name:"Vitor Hugo Andreotti", email:"39320410895@tpmonline.com.br", category:0, docnum:"39320410895", fullName:"Vitor Hugo Andreotti",birthday: new Date("1989-10-14") ,sex:"M",cr:"51871416",crEndDate: new Date("2031-05-23") ,SH_email:"vitorandreotti14101989@gmail.com"});
db.shooters.insertOne({name:"VLADIMIR PIROLA", email:"03783289807@tpmonline.com.br", category:0, docnum:"03783289807", fullName:"VLADIMIR PIROLA",birthday: new Date("1964-07-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"vladimirdv@terra.com.br"});
db.shooters.insertOne({name:"Wagner Baptista Rigueira", email:"27642116861@tpmonline.com.br", category:0, docnum:"27642116861", fullName:"Wagner Baptista Rigueira",birthday: new Date("1980-03-23") ,sex:"M",cr:"148674",crEndDate: new Date("2030-12-31") ,SH_email:"wagnerwbrcrm136083sp@gmail.com"});
db.shooters.insertOne({name:"Wagner Clemente de Moraes", email:"10501172807@tpmonline.com.br", category:0, docnum:"10501172807", fullName:"Wagner Clemente de Moraes",birthday: new Date("1967-04-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wagnerclemente@gmail.com"});
db.shooters.insertOne({name:"Wagner de Masi", email:"00406444803@tpmonline.com.br", category:0, docnum:"00406444803", fullName:"Wagner de Masi",birthday: new Date("1961-12-08") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wagnermasi@hotmail.com"});
db.shooters.insertOne({name:"Wagner Marinho Bermal", email:"27511690823@tpmonline.com.br", category:0, docnum:"27511690823", fullName:"Wagner Marinho Bermal",birthday: new Date("1978-12-24") ,sex:"M",cr:"41793153",crEndDate: new Date("2030-09-22") ,SH_email:"wagnerbermal@hotmail.com"});
db.shooters.insertOne({name:"Wagner Willian da Silva Mano", email:"39000019877@tpmonline.com.br", category:0, docnum:"39000019877", fullName:"Wagner Willian da Silva Mano",birthday: new Date("1988-05-13") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wagnaercristino29@gmail.com"});
db.shooters.insertOne({name:"Weidong Jiang", email:"60088366340@tpmonline.com.br", category:0, docnum:"60088366340", fullName:"Weidong Jiang",birthday: new Date("1988-01-14") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"brasildong2016@hotmail.com"});
db.shooters.insertOne({name:"Wellington Nunes de Oliveira", email:"27860311844@tpmonline.com.br", category:0, docnum:"27860311844", fullName:"Wellington Nunes de Oliveira",birthday: new Date("1980-02-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wellington@gmail.com"});
db.shooters.insertOne({name:"Wellington Pereira Cruz", email:"33574965850@tpmonline.com.br", category:0, docnum:"33574965850", fullName:"Wellington Pereira Cruz",birthday: new Date("1984-07-30") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wellingtonpereira@gmail.com"});
db.shooters.insertOne({name:"Wenfei Fang", email:"23996958870@tpmonline.com.br", category:0, docnum:"23996958870", fullName:"Wenfei Fang",birthday: new Date("1990-04-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"542050161@qq.com"});
db.shooters.insertOne({name:"Wessam Mostafa Sayed Hussein", email:"23791467808@tpmonline.com.br", category:0, docnum:"23791467808", fullName:"Wessam Mostafa Sayed Hussein",birthday: new Date("1982-12-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wessam@gmail.com"});
db.shooters.insertOne({name:"Wiliam Cristofer Ramos", email:"32949581889@tpmonline.com.br", category:0, docnum:"32949581889", fullName:"Wiliam Cristofer Ramos",birthday: new Date("1984-10-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"cristoferliu@gmail.com"});
db.shooters.insertOne({name:"WILLIAM MANUEL BARREIRO GARCIA", email:"24183408806@tpmonline.com.br", category:0, docnum:"24183408806", fullName:"WILLIAM MANUEL BARREIRO GARCIA",birthday: new Date("1994-08-28") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"william.barreiro@hotmail.com"});
db.shooters.insertOne({name:"William Roberto Gomes da Costa", email:"40472486810@tpmonline.com.br", category:0, docnum:"40472486810", fullName:"William Roberto Gomes da Costa",birthday: new Date("1989-08-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"williangomescosta@hotmail.com"});
db.shooters.insertOne({name:"Willian Durazzo Nadeu", email:"18046382850@tpmonline.com.br", category:0, docnum:"18046382850", fullName:"Willian Durazzo Nadeu",birthday: new Date("1974-02-27") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"sac@predialservice.com.br"});
db.shooters.insertOne({name:"Wilson Soares Lacerda", email:"14514962813@tpmonline.com.br", category:0, docnum:"14514962813", fullName:"Wilson Soares Lacerda",birthday: new Date("1974-03-19") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wilsonsoareslacerda@gmail.com"});
db.shooters.insertOne({name:"Wu Hong", email:"23381199838@tpmonline.com.br", category:0, docnum:"23381199838", fullName:"Wu Hong",birthday: new Date("1989-09-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"229177388@qq.com"});
db.shooters.insertOne({name:"XIAFEI XIA", email:"23373678862@tpmonline.com.br", category:0, docnum:"23373678862", fullName:"XIAFEI XIA",birthday: new Date("1989-09-20") ,sex:"M",cr:"15816354",crEndDate: new Date("2031-05-12") ,SH_email:"xiaxiafe0513@icloud.com"});
db.shooters.insertOne({name:"Xiang Ye", email:"23709298806@tpmonline.com.br", category:0, docnum:"23709298806", fullName:"Xiang Ye",birthday: new Date("1980-06-16") ,sex:"M",cr:"62454353",crEndDate: new Date("2031-10-31") ,SH_email:"yexiang163@gmail.com"});
db.shooters.insertOne({name:"Xiaojun Zhou", email:"23366767880@tpmonline.com.br", category:0, docnum:"23366767880", fullName:"Xiaojun Zhou",birthday: new Date("1989-06-12") ,sex:"M",cr:"69606692",crEndDate: new Date("2032-02-21") ,SH_email:"xzhou7235@gmail.com"});
db.shooters.insertOne({name:"Xin He", email:"23810153885@tpmonline.com.br", category:0, docnum:"23810153885", fullName:"Xin He",birthday: new Date("1982-01-23") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"xinhe666369@gmail.com"});
db.shooters.insertOne({name:"Xiuhua Luo", email:"23908457890@tpmonline.com.br", category:0, docnum:"23908457890", fullName:"Xiuhua Luo",birthday: new Date("1970-01-29") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"wuwu353002@gmail.com"});
db.shooters.insertOne({name:"Xuejie Wu", email:"24022948841@tpmonline.com.br", category:0, docnum:"24022948841", fullName:"Xuejie Wu",birthday: new Date("1980-07-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"zxuanlong54@gmail.com"});
db.shooters.insertOne({name:"YANFEN HU", email:"23236222859@tpmonline.com.br", category:2, docnum:"23236222859", fullName:"YANFEN HU",birthday: new Date("1982-03-04") ,sex:"F",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"vanessa_fen@hotmail.com"});
db.shooters.insertOne({name:"Yang Zhifang", email:"22025104863@tpmonline.com.br", category:0, docnum:"22025104863", fullName:"Yang Zhifang",birthday: new Date("1970-10-29") ,sex:"M",cr:"99741644",crEndDate: new Date("2032-12-31") ,SH_email:"mzd84188@qq.com"});
db.shooters.insertOne({name:"Yanjiang Xu", email:"01834340489@tpmonline.com.br", category:0, docnum:"01834340489", fullName:"Yanjiang Xu",birthday: new Date("1990-11-20") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"179920472@qq"});
db.shooters.insertOne({name:"Yibin Cheng", email:"24241109802@tpmonline.com.br", category:0, docnum:"24241109802", fullName:"Yibin Cheng",birthday: new Date("1982-04-06") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"fujunyu888@gmail.com"});
db.shooters.insertOne({name:"YUANXUN LI", email:"23299671871@tpmonline.com.br", category:0, docnum:"23299671871", fullName:"YUANXUN LI",birthday: new Date("1990-03-06") ,sex:"M",cr:"115285",crEndDate: new Date("2022-02-16") ,SH_email:"liuanxunabc@126.com"});
db.shooters.insertOne({name:"ZHANG CHANG FA", email:"21780916876@tpmonline.com.br", category:0, docnum:"21780916876", fullName:"ZHANG CHANG FA",birthday: new Date("1968-01-22") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"nn.zhang@outlook.com"});
db.shooters.insertOne({name:"Zhao Guangyu", email:"23121810880@tpmonline.com.br", category:0, docnum:"23121810880", fullName:"Zhao Guangyu",birthday: new Date("1979-03-02") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"ronaldozhao2021@gmail.com"});
db.shooters.insertOne({name:"Zhou Dongfeng", email:"23062124814@tpmonline.com.br", category:0, docnum:"23062124814", fullName:"Zhou Dongfeng",birthday: new Date("1976-12-25") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"zhodongfeng652@gmail.com"});
db.shooters.insertOne({name:"Zhuang Zhi Yong", email:"21766056830@tpmonline.com.br", category:0, docnum:"21766056830", fullName:"Zhuang Zhi Yong",birthday: new Date("1971-10-26") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"zhuangantonio@gmail.com"});
db.shooters.insertOne({name:"ZONGMIN SUN", email:"23483478817@tpmonline.com.br", category:0, docnum:"23483478817", fullName:"ZONGMIN SUN",birthday: new Date("1975-06-16") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"hadbrasil@gmail.com"});
db.shooters.insertOne({name:"Zucai Huang", email:"24090834805@tpmonline.com.br", category:0, docnum:"24090834805", fullName:"Zucai Huang",birthday: new Date("1981-02-12") ,sex:"M",cr:"",crEndDate: new Date("1980-01-01") ,SH_email:"yu546633@gmail.com"});

// --------=======================================

db.shooters.updateOne({docnum:"28727888835"},{$set: { phone:"+55 (11) 993745801" ,rg: "35091283x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-18"), address: "Avenida dos Remédios, 376, ap 111, Jardim Belaura" , zip_code: "05107000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28175892897"},{$set: { phone:"+55 (47) 991075526" ,rg: "29200074-1", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-23"), address: "Rua Francisco Bernardo Boticher, 124, CASA, Santa Catarina" , zip_code: "89212700" , city: "Joinville"}});
db.shooters.updateOne({docnum:"39660235801"},{$set: { phone:"+55 (11) 982846969" ,rg: "329620009", rg_issuer: "", tpm_filiation_dt: new Date("2022-08-24"), address: "Rua Ministro Godói, 255, ap 203, Perdizes" , zip_code: "05015000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"89986350468"},{$set: { phone:"+55 (11) 953383603" ,rg: "286133994", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-15"), address: "Rua Batista Parente, 92, Alto do Pari" , zip_code: "03022080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25445967832"},{$set: { phone:"+55 (11) 982020740" ,rg: "307168268", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-14"), address: "Rua Jerônimo de Albuquerque, 145, Cambuci" , zip_code: "01520020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31766246893"},{$set: { phone:"+55 (11) 969177947" ,rg: "2818049877", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-02-20"), address: "Rua Epiacaba, 205, Parque Fongaro" , zip_code: "04257145" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"08631286885"},{$set: { phone:"+55 (11) 932901967" ,rg: "16515581-4", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-06-19"), address: "Avenida Paes de Barros, 147, AP 63, Mooca" , zip_code: "03115020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38189613871"},{$set: { phone:"+55 (00) 000000000" ,rg: "428803490", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-09"), address: "Rua Pau Brasil, 749, Jardim Ipê" , zip_code: "09390420" , city: "Mauá"}});
db.shooters.updateOne({docnum:"23606386885"},{$set: { phone:"+55 (11) 982465495" ,rg: "503851954", rg_issuer: "", tpm_filiation_dt: new Date("2022-08-19"), address: "Rua Voluntários da Pátria, 3851, ap 152, Santana" , zip_code: "02401300" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23408736812"},{$set: { phone:"+55 (11) 981504788" ,rg: "V608663T", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-02"), address: "Rua Cajuru, 74, TOR A AP 157, Belenzinho" , zip_code: "03057000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26872973803"},{$set: { phone:"+55 (11) 940397119" ,rg: "32633672", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-23"), address: "Rua Francisca Manrique Guerra, 222, casa b, Jardim dos Ipês" , zip_code: "08161440" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29914502822"},{$set: { phone:"+55 (11) 963630468" ,rg: "352457429", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-03"), address: "Rua Braga, 202, Vila Lusitânia" , zip_code: "09725160" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"31459766806"},{$set: { phone:"+55 (11) 956383642" ,rg: "37285085", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-03"), address: "Rua Arinaia, 312, APTO 71, Belenzinho" , zip_code: "03171040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01302641808"},{$set: { phone:"+55 (00) 000000000" ,rg: "14025144", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-23"), address: "Rua Professor João de Oliveira Torres, 440, apto 311, Jardim Anália Franco" , zip_code: "03337010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29211673879"},{$set: { phone:"+55 (11) 972470824" ,rg: "324933162", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-20"), address: "Rua Francisco Retti, 258, Vila Oratório" , zip_code: "03189140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"56349220110"},{$set: { phone:"+55 (19) 981112322" ,rg: "298454063", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-05-20"), address: "Avenida Synesio Siqueira, 111, CA 32, Fazenda São Quirino" , zip_code: "13091705" , city: "Campinas"}});
db.shooters.updateOne({docnum:"39026740832"},{$set: { phone:"+55 (11) 977353679" ,rg: "492451540", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-20"), address: "Rua Tenente Godofredo Cerqueira Leite, 328, A CS 01, Fazenda da Juta" , zip_code: "03977000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41577835816"},{$set: { phone:"+55 (11) 956608748" ,rg: "486886098", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-19"), address: "Rua Cesário Alves Pinto, 76, Centro" , zip_code: "07600276" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"15465427876"},{$set: { phone:"+55 (11) 975001030" ,rg: "22241207-0", rg_issuer: "Ssp-sp", tpm_filiation_dt: new Date("2024-05-18"), address: "Rua Maria de Castro Salveri, 65, Casa, Vale Verde" , zip_code: "13279040" , city: "Valinhos"}});
db.shooters.updateOne({docnum:"26359269805"},{$set: { phone:"+55 (11) 976059385" ,rg: "25724471-2", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-09-21"), address: "Alameda Julieta, 540, Tamboré" , zip_code: "06544620" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"03897802600"},{$set: { phone:"+55 (31) 999966629" ,rg: "Mg10843769", rg_issuer: "Sspmg", tpm_filiation_dt: new Date("2024-04-27"), address: "Rua Glória, 33, Casa, Rio Negro" , zip_code: "34700150" , city: "Sabará"}});
db.shooters.updateOne({docnum:"26804402855"},{$set: { phone:"+55 (11) 967917115" ,rg: "262572436", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-07"), address: "Rua Isaac Krasilchik, 88, TOR B APTO 154 ED BTEVI, Água Branca" , zip_code: "05036165" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26565022844"},{$set: { phone:"+55 (11) 985720891" ,rg: "35026104", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-02-16"), address: "Rua Santo Antônio, 597, edi broad ap 53, Bela Vista" , zip_code: "01314000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30499067827"},{$set: { phone:"+55 (11) 982750378" ,rg: "245644398", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-12"), address: "Rua Simão Dias da Fonseca, 94, Cambuci" , zip_code: "01539020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28699059809"},{$set: { phone:"+55 (11) 1430249" ,rg: "271558234", rg_issuer: "", tpm_filiation_dt: new Date("2023-12-28"), address: "Rua Galeão, 436, B, Vila Nova" , zip_code: "03288000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29668894898"},{$set: { phone:"+55 (11) 111111111" ,rg: "250117113", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Avenida Giovanni Gronchi, 5441, 102, Vila Andrade" , zip_code: "05724002" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28306471814"},{$set: { phone:"+55 (11) 972886911" ,rg: "28470457", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-09"), address: "Rua General Isidoro Dias Lopes, 605, Vila Amália (Zona Norte)" , zip_code: "02618290" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26501329817"},{$set: { phone:"+55 (11) 982256679" ,rg: "283865581", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-03"), address: "Rua Amadeu Simei, 21, Vila Prel" , zip_code: "05780230" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"08022292982"},{$set: { phone:"+55 (47) 996416711" ,rg: "6019136", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-03"), address: "Rua Elisa Sophia Kohler Salfer, 58, João Costa" , zip_code: "89209510" , city: "Joinville"}});
db.shooters.updateOne({docnum:"35349035878"},{$set: { phone:"+55 (11) 986536131" ,rg: "443355538", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-18"), address: "Rua Domingos Pires Brito, 130, Vila Central" , zip_code: "03262030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27534573874"},{$set: { phone:"+55 (11) 950596727" ,rg: "29577568", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "AV COLINIA, 33, Centro" , zip_code: "07600000" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"16243731863"},{$set: { phone:"+55 (19) 996348299" ,rg: "234627293", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-10"), address: "kkkkkkkkkkkkk, 0000, Centro" , zip_code: "00000000" , city: "Álvaro de Carvalho"}});
db.shooters.updateOne({docnum:"06914706930"},{$set: { phone:"+55 (45) 998350587" ,rg: "9.507.244-5", rg_issuer: "SESP/PR", tpm_filiation_dt: new Date("2024-04-30"), address: "Avenida Assunção, 1502, subsolo, Centro" , zip_code: "85805030" , city: "Cascavel"}});
db.shooters.updateOne({docnum:"43230443802"},{$set: { phone:"+55 (11) 957791118" ,rg: "47827256X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-03"), address: "Rua Diogo Antônio Feijó, 889, apto 36, km 18" , zip_code: "06114026" , city: "Osasco"}});
db.shooters.updateOne({docnum:"36461802851"},{$set: { phone:"+55 (11) 947535456" ,rg: "495534134", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-12"), address: "Rua Presidente Horácio Vasquez, 217, Vila Paranaguá" , zip_code: "03808150" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37818394869"},{$set: { phone:"+55 (15) 996917810" ,rg: "368006633", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-15"), address: "Rua Ricardo Avenarius, 910, Paraisópolis" , zip_code: "05665020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27355614886"},{$set: { phone:"+55 (11) 111111111" ,rg: "15420139", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-09-12"), address: "Avenida Jamaris, 660, 131, Planalto Paulista" , zip_code: "04078001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22163041824"},{$set: { phone:"+55 (11) 976032493" ,rg: "272458922", rg_issuer: "ssp-sp", tpm_filiation_dt: new Date("2024-05-25"), address: "Rua Conselheiro Fernandes Torres, 50, ap 121, Pacaembu" , zip_code: "01235020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22143576889"},{$set: { phone:"+55 (11) 982420925" ,rg: "29441799", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-05"), address: "Rua Inocêncio Nogueira, 115, casa 1, Cidade Jardim" , zip_code: "05676030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22083853814"},{$set: { phone:"+55 (11) 993437732" ,rg: "21.932.191-8", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-09-11"), address: "Rua Barra do Una, 237, CASA, Jardim Portal da Colina" , zip_code: "13478549" , city: "Americana"}});
db.shooters.updateOne({docnum:"27534632803"},{$set: { phone:"+55 (11) 972702570" ,rg: "291008707", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-19"), address: "Rua Padre Leonel Franca, 640, Vila Libanesa" , zip_code: "03193070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33147715841"},{$set: { phone:"+55 (11) 996008141" ,rg: "338369697", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-06-19"), address: "Avenida Professora Virgília Rodrigues Alves de Carvalho Pinto, 22, Apart 138 - Torre 1, Jardim Leonor Mendes de Barros" , zip_code: "02346000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14736785870"},{$set: { phone:"+55 (11) 30623234" ,rg: "24106172-6", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-05-22"), address: "Rua Ilhéus, 113, 113, Sumaré" , zip_code: "01251030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39686202838"},{$set: { phone:"+55 (11) 971787111" ,rg: "33048958", rg_issuer: "", tpm_filiation_dt: new Date("2022-09-29"), address: "Rua Maranhão, 43, ap 41, Higienópolis" , zip_code: "01240001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"10300700830"},{$set: { phone:"+55 (11) 980436679" ,rg: "17962268", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-08"), address: "Rua Jacob Daldão, 71, Santana" , zip_code: "02019055" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36922988892"},{$set: { phone:"+55 (11) 981003200" ,rg: "43971055", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-19"), address: "Avenida Mofarrej, 1500, Vila Leopoldina" , zip_code: "05311000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"43091492869"},{$set: { phone:"+55 (00) 000000000" ,rg: "355077589", rg_issuer: "", tpm_filiation_dt: new Date("2024-02-28"), address: "Rua Bétula Negra, 298, CS 02, Jardim Camargo Novo" , zip_code: "08141630" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29151866854"},{$set: { phone:"+55 (00) 000000000" ,rg: "36142222", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-07"), address: "Rua Ministro Heitor Bastos Tigre, 52, Jardim Monte Kemel" , zip_code: "05634060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24028434890"},{$set: { phone:"+55 (11) 977894417" ,rg: "F0392718", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-10-24"), address: "Rua Frei Caneca, 640, ED NATUR AP71, Consolação" , zip_code: "01307000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02964444056"},{$set: { phone:"+55 (47) 992405822" ,rg: "8096758027", rg_issuer: "SSP/RS", tpm_filiation_dt: new Date("2024-07-17"), address: "442, 1400, MORRETES" , zip_code: "88220000" , city: "Itapema"}});
db.shooters.updateOne({docnum:"33069334814"},{$set: { phone:"+55 (11) 972702570" ,rg: "361422015", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Avenida Giovanni Gronchi, 5441, apt 102, Vila Andrade" , zip_code: "05724003" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"19179536824"},{$set: { phone:"+55 (11) 960634143" ,rg: "290311243", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-26"), address: "Rua Comediante Zacarias, 24, cs 2, Jardim São Roque" , zip_code: "05736200" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16596821854"},{$set: { phone:"+55 (11) 989887425" ,rg: "232498969", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-31"), address: "Rua Galeão, 333, Vila Nova" , zip_code: "03288000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"96512997891"},{$set: { phone:"+55 (19) 999121512" ,rg: "101858243", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "Rua Chafia Chaib Baracat, 140, Vila Bianchi" , zip_code: "13830032" , city: "Santo Antônio de Posse"}});
db.shooters.updateOne({docnum:"19527017831"},{$set: { phone:"+55 (11) 976540643" ,rg: "234163793", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-07"), address: "Rua Antonio da Cunha Lobo, 39, lote 39 quadra b, Jundiaizinho (Terra Preta)" , zip_code: "07664220" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"02330397836"},{$set: { phone:"+55 (11) 981403944" ,rg: "131190039", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-19"), address: "Avenida Matapi, 40, BL A AP 902, Jardim Santa Terezinha (Zona Leste)" , zip_code: "03572130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07494333886"},{$set: { phone:"+55 (11) 985599595" ,rg: "17482361", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-26"), address: "Rua Cândido Portinari, 396, Horizontal Park" , zip_code: "06710795" , city: "Cotia"}});
db.shooters.updateOne({docnum:"05594696830"},{$set: { phone:"+55 (11) 111111111" ,rg: "195383047", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-29"), address: "Avenida Francisco Conde, 148, Vila Rosália" , zip_code: "07070010" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"23430452830"},{$set: { phone:"+55 (11) 985899016" ,rg: "49.187.511-3", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-31"), address: "Avenida Aldino Pinotti, 500, tor 1 apto 283, Centro" , zip_code: "09750220" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"37075736809"},{$set: { phone:"+55 (11) 973078047" ,rg: "362438110", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-19"), address: "Rua Aluísio Azevedo, 345, Santana" , zip_code: "02021030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"66747422368"},{$set: { phone:"+55 (00) 000000000" ,rg: "370737866", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-10"), address: "Rua João Antônio de Oliveira, 1228, apto 133 BL 2, Mooca" , zip_code: "03111001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25341333810"},{$set: { phone:"+55 (11) 982838275" ,rg: "26698643", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-13"), address: "Rua Albury, 192, Jardim Aricanduva" , zip_code: "03456020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29860648840"},{$set: { phone:"+55 (11) 919455428" ,rg: "361710008", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-01"), address: "Praça Delgado Arouche, 12, Alto da Mooca" , zip_code: "03183090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"82235783872"},{$set: { phone:"+55 (19) 993480084" ,rg: "7.296.459-5", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-05-02"), address: "Rua Benedito Dutra Teixeira, 769, Centro" , zip_code: "13400720" , city: "Piracicaba"}});
db.shooters.updateOne({docnum:"06451022888"},{$set: { phone:"+55 (11) 982850037" ,rg: "16601756", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-05-28"), address: "Alameda Ipê, 377, Rancho Grande" , zip_code: "07606452" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"42950424805"},{$set: { phone:"+55 (11) 997462316" ,rg: "466106166", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-24"), address: "Área Rural, 548, Área Rural de Orindiúva" , zip_code: "15489899" , city: "Orindiúva"}});
db.shooters.updateOne({docnum:"37746409806"},{$set: { phone:"+55 (11) 991450630" ,rg: "383604722", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-29"), address: "Rua Luís Gonçalves, 106, Vila Santa Virginia" , zip_code: "03279180" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07764005681"},{$set: { phone:"+55 (31) 998660010" ,rg: "MG14879756", rg_issuer: "Sspmg", tpm_filiation_dt: new Date("2024-04-24"), address: "Rua Três, 82, APTO 109, Betim Industrial" , zip_code: "32671176" , city: "Betim"}});
db.shooters.updateOne({docnum:"44923823801"},{$set: { phone:"+55 (11) 947651745" ,rg: "453831886", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-26"), address: "Rua José Luiz Nascimento, 420, São Paulo II" , zip_code: "06706083" , city: "Cotia"}});
db.shooters.updateOne({docnum:"38219782870"},{$set: { phone:"+55 (11) 964538923" ,rg: "466494671", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-04"), address: "Rua Adolfo Bezerra de Menezes, 335, Vila Bancária" , zip_code: "03918030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21465879897"},{$set: { phone:"+55 (11) 970458521" ,rg: "226211927", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-21"), address: "Rua Tenente Gelás, 252, ap 103 tor b, Tatuapé" , zip_code: "03090030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22670578837"},{$set: { phone:"+55 (11) 995206610" ,rg: "33581004", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-27"), address: "Rua Celso de Azevedo Marques, 361, Parque da Mooca" , zip_code: "03122010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36027450827"},{$set: { phone:"+55 (11) 942242828" ,rg: "236376640", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-01"), address: "Rua Ivaí, 277, apto 1906, Tatuapé" , zip_code: "03080010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39631080889"},{$set: { phone:"+55 (00) 000000000" ,rg: "461816611", rg_issuer: "ssp", tpm_filiation_dt: new Date("2023-07-04"), address: "Travessa Pasteur, 599, Vila Júlia" , zip_code: "08551030" , city: "Poá"}});
db.shooters.updateOne({docnum:"75698692149"},{$set: { phone:"+55 (11) 981196208" ,rg: "v606828x", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-02-24"), address: "Rua Hannemann, 465, 12, Canindé" , zip_code: "03031040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"43001510838"},{$set: { phone:"+55 (11) 994666538" ,rg: "42589463", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Rua Dona Rosina, 187, Perus" , zip_code: "05202120" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36558151820"},{$set: { phone:"+55 (11) 965936864" ,rg: "44671915", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-09"), address: "Rua Nhandeara, 161, Vila Carrão" , zip_code: "03424040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32980881880"},{$set: { phone:"+55 (11) 993998996" ,rg: "44219530", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2022-12-09"), address: "Avenida Padre Arlindo Vieira, 214, TOR A APTO 73, Vila Vermelha" , zip_code: "04297000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14742074807"},{$set: { phone:"+55 (11) 999604904" ,rg: "22742294", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-12"), address: "Rua Públio Pimentel, 308, Americanópolis" , zip_code: "04408000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01076847803"},{$set: { phone:"+55 (11) 981758916" ,rg: "111901558", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-07"), address: "Rua Doutor Clóvis de Oliveira, 125, APTO81, Vila Progredior" , zip_code: "05616000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06927880852"},{$set: { phone:"+55 (11) 111111111" ,rg: "123248681", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-29"), address: "Rua Heitor Penteado, 250, APTO 24, Sumarezinho" , zip_code: "05438000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"20608763896"},{$set: { phone:"+55 (11) 94713486" ,rg: "258449263", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-24"), address: "Rua Almirante Matoso Maia, 77, Casa, Vila Ramos" , zip_code: "02760010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13016617838"},{$set: { phone:"+55 (11) 991431153" ,rg: "17562911", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-25"), address: "Rua Georgia, 1077, San Diego" , zip_code: "06738260" , city: "Vargem Grande Paulista"}});
db.shooters.updateOne({docnum:"22474272860"},{$set: { phone:"+55 (11) 993561894" ,rg: "442932194", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-02"), address: "Rua Doutor Dolzani, 141, APTO 22, Jardim da Glória" , zip_code: "01546000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03635167860"},{$set: { phone:"+55 (11) 999445995" ,rg: "99026703", rg_issuer: "ssp", tpm_filiation_dt: new Date("2022-11-04"), address: "Rua Ernesto Anuchi, 299, Jardim Residencial Maggiore" , zip_code: "14806434" , city: "Araraquara"}});
db.shooters.updateOne({docnum:"34470973882"},{$set: { phone:"+55 (11) 940328790" ,rg: "34902330x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-01"), address: "rua chile, 219, Centro" , zip_code: "07600000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22083676858"},{$set: { phone:"+55 (11) 981140304" ,rg: "329093277", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-08-03"), address: "Rua Padre João Manuel, 1230, apto 34, Cerqueira César" , zip_code: "01411000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33177055823"},{$set: { phone:"+55 (11) 947157545" ,rg: "306025711", rg_issuer: "", tpm_filiation_dt: new Date("2023-12-01"), address: "Rua Waldomiro Benedito Rego, 176, Reserva du Moullin" , zip_code: "11605503" , city: "São Sebastião"}});
db.shooters.updateOne({docnum:"25715811805"},{$set: { phone:"+55 (11) 947117005" ,rg: "225198836", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-26"), address: "Rua Ricardo Gumbleton Daunt, 273, Jardim Nice" , zip_code: "03905110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01308923430"},{$set: { phone:"+55 (11) 947492078" ,rg: "60455851", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-09"), address: "Rua Forte do Triunfo, 361, TOR 01 APTO 115, Parque São Lourenço" , zip_code: "08340146" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"18349106840"},{$set: { phone:"+55 (11) 973033389" ,rg: "278898853", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-30"), address: "Rua Passos, 283, Belenzinho" , zip_code: "03058010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"85491659487"},{$set: { phone:"+55 (00) 000000000" ,rg: "1649692", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Erva do Sereno, 525, cs 3, Jardim Maia" , zip_code: "08180010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32514074819"},{$set: { phone:"+55 (11) 998169833" ,rg: "434935293", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-21"), address: "Rua Visconde de Itaboraí, 290, cs 10, Centro" , zip_code: "09910520" , city: "Diadema"}});
db.shooters.updateOne({docnum:"34953443810"},{$set: { phone:"+55 (11) 972608382" ,rg: "347765117", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "RUA ANITA MALFATI, 991, LTG5 0, PORTAL DO SOL" , zip_code: "18120000" , city: "Mairinque"}});
db.shooters.updateOne({docnum:"00731627954"},{$set: { phone:"+55 (47) 988531565" ,rg: "V250145F", rg_issuer: "CGPI DIREX PF", tpm_filiation_dt: new Date("2024-08-08"), address: "Rua Marechal Hermes, 172, casa 7, Glória" , zip_code: "89217200" , city: "Joinville"}});
db.shooters.updateOne({docnum:"21890646865"},{$set: { phone:"+55 (11) 985802507" ,rg: "254096426", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-03-04"), address: "Avenida Edu Chaves, 639, ap 136, Parque Edu Chaves" , zip_code: "02229000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01425563864"},{$set: { phone:"+55 (11) 996332728" ,rg: "9540049", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-23"), address: "Alameda Santa Ana, 253, Jardim Theodora" , zip_code: "13301850" , city: "Itu"}});
db.shooters.updateOne({docnum:"10797206850"},{$set: { phone:"+55 (19) 992948169" ,rg: "119783149", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Américo de Campos, 313, Cidade Universitária" , zip_code: "13083040" , city: "Campinas"}});
db.shooters.updateOne({docnum:"70073984132"},{$set: { phone:"+55 (11) 986463831" ,rg: "V9504029", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-07-27"), address: "Rua Dias da Silva, 824, TOR A APTO 203, Vila Maria" , zip_code: "02114001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21983675806"},{$set: { phone:"+55 (11) 997229262" ,rg: "30482072", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-27"), address: "Avenida Nhandu, 627, Planalto Paulista" , zip_code: "04059001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23248188847"},{$set: { phone:"+55 (11) 982340666" ,rg: "V5093296", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "Rua José Antônio Coelho, 103, apto 253, Vila Mariana" , zip_code: "04011060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38588453886"},{$set: { phone:"+55 (11) 981568838" ,rg: "V3941630", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-15"), address: "Rua Borges de Figueiredo, 137, TOR 3 APTO 803 SICIL, Mooca" , zip_code: "03110010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15667149664"},{$set: { phone:"+55 (31) 993333392" ,rg: "MG19823207", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-05"), address: "Rua Ulisses Cruz, 668, TOR B AP 185, Tatuapé" , zip_code: "03077000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21770855866"},{$set: { phone:"+55 (11) 963699999" ,rg: "Y239419L", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-04-01"), address: "Rua Barão de Duprat, 449, Centro" , zip_code: "01023001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23620522812"},{$set: { phone:"+55 (11) 987115112" ,rg: "V9472538", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-06-11"), address: "Rua Humberto Brochini, 192, Jardim Bela Vista" , zip_code: "07133000" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"23780834839"},{$set: { phone:"+55 (11) 953777777" ,rg: "G088753", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-19"), address: "Rua Catumbi, 1077, apto 1809, Catumbi" , zip_code: "03021000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13195706822"},{$set: { phone:"+55 (11) 999998761" ,rg: "222909560", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Dona Salwa Saigh Calfat, 135, Vila Tramontano" , zip_code: "05691050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22114692809"},{$set: { phone:"+55 (11) 947190608" ,rg: "280162200", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-10"), address: "Rua Godói Colaço, 154, Vila Cordeiro" , zip_code: "04582030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"08933729860"},{$set: { phone:"+55 (11) 948233974" ,rg: "14818532-0", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-09-09"), address: "Rua Roger Zmekhol, 86, Jardim Colombo" , zip_code: "05629030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26088419881"},{$set: { phone:"+55 (11) 967977084" ,rg: "248859663", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-15"), address: "Rua Urbano do Couto, 153, Alto da Mooca" , zip_code: "03183080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26197838877"},{$set: { phone:"+55 (11) 000000000" ,rg: "27893923", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Pedro Álvarez Cabral, 91, Aviação" , zip_code: "11702780" , city: "Praia Grande"}});
db.shooters.updateOne({docnum:"08027195705"},{$set: { phone:"+55 (19) 999121167" ,rg: "278738977", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-30"), address: "Rua Masato Sakai, 180, Jardim São Miguel" , zip_code: "08538300" , city: "Ferraz de Vasconcelos"}});
db.shooters.updateOne({docnum:"73410845704"},{$set: { phone:"+55 (17) 981250027" ,rg: "10965278", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-11"), address: "Rua Ravenna, 65, apto 81 - bl 2, Engordadouro" , zip_code: "13214670" , city: "Jundiaí"}});
db.shooters.updateOne({docnum:"27030047885"},{$set: { phone:"+55 (11) 947417436" ,rg: "221726354", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-18"), address: "Rua Abaiú, 183, Vila Macedópolis" , zip_code: "03237040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"42184111821"},{$set: { phone:"+55 (11) 960946564" ,rg: "480850033", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-10"), address: "Rua Humberto I, 962, apto 21 LUCI, Vila Mariana" , zip_code: "04018033" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"46014316892"},{$set: { phone:"+55 (00) 000000000" ,rg: "506425290", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-02"), address: "Rua Doutor José Augusto de Souza e Silva, 189, Jardim Parque Morumbi" , zip_code: "05712040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"05236477948"},{$set: { phone:"+55 (47) 988351070" ,rg: "3824729", rg_issuer: "Sspsc", tpm_filiation_dt: new Date("2024-07-27"), address: "Rua Irineu Bomkowski, 16, Vila Nova" , zip_code: "89237016" , city: "Joinville"}});
db.shooters.updateOne({docnum:"23378539852"},{$set: { phone:"+55 (35) 988862888" ,rg: "v601617y", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-10-24"), address: "Rua Carlos de Sousa Nazaré, 267, ap 64, Centro" , zip_code: "01025001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07936657100"},{$set: { phone:"+55 (11) 961965567" ,rg: "G379095N", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-24"), address: "Avenida Celso Garcia, 1907, AP 133 BL 15, Brás" , zip_code: "03015000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"18166211882"},{$set: { phone:"+55 (00) 000000000" ,rg: "268707157", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-06"), address: "Rua Shobee Kumagai, 429, cs3, Jardim Belém" , zip_code: "03809020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27030214889"},{$set: { phone:"+55 (19) 988093532" ,rg: "294230026", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-28"), address: "Avenida Ferdinando Viacava, 873, CASA E9, João Aranha" , zip_code: "13145670" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"85113077968"},{$set: { phone:"+55 (11) 947221761" ,rg: "214639678", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-15"), address: "Rua Almerindo Alziro Paganini, 306, Jardim Popular" , zip_code: "03671000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12420140800"},{$set: { phone:"+55 (11) 999889899" ,rg: "41211996", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-11"), address: "Alameda Juriti, 983, CS 1, Alphaville" , zip_code: "06540050" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"32347632833"},{$set: { phone:"+55 (11) 942101766" ,rg: "288588241", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-26"), address: "Rua João da Costa, 52, Mooca" , zip_code: "03168050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24735674845"},{$set: { phone:"+55 (11) 999511321" ,rg: "277463488", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Avenida A, 1075, São Venâncio" , zip_code: "13296354" , city: "Itupeva"}});
db.shooters.updateOne({docnum:"86260910959"},{$set: { phone:"+55 (47) 991134887" ,rg: "57668938", rg_issuer: "SSP PR", tpm_filiation_dt: new Date("2024-09-09"), address: "Rua General Polidoro, 70, ap 501, Santo Antônio" , zip_code: "89218010" , city: "Joinville"}});
db.shooters.updateOne({docnum:"22824942886"},{$set: { phone:"+55 (11) 999673552" ,rg: "443703462", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-29"), address: "Avenida Bartholomeu de Carlos, 901, apto 403 inga, Jardim Flor da Montanha" , zip_code: "07097420" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"24861587824"},{$set: { phone:"+55 (11) 992173420" ,rg: "151107889", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-08-26"), address: "Praça Princesa Isabel, 84, AP 21, Campos Elíseos" , zip_code: "01206010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39231604880"},{$set: { phone:"+55 (11) 958655199" ,rg: "472192358", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-21"), address: "Rua Rosas de Maio, 172, Altos de Vila Prudente" , zip_code: "03978760" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37491055885"},{$set: { phone:"+55 (11) 11000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-06-27"), address: "RUA TUITI, 2672, TATUAPE" , zip_code: "26720330" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15311063823"},{$set: { phone:"+55 (11) 998779497" ,rg: "14209999", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-04"), address: "alameda pinhal, 80, Centro" , zip_code: "07600000" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"35132306802"},{$set: { phone:"+55 (11) 982463366" ,rg: "36.560.549-9", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Avenida Doutor Silva Melo, 520, Ed Negro apto 806, Jardim Taquaral" , zip_code: "04675010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39987199895"},{$set: { phone:"+55 (00) 000000000" ,rg: "502577320", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-16"), address: "Rua Danaides, 53, apto 86, Vila Anhangüera" , zip_code: "04673180" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"17096270850"},{$set: { phone:"+55 (11) 47157416" ,rg: "241462149", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-20"), address: "Avenida José Dini, 400, APTO 141 BL3, Chácara Agrindus" , zip_code: "06763015" , city: "Taboão da Serra"}});
db.shooters.updateOne({docnum:"39984659879"},{$set: { phone:"+55 (11) 946413484" ,rg: "46533376", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-02"), address: "Rua Luiz Gomes, 99, Parque Santos Dumont" , zip_code: "07152140" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"24593421870"},{$set: { phone:"+55 (11) 992749733" ,rg: "11992749733", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-24"), address: "Rua Conselheiro Brotero, 1273, BL 1 APT81, Santa Cecília" , zip_code: "01232011" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33007337828"},{$set: { phone:"+55 (00) 000000000" ,rg: "42940008", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-27"), address: "Rua Novo Horizonte, 2357, CS1, Cidade Antônio Estevão de Carvalho" , zip_code: "08226027" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31503803830"},{$set: { phone:"+55 (11) 982838585" ,rg: "341408888", rg_issuer: "", tpm_filiation_dt: new Date("2022-08-02"), address: "Rua José de Miranda, 6, Vila Invernada" , zip_code: "03349060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"05281607960"},{$set: { phone:"+55 (47) 996099777" ,rg: "45777080", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-08"), address: "Rua Mário Luiz Garcia Filho, 73, Petrópolis" , zip_code: "89208620" , city: "Joinville"}});
db.shooters.updateOne({docnum:"22530774889"},{$set: { phone:"+55 (19) 974189696" ,rg: "169198819", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua José Leblon Canhestro, 34, Vila Monte Alegre" , zip_code: "13142466" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"05567757590"},{$set: { phone:"+55 (11) 937223611" ,rg: "48190471", rg_issuer: "", tpm_filiation_dt: new Date("2022-07-20"), address: "Avenida Doutor Bernardino Brito Fonseca de Carvalho, 1773, AP 71 AN 7 BL 3, Vila Talarico" , zip_code: "03535000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37949450851"},{$set: { phone:"+55 (11) 941369324" ,rg: "494017284", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-06"), address: "Rua Mineradora de Diamantina, 227, Cidade Continental" , zip_code: "03243010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"10443036705"},{$set: { phone:"+55 (11) 982406411" ,rg: "68256770x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-17"), address: "Rua José Maria Lisboa, 695, ap 92, Jardim Paulista" , zip_code: "01423001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39582827840"},{$set: { phone:"+55 (19) 991960889" ,rg: "474831309", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-05-24"), address: "Rua Engenheiro Augusto de Figueiredo, 437, ap 133c, Vila Progresso" , zip_code: "13045906" , city: "Campinas"}});
db.shooters.updateOne({docnum:"26232673832"},{$set: { phone:"+55 (11) 940152667" ,rg: "257076682", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-24"), address: "Rua José Ariza, 95, A 42, Conjunto Residencial José Bonifácio" , zip_code: "08255015" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22085716814"},{$set: { phone:"+55 (11) 949429158" ,rg: "v4483325", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-24"), address: "Avenida Lins de Vasconcelos, 3111, 53 ba, Vila Mariana" , zip_code: "04112012" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24115342803"},{$set: { phone:"+55 (41) 981486010" ,rg: "F039935L", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-26"), address: "RUA NOVE DE JULHO, 77, Centro" , zip_code: "17280000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22533765821"},{$set: { phone:"+55 (11) 959332129" ,rg: "33454761", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-12"), address: "Rua Sargento Siqueira, 35, Vila Santa Terezinha (Zona Norte)" , zip_code: "02271060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37206456812"},{$set: { phone:"+55 (11) 981140304" ,rg: "44829521", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-11"), address: "Rua Deodoro, 257, Vila Nova" , zip_code: "06420020" , city: "Barueri"}});
db.shooters.updateOne({docnum:"07443672632"},{$set: { phone:"+55 (31) 995064582" ,rg: "mg13647641", rg_issuer: "ssp mg", tpm_filiation_dt: new Date("2024-05-11"), address: "Rua Babel, 106, casa, Glória" , zip_code: "30880150" , city: "Belo Horizonte"}});
db.shooters.updateOne({docnum:"93466633087"},{$set: { phone:"+55 (47) 999571558" ,rg: "2068342209", rg_issuer: "SSP RS", tpm_filiation_dt: new Date("2024-07-27"), address: "Rua 278, 764, apto 201, Meia Praia" , zip_code: "88220000" , city: "Itapema"}});
db.shooters.updateOne({docnum:"35250422802"},{$set: { phone:"+55 (00) 000000000" ,rg: "343441925", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-20"), address: "Rua Vere, 24, Vila Carioca" , zip_code: "07083040" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"22480568857"},{$set: { phone:"+55 (00) 000000000" ,rg: "36114574", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-30"), address: "Rua Quirino Atanasio, 226, lote 13 Cond Village- Bro Carijo I, Centro" , zip_code: "11990000" , city: "Cananéia"}});
db.shooters.updateOne({docnum:"40472218808"},{$set: { phone:"+55 (19) 982667411" ,rg: "52470109-x", rg_issuer: "Sp", tpm_filiation_dt: new Date("2024-05-20"), address: "Rua Eliane Trabulsi Valente, 426, Jardim São Cristóvão" , zip_code: "13056272" , city: "Campinas"}});
db.shooters.updateOne({docnum:"03609961830"},{$set: { phone:"+55 (11) 996904580" ,rg: "106051507", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-26"), address: "Praça Monza, 309, Alphaville" , zip_code: "06544050" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"88764389715"},{$set: { phone:"+55 (11) 947812307" ,rg: "321955298", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-28"), address: "Rua do Bosque, 1621, conj 204, Barra Funda" , zip_code: "01136001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"19855736877"},{$set: { phone:"+55 (11) 994840335" ,rg: "273962772", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-16"), address: "Rua São José do Belmonte, 521, Vila Sílvia" , zip_code: "03820110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35270437805"},{$set: { phone:"+55 (00) 000000000" ,rg: "443098530", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-28"), address: "Rua Francisco de Camargo Pinto, 2320, Capão Raso" , zip_code: "81150090" , city: "Curitiba"}});
db.shooters.updateOne({docnum:"02181046859"},{$set: { phone:"+55 (00) 000000000" ,rg: "60121907", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-23"), address: "Avenida Angélica, 1380, apto 202, Higienópolis" , zip_code: "01228100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30227581890"},{$set: { phone:"+55 (11) 000000000" ,rg: "347738527", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-08"), address: "Rua Tomé Monteiro de Fana, 536, cs 3, Parque Boturussu" , zip_code: "03805040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30960691820"},{$set: { phone:"+55 (11) 43067000" ,rg: "249807038", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Rua Doutor Luiz Migliano, 631, ap 11, Jardim Vazani" , zip_code: "05711000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14742540808"},{$set: { phone:"+55 (11) 999198866" ,rg: "242812478", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-29"), address: "Avenida da Barreira Grande, 1088, CASA 02, Vila Bancária" , zip_code: "03916000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13293668836"},{$set: { phone:"+55 (11) 981227520" ,rg: "115667829", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-28"), address: "Rua Ilhéus, 113, Sumaré" , zip_code: "01251030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"09074085830"},{$set: { phone:"+55 (11) 000000000" ,rg: "10421797", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-18"), address: "Rua Charles Gomes de França, 355, Centro" , zip_code: "09910070" , city: "Diadema"}});
db.shooters.updateOne({docnum:"26136161800"},{$set: { phone:"+55 (11) 981310400" ,rg: "27238176", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Avenida César Puglia, 150, TORRE 1 AP 21, Jardim das Samambaias" , zip_code: "13211693" , city: "Jundiaí"}});
db.shooters.updateOne({docnum:"31543589863"},{$set: { phone:"+55 (11) 996617269" ,rg: "34879328", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-05"), address: "Rua Xavier de Almeida, 486, Ipiranga" , zip_code: "04211000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25210590801"},{$set: { phone:"+55 (11) 999196667" ,rg: "250850412", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-18"), address: "Praça Padre Mário Fontana, 94, AP 83 A, Parque da Mooca" , zip_code: "03127030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13026882860"},{$set: { phone:"+55 (11) 997804227" ,rg: "18702954-4", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Doutor Wilson Teixeira de Miranda, 131, Balneária" , zip_code: "09822310" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"19075262850"},{$set: { phone:"+55 (11) 999324180" ,rg: "254096414", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua Irmã Maria Amélia, 489, Vila Pirituba" , zip_code: "05172090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15761989875"},{$set: { phone:"+55 (11) 970413883" ,rg: "28156199", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-02"), address: "Alameda dos Araés, 1418, Planalto Paulista" , zip_code: "04066003" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16322443810"},{$set: { phone:"+55 (11) 947862209" ,rg: "16322443810", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-25"), address: "Avenida Flor de Vila Formosa, 708, Vila Formosa" , zip_code: "03366010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16301019822"},{$set: { phone:"+55 (11) 998346055" ,rg: "198500002", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-24"), address: "Rua Sepetiba, 1153, Siciliano" , zip_code: "05052000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27689076858"},{$set: { phone:"+55 (11) 998184487" ,rg: "209755039", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-07"), address: "Rua Bergamota, 470, apto 74 BLII, Alto da Lapa" , zip_code: "05468000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07666955812"},{$set: { phone:"+55 (11) 998100830" ,rg: "153546359", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-06-13"), address: "Rua João Faria da Cunha, 44, Jardim Florença" , zip_code: "13482211" , city: "Limeira"}});
db.shooters.updateOne({docnum:"31026255848"},{$set: { phone:"+55 (11) 975836028" ,rg: "35000440", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-27"), address: "Rua Serra de Botucatu, 2153, ap 114 bl 2, Chácara Califórnia" , zip_code: "03417000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27812363813"},{$set: { phone:"+55 (11) 976080780" ,rg: "225578049", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-09"), address: "Rua Marina Crespi, 118, bl c ap13, Mooca" , zip_code: "03112090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04021564632"},{$set: { phone:"+55 (61) 99192881" ,rg: "8298339", rg_issuer: "mg", tpm_filiation_dt: new Date("2024-04-03"), address: "Rua Doutor João Severiano Rodrigues da Cunha, 180, Conjunto Guanabara" , zip_code: "38080450" , city: "Uberaba"}});
db.shooters.updateOne({docnum:"02984958802"},{$set: { phone:"+55 (11) 974542877" ,rg: "10526406", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-26"), address: "Rua Baturité, 200, apto 92, Aclimação" , zip_code: "01530030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31202139850"},{$set: { phone:"+55 (11) 999784919" ,rg: "299159322", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-02"), address: "Avenida Paes de Barros, 1236, apto 102, Mooca" , zip_code: "03114000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03578270660"},{$set: { phone:"+55 (11) 947487125" ,rg: "347328489", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-13"), address: "Avenida Cásper Líbero, 534, Centro" , zip_code: "01033000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"54267765472"},{$set: { phone:"+55 (00) 000000000" ,rg: "32154571", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-11"), address: "Rua Pastoral, 252, Jardim Reimberg" , zip_code: "04845100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"47295414215"},{$set: { phone:"+55 (11) 994121645" ,rg: "28700398x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-22"), address: "Rua Tarapitinga, 417, Vila Jacuí" , zip_code: "08060300" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29933509861"},{$set: { phone:"+55 (11) 970500955" ,rg: "29452657", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-22"), address: "Rua Tocachi, 171, Vila Prudente" , zip_code: "03156230" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"69522243868"},{$set: { phone:"+55 (11) 947414975" ,rg: "77583528", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-26"), address: "Rua Abaiú, 191, Vila Macedópolis" , zip_code: "03237040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01912486571"},{$set: { phone:"+55 (11) 974479997" ,rg: "13460437", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-22"), address: "Rua Marquês de Itu, 95, apto 120, Vila Buarque" , zip_code: "01223001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35728534864"},{$set: { phone:"+55 (00) 000000000" ,rg: "44900974", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Rua da Independência, 460, APTO 83 - BL6, Paraisópolis" , zip_code: "05664015" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15380639801"},{$set: { phone:"+55 (11) 999788680" ,rg: "288741201", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-16"), address: "Rua Antônio Coruja, 166, ap 34, Bom Retiro" , zip_code: "01126030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30871353806"},{$set: { phone:"+55 (11) 940244500" ,rg: "42373108", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-29"), address: "Rua Godofredo Fraga, 10, TP 3C APTO 62, Marapé" , zip_code: "11070400" , city: "Santos"}});
db.shooters.updateOne({docnum:"66606322634"},{$set: { phone:"+55 (13) 981610869" ,rg: "4041456", rg_issuer: "mg", tpm_filiation_dt: new Date("2024-04-26"), address: "Rua Oswaldo Arouca, 507, ap 123, Vila Formosa" , zip_code: "03363000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"73063568953"},{$set: { phone:"+55 (47) 999110498" ,rg: "1496271", rg_issuer: "Sesp  Df", tpm_filiation_dt: new Date("2024-07-16"), address: "Rua 208, 90, sala 11, Meia Praia" , zip_code: "88220000" , city: "Itapema"}});
db.shooters.updateOne({docnum:"70508097304"},{$set: { phone:"+55 (00) 000000000" ,rg: "39794847", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-18"), address: "Rua Fim de Primavera, 167, Parque Arariba" , zip_code: "05778170" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03324118859"},{$set: { phone:"+55 (11) 111111111" ,rg: "111111111111111", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-09-10"), address: "Rua Luís Arnoni, 241, Vila Irmãos Arnoni" , zip_code: "02375110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15309962875"},{$set: { phone:"+55 (11) 942832016" ,rg: "263812029", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-29"), address: "Avenida da Barreira Grande, 1088, cs 2, Vila Bancária" , zip_code: "03916000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29789463855"},{$set: { phone:"+55 (11) 980644610" ,rg: "35308557", rg_issuer: "", tpm_filiation_dt: new Date("2023-12-15"), address: "Rua Goiânia, 17, Parque Represa Billings II" , zip_code: "09160250" , city: "Santo André"}});
db.shooters.updateOne({docnum:"05229639946"},{$set: { phone:"+55 (33) 624459132" ,rg: "53370406", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-18"), address: "Rua Doutor José Domingos Ruiz, 65, Chácara Mafalda" , zip_code: "03375050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21529292840"},{$set: { phone:"+55 (00) 000000000" ,rg: "340696175", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-10"), address: "Rua Adoniram Barbosa, 161, cs 02, Parque Imperial" , zip_code: "06462000" , city: "Barueri"}});
db.shooters.updateOne({docnum:"63073609172"},{$set: { phone:"+55 (47) 999236687" ,rg: "7330929", rg_issuer: "SSP SC", tpm_filiation_dt: new Date("2024-08-09"), address: "Rua 1950, 605, apto 1302, Centro" , zip_code: "88330472" , city: "Balneário Camboriú"}});
db.shooters.updateOne({docnum:"13036905863"},{$set: { phone:"+55 (11) 992020000" ,rg: "222414789", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-10"), address: "Rua Vieira de Almeida, 31, Ipiranga" , zip_code: "04268040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21317523857"},{$set: { phone:"+55 (11) 000000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-06-27"), address: "Rua José Benedito, 158, APTO 141, Parque Tietê" , zip_code: "02870130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15306931871"},{$set: { phone:"+55 (11) 999994666" ,rg: "234835643", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-09-10"), address: "Rua dos Democratas, 721, apto 22, Vila Monte Alegre" , zip_code: "04305000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28576871840"},{$set: { phone:"+55 (11) 111111111" ,rg: "21611889X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-19"), address: "Rua Antônio de Lucena, 22, TOR B1 PAINE AP 122, Chácara Califórnia" , zip_code: "03407050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13250042862"},{$set: { phone:"+55 (11) 981812663" ,rg: "198543293", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-12"), address: "Rua Edmundo Amaral Valente, 44, cs 22, Parque Munhoz" , zip_code: "05782400" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22244299830"},{$set: { phone:"+55 (11) 994541169" ,rg: "351918103", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-28"), address: "Rua Borges de Figueiredo, 137, bl 2 103, Mooca" , zip_code: "03110010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26457532802"},{$set: { phone:"+55 (11) 952883256" ,rg: "2665932766", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-12"), address: "Avenida Francisco Conde, 148, Vila Rosália" , zip_code: "07070010" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"31173536825"},{$set: { phone:"+55 (11) 999352623" ,rg: "233529901", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-15"), address: "Avenida Ômega, 219, Apto 172, Melville Empresarial I e II" , zip_code: "06472005" , city: "Barueri"}});
db.shooters.updateOne({docnum:"21618846892"},{$set: { phone:"+55 (19) 991110400" ,rg: "28.087.097-8", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-05-02"), address: "Rua São Salvador, 220, Apto 192 Aurora, Jardim Belo Horizonte" , zip_code: "13076540" , city: "Campinas"}});
db.shooters.updateOne({docnum:"23351310870"},{$set: { phone:"+55 (11) 959736666" ,rg: "V638614", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Borges de Figueiredo, 137, apto 603 tor 3, Mooca" , zip_code: "03110010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23297734809"},{$set: { phone:"+55 (11) 986896666" ,rg: "5518238", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "Rua Tabajaras, 100, 16a 18 blc ap 163, Mooca" , zip_code: "03121010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32398518817"},{$set: { phone:"+55 (11) 999674788" ,rg: "322606433", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-29"), address: "Avenida Bartholomeu de Carlos, 901, apto 403 inga, Jardim Flor da Montanha" , zip_code: "07097420" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"36780445819"},{$set: { phone:"+55 (11) 974747356" ,rg: "436545792", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-03"), address: "Rua Luís Pinto, 277, Vila Carrão" , zip_code: "03427000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28076340870"},{$set: { phone:"+55 (00) 000000000" ,rg: "308936851", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-16"), address: "Avenida Palmira Rossi, 3599, Recreio São Jorge" , zip_code: "07144170" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"09692778738"},{$set: { phone:"+55 (92) 93163323" ,rg: "129620092", rg_issuer: "DIC /RJ", tpm_filiation_dt: new Date("2024-07-23"), address: "Rua São João Batista, 175, CA 1, Centro" , zip_code: "25515520" , city: "São João de Meriti"}});
db.shooters.updateOne({docnum:"26492409892"},{$set: { phone:"+55 (11) 992585915" ,rg: "247304992", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-18"), address: "Rua Lino Coutinho, 75, APTO 94 TR JARDINS, Ipiranga" , zip_code: "04207000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16927853898"},{$set: { phone:"+55 (11) 996425429" ,rg: "22693914", rg_issuer: "Detran", tpm_filiation_dt: new Date("2024-07-18"), address: "Alameda Merlot, 87, Tamboré" , zip_code: "06458275" , city: "Barueri"}});
db.shooters.updateOne({docnum:"17911539847"},{$set: { phone:"+55 (11) 954855150" ,rg: "23.232.109-7", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-10"), address: "RUA SANTA IZABEL, 137, Vila Augusta" , zip_code: "07023022" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"31352687801"},{$set: { phone:"+55 (11) 944691030" ,rg: "43.282.563-0", rg_issuer: "ssp", tpm_filiation_dt: new Date("2022-12-09"), address: "Avenida Fulfaro, 230, CS1, Vila Clara" , zip_code: "04414200" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04742459423"},{$set: { phone:"+55 (11) 984010141" ,rg: "286217302", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-18"), address: "Rua Dona Ana Neri, 581, APTO 51 TOR C, Cambuci" , zip_code: "01522000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"42223704875"},{$set: { phone:"+55 (11) 964600485" ,rg: "502280359", rg_issuer: "Ssp", tpm_filiation_dt: new Date("2024-08-15"), address: "Rua Afonso Braz, 155, Apto 131, Vila Nova Conceição" , zip_code: "04511010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33658990813"},{$set: { phone:"+55 (00) 000000000" ,rg: "301465769", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-17"), address: "Rua Antônio Tertuliano, 156, Parque Boturussu" , zip_code: "03804030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26858316817"},{$set: { phone:"+55 (11) 952463107" ,rg: "263143156", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-14"), address: "Rua Bartolomeu Quadros, 36, Vila Mesquita" , zip_code: "03714000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28105339897"},{$set: { phone:"+55 (19) 988343590" ,rg: "290337057", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-05-14"), address: "Avenida Constante Pavan, 2060, ca 51, Betel" , zip_code: "13148198" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"21439897840"},{$set: { phone:"+55 (11) 996236363" ,rg: "25603751", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-19"), address: "Avenida Engenheiro Eusébio Stevaux, 272, Jurubatuba" , zip_code: "04696000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"05943034862"},{$set: { phone:"+55 (11) 992523788" ,rg: "11794836/6", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-02"), address: "Rua Morgado de Mateus, 340, Apt 122, Vila Mariana" , zip_code: "04015050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36465419890"},{$set: { phone:"+55 (00) 000000000" ,rg: "35584393", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-20"), address: "Rua Viriato Correia, 283, Paraisópolis" , zip_code: "05656040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23709464820"},{$set: { phone:"+55 (11) 999465990" ,rg: "27775161", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-07"), address: "Rua Francisca Júlia, 360, Santana" , zip_code: "02403011" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21391762860"},{$set: { phone:"+55 (11) 29798501" ,rg: "248098093", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-27"), address: "Rua Voluntários da Pátria, 2787, apto 171, Santana" , zip_code: "02401100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"88557340320"},{$set: { phone:"+55 (11) 940838787" ,rg: "502224824", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-08-01"), address: "Rua Frei Antônio Faggiano, 720, BL 1 AP 33, Conjunto Residencial José Bonifácio" , zip_code: "08255140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"52118460953"},{$set: { phone:"+55 (19) 995224232" ,rg: "132983059", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-05-15"), address: "Rua João Duque, 312, Parque Imperador" , zip_code: "13097116" , city: "Campinas"}});
db.shooters.updateOne({docnum:"17647067818"},{$set: { phone:"+55 (11) 964390078" ,rg: "21.816.843-3", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-12"), address: "Rua Liceu, 157, Parque da Lapa" , zip_code: "05301030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"17007473806"},{$set: { phone:"+55 (11) 999880693" ,rg: "181571341", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-18"), address: "Rua Mariano de Sousa, 127, Chácara Santo Antônio (Zona Leste)" , zip_code: "03411090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04988447812"},{$set: { phone:"+55 (11) 996668567" ,rg: "12966436", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-22"), address: "Área Rural, 1600, Área Rural de Jarinu" , zip_code: "13249899" , city: "Jarinu"}});
db.shooters.updateOne({docnum:"29108614814"},{$set: { phone:"+55 (11) 911102702" ,rg: "36133822", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-29"), address: "Rua Palmerino Calabrese, 24, Vila Santana" , zip_code: "08230060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04879808830"},{$set: { phone:"+55 (11) 983399148" ,rg: "189541039", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-16"), address: "Rua das Crisandálias, 35, Jardim das Indústrias" , zip_code: "12240120" , city: "São José dos Campos"}});
db.shooters.updateOne({docnum:"46613457892"},{$set: { phone:"+55 (00) 000000000" ,rg: "376362820", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "Viela Hamilton, 168, Guarapiranga" , zip_code: "04912130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29586813860"},{$set: { phone:"+55 (19) 992814366" ,rg: "33841412", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-05-02"), address: "Rua Guengo Kobayashi, 408, Residencial Real Parque Sumaré" , zip_code: "13178553" , city: "Sumaré"}});
db.shooters.updateOne({docnum:"34453682875"},{$set: { phone:"+55 (11) 984297586" ,rg: "384276076", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-20"), address: "" , zip_code: "" , city: ""}});
db.shooters.updateOne({docnum:"22135411833"},{$set: { phone:"+55 (11) 984817530" ,rg: "34986419", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-04"), address: "Rua Euterpe, 73, casa 8, Vila do Encontro" , zip_code: "04324180" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38236220800"},{$set: { phone:"+55 (12) 981127331" ,rg: "437453376", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-17"), address: "" , zip_code: "" , city: ""}});
db.shooters.updateOne({docnum:"18366202844"},{$set: { phone:"+55 (11) 930005555" ,rg: "29383912", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-01"), address: "Avenida Sorocaba, 1114, Parque João Ramalho" , zip_code: "09290260" , city: "Santo André"}});
db.shooters.updateOne({docnum:"28023306839"},{$set: { phone:"+55 (11) 947962542" ,rg: "29445675", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-28"), address: "Rua Joaquim Pereira Pinto, 315, Jardim Avelino" , zip_code: "03226070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33612920855"},{$set: { phone:"+55 (11) 912986776" ,rg: "44997905", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Estrada Municipal dos Abreus, 642, CASA 3, Jardim Luciana" , zip_code: "07810200" , city: "Franco da Rocha"}});
db.shooters.updateOne({docnum:"10520939816"},{$set: { phone:"+55 (11) 999764556" ,rg: "14464479-4", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-13"), address: "Avenida Santa Inês, 1129, apto 184, Parque Mandaqui" , zip_code: "02415001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39153705840"},{$set: { phone:"+55 (11) 965082257" ,rg: "49277213", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-13"), address: "Rua Raimundo Gomes Ribeiro, 219, Limoeiro" , zip_code: "08051570" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"00312861516"},{$set: { phone:"+55 (11) 992892490" ,rg: "374452982", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-26"), address: "Rua José de Oliveira China, 422, 2, Jardim Dona Sinhá" , zip_code: "03924100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"08440421451"},{$set: { phone:"+55 (11) 977905811" ,rg: "60259582", rg_issuer: "", tpm_filiation_dt: new Date("2022-09-27"), address: "Rua Uchoa, 8, Vila Dirce" , zip_code: "06343550" , city: "Carapicuíba"}});
db.shooters.updateOne({docnum:"94519188334"},{$set: { phone:"+55 (00) 000000000" ,rg: "542887034", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-06"), address: "Rua Miguel Pereira Landim, 810, cs2, Parque Anhangüera (São Domingos)" , zip_code: "05158000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"48150304649"},{$set: { phone:"+55 (11) 999906452" ,rg: "194188024", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-10"), address: "Praça Marisa Marques, 112, APTO 41, Vila Rosália" , zip_code: "07072132" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"05153560503"},{$set: { phone:"+55 (11) 951222042" ,rg: "569738684", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-12"), address: "Rua Santo Amaro, 468, ap 91, Bela Vista" , zip_code: "01315001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22792304880"},{$set: { phone:"+55 (11) 942885575" ,rg: "648200255", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-29"), address: "Rua Galvão Bueno, 499, ap 153 bl d, Liberdade" , zip_code: "01506000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33204584852"},{$set: { phone:"+55 (11) 989390094" ,rg: "418028552", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-25"), address: "Rua Oswaldo Arouca, 507, ap 123, Vila Formosa" , zip_code: "03363000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33054819434"},{$set: { phone:"+55 (11) 911102702" ,rg: "32474815", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-02"), address: "Rua Palmerino Calabrese, 24, Vila Santana" , zip_code: "08230060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32156596115"},{$set: { phone:"+55 (17) 997771380" ,rg: "13214669", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-26"), address: "Rodovia SP 322 KM 524 - Sitio Barra do Ouro - Zona Rural s/n Orindiuva, 322, km 524, Centro" , zip_code: "15480000" , city: "Orindiúva"}});
db.shooters.updateOne({docnum:"28563055801"},{$set: { phone:"+55 (11) 940280051" ,rg: "32.995.140-3", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-27"), address: "Rua Cristiano Viana, 687, Apto 54, Cerqueira César" , zip_code: "05411001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03384736885"},{$set: { phone:"+55 (11) 985294180" ,rg: "9363564", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-03"), address: "Rua Harmonia, 457, AP 113, Sumarezinho" , zip_code: "05435000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23799360808"},{$set: { phone:"+55 (11) 982999997" ,rg: "G454874T", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-07-12"), address: "Rua Brigadeiro Tobias, 478, ap 1310 an, Centro" , zip_code: "01032001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27842249881"},{$set: { phone:"+55 (11) 999854421" ,rg: "303632628", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-08"), address: "Rua Dias Leme, 134, apto 51, Mooca" , zip_code: "03118040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29904120854"},{$set: { phone:"+55 (00) 000000000" ,rg: "275989124", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-10"), address: "Rua Guimarães Rosa, 197, Ocian" , zip_code: "11704160" , city: "Praia Grande"}});
db.shooters.updateOne({docnum:"38224416860"},{$set: { phone:"+55 (11) 981770565" ,rg: "276989570", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-02-02"), address: "Rua Rio de Janeiro, 151, Higienópolis" , zip_code: "01240010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23197575890"},{$set: { phone:"+55 (11) 950866888" ,rg: "v424654f", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-29"), address: "Rua Frei Caneca, 640, ED NATUR AP 51, Consolação" , zip_code: "01307000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38085750856"},{$set: { phone:"+55 (00) 000000000" ,rg: "384647352", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-01"), address: "Rua Vergueiro, 3389, Vila Mariana" , zip_code: "04101300" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"40719578833"},{$set: { phone:"+55 (11) 982538662" ,rg: "485035686", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-12"), address: "Rua das Heras, 240, Vila Lúcia" , zip_code: "03144080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35959688832"},{$set: { phone:"+55 (11) 993024242" ,rg: "294350585", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-15"), address: "Rua Jandiro Joaquim Pereira, 91, Casa, Jardim Leonor" , zip_code: "05658000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14749841854"},{$set: { phone:"+55 (11) 982248853" ,rg: "23199078", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-01-15"), address: "Rua Humberto I, 962, Apto 21 Luci, Vila Mariana" , zip_code: "04018033" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33905998866"},{$set: { phone:"+55 (11) 950607001" ,rg: "43525451", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-21"), address: "Rua Visconde de Itaboraí, 290, cs 10, Centro" , zip_code: "09910520" , city: "Diadema"}});
db.shooters.updateOne({docnum:"43367093866"},{$set: { phone:"+55 (11) 959148709" ,rg: "506132213", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-13"), address: "Rua Doutor Cory Gomes de Amorim, 100, Vila Mazzei" , zip_code: "09172480" , city: "Santo André"}});
db.shooters.updateOne({docnum:"90582187834"},{$set: { phone:"+55 (11) 984775555" ,rg: "7262163", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-12"), address: "Rua Silveira Campos, 282, Cambuci" , zip_code: "01541030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"18021904810"},{$set: { phone:"+55 (11) 996104580" ,rg: "20715015", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-27"), address: "Rua 109 J, 65, Canto da Praia" , zip_code: "88220000" , city: "Itapema"}});
db.shooters.updateOne({docnum:"34724511818"},{$set: { phone:"+55 (11) 991283333" ,rg: "439373748", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-26"), address: "Rua Gregório Allegri, 295, apto 72 TR 3, Vila das Belezas" , zip_code: "05842070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"58340840606"},{$set: { phone:"+55 (11) 996150013" ,rg: "16397675-2", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-15"), address: "Rua Acuruá, 166, Vila Romana" , zip_code: "05053000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23176845847"},{$set: { phone:"+55 (11) 986099888" ,rg: "V4483325", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-22"), address: "Rua Sapucaia, 326, AP 61, Alto da Mooca" , zip_code: "03170050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"17702454806"},{$set: { phone:"+55 (11) 997716855" ,rg: "239976332", rg_issuer: "sspsp", tpm_filiation_dt: new Date("2024-03-07"), address: "Rua Camilo Joaquim dos Santos, 29, CASA 2, Jardim Roberto" , zip_code: "06170020" , city: "Osasco"}});
db.shooters.updateOne({docnum:"23298326801"},{$set: { phone:"+55 (11) 982210325" ,rg: "v558180", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-07-27"), address: "Rua Brigadeiro Tobias, 334, ap 133, Centro" , zip_code: "01032000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27866675856"},{$set: { phone:"+55 (11) 982026666" ,rg: "347542116", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-17"), address: "Rua França Carvalho, 137, Alto da Mooca" , zip_code: "03182070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"52795992809"},{$set: { phone:"+55 (11) 946861034" ,rg: "39219339", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-12"), address: "Rua Ribeiro de Lima, 453, lj 449, Bom Retiro" , zip_code: "01122000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"46415447866"},{$set: { phone:"+55 (11) 987162222" ,rg: "508538531", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-24"), address: "Rua Lourenço da Silva Araújo e Amazonas, 75, Parque Santo Eduardo" , zip_code: "03384010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38958964898"},{$set: { phone:"+55 (11) 981541320" ,rg: "398911356", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-21"), address: "Rua Ceresópolis, 175, cs4, Jardim Olinda" , zip_code: "05766340" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11027240844"},{$set: { phone:"+55 (11) 997186424" ,rg: "33496699", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-09"), address: "Rua Caconde, 323, apto 41, Jardim Paulista" , zip_code: "01425011" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27929031802"},{$set: { phone:"+55 (11) 985802507" ,rg: "254096426", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-03-04"), address: "Avenida Edu Chaves, 639, ap 136, Parque Edu Chaves" , zip_code: "02229000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32696467803"},{$set: { phone:"+55 (11) 943067000" ,rg: "43698070", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Rua Euclides Pacheco, 1688, Vila Gomes Cardim" , zip_code: "03321001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35261099900"},{$set: { phone:"+55 (47) 992562968" ,rg: "8058267", rg_issuer: "SSP SC", tpm_filiation_dt: new Date("2024-08-06"), address: "estrada municipal João Duarte, 525, Palmital" , zip_code: "89248000" , city: "Garuva"}});
db.shooters.updateOne({docnum:"08795591877"},{$set: { phone:"+55 (11) 947542288" ,rg: "43629544", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-18"), address: "Rua Coronel Dilermano Brisola, 47, adm1, Parque Novo Mundo" , zip_code: "02189050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23591923885"},{$set: { phone:"+55 (11) 949935138" ,rg: "v861266o", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-26"), address: "Avenida Senador Teotônio Vilela, 05991, r3 casa 200, Vila São José (Cidade Dutra)" , zip_code: "04833001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02314127897"},{$set: { phone:"+55 (11) 993192020" ,rg: "109826930", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-26"), address: "Rua Inácio Miguel Stéfano, 291, apto 21, Enseada" , zip_code: "11440160" , city: "Guarujá"}});
db.shooters.updateOne({docnum:"47150190863"},{$set: { phone:"+55 (11) 996236849" ,rg: "54856693", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-15"), address: "Rua Bernardino de Queiroz Guimarães, 126, City América" , zip_code: "05101480" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12624723854"},{$set: { phone:"+55 (11) 986541120" ,rg: "15863293X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-06"), address: "Travessa Adolfo Cantu, 36, Vila Mazzei" , zip_code: "02311080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"40826744893"},{$set: { phone:"+55 (11) 961506810" ,rg: "492785223", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-15"), address: "Rua Urbano do Couto, 153, Alto da Mooca" , zip_code: "03183080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14626511864"},{$set: { phone:"+55 (11) 979660658" ,rg: "248947564", rg_issuer: "sspsp", tpm_filiation_dt: new Date("2023-11-22"), address: "Rua Siqueira Bueno, 2096, Belenzinho" , zip_code: "03172010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"40254956866"},{$set: { phone:"+55 (11) 997109033" ,rg: "494581931", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-30"), address: "Rua Luís Pinto, 277, Vila Carrão" , zip_code: "03427000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28354670848"},{$set: { phone:"+55 (11) 983035318" ,rg: "34050671-4", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-05-20"), address: "Rua Santo Agostinho, 239, Residencial Santo Antônio" , zip_code: "13295650" , city: "Itupeva"}});
db.shooters.updateOne({docnum:"23996776845"},{$set: { phone:"+55 (11) 968704303" ,rg: "G351725-V", rg_issuer: "CGPI/ DIREX/ PF", tpm_filiation_dt: new Date("2022-12-05"), address: "Rua Ribeirópolis, 532, tor 2 ap72, Vila Independência" , zip_code: "03225010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22680874846"},{$set: { phone:"+55 (11) 987382541" ,rg: "Y2400265", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-30"), address: "EST JACUBA, 159, Centro" , zip_code: "06950000" , city: "Juquitiba"}});
db.shooters.updateOne({docnum:"23486395807"},{$set: { phone:"+55 (11) 977759666" ,rg: "v9318340", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-02"), address: "Rua Anhangüera, 436, TOR A AP 172, Barra Funda" , zip_code: "01135000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23827600871"},{$set: { phone:"+55 (11) 949161718" ,rg: "G165219Y", rg_issuer: "DIREX/EX", tpm_filiation_dt: new Date("2024-07-12"), address: "Rua Barão de Ladário, 790, AP 55, Brás" , zip_code: "03010000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23988091880"},{$set: { phone:"+55 (11) 963874344" ,rg: "F057203N", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-12-14"), address: "Rua da Alfândega, 496, apto 102, Brás" , zip_code: "03006030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23845183802"},{$set: { phone:"+55 (11) 959556888" ,rg: "G198660PD", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-12-14"), address: "Rua da Alfândega, apto 175, Brás" , zip_code: "03006030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21816945838"},{$set: { phone:"+55 (11) 997269033" ,rg: "Y243497P", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-16"), address: "Rua Ribeiro de Lima, 332, AP 153, Bom Retiro" , zip_code: "01122000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28864320830"},{$set: { phone:"+55 (13) 996942004" ,rg: "28.013.256-6", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-29"), address: "Rua Rui Barbosa, 268, apto  123 - BL A, Canto do Forte" , zip_code: "11700170" , city: "Praia Grande"}});
db.shooters.updateOne({docnum:"39006121886"},{$set: { phone:"+55 (11) 974177638" ,rg: "", rg_issuer: "", tpm_filiation_dt: new Date("2024-06-05"), address: "AV DERMIVAL BERNADES SIQUEIRA, 2075, BLOCO B APTA 43" , zip_code: "" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31051169828"},{$set: { phone:"+55 (11) 948270423" ,rg: "29125232", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-24"), address: "Rua dos Cambistas, 10, cs 2, Vila Bancária" , zip_code: "03918070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"09080214884"},{$set: { phone:"+55 (11) 999100739" ,rg: "122668893", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-15"), address: "Rua Paulo Roberto Paes de Almeida, 277, Chácara Monte Alegre" , zip_code: "04645080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"93955790800"},{$set: { phone:"+55 (11) 999354007" ,rg: "71397371", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-04"), address: "Rua Comendador Quirino Teixeira, 151, casa 22, Jardim Leonor Mendes de Barros" , zip_code: "02348060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28739714870"},{$set: { phone:"+55 (11) 943267293" ,rg: "281915271", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-21"), address: "" , zip_code: "" , city: ""}});
db.shooters.updateOne({docnum:"31981004882"},{$set: { phone:"+55 (11) 973374774" ,rg: "427560597", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-01"), address: "Rua Madre de Deus, 1248, Mooca" , zip_code: "03119001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26466285871"},{$set: { phone:"+55 (00) 000000000" ,rg: "373020363", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua do Lucas, 225, Brás" , zip_code: "03005000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"45556802866"},{$set: { phone:"+55 (11) 944625339" ,rg: "50448090", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-27"), address: "Rua Otávio Tarquínio de Sousa, 885, Campo Belo" , zip_code: "04613002" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04399962950"},{$set: { phone:"+55 (47) 996999826" ,rg: "4294136", rg_issuer: "SSP PR", tpm_filiation_dt: new Date("2024-08-09"), address: "Rua Francisco Bernardo Boticher, 88, Santa Catarina" , zip_code: "89212700" , city: "Joinville"}});
db.shooters.updateOne({docnum:"00693461942"},{$set: { phone:"+55 (47) 999957051" ,rg: "4091140", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-06"), address: "Rua Alberto Pasqualini, 559, Centro, Centro" , zip_code: "89248000" , city: "Garuva"}});
db.shooters.updateOne({docnum:"21422655881"},{$set: { phone:"+55 (11) 982580719" ,rg: "v202056y", rg_issuer: "direx", tpm_filiation_dt: new Date("2023-03-01"), address: "Rua Peixoto Gomide, 596, apto 45b, Jardim Paulista" , zip_code: "01409000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"70173010806"},{$set: { phone:"+55 (11) 996339041" ,rg: "74430762", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-23"), address: "Avenida Regente Feijó, 1650, ap 2002, Vila Regente Feijó" , zip_code: "03342000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25007642819"},{$set: { phone:"+55 (11) 993485729" ,rg: "229659536", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-18"), address: "Rua Santa Gertrudes, 180, Chácara Santo Antônio (Zona Leste)" , zip_code: "03408020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03168000825"},{$set: { phone:"+55 (11) 981292500" ,rg: "3215477X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-27"), address: "Rua José de Cristo Moreira, 304, apto 101, Vila Morumbi" , zip_code: "05688090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11678080888"},{$set: { phone:"+55 (11) 997999924" ,rg: "229056520", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-06"), address: "Rua Chopin, 145, CASA, Jardim Antonio Von Zuben" , zip_code: "13044520" , city: "Campinas"}});
db.shooters.updateOne({docnum:"10242747809"},{$set: { phone:"+55 (19) 996008177" ,rg: "18798641-1", rg_issuer: "Ssp", tpm_filiation_dt: new Date("2024-05-02"), address: "Avenida Dermival Bernardes Siqueira, 2175, Residencial Villeneuve torre c24, Swiss Park" , zip_code: "13049252" , city: "Campinas"}});
db.shooters.updateOne({docnum:"28720017863"},{$set: { phone:"+55 (00) 000000000" ,rg: "359210677", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-06"), address: "Rua do Lucas, 225, BL B, Brás" , zip_code: "03005000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02988571546"},{$set: { phone:"+55 (77) 981429860" ,rg: "1193371180", rg_issuer: "ba", tpm_filiation_dt: new Date("2024-04-09"), address: "rua jesse santana, Centro" , zip_code: "47680000" , city: "Cocos"}});
db.shooters.updateOne({docnum:"29027095876"},{$set: { phone:"+55 (11) 948002287" ,rg: "26463608", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Conselheiro Benevides, 148, APTO 1, Mooca" , zip_code: "03110050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37079625807"},{$set: { phone:"+55 (11) 983654514" ,rg: "437581706", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-17"), address: "Rua Vila Caiz, 7, cj res jd eli, Vila Nova das Belezas" , zip_code: "05777170" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30691129860"},{$set: { phone:"+55 (11) 943352001" ,rg: "338844053", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-27"), address: "Rua Pedras de Fogo, 03, Jardim das Camélias" , zip_code: "08050730" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"53854748434"},{$set: { phone:"+55 (11) 944922485" ,rg: "898747", rg_issuer: "RN", tpm_filiation_dt: new Date("2023-12-28"), address: "Avenida Rouxinol, 837, Indianópolis" , zip_code: "04516001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"09271288882"},{$set: { phone:"+55 (11) 947186676" ,rg: "186532301", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-06-11"), address: "Rua São Florêncio, 543, Vila Feliz" , zip_code: "03615000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31538640805"},{$set: { phone:"+55 (11) 971508168" ,rg: "321535777", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-06"), address: "Rua Armando Petrella, 431, Jardim Panorama" , zip_code: "05679010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"76816494849"},{$set: { phone:"+55 (11) 966226787" ,rg: "56946582", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-26"), address: "Avenida Marechal Rondon, 521, Ponte Grande" , zip_code: "07030060" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"01357910576"},{$set: { phone:"+55 (11) 983878959" ,rg: "988986809", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-09-16"), address: "Avenida Dória, 171, APP 133, Vila Alexandria" , zip_code: "04635070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41575488841"},{$set: { phone:"+55 (00) 000000000" ,rg: "536265690", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-11"), address: "Rua Oscar Cintra Gordinho, 211, apto 142, Liberdade" , zip_code: "01512010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11944113800"},{$set: { phone:"+55 (11) 912134526" ,rg: "21105354", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-07"), address: "Rua Divina Pastora, 76, Vila Nova Pauliceia" , zip_code: "03267060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37168821865"},{$set: { phone:"+55 (11) 982455018" ,rg: "340959459", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-06-26"), address: "Avenida Lauro Gomes, 5901, Apto 13, torre 2, Rudge Ramos" , zip_code: "09635010" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"83844465049"},{$set: { phone:"+55 (54) 96224742" ,rg: "66004133", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Estrada São Judas, 190, Parque Esplanada" , zip_code: "06817170" , city: "Embu das Artes"}});
db.shooters.updateOne({docnum:"37901182814"},{$set: { phone:"+55 (19) 974144040" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-11"), address: "Avenida José Pancetti, 1164, Vila Proost de Souza" , zip_code: "13033740" , city: "Campinas"}});
db.shooters.updateOne({docnum:"21870066898"},{$set: { phone:"+55 (11) 964755734" ,rg: "28147942", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-27"), address: "Avenida Marcos Penteado de Ulhôa Rodrigues, 4000, bl a ap 112, Tamboré" , zip_code: "06543001" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"03056876974"},{$set: { phone:"+55 (43) 991750714" ,rg: "8.214.139-1", rg_issuer: "IIPR", tpm_filiation_dt: new Date("2024-07-19"), address: "Rua Eça de Queiroz, 100, CASA 271, Alto Alegre" , zip_code: "85805080" , city: "Cascavel"}});
db.shooters.updateOne({docnum:"35580407831"},{$set: { phone:"+55 (11) 988172221" ,rg: "493702684", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-02"), address: "Rua França Carvalho, 212, Alto da Mooca" , zip_code: "03182070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31570639876"},{$set: { phone:"+55 (11) 947359402" ,rg: "44.003.165-5", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-03"), address: "Rua da Fortuna, 74, COMPL.ANT.471, Vila Bom Clima" , zip_code: "07197100" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"38172714840"},{$set: { phone:"+55 (11) 940165886" ,rg: "482203213", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-03"), address: "Rua Mineradora de Diamantina, 256, Cidade Continental" , zip_code: "03243010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"70073992151"},{$set: { phone:"+55 (11) 962100000" ,rg: "v843551l", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-10-07"), address: "Avenida Professor Luiz Ignácio Anhaia Mello, 2580, ap 222, Jardim Avelino" , zip_code: "03154100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15108928858"},{$set: { phone:"+55 (11) 997272315" ,rg: "18.916.953-9", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-16"), address: "RUA GABIROBA, 296, JARDIM GUACIRA" , zip_code: "11740000" , city: "Itanhaém"}});
db.shooters.updateOne({docnum:"21456560816"},{$set: { phone:"+55 (11) 947242787" ,rg: "294868343", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-02"), address: "Rua Capituba, 50, Vila Regente Feijó" , zip_code: "03346030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22762044863"},{$set: { phone:"+55 (00) 000000000" ,rg: "26493137", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-17"), address: "Rua José Lopes Rodrigues, 326, cs1, Jardim Matarazzo" , zip_code: "03810150" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21924330857"},{$set: { phone:"+55 (00) 000000000" ,rg: "277024717", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-17"), address: "Avenida Novo Osasco, 481, APTO 51 BL 4, Bussocaba" , zip_code: "06056010" , city: "Osasco"}});
db.shooters.updateOne({docnum:"28720488807"},{$set: { phone:"+55 (11) 71389573" ,rg: "29079005", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-12"), address: "Rua das Hortênsias, 1041, CASA 03, Chácara Vale do Rio Cotia" , zip_code: "06355370" , city: "Carapicuíba"}});
db.shooters.updateOne({docnum:"30239376803"},{$set: { phone:"+55 (11) 986022675" ,rg: "329176110", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua Carlos Weber, 535, AP 13 C, Vila Leopoldina" , zip_code: "05303000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29956934810"},{$set: { phone:"+55 (11) 947859718" ,rg: "299335185", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-28"), address: "Rua Canuto Saraiva, 408, A, Mooca" , zip_code: "03113010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"15358169881"},{$set: { phone:"+55 (11) 998241569" ,rg: "263726137", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Soldado Brasílio Pinto de Almeida, 60, Parque Novo Mundo" , zip_code: "02188080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28463657842"},{$set: { phone:"+55 (11) 947489647" ,rg: "33108473", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-22"), address: "Rua Professor Bourhan Helou, 294, Jardim Ana Rosa" , zip_code: "03287030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11940904609"},{$set: { phone:"+55 (19) 983100618" ,rg: "387699715", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-03-08"), address: "Rua Poços de Caldas, 56, Jardim Santa Lúcia" , zip_code: "13060493" , city: "Campinas"}});
db.shooters.updateOne({docnum:"11795927860"},{$set: { phone:"+55 (11) 996827513" ,rg: "19710646", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-27"), address: "Rua João Antônio de Oliveira, 1228, apto 74 BL 01, Mooca" , zip_code: "03111010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24915010821"},{$set: { phone:"+55 (11) 940206606" ,rg: "292100802", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-22"), address: "Rua Oriente Monti, 90, APTO 113, Centro" , zip_code: "09910250" , city: "Diadema"}});
db.shooters.updateOne({docnum:"22449028897"},{$set: { phone:"+55 (11) 972998724" ,rg: "32527876", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-14"), address: "Rua Nossa Senhora Aparecida, 106, Sítio das Madres" , zip_code: "06784285" , city: "Taboão da Serra"}});
db.shooters.updateOne({docnum:"00024930717"},{$set: { phone:"+55 (11) 999839573" ,rg: "553277674", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-21"), address: "Rua Emílio Mallet, 367, bl italy, Vila Gomes Cardim" , zip_code: "03320000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29774970802"},{$set: { phone:"+55 (11) 987888809" ,rg: "33108425", rg_issuer: "", tpm_filiation_dt: new Date("2022-09-22"), address: "Rua Jaime de Avelar, 118, Jardim Vila Formosa" , zip_code: "03460150" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39217542830"},{$set: { phone:"+55 (11) 933701513" ,rg: "476450688", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Rua Nelson Gama de Oliveira, 739, AP 71 BL A, Vila Andrade" , zip_code: "05734150" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22881016871"},{$set: { phone:"+55 (11) 951187666" ,rg: "V355064K", rg_issuer: "DIREX/EX", tpm_filiation_dt: new Date("2024-08-13"), address: "Rua Mirassol, 216, AP 114, Vila Clementino" , zip_code: "04044010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"00459353942"},{$set: { phone:"+55 (11) 981627397" ,rg: "v2135288", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-09-22"), address: "Rua Antônio de Lucena, 22, AP 181 B4, Chácara Califórnia" , zip_code: "03407050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26098634890"},{$set: { phone:"+55 (00) 000000000" ,rg: "356460654", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-10"), address: "Rua Guirecema, 148, Vila Nova Bonsucesso" , zip_code: "07176321" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"23100074807"},{$set: { phone:"+55 (11) 985025999" ,rg: "v396427i", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-08"), address: "Rua Tabor, 647, TOR D - AP 162, Ipiranga" , zip_code: "04202021" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23352289867"},{$set: { phone:"+55 (11) 949200000" ,rg: "V6362274", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-07-12"), address: "Rua Celso de Azevedo Marques, 361, BL B AP 203, Parque da Mooca" , zip_code: "03122010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23702880860"},{$set: { phone:"+55 (11) 988328415" ,rg: "G2997439", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-20"), address: "Rua Oriente, 108, casa 5, Brás" , zip_code: "03016000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23812507862"},{$set: { phone:"+55 (11) 959252469" ,rg: "G247997I", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-11-28"), address: "Rua Doutor Pinto Ferraz, 97, AP 41, Vila Mariana" , zip_code: "04117040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23839793840"},{$set: { phone:"+55 (11) 977999777" ,rg: "G226979-0", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-29"), address: "Rua Rio Bonito, 1560, Brás" , zip_code: "03023000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21640098860"},{$set: { phone:"+55 (11) 990144013" ,rg: "v328223t", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-10-24"), address: "Rua Frei Caneca, 640, ed natur ap 124, Consolação" , zip_code: "01307000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06624540818"},{$set: { phone:"+55 (11) 996755535" ,rg: "14162844-3", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-12"), address: "Rua Jamile Abrahao Kalil, 68, Vila Polopoli" , zip_code: "05363070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38089897851"},{$set: { phone:"+55 (11) 982113022" ,rg: "434893031", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-23"), address: "Rua Professor Macedo Soares, 115, CS 02, Vila Mariana" , zip_code: "04113090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"42927227810"},{$set: { phone:"+55 (11) 985383732" ,rg: "50666367X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua Dona Lina Filipini, 99, Umuarama" , zip_code: "06030030" , city: "Osasco"}});
db.shooters.updateOne({docnum:"31115109804"},{$set: { phone:"+55 (11) 999513640" ,rg: "43858954", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-27"), address: "Rua Francisco Soares Nalin, 101, APTO 71A, Vila Viotto" , zip_code: "13209600" , city: "Jundiaí"}});
db.shooters.updateOne({docnum:"32888656884"},{$set: { phone:"+55 (11) 972511106" ,rg: "351853169", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-29"), address: "Rua Jorge Fares, 80, apto 82 medidor 2b fase 2b, Jardim São Luís" , zip_code: "05805040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14238038843"},{$set: { phone:"+55 (00) 000000000" ,rg: "17974155", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-30"), address: "Rua Kansas, 517, Brooklin Paulista" , zip_code: "04558001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13575345821"},{$set: { phone:"+55 (11) 994777528" ,rg: "207021417", rg_issuer: "", tpm_filiation_dt: new Date("2022-08-23"), address: "Rua João Antônio de Oliveira, 1228, bl b ap 22, Mooca" , zip_code: "03111001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11581406819"},{$set: { phone:"+55 (11) 947062880" ,rg: "195005028", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-03"), address: "Rua Senador Georgino Avelino, 512, apto 301, Itaquera" , zip_code: "08295370" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02446054404"},{$set: { phone:"+55 (11) 00000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-06-27"), address: "Rua Gustavo Stach, 42, Vila Ema" , zip_code: "03278030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25816881817"},{$set: { phone:"+55 (11) 966220252" ,rg: "270506597", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-20"), address: "Rua Antônio de Andrade Rebelo, 149, Retiro Morumbi" , zip_code: "05692000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02063540888"},{$set: { phone:"+55 (11) 993681444" ,rg: "23420342-0", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-03-12"), address: "Rua Lagoa Verde, 261, APTO 81, Vila Paulicéia" , zip_code: "02302000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06947316847"},{$set: { phone:"+55 (11) 984584041" ,rg: "14039416", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-03-22"), address: "Rua Coronel Ortiz, 460, ap42, Vila Assunção" , zip_code: "09030400" , city: "Santo André"}});
db.shooters.updateOne({docnum:"16616796841"},{$set: { phone:"+55 (00) 000000000" ,rg: "17905566", rg_issuer: "SSP", tpm_filiation_dt: new Date("2027-02-23"), address: "Rua Maria Antônia Ladalardo, 320, APTO 211, Jardim Fonte do Morumbi" , zip_code: "05704130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"05024582837"},{$set: { phone:"+55 (11) 975451715" ,rg: "15796982", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-11"), address: "Avenida Interlagos, 1595, Jardim Umuarama" , zip_code: "04661100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"00692015604"},{$set: { phone:"+55 (11) 983081094" ,rg: "388720761", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-23"), address: "Rua Darci Pereira, 4 A, Jardim Keralux" , zip_code: "03828035" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31315318865"},{$set: { phone:"+55 (11) 000000000" ,rg: "34339397", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-03-21"), address: "Rua Mário Araújo, 79, cs 5, Santana" , zip_code: "02020100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25437048840"},{$set: { phone:"+55 (11) 987818854" ,rg: "279742964", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-23"), address: "Rua Marcos Lopes, 189, ap 31, Vila Nova Conceição" , zip_code: "04513080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30020691831"},{$set: { phone:"+55 (13) 991392323" ,rg: "335751520", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-05-08"), address: "Rua Antônio Cardoso Franco, 96, apto 156, Casa Branca" , zip_code: "09015530" , city: "Santo André"}});
db.shooters.updateOne({docnum:"23058817894"},{$set: { phone:"+55 (11) 983222666" ,rg: "V3787545", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "Rua Bueno de Andrade, 706, apto 171, Aclimação" , zip_code: "01526000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03986968377"},{$set: { phone:"+55 (11) 930005555" ,rg: "2003098075883", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-01"), address: "Rua GINO AMADEI, 75, Paulicéia" , zip_code: "09690000" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"01177075466"},{$set: { phone:"+55 (00) 000000000" ,rg: "576735735", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-06"), address: "Rua José Triglia, 283, Vila das Palmeiras" , zip_code: "07013121" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"34573302808"},{$set: { phone:"+55 (00) 000000000" ,rg: "41897874", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-29"), address: "Avenida Robert Kennedy, 992, Independência" , zip_code: "09862172" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"55585116649"},{$set: { phone:"+55 (11) 996390606" ,rg: "M 3400468", rg_issuer: "SSPMG", tpm_filiation_dt: new Date("2024-07-18"), address: "Alameda Apetubas, 403, Res 10, Alphaville" , zip_code: "06540060" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"29967847824"},{$set: { phone:"+55 (45) 999124959" ,rg: "477948339", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-27"), address: "Rua Minervino Miguel Ferreira, 295, apto 902, Centro" , zip_code: "88200000" , city: "Tijucas"}});
db.shooters.updateOne({docnum:"65574494515"},{$set: { phone:"+55 (00) 000000000" ,rg: "366445182", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-03"), address: "Rua Assis, 23, cs 02, Sítio Itaberaba I" , zip_code: "05270140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21726690830"},{$set: { phone:"+55 (73) 999851688" ,rg: "V4758840", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-06-19"), address: "Rua dos Eucaliptos, 78, VILA LUIZ CASA" , zip_code: "09810640" , city: "São Bernardo do Campo"}});
db.shooters.updateOne({docnum:"28940787811"},{$set: { phone:"+55 (11) 941102204" ,rg: "23855564", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-26"), address: "Rua Tomás da Fonseca, 169, Alto da Mooca" , zip_code: "03193140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21989808867"},{$set: { phone:"+55 (11) 970972595" ,rg: "331079537", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-24"), address: "Rua Icanhema, 115, Cidade Dutra" , zip_code: "04810120" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26207202813"},{$set: { phone:"+55 (11) 000000000" ,rg: "266014276", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-08"), address: "Rua Professor Antônio de Castro Lopes, 523, cs 1, Parque Boturussu" , zip_code: "03805080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13484412836"},{$set: { phone:"+55 (11) 993679314" ,rg: "16854937", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-20"), address: "Rua João José de Oliveira, 22, Jardim Porteira Grande" , zip_code: "03917090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29849221828"},{$set: { phone:"+55 (00) 000000000" ,rg: "289257876", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-16"), address: "Rua José Gonçalves, 138, apto 101, Vila Andrade" , zip_code: "05727250" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14049596881"},{$set: { phone:"+55 (11) 954594607" ,rg: "197486216", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-13"), address: "Rua Alhambra, 39 Rua Alhambra, Jardim do Estádio" , zip_code: "09172120" , city: "Santo André"}});
db.shooters.updateOne({docnum:"33918512878"},{$set: { phone:"+55 (11) 999445995" ,rg: "34772175", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-04"), address: "Alameda Puerê, 121, Loteamento Parque Chapada de Itu" , zip_code: "13312874" , city: "Itu"}});
db.shooters.updateOne({docnum:"32780491876"},{$set: { phone:"+55 (11) 000000000" ,rg: "35355464", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-19"), address: "Rua do Rocio, 450, bl 8 apt 282, Vila Olímpia" , zip_code: "04552000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"96519622753"},{$set: { phone:"+55 (11) 982450471" ,rg: "678225734", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-25"), address: "Rua Raimundo Simão de Souza, 26, TOR C AP 251, Vila Suzana" , zip_code: "05709040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"17372168848"},{$set: { phone:"+55 (00) 000000000" ,rg: "216736444", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-10"), address: "Rua Ipaumirim, 288, casa 02, Jardim Nordeste" , zip_code: "03688020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41866764888"},{$set: { phone:"+55 (19) 993512236" ,rg: "391366968", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-07"), address: "Rua Helena Argentin Canova, 82, João Aranha" , zip_code: "13145876" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"18749727885"},{$set: { phone:"+55 (11) 958199709" ,rg: "254333382", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-17"), address: "Rua Tim Maia, 335, Jardim Oliveira I" , zip_code: "07152760" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"77763106620"},{$set: { phone:"+55 (31) 983840304" ,rg: "3641290", rg_issuer: "sspmg", tpm_filiation_dt: new Date("2024-04-16"), address: "Rua Mercúrio, 09, 302, Ana Lúcia" , zip_code: "34710180" , city: "Sabará"}});
db.shooters.updateOne({docnum:"11697256864"},{$set: { phone:"+55 (11) 992010395" ,rg: "193013356", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-11"), address: "RUA ANTONIO DA CRUZ MESSIAS, 9, A, JARDIM SAO LUIS" , zip_code: "05814130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"17445279890"},{$set: { phone:"+55 (11) 995783030" ,rg: "244951688", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-20"), address: "Rua Euclides Pacheco, 1141, ap 271, Vila Gomes Cardim" , zip_code: "03321001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14733322810"},{$set: { phone:"+55 (11) 975660790" ,rg: "241092917", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-15"), address: "Rua Oliveira Catrambi, 120, Jardim Vila Formosa" , zip_code: "03461010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13180934816"},{$set: { phone:"+55 (00) 000000000" ,rg: "187595550", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-26"), address: "Avenida Manoel Martins, 180, a, Samambaia" , zip_code: "07623025" , city: "Mairiporã"}});
db.shooters.updateOne({docnum:"14376056804"},{$set: { phone:"+55 (11) 992979899" ,rg: "8296213", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-19"), address: "Rua Cardoso de Siqueira, 44, Aclimação" , zip_code: "01530090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01893070050"},{$set: { phone:"+55 (51) 999561733" ,rg: "8097446796", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Rua Paschoal Gianfrancesco, 1208, APTO111, Jardim das Palmeiras" , zip_code: "13224700" , city: "Várzea Paulista"}});
db.shooters.updateOne({docnum:"26330744807"},{$set: { phone:"+55 (11) 955692838" ,rg: "232433355", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-07"), address: "Rua do Buruí, 203, Parque Casa de Pedra" , zip_code: "02320170" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26495852851"},{$set: { phone:"+55 (11) 947495077" ,rg: "288408603", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-07-25"), address: "Avenida Doutor Bernardino Brito Fonseca de Carvalho, 1661, apto154 BL1, Vila Talarico" , zip_code: "03535000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29318244886"},{$set: { phone:"+55 (11) 995515069" ,rg: "27572374", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-11"), address: "Rua Coronel Diogo, 167, apto 121, Jardim da Glória" , zip_code: "01545001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14434599844"},{$set: { phone:"+55 (11) 933927210" ,rg: "237809734", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-24"), address: "Rua Tijuco Preto, 320, apto 32, Tatuapé" , zip_code: "03316000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30706967836"},{$set: { phone:"+55 (11) 981115578" ,rg: "141877522", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-05"), address: "Rua Pedro Paffaro, 75, Centro" , zip_code: "13280372" , city: "Vinhedo"}});
db.shooters.updateOne({docnum:"05245315874"},{$set: { phone:"+55 (11) 992748428" ,rg: "11.123.519-4", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-17"), address: "Rua Xavier de Almeida, 15, Ipiranga" , zip_code: "04211000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"43607070881"},{$set: { phone:"+55 (11) 947477869" ,rg: "362022008", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-19"), address: "Rua Visconde de Ourem, 275, Jardim Aeroporto" , zip_code: "04632020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24917945860"},{$set: { phone:"+55 (11) 988684545" ,rg: "216321980", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-12"), address: "Rua Henrique Botticini, 113, CASA, Jardim Rizzo" , zip_code: "05587020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04308863813"},{$set: { phone:"+55 (11) 975005400" ,rg: "13036942", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-24"), address: "Rua Antônio Simplício, 119, CS4, Parque Ramos Freitas" , zip_code: "02353110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21376469863"},{$set: { phone:"+55 (11) 982664418" ,rg: "299645733", rg_issuer: "", tpm_filiation_dt: new Date("2023-11-27"), address: "Rua Pablo Picasso, 100, bl 6, Água Branca" , zip_code: "05036160" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"09405663895"},{$set: { phone:"+55 (11) 954846205" ,rg: "202115744", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-15"), address: "Rua Solidônio Leite, 2489, apto 35 - tor 3, Vila Ivone" , zip_code: "03275000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"18756775857"},{$set: { phone:"+55 (11) 000000000" ,rg: "24876097X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-22"), address: "Rua Italiana, 35, Vila Endres" , zip_code: "07043050" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"17021943881"},{$set: { phone:"+55 (11) 983339696" ,rg: "218413634", rg_issuer: "Ssp/so", tpm_filiation_dt: new Date("2024-09-12"), address: "Avenida Doutor Altino Arantes, 164, 112, Vila Clementino" , zip_code: "04042001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02209517800"},{$set: { phone:"+55 (11) 00000000" ,rg: "0", rg_issuer: "222", tpm_filiation_dt: new Date("2024-07-10"), address: "Rua Dona Cecília Santana, 204, Vila Granada" , zip_code: "03622010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28134616879"},{$set: { phone:"+55 (11) 994136705" ,rg: "30502722", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Fabiano Alves, 364, Parque da Vila Prudente" , zip_code: "03139010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"89985672100"},{$set: { phone:"+55 (11) 947710487" ,rg: "351895334", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-08"), address: "Rua Bispo Eugênio Demazemod, 369, Vila Alpina" , zip_code: "03206040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33066072827"},{$set: { phone:"+55 (00) 000000000" ,rg: "436875482", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-11"), address: "EST dos Mendes, 5, CS1, Jardim São Rafael" , zip_code: "04860140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29674601848"},{$set: { phone:"+55 (11) 982011122" ,rg: "27144435x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "Rua Indiana, 710, Brooklin Paulista" , zip_code: "04562001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41311728872"},{$set: { phone:"+55 (00) 00000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-10"), address: "Rua Oswaldo Arouca, 507, Vila Formosa" , zip_code: "03363000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28986371812"},{$set: { phone:"+55 (11) 982358512" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-19"), address: "Rua Cândido Lacerda, 150, APTO 162, Vila Regente Feijó" , zip_code: "03336010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01484913671"},{$set: { phone:"+55 (34) 991862772" ,rg: "MG11962087", rg_issuer: "sspmg", tpm_filiation_dt: new Date("2024-07-10"), address: "Rua das Gaivotas, 55, Cidade Jardim" , zip_code: "38412138" , city: "Uberlândia"}});
db.shooters.updateOne({docnum:"79752144772"},{$set: { phone:"+55 (11) 999413455" ,rg: "530694657", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-09-16"), address: "Rua Visconde de Nacar, 219, AP 201, Real Parque" , zip_code: "05685010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"50842862315"},{$set: { phone:"+55 (11) 980350202" ,rg: "371803962", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-05"), address: "" , zip_code: "" , city: ""}});
db.shooters.updateOne({docnum:"90597257868"},{$set: { phone:"+55 (11) 111111111" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-05"), address: "Rua Pitangui, 102, AP 201 BL B, Tatuapé" , zip_code: "03077090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36495893892"},{$set: { phone:"+55 (13) 997095110" ,rg: "33.671.824-X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-29"), address: "Avenida Tomé de Souza, 165, apto 608 - ED VISTA MARÉ, Centro" , zip_code: "11250261" , city: "Bertioga"}});
db.shooters.updateOne({docnum:"44157581857"},{$set: { phone:"+55 (11) 983045858" ,rg: "438624361", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-19"), address: "Rua Silveira Campos, 282, Cambuci" , zip_code: "01541030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"65450051891"},{$set: { phone:"+55 (11) 967908377" ,rg: "54430914", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-08"), address: "Rua Pierre Curie, 46, Jardim da Saúde" , zip_code: "04290050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28541282813"},{$set: { phone:"+55 (00) 000000000" ,rg: "320459913", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-18"), address: "Rua Águas Férreas, 166, CS1, Parque Guaianazes" , zip_code: "08431490" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13669918850"},{$set: { phone:"+55 (11) 992827276" ,rg: "16295851-1", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-09-11"), address: "Avenida João Pedro Cardoso, 553, Casa, Jabaquara" , zip_code: "04355001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06628798801"},{$set: { phone:"+55 (19) 971070494" ,rg: "84715592", rg_issuer: "Ssp", tpm_filiation_dt: new Date("2024-07-09"), address: "Rua Silveira Lopes, 109, Ap61, Botafogo" , zip_code: "13020070" , city: "Campinas"}});
db.shooters.updateOne({docnum:"26622507805"},{$set: { phone:"+55 (11) 998093772" ,rg: "309323472", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-13"), address: "Rua Vieira de Morais, 1458, Campo Belo" , zip_code: "04617005" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25480938835"},{$set: { phone:"+55 (11) 967047512" ,rg: "30407840", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-31"), address: "Rua Fidélis Papini, 596, Vila Prudente" , zip_code: "03132020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27816289804"},{$set: { phone:"+55 (11) 910664096" ,rg: "26452469", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-04"), address: "Avenida Ômega, 219, AP 172, Melville Empresarial I e II" , zip_code: "06472005" , city: "Barueri"}});
db.shooters.updateOne({docnum:"15147189874"},{$set: { phone:"+55 (00) 000000000" ,rg: "22187825", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-13"), address: "Rua Prefeito Rinaldo Poli, 826, Jardim City" , zip_code: "07082530" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"15739265827"},{$set: { phone:"+55 (11) 994548282" ,rg: "12693169", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-30"), address: "Rua Nebraska, 896, Brooklin Novo" , zip_code: "04560012" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16892540848"},{$set: { phone:"+55 (11) 984950886" ,rg: "251151025", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-09"), address: "Rua Silveira Pires, 781, Parque Paulistano" , zip_code: "08080160" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33067208870"},{$set: { phone:"+55 (11) 989615308" ,rg: "433693186", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-29"), address: "Rua Lírio, 373, Jardim das Flores" , zip_code: "06112110" , city: "Osasco"}});
db.shooters.updateOne({docnum:"29372243850"},{$set: { phone:"+55 (11) 947989415" ,rg: "33311805", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-17"), address: "Rua Humberto Mauro, 48, Vila Antonieta" , zip_code: "03478000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"88254712891"},{$set: { phone:"+55 (11) 951002678" ,rg: "69001157", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-25"), address: "Rua Cândido Lacerda, 109, Vila Regente Feijó" , zip_code: "03336010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07598057842"},{$set: { phone:"+55 (11) 997611708" ,rg: "18599584", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Rua Tupã, 358, Santa Inês" , zip_code: "07734025" , city: "Caieiras"}});
db.shooters.updateOne({docnum:"66801800906"},{$set: { phone:"+55 (11) 999110001" ,rg: "391030000", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-22"), address: "Rua Alemanha, 371, apto 0, Jardim Europa" , zip_code: "01448010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07302832838"},{$set: { phone:"+55 (00) 000000000" ,rg: "184331390", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-16"), address: "Rua Fábia, 138, Vila Romana" , zip_code: "05051030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"64035549568"},{$set: { phone:"+55 (11) 952281754" ,rg: "366218256", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-02"), address: "Rua Coronel Diogo, 1200, apto 185, Jardim da Glória" , zip_code: "01545001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"89769104604"},{$set: { phone:"+55 (11) 971524173" ,rg: "587963748", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-27"), address: "Rua Albina Barbosa, 210, AP 162 BL B, Aclimação" , zip_code: "01530020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12503984878"},{$set: { phone:"+55 (11) 947786994" ,rg: "16748742", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-24"), address: "Rua Padre Landell de Moura, 51, Jardim Anália Franco" , zip_code: "03337080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"80795420820"},{$set: { phone:"+55 (11) 996137573" ,rg: "71549389", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-26"), address: "Rua São Carlos do Pinhal, 640, apto 41 BL 01, Bela Vista" , zip_code: "01333000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04427004903"},{$set: { phone:"+55 (45) 998425566" ,rg: "(45) 99842-5566", rg_issuer: "sesp/pr", tpm_filiation_dt: new Date("2024-07-20"), address: "Rua Quatorze Bis, 561, Santos Dumont" , zip_code: "85804680" , city: "Cascavel"}});
db.shooters.updateOne({docnum:"95091483853"},{$set: { phone:"+55 (11) 999640457" ,rg: "117697758", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-09"), address: "Rua Francisco de Medeiros Jordão, 528, Vila Medeiros" , zip_code: "02214030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"48950084953"},{$set: { phone:"+55 (47) 988393330" ,rg: "1109174", rg_issuer: "SSP SC", tpm_filiation_dt: new Date("2024-08-13"), address: "Rua Mauro Lopes, 120, Parque Guarani" , zip_code: "89209195" , city: "Joinville"}});
db.shooters.updateOne({docnum:"17580738880"},{$set: { phone:"+55 (00) 000000000" ,rg: "259352627", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-16"), address: "Rua Pedro de Melo Sousa, 199, Vila Arcádia" , zip_code: "02911100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32629353877"},{$set: { phone:"+55 (11) 981822143" ,rg: "338186463", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-15"), address: "Rua Tenente Gelás, 369, Tatuapé" , zip_code: "03090030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01039213898"},{$set: { phone:"+55 (00) 000000000" ,rg: "66111079", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-04"), address: "Avenida Magno dos Passos Bittencourt, 14369, cs 4, Barra do Una" , zip_code: "11624103" , city: "São Sebastião"}});
db.shooters.updateOne({docnum:"09028744894"},{$set: { phone:"+55 (11) 996261977" ,rg: "9813240", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-03-12"), address: "Rua Diana, 740, AP 81, Perdizes" , zip_code: "05019000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"08994378855"},{$set: { phone:"+55 (11) 999521830" ,rg: "6197121", rg_issuer: "Sspsp", tpm_filiation_dt: new Date("2024-07-18"), address: "Alameda Maracatins, 719, Alphaville residencial 10, Alphaville" , zip_code: "06550105" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"86026607820"},{$set: { phone:"+55 (11) 999013514" ,rg: "44649174", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-08-15"), address: "Rua Tutóia, 587, AP 101, Vila Mariana" , zip_code: "04007003" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01422281841"},{$set: { phone:"+55 (11) 998487066" ,rg: "13144423", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-08"), address: "Avenida Brumado de Minas, 487, Jardim Independência" , zip_code: "03224000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"78095522104"},{$set: { phone:"+55 (19) 994811616" ,rg: "55192475-5", rg_issuer: "Ssp-sp", tpm_filiation_dt: new Date("2024-07-10"), address: "Rodovia Lix da Cunha, Km 6,2, Pedra Branca" , zip_code: "13052523" , city: "Campinas"}});
db.shooters.updateOne({docnum:"01376304848"},{$set: { phone:"+55 (11) 987820444" ,rg: "8791255", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "Rua Indiana, 710, Brooklin Paulista" , zip_code: "04562001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38307964806"},{$set: { phone:"+55 (11) 945503887" ,rg: "44959672", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-14"), address: "Avenida Guilherme Giorgi, 1611, 3 casa 31, Vila Carrão" , zip_code: "03422001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"62769219715"},{$set: { phone:"+55 (11) 111111111" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-14"), address: "Rua Pintassilgo, 477, APTO 176, Vila Uberabinha" , zip_code: "04514032" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04002674460"},{$set: { phone:"+55 (11) 982319891" ,rg: "385667462", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Dominguinhos, 45, cs02, Santa Maria" , zip_code: "06147050" , city: "Osasco"}});
db.shooters.updateOne({docnum:"32711003817"},{$set: { phone:"+55 (11) 991388498" ,rg: "34844415", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-09"), address: "Avenida Padre Arlindo Vieira, 214, TOR A APTO 73, Vila Vermelha" , zip_code: "04297000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12909917827"},{$set: { phone:"+55 (11) 972042995" ,rg: "11876679x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-15"), address: "Rua Pablo Picasso, 100, apto 262 - ala arara tor b, Água Branca" , zip_code: "05036160" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25258754863"},{$set: { phone:"+55 (11) 979750008" ,rg: "279684824", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-18"), address: "Avenida Ômega, 174, Melville Empresarial I e II" , zip_code: "06472005" , city: "Barueri"}});
db.shooters.updateOne({docnum:"87675625820"},{$set: { phone:"+55 (11) 980115665" ,rg: "78496317", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-22"), address: "Rua Cotoxó, 987, APTO 22, Perdizes" , zip_code: "05021001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"47401814870"},{$set: { phone:"+55 (11) 953635922" ,rg: "54732889", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-05"), address: "Alameda Santos, 1126, apto 801, Cerqueira César" , zip_code: "01418100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"46922174801"},{$set: { phone:"+55 (11) 982153144" ,rg: "39071911", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-07"), address: "Rua Aurélia, 792, Vila Romana" , zip_code: "05046000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32689022869"},{$set: { phone:"+55 (17) 997731380" ,rg: "42511958", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-26"), address: "Rodovia SP 322 KM 524 - Sitio Barra do Ouro - Zona Rural s/n Orindiuva, 322, KM 524, Centro" , zip_code: "15480000" , city: "Orindiúva"}});
db.shooters.updateOne({docnum:"03312379890"},{$set: { phone:"+55 (11) 985999378" ,rg: "129552033", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-29"), address: "Rua Ubirajara, 72, Vila Progresso" , zip_code: "18090520" , city: "Sorocaba"}});
db.shooters.updateOne({docnum:"23663801861"},{$set: { phone:"+55 (11) 952336666" ,rg: "G084467F", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-12-14"), address: "Rua Sérgio Tomás, 422, apto 195 tor 2, Bom Retiro" , zip_code: "01131010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21636223800"},{$set: { phone:"+55 (11) 976566523" ,rg: "29285685", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-03-20"), address: "Alameda dos Manacás, 187, Morada das Flores (Aldeia da Serra)" , zip_code: "06519480" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"92247636187"},{$set: { phone:"+55 (47) 999236822" ,rg: "8486744", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-09"), address: "Rua 1950, 605, apto 1302, Centro" , zip_code: "88330472" , city: "Balneário Camboriú"}});
db.shooters.updateOne({docnum:"29857868860"},{$set: { phone:"+55 (11) 111111111" ,rg: "237809758", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-19"), address: "Rua Antônio de Lucena, 22, ap 122 tr paine, Chácara Califórnia" , zip_code: "03407050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35947010852"},{$set: { phone:"+55 (11) 997130311" ,rg: "356036054", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-09-03"), address: "Rua do Oratório, 202, APTO 273, Mooca" , zip_code: "03116000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33429390877"},{$set: { phone:"+55 (11) 983916535" ,rg: "37509993", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-15"), address: "Rua Silva Coutinho, 44, casa, Vila Oratório" , zip_code: "03192070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31698982801"},{$set: { phone:"+55 (11) 994183150" ,rg: "34215186", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-11"), address: "Avenida José Maria Whitaker, 833, Planalto Paulista" , zip_code: "04057000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32672173850"},{$set: { phone:"+55 (13) 997409688" ,rg: "326777702", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Rui Barbosa, 93, apto 201, Canto do Forte" , zip_code: "11700170" , city: "Praia Grande"}});
db.shooters.updateOne({docnum:"30327169850"},{$set: { phone:"+55 (11) 965959499" ,rg: "344105647", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua República do Togo, 182, Jardim Peri Peri" , zip_code: "05537110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31915666864"},{$set: { phone:"+55 (11) 981246686" ,rg: "33718643", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-27"), address: "Avenida Padre Arlindo Vieira, 2895, 2801, Jardim Vergueiro (Sacomã)" , zip_code: "04166003" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"34696363899"},{$set: { phone:"+55 (11) 998609607" ,rg: "334543149", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-08-22"), address: "Rua Mariz e Barros, 506, Jardim da Glória" , zip_code: "01545010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31504938895"},{$set: { phone:"+55 (11) 979531917" ,rg: "33184722x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-25"), address: "Rua Amsterdam, 2, Vila Campestre" , zip_code: "04333020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16637908843"},{$set: { phone:"+55 (19) 999556355" ,rg: "256505858", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-02"), address: "Alameda Alexandria, 153, Casa Conf. Residential T. Oriente, Condomínio Residencial Terras do Oriente" , zip_code: "13272853" , city: "Valinhos"}});
db.shooters.updateOne({docnum:"16499677809"},{$set: { phone:"+55 (11) 000000000" ,rg: "249126850", rg_issuer: "Ssp", tpm_filiation_dt: new Date("2023-08-04"), address: "Rua Ovídio Lopes, 507, Parque Boturussu" , zip_code: "03804110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31258351862"},{$set: { phone:"+55 (11) 956548484" ,rg: "33655261", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-20"), address: "RUA OURO, 215, LT 23 QDI, LOT GREN PARK, Centro" , zip_code: "13295000" , city: "Itupeva"}});
db.shooters.updateOne({docnum:"39206951866"},{$set: { phone:"+55 (00) 000000000" ,rg: "473833712", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-22"), address: "Avenida Paranaguá, 1339, Vila Paranaguá" , zip_code: "03806010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06041002720"},{$set: { phone:"+55 (11) 960575858" ,rg: "545133701", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Tenente Azevedo, 104, 156 b, Aclimação" , zip_code: "01528020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"39344687803"},{$set: { phone:"+55 (00) 000000000" ,rg: "492441157", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-06"), address: "Rua Joaquim Vaz, 62, Vila Marieta" , zip_code: "03618080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14747888829"},{$set: { phone:"+55 (11) 944886228" ,rg: "19.640.724-2", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-05-08"), address: "Rua Jerusalém, 329, Parque Oratório" , zip_code: "09260140" , city: "Santo André"}});
db.shooters.updateOne({docnum:"36788071861"},{$set: { phone:"+55 (19) 974084108" ,rg: "48678974", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-07"), address: "Rua Roque Faccio, 70, Jardim dos Calegaris" , zip_code: "13140119" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"22464673811"},{$set: { phone:"+55 (11) 967356397" ,rg: "263288006", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-30"), address: "Rua Elvira Silva, 44, Lauzane Paulista" , zip_code: "24422000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04049925958"},{$set: { phone:"+55 (47) 999017304" ,rg: "4044441", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-09"), address: "Rua das Andorinhas, 305, Costa e Silva" , zip_code: "89220020" , city: "Joinville"}});
db.shooters.updateOne({docnum:"34896583884"},{$set: { phone:"+55 (00) 000000000" ,rg: "441528806", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-16"), address: "Rua Lourenço Cândido de Siqueira, 95, casa 01, Jardim Arize" , zip_code: "03573140" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01226897800"},{$set: { phone:"+55 (11) 989211106" ,rg: "124333102", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-16"), address: "Rua dos Mártires Armênios, 1120, Barro Branco (Zona Norte)" , zip_code: "02345000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01683466802"},{$set: { phone:"+55 (11) 111111111" ,rg: "11111111111", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-14"), address: "Avenida Jorge Zarur, 858, – AP 1801, Jardim Aquárius" , zip_code: "12242020" , city: "São José dos Campos"}});
db.shooters.updateOne({docnum:"28927325818"},{$set: { phone:"+55 (47) 991429375" ,rg: "30230812-X", rg_issuer: "SSP SP", tpm_filiation_dt: new Date("2024-09-25"), address: "Rua Francisco Bernardo Boticher, 124, casa, Santa Catarina" , zip_code: "89212700" , city: "Joinville"}});
db.shooters.updateOne({docnum:"22033057895"},{$set: { phone:"+55 (00) 000000000" ,rg: "27368241", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-13"), address: "Rua Prefeito Rinaldo Poli, 826, Jardim City" , zip_code: "07082530" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"07558106869"},{$set: { phone:"+55 (11) 1000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-11"), address: "Rua Tuiucuê, 51, APTO 51, Jardim da Saúde" , zip_code: "04149130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"84461187691"},{$set: { phone:"+55 (31) 987927877" ,rg: "M5960956", rg_issuer: "Policia Civil", tpm_filiation_dt: new Date("2024-05-03"), address: "Rua do Serro, 136, Bonfim" , zip_code: "31210100" , city: "Belo Horizonte"}});
db.shooters.updateOne({docnum:"22476509884"},{$set: { phone:"+55 (11) 962333364" ,rg: "305427106", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-15"), address: "Rua Cambará, 88, Vila Bertioga" , zip_code: "03188040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"11748806866"},{$set: { phone:"+55 (11) 100000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-06-27"), address: "RUA LOURENCO DE CARVALHO, 280, APTO 11, Centro" , zip_code: "00000000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28734305831"},{$set: { phone:"+55 (11) 111111111" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-11"), address: "Rua Serra de Jairé, 1539, Quarta Parada" , zip_code: "03175001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27678994842"},{$set: { phone:"+55 (11) 940214346" ,rg: "24406393", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "Rua Jacques Pilon, 132, Vila Piauí" , zip_code: "05109160" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36818555870"},{$set: { phone:"+55 (11) 930907507" ,rg: "336139850", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-13"), address: "Rua Doutor Miranda de Azevedo, 1285, ap 118 tor 1, Vila Anglo Brasileira" , zip_code: "05027000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"63643480849"},{$set: { phone:"+55 (11) 999725863" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-16"), address: "Estrada da Cachoeirinha, 300, Sorocamirim (Canguera)" , zip_code: "18145101" , city: "São Roque"}});
db.shooters.updateOne({docnum:"25801698817"},{$set: { phone:"+55 (35) 88651971" ,rg: "22378959", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-17"), address: "maria rita de faria, 388, santo antonio" , zip_code: "37545000" , city: "Cachoeira de Minas"}});
db.shooters.updateOne({docnum:"14840062838"},{$set: { phone:"+55 (11) 111111111" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-06"), address: "Rua Jacunda, 380, Jardim Panorama" , zip_code: "05679060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"84696974715"},{$set: { phone:"+55 (11) 971772300" ,rg: "309133907", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-10"), address: "Rua Avaré, 261, Consolação" , zip_code: "01243030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"47563656634"},{$set: { phone:"+55 (00) 000000000" ,rg: "2084668", rg_issuer: "mg", tpm_filiation_dt: new Date("2023-01-31"), address: "Rua Arataca, 250, cs 1, Chácara Monte Alegre" , zip_code: "04645070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29436170831"},{$set: { phone:"+55 (11) 965593517" ,rg: "28473747", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-27"), address: "AV FRANCISCO M CEGARRA, 422, itaguai, Centro" , zip_code: "11730000" , city: "Mongaguá"}});
db.shooters.updateOne({docnum:"32750685800"},{$set: { phone:"+55 (11) 985754878" ,rg: "414887542", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-05-25"), address: "Rua Esgueira, 19, Jardim Turquesa" , zip_code: "04943030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26237665846"},{$set: { phone:"+55 (11) 972702570" ,rg: "33235863", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-06"), address: "Avenida Giovanni Gronchi, 5441, AP 22, Vila Andrade" , zip_code: "05724003" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"16286382810"},{$set: { phone:"+55 (11) 981148881" ,rg: "128856737", rg_issuer: "SSP-SP", tpm_filiation_dt: new Date("2024-06-07"), address: "Avenida Pavão, 211, APTO 111, Indianópolis" , zip_code: "04516010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"26733022800"},{$set: { phone:"+55 (11) 947411909" ,rg: "264411183", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-06"), address: "Rua Manuel Pereira Lobo, 156, casa, Água Rasa" , zip_code: "03179060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"34085128841"},{$set: { phone:"+55 (11) 931436888" ,rg: "442009938", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-22"), address: "Avenida João Neri de Carvalho, 181, Vila Rosaria" , zip_code: "08021010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30839063822"},{$set: { phone:"+55 (11) 959518736" ,rg: "34430359-7", rg_issuer: "sp", tpm_filiation_dt: new Date("2024-03-06"), address: "Rua Bento Araújo, 149, Bl B APT 102, Barro Branco (Zona Norte)" , zip_code: "02345040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28571675805"},{$set: { phone:"+55 (11) 985802507" ,rg: "254096426", rg_issuer: "ssp", tpm_filiation_dt: new Date("2024-03-12"), address: "Avenida Edu Chaves, 639, ap136, Parque Edu Chaves" , zip_code: "02229000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"85596850810"},{$set: { phone:"+55 (11) 999973300" ,rg: "5589155", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-24"), address: "Rua Curitiba, 339, apto 211, Paraíso" , zip_code: "04005030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25979278818"},{$set: { phone:"+55 (11) 980304788" ,rg: "24889679", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-03-02"), address: "Rua Assungui, 575, Vila Gumercindo" , zip_code: "04131001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12637798831"},{$set: { phone:"+55 (00) 000000000" ,rg: "18600220", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-27"), address: "Rua Ambrizette, 120, apto 41, Jardim Fonte do Morumbi" , zip_code: "05704020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28068918841"},{$set: { phone:"+55 (11) 948515555" ,rg: "281482755", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-18"), address: "Rua Camille Pissarro, 462, Tamboré" , zip_code: "06544722" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"26431526899"},{$set: { phone:"+55 (11) 947271997" ,rg: "262412925", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-02-27"), address: "Rua Augusto Farina, 1158, cs 1, Jardim Bonfiglioli" , zip_code: "05594001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22418800865"},{$set: { phone:"+55 (19) 993483470" ,rg: "36128648x", rg_issuer: "sspsp", tpm_filiation_dt: new Date("2024-05-24"), address: "Rua Maestro Tom Jobim, 30, Jd Do Lago, Jardim do Lago" , zip_code: "13050009" , city: "Campinas"}});
db.shooters.updateOne({docnum:"13746977886"},{$set: { phone:"+55 (11) 971443506" ,rg: "12550834", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-28"), address: "Rua Bahia, 254, AP 5, Higienópolis" , zip_code: "01244000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35031189851"},{$set: { phone:"+55 (11) 956074827" ,rg: "344596552", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-03"), address: "Rua Maestro João Sepe, 44, Jardim Maria Estela" , zip_code: "04181030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12395558818"},{$set: { phone:"+55 (11) 111111111" ,rg: "111111111111111", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-14"), address: "Alameda Valência, 36, Alphaville" , zip_code: "06544004" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"26147627848"},{$set: { phone:"+55 (11) 947783509" ,rg: "290185245", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2023-09-19"), address: "Rua Tauandê, 19, A, Vila Formosa" , zip_code: "03358010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"10636786846"},{$set: { phone:"+55 (00) 000000000" ,rg: "13129569X", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-02"), address: "Rua Manuel da Nóbrega, 223, apto 152, Paraíso" , zip_code: "04001081" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28468488828"},{$set: { phone:"+55 (11) 986699997" ,rg: "303273562", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-07-12"), address: "Praça das Nações Unidas, 58, ap 0, Jardim Europa" , zip_code: "01449010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25930782865"},{$set: { phone:"+55 (11) 981350909" ,rg: "268047595", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Rua João Antônio de Oliveira, 544, apto  403 Torre Trivento, Mooca" , zip_code: "03111010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"35691766813"},{$set: { phone:"+55 (00) 000000000" ,rg: "469684252", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-03-01"), address: "RUA CEL MARQUES, 752, Centro" , zip_code: "03440000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04582294901"},{$set: { phone:"+55 (47) 997649005" ,rg: "4179874", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-03"), address: "Rua Cidade de Mafra, 135, Santa Catarina" , zip_code: "89212712" , city: "Joinville"}});
db.shooters.updateOne({docnum:"04582295983"},{$set: { phone:"+55 (47) 997882936" ,rg: "4179877", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-03"), address: "Rua Cidade de Mafra, 135, Santa Catarina" , zip_code: "89212712" , city: "Joinville"}});
db.shooters.updateOne({docnum:"25193292895"},{$set: { phone:"+55 (11) 995938667" ,rg: "22311674", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-17"), address: "Rua Leopoldo Fróes, 31, Alto da Mooca" , zip_code: "03184040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27640326842"},{$set: { phone:"+55 (11) 994711109" ,rg: "19791325", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-03-20"), address: "Alameda dos Manacás, 187, Morada das Flores (Aldeia da Serra)" , zip_code: "06519480" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"21263615864"},{$set: { phone:"+55 (11) 994267777" ,rg: "251055899", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-04-23"), address: "Rua José Antônio Coelho, 220, apto 12, Vila Mariana" , zip_code: "04011060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22779719877"},{$set: { phone:"+55 (11) 967121560" ,rg: "32616909x", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-15"), address: "Rua Santo Henrique, 1105, Vila Ré" , zip_code: "03664010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22677193809"},{$set: { phone:"+55 (11) 949958589" ,rg: "320584598", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-11"), address: "Avenida João Peixoto Viegas, 195, apto 243 brisa, Jardim Consórcio" , zip_code: "04437000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22349683800"},{$set: { phone:"+55 (11) 930005555" ,rg: "333619262", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-06"), address: "Rua Itza, 80, ap 24, Jardim Modelo" , zip_code: "02261010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29776688888"},{$set: { phone:"+55 (11) 942256757" ,rg: "298255522", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-26"), address: "Rua Padre Pedro Rota, 161, cs 2, Vila Macedópolis" , zip_code: "03237060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25506666829"},{$set: { phone:"+55 (11) 947149723" ,rg: "249118737", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-09-26"), address: "Rua Padre Manuel Rodrigues da Costa, 18, Vila Rica" , zip_code: "03911180" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"51041761856"},{$set: { phone:"+55 (11) 949706395" ,rg: "60176610", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-15"), address: "Rua Galeão, 436, Vila Nova" , zip_code: "03288000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"13802856821"},{$set: { phone:"+55 (19) 974051307" ,rg: "212896817", rg_issuer: "ssp-sp", tpm_filiation_dt: new Date("2024-06-07"), address: "Rua Jundiaí, 72, Centro" , zip_code: "13280071" , city: "Vinhedo"}});
db.shooters.updateOne({docnum:"30378288890"},{$set: { phone:"+55 (11) 100000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-11"), address: "Rua Madre Emilie de Villeneuve, 354, Vila Santa Catarina" , zip_code: "04367090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21996996843"},{$set: { phone:"+55 (11) 961145899" ,rg: "333460169", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-11"), address: "Rua Cuiabá, 55, apto 73, Alto da Mooca" , zip_code: "03183000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23007201837"},{$set: { phone:"+55 (11) 998224455" ,rg: "447696518", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-02"), address: "Rua José Inácio Chrispim, 54, Nova Caieiras" , zip_code: "07703070" , city: "Caieiras"}});
db.shooters.updateOne({docnum:"27542891863"},{$set: { phone:"+55 (11) 962127551" ,rg: "281052724", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-12"), address: "Avenida Vereador Antônio Grotkowski, 575, AP 13, Vila Santa Maria" , zip_code: "07121000" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"16989047895"},{$set: { phone:"+55 (11) 997738193" ,rg: "272558552", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-05"), address: "Rua da Meação, 197, apto 252, Vila Regente Feijó" , zip_code: "03335045" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"30718873882"},{$set: { phone:"+55 (11) 947989416" ,rg: "35359976", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-17"), address: "Estrada Prefeito Bento Rotger Domingues, 171, da Lagoa" , zip_code: "06872255" , city: "Itapecerica da Serra"}});
db.shooters.updateOne({docnum:"44735090878"},{$set: { phone:"+55 (00) 000000000" ,rg: "32309247", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-10"), address: "Rua Bélgica, 60, Jardim Europa" , zip_code: "01448030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24305827832"},{$set: { phone:"+55 (11) 961966688" ,rg: "F305004B", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-06-29"), address: "Rua João Roncon, 76, Roncon" , zip_code: "09410590" , city: "Ribeirão Pires"}});
db.shooters.updateOne({docnum:"92773567404"},{$set: { phone:"+55 (11) 982475090" ,rg: "574134840", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-20"), address: "Alameda dos Tupiniquins, 57, apto 101, Planalto Paulista" , zip_code: "04077000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"12573879879"},{$set: { phone:"+55 (11) 100000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-07-11"), address: "Avenida Cassandoca, 569, Mooca" , zip_code: "03169010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33470124884"},{$set: { phone:"+55 (11) 111111111" ,rg: "111111111111111", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-14"), address: "Rua Ipomeias, 173 –, CASA 04, Vila Bela" , zip_code: "03201050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"31134489803"},{$set: { phone:"+55 (11) 973772625" ,rg: "22653501", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-05"), address: "Rua Doutor Samuel Porto, 373, ap 171, Saúde" , zip_code: "04054010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"34397767866"},{$set: { phone:"+55 (11) 994555180" ,rg: "43605418", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-14"), address: "Rua Baronesa de Itu, 830, AP 12 AN 12, Santa Cecília" , zip_code: "01231000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"56645805853"},{$set: { phone:"+55 (11) 995088022" ,rg: "55526445", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-24"), address: "Rua Professor Pedreira de Freitas, 320, apto 32, Tatuapé" , zip_code: "03312052" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37853881878"},{$set: { phone:"+55 (11) 981140304" ,rg: "44743349", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-13"), address: "Rua Dois de Julho, 740, 2 ANDAR 16 AO 18, Ipiranga" , zip_code: "04215000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06382693855"},{$set: { phone:"+55 (11) 111111111" ,rg: "411111111111", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-08-14"), address: "Rua Benedito Cesário, 35, Penha de França" , zip_code: "03641020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"99709945815"},{$set: { phone:"+55 (11) 975570207" ,rg: "4698313", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-03"), address: "Alameda Hong Kong, 120, Tamboré" , zip_code: "06543070" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"18487621864"},{$set: { phone:"+55 (11) 947221394" ,rg: "241115401", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Antoninho de Melo Bueno, 251, Vila Santa Margarida" , zip_code: "08543100" , city: "Ferraz de Vasconcelos"}});
db.shooters.updateOne({docnum:"09122104860"},{$set: { phone:"+55 (11) 991626177" ,rg: "197111051", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-09"), address: "Rua Doutor Clementino, 320, bl 1 ap 264, Belenzinho" , zip_code: "03059030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"14836574854"},{$set: { phone:"+55 (11) 991651338" ,rg: "197595017", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-16"), address: "Rua Major Freire, 594, APTO 104, Vila Monte Alegre" , zip_code: "04304110" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"02615364782"},{$set: { phone:"+55 (11) 999163535" ,rg: "228178253", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-07"), address: "Rua Marina Crespi, 118, bl c ap 13, Mooca" , zip_code: "03112090" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"06523950824"},{$set: { phone:"+55 (11) 944998202" ,rg: "193474827", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-07-15"), address: "Rua Urbano do Couto, 153, Alto da Mooca" , zip_code: "03183080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03661634852"},{$set: { phone:"+55 (16) 981189162" ,rg: "68289911", rg_issuer: "", tpm_filiation_dt: new Date("2024-03-11"), address: "Alameda das Sibipirunas, 576, QG LOT 3, Residencial Jardim Primavera" , zip_code: "13291266" , city: "Louveira"}});
db.shooters.updateOne({docnum:"26735120809"},{$set: { phone:"+55 (11) 991881111" ,rg: "274680099", rg_issuer: "SSP", tpm_filiation_dt: new Date("2021-01-12"), address: "Rua Rui Barbosa Lima, 97, Vila Curuçá" , zip_code: "08030730" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28005259832"},{$set: { phone:"+55 (11) 967917118" ,rg: "26257.242-4", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-12-07"), address: "Rua Cayowaá, 1520, apto 121, Sumaré" , zip_code: "01258010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33758207800"},{$set: { phone:"+55 (11) 969148974" ,rg: "25622279", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-08"), address: "Rua Jacarandá Preto, 493, Vila Industrial" , zip_code: "03251070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28735114860"},{$set: { phone:"+55 (11) 999701447" ,rg: "302218786", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-23"), address: "Rua Dona Salwa Saigh Calfat, 135, Vila Tramontano" , zip_code: "05691050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"88096491920"},{$set: { phone:"+55 (45) 991515300" ,rg: "5.772.975-9", rg_issuer: "sesp/pr", tpm_filiation_dt: new Date("2024-07-18"), address: "Rua Presidente Bernardes, 1289, Neva" , zip_code: "85802140" , city: "Cascavel"}});
db.shooters.updateOne({docnum:"00762782633"},{$set: { phone:"+55 (31) 983840304" ,rg: "5382902", rg_issuer: "sspmg", tpm_filiation_dt: new Date("2024-04-21"), address: "Rua Mercúrio, 09, Ana Lúcia" , zip_code: "34710180" , city: "Sabará"}});
db.shooters.updateOne({docnum:"31646976860"},{$set: { phone:"+55 (11) 999946628" ,rg: "406136853", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-23"), address: "Rua Ernesto Bottoni, 814, Jardim Adelfiore" , zip_code: "05223000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"34905167884"},{$set: { phone:"+55 (11) 983814838" ,rg: "438479294", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-07"), address: "Rua Antônio Padovani, 34, Saltinho" , zip_code: "13145536" , city: "Paulínia"}});
db.shooters.updateOne({docnum:"26165518885"},{$set: { phone:"+55 (11) 964500194" ,rg: "28263840", rg_issuer: "", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua Urbano do Couto, 74, Alto da Mooca" , zip_code: "03183080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"48558650870"},{$set: { phone:"+55 (11) 993423434" ,rg: "39578869", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-22"), address: "Rua Ana Heleno Baldinato, 88, Jardim Tietê" , zip_code: "03943080" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36014945822"},{$set: { phone:"+55 (11) 973993465" ,rg: "34372301", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-07-16"), address: "Travessa Paulo Amato, 7, Vila Santa Catarina" , zip_code: "04369070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36964849890"},{$set: { phone:"+55 (11) 954254685" ,rg: "40180211", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-08-19"), address: "Rua Francisco Matias, 109, Jardim Sapopemba" , zip_code: "03975050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27267981879"},{$set: { phone:"+55 (11) 111111111" ,rg: "0", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-22"), address: "Rua Oswaldo Arouca, 507, APTO94, Vila Formosa" , zip_code: "03363000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41537544802"},{$set: { phone:"+55 (11) 991008692" ,rg: "481485673", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-15"), address: "Rua Tomotsu Tani, 180, apto 101 BL E, Meu Cantinho" , zip_code: "08664665" , city: "Suzano"}});
db.shooters.updateOne({docnum:"23526385858"},{$set: { phone:"+55 (11) 933666666" ,rg: "V4534825", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-24"), address: "Rua Tabor, 647, bl c, Ipiranga" , zip_code: "04202021" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23326833806"},{$set: { phone:"+55 (11) 981568838" ,rg: "v463117m", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-06-13"), address: "Rua Lino Coutinho, 75, Ipiranga" , zip_code: "04207000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"37409404841"},{$set: { phone:"+55 (11) 970162670" ,rg: "Y272614Y", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-23"), address: "Rua Mil Oitocentos e Vinte e Dois, 1453, APTO 158, Ipiranga" , zip_code: "04216001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"09150367897"},{$set: { phone:"+55 (11) 996578332" ,rg: "19300325", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-07"), address: "Rua Serra de Botucatu, 2153, AP 114 BL 2, Chácara Califórnia" , zip_code: "03417000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"07750351817"},{$set: { phone:"+55 (11) 997016855" ,rg: "137404037", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-06"), address: "Rua Dom Bosco, 206, Mooca" , zip_code: "03105020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"41806963809"},{$set: { phone:"+55 (11) 980232561" ,rg: "48530533", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-03-06"), address: "" , zip_code: "" , city: ""}});
db.shooters.updateOne({docnum:"10041186869"},{$set: { phone:"+55 (11) 00000000" ,rg: "0", rg_issuer: "0", tpm_filiation_dt: new Date("2024-06-27"), address: "Rua Roger Ducasse, 55, apto 51 b, Conjunto Habitacional Teotonio Vilela" , zip_code: "03928230" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"29687078847"},{$set: { phone:"+55 (11) 983877816" ,rg: "343555888", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-09-22"), address: "Rua Antônio Leal da Silva, 436, Jardim Sapopemba" , zip_code: "03975070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"40007694806"},{$set: { phone:"+55 (11) 949654564" ,rg: "491354526", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-02"), address: "Rua Esquivel Navarro, 611, comp 14A, Conjunto Habitacional Teotonio Vilela" , zip_code: "03928130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"42928371800"},{$set: { phone:"+55 (11) 972001093" ,rg: "491296344", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-26"), address: "Rua Enéas de Barros, 678, Vila Santana" , zip_code: "03613000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33609823801"},{$set: { phone:"+55 (00) 000000000" ,rg: "307974078", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-06-22"), address: "Rua Almirante Calheiros, 264, Tatuapé" , zip_code: "03066070" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"04944850867"},{$set: { phone:"+55 (11) 999840929" ,rg: "165432299", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-04"), address: "Alameda Santos, 455, cj 1204, Cerqueira César" , zip_code: "01419000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22286909881"},{$set: { phone:"+55 (11) 995718891" ,rg: "29375346", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-13"), address: "Rua Doutor Albuquerque Lins, 1151, apto 31, Santa Cecília" , zip_code: "01230001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"25937045866"},{$set: { phone:"+55 (11) 991382105" ,rg: "30456803", rg_issuer: "SSPSP", tpm_filiation_dt: new Date("2024-07-11"), address: "Rua Doutor Joviano Telles, 95, Brooklin Paulista" , zip_code: "04623120" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"28815938877"},{$set: { phone:"+55 (11) 999849120" ,rg: "33656002.3", rg_issuer: "Sspsp", tpm_filiation_dt: new Date("2024-09-19"), address: "Rua Estevão Baião, 520, 84 B, Vila Congonhas" , zip_code: "04624000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"34029526888"},{$set: { phone:"+55 (11) 996254583" ,rg: "438803188", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-09"), address: "Rua Dom João V, 610, AP 42, Lapa" , zip_code: "05075060" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"36799299869"},{$set: { phone:"+55 (11) 986234536" ,rg: "456133641", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-06-12"), address: "Rua Voluntários da Pátria, 95, Jardim Santa Luiza" , zip_code: "08555020" , city: "Poá"}});
db.shooters.updateOne({docnum:"09866173933"},{$set: { phone:"+55 (47) 991467555" ,rg: "6530640", rg_issuer: "SSPSC", tpm_filiation_dt: new Date("2024-08-08"), address: "Rua Roberto Paulo Brunkow, 305, Anita Garibaldi" , zip_code: "89203285" , city: "Joinville"}});
db.shooters.updateOne({docnum:"42350415848"},{$set: { phone:"+55 (11) 987114421" ,rg: "492058660", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-03"), address: "Rua Lourenço Collino, 167, Presidente Altino" , zip_code: "06216260" , city: "Osasco"}});
db.shooters.updateOne({docnum:"26974532881"},{$set: { phone:"+55 (11) 947893011" ,rg: "291952732", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-02-03"), address: "Rua Tapuitinga, 16, Vila Mafra" , zip_code: "03414040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"42672123845"},{$set: { phone:"+55 (11) 959026935" ,rg: "54187921", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-08-10"), address: "Rua Leila Acras, 36, Jardim Leila" , zip_code: "07121010" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"39320410895"},{$set: { phone:"+55 (11) 961442356" ,rg: "485430836", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-04-27"), address: "Avenida Escragnolle Dória, 147, Jardim Vila Formosa" , zip_code: "03470000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"03783289807"},{$set: { phone:"+55 (11) 977057737" ,rg: "152705156", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-11-05"), address: "Rua Senador Godói, 616, Vila São Geraldo" , zip_code: "03608000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27642116861"},{$set: { phone:"+55 (11) 992081531" ,rg: "295104284", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-06"), address: "Rua Cabo José Clemeneano de Carvalho, 260, Jardim Avelino" , zip_code: "03226000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"10501172807"},{$set: { phone:"+55 (00) 000000000" ,rg: "9557668", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-04-25"), address: "Rua Roque Petrella, 811, FD, Vila Cordeiro" , zip_code: "04581051" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"00406444803"},{$set: { phone:"+55 (11) 999475697" ,rg: "12294338", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-09-17"), address: "Rua Flores de Goiás, 161, Vila Rosália" , zip_code: "07070120" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"27511690823"},{$set: { phone:"+55 (11) 974023663" ,rg: "304772471", rg_issuer: "", tpm_filiation_dt: new Date("2024-03-01"), address: "Rua Madre de Deus, 1238, Mooca" , zip_code: "03119001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"38450490812"},{$set: { phone:"+55 (11) 995388523" ,rg: "466803771", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-21"), address: "Rua Xingu, 15, Cidade São Pedro - Gleba A" , zip_code: "06535120" , city: "Santana de Parnaíba"}});
db.shooters.updateOne({docnum:"39000019877"},{$set: { phone:"+55 (11) 964459809" ,rg: "383734708", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-01-02"), address: "Rua François Coty, 124, apto 607, Cambuci" , zip_code: "01524030" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"48651961880"},{$set: { phone:"+55 (19) 982224124" ,rg: "437373976", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-06-07"), address: "Avenida Júlio Prestes, 574, Taquaral" , zip_code: "13076001" , city: "Campinas"}});
db.shooters.updateOne({docnum:"60088366340"},{$set: { phone:"+55 (11) 949237242" ,rg: "V3963793", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-11-28"), address: "Rua Cipriano Barata, 926, AP 212 BL A, Ipiranga" , zip_code: "04205000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"27860311844"},{$set: { phone:"+55 (00) 000000000" ,rg: "257653910", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-11-18"), address: "Rua Arandu, 481, APTO 72, Brooklin Paulista" , zip_code: "04562031" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33574965850"},{$set: { phone:"+55 (00) 000000000" ,rg: "", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-10-06"), address: "Rua São Lázaro, 299, A, Luz" , zip_code: "01103020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23996958870"},{$set: { phone:"+55 (11) 974999999" ,rg: "85050600682018", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-07-20"), address: "Rua Vinte e Cinco de Janeiro, 180, BL 1 AP64, Luz" , zip_code: "01103000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23791467808"},{$set: { phone:"+55 (11) 993435302" ,rg: "668728863", rg_issuer: "SSP/SP", tpm_filiation_dt: new Date("2024-05-22"), address: "Rua Doutor Sílvio Noronha, 247, Cidade Continental" , zip_code: "03242040" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"32949581889"},{$set: { phone:"+55 (11) 994123745" ,rg: "29446999", rg_issuer: "SSP", tpm_filiation_dt: new Date("2023-01-12"), address: "Rua André Bernardes, 00, Parque Cruzeiro do Sul" , zip_code: "08070290" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24183408806"},{$set: { phone:"+55 (11) 932832013" ,rg: "F067281YDIREXEX", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-12-09"), address: "Avenida Vila Ema, 2776, Vila Ema" , zip_code: "03282000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"40472486810"},{$set: { phone:"+55 (11) 988030303" ,rg: "4434211012", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-10-17"), address: "Rua Florianópolis, 275, ap 101, Vila Bertioga" , zip_code: "03185050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"33475981807"},{$set: { phone:"+55 (19) 988125477" ,rg: "42795268", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-09-26"), address: "Rua Oscar Leite, 200, Ponte Preta" , zip_code: "13041620" , city: "Campinas"}});
db.shooters.updateOne({docnum:"18046382850"},{$set: { phone:"+55 (11) 995504594" ,rg: "", rg_issuer: "", tpm_filiation_dt: new Date("2024-03-14"), address: "Rua Presidente Franklin Delano Roosevelt, 27, APTO 13, Itararé" , zip_code: "11320170" , city: "São Vicente"}});
db.shooters.updateOne({docnum:"17575461892"},{$set: { phone:"+55 (19) 982200401" ,rg: "26.423.972-6", rg_issuer: "SSP", tpm_filiation_dt: new Date("2024-05-02"), address: "Praça Reynaldo Chiavegato, 301, BL 05 AP 08, Jardim Dona Irma" , zip_code: "13917048" , city: "Jaguariúna"}});
db.shooters.updateOne({docnum:"14514962813"},{$set: { phone:"+55 (11) 997406001" ,rg: "24538391", rg_issuer: "SSP", tpm_filiation_dt: new Date("2022-12-23"), address: "Avenida Ordem e Progresso, 1030, Jardim das Laranjeiras" , zip_code: "02518130" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23381199838"},{$set: { phone:"+55 (11) 979664128" ,rg: "V625056G", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-12-14"), address: "Rua Taquari, 956, APTO 223, Mooca" , zip_code: "03166000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23373678862"},{$set: { phone:"+55 (11) 958585822" ,rg: "V606611L", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-08-07"), address: "Rua Oriente, 108, casa 05, Brás" , zip_code: "03016000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23709298806"},{$set: { phone:"+55 (11) 941005288" ,rg: "G1203462", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-03-21"), address: "Rua Catumbi, 1139, apto 205, Catumbi" , zip_code: "03021000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23366767880"},{$set: { phone:"+55 (11) 976623137" ,rg: "G486725", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-04-04"), address: "Rua Ipanema, 67, apto 104 BL D, Mooca" , zip_code: "03164200" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23810153885"},{$set: { phone:"+55 (11) 958183698" ,rg: "G158918-0", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-28"), address: "Rua Cabo João Teruel Fregoni, 46, CS 2, Ponte Grande" , zip_code: "07032000" , city: "Guarulhos"}});
db.shooters.updateOne({docnum:"23908457890"},{$set: { phone:"+55 (11) 988474438" ,rg: "g269813w", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-24"), address: "Rua Doutor Raul da Rocha Medeiros, 114, bl alfa apt 1304, Tatuapé" , zip_code: "03071100" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24022948841"},{$set: { phone:"+55 (11) 985279915" ,rg: "F2839810", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-01-24"), address: "Rua Barão de Duprat, 317, 325 - LJ 116, Centro" , zip_code: "01023001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23236222859"},{$set: { phone:"+55 (11) 987799555" ,rg: "V465232C", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-10-24"), address: "Rua Afonso de Freitas, 69, AP 194, Paraíso" , zip_code: "04006050" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"22025104863"},{$set: { phone:"+55 (11) 949401030" ,rg: "Y273634N", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-02-02"), address: "Rua Taquari, 956, Mooca" , zip_code: "03166001" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"01834340489"},{$set: { phone:"+55 (11) 981568838" ,rg: "v622807c", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-28"), address: "Rua Behring, 138, Brás" , zip_code: "03023020" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24241109802"},{$set: { phone:"+55 (11) 959091111" ,rg: "f124131b", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-12-19"), address: "Rua Paulo Andrighetti, 1565, TOR B2 ED PRISM AP85, Alto do Pari" , zip_code: "03022000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23299671871"},{$set: { phone:"+55 (11) 982788006" ,rg: "V4425521-W", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2024-02-01"), address: "Rua Tabor, 647, APTO 182 B, Ipiranga" , zip_code: "04202021" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21780916876"},{$set: { phone:"+55 (11) 980901345" ,rg: "Y2439975", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-08-16"), address: "Rua Orfanato, 411, MONO 92, Vila Prudente" , zip_code: "03131010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23121810880"},{$set: { phone:"+55 (11) 910055888" ,rg: "36459534", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "Rua Gama Cerqueira, 505, AP 123, Cambuci" , zip_code: "01539010" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"23062124814"},{$set: { phone:"+55 (11) 958498888" ,rg: "v3939647", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-26"), address: "Rua Anhangüera, 436, tor a ap 192, Barra Funda" , zip_code: "01135000" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"21766056830"},{$set: { phone:"+55 (11) 991299934" ,rg: "Y244025O", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "EST DO NABURU HANAI, 130, Centro" , zip_code: "06950000" , city: "Juquitiba"}});
db.shooters.updateOne({docnum:"23483478817"},{$set: { phone:"+55 (11) 954406488" ,rg: "G102301Q", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2023-10-18"), address: "Rua Baguassu, 151, AP 151, Vila Regente Feijó" , zip_code: "03344015" , city: "São Paulo"}});
db.shooters.updateOne({docnum:"24090834805"},{$set: { phone:"+55 (11) 981316078" ,rg: "85050656282017", rg_issuer: "CGPI/ DIREX/ DPF", tpm_filiation_dt: new Date("2022-09-26"), address: "Avenida Roland Garros, 2364, compl b, Jardim Brasil (Zona Norte)" , zip_code: "02235001" , city: "São Paulo"}});


db.time_records.aggregate([
              {$match:{eventId:'67056f35f80a35979f51bd47'}}
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
            //  ]).toArray();
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooter", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$event", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$division", 0 ] }, "$$ROOT" ] } } }
              ,{$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$shooters_divisions", 0 ] }, "$$ROOT" ] } } }
              ,{$group:{
                  _id:["$shooterId", "$email" , "$name" ,"$gun", "$vl_first_try", "$vl_second_try", "$vl_other_tries"],
                  tries:{$count:{}}
              }}
          ]).toArray();

          
const gun_collection= [{ shooterId: '',gun: 'Estrada Velha do Mar, 3100 - Riacho Grande',city: 'São Bernardo do Campo',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Naja',address: 'Rua do Manifesto, 1421 - Ipiranga - SP',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT Rangers',address: 'Rua Raphael Perissinoto, km 1 - Rural',city: 'Paulínia',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT Raposo',address: 'R. Ifema, 1166',city: 'Vargem Grande Paulista',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CT São Roque',address: 'Estrada do Paraíso, 274',city: 'São Roque',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CTR Rangers Paulínia',address: '',city: 'Paulínia',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'CTR Rangers Cosmópolis',address: '',city: 'Cosmópolis',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Continental - SBC',address: '',city: 'SBC',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'OPS Adventure',address: 'Av. Dom Pedro I, 221 - Vila América',city: 'Santo André',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Raid Alphaville ',address: 'Al. Araguaia, 401',city: 'Barueri ',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'The Continental', address: 'Av. Índico, 759', city: 'São Bernardo do Campo', state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'The Redneck Club',address: 'Av Pauliceia, 5049',city: 'Caieiras',state: 'SP', adm: ['pris.rocha@gmail.com']}
,{ local: 'Typhoon',address: 'Rua João Rudge, 294 - Casa Verde',city: 'São Paulo',state: 'SP', adm: ['pris.rocha@gmail.com']}];

// mongoimport --db=standby --collection=gun_collection --jsonArray --file=acervo.js --type=json --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuu --password=pwdpwdpwd --legacy

db.shooters.aggregate([
    { $addFields: {"_shooterId": { "$toString": "$_id" }}}
    ,{$lookup:{
        from: "gun_collection"
        ,localField: "_shooterId"
        ,foreignField: "shooterId"
        ,as: "gun_collection"
        ,pipeline:[
            { $addFields: {"_gunId": { $toObjectId: "$gunId" }}}
            ,{$lookup:{
                from: "guns"
                ,localField: "_gunId"
                ,foreignField: "_id"
                ,as: "gun_det"
                ,pipeline:[
                    { $project: { type:1, factory:1, model:1, caliber:1, operation:1, alias: { $concat: [ "$factory", " ", "$model", " (", "$caliber", ")" ] } } }
                ]
                }
            }
        ]        
        }
    }
    ,{$match:{"_shooterId": "66ee2e865bd600de9529449f"}}
  ]);