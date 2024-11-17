import { formatearFecha } from "./formatFecha";
import { formatNumero } from "./formatNumero";

// Función para obtener la fecha del último día del mes
const ultimoDiaDelMes = (fecha) => {
  return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
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
  // Verificar si el mes resultante es febrero y ajustar correctamente
  if (resultado.getMonth() === 1) {
    // Mes de febrero (0-indexed)
    const esBisiesto =
      (resultado.getFullYear() % 4 === 0 &&
        resultado.getFullYear() % 100 !== 0) ||
      resultado.getFullYear() % 400 === 0;
    const diaAjustado = esBisiesto ? 29 : 28;
    resultado.setDate(diaAjustado);
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
  console.log("Saldo:", saldo);
  // Fecha de inicio: último día del mes actual + 90 días
  let fechaPago = sumarDias(ultimoDiaDelMes(new Date()), 90);
  console.log("Fecha de pago:", fechaPago);
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

    // Incrementar la fecha de pago al próximo mes, ajustando al día correcto
    fechaPago = sumarMeses(fechaPago, 1);

    console.log("Plan de pagos:", planPagos);
  }
  return planPagos;
};
