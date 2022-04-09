import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fail } from 'assert';
import { ServiceService } from '../Services/service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

interface queRes {
  index: any;
  idResultado: any;
  mensaje: string;
}
interface BussProcees {
  _id: string;
  queue: [];
  indexComplete: any;
  queueResult: queRes[];
  payLoad: string;
  isvisible:boolean;
  createdAt:Date;
}

@Component({
  selector: 'app-eprocess',
  templateUrl: './eprocess.component.html',
  styleUrls: ['./eprocess.component.css']
})
export class EProcessComponent implements OnInit {
  name: any;
  header: any = 0;
  art1 = {
    _id: null,
    queue: null,
    indexComplete: null,
    queueResult: [{ mensaje: null, index: null }],
    payLoad: null,
    idStatus: null
  }
  art = {
    buscar: null
  }
  errorMessage: any;
  response: any

  constructor(public service: ServiceService, private router: Router) {}

  ngOnInit() {
    clearInterval(this.service.intervalo)
    this.service.prueba=10;
    let roureActual = this.router.url;
    if (roureActual === '/Eproceso') {
      clearInterval(this.service.intervalo)
      this.header = 1;
      this.EnProceso()
      this.service.intervalo = setInterval(() => {
        this.EnProceso();
      }, 1000);
    } else {
      clearInterval(this.service.intervalo)
      this.header = 2;
      this.name = localStorage.getItem("nameProceso")
      this.filtrado();
      this.service.intervalo = setInterval(() => {
        this.filtrado();
      }, 1000);
    }
  }

  EnProceso() {
    try {
      this.service.enProceso().subscribe((result) => { this.response = result,console.log(result)}, err => {
        this.errorMessage = err.message;
      })
    } catch (error) {

    }
  }

  recragarPage() {
    location.reload();
  }

  filtrado() {
    var filto = localStorage.getItem("filtroProceso")
    let indexComplete = localStorage.getItem("indexCompleteProceso")
    this.service.getEprocesoFiltrado(filto, indexComplete).subscribe((result) => {
      this.response = result,console.log(result)
    }, err => {
      this.errorMessage = err.message;
    })
  }


  resultado: BussProcees[];

  busqueda: string
  bandera: any;

  buscar() {
    clearInterval(this.service.intervalo)
    var arrayAux = [];
    this.bandera = 1;
    arrayAux.length = 0;
    this.resultado = this.response
    if (this.art.buscar != null) {
      for (let i = 0; i < this.resultado.length; i++) {

        if (this.resultado[i].payLoad.toLowerCase().search(this.art.buscar.toLowerCase()) != -1) {
          
          arrayAux.push(this.resultado[i])
          this.bandera = 3;
          console.log(this.bandera)
        } else {
          if (this.bandera == 1 && i == this.resultado.length - 1) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'info',
              title: 'Ningun resultado para ' + this.art.buscar
            })
          }
        }
      }
      this.response = arrayAux;

    } else {
      this.ngOnInit()
    }
    this.art.buscar = null
  }
}
