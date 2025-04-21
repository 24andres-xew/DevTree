
import { Request, Response } from "express";
import slug from "slug";
import { checkPassword, hashPassword } from "../utils/auth";
import User from "../models/User";


export const createAccount = async (req: Request, res: Response): Promise<void> => {

    //verificar si el usuario ya existe
    const { email, password } = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
        const error = new Error('Usuario con Email ya existe')
        res.status(409).json({error : error.message});
        return;
    }

    //creacion de handle
    //slugify el handle y verificar si existe
    const handle = slug(req.body.handle, {lower: true})
    const handleExists = await User.findOne({handle})
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({error : error.message});
        return;
    }

    const user = new User(req.body) //crear nuevo usuario
    user.password = await hashPassword(password) //encriptar contraseña
    user.handle = handle //guardar el handle en minusculas
   
    await user.save()
    res.status(201).send('Registro guardado con exito') //enviar respuesta al cliente
};


export const login = async (req: Request, res: Response): Promise<void> => {

    //comprobar si el usuario existe
    const { email, password } = req.body;

    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('Usuario no existe')
        res.status(404).json({error : error.message});
        return;
    }

    //comprobar contraseña
   const isPasswordCorrect = await checkPassword(password, user.password)
   if (!isPasswordCorrect) {
    const error = new Error('Contraseña incorrecta')    
    res.status(401).json({error : error.message});
    return;   
   }

   res.status(200).json({message: 'Usuario autenticado con exito'}); //enviar respuesta al cliente

};  