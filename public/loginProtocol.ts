import type { UserCredentials } from "../src/pages/EditPage4"



const registerSimulation =( nuevoUsuario :UserCredentials)=>{
    const usuarioAdaptado = {
        ...nuevoUsuario,
        id: 1,
        emailList: [nuevoUsuario.emailPrincipal]
    }
    localStorage.setItem("vc-visit",JSON.stringify(usuarioAdaptado))
    sessionStorage.setItem("vc-visit",JSON.stringify(usuarioAdaptado))

}
const loginSimulation =(data: UserCredentials)=>{
    
    const usuarioGuardado = localStorage.getItem('vc-visit')
    if(localStorage && sessionStorage && usuarioGuardado) {
        if(data.emailPrincipal === JSON.parse(usuarioGuardado).emailPrincipal && data.password === JSON.parse(usuarioGuardado).password){
        sessionStorage.setItem('vc-visit', usuarioGuardado)
        }
        else console.log(sessionStorage.getItem('vc-visit'))
        
    }
}
const editSimulation =(nuevoUsuario :UserCredentials)=>{
    
    if(localStorage && sessionStorage) {
    localStorage.setItem("vc-visit",JSON.stringify(nuevoUsuario))
    sessionStorage.setItem("vc-visit",JSON.stringify(nuevoUsuario))
    }
}

export const ejecutarSimulacro = (tipo: string, data :string)=>{
    const data2 :UserCredentials = JSON.parse(data)
    switch (tipo) {
        case 'login':
            loginSimulation(data2)
            break;
        case 'register':
            registerSimulation(data2)
            break;
    
        case 'edit':
            editSimulation(data2)
            break;
    
        default:
            break;
    }
}