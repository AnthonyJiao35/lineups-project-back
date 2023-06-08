const Joi = require('joi');
const LineUpController = require('../controllers/lineUpController');
const { default: schemaValidator } = require('../middleware/schemaValidator');
const { SchemaValidator } = require('../middleware/schemaValidator');
const { verifyToken } = require('../middleware/verifyToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     LineUp:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique de la lineup.
 *           example: 609a0b5d5a5a5a5a5a5a5a5a
 *         name:
 *           type: string
 *           description: Nom de la lineup.
 *           example: LineUp 1
 * 
 * /lineup:
 *   post:
 *     summary: Créer une lineup.
 *     description: Crée une nouvelle lineup.
 *     tags:
 *       - LineUp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la lineup.
 *                 example: LineUp 1
 *     responses:
 *       '200':
 *         description: La lineup a été créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LineUp'
 *       '400':
 *         description: Requête invalide - Le nom de la lineup est manquant ou n'est pas une chaîne de caractères valide.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   get:
 *     summary: Obtenir toutes les lineups.
 *     description: Récupère toutes les lineups existantes.
 *     tags:
 *       - LineUp
 *     responses:
 *       '200':
 *         description: Liste de toutes les lineups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LineUp'
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /lineup/{id}:
 *   get:
 *     summary: Obtenir une lineup par son identifiant.
 *     description: Récupère une lineup existante en utilisant son identifiant.
 *     tags:
 *       - LineUp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la lineup à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lineup récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LineUp'
 *       '404':
 *         description: Lineup non trouvée - L'identifiant fourni ne correspond à aucune lineup existante.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   put:
 *     summary: Mettre à jour une lineup par son identifiant.
 *     description: Met à jour une lineup existante en utilisant son identifiant.
 *     tags:
 *       - LineUp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la lineup à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom mis à jour de la lineup.
 *                 example: LineUp 2
 *     responses:
 *       '200':
 *         description: La lineup a été mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LineUp'
 *       '400':
 *         description: Requête invalide - Le nom de la lineup est manquant ou n'est pas une chaîne de caractères valide.
 *       '404':
 *         description: Lineup non trouvée - L'identifiant fourni ne correspond à aucune lineup existante.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   delete:
 *     summary: Supprimer une lineup par son identifiant.
 *     description: Supprime une lineup existante en utilisant son identifiant.
 *     tags:
 *       - LineUp
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la lineup à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: La lineup a été supprimée avec succès.
 *       '404':
 *         description: Lineup non trouvée - L'identifiant fourni ne correspond à aucune lineup existante.
 *       '500':
 *         description: Erreur interne du serveur.
 */

const lineUpSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required()
});

module.exports = (app) => {
    app.post('/lineup', verifyToken, SchemaValidator(lineUpSchema), LineUpController.Create);
    app.get('/lineup', LineUpController.GetAll);
    app.get('/lineup/:id',LineUpController.GetOne);
    app.put('/lineup/:id', verifyToken, SchemaValidator(lineUpSchema), LineUpController.Update);
    app.delete('/lineup/:id', verifyToken, SchemaValidator(lineUpSchema), LineUpController.Delete);
}