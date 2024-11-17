import './tarjetaCaso.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import picture from "../../assets/case-file.png"


function TarjetaCaso({caso}) {

  const { 
    id,
    tipoCaso,
    nombresabogado, 
    apellidosAbogado,
    nombresCliente,
    apellidosCliente,
     } = caso;


   
    //console.log('item', caso)
     

  return (
    <div className="contenedortarjetacaso">
      {/* <div className="avatar flex justify-center mt-4">
      <img src={picture} alt="Profile Picture" className="rounded-full !w-28 !h-28 border-2 border-secondary" />
    </div> */}
      <div className="contenedorinfocasotarjeta">
        <div className="infocasotarjeta">
          <span className="labelcaso">Tipo de caso: </span>
          <span className="nombrecaso">{tipoCaso}</span>
        </div>
        <div className="infocasotarjeta">
          <span className="labelcaso">Abogado: </span>
          <span className="nombrecaso">
            {nombresabogado} {apellidosAbogado}
          </span>
        </div>
        <Link to={`${id}`} className="link">
          <div className="infocasotarjeta">
            <span className="labelcaso">Cliente: </span>
            <span className="nombrecaso">
              {apellidosCliente} {nombresCliente}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

TarjetaCaso.propTypes = {
  caso: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tipoCaso: PropTypes.string.isRequired,
    nombresabogado: PropTypes.string.isRequired,
    apellidosAbogado: PropTypes.string.isRequired,
    nombresCliente: PropTypes.string.isRequired,
    apellidosCliente: PropTypes.string.isRequired,
  }).isRequired,
};

export default TarjetaCaso
