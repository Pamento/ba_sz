import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgPipesModule } from 'angular-pipes';
import { CustomFormsModule } from 'ng2-validation'
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { FilePath } from '@ionic-native/file-path';

import { AppErrorHandler } from './error/error_handler'
import { MyApp } from './app.component';

import { AppCommonModule } from './common/common.module';

import { LanguageService, createTranslateLoader, MyMissingTranslationHandler } from '../providers/language/language.service';
import { RestService } from '../providers/rest/rest.service';
import { DateService } from '../providers/date/date';
import { ImageService } from '../providers/image/image';
import { PlatformService } from '../providers/platform/platform';
import { AuthenticationService } from '../providers/auth/auth.service';
import { UserService } from '../providers/user/user.service';
import { CountryProvider } from '../providers/country/country';
import { RoleProvider } from '../providers/role/role';
import { CategoryProvider } from '../providers/category/category';
import { SubscriptionProvider } from '../providers/subscription/subscription';
import { ReadingProfileProvider } from '../providers/reading-profile/reading-profile';
import { ProductProvider } from '../providers/product/product';
import { TextProvider } from '../providers/text/text';
import { OffersProvider } from '../providers/offers/offers';
import { TextAdaptProvider } from '../providers/text/adapt/text-adapt';
import { OrderProvider } from '../providers/order/order';
import { PaymentProvider } from '../providers/payment/payment';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ' ',
      backButtonIcon: 'ios-arrow-back'
    }),
    CustomFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgPipesModule,
    AppCommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: AppErrorHandler, useClass: IonicErrorHandler },
    { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
    LanguageService,
    DateService,
    ImageService,
    PlatformService,
    UserService,
    StatusBar,
    SplashScreen,
    Device,
    RestService,  
    AuthenticationService,
    CountryProvider,
    RoleProvider,
    CategoryProvider,
    SubscriptionProvider,
    ReadingProfileProvider,
    ProductProvider,
    TextProvider,
    File,
    FileTransfer,
    FilePath,
    Keyboard,
    FileChooser,
    IOSFilePicker,
    OffersProvider,
    TextAdaptProvider,
    OrderProvider,
    PaymentProvider
  ]
})
export class AppModule { }

