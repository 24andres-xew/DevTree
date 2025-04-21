import  {Router} from "express";
import { body } from "express-validator"
import {createAccount, login} from "./handlers";
import { handleInputErrors } from "./middleware/validation";


const router = Router();
//autenticacion
router.post('/auth/register', 
    body('handle')
    .notEmpty()
    .withMessage('Handle no puede ir vacio'),

    body('name')
    .notEmpty()
    .withMessage('Nombre no puede ir vacio'),

    body('email')
    .isEmail()
    .withMessage('Email no es valido'),

    body('password')
    .isLength({min: 8})
    .withMessage('Contraseña es muy corta, minimno 8 caracteres'),
    
    handleInputErrors,
    createAccount
)

    //autenticar usuarios
router.post('/auth/login', 
    body('email')
    .isEmail()
    .withMessage('Email no es valido'),

    body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),

    login
)

export default router;
