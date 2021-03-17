import './App.css';

import Header from "./component/header.component";
import ReactApexChart from 'react-apexcharts'

import React, {useRef} from "react";

import {webSocketSubscription} from "./service/api";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coin_symbol: 'Not available at the moment',
            price: 'Not available at the moment',

            series: [
                {
                    data: [
                        {
                            x: 'ETH',
                            y: 1
                        },
                        {
                            x: 'BTC',
                            y: 2
                        },
                        {
                            x: 'ADA',
                            y: 3
                        }
                    ]
                }
            ],
            options: {
                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'treemap'
                },
                title: {
                    text: 'Treemap with Color scale'
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                    },
                    formatter: function (text, op) {
                        return [text, op.value]
                    },
                    offsetY: -4
                },
                plotOptions: {
                    treemap: {
                        enableShades: true,
                        shadeIntensity: 0.5,
                        reverseNegativeShade: true,
                        colorScale: {
                            ranges: [
                                {
                                    from: -6,
                                    to: 0,
                                    color: '#CD363A'
                                },
                                {
                                    from: 0.001,
                                    to: 6,
                                    color: '#52B12C'
                                }
                            ]
                        }
                    }
                }
            },

        }
    }

    componentDidMount() {
        webSocketSubscription(({coin_symbol, price}) => {
            // console.log({coin_symbol});
            let coin = coin_symbol.split('usdt')[0].toUpperCase();
            // console.log({price});
            const coinData = []

            switch (coin) {
                case 'ETH':
                    const firstSeries = [...this.state.series]

                    firstSeries.forEach(data => {
                        const findCoin = data.data.find(coordinate => coordinate.x === 'ETH');
                        findCoin.y = price;
                        console.log(data);
                        this.setState({
                            series: [{...data}]
                        })
                    })

                    break;
                case 'BTC':
                    this.state.series.forEach(data => {
                        const findCoin = data.data.find(coordinate => coordinate.x === 'BTC');
                        findCoin.y = price;
                        console.log({data});
                        this.setState({
                            series: [data]
                        })
                    })

                    break;
                case 'ADA':
                    this.state.series.forEach(data => {
                        const findCoin = data.data.find(coordinate => coordinate.x === 'ADA');
                        findCoin.y = price;
                        console.log({data});
                        this.setState({
                            series: [data]
                        })
                    })
                    break;


            }
            this.setState({
                coin_symbol,
                price
            })
        })
    }


    render() {
        return (
            <>
                <div className="App">
                    <Header/>
                    <h2>Coin Symbol</h2>
                    <h3>{this.state.coin_symbol.split('usdt')[0].toUpperCase()}</h3>
                    <h2>Price</h2>
                    <h3>{this.state.price}</h3>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="treemap"
                                    height={350}/>
                </div>
            </>

        );
    }

}

