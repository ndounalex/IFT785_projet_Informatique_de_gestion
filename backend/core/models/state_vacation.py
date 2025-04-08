from abc import ABC, abstractmethod
#from core.models.choices import STATUS_VALIDATE, STATUS_REFUSED

class VacationStatus(ABC):
    @abstractmethod
    def approved(self, request):
        pass

    @abstractmethod
    def rejected(self, request):
        pass

class InTreatment(VacationStatus):
    def approved(self, request):
        request.status = "V"
        request.save()
        print("request approuvée.")

    def rejected(self, request):
        request.status = "R"
        request.save()
        print("request rejetée.")

class Approved(VacationStatus):
    def approved(self, request):
        print("request déjà approuvée.")

    def rejected(self, request):
        print("Impossible de rejeter une request déjà approuvée.")

class Rejected(VacationStatus):
    def approved(self, request):
        print("Impossible d’approuver une request rejetée.")

    def rejected(self, request):
        print("request déjà rejetée.")
