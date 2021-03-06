import { Component, Input, OnInit } from '@angular/core';

const CATEGORY_ICONS: { [key: string]: string } = {
  vegetables: '๐ฅ',
  milk: '๐ฅ',
  food: '๐',
  grocery: '๐',
  icecream: '๐ง',
  fuel: 'โฝ๏ธ',
  health: '๐ฅ',
  entertainment: '๐ฟ',
  bills: '๐งพ'
}

@Component({
  selector: 'xtr-category-icon',
  template: `
    <span class="flex justify-center items-center p-2 bg-slate-200 rounded-full">
      <span>{{ categoryIcon }}</span>
    </span>
  `
})
export class CategoryIconComponent implements OnInit {

  @Input() icon!: string;

  categoryIcon!: string;

  ngOnInit(): void {
    this.assertInputProps();

    this.categoryIcon = CATEGORY_ICONS[this.icon] || '๐';
  }

  private assertInputProps() {
    if (!this.icon) {
      throw new Error('Required input [icon] not provided.');
    }
  }
}
