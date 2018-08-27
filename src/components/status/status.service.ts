import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Observable } from 'rxjs/Observable'
const STATUS_DURATION = 3000;
const ACTION_STATUS_DURATION = 6000
@Injectable()
export class StatusService {
  constructor(private toastCtrl: ToastController) { }

  public setError(msg: string, closeMsg?: string): Observable<any> {
    return this.showMessage(msg, "error", closeMsg);
  }
  public setWarning(msg: string, closeMsg?: string): Observable<any> {
    return this.showMessage(msg, "warning", closeMsg);
  }
  public setSuccess(msg: string, closeMsg?: string): Observable<any> {
    return this.showMessage(msg, "success", closeMsg);
  }
  private showMessage(message, cssClass, closeButtonText): Observable<any> {
    let duration = closeButtonText ? ACTION_STATUS_DURATION : STATUS_DURATION;
    let showCloseButton = closeButtonText != null
    let toast = this.toastCtrl
      .create({
        message,
        cssClass,
        duration,
        closeButtonText,
        showCloseButton
      })
    toast.present();
    return new Observable<any>((o) => {
      toast.onDidDismiss((data, role) => {
        console.log('toast dismiss', data, role);
        if (role == "close") {
          o.next(data)
          o.complete()
        }
      })
    })

  }
}
