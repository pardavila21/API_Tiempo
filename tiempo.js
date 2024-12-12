/*const fetch = require("node-fetch"); OBSOLETO*/
import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;

const codigosTiempo = {
	0: "Cielo despejado ☀️",
	1: "Mayormente despejado 🌤️",
	2: "Parcialmente nublado 🌥️",
	3: "Cubierto ☁️",
	45: "Niebla ☁️",
	48: "Niebla escarchada ☁️",
	51: "Llovizna: ligera ☁️",
	53: "Llovizna: moderada ☁️",
	55: "Llovizna: densa ☁️",
	56: "Llovizana helada ligera ☁️",
	57: "Llovizana helada densa ☁️",
	61: "Nublado ☁️",
	63: "Nublado ☁️",
	65: "Nublado ☁️",
	66: "Nublado ☁️",
	67: "Nublado ☁️",
	71: "Nublado ☁️",
	73: "Nublado ☁️",
	75: "Nublado ☁️",
	77: "Nublado ☁️",
	80: "Nublado ☁️",
	81: "Nublado ☁️",
	82: "Nublado ☁️",
	85: "Nublado ☁️",
	86: "Nublado ☁️",
	95: "Nublado ☁️",
	96: "Nublado ☁️",
	99: "Nublado ☁️",
};

const obtenerInformacionMeteo = async (latitud, longitud) => {
	const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code,wind_direction_10m`;
	let respuestaAPI = await fetch(apiURL);
	const respuestaAPIenJSON = await respuestaAPI.json();
	return respuestaAPIenJSON;
};

const procesaInformacionMeteo = (datosMeteo) => {
	var tipoTiempo = codigosTiempo[datosMeteo.current.weather_code];

	var datos = {
		"Direccion_viento: ": datosMeteo.current.wind_direction_10m,
		"Codigo_tiempo: ": datosMeteo.current.weather_code,
		"Tipo_tiempo: ": tipoTiempo,
		"Temperatura: ":
			datosMeteo.current.temperature_2m +
			datosMeteo.current_units.temperature_2m,
	};
	console.log(datos);
};

const muestraInformacionMeteo = () => {};

const datosMeteo = await obtenerInformacionMeteo(teisLatitud, teisLongitud);
procesaInformacionMeteo(datosMeteo);

/*procesarcodigotiempo;
procesadirreccionviento;
muestrainformacionmeteo;*/
