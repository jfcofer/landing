const API_KEY = "5ae2e3f221c38a28845f05b6e14d7215fc0346fe5d7a049649c323b8";
  /*const LAT = -2.0482212839050518; // Latitud del hotel
  const LON = -80.73457306502202; // Longitud del hotel
  const RADIUS = 5000; // ahora: 170 km
    -2.2055814118800727, -80.96441417644762*/

  /*const LAT = -2.2055814118800727; // tu nueva latitud
  const LON = -80.96441417644762; // tu nueva longitud
  const RADIUS = 15000; // 15 km*/
const LAT = -2.2055814118800727;
const LON = -80.96441417644762;
const RADIUS = 2000;
const KINDS = "interesting_places,beaches,museums,architecture,cultural,natural";

fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${RADIUS}&lon=${LON}&lat=${LAT}&kinds=${KINDS}&limit=50&format=json&apikey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("lugares");

    if (!data || data.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron atracciones cercanas.</p>";
      return;
    }

    // Se crea un Set para almacenar nombres únicos es decir no repetidos.
    const nombresUnicos = new Set();
    const lugaresFiltrados = data.filter(lugar => {
      if (!lugar.name || lugar.name.trim() === "" || lugar.name.trim() === "Cementerio" || lugar.name.trim() === "Home") return false;
      if (nombresUnicos.has(lugar.name)) return false;
      nombresUnicos.add(lugar.name);
      return true;
    });

    // Si después del filtro no queda nada
    if (lugaresFiltrados.length === 0) {
      contenedor.innerHTML = "<p>No hay atracciones válidas con nombre único.</p>";
      return;
    }
    
    contenedor.innerHTML = ""; // Limpiar antes de agregar

    lugaresFiltrados.forEach(lugar => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-atraccion";
      tarjeta.innerHTML = `
        <h3 class="atraccion-nombre">${lugar.name}</h3>
        <div class="atraccion-categoria">${(lugar.kinds || "").split(",")[0]}</div>
      `;
      contenedor.appendChild(tarjeta);
    });
    })
  .catch(error => {
    console.error("Error al obtener atracciones:", error);
    document.getElementById("lugares").innerHTML = "<p>Error al cargar las atracciones.</p>";
  });