import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { curveBasis } from 'd3-shape';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-graph',
  templateUrl: './product-graph.component.html',
  styleUrls: ['./product-graph.component.css'],
})
export class ProductGraphComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private authentication: AuthenticationService,
    private route: Router,
    private datePipe: DatePipe
  ) {}
  minDate;
  yesterday = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  selectGraph: FormControl = new FormControl();
  dateDebut: FormControl = new FormControl();
  dateFin: FormControl = new FormControl();
  dateDebutValue: any;
  dateFinValue: any;
  typeGraph: any = 'Categorie';
  view: any[] = [1300, 500];
  multi = [];
  dateDu = this.datePipe.transform(
    new Date().setDate(new Date().getDate() - 365),
    'dd/MM/yyyy'
  );
  dateAu = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  currentY = new Date().getFullYear();

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showGridLines: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Ventes';
  timeline: boolean = true;
  gradient: boolean = true;
  curve: any = curveBasis;
  autoScale: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  chiffreAffaire: any = {
    all: 0,
    poissons: 0,
    crustaces: 0,
    coquillages: 0,
  };

  saleData = [
    { name: 'poissons', value: 105000 },
    { name: 'crustaces', value: 55000 },
    { name: 'coquillages', value: 20000 },
  ];
  disabled = false;
  disabledLine = false;
  products: any = {
    poissons: [],
    crustaces: [],
    coquillages: [],
    all: [],
  };
  ngOnInit(): void {
    this.productService.getVentes().subscribe(
      (product) => {
        this.products.poissons = product.filter((value) => value.category == 0);
        this.products.crustaces = product.filter(
          (value) => value.category == 2
        );
        this.products.coquillages = product.filter(
          (value) => value.category == 1
        );

        this.saleData.forEach((element) => {
          let eleDate = moment(element.name, 'yyyy-MM-dd').toDate();
          let date = new Date();
          if (
            eleDate.getTime() > date.getTime() &&
            eleDate.getTime() <= new Date().getTime()
          ) {
            let name = element.name;
            element.value = this.getTotal(this.products[name]);
          }
        });

        product.forEach((element) => {
          switch (element.action) {
            case 'Vente':
              if (
                moment(element.date, 'yyyy-MM-dd').toDate().getTime() >=
                new Date(new Date().getFullYear(), 0, 1).getTime()
              ) {
                this.chiffreAffaire.all += element.price;
                switch (element.category) {
                  case 0:
                    this.chiffreAffaire.poissons += element.price;
                    break;
                  case 1:
                    this.chiffreAffaire.coquillages += element.price;
                    break;
                  default:
                    this.chiffreAffaire.crustaces += element.price;
                    break;
                }
              }
            case 'Achat':
              if (
                moment(element.date, 'yyyy-MM-dd').toDate().getTime() >=
                new Date(new Date().getFullYear(), 0, 1).getTime()
              ) {
                this.chiffreAffaire.all = -element.price;
                switch (element.category) {
                  case 0:
                    this.chiffreAffaire.poissons = -element.price;
                    break;
                  case 1:
                    this.chiffreAffaire.coquillages = -element.price;
                    break;
                  default:
                    this.chiffreAffaire.crustaces = -element.price;
                    break;
                }
              }
            default:
              break;
          }
        });

        this.dateDebutValue = this.getFirstDate(product)['date'];
        this.dateFinValue = new Date();
        this.products.all = product;

        this.minDate = this.datePipe.transform(
          this.getFirstDate(product)['date'],
          'yyyy-MM-dd'
        );
        console.log(
          this.getProductsInDate(
            product,
            this.dateFinValue,
            this.dateDebutValue
          )
        );
        this.disabled = true;
        // console.log("test" , this.getArraySort(this.getProductsInDate(this.products.poissons, this.dateFinValue, this.dateDebutValue)));
        this.multi.push(
          this.getArraySort(
            this.getProductsInDate(
              this.products.poissons,
              this.dateFinValue,
              this.dateDebutValue
            ),
            'poissons'
          )
        );
        this.multi.push(
          this.getArraySort(
            this.getProductsInDate(
              this.products.crustaces,
              this.dateFinValue,
              this.dateDebutValue
            ),
            'crustaces'
          )
        );
        this.multi.push(
          this.getArraySort(
            this.getProductsInDate(
              this.products.coquillages,
              this.dateFinValue,
              this.dateDebutValue
            ),
            'coquillages'
          )
        );
        this.disabledLine = true;
      },
      (error) => {
        this.authentication.tokens = undefined;
        console.log(error);
        this.route.navigate(['/login']);
      }
    );
    this.selectGraph.valueChanges.subscribe(
      (graph) => {
        this.typeGraph = graph;
      },
      (error) => {
        this.authentication.tokens = undefined;
        console.log(error);
        this.route.navigate(['/login']);
      }
    );
  }

  getTotal(products: any) {
    let total = 0;
    products.forEach((element) => {
      total += element.price;
    });
    return total;
  }

  getFirstDate(products: any) {
    products.map((product) => {
      product.date = moment(product.date, 'YYYY-MM-DD').toDate();
    });
    return products.sort(function (a, b) {
      return a.date - b.date;
    })[0];
  }

  getProductsInDate(products: any, dateFin: Date, dateDebut: Date) {
    if (dateDebut == undefined) {
      dateDebut = this.getFirstDate(products)['date'];
    }
    return products.filter(
      (product) =>
        product.date.getTime() >= dateDebut.getTime() &&
        product.date.getTime() <= dateFin.getTime()
    );
  }

  getArraySort(products: any, category: string) {
    products.map((product) => {
      product.date = moment(product.date, 'YYYY-MM-DD').toDate();
    });
    let productSort = products.sort(function (a, b) {
      return a.date - b.date;
    });
    productSort = productSort.filter((val) => val.action == 'Vente');
    return {
      name: category,
      series: productSort.map((product) => {
        return {
          name: this.datePipe.transform(product.date, 'yyyy-MM-dd'),
          value: product.quantity,
        };
      }),
    };
  }

  onSearch() {
    this.dateDebutValue = this.dateDebut.value;
    this.dateFinValue = this.dateFin.value;
    this.multi = [];
    if (this.multi == []) {
      this.disabledLine = false;
    }
    this.multi.push(
      this.getArraySort(
        this.getProductsInDate(
          this.products.poissons,
          this.dateFinValue,
          this.dateDebutValue
        ),
        'poissons'
      )
    );
    this.multi.push(
      this.getArraySort(
        this.getProductsInDate(
          this.products.crustaces,
          this.dateFinValue,
          this.dateDebutValue
        ),
        'crustaces'
      )
    );
    this.multi.push(
      this.getArraySort(
        this.getProductsInDate(
          this.products.coquillages,
          this.dateFinValue,
          this.dateDebutValue
        ),
        'coquillages'
      )
    );

    if (this.multi != []) {
      this.disabledLine = true;
    }
  }
}
