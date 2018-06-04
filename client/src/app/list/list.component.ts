import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Course, Query } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Observable<Course[]>;
  constructor(private apollo: Apollo) {

   }

  ngOnInit() {
      this.courses = this.apollo.query<any>({
        query: gql`
        query {
        courses {
    				title
          }
        }`
      })
      .map(result => result.data.courses)
      
  }
}
