# Management System - Backend

## Introduction to Django

Create a new Django project with `django-admin startproject <project_name>`. In our case we named it `config` and renamed the top directory as `backend`.

Create a new app with `python3 manage.py startapp <app_name>`. In our case we create the apps:

- `inference` deals with the storage and application of AI models.
- `reporting` deals with the generation of reports (PDFs).
- `geodata` deals with the storage and serving of geojson files.
- `s3_storage` deals with the generation of presigned urls.
- `accounts` deals with user authentication and authorization.
- `management` is the main app of the project and deals with the main bussiness logic.

Each app should be reasonably reusable and independent.

## Apps

The file structure of each app follows the following pattern:

```bash
.
├── admin.py
├── apps.py
├── factories.py   - factories for fake models instances
├── management
│   └── commands/  - custom django commands
├── managers.py
├── migrations/
├── models.py
├── permissions.py
├── serializers.py - serializers for the models
├── tests/         - contain all the test of the app
├── urls.py        - url patterns for the endpoints
└── views.py       - views and viewsets
```

See: [Django Project Structure - A comprehensive guide](https://medium.com/django-unleashed/django-project-structure-a-comprehensive-guide-4b2ddbf2b6b8)

## Configuration

After deploying is required to apply all migrations on the DB (this creates all required tables and constrains). For this we run: `python3 manage.py migrate`. Then we need to initialize our permission groups: `company_manager` and `company_user`. Again, we run: `python3 manage.py create_default_groups`.

## Notes on django.urls.reverse

`reverse(viewname)` translate a view name into the associated url.

Django Rest Framework register its viewsets (`router.register(r"api/users", UserViewSet, basename="user")`) with the pattern `basename-list` and `basename-detail` (eg: `user-list` and `user-detail`).

To get the url associated with a particular model use: `reverse(viewname, kwargs=params)`. For example: `reverse("user-detail", kwargs={"pk": 1})` will return `api/users/1`.
