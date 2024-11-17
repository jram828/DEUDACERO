import { models } from "../../DB.js";

const { Cliente, Deuda } = models;

const getDeudas = async (cedulaCliente) => {
  const cliente = await Cliente.findByPk(cedulaCliente, {
    include: [
      {
        model: Deuda,
        as: "deudas",
        attributes: ["idDeuda", "capital", "tipoDeuda"], // Seleccionar los campos que deseas de Deuda
        through: {
          attributes: [], // Excluir atributos de la tabla intermedia
        },
      },
    ],
  });
  return cliente ? cliente.deudas : [];
};

export { getDeudas };
