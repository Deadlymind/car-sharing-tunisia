from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        # everything except owner is writable
        read_only_fields = ("owner",)
        fields = "__all__"
