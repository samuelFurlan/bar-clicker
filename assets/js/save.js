function salvarProgresso() {
  localStorage.setItem("barClickerSave", JSON.stringify(gameState));
}

function carregarProgresso() {
  const save = JSON.parse(localStorage.getItem("barClickerSave"));
  if (save) Object.assign(gameState, save);
}
