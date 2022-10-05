import { browserRefresh } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interface/quiz';
import { ApiService } from 'src/app/service/api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuestionDetails } from 'src/app/interface/quiz-test';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  // Data initialization
  quiz!: Quiz;
  questionDetails!: QuestionDetails;
  quizTitle!: string;
  questionType: any;
  interval: any;
  seconds: number = 7200;
  category: any = [];
  browserRefresh!: boolean;

  // Data sorting
  matchingAnswer: any = [];
  questionAnswer: any = [];
  mcqAnswers: any = [];
  selectionArray: any = [];
  openQuestionArray: any = [];
  gapsArray: any = [];

  // Data binding
  answer = 0;
  current_question: number = 0;
  isDone: boolean = false;
  a_index!: any;
  old_question: boolean = false;
  isCheck: boolean = false;
  disableSubmit: boolean = false;

  // Temporary variable
  question_answers: any = [];
  text: any = '';
  user_answer: any = [];
  multipleAnswer: any = [];
  multipleAnswers: any = [];
  ans1_box: any = [];
  ans2_box: any = [];
  ans3_box: any = [];
  ans4_box: any = [];
  matchingArray: any = [];
  mcqArray = new Array();
  answer_array: any = [];
  gapsAnswer: any = [];
  matchingQuestionIndex: number = 0;
  matchingQuestionId: any = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    if (sessionStorage.getItem('remaining-time') == '0') {
      this.disableSubmit = true;
    }
    if (sessionStorage.getItem('remaining-time') == null) {
      this.a_index = 0;
      this.getQuiz();
      $('.submit').hide();
    } else {
      this.getData();
    }
  }

  // Initialized function
  getQuiz() {
    this.api.getQuizById(1).subscribe({
      next: (data) => {
        this.startTimer();
        this.quiz = data;
        this.dataInitialization();
        console.log(this.quiz);
        sessionStorage.setItem('question', JSON.stringify(this.category));
      },
    });
  }

  dataInitialization() {
    this.quizTitle = this.quiz.name;

    this.filterQuestions(this.quiz.questions);
    this.shuffleQuestions();

    this.category.forEach((question: any) => {
      question.answer.sort(() => Math.random() - 0.5);
    });

    this.questionType = this.category[this.current_question].questionType.name;
    this.getQuestionDetail();

    this.matchingArray.forEach((question: any) => {
      question.answer.forEach((answer: any) => {
        this.answer_array.push(answer);
        this.matchingQuestionId.push(answer.id);
      });
    });
  }

  startTimer() {
    if (sessionStorage.getItem('submit') !== 'true') {
      this.interval = setInterval(() => {
        // detect window reload
        window.addEventListener('beforeunload', (e) => {
          clearInterval(this.seconds);
          this.saveData();
        });

        if (this.seconds === 0) {
          this.submitQuestion();
          clearInterval(this.interval);
        } else {
          this.seconds--;
        }
      }, 1000);
    }
  }

  toHHMMSS = (s: number) => {
    var hours = Math.floor(s / 3600);
    var minutes = Math.floor(s / 60) % 60;
    var seconds = s % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  filterQuestions(questions: any) {
    questions.forEach((question: any) => {
      if (question.questionType.name == 'QCM') {
        this.mcqArray.push(question);
      }
      if (question.questionType.name == 'Question') {
        this.openQuestionArray.push(question);
      }
      if (question.questionType.name == 'Fill in Blank') {
        this.gapsArray.push(question);
        // this.getQuestionDetail();
      }
      if (question.questionType.name == 'Multiple Selection') {
        this.selectionArray.push(question);
      }
      if (question.questionType.name == 'Matching Question') {
        this.matchingArray.push(question);
      }
    });
  }

  shuffleQuestions() {
    this.mcqArray.sort(() => Math.random() - 0.5);
    this.openQuestionArray.sort(() => Math.random() - 0.5);
    // this.gapsArray.sort(() => Math.random() - 0.5);
    this.selectionArray.sort(() => Math.random() - 0.5);
    this.matchingArray.sort(() => Math.random() - 0.5);

    // merge array into category after shuffle
    this.category = [
      ...this.mcqArray,
      // ...this.gapsArray,
      ...this.selectionArray,
      ...this.matchingArray,
      ...this.openQuestionArray,
    ];
  }

  // Question action
  nextQuestion() {
    if (this.questionType == 'Matching Question') {
      if (!this.isDone) {
        if (
          this.ans1_box != '' &&
          this.ans2_box != '' &&
          this.ans3_box != '' &&
          this.ans4_box != ''
        ) {
          this.storeAnswer(
            this.category[this.current_question].id,
            this.a_index
          );
        } else {
          alert('Please match all the answer');
          return;
        }
        this.ans1_box = [];
        this.ans2_box = [];
        this.ans3_box = [];
        this.ans4_box = [];
      } else {
        this.ans1_box = [this.question_answers[this.current_question].pair[0]];
        this.ans2_box = [this.question_answers[this.current_question].pair[1]];
        this.ans3_box = [this.question_answers[this.current_question].pair[2]];
        this.ans4_box = [this.question_answers[this.current_question].pair[3]];
      }
      this.matchingQuestionIndex += 5;
    } else if (this.questionType == 'Question') {
      if (this.text != '') {
        this.storeAnswer(this.category[this.current_question].id, this.a_index);
        this.text = '';
      } else {
        alert('Please input the answer');
        return;
      }
    } else if (this.questionType == 'QCM') {
      if (this.answer != 0) {
        console.log(this.answer);
        this.storeAnswer(this.category[this.current_question].id, this.a_index);
      } else {
        alert('Please select the answer');
        return;
      }
    } else if (this.questionType == 'Multiple Selection') {
      if (this.multipleAnswer != '' || this.answer != 0) {
        this.storeAnswer(this.category[this.current_question].id, this.a_index);
      } else {
        alert('Please select an answer');
        return;
      }
    }

    this.current_question++;
    this.isDone = this.checkOldQuestion();
    this.questionType = this.category[this.current_question].questionType.name;
    if (this.questionType == 'Fill in Blank') {
      this.category[this.current_question].answer.forEach((answer: any) => {
        this.gapsAnswer.push(answer.name);
      });
    }
    if (this.isDone && this.questionType == 'Matching Question') {
      this.ans1_box = [this.question_answers[this.current_question].pair[0]];
      this.ans2_box = [this.question_answers[this.current_question].pair[1]];
      this.ans3_box = [this.question_answers[this.current_question].pair[2]];
      this.ans4_box = [this.question_answers[this.current_question].pair[3]];
    }
    if (this.isDone && this.questionType == 'Question') {
      this.text = this.question_answers[this.current_question].name;
    }

    this.getQuestionDetail();
    this.answer = this.getAnswerId();
    this.a_index = 0;
    this.validateBtn();
  }

  previousQuestion() {
    this.current_question--;
    this.questionType = this.category[this.current_question].questionType.name;
    if (this.questionType == 'Matching Question') {
      this.matchingQuestionIndex -= 5;
      this.ans1_box = [this.question_answers[this.current_question].pair[0]];
      this.ans2_box = [this.question_answers[this.current_question].pair[1]];
      this.ans3_box = [this.question_answers[this.current_question].pair[2]];
      this.ans4_box = [this.question_answers[this.current_question].pair[3]];
    }
    this.getQuestionDetail();
    this.isDone = this.checkOldQuestion();
    if (this.questionType == 'Question') {
      this.text = this.question_answers[this.current_question].name;
    }
    this.answer = this.getAnswerId();
    console.log(this.category.length);

    this.validateBtn();
  }

  submitQuestion() {
    let matching_answers: any = [];
    let selection_answers: any = [];
    let mcq_answers: any = [];
    let question_answers: any = [];

    this.storeAnswer(this.category[this.current_question].id, this.a_index);
    this.saveData();
    sessionStorage.setItem('submit', 'true');
    sessionStorage.setItem('remaining-time', '0');
    // this.seconds = 0;

    this.question_answers.forEach((question: any) => {
      if (question.type == 'QCM') {
        mcq_answers.push(question);
      }
      if (question.type == 'Multiple Selection') {
        question.answerId.forEach((answer: any) => {
          selection_answers.push({
            question: question.questionId,
            answer: answer,
          });
        });
      }
      if (question.type == 'Matching Question') {
        for (let i = 0; i < 4; i++) {
          matching_answers.push({
            question: question.questionId,
            answerId: question.answerId[i],
            name: question.name[i],
            pair: question.pair[i],
          });
        }
      }
      if (question.type == 'Question') {
        question_answers.push(question);
      }
    });

    this.api.storeQCMAnswer(mcq_answers).subscribe({
      next: (result) => {
        console.log(mcq_answers);
      },
    });
    this.api.storeMatchingAnswer(matching_answers).subscribe({
      next: () => {
        console.log(matching_answers);
      },
    });
    this.api.storeSelectionAnswer(selection_answers).subscribe({
      next: () => {
        console.log(selection_answers);
      },
    });
    this.api.storeQuestionAnswer(question_answers).subscribe({
      next: () => {
        console.log(question_answers);
      },
    });

    this.router.navigateByUrl('/finish-page');
  }

  storeAnswer(q_id: number, a_id: number) {
    if (this.questionType == 'QCM') {
      if (this.isDone === false) {
        this.question_answers[this.current_question] = {
          // userId: 1,
          questionId: q_id,
          answerId: a_id,
          name: '',
          pair: '',
          type: 'QCM',
        };
      }
    }

    if (this.questionType == 'Matching Question') {
      if (this.isDone == false) {
        this.user_answer.push({
          name: this.matchingQuestionId[this.matchingQuestionIndex],
          pair: this.ans1_box[0].pair,
          answerId: this.ans1_box[0].id,
        });
        this.user_answer.push({
          name: this.matchingQuestionId[this.matchingQuestionIndex + 1],
          pair: this.ans2_box[0].pair,
          answerId: this.ans2_box[0].id,
        });
        this.user_answer.push({
          name: this.matchingQuestionId[this.matchingQuestionIndex + 2],
          pair: this.ans3_box[0].pair,
          answerId: this.ans3_box[0].id,
        });
        this.user_answer.push({
          name: this.matchingQuestionId[this.matchingQuestionIndex + 3],
          pair: this.ans4_box[0].pair,
          answerId: this.ans4_box[0].id,
        });
        let names: any = [];
        let pairs: any = [];
        let answers: any = [];
        this.matchingAnswer.push(this.user_answer);

        this.user_answer.forEach((answer: any) => {
          answers.push(answer.answerId);
          names.push(answer.name);
          pairs.push(answer.pair);
        });
        this.question_answers.push({
          questionId: q_id,
          answerId: answers,
          name: names,
          pair: pairs,
          type: 'Matching Question',
        });
        console.log(this.question_answers);

        this.user_answer = [];
      }
    }

    if (this.questionType == 'Multiple Selection') {
      this.multipleAnswer.forEach((answer: any) => {
        this.multipleAnswers.push({ questionId: q_id, answerId: answer });
      });
      if (!this.isDone) {
        this.question_answers[this.current_question] = {
          questionId: q_id,
          answerId: this.multipleAnswer,
          name: '',
          pair: '',
          type: 'Multiple Selection',
        };
        this.multipleAnswer = [];
      }
    }

    if (this.questionType == 'Question') {
      if (this.isDone == false) {
        this.question_answers.push({
          questionId: q_id,
          answerId: 0,
          name: this.text,
          pair: '',
          type: 'Question',
        });
      }
    }
  }

  // Helpers
  saveData() {
    sessionStorage.setItem('remaining-time', JSON.stringify(this.seconds - 1));
    sessionStorage.setItem('quiz_title', this.quizTitle);
    sessionStorage.setItem(
      'current_question',
      JSON.stringify(this.current_question)
    );
    sessionStorage.setItem(
      'matchingQuestionIndex',
      JSON.stringify(this.matchingQuestionIndex)
    );
    sessionStorage.setItem(
      'user_answer',
      JSON.stringify(this.question_answers)
    );
  }

  getData() {
    this.a_index = 0;
    this.seconds = parseInt(sessionStorage.getItem('remaining-time')!);
    this.startTimer();
    this.quizTitle = sessionStorage.getItem('quiz_title')!;
    this.matchingQuestionIndex = parseInt(
      sessionStorage.getItem('matchingQuestionIndex')!
    );
    this.category = JSON.parse(sessionStorage.getItem('question')!);
    this.category.forEach((question: any) => {
      question.answer.sort(() => Math.random() - 0.5);
    });
    this.filterQuestions(this.category);
    this.matchingArray.forEach((question: any) => {
      question.answer.forEach((answer: any) => {
        this.answer_array.push(answer);
        this.matchingQuestionId.push(answer.id);
      });
    });
    this.current_question = parseInt(
      sessionStorage.getItem('current_question')!
    );
    this.questionType = this.category[this.current_question].questionType.name;
    this.question_answers = JSON.parse(sessionStorage.getItem('user_answer')!);

    if (this.questionType == 'Matching Question') {
      this.ans1_box = [this.question_answers[this.current_question].pair[0]];
      this.ans2_box = [this.question_answers[this.current_question].pair[1]];
      this.ans3_box = [this.question_answers[this.current_question].pair[2]];
      this.ans4_box = [this.question_answers[this.current_question].pair[3]];
    }
    if (this.questionType == 'Question') {
      this.text = this.question_answers[this.current_question].name;
    }
    this.isDone = this.checkOldQuestion();
    this.answer = this.getAnswerId();
    this.validateBtn();
    if(this.isDone && sessionStorage.getItem('submit') == 'true') {
      this.seconds = 0;
    }
  }

  validateBtn() {
    if (sessionStorage.getItem('submit') == 'true') {
      if(this.current_question == this.category.length - 1) {
        console.log('false');

        this.disableSubmit = true;
      } else {
        console.log('true');

        this.disableSubmit = false;
      }
    }
  }

  getAnswer(data: any, index: number) {
    if (this.questionType == 'Multiple Selection') {
      if (this.isCheck) {
        this.multipleAnswer.push(data[index].id);
      } else {
        if (this.multipleAnswer != '') {
          var i = this.multipleAnswer.indexOf(data[index].id);
          if (i > -1) {
            this.multipleAnswer.splice(i, 1);
          }
        }
      }
      return;
    }
    this.a_index = data[index].id;
  }

  getAnswerId() {
    if (this.old_question) {
      let a_id = this.question_answers[this.current_question].answerId;

      return a_id;
    } else {
      return 0;
    }
  }

  checkOldQuestion() {
    if (this.question_answers[this.current_question] == null) {
      this.old_question = false;
      return false;
    } else {
      this.old_question = true;
      return true;
    }
  }

  showOptions(event: MatCheckboxChange) {
    if (event.checked) {
      this.isCheck = true;
    } else {
      this.isCheck = false;
    }
  }

  getMultipleAnswer(answerId: number): boolean {
    var isCheck = false;
    if (this.question_answers[this.current_question] == null) {
      isCheck = false;
    } else {
      this.question_answers[this.current_question].answerId.forEach(
        (answer: any) => {
          if (answerId == answer) {
            isCheck = true;
          }
        }
      );
    }
    return isCheck;
  }

  dropquestion(event: CdkDragDrop<string[]>) {
    if (event.container.data.length > 0) {
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        0,
        event.previousContainer.data.length + 1
      );
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      0
    );
  }

  evenPredicate(event: CdkDrag<string>) {
    return true;
  }

  // Gaps
  public trackByMethod(index: number): number {
    return index;
  }

  private getQuestionDetail = () => {
    this.questionDetails = this.processQuestionResponse();
  };

  drop(event: CdkDragDrop<string[]>) {
    if (this.questionType == 'Fill in Blank') {
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

    if (this.questionType == 'Matching') {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  public processQuestionResponse(): QuestionDetails {
    const questionDetails = {
      questions: this.category[3].name
        .split('$$_$$')
        .filter((question: any) => {
          return question;
        }),

      options: this.gapsAnswer,

      answers: new Array(
        this.category[3].name.split('$$_$$').filter((question: any) => {
          return question;
        }).length
      ),
    };

    questionDetails.questions.forEach((quest: any, i: any) => {
      questionDetails['answers'][i] = [];
    });

    return questionDetails;
  }
}
