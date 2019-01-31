import { Component, OnInit,Input , Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input()items:any[]=[];
    @Input() filteredPropery:string;
    @Output() searchCompleted = new EventEmitter();
    @Output() searchStrarted = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


    handleSearch(event:any){
    this.searchStrarted.emit();
    const searchText=event.target.value;

    if (!this.items) return this.searchCompleted.emit([]);
    if(!searchText) return this.searchCompleted.emit(this.items);
// item is just a card woth all info  i provervime dali item.name includes search text for ex (plugged) if have return true else return falsse i ke bidit included in filtered items
    const filteredItems = this.items.filter((item)=> {
        if (item[this.filteredPropery].toLowerCase().includes(searchText.toLowerCase())) {
          // mojt i item.name
          return true;
        }
        else {
            return false;
        }
    });
        this.searchCompleted.emit(filteredItems);
  }

}
