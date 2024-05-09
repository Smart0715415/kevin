import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages";
import Spa from "./pages/spa";
import Productos from "./pages/Productos";
import Perfil from "./pages/Perfil";
import InformacionPersonal from "./pages/perfil/InformacionPersonal";
import Seguridad from "./pages/perfil/Seguridad";
import Monedero from "./pages/perfil/Monedero";
import Direcciones from "./pages/perfil/Direcciones";
import Agenda from "./pages/perfil/Agenda";
import Suscripciones from "./pages/perfil/Suscripciones";
import Tarjetas from "./pages/perfil/Tarjetas";
import Error from "./pages/Error";
import PasswordResetRecuperacion from "./pages/spa/passwordResetRecuperacion";
import PasswordResetVerificacion from "./pages/spa/passwordResetVerificacion";
import PasswordResetNuevaContr from "./pages/spa/passwordResetNuevaContr";
import PasswordResetConfirmacion from "./pages/spa/passwordResetConfirmacion";
import SignUp from "./pages/spa/signUp";
import Favoritos from "./pages/perfil/ListaDeseo";
import Test from "./components/ui/Test";
import Favicon from "react-favicon";
import EditarPerfil from "./pages/perfil/EditarPerfil";
import Historial from "./pages/perfil/Historial";
import Compras from "./components/ui/Compras";
import Paquetes from "./pages/cita/Paquetes";
import Calendario from "./pages/cita/Calendario";
import Cita from "./pages/Cita";
import ServicioEstetica from "./pages/servicios/Estetica";
import ServicioSpa from "./pages/servicios/Spa";
import SignUpPatologia from  "./pages/spa/signUpPatologia";
import SignUpContrasena from "./pages/spa/signUpContrasena";
import SignUpConfirmacion from "./pages/spa/signUpConfirmacion";
import AgendarServicios from "./components/ui/servicios/agendar/AgendarServicios";

function App() {
    return (
        <>
            <Favicon url="/favicon.ico" />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/spa" element={<Spa />} />
                    <Route path="/spa/productos" element={<Productos />} />
                    <Route path="/spa/resetPassword/Recuperacion" element={<PasswordResetRecuperacion />} />
                    <Route path="/spa/resetPassword/Verificacion" element={<PasswordResetVerificacion />} />
                    <Route path="/spa/resetPassword/NuevaContrasena" element={<PasswordResetNuevaContr />} />
                    <Route path="/spa/resetPassword/Confirmacion" element={<PasswordResetConfirmacion />} />
                    <Route path="/spa/signUp" element={<SignUp />} />
                    <Route path="/spa/signUp/Patologia" element={<SignUpPatologia />} />
                    <Route path="/spa/signUp/Contrasena" element={<SignUpContrasena />} />
                    <Route path="/spa/signUp/Confirmacion" element={<SignUpConfirmacion />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/perfil/informacion" element={<InformacionPersonal />} />
                    <Route path="/perfil/seguridad" element={<Seguridad />} />
                    <Route path="/perfil/monedero" element={<Monedero />} />
                    <Route path="/perfil/direcciones" element={<Direcciones />} />
                    <Route path="/perfil/suscripciones" element={<Suscripciones />} />
                    <Route path="/perfil/tarjetas" element={<Tarjetas />} />
                    <Route path="/perfil/agenda" element={<Agenda />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                    <Route path="/perfil/editar-perfil" element={<EditarPerfil />} />
                    <Route path="/perfil/historial" element={<Historial />} />
                    <Route path="/perfil/compras" element={<Compras />} />
                    <Route path="/spa/agendar/paquetes" element={<Paquetes />} />
                    <Route path="/spa/agendar/calendario" element={<Calendario />} />
                    <Route path="/spa/agendar/" element={<Cita />} />
                    <Route path="/spa/servicios/estetica" element={<ServicioEstetica />} />
                    <Route path="/spa/servicios/spa" element={<ServicioSpa />} />
                    <Route path="/spa/servicios/agendar-servicios" element={<AgendarServicios />} />
                    <Route path="*" element={<Error />} />
                    {/* Tests */}
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;