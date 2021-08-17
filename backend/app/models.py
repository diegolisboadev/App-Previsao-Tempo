
from sqlalchemy import Integer, String
from sqlalchemy.sql.schema import Column
from .database import Base


class PrevisaoDados(Base):
    __tablename__ = 'previsao_dados'

    id = Column(Integer, primary_key=True)
    identificador_cidade = Column(Integer, nullable=True)
    cidade = Column(String, nullable=True)
    temperatura = Column(Integer, nullable=True)
    descricao = Column(String, nullable=True)
    data_previsao = Column(String, nullable=True)
