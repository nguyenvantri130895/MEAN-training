import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  clickEmail: Boolean = false;
  clickSms: Boolean = false;

  clickNew: Boolean = false;
  clickExist: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCampaignComponent>,
    private router: Router
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onClickEmail() {
    this.clickEmail = true;
    this.clickSms = false;
  }

  onClickSms() {
    this.clickSms = true;
    this.clickEmail = false;
  }

  onClickNew() {
    this.clickNew = true;
    this.clickExist = false;
  }

  onClickExist() {
    this.clickExist = true;
    this.clickNew = false;
  }

  onClose() {
    this.dialogRef.close();
  }

}
