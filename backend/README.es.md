# Sistema de Gestión - Backend

## Introducción a Django

Una aplicación de Django esta compuesto de aplicaciones o *apps*. En nuetro caso disponemos de las siguientes *apps*:

- `inference` deals with the storage and application of AI models.
- `reporting` deals with the generation of reports (PDFs).
- `geodata` deals with the storage and serving of geojson files.
- `s3_storage` se encarga de la generación de urls prefirmadas al *bucket* en S3.
- `accounts` se encarga de la autenticación (manejo de credenciales) e autorización (manejo de permisos) del sistema.
- `management` es la aplicación principal del projecto y se encarga de la lógica de negocios propia del sistema.

Cada *app* es razonablemente independiente y reutilizable.

## Apps

La estructura de archivos de cada *app* sigue el siguiente patron:

```bash
.
├── admin.py
├── apps.py
├── factories.py   - fabricas de objectos con datos falsos para facilitar pruebas
├── management
│   └── commands/  - comandos propios del proyecto
├── managers.py
├── migrations/
├── models.py
├── permissions.py
├── serializers.py - serializadores de los modelos
├── tests/         - contiene todas las pruebas de la app
├── urls.py        - patrones de urls de la app
└── views.py       - vistas y viewsets
```

Vea: [Django Project Structure - A comprehensive guide](https://medium.com/django-unleashed/django-project-structure-a-comprehensive-guide-4b2ddbf2b6b8)

## Configuración

Luego de desplegar el *backend* es necesario aplicar las migraciones sobre la base de datos (esto crea las tablas necesarias). Para ello ejecutamos: `python3 manage.py migrate`. Luego es necesario crear los grupos: `company_manager` y `company_user`. Esto se logra mediante el comando: `python3 manage.py create_default_groups`.

## Notes on django.urls.reverse

`reverse(viewname)` translate a view name into the associated url.

Django Rest Framework register its viewsets (`router.register(r"api/users", UserViewSet, basename="user")`) with the pattern `basename-list` and `basename-detail` (eg: `user-list` and `user-detail`).

To get the url associated with a particular model use: `reverse(viewname, kwargs=params)`. For example: `reverse("user-detail", kwargs={"pk": 1})` will return `api/users/1`.
