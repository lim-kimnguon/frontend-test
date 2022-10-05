import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  QuestionDetails,
  QuestionDetailsResponse,
} from '../interface/quiz-test';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  questions: any = [
    { id: 1, name: 'The children $$_$$ and $$_$$ all $$_$$ the $$_$$' },
    { id: 2, name: 'The $$_$$ walked and jumped $$_$$ over the $$_$$' },
    { id: 3, name: 'The children $$_$$ and $$_$$ all $$_$$ the $$_$$' },
  ];

  current_question: number = 0;
  private url = "http://localhost:9090/api"

  constructor(private api : ApiService, private http : HttpClient) {}

  getQuizById(id : number) : Observable<any> {
    return this.http.get<any>(`${this.url}/quiz/${id}`)
  }

  public getQuestionDetails(): Observable<any> {
    return of({
      question: this.questions,
      options: ['after', 'house', 'jumped', 'over', 'walked'],
    });
  }

  public processQuestionResponse(
    rawResponse: QuestionDetailsResponse
  ): QuestionDetails {
    console.log(rawResponse.question)
    const questionDetails = {
      questions: rawResponse.question[this.current_question].name
        .split('$$_$$')
        .filter((question: any) => {
          return question;
        }),
      options: rawResponse.options,
      answers: new Array(
        rawResponse.question[this.current_question].name
          .split('$$_$$')
          .filter((question: any) => {
            return question;
          }).length
      ),
    };
    console.log(questionDetails);
    questionDetails.questions.forEach((quest: any, i: any) => {
      questionDetails['answers'][i] = [];
    });

    return questionDetails;
  }
}
