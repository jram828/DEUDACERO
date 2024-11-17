import { models } from "../../DB.js";
import { verifyPassword } from "../../utils/encryptPassword.js";

const { Cliente, Abogado, Usuario, Ciudad, Departamento, Pais } = models;

const getLogin = async (cedula, password) => {
  console.log("Datos get login:", { cedula, password });
  const login = await Usuario.findOne({
    where: {
      cedula: cedula,
    },
  });

 console.log("Usuario login:", login);
  const isPasswordValid = await verifyPassword(password, login.password);
  
  if (login && isPasswordValid) {
    console.log("Usuario encontrado:", login);
    const user = await Cliente.findOne({
      where: {
        cedulaCliente: login.cedula,
      },
      include: [
        {
          model: Ciudad,
          attributes: ["nombre_ciudad","codigo_ciudad"],
          through: { attributes: [] },
          include: [
            {
              model: Departamento,
              attributes: ["nombre_departamento"],
              through: { attributes: [] },
              include: [
                {
                  model: Pais,
                  attributes: ["nombre_pais"],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
      ],
    });
    console.log("Cedula cliente:", user);
    if (!user) {
      const user = await Abogado.findOne({
        where: {
          cedulaAbogado: login.cedula,
        },
        include: [
          {
            model: Ciudad,
            attributes: ["nombre_ciudad","codigo_ciudad"],
            through: { attributes: [] },
            include: [
              {
                model: Departamento,
                attributes: ["nombre_departamento"],
                through: { attributes: [] },
                include: [
                  {
                    model: Pais,
                    attributes: ["nombre_pais"],
                    through: { attributes: [] },
                  },
                ],
              },
            ],
          },
        ],
      });
      console.log("Cedula abogado:", user);
      if (!user) throw new Error("Aún no tiene autorización para ingresar");
      return {
        access: true,
        usuario: user,
        rol: "abogado",
      };
    }
    return {
      access: true,
      usuario: user,
      rol: "cliente",
    };
  } else {
    return {
      access: false,
    };
  }
};

export { getLogin };
