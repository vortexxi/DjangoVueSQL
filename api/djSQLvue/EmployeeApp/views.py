from django.shortcuts import render
#Cross Site Request Forgery decorator, 
#Django provides several decorators that can be applied to views to support various HTTP features
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
#class JsonResponse(data, encoder=DjangoJSONEncoder, safe=True, json_dumps_params=None, **kwargs)
#more info: docs.djangoproject.com/en/4.0/ref/request-response/#jsonresponse-objects
from django.http.response import JsonResponse

#import our models
from EmployeeApp.models import Departments, Employee
#import serializers classes
from EmployeeApp.serializers import DepartmentSerializer, EmployeeSerializer
#for  store the pictures
from django.core.files.storage import default_storage

# Create your views here.

#Our API methods
@csrf_exempt
def departmentApi(request, id=0):
    if request.method == 'GET':
        departments =  Departments.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True)
        #data parameter, should be a dict instance
        #The safe boolean parameter defaults to True. If it’s set to False, any object can be passed for 
        #serialization (otherwise only dict instances are allowed). If safe is True and a non-dict object is passed
        #as the first argument, a TypeError will be raised.
        return JsonResponse(departments_serializer.data, safe=False)
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Data successfully added!', safe=False)
        return JsonResponse('Failed to add', safe=False)
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        #capture the record
        department = Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serializer = DepartmentSerializer(department, data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Table successfully updated!', safe=False)
        return JsonResponse('failed to update')
    elif request.method == 'DELETE':
        department = Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse('Data successfully deleted!', safe=False)

@csrf_exempt
def employeeApi(request, id=0):
    if request.method == 'GET':
        employees =  Employee.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True)
        #data parameter, should be a dict instance
        #The safe boolean parameter defaults to True. If it’s set to False, any object can be passed for 
        #serialization (otherwise only dict instances are allowed). If safe is True and a non-dict object is passed
        #as the first argument, a TypeError will be raised.
        return JsonResponse(employees_serializer.data, safe=False)
    elif request.method == 'POST':
        employees_data = JSONParser().parse(request)
        employees_serializer = EmployeeSerializer(data=employees_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Data successfully added!', safe=False)
        return JsonResponse('Failed to add', safe=False)
    elif request.method == 'PUT':
        employees_data = JSONParser().parse(request)
        #capture the record
        employees = Employee.objects.get(EmployeeId=employees_data['EmployeeId'])
        employees_serializer = EmployeeSerializer(employees, data=employees_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Table successfully updated!', safe=False)
        return JsonResponse('failed to update')
    elif request.method == 'DELETE':
        employees = Employee.objects.get(EmployeeId=id)
        employees.delete()
        return JsonResponse('Data successfully deleted!', safe=False)

##API method for store the photo files
@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

