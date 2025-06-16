// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración usando variables de entorno (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referencia a la base de datos en tiempo real
const database = getDatabase(app);
const dbRef = ref(database);


export function saveReservation(reservationData) {
  const reservationsRef = ref(database, 'reservations');
  const newReservationRef = push(reservationsRef);

  // Aquí se agregan todos los campos explícitamente, uno por uno
  return set(newReservationRef, {
     ...reservationData,
    createdAt: new Date().toISOString()
  })
  .then(() => ({
    success: true,
    message: "¡Reserva guardada exitosamente!"
  }))
  .catch((error) => ({
    success: false,
    message: "Error al guardar la reserva: " + error.message
  }));
}

