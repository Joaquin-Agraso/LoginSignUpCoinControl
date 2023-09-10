import { AfterViewInit, Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';
declare var google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public myForm!: FormGroup;


  constructor(private fb: FormBuilder, private loginPrd:AutentificacionService,
    private routerPrd: Router){}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
    
   
      google.accounts.id.initialize({
        client_id: "179423651498-28pk59s6kkqnobv9llnhduvuln3p8vjl.apps.googleusercontent.com",
        callback: this.handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    
  }

  handleCredentialResponse(response:any) {
    console.log(response);
    if(response.credential){
      sessionStorage.setItem("token",response.credential)
      document.location.href="/sesion/principal";
    }
  }

  private createMyForm():FormGroup{
      return this.myForm = this.fb.group({
      usuario: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }


  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      })
      return;
    }
    
      if(this.loginPrd.ingresarAplicativo(this.myForm.value)){
        alert("Usuario o contraseña invalido");
      }else{
        this.routerPrd.navigateByUrl("/sesion/principal");
      }
  }
  
  public get f():any{
    return this.myForm.controls;
  }
}
