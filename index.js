/* Desafio Técnico ==>> Desenha uma Ampunheta
1 - caixa [20 largura width x 20 de altura height]
2 - linhas internas tipo X [20 x 20]
3 - Preenchimento interno [*****]
*/

const _sizeDesenho = 20;
var matriz = [[]];
vetorLinha = new Array();

console.log('Desafio Técnico em JavaScript  - Desenhar Ampulheta');

//criarDesenho(_sizeDesenho,2);    // preenchimento ampunheta inferior

// Testes
//criarVetorLinha(_sizeDesenho);
//criarBox(vetorLinha);
//criarMatrizBox(_sizeDesenho);
//imprimeMatriz();

function executarApp(){

    var sizeAmpulheta = document.getElementById('sizeAmpulheta');
    var tipoAmpulheta =  document.getElementById('tipoAmpulheta');

    if(sizeAmpulheta.value.length > 0 && tipoAmpulheta.value.length > 0){
        criarDesenho(parseInt(sizeAmpulheta.value.toString()),parseInt(tipoAmpulheta.value.toString()));  // preenchimento ampunheta superior
        alert('Ampunheta criada no Console Log');
    }else{
        alert('Parametros não Informados');
    }
}

function imprimeMatriz(){
    for(let linha = 0; linha < matriz.length ; linha++){

        var mzLinha = matriz[linha].length;

        for(let coluna = 0; coluna < mzLinha;coluna++){

            console.log(matriz[linha][coluna]);
        }
    }
}

function criarBox(vetor){

    for(let i = 0 ; i < vetor.length; i++)
    {
        if(parseInt(i.toString()) == 0 || (vetor.length -1) == i){
            console.log(vetor[i]);
        }else{
            console.log(tratarLinha(vetor[i].toString()));
        }
    }
}

function criarMatrizBox(_sizeMatriz){

    for(let i = 0 ; _sizeMatriz -1 >= i; i++)
    {
        for(let j = 0; _sizeMatriz -1 >= j;j++){
            matriz.splice(i,j,['#'.repeat(_sizeMatriz)]);
        }
    }
    console.table(matriz);
}

function criarVetorLinha(_size){

    vetorLinha = [];
    let linha;

    for(let i = 0 ; i <_size ; i++)
    {
        if(i.toString().length == 1){
            linha = '0'+i.toString().slice(-2);
        }else{
            linha = i.toString();
        }

        vetorLinha.splice(i,0,'#'.repeat(_size)+'-'+linha);

        //console.log(i.toString()+' - '+vetorLinha[i]);
        //console.log(vetorLinha[i]);
    }
}

function tratarLinha(valorString){

    var part1 = valorString.substring(0,1);
    var part2 = ' '.repeat(_sizeDesenho -2);
    var part3 = valorString.substring(_sizeDesenho-1,_sizeDesenho+4);
    var retString = part1.toString()+part2.toString()+part3.toString();

    return retString;    
}

function criarDesenho(_size, tipoAmpunheta){

    criarVetorLinha(_size);

    var vetorSuperior = vetorLinha.slice(0,_size/2)
    var vetorInferior = vetorLinha.slice(_size/2, _size);

    if(tipoAmpunheta == 1){         // ampunheta ==>> com preenchimento superior e sem preenchimento inferior
        desenharAmpunhetaSuperior(vetorSuperior,_size,true);
        //desenharAmpunhetaInferior(vetorInferior,_size,false); // não tá pronto
    }else if(tipoAmpunheta == 2){ // ampunheta ==>> sem preenchimento superior e com preenchimento inferior
        desenharAmpunhetaSuperior(vetorSuperior,_size,false);
        desenharAmpunhetaInferior(vetorInferior,_size,true); 
    }else{
        desenharAmpunhetaSuperior(vetorSuperior,_size,true);
        desenharAmpunhetaInferior(vetorInferior,_size,true);
    }   
}

function desenharAmpunhetaSuperior(vetor,size,tipo){

    var retLinha;

    for(let l = 0; l < vetor.length; l++){
        if(tipo){
            retLinha = preencherLinhaSuperior(vetor[l].toString(),size);
        }else{
            retLinha = formatarLinhaSuperior(vetor[l].toString(),l,size);
        }        
        console.log(retLinha);
    }
}

