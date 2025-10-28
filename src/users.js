const USERS_DATA = [ // Dados simulados de usuários
    { id: 1, name: 'João Silva', isActive: true, role: 'admin' },
    { id: 2, name: 'Maria Souza', isActive: true, role: 'user' },
    { id: 3, name: 'Pedro Santos', isActive: false, role: 'user' }
];

function getUsers() { // Retorna todos os usuários
    return USERS_DATA;
}

function getActiveUsers() { // Retorna apenas usuários ativos
    return USERS_DATA.filter(user => user.isActive === true);
}

function findUserById(id) { // Encontra um usuário pelo ID
    const user = USERS_DATA.find(u => u.id === id);
    if (!user) {
        throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
}

module.exports = { // Exporta as funções para uso em testes
    getUsers,
    getActiveUsers,
    findUserById
};