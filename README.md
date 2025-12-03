# Cryptographic Backend "Cryptobruh"

### Por Alexei Romero y Jorge Bello


## Descripción

El presente proyecto es un sistema de encriptado que cuenta con funciones
diversas para la protección de la información. Éste está diseñado con comunicación
con servidores basados en Express en sistemas Node.js.
El sistema cuenta con algunas implementaciones del módulo Crypto
listas para ser utilizadas.
Más adelante se muestra la función central utilizada con fines criptográficos,
una breve descripción de la función, el endpoint necesario para utilizarlo,
los parámetros de entrada y un ejemplo.


## Instrucciones para montar el proyecto

1. Clone el proyecto en la carpeta deseada.


       git clone https://github.com/Alexei-el-Ruso/cryptobro.git


La ubicación de la terminal debe estar en esta carpeta para los siguientes comandos.

2. Instale los paquetes listados en package.json (Utilice un entorno virtual si lo desea)


       npm init -y

       npm install


3. Ejecute la aplicación mediante node.


       node index.js


4. Para probar que la ejecución ha sido exitosa, visite:


       http://localhost:3000


5. Ingrese uno de los endpoints listados a continuación:
   1. http://localhost:3000/api/hash/sha256 para SHA256 
   2. http://localhost:3000/api/hash/argon2 para Argon2
   3. http://localhost:3000/api/encrypt/aes_cbc para encriptado por AES-CBC
   4. http://localhost:3000/api/decrypt/aes_cbc para desencriptado por AES-CBC
   5. http://localhost:3000/api/encrypt/chacha20 para encriptado por ChaCha20
   6. http://localhost:3000/api/decrypt/chacha20 para desencriptado por ChaCha20
   7. http://localhost:3000/api/encrypt/rsa para encriptado por RSA
   8. http://localhost:3000/api/decrypt/rsa para desencriptado por RSA
   9. http://localhost:3000/api/sign/dsa para firmar por DSA mediante un SHA-256
   10. http://localhost:3000/api/verify/dsa para verificar la firma DSA

#### Entradas
Mediante alguna herramienta como Insomnia, Postman o cualquier otro cliente HTTP/HTTPS
(cuerpo de la petición JSON), en cada uno de los endpoint se puede comprobar el funcionamiento,
poniendo como entrada en los casos de hash SHA-256, Argon2, RSA (encriptado) y AES (encriptado):

       {
            "data": "hola"
       }

Mientras que para el desencriptado de RSA y AES:

       {
           "data": "[mensaje encriptado]"
       }

Además, ChaCha20 y DSA requieren de un mensaje y opcionalmente una llave
(retorna localmente la Llave en la consola):

       {
            "message": "hola"
       }

Y para desencriptar el ChaCha20 se requiere de un índice de la lista de
encriptados guardados y la llave utilizada para encriptarla.

       {
            "id": 0,
            "key": "example_key"
       } 

Por otro lado, el DSA requiere de una id de los DSA guardados
y un mensaje para confirmarlo.

       {
            "id": 0,
            "message": hola
       }

#### Salidas

1. Para el caso del SHA-256, con la entrada antes mencionada,
se espera una salida como la siguiente:

    
       "hash": "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"


2. Para el caso del Argon2, se espera la siguiente salida:


       "hash": "a3c429818a5dec348cada81d8eb824761a59bff85124f584d821f97127607e3c70b8c00545bf6afdc34f4ecae3424e0b71c55358b50ac1775d6cfca5fad8e414"


3. Para el caso de la función de AES-256-CBC en la parte del encriptado (/encrypt/aes_cbc)
con la mimsma entrada se espera:


       "encrypted": "rn668T4eXtJp+lwJOgqfiA=="


y si pones esa salida
como entrada para la parte de desencriptación del mismo algoritmo (/decrypt/aes_cbc) te debe
devolver algo como:


       "decrypted": "hola"


4. Para el caso de la función de chaCha20 en la parte del encriptado (/encrypt/chacha20) con
la entrada { "message": "hola" } se espera: [

 
        {
            "nonce": "96fa79c536b143db8a3a306954169d3f",
            "encrypted": "a4034b57"
        }


] y si pones esa salida como entrada para la parte de desencriptación del mismo algoritmo
(/decrypt/aes_cbc) con diferentes entradas, key e id, te debe devolver el mensaje original
que encriptaste

5. Para el caso de la función de AES-256-CBC en la parte del encriptado (/encrypt/rsa)
con la mimsma entrada se espera:


        "encrypted": "MCvn5ntyAm9QnBqGnDEIvaGWIQjtdLNdckbJRCTWEzIAFrJXjaSWfengOZfnlM20+5bNoohi+53NNDrq9CGb5/2HF/MzROJ5IsLzoXmOw9XygnUucinxrwFYQ5Y3e9LTScP74oWJnSF066JFho9EKIpx/Z2sZRid2zOx2BtfR9xsiih6XQJxOAjeyjj+22IvU8J11BpcJ7UcpF/btChMlqCWTxVwSvaBFbERgDL8MQrCT01oF274NgJ3rTKccNUXwuUNqN1c2btvzpILjaNK+xxV30FXvNFAHZZoCiRiIIAKtlDeHIHs7S0r1jzmnzJwL9dwCX+L+pY25M1nIE3fdg=="


y si pones esa salida como entrada para la parte de desencriptación del mismo algoritmo
(/decrypt/rsa) te debe devolver algo como:

    
        "decrypted": "hola"


