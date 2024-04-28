import {Router,Request,Response} from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../clases/grafica';
 
 


export const router=Router();


const grafica=new GraficaData();


router.get('/grafica',(req:Request,res:Response)=>{

    res.json({
        grafica:grafica.getDataGrafica()
    })

});




router.post('/grafica',(req:Request,res:Response)=>{


  const mes=req.body.mes;
  const unidades=req.body.unidades;

  grafica.incrementarValor(mes,Number(unidades));
   
  const server=Server.instance;
 server.io.emit('cambio-grafica',grafica.getDataGrafica());

  res.json({
      ok:true,
      grafica:grafica.getDataGrafica()

       
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

//Obtenr usuarios y sus nombres

router.get('/usuarios/detalle', (req: Request, res: Response) => {
 
   


  
  return res.json({
    ok: true,
    clients: usuariosConectados.getLista()
    
  })

});