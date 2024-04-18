import { Socket } from "socket.io";

// Desconectar a un cliente
export const desconectar=(cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log("Cliente desconectado");

    })
}

