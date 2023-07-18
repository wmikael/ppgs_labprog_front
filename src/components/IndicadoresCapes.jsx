
import { Card } from "primereact/card";

const IndicadoresCapes = ({
  indiceRest,
  indiceNRest,
  indiceGeral,
  quantidadeProducoes,
}) => {
  const cardStyle = {
    margin: "10px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    display: "inline-block",
    justifyContent: "space-evenly",
    padding: "16px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const indiceRestStyle = {
    color: "#ff6b6b",
    fontSize: "20px",
    fontWeight: "bold",
  };

  const indiceNRestStyle = {
    color: "#1abc9c",
    fontSize: "20px",
    fontWeight: "bold",
  };

  const indiceGeralStyle = {
    color: "#3498db",
    fontSize: "20px",
    fontWeight: "bold",
  };

  const quantidadeProducoesStyle = {
    color: "#f39c12",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div>
      <h4>Indicadores:</h4>
      <div style={containerStyle}>
        <Card title="Total de Produções" style={cardStyle}>
          <p style={quantidadeProducoesStyle}>{quantidadeProducoes}</p>
        </Card>
        <Card title="Geral" style={cardStyle}>
          <p style={indiceGeralStyle}>{indiceGeral.toFixed(2)}</p>
        </Card>
        <Card title="Restrito" style={cardStyle}>
          <p style={indiceRestStyle}>{indiceRest.toFixed(2)}</p>
        </Card>
        <Card title="Não Restrito" style={cardStyle}>
          <p style={indiceNRestStyle}>{indiceNRest.toFixed(2)}</p>
        </Card>
      </div>
    </div>
  );
};

export default IndicadoresCapes;
