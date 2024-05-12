import express from 'express';
import { SERVER_PORT } from '../global/environment';
import * as socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
 ;


export default class Server {

    private static _intance:Server;
    public app:express.Application;
    public port:number;
    public io: socketIO.Server;
    private httpServer:http.Server;


    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer=new http.Server(this.app);
        this.io=new socketIO.Server(this.httpServer,{ cors: { origin: true, credentials: true } });
        this.escuharSockets();

    }

    public static get instance(){
      return this._intance || (this._intance=new this());
    }


    private escuharSockets(){
    console.log("Escuchando conexiones -sockets");
    this.io.on('connection',cliente=>{
        console.log(cliente.id);


        // Mapas

        socket.marcadorNuevo(cliente);

        //Conectar Cliente

        socket.conectarCliente(cliente,this.io);


        //Configuracion de Mapas
        socket.mapaSockets(cliente,this.io);


        //Configurar Usuario
        socket.configurarUsuario(cliente,this.io);

        //Obtener Usuarios Activos
        socket.obtenerUsuarios(cliente,this.io);

      //Mensajes
      socket.mensaje(cliente,this.io);


        //Desconectar
        socket.desconectar(cliente,this.io);

      
    })
    }

    start(callback:any) {
        this.httpServer.listen(this.port,callback);
    }

}