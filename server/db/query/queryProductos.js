import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE SERVICIOS FUNCIONAL
export async function createServicios(connection, data) {
  try {
    let insertServQuery = "CALL addServicio(?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertServQuery, [
      data.name,
      data.price,
      data.descr,
      data.time,
      data.pilar,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// CREATE PRODUCTOS FUNCIONAL
/* NOTA: DEBE EXISTIR LA SUCURSAL PARA PODER HACER LA ALTA */
export async function createProducto(connection, data) {
  try {
    let insertProductoQuery = "CALL addProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertProductoQuery, [
      data.name,
      data.precioVenta,
      data.descr,
      data.pilar,
      data.suc,
      data.stockIni,
      data.proveedor,
      data.precioCompra,
      data.tipo,
      data.img,
    ]); // Parametros para el procedimiento
    const rows = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY ID FUNCIONAL
export async function readProdServById(connection, data) {
  try {
    let searchProductoId = "CALL searchProdServById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchProductoId, [data.idProdServ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY CATEGORIA
export async function readProdServByCategoria(connection, data) {
  try {
    let searchProductoCategoria = "CALL searchProdServByCategoria(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchProductoCategoria, [data.categoria]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos los valores
    endConnection(); // Cerramos conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY PRECIO MAX PENDIENTE
export async function readProdServPrecio(connection, data) {
  try {
    let getProdServPrecio = "CALL getProductosRangoPrecio(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(getProdServPrecio, [data.pilar, data.precio]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos los valores
    endConnection(); // Cerramos conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY A-Z OR Z-A
export async function readProdServAZ(connection, data) {
  try {
    let getProdServAZ = "CALL getProductosOrdenAlfabetico(?)";
    let query = mysql.format(getProdServAZ, [data.orden]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (error) {}
}

// UPDATE FUNCIONAL
export async function updateProdServ(connection, data) {
  try {
    let updateProdQuery = "CALL updProdServ(?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateProdQuery, [
      data.idProdServ,
      data.name,
      data.price,
      data.descr,
      data.status,
      data.time,
      data.img,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cierre de conexion
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteProdServ(connection, data) {
  try {
    let deleteProdQuery = "CALL delProdServ(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteProdQuery, [data.idProdServ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE PRODUCTO DE CATEGORIA (PENDIENTE)
export async function deleteProdCat(connection, data) {
  try {
    let deleteProdCatQuery = "CALL delPSCategoria(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteProdCatQuery, [data.idProdServ, data.idCat]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores
    endConnection(); // Cierre de conexion
    return rows; // retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

<<<<<<< HEAD
export async function ventaProducto(connection, data) {
  try {
    let ventaOnlineProducto = "CALL addVentaProdOnline(?, ?, ?, ?, ?, ?, ? ,?)"; // Procedimiento de la base de datos
    let query = mysql.format(ventaOnlineProducto, [
      data.idCliente,
      data.nombreCompleto,
      data.phone,
      data.tarjeta,
      data.monedero,
      data.subtotal,
      data.total,
      data.impuesto,
    ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores retornados
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores (Se retorna un objeto)
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}
=======

export async function getProducts (pool,data,res){
  try{
      // const pages=data.pages||1;/*por defecto sera pagina 1 */
      // const limit =data.limit||5;/*capacidad por defecto de 5, esto cambiara dependiendo el front */
      // const offset=(pages-1)*limit;
      const query=`SELECT *FROM  prodServ where tipoProducto is not null `
      const [rows,fields]=await pool.query(query);
          return rows;
  }catch(err){
  console.log("Ha ocurrido un error al ejecutar el query: ",err)
  throw err;
  }
     
      }
  
>>>>>>> 01e91963a882ddf1e67d2e1da740ab17e8d5a530
