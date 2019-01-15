import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from '../../campaign.model';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  campaigns: Campaign[];
  click: String = 'clickFolder';

  // tslint:disable-next-line:no-input-rename
  @Input('campaigns') campaignsInput: Campaign[];

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.campaigns = this.campaignsInput;
  }

  onClick(value) {
    this.click = value;
  }

}
