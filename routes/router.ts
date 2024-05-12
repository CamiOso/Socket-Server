import {Router,Request,Response} from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { mapa, usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../clases/grafica';
import { MapaGoogleMaps } from '../clases/mapagooglemaps';
 
 


export const router=Router();
const grafica=new GraficaData();

//Google Maps

export const mapaGoogleMaps=new MapaGoogleMaps();
const lugares=[
  {
    id: '1',
    nombre: 'Udemy',
    lat: 37.784679,
    lng: -122.395936,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Bahía de San Francisco',
    lat: 37.798933,
    lng: -122.377732,
    color: '#dd8fee'
  },
  {
    id: '3',
    nombre: 'The Palace Hotel',
    lat: 37.788578,
    lng: -122.401745,
    color: '#dd8fee'
  }
];



mapaGoogleMaps.marcadores.push(...lugares);

router.get('/mapagooglemaps',(req:Request,res:Response)=>{

  res.json(mapaGoogleMaps.getMarcadores());
})

 


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
 




 

router.get('/mapa',(req:Request,res:Response)=>{

  res.json(mapa.getMarcadores());

});







router.get('/grafica', ( req: Request, res: Response  ) => {

  res.json( grafica.getDataGrafica());

});

router.post('/grafica', ( req: Request, res: Response  ) => {

  const opcion   = Number( req.body.opcion );
  const unidades = Number( req.body.unidades );

  grafica.incrementarValor( opcion, unidades );

  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica() );


  res.json( grafica.getDataGrafica() );

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