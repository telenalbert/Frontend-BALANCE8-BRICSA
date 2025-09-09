import React, { useState, useEffect } from "react";
import Filter from "../Filter/Filter";
import Table from "../Table/Table";

const ReportesLayout = () => {
   const [filters, setFilters] = useState({ empresa: null, libro: null, periodo: "" });
    const [reportesFiltrados, setReportesFiltrados] = useState([]); // filtrados por filtros fijos
    const [reportesTodos, setReportesTodos] = useState([]); // todos los datos del backend
    const [search, setSearch] = useState(""); // búsqueda libre
    const [loading, setLoading] = useState(false);

  useEffect(() => {
     const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:8080/reportes");
        const data = await res.json();
        setReportesTodos(data);
      } catch (err) {
        console.error("Error cargando todos los reportes:", err);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchFiltrados = async () => {
      const { empresa, libro, periodo } = filters;
      if (empresa && libro && periodo) {
        setLoading(true);
        try {
          const params = new URLSearchParams();
          params.append("empresa", empresa);
          params.append("libro", libro);
          params.append("periodo", periodo);

          const res = await fetch(`http://localhost:8080/reportes?${params.toString()}`);
          const data = await res.json();
          setReportesFiltrados(data);
        } catch (err) {
          console.error("Error cargando reportes filtrados:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setReportesFiltrados([]); 
      }
    };
    fetchFiltrados();
  }, [filters]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Balance 8</h2>
      <Filter 
        onFilterChange={setFilters} // Trío
        onSearchChange={setSearch}   // Libre
        search={search} 
      />
      <Table 
        data={search ? reportesTodos : reportesFiltrados} // Si es libre, es en todos los datos
        search={search}
        loading={loading} />
    </div>
  );
};

export default ReportesLayout;
