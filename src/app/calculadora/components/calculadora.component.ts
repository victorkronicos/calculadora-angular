import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { 

  }

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void{
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null; 
  }

  /**
   * Adiciona o número selecionado para cálculo posteriormente.
   * @param string numero
   * @return void
   */
  adicionarNumero(numero: string): void{
    this.operacao === null ? 
    this.numero1 = this.concatenarNumero(this.numero1, numero) :
    this.numero2 = this.concatenarNumero(this.numero2, numero);
  }

  /**
   * Retorna o valor concatenado. Trata o separador decimal
   * @param string numAtual
   * @param string numConcat
   * @return string
   */

  concatenarNumero(numAtual: string, numConcat: string): string{

    if(numAtual === '0' || numAtual === null){
      numAtual = '';
    }

    // Se o usuário digitar '.' insere um 0 antes do .
    if(numConcat === '.' && numAtual === ''){
      return '0.';
    }

    // Se já tiver um '.' retorna ele mesmo
    if( numConcat === '.' && numAtual.indexOf('.') > -1){
      return numAtual;
    }

    return numAtual + numConcat;
  }

  /**
   * Executa uma lógica quando um operador for selecionado
   * Caso já possua uma operação selecionada, executa a operação anterior, e define a nova operação.
   * 
   * @param string operacao
   * @return void
   */

  definirOperacao(operacao: string): void{

    // apenas define a operação caso não exista uma
    if(this.operacao === null){
      this.operacao = operacao;
      return;
    }

    // Caso a operação definida e numero 2 selecionado, efetua o calculo
    if(this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1), 
        parseFloat(this.numero2), 
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  /**
   * Efetua o cálculo de uma operação
   * 
   * @return void
   */

  calcular():void{
    if(this.numero2 === null){
      return;
    }

    let numero1 = parseFloat(this.numero1);
    let numero2 = parseFloat(this.numero2);

    this.resultado = this.calculadoraService.calcular(numero1, numero2, this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * 
   * @return string
   */

  get display(): string{
    if(this.resultado !== null){
      return this.resultado.toString();
    }

    if(this.numero2 !== null){
      return this.numero2;
    }
    return this.numero1;
  }

}
