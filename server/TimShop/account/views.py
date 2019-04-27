from django.shortcuts import render,get_object_or_404
from .models import User, Profile
from .forms import ProfileModelForm,UserModelForm
from django.views.generic import (
    CreateView,
    DetailView,
    ListView,
    UpdateView,
    ListView,
    DeleteView
)


# Create your views here.
class ProfileUpdateView(UpdateView):
    template_name=''
    form_class = ProfileModelForm

    def get_object(self):
        id =self.kwarg.get("id")
        return get_object_or_404(Profile, id=id)

    def form_valid(self, form):
        profile = form.save(commit=False)
        #populate non null field not from form
        form.save()
        return super().form_valid(form)

# def update_profile(request):
#     if request.method == 'POST':
#         user_form = UserModelForm(request.POST, instance=request.user)
#         profile_form = ProfileModelForm(request.POST, instance=request.user.profile)
#         if user_form.is_valid() and profile_form.is_valid():
#             user_form.save()
#             profile_form.save()
#     else:
#         user_form = UserModelForm(instance=request.user)
#         profile_form = ProfileModelForm(instance=request.user.profile)
