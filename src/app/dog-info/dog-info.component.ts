// dog-info.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dog-info',  // This is the selector to use in HTML
  templateUrl: './dog-info.component.html',
  styleUrls: ['./dog-info.component.css']
})
export class DogInfoComponent {
  dogDescription = "Dogs are domesticated mammals, known as man's best friend.";
  dogFacts = [
    "Dogs have an extraordinary sense of smell.",
    "They can understand human emotions.",
    "Some breeds, like the Border Collie, are extremely intelligent."
  ];
}
