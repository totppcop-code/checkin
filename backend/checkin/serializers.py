from .models import Checkin
from rest_framework import serializers

class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
            model = Checkin
            fields = '__all__'

    