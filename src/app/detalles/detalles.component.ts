import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { queue } from 'rxjs/internal/scheduler/queue';

interface Buss {
  id: string;

}
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
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})

export class DetallesComponent implements OnInit {
  resu: any = {
    idResultado: null,
    mensaje: '',
    json: null
  };
  constructor(protected service: ServiceService) { }

  ngOnInit() {
    clearInterval(this.service.intervalo)
    this.obtenerQueue()
  }

  // art1 = {
  //   _id: null,
  //   queue: null,
  //   indexComplete: null,
  //   queueResult: [{ mensaje: null, index: null,idResultado:null }],
  //   payLoad: null,
  //   idStatus: null
  // }

  // art2 = {
  //   index: null,
  //   idResultado: null,
  //   mensaje: null,
  // }

  response: BussProcees[];

  Result: any[];

  obtenerQueue() {
    var art
    var result
    art = localStorage.getItem("valor")
    this.response = [JSON.parse(art)]
    var arr = this.response[0].queueResult;
    var uniqueArray = []
    var indexActual = 0


    for (const iterator of arr) {
      if (iterator.index != indexActual) {
        indexActual = iterator.index;
        uniqueArray.push(iterator)

      }
    }

    this.response[0].queueResult = uniqueArray;
    result = [JSON.parse(art)]
    localStorage.setItem("Result", result)
  }

  Reenviar(queue, result, payload, idQueue) {

    console.log(result)

    this.service.enviaQueue(queue, idQueue).subscribe((result: any = {
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

  Reenviar2(queue, result, payload, idQueue) {

    let planet: Buss = {
      id: idQueue

    };

    console.log(result)
    this.service.editqueue(queue, JSON.stringify(planet), result).subscribe((result: any = {
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

  // response:any;

  // recuperarConError() {
  //   this.service.recuperarTodosConError().subscribe( (result)  =>{this.response = result, console.log(result)
  //    });
  // }


  // esMuyListo(response) {
  //   var art = localStorage.getItem("Result")
  //   this.Result = [art]
  //   console.log(response.queue.length + 1);

  //   for (let i = 0; i <= response.queueResult.length; i++) {
  //     ;
  //     if (response.queueResult[i].idResultado != -1) {
  //       console.log("Entre")
  //       return true;
  //     }
  //     else {
  //       console.log(i + "b")
  //       console.log("Entre22" + response.queueResult[i].idResultado)
  //       return false;

  //     }
  //   }

  // }
}
