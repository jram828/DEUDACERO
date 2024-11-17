import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { generarPlanPagos } from "../utils/planPagos";
import { formatNumero } from "../utils/formatNumero";

export const generarResena = (
  deudasRaw,
  cliente,
  // listaAcreedores,
  tasaInteres,
  numeroCuotas
) => {
  console.log("Datos reseña:", {
    deudasRaw,
    cliente,
    ciudad: cliente.Ciudads[0].nombre_ciudad,
    // listaAcreedores,
    tasaInteres,
    numeroCuotas,
  });
  const docs = document.getElementById("doc");

  // const newAcreedores = listaAcreedores.map((acreedor, index) => ({
  //   contador: index + 1,
  //   nombreAcreedor: acreedor.nombre,
  //   NIT: acreedor.NIT,
  //   direccionAcreedor: acreedor.direccion,
  //   ciudadAcreedor: acreedor.ciudad,
  //   telefono: acreedor.telefono,
  //   emailAcreedor: acreedor.email,
  // }));

  const deudas = deudasRaw.map((deuda) => {
    return {
      acreedor: deuda.Acreedors[0]?.nombre || "Desconocido",
      capital: deuda.capital,
      tipoDeuda: deuda.tipoDeuda,
    };
  });

  const totalDeuda = deudas.reduce(
    (total, deuda) => total + Number(deuda.capital),
    0
  );

  console.log("Total deuda:", totalDeuda);

  const tasa = Number(tasaInteres) / 100;
  const cuotas = Number(numeroCuotas);

  const totalCuota = (totalDeuda * tasa) / (1 - Math.pow(1 + tasa, -cuotas));

  console.log("Total cuota:", totalCuota);

  deudas.forEach((deuda) => {
    const porcentajeDeuda = (Number(deuda.capital) * 100) / totalDeuda;
    const porcentajeCuota = (porcentajeDeuda * totalCuota) / 100;
    deuda.capital = formatNumero(deuda.capital, 0);
    deuda.porcentajeDeuda = formatNumero(porcentajeDeuda, 0);
    deuda.porcentajeCuota = formatNumero(porcentajeCuota, 0);
  });

  const planpagos = generarPlanPagos(totalDeuda, tasa, cuotas, totalCuota);
  console.log("Plan de pagos:", planpagos);
  const datosresena = {
    deudas,
    cliente,
    ciudad: cliente.Ciudads[0].nombre_ciudad,
    planpagos,
  };

  const reader = new FileReader();
  if (docs.files.length === 0) {
    alert("No files selected");
  }
  reader.readAsBinaryString(docs.files.item(0));

  reader.onerror = function (evt) {
    console.log("error reading file", evt);
    alert("error reading file" + evt);
  };
  reader.onload = function (evt) {
    const content = evt.target.result;
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // !Reemplazar contenido de array en una tabla
    doc.render({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      celular: cliente.celular,
      cedula: cliente.cedula,
      direccion: cliente.direccion,
      ciudad: cliente.Ciudads[0].nombre_ciudad,
      deudas: deudas,
      tasadeinteres: tasaInteres,
      cuotas: numeroCuotas,
      capital: formatNumero(totalDeuda, 0),
      totalcuota: formatNumero(totalCuota, 0),
      planpagos: planpagos,
    });

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE",
    });
    // Output the document using Data-URI
    saveAs(
      blob,
      `RESEÑA TRAMITE DE INSOLVENCIA ${cliente.nombres.toUppercase()}${" "} ${
        cliente.apellidos.toUppercase()
      }.docx`
    );
  };

  return datosresena;
};
