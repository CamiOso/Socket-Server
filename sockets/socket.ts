import { Socket } from "socket.io";
import * as socketIO from 'socket.io';

// Desconectar a un cliente
export const desconectar=(cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log("Cliente desconectado");

    })
}


//Escuchar Mensajes

export const mensaje=(cliente:Socket,io:socketIO.Server)=>{

    cliente.on("mensaje",(payload:{de:string,cuerpo:string})=>{
     console.log("Mensaje recibo",payload);
     io.emit("mensaje-nuevo",payload);
    })

    

}


//Configurar usuario
export const configurarUsuario=(cliente:Socket,io:socketIO.Server)=>{

    cliente.on("configurar-usuario",(payload:{nombre:string},callback:Function)=>{
     console.log("Configurndo Usuario",payload.nombre);
     callback({
        ok:true,
        mensaje:`Usuario ${payload.nombre}, configurado`
     }
     )
     

    
    })

    

}
