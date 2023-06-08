
const { verifyToken } = require('../middleware/verifyToken');
const UserController = require('../controllers/userController');
const { logout } = require('../middleware/deleteToken');
const Joi = require('joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant unique de l'utilisateur.
 *           example: 609a0b5d5a5a5a5a5a5a5a5a
 *         username:
 *           type: string
 *           description: Nom d'utilisateur.
 *           example: john_doe
 *         email:
 *           type: string
 *           description: Adresse e-mail de l'utilisateur.
 *           example: john@example.com
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur.
 *           example: mypassword123
 * 
 * /user:
 *   post:
 *     summary: Créer un utilisateur.
 *     description: Crée un nouvel utilisateur.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *                 example: mypassword123
 *     responses:
 *       '200':
 *         description: L'utilisateur a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Requête invalide - Des champs requis sont manquants ou ne sont pas valides.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   get:
 *     summary: Obtenir tous les utilisateurs.
 *     description: Récupère tous les utilisateurs existants.
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Liste de tous les utilisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /user/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par son identifiant.
 *     description: Récupère un utilisateur existant en utilisant son identifiant.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Utilisateur non trouvé - L'identifiant fourni ne correspond à aucun utilisateur existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   put:
 *     summary: Mettre à jour un utilisateur par son identifiant.
 *     description: Met à jour un utilisateur existant en utilisant son identifiant.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nouveau nom d'utilisateur.
 *                 example: john_doe_updated
 *               email:
 *                 type: string
 *                 description: Nouvelle adresse e-mail de l'utilisateur.
 *                 example: john_updated@example.com
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe de l'utilisateur.
 *                 example: mynewpassword456
 *     responses:
 *       '200':
 *         description: L'utilisateur a été mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Requête invalide - Des champs requis sont manquants ou ne sont pas valides.
 *       '404':
 *         description: Utilisateur non trouvé - L'identifiant fourni ne correspond à aucun utilisateur existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   delete:
 *     summary: Supprimer un utilisateur par son identifiant.
 *     description: Supprime un utilisateur existant en utilisant son identifiant.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: L'utilisateur a été supprimé avec succès.
 *       '404':
 *         description: Utilisateur non trouvé - L'identifiant fourni ne correspond à aucun utilisateur existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /login:
 *   post:
 *     summary: Authentification de l'utilisateur.
 *     description: Authentifie l'utilisateur en utilisant son nom d'utilisateur et son mot de passe.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *                 example: mypassword123
 *     responses:
 *       '200':
 *         description: Authentification réussie. Un jeton d'accès JWT est renvoyé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Jeton d'accès JWT.
 *       '401':
 *         description: Échec de l'authentification - Nom d'utilisateur ou mot de passe incorrect.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur.
 *     description: Déconnecte l'utilisateur en invalidant son jeton d'accès.
 *     tags:
 *       - User
 *     responses:
 *       '204':
 *         description: Déconnexion réussie. Le jeton d'accès est invalide.
 *       '500':
 *         description: Erreur interne du serveur.
 */
const sideSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required()
});

module.exports = (app) => {
    app.post('/user', UserController.Create);
    app.get('/user', verifyToken, UserController.GetAll);
    app.get('/user/:id', verifyToken, UserController.GetOne);
    app.put('/user/:id', verifyToken, UserController.Update);
    app.delete('/user/:id', verifyToken, UserController.Delete);
    app.post('/login', UserController.LogIn);
    app.post('/logout', logout, UserController.LogOut);
}