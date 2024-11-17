import { models } from "../../DB.js";

const { Cliente, Deuda, Acreedor } = models;

const getDeudas = async (cedulaCliente) => {
  // const cliente = await Cliente.findByPk(cedulaCliente, {
  //   include: [
  //     {
  //       model: Deuda,
  //       as: "deudas",
  //       attributes: ["idDeuda", "capital", "tipoDeuda"], // Seleccionar los campos que deseas de Deuda
  //       through: {
  //         attributes: [], // Excluir atributos de la tabla intermedia
  //       },
  //     },
  //   ],
  // });
  // return cliente ? cliente.deudas : [];

  const cliente = await Cliente.findByPk(cedulaCliente, {
    include: [
      {
        model: Deuda,
        include: [
          {
            model: Acreedor,
            attributes: ["idAcreedor", "nombre", "email", "NIT", "direccion", "ciudad", "telefono"], // Seleccionar los campos que deseas de Acreedor
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
          },
        ],
        attributes: [
          "idDeuda",
          "tipoDeuda",
          "capital",
          "intereses",
          "cuantiaTotal",
          "clasificacion",
          "diasMora",
          "tipoGarantia",
          "documentoSoporte",
        ],
        through: { attributes: [] }, // Excluir atributos de la tabla intermedia
      },
    ],
    attributes: ["cedulaCliente", "nombres", "apellidos"], // Seleccionar los campos que deseas de Cliente
  });
  return cliente;
};

export { getDeudas };
