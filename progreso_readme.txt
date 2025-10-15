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
Cuarto creamos los enlaces en Header.tsx para navegar entre las paginas

 
