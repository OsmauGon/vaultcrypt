# VaultCrypt2 🔐

Rebuild estratégico de VaultCrypt, enfocado en seguridad, escalabilidad y coherencia emocional en la experiencia de usuario.
## Objetivo
Reconstruir desde cero, migrando solo lo que esté alineado con los nuevos estándares técnicos y narrativos.

## Dia 1: hemos decidido empezar el proyeto desde cero para volver a tener nocion de lo que estoy construyendo. Creamos el vite y descargamos las siguientes cosas que usaremos
- React + Vite + TypeScript
- MUI
- React Hook Form
- Zod
- React Router DOM

## Dia 2: Hoy quiero crear el "frame" de la pagina, es dcir que voy a crear y añadir los componentes header, main y footer que conforman el layout de la pagina (los componentes siempre visibles). Tambien voy a crear los componentes de las paginas con mensajes que las identifiquen a cada una y agregare algunnos estilo para que la pagina se vea en modo oscuro. 
Primero se creo la carpeta LAYOUT que va a contener los tres componentes principales (Header, Main y Footer), luego de usar rafc en ellos los exporto para ser importados el el archivo AppLayout.tsx que sera exportado hacia App.tsx.
Segundo vamos a agregar los estilos primarios para hacer que la pagina se vea con tema oscuro. Para esto se crea la carpeta THEMES y el archivo darkTheme.ts el cual tiene los parametros del darkTheme de Mui Material. En main.tsx voy a importar al objeto darkTheme del archivo darkTheme.ts y usare una etiqueta <ThemeProviver theme=darkTheme><ThemeProviver> para contener a <App> y asi tener el tema del dark mode disponible en toda la pagina. Finalmente metimos los componentes de layout dentro de un componente Box para poder darles un displey flex y podamos meter el contenido del Main.tsx dentro de un componente Container que tenga un flex-grow 1 y quedarme tranquillo de qe el main siempre tenga todo el height sobrante disponible
Tercero vamos a crear la carpeta PAGES que va a contener a los componentes paginas (Home, Historial, Search, Encrypt y Login) con un rafc cada uno. Lo que sigue es integrar react-router-dom al proyecto, asique en main.tsx vamos a importar el importantisimo componente <BrowserRouter> y vamos a hacer que contenga a <App>. En <App> vamos a importar las etiquetas Routes y Route para qeu podamos usarlas dentro de la etiqueta <AppLayout>. De esta manera Main.tsx ya no necesita lógica propia: su rol es visual, y el contenido se gestiona desde App.tsx con rutas, cada página (Home, Search, etc.) se renderiza dentro de Main, que a su vez está envuelto por AppLayout gracias al {children}.
Cuarto creamos los enlaces en Header.tsx para navegar entre las paginas"

## Dia 3: Hoy vamos a trabajar en HomePage

 Para empezar hoy vamos a trabajar en HomePage. El objetivo de esta pagina es recibir al usuario e introducirlo en el proyecto. Como me voy a orientar en uqe sea visto por un reclutador o un cazatalentos es impertivo responder las preguntas ¿Qué es esto? ¿Qué problema resuelve? y ¿Por que lo usaria?. Hicimos los trabajos del Home.tsx y creamos la carpeta STYLES con su primer archivo homePage.css con el fin de darle responsividad a HomePage

## Dia 4: Hoy vamos a trabajar en LoginPage, integrear react-hook-form, zod y crear el hook formSubmit

