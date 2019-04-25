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
  public whereQueryName = [];
  public queryInputFields = [];
  namesTypes = [];
  public typesFieldsNames = [];

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

  public getType(typeString: string) {
    const names = this.queryFields.filter(v => v.name == typeString).map(v => v.type.ofType.name);

    const typesFields = this.graphqlSchema.filter(v => v.name == names).find(v => v.fields);
    console.log('typesFields', typesFields);

    this.namesTypes = this.queryFields.filter(v => v.name == typeString).map(v => v.type.ofType.name);
    console.log('namesTypes:: --->::', this.namesTypes)

    this.typesFieldsNames = typesFields.fields.map((v: any) => v.name);
    console.log('typesFieldsNames!:::', this.typesFieldsNames);

    // getting the corresponding whereQuery attached to each type (eds, patient, pf_dataset...)
    this.whereQueryName = this.queryFields.filter(v => v.name == typeString).map(v => v.args[0].type.name);
    console.log('the whereQueryName!:::', this.whereQueryName);

    const filteredWhereQuery = this.graphqlSchema.filter(v => v.name == this.whereQueryName)[0];
    console.log('filteredWhereQuery!:::', filteredWhereQuery.inputFields)

    this.queryInputFields = filteredWhereQuery.inputFields.map((v: any) => v.name);
    console.log('inputFields:::', this.queryInputFields)
  }

}
