#!/bin/bash

python3 manage.py migrate
# tail -f /dev/null
# python3 manage.py runserver 0.0.0.0:8000
uwsgi --ini uwsgi.conf.ini
