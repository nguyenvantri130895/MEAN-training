import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss']
})

export class AssignRoleComponent implements OnInit {
  roles = [
    { name: 'Super Administrator' },
    { name: 'Administrator' },
    { name: 'Manager' },
    { name: 'Standard' }
  ];

  id: String;
  user: any = {};
  selectedRoles: string[];
  selectedRolesSorted: string[];
  assignRoleForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    const controls = this.roles.map(c => new FormControl(false));
    this.assignRoleForm = this.fb.group({
      email: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserId(this.id).subscribe(res => {
        this.user = res['user'];
        console.log(this.user);
        this.assignRoleForm.get('email').setValue(this.user.email);
        this.selectedRoles = this.user.roles;
      });
    });
  }

  isSelected(role) {
    return this.user.roles.indexOf(role) >= 0;
  }

  onChange(role: string) {
    const index = this.user.roles.indexOf(role);
    if (index === -1) {
      this.user.roles.push(role);
    } else {
      this.user.roles.splice(index, 1);
    }
    this.selectedRoles = this.user.roles;
  }

  submit() {
    this.userService.assignRole(this.id, this.selectedRoles).subscribe(() => {
      this.router.navigate(['users']);
      this.snackBar.open('Email ' + this.user.email + ' has been assigned roles successfully', 'OK', {
        duration: 5000
      });
    });
  }

}
