import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material';
import { CreateCampaignComponent } from '../create-campaign/create-campaign.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaigns;
  constructor(private campaignService: CampaignService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(res => {
      this.campaigns = res;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCampaignComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
