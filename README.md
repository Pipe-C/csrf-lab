
# 🛡️ Laboratorio de Falsificación de Peticiones en Sitios Cruzados (CSRF)

Entorno web interactivo diseñado para **simular ataques de Cross-Site Request Forgery (CSRF)** y demostrar cómo un atacante puede intentar ejecutar acciones no autorizadas utilizando la sesión de un usuario autenticado.

El laboratorio presenta un escenario vulnerable y una implementación protegida mediante **Anti-CSRF Tokens**, encabezados HTTP personalizados y validaciones del origen de las peticiones.

El proyecto se desarrolla como una práctica académica de **Seguridad Informática y Desarrollo Seguro**, tomando como referencia **ISO/IEC 27001:2022 — Control A.8.28 (Desarrollo Seguro / Secure Coding)**.

> **Propósito:** comprender el funcionamiento de CSRF, analizar sus riesgos y aplicar medidas de desarrollo seguro para mitigar este tipo de vulnerabilidades.

---

## 🛠️ Tecnologías

| Tecnología                 | Uso                                                   |
| :-------------------------- | :---------------------------------------------------- |
| **Node.js / Express** | Servidor backend, gestión de sesiones y API REST     |
| **React 18**          | Desarrollo de la interfaz web                         |
| **Vite**              | Herramienta de construcción y servidor de desarrollo |
| **Tailwind CSS v4**   | Estilos y diseño de la interfaz                      |
| **Lucide React**      | Iconografía de la aplicación                        |

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Pipe-C/Laboratorio-CSRF.git
cd Laboratorio-CSRF
```

### 2. Iniciar el Backend

Abre una terminal y ejecuta:

```bash
cd backend
npm install
npm run dev
```

### 3. Iniciar el Frontend

Abre una **segunda terminal** y ejecuta:

```bash
cd frontend
npm install
npm run dev
```

Una vez iniciados ambos servicios, utiliza la dirección proporcionada por Vite para acceder a la interfaz del laboratorio.

---

## 🛡️ Escenarios del Laboratorio

El laboratorio está dividido en diferentes escenarios para comparar una implementación vulnerable con una implementación que incorpora medidas de protección.

### 1. 🔓 Modo Vulnerable

Este escenario demuestra un vector de ataque **CSRF** en el que el servidor confía en las cookies de sesión autenticadas que el navegador envía automáticamente.

El flujo del ataque es:

```text
Atacante
   │
   ▼
Página maliciosa (exploit.html)
   │
   ▼
Víctima visita la página
   │
   ▼
Petición automática hacia la API
   │
   ▼
Navegador incluye las cookies de sesión
   │
   ▼
Servidor procesa la petición
   │
   ▼
Cambio de información sin validación CSRF
```

En este escenario:

- El atacante aloja una página maliciosa externa.
- La página contiene una petición dirigida al backend.
- La víctima visita dicha página mientras mantiene una sesión autenticada.
- El navegador puede incluir automáticamente las cookies asociadas a la sesión.
- El servidor procesa la petición sin comprobar que provenga de una acción legítima del usuario.

El objetivo es demostrar por qué la autenticación basada únicamente en cookies no es suficiente para proteger determinadas operaciones contra CSRF.

---

### 2. 🔐 Modo Seguro — Anti-CSRF Token

El modo seguro incorpora **tokens Anti-CSRF** para validar que las peticiones que modifican información fueron generadas desde el contexto legítimo de la aplicación.

El flujo de validación es:

```text
Servidor genera Token CSRF aleatorio
             │
             ▼
Cliente obtiene y almacena el Token
             │
             ▼
Petición POST con encabezado X-CSRF-Token
             │
             ▼
Servidor valida el Token
             │
             ▼
¿Token válido?
       │             │
      Sí             No
       │             │
       ▼             ▼