function formatarLinhaSuperior(strLinha,posicao,sizeDesenho){

    var strLadoEsquerdo;
    var strMeio;
    var strLadoDireito;
    var strParteMeio;

    var strRetorno;

    var posicaoInicial = strLinha.substring(0,1);
    var posicaoFinal = strLinha.substring(sizeDesenho -1,sizeDesenho+4);

    if(posicao == 0){
        strRetorno = '#'+strLinha.toString();
    }
    else if(posicao == 1)
    {
        strLadoEsquerdo = strLinha.substring(posicaoInicial.toString().length,posicao+1);
        strMeio = strLinha.substring((posicaoInicial.toString().length+strLadoEsquerdo.length),sizeDesenho-(posicao+1));
        strLadoDireito = strLinha.substring(sizeDesenho - 1,sizeDesenho);
        strParteMeio = ' '.repeat(strMeio.length + 1);

        strRetorno = posicaoInicial+strLadoEsquerdo+strParteMeio+strLadoDireito+posicaoFinal;

    }else{    
        var posicaoDiferenca = sizeDesenho - (posicao+1)*2;
        strLadoEsquerdo = strLinha.substring(posicaoInicial.toString().length,posicao+1);
        strMeio = strLinha.substring(0,posicaoDiferenca);
        strLadoDireito = strLinha.substring(sizeDesenho - (posicao+1),sizeDesenho -1);
        strParteMeio = ' '.repeat(strMeio.length + 1);

        strRetorno = posicaoInicial+' '.repeat(posicao - 1)+
                     strLadoEsquerdo.substr(strLadoEsquerdo.length-1,1)+
                     strParteMeio+
                     strLadoDireito.substr(strLadoDireito.length-1,1)+
                     ' '.repeat(posicao - 1)+posicaoFinal;
    }

    return strRetorno;
}

function  preencherLinhaSuperior(strLinha,sizeDesenho){

    var strRetorno;

    var posicaoInicial = strLinha.substring(0,1);
    var posicaoFinal = strLinha.substring(sizeDesenho - 1,sizeDesenho + 4);
    var posicaoVetor = parseInt(strLinha.substring(sizeDesenho + 1,sizeDesenho + 4));

    if(posicaoVetor == 0){
        strRetorno = '#'+strLinha.toString();
    }else{

        var calcularEspaco = (sizeDesenho - posicaoVetor);
        var strEspaco = ' '.repeat(calcularEspaco - 1);
        var strCaracter = strLinha.substring(strEspaco.length,posicaoVetor);

        strRetorno = posicaoInicial+
                     strEspaco.substring(0,posicaoVetor) +
                     strCaracter+
                     strEspaco.substring(posicaoVetor,(strCaracter.length - strEspaco.length - posicaoVetor))+
                     posicaoFinal;
    }

    return strRetorno;
}


function desenharAmpunhetaInferior(vetor,size,tipo){

    var retLinha;

    for(let l = 0; l < vetor.length; l++){
        if(tipo){
            retLinha = preencherLinhaInferior(vetor[l].toString(),size);
        }else{
            // falta fazer a função
        }
        console.log(retLinha);                
    }
}

function preencherLinhaInferior(strLinha,sizeDesenho){

    var strCaracter;
    var strEspaco;

    var strRetorno;

    var posicaoInicial = strLinha.substring(0,1);
    var posicaoFinal = strLinha.substring(sizeDesenho - 1,sizeDesenho + 4);
    var posicaoVetor = parseInt(strLinha.substring(sizeDesenho + 1,sizeDesenho + 4));

    var calcularEspaco = (sizeDesenho - posicaoVetor);

    strEspaco = ' '.repeat(calcularEspaco - 1);
    strCaracter = strLinha.substring(strEspaco.length,posicaoVetor);     

    strRetorno = posicaoInicial+strEspaco+strCaracter+strEspaco+posicaoFinal;

    return strRetorno;
}