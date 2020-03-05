import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {CountryService} from './country.service';
import {Country} from './country';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

@Component({
  selector: 'ngbd-table-complete',
  templateUrl: './table-complete.html',
  providers: [CountryService, DecimalPipe]
})
export class NgbdTableComplete {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  name = 'Angular';
  enableEdit = false;
  enableEditIndex = null;
  backendData = [{
    "name": 'Target',
    "value": '100',
    "description": 'abc'
  },
  {
    "name": 'Size',
    "value": '20',
    "description": 'def'
  },
  {
    "name": 'Industry',
    "value": '40',
    "description": 'ghi'
  }]

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
