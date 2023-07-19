import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";

export default function ModalEstatisticas({ show, producao }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);


  const [inputQtdGraduacao, setInputQtdGraduacao] = useState("");
  const [inputQtdMestrado, setInputQtdMestrado] = useState("");
  const [inputQtdDoutorado, setInputQtdDoutorado] = useState("");

  const handleEditar = async () => {
      try {
        const { id } = producao
        axios({
            url: `http://localhost:8080/api/producao/atualizarEstatisticasProducao`,
            method: "put",
            params: {
                idPrograma: id,
                qtd_grad: inputQtdGraduacao,
                qtd_mest: inputQtdMestrado,
                qtd_dout: inputQtdDoutorado,
            }
        })
      } catch (error) {
        console.error(error);
      }
  };


  const styleInputContainer = {
    margin: "20px"
  };



  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Alterar estatísticas:"
        visible={visible}
        style={{ width: "auto", margin: "auto" }}
        onHide={() => setVisible(false)}
      >
        <div style={styleInputContainer}>
          <InputText
            keyfilter="int"
            placeholder="QTD Graduacao"
            value={inputQtdGraduacao}
            onChange={(e) => {
              setInputQtdGraduacao(e.target.value);
            }}
          />
        </div>
        <div style={styleInputContainer}>
          <InputText
            keyfilter="int"
            placeholder="QTD Mestrado"
            value={inputQtdMestrado}
            onChange={(e) => {
              setInputQtdMestrado(e.target.value);
            }}
          />
        </div>
        <div style={styleInputContainer}>
          <InputText
            keyfilter="int"
            placeholder="QTD Doutorado"
            value={inputQtdDoutorado}
            onChange={(e) => {
              setInputQtdDoutorado(e.target.value);
            }}
          />
        </div>
        <button onClick={handleEditar} style={styleInputContainer}>Editar</button>
      </Dialog>
    </div>
  );
}
