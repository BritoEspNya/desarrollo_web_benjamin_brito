const comunas = new Map([
    ["XV", ["Arica", "Camarones", "General Lagos", "Putre"]],
    ["I", ["Alto Hospicio", "Caminna", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]],
    ["II", ["Antofagasta", "Calama", "Maria Elena", "Mejillones", "Ollague", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]],
    ["III", ["Alto del Carmen", "Caldera", "Channal", "Copiapo", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]],
    ["IV", ["Andacollo","Canela", "Combarabala", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Rio Hurtado", "Salamanca", "Vicunna"]],
    ["V", ["Algarrobo","Cabildo","Calle Larga","Cartagena","Casablanca","Catemu","Concón","El Quisco","El Tabo","Hijuelas","Isla de Pascua","Juan Fernández","La Calera","La Cruz","La Ligua","Limache","Llaillay","Los Andes","Nogales","Olmué","Panquehue","Papudo","Petorca","Puchuncaví","Putaendo","Quillota","Quilpué","Quintero","Rinconada","San Antonio","San Esteban","San Felipe","Santa María","Santo Domingo","Valparaíso","Villa Alemana","Viña del Mar","Zapallar"]],
    ["VI", ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "Santa Cruz", "San Vicente"]],
    ["VII", ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"]],
    ["XVI", ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]],
    ["VIII", ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Alamos", "Los Angeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"]],
    ["IX", ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"]],
    ["XIV", ["Corral", "Futrono", "Lago Ranco", "Lanco", "La Unión", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"]],
    ["X", ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"]],
    ["XI", ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "OHiggins", "Río Ibáñez", "Tortel"]],
    ["XII", ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]],
    ["RM", ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "Lampa", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"]]
])

let contadorImagenes = 1;
let contadorContacto = 1;

function defComunas() {
    const regionSelect = document.getElementById("regiones-select");
    const comunaSelect = document.getElementById("comunas-select");

    comunaSelect.innerHTML = '';

    comunas.get(regionSelect.value).forEach(comuna => {
        let newOption = document.createElement('option');
        newOption.textContent = comuna;
        comunaSelect.appendChild(newOption);
    })
    comunaSelect.setAttribute("required", "required")
    comunaSelect.style.display = "block";
}

function contacto() {
    if (contadorContacto <= 5) {
        let contactoDiv = document.getElementById("contacto-div");
        let newContactoInput = document.createElement('input');
        newContactoInput.setAttribute("type", "text");
        newContactoInput.setAttribute("minlength", "4");
        newContactoInput.setAttribute("maxlength", "50");
        newContactoInput.setAttribute("placeholder", document.getElementById("contacto-select").value);
        contactoDiv.appendChild(newContactoInput);
        contactoDiv.appendChild(document.getElementById("contacto-select"));
        contadorContacto++;
        if(contadorContacto > 5) {
            document.getElementById("contacto-select").style.display = "none";
        }
    } 
}

function otroTema() {
    const otroTemaInput = document.getElementById("tema-otro-input")
    if (document.getElementById("temas-select").value == "Otro") {
        otroTemaInput.style.display = "block";
    } else {
        otroTemaInput.style.display = "none";
    }
}

function otraImagen() {
 if (contadorImagenes < 5) {
    let newImgInput = document.createElement('input');
    newImgInput.setAttribute("type", "file");
    newImgInput.setAttribute("onchange", "otraImagen()");
    document.getElementById("imagenes-div").appendChild(newImgInput);
    contadorImagenes++;
 }
}