import * as mysql from "mysql2/promise.js";
import { conexionDB } from "../data/datos.js";

export const config = {
  // Configuracion para la conexion de la base de datos
  host: conexionDB.HOST,
  port: conexionDB.PORT,
  database: conexionDB.DATABASE,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
  connectionLimit: 5000,
  charset: "utf8mb4",
};

// Establecemos conexion con la base de datos
export async function enableConnect() {
  try {
    const connection = await mysql.createPool(config); // Creamos la conexion con la configuracion declarada anteriormente
    await connection.query("USE armony;");
    console.log("CONNECT TO DATABASE!");
    return connection; // Retornamos la conexion
  } catch (err) {
    // Capturamos error de conexion
    console.error("No pudo conectarse a la DB: ", err); // Mostramos error de conexion
    setTimeout(enableConnect, 1000); // Reintenta la conexion con la base de datos con un tiempo de espera de un segundo
    // throw err; // Tiramos el error para detener ejecucion
  }
}

export const conexion = await enableConnect(); // almacenamos la conexion

// Cierre de conexion con la base de datos
export async function endConnection() {
  console.log("RELEASE CONNECTION");
  conexion.releaseConnection(); // Cerramos la conexion
}
