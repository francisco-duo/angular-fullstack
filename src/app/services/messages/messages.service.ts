import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor() { }

  message: string = ''

  // Este me´todo adiciona uma menssagem e quando passa algum tempo ele apaga ela
  add(message: string) {
    this.message = message

    setTimeout(() => {
      this.clear()
    }, 4000)
  }

  // Método para apagar a menssagem
  clear() {
    this.message = ''
  }
}
