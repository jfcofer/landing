/* ------------------------ Config ------------------------ */
const ENDPOINT = "/api/reservations"; // cambia a la URL real de tu backend

/* ------------------------ Utils ------------------------- */
/** Convierte un objeto FormData a JSON plano
 *  - Transforma checkboxes a boolean
 *  - Convierte los números que especifiques
 */
function serializeReservationForm(fd) {
  const obj = Object.fromEntries(fd.entries());

  // checkboxes ➜ boolean
  obj.pets = fd.get("pets") !== null;
  obj.privacy = fd.get("privacy") !== null;

  // valores numéricos
  ["guests", "adults", "kids"].forEach((k) => {
    if (obj[k] !== undefined && obj[k] !== "") obj[k] = Number(obj[k]);
  });

  return obj;
}

/** Envía los datos vía fetch POST y devuelve la respuesta JSON o lanza error */
async function postReservation(data) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error((await res.text()) || res.statusText);
  return res.json();
}

/* --------------------- Event handler -------------------- */
const form = document.getElementById("reservationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Reunir datos
  const data = serializeReservationForm(new FormData(form));

  // 2. Enviar
  try {
    const result = await postReservation(data);

    // 3. Éxito → feedback al usuario
    alert("✅ ¡Reserva enviada! Nos pondremos en contacto pronto.");
    form.reset();
    console.log("Server response:", result);
  } catch (err) {
    // 4. Error → feedback
    console.error(err);
    alert("❌ Lo sentimos, ocurrió un error al procesar tu reserva.");
  }
});
