import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
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
  disabledSelectedOrder: any = {};

  constructor(private formBuilder: FormBuilder)
  {
    this.billForm = this.formBuilder.group({
      'order': [this.orders[0].name, [Validators.required]],
      'checkboxes': this.formBuilder.array([])
    });
    this.addCheckboxes();
  }

  addCheckboxes()
  {
    const checkboxArray = this.billForm.get('checkboxes') as FormArray;
    this.orders.forEach((item: any, index: number) => {
      checkboxArray.push(this.formBuilder.group(
        { 
          id: [item.id],
          name: [item.name],
          isSelect: [index == 0 ? true : false] 
        }
      ));
    }); 
    this.disabledSelectedOrder = this.billForm?.get('checkboxes')?.get(String(0))?.value;
    this.billForm?.get('checkboxes')?.get(String(0))?.disable();
  }

  getControls()
  {
    return (this.billForm.get('checkboxes') as FormArray).controls; 
  }

  changeOrder(event: any)
  {
    let index = this.orders.findIndex((x: any) => x.name == event.target.value);
    if(index != -1)
    {
      this.billForm?.get('checkboxes')?.get(String(index))?.get('isSelect')?.setValue(true);
      this.billForm?.get('checkboxes')?.enable();
      this.disabledSelectedOrder = this.billForm?.get('checkboxes')?.get(String(index))?.value;
      this.billForm?.get('checkboxes')?.get([index])?.disable();
    }
  }

  onCheckboxChange(event: any, index: number)
  {
    this.billForm?.get('checkboxes')?.get(String(index))?.get('isSelect')?.setValue(
      event.target.checked ? true : false
    );
  }

  submit()
  {
    console.log(this.billForm.value);
  }
}
