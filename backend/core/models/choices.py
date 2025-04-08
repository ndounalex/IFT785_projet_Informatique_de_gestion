from .state_vacation import InTreatment, Approved, Rejected

STATUS_VALIDATE = 'V'
STATUS_REFUSED = 'R'
STATUS_IN_TREATMENT = 'I'

STATUS_REQUEST_CHOICES = [
    (STATUS_VALIDATE, 'Validé'),
    (STATUS_REFUSED, 'Refusé'),
    (STATUS_IN_TREATMENT, 'En traitement'),
]

STATES = {
    "I": InTreatment(),
    "V": Approved(),
    "R": Rejected(),
}