const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiHttp);

const INTEGRATION_SERVER_URL = 'https://my-json-server.typicode.com/brunoholiveira/projeto-n2';

let createdPostId;

describe('Testes de Integração My JSON Server', () => {

    describe('Coleção /posts', () => {

        it('1. Deve retornar a lista completa de posts com status 200 e chaves corretas', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/posts');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.above(0);

            assert.containsAllKeys(res.body[0], ['id', 'titulo', 'autorId']);
        });

        it('2. Deve retornar status 404 para um post inexistente', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/posts/9999');

            expect(res).to.have.status(404);
            expect(res.body).to.be.empty;
        });

        it('3. Deve criar um novo post e retornar status 201', async () => {
            const novoPost = { titulo: 'Post Criado p/ Teste', autor: 'TesteUser', autorId: 1 };

            const res = await chai.request(INTEGRATION_SERVER_URL)
                .post('/posts')
                .send(novoPost);

            expect(res).to.have.status(201);
            expect(res.body.titulo).to.equal(novoPost.titulo);

            createdPostId = res.body.id;
            assert.isDefined(createdPostId, 'O ID do post criado não foi retornado');
        });

        it('4. Deve retornar apenas posts do autor ID 1 (filtro por query string)', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/posts').query({ autorId: 1 });
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');

            res.body.forEach(post => {
                expect(post.autorId).to.equal(1);
            });
        });
    });

    describe('Coleção /usuarios', () => {

        it('5. Deve retornar a lista de usuários simulados com status 200', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/usuarios');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('nome');
        });

        it('6. Deve retornar status 404 para um usuário inexistente (ID 9999)', async () => {
            // Tenta buscar um usuário com um ID que presumivelmente não existe
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/usuarios/9999');

            // A asserção principal é verificar se o status code é 404 (Not Found)
            expect(res).to.have.status(404);

            // my-json-server retorna um corpo vazio {} em um 404
            expect(res.body).to.be.an('object').that.is.empty;
        });

        it('7. Deve simular a criação de um novo usuário e retornar status 201', async () => {
            const novoUser = { nome: 'Novo Usuário Integracao', role: 'guest' };

            const res = await chai.request(INTEGRATION_SERVER_URL)
                .post('/usuarios')
                .send(novoUser);

            expect(res).to.have.status(201);
            expect(res.body.nome).to.equal(novoUser.nome);
        });

        it('8. Deve retornar status 404 para um usuário inexistente', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/usuarios/9999');

            expect(res).to.have.status(404);
            expect(res.body).to.be.empty;
        });
        it('9. Deve retornar um usuário específico (ID 1) com status 200', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/usuarios/1');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.equal(1);
            assert.containsAllKeys(res.body, ['id', 'nome', 'email']);
        });

    });

    describe('Rotas Aninhadas (Nested Routes)', () => {
        it('10. Deve retornar os posts aninhados de um usuário (ex: /usuarios/1/posts)', async () => {
            const res = await chai.request(INTEGRATION_SERVER_URL).get('/usuarios/1/posts');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');

            res.body.forEach(post => {
                expect(post.autorId).to.equal(1);
            });
        });
    });
});
