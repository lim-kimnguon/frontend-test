import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  roles = [
    {"role": "You will have 2 hours to complete the quiz."},
    {"role": "Once you select your answer, it can't be undone."},
    {"role": "You can't choose answer again after clicked next button."},
    {"role": "You can't exit from the Quiz while you're in exam."},
    {"role": "You'll get points on the basis of your correct answers"},
    {"role": "If there is any question, please contact us."}
  ];

}
