function verificarSesion(req, res, next) {
    if (req.session.usuario) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
  module.exports = { verificarSesion };