import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export function SelectProgramas() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/programa/allProgramas")
      .then((res) => {
        const options = res.data.map((d) => ({
          value: d.id,
          label: d.nome,
        }));
        console.log(options)
        setOptions(options);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <Select options={options} />;
}
