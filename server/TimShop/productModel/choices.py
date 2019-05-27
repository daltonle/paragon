from django.utils.translation import gettext as _

SUBJECT_CHOICES = (
        ("Train", _("Train")),
        ("Car", _("Car")),
        ("Boat", _("Boat")),
        ("Aircraft", _("Aircraft")),
        ("Other", _("Other")),
    )

MODEL_CHOICES = (
        ("Static", _("Static")),
        ("Working", _("Working")),
        ("Display", _("Display")),
        ("Other", _("Other")),
    )