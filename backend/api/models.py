from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Car(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="cars"
    )
    make  = models.CharField(max_length=40)     # e.g. Toyota
    model = models.CharField(max_length=40)     # e.g. Yaris
    year  = models.PositiveSmallIntegerField()
    price_per_day = models.DecimalField(max_digits=8, decimal_places=2)
    is_available  = models.BooleanField(default=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"
