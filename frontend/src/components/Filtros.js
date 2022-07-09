export const filtros = function(dadoOriginal,opcoesSelecionadas){
    let dadoFiltrado;
    const campos = Object.keys(opcoesSelecionadas);
    const valoresSelecionados = Object.values(opcoesSelecionadas);
    const camposDadoOriginal = Object.keys(dadoOriginal[0]).filter((c)=>c!='Quantidade');

    let verdadeiro;
    dadoFiltrado = dadoOriginal.filter(
        (dado)=>{
            
                verdadeiro = true;

                camposDadoOriginal.forEach((campo)=>{
                    if ( campos.includes(campo)){
                        verdadeiro *= (dado[campo]==opcoesSelecionadas[campo]);
                    }
                });
                
                
                return verdadeiro;
            }
        );

    return dadoFiltrado;
}