const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware pour vérifier la présence d'un token JWT dans le header de la requête
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers)
    if (authHeader) {
        // le header Authorization est au format "Bearer <token>"
        const token = authHeader.split(' ')[1];
        try {
            // vérifier le token avec la fonction verify de jsonwebtoken
            const decodedToken = jwt.verify(token, process.env.JWT);
            // stocker les informations du token dans la requête pour les prochaines étapes
            req.userId = decodedToken.userId;
            next(); // appeler le middleware suivant
        } catch (err) {
            res.status(401).json({ message: 'Token invalide' });
        }
    } else {
        res.status(401).json({ message: 'Token manquant' });
    }
};