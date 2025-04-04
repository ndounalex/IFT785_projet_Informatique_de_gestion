from django.contrib import admin

from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'firstname', 'lastname')

# Register your models here.

#admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Employee)
# Register your models here.
