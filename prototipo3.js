const problems = [
  {
    text: "En una cafetería, 3 jugos y 2 empanadas cuestan $290. Además, 1 jugo y 4 empanadas cuestan $230.",
    options: [
      "Precio de un jugo (en $)",
      "Precio de una empanada (en $)",
      "Cantidad total de clientes",
      "Minutos de atención"
    ],
    correctX: "Precio de un jugo (en $)",
    correctY: "Precio de una empanada (en $)",
    eq1: [3, 2, 290],
    eq2: [1, 4, 230],
    tip: "Revisa que cada ecuación sume costos (precio × cantidad = total en $)."
  },
  {
    text: "Un grupo de 18 estudiantes se reparte entre mesas de 2 y mesas de 4 puestos. En total se ocupan 6 mesas.",
    options: [
      "Cantidad de mesas de 2 puestos",
      "Cantidad de mesas de 4 puestos",
      "Total de sillas del aula",
      "Costo de cada mesa"
    ],
    correctX: "Cantidad de mesas de 2 puestos",
    correctY: "Cantidad de mesas de 4 puestos",
    eq1: [1, 1, 6],
    eq2: [2, 4, 18],
    tip: "Una ecuación cuenta mesas (x + y = 6) y la otra cuenta estudiantes (2x + 4y = 18)."
  }
];

let index = 0;

const scenarioEl = document.getElementById("scenario");
const varXEl = document.getElementById("varX");
const varYEl = document.getElementById("varY");
const feedbackEl = document.getElementById("feedback");

function loadProblem() {
  const p = problems[index];
  scenarioEl.textContent = p.text;
  varXEl.innerHTML = "";
  varYEl.innerHTML = "";

  p.options.forEach((opt) => {
    const optX = document.createElement("option");
    optX.value = opt;
    optX.textContent = opt;
    varXEl.appendChild(optX);

    const optY = document.createElement("option");
    optY.value = opt;
    optY.textContent = opt;
    varYEl.appendChild(optY);
  });

  ["a1", "b1", "c1", "a2", "b2", "c2"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  feedbackEl.textContent = "";
}

function sameEquation(userEq, targetEq) {
  return (
    userEq[0] === targetEq[0] &&
    userEq[1] === targetEq[1] &&
    userEq[2] === targetEq[2]
  );
}

document.getElementById("check-btn").addEventListener("click", () => {
  const p = problems[index];
  const xVal = varXEl.value;
  const yVal = varYEl.value;

  if (xVal === yVal) {
    feedbackEl.textContent = "x e y deben representar magnitudes distintas.";
    return;
  }

  if (xVal !== p.correctX || yVal !== p.correctY) {
    feedbackEl.textContent = `Revisa qué representa cada variable. Pista: ${p.tip}`;
    return;
  }

  const u1 = [
    Number(document.getElementById("a1").value),
    Number(document.getElementById("b1").value),
    Number(document.getElementById("c1").value)
  ];
  const u2 = [
    Number(document.getElementById("a2").value),
    Number(document.getElementById("b2").value),
    Number(document.getElementById("c2").value)
  ];

  const matchOrder1 = sameEquation(u1, p.eq1) && sameEquation(u2, p.eq2);
  const matchOrder2 = sameEquation(u1, p.eq2) && sameEquation(u2, p.eq1);

  if (matchOrder1 || matchOrder2) {
    feedbackEl.textContent = "¡Excelente! Identificaste bien las variables y construiste el sistema.";
  } else {
    feedbackEl.textContent = `Las ecuaciones no coinciden aún. Pista: ${p.tip}`;
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  index = (index + 1) % problems.length;
  loadProblem();
});

loadProblem();
