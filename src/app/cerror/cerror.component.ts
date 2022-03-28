import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-cerror',
  templateUrl: './cerror.component.html',
  styleUrls: ['./cerror.component.css']
})
export class CErrorComponent implements OnInit {

  constructor(protected service:ServiceService,private router:Router) { }

  ngOnInit() {
    this.recuperarConError();
  }
  response:any;

  recuperarConError() {
    this.service.recuperarTodosConError().subscribe( (result)  =>{this.response = result, console.log(result)
     });
  }

  art1={
    _id:null,
    queue:null,
    indexComplete:null,
    queueResult:[{mensaje:null,index:null}],
    payLoad:null,
    idStatus:null
  }


  pasarDatos(art1){
    console.log(art1)
    localStorage.setItem("valor",JSON.stringify(art1))
    //console.log(JSON.stringify(art1))
    this.router.navigate(['/Detalles']);
    
  }


}
