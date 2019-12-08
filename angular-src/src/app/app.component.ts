import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './redux-store/store';
import { ADD_ATTENDEE, ADD_TALK } from './redux-store/actions';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyLaw';
  @select() talks;
  @select() attendees;
  addAttendeeForm: FormGroup;
  addTalkForm: FormGroup;
  submittingAttendee = false;
  submittingTalk = false;
  submitted = false;
  loading = false;
  detailsAttendees = [];
  talkId: '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private ngRedux: NgRedux<IAppState>) {
    this.loading = true;
    this.dataService.fetchAllTalks().subscribe(
      res => {
        this.loading = false;
        this.ngRedux.dispatch({ type: ADD_TALK, talk: res['data'] });
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );

    this.dataService.fetchAllAttendees().subscribe(
      res => {
        this.loading = false;
        this.ngRedux.dispatch({ type: ADD_ATTENDEE, attendee: res['data'] });
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.addAttendeeForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required]
    });

    this.addTalkForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      date: [Date.now, Validators.required]
    });
  }

  get f() {
    return this.addAttendeeForm.controls;
  }

  get ft() {
    return this.addTalkForm.controls;
  }

  showSuccessToast = function(message) {
    'use strict';
    $.toast({
      heading: 'Successful',
      text: message,
      showHideTransition: 'slide',
      icon: 'success',
      loaderBg: '#f96868',
      position: 'top-right'
    });
  };

  showDangerToast = function(message) {
    'use strict';
    $.toast({
      heading: 'Error',
      text: message,
      showHideTransition: 'fade',
      icon: 'error',
      loaderBg: '#f2a654',
      position: 'top-right'
    });
  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  reset() {
    this.submitted = false;
  }

  detailsModal(attendees, talk_id) {
    this.detailsAttendees = attendees;
    this.talkId = talk_id;
    $('#detailsModal').modal('show');
  }

  addAttendeeToTalk(talk_id, attendee_id) {
    const obj = {
      attendee_id,
      talk_id
    };
    this.dataService.addAttendeeToTalk(obj).subscribe(
      res => {
        this.detailsAttendees = [...this.detailsAttendees, res['data']];
        this.showSuccessToast('The attendee has been added to the show');
      },
      err => {
        console.log(err);
        this.showDangerToast(err.message);
      }
    );
  }

  addAttendee() {
    this.submitted = true;
    if (this.addAttendeeForm.invalid) {
      return;
    }

    this.submittingAttendee = true;

    const obj = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      email: this.f.email.value,
      phonenumber: this.f.phonenumber.value
    };

    this.dataService.addAttendee(obj).subscribe(
      res => {
        this.ngRedux.dispatch({ type: ADD_ATTENDEE, attendee: res['data'] });
        this.showSuccessToast('Added Attendee');
        this.submittingAttendee = false;
        this.submitted = false;
        this.addAttendeeForm.reset();
      },
      err => {
        console.log(err);
        this.showDangerToast(err.message);
        this.submittingAttendee = false;
      }
    );
  }

  addTalk() {
    this.submitted = true;
    if (this.addTalkForm.invalid) {
      return;
    }

    this.submittingTalk = true;

    const obj = {
      title: this.ft.title.value,
      author: this.ft.author.value,
      date: this.ft.date.value
    };

    this.dataService.addTalk(obj).subscribe(
      res => {
        this.ngRedux.dispatch({ type: ADD_TALK, talk: res['data'] });
        this.showSuccessToast('Added Talk');
        this.submittingTalk = false;
        this.submitted = false;
        this.addTalkForm.reset();
      },
      err => {
        console.log(err);
        this.showDangerToast(err.message);
        this.submittingTalk = false;
      }
    );
  }
}
