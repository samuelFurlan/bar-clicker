let autoClickInterval;
let happyHourAtivo = false;
let happyHourTimeout = null;

const coinsEl = document.getElementById("coins");
const copoEl = document.getElementById("copo");
const upgradeBtn = document.getElementById("helperUpgradeBtn");
const upgradeCostEl = document.getElementById("helpersCost");
const messageEl = document.getElementById("message");
const atendentesQtd = document.getElementById("helpers");
const gameArea = document.getElementById("game-area");
const copoWrapper = document.getElementById("copo-wrapper");
const bonusDiv = document.createElement("div");

const userClickCost = document.getElementById("userClickCost");
const userClickLevel = document.getElementById("userClickLevel");

const helperClickCost = document.getElementById("helperClickCost");
const helperClickLevel = document.getElementById("helperClickLevel");

const velocityClickCost = document.getElementById("velocityClickCost");
const velocityClickLevel = document.getElementById("velocityClickLevel");

const motivationChanceCost = document.getElementById("motivationChanceCost");
const motivationChanceLevel = document.getElementById("motivationChanceLevel");

window.onload = () => {
  carregarProgresso();
  iniciarAutoClick();
  atualizarUI();
  gerarBolhas();
  atualizarMenuBebidas();

  // Eventos
  document.getElementById("copo").addEventListener("click", clicarUsuario);
  document.getElementById("helperUpgradeBtn").addEventListener("click", contratarAtendente);

  // Auto-save
  setInterval(() => {
    salvarProgresso();
  }, 5000);

  // Checar evento aleatório do Happy Hour
  setInterval(() => {
    if (!happyHourAtivo && Math.floor(Math.random() * CONFIG.happyHour["chance"]) === 0) {
      ativarHappyHour();
    }
  }, 5000);

  const bebida = CONFIG.drinks.drinks[gameState.bebidaSelecionada];
  if (bebida) {
    document.getElementById("copo").src = `assets/drinks/${bebida.img}`;
  }

  if (window.innerWidth <= 768) {
    document.getElementById("btnMelhorias").addEventListener("click", () => {
      document.getElementById("menuMelhorias").classList.toggle("active");
    });

    document.getElementById("btnBebidas").addEventListener("click", () => {
      document.getElementById("menuBebidas").classList.toggle("active");
    });
  }
};
