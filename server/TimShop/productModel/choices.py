from django.utils.translation import gettext as _

MODEL_CHOICES = (
        ("Train", _("Train")),
        ("Car", _("Car")),
        ("Boat", _("Boat")),
        ("Aircraft", _("Aircraft")),
        ("Others", _("Others"))
    )

SUBJECT_CHOICES = (
        ("Static", _("Static")),
        ("Working", _("Working")),
        ("Display", _("Display")),
    )