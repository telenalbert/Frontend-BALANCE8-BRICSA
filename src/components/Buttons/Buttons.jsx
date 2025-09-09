import { Button, Flex, message, Space } from "antd";
import {
  CheckCircleOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  CopyOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import './Buttons.css'

const Buttons = ({ data, totals, resultados, sumasIguales }) => {
      const extraRows = [
      {
        key: "sumas-parciales",
        cuenta: "",
        descripcion: "Sumas parciales",
        debe: totals?.debe         || 0,
        haber: totals?.haber       || 0,
        deudor: totals?.deudor     || 0,
        acreedor: totals?.acreedor || 0,
        activo: totals?.activo     || 0,
        pasivo: totals?.pasivo     || 0,
        perdida: totals?.perdida   || 0,
        ganancia: totals?.ganancia || 0,
      },
      {
        key: "resultados",
        cuenta: "",
        descripcion: "Resultados",
        debe: 0,
        haber: 0,
        deudor: 0,
        acreedor: 0,
        activo: resultados?.activo     || 0,
        pasivo: resultados?.pasivo     || 0,
        perdida: resultados?.perdida   || 0,
        ganancia: resultados?.ganancia || 0,
      },
      {
        key: "sumas-iguales",
        cuenta: "",
        descripcion: "Sumas iguales",
        debe: sumasIguales?.debe         || 0,
        haber: sumasIguales?.haber       || 0,
        deudor: sumasIguales?.deudor     || 0,
        acreedor: sumasIguales?.acreedor || 0,
        activo: sumasIguales?.activo     || 0,
        pasivo: sumasIguales?.pasivo     || 0,
        perdida: sumasIguales?.perdida   || 0,
        ganancia: sumasIguales?.ganancia || 0,
      },
    ];

    const exportData = [...(data || []), ...extraRows];
    if (exportData.length === 0) return showMessage("No hay datos para exportar", "error");

     const [msgApi, contextHolder] = message.useMessage();

     const showMessage = (text, type = "success", icon = <CheckCircleOutlined />) => {
        msgApi.open({
        content: text,
        type: type,
        icon: icon,
        duration: 3,
        });
  };

    const handleCopy = () => {
        if (!exportData || exportData.length === 0) return alert("No hay datos para copiar");
        const text = exportData.map((row) => Object.values(row).join("\t")).join("\n");
        navigator.clipboard.writeText(text);
        showMessage("Copiado al portapapeles");
    };

    const handleCSV = () => {
      if (!exportData || exportData.length === 0) return alert("No hay datos para exportar");
      const ws = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "reportes.csv");
      showMessage("CSV exportado correctamente");
};

  const handleExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reportes");
    XLSX.writeFile(wb, "reportes.xlsx");
    showMessage("Excel exportado correctamente");
  };

   const handlePDF = () => {

        if (!exportData || exportData.length === 0) return alert("No hay datos para exportar");

        const doc = new jsPDF();

        const columns = [
            "Cuenta",
            "Descripción",
            "Debe",
            "Haber",
            "Deudor",
            "Acreedor",
            "Activo",
            "Pasivo",
            "Pérdida",
            "Ganancia",
        ];

        const rows = exportData.map((row) => [
            row.cuenta      || "",
            row.descripcion || "",
            row.debe        || "",
            row.haber       || "",
            row.deudor      || "",
            row.acreedor    || "",
            row.activo      || "",
            row.pasivo      || "",
            row.perdida     || "",
            row.ganancia    || "",
        ]);

        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 20,
        });

        doc.save   ("reportes.pdf");
        showMessage("PDF exportado correctamente");
  };

  const handlePrint = () => {
        if (!exportData || exportData.length === 0) {
            alert("No hay datos para imprimir");
            return;
        }

        const columns = [
            "Cuenta",
            "Descripción",
            "Debe",
            "Haber",
            "Deudor",
            "Acreedor",
            "Activo",
            "Pasivo",
            "Pérdida",
            "Ganancia",
        ];

        const tableHTML = `
            <html>
            <head>
                <title>Reporte</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 0 auto;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f0f2f5;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #fafafa;
                }
                </style>
            </head>
            <body>
                <h2>Reporte Contable</h2>
                <table>
                <thead>
                    <tr>
                    ${columns.map(col => `<th>${col}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${exportData.map(row => `
                    <tr>
                        <td>${row.cuenta || ""}</td>
                        <td>${row.descripcion || ""}</td>
                        <td>${row.debe || ""}</td>
                        <td>${row.haber || ""}</td>
                        <td>${row.deudor || ""}</td>
                        <td>${row.acreedor || ""}</td>
                        <td>${row.activo || ""}</td>
                        <td>${row.pasivo || ""}</td>
                        <td>${row.perdida || ""}</td>
                        <td>${row.ganancia || ""}</td>
                    </tr>
                    `).join("")}
                </tbody>
                </table>
            </body>
            </html>
        `;

        const printWindow = window.open("", "_blank");
        printWindow.document.write(tableHTML);
        printWindow.document.close();
        printWindow.print();
        };

  return (
    <>
    {contextHolder}
    <Flex gap="small" wrap className="Buttons">
      <Button
        type="default"
        onClick={handleCopy}
        icon={<CopyOutlined />}
      >
        Copiar
      </Button>

      <Button
        type="default"
        onClick={handleCSV}
        icon={<FileTextOutlined />}
      >
        CSV
      </Button>

      <Button
        type="default"
        onClick={handleExcel}
        icon={<FileExcelOutlined />}
      >
        Excel
      </Button>

      <Button
        type="default"
        onClick={handlePDF}
        icon={<FilePdfOutlined />}
      >
        PDF
      </Button>

      <Button
        type="default"
        onClick={handlePrint}
        icon={<PrinterOutlined />}
      >
        Imprimir
      </Button>
    </Flex>
    </>
  );
};

export default Buttons;