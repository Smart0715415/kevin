import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Soon from "./Proximamente";
import { IoIosWarning } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";

function Agenda({ restart, next }) {
  const notify = () => toast("Selecciona un servicio primero");
  const citasRef = useRef([]);  // Inicialización de citasRef

  const [soon, setSoon] = useState(false);
  const [del, setDel] = useState(false);
  const [selectedCitaIndex, setSelectedCitaIndex] = useState(null);
  const [clave, setClave] = useState(false);
  const [sus, setSus] = useState(false); //<<< CARACTERISTICA GRAFICA DE QUE EL USUARIO ES SOCIO

  async function recibido() {
    const respuesta = await fetch("/api/logueado", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!respuesta.ok) {
        setClave(false);
    }

    let respuestaJson = await respuesta.json();

    if (respuestaJson.logueado == true) {
        setClave(respuestaJson.clave);
    } else {
        setClave(false);
    }
}

  const handleModificar = () => {
    selectedCitaIndex === null && notify();
  };

  const handleCitaClick = (index) => {
    setSelectedCitaIndex(index);
  };

  const citaClassName = (index) => {
    // diseno base
    let baseClass =
      "flex justify-between p-4 mb-4 border-2 hover:border-[#ec5766] hover:border-1 duration-300 shadow-md hover:cursor-pointer rounded-xl border-gray"
    if (selectedCitaIndex === index) {
      // si esta seleccionado borde 
      return `${baseClass} border-[#ec5766] border-2 duration-300`;
    }
    return baseClass;
  };

  const handleClickOutside = (event) => {
    if (Agenda.current.every(ref => ref && !ref.contains(event.target))) {
      setSelectedCitaIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    recibido();
  }, [])

  useEffect(() => { 
    const Prod = async () => {
        try {
            if (clave) {

                const response = await fetch(`/api/admin/cliente/StatusSus/${clave}`)
                const data = await response.json();
                setSus(data)
            }
        } catch (error) {
            console.error("hubo error :", error)
        }
    }
    Prod()
  }, [clave])

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
    //setDel(!del);
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

  // const iva = (total * 0.08).toFixed(2);
  // const totalIva = (parseFloat(total) + parseFloat(iva)).toFixed(2);

  const puntos = (sus ? ((parseInt(total))/5):((parseFloat(total)) / 10));

  localStorage.setItem("total", total);
  localStorage.setItem("puntos", puntos);
  const citasList = citasItems.map((item, index) => (
    <li
      key={index}
      onClick={() => handleCitaClick(index)}
      className={citaClassName(index)}
    // className="flex justify-between p-4 mb-4 border-2 shadow-md rounded-xl border-gray"
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
          <span className="mr-2 text-m ">Duracion: {item.tiempoServicio}</span>
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
        onClick={() => removeItem(item.idServicio)}
        // onClick={toggleDel}
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
                  <button onClick={() => handleModificar()} className="bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]">
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
                {/* <div className="flex justify-between mb-2">
                  <h1>IVA</h1>
                  <h1 className="font-bold">${iva}</h1>
                </div> */}
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
                  ${total}
                </span>
              </div>
              <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                <h4 className='text-xl font-bold'>Puntos obtenidos:</h4>
                <span className='font-bold text-[rgb(3,109,99)] text-xl'>{parseInt(puntos)}</span>
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
          <div className="text-black soon-fx">
            <div className="rounded-md bg-white ring-4 ring-[#E40000]">
              <div className="grid place-content-center my-2">
                <IoIosWarning style={{ fontSize: "52px", color: "#E40000" }} />
              </div>
              <p className="text-2xl text-center my-2">¡Advertencia!</p>
              <p className="text-lg text-center my-2 mx-4">
                ¿Está seguro que desea eliminar este producto?
              </p>
              <div className="grid grid-cols-[30%_30%] place-content-center my-4">
                <button onClick={() => removeItem()} className="w-[4rem] mx-auto text-white bg-[#E40000] hover:bg-[#BC0000] rounded-sm">
                  Sí
                </button>
                <button onClick={() => setDel(!del)} className="w-[4rem] mx-auto bg-white text-[#E40000] ring-2 ring-[#E40000] hover:bg-[#F2F2F2] hover:text-[#BC0000] hover:ring-[#BC0000] rounded-sm">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position={'bottom-right'} theme={'light'} />
    </>
  );
}

export default Agenda;
