import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

const materialComponents = [
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialModule { }
