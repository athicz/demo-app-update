import { Component, OnInit } from '@angular/core';
import { AppUpdate, AppUpdateOptions } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public versionNumber!:string ;
  public versionCode!:any ;
  public versionName!:any ;
  public versionPkgName!:any ;
  constructor(private appVersion: AppVersion
    , private appUpdate: AppUpdate
    , private alertController: AlertController
    ) { }

  ngOnInit(): void {
    this.appVersion.getVersionNumber().then((res) => {
      this.versionNumber = res;
      console.log('Version Number:', this.versionNumber);
    });

    this.appVersion.getVersionCode().then((res) => {
      this.versionCode = res;
      console.log('Version Code:', this.versionCode);
    });

    this.appVersion.getAppName().then((res) => {
      this.versionName = res;
      console.log('App Name:', this.versionName);
    });

    this.appVersion.getPackageName().then((res) => {
      this.versionPkgName = res;
      console.log('Package Name:', this.versionPkgName);
    });

    const updateUrl = 'http://192.168.1.42:8080/files/update.xml'; // Replace with your update URL

    this.showUpdateAlert();
  }

  async showUpdateAlert() {
    const alert = await this.alertController.create({
      header: 'Update Available',
      buttons: [
        {
          text: 'No, thanks',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('User clicked No, thanks');
          },
        },
        {
          text: 'Update',
          handler: () => {
            this.checkForUpdates();
            console.log('User clicked Update');
            // Perform the update process here
          },
        },
      ],
    });

    await alert.present();
  }

  checkForUpdates() {
    const updateUrl = 'http://192.168.1.42:8080/files/update.xml';
    const options: AppUpdateOptions = {
      skipPromptDialog: true,
      skipProgressDialog: true
    };
    
    this.appUpdate.checkAppUpdate(updateUrl, options).then(update => {
      console.log(update);
    }).catch(error => {
      alert("Error: " + error.msg);
    });
  }

}
