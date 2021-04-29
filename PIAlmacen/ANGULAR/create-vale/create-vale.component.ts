import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  selector: 'app-create-vale',
  templateUrl: './create-vale.component.html',
  styleUrls: ['./create-vale.component.css']
})
export class CreateValeComponent implements OnInit {
  valeForm!: FormGroup;
  chkMatForm!: FormGroup;
  equipmentList: boolean = false;
  btnSend: boolean = true;

  dataAutoFillVale: any;
  dataWarehouse: any
  items: any = [];

  constructor(private fb: FormBuilder, private pqtSrv: PaquetesService, private router: Router, private cookieSrv: CookieService) {
    this.createValeForm();
  }

  ngOnInit(): void {
    this.autoFillStudent();
    this.obtainWarehouse();
    this.valeForm.get('career')?.disable();
    this.valeForm.get('nameStudent')?.disable();
    this.valeForm.get('register')?.disable();
    this.valeForm.get('group')?.disable();
  }

  createValeForm() {
    this.valeForm = this.fb.group({
      squad: ['', Validators.required],
      date: ['', Validators.required],
      career: ['', Validators.required],
      laboratory: ['', Validators.required],
      nameStudent: [{ disable: true }, Validators.required],
      register: ['', Validators.required],
      group: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      nameTeacher: ['', Validators.required],
    });
  }

  autoFillStudent() {
    let register = this.cookieSrv.get('resu')
    this.pqtSrv.autoFillStudent(register).subscribe(
      (response: any) => {
        // console.log({ response });
        if (response.status === 'OK') {
          this.dataAutoFillVale = response;
          this.valeForm.get('career')?.setValue(response.data.carrera);
          this.valeForm.get('nameStudent')?.setValue(response.data.nombreEstudiante);
          this.valeForm.get('register')?.setValue(response.data.id_registro);
          this.valeForm.get('group')?.setValue(response.data.grupo);
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  obtainWarehouse() {
    this.pqtSrv.obtainWarehouse().subscribe(
      (response: any) => {
        // console.log({ response });
        if (response.status === 'OK') {
          this.dataWarehouse = response.data;
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  itemSelected(index: number, idMat: number, nombre: string, no_inv: number) {
    if (this.items.push({ index, idMat, nombre, no_inv })) {
      this.dataWarehouse.splice(index, 1);
    }
    console.log('items: ', this.items);
  }

  showMaterials() {
    this.equipmentList = true;
    this.btnSend = false;
  }

  saveVale() {
    let plantel = this.valeForm.get('squad')?.value;
    let fecha = this.valeForm.get('date')?.value;
    let carrera = this.valeForm.get('career')?.value;
    let laboratorio = this.valeForm.get('laboratory')?.value;
    let nombre = this.valeForm.get('nameStudent')?.value;
    let group = this.valeForm.get('group')?.value;
    let registro = this.valeForm.get('register')?.value;
    let hora_entrada = this.valeForm.get('hora_entrada')?.value
    let hora_salida = this.valeForm.get('hora_salida')?.value
    let id_nomina = this.valeForm.get('nameTeacher')?.value;

    console.log(plantel, fecha, carrera, laboratorio.toUpperCase(), nombre, group, registro, hora_salida, hora_entrada, id_nomina);

    let json = {
      'campus': plantel,
      'date': fecha,
      'career': carrera,
      'laboratory': laboratorio,
      'name': nombre,
      'group': group,
      'user': registro,
      'hr_in': hora_entrada,
      'hr_out': hora_salida,
      'teacher': id_nomina,
      'valeType': 1,
      'signature': 0
    }

    console.log(json);

    this.pqtSrv.valeUser(json, this.items).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          // this.router.navigate(['/dashboard']);
          alert("Los datos se han enviado correctamente");
        } else {
          alert("Los datos no se han enviado correctamente");
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

}
