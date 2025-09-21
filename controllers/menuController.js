async function mostrarMenu(req, res) {
  res.render('index', { titulo: 'Menu' });
}

const menuController = { mostrarMenu };
export default menuController;