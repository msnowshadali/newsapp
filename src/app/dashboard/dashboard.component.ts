import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Utils } from '../common';
import { environment } from '../../environments/environment';
import { gapi } from '../../../src/platform.js';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit{
  s = new Utils();
  articles : any;
  auth2:any;
  userName:String;
  userImage:String;
  
  
  chosenCountry : any = {country:"India", lable:"in"};
  countries:any[] = [{"country":"Argentina","lable":"ar"},{"country":"Australia","lable":"au"},{"country":"Austria","lable":"at"},{"country":"Belgium","lable":"be"},{"country":"Brazil","lable":"br"},{"country":"Bulgaria","lable":"bg"},{"country":"Canada","lable":"ca"},{"country":"China","lable":"cn"},{"country":"Colombia","lable":"co"},{"country":"Cuba","lable":"cu"},{"country":"CzechRepublic","lable":"cz"},{"country":"Egypt","lable":"eg"},{"country":"France","lable":"fr"},{"country":"Germany","lable":"de"},{"country":"Greece","lable":"gr"},{"country":"HongKong","lable":"hk"},{"country":"Hungary","lable":"hu"},{"country":"India","lable":"in"},{"country":"Indonesia","lable":"id"},{"country":"Ireland","lable":"ie"},{"country":"Israel","lable":"il"},{"country":"Italy","lable":"it"},{"country":"Japan","lable":"jp"},{"country":"Latvia","lable":"lv"},{"country":"Lithuania","lable":"lt"},{"country":"Malaysia","lable":"my"},{"country":"Mexico","lable":"mx"},{"country":"Morocco","lable":"ma"},{"country":"Netherlands","lable":"nl"},{"country":"New Zealand","lable":"nz"},{"country":"Nigeria","lable":"ng"},{"country":"Norway","lable":"no"},{"country":"Philippines","lable":"ph"},{"country":"Poland","lable":"pl"},{"country":"Portugal","lable":"pt"},{"country":"Romania","lable":"ro"},{"country":"Russia","lable":"ru"},{"country":"Saudi Arabia","lable":"sa"},{"country":"Serbia","lable":"rs"},{"country":"Singapore","lable":"sg"},{"country":"Slovakia","lable":"sk"},{"country":"Slovenia","lable":"si"},{"country":"South Africa","lable":"za"},{"country":"South Korea","lable":"kr"},{"country":"Sweden","lable":"se"},{"country":"Switzerland","lable":"ch"},{"country":"Taiwan","lable":"tw"},{"country":"Thailand","lable":"th"},{"country":"Turkey","lable":"tr"},{"country":"UAE","lable":"ae"},{"country":"Ukraine","lable":"ua"},{"country":"United Kingdom","lable":"gb"},{"country":"United States","lable":"us"},{"country":"Venuzuela","lable":"ve"}];
  constructor(private HttpClient:HttpClient, private AuthService:AuthService) {  }

  //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo



  dataa:any = [{
    "Meta Data": {
        "1. Information": "Monthly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "MSFT",
        "3. Last Refreshed": "2018-04-27",
        "4. Time Zone": "US/Eastern"
    },
    "Monthly Time Series": {
        "2000-06-30": {
            "1. open": "64.3700",
            "2. high": "82.1900",
            "3. low": "63.8100",
            "4. close": "80.0000",
            "5. volume": "733525100"
        },
        "2000-05-31": {
            "1. open": "72.8700",
            "2. high": "74.0000",
            "3. low": "60.3800",
            "4. close": "62.5600",
            "5. volume": "672215400"
        },
        "2000-04-28": {
            "1. open": "94.4400",
            "2. high": "96.5000",
            "3. low": "65.0000",
            "4. close": "69.7500",
            "5. volume": "1129073300"
        },
        "2000-03-31": {
            "1. open": "89.6200",
            "2. high": "115.0000",
            "3. low": "88.9400",
            "4. close": "106.2500",
            "5. volume": "1014093800"
        },
        "2000-02-29": {
            "1. open": "98.5000",
            "2. high": "110.0000",
            "3. low": "88.1200",
            "4. close": "89.3700",
            "5. volume": "667243800"
        }
    }
}];


stockOpen:string[]=[];
stockLable:string[]=[];
stockHigh:string[]=[];
stockLow:string[]=[];
stockClose:string[]=[];


  ngAfterViewInit(){

  }
 
  initateLineData(){
    for (let x in this.dataa[0]["Monthly Time Series"] ){
        { let s:any = this.dataa[0]["Monthly Time Series"][x]["1. open"]; s = Number(s); this.stockOpen.push(s);  }
        { let s:any = this.dataa[0]["Monthly Time Series"][x]["2. high"];  s = Number(s); this.stockHigh.push(s); }
        { let s:any = this.dataa[0]["Monthly Time Series"][x]["3. low"]; s = Number(s); this.stockLow.push(s); }
        { let s:any = this.dataa[0]["Monthly Time Series"][x]["4. close"]; s = Number(s); this.stockClose.push(s); }
        this.stockLable.push(x);
    }
  }

  renderLineChart(){

    this.initateLineData();
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
      this.userName = localStorage.getItem("userName");
      this.userImage = localStorage.getItem("userImage");
      this.s.checkIfSignedIn();
      this.getArticals(this.chosenCountry);
      gapi.load('auth2', function(){
        let auth2 = gapi.auth2.init({
            client_id: environment.googleAuthApiKey+'.apps.googleusercontent.com'
        });
      });

      this.renderLineChart();
      //this.renderPieChart();
    }

    logout() {
      this.s.logout(this);
    }

    getArticals(chosenCountry){
        // this.HttpClient.get(environment.newsApiHeadlinesUrl+chosenCountry.lable+'&apiKey='+environment.newsApiKey).subscribe((data:any)=>{
        //   this.articles = data.articles;
        // });
    }

  changeCountry(country){
    this.chosenCountry=country;
    this.getArticals(this.chosenCountry);
  }

}
