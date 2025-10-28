const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert; // Podemos usar o assert também, se necessário

// Habilita o plugin chai-http
chai.use(chaiHttp);

// A URL base da API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('Testes de API: Endpoint /comments (JSONPlaceholder)', () => {

    // Teste 1: Buscar todos os comentários (GET /comments)
    it('1. Deve retornar uma lista de 500 comentários com status 200 (GET /comments)', async () => {

        // Faz a requisição GET para o endpoint /comments
        const res = await chai.request(BASE_URL).get('/comments');

        // 1. Asserção do Status Code (usando expect)
        expect(res).to.have.status(200, 'O status code da resposta deve ser 200 (OK)');

        // 2. Asserção do Tipo de Dados (usando expect)
        expect(res.body).to.be.an('array', 'O corpo da resposta deve ser um array de comentários');

        // 3. Asserção do Tamanho (usando expect)
        // O JSONPlaceholder retorna um número fixo de itens para a lista completa
        expect(res.body).to.have.lengthOf(500, 'A lista completa deve conter 500 comentários');

        // 4. Asserção da Estrutura do Primeiro Item (usando assert)
        const primeiroComentario = res.body[0];
        assert.isObject(primeiroComentario, 'O primeiro item da lista deve ser um objeto');
        assert.containsAllKeys(primeiroComentario, ['postId', 'id', 'name', 'email', 'body'], 'O comentário deve conter todas as chaves esperadas');
        assert.isNumber(primeiroComentario.id, 'O ID do comentário deve ser um número');

    });

    // Teste 2: Buscar comentários por um Post ID específico (GET /comments?postId=1)
    it('2. Deve retornar 5 comentários associados ao Post ID 1 com status 200 (GET /comments?postId=1)', async () => {
        const res = await chai.request(BASE_URL).get('/comments').query({ postId: 1 });

        // Asserções
        expect(res).to.have.status(200, 'Status code deve ser 200 para busca por ID');
        expect(res.body).to.be.an('array').with.lengthOf(5, 'O Post ID 1 deve ter 5 comentários associados');

        // Asserção de conteúdo (todos os itens devem ter postId = 1)
        res.body.forEach(comment => {
            expect(comment.postId).to.equal(1, 'Todos os comentários na resposta devem pertencer ao Post ID 1');
        });
    });

    // Teste 3: Criação de um novo comentário (POST /comments) - O JSONPlaceholder simula a criação
    it('3. Deve simular a criação de um novo comentário e retornar status 201 (POST /comments)', async () => {
        const novoComentario = {
            postId: 101,
            name: 'Teste Chai-HTTP',
            email: 'teste@exemplo.com',
            body: 'Corpo do comentário de teste.',
        };

        const res = await chai.request(BASE_URL)
            .post('/comments')
            .send(novoComentario);

        // Asserções
        expect(res).to.have.status(201, 'A criação bem-sucedida deve retornar status 201 (Created)');
        expect(res.body).to.be.an('object', 'A resposta deve ser um objeto');

        // JSONPlaceholder retorna o objeto enviado + o ID simulado (101 para POSTs)
        expect(res.body.id).to.be.a('number', 'A resposta deve conter o ID do novo comentário');
        expect(res.body.name).to.equal(novoComentario.name, 'O nome retornado deve ser o enviado');

    });
});