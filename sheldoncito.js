/* =====================================================
   MOTOR DE FÍSICA AVANZADO + PERSONALIDAD + TUTOR
   ===================================================== */

const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");

/* ----- CAMBIO DE SECCIONES ----- */
function openSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");
}

/* ----- ENVIAR MENSAJE ----- */
function sendMessage() {
    let msg = userInput.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    userInput.value = "";

    setTimeout(() => respond(msg), 400);
}

/* ----- AGREGAR MENSAJE ----- */
function addMessage(text, sender) {
    let div = document.createElement("div");
    div.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
    div.innerHTML = text.replace(/\n/g, "<br>");
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* =====================================================
   MOTOR INTELIGENTE DE SHELDONCITO
   ===================================================== */

function respond(msg) {

    msg = msg.toLowerCase();

    /* ----- DETECCIÓN DE EJERCICIOS ----- */
    if (msg.includes("acelera") || msg.includes("aceleración") || msg.includes("mrua")) {
        return solveMRUA(msg);
    }

    if (msg.includes("mru")) {
        return solveMRU(msg);
    }

    if (msg.includes("fuerza") && msg.includes("masa") && msg.includes("aceler")) {
        return solveNewton(msg);
    }

    if (msg.includes("energía")) {
        return solveEnergia(msg);
    }

    if (msg.includes("proyectil") || msg.includes("ángulo")) {
        return solveProyectil(msg);
    }

    /* OTHERWISE: respuesta normal */
    return generalResponse(msg);
}

/* =====================================================
   RESPUESTA GENERAL (PROFESOR + CORTÉS + SARCÁSTICO)
   ===================================================== */

function generalResponse(msg) {

    let respuestas = [
        "Permíteme explicarlo de manera clara…",
        "Un momento, querido ser humano, procesando tu pregunta…",
        "Excelente pregunta. Vamos paso a paso:",
        "Interesante… incluso para mi nivel intelectual.",
        "Lo explicaré como si tuvieras sólo dos neuronas — con cariño, claro."
    ];

    addMessage(respuestas[Math.floor(Math.random()*respuestas.length)], "bot");
}


/* =====================================================
   SOLUCIONADORES AVANZADOS
   ===================================================== */

/* ----- MRU ----- */
function solveMRU(msg) {
    addMessage(`Puedo ayudarte con MRU.  
Si tienes velocidad y tiempo, uso:  
**d = v · t**  
Si tienes distancia y tiempo, uso:  
**v = d / t**  
Si quieres, dame los valores y lo resuelvo completo.`, "bot");
}

/* ----- MRUA ----- */
function solveMRUA(msg) {
    addMessage(`Para MRUA, las ecuaciones clave son:

- v = v₀ + a·t  
- d = v₀·t + ½·a·t²  
- v² = v₀² + 2·a·d  

Dame los datos (v₀, a, t o d) y lo resuelvo con pasos completos.`, "bot");
}

/* ----- NEWTON ----- */
function solveNewton(msg) {
    addMessage(`Ley de Newton:

**F = m · a**

Dame masa y aceleración, o velocidad final + tiempo, y lo resuelvo todo.`, "bot");
}

/* ----- Energía ----- */
function solveEnergia(msg) {
    addMessage(`Las ecuaciones útiles son:

- Energía cinética: Ec = ½·m·v²  
- Energía potencial: Ep = m·g·h  

Dame masa, altura o velocidad y lo calculo todo.`, "bot");
}

/* ----- Proyectil ----- */
function solveProyectil(msg) {
    addMessage(`Movimiento parabólico:

- Alcance: R = (v²·sin(2θ)) / g  
- Altura máxima: H = (v²·sin²θ) / (2g)  
- Tiempo total: T = (2·v·sinθ) / g  

Dame velocidad inicial y ángulo y lo resuelvo completo.`, "bot");
}

/* =====================================================
   TEMAS
   ===================================================== */

function askTopic(topic) {
    addMessage(`Tema seleccionado: **${topic}**  
Pregúntame un ejercicio y lo resuelvo con gusto.`, "bot");
}

/* =====================================================
   TUTOR / LECCIONES
   ===================================================== */

function showLesson(id) {
    let txt = "";

    if (id === "mru") {
        txt = `
            <h3>MRU</h3>
            <p>Movimiento con velocidad constante.</p>
            <p>Ecuación clave: d = v · t</p>
        `;
    }
    if (id === "mrua") {
        txt = `
            <h3>MRUA</h3>
            <p>Aceleración constante.</p>
            <p>Ecuaciones: v = v₀ + a·t, d = v₀·t + ½·a·t²</p>
        `;
    }
    if (id === "newton") {
        txt = `
            <h3>Leyes de Newton</h3>
            <p>F = m·a — Fuerza neta.</p>
        `;
    }
    if (id === "energia") {
        txt = `
            <h3>Energía</h3>
            <p>Ec = ½·m·v²</p>
            <p>Ep = m·g·h</p>
        `;
    }

    document.getElementById("lessonContent").innerHTML = txt;
}

/* =====================================================
   GUARDAR / CARGAR
   ===================================================== */

function saveChat() {
    localStorage.setItem("sheldonChat", chatWindow.innerHTML);
    addMessage("Conversación guardada correctamente.", "bot");
}

function loadChat() {
    let data = localStorage.getItem("sheldonChat");
    if (data) {
        chatWindow.innerHTML = data;
        addMessage("Conversación cargada.", "bot");
    } else {
        addMessage("No encontré una conversación guardada.", "bot");
    }
}
