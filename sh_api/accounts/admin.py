from django.contrib import admin
import csv
from django.http import HttpResponse
# Register your models here.
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import ugettext_lazy as _

from accounts.models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email',)


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    # form = CustomUserChangeForm
    model = User
    list_display = ('username', 'email', 'first_name', 'last_name',
                    'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': (
            'username', 'email', 'first_name', 'last_name', 'other_names',
                'phone_number', 'avatar', 'role', 'role_level', 'id_number',
                'department', 'division', 'start_date', 'location',
                'job_title', 'preonboarding_deadline', 'password'
                )}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'first_name', 'last_name', 'other_names',
                'phone_number', 'avatar', 'role', 'role_level', 'id_number',
                'department', 'division',
                'start_date', 'location', 'job_title', 'preonboarding_deadline',
                'password1', 'password2', 'is_staff', 'is_superuser', 'is_active'
            )}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)

