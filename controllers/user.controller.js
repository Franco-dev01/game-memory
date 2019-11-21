const User = require('../models/user.model');
const Game = require('../models/game.model');

exports.userQueries = class{

    static setUser(data){
        return new Promise(async next =>{
            const user = await new User({
                name:data.name,
                password: data.password
            });
            user.save().then(user=>{
                next({etat:true,user:user});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static getUser(data){
        return new Promise(async next =>{
            User.findOne({
                name:data.name,
                password:data.password
            }).then(user=>{
                next({etat:true,user:user});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static setNumberTentatives(data){
        return new Promise(async next =>{
          const user =  await User.findById(data.user_id);
          const index = await findGameIndex(user.games,data.game_id);
          console.log(user.games[index].levels[data.niveau]);
            if(user.games[index].levels[data.niveau] !== undefined){
                user.games[index].levels[data.niveau].nbTentatives += 1
            }else{
                user.games[index].levels.push({niveau:data.niveau+1,nbTentatives:1,isValidate:false});
            }
            console.log(user.games[index].levels[data.niveau]);
            user.save().then(async user =>{
                const game = await Game.findById(data.game_id);
                next({etat:true,game:game.levels[data.niveau]});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static passLevel(data){
        return new Promise(async next =>{
            const user =  await User.findById(data.user_id);
            const index = await findGameIndex(user.games,data.game_id);
            if(user.games[index].levels[data.niveau] !== undefined){
                user.games[index].levels[data.niveau].nbTentatives += 1;
                user.games[index].levels[data.niveau].isValidate = true;
            }else {
                user.games[index].levels.push({niveau: data.niveau + 1, nbTentatives: 1, isValidate: true});
            }
            console.log(user.games[index].levels[data.niveau]);
            user.save().then(async user =>{
                const game = await Game.findById(data.game_id);
                next({etat:true,game:game.levels[data.niveau+1]});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static setGame(data){
        return new Promise(async next =>{
            const game = {
                id_game: data.game_id,
                isAlreadyPlay: true,
            };
            const user = await User.findOne({_id : data.user_id});
            if(verify(user.games,data.game_id)){
                user.games.push(game);
                user.save().then(user => {
                    next({etat:true,user:user});
                }).catch(e => {
                    next({etat:false,err:e});
                });
            }else{
                next({etat: "ok",user:user})
            }
        });
    }
};


const verify = (tab,id) => {
    let test = true;
    tab.forEach(el => {
       console.log(el.id_game === id);
       el.id_game === id ? test = false : '';
    });
    console.log(test);
    return test;
};

const findGameIndex = (games,id) => {
    let output = 0;
    for(let i = 0; i < games.length; i++){
        if(games[i].id_game === id.toString()){
            output = i;
        }
    }
    return output;
};

