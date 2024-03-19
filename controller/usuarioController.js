

const getUser = (req, res) => {

    const querys = req.query;

    res.status(201).json({
        message: "Hola mundo GET",
        querys
    });
    res.end();
};

const postUser = (req, res) => {

    const parametro = req.params.id
    res.json({
        "MESSAGE": "Hola mundo",
        id: parametro
    });
    res.end();
}

const updateUser = (req, res) => {
    res.json({
        message: "Hola mundo PUT"
    });
    res.end();
}

const deleteUser = (req, res) => {
    res.json({
        message: "Hola mundo DELETE"
    });
    res.end();
}
export {getUser, postUser, updateUser, deleteUser}