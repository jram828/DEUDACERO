import { models } from "../../DB.js";

const { Acreedor, Cliente, Deuda } = models;

export const crearResena = async (datosResena) => {
  console.log("Body solicitud:", datosResena);

  const { acreedores, deudas, cliente } = datosInsolvencia;

  try {
    const foundCliente = await Cliente.findOne({
      where: { cedulaCliente: cliente.cedula },
    });

    for (let deuda of deudas) {
      var newDeuda = await Deuda.create({
        tipoDeuda: deuda.tipoDeuda,
        tipoGarantia: deuda.tipoGarantia,
        documentoSoporte: deuda.documentoSoporte,
        capital: deuda.capital,
        intereses: deuda.intereses,
        cuantiaTotal: Number(deuda.capital) + Number(deuda.intereses),
        clasificacion: deuda.clasificacion,
        diasMora: deuda.diasMora,
      });
      newDeuda.addCliente(foundCliente);
    }
    console.log("Ultimo Deuda: ", newDeuda);

    for (let acreedor of acreedores) {
      var newAcreedor = await Acreedor.create({
        NIT: acreedor.NIT,
        email: acreedor.emailAcreedor,
        nombre: acreedor.nombreAcreedor,
        direccion: acreedor.direccionAcreedor,
        ciudad: acreedor.ciudadAcreedor,
        telefono: acreedor.telefono,
      });
      newAcreedor.addCliente(foundCliente);
    }
    console.log("Ultimo Acreedor: ", newAcreedor);
  } catch (error) {
    console.log(error);
  }
};
