from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import requests
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .schemas import CreatePrevisaoDadosRequest
from .database import get_db
from .models import PrevisaoDados


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/previsao/{cidade}")
def previsao_cidade(cidade: str):
    params={'q': cidade, 'mode': 'json', 'units': 'metric', 'lang': 'pt_br', 'appid': 'f9ad9a2e96ede813c99871713f9dff53'}
    response = requests.get('https://api.openweathermap.org/data/2.5/weather', params=params)
    return response.json()

@app.get("/previsao-dias-lista/{idCidade}")
def previsao_dias(idCidade: int):
    params = {'id': idCidade, 'mode': 'json', 'cn': 2, 'units': 'metric', 'lang': 'pt_br', 'appid': 'f9ad9a2e96ede813c99871713f9dff53'}
    response = requests.get('http://api.openweathermap.org/data/2.5/forecast', params=params)
    return response.json()


@app.post("/salvar-historico")
def salvar_historico(dados: CreatePrevisaoDadosRequest, db: Session = Depends(get_db)):

    print(dados)
    try:
        insercao = PrevisaoDados(
            identificador_cidade=dados.identificador_cidade,
            cidade=dados.cidade,
            temperatura=dados.temperatura,
            descricao=dados.descricao,
            data_previsao=datetime.now
        )

        db.add(insercao)
        db.commit()
        return { 
            "msg": True,
        }
    except SQLAlchemyError as err:
        return {
            "msg": err
        }

@app.get("/lista-historico")
def lista_historico(db: Session = Depends(get_db)):
    return db.query(PrevisaoDados).all()