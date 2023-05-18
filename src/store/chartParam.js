import {makeAutoObservable} from "mobx";
const ru = require("apexcharts/dist/locales/ru.json")

export function getCOpt (strategyName) {
    const res = {

        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: [1,3],
            dashArray: 0,
        },

        chart: {

            locales: [ru],
            defaultLocale: 'ru',
            type: 'line',
            id: 'area-datetime',
            zoom: {
                // type: 'x',
                enabled: true,
                // autoScaleYaxis: true
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
        yaxis: [
            {
                title: {
                    text: "Цена акции, руб"
                },

            },
            {
                opposite: true,
                title: {
                    text: "Прибыль, %"
                },
            }]

    }

    res.chart.id = strategyName
    return res
}



class ChartParam {
    main_options = {

        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'butt',
            colors: undefined,
            width: [1,3],
            dashArray: 0,
        },

        chart: {

            locales: [ru],
            defaultLocale: 'ru',
            type: 'line',
            id: 'area-datetime',
            zoom: {
                // type: 'x',
                enabled: true,
                // autoScaleYaxis: true
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
        yaxis: [
            {
                title: {
                    text: "Цена акции, руб"
                },

            },
            {
                opposite: true,
                title: {
                    text: "Прибыль, %"
                },
            }]

    }

    setYAxisParam (yAxis) {
        this.main_options.yaxis = yAxis;
    }

    setColors (isTwo) {
        if (isTwo){
            this.main_options.stroke.colors = ['#837e7e','#48aca6']
            this.main_options.stroke.width = [1,3]
        }
        else {
            this.main_options.stroke.colors = ['#48aca6']
            this.main_options.stroke.width = [3]
        }
    }


        // TODO: Сделать проверку на существование данных !!
    setPoints (points){
        this.main_options.annotations.points = []
        if (points) {
            points.forEach((item, i) => {

                const point = {
                    x: new Date(item.x).getTime(),
                    y: item.y,
                    marker: item.isLong ? {size: 3, fillColor: '#23ad2e', strokeColor: '#23ad2e'} :
                        {size: 3, fillColor: 'red', strokeColor: 'red'},
                    label: item.isLong ? {
                            borderColor: '#23ad2e',
                            style: {color: '#fff', background: '#23ad2e'},
                            text: 'L'
                        } :
                        {borderColor: '#FF4560', style: {color: '#fff', background: '#FF4560'}, text: 'S'}
                }
                this.main_options.annotations.points.push(point)

            })
        }

    }

    constructor() {

        makeAutoObservable(this)
    }

}

export default new ChartParam()
