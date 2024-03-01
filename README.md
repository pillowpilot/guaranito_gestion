# Management System - Backend

## Introduction to Django

Create a new Django project with `django-admin startproject <project_name>`. In our case we named it `config` and renamed the top directory as `backend`.

Create a new app with `python3 manage.py startapp <app_name>`. In our case we create the apps: `inference`, `reporting`, `geodata`, `management`, and `accounts`.

* `inference` deals with the storage and application of AI models.
* `reporting` deals with the generation of reports (PDFs).
* `geodata` deals with the storage and serving of geojson files.
* `accounts` deals with user authentication and authorization.
* `management` is the main app of the project and deals with the main bussiness logic.

Each app should be reasonably reusable and independent.
