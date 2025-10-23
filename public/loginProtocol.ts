export const simularLogin = (nuevoUsuario)=>{
    const usuarioAdaptado = {
        ...nuevoUsuario,
        emailList: [nuevoUsuario.emailPrincipal]
    }
    console.log(usuarioAdaptado)
    localStorage.setItem("vc-visit",JSON.stringify(usuarioAdaptado))
}