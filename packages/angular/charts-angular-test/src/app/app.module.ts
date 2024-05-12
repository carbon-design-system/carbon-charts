import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, CommonModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
