# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2020-01-17 09:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200116_1204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='children',
            field=models.ManyToManyField(to='accounts.Child'),
        ),
    ]
