importar  {
  getAuth ,
  getFirestore
}  de  "../lib/fabrica.js" ;
importar  {
  getString ,
  muestraError
}  de  "../lib/util.js" ;
importar  {
  muestraAlumnos
}  de  "./navegacion.js" ;
importar  {
  tieneRol
}  de  "./seguridad.js" ;

const  daoAlumno  =
  getFirestore ( ) .
    colección ( "Alumno" ) ;
const  params  =
  nueva  URL ( ubicación . href ) .
    searchParams ;
const  id  =  params . obtener ( "id" ) ;
/ ** @type {HTMLFormElement} * /
const  forma  =  documento [ "forma" ] ;

getAuth ( ) . onAuthStateChanged (
  protegido ,  muestraError ) ;

/ ** @param { importar (
    "../lib/tiposFire.js").User}
    usuario * /
 función  asíncrona protege ( usuario )  {
  if  ( tieneRol ( usuario ,
    [ "Administrador" ] ) )  {
    busca ( ) ;
  }
}

/ ** Busca y muestra los datos que
* correspondencia al id recibido. * /
 función  asíncrona busca ( )  {
  prueba  {
    const  doc  =
      aguardar  daoAlumno .
        doc ( id ) .
        obtener ( ) ;
    si  ( doc . existe )  {
      / **
       * @type {
          importar ("./ tipos.js").
                  Alumno} * /
       datos  constantes =  doc . datos ( ) ;
      forma . matrícula . valor  =  datos . matrícula ;
      forma . nombre . valor  =  datos . nombre  ||  "" ;
      forma . telefono . valor  =  datos . telefono  ||  "" ;
      forma . grupo . valor  =  datos . grupo  ||  "" ;
      forma . fecha . valor  =  datos . fecha  ||  "" ;
      forma . addEventListener (
        "enviar" ,  guarda ) ;
      forma . eliminar .
        addEventListener (
          "clic" ,  elimina ) ;
    }  más  {
      lanzar  nuevo  error (
        "No se encontró". ) ;
    }
  }  captura  ( e )  {
    muestraError ( e ) ;
    muestraAlumnos ( ) ;
  }
}

/ ** @param { Evento } evt * /
 función  asíncrona guarda ( evt )  {
  prueba  {
    evt . preventDefault ( ) ;
    const  formData  =
      new  FormData ( forma ) ;
    const  matricula  =  getString (
        formData ,  "matricula" ) . recortar ( ) ;  
    const  nombre  =  getString ( formData ,  "nombre" ) . recortar ( ) ;
    const  telefono  =  getString ( formData ,  "telefono" ) . recortar ( ) ;
    const  grupo  =  getString ( formData ,  "grupo" ) . recortar ( ) ;
    const  fecha  =  getString ( formData ,  "fecha" ) . recortar ( ) ;
    / **
     * @type {
        importar ("./ tipos.js").
                Alumno} * /
    const  modelo  =  {
      matrícula , 
      nombre ,
      telefono ,
      grupo ,
      fecha
    } ;
    aguardar  daoAlumno .
      doc ( id ) .
      set ( modelo ) ;
    muestraAlumnos ( ) ;
  }  captura  ( e )  {
    muestraError ( e ) ;
  }
}

 función  asíncrona elimina ( )  {
  prueba  {
    si  ( confirmar ( "Confirmar la"  +
      "eliminación" ) )  {
      aguardar  daoAlumno .
        doc ( id ) .
        eliminar ( ) ;
      muestraAlumnos ( ) ;
    }
  }  captura  ( e )  {
    muestraError ( e ) ;
  }
}
