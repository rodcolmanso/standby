const cOverall= 0;
const cAdvance= 1;
const cLadies= 2;
const cOptics= 4;
const cSeniors= 5;

function flatPlayesDivisions(players, sort){
    let registers = [];
    let rP= [];
    let aRow= '';
    for(i=0;i<players.length;i++){
        for(j=0;j<players[i].registered.length;j++){
            if(players[i].registered[j].score===undefined||players[i].registered[j].score===null||players[i].registered[j].score===''){
                players[i].registered[j].score=999;
                players[i].registered[j].tries=0;
                players[i].registered[j].datetime="2099-01-01T00:00:00.000Z";
            }

            score_idx= zeroPad((""+(players[i].registered[j].score*100)),7);
            sort_idx= ''+score_idx+zeroPad(players[i].registered[j].tries,3)+players[i].registered[j].datetime;
            aRow= {'division':players[i].registered[j].divisionId,'category':players[i].category,'name':players[i].name,'id':players[i].shooterId,'gun':players[i].registered[j].gun,'optics':players[i].registered[j].optics,'score':players[i].registered[j].score,'tries':players[i].registered[j].tries, 'sort_idx':sort_idx };
            rP.push(aRow);  
        }
    }

    if (sort>0){
        rP= rP.sort((a, b) => {
            if (a.sort_idx < b.sort_idx) {
            return -1;
            }
        });
    } else {
        rP= rP.sort((a, b) => {
            if (a.sort_idx > b.sort_idx) {
            return -1;
            }
        });
    }


    return rP;
}

function matchShootersCategories(players, divisions){

    players= players.sort((a, b) => {
        if (a.sort_idx < b.sort_idx) {
        return -1;
        }
    });

    let divPosition;
    
    for(let c=0; c<divisions.length;c++){

        divPosition=0;
        for(let i=0;i<players.length;i++){
        
            if(players[i].division===divisions[c]._id.toString()){

                players[i].division_name= divisions[c].name;
                players[i].qualify_position= ++divPosition;

                if( aPlayers[i].category===cLadies && !divisions[c].categories.ladies){
                    aPlayers[i].category= cOverall;
                }

                if( aPlayers[i].category===cOptics && !divisions[c].categories.optics){
                    aPlayers[i].category= cOverall;
                }

                if( aPlayers[i].category===cSeniors && !divisions[c].categories.seniors){
                    aPlayers[i].category= cOverall;
                }

                if(divisions[c].categories.advance &&
                    ((aPlayers[i].score<100&&aPlayers[i].score<=divisions[c].advanceLimit.passingScore) ||
                    divPosition< divisions[c].advanceLimit.topBestOf )){
                    aPlayers[i].category= cAdvance;
                }
            }
        }
    }
    return players;
}

function getShootersByDivisionCategory(players, divisionId, category){

    const ret=[];

    for(let i=0; i< players.length;i++){

        if(players[i].division===divisionId && players[i].category===category){
            ret.push(players[i]);
        }
    
    }
    return ret;

}