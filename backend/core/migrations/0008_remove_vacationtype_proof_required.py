# Generated by Django 5.1.7 on 2025-04-08 02:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_vacationtype_employee_hiring_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vacationtype',
            name='proof_required',
        ),
    ]
