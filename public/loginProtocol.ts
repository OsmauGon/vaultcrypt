import type { UserCredentials } from "../src/pages/EditPage4"



const registerSimulation =( nuevoUsuario :UserCredentials)=>{
    const usuarioAdaptado = {
        ...nuevoUsuario,
        emailList: [nuevoUsuario.emailPrincipal]
    }
    localStorage.setItem("vc-visit",JSON.stringify(usuarioAdaptado))
    sessionStorage.setItem("vc-visit",JSON.stringify(usuarioAdaptado))

}
const loginSimulation =()=>{
    
    const usuarioGuardado = localStorage.getItem('vc-visit')
    if(localStorage && sessionStorage && usuarioGuardado) {
        sessionStorage.setItem('vc-visit', usuarioGuardado)
        
    }
}
const editSimulation =(nuevoUsuario :UserCredentials)=>{
    
    if(localStorage && sessionStorage) {
    localStorage.setItem("vc-visit",JSON.stringify(nuevoUsuario))
    sessionStorage.setItem("vc-visit",JSON.stringify(nuevoUsuario))
    }
}

export const ejecutarSimulacro = (tipo: string, data)=>{
    switch (tipo) {
        case 'login':
            loginSimulation()
            break;
        case 'register':
            registerSimulation(data)
            break;
    
        case 'edit':
            editSimulation(data)
            break;
    
        default:
            break;
    }
}