import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { MockUsersService } from '@core/testing/mocks/users-service.mock';
import { FilterUserByNamePipe } from '@shared/pipes/filter-user-by-name/filter-user-by-name.pipe';
import { FormsModule } from '@angular/forms';

describe('ListUsers Component', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersComponent, FilterUserByNamePipe],
      providers: [{ provide: UsersService, useClass: MockUsersService }],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
