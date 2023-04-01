import { createChart } from './charts.js';
import { getCoronavirusData } from './coronavirus-api.js';

Chart.defaults.color = '#fff';

const getDataColor = opacity => {
  const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00', '#0038ff'];
  return colors.map(color => opacity ? `${color + opacity}` : color)
}



const filterData = async (mes_inicio, mes_final, anho, data) => {
  let filteredData = data.filter( dataPerDay => {
    const date = new Date(dataPerDay.Date)
    const month = date.getMonth()
    const year = date.getFullYear()
    return mes_inicio <= month && month <= mes_final && anho == year
  });

  return filteredData;
}

const graficarMuertes = async () => {
  let data = await getCoronavirusData('chile', 'deaths');
 
  let data_filtrada = await filterData(1,2,2023, data);
  let labels = data_filtrada.map(dataPerDay => new Date(dataPerDay.Date).toLocaleDateString());
  let datasets = [
    {
      label: 'Cantidad de Fallecidos',
      backgroundColor: getDataColor(),
      borderColor: getDataColor(60),
      data: data_filtrada.map(dataPerDay => dataPerDay.Cases)
    }
  ];

  const canvas3Node = document.getElementById('myChart3');
  createChart(labels, datasets, canvas3Node, 'line');
}

const graficarCasosConfirmados = async () => {
  const data = await getCoronavirusData('chile', 'confirmed');
  
  let data_filtrada = await filterData(1, 2, 2023, data);
  let labels = data_filtrada.map(dataPerDay => new Date(dataPerDay.Date).toLocaleDateString());
  let datasets = [
    {
      label: 'Casos contagiados',
      backgroundColor: getDataColor(),
      borderColor:getDataColor(20) ,
      data: data_filtrada.map(dataPerDay => dataPerDay.Cases)
    }
  ];

  let canvasNode = document.getElementById('myChart');
  createChart(labels, datasets, canvasNode, 'line');
}



const graficarCasosRecuperados = async () => {
  const data = await getCoronavirusData('chile', 'recovered');
  
  let data_filtrada = await filterData(1,2,2023, data);
  let labels = data_filtrada.map(dataPerDay => new Date(dataPerDay.Date).toLocaleDateString());
  let datasets = [
    {
      label: 'Casos recuperados',
      backgroundColor: getDataColor(),
      borderColor: getDataColor(20),
      data: data_filtrada.map(dataPerDay => dataPerDay.Cases)
    }
  ];

  let canvas2Node = document.getElementById('myChart2');
  createChart(labels, datasets, canvas2Node, 'line');
}

graficarMuertes()
.then(() => {
  graficarCasosConfirmados()
})
.then(() => {
  graficarCasosRecuperados()
})