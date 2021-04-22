import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-product-graph',
  templateUrl: './product-graph.component.html',
  styleUrls: ['./product-graph.component.css']
})
export class ProductGraphComponent implements OnInit {

  constructor(private productService:ProductsService) { }

  view: any[] = [700, 300];
  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990-07-22",
          "value": 62000000
        },
        {
          "name": "2010-01-20",
          "value": 73000000
        },
        {
          "name": "2011-03-12",
          "value": 89400000
        }
      ]
    },

  ];

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
  products: any = {
    poissons: [],
    crustaces: [],
    coquillages: []
  };
  ngOnInit(): void {
    this.productService.getVentes().subscribe(product => {
      this.products.poissons = product.filter(value => value.category == 0);
      this.products.crustaces = product.filter(value => value.category == 2);
      this.products.coquillages = product.filter(value => value.category == 1);
      console.log(this.getTotal(this.products.crustaces));
      this.saleData.forEach(element => {
        let name=element.name
        element.value = this.getTotal(this.products[name]);
      });

      // let tmp = this.products.poissons.map(val => {
      //   return {
      //     "name": val.date,
      //     "value": JSON.parse(val.price)
      //   }
      // })
      // this.multi.push({
      //   "name": "Poissons",
      //   "series": tmp 
      // })

      this.disabled=true;

    });

  }

  getTotal(products :any){
    let total = 0;
    products.forEach(element => {
      total += element.price
    });
    return total
  }



}
