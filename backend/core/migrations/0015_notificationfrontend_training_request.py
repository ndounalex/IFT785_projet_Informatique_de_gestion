# Generated by Django 5.1.7 on 2025-04-11 19:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_trainingregistration_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificationfrontend',
            name='training_request',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.trainingregistration'),
        ),
    ]
