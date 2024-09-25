import React from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import Botao from '../components/Botao';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function Resumo() {
  const location = useLocation();
  const { listaDespesas } = location.state || { listaDespesas: [] };

  const despesasAgrupadas = listaDespesas.reduce((aux, despesa) => {
    const tipo = despesa.tipo_despesa.descricao;
    const valor = parseFloat(despesa.valor);
    if (!aux[tipo]) {
      aux[tipo] = 0;
    }
    aux[tipo] += valor;
    return aux;
  }, {});

  const dadosGrafico = Object.keys(despesasAgrupadas).map((tipo) => ({
    categoria: tipo,
    total: despesasAgrupadas[tipo],
  }));

  const navigate = useNavigate();
  const voltar = () => {
    navigate('/Despesas', { state: { listaDespesas } });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const TollTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '10px', border: '1px solid #cccccc' }}>
          <p>{`${payload[0].name} : R$ ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Cabecalho titulo="Resumo das despesas" />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '150px', minHeight: '200px' }}>
        {Object.keys(despesasAgrupadas).length === 0 ? (
          <p>Não há despesas cadastradas.</p>
        ) : (
          Object.keys(despesasAgrupadas).map((tipo, index) => (
            <Card
              key={index}
              title={tipo}
              content={"Gasto total: " + new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(despesasAgrupadas[tipo])}
            />
          ))
        )}
      </div>
      {dadosGrafico.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', marginTop: '20px' }}>
          <PieChart width={400} height={400}>
            <Pie
              data={dadosGrafico}
              dataKey="total"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            >
              {dadosGrafico.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<TollTip />} />
            <Legend />
          </PieChart>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Botao type="button" acao={voltar} className="btnSalvar" value="Voltar" />
      </div>
      
      <Rodape />
    </div>
  );
}
