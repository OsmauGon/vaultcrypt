
import type { UsuarioLogueado } from "../src/contextos/UsuarioContext";
import type { Cuenta } from "../src/pages/Historial";



function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const accountSimulator = (usuario: UsuarioLogueado, lista :Cuenta[]) =>{
    
                const nuevaLista2 = lista.map((cosa: Cuenta) => ({
                    ...cosa,
                    accountDescription: "Ejemplo de descripcion de cuenta",
                    userName: usuario.name,
                    userEmail: usuario.emailPrincipal.length > 0 
                                                ? usuario.emailList[Math.round(getRandomArbitrary(0,25)) % usuario.emailList.length] 
                                                : usuario.emailPrincipal
                    }));
                
    return nuevaLista2

}