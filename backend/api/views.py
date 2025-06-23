from rest_framework import viewsets, permissions
from .models import Car
from .serializers import CarSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all().order_by("-created_at")
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # 🔽 add this method
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
