#django.urls functions for use in URLconfs
#path(route, view, kwargs=None, name=None)
from django.urls import path

#re_path(route, view, kwargs=None, name=None). Returns an element for inclusion in urlpatterns.
from django.urls import include, re_path
from EmployeeApp import views

#for the pictures
#static.static(prefix, view=django.views.static.serve, **kwargs)
#Helper function to return a URL pattern for serving files in debug mode
from django.conf.urls.static import static
from django.conf import settings

from djSQLvue.settings import MEDIA_ROOT, MEDIA_URL

urlpatterns = [
    re_path(r'^department$', views.departmentApi),
    #the delete method will recieve id on the url
    re_path(r'^department/([0-9]+)$', views.departmentApi),
    re_path(r'^employee$', views.employeeApi),
    #the delete method will recieve id on the url
    re_path(r'^employee/([0-9]+)$', views.employeeApi),
    #url for the pictures
    re_path(r'^employee/savefile', views.SaveFile)
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)