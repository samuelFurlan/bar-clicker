function clicar(value = 1, isDoble = false) {
  const multiplicador = Math.pow(2, gameState.bebidaSelecionada);

  gameState["coins"] += value * multiplicador;
  gameState["clicks"]++;

  if (gameState["clicks"] % gameState["bonusRate"] === 0) {
    gameState["coins"] += gameState["bonusCoins"] * multiplicador;
    showBonus();
  }
  mostrarEfeitoClick(value * multiplicador, isDoble);
  atualizarUI();
}

function clicarUsuario() {
  gameArea.classList.remove("animate__headShake");
  void gameArea.offsetWidth;
  gameArea.classList.add("animate__animated", "animate__headShake");
  document.getElementById("clickSound").play();

  const chance = gameState["motivationChanceLevel"] * 0.1;
  if (Math.random() < chance) {
    clicar(gameState["userClickLevel"] * 2, true);
  } else {
    clicar(gameState["userClickLevel"]);
  }
}

function ativarHappyHour() {
  if (happyHourAtivo) return;

  happyHourAtivo = true;
  exibirHappyHourBanner();
  iniciarContadorHappyHour(30);

  document.body.classList.add("happy-hour");
  copoWrapper.classList.add("girar-copo");

  // Ativa fogos de artifício
  mostrarFogos();

  // Dobra os valores
  gameState["userClickLevel"] *= 2;
  gameState["helperClickLevel"] *= 2;

  atualizarUI();
  document.getElementById("happyHourSound").play();

  happyHourTimeout = setTimeout(() => {
    happyHourAtivo = false;
    gameState["userClickLevel"] /= 2;
    gameState["helperClickLevel"] /= 2;
    document.body.classList.remove("happy-hour");
    copoWrapper.classList.remove("girar-copo");

    removerFogos();
    mostrarMensagem("⏳ O Happy Hour acabou!");
    atualizarUI();
  }, 30000);
}

function iniciarAutoClick() {
  clearInterval(autoClickInterval);
  autoClickInterval = setInterval(() => {
    for (let i = 0; i < gameState["helpers"]; i++) {
      // Chance de clique duplo
      const chance = gameState["motivationChanceLevel"] * 0.1;
      if (Math.random() < chance) {
        clicar(gameState["helperClickLevel"] * 2, true);
      } else {
        // Clique normal
        clicar(gameState["helperClickLevel"]);
      }
    }
  }, getHelperInterval(gameState["velocityClickLevel"]));
}

function getHelperInterval(level) {
  return Math.max(CONFIG.autoClick.minInterval, CONFIG.autoClick.baseInterval - CONFIG.autoClick.intervalReduction * level);
}

function resetarJogo() {
  localStorage.removeItem("barClickerSave");
  location.reload();
}

function formatarNumero(value) {
  return value.toLocaleString("pt-BR");
}

function contratarAtendente() {
  if (gameState["coins"] >= gameState["helpersCost"]) {
    gameState["coins"] -= gameState["helpersCost"];
    gameState["helpers"]++;
    const config = CONFIG.upgrade["helpers"];
    gameState["helpersCost"] = Math.floor(config.base * Math.pow(config.fator, gameState["helpers"]));
    iniciarAutoClick();
    atualizarUI();
  } else {
    mostrarMensagem("💸 Moedas insuficientes para contratar!");
  }
}
