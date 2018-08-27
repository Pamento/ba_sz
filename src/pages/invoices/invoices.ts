import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';
import { Invoice } from '../../models/invoice/invoice';
import { FileManagerService } from '../../components/file-manager/file-manager';

/**
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html'
})
export class InvoicesPage {
  private invoices: Invoice[]
  constructor(public navCtrl: NavController, public navParams: NavParams, private userServ: UserService, private fileManager: FileManagerService
  ) {
    this.userServ.getInvoices().subscribe((list) => {
      this.invoices = list
      console.log("invoices", list)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesPage');
  }

  getPdfInvoice(invoice: Invoice) {
    return this.userServ.getPdfInvoice(invoice).subscribe((file: Blob) => {
      console.log('got invoice pdf', file);
      this.fileManager.writeAndOpen(file, `invoice-${invoice.id}.pdf`).subscribe((r) => {
        console.log('writeAndOpen', r);
      })
    },
      (e) => {
        console.log('e', e);
      })
  }

}
