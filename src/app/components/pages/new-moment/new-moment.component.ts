import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/interfaces/Moment';
import { MommentService } from 'src/app/services/moments/momment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Share';

  // inicia as parada que eu preciso do angular
  constructor(
    private momentService: MommentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  // é um async, pois a função deve esperar a resposta da api
  async createHandler(moment: Moment) {
    // precisaremos tranformar os dados do nosso formulario padrao em um FormData
    // que é um formato padrao de envio de formularios quando trabalhamos
    // com arquivos que o angular usa
    
    // Se nn utilizassemos o arquivo, poderiamos enviar como json padrão
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)
    
    if (moment.image) {
      formData.append("image", moment.image)
    }

    // Enviar para o service para cadastrar no banco
    await this.momentService.createMoment(formData).subscribe();

    // Exibir msg de sucesso
    this.messagesService.add("Momento adicionando com sucesso!!!")

    // redirect para outra pagina
    this.router.navigate(['/'])
  }
}
