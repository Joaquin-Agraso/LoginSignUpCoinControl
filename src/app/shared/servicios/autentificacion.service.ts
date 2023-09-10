import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private ingresar:boolean = false;;

  constructor() { }

  public ingresarAplicativo(obj:any):boolean{
    this.ingresar = obj.usuario == 'joaquin29' && obj.password=='Asd1234';
     return this.ingresar; 
  }

  public habilitarLogeo(){
    return this.ingresar;
  }

}
