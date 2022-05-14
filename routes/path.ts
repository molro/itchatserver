const api = {
    home: '/',
    login:'/api/auth/login',
    register: '/api/auth/register',
    users:'/api/chat/users',
    user:'/api/chat/users/:id', // Crea y almacena usuarios
    rooms: '/api/chat/rooms', // Crear y almacena salas
    others:'*'
}

export default api;