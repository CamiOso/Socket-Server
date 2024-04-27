

export class GraficaData {

private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];

private valores: number[] = [10, 20, 30, 40];


constructor(){

}

getDataGrafica(){
    return [
        {data: this.valores, label: 'Ventas'}
    ];

}

incrementarValor(mes: string, valor: number){
    mes= mes.toLowerCase().trim();
    for(let i in this.meses){
        if(this.meses[i] === mes){
            this.valores[i] += valor;
        }
    }
    return this.getDataGrafica();
}



}
