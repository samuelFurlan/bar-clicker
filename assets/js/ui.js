function mostrarEfeitoClick(value = 1, isDoble = false) {
  const efeito = document.createElement("div");
  efeito.textContent = `+${formatarNumero(value)} 💰`;
  efeito.classList.add("bonus-flutuante");
  if (isDoble) efeito.classList.add("bonus-duplo");

  // Posição aleatória dentro do copo
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const randomX = Math.random() * areaWidth;
  const randomY = Math.random() * areaHeight;

  efeito.style.left = `${randomX}px`;
  efeito.style.top = `${randomY}px`;

  gameArea.appendChild(efeito);

  setTimeout(() => efeito.remove(), 1000);
}

function exibirHappyHourBanner() {
  const banner = document.createElement("div");
  banner.id = "happyHourBanner";
  banner.innerHTML = "🎉 HAPPY HOUR 🎉 <br> Click X2";
  document.body.appendChild(banner);

  setTimeout(() => {
    banner.classList.add("fade-out");
    setTimeout(() => banner.remove(), 1000);
  }, 2000);
}

function mostrarMensagem(message) {
  messageEl.textContent = message;
}

function showBonus() {
  bonusDiv.textContent = `+${formatarNumero(gameState["bonusCoins"])} 💰`;
  bonusDiv.classList.add("bonus-flutuante");
  document.body.appendChild(bonusDiv);
  setTimeout(() => bonusDiv.remove(), 1500);
}

function mostrarFogos() {
  const fireworks = document.createElement("div");
  fireworks.id = "fogos";
  for (let i = 0; i < 10; i++) {
    const part = document.createElement("div");
    part.classList.add("fogo");
    part.style.top = `${Math.random() * 80 + 10}%`;
    part.style.left = `${Math.random() * 90 + 5}%`;
    part.style.background = getRandomColor();
    part.style.animationDelay = `${Math.random()}s`;
    fireworks.appendChild(part);
  }
  document.body.appendChild(fireworks);
}

function getRandomColor() {
  const cores = ["gold", "red", "deepskyblue", "lime", "fuchsia", "orange"];
  return cores[Math.floor(Math.random() * cores.length)];
}

function removerFogos() {
  const fireworks = document.getElementById("fogos");
  if (fireworks) fireworks.remove();
}

function gerarBolhas() {
  const container = document.getElementById("bolhas-container");
  setInterval(() => {
    const bolha = document.createElement("div");
    bolha.classList.add("bolha");

    // Posição horizontal aleatória dentro da área
    bolha.style.left = `${Math.random() * 100}%`;

    // Tamanhos variados
    const size = Math.random() * 8 + 4; // entre 4px e 12px
    bolha.style.width = `${size}px`;
    bolha.style.height = `${size}px`;
    bolha.style.background = "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0.1))";

    // Duração aleatória da animação
    bolha.style.animationDuration = `${3 + Math.random() * 2}s`;

    container.appendChild(bolha);

    // Remover bolha após animação
    setTimeout(() => bolha.remove(), 5000);
  }, 500); // nova bolha a cada 0.5s
}

function atualizarUI() {
  coinsEl.textContent = formatarNumero(gameState["coins"]);

  upgradeCostEl.textContent = formatarNumero(gameState["helpersCost"]);
  atendentesQtd.textContent = formatarNumero(gameState["helpers"]);

  userClickCost.textContent = formatarNumero(gameState["userClickCost"]);
  userClickLevel.textContent = gameState["userClickLevel"];

  helperClickLevel.textContent = `+${formatarNumero(gameState["helperClickLevel"])} por click`;
  helperClickCost.textContent = formatarNumero(gameState["helperClickCost"]);

  velocityClickCost.textContent = formatarNumero(gameState["velocityClickCost"]);
  const clickSec = CONFIG.autoClick.baseInterval / getHelperInterval(gameState["velocityClickLevel"]);
  velocityClickLevel.textContent = `${formatarSeDecimal(clickSec)} click / seg`;

  motivationChanceCost.textContent = formatarNumero(gameState["motivationChanceCost"]);
  motivationChanceLevel.textContent = `${formatarNumero(gameState["motivationChanceLevel"] * 10)}%`;

  const multiplicador = Math.pow(2, gameState.bebidaSelecionada);
  const ganhos = (gameState.helpers * (gameState.helperClickLevel * multiplicador)) / (getHelperInterval(gameState.velocityClickLevel) / 1000);
  document.getElementById("ganhosPorSegundo").textContent = `💰 ${formatarNumero(ganhos)} / s automático`;

  atualizarBotaoUpgrade("userClick");
  atualizarBotaoUpgrade("helperClick");
  atualizarBotaoUpgrade("velocityClick");
  atualizarBotaoUpgrade("motivationChance");
  atualizarBotaoContratar();
  atualizarMenuBebidas();
}

function atualizarBotaoUpgrade(tipo) {
  const button = document.getElementById(`${tipo}Button`);
  const cost = gameState[`${tipo}Cost`];
  const isMax = cost === "MAX";

  if (isMax || gameState.coins < cost) {
    button.classList.add("disabled");
    button.disabled = true;
  } else {
    button.classList.remove("disabled");
    button.disabled = false;
  }
}

function atualizarBotaoContratar() {
  const botao = document.getElementById("helperUpgradeBtn");
  const custo = gameState.helpersCost;

  if (gameState.coins < custo) {
    botao.classList.add("disabled");
    botao.disabled = true;
  } else {
    botao.classList.remove("disabled");
    botao.disabled = false;
  }
}

function formatarSeDecimal(valor) {
  return Number.isInteger(valor) ? valor : valor.toFixed(2);
}

function iniciarContadorHappyHour(tempo) {
  const interval = setInterval(() => {
    if (!happyHourAtivo) {
      clearInterval(interval);
      messageEl.textContent = "";
      return;
    }
    messageEl.textContent = `⏳ Happy Hour acaba em ${tempo--}s`;
    if (tempo < 0) {
      clearInterval(interval);
      messageEl.textContent = "";
    }
  }, 1000);
}
