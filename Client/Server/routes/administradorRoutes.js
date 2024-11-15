import { Router } from "express";
import {
  getAdministradorHandler,
  postAdministradorHandler,
  deleteAdministradorHandler,
  actualizaAdministradorHandler,
} from "../handlers/administradorHandlers.js";

const administradorRouter = Router();

administradorRouter.get("/", getAdministradorHandler);

administradorRouter.post("/", postAdministradorHandler);

administradorRouter.post("/delete", deleteAdministradorHandler);

administradorRouter.put("/actualiza", actualizaAdministradorHandler);

export default administradorRouter;
