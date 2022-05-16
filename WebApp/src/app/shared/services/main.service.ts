import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MainService {

  private url = 'http://localhost:3000/Oceanides'

  constructor(private httpCliente: HttpClient) {
  }

  public getPlasticsInfo() {
    return this.httpCliente.get<any[]>(`${this.url}/Plastics/list`);
  }

  public getGraphInfo() {
    return this.httpCliente.get<any[]>(`${this.url}/Graphic/graph`);
  }

}
