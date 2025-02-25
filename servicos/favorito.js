const fs = require("fs");

function getTodosFavoritos() {
  return JSON.parse(fs.readFileSync("favoritos.json"));
}

function deletaFavoritoPorId(id) {
  const livros = JSON.parse(fs.readFileSync("favoritos.json"));
  const livrosFiltrados = livros.filter((livro) => livro.id !== id);

  fs.writeFileSync("favoritos.json", JSON.stringify(livrosFiltrados));
}

function insereFavorito(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const favoritos = JSON.parse(fs.readFileSync("favoritos.json"));


  const livroExistente = favoritos.find((livro) => livro.id === id);

  if (livroExistente) {
    throw new Error("Este livro já está nos seus favoritos.");
  }

  const livroInserido = livros.find(livro => livro.id === id);
  if (livroInserido) {
    const novaListaDeLivrosFavoritos = [...favoritos, livroInserido];
    fs.writeFileSync("favoritos.json", JSON.stringify(novaListaDeLivrosFavoritos));
  } else {
    throw new Error("Livro não encontrado.");
  }
}

module.exports = {
  getTodosFavoritos,
  deletaFavoritoPorId,
  insereFavorito
};
