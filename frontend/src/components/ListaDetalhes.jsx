import React from "react";
import { diaDaSemana } from "../util/util";


const ListaDetalhes = (props) => {

    let iconTemp = `http://openweathermap.org/img/wn/${props.list[0].weather[0].icon}@2x.png`;
	let diaSemana = diaDaSemana((new Date(props.list[0].dt * 1000 - props.city.timezone * 1000).getDay()))

    return (
        
        <div className="forecast fw-bold text-dark">
            <div className="forecast-header">
                <div className="day">{diaSemana}</div>
                <hr width="500" className="mx-auto"/>
            </div>
            <div className="forecast-content">
                <div className="forecast-icon">
                    <img src={iconTemp} alt="Icone Tempo" width="100" className="img-fluid w-25 h-25" />
                </div>
                <div className="degree">Minima: {Math.floor(props.list[0].main.temp_min)}<sup>o</sup>C</div>
                <small>Máxima: {Math.floor(props.list[0].main.temp_max)}<sup>o</sup>C</small>
            </div>
            <hr width="500" className="mx-auto"/>
        </div>
    )
}

export default ListaDetalhes;