import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import { mensagemAlerta } from "../util/util";


const TabelaHistorico = (props) => {

    // ListaHistórico State
    const [historico, setListaHistorico] = useState({})

    //const listaHistorico = event => {

    if(document.querySelectorAll('.modal-historico').length > 0) {
        
        // Similar ao BeforeSend do AJax JQuery
        const requisicaoFetch = function() {
            mensagemAlerta('Aguarde!', 'Buscando os dados...', 'info', false)
            return fetch.apply(this, arguments);
        };

        requisicaoFetch("http://localhost:8383/lista-historico", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json()
                .then(data => {
                    setListaHistorico(data);
                })
        ).catch(error => {
            mensagemAlerta('Erro!', error, 'error')
        });

    }

    return (

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cidade</th>
                        <th>Temperatura</th>
                        <th>Descricao</th>
                        <th>Data Previsão</th>
                    </tr>
                </thead>
                <tbody>
                {historico.map( (item,index) => {
                        return <tr key={index}>
                            <td>
                                {item.identificador_cidade}
                            </td>
                            <td>
                                {item.cidade}
                            </td>
                            <td>
                                {item.temperatura}
                            </td>
                            <td>
                                {item.descricao}
                            </td>
                            <td>
                                {item.data_previsao}
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        
    )
}

export default TabelaHistorico;