import { CONFIG } from './../../config/server';
import { Alert, ALERT_TYPE } from './../../model/alert';
import { AlertService } from './alert.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(private service: AlertService) {}

  @ViewChild('alert') alert: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('message') message: ElementRef;

  ngOnInit() {
    this.service.getObservable().subscribe((alert: Alert) => {
      this.alert.nativeElement.classList.add('show');
      this.title.nativeElement.innerHTML = alert.title;
      this.message.nativeElement.innerHTML = alert.message;
      switch (alert.type) {
        case ALERT_TYPE.WARNING:
          this.alert.nativeElement.classList.add('alert-warning');
          break;
        case ALERT_TYPE.SUCCESS:
          this.alert.nativeElement.classList.add('alert-success');
          break;
        case ALERT_TYPE.ERROR:
          this.alert.nativeElement.classList.add('alert-danger');
          break;
        default:
          this.alert.nativeElement.classList.add('alert-primary');
      }
      setTimeout(() => {
        this.alert.nativeElement.classList.remove('show');
      }, CONFIG.displayingAlertDelay * 1000);
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
}
