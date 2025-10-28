const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('chai-http'); // Usado para demonstração, mas o foco é o Sinon

// Simulação de um Módulo de Serviço que faz chamadas HTTP
const APIService = {
    getPosts: function (userId) {
        // Simula uma chamada real. Esta função será "stubada"
        return new Promise(resolve => {
            resolve([{ id: 1, title: 'Real Post' }]);
        });
    }
};

describe('Testes Mockados/Stubados de API com Sinon', () => {
    let getPostsStub;

    beforeEach(() => {
        // Stub da função getPosts para que ela não chame a API real
        getPostsStub = sinon.stub(APIService, 'getPosts');
    });

    afterEach(() => {
        // Restaura a função original após cada teste
        getPostsStub.restore();
    });

    it('1. Deve retornar dados mockados para posts de um usuário (stub)', async () => {
        // Dados que o stub retornará
        const mockData = [{ id: 101, title: 'Stubbed Post 1' }, { id: 102, title: 'Stubbed Post 2' }];
        getPostsStub.withArgs(1).resolves(mockData);

        const result = await APIService.getPosts(1);

        assert.equal(result.length, 2, 'Deve retornar 2 posts mockados');
        assert.deepEqual(result[0], mockData[0], 'O primeiro post deve ser o mockado');
    });

    it('2. Deve verificar se a função foi chamada corretamente (spy)', async () => {
        // Aqui, usamos o stub apenas para rastrear a chamada (funciona como spy)
        getPostsStub.resolves([]);

        await APIService.getPosts(5);

        assert.isTrue(getPostsStub.calledOnce, 'A função deve ser chamada exatamente uma vez');
        assert.isTrue(getPostsStub.calledWith(5), 'A função deve ser chamada com o ID de usuário 5');
    });

    it('3. Deve retornar um array vazio se o usuário não tiver posts (stub/expect)', async () => {
        getPostsStub.withArgs(99).resolves([]); // Mockando o retorno para o usuário 99

        const result = await APIService.getPosts(99);

        result.should.be.an('array'); // Exemplo com should
        assert.isEmpty(result, 'O array deve estar vazio');
    });

    it('4. Deve simular um erro de rede (stub/throws)', async () => {
        const networkError = new Error('Erro de conexão de rede.');
        getPostsStub.rejects(networkError); // Simula que a chamada falhou

        try {
            await APIService.getPosts(1);
            // Se o teste chegar aqui, ele falhou, pois esperávamos um erro
            assert.fail('A chamada não lançou a exceção esperada');
        } catch (error) {
            assert.equal(error.message, networkError.message, 'Deve lançar o erro de rede simulado');
        }
    });

    it('5. Deve garantir que o resultado é um array de objetos (stub/expect)', async () => {
        const mockData = [{ userId: 1, title: 'Stubbed' }];
        getPostsStub.resolves(mockData);

        const result = await APIService.getPosts(1);

        // Exemplo com expect
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.have.property('userId').that.is.a('number');
    });
});