Para empezar a crear la carpeta SCHEMA, y su finalida es almacenar en archivos escalables los esquemas que usaremos para a la hora de validar formularios con zod. Primeramente dentro de esta nueva carpeta vamos a crear el archivo loginSchema.ts. Sabemos que a la hora de loguear un usuario vamos a solicitarle el email y la contraseña, y eso mismo va a conformar el esquema que vamos a exportar.
Lo siguiente es crear el hook useFormSubmit para eso crearemos la carpeta HOOKS y dentro el archivo formSubmit.ts. Aqui estara el hook que usaremos cuando  se envie al backend el formulario de login, nuevo registro, editar registro nueva cuenta y editar cuenta. He tomado la logica en formSubmit.ts del proyecto VaultCrypt1 y la he adaptado para pegarla en formSubmit.ts del proyecto VaultCrypt2. Debido a que la primero de las 2 encriptaciones que hace el proyecto esta en este hook tambien tomare la carpeta UTILS del proyecto VaultCrypt1 que contiene el archivo encryption.ts y lo pegare en VaultCrypt2 para tener la funcion encriptadora displonible para el hook formSubmit. Es importante aclarar que en encryption.ts se usa la libreria crypto-js asique debemos instalarla junto con su  tipado para trabajar con TypeScript. He agregado la propiedad "method" dentro del formSubmit para uqe se varie el metodo a usar seguin el componente (login/get, register/post y edit/put o patch)
Ya tenemos un formulario de logueo funcional y que muestra un mensaje de exito
Lo que sigue es crear el formulario de registro (para crear un nuevo usuario) y el formulario de edicion (para uqe un usuario edite sus datos). Cada formulario requiere un esuqema de zod para validaar nombre, email, clave y palabra secreta. Solo editSchema permitira agregar emails alternativos. Crearemos 2 nuevas paginas: RegisterPage y EditPage para contener los formularios respectivos pero en EditPage importaremos "useFieldArray" de react-form-hook pero por multiples uqejas se decidio cambiar a usar useState y ya.

RegisterPage y EditPage ya estan construidos y funcionando. Falta probarlos bien

## Dia 5: Hice 4 versiones de EditPage porque las primeras 3 no me convecian. La ultima que esta en vigencia es la que mas me gusta siendo que es una que combina todo lo estetico de mui material con cosas que si entiendo. 
En EditPage 3 use codigo que no conocia lo que me hace perderme en la costruccion de la App.
Lo hice en dos partes: primero EditPage4 que importa al componente EditForm que cree dentro de la carpeta COMPONENTES. EditPage4 usa un useState para setear a un objeto que va a servir como usuario simulado y luego se declara un useEffect paara poner al usuario Juan en el useState. Luego el componente funcional de EditPage retorna la importacion de EditForm.
En EditForm declare dos useState: uno que almacene las credenciales iniciales del usuario logueado (initualUser) y otro que sea exactamente igual, excepto por los campos modificados en el formulario. Con el hook enviara la solicitud correspondiente.
Este ha sido hasta ahora el componente mas problematico pero creo que he logrado que haga todo lo uqe quiero y como lo quiero.



Hoy establecimos el contexto global del usuario logueado. Se creo la carpeta CONTEXTOS y dentro los archivos UsaurioContext y UsuarioProvider. En el primero declaramos y creamos el contexto y en el segundo lo aplicamos a los children. Se desarrollo de manera que al iniciar la pagina VaultCrypt se haga una solicitud fetch mandando un token en el localStorage para iniciar la sesion autaticamente. En caso de que de no haya un token guardado en el localStorage se logueara a un usuario por defecto. Por ultimo se creo en la carpeta HOOKS el hook useUsuario.ts para poder llamarlo y desestructurarlo desde cualquier lugar


## Dia 6:Lo que hice fue Trabajar en Header.tsx, sus links deben ser dinamicos (login debe verse solo cuando no hay un usuario loguead, de lo contrario debe verse Edit), mostrar un saludo al usuario logueado y trabajar en la responsividad. Tambien en Footer.tsx para que se muestre el link a mi porfolio

## Dia 7:  Tome todo lo relacionado con EncryptPage de VaultCrypt1 y lo pegue en VaultCrypt2 (EncryptPage, NewAccountForm y account-form.css) y ya esta adaptado y funcionando.
Ahora vamos a trabajar en HistorialPage y SearchPage. Antes usabamos un contexto global para tener la lista de cuentas creadas por el usuario pero he decidido cambiar eso por  un useState y un useEffect que haga la solicitud fetch cada vex que se cargue el componente. Para empezar voy a obtener la simulada de el archivo arch.txt que guardare en la carpeta PUBLIC

