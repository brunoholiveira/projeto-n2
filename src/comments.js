
const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Função para buscar todos os comentários.
async function getAllComments() {
    try {
        const response = await axios.get(`${BASE_URL}/comments`);
        // Retorna o array de dados
        return response.data;
    } catch (error) {
        // Em um sistema real, você trataria o erro de forma mais sofisticada
        throw new Error(`Erro ao buscar todos os comentários: ${error.message}`);
    }
}

// Função para buscar comentários por ID do post.
/**
 * @param {number} postId O ID do post para o qual buscar comentários.
 */
async function getCommentsByPostId(postId) {
    if (!postId || typeof postId !== 'number') {
        throw new Error('ID do Post é obrigatório e deve ser um número.');
    }
    
    try {
        // Usa o objeto params para adicionar 'postId=X' na URL
        const response = await axios.get(`${BASE_URL}/comments`, {
            params: {
                postId: postId
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar comentários para o Post ID ${postId}: ${error.message}`);
    }
}

// Função para criar um novo comentário.
 /** 
  * @param {Object} newCommentData Os dados do novo comentário.
*/
async function createComment(newCommentData) {
    if (!newCommentData || !newCommentData.body) {
         throw new Error('Os dados do comentário (body) são obrigatórios.');
    }

    try {
        const response = await axios.post(`${BASE_URL}/comments`, newCommentData);
        // O status 201 (Created) é tratado por axios. Retornamos o objeto criado (mockado)
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao criar comentário: ${error.message}`);
    }
}


module.exports = {
    getAllComments,
    getCommentsByPostId,
    createComment
};