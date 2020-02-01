from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class User(AbstractUser):
    other_names = models.CharField(
        _('other names'), max_length=250, blank=True, null=True)
    phone_number = models.CharField(
        _('phone number'), max_length=30, blank=True, null=True)
    avatar = models.ImageField(
        _('profile picture'), upload_to='accounts/avatars', blank=True, null=True)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['-id']

    def __str__(self):
        return "{} - {}".format(self.username, self.email)

    @property
    def avatar_url(self):
        return ''

