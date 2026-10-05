import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuración de tu proyecto en el plan sin costo (Spark)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "inventario-4aa07.firebaseapp.com",
  projectId: "inventario-4aa07",
  storageBucket: "inventario-4aa07.firebasestorage.app",
  messagingSenderId: "882414923503",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("formulario-incidencias").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Capturar los valores del formulario
  const sku = document.getElementById("sku").value;
  const descripcion = document.getElementById("descripcion").value;
  const problema = document.getElementById("problema").value;
  const asn = document.getElementById("asn").value;
  const unidades = parseInt(document.getElementById("unidades").value);

  try {
    // Agregar el documento a la colección "incidencias"
    const docRef = await addDoc(collection(db, "incidencias"), {
      fecha: new Date().toLocaleDateString(),
      sku: sku,
      descripcionSku: descripcion,
      problemaDetectado: problema,
      asn: asn,
      unidades: unidades,
      creadoEn: new Date()
    });

    alert("¡Incidencia registrada con éxito! ID: " + docRef.id);
    document.getElementById("formulario-incidencias").reset(); // Limpiar formulario
  } catch (error) {
    alert("Error al guardar en la base de datos: " + error.message);
  }
});
