import { Component } from '@angular/core';
import { NavController ,ActionSheetController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,private barcodeScanner: BarcodeScanner,private qrScanner: QRScanner) {}

 presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your scan type',
      buttons: [
        {
          text: 'Barcode',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.barcodeScanner.scan().then((barcodeData) => {
            //alert(barcodeData);
            //console.log(barcodeData.text);
             alert(barcodeData.text);
            }, (err) => {
            // An error occurred
            });
          }
        },{
          text: 'QR Code',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

       // show camera preview
       this.qrScanner.show();

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
          }
        }
      ]
    });
    actionSheet.present();
  }
}
