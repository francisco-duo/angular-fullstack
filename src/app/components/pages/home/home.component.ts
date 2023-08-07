import { Component } from '@angular/core';
import { MommentService } from 'src/app/services/moments/momment.service';
import { Moment } from 'src/app/interfaces/Moment';
import { environments } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Iniciamos como um array vazio
  // Este serve para mostrar todos na pagina home
  allMoments: Moment[] = []

  // Este serve para mostrar os momentos filtrados com a barra de pesquisa
  moments: Moment[] = []

  baseApiUrl = environments.baseApiUrl

  faSearch = faSearch
  searchTerm: string = ''

  constructor(private momentService: MommentService) { }

  // Recepção de dados
  ngOnInit(): void {
    this.momentService.getMoment().subscribe((items) => {
      const data = items.data

      // tratando a data para pt-BR
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    })
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter(moment =>
      moment.title.toLowerCase().includes(value)
    )
  }
}
