import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isVisible:boolean;
  createdAt:Date;
}

@Component({
  selector: 'app-cerror',
  templateUrl: './cerror.component.html',
  styleUrls: ['./cerror.component.css']
})
export class CErrorComponent implements OnInit {

  constructor(protected service: ServiceService, private router: Router) { }

  valor: any;
  consulta: any = 0;
  response: any;
  errorMessage: any;
  header: any = 0;
  name: any;
  otro: BussProcees[]
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

  ngOnInit() {
    let roureActual = this.router.url;
    this.header = 1;
    if (roureActual === '/Error') {
      clearInterval(this.service.intervalo)
     
     this.recuperarConError()
      this.header = 1;
      this.service.intervalo = setInterval(() => {
          this.recuperarConError();
        }, 5000);
      
    } else {
      clearInterval(this.service.intervalo)
      this.filtrado()
      this.header = 2;
      this.name = localStorage.getItem("name")
      this.service.intervalo= setInterval(() => {
        this.filtrado();
      }, 5000); 
    }
  }

  recuperarConError() {
    this.service.recuperarTodosConError().subscribe((result) => {
      this.response = result
    }, err => {
      this.errorMessage = err.message;
    })

  }

  filtrado() {
    this.consulta = 1;
    var filto = localStorage.getItem("filtro")
    console.log(filto)
    this.service.getErrorfiltrado(filto).subscribe((result) => { this.response = result})
  }

  recragarPage() {
    location.reload();
  }

  pasarDatos(art1) {
    localStorage.setItem("valor", JSON.stringify(art1))
    this.router.navigate(['/Detalles']);
  }


  resultado: BussProcees[];

  busqueda: string
  bandera:any;
  buscar() {
    clearInterval(this.service.intervalo)
    var arrayAux = [];
    this. bandera =1;
    arrayAux.length = 0;
    this.resultado = this.response
    if (this.art.buscar != null) {
      for (let i = 0; i < this.resultado.length; i++) {

        if (this.resultado[i].payLoad.toLowerCase().search(this.art.buscar.toLowerCase()) != -1) { 
          arrayAux.push(this.resultado[i])
          this.bandera=3;
        } else {
          if(this. bandera==1 && i==this.resultado.length-1){
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