Tome el codigo de HistorialPage y SearchPage de VaultCrypt1 y lo adapte al funcionamiento de VaultCrypt2 addemas de agregarle responsividad. Ambas ya estan funcionales

## Dia 8: Adaptamos el esquema de zod para Register.tsx para hacer que al crear un usuario nuevo se lo cree con el rol de visit o visitante para hacer pruebas. En UsuarioProvider modificamos el primer useEffect para revice el localStorage. Si hay un item "vaultcrypt-token" lo tomara para iniciar la sesion, si no iniciara sesion de un usuario por defecto (Juan). Si no hay un item 'vaultcrypt-token' pero si un item 'vc-visit' se logueara al usuario almacenado en ese token .
Se creo en archivo loginProtocol.ts para declarar una funcion que tome el formData enviado en el hook formSubmit y lo adapte como un usuario recibido del backend y lo guarde en el localStorage con el item 'vc-visit'. La idea es que al hacer login, register o edit se use la fucnion de loginProtocol para simular correctamente el funcionamiento de dichos componentes
Lo que sigue hacer es adaptaro todo a un solo idioma poruqe el zod esta hecho con las propidades en ingles y otros estan hechos con las propiedades en castellano. Habra que reemplazar nombre por name, contraseña por password, etc.

Hicimos intentos de disñar protocolos de funcinamiento para la simulacion de un backend (al registrar un usario se guarde en el localStorage, se muestre la nueva cuenta luego de ser enviada) y se han encontrado errores en el funcionamiento del todo el sistema los cuales se veran el dia siguiente

## Dia 9: Del dia anterio se plantearon los siguiente problemas EditPage puede enviar correos electronicos vacios y no se puede cambiar el nombre de usuario ni el email principal ni la contraseña ni la palabra secreta
El seteo de sesionStorage y localStorage de el archivo loginProtocol funcionan bien pero falta lograr que a hacerse el seteo seactualice el estado global de Usuario
Se han resulto todos los errores de EditPage y falta agregar que la funcion que agrega un nuevo input a la lista de emailsSecundarios no agregue uno nuevo si el anterior esta vacio.
Se resolvio el flujo del localStorage y sesionStorage con el detalle de que en el login al dar credenciales erroneas aunque falle el logueo del sesionStorage y localStorage dice "logueo exitoso"

Logre hacer que si hay un input de email vacio no se pueda agregar unno mas y sumado a que no se puedan enviar emails vacios entonces me quedo trankilo que de que EditPage esta completo
Perfeccione el logueo correcto y el incorrecto para una simulacion adecuada (si las credenciales enviadas solo en el login coinciden con las de localStorage se muestra el mensaje de usuario no encontrado)
Agregue el boton de logout y su funcionamiento correspondiente ya esta operando a la Perfeccione


## Dia 10: Quise hacer el componente que muestre la cuenta encriptada al usuario logueado, pero encontre que al hacer submit en EncryptPage el formulario queda presente en lugar de mostrar si hubo exito o no. Lo que sucede es que no los componentes no llegan a actualizarce segun cambia el queryStatus al igual que sucedia en VaultCrypt1 y tube que rendirme. Para resolver esto reconstrui a EditPage de manera que ya no muestre el formalario o los mensajes de resolucion, sino que directamente muestre al componente NewAccountForm o al componente RequireAuthNotice. Luego modifique a NewAccountForm en manera que al igual que LoginPage o RegisterPage si muestre el formulario o los mensajes de resolucion. Ahora el funcionamiemto entrero de EncryptPage es adecuado y optimo a lo que tenia en mente
## siguiente dia: armar un componente que muestre la encriptacion de una nueva cuentadi diciendo "asi se guardara su cuenta" y dejando claro que el backend aun no esta disponible. Seria ideal que historial no este visible hasta que el backend este disponible

Falta hacer: 
Mejorar la estetica que encuadra a las page
registerSchema cambiar "visit" por "user" Cuando el backend este listo
eleminar usuario por defecto Juan el UsuarioProvider
ajustar los endopoins para comunicarse con el backend
