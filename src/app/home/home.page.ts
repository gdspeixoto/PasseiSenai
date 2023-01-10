import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Estudante } from 'src/app/Models/Estudante';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public estudanteForm:FormGroup;
  public estudante:Estudante;
  public fecha: boolean = false;

  constructor(private formbuilder:FormBuilder) {}

  handleRefresh(event:any) {
    setTimeout(() => {
      this.fecha = true;
      event.target.complete();
    }, 2000);
  };

  ngOnInit(): void {
    this.estudanteForm = this.formbuilder.group({
      av1: ['', [Validators.required, Validators.pattern('[0-9]+([,\.][0-9]+)?'), Validators.min(0), Validators.max(10), Validators.maxLength(3)]],
      av2: ['', [Validators.required, Validators.pattern('[0-9]+([,\.][0-9]+)?'), Validators.min(0), Validators.max(10), Validators.maxLength(3)]],
      av3: ['', [Validators.required, Validators.pattern('[0-9]+([,\.][0-9]+)?'), Validators.min(0), Validators.max(10), Validators.maxLength(3)]],
      edag:['', [Validators.required, Validators.pattern('[0-9]+([,\.][0-9]+)?'), Validators.min(0), Validators.max(10), Validators.maxLength(3)]]
    });
  }

  //Verifcação de erros
  public VerifyErros(variable:string):string {
    if(this.estudanteForm.getError('required',variable)) return "Campo obrigatório";
    else
    if(this.estudanteForm.getError('min',variable)) return "Valor mínimo de 0";
    else
    if(this.estudanteForm.getError('max',variable)) return "Valor máximo de 10";
    else
    if(this.estudanteForm.getError('pattern',variable)) return "Valor inválido";
    return "";
  }

  public PrevisaoNotas():void{
    this.estudante = new Estudante(
      parseFloat(this.estudanteForm.value.av1),
      parseFloat(this.estudanteForm.value.av2),
      parseFloat(this.estudanteForm.value.av3),
      parseFloat(this.estudanteForm.value.edag)
    );
    console.log("=============")
    console.log(this.estudante);
    console.log("=============")
    console.log(this.estudante.CalcPrevisaoNotas());
    console.log("=============")
  }

  public SubmitForm():void{
    if(this.estudanteForm.valid){
      this.estudante = new Estudante(
        parseFloat(this.estudanteForm.value.av1),
        parseFloat(this.estudanteForm.value.av2),
        parseFloat(this.estudanteForm.value.av3),
        parseFloat(this.estudanteForm.value.edag)
      );
    }
  }
}
