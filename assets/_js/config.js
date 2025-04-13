const CONFIG = {
  upgrade: {
    helpers: { base: 50, fator: 1.4 },
    userClick: { base: 100, fator: 1.4 },
    helperClick: { base: 100, fator: 1.4 },
    velocityClick: { base: 200, fator: 5, maxLevel: 3 },
    motivationChance: { base: 300, fator: 10 },
  },
  happyHour: {
    chance: 100,
    duration: 30000,
  },
  autoClick: {
    baseInterval: 1000,
    intervalReduction: 50,
    minInterval: 100,
  },
  drinks: {
    baseCost: 10000,
    fator: 3,
    drinks: [
      { nome: "Cerveja", img: "beer.png" },
      { nome: "Caipirinha", img: "caipirinha.png" },
      { nome: "Vodka Ice Tea", img: "icetea.png" },
      { nome: "Vinho", img: "wine.png" },
      { nome: "Coquetel", img: "cocktail.png" },
      { nome: "Moscow Mule", img: "moscowmulle.png" },
      { nome: "Martini", img: "martini.png" },
      { nome: "Whisky", img: "wiskey.png" },
      { nome: "Combo", img: "expensive.png" },
    ],
  },
};
