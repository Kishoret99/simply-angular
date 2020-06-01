import { Component, ViewChild, TemplateRef, ContentChild, ContentChildren, Directive, AfterContentChecked, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simply-angular';

  printToConsole({counter}) {
    console.log(counter);
  }

  accordionStateMiddleware = (state, changes) => {
    if (changes.counter && changes.counter > 15) {
      console.log('Reached maximum limit');
      return null;
    }
    return changes;
  }
}

@Directive({
  selector: 'app-accordion-item,[appAccordionItem]',
})
export class AccordionItemDirective {

};

@Component({
  selector: 'app-accordion-button',
  template: `
  `
})
export class AccordionButtonComponent {

};


@Component({
  selector: 'app-accordion-content',
  template: `
  `
})
export class AccordionContentComponent {

};

@Component({
  selector: 'app-accordion',
  template: `
    <ng-container
    *ngTemplateOutlet="template;context:{$implicit: state, handlers: {
      increment: increment,
      decrement: decrement,
      reset: reset
    }}">
    </ng-container>
  `
})
export class AccordionComponent implements AfterContentChecked {

  @ContentChild(TemplateRef, {read: TemplateRef}) template;
  @Input() initalCounter;
  @Input() stateMiddleware;

  initialState;
  state;

  constructor() {
  }

  ngOnInit() {
    this.initialState = {
      counter: this.initalCounter || 0,
      status: 'DEFAULT'
    };
    this.state = this.initialState;
  }

  ngAfterContentChecked() {

  }

  increment = (cb) => {
    this.setState(({counter}) => {
      return {
        counter: counter + 1
      };
    }, cb);
  }

  decrement = (cb) => {
    if (this.state.counter <= 0) {
      this.setState({counter: 0});
      return;
    }
    this.setState({counter: this.state.counter - 1}, cb);
  }

  reset = (cb) => {
    this.setState(this.initialState, cb);
  };

  setState = (changes, callback?) => {
    let changesObject =
    typeof changes === 'function' ? changes(this.state) : changes;

    if (typeof this.stateMiddleware === 'function') {
      changesObject = this.stateMiddleware(this.state, changesObject) || {};
    }

    this.state = {
      ...this.state,
      ...changesObject,
    };
    if (callback) {
      callback(this.state);
    }
  }
};

