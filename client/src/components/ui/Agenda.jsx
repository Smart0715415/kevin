import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Soon from "./Proximamente";
import Eliminar from "./EliminarAdvertencia";

function Agenda({ restart, next }) {
  const [soon, setSoon] = useState(false);
  const [del, setDel] = useState(false);

  const toggleSoon = () => {
    setSoon(!soon);
  };

  const toggleDel = () => {
    setDel(!del);
  };

  const [citasItems, setCitasItems] = useState([]);

  // const [citasItems, setCitasItems] = useState([
  //     { id: 1, name: 'Facial Hidratante', price: 800.00, quantity: 1, image: "../../../pictures/crema2.png", desc: "Crema olor a coco humectante.", duracion: "60 min", dia: "07/06/2024", hora: "8:00", especialista: "Antonio Esparza" },
  //     { id: 2, name: 'Maquillaje', price: 1100.00, quantity: 1, image: "../../../pictures/crema1.png", desc: "Shampoo con aceite de coco.", duracion: "90 min", dia: "31/03/2024", hora: "14:20", especialista: "Antonio Esparza" },
  // ]);

  useEffect(() => {
    setTimeout(() => {
      iterateArray();
    }, 1000);
  }, []);

  const iterateArray = () => {
    let myArray = JSON.parse(localStorage.getItem("citas")) || [];
    setCitasItems(myArray);
  };

  const RLSCitas = (id) => {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];
    citas = citas.filter((obj) => obj.id !== id);
    localStorage.setItem("citas", JSON.stringify(citas));
  };

  //Para remover por completo un servicio.
  const removeItem = (itemId) => {
    setCitasItems(citasItems.filter((item) => item.idServicio !== itemId)); //este lo elimina de la vista carrito
    RLSCitas(itemId); //este elimina el item de locaStorage
  };

  const [descuento, setDescuento] = useState("");
  const handleChange = (event) => {
    setDescuento(event.target.value);
  };

  const handleRestart = () => {
    restart();
  };

  const totalCitas = citasItems.reduce((total, item) => total + 1, 0);
  const total = citasItems
    .reduce(
      (acc, item) => acc + item.precioServicio.replace(/[#\s]/g, "") * 1,
      0
    )
    .toFixed(2);

  const iva = (total * 0.08).toFixed(2);
  const totalIva = (parseFloat(total) + parseFloat(iva)).toFixed(2);

  const puntos = parseFloat(totalIva) / 10;
  //En caso de ser Socio VVV
  //const puntos = (parseInt(totalIva))/5;

  localStorage.setItem("total", total);
  localStorage.setItem("totalIva", totalIva);
  const citasList = citasItems.map((item) => (
    <li
      key={item.idServicio}
      className="flex justify-between p-4 mb-4 border-2 shadow-md rounded-xl border-gray"
    >
      <img
        className="w-24 h-24 mr-6 rounded-full"
        src={item.ImagenServicio}
        alt={item.nombreServicio}
      />
      <div className="grid justify-center">
        <div className="flex justify-self-center">
          <span className="mr-5 font-bold text-l">{item.nombreServicio}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-m">Duracion: {item.tiempoServicio}</span>
          <span className="text-m">Costo: ${item.precioServicio}</span>
        </div>
        <div className="flex justify-around">
          <span className="text-m">
            Cita: {item.FechaServicio} - {item.horaDisp}
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-m">Especialista: {item.nombreEsp}</span>
        </div>
      </div>
      <button
        className="duration-200 hover:text-[#ec5766] text-2xl"
        /*onClick={() => removeItem(item.idServicio)}*/
        onClick={toggleDel}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  ));

  return (
    <>
      <div className="grid">
        <h1 className="justify-self-center text-2xl px-4  border-b-2 border-b-[#ec5766] font-bold mb-10">
          Resumen de tus citas
        </h1>
        <div className="flex justify-between mx-16">
          {/* Bloque de servicios */}
          <div className="rounded-xl shadow-md w-[47%] border-2 border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Servicios
              </p>
            </div>
            {/* Contenido de los servicios agendados */}
            <div className="px-6 pt-6 overflow-y-auto">
              {citasItems.length === 0 ? (
                <div className="grid">
                  <h4 className="mt-4 mb-10 text-xl font-bold justify-self-center">
                    No hay servicios agendados.
                  </h4>
                </div>
              ) : (
                <>
                  <ul id="">{citasList}</ul>
                </>
              )}
            </div>
            {/* Botones */}
            <div>
              {citasItems.length === 0 ? (
                <div className="flex justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-[#ec5766] text-white px-10 py-2 rounded-full"
                  >
                    Agregar
                  </button>
                </div>
              ) : (
                <div className="flex justify-around mb-4">
                  <button className="bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]">
                    Modificar
                  </button>
                  <button
                    onClick={handleRestart}
                    className="bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Bloque de pago */}
          <div className="rounded-xl shadow-md w-[47%] border-2 border-gray">
            <div className="grid bg-[rgb(3,109,99)] rounded-t-xl">
              <p className="py-2 text-lg text-white justify-self-center">
                Pago
              </p>
            </div>
            <div className="px-6 pt-6">
              <div className="grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray">
                <div className="flex justify-between mb-2">
                  <span>{totalCitas} Servicio(s)</span>
                  <h1 className="font-bold">${total}</h1>
                </div>
                <div className="flex justify-between mb-2">
                  <h1>IVA</h1>
                  <h1 className="font-bold">${iva}</h1>
                </div>
                <div className="flex justify-between">
                  <h1>Descuento por membresía</h1>
                  <h1 className="font-bold">$0.00</h1>
                </div>
              </div>
              {/* Código de descuento */}
              <div className="p-6 mb-4 border-2 shadow-md rounded-xl border-gray">
                <div className="flex justify-center w-full">
                  <h3 className="mb-4 text-xl font-bold text-center justify-self-center">
                    ¿Tienes un cupón de descuento?
                  </h3>
                </div>
                <div className="flex justify-between border-2 rounded-full shadow-md border-gray">
                  <input
                    type="text"
                    value={descuento}
                    onChange={handleChange}
                    maxLength="15"
                    className=" w-[70%] px-2 py-2 text-center rounded-l-full"
                  />
                  <button
                    type="submit"
                    className=" w-[30%] rounded-r-full text-center text-white bg-[rgb(3,109,99)] duration-200 hover:bg-[rgb(69,181,156)] hover:font-bold"
                  >
                    Aplicar
                  </button>
                </div>
                <div className="flex justify-center w-full">
                  <p className="mt-4 text-xs text-center justify-self-center">
                    Los{" "}
                    <p className="text-[#D47300] inline-flex">
                      Términos y Condiciones de los Cupones
                    </p>{" "}
                    de Armony aplican el uso de cupones.
                  </p>
                </div>
              </div>
              <div className="flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray">
                <h4 className="text-xl font-bold">Total:</h4>
                <span className="font-bold text-[rgb(3,109,99)] text-xl">
                  ${totalIva}
                </span>
              </div>
            </div>
            <div className="flex justify-around mb-6">
              <button
                onClick={toggleSoon}
                className="bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]"
              >
                Pago anticipo
              </button>
              <button
                onClick={() => next()}
                className="bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]"
              >
                Pago total
              </button>
            </div>
          </div>
        </div>
      </div>
      {soon && (
        <div className="soon-fondo">
          <div className="text-black soon-fx" onClick={toggleSoon}>
            <Soon />
          </div>
        </div>
      )}
      {del && (
        <div className="soon-fondo">
          <div className="text-black soon-fx" onClick={toggleDel}>
            <Eliminar />
          </div>
        </div>
      )}
    </>
  );
}

export default Agenda;
