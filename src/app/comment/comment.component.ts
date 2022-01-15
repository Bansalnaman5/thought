import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('comm') comm:any;
  currdata:any={};
  constructor() { 
  }

  ngOnInit(): void {
    this.currdata=this.comm;
  }

}
