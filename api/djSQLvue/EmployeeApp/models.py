from django.db import models

# Create your models here.

#add models to store department details
class Departments(models.Model):
    #store department id field
    DepartmentId = models.AutoField(primary_key=True)
    #store department name field
    DepartmentName = models.CharField(max_length=500)

class Employee(models.Model):
    #employee id field
    EmployeeId = models.AutoField(primary_key=True)
    #Employee name field
    EmployeeName = models.CharField(max_length=500)
    #Employee department field
    EmployeeDepartment = models.CharField(max_length=500)
    #Employee date of joining
    DateOfJoining = models.DateField()
    #Employee photo
    PhotoFileName = models.CharField(max_length=500)

