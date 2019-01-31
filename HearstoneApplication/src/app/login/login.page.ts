import { Component, OnInit } from '@angular/core';

import { AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {NavController, Platform, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    isFingerprintAvailable: boolean = false;
    loginForm: FormGroup;
    showPassword = false;
    public alreadySigned;

    pass: string='123456789';
    email: string = 'antonioangelovski19@gmail.com';

  constructor(private navCtrl: NavController,
              public toastController: ToastController,
              private storage: Storage,
              private platform: Platform,
              private formBuilder: FormBuilder,
              private androidFingerprintAuth: AndroidFingerprintAuth) { }



  ngOnInit() {

      this.platform.ready().then(() => {
          this.storage.get('apiApp.master_password').then((data) => {

              this.alreadySigned=data?true:false;
              console.log(this.alreadySigned);
              console.log(data);
          });


          if(this.platform.is('cordova') && this.platform.is('android')) {
              this.androidFingerprintAuth.isAvailable().then(() => {
                  this.isFingerprintAvailable = true;
              }, (error) => {
                  this.isFingerprintAvailable = false;
              }).catch(error => {
                  this.isFingerprintAvailable = false;
              });
          }
          else {
              this.isFingerprintAvailable = false;
          }


      });

      this.loginForm = this.formBuilder.group({
          password: ['', [
              Validators.required,
              Validators.minLength(8)
          ]],
          email: ['', [
              Validators.required,
              Validators.email
          ]]
      });


  }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    login() {

        if(!this.loginForm.controls.password.valid || !this.loginForm.controls.email.valid){
            this.presentToast('Please enter your email and password ');
            return;
        }

        if(!this.loginForm.controls.email.valid){
            this.presentToast('Please enter correct email address');
            return;
        }
        if(!this.loginForm.controls.password.valid){
            this.presentToast('Please enter the pasword which should be at least 8 characters');
            return;
        }
        if(this.alreadySigned){

            this.storage.get('apiApp.master_password').then((password) => {
                this.storage.get('apiApp.master_email').then((email) => {
                    console.log(email);
                    if(this.pass !== password || this.email !== email){
                        this.presentToast('The password or email are  wrong');
                        return;
                    }
                    else{
                        this.navCtrl.navigateRoot('/tabs/card');
                    }
                })});

        }
        else {
            this.storage.set('apiApp.master_password', this.pass);
            this.storage.set('apiApp.master_email',this.email);
            this.navCtrl.navigateRoot('/tabs/card');
        }

    }

    checkFingerprint(){

        this.androidFingerprintAuth.encrypt({
            clientId: 'myAppName',
            username: 'myUsername',
            password: 'myPassword'
        })
            .then(result => {
                if (result.withFingerprint) {
                    this.navCtrl.navigateRoot('/tabs/card');
                } else if (result.withBackup) {
                    this.navCtrl.navigateRoot('/tabs/card');
                } else {
                    this.presentToast('Fingerprint do not match  ');
                }
            })
            .catch(error => {
                if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                    this.presentToast('Action cancelled');
                } else console.error(error)
            });

    }




}
