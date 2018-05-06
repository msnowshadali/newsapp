import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';


@Component({
  selector: 'app-news-fetch',
  templateUrl: './news-fetch.component.html',
  styleUrls: ['./news-fetch.component.css']
})
export class NewsFetchComponent implements OnInit {
  articles : any;
  chosenCountry : any = {country:"India", lable:"in"};
  countries:any[] = [{"country":"Argentina","lable":"ar"},{"country":"Australia","lable":"au"},{"country":"Austria","lable":"at"},{"country":"Belgium","lable":"be"},{"country":"Brazil","lable":"br"},{"country":"Bulgaria","lable":"bg"},{"country":"Canada","lable":"ca"},{"country":"China","lable":"cn"},{"country":"Colombia","lable":"co"},{"country":"Cuba","lable":"cu"},{"country":"CzechRepublic","lable":"cz"},{"country":"Egypt","lable":"eg"},{"country":"France","lable":"fr"},{"country":"Germany","lable":"de"},{"country":"Greece","lable":"gr"},{"country":"HongKong","lable":"hk"},{"country":"Hungary","lable":"hu"},{"country":"India","lable":"in"},{"country":"Indonesia","lable":"id"},{"country":"Ireland","lable":"ie"},{"country":"Israel","lable":"il"},{"country":"Italy","lable":"it"},{"country":"Japan","lable":"jp"},{"country":"Latvia","lable":"lv"},{"country":"Lithuania","lable":"lt"},{"country":"Malaysia","lable":"my"},{"country":"Mexico","lable":"mx"},{"country":"Morocco","lable":"ma"},{"country":"Netherlands","lable":"nl"},{"country":"New Zealand","lable":"nz"},{"country":"Nigeria","lable":"ng"},{"country":"Norway","lable":"no"},{"country":"Philippines","lable":"ph"},{"country":"Poland","lable":"pl"},{"country":"Portugal","lable":"pt"},{"country":"Romania","lable":"ro"},{"country":"Russia","lable":"ru"},{"country":"Saudi Arabia","lable":"sa"},{"country":"Serbia","lable":"rs"},{"country":"Singapore","lable":"sg"},{"country":"Slovakia","lable":"sk"},{"country":"Slovenia","lable":"si"},{"country":"South Africa","lable":"za"},{"country":"South Korea","lable":"kr"},{"country":"Sweden","lable":"se"},{"country":"Switzerland","lable":"ch"},{"country":"Taiwan","lable":"tw"},{"country":"Thailand","lable":"th"},{"country":"Turkey","lable":"tr"},{"country":"UAE","lable":"ae"},{"country":"Ukraine","lable":"ua"},{"country":"United Kingdom","lable":"gb"},{"country":"United States","lable":"us"},{"country":"Venuzuela","lable":"ve"}];
    
  constructor(private HttpClient:HttpClient) { }

  ngOnInit() {
    this.getArticals(this.chosenCountry);
  }

  getArticals(chosenCountry){
     this.HttpClient.get(config.newsApiHeadlinesUrl+chosenCountry.lable+'&apiKey='+config.newsApiKey).subscribe((data:any)=>{
       this.articles = data.articles;
     });
  }

  changeCountry(country){
    this.chosenCountry=country;
    this.getArticals(this.chosenCountry);
  }

}
