from rest_framework import routers
from django.contrib import admin
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

from accounts.views import (
    UserViewSet, null_view, confirm_email,
)


admin.site.site_header = "SHABOBOX ADMIN"
admin.site.site_title = "SHABOBOX ADMIN"
admin.site.index_title = "SHABOBOX ADMIN"

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='users')


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^docs/', include('rest_framework_docs.urls')),
    url(r'^rest-auth/registration/account-email-verification-sent/', null_view,
        name='account_email_verification_sent'),
    url(r'^rest-auth/registration/account-confirm-email/', null_view, name='account_confirm_email'),
    url(
        r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        null_view, name='password_reset_confirm'),
    url(r'^api/v1/rest-auth/', include('rest_auth.urls')),
    url(r'^verify-email/(?P<key>\w+)/$', confirm_email, name="account_confirm_email"),
    url(r'^api/v1/rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
]
