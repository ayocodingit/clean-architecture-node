## Structure Folder Modules

```
.
└── modules/
    ├── name module/
    │   ├── delivery/
    │   │   ├── http/
    │   │   │   └── handler.ts
    │   │   ├── grpc/
    │   │   │   └── handler.ts
    │   │   ├── websocket/
    │   │   │   └── handler.ts
    │   │   └── graphql/
    │   │       └── handler.ts
    │   ├── entity/
    │   │   ├── interface.ts // type of data interface
    │   │   └── schema.ts // schema validation
    │   ├── repository/
    │   │   ├── mongo/
    │   │   │   └── repository.ts
    │   │   ├── mySQL/
    │   │   │   └── repository.ts
    │   │   └── postgreSQL/
    │   │       └── repository.ts
    │   ├── usecase/
    │   │   └── usecase.ts // logic business
    │   └── name module.ts // for init the module to add in the main.ts
    └── other module
```
