from pydantic import BaseModel


class CreatePrevisaoDadosRequest(BaseModel):
    identificador_cidade: int
    cidade: str
    temperatura: int
    descricao: str
    data_previsao: str