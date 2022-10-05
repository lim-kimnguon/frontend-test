import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css']
})
export class AllQuizComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  quizzes= [
    {
      "name":"Web Application Quizzes(HTML)",
      "description":"Do you know the difference between software and a web browser? Can you tell the differences between tech-speak and programming languages? So you are a computer whiz and know all there is to know about web"
    },
    {
      "name":"Web Application Quizzes(CSS)",
      "description":"Do you know the difference between software and a web browser? Can you tell the differences between tech-speak and programming languages? So you are a computer whiz and know all there is to know about web"
    },
    {
      "name":"Web Application Quizzes(JAVASCRIPT)",
      "description":"Do you know the difference between software and a web browser? Can you tell the differences between tech-speak and programming languages? So you are a computer whiz and know all there is to know about web"
    },
    {
      "name":"Web Application Quizzes(JAVASCRIPT)",
      "description":"Do you know the difference between software and a web browser? Can you tell the differences between tech-speak and programming languages? So you are a computer whiz and know all there is to know about web"
    }
 ];

}
