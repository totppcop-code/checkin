from django.db import models

class Checkin(models.Model):
    user = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=3, choices=[('in','in'),('out','out')])

    def __str__(self):
        return f"{self.user} - {self.type} @ {self.timestamp}"

