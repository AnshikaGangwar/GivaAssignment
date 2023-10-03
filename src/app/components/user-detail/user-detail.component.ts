import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Input()user!: User;
  ngOnInit(): void {
  }

  updateDisabledUserStatus(user: User): void{
    this.userService.updateFieldOfDocument(user);
  }
}
