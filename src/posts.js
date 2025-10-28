function sum(a, b) {
    // Função simples para fins de teste unitário
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Ambos os argumentos devem ser números.');
    }
    return a + b;
} // Função para somar dois números

function createFakePost(title, body) { // Função para criar um post fake
    if (!title || !body) {
        return null;
    }
    if (title.length > 50) {
        throw new Error('O título é muito longo.');
    }
    return { // Retorna um objeto representando um post fake
        userId: 1,
        id: Date.now(),
        title: title,
        body: body,
        tags: ['fake', 'test']
    };
}

module.exports = { // Exporta as funções para uso em testes
    sum,
    createFakePost
};