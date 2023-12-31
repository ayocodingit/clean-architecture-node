folder for Modules

## Folder Structure

```bash
modules/
└── name module/
    ├── delivery/
    │   ├── http/
    │   │   └── handler.ts
    │   ├── grpc/
    │   │   └── handler.ts
    │   └── graphQL/
    │       └── handler.ts
    ├── repository/
    │   ├── mongo/
    │   │   └── repository.ts
    │   ├── mySQL/
    │   │   └── repository.ts
    │   └── postgreSQL/
    │       └── repository.ts
    ├── usecase/
    │   └── usecase.ts
    └── name module.ts // in this file for init/control the module to load in the main
```
