import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];

  displayedColumns: string[] = ['select', 'name', 'lastLogin', 'email', 'role', 'filter'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:no-input-rename
  @Input('users') usersInput: User[];
  searchText: string;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.dataSource.filterPredicate =
      (data: User, filter: string) => !filter || data.fullName === filter;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.users = this.usersInput;
    this.dataSource = new MatTableDataSource(this.users);
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onAssignRole(id) {
    this.router.navigateByUrl(`user/${id}/assign-role`);
  }
}
