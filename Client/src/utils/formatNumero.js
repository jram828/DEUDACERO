export const formatNumero = (numero,decim) => {
  //console.log("Decimales:", decim);
    if (!numero) return "";
 const decimales = decim ? 2 : 0;
    // Convertir a número flotante para manejar decimales
    const num = parseFloat(numero.toString().replace(/,/g, "."));

    // Formatear el número con separadores de miles y mantener dos decimales
    return num.toLocaleString("es-CO", {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });
  };