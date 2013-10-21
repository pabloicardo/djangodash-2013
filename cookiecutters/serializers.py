import json

from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import CookieCutter


class NaiveSerializer(serializers.WritableField):
    def to_native(self, obj):
        return obj


class BakeHyperlinkField(serializers.HyperlinkedIdentityField):
    def get_url(self, obj, view_name, request, format):
        user = getattr(obj, 'user', None)

        kwargs = {
            'username': user.username,
            'id': obj.pk
        }

        return reverse(view_name, kwargs=kwargs, request=request, format=format)


class CookieCutterSerializer(serializers.HyperlinkedModelSerializer):
    # not sure why without this was returning a string
    tags = NaiveSerializer('tags')
    options = NaiveSerializer('options')
    baking_url = BakeHyperlinkField(view_name='bake_cookie')

    value = serializers.SerializerMethodField('_value')

    def _value(self, obj):
        if obj.options:
            return obj.options.get('project_name', 'No name')
        return 'No options'

    class Meta:
        model = CookieCutter
        fields = ('id', 'name', 'description', 'url', 'value',
                  'options', 'language', 'tags', 'baking_url')
