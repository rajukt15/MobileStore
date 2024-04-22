import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { productsList } from './product.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'IMDB-List';
  PrdtOwnCopy: any;
  ProductList: any;
  name: string = '';
  //https://dummyjson.com/products
  //https://dummyjson.com/

  constructor(private http: HttpClient) {
    this.ProductList = [];
  }

  ngOnInit(): void {
    this.fetchproductPosts();
  }

  onChange(value: any) {
    this.ProductList = this.PrdtOwnCopy;
    const searchParam = value.trim().toLowerCase();
    if (searchParam.length > 2) {
      this.ProductList = this.ProductList.filter((response: any) => {
        const title = response['title'].toLowerCase();
        if (title.includes(searchParam)) {
          return response;
        } else if (searchParam.length == 0) {
          this.ProductList = this.PrdtOwnCopy;
        }
      });
    } else if (searchParam.length == 0) {
    }
  }

  OnfetchPosts() {
    //this.fetchPosts();
    this.fetchproductPosts();
  }

  // fetchPosts(): Observable<productsList[]> {
  //   return this.http.get<productsList[]>('https://dummyjson.com/products');
  // }

  fetchproductPosts() {
    return (
      this.http
        //  .get('https://dummyjson.com/products')
        .get('/assets/data.json')
        // .pipe(
        //   map((result) => {
        //     const prdtList = [];
        //     for (const items in result) {
        //       if (items == 'products') {
        //         console.log(items);
        //         prdtList.push(items);
        //       }
        //     }

        //     return prdtList;
        //   })
        // )
        .subscribe((result: any) => {
          this.ProductList = result;
          this.PrdtOwnCopy = result;
        })
    );
  }

  fetchPosts() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((result: any) => {
        this.ProductList = result;
      });
  }

  // fetchPosts() {
  //   return (
  //     this.http
  //       .get('https://dummyjson.com/products')
  //       // .pipe(
  //       //   map((result) => {
  //       //     // for (const items in result) {
  //       //     // console.log(result);
  //       //     // }
  //       //   })
  //       // )
  //       .subscribe((products) => {
  //         //console.log(products);
  //         this.ProductList = products;
  //         console.log(this.ProductList);
  //       })
  //   );
  // }
}
