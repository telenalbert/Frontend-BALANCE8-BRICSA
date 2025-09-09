import React from "react";
import { Table as AntTable} from "antd";
import Buttons from "../Buttons/Buttons";

const Table = ({ data, loading, search }) => {
  const filteredData = search
  ? data.filter(row =>
      Object.values(row).some(val => {
        if (val === null || val === undefined) return false;
        return val.toString().toLowerCase().includes(search.toLowerCase());
      })
    )
  : data;
  const columns = [
    { title: "Cuenta", dataIndex: "cuenta" },
    { title: "Descripción", dataIndex: "descripcion" },
    { title: "Debe", dataIndex: "debe" },
    { title: "Haber", dataIndex: "haber" },
    { title: "Deudor", dataIndex: "deudor" },
    { title: "Acreedor", dataIndex: "acreedor" },
    { title: "Activo", dataIndex: "activo" },
    { title: "Pasivo", dataIndex: "pasivo" },
    { title: "Pérdida", dataIndex: "perdida" },
    { title: "Ganancia", dataIndex: "ganancia" },
  ];
    const totals = filteredData.reduce(
      (acc, row) => {
        acc.debe     += row.debe     || 0;
        acc.haber    += row.haber    || 0;
        acc.deudor   += row.deudor   || 0;
        acc.acreedor += row.acreedor || 0;
        acc.activo   += row.activo   || 0;
        acc.pasivo   += row.pasivo   || 0;
        acc.perdida  += row.perdida  || 0;
        acc.ganancia += row.ganancia || 0;
        return acc;
      },
      { debe: 0, haber: 0, deudor: 0, acreedor: 0, activo: 0, pasivo: 0, perdida: 0, ganancia: 0 }
    );

    const resultados = {
      activo: totals.activo     > totals.pasivo   ? totals.activo   - totals.pasivo : "",
      pasivo: totals.pasivo     > totals.activo   ? totals.pasivo   - totals.activo : "",
      perdida: totals.perdida   > totals.ganancia ? totals.perdida  - totals.ganancia : "",
      ganancia: totals.ganancia > totals.perdida  ? totals.ganancia - totals.perdida : "",
    };

    const sumasIguales = {
      debe:     totals.debe,
      haber:    totals.haber,
      deudor:   totals.deudor,
      acreedor: totals.acreedor,
      activo:   Math.max(totals.activo, totals.pasivo),
      pasivo:   Math.max(totals.activo, totals.pasivo),
      perdida:  Math.max(totals.perdida, totals.ganancia),
      ganancia: Math.max(totals.perdida, totals.ganancia),
    };

  return (
    <div>
      <Buttons
       data={filteredData} 
        totals={totals} 
        resultados={resultados} 
        sumasIguales={sumasIguales}
       />
      <AntTable 
      columns   ={columns}
      dataSource={filteredData}
      rowKey    ="_id"
      loading   ={loading}
      pagination={{ pageSize: 10 }}
      summary   ={() => (
    <>
      <AntTable.Summary.Row style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
        <AntTable.Summary.Cell index={0}>Sumas parciales</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={1}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={2}>{totals.debe}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={3}>{totals.haber}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={4}>{totals.deudor}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={5}>{totals.acreedor}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={6}>{totals.activo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={7}>{totals.pasivo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={8}>{totals.perdida}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={9}>{totals.ganancia}</AntTable.Summary.Cell>
      </AntTable.Summary.Row>

      <AntTable.Summary.Row style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
        <AntTable.Summary.Cell index={0}>Resultados</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={1}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={2}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={3}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={4}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={5}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={6}>{resultados.activo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={7}>{resultados.pasivo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={8}>{resultados.perdida}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={9}>{resultados.ganancia}</AntTable.Summary.Cell>
      </AntTable.Summary.Row>

      <AntTable.Summary.Row style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
        <AntTable.Summary.Cell index={0}>Sumas iguales</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={1}></AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={2}>{sumasIguales.debe}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={3}>{sumasIguales.haber}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={4}>{sumasIguales.deudor}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={5}>{sumasIguales.acreedor}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={6}>{sumasIguales.activo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={7}>{sumasIguales.pasivo}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={8}>{sumasIguales.perdida}</AntTable.Summary.Cell>
        <AntTable.Summary.Cell index={9}>{sumasIguales.ganancia}</AntTable.Summary.Cell>
      </AntTable.Summary.Row>
    </>
  )}
      />;
    </div>
  ) 
    
};

export default Table;
