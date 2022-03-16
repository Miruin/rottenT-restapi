import {Request, Response, Router} from 'express'
import controlleruser from '../controllers/controllersUser'
import { auth } from '../helpers/service'



class Rutasuser{

    router: Router;

    constructor() {

        this.router = Router();
        this.routes();

    }

    routes() {

        this.router.post('/registro', controlleruser.registrouser)

        this.router.post('/log', controlleruser.login)

        this.router.get('/log', auth, controlleruser.logout)

        this.router.post('/actualizar', auth, controlleruser.datosuser)

        this.router.put('/actualizar', auth, controlleruser.moduser)

    }
 
}

const rutauser = new Rutasuser();
rutauser.routes();

export default rutauser.router