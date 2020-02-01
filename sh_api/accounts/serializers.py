from rest_framework import serializers
from accounts.models import (
    User,
)


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 'email',
        ]


class UserSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'username',
            'first_name', 'last_name', 'other_names',
            'phone_number',
            'avatar_url',
        ]

class VerifyEmailSerializer(serializers.Serializer):
    key = serializers.CharField()
