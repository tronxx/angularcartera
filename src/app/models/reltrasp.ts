export interface Reltrasp
{ 
    clave: string;
    descri: string;
    diainicial: number;
    diafinal: number;
    zona: string;
    numerocodigos: number;
    exeptociudad1: string;
    exeptociudad2: string;
    exeptociudad3: string;
    ciudadinicial: string;
    ciudadfinal: string;
    codigos:[
      { codigo:number}
    ]
}
