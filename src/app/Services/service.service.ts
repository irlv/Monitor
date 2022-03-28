import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

 
  recuperarTodosConError() {
   
    return this.http.get<any>('http://localhost:5003/Monitor/Con_Error');
  }


  // enviarCola(Queue,_id){
  //  console.log(_id+"lleghe")
  //   return this.http.get('http://localhost:5003/Monitor/Reenvio Queue?QueueName=credit-sincroniza-credito&msg=%7B%20%20%20%22Id_persona%22%3A%20%228065%22%2C%20%20%20%22Id_cliente%22%3A%20%228067%22%2C%20%20%20%22Codigo_Cliente%22%3A%20%2200200000616%22%2C%20%20%20%22Codigo_agencia%22%3A%20%22002%22%2C%20%20%20%22Codigo_usuario%22%3A%20%22%22%2C%20%20%20%22Rfc%22%3A%22ROGF651022L48%22%2C%20%20%20%22Curp%22%3A%22ROGF651022MCSSZR04%22%2C%20%20%20%22Numero_Credito%22%3A%227768%22%20%20%20%22Clave%22%3A%22Sincronizar-Cliente%22%20%7D');
  //   // 'http://localhost:5003/Monitor/Reenvio?QueueName=cr…pr-solicitud-credito&msg=623220090a513de35f7f86fa'
  // }

  enviaQueue(Queue,_id){
    var url='http://localhost:5003/Monitor/Reenvio_Queue'
    return this.http.get(`${url}?QueueName=${Queue}&msg=${_id}`)
  }

  enProceso(){
    return this.http.get('http://localhost:5003/Monitor/En_Proceso');
  }

  // buscar(id) {
  //   return this.http.get(`${this.url}buscar.php?nombre=${id}`); 
  // }

  

  
}
