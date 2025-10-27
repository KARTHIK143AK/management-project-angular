import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideGraphQL } from 'graphql.client';
import { InternalGoService } from '@services/internal_go.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  providers: [provideGraphQL],
  templateUrl: './register-create.component.html',
  styleUrls: ['./register-create.component.scss'],
})
export class RegisterCreateComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private internalGoService: InternalGoService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      owner_details: this.fb.array([this.createOwner()]), // start with one owner
    });
  }

  navigate(path: string) {
    // Navigate to the specified path
    this.router.navigate(['/dashboard/register']);
  }

  // helper to create an owner group
  createOwner(): FormGroup {
    return this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  // getter for form array
  get owner_details() {
    return this.registerForm.get('owner_details') as FormArray;
  }

  addOwner() {
    this.owner_details.push(this.createOwner());
  }

  removeOwner(index: number) {
    this.owner_details.removeAt(index);
  }

  async submitForm() {
    console.log('Form submitted:', this.registerForm.value);
    console.log('Valid Form submitted:', this.registerForm.valid);
    if (this.registerForm.valid) {

      const formValue = this.registerForm.value;

      // Prepare the payload
      const payload = {
        name: formValue.name,
        location: formValue.location,
        state: formValue.state,
        country: formValue.country,
        pincode: formValue.pincode,
        ownerDetails: formValue.owner_details.map((owner: any) => ({
          firstName: owner.FirstName,
          lastName: owner.LastName,
          email: owner.email,
          location: owner.location,
          state: owner.state,
          country: owner.country,
          pincode: owner.pincode,
          phoneNumber: owner.phoneNumber
        }))
      };

      let data = await this.internalGoService.register(payload)
    // .subscribe({
    //   next: res => console.log('Registration success', res),
    //   error: err => console.error('GraphQL error', err)
    // });

      let data1 = await this.internalGoService.getRegistrations();
      console.log('Registration successful!',data,data1);
    } else {
      let data1 = await this.internalGoService.getRegistrations();
      console.log('Registration successful!',data1);
      this.registerForm.markAllAsTouched();
    }
  }

}