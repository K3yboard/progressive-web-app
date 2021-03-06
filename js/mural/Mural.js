const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = JSON.parse(localStorage.getItem("cartoes"))
        .map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo)) || []
    cartoes.forEach(cartao => {
        preparaCartao(cartao)
    })
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()

    Filtro.on("filtrado", render)

    function preparaCartao(cartao) {
        cartao.on("mudanca.**", salvarCartoes)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvarCartoes()
            render()
        })
    }

    function salvarCartoes() {
        localStorage.setItem("cartoes", JSON.stringify(
            cartoes.map(cartao => ({
                conteudo: cartao.conteudo,
                tipo: cartao.tipo
            }))
        ))
    }

    function adiciona(cartao){
        if(logado) {
            cartoes.push(cartao)
            salvarCartoes()
            preparaCartao(cartao)
            render()
            return true
        } else {
            alert('Você não está logado')
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
