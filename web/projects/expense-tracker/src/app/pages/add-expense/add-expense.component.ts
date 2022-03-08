import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  private subs = new SubSink();

  expenseForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
    category: ['3', [Validators.required]],
    description: ['', [Validators.maxLength(100)]],
    expenseDate: [new Date(), [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(`Route loaded with id: ${this.route.snapshot.paramMap.get('id')}`)
  }

  onSubmit() {
    console.log(this.expenseForm.value)
  }

}
