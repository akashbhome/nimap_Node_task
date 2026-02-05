import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = true;
  error = '';
  // pagination
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  showAddProduct = false;
  showAddCategory = false;
  newProduct: { name: string; cid: number | null } = { name: '', cid: null };
  newCategory = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories() {
    this.http.get<any>('http://localhost:3000/viewcate').subscribe({
      next: (res) => (this.categories = res?.r || []),
      error: () => (this.categories = [])
    });
  }

  fetchProducts() {
    this.loading = true;
    this.http.get<any>('http://localhost:3000/viewproduct').subscribe({
      next: (res) => {
        this.products = res?.r || [];
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  getCategoryName(cid: number) {
    const c = this.categories.find((x) => x.cid === cid);
    return c ? c.catename : 'Unknown';
  }

  updatePagination() {
    const total = this.products.length || 0;
    this.totalPages = Math.max(1, Math.ceil(total / this.pageSize));
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  setPage(n: number) {
    if (n < 1 || n > this.totalPages) return;
    this.currentPage = n;
  }

  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }

  get pageProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  get endIndex() {
    return Math.min(this.currentPage * this.pageSize, this.products.length || 0);
  }

  addCategory() {
    if (!this.newCategory.trim()) return;
    this.http.post<any>('http://localhost:3000/addcate', { name: this.newCategory }).subscribe({
      next: () => {
        this.newCategory = '';
        this.showAddCategory = false;
        this.fetchCategories();
      },
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Failed to add category';
        alert(msg);
      }
    });
  }

  addProduct() {
    const { name, cid } = this.newProduct;
    if (!name || !cid) return alert('Please fill product name and category');
    const payload: any = { name, cid };
    this.http.post<any>('http://localhost:3000/addproduct', payload).subscribe({
      next: () => {
        this.newProduct = { name: '', cid: null };
        this.showAddProduct = false;
        this.fetchProducts();
      },
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Failed to add product';
        alert(msg);
      }
    });
  }

  deleteProduct(pid: number) {
    if (!confirm('Delete this product?')) return;
    this.http.delete<any>(`http://localhost:3000/deleteproduct?id=${pid}`).subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Failed to delete product';
        alert(msg);
      }
    });
  }

  updateProduct(p: any) {
    const newName = prompt('Enter new product name', p.pname);
    if (newName === null) return; // cancelled
    const newCidStr = prompt('Enter new category id (leave empty to keep)', p.cid?.toString()||'');
    const cid = newCidStr ? parseInt(newCidStr) : p.cid;
    this.http.put<any>(`http://localhost:3000/updateproduct?id=${p.pid}`, { name: newName, cid }).subscribe({
      next: () => this.fetchProducts(),
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Failed to update product';
        alert(msg);
      }
    });
  }
}

export default ProductList;
