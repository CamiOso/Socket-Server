import {Router,Request,Response} from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
 
 


export const router=Router();

router.get('/mensajes',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        mensaje:"Todo esta Bien"
    })

});

 

router.post('/mensajes',(req:Request,res:Response)=>{


    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const payload={de,cuerpo};
    const server=Server.instance;
    server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok:true,
        cuerpo,
        de
    })

});

router.post('/mensajes/:id',(req:Request,res:Response)=>{


    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const id=req.params.id;


    const server=Server.instance;
    server.io.in(id).emit('mensaje-privado',{de,cuerpo});



    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })

});

//Servicio para obtener todos los IDs de los usuarios


router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.fetchSockets()
    .then( (clients: any[]) => {
      if(clients.length > 0){
        let data: string[] = [];
        clients.forEach((e)=>{
          console.log(e);
          data.push(e.id);
        })       
 
      return res.json({
        ok: true,
        clients: data
        
      })
 
      }else{
        return res.json({
          ok: false,
          clients: []
          
        })
      }
 
    })
    .catch((err) => {
      return res.json({
        ok: false,
        err
      })
    })
  
});