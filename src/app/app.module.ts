import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatRadioModule,
  MatNativeDateModule,
  MatChipsModule
} from "@angular/material";

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QueryComponent } from './query/query.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { QueryBuilderModule } from "angular2-query-builder";
import { BuilderComponent } from './builder/builder.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    DropdownComponent,
    BuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatCheckboxModule,
    NoopAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSelectModule,
    QueryBuilderModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [FormBuilder],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
