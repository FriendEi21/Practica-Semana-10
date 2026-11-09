# REST API Node.js - Gestión de Productos (Semana 10)

Implementación de un servidor backend moderno aplicando la arquitectura MVC mediante Node.js, Express y MySQL (mysql2/promise). 

## Tecnologías Utilizadas
* **Node.js LTS (20.x)** + **Express.js**
* **MySQL 8** (Connection Pool / Prepared Statements)
* **dotenv** (Gestión de variables de entorno)
* **Postman / REST Client** (API Testing)

## Estructura de Endpoints (Rutas)
Base URL: `http://localhost:3000/api/productos`

| Verbo HTTP | Endpoint | Descripción | Body (JSON) | Status de Éxito |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Lista todos los productos | N/A | `200 OK` |
| **GET** | `/:id` | Retorna un producto específico | N/A | `200 OK` |
| **POST** | `/` | Crea un nuevo recurso | `nombre`, `precio`, `stock` | `201 Created` |
| **PUT** | `/:id` | Actualiza parcial o totalmente | `nombre`, `precio`, `stock` | `200 OK` |
| **DELETE**| `/:id` | Eliminación física del registro | N/A | `200 OK` |

## Notas Técnicas y Seguridad
* Se previenen inyecciones SQL utilizando `pool.execute()` con parámetros posicionales (`?`).
* Las credenciales de acceso se gestionan estrictamente a través de un archivo `.env` ignorado en el control de versiones.
* Las respuestas erróneas manejan códigos de estado HTTP precisos (`400`, `404`, `500`) devolviendo objetos JSON estructurados en lugar de *stack traces* nativos.

*Nota: Las evidencias de ejecución en Postman (Status Codes) se encuentran en el informe técnico adjunto.*