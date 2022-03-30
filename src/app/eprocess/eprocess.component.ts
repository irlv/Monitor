import { Component, OnInit } from '@angular/core';
import { fail } from 'assert';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-eprocess',
  templateUrl: './eprocess.component.html',
  styleUrls: ['./eprocess.component.css']
})
export class EProcessComponent implements OnInit {

  constructor(protected service: ServiceService) { 
    
    
  }

  loading: boolean=true;

  ngOnInit() {

    //this.EnProceso()
    //este es el Bueno
    var intervalo = setInterval(() => {
      this.loading=true;
    this.EnProceso();
    setTimeout(()=>{ this.loading = false,this.EnProceso();}, 1000)
    }, 12000)
    
    //this.EnProceso()
    //var intervalo= setInterval(() => {
      //this.EnProceso();
      //}, 5000);


  }

  art1 = {
    _id: null,
    queue: null,
    indexComplete: null,
    queueResult: [{ mensaje: null, index: null }],
    payLoad: null,
    idStatus: null
  }


  response: any

  EnProceso() {
    this.service.enProceso().subscribe((result) => { this.response = result, console.log(result) })
  }


}
