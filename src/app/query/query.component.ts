import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit, OnDestroy {

  queryFields = [];
  namesTypes = [];
  typesFieldsNames = [];
  queryInputFields = [];
  whereQueryName = [];
  graphqlSchema = [];

  isLoading = false;
  postsSubscription: Subscription;


  @Input()
  public columns = ['query'];
  public columnsFields = ['fields'];
  public whereQueryFields = ['whereQueryFields'];

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadData();
  }

  public loadData() {
    this.postsSubscription = this.queryService.getPosts()
      .subscribe(data$ => {
        this.isLoading = false;

        // filtering on GraphQLSchema by getting objects or types
        this.graphqlSchema = data$[0]["__schema"]["types"];
        const queryNames = this.graphqlSchema.filter(v => v.kind == 'OBJECT' && v.name == 'Query');

        // getting array of fields inside first element of types
        if (queryNames.length > 0) {
          this.queryFields = queryNames[0].fields;
          console.log('fields::: ', this.queryFields)
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

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }


  state = [{ type: "Query", fields: [{ name: "patient" }], pos: { x: 14, y: 14 } }, //On dit qu on veut des patients
  { type: "PatientWherQuery", fields: [{ name: "first_name_match", value: "imad" }, { name: "birth_year_eq", value: 1987 }] }, //On filtre les patients
  { type: "Patient", fields: [{ name: "first_name" }, { name: "last_name" }, { name: "birth_year" }, { name: "id" }, { name: "eds" }] }, // Demande quels fields du patients choppe
  { type: "EdsWhereQuery", fields: [] }, // On prends tout ces eds
  { type: "Eds", fields: [{ name: "begin_date" }] } // On prend la begin de chaque eds
  ]

}
