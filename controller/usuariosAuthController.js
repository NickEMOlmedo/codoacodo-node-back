// FUNCIONES PARA EL LOGIN Y REGISTRO DE USUARIOS 
// CON JSONWEBTOKEN Y BCRYPTJS

app.post('/crear', async (req, res) => {
    const { username, password } = req.body;

    const userExists = usuarios.find( user => user.username === username )
    if (userExists) {
        return res.status(400).json({
            message: 'El usuario ya existe'
        });
    }
})