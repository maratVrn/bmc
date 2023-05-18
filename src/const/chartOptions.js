const ru = require("apexcharts/dist/locales/ru.json")
// Нстройки для просто го графика доходности на главной странице
export const simple_chart_options = {
    id: "chart_id",
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },

    chart: {

        locales: [ru],
        defaultLocale: 'ru',
        type: 'line',
        id: 'area-datetime',
        toolbar: { show: false  },
        zoom : { enabled: true }

    },
    annotations: {



    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
            // tickAmount: 3,
    },
    tooltip: {
        enabled : true,
        x: {
            format: 'dd MMM yyyy HH:mm'
        }
    },

}



export const main_chart_options = {

    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },

        chart: {
            background: '#fff',
            locales: [ru],
            defaultLocale: 'ru',
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                // autoScaleYaxis: true
            },
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: -10,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,

                }
            }

        },


        yaxis: {

            title: {
                text: 'Прибыль, %'
            },
        },
        xaxis: {
            type: 'datetime',
        },


}

