import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ProductList from './product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
