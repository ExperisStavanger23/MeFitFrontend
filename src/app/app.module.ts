import { APP_INITIALIZER, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatButtonModule } from "@angular/material/button"
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular"
import { environment } from "src/environment/environment"
import { NavBarComponent } from "./components/nav-bar/nav-bar.component"

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId,
      },
      initOptions: {
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/assets/silent-check-sso.html",
      },
    })
}

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
