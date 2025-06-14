Highcharts.chart('act-porDia-container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Cantidad de Actividades por Día'
    },
    xAxis: {
        categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        title: {
            text: 'Días'
        }
    },
    yAxis: {
        title: {
            text: 'Cantidad de Actividades'
        }
    },
    series: [{
        name: 'Actividades',
        data: []
    }]
});

Highcharts.chart('act-porTipo-container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Tipos de Actividades'
    },
    series: [{
        name: 'Tipos',
        data: [
            { name: 'Música', y: 0 },
            { name: 'Deporte', y: 0 },
            { name: 'Ciencias', y: 0 },
            { name: 'Religión', y: 0 },
            { name: 'Política', y: 0 },
            { name: 'Tecnología', y: 0 },
            { name: 'Juegos', y: 0 },
            { name: 'Baile', y: 0 },
            { name: 'Comida', y: 0 },
            { name: 'Otros', y: 0 }
        ]
    }]
});

Highcharts.chart('act-porHorario-container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Actividades por Mes'
    },
    xAxis: {
        categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Cantidad de Actividades',
            align: 'high'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'Mañana',
        data: []
    }, {
        name: 'Mediodía',
        data: []
    }, {
        name: 'Tarde',
        data: []
    }]
});


fetch("http://127.0.0.1:5000/get-estadisticas-data")
  .then((response) => response.json())
  .then((data) => {
    data_Dias = data[0];
    data_Temas = data[1];
    data_Horarios = data[2];
    /*
    let parsedData_Dias = data_Dias.map((item) => {
      const [year, month, day] = item.date
        .split("-")
        .map((part) => parseInt(part, 10));
      return [
        Date.UTC(year, month - 1, day), // javascript month indices start from 0 !
        item.count,];
    });
    
    let parsedData_Dias = [];
    for (let date in data_Dias) {
        const [year, month, day] = date
        .split("-")
        .map((part) => parseInt(part, 10));
        parsedData_Dias.push([Date.UTC(year, month - 1, day), data_Dias[date],])
    }
        */
    let parsedData_Dias = [0, 0, 0, 0, 0, 0, 0];
    for (let day in data_Dias) {
        parsedData_Dias[day] = data_Dias[day];
    }

    let parsedData_Temas = [];
    for (const tema in data_Temas) {
        if (Object.hasOwnProperty.call(data_Temas, tema)) {
            parsedData_Temas.push({
                name: tema, 
                y: data_Temas[tema] 
            });
        }
    }

    let parsedData_Horarios = [[],[],[]];
    for (const mes in data_Horarios) {
        const conteo = data_Horarios[mes];
        parsedData_Horarios[0].push(conteo[0]);
        parsedData_Horarios[1].push(conteo[1]);
        parsedData_Horarios[2].push(conteo[2]);
    }

    // Get the chart by ID
    const chartPorDia = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "act-porDia-container"
    );
    const chartPorTema = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "act-porTipo-container"
    );
    const chartPorHorario = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "act-porHorario-container"
    );

    // Update the chart with new data
    chartPorDia.update({
      series: [
        {
          data: parsedData_Dias,
        },
      ],
    });
    chartPorTema.update({
      series: [
        {
          data: parsedData_Temas,
        },
      ],
    });
    chartPorHorario.update({
      series: [{
        name: 'Mañana',
        data: parsedData_Horarios[0]
        }, {
            name: 'Mediodía',
            data: parsedData_Horarios[1]
        }, {
            name: 'Tarde',
            data: parsedData_Horarios[2]
        }],
    });
  })
  .catch((error) => console.error("Error:", error));