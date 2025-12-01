from rest_framework import serializers
from .models import GeneralInformation, Goal, Debit, Category, Transaction

class GeneralInformationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = GeneralInformation
        fields = "__all__"

class GoalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Goal
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

class DebitSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Debit
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

class CategorySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    category_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
    
    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        return None