6. Para el caso de la función de DSA en la parte del encriptado (/sign/dsa) con la
mimsma entrada que en el punto d se espera: [

    
        {
            "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIDQzCCAjYGByqGSM44BAEwggIpAoIBAQCcZqqW2EEZ/13/xudzKQmIMuL0VbbB\naxgV0YFRz7cDbS8KPcwLFTh++7iBJaZ0YMIlqB/9qOC1BXZJzzBZ+oRbgrz/X6+y\nDei91JllgAFacAG7sLVui4VW5/RkmwzhJAN4kr10LIaoVPTip0pU+eIXdkQJ15Nv\nx40KgxNdMs7ZTysomg7jTgMIJXe7xxlAPaRoM6g8/s4utr1hGQBeydDNM+wRFDGg\n6qc+KVAHbJwoDeErJomVehaqvxw5XTn98KOamPmqe6JlXYfpeCVPDbyCNxC1TNAL\nHN6PoYWU6ixGM4eXCwgIVGmPj/WVZOv+PjUmgbMlDm1uohosPh49lNtLAh0AtiTQ\nuuSx9u/4UsemxZ/JQNfvAZZjHZsF6y3XpwKCAQEAl/7QpUct2tUJ5uKp9wrivBym\nHYnpHrMlqAJ16JGhuaPufM//LMz7vGugQ2ycdFIK/J/SBL8Y02GEcYVW4dSGMUQL\n8j9/VHPTHLrNy7jSD9OihMf0ibl/zaRxd7vchf0mSuHnVznqFY1awvmNPgTmtIX3\nb3h09vXuYFs44ohs4xHyvFC5eSpoEOtzWzSOFssSVX5Ew4cppda9RjXsXd+3tRzc\nx4h82SPaJsZ6Ni05qlELES+lx9Ai+dc4NEdMAVUbDSJV+3iX0ihsxd8pOYYmfmWP\nb5w7hExuZ0YV7CDmM8nZ6IyvQrfKogXd0PVj3iUmCYt98r6oI21bQ2mDnkvEIAOC\nAQUAAoIBADJnlSm8B8wsvusVFA1ZvOHf1Osru1p/qE/ieNbRmmUaJ2A8RXQEgx+s\nWvJAxXPQ7fqG0NDWSks/56irrIIhPNNtwYLBbE4q5IFCek3THL++Ib0qVhghdm4H\n/KebJQWrCHMnFV63KtLEyG73jCl3gBoUebaHrWTdxjkwg3X2diYU6noUFD4ubSW/\nULSL9G9DtrHloWzBywrYcCpbD94mHLYztZ5y+CTPScIHl0ENuUsY1LLxjrP3/QPY\nGiOIJgJ9/bwc9EaioOz86sW0rq/DZpbaDBB3yZwdfX7jdIkSyJmLIpirQoH3q6qp\nqGQFnc+3hiLHXnT+xjEvmwZoXi10OXs=\n-----END PUBLIC KEY-----\n",
            "signature": "MD0CHD89ZRy1K+uMiAjdQ3gfpFAy9pEolkVgVSb6DwsCHQCquAEW4ku8Dhl65xV7Lky5hlXpyeL9r2Fo1gaC"
        }


   ] y para utilizar el endpoint (/verify/dsa) tienes que devuelve una evaluación del mensaje,
   si es el mismo que se utilizó para crearla. 

## Breve explicación de las características de cada endpoint

La implementación de los diversos algoritmos ofrecen fortalezas y debilidades cada uno, en el caso del SHA-256 te devuelve una cadena alfanúmerica del mismo tamaño sin importar cuantos caracteres pusiste como entrada, al ser una función Hash cuando te da la encriptación no puedes deshashearlo, incluso las mejores computadoras tardarían años para lograr algo así, también de que es díficil crear una colisión, osea que 2 mensajes ditintos produzcan la misma cadena de carácteres.

 En el caso de Argon2, el objetivo no es simplemente convertir un mensaje en una cadena hexadecimal para codificarlo, sino hacer que este proceso sea costoso para un atacante. A diferencia de un hash rápido como SHA-256, Argon2 te devuelve un resultado lento de producir pero rápido de verificar, usando memoria, múltiples iteraciones y paralelismo para bloquear ataques de fuerza bruta.  Además de ser irreversible debido a que es una función hash, Argon2 incorpora una sal aleatoria, lo que evita que hashes iguales se produzcan a partir de contraseñas iguales.

 ChaCha20 y RSA son respuestas a diferentes requerimientos de la seguridad. RSA opera con un par de llaves: una pública y otra privada; su potencia radica en que es prácticamente imposible factorizar números muy grandes, lo que posibilita el intercambio de información sin la necesidad de haber compartido antes un secreto. ChaCha20, por otro lado, emplea únicamente un nonce y una llave para producir un flujo cifrado veloz y eficaz a través de operaciones lógicas y aritméticas que lo vuelven difícilmente predecible. ChaCha20 es más apropiado que RSA para cifrar grandes cantidades de información debido a su rapidez y a que el coste computacional es menor. Por otro lado, RSA es idóneo para compartir claves y garantizar la identidad.

 Aunque RSA y DSA son algoritmos asímetricos. RSA es capaz de cifrar y firmar al mismo tiempo, utilizando la dificultad para factorizar números enteros grandes; su flexibilidad lo convierte en una herramienta útil para la autenticación e intercambio de llaves. Por el contrario, DSA se ha creado solamente para firmas digitales y se basa en el problema del logaritmo discreto; ofrece firmas más livianas, pero no tiene la capacidad de cifrado. En la práctica, RSA es más versátil y se usa más ampliamente, mientras que DSA se centra en firmar de manera eficiente, aunque para conservar su seguridad depende en mayor medida de una adecuada generación de números aleatorios.
