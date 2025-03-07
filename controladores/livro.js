const {
  getTodosLivros,
  getLivrosPorId,
  insereLivro,
  modificaLivro,
  deletePorId,
} = require("../servicos/livro");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function getLivro(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      const livro = getLivrosPorId(id);
      res.send(livro);
    } else {
      res.status(422);
      res.send("ID inválido!");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (req.body.titulo && req.body.src) {
      insereLivro(livroNovo);
      res.status(201);
      res.send("Livro inserido com sucesso!");
    } else {
      res.status(422);
      res.send("Falta colocar SRC ou TITULO")
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function patchLivro(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    if (id && Number(id)) {
      modificaLivro(body, id);
      res.send("Livro modificado com sucesso");
    } else {
      res.status(422);
      res.send("ID inválido!");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function deleteLivro(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deletePorId(id);
      res.send("Livro deletado");
    } else {
      res.status(422);
      res.send("ID inválido!");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
