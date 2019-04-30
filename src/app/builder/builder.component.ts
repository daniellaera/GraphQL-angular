import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig, Option } from 'angular2-query-builder';
import { FormControl, FormBuilder } from '@angular/forms';
import { QueryService } from '../query.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  public queryCtrl: FormControl;
  public currentConfig: QueryBuilderConfig = { fields: {} };
  public allowRuleset: boolean = true;
  public allowCollapse: boolean;
  public query: any;
  public graphqlSchema;

  public queryFields = [];
  postsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private queryService: QueryService) {
    this.queryCtrl = this.formBuilder.control(this.query);
  }

  ngOnInit() {
    this.loadData();
  }

  graphQLQuery() {

     let graphqlQuery = {where: {}};
     this.query.rules.forEach(r => {
        graphqlQuery.where[r.operator] = r.value;
    })
    return graphqlQuery;
  }

  getConfig(): QueryBuilderConfig {
    var config: QueryBuilderConfig = { fields: {} }
    if (this.graphqlSchema) {
      let whereQuery = this.graphqlSchema.filter(gs => gs.name.indexOf("WhereQuery") != -1);
      whereQuery.forEach(element => {
        const object = { name: element["name"], type: 'string', operators: element["inputFields"].map(inf => inf.name) };
        config.fields[element["name"]] = object
      });
    }
    return config;
  }

  public loadData() {
    this.postsSubscription = this.queryService.getPosts()
      .subscribe(data$ => {

        this.graphqlSchema = data$[0]["__schema"]["types"];
        this.currentConfig = this.getConfig();
        this.query = {
          "condition": "and",
          "rules": [
            {
              "field": "PatientWhereQuery",
              "operator": "first_name_match",
              "value": "Imad"
            },
            {
              "field": "PatientWhereQuery",
              "operator": "last_name_match",
              "value": "ESSAI"
            },
            {
              "field": "PatientWhereQuery",
              "operator": "birth_year_eq",
              "value": 1987
            }
          ]
        }

      })
  }

}
