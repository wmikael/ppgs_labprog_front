import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export default function FiltrosPrograma({programa, anoIni, anoFim}) {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const styleFiltrosContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  };

  const styleInputContainer = {
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <div style={styleFiltrosContainer}>
      <div>
        <h4>Filtros:</h4>
      </div>
      <div style={styleInputContainer}>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={programa}
          optionLabel="name"
          placeholder="Seleciona o Programa"
          className="w-full md:w-14rem"
        />
      </div>
      <div style={styleInputContainer}>
        <InputText keyfilter="int" placeholder="Ano Inicial" onChange={(e)=> set} />
      </div>
      <div style={styleInputContainer}>
        <InputText keyfilter="int" placeholder="Ano Final" />
      </div>
    </div>
  );
}
