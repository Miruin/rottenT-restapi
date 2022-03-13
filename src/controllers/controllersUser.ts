import { Request, Response} from 'express';
import sql, { Connection, ConnectionPool, IResult } from 'mssql'
import bcryptjs from 'bcryptjs';
import config from "../config/config";
import { getcon, getdatosuser } from '../database/connection'
import { creartoken } from "../helpers/service";

class Controllersuser {
    constructor() {
        
    }

    async registrouser (req: Request, res: Response): Promise<any>{

        try {

            const pool = await getcon()

            if (!pool)  return res.status(500).send({msg: 'Error del servidor'})
               
            let { nick, email, contrasena, na, fn} = req.body;
            
            if(nick == null || email == null || contrasena == null || na == null || fn == null) {
    
                return res.status(400).json({ msg : 'No se han llenado los valores correctamente'});
    
            } else {

                const result = await getdatosuser(pool, nick);

                if (!result)  return res.status(500).send({msg: 'Error del servidor'})

                if (result.recordset[0]) { 
                        
                    pool.close();
                    return res.status(400).send({msg: 'Ya se esta usando este usuario'});

                } else {
    
                    let rondas = 10;
                    let pwh = await bcryptjs.hash(contrasena,rondas);
                    await pool.request()
                    .input('nick', sql.VarChar, nick)
                    .input('email', sql.VarChar, email)
                    .input('pw', sql.VarChar, pwh)
                    .input('na', sql.VarChar, na)
                    .input('fn', sql.VarChar, fn)
                    .query(String(config.q2));
                    pool.close();
                    return res.status(200).send({msg: 'Se ha registrado satisfactoriamente'});    
                    
                }
            }
    
        } catch(e) {
            console.error(e);
            return res.status(500).send({msg: 'Error en el servidor'})
        }
    
    }

    async login(req: Request, res: Response): Promise<any> {

        try {
    
            const pool = await getcon();

            if (!pool)  return res.status(500).send({msg: 'Error del servidor'})
    
            let { nick, contrasena} = req.body;
    
            if (nick == null || contrasena == null) {
    
                return res.status(400).send({ msg : 'No se han llenado los valores correctamente'});
                
            } else {
                
                const result = await getdatosuser(pool, nick)
    
                if (!result)  return res.status(500).send({msg: 'Error del servidor'})
    
                if (result.recordset[0]) {
    
                    const pwv = await bcryptjs.compare(contrasena, result.recordset[0].pw_usuario)
    
                    if (pwv) {
    
                        pool.close()
    
                        return res.status(200).send({token: creartoken(nick), msg: 'Se ha iniciado secion satisfactoriamente', nickname: nick});
                        
                    } else {
                        pool.close();
                        return res.status(200).send({msg: 'La contrasena no coincide'});
                    }
    
                } else {
                    pool.close();
                    return res.status(200).send({msg: 'No se ha encontrado el usuario'});
                }
    
                
    
            }
            
        } catch (error) {
            
            console.error(error);
            return res.status(500).send({msg: 'Error en el servidor'})
    
        }

    }

    async logout(req: Request, res: Response): Promise<any> {

        try {

            const pool = await getcon();

            if (!pool)  return res.status(500).send({msg: 'Error del servidor'})

            const result = await getdatosuser(pool, String(req.user));

            if (!result)  return res.status(500).send({msg: 'Error del servidor'})
        
            if (result.recordset[0]) {
        
                return res.status(200).send({msg: 'Tienes permiso para deslogearte'})
        
            } else {
        
                return res.status(500).send({msg: 'No se encuentra este usuario en la DB'})
        
            }
            
        } catch (error) {

            console.error(error);
            return res.status(500).send({msg: 'Error en el servidor'})
            
        }
        
    }
}

const controlleruser = new Controllersuser()

export default controlleruser