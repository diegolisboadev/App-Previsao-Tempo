import React, { useState, createRef } from "react";
import { Card, Form, Button, Col, Row, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import { mensagemAlerta, saveDataHistorico } from "../util/util";

import PrevisaoTempo from "./PrevisaoTempo";
import NadaEncontrado from "./NadaEncontrado";
import Historico from "./Historico";


const FormPesquisaCidade = () => {

    // Cidade State
    const [cidade, setCidade] = useState(null)
    const [cidadeWeather, setCidadeWeather] = useState({})

    // Modal Histórico State
    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);
    const fecharModal = () => setShow(false);
    
    const cidadeChange = event => {
        setCidade(event.target.value)
    };
    
    const submitCidade = event => {
        event.preventDefault();
        
        // Similar ao BeforeSend do AJax JQuery
        const requisicaoFetch = function() {
            mensagemAlerta('Aguarde!', 'Buscando os dados...', 'info', false)
            return fetch.apply(this, arguments);
        };

        requisicaoFetch(`http://localhost:8383/previsao/${cidade}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json()
                .then(data => {
                    Swal.close() // Fechar Sweet Alert
                    setCidadeWeather(data)

                    // 
                    var dadosHistorico = {
                        'identificador_cidade': data.id,
                        'cidade': data.name, 
                        'temperatura': Math.floor(data.main.temp), 
                        'descricao': data.weather[0].description,
                    }

                    // Testei antes de enviar o salvamento do Histórico
                    // e comecei a ver um erro 422 tentei e ainda não consegui,
                    // poŕem segue a estrutura de código que utilizei no teste
                    // desculpe 
                    // saveDataHistorico(dadosHistorico);


                })
        ).catch(error => {
            Swal.close();
            mensagemAlerta('Erro!', error, 'error')
        });

    };

    // Verifica se o status da consulta foi 200 (Objeto Encontrado)
    // Caso não retornar uma página de Not Found
    var pageResultado;
    if((cidadeWeather.cod === 200)) {
        pageResultado = <PrevisaoTempo { ...cidadeWeather } />;
    } else {
        pageResultado = <NadaEncontrado detalhe={'Previsão'} />;
    }

    //
    let Ref = createRef(null);

    return (
        <div className="container-fluid mt-5 mb-5" ref={Ref}>
            <Card
                style={{ width: '70rem' }}
                className="text-center shadow rounded mx-auto"
            >
            <Card.Body className="mt-3">
                <Card.Title className="fw-bold text-dark">Informe abaixo a Cidade</Card.Title>
                <hr />

                <Form onSubmit={submitCidade}>
                    <Row className="justify-content-center">
                        <Col sm={6} className="my-1" md={6} lg={6}>
                            <Form.Control id="cidade" placeholder="Ex. Londres" onChange={cidadeChange} required autoFocus/>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button variant="outline-primary" type="submit">Pesquisar</Button>
                            &emsp;
                            <Button variant="outline-secondary" type="reset">Limpar</Button>
                            &emsp;
                            <Button variant="dark" onClick={openModal}>
                                Histórico
                            </Button>
                        </Col>
                    </Row>
                </Form>
                
                <hr />
                {pageResultado}

            </Card.Body>
            </Card>

            {/* Modal Histórico */}
            <Modal 
                show={show} 
                onHide={fecharModal} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-historico"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold text-dark">Histórico de Consultas</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Historico show={}/>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={fecharModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
}

export default FormPesquisaCidade;