import {Client, fql } from 'fauna';

exports.handler = async (event, context) => {

    const client=  new Client({secret: 'fnAFUrTn2MAAQH6F9ddrST8F_CG-MxlsUfOXbLHn'});
    const query= fql`
    Division.all().where(.Event.id=="383563521574568000")`;
    client.query(query)
        .then(ret=>{return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ret)
        }})
    // return {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Headers": "Authorization, Content-Type",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({'id':123
    //     ,'name':'1o. TPM Aldea da Serra'
    //     ,'date':'10/12/2024'
    //     ,'divisions':[{'id':1, 'name':'Pistol', 'categories':{'overall':true,'ladies':false,'advance':true,'optics':false,'seniors':false},'advanceLimit':{'passingScore':5,'topBestOf':-1}}
    //                  ,{'id':2, 'name':'Revolver', 'categories':{'overall':true,'ladies':true,'advance':true,'optics':true,'seniors':true},'advanceLimit':{'passingScore':5,'topBestOf':-1}}
    //                  ,{'id':3, 'name':'Free-Force', 'categories':{'overall':true,'ladies':true,'advance':false,'optics':false,'seniors':false},'advanceLimit':{'passingScore':4,'topBestOf':-1}}
    //                 ]
    //                 })
    // }
}