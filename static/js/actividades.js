const regionSelect = document.getElementById('region_select');
const comunaSelect = document.getElementById('comuna_select');

// Función para cargar comunas
async function loadComunas(regionId) {
    // Limpiar el select de comunas y deshabilitarlo si no hay región seleccionada
    comunaSelect.innerHTML = '<option value="">-- Selecciona una comuna --</option>';
    comunaSelect.disabled = true;

    if (regionId) {
        try {
            // Hacer la petición a la API de Flask
            const response = await fetch(`/get_comunas/${regionId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const comunas = await response.json(); // Parsear la respuesta JSON

            // Rellenar el select de comunas
            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna.id;
                option.textContent = comuna.nombre;
                comunaSelect.appendChild(option);
            });
            comunaSelect.disabled = false; // Habilitar el select de comunas
            
            // Si ya había una comuna seleccionada en la URL (al recargar la página con filtros)
            // intentar re-seleccionar esa comuna
            const urlParams = new URLSearchParams(window.location.search);
            const selectedComunaId = urlParams.get('comuna_id');
            if (selectedComunaId) {
                comunaSelect.value = selectedComunaId;
            }

        } catch (error) {
            console.error('Error fetching comunas:', error);
            alert('Hubo un error al cargar las comunas. Por favor, inténtalo de nuevo.');
        }
    }
}

// Escuchar el evento 'change' en el select de regiones
regionSelect.addEventListener('change', () => {
    const selectedRegionId = regionSelect.value;
    loadComunas(selectedRegionId);
});

// Cargar comunas inicialmente si ya hay una región seleccionada al cargar la página
// Esto es importante si el usuario recarga la página y ya había filtros aplicados
document.addEventListener('DOMContentLoaded', () => {
    const initialRegionId = regionSelect.value;
    if (initialRegionId) {
        loadComunas(initialRegionId);
    }
});

const selectRedSocial = document.getElementById('redes_select');
const contactoInputDiv = document.getElementById('contacto-input');
const contactoInput = document.getElementById('contacto');
const btnAgregarSocial = document.getElementById('agregar_social-btn');

selectRedSocial.addEventListener('change', function() {
    if (this.value !== "") {
        contactoInputDiv.style.display = 'block';
        contactoInput.placeholder = `${this.options[this.selectedIndex].text} ID o URL`;
        
    } else {
        contactoInputDiv.style.display = 'none';
        contactoInput.value = '';
    }
});

const redesAgregadas = {};
btnAgregarSocial.addEventListener('click', function() {
    if(contactoInput.value !== "" && Object.keys(redesAgregadas).length < 5) {
        redesAgregadas[selectRedSocial.options[selectRedSocial.selectedIndex].text] = contactoInput.value;
        mostrarRedesAgregadas();
    }
});

const redesDiv = document.getElementById('contacto-redes');
function mostrarRedesAgregadas() {
    redesDiv.innerHTML = '<h3>Redes Sociales Agregadas:</h3>';
    for (const nombre_red in redesAgregadas) {
        const nuevaRed = document.createElement('p');
        //nuevaRed.id = 'act-red-' + redesAgregadas.indexOf(red);
        nuevaRed.classList.add('red-agregada');
        nuevaRed.textContent = `> ${nombre_red}: ${redesAgregadas[nombre_red]}`;
        redesDiv.appendChild(nuevaRed);
    }
}

const temasAgregados = [];
const temasSelect = document.getElementById("temas_select");
const btnAgregarTema = document.getElementById("agregar_tema-btn");
const otroTemaDiv = document.getElementById("otro_tema-div");
const otro_tema = document.getElementById("otro_tema-input");

temasSelect.addEventListener('change', function() {
    if (temasSelect.value == "otro") {
        otroTemaDiv.style.display = 'block';
    } else if (temasSelect.value != "otro") {
        otroTemaDiv.style.display = 'none';
        otro_tema.value = '';
    }
})

btnAgregarTema.addEventListener('click', function() {
    tema_a_agregar = "";
    if (temasSelect.value == "otro") {
        if (otro_tema.value.length >= 3 && otro_tema.value.length <= 15) {
            tema_a_agregar = otro_tema.value;
        }
    } else {
        tema_a_agregar = temasSelect.value;
    }
    if (!temasAgregados.includes(tema_a_agregar)) {
        temasAgregados.push(tema_a_agregar);
        mostrarTemasAgregados();
    }
});

const temasDiv = document.getElementById("temas-div");
function mostrarTemasAgregados() {
    temasDiv.innerHTML = '<h3>Temas agregados:</h3>';
    temasAgregados.forEach(tema => {
        const nuevoTema = document.createElement('p');
        nuevoTema.classList.add('red-agregada');
        nuevoTema.textContent = `> ${tema}`;
        temasDiv.appendChild(nuevoTema);
    });
}

function validadorActividad(email, tel, dhi, dht, temas, fotos) {
    let esValida = true;
    let camposInvalidos = [];

    if (temas.length == 0) {
        camposInvalidos.push(`El campo temas es obligatorio.`);
    }
    if (fotos.files.length > 5) {
        camposInvalidos.push(`El campo fotos excede la cantidad máxima`)
    }
   if (!email.includes('@')) {
        camposInvalidos.push(`El campo email no cumple el formato correcto.`)
   }

   if (tel != ''){
        if (!tel.includes('+') && tel.length != 12) {
            camposInvalidos.push(`El campo telefono no cumple el formato correcto.`);
   }
   }

   if (!isNaN(dht)) {
        const fechaDHI = new Date(dhi.value);
        const fechaDHT = new Date(dht.value);
        if (isNaN(fechaDHI.getTime()) || isNaN(fechaDHT.getTime())) {
                camposInvalidos.push(`Fechas y horas inválidas`);
        } else {
                if (fechaDHI > fechaDHT) {
                    camposInvalidos.push(`La fecha de termino debe ser mayor a la de inicio`);
                }
        }
   }
   

    if (camposInvalidos.length != 0) {
        esValida = false;
        camposInvalidos.forEach(campo => alert(campo));
    }
    return esValida
}

const agregarActividad = () => {
    const emailInput = document.getElementById("email");
    const telInput = document.getElementById("telefono");
    const dhiInput = document.getElementById("dia_hora_inicio");
    const dhtInput = document.getElementById("dia_hora_termino");
    const fotosInput = document.getElementById("fotos");
    
    if (!validadorActividad(emailInput.value, telInput.value, dhiInput, dhtInput, temasAgregados, fotosInput)) {
        return;
    }

    // Agregar redes sociales como data
    let redesInput = document.createElement("input");
    redesInput.type = "hidden";
    redesInput.name = "act-redes-json";
    redesInput.value = JSON.stringify(redesAgregadas);
    //redesInput.value = redesAgregadas;

    // Agregar temas como data
    let temasInput = document.createElement("input");
    temasInput.type = "hidden";
    temasInput.name = "act-temas-json";
    temasInput.value = JSON.stringify(temasAgregados);

    let actividadForm = document.getElementById("act-form");

    actividadForm.appendChild(redesInput);
    actividadForm.appendChild(temasInput);
    
    actividadForm.submit();
}

let submitActBtn = document.getElementById("submit-act-btn");
submitActBtn.addEventListener("click", agregarActividad);
