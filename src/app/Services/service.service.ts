import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
interface Package{
  _id:string;
  clave:string;
  clients:[];
  queue:[];
}
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  intervalo:any;

  prueba:any;

  constructor(private http: HttpClient) { }
  url = 'http://10.0.2.198:5003/';
  recuperarTodosConError() {
    return this.http.get(`${this.url}Monitor/Con_Error`)
  }

  enviaQueue(Queue, _id) {
    var url = 'http://10.0.2.198:5003/Monitor/Reenvio_Queue'
    return this.http.get(`${url}?QueueName=${Queue}&msg=${_id}`)
  }

  enProceso() {
    try {
      return this.http.get<HttpEvent<any>>(`${this.url}Monitor/En_Proceso`);
    } catch (error) {
    }
  }

  getPackage(){
    try {
      return this.http.get(`${this.url}Monitor/Package`)
    } catch (error) {
    }
  }

  getErrorfiltrado(Queue){
    try {
      return this.http.get(`${this.url}Monitor/Con_Error/Filtrado?Queue=${Queue}`);
    } catch (error) {
    }
  }

  getEprocesoFiltrado(Queue,indexComplete){
    try {
      return this.http.get(`${this.url}Monitor/En_Proceso/Filtrado?Queue=${Queue}&indexComplete=${indexComplete}`); 
    } catch (error) {
    }
  }
  editqueue(Queue, _id, bus) {
    var url = 'http://10.0.2.198:5003/Monitor/Editar_buss'
    return this.http.post(`${url}?QueueName=${Queue}&msg=${_id}`,bus )
  }

  getDetenidaSinError(){
    try {
      return this.http.get(`${this.url}Monitor/DetenidasSError`)
    } catch (error) {
      
    }
  }

  eliminarQueue(id){
    try {
      return this.http.get(`${this.url}Monitor/Elimiar_BusProcess?id=${id}`)
    } catch (error) {
      
    }
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    console.log(error.status)
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      case 0: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
