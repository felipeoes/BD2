export const filtros = function(dadoOriginal,opcoesSelecionadas){
    try {
        let dadoFiltrado;
        const campos = Object.keys(opcoesSelecionadas);
        const valoresSelecionados = Object.values(opcoesSelecionadas);
        const camposDadoOriginal = Object.keys(dadoOriginal[0]).filter((c)=>c!='Quantidade');
    
        let verdadeiro;
        dadoFiltrado = dadoOriginal.filter(
            (dado)=>{
                
                    verdadeiro = true;
    
                    camposDadoOriginal.forEach((campo)=>{
                        if ( campos.includes(campo) && opcoesSelecionadas[campo] != 'TODOS'){
                            verdadeiro *= (dado[campo]==opcoesSelecionadas[campo]);
                        }
                    });
                    
                    
                    return verdadeiro;
                }
            );
    
        return dadoFiltrado;        
    } catch (error) {
        return {'dado':''};
    }
}

export const groupBySum = function(dadoFiltrado,campoParaAgrupar, campoParaSomar){
    try {
        let result = [];
        dadoFiltrado.reduce(function(res, value) {
            if (!res[value[campoParaAgrupar]]) {
                res[value[campoParaAgrupar]] = { [campoParaAgrupar]: value[campoParaAgrupar], [campoParaSomar]: 0 };
                result.push(res[value[campoParaAgrupar]])
            }
            res[value[campoParaAgrupar]][campoParaSomar] += value[campoParaSomar];
            return res;
            }, {});
    
        return result;        
    } catch (error) {
        return {'dado':''}
    }
}