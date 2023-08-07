import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Moment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;

  // Cria o "nome" do formulário e atribui o tipo dele...
  momentForm!: FormGroup;

  ngOnInit(): void {
      // Inicializa o formulario que foi criado como um novo formulrio
      // do tipo que ele foi atribuído
      this.momentForm = new FormGroup({
        // Aqui passamos todos os campos que irão compor o formulario
        id: new FormControl(''),
        // Utilizamos o Validators para os campos que queremos validar
        // Neste caso o campo title precisa ser preenchido
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl(''),
      });
  }

  // getter
  // pega e retorna o titulo
  get title() {
    return this.momentForm.get('title')!;
  }

  // getter
  // pega e retorna a descricao
  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.momentForm.patchValue({
      image: file
    })
  }

  // Função criada para enviar o formulario
  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}
