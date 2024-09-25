## This is Folder for Set variable as constant or static

Example:

if you have process business to define constant or enum to define status e.g for module on news, status is possible value as draft, published or archived.

```typescript
export const STATUS = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const
```
