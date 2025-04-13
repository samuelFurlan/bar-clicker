function atualizarMenuBebidas() {
  const lista = document.getElementById("drinksList");
  lista.innerHTML = "";

  CONFIG.drinks.drinks.forEach((bebida, i) => {
    const card = document.createElement("div");
    card.classList.add("drink-card");

    const img = document.createElement("img");
    img.src = `assets/drinks/${bebida.img}`;
    img.alt = bebida.nome;

    const label = document.createElement("p");

    if (i < gameState.bebidasDesbloqueadas) {
      // Já desbloqueada
      label.textContent = bebida.nome;
      card.onclick = () => selecionarBebida(i);
    } else {
      const custo = Math.floor(CONFIG.drinks.baseCost * Math.pow(CONFIG.drinks.fator, i - 1));

      label.textContent = `🔒 ${bebida.nome} - 💰 ${formatarNumero(custo)}`;

      if (gameState.coins >= custo) {
        // Pode comprar (ativo com cadeado)
        card.onclick = () => desbloquearBebida(i);
      } else {
        // Não pode comprar (bloqueado)
        card.classList.add("locked");
        card.onclick = () => mostrarMensagem("💸 Moedas insuficientes para desbloquear bebida.");
      }
    }

    if (i === gameState.bebidaSelecionada) {
      card.classList.add("selected");
    }

    card.appendChild(img);
    card.appendChild(label);
    lista.appendChild(card);
  });
}

function desbloquearBebida(index) {
  if (gameState.coins < gameState.drinksCost) {
    return mostrarMensagem("💸 Moedas insuficientes!");
  }

  gameState.coins -= gameState.drinksCost;
  gameState.bebidasDesbloqueadas++;
  gameState.drinksCost = Math.floor(CONFIG.drinks.baseCost * Math.pow(CONFIG.drinks.fator, gameState.bebidasDesbloqueadas - 1));
  selecionarBebida(index);
  atualizarUI();
}

function selecionarBebida(index) {
  gameState.bebidaSelecionada = index;
  const drink = CONFIG.drinks.drinks[index];
  document.getElementById("copo").src = `assets/drinks/${drink.img}`;
  atualizarMenuBebidas();
  atualizarUI();
}
