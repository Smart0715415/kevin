import express from "express";
import { conexion } from "../db/connection.js";
import {
  horasDisponibles,
  createCitas,
  ventaCita,
  duracionTotal,
  stringATiempo,
  horaFinal,
} from "../DB/query/queryCitas.js";
import { searchVentaCita } from "../DB/query/queryVenta.js";

// Router
export const routerCitas = express.Router();

// Middleware
routerCitas.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE POR PROBAR
routerCitas.post("/create", async (req, res) => {
  try {
    const datosCita = {
      idVenta: "",
      idCliente: 21,
      idEmp: 31,
      idServ: 17,
      idPilar: 2,
      nombre: "Ale Barajas Lopez",
      phone: "6864567890",
      tarjeta: "8756098945832956",
      fecha: "2024-05-07",
      horaI: "19:00:00",
      horaF: "",
      descr: "Prueba de componente",
      estado: "pendiente",
      monedero: 0,
      estadoPago: "pagada",
      subTotal: 450,
      total: 670,
      impuesto: 0.08,
    }; // Campos requeridos para la cita
    var duracion = await duracionTotal(conexion, {
      idServ: datosCita.idServ,
    }); // Obtenemos el tiempo de duracion del servicio en String
    datosCita.horaF = horaFinal(datosCita.horaI, duracion[0].tiempo); // Obtenemos la hora en la que finaliza la cita y la almacenamos

    const ventaCita = await createVentaCita(conexion, {
      idCliente: datosCita.idCliente,
      nombre: datosCita.nombre,
      phone: datosCita.phone,
      tarjeta: datosCita.tarjeta,
      monedero: datosCita.monedero,
      estadoPago: datosCita.estadoPago,
      subTotal: datosCita.subTotal,
      total: datosCita.total,
      impuesto: datosCita.impuesto,
    }); // Pasamos parametros necesarios para el procedimiento y ejecutmamos

    // Buscamos el id de la venta que se acaba de realizar
    const venta = await searchVentaCita(conexion, {
      idCliente: datosCita.idCliente,
      fechaVenta: datosCita.fecha,
    });

    // Verificamos que la venta se haya hecho correctamente
    if (venta[0].pkIdVenta !== 0) {
      // Se hizo la venta correctamente
      const resultado = await createCitas(conexion, {
        idVenta: venta[0].pkIdVenta,
        idEmp: datosCita.idEmp,
        idPilar: datosCita.idPilar,
        idServ: datosCita.idServ,
        fecha: datosCita.fecha,
        horaI: datosCita.horaI,
        horaF: datosCita.horaF,
        descr: datosCita.descr,
        estado: datosCita.estado,
      }); // Pasamos parametros al procedimiento y lo ejecutamos (Alta de cita)
      res
        .status(200)
        .json({ message: "Cita creada correctamente", data: resultado }); // Enviamos resultado al navegador
    } else [res.status(400).send("Ha ocurrido un error con el pago")]; // No se realizo el pago correctamente y lo enviamos al navegador
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.post("/venta", async (req, res) => {
  try {
    const resultado = await ventaCita(conexion, {
      pilar: req.body.pilar,
      idCliente: req.body.idCliente,
      nombre: req.body.nombre,
      phone: req.body.phone,
      tarjeta: req.body.tarjeta,
      monedero: req.body.monedero,
      estadoPago: req.body.estadoPago,
      servicio: req.body.servicio,
      idEmp: req.body.idEmp,
      fechaPago: req.body.fechaPago,
      horaPago: req.body.horaPago,
      descr: req.body.descr,
      subTotal: req.body.subTotal,
      total: req.body.total,
      impuesto: req.body.impuesto,
    });
    res.status(200).json({
      message: "La venta de cita fue hecha con exito",
      data: resultado,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.get("/disponibles", async (req, res) => {
  try {
    const resultado = await horasDisponibles(conexion, {
      fecha: req.body.fecha,
      idEmp: req.body.idEmp,
      idServ: req.body.idServ,
    });
    // const horas = await horasDipoArray(resultado);
    console.table(resultado);
    res.status(200).json({
      message: "Horas disponibles: ",
      data: resultado[0].hora_disponible,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
