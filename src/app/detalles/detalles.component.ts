import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  constructor(protected service: ServiceService) { }

  ngOnInit() {
    this.obtenerQueue()
  }

  art1 = {
    _id: null,
    queue: null,
    indexComplete: null,
    queueResult: null,
    payLoad: null,
    idStatus: null
  }

  art2 = {
    index: null,
    idResultado: null,
    mensaje: null,
  }

  response: any[];

  Result: any[];

  obtenerQueue() {
    var art
    var result
    art = localStorage.getItem("valor")
    this.response = [JSON.parse(art)]
    result = [JSON.parse(art)]
    console.log(this.response)

    localStorage.setItem("Result", result)

  }




  resu: any = {
    idResultado: null,
    mensaje: '',
    json: null
  };

  Reenviar(queue, result, payload, idQueue) {

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
