const express = require('express');
const router = new express.Router();
const {gameQueries} = require('../controllers/game.controller');
let compt = 0;
router.route('/user-register')
    .get((req,res)=>{
       res.render('user_register');
    });

router.route('/')
    .get((req,res)=>{
        res.render('user_login');
    });


router.route('/set-game')
    .get((req,res)=>{
        res.render('set-game')
    });

router.route('/nan_games/games')
    .get( async (req,res)=>{
        if(req.session.game){
            const user = req.session.game;
            const resu = await gameQueries.getAllGame();
            res.render('game_index',{user:user,game:resu.games});
        }else{
            res.redirect('/');
        }
    });
router.route('/deconnexion')
    .get(async (req,res)=>{
        delete req.session.game;
        req.session.save();
        res.redirect('/nan_games/games')
    });

router.route('/nan_games/games/:id')
    .get(async (req,res)=>{
        compt += 1;
        if(req.session.game) {
            const resu = await gameQueries.getGame(req.params.id);
            if(verifIdGame(req.session.game.games,resu.game._id)){
                res.redirect('/nan_games/games')
            }else{
                res.render('game', {user:req.session.game,game: resu.game});
            }

        }
        else
            res.redirect('/');
    });

router.route('/game2')
    .get((req,res)=>{
       res.render('game2');
    });

const verifIdGame = (tab,game) => {
    let verif = false;
    tab.forEach(el => {
       el.id_game.toString() === game.toString() ? verif = true : '';
    });
    return false;
};

module.exports = router;