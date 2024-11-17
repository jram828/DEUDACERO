// import {
//   ADD_REVIEW,
//   FETCH_REVIEWS_ALL,
//   FETCH_REVIEWS_SUCCESS,
//   FETCH_REVIEWS_FAILURE,
//   ADD_REVIEW_FAILURE,
// } from "./actions";

import {
  SET_AUTHENTICATED,
  SET_USERTOKEN,
  GET_ABOGADOS,
  GET_ABOGADOS_TODOS,
  GET_CLIENTES,
  GET_CLIENTES_TODOS,
  GET_BY_ID_ABOGADO,
  GET_BY_ID_CLIENTE,
  FILTER_ABOGADO,
  FILTER_CLIENTE,
  SET_SOURCE,
  ORDER_ABOGADOS,
  ORDER_CLIENTES,
  DELETE_ABOGADO,
  DELETE_CLIENTE,
  GET_TIPOSDECASOS,
  GET_CASOS,
  GET_CASOS_TODOS,
  FILTER_CASOS,
  ORDER_CASOS,
  GET_CASO_BY_ID,
  POST_CITA,
  GET_CITAS,
  POST_CONSULTA,
  // LOGIN,
  // LOGIN_FAILED,
  // LOG_FAILED,
  CLEAN_USER,
  SET_ABOGADO,
  SET_CLIENTE,
  DELETE_CASO,
  GET_CONSULTAS,
  GET_CONSULTAS_TODOS,
  MODIFICAR_DATOS,
  MODIFICAR_DATOS_ABOGADO,
  GET_PAGOS,
  MODIFICAR_CASO,
  FIN_CASO,
  FILTER_CITAS,
  SET_FILTRO,
  DELETE_CONSULTA,
  POST_INSOLVENCIA,
  POST_RESENA,
  GET_DEUDAS_CLIENTE,
} from "./actions";

let initialState = {
  usuario: {},
  isAuthenticated: false,
  user: {},
  abogados: [],
  clientes: [],
  abogado: {},
  cliente: {},
  tiposDeCasos: [],
  casos: [],
  caso: {},
  cita: [],
  citas: [],
  filtro: [],
  consultas: [],
  pagos: [],
  source: "cliente",
  reviews: [],
  pages: [],
  insolvencia: [],
  deudasCliente: [],
  resena: [],
  reviewError: "",
  // userGit: null,
  loginError: "",
  logError: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_USERTOKEN:
      return {
        ...state,
        user: action.payload,
      };
    case SET_FILTRO:
      return {
        ...state,
        filtro: action.payload,
      };
    case GET_ABOGADOS:
      return {
        ...state,
        abogados: action.payload,
      };
    case GET_ABOGADOS_TODOS:
      return {
        ...state,
        pages: action.payload,
      };
    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
    case GET_CLIENTES_TODOS:
      return {
        ...state,
        pages: action.payload,
      };
    case GET_BY_ID_ABOGADO:
      //window.localStorage.setItem("abogado", JSON.stringify(action.payload));
      return {
        ...state,
        abogados: action.payload,
      };
    case GET_BY_ID_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case FILTER_ABOGADO:
      return {
        ...state,
        abogados: action.payload,
      };
    case FILTER_CLIENTE:
      return {
        ...state,
        clientes: action.payload,
      };

    case SET_SOURCE:
      return {
        ...state,
        source: action.payload,
      };
    case SET_ABOGADO:
      return {
        ...state,
        abogado: action.payload,
      };
    case SET_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case ORDER_ABOGADOS:
      return {
        ...state,
        abogados: action.payload,
      };

    case ORDER_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
    case DELETE_ABOGADO:
      return {
        ...state,
        abogados: action.payload,
      };
    case DELETE_CLIENTE:
      return {
        ...state,
        clientes: action.payload,
      };
    case DELETE_CONSULTA:
      return {
        ...state,
        consulta: action.payload,
      };
    case GET_TIPOSDECASOS:
      return {
        ...state,
        tiposDeCasos: action.payload,
      };
    case GET_CASOS:
      return {
        ...state,
        casos: action.payload,
      };
    case GET_CASOS_TODOS:
      return {
        ...state,
        pages: action.payload,
      };
    case FILTER_CASOS:
      return {
        ...state,
        casos: action.payload,
      };
    case ORDER_CASOS:
      return {
        ...state,
        casos: action.payload,
      };
    case GET_CASO_BY_ID:
      return {
        ...state,
        caso: action.payload,
      };
    case DELETE_CASO:
      return {
        ...state,
        casos: action.payload,
      };
    case FIN_CASO:
      return {
        ...state,
        casos: action.payload,
      };
    case POST_CITA:
      return {
        ...state,
        citas: action.payload,
      };
    case GET_CITAS:
      return {
        ...state,
        citas: action.payload,
      };
    case FILTER_CITAS:
      return {
        ...state,
        citas: action.payload,
      };
    case POST_CONSULTA:
      return {
        ...state,
        consultas: action.payload,
      };
    case GET_CONSULTAS:
      return {
        ...state,
        consultas: action.payload,
      };
    case GET_CONSULTAS_TODOS:
      return {
        ...state,
        pages: action.payload,
      };
    case MODIFICAR_DATOS:
      return {
        ...state,
        cliente: action.payload,
      };
    case MODIFICAR_CASO:
      return {
        ...state,
        caso: action.payload,
      };
    case MODIFICAR_DATOS_ABOGADO:
      return {
        ...state,
        abogado: action.payload,
      };
    case GET_PAGOS:
      return {
        ...state,
        pagos: action.payload,
      };
    case POST_INSOLVENCIA:
      return {
        ...state,
        insolvencia: action.payload,
      };
    case POST_RESENA:
      return {
        ...state,
        resena: action.payload,
      };
    case GET_DEUDAS_CLIENTE:
      return {
        ...state,
        deudasCliente: action.payload,
      };
    case CLEAN_USER:
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
