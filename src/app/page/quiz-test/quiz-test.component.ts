import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  QuestionDetails,
  QuestionDetailsResponse,
} from '../../interface/quiz-test';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css'],
})
export class QuizTestComponent implements OnInit {
  questionDetails!: QuestionDetails;
  quizzes: any;
  questionList: any = [];
  current_question: number = 0;
  question_answers: any = [];
  user_answers = new Array();
  times: number = 3600;
  interval : any;
  seconds : number = 7200;
  test: any;
  gapsAnswer: any = [];

  questions: any = [
    { id: 1, name: 'The children $$_$$ and $$_$$ all $$_$$ the $$_$$', answers: ['after', 'house', 'jumped', 'over', 'walked'] },
    { id: 2, name: 'The $$_$$ walked $$_$$ jumped $$_$$ over the', answers: ['me', 'you', 'jumped', 'over', 'walked'] },
    { id: 3, name: 'The children $$_$$ fk $$_$$ jumped all $$_$$ the house $$_$$', answers: ['after', 'house', 'jumped', 'over', 'walked'] },
    { id: 4, name: 'The $$_$$ walked $$_$$ jumped over $$_$$ house $$_$$', answers: ['house', 'love', 'you', 'of course', 'did'] }
  ];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {

    this.getQuiz();
    this.startTimer();
  }

  getQuiz() {
    this.api.getQuizById(1).subscribe({
      next: (data) => {
        // console.log(data);
        this.quizzes = data;
        console.log(data.questions[2]);
        this.questionList.push(data.questions[2]);
        // console.log(this.questionList);

        this.questionList[0].answer.forEach((answer: any) => {
          this.gapsAnswer.push(answer.name);
        })
        console.log(this.gapsAnswer);

        this.getQuestionDetail();
      },
    });
  }

  nextQuestion() {
    console.log(this.questionDetails.questions);
    this.storeAnswer();

    this.current_question++;
    this.getQuestionDetail();
  }

  previousQuestion() {
    this.current_question--;
    this.getQuestionDetail();
  }

  public trackByMethod(index: number): number {
    return index;
  }

  private getQuestionDetail = () => {
    this.questionDetails = this.processQuestionResponse();
  };

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data);
    console.log(event.container.data);
    if (event.previousContainer === event.container) {
      return;
    }

    const allowTheMove = () => {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    };

    const swap = () => {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex + 1,
        event.previousIndex
      );
    };

    if (event.container.data.length !== 1) {
      allowTheMove();
    } else {
      swap();
    }
  }

  public processQuestionResponse(): QuestionDetails {
    const questionDetails = {

      questions: this.questionList[0].name
        .split('$$_$$')
        .filter((question: any) => {
          return question;
        }),

      options: this.gapsAnswer,

      answers: new Array(
        this.questionList[0].name
          .split('$$_$$')
          .filter((question: any) => {
            return question;
          }).length
      ),
    };

    questionDetails.questions.forEach((quest: any, i: any) => {
      questionDetails['answers'][i] = [];
    });

    return questionDetails;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds--;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  toHHMMSS = (s : number) => {
    var hours   = Math.floor(s / 3600)
    var minutes = Math.floor(s / 60) % 60
    var seconds = s % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }

  submitQuestion() {
    this.storeAnswer();
    this.router.navigateByUrl('/finish-page');
  }

  storeAnswer() {
    this.questionDetails.answers.forEach((element: any, index) => {
      this.user_answers.push({
        question_id: this.questions[this.current_question].id,
        order: index + 1,
        answer: this.questionDetails.answers[index][0]
      });
    })

    console.log(this.user_answers);
  }

}
