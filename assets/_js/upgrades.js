function makeUpgrade(tipo) {
  const config = CONFIG.upgrade[tipo];
  const currentLevel = gameState[`${tipo}Level`] || 0;
  const currentCost = Math.floor(config.base * Math.pow(config.fator, currentLevel));

  if (gameState.coins < currentCost) {
    return mostrarMensagem("💸 Moedas insuficientes!");
  }

  // Deduz moedas e atualiza o nível
  gameState.coins -= currentCost;
  const newLevel = currentLevel + 1;
  gameState[`${tipo}Level`] = newLevel;

  // Verifica se atingiu o nível máximo
  const levelLimits = {
    velocityClick: 18,
    motivationChance: 9,
  };

  const isMaxLevel = levelLimits[tipo] !== undefined && newLevel >= levelLimits[tipo];

  gameState[`${tipo}Cost`] = isMaxLevel ? "MAX" : Math.floor(config.base * Math.pow(config.fator, newLevel));

  // Atualiza a interface se atingiu nível máximo
  if (isMaxLevel) {
    const button = document.getElementById(`${tipo}Button`);
    const costDisplay = document.getElementById(`${tipo}Cost`);

    if (button) button.disabled = true;
    if (costDisplay) costDisplay.innerText = "MAX";
  }

  atualizarUI();
  iniciarAutoClick();
}
