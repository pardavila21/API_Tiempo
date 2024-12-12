/*const fetch = require("node-fetch"); OBSOLETO*/
import fetch from "node-fetch";

const teisLatitud = 42.2576;
const teisLongitud = -8.683;

const datosTiempo = {
	"Direccion_viento: ": "",
	"Codigo_tiempo: ": "",
	"Tipo_tiempo: ": "",
	"Temperatura: ": "",
};

const codigosTiempo = {
	0: "Cielo despejado ☀️",
	1: "Mayormente despejado 🌤️",
	2: "Parcialmente nublado 🌥️",
	3: "Cubierto ☁️",
	45: "Niebla 🌫️",
	48: "Niebla escarchada 🌫️",
	51: "Llovizna: ligera 🌧️",
	53: "Llovizna: moderada 🌧️",
	55: "Llovizna: densa 🌧️",
	56: "Llovizana helada ligera 🌧️",
	57: "Llovizana helada densa 🌧️",
	61: "Lluvia: ligera 🌧️",
	63: "Lluvia: moderada 🌧️",
	65: "Lluvia: densa 🌧️",
	66: "Lluvia congelante: ligera 🌧️",
	67: "Lluvia congelante: densa 🌧️",
	71: "Nieve: ligera ❄️",
	73: "Nieve: moderada ❄️",
	75: "Nieve: densa ❄️",
	77: "Granos de nieve ❄️",
	80: "Duchas de lluvia: ligera ☔",
	81: "Duchas de lluvia: moderada ☔",
	82: "Duchas de lluvia: densa ☔",
	85: "Duchas de nieve: ligera ☃️",
	86: "Duchas de nieve: densa ☃️",
	95: "Tormenta electrica: ligera o moderada ⛈️",
	96: "Tormenta electrica con granizo ligera ⛈️",
	99: "Tormenta electrica con granizo pesado ⛈️",
};

const obtenerInformacionMeteo = async (latitud, longitud) => {
	try {
		const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code,wind_direction_10m`;
		let respuestaAPI = await fetch(apiURL);
		const respuestaAPIenJSON = await respuestaAPI.json();
		return respuestaAPIenJSON;
	} catch (error) {
		return error;
	}
};

const procesaCodigoTiempo = (datosMeteo) => {
	var codigoTiempo = datosMeteo.current.weather_code;
	var tipoTiempo = codigosTiempo[codigoTiempo];

	datosTiempo["Codigo_tiempo: "] = codigoTiempo;
	datosTiempo["Tipo_tiempo: "] = tipoTiempo;
};

const procesaDirrecionViento = (datosMeteo) => {
	var direccionViento = datosMeteo.current.wind_direction_10m;

	datosTiempo["Direccion_viento: "] = direccionViento;
};

const procesaTemperatura = (datosMeteo) => {
	var temperatura = datosMeteo.current.temperature_2m;
	var unidadMedida = datosMeteo.current_units.temperature_2m;

	datosTiempo["Temperatura: "] = temperatura + unidadMedida;
};

/*const procesaInformacionMeteo = (datosMeteo) => {
	var datos = {
		"Direccion_viento: ": datosMeteo.current.wind_direction_10m,
		"Codigo_tiempo: ": datosMeteo.current.weather_code,
		"Tipo_tiempo: ": codigosTiempo[datosMeteo.current.weather_code],
		"Temperatura: ":
			datosMeteo.current.temperature_2m +
			datosMeteo.current_units.temperature_2m,
	};
	console.log(datos);
};*/

const muestraInformacionMeteo = () => {
	console.log(datosTiempo);
};

const datosMeteo = await obtenerInformacionMeteo(teisLatitud, teisLongitud);
procesaCodigoTiempo(datosMeteo);
procesaDirrecionViento(datosMeteo);
procesaTemperatura(datosMeteo);
muestraInformacionMeteo();
