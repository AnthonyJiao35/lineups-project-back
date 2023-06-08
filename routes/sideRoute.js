const Joi = require('joi');
const SideController = require('../controllers/sideController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Side:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant unique du Side.
 *           example: 609a0b5d5a5a5a5a5a5a5a5a
 *         name:
 *           type: string
 *           description: Nom du Side.
 *           example: Side 1
 * 
 * /side:
 *   post:
 *     summary: Créer un Side.
 *     description: Crée un nouveau Side.
 *     tags:
 *       - Side
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du Side.
 *                 example: Side 1
 *     responses:
 *       '200':
 *         description: Le Side a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Side'
 *       '400':
 *         description: Requête invalide - Le nom du Side est manquant ou n'est pas une chaîne de caractères valide.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   get:
 *     summary: Obtenir tous les Sides.
 *     description: Récupère tous les Sides existants.
 *     tags:
 *       - Side
 *     responses:
 *       '200':
 *         description: Liste de tous les Sides.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Side'
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /side/{id}:
 *   get:
 *     summary: Obtenir un Side par son identifiant.
 *     description: Récupère un Side existant en utilisant son identifiant.
 *     tags:
 *       - Side
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Side à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Side récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Side'
 *       '404':
 *         description: Side non trouvé - L'identifiant fourni ne correspond à aucun Side existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   put:
 *     summary: Mettre à jour un Side par son identifiant.
 *     description: Met à jour un Side existant en utilisant son identifiant.
 *     tags:
 *       - Side
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Side à mettre à jour.
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
 *                 description: Nom mis à jour du Side.
 *                 example: Side 2
 *     responses:
 *       '200':
 *         description: Le Side a été mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Side'
 *       '400':
 *         description: Requête invalide - Le nom du Side est manquant ou n'est pas une chaîne de caractères valide.
 *       '404':
 *         description: Side non trouvé - L'identifiant fourni ne correspond à aucun Side existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   delete:
 *     summary: Supprimer un Side par son identifiant.
 *     description: Supprime un Side existant en utilisant son identifiant.
 *     tags:
 *       - Side
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Side à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Le Side a été supprimé avec succès.
 *       '404':
 *         description: Side non trouvé - L'identifiant fourni ne correspond à aucun Side existant.
 *       '500':
 *         description: Erreur interne du serveur.
 */

const sideSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required()
});

module.exports = (app) => {
    app.post('/side', SideController.Create);
    app.get('/side', SideController.GetAll);
    app.get('/side/:id', SideController.GetOne);
    app.put('/side/:id', SideController.Update);
    app.delete('/side/:id', SideController.Delete);
}