import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dogImageUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDogImage();
  }

  fetchDogImage() {
    this.http.get<{ message: string }>('https://dog.ceo/api/breeds/image/random')
      .subscribe(
        data => {
          this.dogImageUrl = data.message;
        },
        error => {
          console.error('Error fetching dog image:', error);
        }
      );
  }
}
