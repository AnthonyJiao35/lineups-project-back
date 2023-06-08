const Joi = require('joi');
const SiteController = require('../controllers/siteController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Site:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant unique du Site.
 *           example: 609a0b5d5a5a5a5a5a5a5a5a
 *         name:
 *           type: string
 *           description: Nom du Site.
 *           example: Site 1
 * 
 * /site:
 *   post:
 *     summary: Créer un Site.
 *     description: Crée un nouveau Site.
 *     tags:
 *       - Site
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du Site.
 *                 example: Site 1
 *     responses:
 *       '200':
 *         description: Le Site a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       '400':
 *         description: Requête invalide - Le nom du Site est manquant ou n'est pas une chaîne de caractères valide.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   get:
 *     summary: Obtenir tous les Sites.
 *     description: Récupère tous les Sites existants.
 *     tags:
 *       - Site
 *     responses:
 *       '200':
 *         description: Liste de tous les Sites.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 * /site/{id}:
 *   get:
 *     summary: Obtenir un Site par son identifiant.
 *     description: Récupère un Site existant en utilisant son identifiant.
 *     tags:
 *       - Site
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Site à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Site récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       '404':
 *         description: Site non trouvé - L'identifiant fourni ne correspond à aucun Site existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   put:
 *     summary: Mettre à jour un Site par son identifiant.
 *     description: Met à jour un Site existant en utilisant son identifiant.
 *     tags:
 *       - Site
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Site à mettre à jour.
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
 *                 description: Nom mis à jour du Site.
 *                 example: Site 2
 *     responses:
 *       '200':
 *         description: Le Site a été mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Site'
 *       '400':
 *         description: Requête invalide - Le nom du Site est manquant ou n'est pas une chaîne de caractères valide.
 *       '404':
 *         description: Site non trouvé - L'identifiant fourni ne correspond à aucun Site existant.
 *       '500':
 *         description: Erreur interne du serveur.
 * 
 *   delete:
 *     summary: Supprimer un Site par son identifiant.
 *     description: Supprime un Site existant en utilisant son identifiant.
 *     tags:
 *       - Site
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du Site à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Le Site a été supprimé avec succès.
 *       '404':
 *         description: Site non trouvé - L'identifiant fourni ne correspond à aucun Site existant.
 *       '500':
 *         description: Erreur interne du serveur.
 */
const sideSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required()
});

module.exports = (app) => {
    app.post('/site', SiteController.Create);
    app.get('/site', SiteController.GetAll);
    app.get('/site/:id', SiteController.GetOne);
    app.put('/site/:id', SiteController.Update);
    app.delete('/site/:id', SiteController.Delete);
}