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