Procesar         Rechazar
petición         solicitud
```

El servidor valida la coincidencia entre el token enviado por el cliente y el token asociado a la sesión.

Las páginas externas no pueden obtener legítimamente el token desde el contexto protegido de la aplicación debido a las restricciones establecidas por la **Same-Origin Policy (SOP)**.

---

## 📊 Matriz ISO/IEC 27001:2022

El laboratorio se relaciona con el **Control A.8.28 — Secure Coding (Desarrollo Seguro)** de ISO/IEC 27001:2022.

| Campo                          | Registro técnico                                                                    |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| **ID de Vulnerabilidad** | `VULN-CSRF-2026-02`                                                                |
| **Nombre**               | Cross-Site Request Forgery (CSRF) en modificación de perfil                         |
| **Control ISO**          | A.8.28 — Desarrollo Seguro (Secure Coding)                                          |
| **Severidad**            | Alta — CVSS v3.1: 7.5                                                               |
| **Solución Aplicada**   | Implementación de Anti-CSRF Tokens y validación mediante encabezados HTTP          |
| **Objetivo**             | Demostrar el riesgo de peticiones no autorizadas y aplicar controles de autenticidad |
| **Contexto**             | Laboratorio académico de Seguridad Informática                                     |

---

## 🔐 Controles de Seguridad Implementados

### Anti-CSRF Tokens

Generación de tokens únicos asociados a la sesión para validar que la petición procede del contexto esperado.

### Encabezados HTTP Personalizados

Las peticiones con efectos secundarios requieren el encabezado:

```http
X-CSRF-Token: <token>
```

Este mecanismo se aplica a operaciones como:

- `POST`
- `PUT`
- `DELETE`

### Protección de Sesión

El laboratorio utiliza mecanismos de aislamiento de sesión y validaciones de los orígenes permitidos para reducir la posibilidad de que una petición externa sea aceptada.

### Desarrollo Seguro

La implementación sirve como ejemplo práctico de controles técnicos relacionados con prácticas de **Secure Coding** y desarrollo seguro.

---

## 🎯 Objetivos de Aprendizaje

Al finalizar el laboratorio, el estudiante podrá:

- Identificar una vulnerabilidad de **Cross-Site Request Forgery (CSRF)**.
- Comprender el riesgo asociado al envío automático de credenciales y cookies por parte de los navegadores.
- Comprender el funcionamiento de la **Same-Origin Policy (SOP)**.
- Implementar validaciones mediante **Anti-CSRF Tokens** en arquitecturas cliente-servidor.
- Comparar una implementación vulnerable con una implementación protegida.
- Comprender la función de los encabezados HTTP personalizados en mecanismos de protección.
- Relacionar controles técnicos de seguridad con prácticas de desarrollo seguro.
- Analizar el impacto de una vulnerabilidad y las medidas necesarias para mitigarla.

---

## 📁 Estructura del Proyecto

```text
csrf-lab/
├── backend/
│   ├── server.js
│   └── package.json
│
├── exploit/
│   └── exploit.html
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

### Componentes principales

- **`backend/`**: contiene el servidor Express y la lógica relacionada con las sesiones y la API.
- **`exploit/`**: contiene el escenario utilizado para demostrar el comportamiento de una petición CSRF.
- **`frontend/`**: contiene la interfaz interactiva desarrollada con React.
- **`README.md`**: documentación técnica y académica del laboratorio.

---

## 🔄 Comparación de Escenarios

| Característica                              | Modo Vulnerable | Modo Seguro |
| :------------------------------------------- | :-------------: | :---------: |
| Sesión mediante cookies                     |       ✅       |     ✅     |
| Validación Anti-CSRF                        |       ❌       |     ✅     |
| Token CSRF                                   |       ❌       |     ✅     |
| Encabezado`X-CSRF-Token`                   |       ❌       |     ✅     |
| Validación de la petición                  |     Básica     |  Reforzada  |
| Demostración de ataque CSRF                 |       ✅       |     ❌     |
| Protección contra peticiones no autorizadas |       ❌       |     ✅     |

---

## ⚠️ Uso Responsable

Este proyecto está diseñado **exclusivamente para fines educativos y de laboratorio**.

Las pruebas deben realizarse únicamente:

- Sobre entornos propios.
- En máquinas destinadas para prácticas.
- Sobre aplicaciones de laboratorio.
- En sistemas para los que se tenga autorización explícita.

No se debe utilizar el laboratorio para realizar pruebas contra sistemas, aplicaciones o usuarios sin autorización.

---

## 👨‍💻 Autor

**Felipe Cano**

**Seguridad Informática**
**Institución:** I.U. Pascual Bravo
**Año:** 2026

---

## 📄 Licencia

Este proyecto se desarrolla con fines académicos.

Consulta el archivo `LICENSE` del repositorio para conocer los términos específicos de uso y distribución.
