import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';


@Component({
  selector: 'app-product-graph',
  templateUrl: './product-graph.component.html',
  styleUrls: ['./product-graph.component.css']
})
export class ProductGraphComponent implements OnInit {

  constructor(private productService: ProductsService, private datePipe: DatePipe) { }
  minDate;
  yesterday = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  selectGraph: FormControl = new FormControl();
  dateDebut: FormControl = new FormControl();
  dateFin: FormControl = new FormControl();
  dateDebutValue: any;
  dateFinValue: any;
  typeGraph: any = "Date"
  view: any[] = [700, 300];
  multi = [];

  // {
  //   "name": "Germany",
  //   "series": [
  //     {
  //       "name": "1990",
  //       "value": 62000000
  //     },
  //     {
  //       "name": "2010",
  //       "value": 73000000
  //     },
  //     {
  //       "name": "2011",
  //       "value": 89400000
  //     }
  //   ]
  // }
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Ventes';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  saleData = [
    { name: "poissons", value: 105000 },
    { name: "crustaces", value: 55000 },
    { name: "coquillages", value: 20000 }
  ];
  disabled = false;
  disabledLine = false;
  products: any = {
    poissons: [],
    crustaces: [],
    coquillages: [],
    all: []
  };
  ngOnInit(): void {
    this.productService.getVentes().subscribe(product => {
      this.products.poissons = product.filter(value => value.category == 0);
      this.products.crustaces = product.filter(value => value.category == 2);
      this.products.coquillages = product.filter(value => value.category == 1);

      this.saleData.forEach(element => {
        let name = element.name
        element.value = this.getTotal(this.products[name]);
      });

      this.dateDebutValue = this.getFirstDate(product)["date"];
      this.dateFinValue = new Date();
      this.products.all = product

      this.minDate = this.datePipe.transform(this.getFirstDate(product)["date"], 'yyyy-MM-dd')
      console.log(this.getProductsInDate(product, this.dateFinValue, this.dateDebutValue));
      this.disabled = true;
      console.log(this.getArraySort(this.getProductsInDate(this.products.all, this.dateFinValue, this.dateDebutValue)));
      this.multi.push(this.getArraySort(this.getProductsInDate(this.products.all, this.dateFinValue, this.dateDebutValue)))
      this.disabledLine=true;
    });
    this.selectGraph.valueChanges.subscribe(graph => {
      this.typeGraph = graph
    });

    this.dateFin.valueChanges.subscribe(date => {
      this.dateFinValue = date
      console.log(this.getProductsInDate(this.products.all, this.dateFinValue, this.dateDebutValue));
      // this.multi.push(this.getArraySort(this.getProductsInDate(this.products.all, this.dateFinValue, this.dateDebutValue)));

    });
    this.dateDebut.valueChanges.subscribe(date => {

      this.dateDebutValue = date
      console.log(this.getProductsInDate(this.products.all, this.dateFinValue, this.dateDebutValue));
      this.multi[0].series.push({
        "name": new Date ("2021-04-21"),
        "value": 1500
      });
      this.multi = [...this.multi]

    });

  }

  getTotal(products: any) {
    let total = 0;
    products.forEach(element => {
      total += element.price
    });
    return total
  }


  getFirstDate(products: any) {
    products.map(product => {
      product.date = moment(product.date, 'YYYY-MM-DD').toDate();
    });
    return products.sort(function (a, b) { return a.date - b.date })[0];
  }

  getProductsInDate(products: any, dateFin: Date, dateDebut: Date) {
    if (dateDebut == undefined) {
      dateDebut = this.getFirstDate(products)["date"];
    }
    return products.filter(product => product.date.getTime() >= dateDebut.getTime() && product.date.getTime() <= dateFin.getTime())

  }

  getArraySort(products: any) {
    products.map(product => {
      product.date = moment(product.date, 'YYYY-MM-DD').toDate();
    });
    let productSort = products.sort(function (a, b) { return a.date - b.date });
    return {
      "name": "test", "series": productSort.map(product => {
        return {
          "name": this.datePipe.transform(product.date,"yyyy-MM-dd"),
          "value": product.price
        }
      })
    }
  }



}