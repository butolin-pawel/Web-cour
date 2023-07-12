import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../Class/user';

import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal'
import { HistoryrequestComponent } from '../historyrequest/historyrequest.component';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{
  clients : User[] = [];

  bsModalRef?: BsModalRef;
  ngOnInit(): void {
    this.clientService.getAllClient().subscribe((res) => {
      this.clients = res;
    })
  }
  delClient(client : User){
    this.clientService.delClient(client.id).subscribe(()=>{
      this.clientService.getAllClient().subscribe((res) => {
        this.clients = res;
      })
    })
  }
  constructor(private clientService : ClientService, private modalService: BsModalService, private historyService : HistoryService){

  }
  history(id : User){
    this.historyService.setClient(id);
    const modalOptions: ModalOptions = {
      initialState:{},
      class: 'modal-dialog-centered',
    }

    this.bsModalRef = this.modalService.show(HistoryrequestComponent,modalOptions);
  }
}
