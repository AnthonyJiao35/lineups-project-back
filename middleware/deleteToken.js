// middleware pour supprimer le token JWT de la session
exports.logout = (req, res, next) => {
    // supprimer le token JWT de la session (ou du cookie, ou de tout autre moyen de stockage)
    // dans cet exemple, nous supposons que le token est stocké dans le header "Authorization"
    if (req.headers.authorization) {
      delete req.headers.authorization;
    }
    next();
}
