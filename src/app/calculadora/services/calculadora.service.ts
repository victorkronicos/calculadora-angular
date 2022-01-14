/**
  *Serviço responsável por realizar as operações da calculadora
  *@author Victor Henrique
  *@since 1.0
*/


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

// Define as constantes utilizadas 
// para identificar operações de calculo
  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string = '/';
  static readonly MULTIPLICACAO: string = '*';

  constructor() { 
  }

  /**
   * Metodo que realiza a operação matemática através dos argumentos passados, capaz de retornar as operações de soma, subtração, divisão e multiplicação
   * @param num1 number
   * @param num2 number
   * @param operacao string Operacao a ser executada
   * @returns number Resultado da operação
   */

  calcular(num1: number, num2: number, operacao: string): number{
    let resultado: number; // Armazena o resultado da operação

    switch(operacao){
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
      break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
      break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
      break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
      break;
      default:
        resultado = 0;
    }

    return resultado;
  }
}
