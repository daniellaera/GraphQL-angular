import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  subscription: Subscription;

  graphqlSchema = [];
  public queryFields = [];

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.queryService.getPosts()
      .subscribe(data => {
        // filtering on GraphQLSchema by getting objects or types
        this.graphqlSchema = data[0]["__schema"]["types"];
        const queryNames = this.graphqlSchema.filter(v => v.kind == 'OBJECT' && v.name == 'Query');

        // getting array of fields inside first element of types
        if (queryNames.length > 0) {
          this.queryFields = queryNames[0].fields;
          console.log('fields2::: ', this.queryFields)
        }
      })
  }

  newFilter(v) {
    console.log('evented!', v)
  }

}
