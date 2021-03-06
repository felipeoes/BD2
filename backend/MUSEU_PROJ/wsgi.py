"""
WSGI config for MUSEU_PROJ project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MUSEU_PROJ.settings')

project_folder = os.path.expanduser('../.')  # adjust as appropriate
from dotenv import load_dotenv
load_dotenv(os.path.join(project_folder, '.env'))

application = get_wsgi_application()