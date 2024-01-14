import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular-app';

  orders: any = [
    {
      id: 1,
      name: 'dine-in'
    },
    {
      id: 2,
      name: 'dine-in AC'
    },
    {
      id: 3,
      name: 'Take Away'
    },
    {
      id: 4,
      name: 'Take Away Home'
    }
  ];
  billForm!: FormGroup;
  disabledOrderValue: string = '';
  disabledIndex: number = -1;

  constructor(private formBuilder: FormBuilder)
  {
    this.billForm = this.formBuilder.group({
      'order': [this.orders[0].name, [Validators.required]],
      'checkboxes': this.formBuilder.array([])
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    let checkboxesArray = this.billForm.get('checkboxes') as FormArray;
    this.orders.forEach((item: any, index: number) => {
      const control = this.formBuilder.control(false);
      checkboxesArray.push(control);
    });
    this.billForm?.get('checkboxes')?.get([0])?.setValue(true);
    this.disabledOrderValue = this.orders[0].name;
    this.billForm?.get('checkboxes')?.get([0])?.disable();
  }

  getControls()
  {
    return (this.billForm.get('checkboxes') as FormArray).controls; 
  }

  onCheckboxChange(event: any, index: number)
  {
    if(event.target.checked)
    {
      this.billForm?.get('checkboxes')?.get([index])?.setValue(true);
    }
    else
    {
      this.billForm?.get('checkboxes')?.get([index])?.setValue(false);
    }
  }

  changeOrder(event: any)
  {
    let index = this.orders.findIndex((x: any) => x.name == event.target.value);
    if(index != -1)
    {
      this.billForm?.get('checkboxes')?.get([index])?.setValue(true);
    }
    this.billForm?.get('checkboxes')?.enable();
    this.disabledOrderValue = this.orders[index].name;
    this.billForm?.get('checkboxes')?.get([index])?.disable();
  }

  submit()
  {
    
  }
}
