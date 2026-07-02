# Orders App — SAPUI5 + SAP CAP + Fiori Elements

Aplicación full-stack para gestión de órdenes construida con **SAPUI5** y **SAP Fiori Elements** en el frontend y **SAP CAP (Cloud Application Programming Model)** en el backend. Proyecto creado con fines de aprendizaje y portfolio para desarrollo SAP/Fiori.

---

## Stack tecnológico

- **Frontend (app manual):** SAPUI5 1.120.0, patrón MVC, OData v4
- **Frontend (Fiori Elements):** SAP Fiori Elements, Fiori Launchpad local (FLP Sandbox)
- **Backend:** SAP CAP (CDS), Node.js, acciones personalizadas
- **Base de datos:** SQLite en memoria
- **Herramientas:** UI5 CLI, SAP Fiori Generator, ui5-middleware-simpleproxy, fiori-tools-proxy

---

## Funcionalidades

### App manual (SAPUI5 MVC)
- Listado de órdenes con datos en tiempo real desde un servicio OData
- Estados visuales semánticos por status (Pending, Shipped, Delivered, Cancelled)
- Navegación a vista de detalle mediante routing
- Edición inline en la vista de detalle con modo lectura/edición
- Refresh automático de la lista al volver del detalle
- Creación de nuevas órdenes mediante formulario en diálogo con validaciones
- Eliminación de órdenes con confirmación
- Búsqueda y filtrado en tiempo real por cliente o ID

### App Fiori Elements
- List Report con columnas configuradas mediante anotaciones CDS
- Semáforo de criticidad por status (verde/naranja/rojo/azul)
- Object Page con secciones de Información General y Cliente
- Value Help para campo Status con lista de valores válidos
- Campos obligatorios con validación automática
- Ordenación por defecto por fecha descendente
- Modo draft para edición segura (estándar SAP)
- Acción personalizada "Confirmar Orden" en la lista
- Navegación desde Fiori Launchpad local

### Backend CAP
- Servicio OData v4 generado automáticamente desde modelo CDS
- Entidades relacionadas: Orders → Customers (Association)
- Campo calculado `statusCriticality` generado en tiempo de ejecución
- Acción personalizada `confirmOrder` con lógica de negocio
- Datos iniciales cargados desde CSV
- Persistencia en SQLite en memoria para desarrollo local

---

## Arquitectura

```
App manual UI5 (localhost:8080)          Fiori Elements (localhost:8081)
        │                                         │
        │  OData v4 (vía proxy)                   │  OData v4 (vía fiori-tools-proxy)
        └──────────────────────┬──────────────────┘
                               ▼
                  Backend SAP CAP (localhost:4004)
                               │
                               ▼
                      SQLite en memoria
```

---

## Estructura del proyecto

```
ui5-orders-app/
├── webapp/                          ← App manual SAPUI5
│   ├── view/
│   │   ├── Orders.view.xml
│   │   ├── Detail.view.xml
│   │   └── CreateOrder.fragment.xml
│   ├── controller/
│   │   ├── Orders.controller.js
│   │   └── Detail.controller.js
│   ├── Component.js
│   ├── index.html
│   └── manifest.json
├── app fiori/                       ← App Fiori Elements
│   └── project1/
│       ├── webapp/
│       │   ├── ext/controller/
│       │   │   └── OrderActions.js  ← Acción personalizada
│       │   ├── i18n/
│       │   └── manifest.json
│       ├── package.json
│       └── ui5.yaml
├── db/
│   ├── schema.cds                   ← Entidades: Orders, Customers, StatusValues
│   └── data/
│       ├── orders-Orders.csv
│       ├── orders-Customers.csv
│       └── orders-StatusValues.csv
├── srv/
│   ├── orders-service.cds           ← Servicio OData + acción confirmOrder
│   ├── orders-service.js            ← Lógica de negocio
│   └── orders-annotations.cds      ← Anotaciones Fiori Elements
├── package.json
├── ui5.yaml
└── .cdsrc.json
```

---

## Modelo de datos

```cds
entity Customers {
  key id      : String(10);
      name    : String(100) @mandatory;
      email   : String(100);
      country : String(50);
}

entity Orders {
  key id       : String(10);
      customer : Association to Customers @mandatory;
      status   : String(20) @mandatory;
      amount   : Decimal(10,2) @mandatory;
      date     : Date @mandatory;
}

entity StatusValues {
  key code        : String(20);
      description : String(50);
}
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm
- `@sap/cds-dk` instalado globalmente: `npm install -g @sap/cds-dk`

---

## Instalación

```bash
git clone <url-del-repositorio>
cd ui5-orders-app
npm install --legacy-peer-deps
```

> El flag `--legacy-peer-deps` es necesario por un conflicto de versiones entre `@sap/cds` y `@cap-js/sqlite`.

```bash
cd "app fiori/project1"
npm install
```

---

## Ejecución

El proyecto necesita **tres terminales simultáneas**.

**Terminal 1 — Backend (CAP):**
```bash
cd ui5-orders-app
npm run start:backend
```
Arranca en `http://localhost:4004`.

**Terminal 2 — App manual (SAPUI5):**
```bash
cd ui5-orders-app
npm start
```
Arranca en `http://localhost:8080`.

**Terminal 3 — App Fiori Elements:**
```bash
cd "ui5-orders-app/app fiori/project1"
npm start
```
Arranca en `http://localhost:8081` (o el siguiente puerto libre).

### URLs

| App | URL |
|---|---|
| App manual SAPUI5 | `http://localhost:8080` |
| Fiori Launchpad | `http://localhost:8081/preview.html#Orders-display` |
| Backend OData | `http://localhost:4004/odata/v4/orders` |

> Arrancar siempre el backend primero para evitar errores de conexión.

---

## Conceptos SAPUI5 aplicados

- Patrón MVC (Model-View-Controller)
- Data binding declarativo (agregaciones, propiedades, formatters)
- OData v4: CRUD completo (lectura, creación, edición, eliminación)
- Routing y navegación entre vistas con `attachPatternMatched`
- Fragments para diálogos reutilizables
- Modelo de UI separado del modelo de datos (estado de edición)
- Validaciones de formulario con `ValueState`
- Refresh automático de lista al volver del detalle

## Conceptos SAP CAP aplicados

- Definición de entidades y asociaciones con CDS
- Generación automática de servicio OData desde el modelo
- Campos calculados en proyecciones (`case/when`)
- Acciones personalizadas (unbound actions) con lógica de negocio en Node.js
- Carga de datos iniciales mediante CSV
- Modo draft (`@odata.draft.enabled`) para edición segura
- Persistencia en SQLite para desarrollo local

## Conceptos Fiori Elements aplicados

- Anotaciones CDS: `UI.LineItem`, `UI.FieldGroup`, `UI.Facets`, `UI.HeaderInfo`
- `UI.PresentationVariant` para ordenación por defecto
- `Criticality` para semáforos visuales de status
- `Common.ValueList` y `Common.ValueListWithFixedValues` para Value Help
- `@mandatory` para validaciones automáticas de campos obligatorios
- Controller extensions para acciones personalizadas en la lista
- Configuración de Fiori Launchpad local con `fiori-tools-preview`

---

## Licencia

Proyecto personal de práctica y portfolio, sin licencia específica.