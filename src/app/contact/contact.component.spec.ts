import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';
import {FormBuilder, FormControl} from '@angular/forms';
import {ValidationService} from './validation.service';
import {ContactService} from './contact.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;
// service stubs for testing
  const validationServiceStub = {};
  let service: ContactService;
  beforeEach(async(() => {

    service = new ContactService(null);

    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        FormBuilder,
        { provide: ValidationService, useValue: validationServiceStub },
        { provide: ContactService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ContactComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendEmail method on ContactService', () => {
    const spy = spyOn(service, 'sendEmail').and.callFake(() => {
      return Observable.empty();
    });
    component.onSubmit({});
    expect(spy).toHaveBeenCalled();
  });
});
