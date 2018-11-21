# EA_backend

#para pasar los typeScript a java Sript ( cada vez que modifiquemos alguna linia volvemos a llamar el comando),
#cuando nos diga 0 errores, Crt+C y s de si.
#yarn ts

#Luego para arrancar ( es server pork lo hemos declarado en el package.json )
#yarn server

#Para Actividad
#http://localhost:3000/actividades/
{
    "titulo": string,
    "descripcion": string,
    "estrellas": number,
    "tags": string[],
    "propietario": string,
    "clientes": number[] referencia a tabla User
    "ubicacion": string,
    localizacion: number[]
}

#Para Usuario
#http://localhost:3000/users/
{
    "nombre": string,
    "apellido": string,
    "nick": string,
    "email": string,
    "estrellas": number,
    "password": string,
    "imagen": path string,
    "tags": string[],
    "actividadesPropietario": [] de id referencia a Actividad,
    "actividadesCliente": [] de id referencia a Actividad
}

