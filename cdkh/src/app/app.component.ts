import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-cdk-helpers';
  color = 'red';

  onClick() {
    console.log('onClick');
  }

  colorChanged(color: string) {
    console.log(color);
  }
}
