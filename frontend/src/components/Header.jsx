import React from "react";
import { Card } from 'react-bootstrap';

const Header = () => {
    return (
        <div className="container mt-5 mb-5">
            <Card
                style={{ width: '40rem' }}
                className="text-center shadow rounded mx-auto text-dark"
            >
            <Card.Body>
                <Card.Title>
                    <img src="images/sol.svg" alt="Icone Sol" className="img-fluid w-25 mb-5"/>
                    <h3 className="fw-bold"> Previsão do Tempo </h3>
                </Card.Title>
                <hr />
            </Card.Body>
            </Card>
        </div>
    );
}

export default Header;