import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';
interface Package{
  _id:string;
  clave:string;
  clients:[];
  queue:[];
}
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
 

  constructor(public service: ServiceService,private router:Router) { }

  ngOnInit() {
    clearInterval(this.service.intervalo)
    this.recuperarPackage()
  }

  errorMessage:any;
  
  response: any

  mostar:boolean=false;
  
  mostar2:boolean=false;

  package={
    _id:null,
    Clave:null,
    Clients:null,
    Queue:null
  }
  paqueteActual:Package;

  mostarV(){
  
    if(this.mostar==false){
      this.mostar=true;
    }
    else{
      this.mostar=false;
    }
  }

  
  mostarV2(){

    if(this.mostar2==false){
      this.mostar2=true;
    }
    else{
      this.mostar2=false;
    }
  }

  recuperarPackage(){
    this.service.getPackage().subscribe((result)=>{
      this.response=result,console.log(result)
    },err=>{
      this.errorMessage = err.message;
    })
  }

  abrirmodal(pack){
    this.paqueteActual=pack;
  }

  filtrarQueue(pack,clave){
    var queue=pack.toString()
    queue.replace("[","").replace("]","")
    queue.replace("/","")
    console.log(queue)
    localStorage.setItem("filtro",queue)
    localStorage.setItem("name",clave)
    this.router.navigate(['Error'], {queryParams: {Id:'Detalle'}});

  }

  filtrarQueueEproceso(pack,clave){
    let tamano= pack.length
    console.log(tamano)
    var queue=pack.toString()
    queue.replace("[","").replace("]","")
    queue.replace("/","")
    console.log(queue)
    localStorage.setItem("filtroProceso",queue)
    localStorage.setItem("nameProceso",clave)
    localStorage.setItem("indexCompleteProceso",tamano)
    this.router.navigate(['Eproceso'], {queryParams: {Id:'Detalle'}});

  }

}
