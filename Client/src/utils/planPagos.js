import { formatearFecha } from "./formatFecha";
import { formatNumero } from "./formatNumero";

// Función para obtener la fecha del último día del mes
const ultimoDiaDelMes = (fecha) => {

  if (fecha.getMonth() === 1) {
    // Mes de febrero (0-indexed)
    const esBisiesto =
      (fecha.getFullYear() % 4 === 0 &&
        fecha.getFullYear() % 100 !== 0) ||
      fecha.getFullYear() % 400 === 0;
    const diaAjustado = esBisiesto ? 29 : 28;
    return new Date(fecha.getFullYear(), 1, diaAjustado);
  } else {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 30);
  }
};

// Función para sumar días a una fecha
const sumarDias = (fecha, dias) => {
  const resultado = new Date(fecha);
  resultado.setDate(fecha.getDate() + dias);
  return resultado;
};

// Función para sumar meses a una fecha y ajustar al día correcto
const sumarMeses = (fecha, meses) => {
  const resultado = new Date(fecha);
  resultado.setMonth(fecha.getMonth() + meses);
  //console.log("Fecha de resultado:", resultado);
  // Verificar si el mes resultante es febrero y ajustar correctamente
  if (resultado.getMonth() === 2 && resultado.getDate()===2 || resultado.getDate()===1 ) {
    // Mes de febrero (0-indexed)
    const esBisiesto =
      (resultado.getFullYear() % 4 === 0 &&
        resultado.getFullYear() % 100 !== 0) ||
      resultado.getFullYear() % 400 === 0;
    const diaAjustado = esBisiesto ? 29 : 28;
    resultado.setDate(diaAjustado);
    resultado.setMonth(1);
    //console.log("Fecha de resultado ajustada:", resultado);
  } else {
    resultado.setDate(30);
  }
  return resultado;
}; //

// Función para calcular el plan de pagos
export const generarPlanPagos = (
  capitalInicial,
  tasaInteres,
  numCuotas,
  cuotaMensual
) => {
  const planPagos = [];
  let saldo = capitalInicial;
  let fechaPago = sumarMeses(ultimoDiaDelMes(new Date()), 3);


  for (let i = 1; i <= numCuotas; i++) {
    const interes = saldo * tasaInteres;
    const amortizacion = cuotaMensual - interes;
    saldo -= amortizacion;
    
    planPagos.push({
      numeroCuota: i,
      capitalActual: formatNumero(saldo + amortizacion, 0), // Capital actual antes de amortización
      intereses: formatNumero(interes, 0),
      amortizacion: formatNumero(amortizacion, 0),
      cuotaMensual: formatNumero(cuotaMensual, 0),
      saldo: formatNumero(saldo, 0),
      fechapago: formatearFecha(fechaPago), // Copiar la fecha de pago actual
    });
    
    if(fechaPago.getMonth()===2 && fechaPago.getDate()===2){
      fechaPago.setDate(28);
      fechaPago.setMonth(1);
    } else {fechaPago = sumarMeses(fechaPago, 1);}

    

    //console.log("Plan de pagos:", planPagos);
  }
  return planPagos;
};
