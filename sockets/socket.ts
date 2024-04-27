import { Socket } from "socket.io";
import * as socketIO from 'socket.io';
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

// Desconectar a un cliente


export const usuariosConectados=new UsuariosLista();

export const conectarCliente=(cliente:Socket,io:socketIO.Server)=>{

    const usuario=new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
   
    

}

export const desconectar=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('disconnect',()=>{
        console.log("Cliente desconectado");

        usuariosConectados.borrarUsuario(cliente.id);
        io.emit("usuarios-activos",usuariosConectados.getLista());


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
    
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        io.emit("usuarios-activos",usuariosConectados.getLista());
     callback({
        ok:true,
        mensaje:`Usuario ${payload.nombre}, configurado`
     }
     )
     

    
    })

    

}


//Obtener Usuarios

export const obtenerUsuarios=(cliente:Socket,io:socketIO.Server)=>{

    cliente.on("obtener-usuarios",()=>{
        
        io.to(cliente.id).emit("usuarios-activos",usuariosConectados.getLista());
    })

    

}
