import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }

        res.redirect('/login');
    });
});

export default router;