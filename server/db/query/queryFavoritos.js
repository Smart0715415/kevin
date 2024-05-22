import mysql from "mysql2";
import { endConnection } from "../connection.js";

export async function addfavorito(conexion, data) {
  try {
    const call = "CALL addFavorito(?,?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto,1]);
    await conexion.query(query);
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function delFavorito(conexion, data) {
  try {
    const call = "CALL delFav(?,?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, [data.idCliente, data.IdProducto]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await conexion.query(query); // Ejecutamos query y almacenamos los valores resultantes
    return rows; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ProductFavoritosbyId(conexion, data) {
  try {
    const call = "CALL getFavoritosProductosCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await conexion.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ServiceFavoritosbyId(conexion, data) {
  try {
    const call = "CALL getFavoritosServiciosCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await conexion.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}
