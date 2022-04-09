
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'
interface queRes {
  index: any;
  idResultado: any;
  mensaje: string;
}
interface Response{
  idResultado: number;
  mensaje: string;
  jsonStr: string;
}
interface Queue {
  queue: string;
}
interface Buss {
  id: string;

}
interface BussProcees {
  _id: string;
  queue: Queue[];
  indexComplete: any;
  queueResult: queRes[];
  payLoad: string;
  isvisible: boolean;
  createdAt: Date;
}


@Component({
  selector: 'app-detenidas',
  templateUrl: './detenidas.component.html',
  styleUrls: ['./detenidas.component.css']
})
export class DetenidasComponent implements OnInit {

  response: BussProcees[];
  errorMessage: any;
  buss: BussProcees;
  resu: any = {
    idResultado: null,
    mensaje: '',
    json: null
  };

  constructor(protected service: ServiceService, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.recuperarDetenida()
    this.tiempoRecorrido()
  }

  recuperarDetenida() {
    this.service.getDetenidaSinError().subscribe((result: BussProcees[]) => {
      this.response = result, console.log(result)
    }, err => {
      this.errorMessage = err.message
    })
  }
  horaactual: Date;
  tiempoRecorrido() {
    var arrayAux = [];
    //var horaCreada= this.response[0].CreatedAt
    //this.response

    this.horaactual = new Date()

    var restaFecha
    console.log(parseInt(this.horaactual.getHours().toString()))
    console.log(parseInt(this.horaactual.getMinutes().toString()))
    console.log(this.response)
    if (this.response != null) {

      for (let i = 0; i < this.response.length; i++) {
        restaFecha = (Number)(this.horaactual.toLocaleTimeString()) - (Number)(this.response[i].createdAt.toLocaleTimeString());
        console.log(restaFecha)
        if (restaFecha >= 5) {

          arrayAux.push(this.response[i])
        }
      }

    }


    this.response = arrayAux;

  }


  reenviarPosActual(art, queue) {
    console.log(art)
    console.log(queue)
    this.buss = art
    let planet: Buss = {
      id: this.buss._id
    };
    if (queue == null) {
      console.log(this.buss.queue[0])
      console.log(this.buss._id)
      
      this.service.editqueue(queue, JSON.stringify(planet), art).subscribe((result: any = {
        idResultado: null,
        mensaje: '',
        json: null
      }) => {
        if (result.idResultado != -1) {
          this.resu = result[0],
            new Swal({
              title: 'Cola Enviada con Exito',
              icon: 'success',
            })
        } else {
          new Swal({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio algun Error',
          })
        }
      });
    }else{

      this.service.editqueue(queue, JSON.stringify(planet), art).subscribe((result: any = {
        idResultado: null,
        mensaje: '',
        json: null
      }) => {
        if (result.idResultado != -1) {
          this.resu = result[0],
            new Swal({
              title: 'Cola Enviada con Exito',
              icon: 'success',
            })
        } else {
          new Swal({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio algun Error',
          })
        }
      });

    }


  }

  respuesta:Response;

  eliminar(id) {
    console.log(id)
    this.service.eliminarQueue(id).subscribe((result:Response)=>{this.respuesta=result
      if(this.respuesta.idResultado>0){
        new Swal({
          title: 'Cola Eliminada con Exito',
          icon: 'success',
        });
      }else{
        new Swal({
          title: 'Error:'+this.respuesta.mensaje,
          icon: 'error',
        })
      }

    },err=>{
      this.errorMessage = err.message
    })

  }

}

