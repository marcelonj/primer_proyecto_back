import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        titulo: 'Iniciar sesión',
        message: req.flash('error')
    });
});


router.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

export default router;
