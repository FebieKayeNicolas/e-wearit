import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { CreatePostPage } from '../pages/create-post/create-post';
import { PostPage } from '../pages/post/post';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { SearchPipe } from '../pipes/search/search';
import { AboutPage } from '../pages/about/about';
import { Data } from '../providers/data/data';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPagePage } from '../pages/landing-page/landing-page';
import { ChatPage } from '../pages/chat/chat';
import { CategoriesPage } from '../pages/categories/categories';
import { TopsPage } from '../pages/tops/tops';
import { PantsPage } from '../pages/pants/pants';
import { TshirtPage } from '../pages/tshirt/tshirt';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { TermsAndConditionPage } from '../pages/terms-and-condition/terms-and-condition';
import { StarRatingModule } from 'ionic3-star-rating';
import { ChatProvider } from '../providers/chat/chat';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { MenuPage } from '../pages/menu/menu';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { EditProductPage } from '../pages/edit-product/edit-product';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    HomePage,
    ProfilePage,
    EditProfilePage,
    CreatePostPage,
    PostPage,
    NewsfeedPage,
    SearchPipe,
    AboutPage,
    TabsPage,
    LandingPagePage,
    ChatPage,
    CategoriesPage,
    TopsPage,
    PantsPage,
    TshirtPage,
    WishlistPage,
    TermsAndConditionPage,
    ChatlistPage,
    MenuPage,
    EditProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    HomePage,
    ProfilePage,
    EditProfilePage,
    CreatePostPage,
    PostPage,
    NewsfeedPage,
    AboutPage,
    TabsPage,
    LandingPagePage,
    ChatPage,
    CategoriesPage,
    TopsPage,
    PantsPage,
    TshirtPage,
    WishlistPage,
    TermsAndConditionPage,
    ChatlistPage,
    EditProductPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    ChatProvider,
  ]
})
export class AppModule {}