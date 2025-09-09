import axios from "axios";

const API_URL = "http://localhost:8080/reportes";

const getAllReportes = async () => {
    const res = await axios.get(API_URL);
    return res.data.reportes;
};

const getbyEmpresa = async () => {
    const res = await axios.get(`${API_URL}/empresas/${empresas}`) // revisar
    return res.data.reportes;
}

const getbyPeriodo = async () => {
    const res = await axios.get(`${API_URL}/periodo/${periodo}`)
    return res.data.reportes
}

const getbyLibro = async () => {
    const res = await axios.get(`${API_URL}/libro/${libro}`)
    return res.data.reportes
}

const reportesService = {
    getAllReportes,
    getbyEmpresa,
    getbyLibro,
    getbyPeriodo,
};

export default reportesService;