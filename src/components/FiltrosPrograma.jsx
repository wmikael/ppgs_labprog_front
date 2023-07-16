export function FiltrosPrograma() {
  return (
    <div className="filtros">
      <h2>Filtros</h2>
      <label htmlFor="programa">Selecione o programa:</label>
      <select id="programa">
        <option value>--Selecione o programa--</option>
        <option value="programa1">Programa 1</option>
        <option value="programa2">Programa 2</option>
        <option value="programa3">Programa 3</option>
        {/* Adicione mais opções conforme necessário */}
      </select>
      <label htmlFor="anoInicio">Ano de início:</label>
      <input type="text" id="anoInicio" />
      <label htmlFor="anoFim">Ano de fim:</label>
      <input type="text" id="anoFim" />
    </div>
  );
}
