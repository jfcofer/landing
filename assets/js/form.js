
// js/reservationForm.js
import { saveReservation } from './firebase.js';

function enableReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', async function(event) {
    console.log("Evento submit interceptado correctamente");
    event.preventDefault();

    // Obtén los datos del formulario usando IDs EXACTOS
    const reservationData = {
      fullName: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      guests: form.guests.value,
      arrival: form.arrival.value,
      departure: form.departure.value,
      room: form.room.value,
      pets: form.pets.checked,
      message: form.message.value,
      privacyAccepted: form.privacy.checked
    };

    // Depuración: imprime los elementos del formulario
    console.log(
      form.fullname, form.email, form.phone, form.guests,
      form.arrival, form.departure, form.room, form.pets, form.message, form.privacy
    );

    // Llama a la función para guardar la reserva
    const result = await saveReservation(reservationData);

    alert(result.message);

    if (result.success) {
      form.reset();
    }
  });
}

enableReservationForm();



