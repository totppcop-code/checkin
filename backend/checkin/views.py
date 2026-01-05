from .models import Checkin
from .serializers import CheckinSerializer
from rest_framework import viewsets
from django.http import JsonResponse

class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all()
    serializer_class = CheckinSerializer
    
def health(request):
    return JsonResponse({"status":"ok"})