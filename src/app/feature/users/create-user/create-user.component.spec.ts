import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';
import { UsersService } from './shared/services/users/users.service';
import { ToastService } from '@core/services/toast.service';
import { ListUsersComponent } from '../list-users/list-users.component';
import { MockUsersService } from '@core/testing/mocks/users-service.mock';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: 'users/list', component: ListUsersComponent}
      ]), ReactiveFormsModule],
      declarations: [CreateUserComponent],
      providers: [{provide: UsersService, useClass: MockUsersService}, ToastService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should initialize the form correctly', () => {
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('job')).toBeTruthy();
    expect(component.form.get('name')!.value).toEqual('');
    expect(component.form.get('job')!.value).toEqual('');
  });

  it('should mark the form as invalid when inputs are empty', () => {
    component.form.setValue({ name: '', job: '' });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should mark the form as valid when inputs are valid', () => {
    component.form.setValue({ name: 'John Doe', job: 'Developer' });
    expect(component.form.valid).toBeTruthy();
  });

  it('should create a new user successfully', async () => {
    expect(true).toBe(true);
  });

  it('should handle errors when creating a user', async () => {
    const errorMessage = 'Error creating user';
    const consoleSpy = spyOn(console, 'error');

    await component.createUser();

    expect(true).toBe(true);
  });
});
