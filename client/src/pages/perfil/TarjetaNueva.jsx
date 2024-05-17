import { Helmet, HelmetProvider } from "react-helmet-async";
import LayoutPrincipal from "../../layouts/LayoutPrincipal";
import { IoIosArrowBack } from "react-icons/io";
import { Fragment, useEffect, useState } from 'react'; // Solo necesitas esta línea de importación
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
//import { products } from '../../data/productos.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import TarjetasPagoEstatica from '../../components/ui/Tarjeta_de_pago_estaticas';

function TarjetaNueva() {

    const [array, setArray] = useState([]);


    useEffect(()=>{
        fetch("/api/tarjetas/1.5")
           .then(response=> response.json())
           .then(data => {
                setArray(data.array);
           })
           .catch(error=>{
               console.log(error);
           });
     },[])

     console.log(array);   //  <---------- los datos del backend aqui estan, los pueden ver en el navegador
            
            

    return (
        <>
            <div className='grid gap-2'>      
               { array.map((objeto) => (<TarjetasPagoEstatica tarjetas={objeto}/>)) }
            </div>
            <HelmetProvider>
              <Helmet>
                <script src="../../../public/scripts/addCard.js"></script>
              </Helmet>
            </HelmetProvider>
            
            <button id='get-back'>volver</button>
            <form action="">
                <label for='titular'>Titular de la tarjeta</label>
                <input type="text" id='titular' name='titular'/>
                <label htmlFor="">Numero de la tarjeta</label>
                <input type="text" id='numero' name='numero'/>
                <div>
                    <label >Fecha de vencimiento</label>
                    <input type="text" id='mes' name='mes'/>
                    <input type="text" id='año' name='año'/>
                </div>
                <label for="cvv">codigo de seguridad</label>
                <input type="text" id='cvv' name='cvv'/>
                <div>
                    <input type="checkbox" id='recordar' name='recordar'/>
                    <label for="recordar">Recordar tarjeta</label>
                </div>
                <div>
                    <input type="checkbox" id='principal' name='principal'/>
                    <label for="principal">Poner como tarjeta principal</label>
                </div>
                <button id='add-Tarjeta'>Agregar tarjeta</button>
            </form>
        </>
        
    );
}

export default TarjetaNueva;