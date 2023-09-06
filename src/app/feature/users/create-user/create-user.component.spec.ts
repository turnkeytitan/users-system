import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';
import { UsersService } from './shared/services/users/users.service';
import { ToastService } from '@core/services/toast.service';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let usersService: UsersService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CreateUserComponent],
      providers: [UsersService, ToastService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
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
    const createUserSpy = spyOn(usersService, 'createUser').and.returnValue(
      Promise.resolve({ name: 'John Doe', job: 'new job', id: '1', createdAt: '12' }),
    );
    const showToastSpy = spyOn(toastService, 'showToast');

    await component.createUser();

    expect(createUserSpy).toHaveBeenCalledWith({ name: 'John Doe', job: 'Developer' });
    expect(showToastSpy).toHaveBeenCalledWith({
      type: 'success',
      message: 'User John Doe created successfully',
    });
  });

  it('should handle errors when creating a user', async () => {
    const errorMessage = 'Error creating user';
    spyOn(usersService, 'createUser').and.throwError(errorMessage);
    const consoleSpy = spyOn(console, 'error');

    await component.createUser();

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
  });
});
