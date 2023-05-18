import {makeAutoObservable} from "mobx";
import {blue, red} from "@mui/material/colors";
const ru = require("apexcharts/dist/locales/ru.json")

export function getBOpt (briefcaseName) {
    const res = {

        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0,
        },

        chart: {

            locales: [ru],
            defaultLocale: 'ru',
            type: 'line',
            id: '',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -20,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: true,

                }
            }


        },
        annotations: {

            points: []
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        },
        tooltip: {
            enabled : true,
            x: {
                format: 'dd MMM yyyy HH:mm'
            }
        },
        yaxis:
            {
                title: {
                    text: "Прибыль, %"
                },

            }
    }

    res.chart.id = briefcaseName
    return res
}


class BcChartParam {
    main_options = {

        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0,
        },

        chart: {

            locales: [ru],
            defaultLocale: 'ru',
            type: 'line',
            id: 'briefCase-datetime',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -20,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                    pan: true,

                }
            }


        },
        annotations: {

            points: []
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        },
        tooltip: {
            enabled : true,
            x: {
                format: 'dd MMM yyyy HH:mm'
            }
        },
        yaxis:
            {
                title: {
                    text: "Прибыль, %"
                },

            }

    }


    setYAxisParam (yAxis) {
        this.main_options.yaxis = yAxis;
    }


    constructor() {

        makeAutoObservable(this)
    }

}

export default new BcChartParam()
