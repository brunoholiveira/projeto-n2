const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const users = require('../src/users');
const posts = require('../src/posts');

// Bloco principal de testes para as funções unitárias
describe('Funções Unitárias', () => {

    // --- TESTES COM ASSERT (API TDD: assert.metodo(atual, esperado, [mensagem]))
    describe('Estilo Assert (5 asserts diferentes)', () => {
        it('1. Deve retornar um array de usuários (isArray)', () => {
            const result = users.getUsers();
            // Verifica se 'result' é do tipo Array.
            assert.isArray(result, 'O resultado deve ser um array');
        });

        it('2. Deve conter um usuário admin (deepEqual)', () => {
            const user = users.findUserById(1);
            // Verifica se o objeto 'user' é IDÊNTICO em estrutura e valor ao objeto esperado.
            assert.deepEqual(user, { id: 1, name: 'João Silva', isActive: true, role: 'admin' }, 'O usuário deve ser o admin');
        });

        it('3. Deve lançar erro se o ID não for encontrado (throws)', () => {
            // Verifica se a função (passada como callback) LANÇA uma exceção, do tipo 'Error', com a mensagem esperada.
            assert.throws(() => users.findUserById(99), Error, 'Usuário com ID 99 não encontrado.', 'Deve lançar a mensagem de erro esperada');
        });

        it('4. Deve retornar true para a soma de 1 e 2 ser maior que 2 (isTrue)', () => {
            const result = posts.sum(1, 2);
            // Verifica se a expressão booleana (result > 2) é TRUE.
            assert.isTrue(result > 2, 'A soma deve ser maior que 2');
        });

        it('5. A função createFakePost deve retornar um objeto (isObject)', () => {
            const post = posts.createFakePost('Título', 'Corpo');
            // Verifica se a variável 'post' é um Objeto JavaScript.
            assert.isObject(post, 'O post criado deve ser um objeto');
        });
    });

    // --- TESTES COM EXPECT (API BDD: expect(atual).to.metodo(esperado, [mensagem]))
    describe('Estilo Expect (5 expects diferentes)', () => {
        it('6. O array de usuários ativos deve ter tamanho 2 (to.have.lengthOf)', () => {
            const activeUsers = users.getActiveUsers();
            // Verifica se o array 'activeUsers' tem um comprimento (length) estritamente igual a 2.
            expect(activeUsers).to.have.lengthOf(2, 'Apenas 2 usuários estão ativos');
        });

        it('7. A função sum deve retornar um número (to.be.a)', () => {
            const result = posts.sum(10, 5);
            // Verifica se o tipo de 'result' é 'number'.
            expect(result).to.be.a('number', 'O resultado da soma deve ser um número');
        });

        it('8. Um post fake deve conter a tag "test" (to.contain)', () => {
            const post = posts.createFakePost('Título', 'Corpo');
            // Verifica se o array 'post.tags' inclui o elemento 'test'.
            expect(post.tags).to.contain('test', 'O array de tags deve conter "test"');
        });

        it('9. O usuário com ID 1 deve ter a propriedade "role" igual a "admin" (to.have.property)', () => {
            const user = users.findUserById(1);
            // Verifica se o objeto 'user' possui a propriedade 'role' com o valor 'admin'.
            expect(user).to.have.property('role', 'admin', 'O usuário deve ter a role correta');
        });

        it('10. Deve lançar um TypeError se os argumentos não forem números (to.throw)', () => {
            // Verifica se a execução da função lança uma exceção do tipo 'TypeError'.
            expect(() => posts.sum(10, 'a')).to.throw(TypeError, 'Ambos os argumentos devem ser números.', 'Deve lançar TypeError');
        });
    });

    // --- TESTES COM SHOULD (API BDD: atual.should.metodo(esperado, [mensagem]))
    describe('Estilo Should (5 shoulds diferentes)', () => {
        it('11. O nome do usuário 2 deve ser "Maria Souza" (equal)', () => {
            const user = users.findUserById(2);
            // Verifica se o valor da propriedade 'name' é estritamente igual a 'Maria Souza'.
            user.name.should.equal('Maria Souza', 'O nome deve ser Maria Souza');
        });

        it('12. Um post fake criado não deve ser nulo (not.be.null)', () => {
            const post = posts.createFakePost('Teste Should', 'Corpo');
            // Verifica se o valor de 'post' existe (não é null ou undefined).
            should.exist(post, 'O post deve existir'); 
        });

        it('13. O objeto de usuário deve ter uma chave "id, name, isActive, role" (have.keys)', () => {
            const user = users.findUserById(3);
            // Verifica se o objeto 'user' possui TODAS as chaves listadas.
            user.should.have.keys('id', 'name', 'isActive', 'role');
        });

        it('14. O valor da soma deve ser maior que 10 (be.above)', () => {
            const result = posts.sum(6, 5);
            // Verifica se 'result' é estritamente maior (above) que 10.
            result.should.be.above(10, 'O resultado deve ser maior que 10');
        });

        it('15. O post fake deve ser um objeto (be.an)', () => {
            const post = posts.createFakePost('Outro Post', 'Corpo');
            // Verifica se o tipo de 'post' é 'object'.
            post.should.be.an('object', 'O resultado deve ser um objeto');
        });
    });

    // --- TESTES UNITÁRIOS ADICIONAIS (para totalizar 20)
    describe('Testes Unitários Adicionais', () => {

        it('16. User 3 is not active (expect.to.be.false)', () => {
            // Usa 'expect' para verificar se a propriedade 'isActive' é booleana FALSE.
            expect(users.findUserById(3).isActive).to.be.false;
        });

        it('17. User 1 has id 1 (assert.strictEqual)', () => {
            // Usa 'assert' para verificar se o valor da propriedade 'id' é estritamente igual a 1 (valor e tipo).
            assert.strictEqual(users.findUserById(1).id, 1);
        });

        it('18. Post title is too long (should.throw)', () => {
            const longTitle = 'a'.repeat(51);
            // Usa 'should' para verificar se a função (envolvida em um callback para passar argumentos) lança a exceção esperada.
            (() => posts.createFakePost(longTitle, 'body')).should.throw('O título é muito longo.');
        });

        it('19. Post has two tags (expect.to.have.length)', () => {
            const post = posts.createFakePost('Title', 'Body');
            // Usa 'expect' para verificar o comprimento do array 'tags'.
            expect(post.tags).to.have.length(2);
        });

        it('20. Post is null when body is missing (assert.isNull)', () => {
            const post = posts.createFakePost('Title', '');
            // Usa 'assert' para verificar se 'post' é estritamente NULL.
            assert.isNull(post);
        });
    });
});