from django.db import models 


class common(models.Model): # COMM0N 
	id = models.BigAutoField(primary_key=True) 

	class Meta: 
		abstract = True
