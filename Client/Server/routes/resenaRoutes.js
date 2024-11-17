import { Router } from "express";
import { crearResenaHandler, getResenasHandler, getDeudasHandler } from "../handlers/resenaHandlers.js";

const resenaRouter = Router();

resenaRouter.post("/", crearResenaHandler);
resenaRouter.get("/", getResenasHandler);
resenaRouter.post("/obtenerdeudas", getDeudasHandler);

export default resenaRouter;
