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
    ,factory: "Luger"
    ,model: "P08"
    ,caliber: "7.65mm"
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



