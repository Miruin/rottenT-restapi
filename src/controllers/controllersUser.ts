import { Request, Response} from 'express';
import sql, { Connection, ConnectionPool, IResult } from 'mssql'
import bcryptjs from 'bcryptjs';
import config from "../config/config";
import { getcon, getdatosuser } from '../database/connection'

class Controllersuser {
    constructor() {
        
    }

    async reguser (req: Request, res: Response): Promise<any>{
    
    }

    async login(req: Request, res: Response): Promise<any> {

    }
}

const controlleruser = new Controllersuser()

export default controlleruser