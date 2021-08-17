import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import { diaDaSemana, mensagemAlerta } from "../util/util";
import ListaDetalhes from "./ListaDetalhes";
import NadaEncontrado from "./NadaEncontrado";

const PrevisaoTempo = (props) => {

	let iconTemp = `http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`;
	let diaSemana = diaDaSemana((new Date(props.dt * 1000 - props.timezone * 1000).getDay()))

	//
    const [listaWeather, setDiaListaWeather] = useState({})

	const submitDia = event => {
        event.preventDefault();
        
        // Similar ao BeforeSend do AJax JQuery
        const requisicaoFetch = function() {
            mensagemAlerta('Aguarde!', 'Buscando os dados...', 'info', false)
            return fetch.apply(this, arguments);
        };

		let detalhesId = document.querySelector('.card-detalhes').getAttribute('data-id');
        requisicaoFetch(`http://localhost:8383/previsao-dias-lista/${detalhesId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json()
                .then(data => {
                    Swal.close() // Fechar Sweet Alert
                    setDiaListaWeather(data)
                })
        ).catch(error => {
            Swal.close();
            mensagemAlerta('Erro!', error, 'error')
        });

    };

	var pageResultado;
    if((listaWeather.cod === "200")) {
        pageResultado = <ListaDetalhes { ...listaWeather } />;
    } else {
        pageResultado = <NadaEncontrado detalhe={'Detalhes'}/>;
    }

	return (
		<Card className="text-center rounded mx-auto mt-5 border-0 card-detalhes" data-id={props.id}>
			<Card.Body>
				
					<div className="forecast-container">
							<div className="today forecast curso-pointer" onClick={submitDia} >
								<div className="forecast-header">
									<div className="day">{diaSemana}</div>
									<div className="date">{(new Date(props.dt * 1000 - props.timezone * 1000).toLocaleDateString('pt-BR'))}</div>
								</div>
								<div className="forecast-content">
									<div className="location">{props.name}</div>
									<div className="degree">
										<div className="num">{Math.floor(props.main.temp)}<sup>o</sup>C</div>
										<div className="forecast-icon">
											<img src={iconTemp} alt="Temperatura" width="140" className="img-fluid" />
										</div>	
									</div>
									<span><img src="images/humidade.svg" alt="Umidade Relativa" />{props.main.humidity}%</span>
									<span><img src="images/icon-wind.png" alt="Velocidade do Vento" />{props.wind.speed.toString().replace('.', ',')} km/h</span>
									<span><img src="images/pressao.svg" alt="Pressão do Ar" />{props.main.pressure} hPa</span>
								</div>
							</div>

						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Terça</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/sol.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Quarta</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/sol_nuvem.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Quinta</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/nuvem_chuva.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Sexta</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/nuvem.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Sábado</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/nuvem_raios.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
						<div className="forecast">
							<div className="forecast-header">
								<div className="day">Domingo</div>
							</div>
							<div className="forecast-content">
								<div className="forecast-icon">
									<img src="images/nuvem2.svg" alt="" width="48" />
								</div>
								<div className="degree">23<sup>o</sup>C</div>
								<small>18<sup>o</sup></small>
							</div>
						</div>
					</div>

					<hr />
					<h3></h3>
					{ pageResultado }

			</Card.Body>
		</Card>
	);
}

export default PrevisaoTempo;