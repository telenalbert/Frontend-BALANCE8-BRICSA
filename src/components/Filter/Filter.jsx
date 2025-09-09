import React, { useEffect, useState } from "react";
import { Select, Radio, Input, Button} from "antd";
import './Filter.css'

const { Option } = Select;
const { Search } = Input;

const Filter = ({ onFilterChange, onSearchChange, search }) => {
  const [empresa, setEmpresa]   = useState(null);
  const [libro, setLibro]       = useState(null);
  const [periodo, setPeriodo]   = useState("");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/empresas")
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((err) => console.error("Error cargando empresas:", err));
  }, []);

  // Se cambia filtro, se avisa al padre
  useEffect(() => {
   if (empresa && libro && periodo && /^\d{6}$/.test(periodo)) {
      onFilterChange({ empresa, libro, periodo });
    }
  }, [empresa, libro, periodo]);

  return (
    <div className="Filtros">
      <Select
        placeholder="Selecciona empresa"
        className="DropdownEmpresa"
        onChange={(value) => setEmpresa(value)}
        allowClear
      >
        {empresas.map((e) => (
          <Option key={e._id} value={e._id}>
            {e.name}
          </Option>
        ))}
      </Select>

      <div className="Radio">
        <Button
          type={libro === "financiero" ? "primary" : "default"}
          onClick={() =>
            setLibro(prev => (prev === "financiero" ? null : "financiero"))
          }
          style={{ marginRight: "8px" }}
        >
          Financiero
        </Button>

        <Button
          type={libro === "ifrs" ? "primary" : "default"}
          onClick={() =>
            setLibro(prev => (prev === "ifrs" ? null : "ifrs"))
          }
        >
          IFRS
        </Button>
      </div>

      <Input
        placeholder="Ej: 202501"
        className="Periodo"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
      />
      <div className="input">
        <Search
        placeholder="Buscar en cualquier columna"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 250 }}
        allowClear
      />
      </div>
    </div>
  );
};

export default Filter;