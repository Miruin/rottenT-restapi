import {Request, Response, Router} from 'express'
import controlleruser from '../controllers/controllersUser'



class Rutasuser{

    router: Router;

    constructor() {

        this.router = Router();
        this.routes();

    }

    routes() {

        this.router.post('/registro', controlleruser.reguser)

        this.router.post('/log', controlleruser.login)

    }
 
}

const rutauser = new Rutasuser();
rutauser.routes();

export default rutauser.router