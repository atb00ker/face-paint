from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class FacePaintView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _):
        content = {"message": "Face Paint"}
        return Response(content)
