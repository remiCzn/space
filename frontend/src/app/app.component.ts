import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadService } from './service/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked{
  title = 'frontend';

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  isLoaded() {
    return LoadService.loading;
  }
}
