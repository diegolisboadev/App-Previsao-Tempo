import Swal from "sweetalert2";

/**
 * Retornar uma mensagem personalizada para o 
 * usuário final
 * 
 * @param {string} titulo 
 * @param {string} texto 
 * @param {string} icone 
 * @param {string} flag 
 * @returns 
 */
export function mensagemAlerta(titulo, texto, icone, flag=true) {
    return Swal.fire({
        title: titulo,  
        text: texto,  
        icon: icone,   
        confirmButtonColor: '#323544', 
        showConfirmButton: flag, 
        confirmButtonText: 'Ok'
    });
};

/**
 * Retornar um dia da semana conforme a dia
 * passado como parametro
 * 
 * @param {Integer} dia 
 * @returns 
 */
export function diaDaSemana(dia) {
    const diaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return diaSemana[dia];
};

/**
 * Requisição para salvar alguns dados
 * da previsão do tempo retornados da consulta
 * a API
 * 
 * @param {Object} dados 
 */
export function saveDataHistorico(dados) {
    
    fetch('http://localhost:8383/salvar-historico/', {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'identificador_cidade': dados.identificador_cidade,
            'cidade': dados.cidade,
            'temperatura': dados.temperatura,
            'descricao': dados.descricao,
        })
    })
    .then(response => 
        response.json()
        .then(resultado => console.info(resultado))
    
    ).catch(error => {
        mensagemAlerta('Ops Houve um Erro!', error, 'error')
    });

}