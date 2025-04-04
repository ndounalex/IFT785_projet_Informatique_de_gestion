from django.db import models 


class common(models.Model): # COMM0N 
	id = models.BigAutoField(primary_key=True)
	is_deleted = models.BooleanField(default=False)
	class Meta: 
		abstract = True
