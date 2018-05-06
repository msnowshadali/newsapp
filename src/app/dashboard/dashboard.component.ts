import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { config } from '../../config/config';
import { gapi } from '../../../src/platform.js';
import { Chart } from 'chart.js';
import { WebsocketService } from '../websocket.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ WebsocketService, StockService ]
})

export class DashboardComponent implements OnInit, AfterViewInit{
    
    //All Varable declaration
    articles : any;
    auth2:any;
    stockDataNews:any;
    stockOpen:string[]=[];
    stockLable:string[]=[];
    stockHigh:string[]=[];
    stockLow:string[]=[];
    stockClose:string[]=[];
    stockStatus:string[]=[];


    chosenCountry : any = {country:"India", lable:"in"};
    countries:any[] = [{"country":"Argentina","lable":"ar"},{"country":"Australia","lable":"au"},{"country":"Austria","lable":"at"},{"country":"Belgium","lable":"be"},{"country":"Brazil","lable":"br"},{"country":"Bulgaria","lable":"bg"},{"country":"Canada","lable":"ca"},{"country":"China","lable":"cn"},{"country":"Colombia","lable":"co"},{"country":"Cuba","lable":"cu"},{"country":"CzechRepublic","lable":"cz"},{"country":"Egypt","lable":"eg"},{"country":"France","lable":"fr"},{"country":"Germany","lable":"de"},{"country":"Greece","lable":"gr"},{"country":"HongKong","lable":"hk"},{"country":"Hungary","lable":"hu"},{"country":"India","lable":"in"},{"country":"Indonesia","lable":"id"},{"country":"Ireland","lable":"ie"},{"country":"Israel","lable":"il"},{"country":"Italy","lable":"it"},{"country":"Japan","lable":"jp"},{"country":"Latvia","lable":"lv"},{"country":"Lithuania","lable":"lt"},{"country":"Malaysia","lable":"my"},{"country":"Mexico","lable":"mx"},{"country":"Morocco","lable":"ma"},{"country":"Netherlands","lable":"nl"},{"country":"New Zealand","lable":"nz"},{"country":"Nigeria","lable":"ng"},{"country":"Norway","lable":"no"},{"country":"Philippines","lable":"ph"},{"country":"Poland","lable":"pl"},{"country":"Portugal","lable":"pt"},{"country":"Romania","lable":"ro"},{"country":"Russia","lable":"ru"},{"country":"Saudi Arabia","lable":"sa"},{"country":"Serbia","lable":"rs"},{"country":"Singapore","lable":"sg"},{"country":"Slovakia","lable":"sk"},{"country":"Slovenia","lable":"si"},{"country":"South Africa","lable":"za"},{"country":"South Korea","lable":"kr"},{"country":"Sweden","lable":"se"},{"country":"Switzerland","lable":"ch"},{"country":"Taiwan","lable":"tw"},{"country":"Thailand","lable":"th"},{"country":"Turkey","lable":"tr"},{"country":"UAE","lable":"ae"},{"country":"Ukraine","lable":"ua"},{"country":"United Kingdom","lable":"gb"},{"country":"United States","lable":"us"},{"country":"Venuzuela","lable":"ve"}];
    constructor(private HttpClient:HttpClient, private stockService: StockService) {
        //  stockService.messages.subscribe(msg => {			
        // console.log("Response from websocket: " + JSON.stringify(msg));
        //   });
    }

    private message = {
        author: 'something',
        message: 'this is a test message'
    }

    sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.stockService.messages.next(this.message);
		this.message.message = '';
    }

    ngAfterViewInit(){

    }

    renderLineChart(dataa){

        for (let x in dataa["Time Series (Daily)"] ){
            { let s:any = dataa["Time Series (Daily)"][x]["1. open"]; s = Number(s); this.stockOpen.push(s);  }
            { let s:any = dataa["Time Series (Daily)"][x]["2. high"];  s = Number(s); this.stockHigh.push(s); }
            { let s:any = dataa["Time Series (Daily)"][x]["3. low"]; s = Number(s); this.stockLow.push(s); }
            { let s:any = dataa["Time Series (Daily)"][x]["4. close"]; s = Number(s); this.stockClose.push(s); }
            this.stockLable.push(x);
        }

        let stockData = dataa["Time Series (Daily)"][this.stockLable[0]];
        this.stockStatus["open"] = Number(stockData["1. open"]).toFixed(2);
        this.stockStatus["high"] = Number(stockData["2. high"]).toFixed(2);
        this.stockStatus["low"] = Number(stockData["3. low"]).toFixed(2);
        this.stockStatus["close"] = Number(stockData["4. close"]).toFixed(2);
        
        let ctx = document.getElementById("myChart");
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.stockLable,
                datasets: [{
                    label: 'Open Stock Price',
                    data: this.stockOpen,
                    fill: false,
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                },{
                label: 'High Stock Price',
                data: this.stockHigh,
                fill:false,
                borderColor: [
                    '#36a2eb'
                ],
                borderWidth: 1
            },{
                label: 'Low Stock Price',
                data: this.stockLow,
                fill:false,
                borderColor: [
                    '#ff0202'
                ],
                borderWidth: 1
            },{
                label: 'Close Stock Price',
                data: this.stockClose,
                fill:false,
                borderColor: [
                    '#000000'
                ],
                borderWidth: 1
            }
            ]
            },
            options: {
                maintainAspectRatio: false
            }
        });
  }

  renderBarChart(data){
    let company = [];
    let stockPrice = [];
    for (const key in data) {
        company.push(data[key]["1. symbol"]);
        let t=Number(data[key]["2. price"]);
        stockPrice.push(t);
    }

    let ctx = document.getElementById("otherShares");
    let barChartData = {
        "labels": company,
        "datasets": [{
            "label": "Stock Price",
            "data": stockPrice,
            "fill": false,
            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
            "borderWidth": 1
        }]
    };
    let myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data:  barChartData,
        options: {
            legend: {
                display: false,
            },
            maintainAspectRatio: false,
            "scales": {
                "xAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    });
  }

    renderPieChart(){
    let ctx = document.getElementById("myPieChart");

    let data = {
        datasets: [{
            data: [10, 10, 10]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
    let myPieChart = new Chart(ctx,{
        type: 'pie',
        data: data,
        options: {
            maintainAspectRatio: false
        }
    });
    }
  
    ngOnInit() {
        this.getBatchStock();
        this.getOneStock();
    }

    getArticals(chosenCountry){
        // this.HttpClient.get(config.newsApiHeadlinesUrl+chosenCountry.lable+'&apiKey='+config.newsApiKey).subscribe((data:any)=>{
        //   this.articles = data.articles;
        // });
    }

    getBatchStock(){
        this.HttpClient.get("https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,GOOG,IBM,AAPL,AMZN&apikey="+config.alphaApiKey).subscribe((data:any)=>{
            this.renderBarChart(data["Stock Quotes"]);
          });
    }

    getOneStock(){
        this.HttpClient.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey="+config.alphaApiKey).subscribe((data:any)=>{
            this.renderLineChart(data);
          });
    }

    changeCountry(country){
        this.chosenCountry=country;
        this.getArticals(this.chosenCountry);
    }

}
