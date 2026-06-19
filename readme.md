# Orders App — SAPUI5 + SAP CAP

Aplicación de práctica full-stack para gestión de órdenes, construida con **SAPUI5** en el frontend y **SAP CAP (Cloud Application Programming Model)** en el backend. Proyecto creado con fines de aprendizaje y portfolio para desarrollo SAP/Fiori.

## Stack tecnológico

- **Frontend:** SAPUI5 1.120.0, patrón MVC, OData v4
- **Backend:** SAP CAP (CDS), Node.js
- **Base de datos:** SQLite en memoria
- **Herramientas:** UI5 CLI, ui5-middleware-simpleproxy

## Funcionalidades

- Listado de órdenes con datos en tiempo real desde un servicio OData
- Estados visuales semánticos por status (Pending, Shipped, Delivered, Cancelled)
- Navegación a vista de detalle mediante routing
- Edición inline en la vista de detalle con modo lectura/edición
- Creación de nuevas órdenes mediante formulario en diálogo
- Eliminación de órdenes con confirmación
- Búsqueda y filtrado en tiempo real por cliente o ID
- Validaciones de formulario con feedback visual

## Arquitectura

```
Frontend SAPUI5 (localhost:8080)
        │
        │  OData v4 (vía proxy)
        ▼
Backend SAP CAP (localhost:4004)
        │
        ▼
SQLite en memoria
```

El frontend consume un servicio OData generado automáticamente por CAP a partir de un modelo de datos CDS. Un proxy de desarrollo evita problemas de CORS entre ambos servidores locales.

## Estructura del proyecto

```
ui5-orders-app/
├── webapp/
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
├── db/
│   ├── schema.cds
│   └── data/
│       └── orders-Orders.csv
├── srv/
│   └── orders-service.cds
├── package.json
├── ui5.yaml
└── .cdsrc.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- npm

## Instalación

```bash
git clone <url-del-repositorio>
cd ui5-orders-app
npm install --legacy-peer-deps
```

> El flag `--legacy-peer-deps` es necesario por un conflicto de versiones entre `@sap/cds` y `@cap-js/sqlite`.

## Ejecución

El proyecto necesita **dos terminales simultáneas**: una para el backend y otra para el frontend.

**Terminal 1 — Backend (CAP):**
```bash
npm run start:backend
```
Arranca en `http://localhost:4004`. Expone el servicio OData en `/odata/v4/orders/Orders`.

**Terminal 2 — Frontend (UI5):**
```bash
npm start
```
Arranca en `http://localhost:8080` (o el siguiente puerto libre) y abre la app automáticamente.

## Modelo de datos

```cds
entity Orders {
  key id       : String(10);
      customer : String(100);
      status   : String(20);
      amount   : Decimal(10,2);
      date     : Date;
}
```

## Conceptos SAPUI5 aplicados

- Patrón MVC (Model-View-Controller)
- Data binding declarativo (`{property}`, binding de agregaciones)
- OData v4: lectura, creación, edición y eliminación de entidades
- Routing y navegación entre vistas
- Fragments para componentes UI reutilizables (diálogos)
- Formatters para transformación de datos en la vista
- Modelo de UI independiente del modelo de negocio (estado de edición)
- Validaciones de formulario con `ValueState`

## Conceptos SAP CAP aplicados

- Definición de entidades con CDS (Core Data Services)
- Generación automática de servicio OData a partir del modelo
- Carga de datos iniciales mediante CSV
- Persistencia en SQLite para desarrollo local

## Estado del proyecto

Proyecto en desarrollo activo con fines de aprendizaje. Próximos pasos:

- [ ] Mejorar la gestión de refresco de datos entre vistas
- [ ] Despliegue en SAP BTP Trial

## Licencia

Proyecto personal de práctica, sin licencia específica.