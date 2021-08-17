import React from "react";
import { Card } from 'react-bootstrap';


const NadaEncontrado = (props) => {

    return (
        <Card className="text-center rounded mx-auto mt-5 border-0">
            <Card.Body>
                <h3>
                    <Card.Text className="fw-bold text-dark">
                        Nenhum Resultado de {props.detalhe} Encontrado :(
                    </Card.Text>
                </h3>
                <Card.Text>Informe no campo acima o nome da Cidade &#9757;</Card.Text>
            </Card.Body>
        </Card>
    );	

};

export default NadaEncontrado;