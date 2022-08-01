from rest_framework import serializers
from users.models import User, Parent, Admin


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fullname', 'email',  'is_admin']


class ParentSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['fullname', 'email', 'phone', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = User(
            fullname=self.validated_data['fullname'],
            email=self.validated_data['email'],
            phone=self.validated_data['phone']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({
                "error": "password do not match"
            })

        user.set_password(password)
        user.is_parent = True
        user.save()
        Parent.objects.create(user=user)
        return user


class AdminSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['fullname', 'email', 'phone', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = User(
            fullname=self.validated_data['fullname'],
            email=self.validated_data['email'],
            phone=self.validated_data['phone']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({
                "error": "password do not match"
            })

        user.set_password(password)
        user.is_admin = True
        user.save()
        Admin.objects.create(user=user)
        return user
